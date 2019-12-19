//获取应用实例
const app = getApp();
import Notify from '@vant/weapp/notify/notify';
Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
      // app.userInfoReadyCallback = res => {
      //   this.setData({
      //     userInfo: res.userInfo,
      //     hasUserInfo: true
      //   })
      // } 
    }
    console.log("2")
    
  },
  getUserInfo: function (e) {
    console.log("123133")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.login();
    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })
  },

  but: function (e){
    Notify({ type: 'danger', message: '错误提示!' });
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
              Notify({ type: 'success', message: res.data.message });
              // Notify({
              //   text: '自定义配置',
              //   duration: 1000,
              //   selector: '#custom-notify',
              //   backgroundColor: '#1989fa'
              // })
              console.log(res)
            
            }
            else {
              Notify({ type: 'danger', message: res.data.message });
              console.log(res)
            }
          }
        })
      }
    })
  },

  login:function(){
    if (app.globalData.userInfo === null){
      wx.getUserInfo({
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo
          });
        }
      })
    }
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
              wx.switchTab({
                url: '/pages/work/work',
              })
            }
          })
        } else {
          console.log('登录失败！' + res.data.message)
          Notify({ type: 'danger', message: res.data.message });
        }
      }
    })
  }
})