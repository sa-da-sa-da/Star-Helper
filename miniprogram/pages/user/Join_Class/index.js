// pages/user/Join_Class/index.js
const app = getApp()
import {
  config
} from "../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvID
})
const _ = db.command
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
  SubMit_JoinBtn() {
    let data = {
      Class_Name: this.data.Class_Name,
      Class_ID: this.data.Class_ID
    }
    let userid = wx.getStorageSync('userInfo')
    console.log(userid)
    if (data) {
      db.collection('Class').where({
          Class_Name: data.Class_Name,
          Class_ID: data.Class_ID
        }).get().then(res => {
          console.log(res.data[0]._id)
          db.collection('Class').doc(res.data[0]._id).update({
            data: {
              Class_Member: _.addToSet(userid._id)
            },
            success: wx.showToast({
              title: '加入成功',
              icon:'success',
              duration: 2000
            }),
            fail:wx.showToast({
              title: '已经加入',
              icon:'error',
              duration: 2000
            })
          })
        })
        .catch(res => {
          wx.showToast({
            title: '未找到班级',
            icon: 'error',
            duration: 2000
          })
        })
    }
  }

})