// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  /**
   * api变动只能正式版使用模板消息
   */
  // const {OPENID}=cloud.getWXContext()
  // const result=await cloud.openapi.templateMessage.send({
  //   touser:OPENID,
  //   page:`/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
  //   data:{
  //     thing1:{
  //       DATA:'event.content'
  //     },
  //     thing2:{
  //       DATA:'评价完成'
  //     }
  //   },
  //   templateId:'eKkax-9_6tWhTM7HbcQjEgrffMeozok3JHdw9KNhxhc',
  //   formId:event.formId
  // })
  // return result
}