// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const wxContext = cloud.getWXContext()
const _ = db.command

exports.main = async (event, context) => {
  try {
    //记录用户点赞
    let Article_Like = await db.collection('Article_Like').where({
      _id: event.data.id + wxContext.OPENID
    }).count()
    //记录用户收藏
    let Artical_Star = await db.collection('Artical_Star').where({
      _id: event.data.id + wxContext.OPENID
    }).count()
    var data
    if(event.bl){
      data = await db.collection('Article_List').doc(event.data.id).get()
    }
    return {
      Article_Like: Article_Like.total==1? true : false,
      Artical_Star: Artical_Star.total==1? true : false,
      data:event.bl?data.data:''
    }
  }catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}