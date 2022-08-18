<template>
	<view class="content">
		<view @click="openingArea" class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">服务区域</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" disabled="disabled" v-model="DataList.serviceArea" style="font-size: 28rpx;color: #777;" placeholder="请选择服务区域" />
				</view>
			</view>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		<u-picker mode="region" v-model="show" @confirm="confirm"></u-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show:false,
			DataList:''//Mock数据
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
		openingArea() {
			this.show = true
		},
		confirm(e){
			console.log(JSON.stringify(e))
			this.DataList.serviceArea = e.province.label +'-'+ e.city.label +'-'+ e.area.label;
		},
		Submit(){
			// 服务区域修改
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetServiceArea';
			var RequrestDatas = {
			  "serviceArea": this.DataList.serviceArea
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