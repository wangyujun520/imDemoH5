<template>
	<view class="content">
		<view class="mx-3 mt-3 bg-white px-3 pb-3" style="border-radius: 15rpx;" v-for="(item,index) in DataList" :key="index">
			<view @tap="skipGoods(item)" class="flex align-center justify-between border-bottom py-2" style="width: 100%;">
				<view class="flex align-center">
					<image :src="item.goods_cover" class="rounded mr-1" style="width: 60rpx;height: 60rpx;"></image>
					<text style="font-size: 24rpx;">{{item.order_title}}</text>
				</view>
				<u-icon name="arrow-right" style="font-size: 26rpx;color: #939393;"></u-icon>
			</view>
			<view class="py-2">
				<text style="color: #101010;font-weight: bold;">{{item.title}}</text>
			</view>
			<view @tap="skipOrder(item)" class="p-3 rounded flex flex-column" style="background-color: #F7F7F7;">
				<text>{{item.goods_title}}</text>
				<view class="flex align-center mt-1">
					<!-- <text class="mr-1" style="color: #02B1BE;border: 1px solid #02B1BE;padding: 0rpx 15rpx;font-size: 24rpx;">机械</text> -->
					<text style="font-size: 26rpx;color: #101010;">{{item.order_des}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			this.$post(this.$url.Msg.GetOrderMsgs, {},{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
				this.DataList = res.data.list;
			});
		},
		data(){
			return{
				img:'https://img0.baidu.com/it/u=1967997459,1022958762&fm=26&fmt=auto',
				DataList:[]
			}
		},
		// 监听页面卸载
		onUnload() {
			let ReadID = 'C2C' + 'OrderMessage';
			// console.log(ReadID);//C2C5
			//退出页面 订单内的消息设置为已读
			let promise = getApp().$tim.setMessageRead({ conversationID: ReadID });
			promise.then(imResponse => {
				console.log('全部已读');
				//调用上一个界面的消息列表刷新方法
				// 发送页
				uni.$emit('MsgRead', {});
				// 已读上报成功
			})
			.catch(imError => {
				// 已读上报失败
				console.warn('setMessageRead error:', imError);
			});
		},
		methods:{
			skipGoods(item){
				uni.navigateTo({
					url:item.goods_url
				})
			},
			skipOrder(item){
				uni.navigateTo({
					url:item.order_url
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