// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  async function pota() {
    await db.collection('Article_List').doc(event.id).update({
      data: {
        Article_Temperature: _.inc(1),
      }
    })
    let Article_List = await db.collection('Article_List').doc(event.id).get()
    return {
      Article_details: Article_List.data,
    }
  }
  return await pota()
}