<template>
	<view>
		<view class="px-2 pb-2" v-for="(item, index) in datalist">
			<view @click="skipGoodStart(item)" class="flex align-center bg-white rounded mt-2" style="height: 110rpx;">
				<view class="flex justify-center align-center" style="width: 140rpx;height: 100%;">
					<!-- <text class="iconfont" style="color: #02B1BE;font-size: 60rpx;"></text> -->
				</view>
				<view class="" style="width: 480rpx;height: 100%;">
					<view class="flex align-end" style="height: 60rpx;">
						<text>{{item.name}}</text>
					</view>
					<view style="height: 60rpx;">
						<text v-if="item.state==0" style="color: #FF0000;font-size: 26rpx;">未开始</text>
						<text v-if="item.state==1" style="color: #EA8531;font-size: 26rpx;">施工中</text>
						<text v-if="item.state==2" style="color: #02B1BE;font-size: 26rpx;">等待验收</text>
						<text v-if="item.state==3" style="color: #02B1BE;font-size: 26rpx;">已验收</text>
					</view>
				</view>
				<view class="flex align-center justify-center" style="height: 100%;width: 100rpx;">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #999;"></u-icon>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				// console.log("右上角点击事件");
				// 跳转到添加阶段节点界面
				uni.navigateTo({
					url: '/pages/ServiceOrder/AddPhaseNode'
				});
			}
		},
		data() {
			return {
				isSee:true,
				taskid: 0,
				datalist: ""
			}
		},
		onLoad(option) {
			this.isSee =option.isSee;
			this.taskid = option.id;
			console.log(this.taskid);
			
		},
		onShow() {
			var RequrestUrl =
				this.AJB.BizUrl + "api/PlanNode/GetNodeList";
			var RequrestDatas = {
				TaskId: this.taskid
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					if (res.code == 200) {
						this.datalist = res.dataList.items;
						console.log(this.datalist);
					}
				})
				.catch((err) => {
					console.log(err);
				});
					
		},
		methods: {
			// 跳转到开工大吉界面
			skipGoodStart(item) {
				uni.removeStorageSync('GoodStart');
				// 同步缓存
				uni.setStorage({
					key: 'GoodStart',
					data: item,
					success: function() {
						console.log('success');
					}
				});
				uni.navigateTo({
					url: '/pages/ServiceOrder/GoodStart?id=' + item.id + "&taskid=" + this.taskid + "&name=" + item.name+"&isSee="+this.isSee
				})
			},
			
		},
	}
</script>

<style>
</style>
