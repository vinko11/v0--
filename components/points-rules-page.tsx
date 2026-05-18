"use client"

import { ChevronLeft, Star, Gift, ShoppingBag, CreditCard } from "lucide-react"

interface PointsRulesPageProps {
  onBack: () => void
}

const rules = [
  {
    title: "如何获取积分",
    icon: Star,
    items: [
      "完成订单：每消费1元可获得1积分",
      "每日签到：连续签到可获得5-50积分不等",
      "邀请好友：成功邀请1位好友注册可获得100积分",
      "评价订单：完成订单评价可获得10积分",
      "完善资料：首次完善个人资料可获得50积分",
    ]
  },
  {
    title: "积分使用规则",
    icon: Gift,
    items: [
      "积分可在积分商城兑换商品",
      "部分商品支持「现金+积分」组合支付",
      "积分不可提现、不可转让",
      "兑换商品后积分立即扣除，不予退还",
    ]
  },
  {
    title: "积分有效期",
    icon: CreditCard,
    items: [
      "积分自获得之日起，有效期为12个月",
      "过期积分将自动清零，请及时使用",
      "每月1日系统自动清理过期积分",
    ]
  },
  {
    title: "特别说明",
    icon: ShoppingBag,
    items: [
      "退款订单对应的积分将被扣回",
      "通过违规手段获取的积分，平台有权收回",
      "积分规则如有调整，以最新公告为准",
      "最终解释权归平台所有",
    ]
  },
]

export default function PointsRulesPage({ onBack }: PointsRulesPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-white">积分规则</h1>
        </div>
      </div>

      {/* Rules Content */}
      <div className="p-4 space-y-4">
        {rules.map((section, index) => {
          const IconComponent = section.icon
          return (
            <div key={index} className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-bold text-foreground">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Contact */}
      <div className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          如有疑问，请联系客服：400-123-4567
        </p>
      </div>
    </div>
  )
}
