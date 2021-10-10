// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const _ = db.command
exports.main = async (event, context) => {
  try {
    async function pota() {
      await db.collection('Article_List').doc(event.data.id).update({
        data: {
          Article_Temperature: _.inc(1),
        }
      })
      let Article_List = await db.collection('Article_List').doc(event.data.id).get()
      return {
        Article_details: Article_List.data,
      }
    }
    return await pota()
  }catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}