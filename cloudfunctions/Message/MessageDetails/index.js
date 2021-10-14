// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
   /* let like = await db.collection('Article_Like').where({
      Article_id: event.id
    }).count()
    let star = await db.collection('Article_Star').where({
      Article_id: event.id
    }).count()*/
    var data
    if(event.bl){
      data = await db.collection('Article_List').doc(event.id).get()
    }
    return {
      /*like: like.total==1? true : false,
      star: star.total==1? true : false,*/
      data: event.bl?data.data:''
    }
}