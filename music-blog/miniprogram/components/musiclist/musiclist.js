// components/musiclist/musiclist.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    playId:-1
  },
  pageLifetimes:{
    show(){
       this.setData({
         playId: parseInt(app.getPlayMusicId())
       })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event){
      // console.log(event.currentTarget.dataset.musicid)
      const ds=event.currentTarget.dataset
      const musicid=ds.musicid
      this.setData({
        playId:musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${musicid}&index=${ds.index}`,
      })
    }
  }
})
