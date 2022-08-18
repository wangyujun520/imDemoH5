<template>
	<view class="content">
		<view class="flex align-center pl-3" style="height: 80rpx;">
			<text style="font-size: 28rpx;color: #101010;">我遇到的问题（必填）：</text>
		</view>
		<view class="bg-white mx-3 p-3 flex flex-column">
			<text class="mb-3" style="color: #888888;font-size: 24rpx;">为了更好的解决你的反馈问题，请尽量在出现问题的网络环境下进行反馈</text>
			<view class="flex flex-wrap">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="item.value" :name="item.value"
						:disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
		</view>

		<view class="flex align-center pl-3" style="height: 80rpx;">
			<text style="font-size: 28rpx;color: #101010;">详细写下您的建议和感想吧：</text>
		</view>

		<view class="bg-white mx-3 p-3">
			<u-input v-model="content" type="textarea" height="300" placeholder="请录入..."></u-input>
		</view>

		<view class="flex align-center pl-3" style="height: 80rpx;">
			<text style="font-size: 28rpx;color: #101010;">您的联系方式（必填）：</text>
		</view>
		<view class="bg-white mx-3 px-3 py-1">
			<u-input v-model="link" type="text" placeholder="为了方便与您联系，建议填写手机号"></u-input>
		</view>
		
		<!-- 占位 -->
		<view class="" style="height: 140rpx;"></view>
		<view class="position-fixed bg-white flex align-center justify-center" style="width: 750rpx;height: 140rpx;bottom: 0;">
			<view @tap="Submit" class="flex align-center justify-center rounded" style="background-color: #FF814A;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">提交</text>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '程序BUG',
						disabled: false,
						value:'1'
					},
					{
						name: '功能建议',
						disabled: false,
						value:'2'
					},
					{
						name: '内容意见',
						disabled: false,
						value:'3'
					},
					{
						name: '网络问题',
						disabled: false,
						value:'4'
					},
					{
						name: '网络故障',
						disabled: false,
						value:'5'
					},
					{
						name: '其他',
						disabled: false,
						value:'6'
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '',
				content:'',//反馈内容
				link:''
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			Submit(){
				// 非空校验
				if(this.value == ''){
					uni.showToast({
						title: '请选择遇到的问题',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				console.log(this.link)
				if(this.link == ''){
					uni.showToast({
						title: '请填写您的联系方式',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				let requestData = {
					catalog: this.value, //反馈问题类型，1=程序BUG；2=功能建议；3=内容意见；4=网络问题；5=网络故障；6=其他
					content: this.content, //反馈内容
					link: this.link //联系方式
				}
				// 建议反馈
				this.$post(this.$url.App.FeedBack, requestData,{
					isLoading:true,
					loadingTitle:'提交中...'
				}).then(res => {
					// console.log(123)
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
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}
</style>
