const Router = require('koa-router')
const router = new Router()
const getAccessToken = require('../utils/getAccessToken.js')
const ENV = 'cloud1-0g2q6t45a8b2f292'
const rp = require('request-promise')
const callCloudFn = require('../utils/callColudFn.js')
const callCloudDB = require('../utils/callCloudDB.js')



// 跨域


router.get('/list', async (ctx, next) => {
    // const access_token = await getAccessToken()
    const query = ctx.request.query
    const res = await callCloudFn(ctx, 'music', {
        $url: 'playlist',
        start: parseInt(query.start),
        count: parseInt(query.count)
    })
    let data = []
    if (res.resp_data) {
        data = JSON.parse(res.resp_data).data
    }
    //查询歌单列表
    // const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ENV}&name=music`

    // var options = {
    //     method: 'POST',
    //     uri: url,
    //     body: {
    //         $url: 'playlist',
    //         start: parseInt(query.start),
    //         count: parseInt(query.count)
    //     },
    //     json: true // Automatically stringifies the body to JSON
    // };
    // data = await rp(options)
    //     .then((res) => {
    //         // console.log(res)
    //         return JSON.parse(res.resp_data).data
    //     })
    //     .catch(function (err) {
    //         // POST failed...
    //         console.log(console.error)
    //     });
    
    return ctx.body = {
        data,
        code: 20000
    }
})
// https://api.weixin.qq.com/tcb/databasequery?access_token=ACCESS_TOKEN
router.get('/getById', async (ctx, next) => {
    const query = `db.collection('playlist').doc('${ctx.request.query.id}').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})

router.post('/updatePlaylist', async (ctx, next) => {
    const params = ctx.request.body
    const query = `
        db.collection('playlist').doc('${params._id}').update({
            data:{
                name:'${params.name}',
                description:'${params.description}'
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/del', async(ctx, next)=>{
    const params = ctx.request.query
    const query = `db.collection('playlist').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})


router.get('/dela',async(ctx,next)=>{
    默认只能获取十条
    const query = `db.collection('swiper').get()`
    const res=await callCloudDB(ctx,'databasequery',query)
     console.log(res)
    文件下载链接
    let fileList=[]
    const data=res.data
    for(let i=0,len=data.length;i<len;i++){
        fileList.push({
            fileid:JSON.parse(data[i]).fileid,
            max_age:7200
        })
    }
    const dlRes=await cloudStorage.download(ctx,fileList)
    // console.log(dlRes)
})
module.exports = router