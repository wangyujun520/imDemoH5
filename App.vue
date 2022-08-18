<script>
export default {
	mounted() {
		/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
		 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
		 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
		 * */
		// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
		this.$tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
		// 收到新消息
		this.$tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
		// 会话列表更新
		this.$tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
			this.$store.commit('updateConversationList', event.data);
		});
		// 收到被踢下线通知
		this.$tim.on(this.$TIM.EVENT.KICKED_OUT, event => {
			// console.log('另一个设备登录')
			// // event.name - TIM.EVENT.KICKED_OUT
			// // event.data.type - 被踢下线的原因，例如:
			// //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
			// //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
			// //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。

			// // console.log(event.name);
			// // kickedOut
			// // console.log(event.data.type);
			// // multipleAccount

			// /////123
			
			// 清除缓存
			uni.removeStorageSync('token');
			uni.removeStorageSync('avatar');
			uni.removeStorageSync('nickname');
			uni.removeStorageSync('sign');
			uni.removeStorageSync('phone');
			
			// 强制跳转到登录界面
			uni.navigateTo({
				url: '/pages/Login/Login'
			});
			uni.showModal({
				title: '系统消息',
				content: '在其他设备登录，若不是本人，请修改密码！',
				confirmText: '修改', //确定按钮的文字，默认为"确定"，最多 4 个字符
				success: function(res) {
					if (res.confirm) {
						//跳转到修改密码页面界面
						uni.navigateTo({
							url:'/pages/Login/ForgetPassword'
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
						//不做处理
					}
				}
			});
			// ////123
		});
		// 收到 SDK 发生错误通知，可以获取错误码和错误信息
		this.$tim.on(this.$TIM.EVENT.ERROR, event => {
			// event.name - TIM.EVENT.ERROR
			// event.data.code - 错误码
			// event.data.message - 错误信息
			console.log(event.data);
		});
		// 网络状态发生改变（v2.5.0 起支持）。
		this.$tim.on(this.$TIM.EVENT.NET_STATE_CHANGE, event => {
			// event.name - TIM.EVENT.NET_STATE_CHANGE
			// event.data.state 当前网络状态，枚举值及说明如下：
			//     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
			//     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
			//    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
			console.log(event.name);
			console.log(event.data.state);
		});
		// SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
		this.$tim.on(this.$TIM.EVENT.MESSAGE_READ_BY_PEER, event => {
			// 触发已读
			this.$store.commit('updateMessageReadList', event.data);
		});
		// 收到消息被撤回的通知。使用前需要将 SDK 版本升级至v2.4.0或以上。
		this.$tim.on(this.$TIM.EVENT.MESSAGE_REVOKED, event => {
			// 触发消息撤回
			this.$store.commit('updateMessageRevoke', event.data);
		});
	},
	methods: {
		onReadyStateUpdate({ name }) {
			const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
			//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
			this.$store.commit('toggleIsSDKReady', isSDKReady);
			//sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
		},
		onReceiveMessage({ data: messageList }) {
			console.log(messageList);
			//根据消息列表请求聊天对象的用户信息 并完成数据拼接
			this.$store.commit('pushCurrentMessageList', messageList);
		}
	},
	onLaunch: function() {
		console.log('App Launch');
		
		// #ifdef APP-PLUS
		// 点击通知消息时，执行该事件
		plus.push.addEventListener('click', function(message) {
			console.log(JSON.stringify(message));
			//自定义内容获取
			// let payloads = message.plyload;
			try {
				//完成业务逻辑代码
			} catch (e) {
				//TODO handle the exception
			}
		});
		
		// 收到透传消息时，执行该事件
		plus.push.addEventListener('receive', function(message) {
			console.log(JSON.stringify(message));
			//自定义内容获取
			// let payloads = message.plyload;
			try {
				//完成业务逻辑代码
			} catch (e) {
				//TODO handle the exception
			}
		});
		// #endif
		
		
		// weex引入字体图标 nvue
		// #ifdef APP-NVUE
			const domModule = weex.requireModule('dom');
			domModule .addRule('fontFace', {
			    fontFamily: 'iconfont',
			    // src: "url('\https://at.alicdn.com/t/font_2618728_0blwzra4gh37.ttf?t=1627296225481\')"
			    src: "url('\https://at.alicdn.com/t/font_2109600_hw4c8xr3uf6.ttf?t=1654065111376\')"
			});
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'common/flexcss/free.css';

// 除了nvue全部引用
/* #ifndef APP-NVUE */
	// 引入uview组件库
	@import 'uview-ui/index.scss';
	/* 字体图标 */
	@import 'static/iconfont/iconfont.css';
	// 全局引入富文本scss
	@import 'common/flexcss/richtext.scss'; 
/* #endif */

/* nvue字体图标引入 */
/* #ifdef APP-NVUE */
.iconfont {
	font-family: iconfont;
}
/* #endif */

</style>
