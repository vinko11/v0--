"use client"

import Link from "next/link"
import { ShoppingCart, ClipboardCheck, UserPlus, FileText, Bell, TrendingUp, Users, Package } from "lucide-react"
import { adminMockData } from "@/lib/admin-mock-data"

export default function AdminDashboard() {
  const { stats } = adminMockData

  const statCards = [
    { label: "今日订单", value: stats.todayOrders, icon: ShoppingCart, color: "bg-blue-500", change: "+12%" },
    { label: "待审核入驻", value: stats.pendingApplications, icon: UserPlus, color: "bg-orange-500", change: null },
    { label: "待派单", value: stats.pendingDispatch, icon: ClipboardCheck, color: "bg-purple-500", change: null },
    { label: "待处理需求", value: stats.pendingDemands, icon: FileText, color: "bg-red-500", change: null },
  ]

  const quickActions = [
    { label: "订单列表", href: "/admin/orders", icon: ShoppingCart },
    { label: "入驻审核", href: "/admin/applications", icon: ClipboardCheck },
    { label: "发布公告", href: "/admin/announcements", icon: Bell },
  ]

  // 最近订单
  const recentOrders = adminMockData.orders.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">工作台</h1>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                {card.change && (
                  <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {card.change} 较昨日
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 快捷入口 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">快捷入口</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-[#4DD8CD]/10 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-[#4DD8CD]" />
                </div>
                <span className="text-xs text-gray-600">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 最近订单 */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">最近订单</h2>
            <Link href="/admin/orders" className="text-sm text-[#4DD8CD] hover:underline">
              查看全部
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">订单号</th>
                  <th className="text-left py-2 text-gray-500 font-medium">用户</th>
                  <th className="text-left py-2 text-gray-500 font-medium">商品</th>
                  <th className="text-left py-2 text-gray-500 font-medium">状态</th>
                  <th className="text-right py-2 text-gray-500 font-medium">金额</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3 text-gray-900">{order.id}</td>
                    <td className="py-3 text-gray-600">{order.userName}</td>
                    <td className="py-3 text-gray-600 max-w-[150px] truncate">{order.product}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        order.status === "已完成" ? "bg-green-100 text-green-600" :
                        order.status === "待付款" ? "bg-yellow-100 text-yellow-600" :
                        order.status === "退款中" ? "bg-red-100 text-red-600" :
                        "bg-blue-100 text-blue-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-900">¥{order.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 待处理事项 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">待审核入驻</h2>
          <div className="space-y-3">
            {adminMockData.applications.institutions.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.category} · {app.time}</p>
                </div>
                <Link href="/admin/applications" className="text-sm text-[#4DD8CD]">审核</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">待处理需求</h2>
          <div className="space-y-3">
            {adminMockData.demands.filter(d => d.status === "待审核").slice(0, 3).map((demand) => (
              <div key={demand.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{demand.title}</p>
                  <p className="text-xs text-gray-500">{demand.category} · {demand.contact}</p>
                </div>
                <Link href="/admin/demands" className="text-sm text-[#4DD8CD]">处理</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
