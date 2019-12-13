Component({
	data: {
		active: 0,
		list: [
      {
        icon: '/image/sheet_8.png',
        text: '首页',
        url: '/pages/work/work'
      },
			{
        icon: '/image/sheet_39.png',
        text: '我的',
        url: '/pages/user/user'
			}
		
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
