import config from "./config.js"
var Pro = require("./request.js");
const db = wx.cloud.database({
  env: config.EnvId
})
const _ = db.command
/**
 * 新增评论
 */
function addPostComment(commentContent, accept) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostComment",
      commentContent: commentContent,
      accept: accept
    }
  })
}

/**
 * 新增子评论
 * @param {} id 
 * @param {*} comments 
 */
function addPostChildComment(id, postId, comments, accept) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostChildComment",
      id: id,
      comments: comments,
      postId: postId,
      accept: accept
    }
  })
}

// 评论内容安全检查
function checkPostComment(content) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "checkPostComment",
      content: content
    }
  })
}

/**
 * 获取会员信息
 * @param {} openId 
 */
function getMemberInfo(openId) {
  return db.collection('User')
    .where({
      _openId: openId
    })
    .get()
}

/**
 * 获取评论列表
 * @param {} page 
 * @param {*} postId 
 */
function getPostComments(page, postId) {
  return db.collection('mini_comments')
    .where({
      postId: postId,
      flag: 0
    })
    .orderBy('timestamp', 'desc')
    .skip((page - 1) * 10)
    .limit(10)
    .get()
}
/**
 * 收藏点赞
 */
function getArticle_Like_Star(fun) {
  return wx.cloud.callFunction({
      name: 'Article',
      data: {
          fun: 'articleDetails',
      }
  })
}
/**
 * 获取文章
 */
function getArticleDetailsPro(fun) {
  return wx.cloud.callFunction({
      name: 'Article',
      data: {
          fun: 'articleDetailsPro'
      }
  })
}

module.exports = {
  GET_Swiper_List: Pro.Tree_get(db.collection('Swiper_List').limit(4)),
  GET_User: Pro.Tree_get(db.collection('User')),
  GET_Class: Pro.Tree_get(db.collection('Class')),
  GET_Article_Type: Pro.Tree_get(db.collection('wx-ext-cms-schemas').doc("14139e12615daf211166df2a0e6d644d")),
  GET_Message_Type:Pro.Tree_get(db.collection('wx-ext-cms-schemas').doc("14139e12616137c311debeb1772d69eb")),
  getPostComments: getPostComments,
  checkPostComment: checkPostComment,
  getMemberInfo: getMemberInfo,
  addPostChildComment: addPostChildComment,
  addPostComment: addPostComment,

  getArticle_Like_Star: getArticle_Like_Star,
  getArticleDetailsPro: getArticleDetailsPro,
}