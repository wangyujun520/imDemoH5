<template>
	<view class="content">
		
		<!-- 上传图片 -->
		<upload-imgs @upload="upload"></upload-imgs>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">上传图片</u-button>
		</view>
		
	</view>
</template>

<script>
	import uploadImgs from "@/components/push-img/get-imgs.vue";
	export default{
		components: {
		  uploadImgs
		},
		data(){
			return{
				photos:[]
			}
		},
		methods:{
			Submit(){
				// 上传图片
				console.log("上传图片")
			},
			upload(arr) {
			  this.photos = arr;
			  console.log(JSON.stringify(this.photos))
			},
		}
	}
</script>

<style lang="scss">
	
</style>