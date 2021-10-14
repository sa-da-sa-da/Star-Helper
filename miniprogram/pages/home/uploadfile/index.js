// pages/home/uploadfile/index.js
import {
  config
} from "../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId,
})
const app = getApp();
const _ = db.command
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  User_StuID_Input(e) {
    this.setData({
      User_StuID: e.detail.value
    })
  },
  User_Name_Input(e) {
    this.setData({
      User_Name: e.detail.value
    })
  },
  User_Course_Input(e) {
    this.setData({
      User_Course: e.detail.value
    })
  },
  upload(e) {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFiles
        wx.cloud.uploadFile({
          cloudPath: 'jj', // 上传至云端的路径
          filePath: tempFilePaths,
          name: this.data.User_StuID + ' - ' + this.data.User_Name + ' - ' + this.data.User_Course,
          success: (result) => {

          },
          fail: (res) => {},
          complete: (res) => {},
        })
        // tempFilePath可以作为img标签的src属性显示图片
        
      }

    })

  },

  SubMit_Btn() {
    let userid = wx.getStorageSync('userInfo')
    let data = {
      User_Name: this.data.User_Name,
      User_StuID: this.data.User_StuID,
      User_Course: this.data.User_Course,

    }
    if (data) {
      db.collection('jjup').add({
          data,
          success(res) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000
            })
          },
          fail(res) {
            wx.showToast({
              title: '提交失败',
              icon: 'error',
              duration: 1000
            })
          },
        }),
        db.collection('jjup').where({
          _openid: userid._openid
        }).get().then(res => {
          this.setData({
            data
          })
        })
    }
  }
})