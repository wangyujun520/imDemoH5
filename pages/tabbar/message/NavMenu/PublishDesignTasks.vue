<template>
	<view class="content position-relative">
		<view class="flex flex-column" style="margin: 20rpx;">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="DataList.header" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{DataList.name}}</text>
						</view>
						<view v-if="DataList.money" class="flex align-center">
							<text style="color: #888;font-size: 26rpx;">预算金额：</text>
							<text v-if="DataList.money!=null" style="color: #FF0000;font-weight: bold;"><span
									style="font-size: 26rpx;">￥</span><span
									style="font-size: 30rpx;">{{DataList.money}}</span></text>
						</view>
					</view>
					<view v-if="DataList.isPay" class="flex justify-end align-center pr-2"
						style="height: 100%;width: 200rpx;">
						<view class="">
							<text class="text-white"
								style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
						</view>
					</view>
				</view>

				<view class="px-2 flex flex-wrap align-center">
					<view v-for="(tags,index) in DataList.design_tags" class="mt-2" style="width: 335rpx;">
						<text class="text-title">{{tags.key}}：</text>
						<text class="text-content">{{tags.value}}</text>
					</view>
					<!-- <view class="mt-2" style="width: 335rpx;border: 0px solid red;">
						<text class="text-title">任务周期：</text>
						<text class="text-content">{{DataList.taskDate}}天</text>
					</view>
					<view class="mt-2" style="width: 335rpx;border: 0px solid red;">
						<text class="text-title">任务周期：</text>
						<text class="text-content">{{DataList.taskDate}}天</text>
					</view> -->
				</view>
				<!-- <view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 440rpx;">
						<text class="text-title">预计装修日期：</text>

						<text class="text-content" v-if="DataList.beginTime!=null">{{DataList.beginTime|formatDate}}</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">常驻人口：</text>
						<text class="text-content">{{DataList.peopleNum}}人</text>
					</view>
				</view>

				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 440rpx;">
						<text class="text-title">装修总预算：</text>
						<text class="text-content">{{DataList.cost}}万元</text>
					</view>
				</view> -->
				<view class="px-2 flex align-end" style="height: 60rpx;">
					<text class="text-title">特殊要求</text>
				</view>
				<view class="px-2 my-2">
					<view v-if="DataList.content!=''&&DataList.content!=undefined" class="p-1"
						style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">{{DataList.content}}</text>
					</view>
					<view v-else class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
					</view>
				</view>
			</view>

			<!-- <view @click="skipincludetasks" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">包含项目</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe621;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
				</view>
			</view> -->

			<view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<view class="flex">
						<text style="font-size: 26rpx;color: #999;">到期时间</text>
						<text style="font-size: 26rpx;color: #4CAF50;" class="ml-1">{{DataList.expire}}</text>
					</view>
					<view class="">
						<!-- <text style="font-size: 26rpx;color: #FF9900;">剩余({{DataList.surplus}}天)</text> -->
						<text style="font-size: 26rpx;color: #FF9900;">{{DataList.end_date}}</text>
					</view>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<u-line-progress active-color="#2979ff" :percent="getDate()" :striped="true" :striped-active="true">
					</u-line-progress>
				</view>
			</view>

			<view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex">
					<text style="font-size: 26rpx;color: #999;">参与设计师</text>
					<text style="font-size: 26rpx;color: #FF9900;" class="ml-1"
						v-if="DataList.designers!=null">{{DataList.designers.length}}</text>
				</view>
				<view v-if="DataList.designers!=null" @click="JoinUser(DataList.designers)" class="flex flex-wrap pt-1"
					style="width: 670rpx;">
					<image :src="sitem.header" v-for="(sitem,sindex) in DataList.designers" class="rounded mr-1 mb-1"
						style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</view>
			<view v-if="State>=1" @click="SeeCase" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">设计方案</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 10rpx;"><text
						style="font-size: 26rpx;color: #FA3534;"></text></view>
			</view>
			<view v-if="State>=2" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">合同金额</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=3" style="font-size: 26rpx;color: #02B1BE;"><span
							style="font-size: 26rpx;">￥</span><span
							style="font-size: 30rpx; ">{{DataList.amount}}</span></text>
					<text v-else style="color:#EA8531;font-weight: bold;"><span style="font-size: 26rpx;">￥</span><span
							style="font-size: 30rpx; color: #EA8531;">{{DataList.amount}}</span></text>
				</view>
			</view>
			<view v-if="State>=2" @click="ContractInformation" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修设计合同信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=2&&State<3" style="font-size: 26rpx;color: #FA3534;">等待签订合同</text>
					<text v-if="State>=3" style="font-size: 26rpx;color: #02B1BE;">合同已签订</text>
				</view>
			</view>
			<view v-if="State>=4" @click="PaymentInformation" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">支付信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=4&&State<5" style="font-size: 26rpx;color: #FA3534;">等待支付</text>
					<text v-if="State>=5" style="font-size: 26rpx;color: #02B1BE;">已支付</text>

				</view>
			</view>
			<view v-if="State>=6" @click="Effect" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修效果图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text style="font-size: 26rpx;color: #FA3534;"></text>
					<text v-if="State>=6&&State<7" style="font-size: 26rpx;color: #FA3534;">等待确设计方案</text>
					<text v-if="State>=7" style="font-size: 26rpx;color: #02B1BE;">设计方案已确定</text>

				</view>
			</view>
			<view v-if="State>=8" @click="Construction" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修施工施工图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=8&&State<9" style="font-size: 26rpx;color: #FA3534;">等待确认施工图</text>
					<text v-if="State>=9" style="font-size: 26rpx;color: #02B1BE;">设计施工图已确定</text>
				</view>
			</view>
			<view v-if="State>=10" @click="BillMaterials" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">材料清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=10&&State<11" style="font-size: 26rpx;color: #FA3534;">等待确认材料清单</text>
					<text v-if="State>=11" style="font-size: 26rpx;color: #02B1BE;">材料清单已确定</text>
				</view>
			</view>
			<view v-if="State>=12" @click="PersonnelList" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">人员清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=12&&State<13" style="font-size: 26rpx;color: #FA3534;">等待确认施工人员清单</text>
					<text v-if="State>=13" style="font-size: 26rpx;color: #02B1BE;">施工人员清单已确定 </text>
				</view>
			</view>
			<!-- <view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">施工节点</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">请填写施工日志</text></view>
			</view> -->
			<view v-if="State>=14" @click="ConstructionContract" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修施工合同</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=14&&State<15" style="font-size: 26rpx;color: #FA3534;">等待签订合同</text>
					<text v-if="State>=15" style="font-size: 26rpx;color: #02B1BE;">合同已签订</text>
				</view>
			</view>
			<view v-if="State>=17" @click="PayManageAmount" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修施工管理费支付信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=17&&State<18" style="font-size: 26rpx;color: #FA3534;">等待支付</text>
					<text v-if="State>=18" style="font-size: 26rpx;color: #02B1BE;">已支付</text>

				</view>
			</view>
			<view v-if="State>=18" @click="ConstructionNode" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">施工节点</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text
						style="font-size: 26rpx;color: #EA8531;">查看写施工日志</text></view>
			</view>
			<!-- 占位 -->
			<view style="height: 100rpx;"></view>

		</view>
		<view v-if="State>=2" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view @click="checkUserToRoom" class="flex bg-white"
				style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text
						style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">联系设计师</text>
				</view>
				<!-- <view class="flex align-center justify-center" style="width: 350rpx;">
					<text style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">拒绝</text>
					<text class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">接受</text>
				</view> -->
			</view>
		</view>
		<!-- <view @click="checkUserToRoom" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #DD6666;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex flex-column align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;margin-top: 5rpx;">&#xe6ad;</text>
				<text class="text-white" style="font-size: 22rpx;margin-top: -10rpx;">管家</text>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id: '',
				id: 0,
				State: 0,
				SchemeMenu: false,
				ismy: false,
				issxx: false,
				isVip: false,
				isDesing: false,
				DataList: {},
				loadingText: '加载中...',
				toUser: {}
			}
		},
		onLoad(options) {
			this.order_id = options.order_id;
			// this.ismy = option.ismy;
			// this.id = option.id;
			// this.$post(this.$url.Design.GetTask, {
			// this.$post(this.$url.Task.GetOrder, {
			this.$post(this.$url.Task.GetTask, {
				order_id: options.order_id
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				// console.log(123)
				if (res.code == 200 && res.status == 0) {
					// console.log(JSON.stringify(res.data))
					this.DataList = res.data
				}
			});
		},
		// onPullDownRefresh: function() {
		// 	this.getnewsList();
		// },
		// onReachBottom: function() {
		// 	if (timer != null) {
		// 		clearTimeout(timer);
		// 	}
		// 	timer = setTimeout(function() {
		// 		_self.getmorenews();
		// 	}, 1000);
		// },
		methods: {
			getDate() {
				
				let time = (this.DataList.end_day / this.DataList.day_count) * 100;
				// return time.toFixed(0)
				return Math.floor(time)
				
			},
			// 跳转到管家聊天界面
			checkUserToRoom() {
				console.log("范德萨范德萨范德萨");
				var toUserInfo = {
					"UserID": this.DataList.designertel,
					"NickName": this.DataList.designerName
				}
				this.toUser = toUserInfo;
				this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				});
			},
			// 显示弹出框菜单
			skipincludetasks() {
				// 跳转到包含任务界面
				uni.navigateTo({
					url: '/pages/tabBar/message/NavMenu/includetasks?id=' + this.DataList.id
				})
			},
			JoinUser() {
				// 跳转到参与设计师界面
				uni.navigateTo({
					url: '/pages/tabBar/message/NavMenu/ParticipatingDesigners?id=' + this.id
				})
			},
			Effect() {
				// 跳转到上传设计施工图
				uni.navigateTo({
					// url: '/pages/tabBar/message/NavMenu/uploaddesignscheme'
					url: '/pages/tabBar/message/SubPage/DesignEffectConfirm?id=' + this.DataList.id
				});
			},
			Construction() {
				// 跳转到上传设计施工图
				uni.navigateTo({
					// url: '/pages/tabBar/message/NavMenu/uploaddesignscheme'
					url: '/pages/tabBar/message/SubPage/DesignConstructionConfirm?id=' + this.DataList.id
				});
			},
			// 合同信息
			ContractInformation() {
				if (this.State <= 3) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 3
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				//e签宝注册
				var RequrestUrl = this.AJB.BizUrl + 'api/Esign/RegisteredEsign';
				var RequrestDatas = {};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {

					})
					.catch(err => {
						console.log(err);
					});
				uni.navigateTo({
					url: '/pages/ServiceOrder/ContractInformation?id=' + this.DataList.id
				})
			},
			// 支付信息
			PaymentInformation() {
				// 页面修改
				if (this.State <= 4) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 5
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				// uni.navigateTo({
				// 	url: '/pages/ServiceOrder/PaymentInformation?id=' + this.DataList.id
				// })

				// 跳转到支付服务界面
				uni.navigateTo({
					url: '/pages/ServiceOrder/Pay/Index?id=' + this.DataList.id + '&amount=' + this.DataList.amount
				})

			},
			ConstructionContract() {
				if (this.State <= 14) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 15
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				uni.navigateTo({
					url: '/pages/ServiceOrder/ContractInformation?id=' + this.DataList.id
				})
			},
			PayManageAmount() {
				// 页面修改
				if (this.State <= 17) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 18
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				// 跳转到支付服务界面
				uni.navigateTo({
					url: '/pages/ServiceOrder/Pay/ManageAmount?id=' + this.DataList.id + '&amount=' + this.DataList
						.manageAmount + '&State=' + this.State
				})


			},

			// ContractAmount() {
			// 	uni.navigateTo({
			// 		url: '/pages/tabBar/message/NavMenu/ContractAmount/ContractAmount?isDesin=true&id=' + this.DataList.id +
			// 			"&Amount=" + this.DataList.amount
			// 	})
			// },
			// 材料清单
			BillMaterials() {

				uni.navigateTo({
					url: '/pages/ServiceOrder/BillMaterialsConfirm?id=' + this.DataList.id + '&State=' + this
						.State + '&toUser=' + JSON.stringify(this.toUser)
				})
			},
			// 人员清单
			PersonnelList() {
				uni.navigateTo({
					url: '/pages/ServiceOrder/PersonnelConfirm?id=' + this.DataList.id + '&State=' + this.State
				})
			},
			SeeCase() {
				console.log(JSON.stringify(this.DataList))
				uni.navigateTo({

					url: '/pages/ServiceOrder/ConceptualDesign?id=' + this.DataList.joinId
				})
			},
			ConstructionNode() {
				uni.navigateTo({
					url: '/pages/ServiceOrder/ConstructionNode?id=' + this.DataList.id + '&isSee=true'
				})
			}

		},

		onShow() {



			// //判断显示按钮
			// let res = uni.getStorageSync('professionInfo');
			// res.forEach((item) => {
			// 	if (item == "设计师") {
			// 		this.isDesing = true;
			// 	}
			// 	if (item == "会员") {
			// 		this.isVip = true;
			// 	}
			// })
			// var RequrestUrl =
			// 	this.AJB.BizUrl + "api/Design/GetDesingnInfo";
			// var RequrestDatas = {
			// 	id: this.id
			// };
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then((res) => {
			// 		if (res.code == 200) {
			// 			this.DataList = res.DataList;
			// 			console.log(JSON.stringify(this.DataList))
			// 			var toUserInfo = {
			// 				"UserID": this.DataList.designertel,
			// 				"NickName": this.DataList.designerName
			// 			}
			// 			this.toUser= toUserInfo;
			// 			this.State = this.DataList.state;
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});

		},
		filters: {
			formatDate: function(value) {
				var arr = value.split("T");
				return arr[0];
			}

		}
	}
</script>

<style lang="scss" scoped>
	.text-title {
		font-size: 24rpx;
		color: #888;
	}

	.text-content {
		font-size: 26rpx;
		color: #101010;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
