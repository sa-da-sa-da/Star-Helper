// pages/user/Join_Class/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  Class_Name_Input(e) {
    this.setData({
      Class_Name: e.detail.value
    })
  },
  Class_ID_Input(e) {
    this.setData({
      Class_ID: e.detail.value
    })
  },
  
})