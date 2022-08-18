<template>
	<view class="content">
		<view class="bg-white px-3">
			<view class="flex py-3" style="height: 200rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;"><text style="font-size: 30rpx;color: #101010;">个性签名</text></view>
				<view class="form-input py-1 pl-1" style="width: 550rpx;background-color: #F7F7F7;">
					<textarea maxlength="150" placeholder="请输入个性签名" v-model="slogan" style="font-size: 28rpx;color: #777;height: 130rpx;width: 100%;" />
				</view>
			</view>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			slogan:''
		};
	},
	onLoad(option) {
		if(option.slogan=='null'){
			this.slogan = ''
		}else{
			this.slogan = option.slogan
		}
	},
	methods: {
		Submit(){
			// 非空校验
			if(this.slogan == ''){
				uni.showToast({
					title: '请输入个性签名',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			let requestData = {
				slogan:this.slogan
			}
			console.log(requestData)
			// 更新用户数据
			this.$post(this.$url.User.Update, requestData,{}).then(res => {
				console.log(JSON.stringify(res))
				if(res.code == 200 && res.status==0){
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success'
					});
					setTimeout(()=>{
						//返回上一个界面
						uni.navigateBack({
							delta:1
						})
					},2000);
				}else{
					this.$refs.uToast.show({
						title: '提交失败',
						type: 'error'
					});
				}
			});
			
		}
	}
};
</script>

<style>
	
</style>