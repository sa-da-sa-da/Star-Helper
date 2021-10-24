const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  let Thing2 = event.NoticeTitle
  let Thing1 = event.NoticeMesc
  let Thing4 = event.NoticeUser
  let Userdata = await db.collection('User').where(_.or({
    _openid: _.in(event.Class_Member)
  }, {
    _id: _.in(event.Class_Member)
  })).get()
  let lenth = Userdata.data.length
    for (let i = 0; i < lenth; i++) {
      const result = await cloud.openapi.subscribeMessage.send({
        touser: Userdata.data[i]._openid, //要推送给那个用户
        page: 'pages/home/notice/index', //要跳转到那个小程序页面
        data: { //推送的内容
          thing2: {
            value: Thing2
          },
          thing1: {
            value: Thing1
          },
          thing4: {
            value: Thing4
          }
        },
        templateId: '8xCh95BPQ00Ks8LEaaRU-3cUpPgTpD8DTTjKWpuB7zo' //模板id
      })
      console.log(result)
    }
}