<template>
	<view class="content">
		<view class="GradualChange flex align-center" style="height: 150rpx;padding-left: 50rpx;">
			<text class="iconfont" style="color: #FFFFFF;font-size: 70rpx;font-weight: bold;">&#xe6e4;</text>
			<!-- <text v-if="flag" class="ml-1" style="color: #FFFFFF;font-size: 30rpx;font-weight: bold;">订单保修中</text>
			<text v-else class="ml-1" style="color: #FFFFFF;font-size: 30rpx;font-weight: bold;">订单保修已到期</text> -->
			<text class="ml-1" style="color: #FFFFFF;font-size: 30rpx;font-weight: bold;">{{DataList.status_text}}</text>
		</view>
		
		<view @click="skipProductDetails" class="bg-white pb-2 pt-1" style="border-bottom: 1px solid rgb(187,187,187,0.2);">
			<view class="flex px-2 pt-2">
				<view class="flex" style="width: 150rpx;height: 150rpx;">
					<image class="rounded" :src="DataList.cover" @error="imgerror($event)" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="flex flex-column pl-1" style="width: 550rpx;">
					<text class="LineBreak" style="color: #101010;font-size: 24rpx;">{{DataList.title}}</text>
					<text class="my-1" style="color: #939393;font-size: 24rpx;">{{DataList.tags}}</text>
					<text style="color: #101010;font-size: 26rpx;">参考价：{{DataList.price}}</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 py-2">
			<view class="flex">
				<view style="width: 160rpx;" class="flex justify-end">
					<text style="color: #888;font-size: 28rpx;">订单编号：</text>
				</view>
				<view style="width: 550rpx;" class="flex">
					<text style="color: #000000;font-size: 26rpx;">{{DataList.order_no}}</text>
				</view>
			</view>
			<view class="flex">
				<view style="width: 160rpx;" class="flex justify-end">
					<text style="color: #888;font-size: 28rpx;">下单时间：</text>
				</view>
				<view style="width: 550rpx;" class="flex">
					<text style="color: #000000;font-size: 26rpx;">{{DataList.create_time}}</text>
				</view>
			</view>
			<view class="flex">
				<view style="width: 160rpx;" class="flex justify-end">
					<text style="color: #888;font-size: 28rpx;">取货时间：</text>
				</view>
				<view style="width: 550rpx;" class="flex">
					<text style="color: #000000;font-size: 26rpx;">{{DataList.taking_time}}</text>
				</view>
			</view>
			<view class="flex">
				<view style="width: 160rpx;" class="flex justify-end">
					<text style="color: #888;font-size: 28rpx;">完成时间：</text>
				</view>
				<view style="width: 550rpx;" class="flex">
					<text style="color: #000000;font-size: 26rpx;">{{DataList.complete_time}}</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column mt-2 bg-white p-2">
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总额</text>
				</view>
				<view class="flex">
					<text>￥{{DataList.money}}</text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>运费</text>
				</view>
				<view class="flex">
					<text>￥{{DataList.exp_money}}</text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>优惠金额</text>
				</view>
				<view class="flex">
					<text>￥{{DataList.discount_money}}</text>
				</view>
			</view>
			<view class="flex justify-end align-center" style="height: 100rpx;">
				<text>实付款：</text>
				<text style="color: #E51C23;font-size: 30rpx;">￥<span style="font-size: 40rpx;font-weight: bold;">{{DataList.pay_money}}</span></text>
			</view>
		</view>
		
		<view v-if="flag" class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">申请维修</u-button>
		</view>
		
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			this.id = options.id;
			// 获取保修订单详情
			this.$post(this.$url.Service.GetOrder,{
				id:options.id
			},{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					this.DataList = res.data;
				}
			})
		},
		data(){
			return{
				flag:true,
				DataList:{
					cover:''
				},
				id:''
			}
		},
		methods:{
			imgerror(e){
				this.DataList.cover = 'http://oss.anjubang.cn/nopic.png';
			},
			skipProductDetails(){
				uni.navigateTo({
					url:'/pages/tabBar/settle/ProductDetails'
				})
			},
			// 申请维修
			Submit(){
				// 跳转到维修预约界面
				uni.navigateTo({
					url:'/pages/tabbar/repair/ServiceAppointment?id='+this.id
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.GradualChange{
		background-image: linear-gradient(to right, #18252E , #375B6E);
	}
</style>
