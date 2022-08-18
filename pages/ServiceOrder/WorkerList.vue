<template>
	<view class="content">
		<view class="flex flex-column bg-white m-2 p-2 rounded" v-for="(sitem,sindex) in datalist1" :key="sindex">
			<view class="flex justify-between">
				<!-- 左 -->
				<view class="flex" style="width: 520rpx;">
					<view class="" style="width: 100rpx;height: 100rpx;">
						<image :src="sitem.headPhoto" style="width: 100%;height: 100%;" class="rounded"></image>
					</view>

					<view class="flex flex-column justify-center ml-2">
						<view class="flex align-center">
							<text style="color: #000000;font-size: 32rpx;font-weight: bold;">{{sitem.name}}</text>
							<text style="color: #FFFFFF;background-color: #307BC6;font-size: 26rpx;padding: 0rpx 20rpx;" class="ml-1 rounded">工人</text>
						</view>
						<view class="flex" style="margin-top: 10rpx;">
							<!-- <text style="color: #02B1BE;background-color: #BEFAFF;padding: 3rpx 20rpx;font-size: 24rpx;" class="rounded">监理</text> -->
							<text style="color: #FF0000;background-color: #F9C0C0;padding: 3rpx 20rpx;font-size: 24rpx;" class="ml-1 rounded">{{sitem.score}}分</text>
							<!-- 				<text style="color: #FF9900;background-color: #F9E2C0;padding: 3rpx 20rpx;font-size: 24rpx;" class="ml-1 rounded">1.8km</text> -->
						</view>
					</view>
				</view>
				<!-- 右 -->
				<view class="flex justify-end align-center" style="width: 150rpx;">
					<u-checkbox :size="50" active-color="#02B1BE" shape="circle" @change="checkboxChange" v-model="sitem.isChecked"
					 :name="sitem.mobileUserId"></u-checkbox>
				</view>
			</view>
			<view class="flex mt-1">
				<text style="color: #888;font-size: 26rpx;">{{sitem.signature}}</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				console.log(this.userlist);
				var _self = this;
				this.userlist.forEach(item => {

					var userUrl = _self.AJB.BizUrl + "api/CaiLiao/AddWork";
					var userDatas = {
						TaskID: this.taskid,
						joinId :this.joinId ,
						JoinUser: item,
						UserType: "工人",
						DecorationTypeId: 1
					};
					_self.AJB.UniAjax(userUrl, userDatas)
						.then((res) => {
							if (res.code == 200) {
								uni.navigateBack({
									delta: 1
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				})
				this.$refs.uToast.show({
					title: '添加工人完成!',
					type: 'success'
				})
			}
		},
		data() {
			return {
				taskid: 0,
				//列表数据
				datalist1: "",
				userlist: [],
				checked: false,
				list: [{
						name: '全部'
					},
					{
						name: '水工'
					},
					{
						name: '电工'
					},
					{
						name: '油漆工'
					},
					{
						name: '泥瓦工'
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

				MenuList: [{
						id: 1,
						title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: '/static/img/head/demo5.jpg',
						show: false
					},
					{
						id: 2,
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 3,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: '/static/img/head/demo6.jpg',
						show: false,
					}
				],
				CheckboxList: [{
					name: 'apple',
					checked: false,
					disabled: false
				}],
				joinId:0,

			};
		},
		onLoad(option) {
			if(option.joinId!==undefined)
			{
				this.joinId = option.joinId
			}
			this.taskid = option.id
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
			var RequrestUrl =
				this.AJB.BizUrl + "api/MobileUser/GetUserByProfession";
			var RequrestDatas = {
				workType: "监理",
				"tel": "",
				"maxResultCount": 20,
				"skipCount": 0
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					if (res.code == 200) {
						this.datalist1 = res.dataList.items
						console.log(this.AJB.BizUrl);
						// console.log(JSON.stringify(this.datalist1));
					}
				})
				.catch((err) => {
					console.log(err);
				});

		},
		methods: {
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
				if (e.value) {
					this.userlist.push(e.name)
				} else {
					this.userlist.pop(e.name);
				}
				console.log(this.userlist);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				//console.log(JSON.stringify(this.datalist1[this.value]));
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
