<template>
	<view class="content">
		<view class="flex bg-white flex-column">
			
			<view class="flex p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);" v-for="i in 5">
				<view class="">
					<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1619348827,3557277797&fm=26&gp=0.jpg" class="rounded" style="width: 180rpx;height: 180rpx;"></image>
				</view>
				<view class="flex flex-column px-2" style="width: 600rpx;">
					<text style="color: #000000;font-weight: bold;font-size: 30rpx;">金科•观天府</text>
					<view class="flex align-center mt-5">
						<text style="font-size: 26rpx;color: #FF0000;font-weight: bold;">￥</text><text style="font-size: 34rpx;color: #FF0000;font-weight: bold;">80万</text>
						<text class="ml-2" style="text-decoration: line-through;color: #888;">108万</text>
					</view>
					<view class="flex align-center justify-between">
						<view class="flex">
							<text style="color: #888;font-size: 24rpx;">5545浏览</text>
							<text style="color: #888;font-size: 24rpx;" class="ml-2">10赞</text>
							<text style="color: #888;font-size: 24rpx;" class="ml-2">20评论</text>
						</view>
						<text @click="ShowActionSheet" class="iconfont" style="font-weight: bold;font-size: 40rpx;">&#xe61e;</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetUpClick"></u-action-sheet>
	</view>
</template>

<script>
	export default{
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},2000);
		},
		data() {
			return {
				ActionSheetListShow: false,
				ActionSheetList: [{
					text: '分享房产'
				}, {
					text: '编辑房产'
				}, {
					text: '删除房产',
					color: 'red'
				}]
			};
		},
		methods: {
			ShowActionSheet() {
				this.ActionSheetListShow = true;
			},
			SetUpClick(index) {
				// 分享房产
				if (index == 0) {
					console.log("分享房产")
				}
			
				// 编辑房产
				if (index == 1) {
					console.log("编辑房产")
				}
				
				// 删除房产
				if (index == 2) {
					console.log("删除房产")
				}
			}
		}
	}
</script>

<style lang="scss">
	
</style>