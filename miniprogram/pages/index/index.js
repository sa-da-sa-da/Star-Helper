// miniprogram/pages/index/index.js
import Pro from "../../utils/request.js"
const app = getApp()
import {
  config
} from "../../utils/config.js";
const db = wx.cloud.database({
  env: config.EnvID
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },

  /**
   * 主页底部tab事件，id由前端wxml传回
   */
  changeTab: function (e) {
    var id = e.currentTarget.dataset.id
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      id: id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  index_initial(options) {
    if (options.sign) {
      wx.navigateTo({
        url: "../../pages/user/sign/index"
      })
    }
    if (options.id_index) {
      this.setData({
        id: 2
      })
    }
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  onReachBottom(e){
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (this.data.id == 2) {
      return {
        path: '/pages/index/index?id_index=' + this.data.id,
        imageUrl: "../../images/logo.jpg",
      }
    } else {
      return {
        title: '',
        imageUrl: "../../images/logo.jpg",
      }
    }
  }
})