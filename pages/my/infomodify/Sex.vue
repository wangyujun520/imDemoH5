<template>
	<view class="content">
		<view class="p-3">
			<view class="flex flex-column bg-white">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<view class="flex align-center justify-between pl-3" style="width: 100%;height: 100rpx;" v-for="(item, index) in list" :key="index" :class="index==0?'border-bottom':''">
						<text>{{item.value}}</text>
						<u-radio
							@change="radioChange" 
							:name="item.key"
							:disabled="item.disabled"
						>
						</u-radio>
					</view>
				</u-radio-group>
			</view>
		</view>
		<!-- <view class="flex justify-center py-5">
			<view @tap="submit" class="flex align-center justify-center" style="background-color: #3E8EFF;border-radius: 10rpx;width: 640rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">提交</text>
			</view>
		</view> -->
		<view class="flex justify-center py-3">
			<view @tap="Submit" class="flex align-center justify-center" style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">提交</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			if((options.gender??'')==''){
				this.value = 1
			}else{
				this.value = options.gender
			}
		},
		data() {
			return {
				list: [
					{
						key:1,
						value: '男',
						disabled: false
					},
					{
						key:0,
						value: '女',
						disabled: false
					}
				],
				value: null,
			};
		},
		methods:{
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			// 提交
			Submit(){
				console.log(this.value)
				if(this.value===''||this.value===null){
					uni.showToast({
						title: '请选择性别',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				// 修改性别
				let RequrestData = {
					gender: this.value
				};
				this.$post(this.$url.User.Update, RequrestData,{}).then(res => {
					console.log(JSON.stringify(res))
					if(res.code == 200 && res.status==0){
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success'
						});
						setTimeout(()=>{
							//返回上个界面
							uni.navigateBack({
								delta:1
							})
						},2000)
					}else{
						this.$refs.uToast.show({
							title: '提交失败',
							type: 'error'
						});
					}
				});
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F7F7;
	}
</style>
