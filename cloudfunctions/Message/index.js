//const MessageDetails = require('./MessageDetails/index')
const MessageDetailsPro = require('./MessageDetailsPro/index')
exports.main = async (event, context) => {
  switch (event.Type) {
    //case 'MessageDetails': 
    //  return await MessageDetails.main(event, context)
    case 'MessageDetailsPro': 
      return await MessageDetailsPro.main(event, context)
  }
}
