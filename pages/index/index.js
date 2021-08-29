import { getDateVal,monthToEn } from '../../utils/utils'
import { getToDayHot } from '../../services/index'

const _app = getApp()

Page({
  data: {
    iconShow:false,
    fly:false,
    date:null,
    detail:null,
    splashStatus:true,
    loading:true
  },
 
 async onLoad() {


  const { year, month,  day } = getDateVal()

   const formateMonth = month > 9 ? month: `0${month}`

   const formateDay = day > 9 ? day: `0${day}`

    const { data } = await getToDayHot(`${year}-${formateMonth}-${formateDay}`)

    this.setData({
      detail:{
        smImg:data.picture, //小图
        img:data.picture2, //大图
        note:data.note,  //文本
        content:data.content //翻译的文本
      },
      date:{
        year,
        month:monthToEn(month),
        day,
      }
    },()=>{

      this.setData({loading:false})

    })


    setTimeout(()=>{
      this.setData({splashStatus:false,iconShow:true})
      _app.globalData.splash = false
    },2500)
    
 
  },

  onReady(){
    this.$pageScroll = this.selectComponent('#pageScroll')
  },

  /**
   * 下拉刷新
   */
  handleRefresh(){
    setTimeout(()=>{
      this.$pageScroll.reset()
    },1000)
  },

  /**
   * 跳转到记录页面
   */
  handleToRecord(){
   wx.navigateTo({
     url: '../record/record',
   })
  },

  // 右上角分享
  onShareAppMessage(){

    return {
      title:`${this.data.detail.note}  一丨言`,
      imageUrl: this.data.detail.smImg,
      path: `/pages/index/index`
    }

  },

  /**
   * 分享
   */
  async handleShare(){

    const { detail } = this.data
    
    try{

      this.runAnimotion(async()=>{

        await this.selectComponent('#poster').createPoster('banner', { 
          ...detail
         })

        setTimeout(()=>{
          this.animate('#shareIcon', [{opacity:1,}],0,function(){}.bind(this))
        },1200)

      })

  
    }catch(e){

    }
   
  },

  // 下拉
  handleRefresh(){
    setTimeout(()=>{
      this.selectComponent('#pageScrollId').reset()
    },1500)

  },


  runAnimotion(fn){
    this.animate('#shareIcon', [
      {translateX:0, translateY: '0',transformOrigin:'50% 0 0',ease: 'ease-out' },
      {opacity:1, translateX:0, translateY:'-10%',transformOrigin:'50% 0 0',rotate:-110,ease: 'ease-in' },
      {opacity:0, translateX:-280, translateY:'-10%',transformOrigin:'50% 0 0',rotate:-110,ease: 'ease-in-out' },
    ], 800, function () {
      this.clearAnimation('#shareIcon', { opacity:false,translateX: true, translateY: true,transformOrigin: true,rotate: true }, function () {
        typeof fn === 'function' && fn()
      })

    }.bind(this))
  },
  
})
