<template>
	<view class="content">
		<tui-navigation-bar splitLine @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" title="个人主页" backgroundColor="#fff" color="#333">
			<view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
				<tui-icon name="arrowleft" :color="opacity > 0.85 ? '#333' : '#fff'" @click="back"></tui-icon>
			</view>
		</tui-navigation-bar>
		<view class="tui-header-bg position-relative">
			<image :src="imgSrc" class="tui-header-img"></image>
			<view class="position-absolute bg-white p-1" style="bottom: -100rpx;left: 30rpx;border: 1px solid rgba(187,187,187,0.2);border-radius: 10rpx;">
				<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F06%2F20200506110929_iajqi.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630342780&t=4bf92eab049d2dd20e954c5aec50d3a0" style="width: 160rpx;height: 160rpx;"></image>
			</view>
			<!-- <view class="flex justify-center align-center position-absolute" style="background-color: #18b566;font-size: 30rpx;right: 30rpx;bottom: -90rpx;height: 60rpx;width: 260rpx;border-radius: 30rpx;color: #FFFFFF;">
				<u-icon name="plus" color="#ffffff" size="30"></u-icon>
				<text class="ml-1">关注</text>
			</view> -->
			<view class="flex justify-center align-center position-absolute" style="background-color: #FFFFFF;font-size: 30rpx;right: 30rpx;bottom: -90rpx;height: 60rpx;width: 260rpx;border-radius: 30rpx;border: 1px solid rgba(187,187,187,0.3);color: #979797;">
				<!-- <u-icon name="plus" color="#ffffff" size="30"></u-icon> -->
				<text class="ml-1">已关注</text>
			</view>
		</view>
		<!-- 占位 -->
		<view class="bg-white" style="height: 120rpx;border: 0px solid red;"></view>
		<view class="flex flex-column px-3 pb-3 bg-white mb-2" style="border: 0px solid red;">
			<text style="font-size: 60rpx;font-weight: bold;color: #000000;">吴亦凡</text>
			<view class="flex align-center my-2" style="font-size: 28rpx;">
				<text class="iconfont" style="font-size: 40rpx;color: #F7B03D;margin-right: 5rpx;">&#xe634;</text>
				<text class="ml-1">销售</text>
				<text class="ml-1">|</text>
				<text class="ml-1">机构</text>
			</view>
			<view class="flex align-center" style="font-size: 24rpx;font-weight: bold;">
				<text style="color: #18b566;">20</text>
				<text style="color: #9599A2;" class="ml-1">动态</text>
				<text style="color: #18b566;" class="ml-1">3342</text>
				<text style="color: #9599A2;" class="ml-1">关注TA的人</text>
				<text style="color: #18b566;" class="ml-1">3</text>
				<text style="color: #9599A2;" class="ml-1">TA关注的人</text>
			</view>
		</view>
		
		<!-- 内容 -->
		<view v-for="(sitem, sindex) in DataList" :key="sindex" class="FindInfo bg-white px-2 py-2"
			style="border-bottom: 1px solid rgb(187, 187, 187, 0.5)">
			<view class="flex">
				<view class="flex align-center">
					<image :src="sitem.headPhoto" style="width: 90rpx; height: 90rpx;border-radius: 15rpx;"></image>
				</view>
				<view class="flex flex-column justify-between pl-2">
					<view class="UserInfo">
						<text style="color: #101010; font-size: 32rpx; font-weight: bold">{{ sitem.name }}</text>
					</view>
					<view class="flex align-center" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
						<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
						<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">销售</text>
					</view>
				</view>
			</view>
			<!-- 顶部结束 -->
			<!-- 内容开始 -->
			<view class="Content-Text mt-1">
				<text>{{sitem.content}}</text>
			</view>
			<!-- 图片显示 -->
			<view v-if="sitem.communicationType == 'image'" class="Pic-Box flex flex-wrap mt-1">
				<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in sitem.photos" :key="imgindex" style="width: 235rpx; height: 235rpx">
					<!-- <image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" style="width: 100%; height: 100%"></image> -->
					<!-- 处理图片压缩，显示缩略图 -->
					<image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" mode="aspectFill" style="width: 100%; height: 100%"></image>
				</view>
			</view>
			<!-- 视频显示 -->
			<view v-if="sitem.communicationType == 'video'" @click="openVideo(sitem.video)"
				class="position-relative mt-2">
				<image @load="loadImage"
					:src="sitem.video + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
				<text class="iconfont text-white position-absolute"
					style="font-size: 80rpx; width: 80rpx; height: 80rpx" :style="posterIconStyle">&#xe99a;</text>
			</view>
			<!-- 定位信息开始 -->
			<view class="flex pt-2">
				<i class="iconfont pr-1" style="color: #18b566; font-weight: bold; font-size: 30rpx">&#xe65e;</i>
				<text style="font-size: 26rpx; color: #666666">{{ sitem.address }}</text>
			</view>
			<!-- 定位信息结束 -->
			<!-- 点赞评论开始 -->
			<view class="LikeBox flex px-1 pt-2">
				<view class="flex-1">
					<!-- <text style="color: #939393; font-size: 28rpx" v-html="FormateTime(sitem.time)"></text> -->
					<text style="color: #939393; font-size: 28rpx" v-html="sitem.time"></text>
					<text @click="Remove(sitem.id)" style="color: #4879d4" class="ml-1 font-sm"
						v-if="sitem.isSelf">删除</text>
				</view>
				<view class="flex flex-1 justify-end align-center">
					<text :style="{ color: sitem.support ? '#ff9900' : '#939393' }" class="iconfont"
						style="font-size: 36rpx; margin-right: 5rpx" @click="support(sitem)">
						&#xe641;
					</text>
					<text :style="{ color: sitem.support ? '#ff9900' : '#939393' }"
						style="font-size: 26rpx">{{ sitem.supportNumber }}</text>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import tuiNavigationBar from '@/components/tui-navigation-bar/tui-navigation-bar.vue'
	import tuiIcon from '@/components/tui-icon/tui-icon.vue'
	export default {
		components:{
			tuiNavigationBar,
			tuiIcon
		},
		computed: {
			// 短视频封面图标
			posterIconStyle() {
				let w = this.w / 2 - uni.upx2px(80) / 2;
				let h = this.h / 2 - uni.upx2px(80) / 2;
				return `left:${w}px;top:${h}px;`;
			}
		},
		data(){
			return{
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
				imgSrc:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fy0.ifengimg.com%2Fd4a44fff10624b98%2F2013%2F1021%2Frdn_526466b752409.jpg&refer=http%3A%2F%2Fy0.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630341197&t=511d640d05f90cd6501e39dbefd07aa0',
				w:0,
				h:0,
				DataList:[{
					id:'4564654',
					headPhoto:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgres.guaiguai.com%2Fguaiguai%2F437%2F2180720-202007051413175f016f7db9ee9.jpg&refer=http%3A%2F%2Fimgres.guaiguai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629817776&t=885d7e9b3a792fa9e32452749f34932d',
					name:'张三',
					signature:'签名',
					isSelf:true,
					content:'发送到恢复iOS的恢复和第三款建行卡水电费意思u覅USD已发送第一我阿us一丢按收益阜阳市丢安抚一生独一U盾法源寺U盾有法源寺都要佛奥搜已爱搜ifu扫IU的哦我傲',
					photos:['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201412%2F29%2F20141229151653_HiM8B.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629774465&t=3968e62763b0fc7bcc7e6e837971dc5d','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201412%2F29%2F20141229151653_HiM8B.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629774465&t=3968e62763b0fc7bcc7e6e837971dc5d','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201412%2F29%2F20141229151653_HiM8B.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629774465&t=3968e62763b0fc7bcc7e6e837971dc5d','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201412%2F29%2F20141229151653_HiM8B.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629774465&t=3968e62763b0fc7bcc7e6e837971dc5d'],
					video:null,
					address:'四川省成都市成华区xxx',
					support:null,
					supportNumber:'20',
					time :'2021-07-25',
					communicationType:'image'
				},{
					id:'4564654123',
					headPhoto:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgres.guaiguai.com%2Fguaiguai%2F437%2F2180720-202007051413175f016f7db9ee9.jpg&refer=http%3A%2F%2Fimgres.guaiguai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629817776&t=885d7e9b3a792fa9e32452749f34932d',
					name:'李四',
					signature:'签名',
					isSelf:true,
					content:'女司机上路',
					photos:null,
					video:'https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/Anjubang/2021/03/202103071615080664855.mp4',
					address:'四川省成都市成华区xxx',
					support:null,
					supportNumber:'20',
					time :'2021-07-25',
					communicationType:'video'
				}]//Mock数据
			}
		},
		methods:{
			// 点赞
			support(item) {
				if (!item.support) {
					// var RequrestUrl = this.AJB.BizUrl + 'api/Communication/SupportCommunication';
					// var RequrestDatas = {
					// 	communicationId: item.id
					// };
					// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					// 	.then(res => {
					// 		console.log(JSON.stringify(res));
					// 		if (res.code == 200) {
					// 			//成功
					// 			item.support = true;
					// 			item.supportNumber++;
					// 		}
					// 	})
					// 	.catch(err => {
					// 		console.log(err);
					// 	});
				}
			},
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
			back() {
				uni.navigateBack();
			},
			Remove(id) {
				var _self = this;
				uni.showModal({
					title: '提示',
					content: '真的要删除吗',
					success: function(res) {
						if (res.confirm) {
							console.log("删除成功")
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 打开视频
			openVideo(url) {
				// 跳转页面
				uni.navigateTo({
					url: '/pages/chat/video/video?url=' + url
				});
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
			previewImage(url, list) {
				uni.previewImage({
					current: url,
					urls: list,
					indicator: 'number'
				});
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style >
	page{
		background-color: #F7F7F7;
	}
.tui-header-bg {
	width: 100%;
	margin: 0;
}
.tui-header-img {
	width: 100%;
	height: 440rpx;
	display: block;
}
.tui-header-icon {
	width: 100%;
	position: fixed;
	top: 0;
	padding: 0 12rpx;
	display: flex;
	align-items: center;
	height: 32px;
	transform: translateZ(0);
	z-index: 99999;
	box-sizing: border-box;
}
</style>