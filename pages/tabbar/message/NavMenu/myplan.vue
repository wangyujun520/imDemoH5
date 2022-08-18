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

		<!-- 菜单开始 -->
		<swiper :style="{ height: swiperHeight + 'px' }" circular :current="current" @change="changeSwiper">
			<swiper-item v-for="(swiperitem,swiperindex) in list" :key="swiperindex" style="overflow: auto;">
				<!-- {{swiperitem.name}} -->
				
				<view v-for="w in 10" class="flex bg-white px-2 pt-2" style="height: 180rpx;border-top: 1px solid rgba(187,187,187,0.2);">
					<image src="/static/video/demo.jpg" style="width: 240rpx;height: 140rpx;"></image>
					<view class="px-2 flex flex-column" style="width: 500rpx;height: 140rpx;">
						<text style="font-size: 28rpx;">100平米现代简装</text>
						<text class="mt-1" style="font-size: 26rpx;color: #02B1BE;">简约 | 100㎡ | 三室两厅 | 10万 </text>
						<text class="mt-1 LineBreak" style="color: #888;font-size: 26rpx;">四川省成都市武侯区G213辅路天祥C座4313</text>
					</view>
				</view>
				
			</swiper-item>
		</swiper>
		<!-- 菜单结束 -->
		
		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask"
			 :closeable="closeable" :close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item,index) in list" :key="index">
						<text @click="SwitchMenu(index)" :style="{color:(index==current?'#FFFFFF':'#101010'),backgroundColor:(index==current?'#FF9900':'#FFFFFF')}"
						 class="mb-2 py-2 mr-2 label-style">{{item.name}}</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->
		
		
	</view>
</template>

<script>
	export default {
		// onNavigationBarButtonTap(e) {
		// 	if (e.float == 'right') {
		// 		console.log("跳转页面")
		// 		// 跳转到新增方案页面
		// 		uni.navigateTo({
		// 			url:'/pages/tabBar/message/NavMenu/newscheme'
		// 		})
		// 	}
		// },
		data() {
			return {
				showHeight: 200,
				toggle: true,
				//列表数据
				list: [{
					name: '全部'
				}, {
					name: '二室'
				}, {
					name: '三室'
				}, {
					name: '四室'
				}, {
					name: '简装'
				}, {
					name: '欧式'
				}, {
					name: '日式'
				}, {
					name: '中式'
				}],
				current: 0, //当前选中的下标
				activeColor: this.$u.color['warning'],
				////////////
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				///////////
				swiperHeight: 500 // swiper高度
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					let height;
					switch (uni.getSystemInfoSync().platform) {
						case 'android':
							height = res.windowHeight - uni.upx2px(92);
							break;
						case 'ios':
							if (res.model == 'iPhoneXSMax') {
								height = res.windowHeight - uni.upx2px(90) - uni.upx2px(56);
							} else {
								height = res.windowHeight - uni.upx2px(84);
							}
							break;
						default:
							height = res.windowHeight - uni.upx2px(92);
							break;
					}
					this.swiperHeight = height;
				}
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
			}
		}
	}
</script>

<style lang="scss">
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
	
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /*超出1行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}

</style>