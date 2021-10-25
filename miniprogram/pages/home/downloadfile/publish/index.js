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
  FileTitle_Input(e){
    this.setData({
      FileTitle: e.detail.value
    })
  },
  FileMescInput(e){
    this.setData({
      FileMesc: e.detail.value
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
  SubMit(){
    
  }
})