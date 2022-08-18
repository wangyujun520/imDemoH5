<template>
	<view class="content">
		
		<view class="flex flex-column" style="margin: 20rpx;">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" src="/static/img/head/demo5.jpg" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">宋先生</text>
						</view>
						<view class="flex align-center">
							<text style="color: #888;font-size: 26rpx;">东方希望天祥广场</text>
						</view>
					</view>
				</view>
				<view class="flex align-center pb-2 pl-2" style="width: 720rpx;color: #888;">
					<text class="iconfont" style="font-size: 28rpx;">&#xe65e;</text>
					<text class="text-content" style="font-size: 26rpx;">四川省成都市武侯区G213辅路</text>
				</view>
			</view>
		</view>
		
		<view class="bg-white pb-2 pt-1 m-2" style="border-bottom: 1px solid rgb(187,187,187,0.2);">
			<view class="flex px-2 pt-2">
				<view class="flex" style="width: 150rpx;height: 150rpx;">
					<image class="rounded" src="//img10.360buyimg.com/n2/s270x270_jfs/t1/155291/20/17142/746138/601a7478Ed76c58f0/2f2ca924749696c7.png!q70" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="flex flex-column pl-1" style="width: 550rpx;">
					<text class="LineBreak" style="color: #101010;font-size: 24rpx;">兔宝宝儿童床女孩粉色公主床女孩粉红色儿童单人套房儿童床1.5米 单床 150cm*200cm</text>
					<text style="color: #939393;font-size: 26rpx;">订单号：DDH2000132820200303</text>
					<text class="my-1" style="color: #939393;font-size: 24rpx;">单价：<span style="color: #101010;" class="mr-2">¥799.00</span>购买数量：<span style="color: #101010;">1</span></text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white m-2 rounded p-2">
			<text class="iconfont" style="font-size: 24rpx;color: #999;">预约时间</text>
			<text style="color: #02B1BE;font-size: 24rpx;">2020-12-31</text>
		</view>
		
		<!-- 店铺信息 -->
		<view class="flex flex-column p-2 bg-white m-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
			<text style="color: #888;font-size: 26rpx;">店铺信息</text>
			<view class="flex align-center rounded pl-3" style="background-color: #F6F6F7;width: 670rpx;height: 150rpx;">
				<image src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%95%86%E5%AE%B6.png" class="rounded"
				 style="width: 120rpx;height: 120rpx;"></image>
				<view class="flex flex-column ml-2">
					<view class="flex align-center">
						<text class="mr-1" style="color: #101010;font-size: 32rpx;font-weight: bold;">兔宝宝木材</text>
					</view>
					<view class="flex">
						<text class="iconfont" style="font-size: 28rpx;color: #999;">&#xe65e;</text>
						<text style="font-size: 24rpx;color: #999;">四川省成都市武侯区G213辅路</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column p-2 bg-white m-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
			<text style="color: #888;font-size: 26rpx;">现场图片</text>
			<block v-for="(item,index) in imgList" :key="index">
				<image class="rounded mt-1" :src="item" mode="aspectFit"></image>
			</block>
		</view>
		<!-- 占位 -->
		<view style="height: 120rpx;"></view>
		<view class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">联系售后</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text v-if="state==1" style="color: #FF0000;">待处理</text>
					<text v-if="state==2" style="color: #FF9900;">已处理(2020-11-11 10:23)</text>
					<text v-if="state==3" style="color: #53A68F;">已受理(2020-11-11 10:23)</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgList:[
					"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=275606222,3162223653&fm=26&gp=0.jpg",
					"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3896097385,4127358448&fm=26&gp=0.jpg",
					"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3496080348,189033303&fm=26&gp=0.jpg",
					"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2139454642,3225759556&fm=26&gp=0.jpg"
				],
				state:1,//1待处理 2已处理 3已受理
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	
</style>