<template>
	<view class="content">
		<!-- <view class="bg-white flex p-2">
			<textarea v-model="title" placeholder="请录入楼盘名称" class="w-100" style="font-size: 28rpx;"/>
		</view> -->
		
		<!-- 所在位置 -->
		<choose-map @changes="mapClick"></choose-map>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import chooseMap from "@/components/choose-map/choose-map.vue";
	export default{
		components: {
		  chooseMap
		},
		data(){
			return{
				title:'',
			    address:{}
			}
		},
		onLoad(options) {
			this.title = options.title;
		},
		methods:{
			mapClick(item) {
				this.address =item
			  console.log(JSON.stringify(item));
			},
			Submit(){
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				console.log(prevPage.$vm.DataList);
				prevPage.$vm.DataList.ProjectLocation = this.address;//修改上一页data里面的managingGoods参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
</style>
