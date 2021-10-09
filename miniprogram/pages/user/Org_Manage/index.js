// pages/user/Org_Manage/index.js
const app = getApp();
import {
  config
} from "../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId,
})
const _ = db.command
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  onLoad() {
    this.List_Class()
  },
  List_Class(e) {
    let userid = wx.getStorageSync('userInfo')
    let userid_id = userid._id
    console.log(userid._id)
    db.collection('Class').where({
      Class_Owner: userid._id,
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        Class_List_Create: res.data,
      })
    })
    db.collection('Class').where({
      Class_Member: _.all([userid_id])
    }).get().then(res => {
      console.log(res)
      this.setData({
        Class_List_Join: res.data,
      })
    })

    
  },


  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  // ListTouch触摸开始
  ListTouchStartPro(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMovePro(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEndPro(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalNamePro: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalNamePro: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
})