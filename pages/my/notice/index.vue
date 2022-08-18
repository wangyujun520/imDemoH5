<template>
	<view class="content p-3">
		<view @tap="skipDetail(item)" class="flex align-center border-bottom p-3 justify-between bg-white" v-for="(item,index) in DataList" :key="item.id">
			<view class="flex flex-column">
				<text style="color: #101010;font-size: 30rpx;">{{item.title}}</text>
				<text style="color: #9D9D9D;font-size: 26rpx;" class="mt-1">{{item.update}}</text>
			</view>
			<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			let requestData = {
				"key": "", //搜索关键字
				"sign": "notice", //菜单读取标识
				"page_size": 10, //每一页数量
				"page_no": 1 //当前页码，从1开始
			}
			this.$post(this.$url.Article.GetArticles,requestData,{}).then(res=>{
				console.log(res)
				this.DataList = res.data.list
			});
		},
		data(){
			return{
				DataList:[]
			}
		},
		methods:{
			// 跳转到公告详情
			skipDetail(item){
				uni.navigateTo({
					url:'/pages/my/notice/detail?id='+item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F7F7;
	}
</style>
