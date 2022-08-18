<template>
	<view class="content">

		<view @click="showModal" class="flex justify-between align-center pl-2 bg-white" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);border-top: 1px solid rgba(187,187,187,0.2);">
			<text class="" style="color: #101010;font-size: 28rpx;">工种选择</text>
			<view class="flex align-center">
				<text style="color: #777;font-size: 28rpx;">点击查看详情</text>
				<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
			</view>
		</view>

		<view class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 80rpx;">
					<text style="font-size: 30rpx;color: #101010;">工龄</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.workingYears" style="font-size: 28rpx;color: #777;" placeholder="请输入工龄" />
				</view>
			</view>
		</view>

		<view class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 80rpx;">
					<text style="font-size: 30rpx;color: #101010;">公司</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.company" style="font-size: 28rpx;color: #777;" placeholder="请输入公司" />
				</view>
			</view>
		</view>
		<view class="flex justify-between pl-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="" style="color: #101010;font-size: 28rpx;">擅长</text>
			<view class="flex">
				<view class="flex justify-end flex-wrap" style="width: 520rpx;">
					<text @click="GoodSelectWork(indexgood)" :class="[itemgood.isLike ? 'Selection' : 'NoSelection']" v-for="(itemgood,indexgood) in DataList.goodAtSales"
					 :key="indexgood" class="rounded mb-1 ml-1" style="font-size: 26rpx;padding: 10rpx 30rpx;">{{itemgood.name}}</text>
				</view>
				<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
			</view>
		</view>
		
		<u-mask class="flex justify-center align-center" :show="show" :zoom="false">
			<view v-if="DataList.certifiedTypeWork" class="bg-white rounded" style="width: 570rpx;height: 800rpx">
				<view class="flex justify-end align-end pr-2" style="height: 50rpx;">
					<u-icon @click="CloseModal" name="close" color="#bbb" size="30"></u-icon>
				</view>
				<view class="flex justify-center align-center" style="height: 70rpx;">
					<text style="color: #101010;font-size: 32rpx;font-weight: bold;">选择您需要认证的工种</text>
				</view>
				<view class="px-2 bg-white" style="height: 520rpx;font-size: 26rpx;">
					<scroll-view scroll-y="true" style="height: 100%;" class="pt-3">
						<!-- 未认证 -->
						<view class="" v-if="DataList.certifiedTypeWork.notCertified.length>0">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text style="color: #999;font-size: 24rpx;">未认证</text></view>
							</view>
							<view class="flex flex-wrap " style="">
								<!-- <view @click="SelectWork(mItem.id)" :class="[currents.indexOf(mItem.id) > -1 ? 'Selection' : 'NoSelection']"
								 v-for="(mItem, mIndex) in ModalData.notCertified" :key="mIndex" class="mb-2 ml-2 flex align-center justify-center"
								 style="width: 150rpx;height: 60rpx;">
									<text style="font-size: 24rpx;">{{ mItem.name }}</text>
								</view> -->
								<view @click="SelectWork(mItem.id)" :class="[currents.indexOf(mItem.id) > -1 ? 'Selection' : 'NoSelection']"
								 v-for="(mItem, mIndex) in DataList.certifiedTypeWork.notCertified" :key="mIndex" class="mb-2 ml-2 flex align-center justify-center"
								 style="width: 150rpx;height: 60rpx;">
									<text style="font-size: 24rpx;">{{ mItem.name }}</text>
								</view>
							</view>
						</view>
						<!-- 已经认证 -->
						<view class="" v-if="DataList.certifiedTypeWork.certified.length > 0">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text style="color: #999;font-size: 24rpx;">已经认证</text></view>
							</view>
							<view class="flex flex-wrap " style="">
								<view v-for="(cItem, cIndex) in DataList.certifiedTypeWork.certified" :key="cIndex" class="mb-2 ml-2 flex align-center justify-center"
								 style="width: 150rpx;height: 60rpx;background-color: #19BE6B;">
									<text style="color: #FFFFFF;font-size: 24rpx;">{{ cItem.name }}</text>
								</view>
							</view>
						</view>
						<!-- 审核中 -->
						<view class="" v-if="DataList.certifiedTypeWork.underReview.length > 0">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text style="color: #999;font-size: 24rpx;">审核中</text></view>
							</view>
							<view class="flex flex-wrap " style="">
								<view v-for="(cItem, cIndex) in DataList.certifiedTypeWork.underReview" :key="cIndex" class="mb-2 ml-2 flex align-center justify-center"
								 style="width: 150rpx;height: 60rpx;background-color: #2979FF;">
									<text style="color: #FFFFFF;font-size: 24rpx;">{{ cItem.name }}</text>
								</view>
							</view>
						</view>
						<!-- 审核失败 -->
						<!-- <view class="">
							<view class="flex" style="">
								<view class="mb-2 ml-2 flex align-center" style="width: 127rpx;height: 60rpx;"><text style="color: #999;font-size: 24rpx;">审核失败</text></view>
							</view>
							<view class="flex flex-wrap " style="">
								<view v-for="(cItem, cIndex) in DataList.certifiedTypeWork.auditFailure" :key="cIndex" class="mb-2 ml-2 flex align-center justify-center"
								 style="width: 150rpx;height: 60rpx;background-color: #FA3534;">
									<text style="color: #FFFFFF;font-size: 24rpx;">{{ cItem.name }}</text>
								</view>
							</view>
						</view> -->
					</scroll-view>
				</view>
				<view class="flex justify-center align-center" style="height: 160rpx;">
					<u-button @click="clickbtn(currents)" type="warning" :disabled="!currents.length > 0" style="width: 300rpx;font-size: 26rpx;height: 70rpx;">提交认证资料</u-button>
				</view>
			</view>
		</u-mask>

		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				ModalData: '', //模态框数据
				currents: [], //多选题是否选中
				DataList: "" //Mock数据
			};
		},
		onShow() {
			// 工人认证首页
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyWorkerDetail';
			var RequrestDatas = {};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
				this.DataList = res.dataList;
				console.log(JSON.stringify(this.DataList));
			})
			.catch(err => {
				console.log(err);
			});
			
			
			// var DataLists = {
			// 	"code": 200,
			// 	"msg": "ok",
			// 	"dataList": {
			// 		"authenticationMessage": [
			// 			"水工资料审核中",
			// 			"电工资料审核中",
			// 			"木工资料审核失败"
			// 		],
			// 		"imgIcon": "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%B7%A5%E4%BA%BA.png",
			// 		"workType": "工人",
			// 		"name": "王玉军",
			// 		"address": "四川省成都市武侯区G213辅路",
			// 		"workingYears": "10年",
			// 		"company": "xxx科技有限公司",
			// 		"certifiedTypeWork": {
			// 			"notCertified": [{
			// 					"id": 1,
			// 					"name": "墙面"
			// 				},
			// 				{
			// 					"id": 2,
			// 					"name": "保洁"
			// 				},
			// 				{
			// 					"id": 3,
			// 					"name": "小工"
			// 				},
			// 				{
			// 					"id": 4,
			// 					"name": "漆工"
			// 				},
			// 				{
			// 					"id": 5,
			// 					"name": "木工"
			// 				},
			// 				{
			// 					"id": 6,
			// 					"name": "开孔"
			// 				},
			// 				{
			// 					"id": 7,
			// 					"name": "防水"
			// 				},
			// 				{
			// 					"id": 8,
			// 					"name": "拆改"
			// 				},
			// 				{
			// 					"id": 9,
			// 					"name": "水工"
			// 				}
			// 			],
			// 			"certified": [{
			// 					"id": 10,
			// 					"name": "泥瓦"
			// 				},
			// 				{
			// 					"id": 11,
			// 					"name": "电工"
			// 				}
			// 			],
			// 			"underReview": [{
			// 				"id": 5,
			// 				"name": "C工种"
			// 			}],
			// 			"auditFailure": [{
			// 				"id": 3,
			// 				"name": "A工种"
			// 			}]
			// 		},
			// 		"goodAtSales": [{
			// 				"name": "A类型",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "B类型",
			// 				"isLike": false
			// 			},
			// 			{
			// 				"name": "C类型",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "D类型",
			// 				"isLike": false
			// 			},
			// 			{
			// 				"name": "E类型",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "F类型",
			// 				"isLike": false
			// 			}
			// 		]
			// 	}
			// }

			// this.DataList = DataLists.dataList;

		},
		onLoad() {},
		computed: {},
		onReady() {},
		methods: {
			GoodSelectWork(index) {
				this.DataList.goodAtSales[index].isLike = !this.DataList.goodAtSales[index].isLike;
			},
			showModal() {
				console.log('工种选择点击');
				this.ModalData = {
					notCertified: [{
							id: 1,
							name: '墙面'
						},
						{
							id: 2,
							name: '保洁'
						},
						{
							id: 3,
							name: '小工'
						},
						{
							id: 4,
							name: '漆工'
						},
						{
							id: 5,
							name: '木工'
						},
						{
							id: 6,
							name: '开孔'
						},
						{
							id: 7,
							name: '防水'
						},
						{
							id: 8,
							name: '拆改'
						},
						{
							id: 9,
							name: '水工'
						},

					],
					certified: [{
							id: 10,
							name: '泥瓦'
						},
						{
							id: 11,
							name: '电工'
						}
					]
				};
				this.show = true;
			},
			SelectWork(index) {
				if (this.currents.indexOf(index) < 0) {
					this.currents.push(index);
				} else {
					for (let i in this.currents) {
						if (this.currents[i] === index) {
							this.currents.splice(i, 1);
							break;
						}
					}
				}
			},
			CloseModal() {
				// 模态框关闭按钮
				this.currents = []; //清空选择
				this.show = false; //关闭模态框
			},
			clickbtn(currents) {
				//未认证
				console.log(JSON.stringify(this.DataList.certifiedTypeWork.notCertified))
				// 选中的工种
				console.log(currents)
				
				var AuthenticationList = [];
				// 拼接
				this.DataList.certifiedTypeWork.notCertified.forEach(itemlist=>{
					currents.forEach(item=>{
						if(item == itemlist.id){
							AuthenticationList.push(itemlist);
						}
					})
				})
				
				//跳转页面到认证界面
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/modify/WorkerTypeCertification?auth='+JSON.stringify(AuthenticationList)
				})

				// console.log(currents);

				// this.currents = [];//清空选择
				// this.show = false;//关闭模态框
			},
			Submit(){
				console.log("提交")
				
				// 工人基本资料修改
				var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMyWorkerDetail';
				var RequrestDatas = {
				  "workingYears": this.DataList.workingYears,
				  "company": this.DataList.company,
				  "goodAtSales": this.DataList.goodAtSales
				}
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					console.log(JSON.stringify(res));
					if(res.code == 200){
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success'
						});
						setTimeout(()=>{
							//返回上一个界面
							uni.navigateBack({
								delta:1
							})
						},2000);
					}else{
						this.$refs.uToast.show({
							title: '提交失败',
							type: 'error'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}

	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}

	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>