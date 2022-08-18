<!-- <template>
	<view class="content">
		
		<view class="flex px-2 pt-2 bg-white"><textarea style="width: 100%; font-size: 28rpx" value="" placeholder="用文字记录您的装修过程" v-model="DataList.content" /></view>
		
		<view v-if="DataList.video == ''" @click="UploadVideo" class="my-1 bg-white p-2" style="height: 350rpx">
			<view class="flex flex-column justify-center align-center" style="width: 100%; height: 100%; background-color: #f7f7f7">
				<text class="iconfont" style="color: #ff9900; font-size: 100rpx">&#xe6f9;</text>
				<text>上传视频</text>
			</view>
		</view>

		<view
			v-else
			class="my-1 bg-white"
			style="height: 350rpx;background-size: 100% 100%;"
			:style="{ backgroundImage: 'url(' + DataList.video + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto' + ')' }"
		>
			<view class="flex justify-center align-center position-relative" style="width: 100%;height: 100%;background-color: rgba(0,0,0,0.3);">
				<text @click="openVideo(DataList.video)" class="iconfont text-white" style="font-size: 120rpx;">&#xe99a;</text>
				<text
					@click="delVideo"
					class="iconfont position-absolute"
					style="font-size: 30rpx;font-weight: bold;top: 0rpx;right: 0rpx;padding: 10rpx;color: #FF9900;background-color: rgba(255,255,255,0.5);"
				>
					&#xe6a6;
				</text>
			</view>
		</view>

		<choose-map @changes="mapClick"></choose-map>
		
		<view class="flex p-2" style="margin-top: 40rpx"><u-button type="warning" style="width: 100%; height: 100rpx" @click="submit">发布</u-button></view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import chooseMap from '@/components/choose-map/choose-map.vue';
