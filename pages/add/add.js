Component({
  data: {
    loading: false,
    color: '#000',
    background: '#f8f8f8',
    show: true,
    animated: false,
    showTopTips: false,
    successInfo:'',
    errorInfo:'',
    checkboxItems: [{
        name: '男',
        value: '0',
        checked: true
      },
      {
        name: '女',
        value: '1'
      }
    ],
    isAgree: false,
    formData: {},
    userName: "",
    birthday: "",
    region: "",
    rules: [{
      name: 'userName',
      rules: {
        required: true,
        message: '姓名不能为空'
      },
    }, {
      name: 'mobilePhone',
      rules: [{
        required: true,
        message: '手机号不能为空'
      }, {
        mobile: true,
        message: '手机号格式不正确'
      }],
    }, {
      name: 'address',
      rules: {
        required: true,
        message: '详细地址不能为空'
      },
    }]

  },
  methods: {
    sexChange: function(e) {
      this.setData({
        [`formData.sex`]: e.detail.value
      });
    },
    bindbirthdayChange: function(e) {
      this.setData({
        birthday: e.detail.value,
        [`formData.birthday`]: e.detail.value
      });
    },
    ageChange: function(e) {
      this.setData({
        [`formData.age`]: e.detail.value
      });
    },
    medicalRecordNoChange: function(e) {
      this.setData({
        [`formData.medicalRecordNo`]: e.detail.value
      });
    },
    mobilePhoneChange: function(e) {
      this.setData({
        mobilePhone: e.detail.value,
        [`formData.mobilePhone`]: e.detail.value
      });
    },
    phoneChange: function(e) {
      this.setData({
        [`formData.phone`]: e.detail.value
      });
    },
    regionChange: function(e) {
      this.setData({
        region: e.detail.value,
        [`formData.region`]: e.detail.value
      });
    },
    addressChange: function(e) {
      this.setData({
        [`formData.address`]: e.detail.value
      });
    },
    remarkBlur: function(e) {
      this.setData({
        [`formData.remark`]: e.detail.value
      });
    },
    bindDateChange: function(e) {
      this.setData({
        date: e.detail.value,
        [`formData.date`]: e.detail.value
      })
    },
    userNameChange(e) {
      // const { userName } = e.currentTarget.dataset
      this.setData({
        userName: e.detail.value,
        [`formData.userName`]: e.detail.value
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
                  date: this.data.formData
                },
                success: function(res) {
                  if (res.data.code === 200) {
                    this.setData({
                      successInfo: '保存成功'
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