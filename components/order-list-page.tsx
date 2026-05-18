"use client"

import { useState } from "react"
import { ChevronLeft, Clock, Truck, CheckCircle, Star, RotateCcw, Phone } from "lucide-react"

interface OrderListPageProps {
  onBack: () => void
  initialTab?: string
}

const tabs = [
  { id: "all", label: "全部" },
  { id: "pending", label: "待付款" },
  { id: "dispatching", label: "派单中" },
  { id: "dispatched", label: "已派单" },
  { id: "unreviewed", label: "未评价" },
  { id: "reviewed", label: "已评价" },
  { id: "refunding", label: "退款中" },
]

const orders = [
  {
    id: "QL202401150001",
    status: "dispatched",
    statusText: "已派单",
    statusColor: "#10b981",
    service: "居家护理服务",
    worker: "李护士",
    workerImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    date: "2024-01-20 09:00-18:00",
    price: "¥200",
  },
  {
    id: "QL202401140002",
    status: "pending",
    statusText: "待付款",
    statusColor: "#f59e0b",
    service: "康复理疗服务",
    worker: "王医生",
    workerImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
    date: "2024-01-22 14:00-17:00",
    price: "¥180",
  },
  {
    id: "QL202401100003",
    status: "unreviewed",
    statusText: "未评价",
    statusColor: "#a855f7",
    service: "助浴服务",
    worker: "张护工",
    workerImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop",
    date: "2024-01-18 10:00-12:00",
    price: "¥150",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending": return Clock
    case "dispatching": return Truck
    case "dispatched": return CheckCircle
    case "unreviewed": return Star
    case "reviewed": return Star
    case "refunding": return RotateCcw
    default: return Clock
  }
}

export default function OrderListPage({ onBack, initialTab = "all" }: OrderListPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab)

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">我的订单</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card sticky top-0 z-10 border-b border-border">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="px-4 py-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">暂无订单</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status)
            return (
              <div key={order.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">订单号: {order.id}</span>
                  <span className="text-xs font-medium" style={{ color: order.statusColor }}>
                    {order.statusText}
                  </span>
                </div>

                {/* Order Content */}
                <div className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={order.workerImage}
                      alt={order.worker}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-sm">{order.service}</h4>
                      <p className="text-xs text-muted-foreground mt-1">服务人员: {order.worker}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold">{order.price}</p>
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-4 py-3 border-t border-border flex items-center justify-end gap-2">
                  {order.status === "pending" && (
                    <>
                      <button className="px-4 py-1.5 text-xs border border-border rounded-lg text-muted-foreground">
                        取消订单
                      </button>
                      <button className="px-4 py-1.5 text-xs bg-primary text-white rounded-lg">
                        去支付
                      </button>
                    </>
                  )}
                  {order.status === "dispatched" && (
                    <>
                      <button className="px-4 py-1.5 text-xs border border-border rounded-lg text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        联系服务人员
                      </button>
                    </>
                  )}
                  {order.status === "unreviewed" && (
                    <>
                      <button className="px-4 py-1.5 text-xs border border-border rounded-lg text-muted-foreground">
                        查看详情
                      </button>
                      <button className="px-4 py-1.5 text-xs bg-primary text-white rounded-lg">
                        去评价
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
