// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const rp = require('request-promise')

const URL = 'http://你的云主机地址:3000/top/playlist'

const playlistCollection = db.collection('playlist')


const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async(event, context) => {

  // const list = await playlistCollection.get()
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.playlists.concat(cur.playlists)
      }
    })
  }



  const playlist = await rp(URL)
  // .then((res) => {
  //   return JSON.parse(res).code
  // })
  
  var playlistNew=JSON.parse(playlist)


  // console.log("playlistNew.tags"+playlistNew.tags)
  


  // console.log("playlistNew.tags.length="+playlistNew.tags.length)

  // console.log("list.data.lenth"+list.data.length)


  const newData = []
  for (let i = 0, len1 = playlistNew.playlists.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlistNew.playlists[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlistNew.playlists[i])
    }
  }

  console.log("newData="+newData)



  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }

  return newData.length
}