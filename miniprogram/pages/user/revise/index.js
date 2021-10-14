// pages/user/revise/index.js
import api from "../../../utils/api.js"
import config from "../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId
})
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    User_Birth_Date: '2021-01-01',
    User_Region: ['', '', ''],
    imgList: [],
    modalName: null,
  },
  onLoad() {
    this.GetInfo()
  },
  GetInfo() {
    api.GET_User.then(res => {
      console.log('编辑个人资料：', res[0]);
      this.setData({
        User_Name: res[0].User_Name,
        User_StuID: res[0].User_StuID,
        User_Birth_Date: res[0].User_Birth_Date,
        User_Region: res[0].User_Region,
        User_School: res[0].User_School,
        User_Phone: res[0].User_Phone,
        User_Wx: res[0].User_Wx,
        User_Mail: res[0].User_Mail,
        User_Qq: res[0].User_Qq,
        User_Signature1: res[0].User_Signature1,
        User_Signature2: res[0].User_Signature2,
        User_Signature3: res[0].User_Signature3,
      })
    })
  },
  User_Name_Input(e) {
    this.setData({
      User_Name: e.detail.value
    })
  },
  User_StuID_Input(e) {
    this.setData({
      User_StuID: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      User_Birth_Date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      User_Region: e.detail.value
    })
  },
  User_School_Input(e) {
    this.setData({
      User_School: e.detail.value
    })
  },
  User_Phone_Input(e) {
    this.setData({
      User_Phone: e.detail.value
    })
  },
  User_Wx_Input(e) {
    this.setData({
      User_Wx: e.detail.value
    })
  },
  User_Mail_Input(e) {
    this.setData({
      User_Mail: e.detail.value
    })
  },
  User_Qq_Input(e) {
    this.setData({
      User_Qq: e.detail.value
    })
  },
  User_S1_Input(e) {
    this.setData({
      User_Signature1: e.detail.value
    })
  },
  User_S2_Input(e) {
    this.setData({
      User_Signature2: e.detail.value
    })
  },
  User_S3_Input(e) {
    this.setData({
      User_Signature3: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张背景吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  SubMit_Btn() {
    let data = {
      User_Name: this.data.User_Name,
      User_StuID: this.data.User_StuID,
      User_Birth_Date: this.data.User_Birth_Date,
      User_Region: this.data.User_Region,
      User_School: this.data.User_School,
      User_Phone: this.data.User_Phone,
      User_Wx: this.data.User_Wx,
      User_Mail: this.data.User_Mail,
      User_Qq: this.data.User_Qq,
      User_Signature1: this.data.User_Signature1,
      User_Signature2: this.data.User_Signature2,
      User_Signature3: this.data.User_Signature3,
    }
    console.log(data)
    if (data) {
      let userid = wx.getStorageSync('userInfo')
      console.log(userid)
      db.collection('User').doc(userid._id).update({
        data,
      }).then( res =>{
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
      }).catch(res=>{
        wx.showToast({
          title: '修改失败',
          icon: 'error',
          duration: 1000
        })
      })
      db.collection('User').where({
        _openid: userid._openid
      }).get().then(res => {
        this.setData({
          data
        })
      })
    }
  }
})