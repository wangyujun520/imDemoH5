<template>
	<view class="content">
		<view class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 80rpx;">
					<text style="font-size: 30rpx;color: #101010;">工龄</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input v-model="DataList.workingYears" maxlength="50" type="text" style="font-size: 28rpx;color: #777;" placeholder="请输入工龄" />
				</view>
			</view>
		</view>
		
		<view class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 80rpx;">
					<text style="font-size: 30rpx;color: #101010;">公司</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input v-model="DataList.company" maxlength="50" type="text" style="font-size: 28rpx;color: #777;" placeholder="请输入公司" />
				</view>
			</view>
		</view>
		<!-- <view class="flex justify-between pl-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="" style="color: #101010;font-size: 28rpx;">监理擅长</text>
			<view class="flex">
				<view class="flex justify-end flex-wrap" style="width: 520rpx;">
					<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
					<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
					<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
					<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
					<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
					<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
				</view>
				<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
			</view>
		</view> -->
		<view class="flex justify-between pl-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="" style="color: #101010;font-size: 28rpx;">监理擅长</text>
			<view class="flex">
				<view class="flex justify-end flex-wrap" style="width: 520rpx;">
					<text @click="SelectWork(index)" :class="[item.isLike ? 'Selection' : 'NoSelection']" v-for="(item,index) in DataList.goodAtSales" :key="index" class="rounded mb-1 ml-1" style="font-size: 26rpx;padding: 10rpx 30rpx;">{{item.name}}</text>
				</view>
				<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
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
			Time:"2010-10-01",
			show:false,
			DataList:''//Mock数据
		};
	},
	onShow() {
		// 获取监理基本信息
		var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMySupervisorDetail';
		var RequrestDatas = {};
		this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
			this.DataList = res.dataList;
			console.log(JSON.stringify(res))
		})
		.catch(err => {
			console.log(err);
		});
	},
	computed: {},
	onReady() {},
	methods: {
		SelectWork(index){
			this.DataList.goodAtSales[index].isLike = !this.DataList.goodAtSales[index].isLike;
		},
		openingTime() {
			this.show = true
		},
		confirm(e){
			console.log(JSON.stringify(e))
			this.Time = e.year +'-'+ e.month +'-'+ e.day;
		},
		Submit(){
			console.log("提交")
			
			// 监理基本资料修改
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMySupervisorDetail';
			var RequrestDatas = {
			  "workingYears": this.DataList.workingYears,
			  "company": this.DataList.company,
			  "goodAtSales": this.DataList.goodAtSales,
			}
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