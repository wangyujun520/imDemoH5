<template>
	<view class="content">
		<block v-for="(item, index) in this.DataList">
			<view class="u-border-bottom" @click="skipInfo(item)">
				<view class="flex p-2 bg-white">
					<image mode="aspectFill" :src="item.header" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<!-- <view class="title-wrap"> -->
					<view @click="ShowDesign" class="flex flex-column" style="width: 460rpx;">
						<!-- <text class="title u-line-2">{{ item.title }}</text> -->
						<view class="UserInfo pt-1">
							<text class="mr-1"
								style="color: #101010;font-size: 32rpx;font-weight: bold;">{{item.name}}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1"
								style="border-radius: 0rpx 8rpx 8rpx 0rpx;">{{item.catalogs[0]}}</text>
						</view>
						<view class="Describe" v-if="item.slogan!=null">
							<text style="font-size: 26rpx;color: #939393;">{{item.slogan}}</text>
						</view>
						<view class="Scoring">
							<u-rate :disabled="true" :current="4" :size="28" inactive-color="#B2B2B2"
								active-color="#FF9900" active-icon="star-fill" inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">{{item.score}}</text>
						</view>
					</view>
				</view>
				<view class="flex justify-between align-center bg-white px-2 pb-1" style="margin-top: -25rpx;">
					<view class="flex align-center">
						<text style="color: #888;font-size: 26rpx;">上传时间：</text>
						<text style="color: #888;font-size: 26rpx;"
							v-if="item.create_time!=null">{{item.create_time|formatDate}}</text>
					</view>
					<text @click.stop="PersonnelOperation(item)" class="iconfont"
						style="font-size: 50rpx;color: #101010;font-weight: bold;">&#xe61e;</text>
				</view>
			</view>

			<!-- <view class="flex justify-end align-center" style="width: 120rpx;">
				<text @click="PersonnelOperation" class="iconfont" style="font-size: 50rpx;color: #101010;font-weight: bold;">&#xe61e;</text>
			</view> -->

		</block>
		<!-- 菜单结束 -->
		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetUpClick"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: e => {
			if (e.float == 'right') {
				console.log('右上角按钮点击事件');
				// 跳转到人员列表
				uni.navigateTo({
					url: '/pages/ServiceOrder/PersonnelList'
				})
			}
		},
		data() {
			return {
				order_id: '',
				id: 0,
				isDesign: false,
				joinid: 0,
				mobileUser: "",
				//列表数据
				list: [{
						name: '已上传'
					},
					{
						name: '未上传'
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
				DataList: [],
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
				ActionSheetListShow: false,
				ActionSheetList: '',
				tempData:{}

			};
		},
		onLoad(options) {
			this.order_id = options.order_id
		},
		onShow() {
			this.InitData();
		},
		methods: {
			// 初始化数据
			InitData() {
				this.$post(this.$url.Task.GetDesigners, {
					order_id: this.order_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data;
				});
				this.ActionSheetList = [{
					text: '查看设计',
					isshow: true
				},{
					text: '设计师主页',
					isshow: true
				}]
			},
			skipInfo(item) {
				// pages/tabbar/settle/case-details?id=ca55ce5e-262b-4df2-bc5a-b519047269a7
				
				if(item.url == ''){
					uni.navigateTo({
						url: '/pages/tabbar/settle/case-details?id=' + item.id + '&from=2' + '&node_status=' + item.status+'&node_code=design-1'
					})
				}else{
					// 跳转3D链接
					uni.navigateTo({
						url: '/pages/TaskOrder/MyCase/EffectPreview?id=' + item.id + '&from=2' + '&node_status=' + item.status+'&node_code=design-1'+'&url='+item.url
						// url: '/pages/TaskOrder/MyCase/EffectPreview?url='+item.url
					})
				}
				
			},
			ShowDesign() {
				uni.navigateTo({
					url: '/pages/ServiceOrder/ConceptualDesign?id=' + this.joinid
				})
			},
			SetUpClick(index) {
				// 查看设计
				if (index == 0) {
					uni.navigateTo({
						// url: "/pages/tabbar/settle/case-details?id=bfef66ab-e847-4604-bdbd-edd87c35899e&from=2&status=1"
						url: `/pages/tabbar/settle/case-details?id=${this.tempData.id}&from=2&node_status=${this.tempData.status}`+'&node_code=design-1'
					});
				}
				// 设计师主页
				if (index == 1) {
					uni.navigateTo({
						url: "/pages/tabbar/find/homepage?id=" + this.tempData.designer_id
					});
				}
				
				// if (index == 0) {
				// 	uni.navigateTo({
				// 		url: '/pages/ServiceOrder/ConceptualDesign?id=' + this.joinid
				// 	})

				// }
				
				// // 同意
				// if (index == 2) {
				// 	var RequrestUrl =
				// 		this.AJB.BizUrl + "api/Design/DesingnConfirm";
				// 	var RequrestDatas = {
				// 		id: this.joinid,
				// 		type: 1
				// 	};
				// 	this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				// 		.then((res) => {
				// 			if (res.code == 200) {
				// 				uni.navigateBack({
				// 					delta: 1
				// 				})
				// 			}
				// 		})
				// 		.catch((err) => {
				// 			console.log(err);
				// 		});
				// }
			},
			PersonnelOperation(item) {
				this.joinid = item.joinId;
				this.mobileUserId = item.mobileUser;
				this.tempData = item;
				this.ActionSheetListShow = true;
			}
		},
		filters: {
			formatDate: function(value) {
				var arr = value.split("T");
				return arr[0];
			}

		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
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
