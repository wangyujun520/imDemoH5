<template>
	<view class="content">

		<view class="flex flex-column bg-white justify-center align-center py-5">
			<image src="/static/img/wallet.png" style="width: 100rpx;height: 100rpx;"></image>
			<text class="mt-3" style="font-size: 56rpx;font-weight: bold;color: #101010;">{{MoneyList.all_money}}</text>
			<text style="color: #848484;font-size: 30rpx;">可提现金额：{{MoneyList.available_money}}</text>
			<view @tap="skipWithdrawal" class="mt-5 flex align-center justify-center rounded"
				style="width: 450rpx;height: 90rpx;background-color: #FF9900;">
				<text class="text-white" style="font-size: 28rpx;font-weight: bold;">提现</text>
			</view>

		</view>

		<view class="flex flex-column p-3">
			<text class="mb-1" style="font-size: 40rpx;">交易记录</text>
			<view class="flex">
				<view @tap="ChoseRecode('')" class="flex align-center justify-center"
					:class="RecodeState==0?'ChoseStyle':'DefaultStyle'">
					<text>全部</text>
				</view>
				<view @tap="ChoseRecode(1)" class="flex align-center justify-center ml-2"
					:class="RecodeState==1?'ChoseStyle':'DefaultStyle'">
					<text>收入</text>
				</view>
				<view @tap="ChoseRecode(2)" class="flex align-center justify-center ml-2"
					:class="RecodeState==2?'ChoseStyle':'DefaultStyle'">
					<text>支出</text>
				</view>
				<!-- <view @tap="ChoseRecode(3)" class="flex align-center justify-center ml-2" :class="RecodeState==3?'ChoseStyle':'DefaultStyle'">
					<text>提现</text>
				</view> -->
			</view>
		</view>

		<!-- "收支类别，支出1；收入2；0=提现；" -->

		<!-- 全部 -->
		<view class="flex flex-column px-3">

			<view v-for="(item,index) in DataList" :key="item.id" @tap="skipTransactionDetails"
				class="flex flex-column border-bottom py-2">
				<text style="font-size: 32rpx;color: #101010;">{{item.title}}</text>
				<view class="flex align-center justify-between">
					<text style="color: #bbb;font-size: 26rpx;">{{item.catalog_text}}</text>
					<text :style="{color:item.money>0?'#32C175':'#F05C5C'}"
						style="color: #32C175;font-size: 40rpx;">{{item.money}}</text>
				</view>
				<text style="color: #bbb;font-size: 26rpx;">{{item.add_date}}</text>
			</view>

			<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 40vh">
				<u-empty text="暂无内容" mode="list"></u-empty>
			</view>
			<!-- 上拉加载更多 -->
			<u-loadmore v-if="totalCount > 5" bg-color="rgb(240, 240, 240)" :status="loadStatus"
				@loadmore="addRandomData" icon-type="flower"></u-loadmore>

		</view>


		<!-- 占位 -->
		<view class="" style="height: 100rpx;"></view>

		<!-- 模态框 -->
		<u-mask class="flex justify-center align-center" :show="show">
			<view class="bg-white rounded" style="width: 500rpx;height: 800rpx">
				<view class="flex justify-center align-center" style="height: 100rpx;">
					<text style="color: #101010;font-size: 28rpx;font-weight: bold;">{{Article.title}}</text>
				</view>
				<view class="bg-white px-2" style="height: 620rpx;font-size: 26rpx;">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="" v-html="Article.content"></view>
					</scroll-view>
				</view>
				<view class="flex" style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);">
					<view @click="refuse" class="flex justify-center align-center" style="width: 50%;height: 100%;">
						<text style="color: #666;font-size: 28rpx;">不同意</text>
					</view>
					<view @click="yes" class="flex justify-center align-center"
						style="width: 50%;height: 100%;border-left: 1px solid rgba(187,187,187,0.2);">
						<text style="color: #FF9900;font-size: 28rpx;">同意并继续</text>
					</view>
				</view>
			</view>
		</u-mask>

	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				// 跳转到联系我们
				uni.navigateTo({
					url: '/pages/My/About/ContactUs'
				})
			}
		},
		onLoad() {
			// 获取菜单明细
			this.$post(this.$url.Account.GetWallet, {}, {
				isLoading: false
			}).then(res => {
				console.log(JSON.stringify(res))
				// this.MoneyList = res.data;
				this.MoneyList = res.data;
			});
			this.InitData();
		},
		onShow() {
			this.$post(this.$url.Article.GetArticle, {
				sign: "app_taking_sign"
			}, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.Article = res.data;
					// this.content = res.data.content;
					// this.title
				}
			})
		},
		// 上拉触底事件
		onReachBottom() {
			this.loadStatus = 'loading'; //加载中
			this.addRandomData();
		},
		data() {
			return {
				content: ``,
				Article: {
					id: "",
					title: "",
					content: "",
					author: "",
					update: ""
				},
				show: false,
				type: '', //收支类别，支出1；收入2；0=提现；
				MoneyList: {
					available_money: null, //可提现金额
					all_money: null
				},
				DataList: [],
				RecodeState: 0, //0全部 1付款 2收款 3提现
				pageNo: 1, //当前显示页数
				pageSize: 5, //每页显示条数
				totalCount: 0, //分页总条数
				page: 0, //分页数据
				loadStatus: 'loadmore', //加载前值为loadmore，加载中为loading，没有数据为nomore
			}
		},
		methods: {
			// 跳转到提现页面
			skipWithdrawal() {
				// 校验缓存
				if(uni.getStorageSync('Withdrawal') == 1){
					// 存在 直接跳转
					uni.navigateTo({
						url:'/pages/my/wallet/Withdrawal?taking_money='+this.MoneyList.available_money
					})
				}else{
					// 不存在
					this.show = true;//需要弹框
				}
			},
			// 同意
			yes() {
				this.show = false;
				// 跳转到提现界面
				uni.navigateTo({
					url: '/pages/my/wallet/Withdrawal?taking_money=' + this.MoneyList.available_money
				})
				uni.setStorageSync('Withdrawal',1)
			},
			// 不同意
			refuse() {
				this.show = false;
			},
			ChoseRecode(state) {
				console.log(state)
				this.RecodeState = state;

				this.type = state;
				this.InitData();
			},
			// ChoseRecode(type){
			// 	console.log(type);
			// 	// this.type = type;
			// 	// this.InitData();
			// },
			// 上拉加载
			addRandomData() {
				this.page += 5;
				this.pageNo++;
				if (this.page >= this.totalCount) {
					this.loadStatus = 'nomore'; //加载完成
					return;
				}
				//获取车位订单明细
				let RequrestData = {
					type: this.type, //收支类别，支出1；收入2
					page_no: this.pageNo,
					page_size: this.pageSize
				};
				this.$post(this.$url.Account.GetTakingMoneys, RequrestData, {
					isLoading: true
				}).then(res => {
					console.log(JSON.stringify(res))
					this.loadStatus = 'loadmore'; //加载前
					this.DataList = [...this.DataList, ...res.data.list]; //合并数据
					this.totalCount = res.data.total_count; //分页总条数
				});
			},
			InitData() {
				this.DataList = []; //清空列表
				this.loadStatus = 'loadmore'; //加载前
				this.totalCount = 0;
				this.page = 0;
				this.pageNo = 1;
				this.pageSize = 5;
				let requestData = {
					type: this.type, //收支类别，支出1；收入2
					page_no: this.pageNo,
					page_size: this.pageSize
				}
				// 获取菜单明细
				this.$post(this.$url.Account.GetTakingMoneys, requestData, {
					isLoading: false
				}).then(res => {
					console.log(JSON.stringify(res))
					this.DataList = res.data.list;
					this.totalCount = res.data.total_count; //分页总条数
				});
			},
			// 跳转到提现记录页面
			skipTransactionDetails() {
				// uni.navigateTo({
				// 	url:'/pages/my/wallet/TransactionDetails'
				// })
			},
			// 跳转到提现详情页面
			// skipWithdrawalRecord(){
			// 	uni.navigateTo({
			// 		url:'/pages/my/wallet/WithdrawalDetails'
			// 	})
			// }
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.DefaultStyle {
		width: 100rpx;
		height: 60rpx;
		color: #7B7D8A;
	}

	.ChoseStyle {
		width: 100rpx;
		height: 60rpx;
		background-color: #FFEFE1;
		color: #FF9900;
	}
</style>
