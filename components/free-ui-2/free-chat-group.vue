<template>
	<view @longpress="long">
		<!-- 时间显示 -->
		<view v-if="showTime" class="flex justify-center align-center pb-4 pt-2">
			<text class="font-sm text-light-muted">{{ showTime }}</text>
		</view>
		<!-- 撤回消息 -->
		<view v-if="item.isremove" class="flex justify-center align-center pb-4 pt-1">
			<text style="font-size: 26rpx;color: #A9A5A0;">{{ isself ? '你' : '对方' }}撤回了一条信息</text>
		</view>
		<!-- 气泡 -->
		<view v-else class="flex align-start position-relative mb-3" :class="isself ? 'justify-end' : 'justify-start'">
			<!-- 好友 -->
			<template v-if="!isself">
				<!-- 头像 -->
				<free-avater size="80" :src="item.avatar"></free-avater>
				<!-- 三角图标 -->
				<text v-if="hasLabelClass" class="iconfont text-white font-md position-absolute chat-left-icon">&#xe609;</text>
				<!-- <view class="p-2 rounded ml-3 bg-white" style="max-width:500rpx"> -->
				<view class="flex flex-column">
					<!-- <text style="float: left;font-size: 22rpx;color: #888;" class="ml-3">吕布</text> -->
					<text style="float: left;font-size: 22rpx;color: #888;" class="ml-3">{{item.nickname}}</text>
					<view class="p-2 rounded" style="max-width:500rpx" :class="labelClass" :style="labelStyle">
						<!-- 文字 -->
						<!-- <text v-if="item.type === 'text'" class="font-md">{{ item.data }}</text> -->
						<rich-text v-if="item.type === 'text'" style="padding-top: 5rpx;" class="font-md" :nodes="messageHtml(item.data)"></rich-text>
					
						<!-- 表情包 || 图片 -->
						<!-- <image @click="preview(item)" @load="loadImage" v-if="item.type === 'emoticon' || item.type === 'image'" :src="item.data" lazy-load="true" mode="widthFix" style="width: 300rpx;height: 300rpx;" class="rounded"></image> -->
						<image @click="preview(item)" @load="loadImage" v-if="item.type === 'emoticon' || item.type === 'image'" :src="item.data" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
						<!-- 音频 -->
						<view v-else-if="item.type === 'audio'" class="flex align-center" @click="openAudio(item)">
							<image :src="!audioPlaying ? '/static/audio/audio3.png' : '/static/audio/play.gif'" style="width: 50rpx;height: 50rpx;" class="mx-1"></image>
							<text class="font">{{ item.options.time }}"</text>
						</view>
						<!-- 视频 -->
						<view @click="openVideo(item)" v-else-if="item.type === 'video'" class="position-relative">
							<image @load="loadImage" :src="item.options.poster" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
							<text class="iconfont text-white position-absolute" style="font-size: 80rpx;" :style="posterIconStyle">&#xe99a;</text>
						</view>
						<!-- 位置信息 -->
						<view @tap="openAddress(item)" class="flex flex-column bg-white" v-else-if="item.type === 'location'" style="width: 480rpx;margin-left: -20rpx;margin-top: -10rpx;">
							<!-- 地址 -->
							<view class="flex flex-column pt-2 pl-2 pr-2">
								<text style="font-size: 34rpx;color: #101010;">{{item.data.split(',')[0]}}</text>
								<text class="mb-1" style="font-size: 24rpx;color: #999;">{{item.data.split(',')[1]}}</text>
							</view>
							<map @tap="openAddress(item)" style="width: 480rpx; height: 260rpx;" :enable-zoom="false" :enable-scroll="false" :markers="covers" :longitude="item.options.LocationAddress.split(',')[0]" :latitude="item.options.LocationAddress.split(',')[1]"></map>
						</view>
						
					</view>
					
				</view>
				
			</template>
			<!-- 如：1：15'：45"就表示1小时15分45秒 -->

			<!-- 本人 -->
			<template v-if="isself">
				<!-- 消息状态 -->
				<!-- <text v-if="!item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #FE7130;">未读</text>
				<text v-if="item.isPeerRead" style="margin-top: 30rpx;font-size: 26rpx;margin-right: 10rpx;color: #A9A5A0;">已读</text> -->
				<!-- 三角图标 -->
				<text v-if="hasLabelClass" class="iconfont font-md position-absolute chat-right-icon" style="color: #6BEE68;">&#xe617;</text>
				<!-- <view class="p-2 rounded mr-3 bg-chat-item" style="max-width:500rpx;"> -->
				<view class="p-2 rounded" style="max-width:500rpx;" :class="labelClass" :style="labelStyle">
					<!-- 文字 -->
					<!-- <text v-if="item.type === 'text'" class="font-md">{{ item.data }}</text> -->
					<rich-text v-if="item.type === 'text'" style="padding-top: 5rpx;" class="font-md text-chat" :nodes="messageHtml(item.data)"></rich-text>

					<!-- 表情包 || 图片 -->
					<!-- <image @click="preview(item)" @load="loadImage" v-if="item.type === 'emoticon' || item.type === 'image'" :src="item.data" lazy-load="true" mode="widthFix" style="width: 300rpx;height: 300rpx;" class="rounded"></image> -->
					<image @click="preview(item)" @load="loadImage" v-if="item.type === 'emoticon' || item.type === 'image'" :src="item.data" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
					<!-- 音频 -->
					<view v-else-if="item.type === 'audio'" class="flex align-center" @click="openAudio(item)">
						<text class="font">{{ item.options.time }}"</text>
						<image :src="!audioPlaying ? '/static/audio/audio3.png' : '/static/audio/play.gif'" style="width: 50rpx;height: 50rpx;" class="mx-1"></image>
					</view>
					<!-- 视频 -->
					<view @click="openVideo(item)" v-else-if="item.type === 'video'" class="position-relative">
						<image @load="loadImage" :src="item.options.poster" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded bg-hover-light"></image>
						<text class="iconfont text-white position-absolute" style="font-size: 80rpx;" :style="posterIconStyle">&#xe99a;</text>
					</view>
					
					<!-- 位置信息 -->
					<view @tap="openAddress(item)" class="flex flex-column bg-white" v-else-if="item.type === 'location'" style="width: 460rpx;margin-right: -20rpx;margin-top: -10rpx;">
						<!-- 地址 -->
						<view class="flex flex-column pt-2 pl-2 pr-2">
							<text style="font-size: 34rpx;color: #101010;">{{item.data.split(',')[0]}}</text>
							<text class="mb-1" style="font-size: 24rpx;color: #999;">{{item.data.split(',')[1]}}</text>
						</view>
						<map @tap="openAddress(item)" style="width: 460rpx; height: 260rpx;" :enable-zoom="false" :enable-scroll="false" :markers="covers" :longitude="item.options.LocationAddress.split(',')[0]" :latitude="item.options.LocationAddress.split(',')[1]"></map>
					</view>
					
				</view>
				<!-- 头像 -->
				<free-avater size="80" :src="item.avatar"></free-avater>
			</template>
		</view>
	</view>
