//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    console.log("onLaunch")
    var logs = wx.getStorageSync('logs') || []
    //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://172.24.112.176:8080/login',
            //method: "POST",
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorage({
                key: "token",
                data: res.data.data
              })
              console.log(res.data);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }     
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {      
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("getUserInfo")
              // 可以将 res 发送给后台解码出 unionId  
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // wx.switchTab({
              //   url: '/pages/work/work',
              // })
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false
  }
})