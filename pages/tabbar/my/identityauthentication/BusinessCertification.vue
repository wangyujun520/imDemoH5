<template>
	<!-- 商家认证 -->
	<view class="p-3">
		<view class="flex bg-white flex-column align-center py-5">
			<view class="">
				<image src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E4%BC%9A%E5%91%98.png" style="width: 120rpx;height: 120rpx;"></image>
				<!-- <image :src="DataList.imgIcon" style="width: 120rpx;height: 120rpx;"></image> -->
			</view>
			<text style="font-size: 26rpx;color: #777;">商铺</text>
			<text class="my-1" style="font: 26rpx;color: #0072FF;">四川天宇门窗</text>
			<view v-if="DataList.address" style="color: #777;">
				<text class="iconfont" style="font-size: 28rpx;">&#xe65e;</text>
				<text style="font-size: 26rpx;">{{DataList.address}}</text>
			</view>
		</view>

		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">负责人</text>
				<view class="flex align-center pr-2">
					<image  src="/static/img/authentication.png"
						style="width: 30rpx;height: 30rpx;"></image>
					<text 
						style="color: #777;font-size: 28rpx;">{{DataList.name}}</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">联系电话</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">{{DataList.mobile}}</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">开业时间</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">{{DataList.open_date}}</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view class="flex justify-between pl-2 pt-3 pb-2"
				style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">主营商品</text>
				<view class="flex pr-2">
					<view class="flex justify-end flex-wrap" style="width: 480rpx;">
						<text style="color: #777;font-size: 28rpx;">{{DataList.major_goods}}</text>
						<!-- <text style="color: #777;font-size: 28rpx;" v-for="(catalog,index) in DataList.major_catalog">{{catalog}}<text v-if="(DataList.major_catalog.length-1)>index">、</text></text> -->
					</view>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view @tap="skipSharingBroker" class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">共享经纪协议</text>
				<view class="flex align-center">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @tap="skipDesignerPlatformServices" class="flex justify-between align-center pl-2"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">平台服务协议</text>
				<view class="flex align-center">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>

		<view class="flex flex-column bg-white mt-2 rounded">
			
			<view @click="skipBusinessLicense" class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">营业执照</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<!-- <view @click="skipHoldingIDCard" class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">手持身份证</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view> -->
			<view @click="skipFrontDoorPhoto" class="flex justify-between align-center pl-2 border-bottom"
				style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">门面照</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @click="skipShopStaff" class="flex justify-between align-center pl-2" style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">商铺员工</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
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
				catalog:'',
				list: [],
				show: false,
				DataList: {
					title: "", //商铺名称
					province: '', //省份
					city: '', //城市
					county: '', //区县
					address: "", //详细
					name: "", //昵称
					mobile: "", //手机号码
					open_date: "", //开始时间
					major_catalog: "", //主营类别
					major_goods: "", //主营商品
					hand_id_card: "", //手持照片
					door_head: "", //门头照
					biz_license: "" //营业执照
				}, //Mock数据
				Authenticate: false
			}
		},
		onLoad(options) {
			// 获取商铺认证信息
			this.$post(this.$url.User.GetMallCert, {}, {
				isLoading: false
			}).then(res => {
				this.DataList = res.data;
			});
			
			this.catalog = options.catalog;
			
			this.list = [{
				text: '设为默认'
			}]
			// this.Authenticate = JSON.parse(options.authenticate);
			// if (this.Authenticate == true) {
			// 	this.list = [{
			// 		text: '设为默认'
			// 	}, {
			// 		text: '修改基本资料'
			// 	}]
			// } else {
			// 	this.list = [{
			// 		text: '修改基本资料'
			// 	}]
			// }
		},
		onShow() {

			// // 获取商家认证首页信息
			// // var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyShangJiaDetail';
			// var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyMerchantDetail';
			// var RequrestDatas = {};
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
			// 		console.log(JSON.stringify(res))
			// 		this.DataList = res.dataList;
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 	});

			// var DataLists = {
			// 	"code": 200,
			// 	"msg": "ok",
			// 	"dataList": {
			// 		"imgIcon": "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%95%86%E5%AE%B6.png",
			// 		"workType": "商家",
			// 		"name": "四川天宇门窗",
			// 		"address": "四川省成都市武侯区G213辅路",
			// 		"director": "马保国",
			// 		"phone": "13878520123",
			// 		"openingTime": "2010-10-01",
			// 		"mainProducts": "主材：门、窗、厨房"
			// 	}
			// }
			// this.DataList = DataLists.dataList;

		},
		methods: {
			skipSharingBroker(){
				uni.navigateTo({
					url:'/pages/tabbar/my/identityauthentication/Designer/SharingBroker'
				})
			},
			skipDesignerPlatformServices(){
				uni.navigateTo({
					url:'/pages/tabbar/my/identityauthentication/Designer/DesignerPlatformServices'
				})
			},
			// 个体工商户注册
			skipBusinessRegistration() {
				if (this.DataList.isRegister) {
					return;
				}
				uni.navigateTo({
					url: '/pages/tabbar/my/RegistrationAgreement/BusinessRegistration?name=商家'
				})
			},
			// 平台服务协议
			skipServiceAgreement() {

				//创建签订合同

				if (this.DataList.isSign) {
					return;
				}
				uni.navigateTo({
					url: '/pages/tabbar/my/RegistrationAgreement/ServiceAgreement?name=商家'
				})
			},
			SetUpClick(index) {
				// 设为默认
				this.$post(this.$url.User.SetDefaultCert, {
					catalog:this.catalog
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success'
					});
				});
				
				// console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
				// if (index == 0 && this.Authenticate == true) {
				// 	// 设为默认
				// 	var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetDefaultProfession';
				// 	var RequrestDatas = {
				// 		"type": "商家"
				// 	};
				// 	this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
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
				// 	// 跳转到商家基本信息
				// 	uni.navigateTo({
				// 		url: '/pages/tabbar/my/identityauthentication/modify/BusinessCertification?list=' + JSON
				// 			.stringify(this.DataList)
				// 	})
				// }
				// if (index == 1) {
				// 	// 跳转到商家基本信息
				// 	uni.navigateTo({
				// 		url: '/pages/tabbar/my/identityauthentication/modify/BusinessCertification?list=' + JSON
				// 			.stringify(this.DataList)
				// 	})
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
				// 		value: '商家'
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
			skipBusinessLicense() {
				// 跳转到营业执照认证
				uni.navigateTo({
					url: '/pages/tabbar/my/datamodification/BusinessLicense?biz_license='+this.DataList.biz_license
				})
			},
			skipHoldingIDCard() {
				// 跳转到手持身份证
				uni.navigateTo({
					url: '/pages/tabbar/my/datamodification/HoldingIDCard?hand_id_card='+this.DataList.hand_id_card
				})
			},
			skipFrontDoorPhoto() {
				// 跳转到门面照
				uni.navigateTo({
					url: '/pages/tabbar/my/datamodification/FrontDoorPhoto?door_head='+this.DataList.door_head
				})
			},
			skipShopStaff() {
				// 跳转到商铺员工
				uni.navigateTo({
					url: '/pages/tabbar/my/datamodification/ShopStaff?mall_id='+this.DataList.mall_id
				})
			},
			//e签宝注册
			RegisteredEsign() {
				// var RequrestUrl = this.AJB.BizUrl + 'api/Esign/RegisteredEsign';
				// var RequrestDatas = {
				// 	"openingTime": this.Time,
				// 	"mainProducts": this.MainProducts
				// };
				// this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {

				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 	});
			}

		},
	}
</script>

<style>
page{
	background-color: #f7f7f7;
}
</style>
