"use client"

import { useState } from "react"
import { Plus, X, Trash2 } from "lucide-react"
import { adminMockData } from "@/lib/admin-mock-data"

export default function CartPromosPage() {
  const [promos, setPromos] = useState([
    { id: 1, name: "跨店满减", discount: 0.9, products: ["P001", "P002", "P003"], excludeProducts: ["P005"] },
    { id: 2, name: "护理服务优惠", discount: 0.85, products: ["P001", "P004"], excludeProducts: [] },
  ])
  const [showEditor, setShowEditor] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">购物车合并优惠</h1>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          新建活动
        </button>
      </div>

      {/* 活动列表 */}
      <div className="space-y-4">
        {promos.map((promo) => (
          <div key={promo.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{promo.name}</h3>
                <p className="text-[#4DD8CD] font-medium mt-1">{promo.discount * 10}折优惠</p>
              </div>
              <div className="flex gap-2">
                <button className="text-[#4DD8CD] hover:underline text-sm">编辑</button>
                <button className="text-red-500 hover:underline text-sm">删除</button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">参与商品</p>
                <div className="flex flex-wrap gap-1">
                  {promo.products.map(pid => {
                    const product = adminMockData.products.find(p => p.id === pid)
                    return product ? (
                      <span key={pid} className="px-2 py-0.5 bg-green-100 text-green-600 rounded text-xs">
                        {product.name.slice(0, 8)}...
                      </span>
                    ) : null
                  })}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">排除商品</p>
                <div className="flex flex-wrap gap-1">
                  {promo.excludeProducts.length > 0 ? promo.excludeProducts.map(pid => {
                    const product = adminMockData.products.find(p => p.id === pid)
                    return product ? (
                      <span key={pid} className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs">
                        {product.name.slice(0, 8)}...
                      </span>
                    ) : null
                  }) : (
                    <span className="text-xs text-gray-400">无</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 编辑弹窗 */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">新建购物车优惠</h2>
              <button onClick={() => setShowEditor(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">活动名称</label>
                <input
                  type="text"
                  placeholder="请输入活动名称"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">折扣（如0.9表示9折）</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.9"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">参与商品</label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {adminMockData.products.map(p => (
                    <label key={p.id} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" className="w-4 h-4 text-[#4DD8CD] rounded" />
                      <span className="text-sm text-gray-600">{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">排除商品（不参与优惠）</label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {adminMockData.products.map(p => (
                    <label key={p.id} className="flex items-center gap-2 mb-1">
                      <input type="checkbox" className="w-4 h-4 text-red-500 rounded" />
                      <span className="text-sm text-gray-600">{p.name}</span>
                    </label>
                  ))}
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
