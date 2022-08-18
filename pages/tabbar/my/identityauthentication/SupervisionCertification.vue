<template>
	<view class="p-3">
		<view class="flex bg-white flex-column align-center py-5">
			<view class="">
				<image :src="DataList.imgIcon" style="width: 120rpx;height: 120rpx;"></image>
			</view>
			<text style="font-size: 26rpx;color: #777;">{{DataList.workType}}</text>
			<text class="my-1" style="font: 26rpx;color: #0072FF;">{{DataList.name}}</text>
			<view v-if="DataList.address != ''" class="" style="color: #777;">
				<text class="iconfont" style="font-size: 28rpx;">&#xe65e;</text>
				<text style="font-size: 26rpx;">{{DataList.address}}</text>
			</view>
		</view>

		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">工龄</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">{{DataList.workingYears}}</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">公司</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">{{DataList.company}}</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">监理擅长</text>
				<view class="flex pr-2">
					<view class="flex justify-end flex-wrap" style="width: 480rpx;">
						<text v-for="(item,index) in DataList.goodAtSales" :key="index" v-if="item.isLike" class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">{{item.name}}</text>
						<!-- <text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text> -->
					</view>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
		</view>
		
		
		
		<u-action-sheet :list="list" @click="SetUpClick" v-model="show"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	onNavigationBarButtonTap(e) {
		if (e.float == 'right') {
			this.show = true;
		}
	},
	data() {
		return {
			list: [],
			show: false,
			DataList: '' ,//Mock数据
			Authenticate:false
		};
	},
	onLoad(options) {
		this.Authenticate = JSON.parse(options.authenticate);
		if(this.Authenticate == true){
			this.list = [{
				text: '设为默认'
			}, {
				text: '修改基本资料'
			}]
		}else{
			this.list = [{
				text: '修改基本资料'
			}]
		}
	},
	onShow() {
		// 获取监理认证信息
		var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMySupervisorDetail';
		var RequrestDatas = {};
		this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
			this.DataList = res.dataList;
			console.log(JSON.stringify(res))
		})
		.catch(err => {
			console.log(err);
		});
		
		// var DataLists = {
		// 	code: 200,
		// 	msg: 'ok',
		// 	dataList: {
		// 		imgIcon: 'https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E7%9B%91%E7%90%86.png',
		// 		workType: '监理',
		// 		name: '帅气的军哥',
		// 		address: '四川省成都市武侯区G213辅路',
		// 		workingYears: '10年',
		// 		company: 'xxx科技有限公司',
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
	methods: {
		// 个体工商户注册
		skipBusinessRegistration(){			
			if(this.DataList.isRegister){
				return;
			}
			uni.navigateTo({
				url:'/pages/tabBar/my/RegistrationAgreement/BusinessRegistration?name=监理'
			})
		},
		// 平台服务协议
		skipServiceAgreement(){
			if(this.DataList.isSign){
				return;
			}
			uni.navigateTo({
				url:'/pages/tabBar/my/RegistrationAgreement/ServiceAgreement?name=监理'
			})
		},
		SetUpClick(index) {
			if (index == 0 && this.Authenticate == true) {
				// 设为默认
				var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetDefaultProfession';
				var RequrestDatas = {
					type: '监理'
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then(res => {
						if (res.code == 200) {
							this.SetIdentity();
						} else {
							this.$refs.uToast.show({
								title: '设置失败',
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
			if (index == 0 && this.Authenticate == false) {
				// 跳转到设计师基本信息
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/modify/SupervisionCertification'
				});
			}
			if (index == 1) {
				// 跳转到设计师基本信息
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/modify/SupervisionCertification'
				});
			}
			console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`);
		},
		SetIdentity() {
			// 修改个人自定义资料
			// 自定义资料字段需要预先在控制台配置，详细请参考：https://cloud.tencent.com/document/product/269/1500#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.B5.84.E6.96.99.E5.AD.97.E6.AE.B5
			let promise = getApp().$tim.updateMyProfile({
				// 这里要求您已在即时通信 IM 控制台>【应用配置】>【功能配置】 申请了自定义资料字段 Tag_Profile_Custom_Test1
				// 注意：即使只有一个自定义资料字段，profileCustomField 也需要用数组类型
				profileCustomField: [{
					key: 'Tag_Profile_Custom_Rank',
					value: '监理'
				}]
			});
			promise.then(imResponse => {
				console.log("更新资料成功");
				this.$refs.uToast.show({
					title: '设置成功',
					type: 'success'
				});
				console.log(JSON.stringify(imResponse.data)); // 更新资料成功
			}).catch(imError => {
				console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
