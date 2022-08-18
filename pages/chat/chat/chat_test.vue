<template>
	<view class="content">
		<!-- 聊天 -->
		<!-- 聊天内容区域 -->
		<scroll-view scroll-y="true" :show-scrollbar="IsIOS" @scrolltoupper="loadHistory" upper-threshold="50"
			class="bg-light position-fixed left-0 right-0 top-0 pt-3" :style="chatBodyBottom">
			<!-- 顶部消息刷新提示 -->
			<view v-if="loadState" class="bg-light flex align-center justify-center">
				<image src="@/static/img/loading/loading-small.gif" mode="widthFix" style="width: 30rpx;height: 30rpx;">
				</image>
				<text class="font ml-1" style="color: #A9A5A0;">加载中...</text>
			</view>
			
			<view class="flex justify-center align-center pb-4 pt-2">
				<text class="font-sm text-light-muted">2011-01-01</text>
			</view>
			<view class="flex justify-center align-center pb-4 pt-1">
				<text style="font-size: 26rpx;color: #A9A5A0;">对方撤回了一条信息</text>
			</view>

			<template v-if="isself">
				<!-- 消息状态 -->
				<text v-if="!item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #FE7130;">未读</text>
				<text v-if="item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #A9A5A0;">已读</text>
				<!-- 三角图标 -->
				<text v-if="hasLabelClass" class="iconfont font-md position-absolute chat-right-icon" style="color: #6BEE68;">&#xe617;</text>
				<!-- <text v-if="hasLabelClass1" class="iconfont font-md position-absolute chat-right-icon" style="color: #FFFFFF;">&#xe617;</text> -->
				<!-- <view class="p-2 rounded mr-3 bg-chat-item" style="max-width:500rpx;"> -->
				<view class="p-2 rounded" style="max-width:500rpx;" :class="labelClass" :style="labelStyle">
					<!-- 文字 -->
					<!-- <text v-if="item.type === 'text'" class="font-md">{{ item.data }}</text> -->
					<rich-text v-if="item.type === 'text'" style="padding-top: 5rpx;" class="font-md text-chat" :nodes="messageHtml(item.data)"></rich-text>
			
					<!-- 表情包 || 图片 -->
					<!-- <image @click="preview(item)" @load="loadImage" v-if="item.type === 'emoticon' || item.type === 'image'" :src="item.data" lazy-load="true" mode="widthFix" style="width: 300rpx;height: 300rpx;" class="rounded"></image> -->
					<!-- <image @click="preview(item)" @load="loadImage" v-if="item.type === 'emoticon' || item.type === 'image'" :src="item.data" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image> -->
					<!-- 音频 -->
					<!-- <view v-else-if="item.type === 'audio'" class="flex align-center" @click="openAudio(item)">
						<text class="font">{{ item.options.time }}"</text>
						<image :src="!audioPlaying ? '/static/audio/audio3.png' : '/static/audio/play.gif'" style="width: 50rpx;height: 50rpx;" class="mx-1"></image>
					</view> -->
					<!-- 视频 -->
					<!-- <view @click="openVideo(item)" v-else-if="item.type === 'video'" class="position-relative">
						<image @load="loadImage" :src="item.options.poster" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded bg-hover-light"></image>
						<text class="iconfont text-white position-absolute" style="font-size: 80rpx;" :style="posterIconStyle">&#xe99a;</text>
					</view> -->
					
					<!-- 位置信息 -->
					<!-- <view @click="openAddress(item)" class="flex flex-column bg-white" v-else-if="item.type === 'location'" style="width: 460rpx;">
						<view class="flex flex-column pt-2 pl-2 pr-2">
							<text style="font-size: 34rpx;color: #101010;">{{item.data.split(',')[0]}}</text>
							<text class="mb-1" style="font-size: 24rpx;color: #999;">{{item.data.split(',')[1]}}</text>
						</view>
						<map @tap="openAddress(item)" style="width: 460rpx; height: 260rpx;" :enable-zoom="false" :enable-scroll="false" :markers="covers" :longitude="item.options.LocationAddress.split(',')[0]" :latitude="item.options.LocationAddress.split(',')[1]"></map>
					</view> -->
					
				</view>
				<!-- 头像 -->
				<free-avater size="80" :src="item.avatar"></free-avater>
			</template>


			<!-- 聊天信息列表组件 -->
			<!-- <block v-for="(item, index) in list" :key="item.ID">
				<free-chat-item
					ref="chatItem"
					:item="item"
					:MyUserId="MyUserId"
					:index="index"
					:pretime="index > 0 ? list[index - 1].create_time : 0"
					@long="long"
					@preview="previewImage"
				></free-chat-item>
			</block> -->
		</scroll-view>

	</view>
</template>

