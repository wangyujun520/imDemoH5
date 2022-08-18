<template>
	<view class="content">
		<view class="p-2">
			<view class="p-2 flex flex-column bg-white rounded">
				<text style="color: #666;font-size: 26rpx;">订单号：202013322124563213</text>
				<view class="flex py-2 px-3 my-2 justify-between align-center rounded" style="background-color: #F7F7F7;">
					<view class="flex align-center">
						<image class="rounded" src="/static/img/head/demo6.jpg" style="width: 100rpx;height: 100rpx;"></image>
						<view class="flex flex-column ml-2">
							<view class="flex align-center">
								<text>咚咚锵</text>
								<text class="iconfont" style="font-size: 30rpx;color: #FF9900;">&#xe69d;</text>
							</view>
							<text style="color: #666;font-size: 26rpx;">设计师服务费</text>
						</view>
					</view>
					<view class="flex align-end" style="height: 80rpx;">
						<text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">8999.00</span></text>
					</view>
				</view>

				<view class="flex" style="height: 40rpx;">
					<view class="" style="width: 240rpx;">
						<text class="text-title">装修风格：</text>
						<text class="text-content">现代简约</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">设计面积：</text>
						<text class="text-content">100㎡</text>
					</view>
				</view>
				<view class="flex" style="height: 40rpx;">
					<view class="" style="width: 720rpx;">
						<text class="text-title">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</text>
						<text class="text-content">四川省成都市武侯区G213辅路</text>
					</view>
				</view>
			</view>
			<view class="bg-white flex flex-column my-2 p-2 rounded">
				<view @click="skipPaid" class="flex flex-column py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">第一笔费用支付</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥1799.80</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">签订合同后支付20%</text>
						<text style="color: #02B1BE;font-size: 26rpx;">已支付</text>
					</view>
				</view>
				<view class="flex flex-column py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">第二笔费用支付</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥1799.80</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">签订合同后支付40%</text>
						<text style="color: #FF9900;font-size: 26rpx;">待支付</text>
					</view>
				</view>
				<view class="flex flex-column py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">第三笔费用支付</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥3599.60</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">签订合同后支付80%</text>
						<text style="color: #888;font-size: 26rpx;">未开始</text>
					</view>
				</view>
				<view class="flex flex-column py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">第四笔费用支付</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥1799.80</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">签订合同后支付100%</text>
						<text style="color: #888;font-size: 26rpx;">未开始</text>
					</view>
				</view>
			</view>
			
			<view class="bg-white p-2 flex flex-column rounded">
				<text>费用支付情况</text>
				<text>已支付<span class="textColor">4</span>笔：<span class="textColor">8999.00</span>元</text>
				<text>未支付 <span class="textColor">0</span>笔：<span class="textColor">00.00</span>元</text>
				<text>追加金额：<span class="textColor">200.00</span>元</text>
			</view>
			
		</view>
		
		<view @click="checkUserToRoom" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #FF9900;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;">&#xe6ab;</text>
			</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				pricevalue: '',
				type: 'text',
				border: true,
				list: [{
						name: 'zhifubao',
						disabled: false
					},
					{
						name: 'weixin',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'zhifubao',
			};
		},
		methods: {
			// 跳转到已支付界面
			skipPaid(){
				uni.navigateTo({
					url:'/pages/ServiceOrder/Paid'
				})
			},
			checkUserToRoom() {
				// console.log(JSON.stringify(toUserInfo));
				// var toUserInfo = {
				// 	"UserID":this.user.tel,
				// 	"NickName":this.user.name
				// }
				// this.$store.commit('createConversationActive', toUserInfo.UserID);
				// uni.navigateTo({
				// 	url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				// });
				uni.navigateTo({
					url: '/pages/chat/chat/chat'
				});
			}
		}
	};
</script>

<style>
	.text-title {
		font-size: 26rpx;
		color: #999;
	}

	.text-content {
		font-size: 26rpx;
		color: #999;
	}
	.textColor{
		color: #02B1BE;
	}
</style>
