<template>
	<view class="content">
		<!-- 顶部 -->
		<view style="height: 80rpx;width: 750rpx;">
			<view class="flex">
				<view class="bg-white" style="width: 650rpx;">
					<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current" @change="change"></u-tabs>
				</view>
				<view @click="MenuShow" class="flex align-center justify-center" style="width: 100rpx;background-color: #FFFFFF;">
					<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
				</view>
			</view>
		</view>
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 80rpx;"></view>
		<!-- 内容 -->
		<view @click="skipOrderDetails" class="flex flex-column" style="margin: 20rpx;" v-for="i in 0">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" src="/static/img/head/demo5.jpg" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">兔宝宝木材</text>
						</view>
						<view class="flex align-center">
							<text style="color: #777;font-size: 26rpx;">四川省成都市武侯区G213辅路</text>
						</view>
					</view>
				</view>
				<view class="pb-2" style="padding-left: 140rpx;">
					<text style="color: #02B1BE;font-size: 26rpx;">预约时间：2020-12-31</text>
				</view>
			</view>
			<view class="flex bg-white" style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
				<view class="flex align-center justify-center" style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;">20分钟前</text>
				</view>
				<view v-if="state == 1" class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #777;">待处理</text>
				</view>
				<view v-if="state == 2" class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #DF0101;">已处理</text>
				</view>
				<view v-if="state == 3" class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #FF9900;">已受理</text>
				</view>
			</view>
		</view>
		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
			 :close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text @click="SwitchMenu(index)" :style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#FF9900' : '#FFFFFF' }"
						 class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},2000)
		},
		data() {
			return {
				state:1,//1待处理 2已处理 3已受理
				DataList:[],
				//列表数据
				list: [{
						name: '全部'
					},
					{
						name: '待处理'
					},
					{
						name: '已受理'
					},
					{
						name: '已处理'
					}
				],
				current: 0, //当前选中的下标
				activeColor: this.$u.color['warning'],
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
			};
		},
		watch:{
			current(value){
				console.log(this.list[value].name)
			}
		},
		onShow() {
			
		},
		methods: {
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
			skipOrderDetails(){
				// 跳转到订单详情
				uni.navigateTo({
					url:'/pages/UserLive/OrderDetails'
				})
			}
		}
	};
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
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
