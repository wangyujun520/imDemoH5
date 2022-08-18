<template>
	<view class="p-3">
		<view class="flex bg-white flex-column align-center py-5">
			<view class="">
				<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.jiwu.com%2Fjiwu_news_pics%2F20170607%2Fa_829692517.png&refer=http%3A%2F%2Fimg9.jiwu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615360138&t=039683663f17d4526da6daf61c1dc867" class="rounded" style="width: 120rpx;height: 120rpx;"></image>
			</view>
			<text class="my-1" style="font: 26rpx;color: #0072FF;">链家地产(半岛城邦店)</text>
			<view class="flex align-center">
				<text class="iconfont" style="color: #777;font-size: 26rpx;">&#xe65e;</text>
				<text style="font-size: 26rpx;color: #777;">科华南路与科华南路入口交汇处东150米</text>
			</view>
		</view>
		 
		
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">联系人</text>
				<view class="flex align-center">
					<image src="/static/img/authentication.png" style="width: 30rpx;height: 30rpx;"></image>
					<text style="color: #777;font-size: 28rpx;">张天宇</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">联系电话</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">15882563652</text>
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">开业时间</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">2010-10-01</text>
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">主营商品</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;">链家地产(半岛城邦店)</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">身份证</text>
				<view class="flex align-center">
					<!-- <text style="color: #777;font-size: 28rpx;">15882182484</text> -->
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">营业执照</text>
				<view class="flex align-center">
					<!-- <text style="color: #777;font-size: 28rpx;">15882182484</text> -->
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">手持身份证</text>
				<view class="flex align-center">
					<!-- <text style="color: #777;font-size: 28rpx;">15882182484</text> -->
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view @click="skipMyAgent" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">我的经纪人</text>
				<view class="flex align-center">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
		<u-action-sheet :list="list" v-model="show" @click="SetUpClick"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	onNavigationBarButtonTap: function(e) {
		if (e.float == 'right') {
			console.log("右上角点击事件");
			this.show = true;
		}
	},
	data() {
		return {
			list: [{
				text: '设为默认'
			}],
			show: false
		};
	},
	onShow() {
		
	},
	methods: {
		SetUpClick(index) {
			// console.log(`点击了第${index + 1}项，内容为：${this.ActionSheetList[index].text}`)
			// 设为默认
			if (index == 0) {
				console.log("设为默认")
			}
		},
		skipMyAgent(){
			uni.navigateTo({
				url:'/pages/tabBar/my/identityauthentication/NewPropertys/MyAgent'
			})
		}
	}
};
</script>

<style lang="scss">
	
</style>