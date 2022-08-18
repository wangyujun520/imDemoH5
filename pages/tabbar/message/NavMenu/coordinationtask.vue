<template>
	<view class="content">
		<view class="flex">
			<view class="bg-white" style="width: 650rpx;">
				<!-- list 标签数组，元素为对象，如[{name: '推荐'}] -->
				<!-- active-color 选中的颜色 -->
				<!-- is-scroll tabs是否可以左右拖动 -->
				<!-- current 初始化显示第几个 -->
				<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current" @change="change">
				</u-tabs>
			</view>
			<view @click="MenuShow" class="flex align-center justify-center"
				style="width: 100rpx;background-color: #FFFFFF;">
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
		<!-- <swiper :style="{ height: swiperHeight + 'px' }" circular :current="current" @change="changeSwiper">
			<swiper-item v-for="(swiperitem, swiperindex) in list" :key="swiperindex" style="overflow: auto;">

			</swiper-item>
		</swiper> -->
		
		<view class="" @click="skipOrderDetails(item)" v-for="(item, index) in DataList" :key="index">
			<view class="flex flex-column m-2">
				<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
					<view class="flex align-center" style="height: 140rpx;">
						<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
							<image class="rounded" src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%95%86%E5%AE%B6.png" style="width: 100rpx;height: 100rpx;">
							</image>
						</view>
						<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
							<view class="">
								<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{item.name }}</text>
							</view>
							<text style="font-size: 26rpx;color: #888;">{{item.address}}</text>
							<!-- <view class="flex align-center">
								<text style="color: #888;font-size: 26rpx;">预计订单金额：</text>
								<text style="color: red;font-size: 32rpx;font-weight: bold;">￥{{item.money}}</text>
							</view> -->
						</view>
					</view>
					<view class="flex flex-column pb-2" style="padding-left: 140rpx;margin-top: -20rpx;">
						<view class="flex" style="color: #02B1BE;font-size: 26rpx;">
							<text>商品总数量</text>
							<text class="ml-5">X{{ item.goods_count }}</text>
						</view>
					</view>
				</view>
				<view class="flex bg-white"
					style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
					<view class="flex align-center justify-center"
						style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
						<text style="font-size: 24rpx;color: #777;">{{item.create_time}}</text>
					</view>
					<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
						<text style="font-size: 24rpx;color: #777;">{{item.status_text}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 菜单结束 -->
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				// console.log("右上角点击事件");
				// 跳转到创建订单界面
				uni.navigateTo({
					url: '/pages/tabBar/my/OrderWork/CreateOrder'
				})
			}
		},
		data() {
			return {
				module:'',
				OtderType: "",
				//列表数据
				list: [{
						name: '全部',
						value: ''
					},{
						name: '已完成',
						value: 0
					},
					{
						name: '待确认',
						value: 2
					},
					{
						name: '待取货',
						value: 10
					},
					{
						name: '已拒绝',
						value: -1
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
				DataList: []
			};
		},
		onLoad(options) {
			this.module = options.module;
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
			// this.list.forEach((item) => {
			// 	this.DataList.push({});
			// });

			// this.InitData(this.list[0].value);
			this.InitData();
		},
		methods: {
			// 跳转到订单详情
			skipOrderDetails(item) {
				uni.navigateTo({
					// url:'/pages/tabBar/my/OrderWork/OrderDetails'
					url: '/pages/tabbar/message/SubPage/SalesCollaboration/OrderDetails?id='+item.id+'&module='+this.module
				})
			},
			InitData() {
				let requestData = {
					key: "", //关键字
					status: this.list[this.current].value, //1=待确认；2=待取货；0=已完成；-1=已失效；-2=已拒绝
					page_no: 1, //页码
					page_size: 10 //每一页数量
				}
				// 获取销售协同明细
				this.$post(this.$url.Mall.GetHelpOrders, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.DataList = res.data.list;
					}
				})
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				this.InitData(this.list[index].value);
			},
			// 菜单改变
			change(index) {
				this.current = index;
				this.InitData(this.list[index].value);
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				this.InitData(this.list[event.detail.current].value);
				// console.log(JSON.stringify(event))
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
