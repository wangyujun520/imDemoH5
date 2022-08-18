<template>
	<view class="content">
		<view class="flex flex-column mt-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex p-2">
				<text style="color: #000000;">兔宝宝木材</text>
			</view>
			<view class="" style="border-bottom: 1px solid rgb(187,187,187,0.2);" v-for="i in 2">
				<view class="flex px-2 pt-2">
					<view class="flex" style="width: 150rpx;height: 150rpx;">
						<image class="rounded" src="/static/video/demo.jpg" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="flex flex-column pl-1" style="width: 550rpx;">
						<text class="LineBreak" style="color: #101010;font-size: 24rpx;">兔宝宝儿童床女孩粉色公主床女孩粉红色儿童单人套房儿童床1.5米 单床 150cm*200cm</text>
						<text class="my-1" style="color: #939393;font-size: 24rpx;">数量：1  颜色：粉红色 尺寸：150cm*200cm</text>
						<text style="color: #101010;font-size: 26rpx;">参考价：2999</text>
					</view>
				</view>
				
				<view class="flex justify-between p-2">
					<text style="color: #FF0000;font-size: 28rpx;">等待客户取货</text>
					<!-- <text class="iconfont" style="color: #000000;font-size: 40rpx;">&#xe61e;</text> -->
				</view>
			</view>
		</view>
		
		<view class="flex flex-column mt-2 bg-white p-2">
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总量</text>
				</view>
				<view class="flex">
					<text>152</text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总额</text>
				</view>
				<view class="flex">
					<text>￥19898.00</text>
					<!-- <text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">19898.00</span></text> -->
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商家优惠</text>
				</view>
				<view class="flex">
					<text style="color: #02B1BE;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">98</span></text>
				</view>
			</view>
			<view class="flex justify-end align-center" style="height: 100rpx;">
				<text>金额：</text>
				<text style="color: #E51C23;font-size: 30rpx;">￥<span style="font-size: 40rpx;font-weight: bold;">5900.00</span></text>
			</view>
		</view>
		
		<!-- 占位 -->
		<view style="height: 150rpx;"></view>
		
		<!-- <view @click="checkUserToRoom" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #DD6666;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex flex-column align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;margin-top: 5rpx;">&#xe6ad;</text>
				<text class="text-white" style="font-size: 22rpx;margin-top: -10rpx;">管家</text>
			</view>
		</view> -->
		<!-- <view class="position-fixed bg-white" style="bottom: 0;width: 750rpx;height: 100rpx;">
			<view class="flex justify-between align-center px-3" style="width: 100%;height: 100%;">
				<text @click="showModalList" style="color: #4D86D7;background-color: #FFFFFF;border: 1px solid #4D86D7;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">优惠</text>
				<text @click="showModalList" style="color: #FFFFFF;background-color: #02B1BE;border: 1px solid #02B1BE;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">出货</text>
			</view>
		</view> -->
		
		<u-modal v-model="showModal" :zoom="false" :show-cancel-button="true">
			<view class="flex flex-column">
				<view class="flex mt-2">
					<view style="width: 200rpx;" class="flex justify-end">
						<text style="color: #888;font-size: 28rpx;">当前金额：</text>
					</view>
					<view style="width: 400rpx;" class="flex">
						<text style="color: #000000;font-size: 26rpx;">￥5998.00</text>
					</view>
				</view>
				
				<view class="flex align-center mt-2">
					<view style="width: 200rpx;" class="flex justify-end">
						<text style="color: #888;font-size: 28rpx;">优惠金额：</text>
					</view>
					<view style="width: 400rpx;" class="flex">
						<input type="number" value="" placeholder="录入优惠金额" style="background-color: #F4F4F4;color: #888;" class="p-1"/>
					</view>
				</view>
				
				<view class="flex my-2">
					<view style="width: 200rpx;" class="flex justify-end">
						<text style="color: #888;font-size: 28rpx;">优惠后金额：</text>
					</view>
					<view style="width: 400rpx;" class="flex">
						<text style="color: #FF0000;font-size: 26rpx;">￥5998.00</text>
					</view>
				</view>
				
			</view>
		</u-modal>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showModal:false
			}
		},
		methods:{
			// 跳转到管家聊天界面
			checkUserToRoom(){
				
			},
			// 弹出模态框
			showModalList(){
				this.showModal = true;
			}
		}
	}
</script>

<style lang="scss">
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>