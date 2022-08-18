<template>
	<view class="content">
		
		<!-- <view class="bg-white flex p-2">
			<textarea v-model="title" placeholder="请输入活动商品" class="w-100" style="font-size: 28rpx;"/>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast> -->
		
		<view @click="AddCommodity(item)" v-for="(item,index) in DataList" :key="index"
			class="flex bg-white py-1" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex justify-center align-center" style="width: 200rpx;height: 200rpx;">
				<image class="rounded" :src="item.cover" style="width: 160rpx;height: 160rpx;"></image>
			</view>
			<view class="flex flex-column justify-between pr-2" style="height: 200rpx;width: 550rpx;">
				<view class="mt-2"><text class="LineBreak" style="font-size: 30rpx;">{{item.title}}</text></view>
				<view class="mb-1">
					<text v-if="item.price != null" style="color: #FF0000;font-weight: bold;">
						<span style="font-size: 26rpx;">￥</span>
						<span style="font-size: 35rpx;">{{item.price}}</span>
					</text>
				</view>
			</view>
		</view>
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无商品" mode="list"></u-empty>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">添加商品</u-button>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				activity_id:'',
				title:'',
				DataList:[]
			}
		},
		onLoad(options) {
			if((options.mall_id??'')!=''){
				this.id = options.mall_id
			}
			if((options.activity_id??'')!=''){
				this.activity_id = options.activity_id
			}
		},
		onShow() {
			this.InitData();
		},
		methods:{
			InitData(){
				this.$post(this.$url.Mall.GetActivityGoods, {
					activity_id:this.activity_id
				}, {}).then(res => {
					this.DataList = res.data
				})
			},
			AddCommodity(item){
				// console.log(JSON.stringify(item))
				
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				console.log(prevPage.$vm.DataList);
				// prevPage.$vm.DataList.conternt = this.title;//修改上一页data里面的managingGoods参数值
				prevPage.$vm.DataList.goods_list = item.id;//修改上一页data里面的managingGoods参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
			},
			Submit(){
				// console.log("跳转到商铺主页")
				
				uni.navigateTo({
					url:'/pages/tabbar/settle/ShopHomepage?id='+this.id+'&activity_id='+this.activity_id
				})
				// if(this.title == ''){
				// 	this.$refs.uToast.show({
				// 		title: '请输入标题',
				// 		type: 'warning'
				// 	})
				// 	return;
				// }
				// let pages = getCurrentPages();  //获取所有页面栈实例列表
				// let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				// console.log(prevPage.$vm.DataList);
				// prevPage.$vm.DataList.conternt = this.title;//修改上一页data里面的managingGoods参数值
				// // 返回上一个界面
				// uni.navigateBack({
				// 	delta:1
				// })
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
