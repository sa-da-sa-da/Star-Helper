import config from "./config.js"
const db = wx.cloud.database({
  env: config.EnvId
})
const _ = db.command
module.exports = {
  GET_Swiper_List: {
    collec: 'Swiper_List',
    limit: 4
  },
  GET_User:{
    collec: 'User'
  },
  GET_Class:{
    collec: 'Class'
  },
}