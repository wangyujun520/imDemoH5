<template>
	<view class="content">
		<u-sticky>
			<!-- 吸顶 -->
			<view class="flex justify-between bg-white" style="height: 80rpx;width: 750rpx;">
				<view @click="subsectionchange(0)" :class="current == 0 ? 'selectColor' : 'noselectColor'"
					class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 26rpx;font-weight: bold;">房屋信息</text>
				</view>
				<view @click="subsectionchange(1)" :class="current == 1 ? 'selectColor' : 'noselectColor'"
					class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-left: 1px solid rgb(187,187,187,0.1);">
					<text style="font-size: 26rpx;font-weight: bold;">方案陈述</text>
				</view>
			</view>
		</u-sticky>
		<!-- 房屋信息 -->
		<view class="flex flex-column" v-if="current == 0">
			<view class="flex flex-column bg-white px-3 mt-3">
				<view @tap="showCatalog=true" class="flex align-center bg-white justify-between border-bottom"
					style="height: 100rpx;">
					<text>户型</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.house_catalog_text||'请选择'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>
				<view @tap="showStyle=true" class="flex align-center bg-white justify-between border-bottom"
					style="height: 100rpx;">
					<text>风格</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.house_style_text||'请选择'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">面积</text>
					<view class="flex align-center">
						<u-input type="number" v-model="DataList.area" input-align="right" placeholder="请输入面积"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
						<!-- <u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon> -->
					</view>
				</view>
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">花费</text>
					<view class="flex align-center">
						<u-input type="number" v-model="DataList.money" input-align="right" placeholder="请输入花费"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
						<!-- <u-icon class="ml-2" name="arrow-right" color="#BEBEBE" size="26"></u-icon> -->
					</view>
				</view>

				<view @tap="showWay=true" class="flex align-center bg-white justify-between" style="height: 100rpx;">
					<text>方式</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.way_text||'请选择'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>
			</view>
			<!-- 所在位置 -->
			<choose-map @changes="mapClick"></choose-map>
		</view>

		<!-- 方案陈诉 -->
		<view class="flex flex-column" v-if="current == 1">
			<!-- 上传封面图片 -->
			<view class="flex justify-center align-center flex-column bg-white m-3 rounded"
				style="width: 690rpx;height: 350rpx;" @tap="uploadCover">
				<view v-if="DataList.cover!=''" style="width: 100%;height: 100%;">
					<!-- <image class="rounded" :src="imgSrc" style="width: 100%;height: 100%;"></image> -->
					<image class="rounded" :src="DataList.cover_preview" style="width: 100%;height: 100%;"></image>
				</view>
				<text v-if="DataList.cover==''" class="mt-2"
					style="color: #0072FF;font-weight: bold;font-size: 26rpx;">上传封面图</text>
			</view>
			<!-- 上传图片 -->
			<!-- DataList.bannerimgs -->
			<upload-imgs @upload="uploadbanner" :showimgs="DataList.bannerimgs" title="横幅图片"></upload-imgs>


			<view @click="skipTitle" class="flex mt-3 p-2 justify-between bg-white"
				style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column">
					<view class="flex align-center">
						<text style="font-size: 30rpx;font-weight: bold;color: #000000;">案例标题</text>
						<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
					</view>
					<view class="flex" style="width: 600rpx;">
						<text v-if="DataList.title == ''" style="color: #979797;font-size: 26rpx;">请录入你的案例标题</text>
						<text v-else style="color: #979797;font-size: 26rpx;"
							class="LineBreak1">{{DataList.title}}</text>
					</view>
				</view>
				<view class="flex">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view>
			<view @click="skipCaseIntroduction" class="flex p-2 justify-between bg-white"
				style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column">
					<view class="flex align-center">
						<text style="font-size: 30rpx;font-weight: bold;color: #000000;">案例介绍</text>
						<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
					</view>
					<view class="flex" style="width: 600rpx;">
						<text v-if="DataList.introduce == ''" style="color: #979797;font-size: 26rpx;">请录入你的案例介绍</text>
						<text style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.introduce}}</text>
					</view>
				</view>
				<view class="flex">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view>

			<view class="flex align-center bg-white px-2 py-3 mt-2"
				style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 30rpx;font-weight: bold;color: #000000;">空间</text>
				<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				<text style="color: #979797;font-size: 26rpx;" class="ml-3">添加的图片总数不少于6张</text>
			</view>
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in DataList.space" :key="item.id"
				@click="click" @open="open" @content-click="skipSpaceDetails(item,index)" :options="options">
				<view class="flex flex-column">
					<view class="flex p-2 justify-between bg-white"
						style="border-bottom: 1px solid rgba(187,187,187,0.2);">
						<view class="flex flex-column">
							<view class="flex align-center">
								<text style="font-size: 30rpx;font-weight: bold;color: #000000;">{{item.name}}</text>
							</view>
							<view class="flex" style="width: 600rpx;">
								<text style="color: #979797;font-size: 26rpx;">{{item.number}}张</text>
							</view>
						</view>
						<view class="flex">
							<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
						</view>
					</view>
				</view>
			</u-swipe-action>
			<view @click="AddSpace" class="flex bg-white align-center justify-center mt-4 py-3" style="color: #2979ff;">
				<u-icon name="plus" color="#2979ff" size="28"></u-icon>
				<text style="font-size: 28rpx;" class="ml-1">添加空间</text>
			</view>

			<!-- 占位 -->
			<view style="height: 30rpx;"></view>

		</view>
		<!-- 提示 -->
		<u-toast ref="uToast"></u-toast>
		<!-- 户型 -->
		<u-select v-model="showCatalog" :list="HouseCatalogList" @confirm="SelectCatalog"></u-select>
		<!-- 风格 -->
		<u-select v-model="showStyle" :list="HouseStyleList" @confirm="SelectStyle"></u-select>
		<!-- 方式 -->
		<u-select v-model="showWay" :list="WayList" @confirm="SelectWay"></u-select>
		<!-- 模态框 -->
		<u-modal @confirm="confirm" v-model="show" title="添加空间" :title-style="{color: '#101010'}"
			:show-cancel-button="true">
			<view class="flex py-2 px-4">
				<text style="color: #888;font-size: 28rpx;">请输入空间名称</text>
			</view>
			<view class="flex px-4 py-4">
				<input maxlength="5" style="border-bottom: 2px solid #FF9900;width: 100%;color: #888;font-size: 32rpx;"
					type="text" v-model="spaceName" placeholder="限填5字" />
			</view>
		</u-modal>

	</view>
