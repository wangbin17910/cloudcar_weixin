//获取应用实例
var app = getApp()
var api = require('../../utils/api');
var util = require('../../utils/util');

Page({
  data: {
	merchantList:[],
    currentType:0, 
    pageNum:1,
    isNextPage:true,
    title:""
  },
  /*
  * 首页banner
  */
  getMerchantList: function (isClean) {
  	if(isClean) {
      this.data.pageNum = 1;
      if (this.data.merchantList.length > 0) {
      	this.data.merchantList.splice(0, this.data.merchantList.length);
      };     
    } else {
      this.data.pageNum += 1;
    }
    let that = this;
    api.getMerchantListByType({
      data: {
        startpage: that.data.pageNum,
        pagesize: 20,
        welfaretype: that.data.currentType,
        latitude: 0,
        longitude: 0
      },
      success: (res) => {
      	that.data.merchantList = that.data.merchantList.concat(res.data.result);
      	that.data.isNextPage = res.data.isNextPage;
        that.setData(that.data);
      },
      complete: () => {
		wx.stopPullDownRefresh()
      }
    });
  },
  onPullDownRefresh:function(){
    this.getMerchantList(true)
  },

  onReachBottom: function() {
  	if (this.data.isNextPage) {
		this.getMerchantList(false)
  	};
  },

  onShareAppMessage: function() {
    var that = this;
     return {
       title:that.data.title,
       path: 'pages/merchant/merchant?type=' + that.data.currentType + "&title=" + that.data.title
     }
 },

	gotoMerchantDetail: function (res) {
	    var id = res.currentTarget.dataset.value;
	    wx.navigateTo({
	        url: '../merchant_detail/detail?id=' + id
	    })
	},
  /**
   * 入口
   */
  onLoad: function (option) {
    var that = this;
    this.data.currentType = option.type;
    this.data.title = option.title;
    wx.setNavigationBarTitle({title:option.title});
    that.getMerchantList(true);
  }
});
