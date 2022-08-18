<template>
	<view class="content">
		<view class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 80rpx;">
					<text style="font-size: 30rpx;color: #101010;">邮箱</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" maxlength="25" v-model="email" style="font-size: 28rpx;color: #777;" placeholder="请输入邮箱" />
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
			email:''
		};
	},
	onLoad(option) {
		if(option.email=='null'){
			this.email = ''
		}else{
			this.email = option.email
		}
	},
	methods: {
		Submit(){
			// 非空校验
			if(this.email == ''){
				uni.showToast({
					title: '请输入邮箱',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			if (!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(this.email)) {
				this.$refs.uToast.show({
					title: '请输入正确的邮箱号',
					type: 'warning'
				})
				return false;
			}
			
			// 邮箱修改
			let requestData = {
				email:this.email
			}
			// 更新用户数据
			this.$post(this.$url.User.Update, requestData,{}).then(res => {
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