<template>
	<view class="content">
		<view class="rotation-chart" v-if="BannerList">
			<u-swiper :height="280" :list="BannerList" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos"
				:mode="mode" :interval="3000" @click="clickimg"></u-swiper>
		</view>

		<!-- 菜单 -->
		<view class="flex flex-wrap bg-white pb-2">
			<!-- 设计案例 -->
			<view @click="skipDesignCase" class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx">
				<view class="flex justify-center align-center"
					style="width: 90rpx;height: 90rpx;background-color: #BD699F;border-radius: 50%;">
					<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;">&#xe6c9;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">设计案例</text>
			</view>
			<!-- 家装百科 -->
			<view @click="SkipEncyclopedias" class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx">
				<view class="flex justify-center align-center"
					style="width: 90rpx;height: 90rpx;background-color: #87D9B6;border-radius: 50%;">
					<text class="iconfont" style="color: #FFFFFF;font-size: 45rpx;">&#xe709;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">家装百科</text>
			</view>
			<!-- 家居商城 -->
			<view @click="skipHomeShoppingMall" class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx">
				<view class="flex justify-center align-center"
					style="width: 90rpx;height: 90rpx;background-color: #C29BF7;border-radius: 50%;">
					<text class="iconfont" style="color: #FFFFFF;font-size: 45rpx;">&#xe6cb;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">家居商城</text>
			</view>
			<!-- 风格测试 -->
			<view @click="skipStyleTest" class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx">
				<view class="flex justify-center align-center"
					style="width: 90rpx;height: 90rpx;background-color: #F2B9B3;border-radius: 50%;">
					<text class="iconfont" style="color: #FFFFFF;font-size: 45rpx;">&#xe6ca;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">风格测试</text>
			</view>
			<!-- 我要设计 -->
			<view @click="SkipDesign" class="flex flex-column justify-center align-center mt-2" style="width: 187rpx">
				<view class="flex justify-center align-center" style="width: 90rpx;height: 90rpx;">
					<text class="iconfont" style="color: #FF9900;font-size: 60rpx;">&#xe6c6;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">我要设计</text>
			</view>
			<!-- 装修计算 -->
			<view @click="skipDecorationBudget" class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx">
				<view class="flex justify-center align-center" style="width: 90rpx;height: 90rpx;">
					<text class="iconfont" style="color: #765EDE;font-size: 60rpx;">&#xe6c4;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">装修计算</text>
			</view>
			<!-- 房产展示 -->
			<view @click="skipRealEstateDisplay" class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx">
				<view class="flex justify-center align-center" style="width: 90rpx;height: 90rpx;">
					<text class="iconfont" style="color: #4BA76B;font-size: 60rpx;">&#xe6c0;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">房产展示</text>
			</view>
			<!-- 装修记录 -->
			<view @click="skipDecorationRecord" class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx">
				<view class="flex justify-center align-center" style="width: 90rpx;height: 90rpx;">
					<text class="iconfont" style="color: #D66965;font-size: 60rpx;">&#xe6c2;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">装修记录</text>
			</view>
		</view>
		<!-- 菜单 -->

		<!-- 瀑布流 -->
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{ leftList }">
				<view @click="skipCommodity(item)" class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<u-lazy-load threshold="0" border-radius="10" :image="item.cover" :index="index">
					</u-lazy-load>
					<view class="demo-title LineBreak">{{ item.title }}</view>
					<view class="flex justify-between align-center mt-1">
						<view class="flex align-center">
							<image :src="item.designer.header" class="rounded" style="width: 45rpx; height: 45rpx">
							</image>
							<text
								style="font-size: 28rpx; color: #999; margin-left: 5rpx">{{ item.designer.name }}</text>
						</view>
						<view class="flex align-center">
							<!-- 暂时不做点赞 -->
							<text class="iconfont"
								style="font-size: 36rpx;color: #939393;margin-right:5rpx;">&#xe641;</text>
							<text style="font-size: 26rpx;color:#939393;">{{item.designer.is_like}}</text>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:right="{ rightList }">
				<view @click="skipCommodity(item)" class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="0" border-radius="10" :image="item.cover" :index="index">
					</u-lazy-load>
					<view class="demo-title LineBreak">{{ item.title }}</view>
					<view class="flex justify-between align-center mt-1">
						<view class="flex align-center">
							<image :src="item.header" class="rounded" style="width: 45rpx; height: 45rpx">
							</image>
							<text style="font-size: 28rpx; color: #999; margin-left: 5rpx">{{ item.name }}</text>
						</view>
						<view class="flex align-center">
							<!-- 暂时不做点赞 -->
							<!-- <text class="iconfont" style="font-size: 36rpx;color: #939393;margin-right:5rpx;">&#xe641;</text>
							<text style="font-size: 26rpx;color:#939393;">{{item.good}}</text> -->
						</view>
					</view>
				</view>
			</template>
		</u-waterfall>
		<!-- <u-loadmore v-if="totalCount>5" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
		<!-- <u-loadmore v-if="totalCount > 5" bg-color="rgb(240, 240, 240)" :status="loadStatus"
			@loadmore="addRandomData" icon-type="flower"></u-loadmore> -->

		<view v-if="flowList.length == 0" class="flex justify-center align-center" style="height: 60vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>

		<u-loadmore v-if="totalCount > 5" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData">
		</u-loadmore>

		<u-back-top tips="顶部" :scrollTop="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
		<!-- 更新框 -->
		<u-modal v-model="showUpdate" :zoom="false" :show-cancel-button="true" confirm-text="升级" title="发现新版本"
			@cancel="CancelUpdate" @confirm="confirmUpdate">
			<view class="p-2">
				<!-- <rich-text :nodes="content"></rich-text> -->
				<rich-text :nodes="messageHtml(content)"></rich-text>
			</view>
		</u-modal>
		<u-mask class="flex justify-center align-center" :show="downloadshow" :zoom="false">
			<view class="bg-white rounded" style="width: 600rpx;height: 300rpx">
				<view class="flex justify-center align-center" style="height: 100rpx;">
					<text style="color: #101010;font-size: 35rpx;font-weight: bold;">升级APP</text>
				</view>
				<view class="flex justify-center">
					<text style="font-size: 28rpx;color: #888;">正在为您更新，升级过程中请耐心等待</text>
				</view>
				<view class="flex justify-center mt-2">
					<text style="color: #0062CC;">已下载{{DownloadProgressValue}}%</text>
				</view>
				<view class="flex justify-center p-3">
					<u-line-progress active-color="#2979ff" :percent="DownloadProgressValue" :show-percent="false">
					</u-line-progress>
				</view>

			</view>
		</u-mask>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import parseHtml from '@/common/emoticon/htmlparser.js';
	export default {
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			setTimeout(() => {
				this.InitData();
			}, 10)
			// #ifdef APP-PLUS
			this.updaEdition(); //检测更新
			// #endif
		},
		onShow() {
			// 获取用户基础信息
			// this.$post(this.$url.User.GetBaseData, {}, {}).then(res => {
			// 	if (res.code == 200 && res.status == 0) {
			// 		this.BaseData = res.data;
			// 	}
			// })
			
			
		},
		// 上拉触底事件
		onReachBottom() {
			this.loadStatus = 'loading';
			this.addRandomData();
		},
		// 监听用户下拉动作
		onPullDownRefresh() {
			this.InitData();
		},
		data() {
			return {
				BaseData: {
					id: "",
					name: "",
					nick: "",
					gender: "",
					gender_text: "",
					email: "",
					mobile: "",
					id_no: "",
					id_no_value: "",
					address: "",
					header: "",
					catalog: "",
					catalog_text: "",
					biz_catalog: [],
					is_auth: "",
					slogan: "",
					province: "",
					city: "",
					county: "",
					area: ""
				},
				scrollTop: 0,
				iconStyle: {
					fontSize: '32rpx',
					color: '#101010'
				},
				customStyle: {
					backgroundColor: '#FFFFFF',
					border: '1px solid rgba(187,187,187,0.2)'
				},
				pageNo: 1, //显示第几页的数据
				pageSize: 5, //当前页显示多少条数据
				totalCount: 0, //总共条数
				page: 0, //分页数据
				loadStatus: 'loadmore', //加载前值为loadmore，加载中为loading，没有数据为nomore
				// 瀑布流
				flowList: [], //商品列表数据
				IMUserSig: "",
				LoginPhone: "",
				BannerList: "", //轮播图数据
				// 是否显示标题文字
				title: false,
				//指示器类型
				// rect-指示器为方块状
				// dot-指示器为圆点
				// number-指示器为数字
				// round-激活的指示器为块状，未激活的未点状，为默认值
				// none-不显示指示器
				mode: "round",
				//指示器的位置
				// topLeft-指示器位于左上角
				// topCenter-指示器位于上方中间位置
				// topRight-指示器位于右上角
				// bottomLeft-指示器位于左下角
				// bottomCenter-指示器位于底部中间位置，为默认值
				// bottomRight-指示器位于右下角
				indicatorPos: "bottomCenter",
				// 是否开启3D效果
				effect3d: true,
				version: '1.0.4',
				// version:'',
				// 当前更新的内容
				// content: `
				// 	1. 修复badge组件的size参数无效问题<br>
				// 	2. 新增Modal模态框组件<br>
				// 	3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
				// 	4. 修复键盘组件在微信小程序上遮罩无效的问题
				// `,
				content: '', //当前更新内容
				showUpdate: false, //升级框是否显示
				downloadshow: false,
				DownloadAddress: '', //下载地址
				DownloadProgressValue: 0 //下载的进度
			};
		},
		methods: {
			GetBanners() {
				// 获取banner信息
				this.$post(this.$url.Article.GetBanners, {
					sign: 'design_news'
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.BannerList = res.data;
					}
				})
			},
			// 初始化数据
			InitData() {
				// 清空数据
				this.$refs.uWaterfall.clear();
				this.flowList = [];
				this.loadStatus = 'loadmore'; //加载前
				this.totalCount = 0;
				this.page = 0;
				this.pageNo = 1;
				this.pageSize = 5;
				let requestData = {
					page_no: this.pageNo,
					page_size: this.pageSize
				};
				this.$post(this.$url.Case.GetCases, requestData, {
					isLoading: true
				}).then(res => {
					uni.stopPullDownRefresh(); //停止当前页面下拉刷新
					this.flowList = res.data.list;
					this.totalCount = res.data.total_count; //分页总条数
				});
			},
			// 上拉加载
			addRandomData() {
				this.page += 5;
				this.pageNo++;
				if (this.page >= this.totalCount) {
					this.loadStatus = 'nomore'; //加载完成
					return;
				}
				let requestData = {
					page_no: this.pageNo,
					page_size: this.pageSize
				};
				this.$post(this.$url.Case.GetCases, requestData, {
					isLoading: false
				}).then(res => {
					console.log(JSON.stringify(res));
					this.loadStatus = 'loadmore'; //加载前
					this.flowList = [...this.flowList, ...res.data.list]; //合并数据
					this.totalCount = res.data.total_count; //分页总条数
				});
			},
			// 下拉刷新
			RefreshData() {
				this.PageInit();
				uni.stopPullDownRefresh();
				let requestData = {
					page_no: this.pageNo, //页码
					page_size: this.pageSize //每页数量
				}
				// 获取设计需求明细
				this.$post(this.$url.Case.GetCases, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data.list;
					this.totalCount = res.data.total_count;
				})
			},
			PageInit() {
				this.flowList = [];
				// 清空数据
				this.$refs.uWaterfall.clear();
				this.loadStatus = 'loadmore'; //加载前
				this.totalCount = 0;
				this.page = 0;
				this.pageNo = 1;
				this.pageSize = 5;
			},
			// 跳转到设计案例界面
			skipDesignCase() {
				uni.navigateTo({
					// url: "/pages/tabBar/settle/DesignCase",
					url: "/pages/tabbar/settle/design-case",
				});
			},
			// 跳转到家装百科界面
			SkipEncyclopedias() {
				uni.navigateTo({
					url: "/pages/tabbar/settle/encyclopedias",
				});
			},
			// 跳转到家居商城界面
			skipHomeShoppingMall() {
				uni.navigateTo({
					url: "/pages/tabbar/settle/HomeShoppingMall",
				});
			},
			// 跳转到风格测试界面
			skipStyleTest() {
				uni.navigateTo({
					url: "/pages/tabbar/settle/style-test/index",
				});
			},
			// 跳转到我要设计界面
			SkipDesign() {
				// 判断是否实名认证
				if(this.BaseData.is_auth != 0){
					this.$refs.uToast.show({
						title: '请先实名认证',
						type: 'warning'
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/design/iwantdesign",
				});
				
			},
			// 跳转到装修计算界面
			skipDecorationBudget() {
				uni.navigateTo({
					url: "/pages/tabbar/settle/DecorationBudget",
				});
			},
			// 跳转到房产展示界面
			skipRealEstateDisplay() {
				uni.navigateTo({
					url: "/pages/tabbar/settle/RealEstateDisplay",
				});
			},
			// 跳转到装修记录界面
			skipDecorationRecord() {
				uni.navigateTo({
					url: "/pages/tabbar/settle/DecorationRecord",
				});
			},
			// 瀑布流商品点击事件
			skipCommodity(item) {
				console.log(JSON.stringify(item));
				uni.navigateTo({
					// url: "/pages/TaskOrder/MyCase/CaseDetails?id=" + item.id,
					url: '/pages/tabbar/settle/case-details?id=' + item.id + '&from=1'
				});
			},
			// 轮播图点击事件
			clickimg(index) {
				console.log(this.BannerList[index].appurl + "?id=" + this.BannerList[index].id)
				uni.navigateTo({
					url: this.BannerList[index].appurl + "?id=" + this.BannerList[index].id,
				});

			},
			// 检查更新
			updaEdition() {
				plus.runtime.getProperty(plus.runtime.appid, info => {
					let GetVersionData = {
						platform: uni.getSystemInfoSync().platform,
						version: info.version
					}
					console.log(JSON.stringify(GetVersionData))
					this.$post(this.$url.App.GetVersion, GetVersionData, {
						isLoading: true
					}).then(res => {
						console.log(JSON.stringify(res))
						// 判断是否需要升级
						if (!res.data.is_new) {
							console.log("当前需要升级")
							this.DownloadAddress = res.data.url_download; //下载的地址
							this.content = res.data.content;
							this.showUpdate = true; //显示升级框
						} else {
							uni.showToast({
								title: '当前已经是最新版本了',
								icon: 'none'
							})
						}
					});
				});

			},
			// 取消
			CancelUpdate() {
				this.showUpdate = false;
			},
			// 升级按钮
			confirmUpdate() {
				var _self = this;
				if (uni.getSystemInfoSync().platform == 'android') {
					// 关闭升级框
					this.showUpdate = false;
					//显示下载进度
					this.downloadshow = true; //显示下载进度
					let downloadTask = uni.downloadFile({
						url: this.DownloadAddress, //下载地址
						success: res => {
							console.log(JSON.stringify(res));
							// {"tempFilePath":"_doc/uniapp_temp_1591351266528/download/test58_20200605.apk","statusCode":200,"errMsg":"downloadFile:ok"}
							if (res.statusCode === 200) {
								console.log('下载成功');
								//下载文件的路径 tempFilePath
								//安装apk
								//更新系统
								plus.runtime.install(res.tempFilePath, {},
									function(wgtinfo) {
										plus.runtime.restart();
									},
									function(error) {
										console.log('应用更新失败');
									}
								);
							}
						}
					});
					downloadTask.onProgressUpdate(function(callback) {
						//下载进度监听
						// console.log(callback)
						_self.DownloadProgressValue = callback.progress;
					});
				}
				if (uni.getSystemInfoSync().platform == 'ios') {
					// 关闭升级框
					this.showUpdate = false;
					//跳转到应用商店
					let appleId = '1595882656'; //易安得车位的appleId
					plus.runtime.launchApplication({
							action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
						},
						function(e) {
							console.log('Open system default browser failed: ' + e.message);
						}
					);
				}
			},
			messageHtml(html) {
				if (html != null) {
					html = html.replace(/\s/g, ""); //去除全部空格
					return parseHtml(html);
				} else {
					return parseHtml('');
				}
			}
		},


	};
</script>

<style lang="scss" scoped>
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
