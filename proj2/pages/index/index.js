// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['北京市','北京市','东城区'],
    weather:{
      temp: 0,
      icon: '999' 
    }
  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value,
    })
    this.getWeather();
  },

  getWeather:function(){
    var that = this;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      data: {
        location: this.data.region[2],
        adm: this.data.region[1],
        key:'00cae4fb53ff4bdd976ed4bc6bb28ad9'
      },
      success:function(res){
        that.setData({weatherid: res.data.location[0].id})
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now?',
          data:{
            location: that.data.weatherid,
            key:'00cae4fb53ff4bdd976ed4bc6bb28ad9'
          },
          success:function(res){
            that.setData({weather:res.data.now})
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    this.getWeather();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})