<template>
	<view class="content">
		<u-sticky>
			<!-- 吸顶 -->
			<view class="flex">
				<view class="bg-white" style="width: 650rpx;">
					<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current"
						@change="change">
					</u-tabs>
				</view>
				<view @click="MenuShow" class="flex align-center justify-center"
					style="width: 100rpx;background-color: #FFFFFF;">
					<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
				</view>
			</view>
		</u-sticky>


		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
				:close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text @click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#FF9900' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->

		<!-- 菜单开始 -->
		<!-- 占位 -->
		<view class="" style="height: 20rpx;"></view>
		<view class="flex flex-column p-2 bg-white" v-for="(sitem,index) in DataList">
			<image :src="sitem.cover" style="width: 710rpx;height: 400rpx;" @click="skipCaseDetails(sitem.id)">
			</image>
			<text style="color: #000000;font-size: 32rpx;font-weight: bold;" class="mt-2">{{sitem.title}}</text>
			<view class="flex justify-between align-center mt-1">
				<text style="color: #02B1BE;font-size: 26rpx;">{{sitem.tags}}</text>
				<text @click="ShowActionSheet(sitem)" class="iconfont" style="font-size: 40rpx;">&#xe61e;</text>
			</view>
		</view>
		<!-- 菜单结束 -->

		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无案例" mode="list"></u-empty>
		</view>

		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetUpClick"></u-action-sheet>

	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(val) {
			// 跳转到新增
			if (val.index == 0) {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/AddCase'
				})
			}
			// 跳转到草稿箱
			if (val.index == 1) {
				console.log("跳转到草稿箱");
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/DraftCase'
				})
			};
		},
		data() {
			return {
				id: '',//选中案例id
				DataList: [], //Mock数据
				list: [], //列表数据
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
					text: '编辑案例'
				}, {
					text: '删除案例',
					color: 'red'
				}]
			};
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - 40 - uni.upx2px(70);
				} else {
					this.swiperHeight = res.windowHeight - 40;
				}
			} catch (e) {
				console.log(e);
			}
			
			// 获取数据字典
			this.list = [{
				name: '全部',
				value: ''
			}];
			this.$post(this.$url.Public.GetDicts, {
				key: "house_style" //关键字
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				if (res.code == 200 && res.status == 0) {
					res.data.forEach(item => {
						let list = {
							name: item.value,
							value: item.key
						}
						this.list.push(list);
					})
				}
				this.InitData(); //初始化数据
			});
		},
		methods: {
			InitData() {
				let requestData = {
					key: "", //关键字
					status: "1", //状态，0=已完成；1=草稿
					catalog: this.list[this.current].value, //类型
					page_no: 1, //页码
					page_size: 10 //每一页数量
				}
				// 获取我的案例
				this.$post(this.$url.Design.GetCases, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					// console.log(123)
					if (res.code == 200 && res.status == 0) {
						// console.log(JSON.stringify(res.data))
						this.DataList = res.data.list
					}
				});
			},
			SetUpClick(index) {
				// if (index == 0) {
				// 	console.log("分享案例")
				// }

				// 编辑案例
				if (index == 0) {
					uni.navigateTo({
						url: "/pages/TaskOrder/MyCase/AddCase?id=" + this.id
					});
				}

				// 删除案例
				if (index == 1) {
					console.log("删除案例")
					uni.showModal({
						title: '提示',
						content: '确认删除案例吗',
						success: res=> {
							if (res.confirm) {
								this.$post(this.$url.Design.DelCase, {
									id:this.id
								}, {}).then(res => {
									this.$refs.uToast.show({
										title: '删除成功',
										type: 'success'
									});
									this.InitData();//刷新数据
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					
				}
			},
			// 格式化日期结束
			GetData(isforce) {
				//获取数据
				if (this.DataList[this.current].length !== undefined && !isforce) {
					return;
				}
				var datallist = ""
				//this.$set(this.DataList, this.current, this.dataListxx);
				var RequrestUrl =
					this.AJB.BizUrl + "api/Case/GetMyCaseList";
				var RequrestDatas = {
					type: this.list[this.current].name,
					maxResultCount: 10,
					skipCount: 0,
					State: "1",
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						if (res.code == 200) {
							console.log(JSON.stringify(res));
							this.$set(this.DataList, this.current, res.dataList.items);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 跳转到案例详情
			skipCaseDetails(id) {
				uni.navigateTo({
					url: '/pages/tabbar/settle/case-details?id=' + id
				})
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				this.InitData();
			},
			// 菜单改变
			change(index) {
				this.current = index;
				this.InitData();
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				this.InitData();
			},
			ShowActionSheet(item) {
				this.id = item.id;
				this.ActionSheetListShow = true;
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
</style>
