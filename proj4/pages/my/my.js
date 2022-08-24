// pages/my/my.js
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    nickName: "未登录",
    src:"/images/index.png",
  },

  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        let info = res.userInfo;
        this.setData({
          isLogin: true,
          src: info.avatarUrl,
          nickName: info.nickName
        })
        this.getMyFavorites();
      }
    })
  },
  getMyFavorites: function() {
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;

    let myList = [];
    for(var i = 0; i < num; i++) {
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    this.setData({
      newsList: myList,
      num: num - 1
    });
  },

  goToDetail: function(e) {
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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
    if(this.data.isLogin) {
      this.getMyFavorites()
    }
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