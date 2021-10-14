// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
    await db.collection('Message_List').doc(event.id).update({
      data: {
        Message_Pageviews: _.inc(1),
      }
    })
    const Message_List = await db.collection('Message_List').doc(event.id).get()
  return Message_List.data
}