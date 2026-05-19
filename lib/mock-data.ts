// 集中管理 Mock 数据

// 公告数据
export const announcements = [
  { id: 1, type: "urgent", title: "系统升级通知", content: "平台将于今晚22:00-24:00进行系统升级，届时部分功能可能无法使用。", date: "2024-01-20", isUrgent: true },
  { id: 2, type: "activity", title: "新春特惠活动", content: "即日起至2月15日，全场服务8折优惠，积分翻倍！", date: "2024-01-18", isUrgent: false },
  { id: 3, type: "notice", title: "服务时间调整", content: "春节期间（2月9日-15日）服务时间调整为9:00-18:00。", date: "2024-01-15", isUrgent: false },
  { id: 4, type: "notice", title: "新增心理健康服务", content: "平台新增心理健康分类，提供线上心理疏导、情绪管理等专业服务。", date: "2024-01-10", isUrgent: false },
]

// 优惠券数据
export const coupons = [
  { id: 1, name: "新人专享券", discount: 20, minAmount: 100, expireDate: "2024-02-28", status: "available" },
  { id: 2, name: "满200减30", discount: 30, minAmount: 200, expireDate: "2024-03-15", status: "available" },
  { id: 3, name: "满300减50", discount: 50, minAmount: 300, expireDate: "2024-02-20", status: "available" },
  { id: 4, name: "护理服务专享", discount: 25, minAmount: 150, expireDate: "2024-01-10", status: "expired" },
  { id: 5, name: "首单立减", discount: 15, minAmount: 80, expireDate: "2024-01-05", status: "used" },
]

// 购物车数据
export const cartItems = [
  { id: 1, name: "居家护工24小时陪护", spec: "24小时/天", price: 200, quantity: 2, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop", selected: true },
  { id: 2, name: "专业助浴服务", spec: "单次服务", price: 150, quantity: 1, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop", selected: true },
  { id: 3, name: "康复理疗服务", spec: "60分钟/次", price: 120, quantity: 1, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop", selected: false },
]

// 积分商品数据
export const pointsProducts = [
  { id: 1, name: "便携血压计", points: 500, price: 0, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop", stock: 100 },
  { id: 2, name: "护理服务抵扣券", points: 200, price: 0, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop", stock: 999 },
  { id: 3, name: "高级轮椅（7天租赁）", points: 800, price: 50, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop", stock: 20 },
  { id: 4, name: "康复护理礼包", points: 1000, price: 99, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop", stock: 50 },
]

// 服务分类
export const serviceCategories = [
  { id: "home", label: "居家护工", icon: "Home", color: "#4DD8CD" },
  { id: "hospital", label: "住院陪护", icon: "Users", color: "#f59e0b" },
  { id: "medical", label: "助医服务", icon: "Stethoscope", color: "#ef4444" },
  { id: "bath", label: "助浴服务", icon: "Bath", color: "#8b5cf6" },
  { id: "meal", label: "助餐服务", icon: "UtensilsCrossed", color: "#ec4899" },
  { id: "equipment", label: "器材租售", icon: "Wrench", color: "#3b82f6" },
  { id: "cleaning", label: "保洁服务", icon: "Sparkles", color: "#10b981" },
  { id: "safety", label: "安全检查", icon: "ShieldCheck", color: "#f97316" },
  { id: "health", label: "慢病监测", icon: "Activity", color: "#06b6d4" },
  { id: "renovation", label: "适老改造", icon: "Settings", color: "#6366f1" },
  { id: "warm", label: "暖心服务", icon: "Heart", color: "#f43f5e" },
  { id: "psychology", label: "心理健康", icon: "Brain", color: "#a855f7" },
]

// 热门服务
export const hotServices = [
  { id: 201, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=400&fit=crop", name: "淋浴助浴【半失能】", price: "¥198/次", spec: "专业助浴", rating: 4.9, sold: 328, category: "bath" },
  { id: 202, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop", name: "心理疏导【线上】", price: "¥150/次", spec: "线上咨询", rating: 4.8, sold: 189, category: "psychology" },
  { id: 203, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", name: "陪诊就医【4h】", price: "¥180/次", spec: "4小时陪诊", rating: 4.9, sold: 267, category: "medical" },
]

// 护工数据
export const workers = [
  { id: 1, name: "李护士", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop", rating: 4.9, orders: 328, experience: "5年", skills: ["居家护理", "康复训练"], price: "¥200/天" },
  { id: 2, name: "王医生", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop", rating: 4.8, orders: 256, experience: "8年", skills: ["陪诊就医", "慢病监测"], price: "¥180/次" },
  { id: 3, name: "张阿姨", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop", rating: 4.9, orders: 412, experience: "6年", skills: ["保洁服务", "助餐服务"], price: "¥150/天" },
]

// 推荐记录
export const referralRecords = [
  { id: 1, name: "张三", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", date: "2024-01-15", status: "completed", points: 100, level: 1 },
  { id: 2, name: "李四", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", date: "2024-01-10", status: "completed", points: 100, level: 1 },
  { id: 3, name: "王五", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", date: "2024-01-05", status: "pending", points: 0, level: 1 },
  { id: 4, name: "赵六", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", date: "2024-01-18", status: "completed", points: 50, level: 2, parentName: "张三" },
]

// 订单数据
export const orders = [
  { id: "QL202401150001", status: "dispatched", statusText: "已派单", statusColor: "#10b981", service: "居家护理服务", worker: "李护士", workerImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop", date: "2024-01-20 09:00-18:00", price: "¥200", paymentStatus: "paid" },
  { id: "QL202401140002", status: "pending", statusText: "待付款", statusColor: "#f59e0b", service: "康复理疗服务", worker: "王医生", workerImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop", date: "2024-01-22 14:00-17:00", price: "¥180", paymentStatus: "unpaid" },
  { id: "QL202401100003", status: "unreviewed", statusText: "未评价", statusColor: "#a855f7", service: "助浴服务", worker: "张护工", workerImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop", date: "2024-01-18 10:00-12:00", price: "¥150", paymentStatus: "paid" },
]

// 收藏数据
export const favorites = [
  { id: 1, type: "service", name: "资深护工24小时陪护", price: "¥200/天", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop", rating: 4.9 },
  { id: 2, type: "service", name: "专业康复理疗服务", price: "¥120/次", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop", rating: 4.8 },
  { id: 3, type: "worker", name: "李护士", price: "¥200/天", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop", rating: 4.9 },
]

// 钱包明细
export const walletRecords = [
  { id: 1, type: "income", title: "推荐奖励", amount: 50, date: "2024-01-18 14:30", description: "推荐用户注册奖励" },
  { id: 2, type: "expense", title: "服务支付", amount: -200, date: "2024-01-15 10:20", description: "居家护理服务" },
  { id: 3, type: "income", title: "退款", amount: 150, date: "2024-01-10 16:45", description: "订单取消退款" },
  { id: 4, type: "expense", title: "提现", amount: -100, date: "2024-01-05 09:00", description: "提现到微信" },
]
