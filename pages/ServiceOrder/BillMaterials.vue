<template>
	<view class="content">
		<view class="flex flex-column mt-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);" v-for="(item, index) in datalist">
			<view class="flex p-2">
				<text style="color: #000000;">{{item.storeName}}</text>
			</view>
			<view class="" style="border-bottom: 1px solid rgb(187,187,187,0.2);" v-for="(sitem, sindex) in item.selectCommodityDtos">
				<view class="flex px-2 pt-2">
					<view class="flex" style="width: 150rpx;height: 150rpx;">
						<image class="rounded" :src="sitem.commUrl" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="flex flex-column pl-1" style="width: 550rpx;">
						<text class="LineBreak" style="color: #101010;font-size: 24rpx;">{{sitem.name}}</text>
						<text class="my-1" style="color: #939393;font-size: 24rpx;">数量：{{sitem.number}} 单位:桶 </text>
						<text style="color: #101010;font-size: 26rpx;">参考价：{{sitem.price}}</text>
					</view>
				</view>

				<view class="flex justify-between px-2 pt-1">
					<view class="flex">
						<text style="color: #888;font-size: 26rpx;">佣金比列 {{sitem.commissionScale}}%</text>
						<text style="color: #FF9900;font-size: 26rpx;" class="ml-2">佣金¥{{sitem.price*sitem.commissionScale/100*sitem.number}}</text>
						<!-- <text style="color: #FF9900;font-size: 26rpx;" class="ml-2">佣金¥ {{commission}}</text> -->

					</view>

					<view v-if="State<11" class="">
						<u-number-box v-model="sitem.number" :min="1" :max="5000" input-width="100" input-height="50" @change="valChange($event, sitem.commodityId)"></u-number-box>
						<!-- <u-number-box v-model="value" @change="valChange"></u-number-box> -->
					</view>

				</view>

				<view  v-if="State<11"  class="flex justify-between p-2">
					<text style="color: #FF0000;font-size: 28rpx;">等待客户确定清单</text>
					<text @click="ActionSheetShow" class="iconfont" style="color: #000000;font-size: 40rpx;">&#xe61e;</text>
				</view>
			</view>
		</view>
		<view class="flex flex-column mt-2 bg-white p-2">
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总量</text>
				</view>
				<view class="flex">
					<text>{{totalCount}}</text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总额</text>
				</view>
				<view class="flex">
					<text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">{{totalPrice}}</span></text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>销售费用</text>
				</view>
				<view class="flex">

					<!-- <text style="color: #FF9900;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">1989.80</span></text> -->
					<text style="color: #FF9900;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">{{commission}}</span></text>
				</view>
			</view>
		</view>



		<u-action-sheet :list="ActionSheetList" @click="SetUpClick" v-model="showActionSheet"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		onBackPress(options) {
			if (options.from === 'backbutton' && !this.isBack&&this.State<11) {

				let CaiLiaoDatas = [];
				let totalNumber = 0,
					items = this.datalist;
				items.forEach(val => {
					let items1 = val.selectCommodityDtos;
					items1.forEach(val1 => {
						CaiLiaoDatas.push({
							commodityId: val1.commodityId,
							number: val1.number
						});
					});
				});
				var _self = this;

				var CaiLiaoUrl = _self.AJB.BizUrl + "api/CaiLiao/UpdateCaiLiao";
				var CaiLiaoDatas1 = {
					taskid: this.taskid,
					comminfo: CaiLiaoDatas

				};
				_self.AJB.UniAjax(CaiLiaoUrl, CaiLiaoDatas1)
					.then((res) => {
						if (res.code == 200) {

						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
			return false;
		},
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				if(this.State<11)
				{
					let data = {
						IsSales: false,
						taskId: this.taskid
					}
					//用于判断跳入商城列表页面
					uni.removeStorageSync('IsDesignerSales');
					// 同步缓存
					uni.setStorage({
						key: 'IsDesignerSales',
						data: data,
						success: function() {
							console.log('success');
						}
					});
					uni.navigateTo({
						url: "/pages/tabBar/settle/HomeShoppingMall",
					});
				}
				
			}
		},
		// 计算属性示例
		computed: {
			totalPrice() {
				let sumPrice = 0,
					items = this.datalist;
				items.forEach(val => {
					let items1 = val.selectCommodityDtos;
					items1.forEach(val1 => {
						let priceVal = parseFloat(val1.price),
							salesVal = parseFloat(val1.number);
						sumPrice += priceVal * salesVal;
					});

				});
				let tofixNum = sumPrice.toFixed(2);
				return parseFloat(tofixNum);
			},
			// 数量统计
			totalCount() {
				let totalNumber = 0,
					items = this.datalist;
				items.forEach(val => {
					let items1 = val.selectCommodityDtos;
					items1.forEach(val1 => {
						totalNumber += val1.number;
					});
				});
				return totalNumber;
			},
			commission() {
				let sumPrice = 0,
					items = this.datalist;
				items.forEach(val => {
					let items1 = val.selectCommodityDtos;
					items1.forEach(val1 => {
						let priceVal = parseFloat(val1.price),
							salesVal = parseFloat(val1.number);
						sumPrice += val1.price * val1.commissionScale / 100 * val1.number;
					});

				});
				let tofixNum = sumPrice.toFixed(2);
				return parseFloat(tofixNum);
			}
		},
		data() {
			return {
				taskid: 0,
				datalist: [],
				ActionSheetList: [
					// {
					// 	text: '替换'
					// }, 
					{
						text: '删除',
						color: 'red'
					}
				],
				showActionSheet: false,
				value: 0,
				State :0
			};
		},
		onLoad(option) {
			this.State =option.State
			this.taskid = option.id
			
		},
		onShow() {
			var _self = this;
			var CaiLiaoUrl = _self.AJB.BizUrl + "api/CaiLiao/GetCaiLiaoList";
			var CaiLiaoDatas = {
				TaskID: this.taskid
			
			};
			_self.AJB.UniAjax(CaiLiaoUrl, CaiLiaoDatas)
				.then((res) => {
					if (res.code == 200) {
						this.datalist = res.dataList.items;
						console.log(JSON.stringify(this.datalist))
			
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		methods: {
			ActionSheetShow() {
				 if(this.State<11)
				 {
					this.showActionSheet = true;
				 }
				
			},
			SetUpClick(index) {
				//删除按钮点击事件
				console.log(index)
			},
			valChange(e, id) {

				// console.log(e, id);
			},
			// valChange(e) {
			// 	console.log('当前值为: ' + e.value)
			// }
		}
	};
</script>

<style>
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>
