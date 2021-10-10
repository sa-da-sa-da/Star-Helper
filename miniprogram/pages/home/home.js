import api from '../../utils/api.js';
import {
  config
} from '../../utils/config.js'
const app = getApp()
Component({
  data: {
    TabCur: "Message_Type_System",
    cardCur: 0,
  },
  created() {
    this.SwiperList()
    this.IndexMessage()
    this.IndexMessageType()
  },
  methods: {
    SwiperList() {
      api.GET_Swiper_List.then(res => {
        this.setData({
          SwiperList: res
        })
      })
    },
    tabSelect(e) {
      app.globalData.IndexMessageType = e.currentTarget.dataset.id;
      this.setData({
        TabCur: e.currentTarget.dataset.id,
      })
      this.IndexMessage(e)
    },
    IndexMessageType() {
      api.GET_Message_Type.then(res => {
        this.setData({
          Message_Type: res.fields[4].enumElements
        })
      })
    },
    IndexMessage(e) {
      wx.cloud.database({
        env: config.EnvID
      }).collection('Message_List').where({
        Message_Type: app.globalData.IndexMessageType || this.data.TabCur
      }).get().then(res => {
        this.setData({
          Message_List: res.data
        })
      })
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    /*tz_swiper(e) {
      wx.navigateTo({
        url: "../../pages/details/article_details/article_details?id=" + e.currentTarget.dataset.url
      })
    },*/
    tz(e) {
      wx.navigateTo({
        url: "/pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})