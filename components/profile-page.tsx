"use client"

import { useState } from "react"
import { Settings, Wallet, Gift, Clock, CheckCircle, RotateCcw, FileText, MapPin, Headphones, Info, ChevronRight, Building2, Users, TrendingUp, ShoppingCart, Truck, Star, Ticket, Heart } from "lucide-react"
import InstitutionRegisterPage from "./institution-register-page"
import StaffRegisterPage from "./staff-register-page"
import ReferralPage from "./referral-page"
import AddressPage from "./address-page"
import OrderListPage from "./order-list-page"
import ServiceAgreementPage from "./service-agreement-page"
import CustomerServicePage from "./customer-service-page"
import AboutUsPage from "./about-us-page"
import SettingsPage from "./settings-page"
import WalletPage from "./wallet-page"
import WithdrawPage from "./withdraw-page"
import CouponListPage from "./coupon-list-page"
import CouponCenterPage from "./coupon-center-page"
import PointsMallPage from "./points-mall-page"
import PointsOrderListPage from "./points-order-list-page"
import PointsRulesPage from "./points-rules-page"
import FavoritesPage from "./favorites-page"
import CartPage from "./cart-page"

type SubPage = "main" | "institution" | "staff" | "referral" | "address" | "orders" | "agreement" | "service" | "about" | "settings" | "wallet" | "withdraw" | "coupons" | "coupon-center" | "points-mall" | "points-orders" | "points-rules" | "favorites" | "cart"

const orderStatuses = [
  { icon: Clock, label: "待付款", color: "#f59e0b", page: "pending" },
  { icon: Truck, label: "派单中", color: "#3b82f6", page: "dispatching" },
  { icon: CheckCircle, label: "已派单", color: "#10b981", page: "dispatched" },
  { icon: Star, label: "未评价", color: "#a855f7", page: "unreviewed" },
  { icon: Star, label: "已评价", color: "#ec4899", page: "reviewed" },
  { icon: RotateCcw, label: "退款", color: "#ef4444", page: "refunding" },
]

const personalTools = [
  { icon: Heart, label: "我的收藏", color: "#ef4444", page: "favorites" as SubPage },
  { icon: Ticket, label: "优惠券", color: "#f59e0b", page: "coupons" as SubPage },
  { icon: ShoppingCart, label: "购物车", color: "#10b981", page: "cart" as SubPage },
  { icon: TrendingUp, label: "推荐得积分", color: "#f59e0b", page: "referral" as SubPage },
  { icon: MapPin, label: "我的地址", color: "#ef4444", page: "address" as SubPage },
  { icon: Headphones, label: "联系客服", color: "#06b6d4", page: "service" as SubPage },
  { icon: Info, label: "关于我们", color: "#6b7280", page: "about" as SubPage },
  { icon: Settings, label: "设置", color: "#374151", page: "settings" as SubPage },
]

const businessTools = [
  { icon: Building2, label: "机构入驻", color: "#3b82f6", page: "institution" as SubPage },
  { icon: Users, label: "服务人员入驻", color: "#10b981", page: "staff" as SubPage },
  { icon: FileText, label: "服务协议", color: "#8b5cf6", page: "agreement" as SubPage },
]

