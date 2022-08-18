<template>
	<view class="content">
		<view class="bg-white px-3">
			<!-- <view v-if="DataList.cover == ''" @click="ChangeTheCover"
				class="flex flex-column align-center bg-white py-2">
				<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">上传封面图</text>
			</view>
			<view v-else @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2">
				<view class="" style="background-color: #F7F7F7;" :style="'width: ' + w + 'px;height: ' + h + 'px;'">
					<image @load="loadImage" :src="DataList.cover" style="width: 100%;height: 100%;"></image>
				</view>
				<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">更换封面</text>
			</view> -->

			<!-- <view @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2">
				<view class="" style="background-color: #F7F7F7;" >
					<view class="" style="width: 100%;height: 100%;">
						<text>请上传封面图</text>
					</view>
				</view>
				<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">更换封面</text>
			</view> -->

			<view @click="ChangeTheCover" class="my-1 bg-white p-2" style="height: 350rpx">
				<view v-if="DataList.cover==''" class="flex flex-column justify-center align-center"
					style="width: 100%; height: 100%; background-color: #f7f7f7">
					<text class="iconfont" style="color: #ff9900; font-size: 100rpx">&#xe63b;</text>
					<text class="mt-1">请上传楼盘封面图</text>
				</view>
				<view v-else class="flex flex-column justify-center align-center"
					style="width: 100%; height: 100%; background-color: #f7f7f7">
					<img :src="DataList.cover" style="width: 100%;height: 100%;">
				</view>
			</view>


			<view class="flex justify-between align-center" style="height: 100rpx;">
				<text style="color: #101010; font-size: 28rpx; font-weight: bold">楼盘名称</text>
				<view class="flex align-center">
					<u-input :clearable="false" v-model="CommunityName" type="text" :border="border" input-align="right"
						placeholder="请输入楼盘名称" />
				</view>
			</view>
		</view>
		<view class="mt-2 bg-white px-3">
			<view class="flex flex-column mt-1">
				<view class="flex justify-between align-center " style="
				  height: 100rpx;
				  border-bottom: 1px solid rgba(187, 187, 187, 0.2);
				">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">面 积</text>
					<view class="flex align-center">
						<u-input :clearable="false" v-model="Area" type="number" :border="border" input-align="right"
							placeholder="请输入您的房屋面积" />
						<text class="ml-1" style="font-size: 30rpx; color: #333">㎡</text>
					</view>
				</view>
				<view @click="ShowHouseType" class="flex justify-between align-center" style="height: 100rpx;
			    border-bottom: 1px solid rgba(187, 187, 187, 0.2);
			  ">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">户 型</text>
					<view class="flex align-center">
						<text style="color: #333; font-size: 28rpx">{{
			      HouseType == "" ? "请选择户型" : HouseType
			    }}</text>
						<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
					</view>
				</view>
				<view class="flex justify-between align-center"
					style="height: 100rpx;border-bottom: 1px solid rgba(187, 187, 187, 0.2);">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">房 间</text>
					<view class="flex align-center">
						<u-input :clearable="false" v-model="house_no" type="text" :border="border"
							input-align="right" placeholder="请录入(如:1栋2单元30楼1号)" />
					</view>
				</view>
				<view @click="ShowType" class="flex justify-between align-center" style="height: 100rpx;
				  border-bottom: 1px solid rgba(187, 187, 187, 0.2);
				">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">类 型</text>
					<view class="flex align-center">
						<text style="color: #333; font-size: 28rpx">{{
				    Type == "" ? "请选择" : Type
				  }}</text>
						<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
					</view>
				</view>
				<view @click="showCity" class="flex justify-between align-center" style="
				  height: 100rpx;
				  border-bottom: 1px solid rgba(187, 187, 187, 0.2);
				">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">城 市</text>
					<view class="flex align-center">
						<text style="color: #333; font-size: 28rpx">{{
				   City == "" ? "请选择城市" : City
				  }}</text>
						<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
					</view>
				</view>
				<view @click="skipProjectLocation" class="flex justify-between align-center" style="height: 100rpx;">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">地 址</text>
					<view class="flex align-center">
						<u-input :clearable="false" v-model="address" type="text" :border="border" input-align="right"
							placeholder="请录入房间地址" />
					</view>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-center" style="height: 150rpx">
			<u-button @click="Submit" type="warning" style="width: 640rpx; height: 80rpx; font-size: 26rpx">保存房产
			</u-button>
		</view>
		<u-picker mode="region" :params="params" v-model="show" @confirm="confirm"></u-picker>
		<!-- 户型 -->
		<u-select v-model="showSelect" mode="single-column" :list="HouseList" @confirm="HouseTypeConfirm"></u-select>
		<!-- 类型 -->
		<u-select v-model="showType" mode="single-column" :list="TypeList" @confirm="TypeConfirm"></u-select>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		onLoad(options) {
			if(options.id == undefined){
				// console.log('新增')
				uni.setNavigationBarTitle({
					title: "新增房产"
				});
			}else{
				// console.log('修改')
				uni.setNavigationBarTitle({
					title: "修改房产"
				});
				this.isEdit = true;
				this.$post(this.$url.User.GetHouse, {
					id: options.id
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						// id: "", //id
						// photos:this.photo_upload,//封面图
						// estate_title: this.CommunityName, //楼盘名称
						// house_area: this.Area, //面积
						// house_catalog: this.house_catalog, //户型
						// house_no: this.house_no, //房屋编号
						// estate_catalog: this.estate_catalog, //楼盘类型
						// province: this.province_code, //省份编码
						// city: this.city_code, //城市编码
						// address: this.address //地址
						this.id = res.data.id;
						// 封面图
						this.DataList.cover =  res.data.photos;
						// 楼盘名称
						this.CommunityName = res.data.estate;
						// 面积
						this.Area = res.data.house_area;
						// 户型
						this.house_catalog = res.data.house_catalog;
						this.HouseType = res.data.house_catalog_text;
						
						// 房间号
						this.house_no = res.data.house_no;
						// 类型
						this.estate_catalog = res.data.estate_catalog;
						this.Type = res.data.estate_catalog_text;
						
						// 城市
						this.city_code = res.data.city;
						this.City = res.data.area;
						this.province_code = res.data.province;
						this.address = res.data.address;
						
						
					}
				})
				
			}
			
		},
		onShow() {
			this.GetDataDictionary();
		},
		data() {
			return {
				id:'',
				isEdit:false,
				photos:[],
				photo_upload:'',
				address: '',
				DecorationType: 1, //装修类型 1表示新房装修、2表示房屋改造 默认选中第一个
				showSelect: false,
				showType: false,
				cover: "",
				HouseList: [], //楼盘类型
				TypeList: [], //类型
				City: "",
				CityCode: "",
				province_code:'',//上传需要
				city_code:'',//上传需要
				Area: "",
				CommunityName: "",//楼盘名称
				HouseType: "",
				house_no:'',//房间号
				house_catalog:'',//上传需要
				Type: "",
				estate_catalog:'',//上传需要
				border: false,
				show: false,
				params: {
					province: true,
					city: true,
					area: false,
				},
				w: 0,
				h: 0,
				disabled: false,
				btnWidth: 180,
				DataList: {
					cover: "",
					"ProjectLocation": "" //项目位置
				}

			};
		},
		methods: {
			ChangeTheCover() {
				// 跳转到图片裁剪界面
				// uni.navigateTo({
				// 	url: '/uview-ui/components/u-avatar-cropper/upload-cover-image?img=' + this.cover
				// })
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						// console.log(JSON.stringify(res.tempFilePaths));
						this.DataList.cover = res.tempFilePaths[0];
						//调用图片上传
						this.photos.push(res.tempFilePaths[0]);
						this.ImgUpload();
					}
				});
			},
			ImgUpload(){
				var uploads = [];
				for (let k = 0; k < this.photos.length; k++) {
					let imgSrc = this.photos[k];
					let pos = imgSrc.lastIndexOf('.');
					let filename = imgSrc.substring(0, pos); // 文件名
					let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					if (day < 10) {
						day = '0' + day;
					}
					if (month < 10) {
						month = '0' + month;
					}
					var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
					var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				
				Promise.all(uploads).then(response => {
					console.log(JSON.stringify(response));//上传成功的路径
					response.forEach(item=>{
						console.log(item)
						let imgTemp = item.split('.cn')[1];
						if(this.photo_upload == ''){
							this.photo_upload = imgTemp;
						}else{
							this.photo_upload = this.photo_upload+'|'+imgTemp;
						}
					})
					
				});
				
			},
			// 获取数据字典
			GetDataDictionary() {
				this.HouseList = [];
				this.TypeList = [];
				// 获取户型
				this.$post(this.$url.Public.GetDicts, {
					key: 'house_catalog'
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						res.data.forEach(item => {
							let house = {
								value: item.key,
								label: item.value
							}
							this.HouseList.push(house)
						})
					}
				})
				// 获取楼盘类型
				this.$post(this.$url.Public.GetDicts, {
					key: 'estate_catalog'
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						res.data.forEach(titem => {
							let type = {
								value: titem.key,
								label: titem.value
							}
							this.TypeList.push(type)
						})
					}
				})
			},
			loadImage(e) {
				// 拿到图片的宽高
				let w = e.detail.width;
				let h = e.detail.height;
				// 最大宽度 px
				let maxW = uni.upx2px(500);
				// 最大高度 px
				let maxH = uni.upx2px(350);
				if (h <= maxH) {
					// 用原来的宽高
					this.w = w <= maxW ? w : maxW;
					this.h = h;
					return;
				}
				this.h = maxH;
				let w2 = maxH * (w / h);
				this.w = w2 <= maxW ? w2 : maxW;
			},
			// 跳转到项目位置界面
			skipProjectLocation() {
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/NewPropertys/ProjectLocation?title="fdsafdsafds"'
				});
			},
			// 选择小区
			ResidentialQuarters() {
				console.log("选择小区");
				// 跳转到小区列表
				uni.navigateTo({
					url: "/pages/tabBar/settle/CellList",
				});
			},
			ShowHouseType() {
				this.showSelect = true;
			},
			ShowType() {
				this.showType = true;
			},
			HouseTypeConfirm(e) {
				this.HouseType = e[0].label
				this.house_catalog = e[0].value
			},
			TypeConfirm(e) {
				this.Type = e[0].label
				this.estate_catalog = e[0].value
			},
			//显示城市选择下拉框【省、市】
			showCity() {
				this.show = true;
			},
			confirm(e) {
				this.City = e.province.label + "-" + e.city.label;
				this.province_code = e.province.value;
				this.city_code = e.city.value;
			},
			// 跳转到计算结果界面
			Submit() {
				// 非空校验
				if(this.DataList.cover == ''){
					this.$refs.uToast.show({
						title: "请上传封面图",
						type: "warning",
					});
					return;
				}
				if(this.CommunityName == ''){
					this.$refs.uToast.show({
						title: "请输入楼盘名称",
						type: "warning",
					});
					return;
				}
				if(this.Area == ''){
					this.$refs.uToast.show({
						title: "请输入房屋面积",
						type: "warning",
					});
					return;
				}
				if(this.house_catalog == ''){
					this.$refs.uToast.show({
						title: "请选择户型",
						type: "warning",
					});
					return;
				}
				if(this.house_no == ''){
					this.$refs.uToast.show({
						title: "请填写房间号",
						type: "warning",
					});
					return;
				}
				if(this.estate_catalog == ''){
					this.$refs.uToast.show({
						title: "请选择楼盘类型",
						type: "warning",
					});
					return;
				}
				if(this.city_code == ''){
					this.$refs.uToast.show({
						title: "请选择城市",
						type: "warning",
					});
					return;
				}
				if(this.address == ''){
					this.$refs.uToast.show({
						title: "请录入地址",
						type: "warning",
					});
					return;
				}
				let requestData = {
					id: this.id, //id
					photos:this.photo_upload,//封面图
					estate_title: this.CommunityName, //楼盘名称
					house_area: this.Area, //面积
					house_catalog: this.house_catalog, //户型
					house_no: this.house_no, //房屋编号
					estate_catalog: this.estate_catalog, //楼盘类型
					province: this.province_code, //省份编码
					city: this.city_code, //城市编码
					address: this.address //地址
				}
				console.log(JSON.stringify(requestData))
				// 提交接口
				let TipsText = '新增';
				if(this.isEdit){
					TipsText = '修改'
				}
				// 新增我的房产
				this.$post(this.$url.User.SaveHouse, requestData,{
					isLoading:true,
					loadingTitle:`${TipsText}中...`
				}).then(res => {
					// console.log(123)
					if(res.code == 200 && res.status==0){
						this.$refs.uToast.show({
							title: `${TipsText}成功`,
							type: 'success'
						});
						setTimeout(()=>{
							// 两秒之后返回上一个界面
							uni.navigateBack({
								delta: 1
							});
						},2000)
					}
				});

				// var _self = this;
				// if (_self.City == "") {
				// 	_self.$refs.uToast.show({
				// 		title: "请选择城市!",
				// 		type: "warning",
				// 	});
				// 	return;
				// }

				// if (_self.CommunityName == "") {
				// 	_self.$refs.uToast.show({
				// 		title: "请输入小区!",
				// 		type: "warning",
				// 	});
				// 	return;
				// }

				// if (_self.HouseType == "") {
				// 	_self.$refs.uToast.show({
				// 		title: "请选择户型!",
				// 		type: "warning",
				// 	});
				// 	return;
				// }

				// if (_self.Area == "") {
				// 	_self.$refs.uToast.show({
				// 		title: "请输入面积!",
				// 		type: "warning",
				// 	});
				// 	return;
				// }
				// if (_self.DataList.cover == "") {
				// 	_this.$refs.uToast.show({
				// 		title: "请设置封面!",
				// 		type: "warning",
				// 	});
				// 	return;
				// }
				// if (_self.DataList.ProjectLocation.address == "") {
				// 	_this.$refs.uToast.show({
				// 		title: "请选择地址!",
				// 		type: "warning",
				// 	});
				// 	return;
				// }
				// var ProductList = _self.AJB.BizUrl + "api/House/CreateHouse";
				// var ProductListDatas = {
				// 	CityName: _self.City,
				// 	CityCode: _self.CityCode,
				// 	HouseType: _self.HouseType,
				// 	Area: _self.Area,
				// 	cover: _self.DataList.cover,
				// 	address: _self.DataList.ProjectLocation.address,
				// 	longitude: _self.DataList.ProjectLocation.longitude,
				// 	latitude: _self.DataList.ProjectLocation.latitude,
				// 	CommunityName: _self.CommunityName
				// };
				// _self.AJB.UniAjax(ProductList, ProductListDatas)
				// 	.then((res) => {
				// 		console.log(JSON.stringify(res));
				// 		if (res.code == 200) {
				// 			uni.navigateTo({
				// 				url: '/pages/tabBar/my/Index/HouseProperty'
				// 			});
				// 		}
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
			},
		},
	};
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.Selection {
		border: 1px solid #ff9900;
		background-color: #fff8f1;
		color: #ff9900;
	}

	.NoSelection {
		border: 1px solid rgba(187, 187, 187, 0.6);
		background-color: #ffffff;
		color: rgba(187, 187, 187, 0.6);
	}
</style>
