<template>
	<view class="content">
		<view class="flex flex-column m-3 bg-white">
			<view @click="SelectBank(item)" class="flex align-center border-bottom pl-3" style="height: 100rpx;" v-for="(item,index) in DataList" :key="item.key">
				<img :src="item.cover" class="mr-2" style="width: 60rpx;height: 60rpx;">
				<text>{{item.value}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onShow() {
			this.$post(this.$url.User.GetBankCatalogs, {}, {
				isLoading: false
			}).then(res => {
				this.DataList = res.data
			});
		},
		data(){
			return{
				testImg:'https://img1.baidu.com/it/u=180306084,3811469652&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
				DataList:[]
			}
		},
		methods:{
			// 选择银行
			SelectBank(item){
				// console.log(JSON.stringify(item))
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.bank_catalog = item.key;//修改上一页data里面的参数值
				prevPage.$vm.DataList.bank_catalog_text = item.value;//修改上一页data里面的参数值
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