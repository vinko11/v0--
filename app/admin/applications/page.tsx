"use client"

import { useState } from "react"
import { Eye, X, Check, XCircle, Image } from "lucide-react"
import { adminMockData } from "@/lib/admin-mock-data"

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"institutions" | "workers">("institutions")
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [applications, setApplications] = useState(adminMockData.applications)
  const [rejectReason, setRejectReason] = useState("")

  const currentList = activeTab === "institutions" ? applications.institutions : applications.workers

  const handleApprove = (id: string) => {
    if (activeTab === "institutions") {
      setApplications({
        ...applications,
        institutions: applications.institutions.map(a => 
          a.id === id ? { ...a, status: "已通过" } : a
        )
      })
    } else {
      setApplications({
        ...applications,
        workers: applications.workers.map(a => 
          a.id === id ? { ...a, status: "已通过" } : a
        )
      })
    }
    setSelectedApp(null)
  }

  const handleReject = (id: string) => {
    if (!rejectReason) {
      alert("请输入驳回原因")
      return
    }
    if (activeTab === "institutions") {
      setApplications({
        ...applications,
        institutions: applications.institutions.map(a => 
          a.id === id ? { ...a, status: "已驳回" } : a
        )
      })
    } else {
      setApplications({
        ...applications,
        workers: applications.workers.map(a => 
          a.id === id ? { ...a, status: "已驳回" } : a
        )
      })
    }
    setRejectReason("")
    setSelectedApp(null)
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
      <h1 className="text-2xl font-bold text-gray-900">入驻审核</h1>

      {/* Tab 切换 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("institutions")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "institutions"
                ? "text-[#4DD8CD] border-b-2 border-[#4DD8CD]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            机构申请
            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full text-xs">
              {applications.institutions.filter(a => a.status === "待审核").length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("workers")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "workers"
                ? "text-[#4DD8CD] border-b-2 border-[#4DD8CD]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            人员申请
            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full text-xs">
              {applications.workers.filter(a => a.status === "待审核").length}
            </span>
          </button>
        </div>

        {/* 表格 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">申请人/机构</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">类型</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  {activeTab === "institutions" ? "类别" : "服务类目"}
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">提交时间</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((app: any) => (
                <tr key={app.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{app.name}</td>
                  <td className="py-3 px-4 text-gray-600">{app.type}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {activeTab === "institutions" ? app.category : app.categories?.join("、")}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{app.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="text-[#4DD8CD] hover:underline"
                    >
                      <Eye className="w-4 h-4 inline" /> 审核
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情侧栏 */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {activeTab === "institutions" ? "机构入驻审核" : "人员入驻审核"}
              </h2>
              <button onClick={() => setSelectedApp(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {activeTab === "institutions" ? "机构名称" : "姓名"}
                  </p>
                  <p className="font-medium">{selectedApp.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">联系电话</p>
                  <p className="font-medium">{selectedApp.phone}</p>
                </div>
                {activeTab === "institutions" ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">机构类别</p>
                      <p className="font-medium">{selectedApp.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">服务区域</p>
                      <p className="font-medium">{selectedApp.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">联系人</p>
                      <p className="font-medium">{selectedApp.contact}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">服务区县</p>
                      <p className="font-medium">{selectedApp.district}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">服务类目</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedApp.categories?.map((cat: string) => (
                          <span key={cat} className="px-2 py-0.5 bg-[#4DD8CD]/10 text-[#4DD8CD] rounded text-sm">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 证件信息 */}
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  {activeTab === "institutions" ? "营业执照" : "身份证照片"}
                </p>
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
                  <p className="text-sm text-gray-500">
                    {activeTab === "institutions" ? "执照状态" : "身份证"}
                  </p>
                  <p className="font-medium text-green-600">
                    {activeTab === "institutions" ? selectedApp.license : selectedApp.idCard}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {activeTab === "institutions" ? "资质状态" : "保险单"}
                  </p>
                  <p className={`font-medium ${
                    (activeTab === "institutions" ? selectedApp.qualification : selectedApp.insurance) === "已上传" 
                      ? "text-green-600" 
                      : "text-yellow-600"
                  }`}>
                    {activeTab === "institutions" ? selectedApp.qualification : selectedApp.insurance}
                  </p>
                </div>
              </div>

              {activeTab === "workers" && (
                <div>
                  <p className="text-sm text-gray-500">资质证书</p>
                  <p className="font-medium">{selectedApp.qualification}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">提交时间</p>
                <p className="font-medium">{selectedApp.time}</p>
              </div>

              {/* 操作按钮 */}
              {selectedApp.status === "待审核" && (
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
                      onClick={() => handleReject(selectedApp.id)}
                      className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" /> 驳回
                    </button>
                    <button
                      onClick={() => handleApprove(selectedApp.id)}
                      className="flex-1 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> 通过
                    </button>
                  </div>
                </div>
              )}

              {selectedApp.status !== "待审核" && (
                <div className={`p-3 rounded-lg ${
                  selectedApp.status === "已通过" ? "bg-green-50" : "bg-red-50"
                }`}>
                  <p className={`text-sm ${
                    selectedApp.status === "已通过" ? "text-green-600" : "text-red-600"
                  }`}>
                    {selectedApp.status === "已通过" ? "已审核通过" : "已驳回"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
