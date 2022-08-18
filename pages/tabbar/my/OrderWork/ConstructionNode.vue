<template>
	<view class="content">
		<view @tap="skipConstructionNodeDetail(item)" class="flex m-3 p-3 bg-white justify-between rounded" v-for="(item,index) in DataList.nodes" :key="index">
			<view class="flex align-center">
				<!-- <text class="iconfont" v-if="item.status==4" style="font-size: 60rpx;color: red;">&#xe85c;</text>
				<text class="iconfont" v-if="item.status==0" style="font-size: 60rpx;color: #02B1BE;">&#xe85c;</text> -->
				
				<u-icon name="checkmark-circle" v-if="item.status==0" color="#02B1BE" size="40"></u-icon>
				<u-icon name="clock" v-else color="red" size="40"></u-icon>
				
				
				<view class="flex flex-column ml-3">
					<text style="color: #101010;font-size: 28rpx;font-weight: bold;">{{item.title}}</text>
					
					
					<text v-if="item.status==0" style="color: #02B1BE;font-size: 24rpx;">{{item.status_text}}</text>
					<text v-else style="color: red;font-size: 24rpx;">{{item.status_text}}</text>
					
					
					
				</view>
			</view>
			<u-icon v-if="item.status != 100" name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
		</view>
	</view>
</template>

<script>
	export default{
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				uni.navigateTo({
					url:`/pages/ServiceOrder/BillMaterialsConfirm?order_id=${this.order_id}&node_code=material-1&node_status=0&node_title=材料清单&module=user`
				})
			}
		},
		onLoad(options) {
			if(options.module != 'undefined'){
				this.module = options.module;
			}
			this.order_id = options.order_id;
		},
		onShow() {
			this.InitData();
		},
		data(){
			return{
				order_id:'',
				module:'',
				DataList:{}
			}
		},
		methods:{
			// 初始化数据
			InitData(){
				// 获取施工节点明细
				this.$post(this.$url.Work.GetWorkNodes, {
					order_id: this.order_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data;
				});
			},
			skipConstructionNodeDetail(item){
				if(item.status != 100){
					uni.navigateTo({
						url:`/pages/UserLive/ConstructionNodeDetail?id=${item.id}&title=${item.title}&module=${this.module}`
					})
				}
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>