<template>
	<view class="content">
		<!-- <text>设计订单</text> -->
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		
	</view>
</template>

<script>
	export default{
		onLoad() {
			this.InitData();
			
		},
		data(){
			return{
				DataList:[]
			}
		},
		methods:{
			// 初始化数据
			InitData(){
				// 获取设计订单明细
				let requestData = {
					key: "", //关键字
					status: "", //状态，空=全部，1=待支付；2=进行中；0=已完成；-1=已退款
					page_size: 10, //每一页数量
					page_no: 1 //页码
				}
				this.$post(this.$url.Design.GetOrders, {
					key: "house_style" //关键字
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					res.data.forEach(item => {
						let list = {
							name: item.value,
							value: item.key
						}
						this.tabsList.push(list);
					})
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>