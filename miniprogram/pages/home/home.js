import api from '../../utils/api.js';
import Pro from '../../utils/request.js';
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    popr: {
      type: Number,
      default: 0,
    },
  },
  data: {
    TabCur: 0,
    scrollLeft:0
  },
  ready(){
    this.initial()
  },
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
    },
    initial() {
      Pro.Class_Get(api.GET_Swiper_List).then(res => {
        this.setData({
          SwiperList: res
        })
      })
    },
    tz_swiper(e) {
      wx.navigateTo({
        url: "../../pages/details/article_details/article_details?id=" + e.currentTarget.dataset.url
      })
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    yg(){
      wx.navigateToMiniProgram({
        appId: "wx85e06ec2a5d5127e",
        },
      )
    },
    tz(e) {
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
    // 跳转到机器人页面
    jump_to_chatbot: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../home/" + e.currentTarget.dataset.url
      })
    },
  }
})
    