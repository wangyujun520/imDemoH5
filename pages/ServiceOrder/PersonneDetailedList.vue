<template>
	<view class="content">
		<view class="flex">
			<view class="" style="width: 650rpx;">
				<!-- list 标签数组，元素为对象，如[{name: '推荐'}] -->
				<!-- active-color 选中的颜色 -->
				<!-- is-scroll tabs是否可以左右拖动 -->
				<!-- current 初始化显示第几个 -->
				<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current" @change="change"></u-tabs>
			</view>
			<view @click="MenuShow" class="flex align-center justify-center" style="width: 100rpx;background-color: #FFFFFF;">
				<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
			</view>
		</view>

		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
			 :close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text @click="SwitchMenu(index)" :style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#FF9900' : '#FFFFFF' }"
						 class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->

		<!-- 菜单开始 -->
		<swiper :style="{ height: swiperHeight + 'px' }" circular :current="current" @change="changeSwiper">

			<swiper-item v-for="(swiperitem, swiperindex) in list" :key="swiperindex" style="overflow: auto;">

				<view class="flex flex-column bg-white m-2 p-2 rounded" v-for="(sitem,sindex) in DataList[current]">
					<view class="flex justify-between">
						<!-- 左 -->
						<view @click="JumpHomePage(sitem)" class="flex" style="width: 520rpx;">
							<view class="" style="width: 100rpx;height: 100rpx;">
								<image :src="sitem.headPortrait" style="width: 100%;height: 100%;" class="rounded"></image>
							</view>

							<view class="flex flex-column justify-center ml-2">
								<view class="flex align-center">
									<text style="color: #000000;font-size: 32rpx;font-weight: bold;">{{sitem.name}}</text>
									<text style="color: #FFFFFF;background-color: #307BC6;font-size: 26rpx;padding: 0rpx 20rpx;" class="ml-1 rounded">{{sitem.defaultProfession}}</text>
								</view>
								<view class="flex" style="margin-top: 10rpx;">
									<!-- <view class="flex flex-wrap my-2">
										<view class="mr-2" style="background-color: #eeeeee; padding: 5rpx 30rpx">
											<text style="color: #888; font-size: 26rpx">{{ item }}</text>
										</view>
									</view> -->
									<!-- 									<text style="color: #02B1BE;background-color: #BEFAFF;padding: 3rpx 20rpx;font-size: 24rpx;" class="rounded">{{sitem.name}}</text>
 -->
									<text style="color: #FF0000;background-color: #F9C0C0;padding: 3rpx 20rpx;font-size: 24rpx;" class="ml-1 rounded">{{sitem.score}}分</text>
									<!-- <text style="color: #FF9900;background-color: #F9E2C0;padding: 3rpx 20rpx;font-size: 24rpx;" class="ml-1 rounded">1.8km</text> -->
								</view>
							</view>
						</view>
						<!-- 右 -->
						<view class="flex justify-end align-start" style="width: 150rpx;">
							<text v-if='State<13' @click="PersonnelOperation(sitem)" class="iconfont" style="font-size: 50rpx;color: #101010;font-weight: bold;">&#xe61e;</text>
						</view>
					</view>
					<view class="flex">
						<text style="color: #888;font-size: 26rpx;">{{sitem.signature}}</text>
					</view>
					<view v-if="sitem.state==1" class="flex">
						<text style="color: #FF0000;font-size: 26rpx;">客户要求更换该员工</text>
					</view>
				</view>

			</swiper-item>
		</swiper>
		<!-- 菜单结束 -->
		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetPersonne"></u-action-sheet>

		<u-action-sheet :list="MenuSheetList" v-model="MenuSheetListShow" @click="MenuClick"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				this.MenuSheetListShow = true;
			}
		},
		data() {
			return {
				taskid: 0,
				DataList: [],
				//列表数据
				list: [{
						name: '监理'
					},
					{
						name: '工人'
					}
				],
				current: 0, //当前选中的下标
				activeColor: this.$u.color['warning'],
				// 弹出菜单参数
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度

				ActionSheetListShow: false,
				ActionSheetList: [{
					text: '联系人员'
				}, {
					text: '替换人员'
				}, {
					text: '删除人员',
					color: 'red'
					// fontSize: 28,
					// subText: '感谢您的点赞'
				}],
				MenuSheetListShow: false,
				MenuSheetList: [{
					text: '监理'
				}, {
					text: '工人'
				}],
				sitem: '',
				State: 0

			};
		},
		onLoad(option) {
			this.State = option.State
			this.taskid = option.id

		},
		onShow() {
			this.list.forEach((item) => {
				this.DataList.push({});
			});
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
			this.GetData(true);
		},
		methods: {
			JumpHomePage(item) {
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage?id=' + item.mobileUser
				});
			},
			SetPersonne(index) {
				if (index == 0) {
					uni.navigateTo({
						url: '/pages/tabBar/find/homepage?id=' + this.sitem.mobileUser
					});
				}
				if (index == 1) {
					if (this.sitem.defaultProfession == '监理') {
						// 跳转到监理界面
						uni.navigateTo({
							url: '/pages/ServiceOrder/SupervisionList?id=' + this.taskid + '&joinId=' + this.sitem.joinId
						})
					}
					if (this.sitem.defaultProfession == '工人') {
						uni.navigateTo({
							url: '/pages/ServiceOrder/WorkerList?id=' + this.taskid + '&joinId=' + this.sitem.joinId
						})
					}
				}
				if (index == 2) {
					//删除

					var _self = this;
					var userUrl = _self.AJB.BizUrl + "api/CaiLiao/DelWorkUser";
					var userDatas = {
						id: this.sitem.joinId
					};
					_self.AJB.UniAjax(userUrl, userDatas)
						.then((res) => {
							if (res.code == 200) {

								this.$refs.uToast.show({
									title: '删除成功!',
									type: 'success'
								})
								this.GetData(false);
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			},

			GetData(isforce) {
				//获取数据
				if (this.DataList[this.current] !== undefined && this.DataList[this.current].length !== undefined && !isforce) {
					return;
				}
				var RequrestUrl =
					this.AJB.BizUrl + "api/CaiLiao/GetWorkList";
				var RequrestDatas = {
					type: this.list[this.current].name,
					TaskID: this.taskid,
					maxResultCount: 100,
					skipCount: 0,
					ismy: true,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						if (res.code == 200) {
							this.$set(this.DataList, this.current, res.dataList.items);
							console.log(JSON.stringify(res.dataList.items))
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			MenuClick(index) {
				// console.log(`点击了第${index + 1}项，内容为：${this.MenuSheetList[index].text}`)

				// console.log(index);
				if (index == 0) {
					// 跳转到监理界面
					uni.navigateTo({
						url: '/pages/ServiceOrder/SupervisionList?id=' + this.taskid
					})

				}

				if (index == 1) {
					// 跳转到工人界面
					uni.navigateTo({
						url: '/pages/ServiceOrder/WorkerList?id=' + this.taskid
					})
				}

			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				this.GetData(false);
			},
			// 菜单改变
			change(index) {
				this.current = index;
				this.GetData(false);
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				this.GetData(false);
				// console.log(JSON.stringify(event))
			},
			PersonnelOperation(item) {
				this.sitem = item;
				this.ActionSheetListShow = true;
			}

		}
	};
</script>

<style lang="scss">
	// page {
	// 	background-color: #ffffff;
	// }

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
