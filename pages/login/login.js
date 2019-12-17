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
      //app.onLaunch.login();
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
  },
  butt:function(e){
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'http://172.24.112.176:8080/test',         
          method:'POST',
          header: {
            'Authorization': 'Bearer' + res.data,
            'content-type': 'application/json',
          },
          data: {
            token: res.data       
          },
          success: function (res) {
            if (res.data.code === 200) {
              console.log(res)
            }
            else {
              console.log(res.data.message)
            }
          }
        })
      }
    })
    
    // wx.request({
    //   url: 'http://172.24.112.176:8080/test',
    //   //method: "POST",//指定请求方式，默认get
    //   data: { code: 2010140, token: app.globalData.token},
    //   header: {
    //     //默认值'Content-Type': 'application/json'
    //     'content-type': 'application/json' //post
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // });
  }
})