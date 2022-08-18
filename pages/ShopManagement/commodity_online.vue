<template>
	<view class="content">
		
		<view class="flex flex-column mt-2 px-3">
			<view class="flex bg-white pl-3 py-3" style="border-radius: 20rpx;">
				<view class="" style="width: 160rpx;height: 160rpx;">
					<image :src="DataList.cover|img" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="flex flex-column justify-center px-2" style="width: 530rpx;height: 160rpx;">
					<text style="font-size: 28rpx;color: #101010;font-weight: bold;">{{DataList.title}}</text>
					<view class="flex align-center mt-1 flex-wrap" style="font-size: 24rpx;">
						<text
							v-for="(tag, index) in DataList.tags"
							v-if="index < 3"
							class="mr-1 mb-1"
							style="color: #F99A00;border: 1px solid #F99A00;padding: 5rpx 13rpx;border-radius: 20rpx;line-height: 1;"
						>
							{{ tag }}
						</text>
					</view>
					<view class="flex align-center" style="color: red;">
						<text style="font-size: 26rpx;">￥</text>
						<text style="font-size: 30rpx;font-weight: bold;">{{DataList.price}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white px-3 mt-3">
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">上架金额</text>
				<view class="flex align-center">
					<u-input type="number" v-model="DataList.price" maxlength="18" input-align="right" placeholder="请输入上架金额" placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">上架数量</text>
				<view class="flex align-center">
					<u-input type="number" v-model="DataList.count" maxlength="18" input-align="right" placeholder="请输入上架数量" placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">购买限制</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.buy_count" maxlength="18" input-align="right" placeholder="一人最多购买多少,0为不限制" placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
			<view @tap="show=true" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
				<text>保修期限</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.rule||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>
			<view @tap="showstart=true" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
				<text>上架时间</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.start_date||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>
			<view @tap="showend=true" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
				<text>下架时间</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.end_date||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>
			<view class="flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">佣金比例</text>
				<view class="flex align-center">
					<u-input type="number" v-model="DataList.fee_rate" maxlength="18" input-align="right" placeholder="请输入佣金比例" placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					<u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon>
				</view>
			</view>
		</view>
		
		<view class="flex justify-center py-3">
			<view @tap="Submit" class="flex align-center justify-center" style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">上架</text>
			</view>
		</view>
		
		<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
		
		<u-calendar v-model="showstart" :mode="mode" :min-date="start" max-date="2099-01-01" @change="change1"></u-calendar>
		<u-calendar v-model="showend" :mode="mode" :min-date="start" max-date="2099-01-01" @change="change2"></u-calendar>
		
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.id = options.id;
			// 获取商品详情
			let RequrestData = {
				id: this.id
			};
			this.$post(this.$url.Mall.GetSaleInfo, RequrestData,{
				isLoading:false
			}).then(res => {
				console.log(JSON.stringify(res))
				this.DataList = res.data;
				if(res.data.warranty){
					this.DataList.rule = res.data.warranty + '年';
				}
				// this.start_time = res.data.start;
				// this.end_time = res.data.end;
				
			});
			
			//获取当前时间
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			if (month < 10) {
			    month = "0" + month;
			}
			if (day < 10) {
			    day = "0" + day;
			}
			var nowDate = year + "-" + month + "-" + day;
			this.start = nowDate;
			
		},
		data(){
			return{
				showstart:false,
				showend:false,
				rule:'请选择',
				mode: 'date',
				start:'',//当前时间
				list: [{
					text: '1年',
					value:1
				}, {
					text: '2年',
					value:2
				}, {
					text: '3年',
					value:3
				}, {
					text: '4年',
					value:4
				}, {
					text: '5年',
					value:5
				}, {
					text: '6年',
					value:6
				}],
				show: false,
				start_time:'',//时间
				end_time:'',//时间
				
				id:'',
				show:false,
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				DataList:{
					price:null,
					rule:null,
					rule_value:null,
					count:null,
					buy_count:null,
					fee_rate:null,
					start_date:null,
					end_date:null,
					warranty:null
				},
				value:3,
				imgSrc:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190202%2F854819e300fd4ec5afb95b292899a88c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627574352&t=3fb5e2536e7d46a6a95c7080c9a1f13b'
			}
		},
		methods:{
			// 上架
			Submit(){
				// let RequestData = {
				// 	id:this.id,//产品id，不填写表示新增,填写表示修改
				// 	coin:this.DataList.coin_int,//上架金额
				// 	count:this.DataList.count,//上架数量
				// 	rule:this.DataList.rule,//使用限制
				// 	start:this.start_time,//上架时间
				// 	end:this.end_time,//下架时间
				// 	status:'0',//启用OR停用
				// 	sale_status:'0'//上架OR下架
				// }
				
				let RequestData = {
					id:this.id,//产品id，不填写表示新增,填写表示修改
					sale_status:0,//上架状态；0=已上架；1=已下架
					price:this.DataList.price,//上架金额
					count:this.DataList.count,//上架数量
					buy_count:this.DataList.buy_count, //购买限制
					// rule:this.DataList.rule,//使用限制
					warranty:this.DataList.warranty,//有效期，年
					start_date:this.DataList.start_date,//上架时间
					end_date:this.DataList.end_date,//下架时间
					// status:'0',//启用OR停用
					sale_status:'0',//上架OR下架
					fee_rate:this.DataList.fee_rate//佣金比例
				}
				
				console.log(JSON.stringify(RequestData))
				// 非空校验
				if(RequestData.price==''||RequestData.price==null){
					uni.showToast({
						title: '请输入上架金额',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if(RequestData.count==''||RequestData.count==null){
					uni.showToast({
						title: '请输入上架数量',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				console.log(RequestData.buy_count)
				// if(RequestData.buy_count==''||RequestData.buy_count==null){
				if((RequestData.buy_count??'') == ''){
					uni.showToast({
						title: '请输入购买限制',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if(RequestData.warranty==''||RequestData.warranty==null){
					uni.showToast({
						// title: '请选择使用限制',
						title: '请选择保修期限',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if(RequestData.start_date==''||RequestData.start_date==null){
					uni.showToast({
						title: '请选择上架时间',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if(RequestData.end_date==''||RequestData.end_date==null){
					uni.showToast({
						title: '请选择下架时间',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if(RequestData.fee_rate==''||RequestData.fee_rate==null){
					uni.showToast({
						title: '请输入佣金比例',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				console.log(JSON.stringify(RequestData))
				// 更新产品（卡券）信息
				this.UpdateGoods(RequestData);
			},
			// 更新产品（卡券）信息
			UpdateGoods(RequestData){
				// 发布内容
				this.$post(this.$url.Mall.UpdateSaleInfo, RequestData,{
					isLoading:false
				}).then(res => {
					console.log(JSON.stringify(res))
					if(res.code == 200){
						// 发布成功
						uni.showToast({
							title: '上架成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(() => {
							// 两秒之后返回上一个界面
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					}
				});
			},
			click(index) {
				// console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
				this.DataList.rule = this.list[index].text;
				this.DataList.warranty = this.list[index].value;
			},
			change1(e){
				// console.log(e)
				this.DataList.start_date = e.result;
			},
			change2(e){
				// console.log(e)
				this.DataList.end_date = e.result;
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #F7F7F7;
}
.special-list {
	overflow-x: auto;
	.list-box {
		flex-basis: 280rpx;
		height: 270rpx;
		border-radius: 20rpx;
		flex-shrink: 0;
		// white-space: nowrap;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
	}
}
// 取消滚动条显示
.special-list::-webkit-scrollbar {
	display: none;
}
</style>