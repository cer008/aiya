//app.js
import Notify from '@vant/weapp/notify/notify';
App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
    // wx.getUserInfo({
    //   withCredentials: true,
    //   success: function (res) {
    //     //此处为获取微信信息后的业务方法
    //     console.log('用户信息已授权')
    //     wx.navigateTo({
    //       url: '/pages/login/login',
    //     })
    //   },
    //   fail: function () {
    //     //获取用户信息失败后。请跳转授权页面
    //     wx.showModal({
    //       title: '警告',
    //       content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //           wx.navigateTo({
    //             url: '/pages/login/login',
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    console.log("app");
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {      
          console.log("getSetting")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId  
              this.globalData.userInfo = res.userInfo
              console.log("getSetting")
              
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
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