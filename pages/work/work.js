//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: null,
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
    //获取定位
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
      }
    })
    //扫一扫
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  },
  onShow:function(){
    this.getTabBar().init();
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)
    console.log(this.data.hasUserInfo)
    console.log(this.data.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
       console.log(11)
      // wx.navigateTo({
      //   url: '/pages/work/work',
      // })
    } else if (this.data.canIUse) {
      console.log(22)
      this.setData({
        hasUserInfo: false
      })      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // wx.navigateTo({
        //   url: '/pages/work/work',
        // })
      }
    } else {
      console.log(33)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => { 
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.switchTab({
            url: '/pages/work/work',
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
      url: '/pages/work/work',
    })
  },
  clicktest:function(e){
    console.log("clicktest");
    console.log(app.globalData.userInfo)
    console.log(this.data.hasUserInfo)
    console.log(this.data.userInfo)
  }
})