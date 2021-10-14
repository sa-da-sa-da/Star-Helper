const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database() // 初始化数据库
const _ = db.command

exports.main = async (event, context) => {
  const Userdata = await db.collection('User').doc(event.id).get()
  return Userdata
}