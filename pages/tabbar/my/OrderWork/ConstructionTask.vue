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
					<view v-for="(tags,index) in DataList.tags" class="mt-2" style="width: 335rpx;">
						<text class="text-title">{{tags.key}}：</text>
						<text class="text-content">{{tags.value}}</text>
					</view>
				</view>
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

			<view class="flex flex-column mt-2 rounded p-2 bg-white">
				<view class="flex align-center">
					<text class="iconfont mr-1" style="font-size: 28rpx;">&#xe6a7;</text>
					<text style="color: #101010;font-size: 30rpx;font-weight: bold;">{{DataList.title}}</text>
					<text class="ml-1 rounded"
						style="background-color: #02B1BE;color: #ffffff;padding: 0 15rpx;">{{DataList.estate_catalog_text}}</text>
				</view>
				<text class="my-1" style="font-size: 24rpx;color: #FF9900;">{{DataList.house_tags}}</text>
				<view class="flex align-center" style="color: #939393;">
					<text class="iconfont mr-1" style="font-size: 28rpx;">&#xe65e;</text>
					<text style="font-size: 24rpx;">{{DataList.address}}</text>
				</view>
			</view>

			<view class="flex justify-between bg-white p-2 mt-2" @click="skipRewardAmount"
				v-if="DataList.fee_status == 0">
				<view class="flex flex-column">
					<view class="flex align-center">
						悬赏金额
					</view>
					<text class="mt-1" style="color: red;font-weight: bold;">￥{{DataList.fee}}</text>
				</view>
				<u-icon name="arrow-right" color="#ccc" size="28"></u-icon>
			</view>

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

			<!-- 设计师 -->
			<view class="flex flex-column p-2 bg-white mt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<text style="color: #888;font-size: 26rpx;">房屋设计师</text>
				<view @click="skipHomepage" class="flex align-center rounded pl-3"
					style="background-color: #F6F6F7;width: 670rpx;height: 150rpx;">
					<image :src="DataList.designer.header" class="rounded" style="width: 120rpx;height: 120rpx;">
					</image>
					<view class="flex flex-column ml-2">
						<view class="flex align-center">
							<text class="mr-1"
								style="color: #101010;font-size: 32rpx;font-weight: bold;">{{DataList.designer.name}}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1"
								style="border-radius: 0rpx 8rpx 8rpx 0rpx;">设计师</text>
						</view>
						<view class="flex">
							<text style="font-size: 26rpx;color: #939393;">{{DataList.designer.slogan}}</text>
						</view>
						<view class="flex">
							<u-rate :disabled="true" :current="DataList.designer.point" :size="28"
								inactive-color="#B2B2B2" active-color="#FF9900" active-icon="star-fill"
								inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">{{DataList.designer.point}}分</text>
						</view>
					</view>
				</view>

				<view @tap="skipPage(item)" v-for="(item,index) in DataList.items"
					class="flex align-center px-3 justify-between mt-1 rounded"
					style="background-color: #F6F6F7;height: 60rpx;">
					<text style="color: #939393;font-size: 26rpx;">{{item.title}}</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<!-- <view class="flex align-center px-3 justify-between mt-1 rounded" style="background-color: #F6F6F7;height: 60rpx;">
					<text style="color: #939393;font-size: 26rpx;">设计图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center px-3 justify-between mt-1 rounded" style="background-color: #F6F6F7;height: 60rpx;">
					<text style="color: #939393;font-size: 26rpx;">施工图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center px-3 justify-between mt-1 rounded" style="background-color: #F6F6F7;height: 60rpx;">
					<text style="color: #939393;font-size: 26rpx;">造价清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center px-3 justify-between mt-1 rounded" style="background-color: #F6F6F7;height: 60rpx;">
					<text style="color: #939393;font-size: 26rpx;">施工清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view> -->


			</view>

			<view v-if="DataList.surveyor.name != undefined" class="flex flex-column p-2 bg-white mt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<text style="color: #888;font-size: 26rpx;">施工负责人</text>
				<view @click="skipHomepage2" class="flex align-center rounded pl-3"
					style="background-color: #F6F6F7;width: 670rpx;height: 150rpx;">
					<image :src="DataList.surveyor.header" class="rounded" style="width: 120rpx;height: 120rpx;">
					</image>
					<view class="flex flex-column ml-2">
						<view class="flex align-center">
							<text class="mr-1"
								style="color: #101010;font-size: 32rpx;font-weight: bold;">{{DataList.surveyor.name}}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1"
								style="border-radius: 0rpx 8rpx 8rpx 0rpx;">监理</text>
						</view>
						<view class="flex">
							<text style="font-size: 26rpx;color: #939393;">{{DataList.surveyor.slogan}}</text>
						</view>
						<view class="flex">
							<u-rate :disabled="true" :current="DataList.surveyor.point" :size="28"
								inactive-color="#B2B2B2" active-color="#FF9900" active-icon="star-fill"
								inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">{{DataList.surveyor.point}}分</text>
						</view>
					</view>
				</view>
			</view>

			<view class="flex flex-column bg-white mt-1 rounded" v-for="(item2,index2) in DataList.nodes" v-if="DataList.order_surveyor_status > 3 || DataList.order_surveyor_status == 0 || module=='user'"
				@tap="skipPageUrl(item2)">
				<view class="flex align-center justify-between px-3" style="border: 0px solid red;height: 120rpx;">
					<view class="flex align-center">
						<view class="flex align-center justify-center mr-3"
							style="width: 80rpx;height: 80rpx;background-color: #F7F7F7;border-radius: 50%;">

							<!-- <text class="iconfont" v-if="item2.status == 0" style="color: #02B1BE;font-size: 40rpx;">&#xe660;</text> -->
							<u-icon name="checkmark-circle" v-if="item2.status == 0" color="#02B1BE" size="40"></u-icon>
							<u-icon name="clock" v-else color="#2BA1DE" size="40"></u-icon>

						</view>
						<view class="flex flex-column" style="font-size: 24rpx;">
							<text style="color: #939393;">{{item2.title}}</text>
							<!-- status!=0显示红色 -->
							<text v-if="item2.status == 0" class="mt-1" style="color: #02B1BE;">{{item2.content}}</text>
							<text v-else class="mt-1" style="color: red;">{{item2.content}}</text>

						</view>
					</view>
					<u-icon name="arrow-right" color="#ccc" size="28"></u-icon>
				</view>
			</view>

			<view v-if="DataList.order_surveyor_status == 3 || DataList.order_surveyor_status == -1 || DataList.order_surveyor_status == -2" class="flex flex-column p-2 bg-white mt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<text style="font-size: 26rpx;color: #999;">施工负责人</text>
				<view class="flex align-center my-1">
					<text style="font-size: 26rpx;color: #02B1BE;">已接受：{{DataList.order_surveyor.status0}}</text>
					<text style="font-size: 26rpx;color: #FF7100;" class="ml-3">待接受：{{DataList.order_surveyor.status1}}</text>
					<text style="font-size: 26rpx;color: #FF0000;" class="ml-3">已拒绝：{{DataList.order_surveyor.status_2}}</text>
				</view>
				<text v-if="DataList.status == 3" style="font-size: 26rpx;color: #FF9900;">等待客户确定人员</text>
			</view>
			<view class="" style="height: 150rpx;"></view>
		</view>

		<view v-if="DataList.order_surveyor_status == 3" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoIM"
						style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text @click="Confirm('-1')"
						style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="Confirm('0')" class="ml-3"
						style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.order_id = options.order_id;
			if (options.module != 'undefined') {
				this.module = options.module;
			}
			if (options.order_surveyor_id != 'undefined') {
				this.order_surveyor_id = options.order_surveyor_id;
			}
			if (options.order_worker_id != 'undefined') {
				this.order_worker_id = options.order_worker_id;
			}
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				order_id: '',
				order_surveyor_id:'',
				order_worker_id:'',
				rankno: uni.getStorageSync('rankno'),
				status: '', //订单状态
				module: '', //入口
				id: 0,
				State: 0,
				SchemeMenu: false,
				ismy: false,
				issxx: false,
				isVip: false,
				isDesing: false,
				DataList: {
					id: "",
					order_id: "",
					name: "",
					header: "",
					status: "",
					status_text: "",
					money: "",
					money_text: "",
					tags: [],
					content:"",
					title:"",
					house_style:"",
					house_style_text:"",
					estate_catalog:"",
					estate_catalog_text:"",
					house_catalog:"",
					house_catalog_text:"",
					house_tags:"",
					start_date:"",
					end_date:"",
					end_days:"",
					all_days:"",
					address:"",
					designer: {
						id:"",
						header:"",
						mobile:"",
						name:"",
						catalog: [],
						slogan:"",
						point:""
					},
					surveyor: {
						id: "",
						header: "",
						name: "",
						catalog: [],
						slogan: "",
						point: ""
					},
					create_time: "",
					items: [],
					nodes: [],
					order_surveyor:{
						status0:'',
						status1:'',
						status2:''
					},
					order_surveyor_id:'',
					order_surveyor_status:''
				},
				loadingText: '加载中...',
				toUser: {}
			}
		},
		methods: {
			Confirm(state) {
				uni.showModal({
					title: '提示',
					content: `真的要${state==0?'接受':'拒绝'}吗？`,
					success: (res) => {
						if (res.confirm) {
							//0=接受；1=拒绝
							this.$post(this.$url.Work.ArgSurveyor, {
								order_id: this.order_id,
								status: state
							}, {}).then(res => {
								// 成功
								this.$refs.uToast.show({
									title: `${state==0?'接受':'拒绝'}成功`,
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 联系设计师
			gotoIM() {
				this.$store.commit('createConversationActive', this.DataList.designer.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.designer.name
				});
			},
			// 跳转页面
			skipPageUrl(item) {
				uni.navigateTo({
					url: item.file + '&module=' + this.module
				})
			},
			// 跳转页面
			skipPage(item) {
				uni.navigateTo({
					url: item.url
				})
			},
			// 房屋设计师
			skipHomepage() {
				uni.navigateTo({
					url: '/pages/tabbar/find/homepage?id=' + this.DataList.designer.id
				})
			},
			// 施工负责人
			skipHomepage2() {
				uni.navigateTo({
					url: '/pages/tabbar/find/homepage?id=' + this.DataList.surveyor.id
				})
			},
			InitData() {
				this.$post(this.$url.Work.GetTask, {
					order_id: this.order_id,
					order_surveyor_id:this.order_surveyor_id,
					order_worker_id:this.order_worker_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data;
				});
			},
			// 上传方案点击事件
			skipuploaddesign() {
				// 显示方案菜单
				this.SchemeMenu = true;
			},
			// 图文
			ImageText() {
				// 跳转到方案设计
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/conceptualdesign?order_id=' + this.DataList.order_id
				})
				this.SchemeMenu = false;
			},
			// 3D效果图
			DesignSketch() {
				// 跳转到方案设计（3D效果图）
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/conceptualDesignSketch?order_id=' + this.DataList.order_id
				})
				this.SchemeMenu = false;
			},
			// 复制
			Copy() {
				// 跳转到我的方案
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/myplan?id=' + this.DataList.id
				})
			},
			// 跳转到管家聊天界面
			checkUserToRoom() {
				var toUserInfo = {
					"UserID": this.DataList.tel,
					"NickName": this.DataList.name
				}
				this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				});
			},
			// 跳转到悬赏金额
			skipRewardAmount() {
				uni.navigateTo({
					url: '/pages/design/reward_amount'
				})
			},
			getDate() {
				if ((this.DataList.day_count ?? '') !== '') {
					let time = ((parseFloat(this.DataList.day_count) - parseFloat(this.DataList.end_day)) / parseFloat(this
						.DataList.day_count)) * 100;
					return time.toFixed(2)
				}
				return 0;
				// 向下取整 92.1 取92 92.9也是取92
				// return time.toFixed(0)
				// console.log(time.toFixed(0))
				// return Math.floor(time)
			},
			// 显示弹出框菜单
			skipincludetasks() {
				// 跳转到包含任务界面
				uni.navigateTo({
					url: '/pages/tabBar/message/NavMenu/includetasks?id=' + this.DataList.id
				})
			},
			JoinUser(item) {
				if (this.rankno == 0) {
					// 跳转到参与设计师界面
					uni.navigateTo({
						url: '/pages/tabbar/message/NavMenu/ParticipatingDesigners?order_id=' + this.order_id
					})
				}
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
					url: '/pages/tabbar/message/SubPage/DesignConstructionConfirm?id=' + this.DataList.id
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
