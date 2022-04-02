

// components/progress-bar/progress-bar.js
let movableAreaWidth=0
let movableViewWidth=0
const backgroundAudioManger =wx.getBackgroundAudioManager()
let currentSes=-1 //currentSeconds
let duration=0  //song all time

let isMoving=false //show the progress is moving,拖动进度条和update冲突问题
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime:{
      currentTime:'00:00',
      totalTime:'00:00'
    },
    movableDis:0,
    progress:0,
  },

  lifetimes:{
    ready(){
      if(this.properties.isSame&&this.data.showTime.totalTime){
          this._setTime()
      }
      this._getMovableDis()
      this._bindBGMEvent()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
    if(event.detail.source=='touch'){
      this.data.progress=event.detail.x/(movableAreaWidth-movableViewWidth)*100
      this.data.movableDis=event.detail.x
      isMoving=true
    }
    },
    onTouchEnd(){
     const currentTimeFmt=this._dateFormat(Math.floor(backgroundAudioManger.currentTime))
      this.setData({
        progress:this.data.progress,
        movableDis:this.data.movableDis,
        ['showTime.currentTime']:currentTimeFmt.min+':'+currentTimeFmt.sec
      })
      backgroundAudioManger.seek(duration*this.data.progress/100)
      isMoving=false
    },
    _getMovableDis(){
      const query=this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect)=>{
          movableAreaWidth=rect[0].width
          movableViewWidth=rect[1].width
      })
    },
     _bindBGMEvent() {
      backgroundAudioManger.onPlay(() => {
        console.log('onPlay')
        isMoving = false
        this.triggerEvent('musicPlay')
      })

      backgroundAudioManger.onStop(() => {
        console.log('onStop')
      })

      backgroundAudioManger.onPause(() => {
        console.log('Pause')
        this.triggerEvent('musicPause')
      })

      backgroundAudioManger.onWaiting(() => {
        console.log('onWaiting')
      })

      backgroundAudioManger.onCanplay(() => {
        console.log('onCanplay')
        // console.log(backgroundAudioManager.duration)
        if (typeof backgroundAudioManger.duration != 'undefined') {
          this._setTime()
        } else {
          setTimeout(() => {
            this._setTime()
          }, 1000)
        }
      })

      backgroundAudioManger.onTimeUpdate(() => {
        if(!isMoving){

        }
        // console.log('onTimeUpdate')
        const currentTime=backgroundAudioManger.currentTime
        const duration=backgroundAudioManger.duration
        
        const sec=currentTime.toString().split('.')[0]
        if(sec!=currentSes){
          // console.log(currentTime)
          const currentTimeFmt=this._dateFormat(currentTime)
          this.setData({
            movableDis:(movableAreaWidth-movableViewWidth)*currentTime/duration,
            progress:currentTime/duration*100,
            ['showTime.currentTime']:`${currentTimeFmt.min}:${currentTimeFmt.sec}`
          })
          currentSes=sec
          //联动歌词
          this.triggerEvent('timeUpdate',{
            currentTime
          })
        }
  
    })

    backgroundAudioManger.onEnded((res)=>{
      console.log("onEnd")
      this.triggerEvent('musicEnd')
    })

    backgroundAudioManger.onError((res)=>{
      console.error(res.errMsg)
      console.error(res.errCode)
      wx.showToast({
        title: '错误'+res.errCode,
      })
    })
  },
    _setTime(){
      duration=backgroundAudioManger.duration
      console.log(duration)
      const durationFmt=this._dateFormat(duration)
      console.log(durationFmt)
      this.setData({
       ['showTime.totalTime']:`${durationFmt.min}:${durationFmt.sec}`
      })
    },
    _dateFormat(sec){
      const min=Math.floor(sec/60)
      sec=Math.floor(sec%60)
      return{
        'min':this._parse(min),
        'sec':this._parse(sec)
      }
    },
    _parse(sec){
      return sec<10?'0'+sec:sec
    }
  }
})
