<!-- <template>
	<view class="content">
		<view class="flex">
			<text>签署成功</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		onLoad(options) {
			console.log(options.state);
		}
	}
</script>

<style lang="scss">
	
</style>
 -->
 
 <template>
 	<view class="content p-3">
 		<view class="flex bg-white align-center justify-center flex-column" style="height: 400rpx;">
 			<image src="/static/img/authentication.png" style="width: 100rpx;height: 100rpx;"></image>
 			<text style="font-size: 30rpx;color: #2979FF;" class="mt-3">你已签署成功</text>
 		</view>
 		
 		<view class="flex align-end justify-center" style="height: 150rpx;">
 			<u-button @click="Next" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">下一步</u-button>
 		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Look" type="default" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">查看合同</u-button>
		</view>
		
 	</view>
 </template>
 
 <script>
 export default {
 	
 	data() {
 		return {
 			DataList:''
 		};
 	},
 	onShow() {
 		
 
 	},
 	computed: {},
 	onReady() {},
 	methods: {
		// 下一步
 		Next(){
 			console.log("下一步")
 		},
		// 查看合同
		Look(){
			console.log("查看合同")
		}
 	}
 };
 </script>
 
 <style>
 </style>
 