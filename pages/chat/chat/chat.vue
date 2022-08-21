<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-top="scrollTop" 
			:scroll-into-view="scrollToView" @scrolltoupper="loadHistory"
				upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-if="loadState">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				
				
				<view class="row" v-for="(item,index) in messageList" :key="item.id" :id="item.id">
					
					<!-- 时间显示 -->
					<!-- <view v-if="showTime(item.time,messageList[index-1].time)" class="flex justify-center align-center pb-4 pt-2">
						<text class="font-sm text-light-muted">{{ showTime(item.time,messageList[index-1].time) }}</text>
					</view> -->
					
					<!-- 撤回消息 -->
					<view v-if="item.isremove" class="flex justify-center align-center pb-4 pt-1">
						<text style="font-size: 26rpx;color: #A9A5A0;">{{ isself ? '你' : '对方' }}撤回了一条信息</text>
					</view>
					
					
					<!-- 用户消息 -->
					<block v-if="!item.isremove">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="item.flow=='out'">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<text v-if="!item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #FE7130;">未读</text>
								<text v-if="item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #A9A5A0;">已读</text>
								<!-- <view v-if="item.type==TIM.TYPES.MSG_TEXT" class="bubble"> -->
								<view v-if="item.type=='TIMTextElem'" class="bubble">
									<rich-text :nodes="nodesFliter(item.data)"></rich-text>
								</view>
							</view>
							<!-- 右-头像 -->
							<!-- <view class="right"> -->
							<view class="right">
								<image :src="userInfo.img"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-else>
							<view class="left">
								<image :src="toUserInfo.avatar"></image>
							</view>
							<view class="right">
								<!-- <text v-if="!item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #FE7130;">未读</text>
								<text v-if="item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #A9A5A0;">已读</text> -->
								<view class="username">
									<view class="name">{{toUserInfo.nick}}</view>
									<view class="time">{{timeFliter(item.time)}}</view>
								</view>
								<view v-if="item.type=='TIMTextElem'" class="bubble">
									<rich-text :nodes="nodesFliter(item.data)"></rich-text>
									<!-- <text>已读</text> -->
								</view>
								
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage">
						<view class="icon tupian2"></view>
					</view>
					<view class="box" @tap="camera">
						<view class="icon paizhao"></view>
					</view>
					<view class="box" @tap="handRedEnvelopes">
						<view class="icon hongbao"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']"
					@touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd"
					@touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" />
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view :class="textMsgState?'btn-yes':'btn'">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''">
				<view class="icon luyin2"></view>
			</view>
			<view class="cancel" :class="willStop?'':'hidden'">
				<view class="icon chehui"></view>
			</view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image src="/static/img/im/face/face_1.jpg"></image>
					</view>
					<view class="from">来自{{redenvelopeData.from}}</view>
					<view class="blessing">{{redenvelopeData.blessing}}</view>
					<view class="money">{{redenvelopeData.money}}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	// import userList from '@/common/tim/user.js'
	import $T from '@/common/free-lib/time.js';//格式化时间
	import emojiList from '@/common/commen.js'
	import {
		mapState
	} from "vuex";

	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),//当前用户资料信息
				toUserInfo: this.$store.state.im.toUserInfo,//聊天对象的资料信息
				conversationID:'',//聊天对象的编号
				IsIOS:false,
				//TIM变量
				loadState: true, //是否显示加载动画
				isCompleted: false, // 表示是否已经拉完所有消息。
				conversationActive: null,
				toUserId: '',
				// toUserInfo: null,
				nextReqMessageID: '',
				count: 15,
				// isCompleted: '',
				msgList: [],
				messageList:[],
				TIM: this.$tim,
				//文字消息
				textMsg: '',
				textMsgState: false,//文字非空状态
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgImgList: [],
				myuid: 0,
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: "手指上滑 取消发送",
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,
				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				// emojiList: this.$commen.emojiList,
				emojiList: emojiList,
				//红包相关参数
				windowsState: '',
				redenvelopeData: {
					rid: null, //红包ID
					from: null,
					face: null,
					blessing: null,
					money: null
				}
			};
		},
		computed: {
			...mapState({
				currentMessageList: state => state.currentMessageList,
				conversationList: state => state.im.conversationList,
				MessageReadList: state => state.im.MessageReadList,
				MessageRevoke: state => state.im.MessageRevoke
			})
			// ,
			// //显示的时间
			// showTime(time,pretime) {
			// 	console.log(time)
			// 	console.log(pretime)
			// 	// 时间和上条消息的时间
			// 	return $T.getChatTime(time,pretime);
			// }
		},
		watch: {
			currentMessageList(newVal, oldVal) {
				console.log('消息接收')
				console.log(newVal)
				// this.msgList = newVal
				// this.screenMsg(newVal, oldVal)
			},
			// 判断按钮发送状态
			textMsg(newVal,oldVal){
				if(newVal==''){
					this.textMsgState = false;
				}else{
					this.textMsgState = true;
				}
			},
			conversationList(val) {
				// console.log(val)
				this.InitData(val);
			},
			MessageReadList(newVal, oldVal) {
				//更新消息已读状态
				console.log('更新消息已读');
				// console.log(JSON.stringify(this.list))
				newVal.forEach(item => {
					// console.log(JSON.stringify(item));
					this.messageList.forEach(item1 => {
						item1.isPeerRead = true;
					});
				});
			},
			MessageRevoke(newVal, oldVal) {
				//更新撤回消息状态
				console.log('更新消息撤回');
				console.log(JSON.stringify(newVal));
				this.messageList.forEach(item => {
					if (item.ID === newVal[0].ID) {
						item.isremove = true;
					}
				});
			},
			// messageList(newVal, oldVal) {
			// 	this.InitData(newVal);
			// },
			// currentMessageList(newVal, oldVal) {
			// 	this.InitData(newVal);
			// },
		},
		onLoad(options) {
			// 动态修改标题
			uni.setNavigationBarTitle({
				title: options.name
			});
			// 获取用户缓存
			// this.userInfo = uni.getStorageSync('userInfo');
			// console.log(this.userInfo)
			this.toUserId = this.$store.state.im.toUserId
			// console.log(this.toUserId)
			this.conversationActive = this.$store.state.im.conversationActive
			// console.log(JSON.stringify(this.conversationActive.conversationID))
			this.getMsgList();
		},
		methods: {
			// 加载初始页面消息
			getMsgList() {
				
				this.messageList = [];//清空数据
				
				
				// 历史消息列表
				let conversationID = this.conversationActive.conversationID
				let promise = this.$tim.getMessageList({
					conversationID: conversationID,
					count: this.count
				});
				promise.then((res) => {
					// console.log(JSON.stringify(res.data.messageList))
					
					for(let i = 0;i<res.data.messageList.length;i++){
						let item = res.data.messageList[i];
						// console.log(JSON.stringify(item));
						let ChatItem = {};//消息显示
						// 文本消息
						if(item._elements[0].type=='TIMTextElem'){
							ChatItem = {
								id:item.ID,//唯一id
								type:item._elements[0].type,//消息类型
								// user_id:item.from,//用户id
								to: item.to,
								from: item.from,
								time:item.time,//消息创建时间(时间戳)
								flow:item.flow,//flow==out表示自己发出的消息，flow==in表示别人发出的消息
								data:item._elements[0].content.text,//聊天内容
								isremove: item.isRevoked, //是否撤回消息 默认false
								isPeerRead: item.isPeerRead //是否已读消息
							}
						}
						this.messageList.push(ChatItem);
					}
					// console.log(JSON.stringify(this.messageList))
					// 滚动到底部
					setTimeout(()=>{
						this.scrollTop = 9999;
					},300)
					
					// console.log(JSON.stringify(this.messageList));
					// this.$store.commit('InitMsgList', res.data.messageList);
					// this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
					// this.isCompleted = res.data.isCompleted; // 表示是否已经拉完所有消息。
				});
				
			},
			// 刷新数据
			InitData(newVal){
				console.log('刷新数据')
				// console.log(JSON.stringify(this.userInfo))
				// console.log(JSON.stringify(newVal))
				let item = newVal[0];
				let ChatItem = {
					id: item.conversationID+'-'+item.lastMessage.lastTime,
					type: item.lastMessage.type,
					to: this.userInfo.userId,
					from: item.lastMessage.fromAccount,
					time: item.lastMessage.lastTime,
					flow: 'in',
					//flow==out表示自己发出的消息，flow==in表示别人发出的消息
					data: item.lastMessage.payload.text,
					isremove: false, //是否撤回消息 默认false
					isPeerRead: false //是否已读消息
				}
				console.log(JSON.stringify(ChatItem))
				// 同步消息
				this.messageList.push(ChatItem);
				// 滚动到底部
				setTimeout(()=>{
					this.scrollTop += 1;
					// this.setMessageRead();
				},300)
				// this.setMessageRead();
				
				// this.messageList.push(newVal[0]);
			},
			//聊天的节点加上外层的div
			nodesFliter(str) {
				let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>'
				return nodeStr
			},
			//时间过滤
			timeFliter(timer) {
				let timeData = new Date(timer * 1000)
				let str = this.$commen.dateTimeFliter(timeData)
				return str
			},
			// 接受消息(定位消息)
			screenMsg(newVal, oldVal) {
				if (newVal[0].ID && oldVal[0].ID) {
					if (newVal[0].ID != oldVal[0].ID && newVal.length >= this.count) {
						this.$nextTick(() => {
							this.scrollToView = oldVal[0].ID
						});
					} else {
						this.$nextTick(() => {
							this.scrollToView = newVal[newVal.length - 1].ID
						});
					}
				} else {
					this.$nextTick(() => {
						this.scrollToView = newVal[newVal.length - 1].ID
					});
				}
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				console.log('加载更多')
				// 判断是否加载完成
				console.log(this.isCompleted)
				
				// this.isCompleted
				
				// 更多消息列表
				// let conversationID = this.conversationActive.conversationID
				// let promise = this.$tim.getMessageList({
				// 	conversationID: conversationID,
				// 	nextReqMessageID: this.nextReqMessageID,
				// 	count: this.count
				// });
				// promise.then((res) => {
				// 	this.$store.commit('unshiftCurrentMessageList', res.data.messageList)
				// 	this.nextReqMessageID = res.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
				// 	this.isCompleted = res.data.isCompleted
				// });
				// //这段代码很重要，不然每次加载历史数据都会跳到顶部
				// this.$nextTick(function() {
				// 	this.scrollToView = this.nextReqMessageID; //跳转上次的第一行信息位置
				// 	this.$nextTick(function() {
				// 		this.scrollAnimation = true; //恢复滚动动画
				// 	});
				// });
				// this.isHistoryLoading = false;
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}
				return content;
			},
			//更多功能(点击+弹出) 
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择图片发送
			chooseImage() {
				this.getImage('album');
			},
			//拍照发送
			camera() {
				this.getImage('camera');
			},
			//发红包
			handRedEnvelopes() {
				uni.navigateTo({
					url: 'HM-hand/HM-hand'
				});
				this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type) {
				this.hideDrawer();
				uni.chooseImage({
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image) => {
									console.log(image.width);
									console.log(image.height);
									let msg = {
										url: res.tempFilePaths[i],
										w: image.width,
										h: image.height
									};
									this.sendMsg(msg, 'img');
								}
							});
						}
					}
				});
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText() {
				if(!this.textMsgState){
					return
				}
				this.hideDrawer(); //隐藏抽屉
				if (!this.textMsg) {
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {
					text: content
				}
				this.sendMsg(msg, 'text');
				this.textMsg = ''; //清空输入框
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								let imgstr = '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return replacedStr;
			},
			// 发送消息
			sendMsg(content, type) {
				console.log(content)
				console.log(type)
				let message = this.$tim.createTextMessage({
					to: this.toUserId,
					conversationType: 'C2C',
					// conversationType: this.$TIM.TYPES.CONV_C2C,
					payload: {
						text: content.text
					}
				});
				// this.$store.commit('pushCurrentMessageList', message)
				let pomise = this.$tim.sendMessage(message)
				pomise.then(imResponse => {
					console.log('发送成功');
					
					// 发送成功
					console.log(imResponse);
					let item = imResponse.data.message;
					let ItemChat = {
						id: item.ID,
						type: item.type,
						to: item.to,
						from: item.from,
						time: item.time,
						flow: item.flow,
						data: item.payload.text,
						isremove: false, //是否撤回消息 默认false
						isPeerRead: false //是否已读消息
					}
					
					// 同步消息
					this.messageList.push(ItemChat);
					// 滚动到底部
					
					setTimeout(()=>{
						console.log('回到底部')
						this.scrollTop+=1;
					},300)
					// // 滚动到底部
					// setTimeout(()=>{
					// 	console.log('回到底部')
					// 	this.scrollTop = 9999;
					// },300)
					
					// // 滚动到底部
					// setTimeout(()=>{
					// 	// console.log('执行了')
					// 	this.scrollTop = 9999;
					// 	this.scrollAnimation = true;
					// },1000)
					
					// 滚动到底部
					// setTimeout(()=>{
					// 	console.log('执行了')
					// 	this.scrollTop = 9999;
					// 	this.scrollAnimation = true;
					// },500)
					
				})
				
			},
			// 添加文字消息到列表
			addTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg) {
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			// 打开红包
			openRedEnvelope(msg, index) {
				let rid = msg.content.rid;
				uni.showLoading({
					title: '加载中...'
				});
				console.log("index: " + index);
				//模拟请求服务器效果
				setTimeout(() => {
					//加载数据
					if (rid == 0) {
						this.redenvelopeData = {
							rid: 0, //红包ID
							from: "大黑哥",
							face: "/static/img/im/face/face.jpg",
							blessing: "恭喜发财，大吉大利",
							money: "已领完"
						}
					} else {
						this.redenvelopeData = {
							rid: 1, //红包ID
							from: "售后客服008",
							face: "/static/img/im/face/face_2.jpg",
							blessing: "恭喜发财",
							money: "0.01"
						}
						if (!msg.content.isReceived) {
							// {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
							this.sendSystemMsg({
								text: "你领取了" + (msg.userinfo.uid == this.myuid ? "自己" : msg.userinfo
									.username) + "的红包"
							}, 'redEnvelope');
							console.log("this.msgList[index]: " + JSON.stringify(this.msgList[index]));
							this.msgList[index].msg.content.isReceived = true;
						}
					}
					uni.hideLoading();
					this.windowsState = 'show';

				}, 200)
			},
			// 关闭红包弹窗
			closeRedEnvelope() {
				this.windowsState = 'hide';
				setTimeout(() => {
					this.windowsState = '';
				}, 200)
			},
			sendSystemMsg(content, type) {
				let lastid = this.msgList[this.msgList.length - 1].msg.id;
				lastid++;
				let row = {
					type: "system",
					msg: {
						id: lastid,
						type: type,
						content: content
					}
				};
				this.screenMsg(row)
			},
			//领取详情
			toDetails(rid) {
				uni.navigateTo({
					url: 'HM-details/HM-details?rid=' + rid
				})
			},
			// 预览图片
			showPic(msg) {
				uni.previewImage({
					indicator: "none",
					current: msg.content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg) {
				this.playMsgid = msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e) {
				if (e.touches.length > 1) {
					return;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({
					format: "mp3"
				}); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				this.recording = true;
				this.voiceTis = '松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
			// 录音被打断
			voiceCancel() {
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true; //不发送录音
				this.RECORDER.stop(); //录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {
				if (!this.recording) {
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				} else {
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e) {
				if (!this.recording) {
					return;
				}
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop(); //录音结束
			},
			//录音结束(回调文件)
			recordEnd(e) {
				clearInterval(this.recordTimer);
				if (!this.willStop) {
					console.log("e: " + JSON.stringify(e));
					let msg = {
						length: 0,
						url: e.tempFilePath
					}
					let min = parseInt(this.recordLength / 60);
					let sec = this.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					msg.length = min + ':' + sec;
					this.sendMsg(msg, 'voice');
				} else {
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			},
			// 消息已读
			setMessageRead(){
				// let ReadID = 'C2C' + this.toUserID;
				// console.log(ReadID);//C2C5
				//退出页面 将所有的会话内的消息设置为已读
				let Readpromise = this.$tim.setMessageRead({ conversationID: this.conversationActive.conversationID });
				Readpromise.then(imResponse => {
					console.log('全部已读');
					//调用上一个界面的消息列表刷新方法
					// 发送页
					uni.$emit('MsgRead', {});
					// 已读上报成功
				}).catch(imError => {
					// 已读上报失败
					console.warn('setMessageRead error:', imError);
				});
			}
		},
		// 页面卸载
		onUnload() {
			//退出页面 将系统的消息设置为已读
			let promise = this.$tim.setMessageRead({ conversationID: this.conversationActive.conversationID });
			promise.then(imResponse => {
				console.log('全部已读');
				//调用上一个界面的消息列表刷新方法
				// 发送页
				uni.$emit('MsgRead', {});
				// 已读上报成功
			})
			.catch(imError => {
				// 已读上报失败
				console.warn('setMessageRead error:', imError);
			});
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss";
</style>
