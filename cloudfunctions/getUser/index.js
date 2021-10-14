const getUser = require('./getUser/index')
const getClassUser = require('./getClassUser/index')
exports.main = async (event, context) => {
  console.log(event)
  switch(event.Type){
    case 'getUser':
      return await getUser.main(event, context)
    case 'getClassUser':
      return await getClassUser.main(event, context)
  }
}