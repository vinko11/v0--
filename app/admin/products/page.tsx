"use client"

import { useState } from "react"
import { Search, Plus, Edit, X, Upload, Trash2 } from "lucide-react"
import { adminMockData, productCategories, regions } from "@/lib/admin-mock-data"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showEditor, setShowEditor] = useState(false)
  const [editingProduct, setEditingProduct] = useState<typeof adminMockData.products[0] | null>(null)
  const [regionPrices, setRegionPrices] = useState([{ name: "", price: 0 }])

  const filteredProducts = adminMockData.products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false
    if (selectedStatus && product.status !== selectedStatus) return false
    return true
  })

  const handleEdit = (product: typeof adminMockData.products[0]) => {
    setEditingProduct(product)
    setRegionPrices(product.regions)
    setShowEditor(true)
  }

  const handleCreate = () => {
    setEditingProduct(null)
    setRegionPrices([{ name: "", price: 0 }])
    setShowEditor(true)
  }

  const addRegionPrice = () => {
    setRegionPrices([...regionPrices, { name: "", price: 0 }])
  }

  const removeRegionPrice = (index: number) => {
    setRegionPrices(regionPrices.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">服务商品</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          新建商品
        </button>
      </div>

      {/* 筛选 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4">
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
            <option value="上架">上架</option>
            <option value="下架">下架</option>
          </select>
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">商品名</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">类目</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">基准价</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">已售</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-gray-600">{product.category}</td>
                  <td className="py-3 px-4 text-gray-900">¥{product.basePrice}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      product.status === "上架" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.sold}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-[#4DD8CD] hover:underline"
                    >
                      <Edit className="w-4 h-4 inline" /> 编辑
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
          <div className="w-full max-w-2xl bg-white rounded-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{editingProduct ? "编辑商品" : "新建商品"}</h2>
              <button onClick={() => setShowEditor(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">商品标题</label>
                <input
                  type="text"
                  defaultValue={editingProduct?.name}
                  placeholder="请输入商品标题"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">类目</label>
                  <select
                    defaultValue={editingProduct?.category}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  >
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">基准价</label>
                  <input
                    type="number"
                    defaultValue={editingProduct?.basePrice}
                    placeholder="请输入基准价"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">主图</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">点击或拖拽上传图片</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
                <input
                  type="text"
                  placeholder="请输入副标题"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">详情/注意事项</label>
                <textarea
                  rows={4}
                  placeholder="请输入详情和注意事项"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50 resize-none"
                />
              </div>

              {/* 分区域价格 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">分区域价格</label>
                  <button
                    onClick={addRegionPrice}
                    className="text-sm text-[#4DD8CD] hover:underline"
                  >
                    + 添加区域
                  </button>
                </div>
                <div className="space-y-2">
                  {regionPrices.map((rp, index) => (
                    <div key={index} className="flex gap-2">
                      <select
                        value={rp.name}
                        onChange={(e) => {
                          const newPrices = [...regionPrices]
                          newPrices[index].name = e.target.value
                          setRegionPrices(newPrices)
                        }}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                      >
                        <option value="">选择区域</option>
                        {regions.map(r => (
                          <option key={r} value={r.replace("市", "")}>{r}</option>
                        ))}
                        <option value="全国">全国</option>
                      </select>
                      <input
                        type="number"
                        value={rp.price}
                        onChange={(e) => {
                          const newPrices = [...regionPrices]
                          newPrices[index].price = Number(e.target.value)
                          setRegionPrices(newPrices)
                        }}
                        placeholder="价格"
                        className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                      />
                      {regionPrices.length > 1 && (
                        <button
                          onClick={() => removeRegionPrice(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">积分活动文案（可选）</label>
                <input
                  type="text"
                  placeholder="如：购买可得100积分"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="status"
                  defaultChecked={editingProduct?.status === "上架"}
                  className="w-4 h-4 text-[#4DD8CD] rounded"
                />
                <label htmlFor="status" className="text-sm text-gray-700">上架</label>
              </div>

              <div className="flex gap-3 pt-4">
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
