(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{159:function(n,e,t){"use strict";(function(n,e){var i=t(4);t(26);i(t(25));var o=i(t(160));n.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t(1)["default"],t(2)["createPage"])},160:function(n,e,t){"use strict";t.r(e);var i=t(161),o=t(163);for(var r in o)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(r);t(165);var s,u=t(32),c=Object(u["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,"57280228",null,!1,i["components"],s);c.options.__file="pages/index/index.vue",e["default"]=c.exports},161:function(n,e,t){"use strict";t.r(e);var i=t(162);t.d(e,"render",(function(){return i["render"]})),t.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),t.d(e,"components",(function(){return i["components"]}))},162:function(n,e,t){"use strict";var i;t.r(e),t.d(e,"render",(function(){return o})),t.d(e,"staticRenderFns",(function(){return s})),t.d(e,"recyclableRender",(function(){return r})),t.d(e,"components",(function(){return i}));try{i={uModal:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-modal/u-modal")]).then(t.bind(null,167))},"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,175))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,181))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,189))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,195))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var n=this,e=n.$createElement;n._self._c},r=!1,s=[];o._withStripped=!0},163:function(n,e,t){"use strict";t.r(e);var i=t(164),o=t.n(i);for(var r in i)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(r);e["default"]=o.a},164:function(n,e,t){"use strict";(function(n){var i=t(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(t(56)),r=i(t(58)),s={data:function(){return{isCd:!1,title:"一键链接wifi测试",wifiList:[],show:!1,promptTitle:"",content:"",model1:{wifiInfo:{wifiSSID:"",wifiPassword:""}},rules:{"wifiInfo.wifiSSID":{type:"string",required:!0,message:"请填写wifi账号",trigger:["blur","change"]},"wifiInfo.wifiPassword":{type:"string",required:!0,message:"请填写wifi密码",trigger:["blur","change"]}}}},onLoad:function(){this.toGetWifiList()},methods:{getWifiList:function(){var n=this;return(0,r.default)(o.default.mark((function e(){var t;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.requestWifiPermission();case 2:if(t=e.sent,t){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,n.startWifi();case 7:n.fetchWifiList();case 8:case"end":return e.stop()}}),e)})))()},checkPermission:function(){return(0,r.default)(o.default.mark((function e(){var t;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.getSetting();case 2:if(t=e.sent,!t.authSetting["scope.userLocation"]){e.next=7;break}return e.abrupt("return",!0);case 7:return e.abrupt("return",!1);case 8:case"end":return e.stop()}}),e)})))()},requestWifiPermission:function(){var e=this;return(0,r.default)(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.checkPermission();case 2:if(!t.sent){t.next=6;break}return t.abrupt("return",!0);case 6:return t.abrupt("return",new Promise((function(e,t){n.showModal({title:"提示",content:"需要位置权限来获取 Wi-Fi 列表",showCancel:!1,success:function(){n.openSetting({success:function(n){n.authSetting["scope.userLocation"]?e(!0):t(new Error("Permission denied"))}})}})})));case 7:case"end":return t.stop()}}),t)})))()},startWifi:function(){var n=this;return(0,r.default)(o.default.mark((function e(){var t;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.startWifi();case 2:if(t=e.sent,!0===t){e.next=5;break}return e.abrupt("return");case 5:case"end":return e.stop()}}),e)})))()},fetchWifiList:function(){n.getWifiList({success:function(n){console.log("获取wifi列表命令发送 成功",n)},fail:function(e){console.error("获取wifi列表 失败",e),n.showModal({content:e.errMsg,showCancel:!1})}})},toGetWifiList:function(){var e=this;n.getLocation({success:function(){e.initWifi()}})},initWifi:function(){var e=this;n.startWifi({success:function(t){n.getWifiList(),n.onGetWifiList((function(n){console.log("wifiList",n.wifiList),e.wifiList=n.wifiList}))},fail:function(n){console.log("wififail",n)}})},confirm:function(){this.model1.wifiInfo.wifiSSID&&this.model1.wifiInfo.wifiPassword?(this.showLoading(),this.isGetStartWifi()):n.showToast({title:"请填写所有字段",icon:"none"})},toChangeWifi:function(){this.toSystemType()},toSystemType:function(){var e=this;n.getSystemInfo({success:function(t){console.log("获取手机型号=",t);var i="";"android"===t.platform&&(console.log("你的系统是",t.platform),e.content="是否允许手机连接WiFi",n.showModal({title:"温馨提示",content:"系统："+t.platform+"，允许手机连接WiFi",success:function(t){t.confirm?e.show=!0:n.showToast({title:"不允许手机连接WiFi",icon:"none"})},fail:function(n){console.log("不允许手机连接WiFi",n)}}),i=t.osVersion),"ios"===t.platform&&(console.log("你的系统是",t.platform),i=t.osVersion),"android"===t.platform&&i<6||"ios"===t.platform&&i<11.2?n.showToast({title:"手机版本不支持",icon:"none"}):"devtools"===t.platform&&(e.show=!0)}})},isGetStartWifi:function(){var e=this;n.startWifi({success:function(n){console.log("startWifi==>",n),e.connected()},fail:function(e){console.log(e),n.showToast({title:"链接失败",icon:"error"})}})},isShowFalse:function(){this.show=!1,this.isCd=!1,this.model1.wifiInfo.wifiSSID="",this.model1.wifiInfo.wifiPassword=""},showLoading:function(){n.showLoading({title:"wifi链接中...",mask:!0})},connected:function(){var e=this;n.connectWifi({SSID:this.model1.wifiInfo.wifiSSID,password:this.model1.wifiInfo.wifiPassword,success:function(t){n.hideLoading(),n.showToast({title:"wifi链接成功"}),e.show=!1,e.isCd=!0},fail:function(t){n.hideLoading(),n.showModal({title:"链接失败，账号或密码错误！",content:t.errMsg,showCancel:!1,success:function(n){n.confirm&&console.log("用户点击确定")}}),e.isCd=!1}})},isConnected:function(){n.getConnectedWifi({success:function(e){n.showModal({title:"已连接的 Wi-Fi 信息",content:"wifi名称:"+e.wifi.SSID,showCancel:!1,success:function(n){n.confirm&&console.log("用户点击确定")}}),console.log("获取已连接的 Wi-Fi 信息",e)},fail:function(n){console.log("获取已连接的 Wi-Fi 信息失败",n)}})}}};e.default=s}).call(this,t(2)["default"])},165:function(n,e,t){"use strict";t.r(e);var i=t(166),o=t.n(i);for(var r in i)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(r);e["default"]=o.a},166:function(n,e,t){}},[[159,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map