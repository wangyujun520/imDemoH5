<template>
	<view class="flex flex-wrap">
		<block v-for="(item, index) in emotionDataList" :key="index">
			<view class="justify-center align-center" :style="emoticonWH">
				<image :src="emoticonSrc+item.url" @click="emoticonClick(item)" style="width: 60rpx;height: 60rpx;"></image>
			</view>
		</block>
		<!-- <block v-for="(item, index) in emoticonstring" :key="index">
			<view class="justify-center align-center" :style="emoticonWH">
				<text style="font-size: 45rpx;" @click="emoticonClick(item)">{{ item }}</text>
			</view>
		</block> -->
	</view>
</template>

<script>
//引入表情模板
import commen from '@/common/emoticon/emoticonlist';
Vue.prototype.$commen = commen;
export default {
	components: {},
	props: {},
	data() {
		return {
			// emoticonSrc: '/static/img/emoticon/qq/',
			emoticonSrc: '/static/img/emoticon/douyin/',
			// emoticonSrc: 'https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/emoticon/qq/',
			emotionDataList: this.$commen.emojiList,
		};
	},
	methods: {
		// emoticonSrc(index) {
		// 	return `/static/img/emoticon/qq/${index}.png`;
		// },
		emoticonClick(item) {
			// console.log(JSON.stringify(item))

			this.$emit('getIndex', item.alt);
			// this.$emit('getIndex', item);
		}
	},
	computed: {
		// 计算表情宽高
		emoticonWH() {
			return `width:${uni.upx2px(750) / 7 - 0.5}px;height:${uni.upx2px(750) / 10}px;`;
		}
	},
	mounted() {},
	destroyed() {}
};
</script>

<style scoped></style>
