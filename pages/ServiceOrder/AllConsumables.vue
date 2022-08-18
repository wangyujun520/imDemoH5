<template>
	<view class="content">
		<view class="flex flex-column mt-2 bg-white">
			<view v-for="i in 3" class="flex p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex" style="width: 150rpx;height: 150rpx;">
					<image class="rounded" src="/static/video/demo.jpg" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="flex flex-column pl-1" style="width: 550rpx;">
					<text class="LineBreak" style="color: #101010;font-size: 24rpx;">兔宝宝儿童床女孩粉色公主床女孩粉红色儿童单人套房儿童床1.5米 单床 150cm*200cm</text>
					<text class="my-1" style="color: #939393;font-size: 24rpx;">数量：1  颜色：粉红色 尺寸：150cm*200cm</text>
					<text style="color: #101010;font-size: 26rpx;">参考价：2999</text>
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
					<text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">899.00</span></text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style>
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>
