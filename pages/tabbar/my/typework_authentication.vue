<template>
	<view class="content">
		<view class="p-1 flex flex-wrap">

			<view @tap="skipTest(item)" v-for="(item,index) in DataList" :key="index"
				class="bg-white flex flex-column m-1 rounded pt-2 pl-2 pb-2"
				style="height: 200rpx;width: 344rpx;position: relative;">
				<image class="ml-1" :src="item.cover" style="width: 60rpx;height: 60rpx;"></image>
				<text class="mt-2" style="font-size: 28rpx;color: #101010;">{{item.title}}</text>
				<text class="mt-1" v-if="item.status == '1'" style="font-size: 24rpx;color: red;">{{item.status_text}}</text>
				<text class="mt-1" v-else style="font-size: 24rpx;color: #777;">{{item.status_text}}</text>
				<text v-if="false" class="px-3"
					style="font-size: 22rpx;color: #FF0000;background-color: #FFD6D6;border-radius: 20rpx 0rpx 0rpx 20rpx;position: absolute;top: 30rpx;right: 0;padding-top: 5rpx;padding-bottom: 5rpx;">
					默认
				</text>
			</view>
		</view>

		<u-mask class="flex justify-center align-center" :show="showWork" :zoom="false">
			<view class="bg-white rounded" style="width: 570rpx;height: 800rpx">
				<view class="flex justify-end align-end pr-2" style="height: 50rpx;">
					<u-icon @click="CloseModal" name="close" color="#bbb" size="30"></u-icon>
				</view>
				<view class="flex justify-center align-center" style="height: 70rpx;">
					<text style="color: #101010;font-size: 32rpx;font-weight: bold;">选择您需要认证的工种</text>
				</view>
				<view class="px-2 bg-white" style="height: 520rpx;font-size: 26rpx;">
					<scroll-view scroll-y="true" style="height: 100%;" class="pt-3">
						<!-- 未认证 -->
						<view class="">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text
										style="color: #999;font-size: 24rpx;">未认证</text></view>
							</view>
							<view class="flex flex-wrap " style="">

								<view v-for="(item,index) in notCertifiedList" :key="index"
									@click="SelectWorkType(index)" :class="item.isLike?'Selection':'NoSelection'"
									class="mb-2 ml-2 flex align-center justify-center "
									style="width: 150rpx;height: 60rpx;">
									<text style="font-size: 24rpx;">{{item.title}}</text>
								</view>

								<!-- <view @click="SelectWork(mItem.id)" :class="[currents.indexOf(mItem.id) > -1 ? 'Selection' : 'NoSelection']"
								 v-for="(mItem, mIndex) in ModalData.notCertified" :key="mIndex" class="mb-2 ml-2 flex align-center justify-center"
								 style="width: 150rpx;height: 60rpx;">
									<text style="font-size: 24rpx;">{{ mItem.name }}</text>
								</view> -->
								<!-- <view @click="SelectWork(mItem.id)"
									:class="[currents.indexOf(mItem.id) > -1 ? 'Selection' : 'NoSelection']"
									v-for="(mItem, mIndex) in DataList.certifiedTypeWork.notCertified" :key="mIndex"
									class="mb-2 ml-2 flex align-center justify-center"
									style="width: 150rpx;height: 60rpx;">
									<text style="font-size: 24rpx;">{{ mItem.name }}</text>
								</view> -->
							</view>
						</view>
						<!-- 已经认证 -->
						<view class="">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text
										style="color: #999;font-size: 24rpx;">已经认证</text></view>
							</view>
							<view class="flex flex-wrap " style="">
								<view v-for="(item,index) in yesCertifiedList" :key="index"
									class="mb-2 ml-2 flex align-center justify-center"
									style="width: 150rpx;height: 60rpx;background-color: #3E8EFF;">
									<text style="color: #FFFFFF;font-size: 24rpx;">{{item.title}}</text>
								</view>
							</view>
						</view>
						<!-- 审核中 -->
						<!-- <view class="" v-if="DataList.certifiedTypeWork.underReview.length > 0">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text
										style="color: #999;font-size: 24rpx;">审核中</text></view>
							</view>
							<view class="flex flex-wrap " style="">
								<view v-for="(cItem, cIndex) in DataList.certifiedTypeWork.underReview" :key="cIndex"
									class="mb-2 ml-2 flex align-center justify-center"
									style="width: 150rpx;height: 60rpx;background-color: #2979FF;">
									<text style="color: #FFFFFF;font-size: 24rpx;">{{ cItem.name }}</text>
								</view>
							</view>
						</view> -->
						<!-- 审核失败 -->
						<!-- <view class="">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text style="color: #999;font-size: 24rpx;">审核失败</text></view>
							</view>
							<view class="flex flex-wrap " style="">
								<view v-for="(cItem, cIndex) in DataList.certifiedTypeWork.auditFailure" :key="cIndex" class="mb-2 ml-2 flex align-center justify-center"
								 style="width: 150rpx;height: 60rpx;background-color: #FA3534;">
									<text style="color: #FFFFFF;font-size: 24rpx;">{{ cItem.name }}</text>
								</view>
							</view>
						</view> -->
					</scroll-view>
				</view>
				<view class="flex justify-center align-center" style="height: 160rpx;">
					<u-button @click="Submit" :disabled="isCheck" type="warning"
						style="width: 300rpx;font-size: 26rpx;height: 70rpx;">提交认证资料</u-button>
				</view>
			</view>
		</u-mask>

	</view>

