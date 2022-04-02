const rp = require('request-promise')
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')
// console.log(fileName)




const APPID = '你的微信小程序id'
const APPSECRET = '你的微信小程序密钥'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`


const updateAccessToken = async () => {
    const resStr = await rp(URL)
    const res = JSON.parse(resStr)
    // console.log(res)

    //写入token到文件
    if (res.access_token) {
        fs.writeFileSync(fileName, JSON.stringify({
            access_token: res.access_token,
            createTime: new Date()
        }))
    } else {
        await updateAccessToken()
    }
}
/**
 * 获取token
 */
const getAccessToken = async () => {
    try {
        const readRes = fs.readFileSync(fileName, 'utf8')
        const readObj = JSON.parse(readRes)
        //    console.log(readObj)
        const createTime=new Date(readObj.createTime).getTime()
        const nowTime=new Date().getTime()
        if((nowTime-createTime)/1000/60/60>=2){
            await updateAccessToken()
            await getAccessToken()
        }
        return readObj.access_token
    } catch (error) {
        await updateAccessToken()
        await getAccessToken()
    }
}


/**
 * token定时更新，有效期2h
 * 设置提前5分钟更新
 */

setInterval(async () => {
    await updateAccessToken()
}, (7200 - 300) * 1000)
// updateAccessToken()
module.exports=getAccessToken