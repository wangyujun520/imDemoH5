<template>
	<view class="content">
		<u-sticky>
			<view class="flex" style="height: 80rpx;width: 750rpx;">
				<view class="" style="width: 650rpx">
					<u-tabs bgColor="#FFFFFF" :list="tabsList" active-color="#18b566" :is-scroll="true"
						:current="current" @change="change"></u-tabs>
				</view>
				<view @tap="MenuShow" class="flex align-center justify-center bg-white"
					style="width: 100rpx;height: 88rpx;">
					<text class="iconfont" style="font-size: 40rpx;color: #101010;">&#xe6f2;</text>
				</view>
			</view>
		</u-sticky>
		
		<view class="flex flex-column rounded m-3" @tap="skipProductDetails(item)" v-for="(item,index) in DataList" :key="item.id">
			<view class="flex bg-white p-3">
				<img :src="item.cover" style="width: 180rpx;height: 180rpx;">
				<view class="flex flex-column pl-3" style="border: 0px solid red;width: 450rpx;">
					<text style="font-size: 26rpx;">{{item.title}}</text>
					<view class="flex flex-wrap">
						<text v-for="tag in item.tags" style="color: #ff9900;border: 1px solid #ff9900;padding: 0rpx 20rpx;"
							class="mr-2 mt-2 rounded">{{tag}}</text>
					</view>
					<view class="flex align-center mt-2">
						<view class="flex align-center" style="color: red;">
							<text style="font-size: 26rpx;">￥</text>
							<text style="font-size: 30rpx;font-weight: bold;">{{item.price}}</text>
						</view>
						<text v-if="item.fee" class="text-white ml-1" style="background-color: red;">佣金：{{item.fee}}%</text>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between bg-white px-3" style="height: 100rpx;border-top: 1px solid rgba(187, 187, 187, 0.2);">
				<view class="flex align-center">
					<view class="flex align-center">
						<text style="font-size: 26rpx;">状态：</text>
						<text style="font-size: 26rpx;color: #F99A00;">{{item.sale_status==0?'上架':'下架'}}</text>
					</view>
					<view class="flex align-center ml-3">
						<text style="font-size: 26rpx;">数量：</text>
						<text style="font-size: 26rpx;color: #F99A00;">{{item.count}}</text>
					</view>
				</view>
				<text>时间：{{item.create_time}}</text>
			</view>
		</view>
		

		<!-- 弹出框样式 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
				:close-icon-pos="closeIconPos">
				<!-- 系统栏高度 -->
				<view class="status_bar"></view>
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in tabsList" :key="index">
						<text @click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#18b566' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	export default {
		onShow() {
			this.InitData();
		},
		onNavigationBarButtonTap(e) {
			if (e.float == 'right') {
				uni.navigateTo({
					url: '/pages/ShopManagement/commodity_offline'
				})
			}
		},
		data() {
			return {
				status:'',
				DataList: [],
				tabsList: [{
						name: '全部',
						value: ''
					},
					{
						name: '上架',
						value: '0'
					},
					{
						name: '下架',
						value: '1'
					}
				],
				current: 0, //当前选中下标
				show: false, //显示菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
			}
		},
		methods: {
			InitData(){
				let requestData = {
					sale_status: this.status, //状态；0=上架；1=下架
					key: "", //关键字
					page_no: 1, //页码
					page_size: 10 //每页数量
				}
				this.$post(this.$url.Mall.GetMallGoods, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data.list;
				})
			},
			// 跳转到商品状态
			skipProductDetails(item){
				uni.navigateTo({
					url:'/pages/ShopManagement/commodity_status?id='+item.id
				})
			},
			change(index) {
				this.current = index;
				this.status = this.tabsList[index].value;
				this.InitData();//刷新数据
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			// 切换菜单
			SwitchMenu(index) {
				// this.current = index;
				this.show = false;
				this.current = index;
				this.status = this.tabsList[index].value;
				this.InitData();//刷新数据
			}
		}
	}
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
</style>
