<template>
	<view class="content">
		<view class="flex bg-white p-3">
			<view class="flex flex-wrap mr-1">
				<text @click="SelectWork(index)" :class="[item.isLike ? 'Selection' : 'NoSelection']" v-for="(item,index) in goodAtSales" :key="index" class="rounded mb-1 ml-1" style="font-size: 24rpx;padding: 10rpx 30rpx;">{{item.name}}</text>
			</view>
		</view>
		
		<view class="flex justify-center py-3">
			<view @tap="Submit" class="flex align-center justify-center"
				style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			this.goodAtSales = JSON.parse(decodeURIComponent(options.goodAtSales));
			if((this.goodAtSales??'')==''){
				this.$post(this.$url.Public.GetDicts, {
					key: "house_style" 
				}, {
					isLoading: false
				}).then(res => {
					res.data.forEach(item=>{
						let cc = {
							name:item.value,
							value:item.key,
							isLike:false
						}
						this.goodAtSales.push(cc)
					})
				});
			}
		},
		data(){
			return{
				goodAtSales:[]
			}
		},
		methods:{
			SelectWork(index){
				this.goodAtSales[index].isLike = !this.goodAtSales[index].isLike;
			},
			Submit(){
				let skills = '';
				let showGood = [];
				this.goodAtSales.forEach(item=>{
					if(item.isLike){
						showGood.push(item.name)
						if(skills==''){
							skills = item.value
						}else{
							skills += '|'+item.value
						}
					}
				})
				
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.skills = skills;//竖线分割，用于接口传参
				prevPage.$vm.DataList.showGood = showGood;//用于显示
				prevPage.$vm.DataList.goodAtSales =  this.goodAtSales;//记录状态跳转修改使用
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
				
			}
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}
	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
</style>