"use client"

import { useState } from "react"
import { Search, Eye, X, Check, XCircle, Download, Image } from "lucide-react"
import { adminMockData, productCategories } from "@/lib/admin-mock-data"

export default function WorkersPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedWorker, setSelectedWorker] = useState<typeof adminMockData.workers[0] | null>(null)
  const [workers, setWorkers] = useState(adminMockData.workers)
  const [rejectReason, setRejectReason] = useState("")
  const [showToast, setShowToast] = useState(false)

  const districts = ["建邺区", "鼓楼区", "玄武区", "秦淮区", "栖霞区", "雨花台区"]

  const filteredWorkers = workers.filter(worker => {
    if (selectedCategory && !worker.categories.includes(selectedCategory)) return false
    if (selectedStatus && worker.status !== selectedStatus) return false
    if (selectedDistrict && worker.district !== selectedDistrict) return false
    return true
  })

  const handleApprove = (id: string) => {
    setWorkers(workers.map(w => w.id === id ? { ...w, status: "已通过" } : w))
    setSelectedWorker(null)
  }

  const handleReject = (id: string) => {
    if (!rejectReason) {
      alert("请输入驳回原因")
      return
    }
    setWorkers(workers.map(w => w.id === id ? { ...w, status: "已驳回", rejectReason } : w))
    setRejectReason("")
    setSelectedWorker(null)
  }

  const handleExport = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已通过": return "bg-green-100 text-green-600"
      case "待审核": return "bg-yellow-100 text-yellow-600"
      case "已驳回": return "bg-red-100 text-red-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">服务人员</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Download className="w-4 h-4" />
          导出
        </button>
      </div>

      {/* 筛选 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          >
            <option value="">全部区县</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          >
            <option value="">全部类目</option>
            {productCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          >
            <option value="">全部状态</option>
            <option value="待审核">待审核</option>
            <option value="已通过">已通过</option>
            <option value="已驳回">已驳回</option>
          </select>
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">姓名</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">手机</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">服务类目</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">区县</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={worker.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-gray-900">{worker.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{worker.phone}</td>
                  <td className="py-3 px-4 text-gray-600">{worker.categories.join("、")}</td>
                  <td className="py-3 px-4 text-gray-600">{worker.district}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(worker.status)}`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedWorker(worker)}
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
      </div>

      {/* 服务人员详情侧栏 */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">服务人员详情</h2>
              <button onClick={() => setSelectedWorker(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* 头像和基本信息 */}
              <div className="flex items-center gap-4">
                <img src={selectedWorker.photo} alt="" className="w-20 h-20 rounded-xl object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{selectedWorker.name}</h3>
                  <p className="text-gray-500">{selectedWorker.phone}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${getStatusColor(selectedWorker.status)}`}>
                    {selectedWorker.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">身份证</p>
                  <p className="font-medium">{selectedWorker.idCard}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">服务区县</p>
                  <p className="font-medium">{selectedWorker.district}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">服务类目</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedWorker.categories.map(cat => (
                      <span key={cat} className="px-2 py-0.5 bg-[#4DD8CD]/10 text-[#4DD8CD] rounded text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 证件照片 */}
              <div>
                <p className="text-sm text-gray-500 mb-2">身份证照片</p>
                <div className="flex gap-2">
                  <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">资质证书</p>
                  <p className="font-medium">{selectedWorker.qualification}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">保险单</p>
                  <p className="font-medium">{selectedWorker.insurance}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">自我介绍</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedWorker.intro}</p>
              </div>

              {selectedWorker.rejectReason && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-600">驳回原因：{selectedWorker.rejectReason}</p>
                </div>
              )}

              {/* 操作按钮 */}
              {selectedWorker.status === "待审核" && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="驳回原因（驳回时必填）"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50 resize-none"
                    rows={2}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReject(selectedWorker.id)}
                      className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" /> 驳回
                    </button>
                    <button
                      onClick={() => handleApprove(selectedWorker.id)}
                      className="flex-1 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> 通过
                    </button>
                  </div>
                </div>
              )}
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
