<template>
	<view class="content">

		<view class="position-fixed" style="top: 0;width: 750rpx;z-index: 999;background-color: #f5f5f5;">
			<view class="flex align-center px-2 bg-white" style="height: 80rpx;">
				<text class="iconfont" style="color: #FF9900;font-size: 28rpx;">&#xe65e;</text>
				<text style="color: #FF9900;font-size: 26rpx;">{{city}}</text>
			</view>
			<view class="px-2 flex align-center" style="height: 100rpx;">
				<u-search bg-color="#ffffff" placeholder="输入小区搜索" :show-action="false" v-model="keyword"></u-search>
			</view>
			<view @tap="NoEsate" class="bg-white px-2 flex align-center mx-2" style="height: 100rpx;">
				<text style="color: #02B1BE;font-size: 28rpx;">没有我的小区</text>
			</view>
		</view>
		<!-- 占位 -->
		<!-- <view style="height: 280rpx;"></view> -->

		<u-index-list :scrollTop="scrollTop" :index-list="RightIndexList" active-color="#FF9900" :offset-top="offsetTop" @select="SelectIndexList" style="margin-top: 280rpx;">
			<view v-for="(item, index) in indexList" :key="index">
				<u-index-anchor :index="item.Index" />
				<view @tap="SelectXQ(sitem)" v-for="(sitem,sindex) in item.CellList" :key="sindex" class="list-cell flex flex-column" style="border-bottom: 1px solid rgb(187,187,187,0.2);">
					<text>{{sitem.name}}</text>
					<view class="flex align-center">
						<text class="iconfont" style="color: #FF9900;font-size: 28rpx;">&#xe65e;</text>
						<text>{{sitem.address}}</text>
					</view>
				</view>
				<!-- <view class="list-cell flex flex-column" style="border-bottom: 1px solid rgb(187,187,187,0.2);">
					<text>东坡国际花园</text>
					<view class="flex align-center">
						<text class="iconfont" style="color: #FF9900;font-size: 28rpx;">&#xe65e;</text>
						<text>四川省眉山市东坡区XXX路XXX号</text>
					</view>
				</view>
				<view class="list-cell flex flex-column" style="border-bottom: 1px solid rgb(187,187,187,0.2);">
					<text>东坡国际花园</text>
					<view class="flex align-center">
						<text class="iconfont" style="color: #FF9900;font-size: 28rpx;">&#xe65e;</text>
						<text>四川省眉山市东坡区XXX路XXX号</text>
					</view>
				</view> -->
			</view>
		</u-index-list>
	</view>

</template>

<script>
	export default {
		onLoad(options){
			this.city = options.city;
			// console.log(options)
			this.indexList = [];
			this.$post(this.$url.Estate.GetBuildings,{
				area_code:options.citycode,
				key:''
			},{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					// this.BannerList = res.data;
					this.RightIndexList = res.data.letters;
					res.data.list.forEach(item=>{
						let data = {
							Index: item.letter,
							CellList: [{
								id:item.id,
								name: item.title,
								address: item.address
							}]
						}
						this.indexList.push(data)
					})
					 
				}
			})
		},
		data() {
			return {
				city:'',
				keyword: '',
				// scrollTop: 280,
				scrollTop: 180,
				// indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
				indexList: '',
				RightIndexList:[],
				// RightIndexList:["D", "M", "W", "Y"],//右侧显示的索引
				// offsetTop:280//锚点自动吸顶时与顶部的距离，单位rpx，见上方"自定义导航栏"说明
				offsetTop:180//锚点自动吸顶时与顶部的距离，单位rpx，见上方"自定义导航栏"说明
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop - uni.upx2px(280);
			// console.log(this.scrollTop)
		},
		methods:{
			SelectIndexList(index){
				console.log(index)
			},
			NoEsate(){
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.xqList = {
					id: "",
					name: "没有我的小区",
					address: ""
				};   //修改上一页参数值
				uni.navigateBack({
					delta:1
				})
			},
			SelectXQ(item){
				console.log(JSON.stringify(item))
				// 返回上个界面并修改值
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.xqList = item;   //修改上一页参数值
				uni.navigateBack({
					delta:1
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.list-cell {
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>