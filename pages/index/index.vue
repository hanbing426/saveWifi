<template>
  <view class="content">
    <!--    <image class="logo" src="/static/logo.png"></image>-->
    <image class="logo" src="/static/wifiLogo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="gc-box">当前已连接：{{ connectedWifi.SSID }} </view>
    <view class="">
      <u-modal :show="show" :title="promptTitle" @confirm="confirm" :showCancelButton="true" @cancel="isShowFalse">
        <view class="slot-content">
          <u--form
              labelPosition="left"
              :model="model1"
              :rules="rules"
              ref="uForm"
              width="100"
          >
            <u-form-item
                label="wifi账号："
                prop="wifiInfo.wifiSSID"
                borderBottom
                ref="item1"
                labelWidth="80"
            >
              <u--input
                  v-model="model1.wifiInfo.wifiSSID"
                  border="none"
                  placeholder="请输入wifi账号"
              ></u--input>
            </u-form-item>
            <u-form-item
                label="wifi密码："
                prop="wifiInfo.wifiPassword"
                borderBottom
                ref="item2"
                labelWidth="80"
            >
              <u--input
                  v-model="model1.wifiInfo.wifiPassword"
                  border="none"
                  placeholder="请输入wifi密码"
              ></u--input>
            </u-form-item>
          </u--form>
        </view>
      </u-modal>
    </view>
    <view class="gc-box">
      <view v-for="(item,index) in wifiList" :key="index" class="item">
        <text class="title">{{ item.SSID }}</text>
        <u-button class="btn" @click="toConnectWifi(item)">连接</u-button>
      </view>
    </view>
    <view>
      <u-button @click="getWifiList" type="primary" text="获取wifi列表"></u-button>
    </view>
    <view>
      <u-button v-if="!isCd" @click="toSystemType" type="primary" text="连接wifi"></u-button>
    </view>
    <view>
      <u-button v-if="isCd" @click="toChangeWifi" type="primary" text="切换wifi"></u-button>
    </view>
    <view v-if="isCd">
      <u-button type="primary" @click="isConnected" :hairline="true"
                text="已连接的 Wi-Fi 信息"></u-button>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      isCd: false,
      title: '一键链接wifi测试',
      wifiList: [],
      show: false,
      promptTitle: "",
      content: "",
      connectedWifi: { SSID: '' }, // 存储当前已连接wifi
      model1: {
        wifiInfo: {
          /*wifiSSID: 'ChinaNet-5G-One', // 默认 Wi-Fi SSID  测试
          wifiPassword: '18585788789.', // 默认 Wi-Fi 密码  测试*/
          wifiSSID: '', // 默认 Wi-Fi SSID  正式
          wifiPassword: '', // 默认 Wi-Fi 密码  正式
        },
      },
      rules: {
        'wifiInfo.wifiSSID': {
          type: 'string',
          required: true,
          message: '请填写wifi账号',
          trigger: ['blur', 'change']
        },
        'wifiInfo.wifiPassword': {
          type: 'string',
          required: true,
          message: '请填写wifi密码',
          trigger: ['blur', 'change']
        },
      },
    };
  },
  onLoad() {
    this.onWifiConnected()
    this.toGetWifiList()
  },
  methods: {
    async getWifiList() {
      const authRes = await this.requestWifiPermission();
      if (!authRes) return;
      await this.startWifi();
      this.fetchWifiList();
    },
    async checkPermission() {
      const res = await uni.getSetting();
      if (res.authSetting['scope.userLocation']) {
        return true;
      } else {
        return false;
      }
    },
    async requestWifiPermission() {
      if (await this.checkPermission()) {
        return true; // 已授权，直接返回
      } else {
        return new Promise((resolve, reject) => {
          uni.showModal({
            title: '提示',
            content: '需要位置权限来获取 Wi-Fi 列表',
            showCancel: false,
            success: () => {
              uni.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.userLocation']) {
                    resolve(true);
                  } else {
                    reject(new Error('Permission denied'));
                  }
                }
              });
            }
          });
        });
      }
    },
    async startWifi() {
      const hasStart = await this.startWifi();
      if (hasStart !== true) return;
      // 继续获取 Wi-Fi 列表
    },
    fetchWifiList() {
      uni.getWifiList({
        success: (res1) => {
          console.log('获取wifi列表命令发送 成功', res1);
        },
        fail: (err) => {
          console.error('获取wifi列表 失败', err);
          uni.showModal({content: err.errMsg, showCancel: false});
        },
      });
    },
    toGetWifiList() {
      // 获取位置也就是相当于获取位置授权了
      uni.getLocation({
        success: () => {
          this.initWifi()
        }
      })

    },
    initWifi() {
      uni.startWifi({
        success: e => {
          // 获取wifi列表
          uni.getWifiList()
          // 监听获取到的wifi列表
          uni.onGetWifiList(res => {
            // 这里可以获取到wifi列表
            // ios需要手动打开系统的wifi，系统搜索到wifi后然后返回小程序才会有数据
            console.log("wifiList", res.wifiList)
            this.wifiList = res.wifiList
          })
        },
        fail: fail => {
          console.log("wififail", fail)
        }
      })
    },
    /*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    confirm() {
      if (!this.model1.wifiInfo.wifiSSID || !this.model1.wifiInfo.wifiPassword) {
        uni.showToast({
          title: '请填写所有字段',
          icon: 'none'
        });
        return;
      }
      this.showLoading(); // 显示加载提示
      this.isGetStartWifi();
    },
    toChangeWifi() {
      this.toSystemType()
    },
    toSystemType() {
      uni.getSystemInfo({
        success: (res) => {
          console.log("获取手机型号=", res);
          let system = '';
          if (res.platform === 'android') {
            console.log("你的系统是", res.platform);
            this.content = "是否允许手机连接WiFi";
            uni.showModal({
              title: '温馨提示',
              content: "系统：" + res.platform + "，允许手机连接WiFi",
              success: (res) => {
                if (res.confirm) {
                  this.show = true;
                } else {
                  uni.showToast({
                    title: '不允许手机连接WiFi',
                    icon: 'none'
                  });
                  return;
                }
              },
              fail: (error) => {
                console.log("不允许手机连接WiFi", error);
              }
            })
            system = res.osVersion;
          }
          if (res.platform === 'ios') {
            console.log("你的系统是", res.platform);
            system = res.osVersion;
          }
          if (res.platform === 'android' && system < 6) {
            uni.showToast({
              title: '手机版本不支持',
              icon: 'none'
            });
            return;
          }
          if (res.platform === 'ios' && system < 11.2) {
            uni.showToast({
              title: '手机版本不支持',
              icon: 'none'
            });
            return;
          }
          if (res.platform === "devtools") {
            this.show = true;
          }
        }
      });
    },
    isGetStartWifi() {
      // 连接 Wi-Fi 的逻辑
      uni.startWifi({
        success: (res) => {
          console.log("startWifi==>", res);
          this.connected();
        },
        fail: (error) => {
          console.log(error);
          uni.showToast({
            title: "链接失败",
            icon: 'error'
          });
        }
      });
    },
    isShowFalse() {
      this.show = false;
      this.isCd = false;
      // 重置 SSID 和密码
      this.model1.wifiInfo.wifiSSID = '';
      this.model1.wifiInfo.wifiPassword = '';
    },
    showLoading() {
      uni.showLoading({
        title: 'wifi链接中...',
        mask: true // 是否显示透明蒙层，防止触摸穿透
      });
    },
    connected() {
      uni.connectWifi({
        SSID: this.model1.wifiInfo.wifiSSID,
        password: this.model1.wifiInfo.wifiPassword,
        success: (res) => {
          uni.hideLoading(); // 隐藏加载提示
          uni.showToast({
            title: "wifi链接成功"
          });
          this.show = false;
          this.isCd = true;
        },
        fail: (error) => {
          uni.hideLoading(); // 隐藏加载提示
          uni.showModal({
            title: '链接失败，账号或密码错误！',
            content: error.errMsg,
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          this.isCd = false;
        }
      });
    },
    isConnected() {
      uni.getConnectedWifi({
        success: (res) => {
          uni.showModal({
            title: '已连接的 Wi-Fi 信息',
            content: "wifi名称:" + res.wifi.SSID,
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          console.log("获取已连接的 Wi-Fi 信息", res);
        },
        fail: (error) => {
          console.log("获取已连接的 Wi-Fi 信息失败", error);
        }
      });
    },
    toConnectWifi(wifi) {
      console.log('选中的wifi:', wifi)
      uni.connectWifi({
        SSID: wifi.SSID,
        password: this.password,
        success: (res) => {
          console.log('wifi连接命令发送 成功:', res)
        },
        fail: (err) => {
          console.error('wifi连接 失败:', err)
          uni.showModal({content: err.errMsg, showCancel: false})
        },
      })
    },
    /**  监听wifi连接状态 */
    onWifiConnected() {
      uni.onWifiConnected((res) => {
        console.log('监听wifi连接状态', res)
        this.connectedWifi = res.wifi
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.wifi-list-css {
  width: 100%;
  height: auto;
  border: 1px solid green;
  margin: 10rpx auto;
}

.wifi-name {
  width: 100%;
  height: auto;
  border: 1px solid red;
  margin: 10rpx auto;
}

.gc-box {
  width: 100%;
  height: auto;
  margin: 10rpx auto;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2rpx solid #ddd;
  padding: 16rpx 0;
}

.item .title {
  flex: 1;
}

</style>