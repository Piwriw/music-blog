// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require("tcb-router")
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app=new TcbRouter({event})

  app.use(async(ctx,next)=>{
    ctx.data={}
    ctx.data.openId=eventwx.getUserInfo.openId
    await next()
  })

  app.router('music',async(ctx,next)=>{
    ctx.data.musicName='数鸭子'
    await next()
  },async(ctx,next)=>{
    ctx.data.musicType='儿歌'
    ctx.body={
      data:ctx.data
    }
  })

  app.router('movie',async(ctx,next)=>{
    ctx.data.movieName='千'
  })

  return app.serve()
}