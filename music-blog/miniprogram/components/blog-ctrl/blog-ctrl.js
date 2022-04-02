

// components/blog-ctrl/blog-ctrl.js
let userInfo
const db=wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId:String,
    blog:Object
  },
    externalClasses:['iconfont','icon-pinglun','icon-fenxiang'],
  /**
   * 组件的初始数据
   */
  data: {
    loginShow:false, //false已经登录
    modalShow:false,
    content:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // onInput(event){
    //     this.setData({
    //       content:event.detail.value
    //     })
    // },
    onSend(event){
      //评论数据插入数据库
      userInfo=wx.getStorageSync('userInfo')
      console.log("usss",userInfo)
          // let content=this.data.content
          // let formId=event.detail.formId
          let content=event.detail.value.content
          if(content.trim()==''){
            wx.showModal({
              title:'评论内容不能为空',
              content:','
            })
            return 
          }
          wx.showLoading({
            title: '评价中',
            mask:true
          })
          db.collection('blog-comment').add({
            data:{  
              content,
              createTime:db.serverDate(),
              blogId:this.properties.blogId,
              nickName:userInfo.detail.nickName,
              avatarUrl:userInfo.detail.avatarUrl
            }
          }).then((res)=>{
            wx.setStorageSync("userInfo",userInfo)
            wx.hideLoading()
            wx.showToast({
              title: '评论成功',
            })
            this.setData({
              modalShow:false,
              content:'',
            })

            //评论成功，刷新评论
            this.triggerEvent('refreshCommentList')
          })
      /**
       * 推送模板消息
       * 目前只能正式版使用
       */

        // wx.cloud.callFunction({
        //   name:'sendMessage',
        //   data:{
        //     content,
        //     formId,
        //     blogId:this.properties.blogId
        //   }
        // }).then((res)=>{
        //   console.log(res)
        // })



    },
    onComment(){
      if(wx.getStorageSync('userInfo')){
        userInfo=wx.getStorageSync('userInfo')
        //to显示评论
        this.setData({
          modalShow:true
        })
      }else{
        this.setData({
          loginShow:true
        })
      }
    },
    onLoginSuccess(event){
      userInfo=event.detail
      console.log("userInfo",userInfo)
      //授权框消失，评论框显示
      this.setData({
        loginShow:false
      })
  
      this.setData({
              modalShow:true
            })
    
  
    },  
    onLoginFail(){
      // console.log("fail");
      wx.showModal({
          title:'微信授权',
          content:'微信授权用户才能发布'
        })
    },
  },
})
