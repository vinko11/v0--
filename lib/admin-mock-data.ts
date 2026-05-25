// 管理后台 Mock 数据 - 与 C 端联动
// 这些数据会被 C 端和后台共同使用

export const adminMockData = {
  // 统计数据
  stats: {
    todayOrders: 23,
    pendingApplications: 5,
    pendingDispatch: 8,
    pendingDemands: 12,
  },

  // 用户列表
  users: [
    { id: "U10001", nickname: "张三", phone: "138****1234", address: "南京市建邺区", emergencyContact: "李四", emergencyPhone: "139****5678", registerTime: "2024-01-05 10:30", orderCount: 12 },
    { id: "U10002", nickname: "王阿姨", phone: "137****2345", address: "南京市鼓楼区", emergencyContact: "王五", emergencyPhone: "138****6789", registerTime: "2024-01-08 14:20", orderCount: 8 },
    { id: "U10003", nickname: "李先生", phone: "136****3456", address: "南京市玄武区", emergencyContact: "赵六", emergencyPhone: "137****7890", registerTime: "2024-01-10 09:15", orderCount: 5 },
    { id: "U10004", nickname: "陈女士", phone: "135****4567", address: "南京市秦淮区", emergencyContact: "钱七", emergencyPhone: "136****8901", registerTime: "2024-01-12 16:45", orderCount: 3 },
    { id: "U10005", nickname: "刘大爷", phone: "134****5678", address: "上海市浦东新区", emergencyContact: "孙八", emergencyPhone: "135****9012", registerTime: "2024-01-15 11:00", orderCount: 15 },
  ],

  // 服务商品
  products: [
    { id: "P001", name: "居家护理24小时陪护", category: "居家护工", basePrice: 200, status: "上架", sold: 328, regions: [{ name: "南京", price: 200 }, { name: "上海", price: 300 }, { name: "北京", price: 280 }] },
    { id: "P002", name: "3小时深度保洁", category: "保洁服务", basePrice: 168, status: "上架", sold: 456, regions: [{ name: "南京", price: 168 }, { name: "上海", price: 220 }] },
    { id: "P003", name: "淋浴助浴【半失能】", category: "助浴服务", basePrice: 198, status: "上架", sold: 189, regions: [{ name: "南京", price: 198 }, { name: "上海", price: 268 }] },
    { id: "P004", name: "陪诊就医【4h】", category: "助医服务", basePrice: 180, status: "上架", sold: 267, regions: [{ name: "南京", price: 180 }, { name: "上海", price: 250 }] },
    { id: "P005", name: "心理疏导【线上】", category: "心理健康", basePrice: 150, status: "下架", sold: 89, regions: [{ name: "全国", price: 150 }] },
  ],

  // 订单列表
  orders: [
    { id: "QL202401200001", userId: "U10001", userName: "张三", product: "居家护理24小时陪护", status: "已派单", amount: 200, discount: 20, paid: 180, time: "2024-01-20 09:30", address: "南京市建邺区江东中路388号", contact: "张三", phone: "138****1234", serviceTime: "2024-01-22 09:00-18:00", worker: "李护士" },
    { id: "QL202401200002", userId: "U10002", userName: "王阿姨", product: "3小时深度保洁", status: "待付款", amount: 168, discount: 0, paid: 168, time: "2024-01-20 10:15", address: "南京市鼓楼区中央路201号", contact: "王阿姨", phone: "137****2345", serviceTime: "2024-01-23 14:00-17:00", worker: null },
    { id: "QL202401190003", userId: "U10003", userName: "李先生", product: "陪诊就医【4h】", status: "派单中", amount: 180, discount: 30, paid: 150, time: "2024-01-19 14:20", address: "南京市玄武区珠江路88号", contact: "李先生", phone: "136****3456", serviceTime: "2024-01-21 08:00-12:00", worker: null },
    { id: "QL202401180004", userId: "U10004", userName: "陈女士", product: "淋浴助浴【半失能】", status: "已完成", amount: 198, discount: 0, paid: 198, time: "2024-01-18 16:00", address: "南京市秦淮区中山南路1号", contact: "陈女士", phone: "135****4567", serviceTime: "2024-01-19 10:00-12:00", worker: "张护工" },
    { id: "QL202401170005", userId: "U10005", userName: "刘大爷", product: "居家护理24小时陪护", status: "退款中", amount: 300, discount: 50, paid: 250, time: "2024-01-17 11:30", address: "上海市浦东新区陆家嘴环路1000号", contact: "刘大爷", phone: "134****5678", serviceTime: "2024-01-18 09:00-18:00", worker: "王护士" },
  ],

  // 需求发布
  demands: [
    { id: "D001", category: "居家护工", title: "老人日常护理", contact: "张三", priceType: "一口价", price: "200/天", status: "待审核", content: "需要一位有经验的护工照顾80岁老人，每天8小时", address: "南京市建邺区", time: "2024-01-20 09:00" },
    { id: "D002", category: "助浴服务", title: "上门助浴", contact: "王阿姨", priceType: "一口价", price: "150/次", status: "待审核", content: "需要专业助浴服务，老人行动不便", address: "南京市鼓楼区", time: "2024-01-19 14:30" },
    { id: "D003", category: "保洁服务", title: "家庭深度保洁", contact: "李先生", priceType: "上门估价", price: "-", status: "已接单", content: "三室两厅深度清洁，包括厨房卫生间", address: "南京市玄武区", time: "2024-01-18 10:00" },
    { id: "D004", category: "器材租售", title: "轮椅租赁", contact: "陈女士", priceType: "上门估价", price: "-", status: "已关闭", content: "需要租赁一台电动轮椅，预计使用3个月", address: "南京市栖霞区", time: "2024-01-15 16:20" },
  ],

  // 服务人员
  workers: [
    { id: "W001", name: "李护士", phone: "139****1111", categories: ["居家护工", "住院陪护"], district: "建邺区", status: "已通过", idCard: "320***********1234", qualification: "护士资格证", insurance: "已上传", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100", intro: "从业10年，擅长老年护理" },
    { id: "W002", name: "张护工", phone: "139****2222", categories: ["助浴服务"], district: "鼓楼区", status: "已通过", idCard: "320***********2345", qualification: "护理员证", insurance: "已上传", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100", intro: "专业助浴服务5年经验" },
    { id: "W003", name: "王医生", phone: "139****3333", categories: ["助医服务"], district: "玄武区", status: "待审核", idCard: "320***********3456", qualification: "执业医师证", insurance: "已上传", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100", intro: "三甲医院退休医生" },
    { id: "W004", name: "刘阿姨", phone: "139****4444", categories: ["保洁服务", "助餐服务"], district: "秦淮区", status: "已驳回", idCard: "320***********4567", qualification: "无", insurance: "未上传", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100", intro: "家政服务3年", rejectReason: "资质证书不完整" },
  ],

  // 服务商/机构
  providers: [
    { id: "I001", name: "南京爱心养老服务中心", category: "养老机构", region: "南京市建邺区", contact: "陈经理", phone: "025-88881111", rating: 4.8, status: "正常", license: "已上传", qualification: "已上传", intro: "专业养老服务机构，成立于2010年" },
    { id: "I002", name: "金牌家政服务公司", category: "家政公司", region: "南京市鼓楼区", contact: "李总", phone: "025-88882222", rating: 4.5, status: "正常", license: "已上传", qualification: "已上传", intro: "南京市家政协会会员单位" },
    { id: "I003", name: "康复之家护理中心", category: "医疗护理", region: "南京市玄武区", contact: "王院长", phone: "025-88883333", rating: 4.9, status: "正常", license: "已上传", qualification: "已上传", intro: "专业康复护理，医护团队30人" },
    { id: "I004", name: "阳光家政", category: "家政公司", region: "上海市浦东新区", contact: "张经理", phone: "021-66661111", rating: 4.2, status: "停用", license: "已上传", qualification: "已上传", intro: "上海地区家政服务" },
  ],

  // 入驻申请
  applications: {
    institutions: [
      { id: "A001", name: "幸福养老院", type: "机构", category: "养老机构", contact: "周院长", phone: "025-88884444", time: "2024-01-20 10:00", status: "待审核", region: "南京市栖霞区", license: "已上传", qualification: "已上传" },
      { id: "A002", name: "温馨家政", type: "机构", category: "家政公司", contact: "吴经理", phone: "025-88885555", time: "2024-01-19 15:30", status: "待审核", region: "南京市雨花台区", license: "已上传", qualification: "待补充" },
    ],
    workers: [
      { id: "A003", name: "赵护士", type: "人员", categories: ["居家护工"], phone: "139****5555", time: "2024-01-20 11:30", status: "待审核", district: "建邺区", idCard: "已上传", qualification: "护士资格证", insurance: "已上传" },
      { id: "A004", name: "孙阿姨", type: "人员", categories: ["保洁服务"], phone: "139****6666", time: "2024-01-19 09:00", status: "待审核", district: "鼓楼区", idCard: "已上传", qualification: "无", insurance: "未上传" },
    ],
  },

  // 公告（与C端联动）
  announcements: [
    { id: "N001", title: "春节期间服务时间调整", isPopup: true, isCarousel: true, status: "已发布", time: "2024-01-15", content: "春节期间（2月9日-2月17日）服务时间调整为9:00-18:00" },
    { id: "N002", title: "新用户专享优惠活动", isPopup: false, isCarousel: true, status: "已发布", time: "2024-01-10", content: "新用户首单立减20元，注册即送100积分" },
    { id: "N003", title: "服务范围扩展通知", isPopup: false, isCarousel: false, status: "草稿", time: "2024-01-08", content: "我们的服务已扩展至上海市全境" },
  ],

  // 优惠券
  coupons: [
    { id: "C001", name: "新人专享券", type: "满减", discount: 20, threshold: 100, validDays: 30, status: "进行中", total: 1000, claimed: 456, showInCenter: true },
    { id: "C002", name: "满200减30", type: "满减", discount: 30, threshold: 200, validDays: 15, status: "进行中", total: 500, claimed: 234, showInCenter: true },
    { id: "C003", name: "护理服务9折", type: "折扣", discount: 0.9, threshold: 0, validDays: 7, status: "已结束", total: 200, claimed: 200, showInCenter: false },
  ],

  // 首页配置（与C端联动）
  homeConfig: {
    banners: [
      { id: 1, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800", productId: "P001", sort: 1 },
      { id: 2, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800", productId: "P004", sort: 2 },
    ],
    categories: ["home", "hospital", "medical", "bath", "meal", "equipment", "cleaning", "safety", "health", "renovation", "warm", "psychology"],
    hotProducts: ["P001", "P003", "P004"],
    parallelProducts: ["P002", "P005"],
  },
}

// 订单状态流转
export const orderStatusFlow = ["待付款", "派单中", "已派单", "服务中", "已完成", "退款中", "已退款"]

// 商品类目
export const productCategories = ["居家护工", "住院陪护", "助医服务", "助浴服务", "助餐服务", "器材租售", "保洁服务", "安全检查", "慢病监测", "适老改造", "暖心服务", "心理健康"]

// 区域列表
export const regions = ["南京市", "上海市", "北京市", "杭州市", "苏州市"]
