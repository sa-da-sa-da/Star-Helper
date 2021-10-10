const collect = require('./collect/index')
const details = require('./details/index')
const details_cs = require('./details_cs/index')
const details_news = require('./details_news/index')
const details_pro = require('./details_pro/index')
const list = require('./list/index')
const login = require('./login/index')
const postsService = require('./postsService/index')
const pro_collect = require('./pro_collect/index')
const pro_start = require('./pro_start/index')
const statr = require('./statr/index')
const user_browse = require('./user_browse/index')
const userlist = require('./userlist/index')
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'collect':
      return await collect.main(event, context)
    case 'details':
      return await details.main(event, context)
    case 'details_cs':
      return await details_cs.main(event, context)
    case 'details_news':
      return await details_news.main(event, context)
    case 'details_pro':
      return await details_pro.main(event, context)
    case 'list':
      return await list.main(event, context)
    case 'login':
      return await login.main(event, context)
    case 'postsService':
      return await postsService.main(event, context)
    case 'pro_collect':
      return await pro_collect.main(event, context)
    case 'pro_start':
      return await pro_start.main(event, context)
    case 'statr':
      return await statr.main(event, context)
    case 'user_browse':
      return await user_browse.main(event, context)
    case 'userlist':
      return await userlist.main(event, context)
  }
}