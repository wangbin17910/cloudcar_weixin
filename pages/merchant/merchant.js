//获取应用实例
var app = getApp()
var api = require('../../utils/api');
var util = require('../../utils/util');

Page({
  data: {
	merchantList:[],
    currentType:0, 
    pageNum:0
  },
  /*
  * 首页banner
  */
  getMerchantList: function () {
  	if(isClean) {
      this.data.pageNum = 0;
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
        welfaretype: that.data.currentType    
      },
      success: (res) => {
        that.data.merchantList = res.data.result;
        that.setData(that.data.merchantList);
      },
    });
  },
  setTypeList: function() {
    var that = this;
    api.getWelfareTypeList({
      success: (res) => {
        for (var i = res.data.result.length - 1; i >= 0; i--) {
        	var showType = res.data.result[i].showtype;
          if (showType == "1") {
            that.data.shopType.push(res.data.result[i]);
          } else if (showType == "0") {
            that.data.serviceType.push(res.data.result[i]);
          };
        };
        that.setData(that.data);
      }
    });
  },
  onPullDownRefresh:function(){
    this.getList(true, this.data.currentType)
  },

  onReachBottom: function() {
     this.getList(false, this.data.currentType)
  },

  onShareAppMessage: function() {
     return {
       title:'优惠普洗商家',
       path:'pages/merchant/merchant'
     }
 },

	gotoMerchantDetail: function (res) {
	    var id = res.currentTarget.dataset.value;
	    wx.navigateTo({
	        url: '../activitydetail/activitydetail?id=' + id
	    })
	    // console.log(e);
	},
  /**
   * 入口
   */
  onLoad: function (isClean) {
    var that = this;
    that.getMerchantList();
  }
});
