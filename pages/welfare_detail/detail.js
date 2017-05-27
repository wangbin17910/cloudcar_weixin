//获取应用实例
var app = getApp()
var api = require('../../utils/api');
var util = require('../../utils/util');

Page({
  data: {
  	welfareId:0
  },
  getWelfareDetail: function() {
    var that = this;
    api.getWelfareDetail({
      data: {
        welfareid: that.data.welfareId,
      },
      success: (res) => {
        that.setData(res.data.result);
      }
    });
  },
  callService: function() {
  	wx.makePhoneCall({
      phoneNumber: '0310-5345888',
    })
  },
  callMerchant: function(view) {
  	var tel = view.currentTarget.dataset.value;
  	wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  /**
   * 入口
   */
  onLoad: function (option) {
  	this.data.welfareId = option.id;
    this.getWelfareDetail();
  }
});