// components/PageArticleList/index.js
Component({

  properties: {

  },
  data: {
    // 是否还有数据
    nodata: true
  },
  properties: {
    list: {
      type: Object,
      default: ''
    },
    loding: {
      type: Boolean,
      default: true
    },
    phb: {
      type: Boolean,
      default: false
    },
  },
  observers: {
    'list': function (list) {
      if (list) {
        this.setData({
          loding: false
        })
      }
    }
  },

  methods: {
    isCard(e) {
      this.setData({
        isCard: e.detail.value
      })
    },
    tz(e) {
      //console.log("../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})