import api from '../../utils/api.js';
import {
  config
} from '../../utils/config.js'
const db = wx.cloud.database({
  env: config.EnvID
})
const _ = db.command
const app = getApp()
Component({
  data: {
    TabCur: "Message_Type_System",
    cardCur: 0,
    page: 0,
    eachData: 3,
    list: [],
    iconList: [{
      icon: 'discover',
      color: '#3963BC',
      name: '交作业',
      url: 'home/uploadfile/index'
    }, {
      icon: 'profilefill',
      color: '#3963BC',
      name: '班级管理',
      url: 'user/Org_Manage/index'
    }, {
      icon: 'peoplefill',
      color: '#3963BC',
      name: '成员管理',
      url: 'user/Member_Manage/index'
    }, {
      icon: 'taoxiaopu',
      color: '#3963BC',
      name: '班级服务',
      url: 'user/Member_Manage/index'
    }],
    gridCol: 4,
    skin: true,
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
    UrlJump(e) {
      console.log('/pages/' + e.currentTarget.dataset.url)
      wx.navigateTo({
        url: "/pages/" + e.currentTarget.dataset.url
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
    ContinueLoding() {
      this.IndexMessage()
    },
    IndexMessage(e) {
      db.collection('Message_List').where({
        Message_Type: app.globalData.IndexMessageType || this.data.TabCur
      }).count().then(res => {
        this.setData({
          count: res
        })
        //console.log(app.globalData.IndexMessageType)
        //console.log(res)
        //console.log(this.data.count, this.data.page, this.data.eachData)
        if (this.data.count.total >= this.data.page * this.data.eachData) {
          let eachData = this.data.eachData
          let page = this.data.page
          let list = this.data.list
          //console.log(eachData, page, list)
          //console.log(page, eachData)
          db.collection('Message_List').skip(eachData * page).limit(eachData).where({
              Message_Type: app.globalData.IndexMessageType || this.data.TabCur
            }).orderBy('_createTime', 'asc')
            .get().then(res => {
              let data = res.data
              //console.log(res.data)
              data.forEach(res => {
                list.push(res)
              })
              //console.log('list:', list)
              this.setData({
                Article_List: res.data,
                M_List: list,
                page: this.data.page + 1,
              })
              console.log(this.data.M_list)
            })
        } else {
          wx.showToast({
            title: '加载完毕',
            icon: 'none',
            duration: 2000
          })
        }
      })
      /*wx.cloud.database({
        env: config.EnvID
      }).collection('Message_List').limit(4).where({
        Message_Type: app.globalData.IndexMessageType || this.data.TabCur
      }).get().then(res => {
        this.setData({
          Message_List: res.data
        })
      })*/
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