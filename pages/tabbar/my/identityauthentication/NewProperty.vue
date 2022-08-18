<template>
	<view class="content">
		<view class="content p-2">
			<view class="flex p-2 justify-between bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">房产名称</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" style="font-size: 28rpx;color: #777;" v-model="DataList.PropertyName" placeholder="请输房产名称" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;"></text>
				</view>
			</view>
			<view class="flex p-2 justify-between bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">房产价格</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="number" style="font-size: 28rpx;color: #777;" v-model="DataList.originalPrice" placeholder="请输入房产价格" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;">万元</text>
				</view>
			</view>
			<view @click="skipSetOfRealEstateDrawings" class="flex p-2 justify-between bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column">
					<view class="flex align-center">
						<text style="font-size: 30rpx;font-weight: bold;color: #000000;">楼盘套图</text>
						<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
					</view>
					<view class="flex" style="width: 600rpx;"><text style="color: #979797;font-size: 26rpx;" class="LineBreak1">第一张图片将作为封面展示(最多9张)</text></view>
				</view>
				<view class="flex"><u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon></view>
			</view>
			<view @click="skipProjectLocation" class="flex p-2 justify-between bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column">
					<view class="flex align-center">
						<text style="font-size: 30rpx;font-weight: bold;color: #000000;">项目位置</text>
						<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
					</view>
					<view class="flex" style="width: 600rpx;">
						<view v-if="DataList.ProjectLocation.address!=''">
							<text style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.ProjectLocation.address}}</text>
						</view>
							<view v-else>
								<text style="color: #979797;font-size: 26rpx;" class="LineBreak1">录入该项目所在位置</text>
							</view>
						
						</view>
				</view>
				<view class="flex"><u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon></view>
			</view>

			<view class="flex align-center bg-white px-2 py-3 mt-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 30rpx;font-weight: bold;color: #000000;">空间</text>
				<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				<!-- <text style="color: #979797;font-size: 26rpx;" class="ml-3">添加的图片总数不少于6张</text> -->
			</view>

			<u-swipe-action
				:show="item.show"
				:index="index"
				v-for="(item, index) in DataList.space"
				:key="item.id"
				@click="click"
				@open="open"
				@content-click="skipSpaceDetails(item, index)"
				:options="options"
			>
				<view class="item u-border-bottom">
					<view class="flex justify-between align-center">
						<view class="flex flex-column" style="width: 500rpx;">
							<text style="font-size: 30rpx;font-weight: bold;color: #000000;">{{ item.name }}</text>
							<text style="color: #979797;font-size: 26rpx;">{{ item.number }}张</text>
						</view>
						<view class="flex justify-end" style="width: 170rpx;"><u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon></view>
					</view>
				</view>
			</u-swipe-action>

			<view @click="AddSpace" class="flex bg-white align-center justify-center mt-4 py-3" style="color: #2979ff;">
				<u-icon name="plus" color="#2979ff" size="28"></u-icon>
				<text style="font-size: 28rpx;" class="ml-1">添加空间</text>
			</view>
			<!-- 模态框 -->
			<u-modal @confirm="confirm" v-model="show" title="添加空间" :title-style="{ color: '#101010' }" :show-cancel-button="true">
				<view class="flex py-2 px-4"><text style="color: #888;font-size: 28rpx;">请输入空间名称</text></view>
				<view class="flex px-4 py-4">
					<input maxlength="5" style="border-bottom: 2px solid #FF9900;width: 100%;color: #888;font-size: 32rpx;" type="text" v-model="spaceName" placeholder="限填5字" />
				</view>
			</u-modal>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	onNavigationBarButtonTap: function(val) {
		// 发布
		if (val.index == 0) {
			console.log(this.DataList)
			var RequrestUrl =
				this.AJB.BizUrl + "api/HouseInfo/CreateMyCase";
			var RequrestDatas = this.DataList;
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					if (res.code == 200) {
						console.log("add ok");
						uni.navigateBack({
							delta: 1,
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		// 保存到草稿箱
		if (val.index == 1) {
			console.log('保存到草稿箱');
		}
	},
	data() {
		return {
			disabled: false,
			btnWidth: 180,
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			current: 0,
			swiperHeight: 0,
			show: false, //显示添加空间的模态框
			DataList: {
				"id":0,
				typeid:0,
				"PropertyName": "",//楼盘名称
				"originalPrice":"",
				"SetOfRealEstateDrawings": "",//楼盘套图
				"ProjectLocation": {
					"address": "",
					"longitude": 0,
					"latitude": 0
				},//项目位置
				"space": [{
						id: 1,
						show: false,
						"name": "户型图",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 2,
						show: false,
						"name": "玄关",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 3,
						show: false,
						"name": "客厅",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 4,
						show: false,
						"name": "厨房",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 5,
						show: false,
						"name": "餐厅",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 6,
						show: false,
						"name": "卫生间",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 7,
						show: false,
						"name": "卧室",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 8,
						show: false,
						"name": "阳台",
						"number": 0,
						"spaceDetails": []
					},
					{
						id: 9,
						show: false,
						"name": "走廊",
						"number": 0,
						"spaceDetails": []
					}

				]
			}, //Mock数据
			spaceName: '' //空间名称
		};
	},
	methods: {
		// 空间内容点击事件
		ContentClick(item) {
			console.log(JSON.stringify(item));
		},
		//删除按钮点击事件
		click(index) {
			this.DataList.space.splice(index, 1);
		},
		// 滑动第二个的时候关闭第一个的菜单
		open(index) {
			this.DataList.space[index].show = true;
			this.DataList.space.map((val, idx) => {
				if (index != idx) this.DataList.space[idx].show = false;
			});
		},
		subsectionchange(e) {
			this.current = e;
		},
		AddSpace() {
			this.spaceName = ''; //清空输入内容
			this.show = true;
		},
		confirm() {
			console.log(this.spaceName);
			if (this.spaceName == '') {
				this.$refs.uToast.show({
					title: '请输入空间名称',
					type: 'warning'
				});
				this.show = true;
				return;
			}
			var spaceData = {
				id: this.DataList.space.length + 1,
				show: false,
				name: this.spaceName,
				number: 0,
				spaceDetails: []
			};
			// console.log(spaceData.id);
			this.DataList.space.push(spaceData);
		},
		// 跳转到空间详情
		skipSpaceDetails(item, index) {
			uni.removeStorageSync('ShowSpaceDetaile');
			// 同步缓存
			uni.setStorage({
				key: 'ShowSpaceDetaile',
				data: item,
				success: function() {
					console.log('success');
				}
			});
			uni.navigateTo({
				url: '/pages/tabBar/message/NavMenu/SpaceDetails?index=' + index
			});
		},
		// 跳转到楼盘名称界面
		skipPropertyName() {
			uni.navigateTo({
				url: '/pages/tabBar/my/identityauthentication/NewPropertys/PropertyName?title='+this.DataList.PropertyName
			});
		},
		// 跳转到楼盘价格界面
		skipRealEstatePrice() {
			uni.navigateTo({
				url: '/pages/tabBar/my/identityauthentication/NewPropertys/RealEstatePrice?RealEstatePrice='+ JSON.stringify(this.DataList.RealEstatePrice)
			});
		},
		// 跳转到楼盘套图界面
		skipSetOfRealEstateDrawings() {
			uni.navigateTo({
				url: '/pages/tabBar/my/identityauthentication/NewPropertys/SetOfRealEstateDrawings?title='+this.DataList.SetOfRealEstateDrawings
			});
		},
		// 跳转到项目位置界面
		skipProjectLocation() {
			uni.navigateTo({
				url: '/pages/tabBar/my/identityauthentication/NewPropertys/ProjectLocation?title='+this.DataList.ProjectLocation
			});
		}
	}
};
</script>

<style lang="scss">
.LineBreak1 {
	white-space: initial;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	/*超出3行部分显示省略号，去掉该属性 显示全部*/
	-webkit-box-orient: vertical;
	line-height: 35rpx;
}

.selectColor {
	color: #ff9900;
	border-bottom: 1px solid #ff9900;
}
.noselectColor {
	color: #000;
	border-bottom: 1px solid #ffffff;
}

.item {
	display: flex;
	padding: 20rpx;
}

image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	margin-right: 20rpx;
	border-radius: 12rpx;
}

.title {
	text-align: left;
	font-size: 28rpx;
	color: $u-content-color;
	margin-top: 20rpx;
}
</style>
