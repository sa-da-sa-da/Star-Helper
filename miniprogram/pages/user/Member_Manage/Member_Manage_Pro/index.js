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
    console.log(id)
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

  }
})