</template>

<script>
//引入表情模板
import commen from '@/common/emoticon/emoticonlist';
Vue.prototype.$commen = commen;
import freeAvater from '@/components/free-ui/free-avater.vue';
import $T from '@/common/free-lib/time.js';
import parseHtml from '@/common/emoticon/htmlparser.js';
import { mapState, mapActions } from 'vuex';
export default {
	components: {
		freeAvater
	},
	props: {
		item: Object,
		// itemList:Object,
		index: Number,
		//上一条消息的时间戳
		pretime: [Number, String]
	},
	data() {
		return {
			emojiList: this.$commen.emojiList, //表情包列表
			w: 100,
			h: 100,
			innerAudioContext: null,
			audioPlaying: false,
			nodes: [],
			ChatLongState:false
			// LongState: this.$store.state.im.LongState; //获取自己聊天编号
		};
	},
	watch: {
		LongState(newVal, oldVal) {
			this.ChatLongState = newVal;
		}
	},
	computed: {
		...mapState({
			LongState: state => state.im.LongState,
		}),
		//判断是否是本人
		isself() {
			// 获取本人userid
			// let id = '1400434250';
			let id = getApp().$store.state.im.MyUserId;
			console.log(id);
			return this.item.user_id === id;
		},
		//显示的时间
		showTime() {
			return $T.getChatTime(this.item.create_time, this.pretime);
		},
		// 是否需要气泡样式
		hasLabelClass() {
			return this.item.type === 'text' || this.item.type === 'audio';
		},
		// 气泡的样式
		labelClass() {
			//是否本人
			if (this.isself) {
				// 是本人
				// 是否需要气泡
				return this.hasLabelClass ? 'mr-3 bg-chat-item' : 'mr-3';
			} else {
				// 不是本人
				// 是否需要气泡
				return this.hasLabelClass ? 'ml-3 bg-white' : 'ml-3';
			}
		},
		labelStyle() {
			if (this.item.type === 'audio') {
				let time = this.item.options.time || 0;
				let width = parseInt(time) / (60 / 500);
				width = width < 150 ? 150 : width;
				return `width:${width}rpx;`;
			}
		},
		// 短视频封面图标
		posterIconStyle() {
			let w = this.w / 2 - uni.upx2px(80) / 2;
			let h = this.h / 2 - uni.upx2px(80) / 2;
			return `left:${w}px;top:${h}px;`;
		}
	},
	mounted() {
		// 注册全局事件
		if (this.item.type === 'audio') {
			this.$audioOn(this.onPlayAudio);
		}
	},
	// 组件销毁
	destroyed() {
		if (this.item.type === 'audio') {
			this.$audioOff(this.onPlayAudio);
		}
		// 销毁音频
		if (this.innerAudioContext) {
			this.innerAudioContext.destroy();
			this.innerAudioContext = null;
		}
	},
	methods: {
		...mapActions(['$audioOn', '$audioEmit', '$audioOff']),
		// 打开地图
		openAddress(item){
			console.log(JSON.stringify(item))
			// 跳转到地图
			uni.navigateTo({
				url:'/pages/chat/map/map?data='+item.data+'&location='+item.options.LocationAddress
			})
		},
		// 监听播放音频全局事件
		onPlayAudio(index) {
			// console.log("当前播放的索引"+index);
			if (this.innerAudioContext) {
				if (this.index !== index) {
					this.innerAudioContext.stop();
				}
			}
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
		// 播放音频
		openAudio(e) {
			console.log(JSON.stringify(e));
			if(uni.getStorageSync('LongState')==="false"){//判断长按状态
				// 通知停止其他音频
				this.$audioEmit(this.index);
				if (!this.innerAudioContext) {
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.src = e.data;
					this.innerAudioContext.play();
					// 音频播放事件
					this.innerAudioContext.onPlay(() => {
						this.audioPlaying = true;
					});
					// 音频暂停事件
					this.innerAudioContext.onPause(() => {
						this.audioPlaying = false;
					});
					// 音频停止事件
					this.innerAudioContext.onStop(() => {
						this.audioPlaying = false;
					});
					// 音频播放错误事件
					this.innerAudioContext.onError(() => {
						this.audioPlaying = false;
					});
					// 音频自然播放结束事件
					this.innerAudioContext.onEnded(() => {
						this.audioPlaying = false;
					});
				} else {
					//点击暂停播放效果
					if (this.audioPlaying) {
						this.innerAudioContext.stop();
					} else {
						this.innerAudioContext.play();
					}
				}
						
			}
			
		
		},
		// 加载图片
		loadImage(e) {
			// 拿到图片的宽高
			let w = e.detail.width;
			let h = e.detail.height;
			// 最大宽度 px
			let maxW = uni.upx2px(500);
			// 最大高度 px
			let maxH = uni.upx2px(350);
			if (h <= maxH) {
				// 用原来的宽高
				this.w = w <= maxW ? w : maxW;
				this.h = h;
				return;
			}
			this.h = maxH;
			let w2 = maxH * (w / h);
			this.w = w2 <= maxW ? w2 : maxW;
		},
		// 预览图片
		preview(e) {
			if(uni.getStorageSync('LongState')==="false"){//判断长按状态
				let url = e.data; //图片路径
				this.$emit('preview', url);
			}
		},
		// 打开视频
		openVideo(e) {
			if(uni.getStorageSync('LongState')==="false"){//判断长按状态
				// 跳转之前关闭其他播放中的音频
				this.$audioEmit(this.index);
				// 跳转页面
				uni.navigateTo({
					// url: '/pages/chat/video/video?url=' + e.data + '&PosterUrl=' + e.options.poster
					url: '/pages/chat/video/video?url=' + e.data
				});
			}
		},
		// 长按事件
		long(e) {
			let x = 0;
			let y = 0;
			// #ifdef APP-PLUS-NVUE
			if (Array.isArray(e.changedTouches) && e.changedTouches.length > 0) {
				x = e.changedTouches[0].screenX;
				y = e.changedTouches[0].screenY;
			}
			// #endif
			// #ifdef H5
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
			// #endif
			// #ifdef MP
			x = e.detail.x;
			y = e.detail.y;
			// #endif
			this.$emit('long', {
				x,
				y,
				index: this.index
			});
		}
	}
};
</script>

<style scoped>
.chat-left-icon {
	left: 90rpx;
	top: 35rpx;
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
