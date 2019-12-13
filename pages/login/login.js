//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(11)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      }) 
    } else if (this.data.canIUse) {
      app.onLaunch.login();
      console.log(22)
      this.setData({
        hasUserInfo: false
      }) 
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})