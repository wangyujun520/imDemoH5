<template>
	<view class="content">
		<!-- 接任务 -->
		<scroll-view v-if="current == 0" scroll-y="true" :style="'height:'+MenuHeight+'px'">
			
			<view class="px-2 mt-2" v-for="i in 10">
				<view class="flex flex-column bg-white rounded pt-2">
					<!-- 第一行 -->
					<view class="flex align-center px-2">
						<view class="flex align-center">
							<image class="rounded" src="/static/img/head/demo6.jpg" style="width: 100rpx;height: 100rpx;"></image>
						</view>
						<view class="flex flex-column ml-1">
							<text style="color: #101010;font-weight: bold;font-size: 28rpx;">宋先生</text>
							<text style="font-size: 26rpx;color: #888;">卫浴维修订单</text>
						</view>
					</view>
					<!-- 第二行 -->
					<view class="flex align-center px-2" style="height: 60rpx;">
						<text style="font-size: 26rpx;color: #02B1BE;">东方希望天翔广场C座4313</text>
					</view>
					<!-- 第三行 -->
					<view class="flex px-2">
						<view class="mr-1" style="width: 150rpx;height: 150rpx;" v-for="i in 4">
							<image src="/static/video/demo.jpg" style="width: 100%;height: 100%;"></image>
						</view>
					</view>
					<!-- 第四行 -->
					<view class="flex align-center px-2" style="height: 60rpx;">
						<text class="iconfont" style="font-size: 28rpx;color: #999;">&#xe65e;</text>
						<text style="color: #888;font-size: 24rpx;">四川省成都市武侯区G213辅路</text>
					</view>
					<!-- 第五行 -->
					<view class="flex align-center px-2" style="height: 70rpx;border-top: 1px solid rgba(187,187,187,0.2);">
						<text class="iconfont" style="font-size: 24rpx;color: #999;">预约时间：</text>
						<text style="color: #888;font-size: 24rpx;">2020-11-11 15:20</text>
					</view>
				</view>
			</view>
			
		</scroll-view>
		<!-- 维修 -->
		<scroll-view v-if="current == 1" scroll-y="true" :style="'height:'+MenuHeight+'px'">
			
		</scroll-view>
		<!-- 完成 -->
		<scroll-view v-if="current == 2" scroll-y="true" :style="'height:'+MenuHeight+'px'">
			
		</scroll-view>
		
		<!-- tabbar导航栏 -->
		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list" :mid-button="midButton"
		 :inactive-color="inactiveColor" :activeColor="activeColor"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0, //当前菜单索引
				show: true, //是否显示导航栏
				bgColor: '#ffffff', //导航栏背景颜色
				borderTop: true, //是否显示顶部边框
				midButton: false, //是否显示凸起按钮
				inactiveColor: '#909399', //未选中的颜色
				activeColor: '#FF9900', //选中的颜色
				// 菜单开始
				list: [{
						iconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/jiedan.png",
						selectedIconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/jiedan-on.png",
						text: '接任务',
						customIcon: false,
					},
					{
						iconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/renwu.png",
						selectedIconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/renwu-on.png",
						text: '维修',
						customIcon: false,
					},
					{
						iconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/wancheng.png",
						selectedIconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/wancheng-on.png",
						text: '完成',
						customIcon: false,
					}
				],
				MenuHeight: 0,
				// 菜单结束
				
				
			}
		},
		watch: {
			current(newVal, oldVal) {
				this.ChatLongState = newVal;
				if(newVal === 0){
					uni.setNavigationBarTitle({
					　　title:'维修订单'
					})
				}else if(newVal === 1){
					uni.setNavigationBarTitle({
					　　title:'维修'
					})
				}else if(newVal === 2){
					uni.setNavigationBarTitle({
					　　title:'完成'
					})
				}
			}
		},
		methods: {
			
		},
		onShow() {
			// tabbar默认高度50px
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync()
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.MenuHeight = res.windowHeight - 50 - uni.upx2px(62);
				} else {
					this.MenuHeight = res.windowHeight - 50;
				}
			} catch (e) {
				console.log(e);
			}
		}
	}
</script>

<style scoped lang="scss">
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
