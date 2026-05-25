"use client"

import { useState } from "react"
import { Search, Download, Eye, X, ChevronLeft, ChevronRight } from "lucide-react"
import { adminMockData, regions } from "@/lib/admin-mock-data"

export default function UsersPage() {
  const [searchId, setSearchId] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedUser, setSelectedUser] = useState<typeof adminMockData.users[0] | null>(null)
  const [showToast, setShowToast] = useState(false)

  const filteredUsers = adminMockData.users.filter(user => {
    if (searchId && !user.id.includes(searchId)) return false
    if (selectedRegion && !user.address.includes(selectedRegion.replace("市", ""))) return false
    return true
  })

  const handleExport = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Download className="w-4 h-4" />
          导出 CSV
        </button>
      </div>

      {/* 筛选 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="用户 ID 精确搜索"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
              />
            </div>
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          >
            <option value="">全部地区</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          />
          <span className="py-2 text-gray-400">至</span>
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
                <th className="text-left py-3 px-4 text-gray-600 font-medium">用户 ID</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">昵称</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">手机</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">紧急联系人</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">紧急电话</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">注册地址</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">注册时间</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-mono">{user.id}</td>
                  <td className="py-3 px-4 text-gray-900">{user.nickname}</td>
                  <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                  <td className="py-3 px-4 text-gray-600">{user.emergencyContact}</td>
                  <td className="py-3 px-4 text-gray-600">{user.emergencyPhone}</td>
                  <td className="py-3 px-4 text-gray-600">{user.address}</td>
                  <td className="py-3 px-4 text-gray-500">{user.registerTime}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedUser(user)}
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

        {/* 分页 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">共 {filteredUsers.length} 条记录</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-[#4DD8CD] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 用户详情侧栏 */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">用户详情</h2>
              <button onClick={() => setSelectedUser(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">用户 ID</p>
                  <p className="font-medium">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">昵称</p>
                  <p className="font-medium">{selectedUser.nickname}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">手机号</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">注册地址</p>
                  <p className="font-medium">{selectedUser.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">紧急联系人</p>
                  <p className="font-medium">{selectedUser.emergencyContact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">紧急联系电话</p>
                  <p className="font-medium">{selectedUser.emergencyPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">注册时间</p>
                  <p className="font-medium">{selectedUser.registerTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">历史订单数</p>
                  <p className="font-medium text-[#4DD8CD]">{selectedUser.orderCount} 单</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
          导出成功！文件已下载
        </div>
      )}
    </div>
  )
}
