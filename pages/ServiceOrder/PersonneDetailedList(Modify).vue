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

		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable" :close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text
							@click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#FF9900' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style"
						>
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->

		<!-- 菜单开始 -->
		<swiper :style="{ height: swiperHeight + 'px' }" circular :current="current" @change="changeSwiper">
			
			<swiper-item v-for="(swiperitem, swiperindex) in list" :key="swiperindex" style="overflow: auto;">
				<block v-for="(item, index) in MenuList" :key="item.id" >
					<view class="flex p-2 u-border-bottom bg-white">
						<image mode="aspectFill" :src="item.images" />
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<!-- <view class="title-wrap"> -->
						<view class="flex flex-column" style="width: 460rpx;">
							<!-- <text class="title u-line-2">{{ item.title }}</text> -->
							<view class="UserInfo pt-1">
								<text class="mr-1" style="color: #101010;font-size: 32rpx;font-weight: bold;">海绵宝宝</text>
								<text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">设计师</text>
								<!-- <text v-if="item.RankClass === 2" class="font-sm text-white bg-info px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">销售人员</text>
								<text v-if="item.RankClass === 3" class="font-sm text-white bg-success px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">管家</text>
								<text v-if="item.RankClass === 4" class="font-sm text-white bg-warning px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">商家</text> -->
							</view>
							<view class="Describe">
								<text style="font-size: 26rpx;color: #939393;">房屋设计、新房、公寓、旧房改造</text>
							</view>
							<view class="Scoring">
								<u-rate :disabled="true" :current="4" :size="28" inactive-color="#B2B2B2" active-color="#FF9900" active-icon="star-fill"
								 inactive-icon="star"></u-rate>
								<text style="color: #ff1b1b;">4.0分</text>
							</view>
						</view>
						<view class="flex justify-end align-center" style="width: 120rpx;">
							<text @click="PersonnelOperation" class="iconfont" style="font-size: 50rpx;color: #101010;font-weight: bold;">&#xe61e;</text>
						</view>
					</view>
				</block>
			</swiper-item>
		</swiper>
		<!-- 菜单结束 -->
		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow"></u-action-sheet>
		
		<u-action-sheet :list="MenuSheetList" v-model="MenuSheetListShow" @click="MenuClick"></u-action-sheet>
	</view>
</template>

<script>
export default {
	onNavigationBarButtonTap: function(e) {
		if (e.float == 'right') {
			this.MenuSheetListShow = true;
		}
	},
	data() {
		return {
			//列表数据
			list: [
				{
					name: '设计师'
				},
				{
					name: '监理'
				},
				{
					name: '会员'
				},
				{
					name: '电工'
				},
				{
					name: '泥工'
				},
				{
					name: '木工'
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
			swiperHeight: 500 ,// swiper菜单高度
			
			MenuList:[
				{
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
			ActionSheetList: [{
				text: '联系人员'
			}, {
				text: '替换人员' 
			},{
				text: '删除人员',
				color: 'red'
				// fontSize: 28,
				// subText: '感谢您的点赞'
			}],
			MenuSheetListShow: false,
			MenuSheetList: [{
				text: 'A页面'
			}, {
				text: 'B页面' 
			}]
			
		};
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
	},
	methods: {
		MenuClick(index){
			console.log(`点击了第${index + 1}项，内容为：${this.MenuSheetList[index].text}`)
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
		// 显示弹出框菜单
		MenuShow() {
			this.show = true;
		},
		//swiper滑动菜单改变事件
		changeSwiper(event) {
			this.current = event.detail.current;
			// console.log(JSON.stringify(event))
		},
		PersonnelOperation(){
			this.ActionSheetListShow = true;
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