import OssUpload from '@/utils/UploadOss/OssUpload.js';
export default {
	components: {
		chooseMap
	},
	data() {
		return {
			DataList: {
				// video: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/Anjubang/2021/01/202101221611306959902.mp4",
				video: '',
				managingGoods: ''
			} //Mock数据
		};
	},
	onReady() {
		var DataLists = {
			code: 200,
			msg: 'ok',
			dataList: {
				managingGoods: [
					{
						id: '1',
						productPicture: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1612030099,2558624907&fm=26&gp=0.jpg',
						content: '蛋糕是一种古老的西点，一般是由烤箱制作的，蛋糕是用鸡蛋、白糖、小麦粉为主要原料。',
						price: '199'
					},
					{
						id: '2',
						productPicture: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=325584354,2065173771&fm=26&gp=0.jpg',
						content: '玫瑰花一般指玫瑰。玫瑰（学名：Rosa rugosa Thunb.）：原产地中国。属蔷薇目，蔷薇科落叶灌木，枝杆多针刺，奇数羽状复叶，小叶5-9片，椭圆形，有边刺。',
						price: '520'
					},
					{
						id: '3',
						productPicture: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2535925320,3873381533&fm=26&gp=0.jpg',
						content:
							'机械键盘（英文：Mechanical Keyboard）是一种键盘的类型，从结构来说，机械键盘的每一颗按键都有一个单独的开关来控制闭合，这个开关也被称为“轴”，依照微动开关的分类，机械键盘可分为传统的茶轴、青轴、白轴、黑轴、红轴以及Romer-G和光轴。',
						price: '899'
					}
				]
			}
		};
		// this.DataList.managingGoods = DataLists.dataList.managingGoods;
	},
	methods: {
		// 打开视频预览
		openVideo(url) {
			// 跳转页面
			uni.navigateTo({
				url: '/pages/chat/video/video?url=' + url
			});
		},
		delVideo() {
			this.DataList.video = ''; //清空
		},
		mapClick(item) {
			console.log(JSON.stringify(item));
			console.log(item.address);
			this.DataList.longitude = item.longitude;
			this.DataList.latitude = item.latitude;
			this.DataList.address = item.address;
		},
		UploadVideo() {
			// console.log("上传视频");
			var _self = this;
			uni.chooseVideo({
				count: 1,
				maxDuration: 15, //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
				sourceType: ['camera', 'album'],
				success: function(res) {
					console.log(JSON.stringify(res));
					console.log(res.tempFilePath);
					let videoSrc = res.tempFilePath;

					let pos = videoSrc.lastIndexOf('.');
					let filename = videoSrc.substring(0, pos); // 文件名
					let extendName = videoSrc.substring(pos + 1).toLowerCase(); // 扩展名
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
					var FileName = year + '' + month + '' + day + '' + new Date().getTime() + '.' + extendName; //202003021583151162210.mp4
					var fuleFileName = 'Anjubang' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					//视频上传阿里云
					var SuccessUrlVideo = OssUpload.videoUploadBack('video', videoSrc, fuleFileName);
					SuccessUrlVideo.then(response => {
						console.log(response); //上传成功的回调
						_self.DataList.video = response;
					});
				}
			});
		},
		submit() {
			console.log(this.DataList.content);
			console.log(this.DataList.video);
			// 非空验证
			if (this.DataList.content == '' || this.DataList.content == undefined) {
				this.$refs.uToast.show({
					title: '请输入装修过程',
					type: 'warning'
				});
				return;
			}
			if (this.DataList.video == '' || this.DataList.video == undefined) {
				this.$refs.uToast.show({
					title: '请上传视频',
					type: 'warning'
				});
				return;
			}

			// var RequrestUrl = this.AJB.BizUrl + 'api/Communication/AddVideoCommunication';
			// var RequrestDatas = this.DataList;
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then(res => {
			// 		if (res.code == 200) {
			// 			console.log('add ok');
			// 			uni.navigateBack({
			// 				delta: 1
			// 			});
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 	});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
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
 -->
 
 <template>
 	<view class="content">
 		<!-- 输入文字内容 -->
 		<view class="flex px-2 pt-2 bg-white">
 			<textarea style="width: 100%; font-size: 28rpx" value="" placeholder="发布你的想法..." v-model="DataList.content" />
 		</view>
		
		<view v-if="video == ''" @click="UploadVideo" class="my-1 bg-white p-2" style="height: 350rpx">
			<view class="flex flex-column justify-center align-center" style="width: 100%; height: 100%; background-color: #f7f7f7">
				<text class="iconfont" style="color: #ff9900; font-size: 100rpx">&#xe6f9;</text>
				<text>上传视频</text>
			</view>
		</view>
		
		<view
			v-else
			class="my-1 bg-white"
			style="height: 350rpx;background-size: 100% 100%;"
			:style="{ backgroundImage: 'url(' + video + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto' + ')' }"
		>
			<view class="flex justify-center align-center position-relative" style="width: 100%;height: 100%;background-color: rgba(0,0,0,0.3);">
				<text @click="openVideo(video)" class="iconfont text-white" style="font-size: 120rpx;">&#xe99a;</text>
				<text
					@click="delVideo"
					class="iconfont position-absolute"
					style="font-size: 30rpx;font-weight: bold;top: 0rpx;right: 0rpx;padding: 10rpx;color: #FF9900;background-color: rgba(255,255,255,0.5);"
				>
					&#xe6a6;
				</text>
			</view>
		</view>
		
 		<!-- 所在位置 -->
 		<choose-map @changes="mapClick"></choose-map>
 		<!-- 选择按钮 -->
 		<view class="flex justify-between px-3 py-2 bg-white mt-2" v-if="Catalog.length>1">
 			<text>发布栏目</text>
 			<view class="flex">
 				<u-radio-group v-model="CatalogValue" @change="radioGroupChange">
 					<u-radio 
 						v-for="(item, index) in Catalog" :key="item.id" 
 						:name="item.id"
 					>
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
 import chooseMap from '@/components/choose-map/choose-map.vue';
 import OssUpload from '@/utils/UploadOss/OssUpload.js';
 export default {
 	components: {
 		chooseMap
 	},
 	data() {
 		return {
			video: '',
 			DataList: {
 				type: '3',//发布类型；发布类型；1=纯文字、2=图+文、3=视频+文、4=链接+文字、5=商品+文字
 				content: '',
 				catalog_id: '',
 				files: '',
 				lng: '',
 				lat: '',
 				address: ''
 			},
 			// 单选
 			Catalog:[],
 			CatalogValue:''
 		};
 	},
 	onLoad() {
 		// 获取我的发布菜单权限
 		this.$post(this.$url.Discover.GetMyCatalogs, {},{
			isLoading:true
		}).then(res => {
 			console.log(JSON.stringify(res))
 			this.Catalog = res.data;
 			if(this.Catalog.length>0){
 				this.CatalogValue = res.data[0].id;
 				this.DataList.catalog_id = res.data[0].id;
 			}
 		});
 	},
 	methods: {
		// 打开视频预览
		openVideo(url) {
			// 跳转页面
			uni.navigateTo({
				url: '/pages/chat/video/video?url=' + url
			});
		},
		delVideo() {
			this.video = ''; //清空
		},
		UploadVideo() {
			// console.log("上传视频");
			var _self = this;
			uni.chooseVideo({
				count: 1,
				maxDuration: 15, //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
				sourceType: ['camera', 'album'],
				success: (res)=> {
					console.log(JSON.stringify(res));
					console.log(res.tempFilePath);
					let videoSrc = res.tempFilePath;
					let pos = videoSrc.lastIndexOf('.');
					let filename = videoSrc.substring(0, pos); // 文件名
					let extendName = videoSrc.substring(pos + 1).toLowerCase(); // 扩展名
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
					var FileName = year + '' + month + '' + day + '' + new Date().getTime() + '.' + extendName; //202003021583151162210.mp4
					var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					//视频上传阿里云
					var SuccessUrlVideo = OssUpload.videoUploadBack('video', videoSrc, fuleFileName);
					SuccessUrlVideo.then(response => {
						console.log(response); //上传成功的回调
						_self.video = response;
						_self.DataList.files = response.split('.cn')[1];
					});
				}
			});
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
 			// console.log(JSON.stringify(this.DataList));
			
 			// return;
 			
 			// 非空验证
			if (this.DataList.catalog_id == '') {
				this.$refs.uToast.show({
					title: '当前没有发布权限',
					type: 'warning'
				});
				return;
			}
 			if (this.DataList.content == '') {
 				this.$refs.uToast.show({
 					title: '请输入你的想法',
 					type: 'warning'
 				});
 				return;
 			}
			if (this.DataList.files == '') {
				this.$refs.uToast.show({
					title: '请上传视频',
					type: 'warning'
				});
				return;
			}
			console.log(JSON.stringify(this.DataList))
 			// 发布内容
 			this.$post(this.$url.Discover.Post, this.DataList,{
				isLoading:true
			}).then(res => {
 				console.log(JSON.stringify(res))
 				if(res.code == 200){
 					// 发布成功
 					uni.showToast({
 						title: '发布成功',
 						icon: 'success',
 						duration: 2000
 					})
 					setTimeout(() => {
 						// 两秒之后返回上一个界面
 						uni.navigateBack({
 							delta: 1
 						});
 					}, 2000);
 				}
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
 	-webkit-line-clamp: 2; /*超出3行部分显示省略号，去掉该属性 显示全部*/
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
 