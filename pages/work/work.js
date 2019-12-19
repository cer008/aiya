//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: null,
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
   
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
    console.log("1")
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      console.log("userInfo存在1")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.login();
    } else if (this.data.canIUse) {
      console.log("canIUse")
      app.userInfoReadyCallback = res => {
        console.log('userInfoReadyCallback: ', res);
        console.log('获取用户信息成功');
        this.setData({
          userInfo: res
        })
      };
    }
    console.log("2")
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },
  clicktest:function(e){
    wx.navigateTo({
      url: '/pages/add/add',
    })
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
  }
})