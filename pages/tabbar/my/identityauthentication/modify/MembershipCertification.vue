<template>
	<view class="content">
		<view class="flex justify-between pl-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="" style="color: #101010;font-size: 28rpx;">喜好风格</text>
			<view class="flex">
				<view class="flex justify-end flex-wrap" style="width: 520rpx;">
					<text @click="SelectWork(index)" :class="[item.isLike ? 'Selection' : 'NoSelection']" v-for="(item,index) in LikeStyle" :key="index" class="rounded mb-1 ml-1" style="font-size: 26rpx;padding: 10rpx 30rpx;">{{item.name}}</text>
				</view>
				<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
			</view>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			LikeStyle:[]//喜好风格
		};
	},
	onLoad(options) {
		// console.log("数据"+options.likelist);
		this.LikeStyle = JSON.parse(options.likelist);
		console.log(this.LikeStyle)
	},
	computed: {},
	onReady() {},
	methods: {
		SelectWork(index){
			this.LikeStyle[index].isLike = !this.LikeStyle[index].isLike;
		},
		Submit(){
			console.log("提交")
			// console.log(JSON.stringify(this.LikeStyle));
			
			// 会员基本资料修改
			// var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMyHuiYuanDetail';
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMyMemberDetail';
			var RequrestDatas = {
				"likeStyle":this.LikeStyle
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
				console.log(JSON.stringify(res));
				if(res.code == 200){
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success'
					});
					setTimeout(()=>{
						//返回上一个界面
						uni.navigateBack({
							delta:1
						})
					},2000);
				}else{
					this.$refs.uToast.show({
						title: '提交失败',
						type: 'error'
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
			
			
		}
	}
};
</script>

<style>
	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}
	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
</style>
