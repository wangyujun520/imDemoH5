<template>
	<view class="content">
		<view @click="Select(item)" class="flex align-center m-3 p-3 bg-white" v-for="(item,index) in DataList">
			<img :src="item.photos" style="width: 200rpx;height: 140rpx;">
			<view class="flex flex-column justify-between pl-3" style="border: 0px solid red;width: 430rpx;height: 140rpx;">
				<text style="font-size: 30rpx;color: #000;font-weight: bold;">{{item.estate}}</text>
				<view class="flex align-center" style="color: #FF9900;font-size: 26rpx;">
					<text>{{item.house_catalog_text}} | {{item.estate_catalog_text}}</text>
				</view>
				<text style="color: #939393;font-size: 26rpx;">{{item.address}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onNavigationBarButtonTap(e) {
			if (e.float == 'right') {
				uni.navigateTo({
					url: '/pages/my/my-house/add-house'
				})
			}
		},
		// 初始化数据
		onShow() {
			// 获取全部房产
			this.$post(this.$url.User.GetHouses, {}, {}).then(res => {
				this.DataList = res.data
			})
		},
		data(){
			return{
				DataList:[]
			}
		},
		methods:{
			Select(item){
				console.log(JSON.stringify(item))
				// 返回上一个界面,并绑定数据
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.house_id =  item.id;//修改上一页data里面的locationCity参数值
				prevPage.$vm.DataList.house_text =  item.estate;//修改上一页data里面的locationCity参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>