import Vue from 'vue'
import App from './App'

import store from './store'
Vue.prototype.$store = store //全局使用Vuex

// uview组件库 引入
import uView from "uview-ui";
Vue.use(uView);

import tim from '@/common/tim/tim.js'
Vue.prototype.$tim = tim.tim //tim sdk 引入后生成的tim服务

import TIM from 'tim-js-sdk' //tim 的状态/事件 常量
Vue.prototype.$TIM = TIM

import commen from '@/common/emoticon/emoticonlist';
Vue.prototype.$commen = commen;

Vue.config.productionTip = false

//请求
import {
	login,
	post,
	get
} from '@/common/api/http'
Vue.prototype.$login = login;
Vue.prototype.$post = post;
Vue.prototype.$get = get;

import permision from "@/common/wa-permission/permission.js"
Vue.prototype.$permision = permision;

//接口地址
import url from '@/common/api/config'
Vue.prototype.$url = url;

import CryptoJs from '@/node_modules/crypto-js/crypto-js.js' //加密算法
Vue.prototype.CryptoJS = CryptoJs //全局使用

// 联系人公用组件
import Contacts from '@/components/public/contacts.vue'
Vue.component('contacts', Contacts)

// 全局过滤器，如果文字内容为空显示【--】
Vue.filter('address', (val) => {
	return val ? val : '位置不详'
})

// 全局过滤器
// 如果文字内容为空显示【--】
Vue.filter('text', (val) => {
	return val ? val : '--'
})

// 如果文字内容为空显示【--】
Vue.filter('img', (val) => {
	// return val ? val : '/static/img/image_cover.png'
	return val ? val : 'http://oss.anjubang.cn/nopic.png'
})


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
