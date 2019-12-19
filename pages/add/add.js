const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    activeNames: ['1'],
    sexs: ['男', '女'],
    popupBirthdayShow:false,
    popupSexShow: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },
  showBirthdayPopup() {
    this.setData({ popupBirthdayShow: true });
  },
  closeBirthdayPopup() {
    this.setData({ popupBirthdayShow: false });
  },
  showSexPopup() {
    this.setData({ popupSexShow: true });
  },
  closeSexPopup() {
    this.setData({ popupSexShow: false });
  },
  onConfirmSexs(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  onClickLeft() {
    wx.switchTab({
      url: '/pages/work/work',
    })
  },
  onClickRight() {
    wx.showToast({ title: '点击按钮', icon: 'none' });
  },
  onChangerRadio(event) {
    this.setData({
      radio: event.detail
    });
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },
  onShow() {
    //this.getTabBar().init();
  },
  onChange(event) {
    // this.setData({
    //   activeNames: event.detail
    // });
  },

  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})