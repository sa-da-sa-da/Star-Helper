// pages/user/revise/index.js
import {
  config
} from "../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId,
})
const app = getApp();
let Class_ID = ""
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],
    modalName: null,
  },

  onLoad() {
    this.getRandomClassID()
  },

  Class_Name_Input(e) {
    this.setData({
      Class_Name: e.detail.value
    })
  },
  Class_School_Input(e) {
    this.setData({
      Class_School: e.detail.value
    })
  },
  Class_Profession_Input(e) {
    this.setData({
      Class_Profession: e.detail.value
    })
  },
  Class_Grade_Input(e) {
    this.setData({
      Class_Grade: e.detail.value
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

  getRandomClassID() {
    const array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
      'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    for (let i = 0; i < 6; i++) {
      let id = Math.round(Math.random() * 35);
      Class_ID += array[id];
    }
    this.setData({
      Class_ID: Class_ID
    })
    return Class_ID;
  },

  SubMit_Btn() {
    if (this.data.Class_Name && this.data.Class_School && this.data.Class_Profession  && this.data.Class_Grade) {
      let userid = wx.getStorageSync('userInfo')
      let data = {
        Class_Name: this.data.Class_Name,
        Class_School: this.data.Class_School,
        Class_Profession: this.data.Class_Profession,
        Class_Grade: this.data.Class_Grade,
        Class_ID: Class_ID,
        Class_Owner: userid._id,
      }
      if (data) {
        db.collection('Class').add({
          data,
          success(res) {
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 1000
            })
          },
          fail(res) {
            wx.showToast({
              title: '创建失败',
              icon: 'error',
              duration: 1000
            })
          },
        }), setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000);
      }
    }else {
      wx.showToast({
        title: '请填写完整',
        icon: 'error',
        duration: 1500
      })
    }
  } 
})