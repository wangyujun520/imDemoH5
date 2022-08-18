<template>
	<view class="content">
		<view class="px-2 mt-2" v-for="i in 5" @click="skipServiceOrder()">
			<view class="py-2 bg-white rounded">
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<text>东方希望天祥广场</text>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 440rpx;">
						<text class="text-title">装修风格：</text>
						<text class="text-content">现代简约</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">设计面积：</text>
						<text class="text-content">100㎡</text>
					</view>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 440rpx;">
						<text class="text-title">房屋户型：</text>
						<text class="text-content">三室两厅</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">装修预算：</text>
						<text class="text-content">15万</text>
					</view>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="flex align-center" style="width: 720rpx;">
						<text class="iconfont" style="font-size: 30rpx;color: #777;">&#xe65e;</text>
						<text class="text-content">四川省成都市武侯区G213辅路</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			skipServiceOrder(){
				// 跳转到服务工单
				uni.navigateTo({
					url:'/pages/ServiceOrder/Index'
				})
			},
		}
	}
</script>

<style>
	.text-title{
		font-size:26rpx;
		color:#999;
	}
	.text-content{
		font-size:26rpx;
		color:#999;
	}
</style>
