<template>
	<view class="flex align-center justify-center" 
	hover-class="bg-hover-light" @click="$emit('click')"
	style="height: 90rpx;width: 90rpx;">
		<text class="iconfont font-md">{{icon}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: ''
			},
		},
	}
</script>

<style>
	/* @import url("common/free.css"); */
	@import "/common/free.css";
</style>
