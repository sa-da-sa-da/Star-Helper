// pages/work/search/index.js

import {
  config
} from '../../../utils/config.js'
const db = wx.cloud.database({
  env: config.EnvID
})
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: "",
    lists: [],
    showTips: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "搜索"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取input中的搜索内容
   */
  searchInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      searchContent: e.detail.value
    })
  },
  /**
   * 搜索
   */
  submitSearch: function (e) {
    let that = this;
    wx.showLoading({
      title: '搜索中...',
    })
    try {
      let searchContent = {}
      searchContent = db.RegExp({
        regexp: '.*' + that.data.searchContent,
        options: 'i',
      })
      //console.log(searchContent)
      // 正则表达式搜索
      db.collection('Article_List')
        .where(_.or([
          {
            Article_Content: searchContent
          },{
            Article_TiTle: searchContent
          },{
            Article_KeyWord: searchContent
          },{
            Article_Preface: searchContent
          }
      ]))
        .get({
          success: res => {
            console.log(res)
            if (res.data.length > 0) {
              that.setData({
                lists: res.data,
              })
            } else {
              that.setData({
                lists: [],
              })
              Dialog.alert({
                title: '温馨提示',
                message: '未搜索到相关内容，请尝试其他关键词搜索',
                theme: 'round-button',
              }).then(() => {
                // on close
              });
            }
            that.setData({
              showTips: false,
            })
          },
          fail: err => {
            console.log(err)
          }
        })
    } catch (err) {
      console.info(err)
    } finally {
      wx.hideLoading()
    }

  }
})