<template>
	<view class="content">
		
		<!-- <view class="box">
			<switch @change="ChangeLoading" />
		</view>
		<view class="box">
			<Loading1></Loading1>
		</view>
		<view class="box">
			<Loading2></Loading2>
		</view>
		<view class="box">
			<Loading3></Loading3>
		</view>
		<view class="box">
			<Loading4></Loading4>
		</view>
		<view class="box">
			<Loading5></Loading5>
		</view>
		<view class="box">
			<Loading6></Loading6>
		</view>
		<view class="box">
			<Loading7></Loading7>
		</view>
		<view class="box">
			<Loading8></Loading8>
		</view>
		<view class="box">
			<Loading9></Loading9>
		</view>
		<view class="box">
			<Loading10></Loading10>
		</view>
		<view class="box">
			<Loading11></Loading11>
		</view>
		<view class="box">
			<Loading12></Loading12>
		</view>
		<view class="box">
			<Loading13></Loading13>
		</view>
		<view class="box">
			<Loading14></Loading14>
		</view>
		<view class="box">
			<Loading15></Loading15>
		</view>
		<view class="box">
			<Loading16></Loading16>
		</view>
		<view class="box">
			<Loading17></Loading17>
		</view>
		<view class="box">
			<Loading18></Loading18>
		</view>
		<view class="box">
			<Loading19></Loading19>
		</view>
		<view class="box">
			<Loading20></Loading20>
		</view>
		<view class="box">
			<Loading21></Loading21>
		</view>
		<view class="box">
			<Loading22></Loading22>
		</view>
		<view class="box">
			<Loading23></Loading23>
		</view>
		<view class="box">
			<Loading24></Loading24>
		</view>
		<view class="box">
			<Loading25></Loading25>
		</view>
		<view class="box">
			<Loading26></Loading26>
		</view>
		<view class="box">
			<Loading27></Loading27>
		</view>
		<view class="box">
			<Loading28></Loading28>
		</view>
		<view class="box">
			<Loading29></Loading29>
		</view>
		<view class="box">
			<Loading30></Loading30>
		</view> -->
		<!-- <w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading> -->
		<!-- mask:  	true 无遮罩层              		|     false 有遮罩层 						 -->
		<!-- click:  	true 点击空白无法关闭加载状态   |     false 点击空白可关闭加载状态 -->
		
		<view class="flex flex-column align-center justify-center bg-white" style="height: 100vh;width: 750rpx;">
			<Loading2></Loading2>
			<text style="color: #000000;font-size: 30rpx; margin-top: 200rpx;">正在为您努力生成测试结果中...</text>
		</view>
		
		
	</view>
</template>

<script>
	import Loading1 from "@/components/loading/loading1.vue";
	import Loading2 from "@/components/loading/loading2.vue";
	// import Loading3 from "@/components/loading/loading3.vue";
	// import Loading4 from "@/components/loading/loading4.vue";
	// import Loading5 from "@/components/loading/loading5.vue";
	// import Loading6 from "@/components/loading/loading6.vue";
	// import Loading7 from "@/components/loading/loading7.vue";
	// import Loading8 from "@/components/loading/loading8.vue";
	// import Loading9 from "@/components/loading/loading9.vue";
	// import Loading10 from "@/components/loading/loading10.vue";
	// import Loading11 from "@/components/loading/loading11.vue";
	// import Loading12 from "@/components/loading/loading12.vue";
	// import Loading13 from "@/components/loading/loading13.vue";
	// import Loading14 from "@/components/loading/loading14.vue";
	// import Loading15 from "@/components/loading/loading15.vue";
	// import Loading16 from "@/components/loading/loading16.vue";
	// import Loading17 from "@/components/loading/loading17.vue";
	// import Loading18 from "@/components/loading/loading18.vue";
	// import Loading19 from "@/components/loading/loading19.vue";
	// import Loading20 from "@/components/loading/loading20.vue";
	// import Loading21 from "@/components/loading/loading21.vue";
	// import Loading22 from "@/components/loading/loading22.vue";
	// import Loading23 from "@/components/loading/loading23.vue";
	// import Loading24 from "@/components/loading/loading24.vue";
	// import Loading25 from "@/components/loading/loading25.vue";
	// import Loading26 from "@/components/loading/loading26.vue";
	// import Loading27 from "@/components/loading/loading27.vue";
	// import Loading28 from "@/components/loading/loading28.vue";
	// import Loading29 from "@/components/loading/loading29.vue";
	// import Loading30 from "@/components/loading/loading30.vue";
	// import wLoading from "@/components/loading/w-loading.vue";
	export default {
		components: {
			Loading1,
			Loading2
			// Loading3,
			// Loading4,
			// Loading5,
			// Loading6,
			// Loading7,
			// Loading8,
			// Loading9,
			// Loading10,
			// Loading11,
			// Loading12,
			// Loading13,
			// Loading14,
			// Loading15,
			// Loading16,
			// Loading17,
			// Loading18,
			// Loading19,
			// Loading20,
			// Loading21,
			// Loading22,
			// Loading23,
			// Loading24,
			// Loading25,
			// Loading26,
			// Loading27,
			// Loading28,
			// Loading29,
			// Loading30,
			// wLoading
		},
		data() {
			return {
				// title: "loading",
			};
		},
		onShow() {
			const value = uni.getStorageSync('TestDataList');
			console.log(JSON.stringify(value))//传递给后台的数据 来生成测试结果
			
			//把定时器更换成接口数据即可
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/tabbar/settle/style-test/DecorationStyle?id=' + "1"
				})
			},2000)
		},
		onReady() {
			// this.$refs.loading.open()
		},
		methods: {
			// ChangeLoading() {
			// 	this.$refs.loading.open()
			// 	//this.$refs.loading.close()
			// }
		}
	};
</script>

<style>
	/* .content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		align-content: flex-start;
	}

	.box {
		position: relative;
		display: flex;
		height: 350upx;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10upx;
		margin-top: 30upx;
		flex: 0 0 350upx;
		background: #040038;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	} */
</style>
