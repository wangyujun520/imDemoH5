<template>
	<view class="px-3 pb-3">
		<!-- <u-notice-bar class="mt-2" :list="NoticeBarList"></u-notice-bar> -->
		<u-notice-bar class="mt-2" :list="DataList.authenticationMessage"></u-notice-bar>
		<view class="flex bg-white flex-column align-center py-5 mt-2">
			<view class="">
				<image src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%B7%A5%E4%BA%BA.png" style="width: 120rpx;height: 120rpx;"></image>
				<!-- <image :src="DataList.imgIcon" style="width: 120rpx;height: 120rpx;"></image> -->
			</view>
			<text style="font-size: 26rpx;color: #777;">工人</text>
			<text class="my-1" style="font: 26rpx;color: #0072FF;">张三丰</text>
			<view class="" style="color: #777;">
				<text class="iconfont" style="font-size: 28rpx;">&#xe65e;</text>
				<text style="font-size: 26rpx;">四川省成都市金牛区凤凰山街道</text>
			</view>
		</view>

		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">已认证工种</text>
				<view class="flex pr-2">
					<view class="flex justify-end flex-wrap" style="width: 480rpx;">
						<text v-for="i in 8" class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">电工</text>
					</view>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">工龄</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">20</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">公司</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">xxx公司</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">擅长</text>
				<view class="flex pr-2">
					<view class="flex justify-end flex-wrap" style="width: 480rpx;">
						<text v-for="i in 5" class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">搬砖</text>
					</view>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
		</view>
		<u-action-sheet :list="list" @click="SetUpClick" v-model="actionSheetShow"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	onNavigationBarButtonTap(e) {
		if (e.float == 'right') {
			this.actionSheetShow = true;
		}
	},
	onBackPress(e) {
		// 这里可以自定义返回逻辑，比如下面跳转其他页面
		console.log(JSON.stringify(e));
		uni.redirectTo({
		    url: '/pages/tabBar/my/mycertification'
		});
		// return true 表示禁止默认返回
		return true;
	},
	data() {
		return {
			list: [],
			DataList:"",//Mock数据
			Authenticate:false,
			actionSheetShow: false
		};
	},
	onLoad(options) {
		this.list = [{
			text: '设为默认'
		}, {
			text: '修改基本资料'
		}]
		// this.Authenticate = JSON.parse(options.authenticate);
		// if(this.Authenticate == true){
		// 	this.list = [{
		// 		text: '设为默认'
		// 	}, {
		// 		text: '修改基本资料'
		// 	}]
		// }else{
		// 	this.list = [{
		// 		text: '修改基本资料'
		// 	}]
		// }
	},
	onShow() {
		// // 工人认证首页
		// var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyWorkerDetail';
		// var RequrestDatas = {};
		// this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
		// 	this.DataList = res.dataList;
		// 	console.log(JSON.stringify(this.DataList));
		// })
		// .catch(err => {
		// 	console.log(err);
		// });
		
		var DataLists = {
			"code": 200,
			"msg": "ok",
			"dataList": {
				"authenticationMessage": [
					"水工资料审核中",
					"电工资料审核中",
					"木工资料审核失败"
				],
				"imgIcon": "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%B7%A5%E4%BA%BA.png",
				"workType": "工人",
				"name": "王玉军",
				"address": "四川省成都市武侯区G213辅路",
				"certifiedTypeWork": {
					"notCertified": [{
							"id": 1,
							"name": "墙面"
						},
						{
							"id": 2,
							"name": "保洁"
						},
						{
							"id": 3,
							"name": "小工"
						},
						{
							"id": 4,
							"name": "漆工"
						},
						{
							"id": 5,
							"name": "木工"
						},
						{
							"id": 6,
							"name": "开孔"
						},
						{
							"id": 7,
							"name": "防水"
						},
						{
							"id": 8,
							"name": "拆改"
						},
						{
							"id": 9,
							"name": "水工"
						}
					],
					"certified": [{
							"id": 10,
							"name": "泥瓦"
						},
						{
							"id": 11,
							"name": "电工"
						}
					],
					"underReview": [{
						"id": 5,
						"name": "C工种"
					}],
					"auditFailure": [{
						"id": 3,
						"name": "A工种"
					}]
				},
				"workingYears": "10年",
				"company": "xxx科技有限公司",
				"goodAtSales": [{
						"name": "A类型",
						"isLike": true
					},
					{
						"name": "B类型",
						"isLike": false
					},
					{
						"name": "C类型",
						"isLike": true
					},
					{
						"name": "D类型",
						"isLike": false
					},
					{
						"name": "E类型",
						"isLike": true
					},
					{
						"name": "F类型",
						"isLike": false
					}
				]
			}
		}
		this.DataList = DataLists.dataList;
	
	},
	methods: {
		// 个体工商户注册
		skipBusinessRegistration(){
			if(this.DataList.isRegister){
				return;
			}
			uni.navigateTo({
				url:'/pages/tabBar/my/RegistrationAgreement/BusinessRegistration?name=工人'
			})
		},
		// 平台服务协议
		skipServiceAgreement(){
			if(this.DataList.isSign){
				return;
			}
			uni.navigateTo({
				url:'/pages/tabBar/my/RegistrationAgreement/ServiceAgreement?name=工人'
			})
		},
		SetUpClick(index) {
			if (index == 0 && this.Authenticate == true) {
				// 设为默认
				var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetDefaultProfession';
				var RequrestDatas = {
					"type":"工人"
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					if(res.code == 200){
						this.SetIdentity();
					}else{
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
			if(index == 0 && this.Authenticate == false){
				// 跳转到工人基本信息
				uni.navigateTo({
					url:'/pages/tabbar/my/identityauthentication/modify/WorkerCertification?worklist='+JSON.stringify(this.DataList)
				})
			}
			if(index == 1){
				// 跳转到工人基本信息
				uni.navigateTo({
					url:'/pages/tabbar/my/identityauthentication/modify/WorkerCertification?worklist='+JSON.stringify(this.DataList)
				})
			}
			console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
		},
		SetIdentity() {
			// 修改个人自定义资料
			// 自定义资料字段需要预先在控制台配置，详细请参考：https://cloud.tencent.com/document/product/269/1500#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.B5.84.E6.96.99.E5.AD.97.E6.AE.B5
			let promise = getApp().$tim.updateMyProfile({
				// 这里要求您已在即时通信 IM 控制台>【应用配置】>【功能配置】 申请了自定义资料字段 Tag_Profile_Custom_Test1
				// 注意：即使只有一个自定义资料字段，profileCustomField 也需要用数组类型
				profileCustomField: [{
					key: 'Tag_Profile_Custom_Rank',
					value: '工人'
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

<style lang="scss">
page{
	background-color: #f7f7ff;
}
</style>
