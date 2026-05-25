"use client"

import { useState } from "react"
import { Plus, Edit, X } from "lucide-react"
import { adminMockData } from "@/lib/admin-mock-data"

export default function CouponsPage() {
  const [coupons] = useState(adminMockData.coupons)
  const [showEditor, setShowEditor] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<typeof adminMockData.coupons[0] | null>(null)

  const handleEdit = (coupon: typeof adminMockData.coupons[0]) => {
    setEditingCoupon(coupon)
    setShowEditor(true)
  }

  const handleCreate = () => {
    setEditingCoupon(null)
    setShowEditor(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">优惠券/活动</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          新建优惠券
        </button>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">券名</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">类型</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">面额/折扣</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">门槛</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">有效期</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">领取/总量</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{coupon.name}</td>
                  <td className="py-3 px-4 text-gray-600">{coupon.type}</td>
                  <td className="py-3 px-4 text-[#4DD8CD] font-medium">
                    {coupon.type === "满减" ? `¥${coupon.discount}` : `${coupon.discount * 10}折`}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {coupon.threshold > 0 ? `满¥${coupon.threshold}` : "无门槛"}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{coupon.validDays}天</td>
                  <td className="py-3 px-4 text-gray-600">{coupon.claimed}/{coupon.total}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      coupon.status === "进行中" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleEdit(coupon)}
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
              <h2 className="text-lg font-semibold">{editingCoupon ? "编辑优惠券" : "新建优惠券"}</h2>
              <button onClick={() => setShowEditor(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">券名</label>
                <input
                  type="text"
                  defaultValue={editingCoupon?.name}
                  placeholder="请输入优惠券名称"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
                  <select
                    defaultValue={editingCoupon?.type}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  >
                    <option value="满减">满减券</option>
                    <option value="折扣">折扣券</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">面额/折扣</label>
                  <input
                    type="number"
                    defaultValue={editingCoupon?.discount}
                    placeholder="金额或折扣"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">使用门槛</label>
                  <input
                    type="number"
                    defaultValue={editingCoupon?.threshold}
                    placeholder="0为无门槛"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">有效天数</label>
                  <input
                    type="number"
                    defaultValue={editingCoupon?.validDays}
                    placeholder="领取后有效天数"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">发放数量</label>
                <input
                  type="number"
                  defaultValue={editingCoupon?.total}
                  placeholder="总发放数量"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">适用商品</label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <label className="flex items-center gap-2 mb-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#4DD8CD] rounded" />
                    <span className="text-sm">全部商品</span>
                  </label>
                  {adminMockData.products.map(p => (
                    <label key={p.id} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" className="w-4 h-4 text-[#4DD8CD] rounded" />
                      <span className="text-sm text-gray-600">{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showInCenter"
                  defaultChecked={editingCoupon?.showInCenter}
                  className="w-4 h-4 text-[#4DD8CD] rounded"
                />
                <label htmlFor="showInCenter" className="text-sm text-gray-700">在领券中心展示</label>
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
