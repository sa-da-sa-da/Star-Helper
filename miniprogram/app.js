var permission = require('/utils/permission.js');
var { config } = require('/utils/config.js');
App({
  config,
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: this.config.EnvId,
        traceUser: true,
      })
      this.config.db=wx.cloud.database({
        env: config.EnvId
      })
    }
    permission.userInfo(this.config.EnvId)
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData:{
    type:0
  }
})