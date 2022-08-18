<template>
	<view class="content">
		<u-sticky>
			<!-- 只能有一个根元素 -->
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
		
		<view @click="skipEventDetails(item)" v-for="(item,index) in DataList" :key="index" class="flex flex-column bg-white py-2"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<!-- 第一行 -->
			<view class="flex justify-between align-center px-3" style="height: 80rpx;width: 100%;">
				<view class="flex align-center">
					<image class="rounded" :src="item.logo" style="width: 60rpx;height: 60rpx;"></image>
					<text class="ml-1" style="color: #6B8EB5;font-size: 28rpx;">{{item.name}}</text>
					<text class="rounded ml-1" style="color: #FFFFFF;background-color: #8A2BE2;font-size: 22rpx;margin-left: 5rpx;padding: 2rpx 15rpx;">{{item.catalog}}</text>
				</view>
				<view class="flex">
					<text style="color: #02B1BE;font-size: 26rpx;">{{item.status_text}}</text>
				</view>
			</view>
			<!-- 第二行 -->
			<view class="flex flex-column" style="padding-left: 100rpx;">
				<text style="color: #333;font-size: 28rpx;">{{item.title}}</text>
				<text style="font-size: 26rpx;color: #888;" class="mt-1">{{item.date}}</text>
			</view>
		</view>
		
		
		<!-- 菜单开始 -->
		<!-- <swiper class="pt-2" :style="{ height: swiperHeight + 'px' }" circular :current="current"
			@change="changeSwiper">
			<swiper-item v-for="(swiperitem, swiperindex) in list" :key="swiperindex" style="overflow: auto;">
				
			</swiper-item>
		</swiper> -->
		<!-- 菜单结束 -->
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无活动" mode="list"></u-empty>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		// 右上角点击事件
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				// 跳转到活动发布页面
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/EventRelease'
				});
			}
		},
		data() {
			return {
				// item: {
				// 	"isOver": false,
				// 	"headPortrait": "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg",
				// 	"name": "掌上明珠",
				// 	"TypeWork": "商家",
				// 	"releaseTime": "2020-12-26 03:27",
				// 	"coverMap": "/static/img/test111.png",
				// 	"title": "品牌周年庆“全场9折”",
				// 	"content": "冰箱、洗衣机、空调家电全场优惠，最高单件优惠可减1999元，抢完及止！！！"
				// },
				DataList:[],
				//列表数据
				list: [{
						name: '全部',
						value: ''
					},
					{
						name: '已结束',
						value: '0'
					},
					{
						name: '待审核',
						value: '1'
					},
					{
						name: '进行中',
						value: '2'
					},
					{
						name: '已取消',
						value: '-1'
					},
					{
						name: '未通过',
						value: '-2'
					},
					{
						name: '草稿箱',
						value: '10'
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
				swiperHeight: 500 // swiper菜单高度
			};
		},
		// onLoad(options) {
			
			
			
		// },
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
			this.InitData();
			// this.list.forEach((item,index)=>{
			// 	// console.log(item.value)
			// 	this.GetData(item.value,index);
			// })
		},
		methods: {
			InitData(){
				let requestData = {
					key: "", //关键字
					status: this.list[this.current].value, //状态；0=已结束;1=待审核;2=进行中;-1=已取消；-2=未通过;10=草稿
					page_no: 1, //页码
					page_size: 100 //每一页数量
				}
				this.$post(this.$url.User.GetActivities, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						// this.DataList = res.data.list;
						this.DataList = res.data.list;
					}
				})
			},
			GetData(status,index){
				let requestData = {
					key: "", //关键字
					status: this.status, //状态；0=已结束;1=待审核;2=进行中;-1=已取消；-2=未通过;10=草稿
					page_no: 1, //页码
					page_size: 100 //每一页数量
				}
				this.$post(this.$url.User.GetActivities, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						// this.DataList = res.data.list;
						this.list[index].DataList = res.data.list;
					}
				})
			},
			skipEventDetails(item) {
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/EventDetails?id='+item.id
				})
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				// console.log(index)
				this.InitData();
			},
			// 菜单改变
			change(index) {
				this.current = index;
				this.InitData();
				// console.log(index)
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				this.InitData();
				// console.log(event.detail.current)
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
