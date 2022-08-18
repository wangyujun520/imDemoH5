//接口地址
export default {
	//公共接口
	Common: {
		GetMyAuthentication: '/MyAuthentication/GetMyAuthentication', //获取用户个人信息
		GetMenus: '/Biz/GetMenus', //获取菜单明细
		GetUsers: '/Biz/GetUsers', //获取员工明细
		GetUser: '/Biz/GetUser', //获取员工详情
		GetVersion: '/App/GetVersion' //获取系统版本
	},
	// 监理
	Supervisor:{
		GetOrders:'/Supervisor/GetOrders'//获取监理工单明细
	},
	// 监理
	Work:{
		GetTask:'/Work/GetTask',//获取施工详情
		ArgSurveyor:'/Work/ArgSurveyor',//同意、拒绝施工方案
		GetTaskWorkers:'/Work/GetTaskWorkers',//获取项目的工人清单
		GetWorkers:'/Work/GetWorkers',//获取工人明细
		GetWorkNodeLog:'/Work/GetWorkNodeLog',//获取施工节点详情
		AddWorker:'/Work/AddWorker',//选择工人
		GetWorkCatalog:'/Work/GetWorkCatalog',//获取施工类型
		PostWorkLog:'/Work/PostWorkLog',//发布施工内容
		ApplyCheckOrder:'/Work/ApplyCheckOrder',//施工方案验收
		GetWorkNodes:'/Work/GetWorkNodes',//获取施工节点明细
		DelWorker:'/Work/DelWorker',//删除项目工人
		SetWorker:'/Work/SetWorker',//发送给客户确定
		SelectWorker:'/Work/SelectWorker',//用户选择工人
		GetWorkSign:'/Work/GetWorkSign',//获取合同信息
		GetPayOrder:'/Work/GetPayOrder',//获取支付信息
		CreateWorkSign:'/Work/CreateWorkSign'//创建施工合同信息
		
	},
	// 工人
	Worker:{
		GetOrders:'/Worker/GetOrders',//获取工人施工工单明细
		GetOrder:'/Worker/GetOrder',//获取施工工单详情
		ArgOrder:'/Worker/ArgOrder'//同意、拒绝施工方案
	},
	Task:{
		UpdateMaterialStatus:'/Task/UpdateMaterialStatus',//更新材料项状态
		AppendFee:'/Task/AppendFee',//追加金额
		GetOrderMoneys:'/Task/GetOrderMoneys',//获取订单支付明细
		ApplyRefund:'/Task/ApplyRefund',//申请退款
		SelectSurveyor:'/Task/SelectSurveyor',//用户选择监理
		AddSurveyor:'/Task/AddSurveyor',//增加监理
		GetTaskSurveyors:'/Task/GetTaskSurveyors',//获取方案监理明细
		DelSurveyor:'/Task/DelSurveyor',//删除监理
		GetSurveyors:'/Task/GetSurveyors',//获取任务的监理明细
		SetSurveyor:'/Task/SetSurveyor',//设置任务的监理、选择监理
		ArgWorking:'/Task/ArgWorking',//同意、拒绝施工清单方案
		SetWorking:'/Task/SetWorking',//设置施工方案、发送施工方案
		GetWorking:'/Task/GetWorking',//获取施工清单
		DelMaterialItem:'/Task/DelMaterialItem',//删除
		UpdateMaterialItemStatus:'/Task/UpdateMaterialItemStatus',//更新材料项状态
		AddMaterialItem:'/Task/AddMaterialItem',//增加材料明细
		ArgMaterial:'/Task/ArgMaterial',//同意、拒绝耗材推荐方案
		SetMaterial:'/Task/SetMaterial',//设置耗材、材料方案状态 
		GetMaterial:'/Task/GetMaterial',//获取材料方案
		ArgDesignDrawing:'/Task/ArgDesignDrawing',//设计效果图接受、拒绝
		ArgWorkDrawing:'/Task/ArgWorkDrawing',//施工效果图接受、拒绝 
		ArgMoney:'/Task/ArgMoney',//费用方案接受、拒绝
		GetPoint:'/Task/GetPoint',//获取评价信息
		TaskPoint:'/Task/TaskPoint',//任务评价
		GetPayParas:'/Task/GetPayParas',//获取支付参数
		GetPays:'/Task/GetPays',//获取支付通道
		CreateDesignSign:'/Task/CreateDesignSign',//创建设计合同信息
		GetPayOrder:'/Task/GetPayOrder',//获取设计费用详情
		GetDesignSign:'/Task/GetDesignSign',//获取设计合同信息
		GetMoneys:'/Task/GetMoneys',//获取费用明细
		GetDesignMoneys:'/Task/GetDesignMoneys',//获取显示费用明细
		SetMoney:'/Task/SetMoney',//设置费用明细
		DealOrderDesign:'/Task/DealOrderDesign',//处理设计方案/拒绝、接收方案
		UpdateDesign:'/Task/UpdateDesign',//发布、更新方案设计
		GetDesignOrders:'/Task/GetDesignOrders',//
		GetTasks:'/Task/GetTasks',//获取任务大厅明细
		GetTask:'/Task/GetTask',//设计详情
		GetLogs:'/Task/GetLogs',//获取我的任务明细
		GetOrders:'/Task/GetOrders',//获取设计需求明细
		GetOrder:'/Task/GetOrder',//获取设计需求详情
		GetDesigners:'/Task/GetDesigners'//获取需求的设计师明细
	},
	Estate:{
		GetDevs:'/Estate/GetDevs',//获取开发商明细
		GetBuildings:'/Estate/GetBuildings',//获取小区明细
		GetBuilding:'/Estate/GetBuilding',//获取楼盘详情
		GetEsates:'/Estate/GetEsates',//获取楼盘明细
		GetEsate:'/Estate/GetEsate',//获取楼盘详情
		GetDesignPrice:'/Estate/GetDesignPrice'//获取装修报价
	},
	Design:{
		Post:'/Design/Post',//我要设计
		UpdateCase:'/Design/UpdateCase',//新增、更新案例
		DelCase:'/Design/DelCase',//删除案例
		GetDesigners:'/Design/GetDesigners',//获取设计师列表
		GetDesigner:'/Design/GetDesigner',//获取设计师详情
		GetLogs:'/Design/GetLogs',//获取装修记录
		GetDetail:'/Design/GetDetail',//获取装修详情
		GetTasks:'/Design/GetTasks',//获取全部工单
		GetTask:'/Design/GetTask',//获取工单详情
		GetProjects:'/Design/GetProjects',//获取我的方案
		GetCases:'/Design/GetCases',//获取我的案例
		GetOrders:'/Design/GetOrders',//获取设计订单明细
		GetOrder:'/Design/GetOrder'//获取设计订单详情
		
	},
	Service:{
		GetOrders:'/Service/GetOrders',//获取保修订单明细
		GetOrder:'/Service/GetOrder',//获取保修订单详情
		Order:'/Service/Order'//保修预约
	},
	Public:{
		GetDicts:'/Public/GetDicts',//获取数据字典
	},
	App: {
		FeedBack: '/App/FeedBack',//建议反馈
		GetSysMsg:'/App/GetSysMsg',//获取系统消息明细
		GetVersion:'/App/GetVersion'//获取系统版本
	},
	// 账户相关
	Account: {
		SaveBank:'/Account/SaveBank',//新增、编辑银行卡
		GetPoints:'/Account/GetPoints',//获取我的积分明细
		GetBanks:'/Account/GetBanks',//获取我的收款方式
		GetWallet: '/Account/GetWallet', //获取钱包信息
		GetTakingMoneys: '/Account/GetTakingMoneys', //获取我的财务明细
		GetPointBags: '/Account/GetPointBags', //获取安得分明细
		GetGift: '/Account/GetGift', //获取礼包详情
		GetGifts: '/Account/GetGifts', //获取礼包明细
		GetCoins: '/Account/GetCoins', //获取平台币明细
		TakingMoney: '/Account/TakingMoney', //提现
	},
	// 系统消息相关
	Msg: {
		GetSysMsgs: '/Msg/GetSysMsgs', //获取系统消息
		GetOrderMsgs: '/Msg/GetOrderMsgs', //获取订单消息
		DealJobInvite: '/Msg/DealJobInvite' //招聘消息处理
	},
	// 内容模块
	Article: {
		CreateDesignSign:'/Article/CreateDesignSign',//创建合同
		GetArticles: '/Article/GetArticles', //获取公示公告
		GetArticle: '/Article/GetArticle', //获取内容详情
		GetCatalogs: '/Article/GetCatalogs', //获取菜单目录明细
		GetBanners: '/Article/GetBanners', //获取banner明细
	},
	Case:{
		GetDesigners:'/Case/GetDesigners',//获取设计师列表
		GetCases:'/Case/GetCases',//获取案例明细
		GetCase:'/Case/GetCase',//获取案例详情
		GetTestStyles:'/Case/GetTestStyles',//获取测试图片组
		LikeResult:'/Case/LikeResult',//提交喜欢、不喜欢
		GetStyle:'/Case/GetStyle',//获取风格测试结果
		GetStyleContent:'/Case/GetStyleContent'//获取风格测试结果
	},
	// 服务商模块
	Agent: {
		GetBizCount: '/Agent/GetBizCount', //获取服务商相关业务数量
		GetOrders: '/Agent/GetOrders', //获取订单明细
		PostLoanPlan: '/Agent/PostLoanPlan', //提交报送方案
		FinishParkingLoanPlan: '/Agent/FinishParkingLoanPlan', //确认成交
		GetOrderChart: '/Agent/GetOrderChart', //获取服务商成交走势图
		GetBizInfo: '/Agent/GetBizInfo' //获取服务机构信息
	},
	//用户模块
	User: {
		GetOrderWorks:'/User/GetOrderWorks',//获取施工工单明细
		CheckCreateActivity:'/User/CheckCreateActivity',//校验活动创建状态
		SetDefaultCert:'/User/SetDefaultCert',//设为默认
		GetMenus:'/User/GetMenus',//获取用户功能菜单
		GetMallUser:'/User/GetMallUser',//获取商铺员工
		GetWorkerCert:'/User/GetWorkerCert',//获取设计师、工人、销售、监理认证信息
		GetMallCert:'/User/GetMallCert',//获取商铺认证信息
		GetLikes:'/User/GetLikes',//获取点赞
		Like:'/User/Like',//点赞、取消点赞
		GetFavorites:'/User/GetFavorites',//获取我的关注
		Favorite:'/User/Favorite',//关注 取消关注
		UpdateMallCert:'/User/UpdateMallCert',//商铺认证
		UpdateWorkerCert:'/User/UpdateWorkerCert',//计师、工人、销售、监理认证认证
		GetBankCatalogs:'/User/GetBankCatalogs',//获取银行列表
		GetCatalogCerts:'/User/GetCatalogCerts',//获取认证的类型
		GetMyWorkCerts:'/User/GetMyWorkCerts',//获取我已经认证的工种
		GetMyCerts:'/User/GetMyCerts',//获取我已经认证明细
		DelActivity:'/User/DelActivity',//删除活动
		GetDesignOrders:'/User/GetDesignOrders',//获取安居档案明细
		UpdateActivity:'/User/UpdateActivity',//新增、更新活动
		GetActivities:'/User/GetActivities',//获取我的活动明细
		GetHouses:'/User/GetHouses',//获取我的房产明细
		GetBanks: '/User/GetBanks', //获取我的银行卡明细
		SaveBank: '/User/SaveBank', //保存银行卡信息
		CloseAccount: '/User/CloseAccount', //注销账号
		GetShareParas: '/User/GetShareParas', //获取分享参数
		GetGift: '/User/GetGift', //获取礼包详情
		GetFavoriteParkings: '/User/GetFavoriteParkings', //获取我的收藏
		GetHistoryParkings: '/User/GetHistoryParkings', //获取我的足迹
		GetMyParkings: '/User/GetMyParkings', //获取我的车位
		GetCard_Coupons: '/User/GetCard_Coupons', //获取卡券明细
		GetCards: '/User/GetCards', //获取服务卡明细
		GetCoupons: '/User/GetCoupons', //获取优惠券
		Update: '/User/Update', //更新用户数据
		GetBaseData: '/User/GetBaseData', //获取用户基础数据
		UserLogin: '/User/UserLogin', //账号密码登录
		SendSms: '/User/SendSms', //手机号登录短信发送
		SmsLogin: '/User/SmsLogin', //短信验证码登录
		SmsUpdatePassword: '/User/SmsUpdatePassword', //用户短信登陆后修改密码
		ForgetPassword: '/User/ForgetPassword', //忘记密码修改密码
		RealNameAuthentication: '/User/RealNameAuthentication', //实名认证
		GetRealNameAuthentication: '/User/GetRealNameAuthentication', //获取实名认证信息
		GetOrders: '/User/GetOrders', //获取订单明细
		GetOrder: '/User/GetOrder', //获取订单详情
		OrderPoint: '/User/OrderPoint', //订单评价
		GetCheckOrder: '/User/GetCheckOrder', //获取核销详情
		GetOrderParkingLoans: '/User/GetOrderParkingLoans', //10.1、获取方案明细
		SelectParkingLoanPlan: '/User/SelectParkingLoanPlan', //10.2、选中方案
		GetOrderParkingLoan: '/User/GetOrderParkingLoan', //10.3、获取方案详情
		GetMyHouses: '/User/GetMyHouses', //获取我的房产明细
		GetHouse: '/User/GetHouse', //获取我的房产
		SaveHouse: '/User/SaveHouse', //新增、编辑我的房产
		GetRcmdCount: '/User/GetRcmdCount', //获取我的推荐数量
		GetRcmdList: '/User/GetRcmdList', //获取我的推荐明细
		// 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
		GetBizInfo: '/User/GetBizInfo', //获取销售顾问信息
		GetBizCount: '/User/GetBizCount', //获取销售顾问数量
		GetOrderParkingBooks: '/User/GetOrderParkingBooks', //9.1、获取预定订单明细
		UpdateParkingBookStatus: '/User/UpdateParkingBookStatus', //9.2、预定订单状态变更
		GetOrderParkingBookArgs: '/User/GetOrderParkingBookArgs', //9.3、获取预定协议明细
		UpdateParkingBookArgStatus: '/User/UpdateParkingBookArgStatus', //9.4、预定订单协议状态变更
		GetOrderParkingDeposits: '/User/GetOrderParkingDeposits', //9.5、获取预付订金明细
		UpdateParkingDepositStatus: '/User/UpdateParkingDepositStatus', //9.6、预定订金状态变更
		GetOrderParkingArgs: '/User/GetOrderParkingArgs', //9.7、获取等待成交明细
		UpdateParkingArgStatus: '/User/UpdateParkingArgStatus', //9.8、等待成交信息变更
		GetOrderParkingFinishs: '/User/GetOrderParkingFinishs', //9.9、获取成交订单明细
		UpdateParkingFinishStatus: '/User/UpdateParkingFinishStatus', //9.10、成交订单状态变更
		GetOrderParkingSettles: '/User/GetOrderParkingSettles', //9.11、获取结算订单明细
		GetSaleChart: '/User/GetSaleChart', //获取营销走势图
		GetOrderChart: '/User/GetOrderChart', //获取成交走势图
		// GetHistoryParkings:'/Sale/GetHistoryParkings',//获取开发商浏览明细
		// GetFavoriteParkings:'/Sale/GetFavoriteParkings'//获取开发商收藏明细
	},
	// 开发商模块
	Dev: {
		GetBizInfo: '/Dev/GetBizInfo', //获取开发商信息
		GetBizCount: '/Dev/GetBizCount', //获取开发商相关业务数量
		GetOrderParkingBooks: '/Dev/GetOrderParkingBooks', //9.1、获取预定订单明细
		UpdateParkingBookStatus: '/Dev/UpdateParkingBookStatus', //9.2、预定订单状态变更
		GetOrderParkingBookArgs: '/Dev/GetOrderParkingBookArgs', //9.3、获取预定协议明细
		UpdateParkingBookArgStatus: '/Dev/UpdateParkingBookArgStatus', //9.4、预定订单协议状态变更
		GetOrderParkingDeposits: '/Dev/GetOrderParkingDeposits', //9.5、获取预付订金明细
		UpdateParkingDepositStatus: '/Dev/UpdateParkingDepositStatus', //9.6、预定订金状态变更
		GetOrderParkingArgs: '/Dev/GetOrderParkingArgs', //9.7、获取等待成交明细
		UpdateParkingArgStatus: '/Dev/UpdateParkingArgStatus', //9.8、等待成交信息变更
		GetOrderParkingFinishs: '/Dev/GetOrderParkingFinishs', //9.9、获取成交订单明细
		UpdateParkingFinishStatus: '/Dev/UpdateParkingFinishStatus', //9.10、成交订单状态变更
		GetOrderParkingSettles: '/Dev/GetOrderParkingSettles', //9.11、获取结算订单明细
		GetSaleChart: '/Dev/GetSaleChart', //获取开发商营销走势图
		GetOrderChart: '/Dev/GetOrderChart', //获取开发商成交走势图
		GetHistoryParkings: '/Dev/GetHistoryParkings', //获取开发商浏览明细
		GetFavoriteParkings: '/Dev/GetFavoriteParkings' //获取开发商收藏明细
	},
	// 销售顾问
	Sale: {
		UpdateOrder:'/Sale/UpdateOrder',//新增、更新销售订单
		GetOrders:'/Sale/GetOrders',//获取销售订单明细
		GetOrder:'/Sale/GetOrder',//获取手动新增的订单详情
		GetBizInfo: '/Sale/GetBizInfo', //获取销售顾问信息
		GetBizCount: '/Sale/GetBizCount', //获取销售顾问数量
		GetGoods:'/Sale/GetGoods',//获取我的商品明细
		GetOrderParkingBooks: '/Sale/GetOrderParkingBooks', //9.1、获取预定订单明细
		UpdateParkingBookStatus: '/Sale/UpdateParkingBookStatus', //9.2、预定订单状态变更
		GetOrderParkingBookArgs: '/Sale/GetOrderParkingBookArgs', //9.3、获取预定协议明细
		UpdateParkingBookArgStatus: '/Sale/UpdateParkingBookArgStatus', //9.4、预定订单协议状态变更
		GetOrderParkingDeposits: '/Sale/GetOrderParkingDeposits', //9.5、获取预付订金明细
		UpdateParkingDepositStatus: '/Sale/UpdateParkingDepositStatus', //9.6、预定订金状态变更
		GetOrderParkingArgs: '/Sale/GetOrderParkingArgs', //9.7、获取等待成交明细
		UpdateParkingArgStatus: '/Sale/UpdateParkingArgStatus', //9.8、等待成交信息变更
		GetOrderParkingFinishs: '/Sale/GetOrderParkingFinishs', //9.9、获取成交订单明细
		UpdateParkingFinishStatus: '/Sale/UpdateParkingFinishStatus', //9.10、成交订单状态变更
		GetOrderParkingSettles: '/Sale/GetOrderParkingSettles', //9.11、获取结算订单明细
		GetSaleChart: '/Sale/GetSaleChart', //获取营销走势图
		GetOrderChart: '/Sale/GetOrderChart', //获取成交走势图
		GetHistoryParkings: '/Sale/GetHistoryParkings', //获取开发商浏览明细
		GetFavoriteParkings: '/Sale/GetFavoriteParkings' //获取开发商收藏明细
	},
	Mall: {
		AddActivityGoods:'/Mall/AddActivityGoods',//增加活动的商品
		GetMallHome:'/Mall/GetMallHome',//获取商城主页
		GetActivityGoods:'/Mall/GetActivityGoods',//获取活动的商品明细
		UpdateMallOrder:'/Mall/UpdateMallOrder',//接收、拒绝协同订单
		GetHelpOrders:'/Mall/GetHelpOrders',//获取销售协同明细
		GetHelpOrder:'/Mall/GetHelpOrder',//获取销售协同详情
		UpdateOrderMaterialItem:'/Mall/UpdateOrderMaterialItem',//更新商城订单项信息
		UpdateOrderMaterial:'/Mall/UpdateOrderMaterial',//更新商城订单信息
		GetOrderMaterialList:'/Mall/GetOrderMaterialList',//获取商城订单材料明细
		SetSalesman:'/Mall/SetSalesman',//设置销售人员
		GetBrands:'/Mall/GetBrands',//获取商品品牌
		UpdateMallGoods:'/Mall/UpdateMallGoods',//新增、更新商城商品基础信息
		DelMallGoods:'/Mall/DelMallGoods',//删除商城商品
		GetSaleInfo:'/Mall/GetSaleInfo',//获取上架信息
		UpdateSaleInfo:'/Mall/UpdateSaleInfo',//更新上架信息
		GetMallGoods:'/Mall/GetMallGoods',//获取商城商品管理明细
		GetMallOrders:'/Mall/GetMallOrders',//获取销售协同明细
		GetMallOrder:'/Mall/GetMallOrder',//获取销售协同详情
		UpdateMallOrder:'/Mall/UpdateMallOrder',//接收、拒绝协同订单
		GetActivities:'/Mall/GetActivities',//获取活动明细
		GetActivity:'/Mall/GetActivity',//获取活动详情
		GetActivitie:'/Mall/GetActivitie',//获取活动详情
		GetCatalogs:'/Mall/GetCatalogs',//获取商品类别
		GetGiftBags: '/Mall/GetGiftBags', //获取套餐礼包
		GetHomeGoods: '/Mall/GetHomeGoods', //获取首页服务明细
		GetBanners: '/Mall/GetBanners', //获取banner明细
		GetBizInfo: '/Mall/GetBizInfo', //获取商家信息
		// 门店管理相关
		UpdateBizStore: '/Mall/UpdateBizStore', //更新（新增）门店信息
		GetBizStores: '/Mall/GetBizStores', //获取门店明细
		GetMyStores: '/Mall/GetMyStores', //获取我管理的门店明细
		GetStoreQR: '/Mall/GetStoreQR', //获取店铺二维码
		GetCheckOrders: '/Mall/GetCheckOrders', //获取核销订单明细
		GetGoods: '/Mall/GetGoods', //获取商品明细
		GetGoodsDetail: '/Mall/GetGoodsDetail', //获取商品详情
		GetStore: '/Mall/GetStore', //获取门店详情
		GetBiz: '/Mall/GetBiz', //获取商铺详情
		AddOrder: '/Mall/AddOrder', //提交订单
		GetPayOrder: '/Mall/GetPayOrder', //获取待支付预览信息
		PayOrder: '/Mall/PayOrder', //支付订单
		GetOrders: '/Mall/GetOrders', //获取订单明细
		GetOrder: '/Mall/GetOrder', //获取订单详情
		GetCheckOrder: '/Mall/GetCheckOrder', //获取核销详情
		GetComments: '/Mall/GetComments', //获取评论明细
		GetMenu: '/Mall/GetMenu', //获取菜单
		GetInviteInfo: '/Mall/GetInviteInfo', //获取邀请信息
		JoinUs: '/Mall/JoinUs' //加入我们
	},
	Rcmd: {
		// GetBizInfo:'/Rcmd/GetBizInfo',//获取项目推荐人信息

		GetBizInfo: '/Rcmd/GetBizInfo', //获取销售顾问信息
		GetBizCount: '/Rcmd/GetBizCount', //获取销售顾问数量

		GetOrderParkingBooks: '/Rcmd/GetOrderParkingBooks', //9.1、获取预定订单明细
		UpdateParkingBookStatus: '/Rcmd/UpdateParkingBookStatus', //9.2、预定订单状态变更
		GetOrderParkingBookArgs: '/Rcmd/GetOrderParkingBookArgs', //9.3、获取预定协议明细
		UpdateParkingBookArgStatus: '/Rcmd/UpdateParkingBookArgStatus', //9.4、预定订单协议状态变更
		GetOrderParkingDeposits: '/Rcmd/GetOrderParkingDeposits', //9.5、获取预付订金明细
		UpdateParkingDepositStatus: '/Rcmd/UpdateParkingDepositStatus', //9.6、预定订金状态变更
		GetOrderParkingArgs: '/Rcmd/GetOrderParkingArgs', //9.7、获取等待成交明细
		UpdateParkingArgStatus: '/Rcmd/UpdateParkingArgStatus', //9.8、等待成交信息变更
		GetOrderParkingFinishs: '/Rcmd/GetOrderParkingFinishs', //9.9、获取成交订单明细
		UpdateParkingFinishStatus: '/Rcmd/UpdateParkingFinishStatus', //9.10、成交订单状态变更
		GetOrderParkingSettles: '/Rcmd/GetOrderParkingSettles', //9.11、获取结算订单明细

		GetSaleChart: '/Rcmd/GetSaleChart', //获取营销走势图
		GetOrderChart: '/Rcmd/GetOrderChart', //获取成交走势图
		GetHistoryParkings: '/Rcmd/GetHistoryParkings', //获取开发商浏览明细
		GetFavoriteParkings: '/Rcmd/GetFavoriteParkings' //获取开发商收藏明细
	},
	Goods: {
		GetGoods: '/Goods/GetGoods', //获取产品明细（卡券明细）
		GetBizGoodsCatalogs: '/Goods/GetBizGoodsCatalogs', //获取卡券类型明细
		UpdateGoodsCatalog: '/Goods/UpdateGoodsCatalog', //更新类型信息
		UpdateGoods: '/Goods/UpdateGoods' //更新产品（卡券）信息
	},
	// 车位相关
	Parking: {
		GetAreaCode: '/Parking/GetAreaCode', //通过名称获取区域代码
		GetCurrentMarketer: '/Parking/GetCurrentMarketer', //获取当前销售顾问
		UpdateCurrentMarketer: '/Parking/UpdateCurrentMarketer', //更新楼盘当前销售顾问
		GetRegions: '/Parking/GetRegions', //获取运营区域明细
		GetBanners: '/Parking/GetBanners', //获取banner明细
		GetHotEstates: '/Parking/GetHotEstates', //获取热门楼盘
		//地图找车位
		GetNewEstates: '/Parking/GetNewEstates', //根据坐标返回车位明细
		// 买车位
		GetNewEstates: '/Parking/GetNewEstates', //获取最新车位明细
		GetNearEstates: '/Parking/GetNearEstates', //获取附近小区明细
		GetEstate: '/Parking/GetEstate', //获取楼盘信息
		GetParkings: '/Parking/GetParkings', //获取楼盘车位明细
		GetParking: '/Parking/GetParking', //获取车位详情
		Favorite: '/Parking/Favorite', //车位收藏
		GetMarketers: '/Parking/GetMarketers', //获取当前楼盘的销售顾问
		GetAreas: '/Parking/GetAreas', //获取车位区域
		GetCatalogs: '/Parking/GetCatalogs', //获取车位类型
		GetParkingBag: '/Parking/GetParkingBag', //7.1、获取车位的权益明细
		GetGifts: '/Parking/GetGifts', //3.2、获取礼包明细
		GetGiftBagItems: '/Parking/GetGiftBagItems', //3.4、获取礼包明细
		GetCoin: '/Parking/GetCoin', //4.2、获取当前楼盘安得币
		GetPoint: '/Parking/GetPoint', //4.3、获取当前楼盘安得分
		GetPrize: '/Parking/GetPrize', //6.1、获取惊喜奖详情
		GetPreOrder: '/Parking/GetPreOrder', //7.2、获取下单预览信息
		AddOrder: '/Parking/AddOrder', //7.3、提交订单
		GetOrder: '/Parking/GetOrder', //7.4、获取车位订单详情【订单预览】
		GetOrders: '/Parking/GetOrders', //7.5、获取车位订单明细【我的】-【车位订单】
		CancelOrder: '/Parking/CancelOrder', //7.6、退单（取消订单）
		SignAgr: '/Parking/SignAgr', //8、获取签署合同参数
		GetSignUrl: '/Parking/GetSignUrl', //8.1、获取签署合同参数
		GetPayParams: '/Parking/GetPayParams', //8.2、获取支付参数、去支付
		GetPays: '/Parking/GetPays' //8.3、获取订单支付明细
		// GetPayParams:'/Parking/GetPayParams'//9、获取支付参数、去支付
	},
	// 发现相关
	Discover: {
		GetCatalogs: '/Discover/GetCatalogs', //获取发现类型
		GetContents: '/Discover/GetContents', //获取发现明细
		GetMyCatalogs: '/Discover/GetMyCatalogs', //获取我的发布菜单权限
		Post: '/Discover/Post', //发布内容
		Delete: '/Discover/Delete', //删除内容
		Like: '/Discover/Like', //点赞发现
		UserHome: '/Discover/UserHome', //获取个人发现主页
		Favorite: '/Discover/Favorite', //关注、取消某人
		Report: '/Discover/Report', //内容举报
		AddBlack: '/Discover/AddBlack', //增加黑名单
		GetBlacks: '/Discover/GetBlacks', //获取黑名单明细
		RemoveBlack: '/Discover/RemoveBlack' //移除黑名单
	},
	// 订单相关
	Order: {
		CheckOrder: '/Order/CheckOrder' //订单核销
	}
}
