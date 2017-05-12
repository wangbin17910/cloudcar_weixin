//获取应用实例
var app = getApp()
var api = require('../../utils/api');
var util = require('../../utils/util');

Page({
  data: {
    banner: null,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    shopType: [],
    serviceType: []
  },
  /*
  * 首页banner
  */
  setBanner: function () {
    let that = this;
    api.getAdByType({
      data: {
        adpos: 3,
      },
      success: (res) => {
        that.data.banner = res.result;
        that.setData(that.data);
      },
    });
  },
  setTypeList: function() {
    var that = this;
    api.getWelfareTypeList({
      success: (res) => {
        for (var i = res.result.length - 1; i >= 0; i--) {
          if (res.result.showType == 1) {
            that.data.shopType.push(res.result[i];
          } else if (res.result.showType == 0) {
            that.data.serviceType.push(res.result[i];
          };
        };
        that.data.
      }
    });
  },
  /**
   * 入口
   */
  onLoad: function () {
    var that = this;
    that.setBanner();
  }
});