<template>
	<view class="content px-3">
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">姓名</text>
				<input class="mt-2" v-model="name" type="text" placeholder="请输入姓名" />
			</view>
		</view>
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">银行卡号</text>
				<input class="mt-2" v-model="card_no" type="text" placeholder="请输入银行卡号" />
			</view>
		</view>
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">开户银行</text>
				<input class="mt-2" v-model="card_bank" type="text" placeholder="根据录入的银行卡号识别" />
			</view>
		</view>
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">开户地址</text>
				<input class="mt-2" v-model="address" type="text" placeholder="请输入开户地址" />
			</view>
		</view>
		
		<view class="flex align-center justify-center my-5" style="background-color: #FF9900;height: 100rpx;border-radius: 10rpx;">
			<text @click="Submit" class="text-white" style="font-size: 28rpx;">确定添加</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				card_no:'',
				card_bank:'',
				address:''
			}
		},
		methods: {
			// 提交
			Submit(){
				this.$post(this.$url.Account.SaveBank, {
					id: "", //银行卡id
					name: "", //姓名
					mobile: "", //手机号码
					account: "", //账户
					bank_catalog: '', //银行卡类型
					bank_store: "", //开户行
					bank_photo: "", //照片
					address: "", //银行地址
					pay_qr_code: "" //收款码
					// name:this.name,
					// card_no:this.card_no,
					// card_bank:this.card_bank,
					// address:this.address
				},{
					isLoading:true
				}).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:'添加成功',
							icon:'success'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},2000)
					}
				});
			}
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
</style>