<script>
	import freeChatItem from '@/components/free-ui-2/free-chat-item.vue';
	import freeAvater from '@/components/free-ui-2/free-avater.vue';
	import parseHtml from '@/common/emoticon/htmlparser.js';
	export default {
		components: {
			freeChatItem,
			freeAvater
			// freeEmoticon,
			// freePopup
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.name
			});
			// this.cid = options.cid
			this.MyUserId = this.$store.state.im.MyUserId; //获取自己聊天编号
			this.toUserID = this.$store.state.im.toUserId; //获取聊天对象编号
			console.log(this.MyUserId)
			console.log(this.toUserID)
			
			let conversationID = 'C2C' + this.toUserID;
			this.list = []; //清空聊天列表
			this.TencentMessageList = []; //清空腾讯聊天记录
			
			// 打开某个会话时，第一次拉取消息列表 获取15条消息
			let promise = this.$tim.getMessageList({ conversationID: conversationID, count: 15 });
			promise.then(imResponse => {
				console.log(JSON.stringify(imResponse))
				// this.messageList = imResponse.data.messageList; // 消息列表。
				// // console.log(JSON.stringify(this.messageList));
				// this.$store.commit('InitMsgList', imResponse.data.messageList);
				// this.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
				// this.isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
				// console.log(this.isCompleted);
			});
			let ReadID = 'C2C' + this.toUserID;
			// console.log(ReadID);//C2C5
			//退出页面 将所有的会话内的消息设置为已读
			let Readpromise = getApp().$tim.setMessageRead({ conversationID: ReadID });
			Readpromise.then(imResponse => {
				// console.log('全部已读');
				//调用上一个界面的消息列表刷新方法
				// 发送页
				uni.$emit('MsgRead', {});
				// 已读上报成功
			}).catch(imError => {
				// 已读上报失败
				console.warn('setMessageRead error:', imError);
			});
			
			
			
		},
		data() {
			return {
				MyUserId: '',//自己的手机号
				toUserID: '',//对方的手机号
				KeyboardHeight:0,//高度
				isCompleted:false,//消息是否拉取完成
				// cid: '',
				IsIOS: false,
				loadState: true,
				list: [],
				MyUserId: '15882182484',
				isself: true,
				item: {
					ID: "C2C17360056365-633728924-1287657-1",
					avatar: "http://oss.anjubang.cn/Anjubang/2022/07/2022070516569506786640.jpg?x-oss-process=style/small",
					user_id: "15882182484",
					nickname: "帅气的军哥",
					type: "text",
					data: "hi, beauty",
					create_time: 1659232752,
					isremove: false,
					isPeerRead: false
				}
			}
		},
		computed: {
			// 聊天区域bottom
			chatBodyBottom() {
				console.log(this.KeyboardHeight)
				return `bottom:${uni.upx2px(105) + this.KeyboardHeight}px;`;
			},
			// 是否需要气泡样式
			hasLabelClass() {
				return this.item.type === 'text' || this.item.type === 'audio';
			},
			// 是否需要气泡样式
			hasLabelClass1() {
				return this.item.type === 'location';
			},
			labelStyle() {
				if (this.item.type === 'audio') {
					let time = this.item.options.time || 0;
					let width = parseInt(time) / (60 / 500);
					width = width < 150 ? 150 : width;
					return `width:${width}rpx;`;
				}
			},
			// 气泡的样式
			labelClass() {
				//是否本人
				if (this.isself) {
					// 是本人
					// 是否需要气泡
					// return this.hasLabelClass ? 'mr-3 bg-chat-item' : 'mr-3';
					if(this.item.type === 'location'){
						return this.hasLabelClass ? 'ml-3 bg-white' : 'ml-3';
					}else{
						return this.hasLabelClass ? 'mr-3 bg-chat-item' : 'mr-3';
					}
				} else {
					// 不是本人
					// 是否需要气泡
					// return this.hasLabelClass ? 'ml-3 bg-white' : 'ml-3';
					if(this.item.type === 'location'){
						return this.hasLabelClass ? 'mr-3 bg-chat-item' : 'mr-3';
					}else{
						return this.hasLabelClass ? 'ml-3 bg-white' : 'ml-3';
					}
				}
			},
		},
		methods: {
			loadHistory(e) {

				// 继续加载数据
				// this.loadState = true; //显示加载动画
				// this.LoadData();
				// 判断消息是否已经拉取完成
				console.log('滚动到顶部了！');
				// console.log(this.isCompleted)
				// if (!this.isCompleted) {

				// 	this.loadState = true; //显示加载动画
				// 	// 继续加载数据
				// 	this.LoadData();
				// }
			},
			messageHtml(html) {
				// console.log(html)
				//执行转换
				html = this.replaceEmoji(html);
				return parseHtml(html);
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				// UCGigi[墨镜][调皮] 就感觉成功
				// console.log(str)
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					// console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						if (row.alt == item) {
							//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
							//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
							let onlinePath = 'https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/emoticon/douyin/';
							let imgstr = '<img style="width:50rpx;height:50rpx;line-height: 50rpx;max-width: 100%;" src="' + onlinePath + row.url + '">';
							// console.log("imgstr: " + imgstr);
							return imgstr;
						}
					}
				});
				return replacedStr;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.chat-left-icon {
		left: 90rpx;
		top: 20rpx;
	}

	.chat-right-icon {
		right: 90rpx;
		top: 20rpx;
	}

	.chat-animate {
		/* #ifndef APP-PLUS-NVUE */
		opacity: 0;
		/* #endif */
	}

	.text-chat {
		background-color: #6bee68;
	}

	.LineBreak3 {
		lines: 3;
		text-overflow: ellipsis;
	}
</style>
