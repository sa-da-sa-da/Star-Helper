// pages/home/downloadfile/publish/index.js
// pages/home/downloadfile/index.js
import {
  config
} from "../../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId,
})
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: [{
      value: ''
    }],
    time: '12:00',
    date: '2021-10-01',
  },
  onAddPhone: function () {
    var lists = this.data.lists;
    var newData = {
      value: ''
    };
    if (lists.length >= 3) {
      wx.showToast({
        title: '最多五个信息框',
        icon: 'error'
      })
    }
    if (lists.length < 5) {
      lists.push(newData);
      this.setData({
        lists: lists,
      })
    } else {
      wx.showToast({
        title: '不得超过五个',
        icon: 'error'
      })
    }
  },
  delList: function () {
    var lists = this.data.lists;
    if (lists.length <= 1) {
      wx.showToast({
        title: '不能删除默认输入框',
        icon: 'error'
      });
      return;
    }
    lists.pop();
    this.setData({
      lists: lists,
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.PickerList()
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    this.List_Member(e)
  },

  PickerList() {
    let userid = wx.getStorageSync('userInfo')
    console.log(userid)
    db.collection('Class').where({
      Class_Owner: userid._id
    }).get().then(res => {
      //将数据取出，并重新赋值给数组a[]
      let p = res.data
      let a = []
      for (var i in p) {
        a.push(p[i].Class_Name);
      }
      this.setData({
        picker: a
      })
    })
  },
  List_Member(e) {
    let userid = wx.getStorageSync('userInfo')
    db.collection('Class').where({
      Class_Owner: userid._id,
    }).get().then(res => {
      console.log(res.data[e.detail.value].Class_Member)
      db.collection('User').where({
          _openid: _.in(res.data[e.detail.value].Class_Member)
        }).get()
        .then(res => {
          console.log(res)
          this.setData({
            Member_List: res.data
          })
        })
        .catch(res => {
          wx.showToast({
            title: '未找到',
          })
        })
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

  }
})