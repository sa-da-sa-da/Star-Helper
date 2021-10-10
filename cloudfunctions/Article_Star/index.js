// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database() // 初始化数据库
// 云函数入口函数
const _ = db.command
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let data = event.Article
  data._openid = wxContext.OPENID
  let start_data = await db.collection('Article_Star').where({Article_id: data._id,_openid:wxContext.OPENID}).get()
  if (start_data.data.length == 0) {
    await db.collection('Article_List').doc(data._id).update({
      data: {
        Article_Star: _.inc(1),
      },
    })
    data._id=data._id+wxContext.OPENID
    await db.collection('Article_Star').add({
      data
    })

    return "点赞成功"
  } else {
    await db.collection('Article_Star').where({Article_id: data._id,_openid:wxContext.OPENID}).remove()
    await db.collection('Article_List').doc(data._id).update({
      data: {
        Article_Star: _.inc(-1),
      },
    })
    return "取消点赞"
  }

}