</template>

<script>
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	import chooseMap from '@/components/choose-map/choose-map.vue';
	import uploadImgs from '@/components/push-img/get-imgs.vue';
	export default {
		components: {
			chooseMap,
			uploadImgs
		},
		onNavigationBarButtonTap: function(val) {
			// 发布
			if (val.index == 0) {
				console.log(JSON.stringify(this.DataList))
				this.DataList.status = 0;
				this.tips_text = '发布成功';
				this.UpdateCase();
			}
			// 保存到草稿箱
			if (val.index == 1) {
				this.DataList.status = 1;
				this.tips_text = '保存成功';
				this.UpdateCase();
			};
		},
		data() {
			return {
				tips_text: '', //发布成功 保存成功
				imgSrc: 'http://oss.eand.vip//find/2022/05/2022050916521077549660.blob:http://localhost:8080/603eb36c-8bca-411f-8a61-607f9dc4fee4?x-oss-process=style/nomal',
				w: 0,
				h: 0,
				disabled: false,
				btnWidth: 180,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				current: 0,
				swiperHeight: 0,
				show: false, //显示添加空间的模态框
				showCatalog: false, //户型显示
				HouseCatalogList: [], //户型数据字典
				showStyle: false,
				HouseStyleList: [],
				showWay: false, //方式显示
				WayList: [{
						value: 1,
						label: '全包'
					},
					{
						value: 2,
						label: '半包'
					},
				],
				photos: [],
				contents: [],
				banners_temp:[],//banner回显使用
				DataList: {
					id: "",
					status: "", //状态，0=已完成；1=草稿
					house_catalog: '', //户型
					house_catalog_text: '', //户型显示
					house_style: '', //风格
					house_style_text: '', //风格显示
					area: '', //面积
					money: '', //费用预算
					way: '', //方式；1=全包；2=报包
					way_text: '', //方式；1=全包；2=报包
					title: "", //名称
					introduce: "", //介绍
					cover: "", //封面图
					cover_preview: '', //封面图预览
					banners: "", //横幅图片组
					bannerimgs:[],
					// province: '', //省份
					// city: '', //城市
					// county: '', //区县
					// price_des: "", //费用介绍
					// 3d_title: "", //3d标题
					// 3d_url: "", //3d链接地址
					// goods_list: "", //商品链接
					// space: [] //空间内容对象
					lat: '',
					lng: '',
					address: '',
					space: [{
							id: 1,
							show: false,
							name: "户型图",
							number: 0,
							spaceDetails: []
						},
						{
							id: 2,
							show: false,
							name: "玄关",
							number: 0,
							spaceDetails: []
						},
						{
							id: 3,
							show: false,
							name: "客厅",
							number: 0,
							spaceDetails: []
						},
						{
							id: 4,
							show: false,
							name: "厨房",
							number: 0,
							spaceDetails: []
						},
						{
							id: 5,
							show: false,
							name: "餐厅",
							number: 0,
							spaceDetails: []
						},
						{
							id: 6,
							show: false,
							name: "卫生间",
							number: 0,
							spaceDetails: []
						},
						{
							id: 7,
							show: false,
							name: "卧室",
							number: 0,
							spaceDetails: []
						},
						{
							id: 8,
							show: false,
							name: "阳台",
							number: 0,
							spaceDetails: []
						},
						{
							id: 9,
							show: false,
							name: "走廊",
							number: 0,
							spaceDetails: []
						}
					]
				}, //Mock数据
				spaceName: '' //空间名称
			}
		},
		onLoad(options) {
			if ((options.id ?? '') == '') {
				uni.setNavigationBarTitle({
					title: '新增案例'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '编辑案例'
				})
				this.id = options.id;
				// 获取案例详情、获取设计方案详情
				this.$post(this.$url.Case.GetCase, {
					id: this.id
				}, {}).then(res => {
					//res.data
					this.DataList = res.data;
					if(res.data.space_temp == null){
						this.DataList.space = [];
					}else{
						this.DataList.space = JSON.parse(res.data.space_temp)
					}
					
					// this.DataList.banners_temp = JSON.parse(res.data.banners);
					
					let tempData = JSON.parse(JSON.stringify(this.DataList));
					
					// this.DataList.cover_preview = tempData.cover;
					this.DataList.cover_preview = tempData.full_cover;
					
					if(res.data.banners_temp == null){
						this.DataList.bannerimgs = [];
					}else{
						this.DataList.bannerimgs = JSON.parse(tempData.banners_temp);
						
						this.banners_temp = JSON.parse(JSON.stringify(this.DataList.bannerimgs));
					}

					
					// console.log(JSON.stringify(this.DataList.bannerimgs))
					// this.DataList.cover = '';
				})
			}
		},
		onShow() {
			// 获取数据字典
			this.GetDic();
		},
		methods: {
			// 新增、更新案例
			UpdateCase() {
				// 非空校验
				if ((this.DataList.house_catalog ?? '') == '') {
					this.$refs.uToast.show({
						title: '请选择户型',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.house_style ?? '') == '') {
					this.$refs.uToast.show({
						title: '请选择风格',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.area ?? '') == '') {
					this.$refs.uToast.show({
						title: '请输入面积',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.money ?? '') == '') {
					this.$refs.uToast.show({
						title: '请输入花费',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.way ?? '') == '') {
					this.$refs.uToast.show({
						title: '请选择方式',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.cover ?? '') == '') {
					this.$refs.uToast.show({
						title: '请上传封面图',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.banners ?? '') == '') {
					this.$refs.uToast.show({
						title: '请上传banner图',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.title ?? '') == '') {
					this.$refs.uToast.show({
						title: '请填写活动标题',
						type: 'warning'
					})
					return;
				}
				if ((this.DataList.introduce ?? '') == '') {
					this.$refs.uToast.show({
						title: '请填写案例介绍',
						type: 'warning'
					})
					return;
				}
				let sapces = this.DataList.space;
				let total = 0;
				sapces.forEach(item => {
					total += item.number;
				});
				if (total < 6) {
					this.$refs.uToast.show({
						title: '空间图片数量不足!',
						type: 'warning'
					})
					return;
				}
				this.contents = []; //初始化数据
				this.DataList.space.forEach(item => {
					var cc = {
						title: item.name, //空间标题
						items: []
					}
					item.spaceDetails.forEach(item2 => {
						var dd = {
							content: item2.content,
							images: item2.upload_imgs
						}
						cc.items.push(dd)
					})
					this.contents.push(cc)
				})
				let requestData = {
					id: this.DataList.id, //数据id 新增
					status: this.DataList.status, //状态，0=已完成；1=草稿
					house_catalog: this.DataList.house_catalog, //户型
					house_style: this.DataList.house_style, //风格
					area: this.DataList.area, //面积
					money: this.DataList.money, //价格
					way: this.DataList.way, //方式
					lat: this.DataList.lat,
					lng: this.DataList.lng,
					address: this.DataList.address,
					cover: this.DataList.cover, //封面图
					banners: this.DataList.banners, //横幅banner
					banners_temp:this.banners_temp,//回显用
					title: this.DataList.title, //活动标题
					introduce: this.DataList.introduce, //案例介绍
					space: this.contents ,//内容数组
					space_temp:this.DataList.space
				}
				// 发布
				if (this.DataList.status == 0) {
					uni.showModal({
						title: '提示',
						content: '发布案例吗',
						success: res => {
							if (res.confirm) {
								this.ConfirmUpdateCase(requestData);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				// 保存草稿箱
				if (this.DataList.status == 1) {
					uni.showModal({
						title: '提示',
						content: '保存到草稿箱',
						success: res => {
							if (res.confirm) {
								this.ConfirmUpdateCase(requestData);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			ConfirmUpdateCase(requestData) {
				this.$post(this.$url.Design.UpdateCase, requestData, {}).then(res => {
					this.$refs.uToast.show({
						title: this.tips_text,
						type: 'success'
					});
					setTimeout(() => {
						// 两秒之后返回上一个界面
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				})
			},
			AddSpace() {
				// console.log("添加空间点击事件");
				this.spaceName = ''; //清空输入内容
				this.show = true;
			},
			// 封面图上传
			uploadCover() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					success: (res) => {
						this.DataList.cover_preview = res.tempFilePaths[0];
						//调用图片上传
						this.photos.push(res.tempFilePaths[0]);
						this.ImgUpload();
					}
				});
			},
			ImgUpload() {
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
					response.forEach(item => {
						let imgTemp = item.split('.cn')[1];
						this.DataList.cover = imgTemp;
					})
				});

			},
			uploadbanner(arr) {
				console.log(JSON.stringify(arr));
				this.DataList.bannerimgs = arr;

				let uploads = [];
				for (let k = 0; k < this.DataList.bannerimgs.length; k++) {
					let imgSrc = this.DataList.bannerimgs[k];
					let pos = imgSrc.lastIndexOf('.');
					let filename = imgSrc.substring(0, pos); // 文件名
					let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
					let date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					if (day < 10) {
						day = '0' + day;
					}
					if (month < 10) {
						month = '0' + month;
					}
					let FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' +
					extendName; //202003021583151162210.jpg
					let fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					let SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					console.log(JSON.stringify(response)); //上传成功的路径
					this.banners_temp = response;
					response.forEach(item => {
						console.log(item)
						let imgTemp = item.split('.cn')[1];
						if (this.DataList.banners == '') {
							this.DataList.banners = imgTemp;
						} else {
							this.DataList.banners = this.DataList.banners + '|' + imgTemp;
						}
					})

				});

			},
			// 选择户型
			SelectCatalog(e) {
				this.DataList.house_catalog_text = e[0].label;
				this.DataList.house_catalog = e[0].value;
			},
			// 选择风格
			SelectStyle(e) {
				this.DataList.house_style_text = e[0].label;
				this.DataList.house_style = e[0].value;
			},
			// 选择方式
			SelectWay(e) {
				this.DataList.way_text = e[0].label;
				this.DataList.way = e[0].value;
			},
			GetDic() {
				// 户型
				this.$post(this.$url.Public.GetDicts, {
					key: "house_catalog"
				}, {}).then(res => {
					res.data.forEach(item => {
						let catalog = {
							value: item.key,
							label: item.value
						}
						this.HouseCatalogList.push(catalog)
					})
				})
				// 风格
				this.$post(this.$url.Public.GetDicts, {
					key: "house_style"
				}, {}).then(res => {
					res.data.forEach(item => {
						let style = {
							value: item.key,
							label: item.value
						}
						this.HouseStyleList.push(style)
					})
				})
				// 方式

			},
			// 跳转到活动标题
			skipTitle() {
				let title = '';
				if ((this.DataList.title ?? '') != '') {
					title = this.DataList.title
				}
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/ActivityTitle?title=' + title
				})
			},
			// 跳转到案例介绍
			skipCaseIntroduction() {
				let introduce = '';
				if ((this.DataList.introduce ?? '') != '') {
					introduce = this.DataList.introduce
				}
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/CaseIntroduction?introduce=' + introduce
				})
			},
			mapClick(item) {
				console.log(JSON.stringify(item));
				console.log(item.address);
				this.DataList.lng = item.longitude;
				this.DataList.lat = item.latitude;
				this.DataList.address = item.address;
			},
			// 加载图片
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
			// 空间内容点击事件
			ContentClick(item) {
				console.log(JSON.stringify(item))
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
				})
			},
			// 更换封面
			ChangeTheCover() {
				// 跳转到图片裁剪界面
				uni.navigateTo({
					url: '/uview-ui/components/u-avatar-cropper/upload-cover-image?img=' + this.DataList.cover
				})

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
					})
					this.show = true;
					return;
				}
				var spaceData = {
					"id": this.DataList.space.length + 1,
					"show": false,
					"name": this.spaceName,
					"number": 0,
					"spaceDetails": []
				}
				console.log(spaceData.id);
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
					url: '/pages/tabbar/message/NavMenu/SpaceDetails?index=' + index
				})
			},
			// 跳转到户型界面
			skipHouseType() {
				// console.log()
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/HouseType?houseType=' + this.DataList.houseType
				})
			},
			// 跳转到风格界面
			skipStyle() {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/Style?style=' + this.DataList.houseStyle
				})
			},
			// 跳转到面积界面
			skipArea() {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/Area?area=' + this.DataList.houseArea
				})
			},
			// 跳转到花费界面
			skipPrice() {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/Price?price=' + this.DataList.cost
				})
			},
			// 跳转到位置界面
			skipAddress() {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/Address?address=' + this.DataList.address
				})
			},
			// 跳转到方式界面
			skipMode() {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/Mode?mode=' + this.DataList.modename
				})
			},
			// 跳转到标题
			// skipTitle() {
			// 	uni.navigateTo({
			// 		url: '/pages/tabBar/message/SubPage/Title?title=' + this.DataList.title
			// 	})
			// },
			// 跳转到说在前面
			skipSayAhead() {
				uni.navigateTo({
					url: '/pages/tabBar/message/SubPage/SayAhead?title=' + this.DataList.conternt
				})
			},
			// 跳转到风格测试图片界面
			skipStyleTestPicture() {
				uni.navigateTo({
					url: '/pages/tabBar/message/SubPage/StyleTestPicture?styleTestPicture=' + this.DataList
						.stylePicture
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

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
		color: #FF9900;
		border-bottom: 1px solid #FF9900;
	}

	.noselectColor {
		color: #000;
		border-bottom: 1px solid #FFFFFF;
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
