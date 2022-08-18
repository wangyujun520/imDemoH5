<template>
	<view class="content">
		<view class="p-3 flex flex-column" style="color: #101010;">
			<!-- <text class="mb-2">设计理念</text> -->
			<u-input type="textarea" v-model="introduce" maxlength="-1" :auto-height="false" placeholder="请输入设计理念" style="background-color: #ffffff;padding: 10rpx 30rpx;"></u-input>
			<!-- <text class="my-2">报价说明</text>
			<u-input type="textarea" v-model="money_des" maxlength="-1" :auto-height="false" placeholder="请输入报价说明" style="background-color: #ffffff;padding: 10rpx 30rpx;"></u-input> -->
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
		
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			if(options.introduce == null || options.introduce == 'null'){
				this.introduce = '';
			}else{
				this.introduce = options.introduce;
			}
			this.money_des = options.money_des;
		},
		data(){
			return{
				introduce: '',//设计理念
				money_des: ''//报价说明
			}
		},
		methods:{
			Submit(){
				if(this.introduce == ''){
					this.$refs.uToast.show({
						title: '请输入设计理念',
						type: 'warning'
					})
					return;
				}
				// if(this.money_des == ''){
				// 	this.$refs.uToast.show({
				// 		title: '请输入报价说明',
				// 		type: 'warning'
				// 	})
				// 	return;
				// }
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				console.log(prevPage.$vm.DataList);
				prevPage.$vm.DataList.introduce = this.introduce;//修改上一页data里面的参数值
				// prevPage.$vm.DataList.money_des = this.money_des;//修改上一页data里面的参数值
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