"use client"

import { useState } from "react"
import { ChevronLeft, Ticket, Clock } from "lucide-react"

interface CouponListPageProps {
  onBack: () => void
  onUseCoupon?: (coupon: any) => void
}

const tabs = [
  { id: "unused", label: "未使用" },
  { id: "used", label: "已使用" },
  { id: "expired", label: "已过期" },
]

// Mock优惠券数据
const mockCoupons = [
  { id: 1, name: "新人专享券", discount: 20, minAmount: 100, expireDate: "2024-03-15", status: "unused", description: "全场通用" },
  { id: 2, name: "满200减30", discount: 30, minAmount: 200, expireDate: "2024-03-20", status: "unused", description: "护理服务专用" },
  { id: 3, name: "满300减50", discount: 50, minAmount: 300, expireDate: "2024-02-28", status: "unused", description: "全场通用" },
  { id: 4, name: "周年庆优惠", discount: 100, minAmount: 500, expireDate: "2024-01-10", status: "used", usedDate: "2024-01-08", description: "全场通用" },
  { id: 5, name: "春节特惠", discount: 50, minAmount: 200, expireDate: "2024-01-05", status: "expired", description: "保洁服务专用" },
]

export default function CouponListPage({ onBack, onUseCoupon }: CouponListPageProps) {
  const [activeTab, setActiveTab] = useState("unused")

  const filteredCoupons = mockCoupons.filter(c => c.status === activeTab)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-white">我的优惠券</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-card border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Coupon List */}
      <div className="p-4 space-y-3">
        {filteredCoupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Ticket className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">暂无优惠券</p>
          </div>
        ) : (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`bg-card rounded-2xl overflow-hidden shadow-sm ${
                coupon.status !== "unused" ? "opacity-60" : ""
              }`}
            >
              <div className="flex">
                {/* Left - Discount */}
                <div className={`w-24 flex flex-col items-center justify-center py-4 ${
                  coupon.status === "unused" 
                    ? "bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD]" 
                    : "bg-muted"
                }`}>
                  <span className={`text-2xl font-bold ${coupon.status === "unused" ? "text-white" : "text-muted-foreground"}`}>
                    ¥{coupon.discount}
                  </span>
                  <span className={`text-xs ${coupon.status === "unused" ? "text-white/80" : "text-muted-foreground"}`}>
                    满{coupon.minAmount}可用
                  </span>
                </div>

                {/* Right - Info */}
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{coupon.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{coupon.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>
                        {coupon.status === "used" 
                          ? `已于${coupon.usedDate}使用` 
                          : `${coupon.expireDate}到期`}
                      </span>
                    </div>
                    {coupon.status === "unused" && onUseCoupon && (
                      <button 
                        onClick={() => onUseCoupon(coupon)}
                        className="px-3 py-1 bg-primary text-white text-xs rounded-full"
                      >
                        去使用
                      </button>
                    )}
                    {coupon.status === "used" && (
                      <span className="text-xs text-muted-foreground">已使用</span>
                    )}
                    {coupon.status === "expired" && (
                      <span className="text-xs text-muted-foreground">已过期</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
