const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database() // 初始化数据库
const _ = db.command

exports.main = async (event, context) => {
  let ClassName = await db.collection('Class').doc(event.id).get()
  let MemberList = await db.collection('User').where(_.or({
    _openid: _.in(ClassName.data.Class_Member)
  },{
    _id: _.in(ClassName.data.Class_Member)
  }
  )).get()
  return {
    ClassName: ClassName.data.Class_Name,
    MemberList: MemberList.data
  }
}