"use client"

import { Settings, Wallet, Gift, CreditCard, Clock, CheckCircle, RotateCcw, XCircle, FileText, MapPin, Headphones, Info, ChevronRight, Building2, Users, TrendingUp, ShoppingCart, Truck, Star } from "lucide-react"

const orderStatuses = [
  { icon: ShoppingCart, label: "全部订单", color: "#6b7280" },
  { icon: Clock, label: "待付款", color: "#f59e0b" },
  { icon: Truck, label: "派单中", color: "#3b82f6" },
  { icon: CheckCircle, label: "已派单", color: "#10b981" },
  { icon: Star, label: "未评价", color: "#a855f7" },
  { icon: Star, label: "已评价", color: "#ec4899" },
  { icon: RotateCcw, label: "退款中", color: "#ef4444" },
]

const tools = [
  { icon: Building2, label: "机构入驻" },
  { icon: Users, label: "服务人员入驻" },
  { icon: TrendingUp, label: "推荐得积分" },
  { icon: MapPin, label: "我的地址" },
  { icon: FileText, label: "服务协议" },
  { icon: Headphones, label: "联系客服" },
  { icon: Info, label: "关于我们" },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-16 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop"
                alt="用户头像"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="font-bold text-lg">张先生</h2>
              <p className="text-white/80 text-sm">138****8888</p>
            </div>
          </div>
          <Settings className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Stats Card */}
      <div className="mx-4 -mt-5 bg-card rounded-2xl p-4 shadow-sm relative z-10">
        <div className="grid grid-cols-3 divide-x divide-border">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-primary">
              <Wallet className="w-4 h-4" />
              <span className="font-bold">余额</span>
            </div>
            <span className="text-lg font-bold text-foreground">¥520.00</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-yellow-500">
              <Gift className="w-4 h-4" />
              <span className="font-bold">积分</span>
            </div>
            <span className="text-lg font-bold text-foreground">1,280</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-red-500">
              <CreditCard className="w-4 h-4" />
              <span className="font-bold">红包</span>
            </div>
            <span className="text-lg font-bold text-foreground">3张</span>
          </div>
        </div>
      </div>

      {/* Order Section */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">我的订单</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>全部订单</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {orderStatuses.map((status, index) => (
            <button key={index} className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${status.color}15` }}
              >
                <status.icon className="w-5 h-5" style={{ color: status.color }} />
              </div>
              <span className="text-xs text-foreground text-center line-clamp-2">{status.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="font-bold text-foreground">常用工具</h3>
        </div>
        <div>
          {tools.map((tool, index) => (
            <button
              key={index}
              className="w-full px-4 py-3 flex items-center justify-between border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <tool.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{tool.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
