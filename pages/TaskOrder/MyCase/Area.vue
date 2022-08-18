<template>
	<view class="content">
		<view class="bg-white px-3">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 80rpx;">
					<text style="font-size: 30rpx;color: #101010;">面积</text>
				</view>
				<view class="form-input" style="width: 580rpx;">
					<input type="number" v-model="area" style="font-size: 28rpx;color: #777;" placeholder="请输入面积" />
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;">㎡</text>
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
		onLoad: function (option) {
			this.area = option.area;
		},
		data(){
			return{
				area:''
			}
		},
		methods:{
			Submit(){
				// console.log("提交")
				
				// 非空验证
				if(this.area == ""){
					this.$refs.uToast.show({
						title: '请输入面积',
						type: 'warning'
					})
					return;
				}
				
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.houseArea = this.area;   //修改上一页data里面的searchVal参数值为1211
				uni.navigateBack({
					delta:1
				})
				
			}
		}
	}
</script>

<style>
</style>
