<template>
	<view class="content">
		<view class="bg-white px-3 mt-2">
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">原价</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="number" style="font-size: 28rpx;color: #777;" v-model="originalPrice" placeholder="请输入原价" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;">万元</text>
				</view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">优惠价</text>
					<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="number" style="font-size: 28rpx;color: #777;" v-model="concessionalRate" placeholder="请输入优惠价" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;">万元</text>
				</view>
			</view>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				originalPrice:'',//原价
				concessionalRate:''//优惠价
			}
		},
		onLoad(options) {
			this.originalPrice = JSON.parse(options.RealEstatePrice).originalPrice;
			this.concessionalRate = JSON.parse(options.RealEstatePrice).concessionalRate;
		},
		methods:{
			Submit(){
				if(this.originalPrice == ''){
					this.$refs.uToast.show({
						title: '请录入原价',
						type: 'warning'
					})
					return;
				}
				if(this.concessionalRate == ''){
					this.$refs.uToast.show({
						title: '请录入优惠价',
						type: 'warning'
					})
					return;
				}
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				console.log(prevPage.$vm.DataList);
				prevPage.$vm.DataList.RealEstatePrice.originalPrice = this.originalPrice;//修改上一页data里面的参数值
				prevPage.$vm.DataList.RealEstatePrice.concessionalRate = this.concessionalRate;//修改上一页data里面的参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
</style>
