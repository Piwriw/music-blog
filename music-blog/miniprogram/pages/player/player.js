// pages/player/player.js
let musiclist=[]

let nowPlayingIndex=0
//获取全局唯一的背景音频管理器
const backgroundAudioManger=wx.getBackgroundAudioManager()
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:"",
    isPlaying:false, //false不播放
    isLyricShow:false, //false不显示歌词
    lyric:'',
    isSame:false //true 表示是同一首歌曲
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
    nowPlayingIndex=options.index
    musiclist=wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicid)
  },
  _loadMusicDetail(musicId){
    if(musicId ==app.getPlayMusicId()){
      this.setData({
        isSame:true
      })
    }else{
      this.setData({
        isSame:false
      })
    }
 
    if (!this.data.isSame) {
      backgroundAudioManger.stop()

    }
    let music=musiclist[nowPlayingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title:music.name,
    })
    this.setData({
      picUrl:music.al.picUrl,
      isPlaying:false
    })

    app.setPlayMusicId(musicId)

    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url:'musicUrl'
      }
    }).then((res)=>{
      console.log(JSON.parse(res.result)) 
      let result=JSON.parse(res.result)
      if(result.data[0].url==null){
        wx.showToast({
          title: '无权限播放',
        })
        return
      }
      if(!this.data.isSame){
      
      backgroundAudioManger.src=result.data[0].url
      backgroundAudioManger.title=music.name
      backgroundAudioManger.coverImgUrl=music.al.picUrl
      backgroundAudioManger.singer=music.ar[0].name
      backgroundAudioManger.epname=music.al.name

      //保存播放历史
      this.savePlayHistory()
      }
    })

    this.setData({
      isPlaying:true
    })
    wx.hideLoading()

    //加载歌词
    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url:'lyric' 
      }
    }).then((res)=>{
      console.log(res)
      let lyric='暂无歌词'
      const lrc=JSON.parse(res.result).lrc
      if(lrc){
        lyric=lrc.lyric
      }
      this.setData({
        lyric
      })
    })
  },
  togglePlaying(){
    //playing
    if(this.data.isPlaying){
      backgroundAudioManger.pause()
    }else{
      backgroundAudioManger.play()
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    })
  },
  onPrev(){
    nowPlayingIndex--
    if(nowPlayingIndex<0){
      nowPlayingIndex=musiclist.length-1
    }
    this._loadMusicDetail(musiclist[nowPlayingIndex].id)
  },
  OnNext(){
    nowPlayingIndex++
    if(nowPlayingIndex===musiclist.length){
      nowPlayingIndex=0
    }
    this._loadMusicDetail(musiclist[nowPlayingIndex].id)
  },
  onChangeLyricShow(){
      this.setData({
        isLyricShow:!this.data.isLyricShow
      })
  },
  onPlay(){
    this.setData({
      isPlaying:true,
    }) 
  },
  onPause(){
    this.setData({
      isPlaying:false,
    })
  },
  /**
   * 保存播放历史
   */
  savePlayHistory(){
    const music=musiclist[nowPlayingIndex]
    const openid=app.globalData.openid
    const history=wx.getStorageSync(openid)

      console.log("his",history.constructor==Array )
    let bHave=false
    for(let i=0,len=history.length;i<len;i++){
      if(history[i].id==music.id){
        bHave=true
        break
      }
    }
    console.log(bHave)
    console.log(music)
    if(!bHave){
      history.unshift(music)
      wx.setStorage({
        key:openid,
        data:history,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  timeUpdate(event) {
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },
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