<template>
	<view class="content">
		<!-- 输入文字内容 -->
		<view class="flex px-2 pt-2 bg-white">
			<textarea style="width: 100%; font-size: 28rpx" value="" placeholder="用文字记录您的装修过程"
				v-model="DataList.content" />
		</view>

		<upload-imgs @upload="upload"></upload-imgs>
		<!-- 所在位置 -->
		<!-- <choose-map @changes="mapClick"></choose-map> -->
		<!-- 选择按钮 -->
		<view class="flex justify-between align-center px-3 py-2 bg-white mt-2">
			<text style="width: 200rpx;">发布栏目</text>
			<view class="flex">
				<u-radio-group v-model="CatalogValue" @change="radioGroupChange">
					<u-radio v-for="(item, index) in Catalog" :key="item.id" :name="item.id">
						{{item.title}}
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<!-- 管理商品 -->
		<view class="flex px-3" style="margin-top: 30rpx">
			<u-button type="warning" style="width: 100%; height: 100rpx" @click="submit">发布</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import uploadImgs from '@/components/push-img/get-imgs.vue';
	import chooseMap from '@/components/choose-map/choose-map.vue';
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		components: {
			uploadImgs,
			chooseMap
		},
		data() {
			return {
				photos: [], //图片数组
				DataList: {
					type: '2', //发布类型；发布类型；1=纯文字、2=图+文、3=视频+文、4=链接+文字、5=商品+文字
					content: '',
					catalog_id: '',
					files: '',
					lng: '',
					lat: '',
					address: ''
				},
				// 单选
				Catalog: [],
				CatalogValue: ''
			};
		},
		onLoad(options) {
			// 获取施工类型
			this.$post(this.$url.Work.GetWorkCatalog, {
				id: options.id
			}, {
				isLoading: true
			}).then(res => {
				this.Catalog = res.data;
				
				// this.Catalog = [
				// 	{
				// 	    "id": "021da851-b7d7-4a21-ad22-0de38b01ed71",
				// 	    "title": "水电预埋及铺设"
				// 	},
				// 	{
				// 	    "id": "021da851-b7d7-4a21-ad22-0de38b01ed72",
				// 	    "title": "水电预埋及铺设2"
				// 	}
				// ]
			});
		},
		// onLoad() {
		// 	// 获取我的发布菜单权限
		// 	this.$post(this.$url.Discover.GetMyCatalogs, {},{
		// 	isLoading:true
		// }).then(res => {
		// 		console.log(JSON.stringify(res))
		// 		this.Catalog = res.data;
		// 		if(this.Catalog.length>0){
		// 			this.CatalogValue = res.data[0].id;
		// 			this.DataList.catalog_id = res.data[0].id;
		// 		}
		// 	});
		// },
		methods: {
			upload(arr) {
				// console.log(arr)
				this.photos = arr;
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				this.DataList.catalog_id = e;
			},
			mapClick(item) {
				console.log(JSON.stringify(item));
				console.log(item.address);
				this.DataList.lng = item.longitude;
				this.DataList.lat = item.latitude;
				this.DataList.address = item.address;
			},
			skipProductsConcern() {
				// 跳转到我关注的商品页面
				uni.navigateTo({
					url: '/pages/tabBar/find/ProductsConcern'
				});
			},
			submit() {
				// 非空验证
				if (this.DataList.content == ''&&this.photos.length == 0) {
					this.$refs.uToast.show({
						title: '请至少输入一个内容',
						type: 'warning'
					});
					return;
				}
				// if (this.photos.length == 0) {
				// 	this.$refs.uToast.show({
				// 		title: '请上传图片',
				// 		type: 'warning'
				// 	});
				// 	return;
				// }
				if (this.DataList.catalog_id == '') {
					this.$refs.uToast.show({
						title: '请选择栏目',
						type: 'warning'
					});
					return;
				}

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
					var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' +
					extendName; //202003021583151162210.jpg
					var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}

				Promise.all(uploads).then(response => {
					console.log(JSON.stringify(response)); //上传成功的路径
					response.forEach(item => {
						console.log(item)
						let imgTemp = item.split('.cn')[1];
						if (this.DataList.files == '') {
							this.DataList.files = imgTemp;
						} else {
							this.DataList.files = this.DataList.files + '|' + imgTemp;
						}
					})
					console.log(this.DataList.files)
					console.log(JSON.stringify(this.DataList));
					// 发布内容

					let requestData = {
						catalog_id: this.DataList.catalog_id,//分类id
						content: this.DataList.content, //施工内容
						photos: this.DataList.files //施工图片内容
					}

					this.$post(this.$url.Work.PostWorkLog, requestData, {
						isLoading: false
					}).then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 200) {
							// 发布成功
							// uni.showToast({
							// 	title: '发布成功',
							// 	icon: 'success',
							// 	duration: 2000
							// })
							this.$refs.uToast.show({
								title: '发布成功',
								type: 'success'
							});
							setTimeout(() => {
								// 两秒之后返回上一个界面
								uni.navigateBack({
									delta: 1
								});
							}, 2000);
						}
					});


				});

			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.LineBreak {
		white-space: initial;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
		line-height: 30rpx;
	}

	.tab-scroll-view {
		width: 750rpx;
		flex-direction: row;
		white-space: nowrap;

		.tab-item {
			display: inline-block;
			width: 500rpx;
			height: 130rpx;
		}
	}

	/deep/.uni-scroll-view ::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
</style>
