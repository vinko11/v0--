"use client"

import { useState } from "react"
import { ChevronLeft, Ticket, Check, Gift } from "lucide-react"

interface CouponCenterPageProps {
  onBack: () => void
}

// Mock可领取优惠券
const availableCoupons = [
  { id: 101, name: "新人专享券", discount: 20, minAmount: 100, expireDate: "2024-03-15", description: "全场通用", claimed: false },
  { id: 102, name: "护理服务券", discount: 30, minAmount: 200, expireDate: "2024-03-20", description: "护理服务专用", claimed: false },
  { id: 103, name: "保洁优惠券", discount: 25, minAmount: 150, expireDate: "2024-03-25", description: "保洁服务专用", claimed: false },
  { id: 104, name: "会员专享券", discount: 50, minAmount: 300, expireDate: "2024-04-01", description: "全场通用", claimed: true },
  { id: 105, name: "限时特惠", discount: 100, minAmount: 500, expireDate: "2024-03-10", description: "全场通用", claimed: false, limited: true, remaining: 58 },
]

export default function CouponCenterPage({ onBack }: CouponCenterPageProps) {
  const [coupons, setCoupons] = useState(availableCoupons)

  const handleClaim = (id: number) => {
    setCoupons(prev => prev.map(c => 
      c.id === id ? { ...c, claimed: true } : c
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-white">领券中心</h1>
        </div>
        
        {/* Banner */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Gift className="w-10 h-10 text-white" />
            <div>
              <p className="text-white font-bold">新用户专属福利</p>
              <p className="text-white/80 text-sm">领券下单更优惠</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon List */}
      <div className="p-4 space-y-3">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-card rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="flex">
              {/* Left - Discount */}
              <div className={`w-24 flex flex-col items-center justify-center py-4 ${
                coupon.claimed 
                  ? "bg-muted" 
                  : "bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD]"
              }`}>
                <span className={`text-2xl font-bold ${coupon.claimed ? "text-muted-foreground" : "text-white"}`}>
                  ¥{coupon.discount}
                </span>
                <span className={`text-xs ${coupon.claimed ? "text-muted-foreground" : "text-white/80"}`}>
                  满{coupon.minAmount}可用
                </span>
              </div>

              {/* Right - Info */}
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{coupon.name}</h3>
                    {coupon.limited && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-xs rounded">
                        限量
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{coupon.description}</p>
                  {coupon.limited && coupon.remaining && (
                    <p className="text-xs text-red-500 mt-1">仅剩 {coupon.remaining} 张</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {coupon.expireDate}到期
                  </span>
                  {coupon.claimed ? (
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Check className="w-3 h-3" />
                      已领取
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleClaim(coupon.id)}
                      className="px-4 py-1.5 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white text-xs rounded-full font-medium"
                    >
                      立即领取
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tip */}
      <div className="p-4 text-center">
        <p className="text-xs text-muted-foreground">优惠券领取后可在「我的-优惠券」中查看</p>
      </div>
    </div>
  )
}
