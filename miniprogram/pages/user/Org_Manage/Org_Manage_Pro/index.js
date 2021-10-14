// pages/user/Org_Manage/Org_Manage_Pro/index.js
// pages/user/revise/index.js
import {
  config
} from "../../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId,
})
const app = getApp();
const _ = db.command
let Class_ID = ""
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],
    modalName: null,
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    this.GetOrgManage(options.id)
  },
  GetOrgManage(id) {
    db.collection('Class').doc(id).get().then(res => {
      console.log(res)
      this.setData({
        Class_Name: res.data.Class_Name,
        Class_School: res.data.Class_School,
        Class_Profession: res.data.Class_Profession,
        Class_Grade: res.data.Class_Grade,
        Class_ID: res.data.Class_ID,
      })
    })
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

  SubMit_Btn() {
    let userid = wx.getStorageSync('userInfo')
    if (this.data.Class_Name && this.data.Class_School && this.data.Class_Profession && this.data.Class_Grade) {
      let data = {
        Class_Name: this.data.Class_Name,
        Class_School: this.data.Class_School,
        Class_Profession: this.data.Class_Profession,
        Class_Grade: this.data.Class_Grade,
      }
      if (data) {
        console.log(data)
        db.collection('Class').where({
            Class_ID: this.data.Class_ID
          }).update({
            data,
            success(res) {
              db.collection('User').doc(data.Class_Owner).update({
                  data: {
                    User_Class: _.push({
                      each: [
                        [data.Class_ID]
                      ],
                      position: 0
                    })
                  }
                }),
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
          }),
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
            var pages = getCurrentPages(); //当前页面栈
            if (pages.length > 1) {
              var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
              beforePage.changeData(); //触发父页面中的方法
            }
          }, 1000);
      }
    } else {
      wx.showToast({
        title: '请填写完整',
        icon: 'error',
        duration: 1500
      })
    }
  }
})