<template>
	<view class="content">
		<view class="flex flex-column align-center justify-center" style="height: 200rpx;">
			<text style="font-size: 40rpx;color: #101010;">专职人员邀请</text>
			<text style="color: #A6A6A6;font-size: 30rpx;">（最多可邀请50位专职人员）</text>
		</view>
		
		<view class="flex p-5">
			<uqrcode ref="uqrcode" />
			<!-- <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0522%252F5ba72f1ej00qthmqq001zd200i200hcg007v007j.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624379072&t=20e4ff275d684a1053cf768a8727d81e" style="width: 650rpx;height: 650rpx;"></image> -->
		</view>
		
		<view class="flex flex-column align-center p-5">
			<view class="flex align-center justify-center rounded" style="background-color: #6AC8A7;height: 100rpx;width: 100%;">
				<u-icon name="weixin-fill" color="#FFFFFF" size="38"></u-icon>
				<text class="text-white ml-1" style="font-size: 30rpx;font-weight: bold;">邀请嘉宾</text>
			</view>
			<text class="mt-2" style="color: #A2A2A2;">每个链接只能邀请一位专职人员</text>
			<!-- <text class="mt-2" style="color: #A2A2A2;">扫一扫上面的二维码图案，邀请员工加入</text> -->
		</view>
		
	</view>
</template>

<script>
	export default {
		// // 生成二维码
		// onReady() {
			
		// },
		data() {
			return {
				id:'',
				qrcodeSize: uni.upx2px(650),//二维码大小
				qrcodeText: '',//输入内容生成二维码
				qrcodeSrc: '',//二维码图片base64路径
			}
		},
		methods: {
			// 生成二维码
			make() {
				this.$refs
					.uqrcode
					.make({
						size: this.qrcodeSize,
						text: this.qrcodeText,
						enableDelay: false // 启用延迟绘制
					})
					.then(res => {
						// 返回的res与uni.canvasToTempFilePath返回一致
						// console.log(res)
						// console.log(`生成二维码耗时：${res.time}ms`)
						this.qrcodeSrc = res.tempFilePath
					})
			},
		},
		onLoad() {
			this.$post(this.$url.User.GetBaseData, {},{
				isLoading:false
			}).then(res => {
				// console.log(JSON.stringify(res))
				this.id = res.data.id;
				console.log(this.id)
				
				let obj = {
					type:'join',//邀请员工
					id:this.id
				};
				this.qrcodeText = JSON.stringify(obj);
				// 生成二维码
				this.make();
				
			});
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
</style>