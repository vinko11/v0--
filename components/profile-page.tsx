"use client"

import { Settings, Wallet, Gift, Clock, CheckCircle, RotateCcw, FileText, MapPin, Headphones, Info, ChevronRight, Building2, Users, TrendingUp, ShoppingCart, Truck, Star } from "lucide-react"

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
  { icon: Building2, label: "机构入驻", color: "#3b82f6" },
  { icon: Users, label: "服务人员入驻", color: "#10b981" },
  { icon: TrendingUp, label: "推荐得积分", color: "#f59e0b" },
  { icon: MapPin, label: "我的地址", color: "#ef4444" },
  { icon: FileText, label: "服务协议", color: "#8b5cf6" },
  { icon: Headphones, label: "联系客服", color: "#06b6d4" },
  { icon: Info, label: "关于我们", color: "#6b7280" },
  { icon: Settings, label: "设置", color: "#374151" },
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

      {/* Stats Card - 余额和积分 */}
      <div className="mx-4 -mt-8 bg-card rounded-2xl p-4 shadow-sm relative z-10">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="flex flex-col items-center gap-1 py-2">
            <div className="flex items-center gap-1.5 text-primary">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">余额</span>
            </div>
            <span className="text-xl font-bold text-foreground">¥520.00</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-2">
            <div className="flex items-center gap-1.5 text-yellow-500">
              <Gift className="w-4 h-4" />
              <span className="text-sm font-medium">积分</span>
            </div>
            <span className="text-xl font-bold text-foreground">1,280</span>
          </div>
        </div>
      </div>

      {/* Order Section */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">我的订单</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>查看全部</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {orderStatuses.slice(1).map((status, index) => (
            <button key={index} className="flex flex-col items-center gap-1.5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${status.color}15` }}
              >
                <status.icon className="w-5 h-5" style={{ color: status.color }} />
              </div>
              <span className="text-xs text-foreground text-center">{status.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Section - Icon Grid */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">常用工具</h3>
        <div className="grid grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <button key={index} className="flex flex-col items-center gap-1.5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${tool.color}15` }}
              >
                <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
              </div>
              <span className="text-xs text-foreground text-center">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
