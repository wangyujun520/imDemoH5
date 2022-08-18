<template>
	<view class="p-3">
		<view class="flex bg-white flex-column align-center py-5">
			<view class="">
				<image
					src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E8%AE%BE%E8%AE%A1%E5%B8%88.png"
					style="width: 120rpx;height: 120rpx;"></image>
				<!-- <image :src="DataList.imgIcon" style="width: 120rpx;height: 120rpx;"></image> -->
			</view>
			<text style="font-size: 26rpx;color: #777;">{{title}}</text>
			<text class="my-1" style="font: 26rpx;color: #0072FF;">{{DataList.name}}</text>
			<view v-if="DataList.address != ''" class="" style="color: #777;">
				<text class="iconfont" style="font-size: 28rpx;">&#xe65e;</text>
				<text style="font-size: 26rpx;">{{DataList.address}}</text>
			</view>
		</view>

		<view class="flex flex-column bg-white mt-2 rounded">

			<!-- <view class="flex justify-between align-center pl-2" style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">姓名</text>
				<view class="flex align-center">
					<image src="/static/img/authentication.png" style="width: 30rpx;height: 30rpx;"></image>
					<text style="color: #777;font-size: 28rpx;">张天宇</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view> -->

			<view @click="skipDesignerCertificate" class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">姓名</text>
				<view class="flex align-center">
					<image src="/static/img/authentication.png" style="width: 30rpx;height: 30rpx;"></image>
					<text style="color: #777;font-size: 28rpx;">{{DataList.name}}</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>

			<view class="flex justify-between align-center pl-2 border-bottom" style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">联系电话</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">{{DataList.mobile}}</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>

			<view class="flex justify-between align-center pl-2 border-bottom" style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">工龄</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">{{DataList.age}}</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between align-center pl-2 border-bottom" style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">公司</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">平台</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>

			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">擅长</text>
				<view class="flex pr-2">
					<view class="flex justify-end flex-wrap" style="width: 480rpx;">
						<text v-for="skilTag in DataList.skills" 
							 class="rounded mb-1 ml-1"
							style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">{{skilTag}}</text>
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
			
			<!-- <view class="flex justify-between pl-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">擅长</text>
				<view class="flex">
					<view class="flex justify-end flex-wrap" style="width: 520rpx;">
						<text @click="GoodSelectWork(indexgood)" :class="[itemgood.isLike ? 'Selection' : 'NoSelection']" v-for="(itemgood,indexgood) in DataList.goodAtSales"
						 :key="indexgood" class="rounded mb-1 ml-1" style="font-size: 26rpx;padding: 10rpx 30rpx;">{{itemgood.name}}</text>
					</view>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view> -->
			
			
		</view>
		<view class="flex flex-column bg-white mt-2 rounded">
			<view @tap="skipSharingBroker" class="flex justify-between pl-2 pt-3 pb-2 border-bottom"
				style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">共享经纪协议</text>
				<view class="flex pr-2">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @tap="skipDesignerPlatformServices" class="flex justify-between pl-2 pt-3 pb-2"
				style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">设计师平台服务协议</text>
				<view class="flex pr-2">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		<!-- <view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between pl-2 pt-3 pb-2 border-bottom" style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">银行卡</text>
				<view class="flex pr-2">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">身份证</text>
				<view class="flex pr-2">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view> -->
		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">商家销售授权</text>
				<view class="flex pr-2">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">推荐人</text>
				<view class="flex pr-2">
					<text style="color: #777;font-size: 28rpx;">没有推荐人</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
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
				title: '',
				catalog: '',
				list: [],
				show: false,
				DataList: {}, //Mock数据
				Authenticate: false
			};
		},
		onLoad(options) {
			this.catalog = options.catalog;
			this.title = options.title;
			uni.setNavigationBarTitle({
				title: `${options.title}信息`
			});

			this.InitData();

			this.list = [{
				text: '设为默认'
			}]


			// this.list = [{
			// 	text: '设为默认'
			// }, {
			// 	text: '修改基本资料'
			// }]


			// this.Authenticate = JSON.parse(options.authenticate);
			// if(this.Authenticate == true){
			// this.list = [{
			// 	text: '设为默认'
			// }, {
			// 	text: '修改基本资料'
			// }]
			// }else{
			// 	this.list = [{
			// 		text: '修改基本资料'
			// 	}]
			// }
		},
		methods: {
			// 跳转到共享经纪协议界面
			skipSharingBroker() {
				uni.navigateTo({
					url: '/pages/tabbar/my/identityauthentication/Designer/SharingBroker'
				})
			},
			// 跳转到设计师平台服务协议界面
			skipDesignerPlatformServices() {
				uni.navigateTo({
					url: '/pages/tabbar/my/identityauthentication/Designer/DesignerPlatformServices'
				})
			},
			InitData() {
				this.$post(this.$url.User.GetWorkerCert, {
					catalog: this.catalog //1=设计师认证；3=销售；4=监理
				}, {
					isLoading: false
				}).then(res => {
					// console.log(res)
					if (res.status != 0) {
						// 返回上一个界面
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					} else {
						this.DataList = res.data;
					}
				});
			},
			// 个体工商户注册
			skipBusinessRegistration() {
				if (this.DataList.isRegister) {
					return;
				}
				uni.navigateTo({
					url: '/pages/tabbar/my/RegistrationAgreement/BusinessRegistration?name=设计师'
				})
			},
			// 平台服务协议
			skipServiceAgreement() {
				if (this.DataList.isSign) {
					return;
				}
				uni.navigateTo({
					url: '/pages/tabbar/my/RegistrationAgreement/ServiceAgreement?name=设计师'
				})
			},
			SetUpClick(index) {
				// console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`);
				// 设为默认
				this.$post(this.$url.User.SetDefaultCert, {
					catalog: this.catalog
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success'
					});
				});

				// uni.navigateTo({
				// 	url: '/pages/tabbar/my/identityauthentication/modify/DesignerCertification'
				// });
				// if (index == 0 && this.Authenticate == true) {
				// 	// 设为默认
				// 	var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetDefaultProfession';
				// 	var RequrestDatas = {
				// 		type: '设计师'
				// 	};
				// 	this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				// 		.then(res => {
				// 			if (res.code == 200) {
				// 				this.SetIdentity();
				// 			} else {
				// 				this.$refs.uToast.show({
				// 					title: '设置失败',
				// 					type: 'error'
				// 				});
				// 			}
				// 		})
				// 		.catch(err => {
				// 			console.log(err);
				// 		});
				// }
				// if (index == 0 && this.Authenticate == false) {
				// 	// 跳转到设计师基本信息
				// 	uni.navigateTo({
				// 		url: '/pages/tabbar/my/identityauthentication/modify/DesignerCertification'
				// 	});
				// }
				// if (index == 1) {
				// 	// 跳转到设计师基本信息
				// 	uni.navigateTo({
				// 		url: '/pages/tabbar/my/identityauthentication/modify/DesignerCertification'
				// 	});
				// }
			},
			SetIdentity() {
				// // 修改个人自定义资料
				// // 自定义资料字段需要预先在控制台配置，详细请参考：https://cloud.tencent.com/document/product/269/1500#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.B5.84.E6.96.99.E5.AD.97.E6.AE.B5
				// let promise = getApp().$tim.updateMyProfile({
				// 	// 这里要求您已在即时通信 IM 控制台>【应用配置】>【功能配置】 申请了自定义资料字段 Tag_Profile_Custom_Test1
				// 	// 注意：即使只有一个自定义资料字段，profileCustomField 也需要用数组类型
				// 	profileCustomField: [{
				// 		key: 'Tag_Profile_Custom_Rank',
				// 		value: '设计师'
				// 	}]
				// });
				// promise.then(imResponse => {
				// 	console.log("更新资料成功");
				// 	this.$refs.uToast.show({
				// 		title: '设置成功',
				// 		type: 'success'
				// 	});
				// 	console.log(JSON.stringify(imResponse.data)); // 更新资料成功
				// }).catch(imError => {
				// 	console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				// });
			},
			skipDesignerCertificate() {
				// 跳转到实名认证页面
				uni.navigateTo({
					url: '/pages/my/authentication/realnameauthentication'
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
</style>
