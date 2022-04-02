// pages/blog/blog.js
let keyword=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow:false, //控制底部
    userInfo:'',
    blogList:[]
  },
  /**
   * 发布
   */
    onPublish(){
       // 判断用户是否授权
      if(wx.getStorageSync('userInfo')){
        // console.log(wx.getStorageSync('userInfo'))
        this.onLoginSuccess(wx.getStorageSync('userInfo'))
      }
      else{
        this.setData({
          modalShow:true
        })
      }
    },
    onLoginSuccess(userInfo){

      wx.setStorageSync("userInfo",userInfo)
      const detail=userInfo.detail
      wx.navigateTo({
        url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`, 
      })
    },
    onLoginFail(){
      // console.log("fail");
      wx.showModal({
          title:'微信授权',
          content:'微信授权用户才能发布'
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拿出小程序码的内容
      // console.log(options.scene)

      this._loadBlogList()


      // const db=wx.cloud.database()
      // db.collection('blog').orderBy('create')
  },


  goComment(event){
      wx.navigateTo({
        url: '../../pages/blog-comment/blog-comment?blogid='+event.target.dataset.blogid,
      })
  },
  _loadBlogList(start=0){
    wx.showLoading({
      title: '拼命加载中',
    })

      wx.cloud.callFunction({
        name:'blog',
        data:{
          $url:'list',
          start,
          keyword:keyword,
          count:10
        }
      }).then((res)=>{
        // console.log("res",res)
        this.setData({
          blogList:this.data.blogList.concat(res.result)
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },
  onSearch(event){
    this.setData({
      blogList:[],
    })
    console.log(event)
    keyword=event.detail.keyword
     
    this._loadBlogList(0)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      this.setData({
        blogList:[]
      })
      this._loadBlogList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
        this._loadBlogList(this.data.blogList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event)
    let blogObj=event.target.dataset.blog.content
    return{
      title:blogObj.content,
      path:'/pages/blog-comment/blog-comment?blogid='+event.target.dataset.blogid,
      // imageUrl:''
    }
  }
})