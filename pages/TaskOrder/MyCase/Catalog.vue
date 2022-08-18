<template>
	<view class="content">
		<view class="flex flex-column p-2" v-for="(item,index) in dataList" :key="index">
			<view class="flex">
				<text style="color: #000000;font-size: 32rpx;font-weight: bold;">{{item.name}}</text>
			</view>
			<view class="flex flex-wrap mt-1">
				<view class="pl-1 pt-1" v-for="(sditem,sdindex) in item.spaceDetails" :key="sdindex"
					style="width: 235rpx; height: 235rpx">
					<image v-if="sditem.img!=null" mode="aspectFill" @click="previewImage(sditem.img, dataList)"
						:src="sditem.img" style="width: 100%; height: 100%"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: '', //Mock数据
				// photos: ["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg",
				// 	"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2033921778,648007645&fm=26&gp=0.jpg",
				// 	"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1592300431,450815993&fm=26&gp=0.jpg",
				// 	"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg"
				// ]
			}
		},
		methods: {
			// 预览图片
			previewImage(url, list) {
				console.log(url);
				console.log(list);
				let ImageArray = [];
				list.forEach(item => {
					item.spaceDetails.forEach(item => {
						if (item.img != null) {
							ImageArray.push(item.img);
						}

					});
				});
				uni.previewImage({
					current: url,
					loop: true, //是否可循环预览，默认值为 false
					urls: ImageArray,
					indicator: "number",
				});
			},
		},
		onLoad() {
			this.dataList = uni.getStorageSync('SpaceDetaileCatalog');
			uni.removeStorageSync('SpaceDetaileCatalog');
		}
	}
</script>

<style lang="scss">

</style>
