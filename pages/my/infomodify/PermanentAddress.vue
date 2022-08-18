<template>
	<view class="content">
		<view class="bg-white px-3">
			<view class="flex py-3" style="height: 200rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;"><text style="font-size: 30rpx;color: #101010;">常驻地址</text></view>
				<view class="form-input py-1 pl-1" style="width: 550rpx;background-color: #F7F7F7;">
					<textarea placeholder="请输入常驻地址" v-model="DataList.residentArea" style="font-size: 28rpx;color: #777;height: 130rpx;width: 100%;" />
				</view>
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
			DataList:''
		};
	},
	onShow() {
		//获取个人信息
		var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetPersonalInfo';
		var RequrestDatas = {};
		this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
			console.log(JSON.stringify(res));
			this.DataList = res.dataList;
		})
		.catch(err => {
			console.log(err);
		});
	},
	computed: {},
	onReady() {},
	methods: {
		Submit(){
			// 常驻地址修改
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetAddress';
			var RequrestDatas = {
			  "residentArea": this.DataList.residentArea
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
	
</style>