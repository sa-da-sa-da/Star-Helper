// pages/user/Member_Manage/Member_Manage_Pro/index.js
import {config} from "../../../../utils/config.js"
const app = getApp()
Page({
  data:{},
  onLoad(options){
    console.log(options)
    this.setData({
      id:options.id
    })
    this.UserInforMation(options.id)
  },
  UserInforMation(id){
    let that = this
    wx.cloud.callFunction({
      name: 'getUser',
      config:{
        env: config.EnvId
      },
      data:{
        Type: 'getUser',
        id: id,
      }
    }).then(res=>{
      this.setData({
        UserMem: res.result.data
      })
    })
  },
  saveContact(){
    let that = this.data.UserMem
    console.log(that)
    wx.addPhoneContact({
      nickName: that.User_NickName,
      firstName: that.User_Name,
      mobilePhoneNumber: that.User_Phone,
      weChatNumber: that.User_Wx,
      email: that.User_Mail,
      success() {},
      fail(e) {
        console.log(e)
        console.log('保存失败');
        wx.showToast({
          title: '保存失败',
          icon: 'error',
          duration: 1500,
        })
      }
    })
  }
})