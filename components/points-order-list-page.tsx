"use client"

import { useState } from "react"
import { ChevronLeft, Package, Truck, CheckCircle, RotateCcw, Clock } from "lucide-react"

interface PointsOrderListPageProps {
  onBack: () => void
}

const tabs = [
  { id: "all", label: "全部" },
  { id: "pending", label: "待发货" },
  { id: "shipped", label: "已发货" },
  { id: "refund", label: "退款" },
]

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "待发货", color: "#f59e0b", icon: Clock },
  shipped: { label: "已发货", color: "#3b82f6", icon: Truck },
  completed: { label: "已完成", color: "#10b981", icon: CheckCircle },
  refund: { label: "退款中", color: "#ef4444", icon: RotateCcw },
}

// Mock积分订单
const mockOrders = [
  { id: "JF202401150001", product: "护理眼罩", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=200&fit=crop", points: 500, cash: 9.9, status: "shipped", createTime: "2024-01-15" },
  { id: "JF202401100002", product: "养生茶礼盒", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200&h=200&fit=crop", points: 1000, cash: 19.9, status: "pending", createTime: "2024-01-10" },
  { id: "JF202401050003", product: "保温杯", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop", points: 800, cash: 0, status: "completed", createTime: "2024-01-05" },
  { id: "JF202312200004", product: "按摩枕", image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=200&h=200&fit=crop", points: 1500, cash: 29.9, status: "refund", createTime: "2023-12-20" },
]

export default function PointsOrderListPage({ onBack }: PointsOrderListPageProps) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = activeTab === "all" 
    ? mockOrders 
    : mockOrders.filter(o => o.status === activeTab)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-4 pt-12 pb-4 border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">兑换记录</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-card border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[80px] py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="p-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">暂无兑换记录</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            return (
              <div key={order.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{order.id}</span>
                  <div className="flex items-center gap-1" style={{ color: status.color }}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm">{status.label}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex gap-3">
                  <img src={order.image} alt={order.product} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm">{order.product}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      {order.cash > 0 && <span className="text-sm text-primary">¥{order.cash} + </span>}
                      <span className="text-sm text-primary">{order.points}积分</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{order.createTime}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 py-3 border-t border-border flex justify-end gap-2">
                  {order.status === "shipped" && (
                    <button className="px-4 py-1.5 bg-primary text-white text-xs rounded-lg">
                      确认收货
                    </button>
                  )}
                  {order.status === "completed" && (
                    <button className="px-4 py-1.5 border border-border text-muted-foreground text-xs rounded-lg">
                      查看详情
                    </button>
                  )}
                  {order.status === "pending" && (
                    <button className="px-4 py-1.5 border border-border text-muted-foreground text-xs rounded-lg">
                      催发货
                    </button>
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
