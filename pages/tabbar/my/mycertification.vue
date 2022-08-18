<template>
	<view class="content">
		<view class="p-1 flex flex-wrap">
			<!-- <view v-for="(item,index) in DataList.dataList" @click="skipPage(item)" -->
			<view @tap="skipPage(item)" v-for="(item,index) in DataList" :key="index" class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2" style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="item.cover" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">{{item.title}}</text>
				<view class="flex align-center justify-between pr-2">
					<text class="mt-1" style="font-size: 24rpx;color: #777;">{{item.name}}</text>
					<text v-if="item.status == 1" style="font-size: 24rpx;color: red;">{{item.status_text}}</text>
				</view>
				<text
				v-if="item.is_default==0"
					class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;"
				>
					默认
				</text>
			</view>
			
			<!-- <view @tap="skipMembershipCertification" class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2" style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="imgSrc" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">监理</text>
				<text class="mt-1" style="font-size: 24rpx;color: #777;">把控规范施工</text>
				<text
				v-if="false"
					class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;"
				>
					默认
				</text>
			</view>
			<view @click="skipWorkerCertification" class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2" style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="imgSrc" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">工人</text>
				<text class="mt-1" style="font-size: 24rpx;color: #777;">强弱点施工</text>
				<text
				v-if="false"
					class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;"
				>
					默认
				</text>
			</view>
			<view class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2" style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="imgSrc" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">销售人员</text>
				<text class="mt-1" style="font-size: 24rpx;color: #777;">水路施工</text>
				<text
				v-if="false"
					class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;"
				>
					默认
				</text>
			</view>
			<view @click="skipBusinessCertification" class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2" style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="imgSrc" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">商家</text>
				<text class="mt-1" style="font-size: 24rpx;color: #777;">平台入住商家</text>
				<text
				v-if="false"
					class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;"
				>
					默认
				</text>
			</view>
			<view class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2" style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="imgSrc" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">房产经济人</text>
				<text class="mt-1" style="font-size: 24rpx;color: #777;">马保国</text>
				<text
				v-if="false"
					class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;"
				>
					默认
				</text>
			</view>
			<view class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2" style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="imgSrc" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">房产经纪公司</text>
				<text class="mt-1" style="font-size: 24rpx;color: #777;">链家地产(半岛城邦店)</text>
				<text
				v-if="false"
					class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;"
				>
					默认
				</text>
			</view> -->
		</view>
		
		<view class="flex justify-center py-3">
			<view @click="AddAuthentication" class="bg-white flex align-center justify-center" style="width: 650rpx;height: 100rpx;">
				<u-icon name="plus" color="#2979ff" size="36"></u-icon>
				<text class="ml-2" style="color: #2979ff;font-size: 26rpx;">添加认证</text>
			</view>
		</view>
		
		
	</view>
	
</template>

<script>
export default {
	onNavigationBarButtonTap: function(e) {
		if (e.float == 'right') {
			// 跳转到收款方式
			uni.navigateTo({
				url:'/pages/tabbar/my/PaymentMethod/Index'
				// url:'/pages/my/wallet/WithdrawalMethod'
			})
		}
	},
	onPageScroll(e) {},
	components: {},
	data() {
		return {
			DataList: '' ,//Mock数据
			imgSrc:'https://ajb-app-dev.oss-cn-shenzhen.aliyuncs.com/AppSource/Img/shejishi.png'
		};
	},
	onShow() {
		// 获取我已经认证明细
		this.$post(this.$url.User.GetMyCerts, {},{
			isLoading:true,
			loadingTitle:'加载中...'
		}).then(res => {
			this.DataList = res.data
		});
		// // 我的认证首页
		// var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyProfession';
		// var RequrestDatas = {};
		// this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
		// 		this.DataList = res;
		// 		console.log(JSON.stringify(res));
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	},
	methods: {
		skipPage(item){
			console.log(item)
			
			if(item.catalog == 2){
				uni.navigateTo({
					url:'/pages/tabbar/my/identityauthentication/BusinessCertification?catalog='+item.catalog+'&title='+item.title
				})
			}else{
				uni.navigateTo({
					// url:'/pages/tabbar/find/DesignerInformation'
					url:'/pages/tabbar/my/identityauthentication/DesignerCertification?catalog='+item.catalog+'&title='+item.title
				})
			}
			
			
		},
		// 添加认证
		AddAuthentication(){
			uni.navigateTo({
				url:'/pages/tabbar/my/typework_authentication'
			})
		},
		// skipPage(item) {
		// 	uni.navigateTo({
		// 		url: '/pages/tabbar/my/identityauthentication/' + item.urlPage + '?authenticate=' + item.authenticate
		// 	});
		// 	// if (item.isAgreeShareAgreement || item.urlPage == 'MembershipCertification' ||
		// 	// 	item.urlPage == 'BusinessCertification') {
		// 	// 	uni.navigateTo({
		// 	// 		url: '/pages/tabBar/my/identityauthentication/Business/Frist'
		// 	// 	})
		// 	// } else {
		// 	// 	uni.navigateTo({
		// 	// 		url: '/pages/tabBar/my/Agreement/AgreeShareAgreement?authenticate=' + item.authenticate +
		// 	// 			'&url=' + item.urlPage
		// 	// 	})
		// 	// }
		// },
		skipMembershipCertification() {
			// 跳转到会员认证界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/MembershipCertification'
			});
		},
		skipBusinessCertification() {
			// 跳转到商家认证界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/BusinessCertification'
			});
		},
		skipSalesStaffCertification() {
			// 跳转到销售人员认证界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/SalesStaffCertification'
			});
		},
		skipDesignerCertification() {
			// 跳转到设计师认证界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/DesignerCertification'
			});
		},
		skipWorkerCertification() {
			// 跳转到工人认证界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/WorkerCertification'
			});
		},
		skipSupervisionCertification() {
			// 跳转到监理认证界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/SupervisionCertification'
			});
		},
		skipBrokerInformation() {
			// 跳转到经纪人信息界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/BrokerInformation'
			});
		},
		skipRealEstateAgency() {
			// 跳转到房产经纪公司界面
			uni.navigateTo({
				url: '/pages/tabbar/my/identityauthentication/RealEstateAgency'
			});
		}
	},
	watch: {}
};
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
}
</style>
