// pages/user/Member_Manage/index.js
const app = getApp();
import {
  config
} from "../../../utils/config.js"
const db = wx.cloud.database({
  env: config.EnvId,
})
const _ = db.command
Page({
  data: {

  },
  onLoad: function (options) {

  },
  List
})