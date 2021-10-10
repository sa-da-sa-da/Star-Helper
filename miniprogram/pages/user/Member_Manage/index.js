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
  data: {},
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
    }).get().then(res=>{
      console.log(res.data[e.detail.value].Class_Member)
      db.collection('User').where({
        _openid: _.in(res.data[e.detail.value].Class_Member)
      }).get()
      .then( res=> {
        console.log(res)
        this.setData({
          Member_List: res.data
        })
      })
      .catch(res=> {
        wx.showToast({
          title: '未找到',
        })
      })
    })
  }
})