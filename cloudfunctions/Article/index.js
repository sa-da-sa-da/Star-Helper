const articleDetails = require("./articleDetails/inedx")
const articleDetailsPro = require("./articleDetailsPro/index")

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event) => {
  switch (event.Type) {
    case 'articleDetails': 
      return await articleDetails.main(event, context)
    case 'articleDetailsPro': 
      return await articleDetailsPro.main(event, context)
    default:
      break
  }
}
