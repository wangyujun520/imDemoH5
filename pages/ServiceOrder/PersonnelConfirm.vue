<template>
	<view class="content">
		<view class="position-relative p-3" v-if="DataList.list.length>0">
			<!-- 说明 -->
			<view class="flex bg-white p-3" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="color: #888;font-size: 26rpx;">说明：报价基础上，只增加5000为利润。向业主说明。（所有材料项目，遵循诚信经营，多退少补原则）</text>
			</view>
			<view v-for="(item,index) in DataList.list">
				<!-- 标题 -->
				<view class="flex justify-between align-center px-2 bg-white" style="height: 100rpx;">
					<text style="color: #000000;font-weight: bold;font-size: 32rpx;">{{item.title}}</text>
					<text style="color: #000000;font-weight: bold;font-size: 28rpx;">合计:￥{{item.money}}</text>
				</view>
				<!-- 折叠面板 -->
				<view class="u-demo-wrap" style="background-color: #ffffff;">
					<u-collapse v-if="key" class="px-3" :item-style="itemStyle" event-type="close" :arrow="arrow"
						:accordion="accordion" @change="change">
						<u-collapse-item class="px-3" :index="index2" @change="itemChange" :title="item2.title"
							v-for="(item2, index2) in item.list" :key="index2">
							<view class="py-3">
								<u-table>
									<u-tr>
										<u-th v-for="(item3,index3) in item2.list" :key="index3">{{item3.key}}</u-th>
										<!-- <u-th>人工单价</u-th> -->
										<!-- <u-th>材料单价</u-th> -->
										<!-- <u-th>总价</u-th> -->
									</u-tr>
									<u-tr>
										<u-td v-for="(item3,index3) in item2.list" :key="index3">{{item3.value}}</u-td>
										<!-- <u-td>46.3㎡</u-td>
										<u-td>12元/㎡</u-td>
										<u-td>15元/㎡</u-td>
										<u-td>1250.10</u-td> -->
									</u-tr>
								</u-table>
							</view>
							

						</u-collapse-item>
					</u-collapse>
				</view>
			</view>


			<view class="flex justify-between align-center px-3 rounded m-2"
				style="height: 100rpx;background-color: #717171;color: #FFFFFF;">
				<text style="font-weight: bold;font-size: 30rpx;">费用总计</text>
				<text style="font-weight: bold;font-size: 30rpx;">¥{{DataList.all_money}}</text>
			</view>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 120rpx;"></view>
		<!-- 底部按钮 -->
		<view v-if="rankno==0&&DataList.list.length>0" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @tap="skipDesigner" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">联系设计师</text>
				</view>
				<view v-if="DataList.status==2" class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="ArgWorking('-1')" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">拒绝</text>
					<text @click="ArgWorking('0')" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">接受</text>
				</view>
				
				<view v-if="DataList.status==1||DataList.status==0" class="flex align-center justify-end pr-2" style="width: 350rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node_user_content}}</text>
				</view>
			</view>
		</view>

		<view v-if="module=='designer'&&DataList.list.length>0" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @tap="skipUser" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">联系客户</text>
				</view>
				<view v-if="DataList.status==1 && DataList.list.length!=0" class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text @click="SetWorking" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">发送施工方案</text>
				</view>
				
				<view v-if="DataList.status == 2||DataList.status == 0" class="flex align-center justify-end pr-2" style="width: 350rpx;border: 0px solid red;">
					<text style="color: #ff9900;font-size: 24rpx;">{{DataList.node_designer_content}}</text>
				</view>
				
			</view>
		</view>
		

		<view class="flex flex-column align-center" v-if="DataList.list.length == 0 && module=='designer'">
			<text>请到后台管理系统进行上传</text>
			<text>http://wecenter.anjubang.cn/</text>
			
			<u-button class="mt-3" type="primary" @tap="copyaddress">复制地址</u-button>
		</view>

		<view v-if="DataList.list.length == 0 && module=='user'" class="flex justify-center align-center"
			style="height: 80vh">
			<u-empty text="暂未上传施工清单" mode="list"></u-empty>
		</view>


		<!-- 模态框 -->
		<u-modal v-model="ModalShow" :show-cancel-button="true" @confirm="ModalConfirm" @cancel="ModalCancel">
			<view class="flex flex-column align-center py-3" style="width: 600rpx;">
				<text>是否确定通知设计师更换{{sitem.defaultProfession}}</text>
				<text>【{{sitem.name}}】</text>
			</view>
		</u-modal>
		<!-- 消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				module: '',
				rankno: uni.getStorageSync('rankno'),
				order_id: '',
				DataList: {
					name:"",
					mobile:"",
					designer_name:"",
					designer_mobile:"",
					order_id:"",
					all_money:"",
					status:"",
					list:[]
				},
				imgUrl: 'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400',
				current: 0,
				ModalShow: false,
				itemList: [{
					head: "地面",
					price: "336",
					body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来：闪光的道德、妙异的智慧、优美的人情…… 赏识不是单向的施舍，是智慧与智慧的主动碰撞",
					show: false,
				}, {
					head: "墙面",
					price: "2,039",
					body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
					show: false,
				}, {
					head: "天花板",
					price: "1,118",
					body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美，用它绝对雕不出好的艺术品，总之它被批评为一块不受人赏识的普通石头",
					show: false,
				}],
				accordion: false, //手风琴模式
				arrow: true, //箭头显示
				hoverClass: 'hover2',
				itemStyle: {
					borderTop: '1px solid rgba(187, 187, 187,0.2)',
					padding: '10rpx 0rpx 0rpx 0rpx'
				}, //自定义样式
				key: true,
				sitem: '',
				State: 0,
			}
		},
		onLoad(options) {
			if ((options ?? '') != '') {
				this.order_id = options.order_id;
				this.module = options.module;
			}

			this.InitData();

			// this.State =option.State
			// this.taskid = option.id
			// this.GetData(true);
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - uni.upx2px(130);
				} else {
					this.swiperHeight = res.windowHeight - uni.upx2px(70);
				}
			} catch (e) {
				console.log(e);
			}
		},
		methods: {
			copyaddress(){
				uni.setClipboardData({
					data: 'http://wecenter.anjubang.cn/'
				});
				uni.showToast({
					title: '复制成功',
					icon: 'none',
					duration: 2000
				});
			},
			// 联系设计师
			skipDesigner() {
				this.$store.commit('createConversationActive', this.DataList.designer_mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.designer_name
				});
			},
			// 联系客户
			skipUser() {
				this.$store.commit('createConversationActive', this.DataList.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.name
				});
			},
			ArgWorking(state) {
				uni.showModal({
					title: '提示',
					content: `真的要${state==0?'接受':'拒绝'}吗？`,
					success: (res) => {
						if (res.confirm) {
							//0=同意；-1=拒绝
							this.$post(this.$url.Task.ArgWorking, {
								order_id: this.order_id,
								status: state
							}, {}).then(res => {
								// 成功
								this.$refs.uToast.show({
									title: `${state==0?'接受':'拒绝'}成功`,
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 设置施工方案、发送施工方案
			SetWorking() {
				this.$post(this.$url.Task.SetWorking, {
					order_id: this.order_id
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '发送成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				});
			},
			InitData() {
				// 获取施工清单
				this.$post(this.$url.Task.GetWorking, {
					order_id: this.order_id
				}, {
					isLoading: false
				}).then(res => {
					this.DataList = res.data;
				});
			},
			JumpHomePage(item) {
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage?id=' + item.mobileUser
				});
			},
			GetData(isforce) {
				//获取数据
				var RequrestUrl =
					this.AJB.BizUrl + "api/CaiLiao/GetWorkList";
				var RequrestDatas = {
					type: "",
					TaskID: this.taskid,
					maxResultCount: 100,
					skipCount: 0,
					ismy: true,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						if (res.code == 200) {
							this.DataList = res.dataList.items;
							console.log(JSON.stringify(res.dataList.items))
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 人员清单,施工清单菜单切换
			subsectionchange(current) {
				this.current = current;
			},
			// 更换按钮点击事件
			replace(item) {
				this.sitem = item;
				//弹出提示框
				this.ModalShow = true;
			},
			// 模态框确定事件
			ModalConfirm() {
				var _self = this;
				var userUrl = _self.AJB.BizUrl + "api/CaiLiao/UpdateWorkUserState";
				var userDatas = {
					id: this.sitem.joinId
				};
				_self.AJB.UniAjax(userUrl, userDatas)
					.then((res) => {
						if (res.code == 200) {

							this.$refs.uToast.show({
								title: '申请替换人员成功!',
								type: 'success'
							})
							this.GetData(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 模态框取消事件
			ModalCancel() {
				console.log("取消")
			},
			//改变事件
			change(index) {
				let str = '';
				if (Array.isArray(index)) {
					let arr = index.map(val => {
						return Number(val) + 1;
					})
					index = arr.join(',');
				} else {
					index = Number(index) + 1;
				}
				// this.$refs.uToast.show({
				// 	title: `点击了第${index}个`,
				// 	type: 'warning'
				// })
			},
			itemChange(e) {
				console.log(e);
			},
			changeStatus() {
				this.key = false;
				this.$nextTick(function() {
					this.key = true;
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.selectColor {
		color: #FF9900;
		border-bottom: 1px solid #FF9900;
	}

	.noselectColor {
		color: #000;
		border-bottom: 1px solid #FFFFFF;
	}

	.wrap {
		// padding: 24rpx;
	}

	.item {
		//padding: 0 24rpx;
	}

	.head {
		font-size: 30rpx;
		color: $u-main-color;
		line-height: 1;
		padding: 24rpx 24rpx;
	}

	.body {
		font-size: 28rpx;
		color: $u-tips-color;
		line-height: 1.4;
		padding: 24rpx;
	}

	.hover1 {
		background-color: red;
	}
</style>
