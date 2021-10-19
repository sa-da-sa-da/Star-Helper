// pages/found/index/index.js
import api from "../../../utils/api.js"
import {
  config
} from "../../../utils/config.js";
const db = wx.cloud.database({
  env: config.EnvID
})
const _ = db.command
const app = getApp()
Page({
  data: {
    TabCur: "Article_Type_TJ",
    page: 0,
    eachData: 20,
    list: [],
  },
  onLoad() {
    this.FoundArticleType()
    this.FoundArticle()
    console.log("list")
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1c2060',
      animation: {
        duration: 1
      }
    })
  },
  tabSelect(e) {
    app.globalData.FoundArticleType = e.currentTarget.dataset.id;
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      page: 0,
      list: []
    })
    this.FoundArticle(e)
  },
  onReachBottom(e) {
    this.FoundArticle() 
  },
  FoundArticle() {
    db.collection('Article_List').where({
      Article_Type: app.globalData.FoundArticleType || this.data.TabCur
    }).count().then(res => {
      this.setData({
        count: res
      })
      console.log(this.data.count, this.data.page, this.data.eachData)
      if (this.data.count.total >= this.data.page * this.data.eachData) {
        let eachData = this.data.eachData
        let page = this.data.page
        let list = this.data.list
        //console.log(eachData, page, list)
        //console.log(page, eachData)
        db.collection('Article_List').skip(eachData * page).limit(eachData).where({
            Article_Type: app.globalData.FoundArticleType || this.data.TabCur
          }).orderBy('_createTime', 'asc')
          .get().then(res => {
            let data = res.data
            console.log(res)
            data.forEach(res => {
              list.push(res)
            })
            console.log('list:', list)
            this.setData({
              Article_List: res.data,
              A_list: list,
              page: this.data.page + 1,
            })
          })
      } else {
        wx.showToast({
          title: '加载完毕',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  FoundArticleType() {
    api.GET_Article_Type.then(res => {
      //console.log(res.fields[4].enumElements)
      this.setData({
        Article_Type: res.fields[4].enumElements
      })
    })
  },
  JumpSearchPages(e) {
    wx.navigateTo({
      url: "/pages/found/" + e.currentTarget.dataset.url
    })
  },
  tz(e) {
    wx.navigateTo({
      url: "/pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
    })
  },
  goScrolltop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    //关闭当前非tabbar页面，跳转到应用内的某个页面
    //如果不行使用wx.reLaunch，关闭所有页面，打开到应用内的某个页面
    wx.redirectTo({
      //加载页面地址
      url: '/pages/found/index',
      success: function (res) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  }
})