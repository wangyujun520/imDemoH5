<template>
	<view class="content">
		<!-- 会员 -->
		<view v-if="rankno==0" class="flex flex-column bg-white m-2 p-2 rounded" v-for="(item,index) in DataList.list"
			:key="index">
			<view class="flex justify-between">
				<!-- 左 -->
				<view class="flex" style="width: 520rpx;">
					<view class="" style="width: 100rpx;height: 100rpx;">
						<image :src="item.header" style="width: 100%;height: 100%;" class="rounded"></image>
					</view>

					<view class="flex flex-column justify-center ml-2">
						<view class="flex align-center">
							<text style="color: #000000;font-size: 32rpx;font-weight: bold;">{{item.name}}</text>
							<text style="color: #FFFFFF;background-color: #307BC6;font-size: 26rpx;padding: 0rpx 20rpx;"
								class="ml-1 rounded">监理</text>
						</view>
						<view class="flex" style="margin-top: 10rpx;">
							<!-- <text style="color: #02B1BE;background-color: #BEFAFF;padding: 3rpx 20rpx;font-size: 24rpx;" class="rounded">监理</text> -->
							<text v-for="tag in item.tags"
								style="color: #FF0000;background-color: #F9C0C0;padding: 3rpx 20rpx;font-size: 24rpx;"
								class="ml-1 rounded">{{tag}}</text>
							<!-- 				<text style="color: #FF9900;background-color: #F9E2C0;padding: 3rpx 20rpx;font-size: 24rpx;" class="ml-1 rounded">1.8km</text> -->
						</view>
					</view>
				</view>
				<!-- 右 -->
				<view class="flex justify-end align-center" style="width: 150rpx;">
					<view v-if="item.status==2" @click="Select(item)"
						class="flex align-center justify-center text-white"
						style="background-color: #3F9B55;width: 120rpx;height: 50rpx;border-radius: 40rpx;">
						<text style="font-size: 24rpx;">选择</text>
					</view>
					<!-- <u-radio-group width="70rpx" size="50" v-model="value">
					 	<u-radio :name="sindex" active-color="#02B1BE" :icon-size="20"></u-radio>
					 </u-radio-group> -->
				</view>
			</view>
			<view class="flex flex-column mt-1">
				<text style="color: #888;font-size: 26rpx;">{{item.slogan}}</text>
				<text :class="item.status!='0'?'red':''" style="font-size: 26rpx;">{{item.status_text}}</text>
			</view>
		</view>
		<!-- 设计师 -->
		<view v-if="rankno==1" class="flex flex-column bg-white m-2 p-2 rounded" v-for="(item,index) in DataList.list"
			:key="index">
			<view class="flex justify-between">
				<!-- 左 -->
				<view class="flex" style="width: 520rpx;">
					<view class="" style="width: 100rpx;height: 100rpx;">
						<image :src="item.header" style="width: 100%;height: 100%;" class="rounded"></image>
					</view>

					<view class="flex flex-column justify-center ml-2">
						<view class="flex align-center">
							<text style="color: #000000;font-size: 32rpx;font-weight: bold;">{{item.name}}</text>
							<text style="color: #FFFFFF;background-color: #307BC6;font-size: 26rpx;padding: 0rpx 20rpx;"
								class="ml-1 rounded">监理</text>
						</view>
						<view class="flex" style="margin-top: 10rpx;">
							<text v-for="tag in item.tags"
								style="color: #FF0000;background-color: #F9C0C0;padding: 3rpx 20rpx;font-size: 24rpx;"
								class="ml-1 rounded">{{tag}}</text>
						</view>
					</view>
				</view>
				<!-- 右 -->
				<view class="flex justify-end align-center" style="width: 150rpx;">
					<text v-if="DataList.status == 1" @click="MoreMenu(item)" class="iconfont" style="color: #000000;font-size: 50rpx;">&#xe6f3;</text>
				</view>
			</view>
			<view class="flex flex-column mt-1">
				<text style="color: #888;font-size: 26rpx;">{{item.slogan}}</text>
				<text :class="item.status=='-1'?'red':''"
					style="color: #888;font-size: 26rpx;">{{item.status_text}}</text>
			</view>
		</view>

		<view v-if="DataList.list.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>

		<view v-if="rankno==0&&DataList.status==2" @click="NoSelect"
			class="flex align-center justify-center bg-white position-fixed w-100" style="height: 120rpx;bottom: 0;">
			<view class="flex align-center justify-center"
				style="color: #4D86D7;border: 1px solid #4D86D7;width: 600rpx;height: 70rpx;border-radius: 40rpx;">
				<text>不需要施工</text>
			</view>
		</view>

		<view v-if="rankno==1 && DataList.status==1 && DataList.list.length>0" class="position-fixed"
			style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="gotoIM"
						style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系客户
					</text>
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<!-- <text @click="ArgWorkDrawing('-1')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						
					</text> -->
					<text @click="SetSurveyor" class="ml-3"
						style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						发送给客户确定
					</text>
				</view>
			</view>
		</view>

		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetPersonne"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				
				// 显示
				// status==1 && rankno ==1
				
				if (this.rankno == 1 && this.DataList.status == 1) {
					uni.navigateTo({
						url: '/pages/ServiceOrder/AddSupervisor?order_id=' + this.order_id
					})
				}
			}
		},
		data() {
			return {
				ActionSheetListShow: false,
				ActionSheetList: [{
					text: '删除人员',
					color: 'red'
				}],
				tempData: {},
				rankno: uni.getStorageSync('rankno'),
				order_id: '',
				imgUrl: 'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400',
				taskid: 0,
				DataList: {
					order_id: "",
					name: "",
					mobile: "",
					designer_name: "",
					designer_mobile: "",
					status: "",
					list: []
				},
				value: 0, //默认选中第一条数据
				//列表数据
				list: [{
						name: '关注'
					},
					{
						name: '评分'
					},
					{
						name: '距离项目最近'
					},
					{
						name: '合作过的'
					}
				],
				current: 0, //当前选中的下标
				activeColor: this.$u.color['warning'],
				// 弹出菜单参数
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				isShow: true,
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度
				joinId: 0,

				CheckboxList: [{
					name: 'apple',
					checked: false,
					disabled: false
				}]

			};
		},
		onLoad(options) {
			if ((options ?? '') != '') {
				this.order_id = options.order_id;
			}
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - 40 - uni.upx2px(62);
				} else {
					this.swiperHeight = res.windowHeight - 40;
				}
			} catch (e) {
				console.log(e);
			}
			this.InitData();
		},
		methods: {
			// 联系客户
			gotoIM() {
				this.$store.commit('createConversationActive', this.DataList.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.name
				});
			},
			// 发布监理方案 
			SetSurveyor() {
				this.$post(this.$url.Task.SetSurveyor, {
					order_id: this.order_id
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '发送成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				});
			},
			MoreMenu(item) {
				console.log(JSON.stringify(item))
				this.tempData = item;
				this.ActionSheetListShow = true;
			},
			SetPersonne(index) {
				// 删除
				if (index == 0) {
					// 删除监理
					this.$post(this.$url.Task.DelSurveyor, {
						id: this.tempData.id
					}, {
						isLoading: false
					}).then(res => {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success'
						})
						this.InitData(); //刷新当前页面
					});
				}
			},
			NoSelect() {
				// 用户选择监理
				this.$post(this.$url.Task.SelectSurveyor, {
					order_id: this.order_id,
					// vip_id:item.vip_id,
					status: '-1'
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				});
			},
			Select(item) {
				uni.showModal({
					title: '提示',
					content: `您是否确定选择你【${item.name}】作为你房屋装修的施工监理?\r\n确认后不可更改...`,
					success: (res)=> {
						if (res.confirm) {
							// 用户选择监理
							this.$post(this.$url.Task.SelectSurveyor, {
								order_id: this.order_id,
								id: item.id,
								status: 0
							}, {
								isLoading: false
							}).then(res => {
								this.$refs.uToast.show({
									title: '成功',
									type: 'success'
								})
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 2000)
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			InitData() {
				// 获取任务的监理明细
				this.$post(this.$url.Task.GetTaskSurveyors, {
					order_id: this.order_id
				}, {
					isLoading: false
				}).then(res => {
					this.DataList = res.data;
					
					this.ShowMenu();
					
				});
			},
			ShowMenu(){
				// console.log(this.DataList.status)
				// console.log(this.rankno)
				if (this.DataList.status == 1 && this.rankno ==1) {
					//显示
				}else{
					// 不显示
					//#ifdef H5
					setTimeout(() => {
						document.querySelectorAll('.uni-page-head .uni-page-head-ft .uni-page-head-btn')[0]
							.querySelector('.uni-btn-icon').innerText = ' ';
					}, 10)
					//#endif
					// #ifdef APP-PLUS
					var currentWebview = this.$mp.page.$getAppWebview();
					currentWebview.setTitleNViewButtonStyle(0, { //h5端会报错
						text: ' '
					});
					// #endif
				}
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
			},
			// 菜单改变
			change(index) {
				this.current = index;
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				// console.log(JSON.stringify(event))
			},
			//////
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			checkedAll() {
				this.list.map(val => {
					val.checked = true;
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.red {
		color: red;
	}

	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
	}

	// 通过/deep/样式穿透去控制组件的内容
	.wrap /deep/ .u-content {
		color: #666 !important;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>
