"use client"

import { ChevronLeft, Phone, MapPin, Calendar, Clock, Copy, MessageSquare, Check, Activity } from "lucide-react"

interface OrderDetailPageProps {
  onBack: () => void
  order?: {
    id: string
    status: string
    statusText: string
    statusColor: string
    service: string
    worker: string
    workerImage: string
    date: string
    price: string
    orderType?: string // 新增订单类型：普通服务 or health_monitor（慢病监测）
    healthMonitorStep?: number // 慢病监测当前步骤 1-4
  }
}

export default function OrderDetailPage({ onBack, order }: OrderDetailPageProps) {
  const defaultOrder = {
    id: "QL202401150001",
    status: "dispatched",
    statusText: "已派单",
    statusColor: "#10b981",
    service: "居家护理服务",
    worker: "李护士",
    workerImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    date: "2024-01-20 09:00-18:00",
    price: "¥200",
  }

  const currentOrder = order || defaultOrder

  // 慢病监测步骤配置
  const healthMonitorSteps = [
    { id: 1, label: "待上门检测", description: "等待服务人员上门" },
    { id: 2, label: "检测信息已填", description: "检测数据已录入" },
    { id: 3, label: "待确认收货", description: "请确认检测报告" },
    { id: 4, label: "已完成", description: "服务已完成" },
  ]

  const currentHealthStep = currentOrder.healthMonitorStep || 1
  const isHealthMonitor = currentOrder.orderType === "health_monitor"

  // 订单详细信息（Mock数据）
  const orderDetail = {
    orderNumber: currentOrder.id,
    createTime: "2024-01-15 14:30:25",
    payTime: "2024-01-15 14:32:18",
    payMethod: "微信支付",
    serviceName: currentOrder.service,
    serviceSpec: "8小时/天",
    servicePrice: currentOrder.price,
    discountAmount: "¥0.00",
    totalAmount: currentOrder.price,
    worker: {
      name: currentOrder.worker,
      phone: "138****8888",
      image: currentOrder.workerImage,
      rating: 4.9,
    },
    address: {
      name: "张先生",
      phone: "138****8888",
      address: "江苏省南京市建邺区江东中路388号阳光小区1栋502室",
    },
    serviceTime: {
      date: "2024-01-20",
      time: "09:00-18:00",
    },
    remark: "老人行动不便，请准时到达",
  }

  const handleCopyOrderNumber = () => {
    navigator.clipboard?.writeText(orderDetail.orderNumber)
    alert("订单号已复制")
  }

  const statusSteps = [
    { label: "提交订单", time: orderDetail.createTime, done: true },
    { label: "支付成功", time: orderDetail.payTime, done: true },
    { label: "已派单", time: "2024-01-15 15:00:00", done: currentOrder.status !== "pending" },
    { label: "服务中", time: "", done: currentOrder.status === "completed" || currentOrder.status === "unreviewed" || currentOrder.status === "reviewed" },
    { label: "已完成", time: "", done: currentOrder.status === "completed" || currentOrder.status === "unreviewed" || currentOrder.status === "reviewed" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">订单详情</h1>
        </div>
        
        {/* 订单状态 */}
        <div className="text-center text-white">
          <p className="text-2xl font-bold">{currentOrder.statusText}</p>
          <p className="text-white/80 text-sm mt-1">
            {currentOrder.status === "dispatched" && "服务人员已接单，请保持电话畅通"}
            {currentOrder.status === "pending" && "请尽快完成支付"}
            {currentOrder.status === "unreviewed" && "服务已完成，欢迎评价"}
            {currentOrder.status === "reviewed" && "感谢您的评价"}
            {currentOrder.status === "refunding" && "退款申请处理中"}
            {currentOrder.status === "refunded" && "退款已完成"}
          </p>
        </div>
      </div>

      <div className="px-4 space-y-3 -mt-2">
        {/* 慢病监测步骤条 */}
        {isHealthMonitor && (
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">检测进度</h3>
            </div>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted" />
              <div 
                className="absolute top-4 left-4 h-0.5 bg-primary transition-all"
                style={{ width: `${((currentHealthStep - 1) / 3) * 100}%` }}
              />
              
              {/* Steps */}
              <div className="relative flex justify-between">
                {healthMonitorSteps.map((step) => {
                  const isCompleted = step.id < currentHealthStep
                  const isCurrent = step.id === currentHealthStep
                  return (
                    <div key={step.id} className="flex flex-col items-center" style={{ width: "25%" }}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        isCompleted 
                          ? "bg-primary text-white" 
                          : isCurrent 
                            ? "bg-primary text-white ring-4 ring-primary/20" 
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {isCompleted ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{step.id}</span>
                        )}
                      </div>
                      <p className={`text-xs mt-2 text-center ${
                        isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Current Step Description */}
            <div className="mt-4 p-3 bg-primary/5 rounded-xl">
              <p className="text-sm text-primary">
                当前状态：{healthMonitorSteps[currentHealthStep - 1]?.description}
              </p>
            </div>
          </div>
        )}

        {/* 服务人员信息 */}
        {currentOrder.status !== "pending" && (
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-foreground mb-3">服务人员</h3>
            <div className="flex items-center gap-3">
              <img
                src={orderDetail.worker.image}
                alt={orderDetail.worker.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{orderDetail.worker.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">评分 {orderDetail.worker.rating}</p>
              </div>
              <a
                href={`tel:${orderDetail.worker.phone}`}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        )}

        {/* 服务地址 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-foreground mb-3">服务地址</h3>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{orderDetail.address.name}</span>
                <span className="text-muted-foreground text-sm">{orderDetail.address.phone}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{orderDetail.address.address}</p>
            </div>
          </div>
        </div>

        {/* 服务时间 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-foreground mb-3">服务时间</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{orderDetail.serviceTime.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{orderDetail.serviceTime.time}</span>
            </div>
          </div>
        </div>

        {/* 服务信息 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-foreground mb-3">服务信息</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">服务名称</span>
              <span className="text-foreground">{orderDetail.serviceName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">服务规格</span>
              <span className="text-foreground">{orderDetail.serviceSpec}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">服务费用</span>
              <span className="text-foreground">{orderDetail.servicePrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">优惠减免</span>
              <span className="text-red-500">{orderDetail.discountAmount}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="font-medium text-foreground">实付金额</span>
              <span className="font-bold text-primary">{orderDetail.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* 服务备注 */}
        {orderDetail.remark && (
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-foreground mb-3">服务备注</h3>
            <p className="text-sm text-muted-foreground">{orderDetail.remark}</p>
          </div>
        )}

        {/* 订单信息 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-foreground mb-3">订单信息</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">订单编号</span>
              <div className="flex items-center gap-2">
                <span className="text-foreground">{orderDetail.orderNumber}</span>
                <button onClick={handleCopyOrderNumber}>
                  <Copy className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">下单时间</span>
              <span className="text-foreground">{orderDetail.createTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">支付时间</span>
              <span className="text-foreground">{orderDetail.payTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">支付方式</span>
              <span className="text-foreground">{orderDetail.payMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center gap-3">
        <button className="flex-1 py-2.5 rounded-full border border-border text-foreground font-medium text-sm flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4" />
          联系客服
        </button>
        {currentOrder.status === "pending" && (
          <button className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm">
            去支付
          </button>
        )}
        {currentOrder.status === "unreviewed" && (
          <button className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm">
            去评价
          </button>
        )}
        {(currentOrder.status === "dispatched" || currentOrder.status === "dispatching") && (
          <button className="flex-1 py-2.5 rounded-full border border-red-500 text-red-500 font-medium text-sm">
            申请退款
          </button>
        )}
      </div>
    </div>
  )
}
