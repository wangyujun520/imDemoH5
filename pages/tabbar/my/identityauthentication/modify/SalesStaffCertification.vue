<template>
	<view class="content">
		<view class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 80rpx;">
					<text style="font-size: 30rpx;color: #101010;">工龄</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.workingYears" style="font-size: 28rpx;color: #777;" placeholder="请输入工龄" />
				</view>
			</view>
		</view>
		<!-- <view class="flex justify-between pl-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="" style="color: #101010;font-size: 28rpx;">销售擅长</text>
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
			<text class="" style="color: #101010;font-size: 28rpx;">销售擅长</text>
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
		// 销售人员认证首页
		var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMySalesManDetail';
		var RequrestDatas = {};
		this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
			this.DataList = res.dataList;
			console.log(JSON.stringify(res));
		})
		.catch(err => {
			console.log(err);
		});
		
		// var DataLists = {
		// 	code: 200,
		// 	msg: 'ok',
		// 	dataList: {
		// 		imgIcon: 'https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E8%B4%AD%E7%89%A9%E8%BD%A6.png',
		// 		workType: '销售人员',
		// 		name: '张三',
		// 		address: '四川省成都市武侯区G213辅路',
		// 		workingYears: '10年',
		// 		goodAtSales: [
		// 			{
		// 				name: 'A类型',
		// 				isLike: false
		// 			},
		// 			{
		// 				name: 'B类型',
		// 				isLike: true
		// 			},
		// 			{
		// 				name: 'C类型',
		// 				isLike: false
		// 			},
		// 			{
		// 				name: 'D类型',
		// 				isLike: true
		// 			},
		// 			{
		// 				name: 'E类型',
		// 				isLike: true
		// 			},
		// 			{
		// 				name: 'F类型',
		// 				isLike: true
		// 			},
		// 			{
		// 				name: 'G类型',
		// 				isLike: true
		// 			}
		// 		]
		// 	}
		// };
		// this.DataList = DataLists.dataList;
	},
	computed: {},
	onReady() {},
	methods: {
		SelectWork(index){
			this.DataList.goodAtSales[index].isLike = !this.DataList.goodAtSales[index].isLike;
		},
		Submit(){
			console.log("提交")
			
			// 销售人员基本资料修改
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMySalesManDetail';
			var RequrestDatas = {
				"workingYears": this.DataList.workingYears,
				"goodAtSales": this.DataList.goodAtSales
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