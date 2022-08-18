<template>
	<view class="content">
		<!-- 占位 -->
		<view class="place"></view>
		<view class="flex" style="height: 100rpx;background-color: #FFFFFF;">
			<view class="flex align-center pl-2" style="width: 225rpx;height: 100%;">
				<u-icon @click="backPage" name="arrow-left" color="#000000" size="40"></u-icon>
			</view>
			<view class="flex justify-center align-center" style="width: 300rpx;height: 100%;">
				<view class="rounded">
					<text @click="jichu" :class="MenuIndex == 0 ? 'select':'noselect'" style="padding: 10rpx 40rpx;border-radius: 8rpx 0 0 8rpx;font-size: 28rpx;border: 1px solid #FF9900;">基础</text>
					<text @click="zhengwen" :class="MenuIndex == 1 ? 'select':'noselect'" style="padding: 10rpx 40rpx;border-radius: 0 8rpx 8rpx 0;font-size: 28rpx;border: 1px solid #FF9900;">正文</text>
				</view>
			</view>
			<view class="flex align-center justify-end pr-2" style="width: 225rpx;height: 100%;">
				<view class="">
					<u-button type="primary" style="width: 100rpx;height: 60rpx;font-size: 28rpx;">发布</u-button>
				</view>
			</view>
		</view>
		<view v-if="MenuIndex==0" :style="{ height: menuHeight + 'px' }" style="background-color: #F7F7F7;overflow: auto;">
			<view class="bg-white px-3 pt-2">
				<view class="flex flex-column align-center" style="height: 400rpx;">
					<!-- background-image: url(/static/video/demo.jpg);background-size: 100% 100%; -->
					<view class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
						<text style="color: #999;font-size: 28rpx;">选择图片</text>
					</view>
					<text style="color: #2979FF;font-size: 28rpx;" class="mt-2">上传照片</text>
				</view>
				<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;">
						<text style="font-size: 30rpx;color: #101010;">方案名称</text>
					</view>
					<view class="form-input" style="width: 500rpx;">
						<input type="text" style="font-size: 28rpx;color: #777;" placeholder="请输入预算金额" />
					</view>
				</view>
			</view>
			<view class="bg-white px-3 mt-2">
				<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;">
						<text style="font-size: 30rpx;color: #101010;">房产地址</text>
					</view>
					<view class="form-input" style="width: 500rpx;">
						<input type="text" disabled="disabled" style="font-size: 28rpx;color: #777;" placeholder="请选择房产地址" />
					</view>
					<view class="form-icon flex justify-end" style="width: 50rpx;">
						<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
					</view>
				</view>
				<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;">
						<text style="font-size: 30rpx;color: #101010;">楼盘地址</text>
					</view>
					<view class="form-input" style="width: 500rpx;">
						<input type="text" style="font-size: 28rpx;color: #777;" placeholder="请输入楼盘地址" />
					</view>
				</view>
				
				<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;">
						<text style="font-size: 30rpx;color: #101010;">风格偏好</text>
					</view>
					<view class="form-input" style="width: 500rpx;">
						<input type="text" disabled="disabled" style="font-size: 28rpx;color: #777;" placeholder="请选择风格偏好" />
					</view>
					<view class="form-icon flex justify-end" style="width: 50rpx;">
						<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
					</view>
				</view>
				<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;">
						<text style="font-size: 30rpx;color: #101010;">房屋面积</text>
					</view>
					<view class="form-input" style="width: 500rpx;">
						<input type="text" style="font-size: 28rpx;color: #777;" placeholder="请输入房屋面积" />
					</view>
				</view>
				<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;">
						<text style="font-size: 30rpx;color: #101010;">预算金额</text>
					</view>
					<view class="form-input" style="width: 500rpx;">
						<input type="text" style="font-size: 28rpx;color: #777;" placeholder="请输入预算金额" />
					</view>
				</view>
			</view>
		</view>
		<view v-if="MenuIndex==1" :style="{ height: menuHeight + 'px' }" style="background-color: #F7F7F7;overflow: auto;">
			<textarea placeholder="请输入" />
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				menuHeight:0,
				MenuIndex:0
			}
		},
		onShow() {
			// 获取屏幕高度
			let screenHeight = uni.getSystemInfoSync().screenHeight;
			// 获取状态栏高度
			var statusBarHeight = 0;
			statusBarHeight = plus.navigator.getStatusbarHeight();
			try {
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.menuHeight = screenHeight - statusBarHeight - uni.upx2px(100)  - uni.upx2px(62);
				} else {
					this.menuHeight = screenHeight - statusBarHeight - uni.upx2px(100);
				}
			} catch (e) {
				console.log(e);
			}
		},
		onLoad(option) {
			
		},
		methods: {
			backPage(){
				// 返回上一个界面
				uni.navigateBack({
				    delta: 1
				});
			},
			jichu(){
				console.log("基础")
				this.MenuIndex = 0;
			},
			zhengwen(){
				console.log("正文")
				this.MenuIndex = 1;
			}
		}
	}
</script>

<style lang="scss">
	 // page{
		//  background-color: #FFFFFF;
	 // }
	.place {
		height: var(--status-bar-height);
		background-color: #FFFFFF;
	}
	.select{
		color: #FFFFFF;background-color: #FF9900;
	}
	.noselect{
		color: #FF9900;background-color: #FFFFFF;
	}
</style>
