// 云函数入口文件
const cloud = require('wx-server-sdk')
exports.main = async (event, context) => {
  cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const db = cloud.database()
  const _ = db.command

  async function pota() {
    await db.collection('Article_List').doc(event.id).update({
      data: {
        Article_Temperature: _.inc(1),
      }
    })
    let details = await db.collection('Article_List').doc(event.id).get()
    return {
      details: details.data,
    }
  }
  return await pota()
}