"use client"

import { useState } from "react"
import { Search, Eye, X, Plus, Edit, UserPlus, Star, Image } from "lucide-react"
import { adminMockData, regions } from "@/lib/admin-mock-data"

export default function ProvidersPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<typeof adminMockData.providers[0] | null>(null)
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const categories = ["养老机构", "家政公司", "医疗护理"]

  const filteredProviders = adminMockData.providers.filter(provider => {
    if (selectedCategory && provider.category !== selectedCategory) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">服务商/机构</h1>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          代录入机构
        </button>
      </div>

      {/* 筛选 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
          >
            <option value="">全部类别</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">机构名称</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">类别</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">区域</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">联系人</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">电话</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">星级</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.map((provider) => (
                <tr key={provider.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{provider.name}</td>
                  <td className="py-3 px-4 text-gray-600">{provider.category}</td>
                  <td className="py-3 px-4 text-gray-600">{provider.region}</td>
                  <td className="py-3 px-4 text-gray-600">{provider.contact}</td>
                  <td className="py-3 px-4 text-gray-600">{provider.phone}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{provider.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      provider.status === "正常" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => setSelectedProvider(provider)}
                      className="text-[#4DD8CD] hover:underline"
                    >
                      详情
                    </button>
                    <button className="text-gray-500 hover:underline">编辑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 机构详情侧栏 */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">机构详情</h2>
              <button onClick={() => setSelectedProvider(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{selectedProvider.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{selectedProvider.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">机构类别</p>
                  <p className="font-medium">{selectedProvider.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">服务区域</p>
                  <p className="font-medium">{selectedProvider.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">联系人</p>
                  <p className="font-medium">{selectedProvider.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">联系电话</p>
                  <p className="font-medium">{selectedProvider.phone}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">机构简介</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedProvider.intro}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">营业执照</p>
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">资质证书</p>
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">环境图片</p>
                <div className="flex gap-2">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCreateAccount(true)
                    setSelectedProvider(null)
                  }}
                  className="flex-1 py-2 border border-[#4DD8CD] text-[#4DD8CD] rounded-lg hover:bg-[#4DD8CD]/10 flex items-center justify-center gap-1"
                >
                  <UserPlus className="w-4 h-4" /> 创建子账号
                </button>
                <button className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
                  {selectedProvider.status === "正常" ? "停用" : "启用"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 创建子账号弹窗 */}
      {showCreateAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">创建机构子账号</h2>
              <button onClick={() => setShowCreateAccount(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">账号名</label>
                <input
                  type="text"
                  placeholder="请输入账号名"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">初始密码</label>
                <input
                  type="text"
                  defaultValue="abc123456"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">系统自动生成，首次登录需修改</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateAccount(false)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowCreateAccount(false)}
                  className="flex-1 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 代录入弹窗 */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">代录入机构</h2>
              <button onClick={() => setShowEditor(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">机构名称</label>
                  <input
                    type="text"
                    placeholder="请输入机构名称"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">机构类别</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50">
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">联系人</label>
                  <input
                    type="text"
                    placeholder="请输入联系人"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                  <input
                    type="text"
                    placeholder="请输入联系电话"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">服务区域</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50">
                  {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">机构简介</label>
                <textarea
                  rows={3}
                  placeholder="请输入机构简介"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50 resize-none"
                />
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
