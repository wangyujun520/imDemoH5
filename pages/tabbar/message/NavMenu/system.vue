<template>
	<view class="content px-3">
		<view class="flex p-2 mt-3 flex-column" style="background-color: #F6F6F7;" v-for="(item,index) in DataList">
			<text style="color: #101010;font-size: 28rpx;font-weight: bold;">{{item.title}}</text>
			<text class="my-1" style="color: #939393;font-size: 26rpx;">{{item.content}}</text>
			<view class="flex justify-between">
				<text style="color: #939393;font-size: 26rpx;">{{item.create_time}}</text>
			</view>
		</view>
		
		<!-- <view class="flex p-2 mt-3 flex-column" style="background-color: #F6F6F7;">
			<text style="color: #101010;font-size: 28rpx;font-weight: bold;">你的昵称修改成功~</text>
			<text class="my-1" style="color: #939393;font-size: 26rpx;">你的昵称已修改【mockingbot】</text>
			<view class="flex justify-between">
				<text style="color: #939393;font-size: 26rpx;">1天前</text>
			</view>
		</view>
		<view class="flex p-2 mt-3 flex-column" style="background-color: #F6F6F7;">
			<text style="color: #101010;font-size: 28rpx;font-weight: bold;">感谢您注册安居邦，记得实名认证哦~</text>
			<text class="my-1" style="color: #939393;font-size: 26rpx;">实名认证后才可以找联系设计师或成为设计师哦，点击本条消息，立即实名认证！</text>
			<view class="flex justify-between">
				<text style="color: #939393;font-size: 26rpx;">1天前</text>
				<view class="flex align-center">
					<text style="color: #939393;font-size: 26rpx;">查看详情</text>
					<u-icon name="arrow-right" style="font-size: 26rpx;color: #939393;"></u-icon>
				</view>
			</view>
		</view> -->
		
		<!-- <u-loadmore margin-top="30" bg-color="#ffffff" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无消息" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.$post(this.$url.App.GetSysMsg, {
				key: "", //关键字
				page_size: 100, //每一页数量
				page_no: 1 //页码
			}, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data.list
				}
			})
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},2000)
		},
		data() {
			return {
				loadStatus: 'nomore',
				DataList:[]
			};
		},
		methods:{
			addRandomData(){
				this.loadStatus = 'loadmore';
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
