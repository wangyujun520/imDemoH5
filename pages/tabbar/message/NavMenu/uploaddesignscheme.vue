<template>
	<view class="content">
		<view class="bg-white px-3 pt-2">
			<view class="flex flex-column align-center" style="height: 400rpx;">
				<!-- background-image: url(/static/video/demo.jpg);background-size: 100% 100%; -->
				<view class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
					<text style="color: #999;font-size: 28rpx;">选择图片</text>
				</view>
				<text style="color: #2979FF;font-size: 28rpx;" class="mt-2">上传照片</text>
			</view>
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">方案标题</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" style="font-size: 28rpx;color: #777;" placeholder="请输入方案标题" />
				</view>
			</view>
		</view>
		
		<view class="mt-2 pt-2 pb-4 bg-white">
			<view class="bg-white" style="height: 80rpx;">
				<view class="bg-white" style="height: 40rpx;"></view>
				<view class="flex justify-center position-relative">
					<view class="position-absolute bg-white flex justify-center" style="width: 140rpx;height: 40rpx;top: -20rpx;">
						<text style="color: #FF9900;font-size: 26rpx;">设计详情</text>
					</view>
					<u-line :hair-line="false" color="#FF9900"/>
				</view>
			</view>
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<text>东方希望天祥广场</text>
			</view>
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<view class="" style="width: 440rpx;">
					<text class="text-title">设计师：</text>
					<text class="text-content">咚咚锵</text>
				</view>
				<view class="" style="width: 280rpx;">
					<text class="text-title">设计面积：</text>
					<text class="text-content">100㎡</text>
				</view>
			</view>
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<view class="" style="width: 440rpx;">
					<text class="text-title">装修风格：</text>
					<text class="text-content">现代简约</text>
				</view>
				<view class="" style="width: 280rpx;">
					<text class="text-title">价格：</text>
					<text class="text-content">10万</text>
				</view>
			</view>
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<view class="" style="width: 720rpx;">
					<text class="text-title">地址：</text>
					<text class="text-content">四川省成都市武侯区G213辅路</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: e => {
			if (e.float == 'right') {
				console.log('右上角按钮点击事件');
			}
		},
		data() {
			return {
			};
		},
		computed: {
		},
		watch: {
		},
		onLoad() {
		},
		methods: {
		},
		onShow() {
		}
	};
</script>

<style>
	.text-title{
		font-size:26rpx;
		color:#999;
	}
	.text-content{
		font-size:26rpx;
		color:#999;
	}
</style>
