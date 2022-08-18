<template>
	<view class="content">
		<view class="flex">
			<view class="" style="width: 650rpx;">
				<!-- list 标签数组，元素为对象，如[{name: '推荐'}] -->
				<!-- active-color 选中的颜色 -->
				<!-- is-scroll tabs是否可以左右拖动 -->
				<!-- current 初始化显示第几个 -->
				<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current" @change="change"></u-tabs>
			</view>
			<view @click="MenuShow" class="flex align-center justify-center" style="width: 100rpx;background-color: #FFFFFF;">
				<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
			</view>
		</view>

		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable" :close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text
							@click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#FF9900' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style"
						>
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->

		<!-- 菜单开始 -->
		<swiper :style="{ height: swiperHeight + 'px' }" circular :current="current" @change="changeSwiper">
			<swiper-item v-for="(swiperitem, swiperindex) in list" :key="swiperindex" style="overflow: auto;">
				
				<view @click="skipPersonalInformation" class="flex flex-column bg-white m-2 p-2 rounded" v-for="(sitem,sindex) in 5" :key="sindex">
					<view class="flex justify-between">
						<view class="flex" style="width: 520rpx;">
							<view class="" style="width: 100rpx;height: 100rpx;">
								<image src="/static/img/head/demo5.jpg" style="width: 100%;height: 100%;" class="rounded"></image>
							</view>
				
							<view class="flex flex-column justify-center ml-2">
								<view class="flex align-center">
									<text style="color: #000000;font-size: 32rpx;font-weight: bold;">张三</text>
									<text style="color: #FFFFFF;background-color: #307BC6;font-size: 26rpx;padding: 0rpx 20rpx;" class="ml-1 rounded">监理</text>
								</view>
								<view class="flex" style="margin-top: 10rpx;">
									<text style="color: #FF9900;background-color: #F9E2C0;padding: 3rpx 40rpx;font-size: 24rpx;" class="rounded">男</text>
									<text style="color: #02B1BE;background-color: #BEFAFF;padding: 3rpx 40rpx;font-size: 24rpx;" class="rounded ml-1 ">V1</text>
								</view>
							</view>
						</view>
					</view>
					<view class="flex mt-1">
						<text style="color: #888;font-size: 26rpx;">个性签名，个性签名个性签名，个性签名个性签名，个性签名个性签名，个性签名</text>
					</view>
					<view class="flex mt-1">
						<text style="color: #FF0000;font-size: 26rpx;">待审核(2020-11-11)</text>
					</view>
					<view class="flex mt-1">
						<text style="color: #888;font-size: 26rpx;">审核拒绝(2020-11-11)</text>
					</view>
					<view class="flex mt-1">
						<text style="color: #FF9900;font-size: 26rpx;">2019-12-01 至 2020-11-11</text>
					</view>
				</view>
				
				
			</swiper-item>
		</swiper>
		<!-- 菜单结束 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			//列表数据
			list: [
				{
					name: '在职'
				},
				{
					name: '待审核'
				},
				{
					name: '历史'
				}
			],
			current: 0, //当前选中的下标
			activeColor: this.$u.color['warning'],
			// 弹出菜单参数
			show: false, //是否显示弹出框菜单
			mode: 'top', //显示位置
			mask: true, // 是否显示遮罩
			closeable: false, //是否显示关闭按钮
			closeIconPos: 'top-right', //关闭按钮位置
			// 弹出菜单参数
			swiperHeight: 500 // swiper菜单高度
		};
	},
	onShow() {
		try {
			// 动态获取高度
			let res = uni.getSystemInfoSync();
			const getinfo = uni.getSystemInfoSync();
			if (getinfo.model == 'iPhoneXSMax') {
				this.swiperHeight = res.windowHeight - 40 - uni.upx2px(70);
			} else {
				this.swiperHeight = res.windowHeight - 40;
			}
		} catch (e) {
			console.log(e);
		}
	},
	methods: {
		skipPersonalInformation(){
			uni.navigateTo({
				url:'/pages/tabBar/my/identityauthentication/NewPropertys/PersonalInformation'
			})
		},
		// 切换菜单
		SwitchMenu(index) {
			this.current = index;
			this.show = false;
		},
		// 菜单改变
		change(index) {
			this.current = index;
		},
		// 显示弹出框菜单
		MenuShow() {
			this.show = true;
		},
		//swiper滑动菜单改变事件
		changeSwiper(event) {
			this.current = event.detail.current;
			// console.log(JSON.stringify(event))
		}
	}
};
</script>

<style lang="scss">

.label-style {
	font-size: 28rpx;
	border: 1px solid #f5f5f5;
	border-radius: 10rpx;
	width: 160rpx;
	text-align: center;
}

// 通过/deep/样式穿透去控制组件的内容
.wrap /deep/ .u-content {
	color: #666 !important;
}
</style>