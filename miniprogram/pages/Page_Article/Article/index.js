//Study 页面文章组件
import {config} from "../../../utils/config.js"
const api = require('../../../utils/api.js');
const time = require('../../../utils/time.js')
const db = wx.cloud.database({
  env: config.EnvID
})
const app = getApp()
import f from "../replace"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    Article_Content: "",
    sc_show: false,
    dz_show: false,
    fx_show: true,
    data: {},
    commentContent: "",
    commentPage: 1,
    commentList: [],
    placeholder: "评论",
    focus: false,
    commentId: "",
    isFocus: false,
    // 用户头像，默认为改图片
    avatarUrl: "https://s1.ax1x.com/2020/07/28/aAdel6.jpg",
    nickName: "匿名用户",
    // 是否授权
    isLogin: false,
    show: false,
    backTop: false,
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.initial(options.id)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    this.details_cs()
  },
  pageLifetimes: {
    show: function () {
      this.sq()
    },
  },
  showModal: async function (e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    try {
      let that = this;
      if (that.data.nomore === true)
        return;
      let page = that.data.commentPage;
      let commentList = await api.getPostComments(page, that.data.Article._id)
      if (commentList.data.length === 0) {
        that.setData({
          nomore: true
        })
        if (page === 1) {
          that.setData({
            nodata: true
          })
        }
      } else {
        that.setData({
          commentPage: page + 1,
          commentList: that.data.commentList.concat(commentList.data),
        })
      }
    } catch (err) {
      console.info(err)
    } finally {
      wx.hideLoading()
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onPageScroll: function (e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTop = scrollTop > 100 ? true : false
    that.setData({
      backTop: backTop
    })
  },

  top() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  initial(id) {
    this.setData({
      loding: true
    })
    wx.cloud.callFunction({
      name: 'Article_details2',
      data: {
        id: id,
      }
    }).then(res => {
      console.log(res)
      console.log(res.result.Article_details)
      let result = res.result.Article_details.Article_Content
      this.setData({
        loding: false
      })
      result = f.replace(result)
      this.setData({
        Article_Content: result,
        Article: res.result.Article_details
      })
    })
  },

  
  
  statr_sc(e) {
    let userInfo = wx.getStorageSync("userInfo")
    if (userInfo._openid) {
      let that = this
      wx.showToast({
        title: 'Star加载中',
        icon: 'loading',
        mask: true,
        duration: 2000
      })
      //console.log(that.data)
      that.data.Article.Article_id = that.data.Article._id
      //console.log(that.data.Article)
      //console.log(e.currentTarget.dataset.id)
      wx.cloud.callFunction({
        name: e.currentTarget.dataset.id,
        data: {
          Article: that.data.Article
        }
      }).then(res => {
        wx.showToast({
          title: res.result,
          duration: 1000,
          icon: 'none',
          mask: true
        })
        this.details_cs(true)
      })
    } else {
      wx.showToast({
        title: '您尚未登录',
        duration: 1000,
        icon: 'none',
        mask: true
      })
    }
  },
  details_cs(bl) {
    //console.log(this.data.id)
    wx.cloud.callFunction({
      name: 'Article_details',
      data: {
        id: this.data.id,
        bl
      }
    }).then(res => {
      //console.log(res.result)
      if (bl) {
        this.setData({
          Article: res.result.data,
        })
      }
      this.setData({
        star_show: res.result.star,
        like_show: res.result.like
      })
    })
  },

  // input聚焦时
  onInputFocus() {
    this.setData({
      isFocus: true
    });
  },
  onShareAppMessage: function (res) {
    console.log(this.data.Article.Article_Img)
    this.setData({
      fx_show: false
    })
    return {
      title: this.data.Article.Article_TiTle,
      path: '/pages/Page_Article/Article/index?id=' + this.data.Article._id + "&share=true",
      imageUrl: this.data.Article.Article_Img || "",
    }
  },

  onShareTimeline: function (res) {
    console.log(res)
    return {
      title: this.data.Article.tille,
      imageUrl: this.data.Article.img
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      fx_show: true
    })
  },

  commentInput: function (e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  sq() {
    let that = this
    db.collection('User').get().then(res => {
      if (res) {
        console.log(res.data[0])
        that.setData({
          avatarUrl: res.data[0].User_AvatarUrl,
          nickName: res.data[0].User_NickName,
          userin: res.data[0],
        })
        console.log()
      } else {
        this.setData({
          show: true
        })
      }
    })
  },
  /**
   * 评论 new
   */
  submitCommend: async function (e) {
    await this.sq()
    if (this.data.show) {
      await this.getUserProfile();
    } else {
      let that = this
      let commentPage = 1
      let content = that.data.commentContent;
      if (content == undefined || content.length == 0) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 1500
        })
        return
      }
      console.log(content)
      // 提交评论的提示
      wx.showToast({
        title: '提交评论~',
        icon: 'loading',
        duration: 3000,
        success: async function () {
          let checkResult = await api.checkPostComment(content)
          if (!checkResult.result) {
            wx.showToast({
              title: '评论内容存在敏感信息',
              icon: 'none',
              duration: 2000
            })
            return
          }
          // 评论文章
          if (that.data.commentId === "") {
            console.log(that.data)
            var data = {
              postId: that.data.Article._id,
              cNickName: that.data.nickName,
              cAvatarUrl: that.data.avatarUrl,
              cOpenId: app.globalData.openid,
              timestamp: new Date().getTime(),
              createDate: time.formatTime(new Date()),
              comment: content,
              childComment: [],
              flag: 1,
            }
            await api.addPostComment(data, '')
          }
          // 评论别人的评论（子评论） 
          else {
            var childData = [{
              cOpenId: app.globalData.openid,
              cNickName: that.data.nickName,
              cAvatarUrl: that.data.avatarUrl,
              timestamp: new Date().getTime(), //new Date(),
              createDate: time.formatTime(new Date()),
              comment: content,
              tNickName: that.data.toName,
              tOpenId: that.data.toOpenId,
              flag: 1,
            }]
            await api.addPostChildComment(that.data.commentId, that.data.Article._id, childData, '')
          }
          let commentList = await api.getPostComments(commentPage, that.data.Article._id)
          if (commentList.data.length === 0) {
            that.setData({
              nomore: true
            })
            if (commentPage === 1) {
              that.setData({
                nodata: true
              })
            }
          } else {
            let Article = that.data.Article;
            Article.Article_Comment = Article.Article_Comment + 1
            that.setData({
              isFocus: false,
              commentPage: commentPage + 1,
              commentList: commentList.data,
              commentContent: "",
              nomore: false,
              nodata: false,
              Article: Article,
              commentId: "",
              placeholder: "评论",
              focus: false,
              toName: "",
              toOpenId: ""
            })
          }
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 500
          })
        }
      })
    }
  },
  /**
   * 失去焦点时
   * @param {*} e 
   */
  onReplyBlur: function (e) {
    let that = this;
    const text = e.detail.value.trim();
    if (text === '') {
      that.setData({
        isFocus: false,
        commentId: "",
        placeholder: "评论",
        toName: ""
      });
    }
  },
  /**
   * 点击评论内容回复
   */
  focusComment: function (e) {
    let that = this;
    let name = e.currentTarget.dataset.name;
    let commentId = e.currentTarget.dataset.id;
    let openId = e.currentTarget.dataset.openid;
    that.setData({
      commentId: commentId,
      placeholder: "回复" + name + ":",
      focus: true,
      toName: name,
      toOpenId: openId
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    // 触底加载评论
    wx.showLoading({
      title: '加载评论...',
    })
    try {
      let that = this;
      if (that.data.nomore === true)
        return;
      let page = that.data.commentPage;
      let commentList = await api.getPostComments(page, that.data.Article._id)
      if (commentList.data.length === 0) {
        that.setData({
          nomore: true
        })
        if (page === 1) {
          that.setData({
            nodata: true
          })
        }
      } else {
        that.setData({
          commentPage: page + 1,
          commentList: that.data.commentList.concat(commentList.data),
        })
      }
    } catch (err) {
      console.info(err)
    } finally {
      wx.hideLoading()
    }
  },
})