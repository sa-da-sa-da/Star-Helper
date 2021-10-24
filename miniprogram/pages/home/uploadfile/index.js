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
    show: false
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
    let data = {
      User_Name: this.data.User_Name,
      User_StuID: this.data.User_StuID,
      User_Course: this.data.User_Course,
    }
    console.log(data)
    if (data.User_Name && data.User_StuID && data.User_Course) {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
      }).then(res => {
        console.log(res)
        let FileSize = res.tempFiles[0].size / 1024 / 1024
        this.setData({
          show: true,
          FileName: res.tempFiles[0].name,
          FileSize: FileSize.toFixed(2)
        })
        const tempFilePaths = res.tempFiles[0].path
        const fileName = res.tempFiles[0].name
        const FileExtensionNmae = fileName.substring(fileName.lastIndexOf('.') + 1);
        wx.cloud.uploadFile({
          cloudPath: "jj/" + data.User_StuID + " - " + data.User_Name + " - " + data.User_Course + "." + FileExtensionNmae, // 上传至云端的路径
          filePath: tempFilePaths,
        }).then(res => {
          let data = {
            User_Name: this.data.User_Name,
            User_StuID: this.data.User_StuID,
            User_Course: this.data.User_Course,
            fileID: res.fileID
          }
          db.collection('jjup').add({
            data,
          }).then({
            success: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '上传成功',
                icon:'success',
                duration:1500,
              })
            },
            fail: function(res){
              wx.showToast({
                title: '请重试',
                icon:'error',
                duration:1500,
              })
            }
          })
        })
        // tempFilePath可以作为img标签的src属性显示图片
      })
    } else {
      wx.showToast({
        title: '填写必要信息',
        icon: 'error',
        duration: 3000
      })
    }
  },
  Delete() {
    this.setData({
      show: false
    })
  },
})