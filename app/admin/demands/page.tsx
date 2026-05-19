"use client"

import { useState } from "react"
import { Eye, X, Check, XCircle, MapPin, Image } from "lucide-react"
import { adminMockData } from "@/lib/admin-mock-data"

export default function DemandsPage() {
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedDemand, setSelectedDemand] = useState<typeof adminMockData.demands[0] | null>(null)
  const [demands, setDemands] = useState(adminMockData.demands)

  const filteredDemands = demands.filter(demand => {
    if (selectedStatus && demand.status !== selectedStatus) return false
    return true
  })

  const handleAccept = (id: string) => {
    setDemands(demands.map(d => d.id === id ? { ...d, status: "已接单" } : d))
    setSelectedDemand(null)
  }

  const handleReject = (id: string) => {
    setDemands(demands.map(d => d.id === id ? { ...d, status: "已关闭" } : d))
    setSelectedDemand(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待审核": return "bg-yellow-100 text-yellow-600"
      case "已接单": return "bg-green-100 text-green-600"
      case "已关闭": return "bg-gray-100 text-gray-600"
      default: return "bg-blue-100 text-blue-600"
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">需求发布审核</h1>

      {/* 筛选 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          >
            <option value="">全部状态</option>
            <option value="待审核">待审核</option>
            <option value="已接单">已接单</option>
            <option value="已关闭">已关闭</option>
          </select>
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">需求 ID</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">分类</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">标题</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">联系人</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">价格类型</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemands.map((demand) => (
                <tr key={demand.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-mono">{demand.id}</td>
                  <td className="py-3 px-4 text-gray-600">{demand.category}</td>
                  <td className="py-3 px-4 text-gray-900">{demand.title}</td>
                  <td className="py-3 px-4 text-gray-600">{demand.contact}</td>
                  <td className="py-3 px-4 text-gray-600">{demand.priceType}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(demand.status)}`}>
                      {demand.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedDemand(demand)}
                      className="text-[#4DD8CD] hover:underline"
                    >
                      <Eye className="w-4 h-4 inline" /> 查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 需求详情侧栏 */}
      {selectedDemand && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">需求详情</h2>
              <button onClick={() => setSelectedDemand(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">需求 ID</span>
                <span className="font-mono">{selectedDemand.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">分类</span>
                <span className="px-2 py-0.5 bg-[#4DD8CD]/10 text-[#4DD8CD] rounded text-sm">{selectedDemand.category}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">标题</p>
                <p className="font-medium">{selectedDemand.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">内容</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDemand.content}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">图片/视频</p>
                <div className="flex gap-2">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">联系人</p>
                  <p className="font-medium">{selectedDemand.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">价格类型</p>
                  <p className="font-medium">{selectedDemand.priceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">用户出价</p>
                  <p className="font-medium text-[#4DD8CD]">{selectedDemand.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">发布时间</p>
                  <p className="font-medium">{selectedDemand.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">服务地址</p>
                <p className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {selectedDemand.address}
                </p>
              </div>

              {/* 操作按钮 */}
              {selectedDemand.status === "待审核" && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleReject(selectedDemand.id)}
                    className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> 拒绝
                  </button>
                  <button
                    onClick={() => handleAccept(selectedDemand.id)}
                    className="flex-1 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" /> 接单
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
