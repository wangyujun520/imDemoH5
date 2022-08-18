<template>
	<view>
		<view class="row">
			<icon type='search'/>
			<input class="input" placeholder='输入地址' v-model="clientname" @input='inputes' focus auto-focus></input>
		</view>
		<view class="selectView" v-if='list.length>0'>
			<view class="selectInput" v-for="(item, index) in list" :key="index" @click="selectLocation(item)">
				<view class="name">{{item.name}}</view>
				<view class="address">{{item.district+item.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				clientname:'',
				location:{}
			}
		},
		onLoad() {
			uni.getLocation({
				type:'gcj02',
				altitude:true,
				geocode:true,
				success: (res) => {
					this.location = res;
				}
			})
		},
		methods: {
			inputes(e){
				this.getLocationList(e.detail.value);
			},
			getLocationList(keywords) {
				let _this = this;
				let data = {};
				data.keywords = keywords;
				data.location = this.location.longitude+','+this.location.latitude;
				data.key="196e78135f0bc48a751225a336646ecb";
				uni.request({
					url: 'https://restapi.amap.com/v3/assistant/inputtips?parameters',
					method: 'GET',
					data: data,
					success(res) {
						_this.list = res.data.tips;
					}
				})
			},
			selectLocation(item){
				console.log(item);
				
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.AddressInfo = item;//修改上一页data里面的managingGoods参数值
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
				
				this.clientname = item.name;
				this.list = [];
			}
		}
	}
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #ffffff;
	}
	.input{
		padding-left: 10px;
	}
	.selectView{
		position: fixed;
		z-index: 9999;
		width:100%;
	}
	.selectInput{
		height:50px;
		background-color: #ffffff;
		border-bottom: 1px solid #eeeeee;
		padding-left: 15px;
	}
	.name{
		color:#000000;
		font-size: 16px;
		padding-top: 4px;
	}
	.address{
		color:#6c6c6c;
		font-size: 14px;
		display: block;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>