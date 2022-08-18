<template>
	<view class="content">
		<view class="bg-white px-3">
			<view @click="openingTime" class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;"><text style="font-size: 30rpx;color: #101010;">开业时间</text></view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" disabled="disabled" v-model="Time" style="font-size: 28rpx;color: #777;" placeholder="请选择开业时间" />
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx;">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view>

			<view class="flex py-3" style="height: 200rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;"><text style="font-size: 30rpx;color: #101010;">主营商品</text></view>
				<view class="form-input py-1 pl-1" style="width: 550rpx;background-color: #F7F7F7;">
					<textarea placeholder="请输入主营商品" v-model="MainProducts" style="font-size: 28rpx;color: #777;height: 130rpx;width: 100%;" />
					</view>
			</view>
		</view>
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		<u-picker mode="time" v-model="show" @confirm="confirm"></u-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	
	data() {
		return {
			Time:"",
			MainProducts:"",
			show:false,
		};
	},
	onLoad(options) {
		// console.log("数据"+options.likelist);
		var List = JSON.parse(options.list);
		console.log(List)
		
		this.Time = List.openingTime;
		this.MainProducts = List.mainProducts;
	},
	computed: {},
	onReady() {},
	methods: {
		openingTime() {
			this.show = true
		},
		confirm(e){
			console.log(JSON.stringify(e))
			this.Time = e.year +'-'+ e.month +'-'+ e.day;
		},
		Submit(){
			console.log("提交")
			
			// 获取商家认证首页信息
			// var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMyShangJiaDetail';
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMyMerchantDetail';
			var RequrestDatas = {
			  "openingTime":this.Time,
			  "mainProducts":this.MainProducts
			};
			console.log(JSON.stringify(RequrestDatas))
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
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

<style></style>
