// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'暂未授权'
  },
  onTapQrCode(){
    wx.showLoading({
      title: '生成中',
    })
    wx.cloud.callFunction({
      name:'getQrCode'
    }).then((res)=>{
      console.log(res)
      const imgFileId=res.result
      wx.previewImage({
        urls: [imgFileId],
        current:imgFileId
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   // 判断用户是否授权
   if(wx.getStorageSync('userInfo')){
    const userInfo=wx.getStorageSync('userInfo')
    this.setData({
      nickName:userInfo.detail.nickName,
      avatarUrl:userInfo.detail.avatarUrl
    })
  }
  else{
    wx.showModal({
      title:'请先授权'
    })
  }

    console.log("nickName",this.data.avatarUrl)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})