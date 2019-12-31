// pages/photo/photo.js
Page({
  beforeRead(event) {
    const {
      file,
      callback
    } = event.detail;
    callback(file.type === 'image');
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = this.data;
        fileList.push({ ...file,
          url: res.data
        });
        this.setData({
          fileList
        });
      }
    })
  },
  preview(event) {
    const that = this;
    let currentUrl = event.currentTarget.dataset.src;
    console.log(currentUrl)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: that.data.img // 需要预览的图片http链接列表
    })
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    const that = this;
    wx.chooseImage({
      count: 8,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '上传中',
        });
        let tempFilePaths = res.tempFilePaths;
        wx.getStorage({
          key: 'token',
          success: function(res) {
            wx.uploadFile({
              url: 'http://172.24.112.176:8080/upload', //仅为示例，非真实的接口地址
              header: {
                'Authorization': 'Bearer' + res.data,
                'content-type': 'multipart/form-data',
              },
              filePath: tempFilePaths,
              name: 'filePath',
              formData: {
                token: res.data   
              },
              success(res) {
                wx.hideLoading();
                if (res.data.code === 200) {
                  Notify({ type: 'success', message: res.data.message });
                  console.log(res)
                }
                else {
                  Notify({ type: 'danger', message: res.data.message });
                  console.log(res)
                }
                that.onLoad();
              }
            })
          },
        })
        
      }
    })
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:"",
    img: ['D:/0.png', 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg', 'D:/0.png'],
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill',
      src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
    }, {
      mode: 'aspectFit',
      text: 'aspectFit',
        src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
    }, {
      mode: 'aspectFill',
      text: 'aspectFill',
      src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
    }, {
      mode: 'top',
      text: 'top',
      src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
    }, {
      mode: 'bottom',
      text: 'bottom',
      src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
    }, {
      mode: 'center',
      text: 'center',
      src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})