<template>
	<view class="content">
		<view class="bg-white flex p-2">
			<textarea v-model="title" placeholder="请输入案例标题" class="w-100" style="font-size: 28rpx;"/>
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
			this.title = options.title;
			if(options.showtitle != 'undefined'){
				uni.setNavigationBarTitle({
					title: options.showtitle
				});
			}
		},
		methods:{
			Submit(){
				if(this.title == ''){
					this.$refs.uToast.show({
						title: '请输入标题',
						type: 'warning'
					})
					return;
				}
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				console.log(prevPage.$vm.DataList);
				prevPage.$vm.DataList.title = this.title;//修改上一页data里面的managingGoods参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
