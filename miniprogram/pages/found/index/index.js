// pages/found/index/index.js
import api from "../../../utils/api.js"
import { config } from "../../../utils/config.js";
const app = getApp()
Component({
  data: {
    TabCur:"Article_Type_TJ",
  },
  created() {
    this.FoundArticle()
    this.FoundArticleType()
  },
  
  methods: {
    tabSelect(e) {
      //console.log(e)
      app.globalData.ProType = e.currentTarget.dataset.id;
      this.setData({
        TabCur: e.currentTarget.dataset.id,
      })
      this.FoundArticle(e)
    },
    FoundArticle(e) {
      //console.log(e)
      wx.cloud.database({env: config.EnvID}).collection('Article_List').where({
        Article_Type: app.globalData.ProType||this.data.TabCur
      }).get().then(res => {
        console.log(res)
        this.setData({
          Article_List: res.data
        })
      })
    },
    FoundArticleType(){
      api.GET_Article_Type.then( res => {
        //console.log(res.fields[4].enumElements)
        this.setData({
          Article_Type:res.fields[4].enumElements
        })
      })
    },
    JumpSearchPages(e){
      wx.navigateTo({
        url: "/pages/found/" + e.currentTarget.dataset.url
      })
    }
  }
})