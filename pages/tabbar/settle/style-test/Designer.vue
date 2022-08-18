<template>
	<view class="content">
		<view class="flex">
			<view class="bg-white" style="width: 650rpx">
				<!-- list 标签数组，元素为对象，如[{name: '推荐'}] -->
				<!-- active-color 选中的颜色 -->
				<!-- is-scroll tabs是否可以左右拖动 -->
				<!-- current 初始化显示第几个 -->
				<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current" @change="change">
				</u-tabs>
			</view>
			<view @click="MenuShow" class="flex align-center justify-center"
				style="width: 100rpx; background-color: #ffffff">
				<text class="iconfont text-dark" style="font-size: 40rpx">&#xe66c;</text>
			</view>
		</view>

		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
				:close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text @click="SwitchMenu(index)" :style="{
                color: index == current ? '#FFFFFF' : '#101010',
                backgroundColor: index == current ? '#FF9900' : '#FFFFFF',
              }" class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->

		<!-- 菜单开始 -->
		<!-- <swiper class="mt-2" :style="{ height: swiperHeight + 'px' }" circular :current="current"
			@change="changeSwiper">
			<swiper-item v-for="(swiperitem, swiperindex) in list" :key="swiperindex" style="overflow: auto">
			</swiper-item>
		</swiper> -->
		<!-- 菜单结束 -->
		<view class="" style="height: 20rpx;"></view>
		<view v-for="(sitem, sindex) in DataList" :key="sindex" class="FindInfo px-2 py-2 bg-white"
			style="border-bottom: 1px solid rgb(187, 187, 187, 0.5)">
			<!-- 顶部开始 -->
			<view class="flex" @click="JumpHomePage(sitem)">
				<!-- <view class="flex align-center" @click="JumpHomePage(sitem)"> -->
				<view class="flex align-center">
					<image :src="sitem.header" style="width: 110rpx; height: 110rpx" class="rounded"></image>
				</view>
				<view class="flex flex-column pl-2" style="width: 490rpx">
					<view class="UserInfo pt-1">
						<text class="mr-1"
							style="color: #101010; font-size: 32rpx; font-weight: bold">{{ sitem.name }}</text>
						<text class="font-sm text-white bg-danger px-1 pl-1"
							style="border-radius: 0rpx 8rpx 8rpx 0rpx">设计师</text>
					</view>
					<view class="Describe">
						<text style="font-size: 26rpx; color: #939393">{{sitem.slogan}}</text>
					</view>
					<view class="Scoring">
						<u-rate :disabled="true" :current="sitem.point" :size="28" inactive-color="#B2B2B2"
							active-color="#FF9900" active-icon="star-fill" inactive-icon="star"></u-rate>
						<text style="color: #ff1b1b">{{ sitem.point }}分</text>
					</view>
				</view>
				<!-- <view class="flex justify-end align-center" style="width: 110rpx">
					<text v-if="!sitem.attention&&!sitem.isSelf" class="rounded px-1" @click="attention(sitem)"
						style="color: #ff9900;border: 1px solid #ff9900;padding-top: 5rpx;padding-bottom: 5rpx;">+关注</text>
					<text v-if="sitem.attention&&!sitem.isSelf" class="rounded px-1"
						style="color: #939393;border: 1px solid #939393;padding-top: 5rpx;padding-bottom: 5rpx;">已关注</text>
				</view> -->
			</view>
			<!-- 顶部结束 -->
			<view class="flex flex-wrap" style="border: 0px solid red;padding-left: 130rpx;">
				<text v-for="(tag,index) in sitem.tags" v-if="index<3" class="mr-1 mt-2" style="color: #EA8531;background-color: #FFEDDE;padding: 0 20rpx;font-size: 24rpx;">{{tag}}</text>
			</view>
			<!-- 图片显示 -->
			<view class="Pic-Box flex flex-wrap justify-end mt-1">
				<view class="pl-1 pt-1" style="width: 196rpx; height: 196rpx" v-for="(citem, cindex) in sitem.cases"
					:key="cindex">
					<image class="rounded" :src="citem.cover" style="width: 100%; height: 100%"></image>
				</view>
			</view>
		</view>
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				house_style:'',
				DataList: [], //Mock数据
				//列表数据
				list: [
					// {
					//  name:'1'
					// }
				],
				current: 0, //当前选中的下标
				activeColor: this.$u.color["warning"],
				// 弹出菜单参数
				show: false, //是否显示弹出框菜单
				mode: "top", //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: "top-right", //关闭按钮位置
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度
			};
		},
		onLoad(options) {
			// console.log(options.house_style)
			if((options.house_style??'')!=''){
				this.house_style = options.house_style;
			}
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == "iPhoneXSMax") {
					this.swiperHeight = res.windowHeight - 40 - uni.upx2px(70);
				} else {
					this.swiperHeight = res.windowHeight - 40;
				}
			} catch (e) {
				console.log(e);
			}
			
			this.list = [{
				name: '全部',
				value: ''
			}];
			// 获取数据字典
			this.$post(this.$url.Public.GetDicts, {
				key: 'house_style'
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				res.data.forEach(item => {
					let cc = {
						name: item.value,
						value: item.key
					}
					this.list.push(cc)
				})
				
				if((this.house_style??'')!=''){
					res.data.forEach((item,index) => {
						if(this.house_style===item.key){
							this.current = index+1;
						}
						
					})
				}
				
				this.InitData();
			})

			// 获取设计师列表
			// this.$post(this.$url.Case.GetDesigners, {

		},
		methods: {
			InitData() {
				this.$post(this.$url.Design.GetDesigners, {
					catalog: this.list[this.current].value
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.DataList = res.data.list;

						// this.DataList[0].cases = [
						// 	{
						// 	    "id": "c2c701b8-76e5-4725-9a5e-0ec9f6c4fb0d",
						// 	    "cover": "http://oss.anjubang.cn//nopic.png"
						// 	},
						// 	{
						// 	    "id": "1c5dbe5d-0aa8-4314-a59d-103c4cd876b2",
						// 	    "cover": "http://oss.anjubang.cn//nopic.png"
						// 	},
						// 	{
						// 	    "id": "13449d6b-a2c9-40cc-90eb-1619556eec5d",
						// 	    "cover": "http://oss.anjubang.cn//nopic.png"
						// 	},
						// 	{
						// 	    "id": "c2c701b8-76e5-4725-9a5e-0ec9f6c4fb0d",
						// 	    "cover": "http://oss.anjubang.cn//nopic.png"
						// 	},
						// 	{
						// 	    "id": "1c5dbe5d-0aa8-4314-a59d-103c4cd876b2",
						// 	    "cover": "http://oss.anjubang.cn//nopic.png"
						// 	},
						// 	{
						// 	    "id": "13449d6b-a2c9-40cc-90eb-1619556eec5d",
						// 	    "cover": "http://oss.anjubang.cn//nopic.png"
						// 	}
						// ]
					}
				})
			},
			// 跳转到详情页面
			JumpHomePage(item) {
				uni.navigateTo({
					url: "/pages/tabbar/find/homepage?id=" + item.id
				});
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
		},
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
