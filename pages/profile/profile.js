const App = getApp()

Page({
	data: {
		userInfo: {},
		items: [
			{
				icon: '../../images/iconfont-order.png',
				text: '我的福利',
				path: '/pages/order/list/index',
        show: false
			}, 
			{
				icon: '../../images/iconfont-addr.png',
				text: '每日签到',
				path: '/pages/address/list/index',
        show: false
			}, 
			// {
			// 	icon: '../../images/iconfont-kefu.png',
			// 	text: '我的折扣',
			// 	path: '18521708248',
			// }, 
			// {
			// 	icon: '../../images/iconfont-help.png',
			// 	text: '我的代金券',
			// 	path: '/pages/help/list/index',
			// },
		],
		settings: [
			{
				icon: '../../images/iconfont-about.png',
				text: '关于我们',
				path: '/pages/about/index',
        show: false
			}, 
		]
	},
	onLoad() {
		this.getUserInfo()
	},
	navigateTo(e) {
		const index = e.currentTarget.dataset.index
		// const path = e.currentTarget.dataset.path
		// App.WxService.navigateTo(path)
    switch(index) {
      case 0:
        wx.showModal({
          title: '提示',
          content: '没有福利记录',
          confirmColor: '#479de6',
          success: function (res) {

          }
        })
        break;
      case 1:
        wx.showModal({
          title: '提示',
          content: '签到成功',
          confirmColor: '#479de6',
          success: function (res) {

          }
        })
        break;
     }
    },
    aboutus() {
      wx.showModal({
        title: '关于我们',
        content: '云车致力于为车友提供有品质保证的福利、优惠、线上社交、线下优惠等服务。旨在成为车友提升生活品质的首选平台',
        confirmColor: '#479de6',
        success: function (res) {

        }
      })
    },
    getUserInfo() {
    	const userInfo = App.globalData.userInfo

		if (userInfo) {
			this.setData({
				userInfo: userInfo
			})
			return
		}

		App.getUserInfo(data => {
			console.log(data)
			this.setData({
				userInfo: data
			})
		})
    },
    logout() {
    	App.WxService.showModal({
            title: '友情提示', 
            content: '确定要登出吗？', 
        })
        .then(data => data.confirm == 1 && this.signOut())
    },
    signOut() {
    	App.HttpService.signOut()
    	.then(data => {
    		console.log(data)
    		if (data.meta.code == 0) {
    			App.WxService.removeStorageSync('token')
    			App.WxService.redirectTo('/pages/login/index')
    		}
    	})
    },
})