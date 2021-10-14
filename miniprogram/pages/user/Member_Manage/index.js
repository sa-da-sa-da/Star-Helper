// pages/user/Member_Manage/index.js
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
  onLoad: function (options) {
    this.List_Member(options.id)
  },
  List_Member(id) {
    wx.cloud.callFunction({
      name: 'getUser',
      data:{
        Type: 'getClassUser',
        id: id
      }
    }).then(res=>{
      this.setData({
        Class_Name: res.result.ClassName,
        Member_List: res.result.MemberList
      })
    })
  },
  JumpMemberManagePro(e){
    wx.navigateTo({
      url: '../../user/Member_Manage/' + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id,
    })
    
  },

  changeData: function () {
    this.onLoad(); //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
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