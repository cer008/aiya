Component({
  data: {
    searchValue:'',
    name:'张三',
    mobilePhone:'13313131313',
    opeDate:'2019-12-12',
    sex:0,
    list: [
      { name: '张三', sex:0,mobilePhone: '13342488888', opeDate:'2019-12-12'},
      { name: '李四', sex: 1, mobilePhone: '13342480000', opeDate: '2019-11-11' }
    ]
  },
  methods: {
    onCancel(e) {
      this.setData({
        searchValue: ''
      })
    },
    onSearch(e){
      let searchValue = e.detail;
      console.log(searchValue)
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: App.globalData.baseUrl + 'test',
            method: 'POST',
            header: {
              'Authorization': 'Bearer' + res.data,
              'content-type': 'application/json',
            },
            data: {
              token: res.data,
              searchValue: searchValue
            },
            success: function (res) {
              if (res.data.code === 200) {
                this.setData({
                  successInfo: '保存成功'
                })
                wx.navigateTo({
                  url: '/pages/work/work',
                })

              } else {
                this.setData({
                  errorInfo: '保存失败'
                })
              }
            }
          })
        }
      })
    },

    submitForm(e) {
      //const that = this;
      //console.log('form发生了submit事件，携带数据为：', this.formData)
      this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (valid) {
          console.log('form发生了submit事件，携带数据为：', this.data.formData)
          wx.getStorage({
            key: 'token',
            success: function(res) {
              wx.request({
                url: App.globalData.baseUrl + 'test',
                method: 'POST',
                header: {
                  'Authorization': 'Bearer' + res.data,
                  'content-type': 'application/json',
                },
                data: {
                  token: res.data,
                  data: this.data.formData
                },
                success: function(res) {
                  if (res.data.code === 200) {
                    this.setData({
                      successInfo: '保存成功'
                    })
                    wx.navigateTo({
                      url: '/pages/work/work',
                    })

                  } else {
                    this.setData({
                      errorInfo: '保存失败'
                    })
                  }
                }
              })
            }
          })

        } else {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
        }
      })
    }

  }
})