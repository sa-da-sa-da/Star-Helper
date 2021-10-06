const app = getApp()
import api from "../../../utils/api.js"
import Pro from "../../../utils/request.js"
Component({
  data: {
    show: false,
    User_AvatarUrl: "https://s1.ax1x.com/2020/07/28/aAdel6.jpg",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    User_NickName: "游客",
    iconList: [{
      icon: 'profilefill',
      color: '#3963BC',
      name: '组织管理',
      url: '../Org_Manage/index'
    }, {
      icon: 'peoplefill',
      color: '#3963BC',
      name: '成员管理'
    }, {
      icon: 'taoxiaopu',
      color: '#3963BC',
      name: '操作记录'
    }],
    itemList: [{
        name: '修改信息',
        icon: 'discoverfill',color:'#3963BC',
        url: '../revise/index',
      }, {

        name: '创建班级',
        icon: 'friendfamous',color:'#3963BC',
        url: '../create/index',
      }, {
        name: '加入班级',
        icon: 'friendadd',color:'#3963BC',
        url: '../Join_Class/index',
      }, {
        name: '邀请成员',
        icon: 'add',color:'#3963BC',
        url: '',
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
    this.authorizer()
  },
  methods: {
    sz() {
      wx.openSetting({
        success: function (res) {}
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
          api.GET_User.doc = userid._id
          api.GET_User.update = {
            data: {
              User_AvatarUrl: res.userInfo.avatarUrl,
              User_NickName: res.userInfo.nickName,
              User_Gender: res.userInfo.gender
            }
          }
          Pro.Class_Get(api.GET_User).then(res => {
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
      Pro.Class_Get(api.GET_User).then(res => {
        console.log(res)
        if (res[0].User_AvatarUrl) {
          //this.user_list()
          console.log(res[0].User_AvatarUrl)
          that.setData({
            User_AvatarUrl: res[0].User_AvatarUrl,
            User_NickName: res[0].User_NickName,
            User_userin: res[0],
            User_add_time: res[0].User_addtime,
            User_openid: res[0].User_openid,
            User_Gender: res[0].User_Gender
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