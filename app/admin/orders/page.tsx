"use client"

import { useState } from "react"
import { Search, Eye, X, ChevronLeft, ChevronRight } from "lucide-react"
import { adminMockData, orderStatusFlow } from "@/lib/admin-mock-data"

export default function OrdersPage() {
  const [searchId, setSearchId] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<typeof adminMockData.orders[0] | null>(null)

  const filteredOrders = adminMockData.orders.filter(order => {
    if (searchId && !order.id.includes(searchId)) return false
    if (selectedStatus && order.status !== selectedStatus) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成": return "bg-green-100 text-green-600"
      case "待付款": return "bg-yellow-100 text-yellow-600"
      case "退款中": case "已退款": return "bg-red-100 text-red-600"
      default: return "bg-blue-100 text-blue-600"
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>

      {/* 筛选 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="订单号搜索"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          >
            <option value="">全部状态</option>
            {orderStatusFlow.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          />
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">订单号</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">用户</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">商品</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-right py-3 px-4 text-gray-600 font-medium">实付金额</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">下单时间</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-mono text-xs">{order.id}</td>
                  <td className="py-3 px-4 text-gray-600">{order.userName}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-[180px] truncate">{order.product}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">¥{order.paid}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{order.time}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-[#4DD8CD] hover:underline"
                    >
                      <Eye className="w-4 h-4 inline" /> 详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">共 {filteredOrders.length} 条记录</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-[#4DD8CD] text-white rounded">1</button>
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 订单详情侧栏 */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">订单详情</h2>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* 状态流转 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">状态流转</h3>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {orderStatusFlow.slice(0, 5).map((status, index) => {
                    const currentIndex = orderStatusFlow.indexOf(selectedOrder.status)
                    const isActive = index <= currentIndex
                    const isCurrent = status === selectedOrder.status
                    return (
                      <div key={status} className="flex items-center">
                        <div className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
                          isCurrent ? "bg-[#4DD8CD] text-white" :
                          isActive ? "bg-[#4DD8CD]/20 text-[#4DD8CD]" :
                          "bg-gray-100 text-gray-400"
                        }`}>
                          {status}
                        </div>
                        {index < 4 && (
                          <div className={`w-4 h-0.5 ${isActive ? "bg-[#4DD8CD]" : "bg-gray-200"}`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 商品信息 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">商品信息</h3>
                <p className="text-gray-900">{selectedOrder.product}</p>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">原价</span>
                    <span>¥{selectedOrder.amount}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">折扣</span>
                    <span className="text-red-500">-¥{selectedOrder.discount}</span>
                  </div>
                  <div className="flex justify-between py-1 font-medium">
                    <span className="text-gray-700">实付</span>
                    <span className="text-[#4DD8CD]">¥{selectedOrder.paid}</span>
                  </div>
                </div>
              </div>

              {/* 服务信息 */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">服务信息</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">联系人</p>
                    <p className="font-medium">{selectedOrder.contact}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">联系电话</p>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">服务地址</p>
                    <p className="font-medium">{selectedOrder.address}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">预约时间</p>
                    <p className="font-medium">{selectedOrder.serviceTime}</p>
                  </div>
                  {selectedOrder.worker && (
                    <div className="col-span-2">
                      <p className="text-gray-500">服务人员</p>
                      <p className="font-medium">{selectedOrder.worker}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedOrder.status === "派单中" && (
                  <button className="flex-1 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90">
                    派单
                  </button>
                )}
                {selectedOrder.status === "退款中" && (
                  <>
                    <button className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                      拒绝退款
                    </button>
                    <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:opacity-90">
                      同意退款
                    </button>
                  </>
                )}
                {(selectedOrder.status === "待付款" || selectedOrder.status === "已派单") && (
                  <button className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
                    取消订单
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
