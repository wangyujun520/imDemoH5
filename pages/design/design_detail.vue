<template>
	<view class="content position-relative">
		<view class="flex flex-column" style="margin: 20rpx;">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="DataList.header" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{DataList.name}}</text>
						</view>
						<view v-if="DataList.money" class="flex align-center">
							<text style="color: #888;font-size: 26rpx;">预算金额：</text>
							<text v-if="DataList.money!=null" style="color: #FF0000;font-weight: bold;"><span
									style="font-size: 26rpx;">￥</span><span
									style="font-size: 30rpx;">{{DataList.money}}</span></text>
						</view>
					</view>
					<view v-if="DataList.isPay" class="flex justify-end align-center pr-2"
						style="height: 100%;width: 200rpx;">
						<view class="">
							<text class="text-white"
								style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
						</view>
					</view>
				</view>

				<view class="px-2 flex flex-wrap align-center">
					<view v-for="(tags,index) in DataList.design_tags" class="mt-2" style="width: 335rpx;">
						<text class="text-title">{{tags.key}}：</text>
						<text class="text-content">{{tags.value}}</text>
					</view>
				</view>
				<view class="px-2 flex align-end" style="height: 60rpx;">
					<text class="text-title">特殊要求</text>
				</view>
				<view class="px-2 my-2">
					<view v-if="DataList.content!=''&&DataList.content!=undefined" class="p-1"
						style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">{{DataList.content}}</text>
					</view>
					<view v-else class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
					</view>
				</view>
			</view>

			<view class="flex flex-column mt-2 rounded p-2 bg-white">
				<view class="flex align-center">
					<text class="iconfont mr-1" style="font-size: 28rpx;">&#xe6a7;</text>
					<text style="color: #101010;font-size: 30rpx;font-weight: bold;">{{DataList.estate_title}}</text>
				</view>
				<text class="my-1" style="font-size: 24rpx;color: #FF9900;">{{DataList.estate_tags}}</text>
				<view class="flex align-center" style="color: #939393;">
					<text class="iconfont mr-1" style="font-size: 28rpx;">&#xe65e;</text>
					<text style="font-size: 24rpx;">{{DataList.address}}</text>
				</view>
			</view>

			<!-- <view @click="skipincludetasks" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">包含项目</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe621;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
				</view>
			</view> -->

			<view class="flex justify-between bg-white p-2 mt-2" @click="skipRewardAmount"
				v-if="DataList.fee_status == 0">
				<view class="flex flex-column">
					<view class="flex align-center">
						悬赏金额
					</view>
					<text class="mt-1" style="color: red;font-weight: bold;">￥{{DataList.fee}}</text>
				</view>
				<u-icon name="arrow-right" color="#ccc" size="28"></u-icon>
			</view>

			<view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<view class="flex">
						<text style="font-size: 26rpx;color: #999;">到期时间</text>
						<text style="font-size: 26rpx;color: #4CAF50;" class="ml-1">{{DataList.end_date}}</text>
					</view>
					<view class="">
						<text style="font-size: 26rpx;color: #FF9900;">剩余({{DataList.end_day}}天)</text>
						<!-- <text style="font-size: 26rpx;color: #FF9900;">{{DataList.end_date}}</text> -->
					</view>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<u-line-progress active-color="#2979ff" :percent="getDate()" :striped="true" :striped-active="true">
					</u-line-progress>
				</view>
			</view>

			<view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between align-center">
					<view class="flex">
						<text style="font-size: 26rpx;color: #999;">参与设计师</text>
						<text style="font-size: 26rpx;color: #FF9900;" class="ml-1">{{DataList.designers.length}}</text>
					</view>
					<u-icon v-if="rankno==0" name="arrow-right" color="#ccc" size="28"></u-icon>
				</view>
				<view v-if="DataList.designers.length==0" class="flex align-center justify-center"
					style="width: 670rpx;height: 100rpx;">
					<text>暂无设计师</text>
				</view>
				<view v-else @click="JoinUser(DataList.designers)" class="flex flex-wrap pt-1" style="width: 670rpx;">
					<image :src="sitem.header" v-for="(sitem,sindex) in DataList.designers" class="rounded mr-1 mb-1"
						style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</view>
			
			<view class="flex flex-column bg-white mt-2 rounded" v-if="rankno!=0 && DataList.is_upload==0 && (DataList.order_design.status == -2 || DataList.order_design.status == 1) && DataList.status == 1">
				<view class="flex align-center justify-between px-3"
					style="border: 0px solid red;height: 120rpx;">
					<view class="flex align-center">
						<view class="flex align-center justify-center mr-3"
							style="width: 80rpx;height: 80rpx;background-color: #F7F7F7;border-radius: 50%;">
							<u-icon name="clock" color="#2BA1DE" size="40"></u-icon>
						</view>
						<view class="flex flex-column" style="font-size: 24rpx;">
							<text style="color: #939393;">设计方案</text>
							<text class="mt-1" style="color: red;">{{DataList.order_design.content}}</text>
						</view>
					</view>
					<!-- <u-icon name="arrow-right" color="#ccc" size="28"></u-icon> -->
				</view>
			</view>
			
			
			<!-- is_upload==0 表示上传 -->
			<view v-if="DataList.status==1&&rankno==1&&DataList.is_upload!=0" class="flex justify-center align-center" style="height: 200rpx;">
				<view @click="skipuploaddesign" class="flex flex-column align-center"
					style="background-color: #02B1BE;border-radius: 50rpx;padding: 0 80rpx;">
					<text class="iconfont text-white" style="font-size: 50rpx;">&#xe6a3;</text>
					<text class="text-white" style="font-size: 26rpx;">上传方案</text>
				</view>
			</view>


			<!-- rankno==1 设计师 -->
			<!-- status==1 才能上传方案 -->
			<!-- <block v-if="rankno!=1&&DataList.status!=1"> -->
			<block v-if="DataList.status!=1&&DataList.order_design.status >=0">
				<view class="flex flex-column bg-white mt-2" style="border-radius: 10rpx;"
					v-for="(item,index) in DataList.flows">
					<view class="flex align-center border-bottom mx-3" style="height: 80rpx;">
						<text>{{item.title}}</text>
					</view>
					<view class="flex flex-column" v-for="(item2,index2) in item.nodes" @tap="skipPageUrl(item2)">
						<view class="flex align-center justify-between px-3"
							style="border: 0px solid red;height: 120rpx;">
							<view class="flex align-center">
								<view class="flex align-center justify-center mr-3"
									style="width: 80rpx;height: 80rpx;background-color: #F7F7F7;border-radius: 50%;">

									<!-- <text class="iconfont" v-if="item2.status == 0" style="color: #02B1BE;font-size: 40rpx;">&#xe660;</text> -->
									<u-icon name="checkmark-circle" v-if="item2.status == 0" color="#02B1BE" size="40">
									</u-icon>
									<u-icon name="clock" v-else color="#2BA1DE" size="40"></u-icon>

								</view>
								<view class="flex flex-column" style="font-size: 24rpx;">
									<text style="color: #939393;">{{item2.title}}</text>
									<!-- status!=0显示红色 -->
									<!-- ==0显示蓝色 -->
									<!-- 用户 -->
									<bolck v-if="rankno==0">
										<text v-if="item2.status == 0" class="mt-1"
											style="color: #02B1BE;">{{item2.user_content}}</text>
										<text v-else class="mt-1" style="color: red;">{{item2.user_content}}</text>
									</bolck>
									<!-- 不是用户 -->
									<bolck v-if="rankno!=0">
										<text v-if="item2.status == 0" class="mt-1"
											style="color: #02B1BE;">{{item2.designer_content}}</text>
										<text v-else class="mt-1" style="color: red;">{{item2.designer_content}}</text>
									</bolck>

								</view>
							</view>
							<u-icon name="arrow-right" color="#ccc" size="28"></u-icon>
						</view>
					</view>
				</view>
			</block>



			<view v-if="State>=1" @click="SeeCase" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">设计方案</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 10rpx;"><text
						style="font-size: 26rpx;color: #FA3534;"></text></view>
			</view>
			<view v-if="State>=2" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">合同金额</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=3" style="font-size: 26rpx;color: #02B1BE;"><span
							style="font-size: 26rpx;">￥</span><span
							style="font-size: 30rpx; ">{{DataList.amount}}</span></text>
					<text v-else style="color:#EA8531;font-weight: bold;"><span style="font-size: 26rpx;">￥</span><span
							style="font-size: 30rpx; color: #EA8531;">{{DataList.amount}}</span></text>
				</view>
			</view>
			<view v-if="State>=2" @click="ContractInformation" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修设计合同信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=2&&State<3" style="font-size: 26rpx;color: #FA3534;">等待签订合同</text>
					<text v-if="State>=3" style="font-size: 26rpx;color: #02B1BE;">合同已签订</text>
				</view>
			</view>
			<view v-if="State>=4" @click="PaymentInformation" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">支付信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=4&&State<5" style="font-size: 26rpx;color: #FA3534;">等待支付</text>
					<text v-if="State>=5" style="font-size: 26rpx;color: #02B1BE;">已支付</text>

				</view>
			</view>
			<view v-if="State>=6" @click="Effect" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修效果图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text style="font-size: 26rpx;color: #FA3534;"></text>
					<text v-if="State>=6&&State<7" style="font-size: 26rpx;color: #FA3534;">等待确设计方案</text>
					<text v-if="State>=7" style="font-size: 26rpx;color: #02B1BE;">设计方案已确定</text>

				</view>
			</view>
			<view v-if="State>=8" @click="Construction" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修施工施工图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=8&&State<9" style="font-size: 26rpx;color: #FA3534;">等待确认施工图</text>
					<text v-if="State>=9" style="font-size: 26rpx;color: #02B1BE;">设计施工图已确定</text>
				</view>
			</view>
			<view v-if="State>=10" @click="BillMaterials" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">材料清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=10&&State<11" style="font-size: 26rpx;color: #FA3534;">等待确认材料清单</text>
					<text v-if="State>=11" style="font-size: 26rpx;color: #02B1BE;">材料清单已确定</text>
				</view>
			</view>
			<view v-if="State>=12" @click="PersonnelList" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">人员清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=12&&State<13" style="font-size: 26rpx;color: #FA3534;">等待确认施工人员清单</text>
					<text v-if="State>=13" style="font-size: 26rpx;color: #02B1BE;">施工人员清单已确定 </text>
				</view>
			</view>
			<!-- <view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">施工节点</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">请填写施工日志</text></view>
			</view> -->
			<view v-if="State>=14" @click="ConstructionContract" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修施工合同</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=14&&State<15" style="font-size: 26rpx;color: #FA3534;">等待签订合同</text>
					<text v-if="State>=15" style="font-size: 26rpx;color: #02B1BE;">合同已签订</text>
				</view>
			</view>
			<view v-if="State>=17" @click="PayManageAmount" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">装修施工管理费支付信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text v-if="State>=17&&State<18" style="font-size: 26rpx;color: #FA3534;">等待支付</text>
					<text v-if="State>=18" style="font-size: 26rpx;color: #02B1BE;">已支付</text>

				</view>
			</view>
			<view v-if="State>=18" @click="ConstructionNode" class="flex flex-column px-2 bg-white mt-2 pt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">施工节点</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text
						style="font-size: 26rpx;color: #EA8531;">查看写施工日志</text></view>
			</view>
		</view>

		<!-- <view class="flex justify-center align-center" style="height: 200rpx;">
			<view @click="skipuploaddesign" class="flex flex-column align-center"
				style="background-color: #02B1BE;border-radius: 50rpx;padding: 15rpx 120rpx;">
				<text class="iconfont text-white" style="font-size: 40rpx;">&#xe6a3;</text>
				<text class="text-white mt-1" style="font-size: 26rpx;">上传方案</text>
			</view>
		</view> -->


		<!-- 占位 -->
		<view style="height: 140rpx;"></view>
		<view v-if="DataList.status == 10" class="position-fixed bg-white flex align-center justify-center" style="height: 140rpx;width: 100%;bottom: 0;">
			<view @click="pay" class="flex align-center justify-center rounded" style="background-color: #FF9900;width: 690rpx;height: 80rpx;">
				<text class="text-white">去支付</text>
			</view>
		</view>

		<!-- <view class="flex align-center justify-center" style="width: 350rpx;">
			<text style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">拒绝</text>
			<text class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">接受</text>
		</view> -->

		<!-- <view @click="checkUserToRoom" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #DD6666;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex flex-column align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;margin-top: 5rpx;">&#xe6ad;</text>
				<text class="text-white" style="font-size: 22rpx;margin-top: -10rpx;">管家</text>
			</view>
		</view> -->

		<view class="position-fixed" v-if="SchemeMenu"
			style="width: 750rpx;height: 100vh;top: 0;z-index: 9999;background-color: rgba(255,255,255,0.8);">
			<view class="flex flex-column align-center" style="width: 100%;height: 100%;">
				<text style="font-size: 40rpx;font-weight: bold;margin-top: 200rpx;">请选择你要发布方案的方式</text>
				<view @click="ImageText" class="flex flex-column py-4 pl-5 rounded"
					style="margin-top: 100rpx;background-color: #FFF0D2;width:400rpx;">
					<text style="color: #FF9900;font-size: 28rpx;font-weight: bold;">图文</text>
					<text style="color: #FF9900;font-size: 26rpx;">图片加文本展示方案</text>
				</view>
				<view @click="DesignSketch" class="flex flex-column py-4 pl-5 rounded"
					style="margin-top: 50rpx;background-color: #C3D5FF;width:400rpx;">
					<text style="color: #234799;font-size: 28rpx;font-weight: bold;">3D效果图</text>
					<text style="color: #234799;font-size: 26rpx;">上传酷家乐链接</text>
				</view>
				<!-- 暂时屏蔽 -->
				<!-- <view @click="Copy" class="flex flex-column py-4 pl-5 rounded" style="margin-top: 50rpx;background-color: #BCEDFF;width:400rpx;">
					<text style="color: #096E93;font-size: 28rpx;font-weight: bold;">复制</text>
					<text style="color: #096E93;font-size: 26rpx;">选择已有的方案复制修改</text>
				</view> -->
				<view @click="SchemeMenu=false" class="flex align-center justify-center"
					style="width: 80rpx;height: 80rpx;border-radius: 50%;background-color: #ECECEC;margin-top: 100rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #666;">&#xe92a;</text>
				</view>
			</view>
		</view>
		
		<!-- 立即支付弹出层 -->
		<u-popup v-model="ShowPopup" mode="bottom" border-radius="20" :closeable="true">
			<view class="flex justify-center align-center mb-2 mt-4">
				<text style="font-size: 36rpx;color: #000000;font-weight: bold;">支付方式</text>
			</view>
			<!-- <view class="flex justify-center align-center">
				<text style="font-size: 30rpx;color: #FF0000;font-weight: bold;">￥</text><text style="font-size: 50rpx;color: #FF0000;font-weight: bold;">{{DataList.paying.money}}</text>
			</view> -->
			<view class="flex flex-column bg-white rounded mt-3">
				<!-- 支付宝 -->
				<view class="flex justify-between align-center p-3">
					<view class="flex align-center">
						<u-icon name="zhifubao-circle-fill" color="#00A0E9" size="50"></u-icon>
						<text class="ml-2" style="font-size: 30rpx;color: #000000;">支付宝</text>
					</view>
					<view class="flex align-center justify-end">
						<u-radio-group width="40rpx" size="38" v-model="value" @change="radioGroupChange">
							<u-radio @change="radioChange" :name="list[0].name" :disabled="list[0].disabled"
								active-color="#ff9900" :icon-size="20">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<!-- 微信支付 -->
				<view class="flex justify-between align-center p-3">
					<view class="flex align-center">
						<u-icon name="weixin-circle-fill" color="#62B900" size="50"></u-icon>
						<text class="ml-2" style="font-size: 30rpx;color: #000000;">微信支付</text>
					</view>
					<view class="flex align-center justify-end">
						<u-radio-group width="40rpx" size="38" v-model="value" @change="radioGroupChange">
							<u-radio @change="radioChange" :name="list[1].name" :disabled="list[1].disabled"
								active-color="#ff9900" :icon-size="20">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-center" style="height: 150rpx;">
				<u-button @click="PayImmediately" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">
					立即支付</u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.order_id = options.order_id;
			this.status = options.status;
			if (options.module != 'undefined') {
				this.module = options.module
			}
			if (options.order_design_id != 'undefined') {
				this.order_design_id = options.order_design_id
			}
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				ShowPopup: false,
				list: [{
						name: 'zhifubao',
						disabled: false
					},
					{
						name: 'weixin',
						disabled: false
					}
				],
				value: 'zhifubao',
				ShowPay: true,
				PayList: [],
				pay_id:'',
				
				rankno: uni.getStorageSync('rankno'),
				module: '',
				status: '', //订单状态
				order_id: '',
				order_design_id: '',
				id: 0,
				State: 0,
				SchemeMenu: false,
				ismy: false,
				issxx: false,
				isVip: false,
				isDesing: false,
				DataList:{
				    id: "",
				    order_id: "",
				    user_id: "",
				    designer_id: "",
				    name: "",
				    header: "",
				    money: "",
				    design_tags: [
				        
				    ],
				    content: "",
				    estate_title: "",
				    estate_tags: "",
				    province: "",
				    city: "",
				    county: "",
				    lat: "",
				    lng: "",
				    address: "",
				    start_date: "",
				    day_count: "",
				    end_day: "",
				    end_date: "",
				    designer_count: "",
				    designers: [],
				    designer: {
				        
				    },
				    fee: "",
				    fee_status: "",
				    status: "",
				    flows: [
				        
				    ],
				    is_upload: "",
				    order_design: {
				        status: "",
				        content: ""
				    }
				},
				loadingText: '加载中...',
				toUser: {}
			}
		},
		methods: {
			// 立即支付点击事件
			pay() {
				// 获取支付通道
				this.$post(this.$url.Task.GetPays, {
					order_money_id: this.DataList.fee_order_money_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					console.log(JSON.stringify(res))
					this.PayList = res.data;
					this.ShowPopup = true;
				});
			},
			// 立即支付点击事件
			PayImmediately() {
				// this.toPay(this.value);
				console.log(this.value)
				if (this.value == 'zhifubao') {
					console.log(JSON.stringify(this.PayList))
					this.PayList.forEach(item => {
						if (item.provider == 'alipay') {
							this.pay_id = item.id;
						}
					})
					// 支付宝支付
					this.alipay();
				}
				if (this.value == 'weixin') {
					this.PayList.forEach(item => {
						if (item.provider == 'wepay') {
							this.pay_id = item.id;
						}
					})
					// 微信支付
					this.wxpay();
				}
			},
			// 支付宝支付
			alipay() {
				let requestData = {
					order_money_id: this.DataList.fee_order_money_id,
					pay_id: this.pay_id
				}
				console.log(JSON.stringify(requestData))
				// 8.3、获取订单支付通道
				this.$post(this.$url.Task.GetPayParas, requestData, {
					isLoading: false,
					loadingTitle: ''
				}).then(res => {
					console.log(JSON.stringify(res))
					uni.requestPayment({
						provider: 'alipay',
						// orderInfo:'服务端生成的支付订单信息',
						orderInfo: res.data,
						success: res => {
							this.ShowPopup = false; //关闭弹窗
							// setTimeout(() => {
							// 	this.$refs.uToast.show({
							// 		title: '支付成功！',
							// 		type: 'success'
							// 	})
							// }, 100)
							// // 刷新当前页面
							// this.InitData();
							this.$refs.uToast.show({
								title: '支付成功！',
								type: 'success'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},2000)
						},
						fail: err => {
							console.log('fail:' + JSON.stringify(err));
							this.ShowPopup = false; //关闭弹窗
							uni.showToast({
								title: '支付取消',
								icon: 'none',
								duration: 2000
							})
						}
			 		});
				});
			},
			// 微信支付
			wxpay() {
				// 8.3、获取订单支付通道
				this.$post(this.$url.Task.GetPayParas, {
					order_money_id: this.DataList.fee_order_money_id,
					pay_id: this.pay_id
				}, {
					isLoading: false,
					loadingTitle: ''
				}).then(res => {
					console.log(res.data)
					uni.requestPayment({
						provider: 'wxpay',
						// orderInfo:'服务端生成的支付订单信息',
						orderInfo: JSON.parse(res.data),
						success: res => {
							this.ShowPopup = false; //关闭弹窗
							// setTimeout(() => {
							// 	this.$refs.uToast.show({
							// 		title: '支付成功！',
							// 		type: 'success'
							// 	})
							// }, 100)
							// // 刷新当前页面
							// this.InitData();
							this.$refs.uToast.show({
								title: '支付成功！',
								type: 'success'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},2000)
						},
						fail: err => {
							console.log('fail:' + JSON.stringify(err));
							this.ShowPopup = false; //关闭弹窗
							uni.showToast({
								title: '支付取消',
								icon: 'none',
								duration: 2000
							})
						}
					});
				});
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
			
			},
			InitData() {
				this.$post(this.$url.Task.GetTask, {
					order_id: this.order_id,
					order_design_id: this.order_design_id,
					module:this.module
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data;
				});
			},
			skipPageUrl(item) {
				console.log(JSON.stringify(item))
				// file.$post
				uni.navigateTo({
					url: `${item.file}&module=${this.module}`
				})
			},
			// 上传方案点击事件
			skipuploaddesign() {
				// 显示方案菜单
				this.SchemeMenu = true;
			},
			// 图文
			ImageText() {
				// 跳转到方案设计
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/conceptualdesign?order_id=' + this.DataList.order_id+'&node_code=design-1'
				})
				this.SchemeMenu = false;
			},
			// 3D效果图
			DesignSketch() {
				// 跳转到方案设计（3D效果图）
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/conceptualDesignSketch?order_id=' + this.DataList.order_id
				})
				this.SchemeMenu = false;
			},
			// 复制
			Copy() {
				// 跳转到我的方案
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/myplan?id=' + this.DataList.id
				})
			},
			// 跳转到管家聊天界面
			checkUserToRoom() {
				var toUserInfo = {
					"UserID": this.DataList.tel,
					"NickName": this.DataList.name
				}
				this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				});
			},
			// 跳转到悬赏金额
			skipRewardAmount() {
				// uni.navigateTo({
				// 	url: '/pages/design/reward_amount'
				// })
				uni.navigateTo({
					url:`/pages/ServiceOrder/Paid?order_id=${this.order_id}&catalog=3&title=悬赏金额&code=fee&module=${this.module}`
				})
			},
			getDate() {
				
				// console.log(time.toFixed(1));
				
				
				if ((this.DataList.day_count??'') != '') {
					let time = ((parseFloat(this.DataList.day_count) - parseFloat(this.DataList.end_day)) / parseFloat(this
						.DataList.day_count)) * 100;
						if(time==0){
							return 0
						}
						return time.toFixed(2)
				}else{
					return 0
				}
				
				
				// return 0;
				
				// 向下取整 92.1 取92 92.9也是取92
				// return time.toFixed(0)
				// console.log(time.toFixed(0))
				// return Math.floor(time)
			},
			// 显示弹出框菜单
			skipincludetasks() {
				// 跳转到包含任务界面
				uni.navigateTo({
					url: '/pages/tabBar/message/NavMenu/includetasks?id=' + this.DataList.id
				})
			},
			JoinUser(item) {
				if (this.rankno == 0) {
					// 跳转到参与设计师界面
					uni.navigateTo({
						url: '/pages/tabbar/message/NavMenu/ParticipatingDesigners?order_id=' + this.order_id
					})
				}
			},
			Effect() {
				// 跳转到上传设计施工图
				uni.navigateTo({
					// url: '/pages/tabBar/message/NavMenu/uploaddesignscheme'
					url: '/pages/tabBar/message/SubPage/DesignEffectConfirm?id=' + this.DataList.id
				});
			},
			Construction() {
				// 跳转到上传设计施工图
				uni.navigateTo({
					// url: '/pages/tabBar/message/NavMenu/uploaddesignscheme'
					url: '/pages/tabbar/message/SubPage/DesignConstructionConfirm?id=' + this.DataList.id
				});
			},
			// 合同信息
			ContractInformation() {
				if (this.State <= 3) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 3
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				//e签宝注册
				var RequrestUrl = this.AJB.BizUrl + 'api/Esign/RegisteredEsign';
				var RequrestDatas = {};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {

					})
					.catch(err => {
						console.log(err);
					});
				uni.navigateTo({
					url: '/pages/ServiceOrder/ContractInformation?id=' + this.DataList.id
				})
			},
			// 支付信息
			PaymentInformation() {
				// 页面修改
				if (this.State <= 4) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 5
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				// uni.navigateTo({
				// 	url: '/pages/ServiceOrder/PaymentInformation?id=' + this.DataList.id
				// })

				// 跳转到支付服务界面
				uni.navigateTo({
					url: '/pages/ServiceOrder/Pay/Index?id=' + this.DataList.id + '&amount=' + this.DataList.amount
				})

			},
			ConstructionContract() {
				if (this.State <= 14) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 15
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				uni.navigateTo({
					url: '/pages/ServiceOrder/ContractInformation?id=' + this.DataList.id
				})
			},
			PayManageAmount() {
				// 页面修改
				if (this.State <= 17) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Design/DesingnConfirms";
					var RequrestDatas = {
						id: this.DataList.id,
						type: 18
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '设计方案确认成功!',
									type: 'success'
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
				// 跳转到支付服务界面
				uni.navigateTo({
					url: '/pages/ServiceOrder/Pay/ManageAmount?id=' + this.DataList.id + '&amount=' + this.DataList
						.manageAmount + '&State=' + this.State
				})


			},

			// ContractAmount() {
			// 	uni.navigateTo({
			// 		url: '/pages/tabBar/message/NavMenu/ContractAmount/ContractAmount?isDesin=true&id=' + this.DataList.id +
			// 			"&Amount=" + this.DataList.amount
			// 	})
			// },
			// 材料清单
			BillMaterials() {
				uni.navigateTo({
					url: '/pages/ServiceOrder/BillMaterialsConfirm?id=' + this.DataList.id + '&State=' + this
						.State + '&toUser=' + JSON.stringify(this.toUser)
				})
			},
			// 人员清单
			PersonnelList() {
				uni.navigateTo({
					url: '/pages/ServiceOrder/PersonnelConfirm?id=' + this.DataList.id + '&State=' + this.State
				})
			},
			SeeCase() {
				console.log(JSON.stringify(this.DataList))
				uni.navigateTo({

					url: '/pages/ServiceOrder/ConceptualDesign?id=' + this.DataList.joinId
				})
			},
			ConstructionNode() {
				uni.navigateTo({
					url: '/pages/ServiceOrder/ConstructionNode?id=' + this.DataList.id + '&isSee=true'
				})
			}

		},
		filters: {
			formatDate: function(value) {
				var arr = value.split("T");
				return arr[0];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-title {
		font-size: 24rpx;
		color: #888;
	}

	.text-content {
		font-size: 26rpx;
		color: #101010;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
