<template>
	<view class="content px-2 pt-2">
		<view class="flex flex-column justify-center align-center bg-white" style="height: 300rpx;">
			<image src="/static/img/MyPoint.png" style="width: 100rpx;height: 100rpx;"></image>
			<text style="color: #0072FF;font-size: 32rpx;" class="mt-2">{{PointList.point}}</text>
		</view>
		<view class="flex flex-column mt-2">
			<view v-for="(item,index) in DataList" class="flex justify-between align-center bg-white p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column">
					<text style="color: #353535;font-size: 28rpx;">{{item.title}}</text>
					<text style="color: #888;font-size: 26rpx;">{{item.create_date}}</text>
				</view>
				<view class="flex">
					<text style="color: #2175DD;font-size: 28rpx;font-weight: bold;">{{item.count}}</text>
				</view>
			</view>
			
			<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 60vh">
				<u-empty text="暂无内容" mode="list"></u-empty>
			</view>
			
			<!-- <view class="flex justify-between align-center bg-white p-2">
				<view class="flex flex-column">
					<text style="color: #353535;font-size: 28rpx;">退单</text>
					<text style="color: #888;font-size: 26rpx;">2020-11-11</text>
				</view>
				<view class="flex">
					<text style="color: #F23D3A;font-size: 28rpx;font-weight: bold;">-10000</text>
				</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	export default{
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},2000)
		},
		onShow() {
			// 获取全部工单
			this.$post(this.$url.Account.GetWallet, {}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				// console.log(123)
				if (res.code == 200 && res.status == 0) {
					console.log(JSON.stringify(res.data))
					this.PointList = res.data
				}
			});
			
			let requestData = {
				page_size: 10, //每一页数量
				page_no: 1 ,//页码
				type:2//1=收入；2=支出
			}
			// 获取我的积分明细
			this.$post(this.$url.Account.GetPoints, requestData, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				// console.log(123)
				if (res.code == 200 && res.status == 0) {
					console.log(JSON.stringify(res.data))
					this.DataList = res.data.list;
				}
			});
			
		},
		data(){
			return{
				PointList:{},
				DataList:[]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
