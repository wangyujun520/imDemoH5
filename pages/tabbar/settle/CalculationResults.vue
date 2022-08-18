<template>
	<view class="content">
		
		<view v-if="DataList.length > 0" class="bg-white position-fixed" style="height: 130rpx;top: 0;width: 750rpx;z-index: 999;">
			<view class="flex align-center justify-between px-2" style="width: 100%;height: 100%;">
				<view v-for="(item,index) in DataList" :key="index" @click="SelectWork(index)"
					class="flex flex-column bg-white rounded align-center" style="padding: 10rpx 20rpx;"
					:class="index == DecorationType ? 'Selection' : 'NoSelection'">
					<text style="font-size: 26rpx;"
						:class="index == DecorationType ? 'SelectionColor' : 'NoSelectionColor'">{{item.title}}</text>
					<text style="font-size: 22rpx;color: #888;">{{item.sub_title}}</text>
				</view>
			</view>
		</view>

		<view v-if="DataList.length > 0" class="position-relative" style="margin-top: 130rpx;">
			<view class="bg-danger" style="height: 350rpx;">
				<image
					src="http://oss.anjubang.cn/20220622233032.png"
					style="width: 100%;height: 100%;"></image>
			</view>
			<view class="position-absolute flex justify-center align-end" style="top: 0;height: 450rpx;width: 750rpx;">
				<view class="bg-white rounded flex justify-center align-center flex-column"
					style="height: 350rpx;width: 670rpx;border: 1px solid rgba(187,187,187,0.2);">
					<!-- <text style="color: #02B1BE;font-size: 80rpx;font-weight: bold;">6.15万</text> -->
					<text style="color: #02B1BE;font-size: 80rpx;font-weight: bold;">{{DataList[DecorationType].money_text||'暂无报价'}}</text>
					<text style="color: #888;font-size: 26rpx;">{{DataList[DecorationType].address}} | {{DataList[DecorationType].area}}</text>
					<view class="flex align-center mt-2">
						<text style="color: #FF9900;font-size: 30rpx;">{{DataList[DecorationType].catalog_text}}</text>
						<text style="color: #888;font-size: 30rpx;">装修估价结果（不含主材）</text>
					</view>
				</view>
			</view>
			<view class="px-4 pt-2" style="margin-top: 100rpx;">
				<view class="flex align-center">
					<u-icon name="info-circle" color="#ff9900" size="28"></u-icon>
					<text style="color: #888;font-size: 26rpx;">估算结果建议20%浮动参考</text>
				</view>
				<view class="flex align-center justify-center" style="height: 100rpx;">
					<text style="color: #888;font-size: 26rpx;">- {{DataList[DecorationType].cityName}}工人及材料参考均价 -</text>
				</view>
				<view class="flex flex-column p-5 rounded" style="background-color: #F7F7F7;">
					<text class="mb-2" style="color: #000000;font-size: 30rpx;font-weight: bold;">施工行价参考(单项总均价）</text>
					<view class="flex justify-between" v-for="(witem,windex) in DataList[DecorationType].workers">
						<text style="color: #888;font-size: 24rpx;">{{witem.lable}}</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{witem.value}}</text>
					</view>
					<!-- <view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">水电施工</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].sdsg}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">泥瓦施工</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].nwsg}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">木作施工</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].mzsg}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">墙顶饰面基础施工</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].qdsmsg}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">保洁施工</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].bjsg}}</text>
					</view> -->
				</view>
				<view class="flex flex-column p-5 mt-3 rounded" style="background-color: #F7F7F7;">
					<text class="mb-2" style="color: #000000;font-size: 30rpx;font-weight: bold;">主要辅材供应参考价</text>
					<view class="flex justify-between" v-for="(mitem,mindex) in DataList[DecorationType].materials">
						<text style="color: #888;font-size: 24rpx;">{{mitem.lable}}</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{mitem.value}}</text>
					</view>
					<!-- <view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">沙土</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].st}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">回填渣土</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].htzt}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">木工板材</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].mgbc}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">石膏饰面板</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].sgsmb}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">水电材料</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].sdcl}}</text>
					</view>
					<view class="flex justify-between">
						<text style="color: #888;font-size: 24rpx;">墙顶饰面基础材料</text>
						<text style="color: #FF9900;font-size: 24rpx;">{{DataList[DecorationType].qdsmcl}}</text>
					</view> -->
				</view>
			</view>

			<view class="flex align-center justify-center" style="height: 150rpx;">
				<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">我要精准报价
				</u-button>
			</view>

			<!-- 占位 -->
			<view style="height: 100rpx;"></view>

		</view>

		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无报价" mode="list"></u-empty>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				DecorationType: 0, //装修类型 0表示基础装修、1表示轻奢装修、2表示精品装修、3表示豪华装修 默认选中第一个
				// TopMenu:[{
				// 	"title":"基础装修",
				// 	"describe":"不含主材"
				// },
				// {
				// 	"title":"轻奢装修",
				// 	"describe":"全包估价"
				// },
				// {
				// 	"title":"精品装修",
				// 	"describe":"全包估价"
				// },
				// {
				// 	"title":"豪华装修",
				// 	"describe":"全包估价"
				// }],
				TopMenu: [],
				area: '',
				cityCode: '',
				cityName: '',
				type: '',
				DataList: [] //Mock数据
			}
		},
		onLoad(options) {
			this.$post(this.$url.Estate.GetDesignPrice, JSON.parse(decodeURIComponent(options.datas)), {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data;
				}
			})
		},
		methods: {
			// 菜单切换
			SelectWork(type) {
				// console.log(type);
				this.DecorationType = type;
				console.log("菜单切换")
			},
			// 精准报价
			Submit() {
				console.log("精准报价")
				// 跳转到设计师界面
				uni.navigateTo({
					url: '/pages/tabbar/settle/style-test/Designer'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.Selection {
		background-color: #FFF8F1;
	}

	.NoSelection {
		background-color: #F7F7F7;
	}

	.SelectionColor {
		color: #FF9900;
	}

	.NoSelectionColor {
		color: #000000;
	}
</style>