export default function ProfilePage() {
  const [currentPage, setCurrentPage] = useState<SubPage>("main")
  const [orderTab, setOrderTab] = useState("all")

  const handleBack = () => setCurrentPage("main")

  const handleOrderClick = (tab: string) => {
    setOrderTab(tab)
    setCurrentPage("orders")
  }

  // Render sub pages
  if (currentPage === "institution") return <InstitutionRegisterPage onBack={handleBack} />
  if (currentPage === "staff") return <StaffRegisterPage onBack={handleBack} />
  if (currentPage === "referral") return <ReferralPage onBack={handleBack} />
  if (currentPage === "address") return <AddressPage onBack={handleBack} />
  if (currentPage === "orders") return <OrderListPage onBack={handleBack} initialTab={orderTab} />
  if (currentPage === "agreement") return <ServiceAgreementPage onBack={handleBack} />
  if (currentPage === "service") return <CustomerServicePage onBack={handleBack} />
  if (currentPage === "about") return <AboutUsPage onBack={handleBack} />
  if (currentPage === "settings") return <SettingsPage onBack={handleBack} />
  if (currentPage === "wallet") return <WalletPage onBack={handleBack} onWithdraw={() => setCurrentPage("withdraw")} />
  if (currentPage === "withdraw") return <WithdrawPage onBack={() => setCurrentPage("wallet")} />
  if (currentPage === "coupons") return <CouponListPage onBack={handleBack} />
  if (currentPage === "coupon-center") return <CouponCenterPage onBack={handleBack} />
  if (currentPage === "points-mall") return <PointsMallPage onBack={handleBack} onOrderList={() => setCurrentPage("points-orders")} onRules={() => setCurrentPage("points-rules")} />
  if (currentPage === "points-orders") return <PointsOrderListPage onBack={() => setCurrentPage("points-mall")} />
  if (currentPage === "points-rules") return <PointsRulesPage onBack={() => setCurrentPage("points-mall")} />
  if (currentPage === "favorites") return <FavoritesPage onBack={handleBack} />
  if (currentPage === "cart") return <CartPage onBack={handleBack} />

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
              <p className="text-white/80 text-sm">ID: 53000001</p>
              <p className="text-white/80 text-sm">138****8888</p>
            </div>
          </div>
          <button onClick={() => setCurrentPage("settings")}>
            <Settings className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Stats Card - 余额和积分 */}
      <div className="mx-4 -mt-8 bg-card rounded-2xl p-4 shadow-sm relative z-10">
        <div className="grid grid-cols-2 divide-x divide-border">
          <button 
            onClick={() => setCurrentPage("wallet")}
            className="flex flex-col items-center gap-1 py-2"
          >
            <div className="flex items-center gap-1.5 text-primary">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">余额</span>
            </div>
            <span className="text-xl font-bold text-foreground">¥520.00</span>
          </button>
          <button 
            onClick={() => setCurrentPage("points-mall")}
            className="flex flex-col items-center gap-1 py-2"
          >
            <div className="flex items-center gap-1.5 text-yellow-500">
              <Gift className="w-4 h-4" />
              <span className="text-sm font-medium">积分</span>
            </div>
            <span className="text-xl font-bold text-foreground">1,280</span>
          </button>
        </div>
      </div>

      {/* Order Section */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">我的订单</h3>
          <button 
            onClick={() => handleOrderClick("all")}
            className="flex items-center gap-1 text-muted-foreground text-sm"
          >
            <span>查看全部</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {orderStatuses.slice(0, 4).map((status, index) => (
            <button 
              key={index} 
              onClick={() => handleOrderClick(status.page)}
              className="flex flex-col items-center gap-1.5"
            >
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
        <div className="grid grid-cols-4 gap-3 mt-3">
          {orderStatuses.slice(4).map((status, index) => (
            <button 
              key={index} 
              onClick={() => handleOrderClick(status.page)}
              className="flex flex-col items-center gap-1.5"
            >
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

      {/* Personal Tools Section */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">个人服务</h3>
        <div className="grid grid-cols-4 gap-4">
          {personalTools.map((tool, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentPage(tool.page)}
              className="flex flex-col items-center gap-1.5"
            >
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

      {/* Business Tools Section */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">商家中心</h3>
        <div className="grid grid-cols-4 gap-4">
          {businessTools.map((tool, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentPage(tool.page)}
              className="flex flex-col items-center gap-1.5"
            >
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

      {/* 管理后台入口 */}
      <div className="mx-4 mt-4 mb-4 text-center">
        <a 
          href="/admin" 
          target="_blank"
          className="text-xs text-muted-foreground hover:text-primary underline"
        >
          管理后台（演示）
        </a>
      </div>
    </div>
  )
}
