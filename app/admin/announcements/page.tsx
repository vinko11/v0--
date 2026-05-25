"use client"

import { useState } from "react"
import { Plus, Edit, X, Eye, Bell } from "lucide-react"
import { adminMockData } from "@/lib/admin-mock-data"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(adminMockData.announcements)
  const [showEditor, setShowEditor] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<typeof adminMockData.announcements[0] | null>(null)

  const handleEdit = (announcement: typeof adminMockData.announcements[0]) => {
    setEditingAnnouncement(announcement)
    setShowEditor(true)
  }

  const handleCreate = () => {
    setEditingAnnouncement(null)
    setShowEditor(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">公告管理</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          新建公告
        </button>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">标题</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">弹窗</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">首页轮播</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">发布时间</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{announcement.title}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      announcement.isPopup ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {announcement.isPopup ? "是" : "否"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      announcement.isCarousel ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {announcement.isCarousel ? "是" : "否"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{announcement.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      announcement.status === "已发布" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {announcement.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="text-[#4DD8CD] hover:underline"
                    >
                      编辑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 编辑弹窗 */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{editingAnnouncement ? "编辑公告" : "新建公告"}</h2>
              <button onClick={() => setShowEditor(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  defaultValue={editingAnnouncement?.title}
                  placeholder="请输入公告标题"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">正文</label>
                <textarea
                  rows={4}
                  defaultValue={editingAnnouncement?.content}
                  placeholder="请输入公告内容"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPopup"
                    defaultChecked={editingAnnouncement?.isPopup}
                    className="w-4 h-4 text-[#4DD8CD] rounded"
                  />
                  <label htmlFor="isPopup" className="text-sm text-gray-700">紧急弹窗</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isCarousel"
                    defaultChecked={editingAnnouncement?.isCarousel}
                    className="w-4 h-4 text-[#4DD8CD] rounded"
                  />
                  <label htmlFor="isCarousel" className="text-sm text-gray-700">首页轮播</label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowEditor(false)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowEditor(false)}
                  className="flex-1 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
