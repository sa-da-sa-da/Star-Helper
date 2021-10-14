const app = getApp()
import api from "../../../utils/api.js"
import {config} from "../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId
})
Component({
  data: {
    show: false,
    User_AvatarUrl: "https://s1.ax1x.com/2020/07/28/aAdel6.jpg",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    User_NickName: "游客",
    /*iconList: [{
      icon: 'profilefill',
      color: '#3963BC',
      name: '班级管理',
      url: 'Org_Manage/index'
    }, {
      icon: 'peoplefill',
      color: '#3963BC',
      name: '',
      url: ''
    }, {
      icon: 'taoxiaopu',
      color: '#3963BC',
      name: '班级服务',
      url:'Member_Manage/index'
    }],*/
    itemList: [{
        name: '修改信息',
        icon: 'discoverfill',color:'#3963BC',
        url: 'revise/index',
      }, {

        name: '创建班级',
        icon: 'friendfamous',color:'#3963BC',
        url: 'create/index',
      },{
        icon: 'profilefill',
        color: '#3963BC',
        name: '班级管理',
        url: 'Org_Manage/index'
      }, {
        name: '加入班级',
        icon: 'friendadd',color:'#3963BC',
        url: 'Join_Class/index',
      }, {
        name: '邀请成员',
        icon: 'add',color:'#3963BC',
        url: 'Join_Class/index',
      }],
    gridCol: 3,
    skin: false,
  },
  pageLifetimes: {
    show: function () {
      this.authorizer()
    },
  },
  options: {
    addGlobalClass: true
  },
  created() {
    console.log(this.data.iconList)
    this.authorizer()
  },
  methods: {
    sz() {
      wx.openSetting({
        success: function (res) {}
      })
    },
    UrlJump(e){
      console.log(e)
      wx.navigateTo({
        url: "/pages/user/" + e.currentTarget.dataset.url
      })
    },
    ql() {
      wx.showToast({
        title: '清理缓存成功',
        icon: 'none',
      })
      wx.clearStorage()
    },
    hideModal() {
      this.setData({
        show: false
      })
    },
    getUserProfile() {
      let userid = wx.getStorageSync('userInfo')
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          db.collection('User').doc(userid._id).update({
            data: {
              User_AvatarUrl: res.userInfo.avatarUrl,
              User_NickName: res.userInfo.nickName,
              User_Gender: res.userInfo.gender
            }
          }).then(res => {
            this.setData({
              show: false
            })
            this.authorizer()
          })
        }
      })
    },
    /*user_list() {
      Pro.Class_Cloud('').then(res => {
        this.setData({
          dz: res.dz,
          sc: res.sc,
          nt: res.nt
        })
      })
    },*/
    authorizer() {
      let that = this
      db.collection('User').get().then(res => {
        console.log(res)
        if (res.data[0].User_AvatarUrl) {
          console.log(res.data[0].User_AvatarUrl)
          that.setData({
            User_AvatarUrl: res.data[0].User_AvatarUrl,
            User_Name: res.data[0].User_Name,
            User_NickName: res.data[0].User_NickName,
            User_userin: res.data[0],
            User_add_time: res.data[0].User_addtime,
            User_openid: res.data[0].User_openid,
            User_Gender: res.data[0].User_Gender,
            User_Signature1: res.data[0].User_Signature1,
            User_Signature2: res.data[0].User_Signature2,
            User_Signature3: res.data[0].User_Signature3
          })
        } else {
          this.setData({
            show: true
          })
        }
      })
    }
  }
})