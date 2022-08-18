<template>
	<view class="content">
		<view class="flex flex-column" @click="skipdesignassignment(sitem)" style="margin: 20rpx;"
			v-for="(sitem,sindex) in DataList">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="sitem.header" style="width: 100rpx;height: 100rpx;">
						</image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{sitem.name}}
							</text>
						</view>
						<view v-if="sitem.money" class="flex align-center">
							<text style="color: #777;font-size: 26rpx;">预算金额：</text>
							<text v-if="sitem.money!=null" style="color: #FF0000;font-weight: bold;"><span
									style="font-size: 26rpx;">￥</span><span
									style="font-size: 30rpx;">{{sitem.money}}</span></text>
						</view>
					</view>
					<view class="flex justify-end align-center pr-2" style="height: 100%;width: 200rpx;">
						<view class="" v-if="sitem.fee_status==0">
							<text class="text-white"
								style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
						</view>
					</view>
				</view>
				<view class="px-2">
					<text style="color: #02B1BE;font-size: 28rpx;">{{sitem.tags}}</text>
				</view>
				<view class="px-2 my-2">
					<view v-if="sitem.content!=''&&sitem.content!=undefined" class="p-1"
						style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">{{sitem.content}}</text>
					</view>
					<view v-else class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
					</view>
				</view>
			</view>
			<view class="flex bg-white"
				style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;">{{sitem.create_time}}</text>
				</view>
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;">{{sitem.join_count}}人参与</text>
				</view>
				<view v-if="sitem.end_day>=0" class="flex align-center justify-center"
					style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #777;">{{sitem.end_day}}天到期</text>
				</view>
				<view v-else class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #DF0101;">已到期</text>
				</view>
			</view>
		</view>
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 90vh">
			<u-empty text="暂无工单" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000)
		},
		data() {
			return {
				module:'',
				status:'',//状态
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
				OtderType: '',
				IsPay: false,
				OrderList: [{
					headPortrait: '/static/img/head/demo5.jpg',
					Name: '张三',
					Money: '10',
					HousInfo: '三室两厅',
					TaskDate: '3',
					PeopleNum: '5',
					Extend: '客厅阳台需要设计榻榻米，儿童房做榻榻米，家里有老人不方便，需要设计马桶',
					BeginTime: '20分钟前',
					Join: '50人',
					Expiration: '2天'

				}],
				DataList: [],
				requestData:{
					
				},
				page_no:1,
				page_size:10
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
		},
		onLoad(options) {
			
			if(options.module != 'undefined'){
				this.module = options.module;
			}
			
			// 动态修改标题
			uni.setNavigationBarTitle({
				title: options.title
			});
			
			if(options.type=='0'){
				console.log("全部")
				this.requestData = {
					key: '', //关键字
					status: '', //状态，空=全部，0=已完成;1=进行中;-1=已取消；-2=已拒绝;
					fee_status: '', //佣金状态；0=开启（悬赏）；1=关闭（免费）
					page_no: this.page_no, //页码
					page_size: this.page_size //每一页数量
				}
			}
			if(options.type=='1'){
				console.log("0=开启（悬赏）；1=关闭（免费）")
				this.requestData = {
					key: '', //关键字
					status: '', //状态，空=全部，0=已完成;1=进行中;-1=已取消；-2=已拒绝;
					fee_status: options.value, //佣金状态；0=开启（悬赏）；1=关闭（免费）
					page_no: this.page_no, //页码
					page_size: this.page_size //每一页数量
				}
			}
			if(options.type=='2'){
				console.log("状态，空=全部，0=已完成;1=进行中;-1=已取消；-2=已拒绝;")
				this.requestData = {
					key: '', //关键字
					status: options.value, //状态，空=全部，0=已完成;1=进行中;-1=已取消；-2=已拒绝;
					fee_status: '', //佣金状态；0=开启（悬赏）；1=关闭（免费）
					page_no: this.page_no, //页码
					page_size: this.page_size //每一页数量
				}
			}
			// 初始化数据
			this.InitData();
		},
		methods: {
			InitData() {
				// let requestData = {
				// 	key: "", //关键字
				// 	status: this.status, //状态，空=全部，0=已完成;1=进行中;-1=已取消；-2=已拒绝;
				// 	fee_status: "", //佣金状态；0=开启（悬赏）；1=关闭（免费）
				// 	page_size: 10, //每一页数量
				// 	page_no: 1 //页码
				// }
				// 获取全部工单
				this.$post(this.$url.Design.GetTasks, this.requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					// console.log(123)
					if (res.code == 200 && res.status == 0) {
						console.log(JSON.stringify(res.data))
						this.DataList = res.data.list
					}
				});
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
			// // 格式化日期结束
			// GetData(isforce) {
			// 	//获取数据
			// 	var RequrestUrl =
			// 		this.AJB.BizUrl + "api/Design/GetList";
			// 	var RequrestDatas = {
			// 		type: "任务工单",
			// 		stateType:this.OtderType,
			// 		maxResultCount: 10,
			// 		skipCount: 0,
			// 		ismy: false,
			// 	};
			// 	this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 		.then((res) => {
			// 			if (res.code == 200) {
			// 				this.DataList = res.dataList.items
			// 			}
			// 		})
			// 		.catch((err) => {
			// 			console.log(err);
			// 		});

			// },
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				// console.log(JSON.stringify(event))
			},
			userInfo() {
				console.log("点击事件");
			},
			// 跳转到设计任务界面
			skipdesignassignment(item) {
				// uni.navigateTo({
				// 	// url: '/pages/tabBar/message/NavMenu/designassignment?ismy=true&id='+item.id,
				// 	url: '/pages/tabbar/message/NavMenu/PublishDesignTasks?ismy=true&id=' + item.id
				// })
				uni.navigateTo({
					url: '/pages/design/design_detail?order_id=' + item.order_id+'&status='+item.status+'&module='+this.module
				})
			},
		}
	};
</script>

<style lang="scss">
	page{
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
