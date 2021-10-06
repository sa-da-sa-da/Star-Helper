var time = require('time.js');
function userInfo  (env) {
  const db = wx.cloud.database({  env })
  db.collection('User').get({
  success: function (res) {
    if (res.data.length > 0) {
      db.collection('User').doc( res.data[0]._id).update({
        data: {
          endtime: time.getCurrentTime()
        }
      })
      wx.setStorageSync('userInfo', res.data[0]);
    } else {
      db.collection('User').add({
        data: {
          addtime: time.getCurrentTime()
        },
        success: function (res) {
          console.log(res)
          wx.setStorageSync('userInfo', {id:res._id})
          setTimeout(function () {
           userInfo()
        }, 2000);
        }
      })
    }
    }
  })
}

module.exports = {
  userInfo
}


