"use client"

import { useState } from "react"
import { Plus, X, GripVertical, Trash2, Upload, Image } from "lucide-react"
import { adminMockData, productCategories } from "@/lib/admin-mock-data"

export default function HomeConfigPage() {
  const [config, setConfig] = useState(adminMockData.homeConfig)
  const [showBannerEditor, setShowBannerEditor] = useState(false)

  const categoryLabels: Record<string, string> = {
    home: "居家护工",
    hospital: "住院陪护",
    medical: "助医服务",
    bath: "助浴服务",
    meal: "助餐服务",
    equipment: "器材租售",
    cleaning: "保洁服务",
    safety: "安全检查",
    health: "慢病监测",
    renovation: "适老改造",
    warm: "暖心服务",
    psychology: "心理健康",
    smart: "智能养老",
  }

  const allCategories = Object.keys(categoryLabels)

  const toggleCategory = (cat: string) => {
    if (config.categories.includes(cat)) {
      setConfig({ ...config, categories: config.categories.filter(c => c !== cat) })
    } else {
      setConfig({ ...config, categories: [...config.categories, cat] })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">首页运营</h1>

      {/* 轮播图配置 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">轮播图</h2>
          <button
            onClick={() => setShowBannerEditor(true)}
            className="flex items-center gap-1 text-sm text-[#4DD8CD] hover:underline"
          >
            <Plus className="w-4 h-4" /> 添加
          </button>
        </div>
        <div className="space-y-3">
          {config.banners.map((banner, index) => (
            <div key={banner.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
              <div className="w-24 h-14 bg-gray-200 rounded overflow-hidden">
                <img src={banner.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">轮播图 {index + 1}</p>
                <p className="text-xs text-gray-500">链接商品: {banner.productId}</p>
              </div>
              <button className="text-[#4DD8CD] hover:underline text-sm">编辑</button>
              <button className="text-red-500 hover:underline text-sm">删除</button>
            </div>
          ))}
        </div>
      </div>

      {/* 金刚区配置 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">金刚区（首页分类入口）</h2>
        <p className="text-sm text-gray-500 mb-3">勾选要在首页显示的类目，取消勾选则隐藏</p>
        <div className="grid grid-cols-4 gap-3">
          {allCategories.map(cat => (
            <label
              key={cat}
              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                config.categories.includes(cat)
                  ? "border-[#4DD8CD] bg-[#4DD8CD]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={config.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 text-[#4DD8CD] rounded"
              />
              <span className="text-sm">{categoryLabels[cat]}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">提示：「智能养老」默认隐藏</p>
      </div>

      {/* 热门商品 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">热门商品坑位（3个）</h2>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map(index => {
            const productId = config.hotProducts[index]
            const product = adminMockData.products.find(p => p.id === productId)
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-2">坑位 {index + 1}</p>
                <select
                  value={productId || ""}
                  onChange={(e) => {
                    const newHot = [...config.hotProducts]
                    newHot[index] = e.target.value
                    setConfig({ ...config, hotProducts: newHot })
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                >
                  <option value="">选择商品</option>
                  {adminMockData.products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {product && (
                  <p className="text-xs text-gray-500 mt-2">¥{product.basePrice} · 已售{product.sold}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 并列坑位 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">并列商品坑位（2个）</h2>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map(index => {
            const productId = config.parallelProducts[index]
            const product = adminMockData.products.find(p => p.id === productId)
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-2">坑位 {index + 1}</p>
                <select
                  value={productId || ""}
                  onChange={(e) => {
                    const newParallel = [...config.parallelProducts]
                    newParallel[index] = e.target.value
                    setConfig({ ...config, parallelProducts: newParallel })
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                >
                  <option value="">选择商品</option>
                  {adminMockData.products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {product && (
                  <p className="text-xs text-gray-500 mt-2">¥{product.basePrice} · 已售{product.sold}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90">
          保存配置
        </button>
      </div>

      {/* 轮播图编辑弹窗 */}
      {showBannerEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">添加轮播图</h2>
              <button onClick={() => setShowBannerEditor(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">轮播图片</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">点击或拖拽上传</p>
                  <p className="text-xs text-gray-400 mt-1">推荐尺寸：750 x 300</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">链接商品</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50">
                  <option value="">选择商品</option>
                  {adminMockData.products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                <input
                  type="number"
                  placeholder="数字越小越靠前"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowBannerEditor(false)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowBannerEditor(false)}
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
