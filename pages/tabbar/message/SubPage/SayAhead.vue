<template>
	<view class="content">
		<view class="bg-white flex p-2">
			<textarea v-model="title" placeholder="请录入信息" class="w-100" style="font-size: 28rpx;"/>
		</view>
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:''
			}
		},
		onLoad(options) {
			console.log(options)
			this.title = options.title;
		},
		methods:{
			Submit(){
				if(this.title == ''){
					this.$refs.uToast.show({
						title: '请录入信息',
						type: 'warning'
					})
					return;
				}
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.conternt = this.title;//修改上一页data里面的managingGoods参数值
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
