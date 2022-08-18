<template>
	<view class="content">
		<view class="flex flex-column mt-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex p-2">
				<text style="color: #000000;">{{ DataList.mall_name }}</text>
			</view>
			<u-checkbox-group width="70rpx" size="50">
				<block v-for="(item, index) in DataList.list" :key="index">
					<view class="flex align-center pl-3 border-bottom">
						<!-- <u-checkbox :name="item.id" active-color="#02B1BE" :icon-size="20"></u-checkbox> -->
						<u-checkbox size="40" active-color="#02B1BE" shape="circle" :disabled="item.status == 0"
							@change="checkboxChange($event,item,index)" v-model="item.isChecked" :name="item.id">
						</u-checkbox>
						<view class="flex flex-column" style="width: 650rpx;border: 0px solid red;">
							<view class="flex pr-2 pt-2">
								<view class="flex" style="width: 150rpx;height: 150rpx;">
									<image class="rounded" :src="item.cover" style="width: 100%;height: 100%;"></image>
								</view>
								<view class="flex flex-column pl-1" style="width: 450rpx;">
									<text class="LineBreak"
										style="color: #101010;font-size: 24rpx;">{{ item.title }}</text>
									<text class="my-1" style="color: #939393;font-size: 24rpx;">{{ item.tags }}</text>
									<text style="color: #101010;font-size: 26rpx;">参考价：{{ item.price }}</text>
								</view>
							</view>
							<view class="flex justify-between py-2 pr-2">
								<text style="color: #FF0000;font-size: 28rpx;">{{item.status_text}}</text>
							</view>
						</view>
					</view>

				</block>
			</u-checkbox-group>


		</view>
		<view class="flex flex-column mt-2 bg-white p-2">
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总量</text>
				</view>
				<view class="flex">
					<text>{{ DataList.all_count }}</text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商品总额</text>
				</view>
				<view class="flex">
					<text>￥{{ DataList.all_money }}</text>
				</view>
			</view>
			<view class="flex justify-between mt-1">
				<view class="flex">
					<text>商家优惠</text>
				</view>
				<view class="flex">
					<text style="color: #02B1BE;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">{{
              DataList.all_discount
            }}</span></text>
				</view>
			</view>
			<view class="flex justify-end align-center" style="height: 100rpx;">
				<text>金额：</text>
				<text style="color: #E51C23;font-size: 30rpx;">￥<span style="font-size: 40rpx;font-weight: bold;">{{
            DataList.money
          }}</span></text>
			</view>
		</view>
		<!-- 占位 -->
		<view style="height: 150rpx;"></view>

		<view @click="checkUserToRoom" class="position-fixed"
			style="bottom: 300rpx;right: 50rpx;background-color: #DD6666;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex flex-column align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;margin-top: 5rpx;">&#xe6ad;</text>
				<text class="text-white" style="font-size: 22rpx;margin-top: -10rpx;">管家</text>
			</view>
		</view>
		
		
		<view v-if="module == 'mall' && DataList.status!=0" class="position-fixed bg-white" style="bottom: 0;width: 750rpx;height: 100rpx;">
			<view class="flex justify-end align-center px-3" style="width: 100%;height: 100%;">
				<text @click="showModalList" class="mr-3"
					style="color: #4D86D7;background-color: #FFFFFF;border: 1px solid #4D86D7;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">优惠</text>
				<text @click="UpdateOrderMaterialItem(0,'结算')"
					style="color: #FFFFFF;background-color: #02B1BE;border: 1px solid #02B1BE;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">结算</text>
			</view>
		</view>
		
		<view v-if="module == 'sale' && DataList.status!=0" class="position-fixed bg-white" style="bottom: 0;width: 750rpx;height: 100rpx;">
			<view class="flex justify-end align-center px-3" style="width: 100%;height: 100%;">
				<text @click="UpdateOrderMaterialItem(-2,'未成交')" class="mr-3"
					style="color: #FFFFFF;background-color: #FFA012;border: 1px solid #FFA012;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">未成交</text>
				<text @click="UpdateOrderMaterialItem(0,'成交')"
					style="color: #FFFFFF;background-color: #02B1BE;border: 1px solid #02B1BE;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">成交</text>
			</view>
		</view>

		<u-modal v-model="showModal" :zoom="false" title="优惠金额录入" :show-cancel-button="true" @confirm="ModalConfirm">
			<view class="flex flex-column">
				<view class="flex mt-2">
					<view style="width: 200rpx;" class="flex justify-end">
						<text style="color: #888;font-size: 28rpx;">当前金额：</text>
					</view>
					<view style="width: 400rpx;" class="flex">
						<text style="color: #000000;font-size: 26rpx;">￥{{DataList.all_money}}</text>
					</view>
				</view>

				<view class="flex align-center mt-2">
					<view style="width: 200rpx;" class="flex justify-end">
						<text style="color: #888;font-size: 28rpx;">优惠金额：</text>
					</view>
					<view style="width: 400rpx;" class="flex">
						<input type="number" value="" placeholder="录入优惠金额" v-model="preferential_amount"
							style="background-color: #F4F4F4;color: #888;" class="p-1" />
					</view>
				</view>
				<view class="flex my-2">
					<view style="width: 200rpx;" class="flex justify-end">
						<text style="color: #888;font-size: 28rpx;">优惠后金额：</text>
					</view>
					<view style="width: 400rpx;" class="flex">
						<text
							style="color: #FF0000;font-size: 26rpx;">￥{{DataList.all_money-preferential_amount}}</text>
					</view>
				</view>
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				module:'',
				preferential_amount: '',
				value: false, //默认选中第一条数据
				Discount: 0,
				showModal: false,
				id: 0,
				DataList: {},
				order: {},
				SelectValue: []
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.module = option.module;
			
			console.log(this.id);
			this.InitData();
		},
		methods: {
			// 结算
			UpdateOrderMaterialItem(state,tips){
				let id = '';
				this.SelectValue.forEach(item=>{
					if(id==''){
						id = item
					}else{
						id += id + '|' + item
					}
				})
				console.log(id)
				if((id??'')==''){
					this.$refs.uToast.show({
						title: `请至少选择一个${tips}明细`,
						type: 'warning'
					})
					return
				}
				
				
				uni.showModal({
					title: '提示',
					content: `真的要${tips}吗？`,
					success: (res)=> {
						if (res.confirm) {
							let requestData = {
								id:id,
								status:state//0=已成交 -2未成交;
							}
							// 更新商城订单项信息
							this.$post(this.$url.Mall.UpdateOrderMaterialItem, requestData, {
								isLoading: false
							}).then(res => {
								this.$refs.uToast.show({
									title: `${tips}成功`,
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
							
							// //0=接受；1=拒绝
							// this.$post(this.$url.Task.ArgMoney, {
							// 	order_id: this.DataList.order_id,
							// 	status:state
							// }, {}).then(res => {
							// 	// 成功
							// 	this.$refs.uToast.show({
							// 		title: `${state==0?'接受':'拒绝'}成功`,
							// 		type: 'success'
							// 	});
							// 	setTimeout(() => {
							// 		// 两秒之后返回上一个界面
							// 		uni.navigateBack({
							// 			delta: 1
							// 		});
							// 	}, 2000);
							// });
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
				
				
			},
			checkboxChange(e, item, index) {
				console.log(e)
				if (e.value) {
					this.SelectValue.push(e.name)
				} else {
					// this.SelectValue.pop(e.name);
					// this.SelectValue.splice(index,1);
					this.SelectValue.splice(this.SelectValue.indexOf(e.name), 1)
				}
				console.log(this.SelectValue);
			},
			// 跳转到管家聊天界面
			checkUserToRoom() {

			},
			InitData() {
				let requestData = {
					id: this.id
				}
				// 获取商城订单材料明细
				this.$post(this.$url.Mall.GetOrderMaterialList, requestData, {
					isLoading: false
				}).then(res => {
					res.data.list.forEach(item => {
						item.isChecked = false;
					})
					this.DataList = res.data;
				});
			},
			ModalConfirm() {
				console.log(123)
				// 非空校验
				if ((this.preferential_amount ?? '') == '') {
					this.$refs.uToast.show({
						title: '请录入优惠金额',
						type: 'warning'
					})
					return
				}
				if (this.preferential_amount > this.DataList.all_money) {
					this.$refs.uToast.show({
						title: '优惠金额不能大于当前金额',
						type: 'warning'
					})
					return
				}
				// 更新商城订单信息
				let requestData = {
					id: this.DataList.id, //材料方案id
					discount: this.preferential_amount //优惠金额
				}
				this.$post(this.$url.Mall.UpdateOrderMaterial, requestData, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '更新订单信息成功',
						type: 'success'
					});
					this.InitData(); //刷新数据
				});
			},
			// 弹出模态框
			showModalList() {
				this.preferential_amount = this.DataList.all_discount;
				this.showModal = true;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>
