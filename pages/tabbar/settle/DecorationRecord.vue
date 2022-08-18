<template>
	<view class="content">
		<view @click="skipRecordDetails(sitem)" class="flex flex-column bg-white mt-2 p-2" v-for="(sitem,sindex) in DataList">
			<image :src="sitem.cover"  style="width: 100%;"></image>
			<view class="flex justify-between mt-2">
				<view class="">
					<text style="color: #101010;font-size: 28rpx;">{{sitem.title}}</text>
				</view>
				<!-- <view class="">
					<text class="iconfont"  style="color: #101010;font-size: 40rpx;">&#xe61e;</text>
				</view> -->
			</view>
			<view class="flex">
				<text class="mr-1" style="color: #bbb;font-size: 26rpx;" v-for="(tag,tindex) in sitem.tags">#{{tag}}</text>
			</view>
		</view>
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无记录" mode="list"></u-empty>
		</view>
		
	</view>
</template>
 
<script>
	export default{
		data(){
			return{
				loadStatus: "loadmore",
				page: 0, //分页数据
				totalCount: 0, //总共条数
				DataList: []
			}
		},
		onShow() {
			// 获取装修记录列表
			this.$post(this.$url.Design.GetLogs,{},{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					this.DataList = res.data;
				}
			})
		},
		methods:{
			// 跳转到记录详情界面
			skipRecordDetails(item){
				uni.navigateTo({
					url:'/pages/tabbar/settle/RecordDetails?id='+item.id
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
