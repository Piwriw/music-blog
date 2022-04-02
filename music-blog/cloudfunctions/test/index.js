// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rp = require('request-promise')

const URL = 'http://47.107.113.111:3000/playlist/hot'
// 云函数入口函数
exports.main = async (event, context) => {
    const playlist= await rp(URL); 
    var playlistNew=JSON.parse(playlist)
    return playlistNew.tags
}