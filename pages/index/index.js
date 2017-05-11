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
    txtAds: null,
    advertise: null
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
        self.setData({
          banner: data.result
        });
      },
    });
  },
  /**
   * 首页两块子banner
   */
  setSubBanner: function(){
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/event/advertise/index', function (data) {
      that.setData({
        advertise: data.data
      });
    });
  },
  /**
   * 模块入口
   */
  setModule: function(){

  },
  /**
   * 入口
   */
  onLoad: function () {
    var that = this;
    that.setBanner();
    that.setTxtAds();
    that.setSubBanner();
    that.setModule();
  }
});