</template>

<script>
	export default {

		data() {
			return {
				showWork: false,
				DictList: [{
						name: '设计师',
						value: 1
					},
					{
						name: '销售人员',
						value: 3
					},
					{
						name: '监理',
						value: 4
					},
					{
						name: '工人',
						value: 5
					},
					{
						name: '商铺',
						value: 2
					},
					{
						name: '房产经纪人',
						value: 6
					},
					{
						name: '房产经纪公司',
						value: 10
					}
					// ,
					// {
					// 	name:'会员',
					// 	value:0
					// }
				],
				DataList: [], //Mock数据
				notCertifiedList: [], //未认证工种
				isCheck: true,
				yesCertifiedList: [], //已认证工种
				imgSrc: 'https://ajb-app-dev.oss-cn-shenzhen.aliyuncs.com/AppSource/Img/shejishi.png'
			};
		},
		onLoad() {

		},
		onShow() {
			this.showWork = false;
			this.isCheck = true;

			// 获取未认证工种
			this.$post(this.$url.User.GetCatalogCerts, {}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				this.DataList = res.data;
			});

			// 初始化
			this.notCertifiedList = [];
			this.yesCertifiedList = [];
			// 获取未认证工种
			this.$post(this.$url.User.GetMyWorkCerts, {}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				// -1表示未认证，其他表示已经认证
				res.data.forEach(item => {
					if (item.status == -1) {
						item['isLike'] = false;
						this.notCertifiedList.push(item)
					} else {
						this.yesCertifiedList.push(item)
					}
				})
			});
		},
		methods: {
			// 提交认证资料
			Submit() {
				// 拿到catalog
				this.notCertifiedList.forEach(item => {
					if (item.isLike) {
						uni.navigateTo({
							url: '/pages/tabbar/my/authentication/type_work?title=工人认证&catalog=' + item
								.catalog
						})
					}
				})
			},
			// 单选
			SelectWorkType(index) {
				this.isCheck = false;
				this.notCertifiedList.forEach(item => {
					item.isLike = false
				})
				this.notCertifiedList[index].isLike = true;
			},
			CloseModal() {
				this.showWork = false;
			},
			skipTest(item) {
				console.log(item)
				
				if(item.status == 0){
					return
				}
				
				// 设计师
				if (item.catalog == '1') {
					//跳转相关界面
					uni.navigateTo({
						// url:'/pages/tabbar/my/identityauthentication/MembershipCertification'
						url: '/pages/tabbar/my/authentication/type_work?title=设计师认证&catalog=' + item.catalog
					})
				}
				// 商铺
				if (item.catalog == '2') {
					//跳转相关界面
					// uni.navigateTo({
					// 	url: '/pages/tabbar/my/identityauthentication/Business/Frist'
					// })
					uni.navigateTo({
						url:'/pages/tabbar/my/authentication/shop_certification'
					})
				}
				
				// 销售人员
				if (item.catalog == '3') {
					//跳转相关界面
					uni.navigateTo({
						// url:'/pages/tabbar/my/identityauthentication/MembershipCertification'
						url: '/pages/tabbar/my/authentication/type_work?title=销售人员认证&catalog=' + item.catalog
					})
				}
				// 监理
				if (item.catalog == '4') {
					//跳转相关界面
					uni.navigateTo({
						// url:'/pages/tabbar/my/identityauthentication/MembershipCertification'
						url: '/pages/tabbar/my/authentication/type_work?title=监理认证&catalog=' + item.catalog
					})
				}

				// 跳转
				if (item.status == -1) {


					// 工人
					if (item.catalog == '5') {
						this.showWork = true;

						// 设计师、工人、销售、监理认证认证
						// User/UpdateWorkerCert

					}
				} else {
					console.log("当前状态不可认证")
				}
				// uni.navigateTo({
				// 	url:'/pages/tabbar/my/identityauthentication/Business/Frist'
				// })
			},
			// 添加认证
			AddAuthentication() {
				uni.navigateTo({
					url: '/pages/tabbar/my/typework_authentication'
				})
			},
			skipPage(item) {
				uni.navigateTo({
					url: '/pages/tabbar/my/identityauthentication/' + item.urlPage + '?authenticate=' + item
						.authenticate
				});
				// if (item.isAgreeShareAgreement || item.urlPage == 'MembershipCertification' ||
				// 	item.urlPage == 'BusinessCertification') {
				// 	uni.navigateTo({
				// 		url: '/pages/tabBar/my/identityauthentication/Business/Frist'
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/tabBar/my/Agreement/AgreeShareAgreement?authenticate=' + item.authenticate +
				// 			'&url=' + item.urlPage
				// 	})
				// }
			},
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

	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}

	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}

	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
	
	.red-color{
		color: red;
	}
</style>
