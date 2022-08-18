<template>
	<view class="content">
		<view class="flex flex-column mt-2 px-3">
			<view class="flex bg-white pl-3 py-3" style="border-radius: 20rpx;">
				<view class="" style="width: 160rpx;height: 160rpx;">
					<image :src="DataList.cover|img" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="flex flex-column justify-center px-2" style="width: 530rpx;height: 160rpx;">
					<text style="font-size: 28rpx;color: #101010;font-weight: bold;">{{DataList.title}}</text>
					<view class="flex align-center mt-1 flex-wrap" style="font-size: 24rpx;">
						<text
							v-for="(tag, index) in DataList.tags"
							v-if="index < 3"
							class="mr-1 mb-1"
							style="color: #F99A00;border: 1px solid #F99A00;padding: 5rpx 13rpx;border-radius: 20rpx;line-height: 1;"
						>
							{{ tag }}
						</text>
					</view>
					<view class="flex align-center">
						<view class="flex align-center" style="color: red;">
							<text style="font-size: 26rpx;">￥</text>
							<text style="font-size: 30rpx;font-weight: bold;">{{DataList.price}}</text>
						</view>
						<text v-if="DataList.fee" class="text-white ml-1" style="background-color: red;">佣金：{{DataList.fee}}%</text>
					</view>
					
				</view>
			</view>
		</view>
		
		<view class="bg-white m-3">
			<view class="flex align-center">
				<view class="flex flex-column align-center justify-center border-bottom" style="width: 25%;height: 150rpx;border-right: 1px solid rgba(187, 187, 187, 0.2);">
					<text style="color: #FF3B3B;font-size: 30rpx;">￥{{DataList.price}}</text>
					<text style="color: #8E8E8E;font-size: 26rpx;">上架金额</text>
				</view>
				<view class="flex flex-column align-center justify-center border-bottom" style="width: 25%;height: 150rpx;border-right: 1px solid rgba(187, 187, 187, 0.2);">
					<text style="color: #101010;font-size: 30rpx;">{{DataList.count}}</text>
					<text style="color: #8E8E8E;font-size: 26rpx;">上架数量</text>
				</view>
				<view class="flex flex-column align-center justify-center border-bottom" style="width: 25%;height: 150rpx;border-right: 1px solid rgba(187, 187, 187, 0.2);">
					<text style="color: #1E9F58;font-size: 30rpx;">{{DataList.sold_count||0}}</text>
					<text style="color: #8E8E8E;font-size: 26rpx;">售出数量</text>
				</view>
				<view class="flex flex-column align-center justify-center border-bottom" style="width: 25%;height: 150rpx;">
					<text style="color: #FF9959;font-size: 30rpx;">{{DataList.buy_count==0?'不限制':DataList.buy_count}}</text>
					<text style="color: #8E8E8E;font-size: 26rpx;">购买限制</text>
				</view>
			</view>
			<view class="flex align-center">
				<view class="flex align-center justify-center" style="width: 50%;height: 100rpx;border-right: 1px solid rgba(187, 187, 187, 0.2);">
					<text style="color: #8E8E8E;font-size: 24rpx;">上架时间：{{DataList.start_date}}</text>
				</view>
				<view class="flex align-center justify-center" style="width: 50%;height: 100rpx;">
					<text style="color: #8E8E8E;font-size: 24rpx;">下架时间：{{DataList.end_date}}</text>
				</view>
			</view>
		</view>
		<view @click="EditOnline" class="bg-white flex align-center justify-center mx-3 mt-5" style="height: 90rpx;">
			<text>编辑上架</text>
		</view>
		<view @click="AddStock" class="bg-white flex align-center justify-center mx-3 mt-1" style="height: 90rpx;">
			<text>添加库存</text>
		</view>
		<view @click="Offline(DataList.sale_status)" class="bg-white flex align-center justify-center mx-3 mt-1" style="height: 90rpx;">
			<text style="color: red;" v-if="DataList.sale_status == 0">下架</text>
			<text style="color: green;" v-if="DataList.sale_status == 1">重新上架</text>
		</view>
		<u-popup v-model="showPopup" mode="center" border-radius="14" width="600" height="380" :zoom="false" :closeable="true">
			<view class="flex flex-column position-relative" style="height: 100%;">
				<view class="flex flex-column align-center justify-center px-3">
					<text class="my-5" style="font-size: 40rpx;color: #000;font-weight: bold;">添加库存</text>
					<u-input v-model="DataList.count" placeholder="请输入库存量" :type="type" :border="true" style="width: 100%;" />
				</view>
				<view class="flex align-center justify-center position-absolute" style="height: 100rpx; border-top: 1px solid rgba(187, 187, 187, 0.2);bottom: 0;width: 100%;">
					<view @click="Cancel" class="flex align-center justify-center" style="width: 50%;border-right: 1px solid rgba(187, 187, 187, 0.2);height: 100%;">
						<text>取消</text>
					</view>
					<view @click="Submit" class="flex align-center justify-center" style="width: 50%;height: 100%;">
						<text style="color: #02BB00;">确定</text>
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			this.id = options.id;
			this.InitData();
		},
		data(){
			return{
				id:'',
				DataList:{},
				showPopup:false,
				count:'',//库存
				type:'number'
			}
		},
		methods:{
			InitData(){
				// 获取商品详情
				let RequrestData = {
					id: this.id
				};
				this.$post(this.$url.Mall.GetSaleInfo, RequrestData,{
					isLoading:false
				}).then(res => {
					console.log(JSON.stringify(res))
					this.DataList = res.data;
				});
			},
			// 编辑上架
			EditOnline(){
				uni.navigateTo({
					url:'/pages/ShopManagement/commodity_online?id='+this.id
				})
			},
			// 添加库存
			AddStock(){
				this.count = '';
				this.showPopup = true;
			},
			// 下架
			Offline(status){
				if(status==0){
					// 下架
					this.$post(this.$url.Mall.UpdateSaleInfo, {
						id:this.id,
						sale_status:1
					},{
						isLoading:false
					}).then(res => {
						this.$refs.uToast.show({
							title: '下架成功',
							type: 'success'
						});
						this.InitData();
					});
				}
				if(status==1){
					// 重新上架
					this.$post(this.$url.Mall.UpdateSaleInfo, {
						id:this.id,
						sale_status:0
					},{
						isLoading:false
					}).then(res => {
						this.$refs.uToast.show({
							title: '上架成功',
							type: 'success'
						});
						this.InitData();
					});
				}
			},
			Cancel(){
				this.showPopup = false;
			},
			Submit(){
				// 确认添加库存
				// 非空校验
				if(this.DataList.count == ''||this.DataList.count==null||this.DataList.count==0){
					this.$refs.uToast.show({
						title: "请输入库存",
						type: "warning",
					});
					return;
				}
				
				// 修改库存
				this.$post(this.$url.Mall.UpdateSaleInfo, {
					id:this.id,
					count:this.DataList.count
				},{
					isLoading:false
				}).then(res => {
					this.showPopup = false;//关闭弹框
					this.$refs.uToast.show({
						title: '库存添加成功',
						type: 'success'
					});
					this.InitData();
				});
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>