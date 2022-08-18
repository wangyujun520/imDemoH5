<template>
	<view class="content">
		<!-- 顶部菜单 -->
		<view style="height: 80rpx;width: 750rpx;">
			<view class="flex">
				<view class="bg-white" style="width: 650rpx;">
					<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current" @change="change"></u-tabs>
				</view>
				<view @click="MenuShow" class="flex align-center justify-center" style="width: 100rpx;background-color: #FFFFFF;">
					<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
				</view>
			</view>
		</view>
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 80rpx;"></view>
		<view class="flex flex-column" @click="skipdesignassignment(sitem)" style="margin: 20rpx;" v-for="(sitem,sindex) in DataList">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="sitem.headPhoto" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{sitem.name}} </text>
						</view>
						<view v-if="sitem.isPay" class="flex align-center">
							<text style="color: #777;font-size: 26rpx;">悬赏金额：</text>
							<text v-if="sitem.payMoney!=null" style="color: #FF0000;font-weight: bold;"><span style="font-size: 26rpx;">￥</span><span
								 style="font-size: 30rpx;">{{sitem.payMoney}}</span></text>
						</view>
					</view>
					<view class="flex justify-end align-center pr-2" style="height: 100%;width: 200rpx;">
						<view class="" v-if="sitem.isPay">
							<text class="text-white" style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
						</view>
					</view>
				</view>
				<view class="px-2">
					<text style="color: #02B1BE;font-size: 28rpx;">{{sitem.houseStyle}} |{{sitem.houseArea}} ㎡ | {{sitem.taskDate}}天|{{sitem.peopleNum}}口人|总预算{{sitem.cost}}万元
					</text>
				</view>
				<view class="px-2 my-2">
					<view v-if="sitem.extend!=''&&sitem.extend!=undefined" class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">{{sitem.extend}}</text>
					</view>
					<view v-else class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
					</view>
				</view>
			</view>
			<view class="flex bg-white" style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
				<view class="flex align-center justify-center" style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;" v-html="vFormateTime(sitem.createTime)"></text>
				</view>
				<view class="flex align-center justify-center" style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;">{{sitem.joinNum}} 参与</text>
				</view>
				<view v-if="sitem.beginTime>=0" class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #777;">{{sitem.beginTime}}天到期</text>
				</view>
				<view v-else class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #DF0101;">已到期</text>
				</view>
			</view>
		</view>
		<u-loadmore v-if="DataList!=undefined && DataList.length>0" bg-color="rgb(240, 240, 240)" :status="loadStatus"></u-loadmore>

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
	</view>
</template>

<script>
	import $T from '@/common/free-lib/time.js';
	export default {
		// 下拉刷新
		onPullDownRefresh() {
			this.RefreshData();
		},
		onReachBottom() {
			this.loadStatus = "loading"; //加载中
			this.addRandomData();
		},
		data() {
			return {
				loadStatus: "loadmore",
				page: 0, //分页数据
				totalCount: 0, //总共条数
				//列表数据
				list: [{
						name: '全部'
					},
					{
						name: '雇佣'
					},
					{
						name: '已完成'
					},
					{
						name: '已到期'
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
		onShow() {
			var RequrestUrl = this.AJB.BizUrl + "api/Design/GetList";
			var RequrestDatas = {
				type: "",
				stateType: this.list[this.current].name,
				maxResultCount: 5,
				skipCount: 0,
				ismy: true
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					this.DataList = res.dataList.items;
					this.totalCount = res.dataList.totalCount;
				})
				.catch((err) => {
					console.log(err);
				});

		},
		methods: {

			// 下拉刷新
			RefreshData() {
				var RequrestUrl = this.AJB.BizUrl + "api/Design/GetList";
				var RequrestDatas = {
					type: "",
					stateType: this.list[this.current].name,
					maxResultCount: 5,
					skipCount: 0,
					ismy: true
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then((res) => {
					uni.stopPullDownRefresh(); //停止当前页面下拉刷新
					this.DataList = res.dataList.items;
					this.totalCount = res.dataList.totalCount;
				}).catch((err) => {
					console.log(err);
				});
			},
			GetData(isforce) {
				//获取数据
				// if (this.DataList[this.current].length !== undefined && !isforce) {
				// 	return;
				// }
				var RequrestUrl =
					this.AJB.BizUrl + "api/Design/GetList";
				var RequrestDatas = {
					type: "",
					stateType: this.list[this.current].name,
					maxResultCount: 10,
					skipCount: 0,
					ismy: true,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						if (res.code == 200) {
							this.DataList = res.dataList.items;
							console.log(typeof(this.DataList));
						}
					})
					.catch((err) => {
						console.log(err);
					});

			},
			// 上拉加载更多
			addRandomData() {
				// console.log("上拉加载更多")
				console.log(this.page);
				this.page += 5;
				if (this.page >= this.totalCount) {
					this.loadStatus = "nomore"; //加载完成
					return;
				}
				var RequrestUrl = this.AJB.BizUrl + "api/Design/GetList";
				var RequrestDatas = {
					type: "",
					stateType: this.list[this.current].name,
					maxResultCount: 5,
					skipCount: this.page,
					ismy: true
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then((res) => {
					res.dataList.items.forEach((items) => {
						this.DataList.push(items);
					});
					this.totalCount = res.dataList.totalCount;
					this.loadStatus = "loadmore"; //加载完成
				}).catch((err) => {
					console.log(err);
				});
			},
			// 跳转到设计任务界面
			skipdesignassignment(item) {
				uni.navigateTo({
					// url: '/pages/tabBar/message/NavMenu/designassignment?ismy=true&id='+item.id,
					url: '/pages/tabBar/message/NavMenu/PublishDesignTasks?ismy=true&id=' + item.id
				})
			},
			// 切换菜单
			SwitchMenu(index) {
			
				this.current = index;
				this.show = false;
					this.GetData(false);
			},
			// 菜单改变
			change(index) {
				console.log(index)
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
			},
			vFormateTime(datetime) {
				var timestamps = (new Date(datetime)).getTime();
				return $T.getDateDiffv1(timestamps); //时差结果

			}

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
