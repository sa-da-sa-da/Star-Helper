// 云函数入口文件
const cloud = require('wx-server-sdk')
// cloud.init({ env: process.env.Env })
cloud.init({
  env: "star-school-1gooe0tvbd506600"
})
const Towxml = require('towxml');
const db = cloud.database()
const _ = db.command
const dateUtils = require('date-utils')

const towxml = new Towxml();
const COMMENT_TEMPLATE_ID = 'SIRYR9e5ZeGykIDESk3n2siOEYurx5DsQZdFYSr2BmI'

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
   
    case 'addPostComment': {
      return addPostComment(event)
    }
    case 'addPostChildComment': {
      return addPostChildComment(event)
    }
    case 'checkPostComment': {
      return checkPostComment(event)
    }
    default: break
  }
}
/**
 * 接入内容安全
 * @param {} event 
 */
async function checkPostComment(event) {
  try {
    console.log('待检测文本:' + event.content);
    let result = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    console.log('result:');
    console.log(result);
    if (result.errCode == 0) {
      return true;
    }
    return false
  } catch (err) {
    console.log(err);
    return false;
  }
}
/**
 * 新增评论
 * @param {} event 
 */
async function addPostComment(event) {

  console.info("处理addPostComment")
  console.info(process.env.author)
 
  if (process.env.author == event.commentContent.cOpenId) {
    event.commentContent.cNickName = event.commentContent.cNickName
  }

   let task = db.collection('mini_posts').doc(event.commentContent.postId).update({
     data: {
       totalComments: _.inc(1)
     }
  });

  event.commentContent.flag = 0
  await db.collection("mini_comments").add({
    data: event.commentContent,
    _openid:event.commentContent.cOpenId
  });
}

/**
 * 新增子评论
 * @param {} event 
 */
async function addPostChildComment(event) {

  let task = db.collection('press').doc(event.postId).update({
    data: {
      totalComments: _.inc(1)
    }
  });

  if (process.env.author == event.comments[0].cOpenId) {
    event.comments[0].cNickName = event.comments[0].cNickName
  }
  event.comments[0].flag = 0
  await db.collection('mini_comments').doc(event.id).update({
    data: {
      childComment: _.push(event.comments)
    }
  })
  await task;

  //如果同意
  if (event.accept == 'accept') {
    await db.collection("mini_subcribute").add({
      data: {
        templateId: COMMENT_TEMPLATE_ID,
        openId: event.comments[0].cOpenId,
        timestamp: new Date().getTime()
      }
    });
  }
}


