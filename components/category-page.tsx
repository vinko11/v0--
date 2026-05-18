"use client"

import { useState } from "react"
import { Star, ChevronLeft, Search } from "lucide-react"

const categories = [
  { id: "home", label: "居家护工" },
  { id: "hospital", label: "住院陪护" },
  { id: "medical", label: "助医服务" },
  { id: "bath", label: "助浴服务" },
  { id: "meal", label: "助餐服务" },
  { id: "equipment", label: "器材租售" },
  { id: "cleaning", label: "保洁服务" },
  { id: "safety", label: "安全检查" },
]

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&h=300&fit=crop",
    name: "资深护工全天候陪护",
    spec: "24小时/天",
    rating: 99,
    price: 180,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
    name: "专业康复理疗服务",
    spec: "1次/2小时",
    rating: 98,
    price: 120,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    name: "居家健康护理套餐",
    spec: "1周/7天",
    rating: 97,
    price: 1200,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=300&h=300&fit=crop",
    name: "专业助浴上门服务",
    spec: "1次/1小时",
    rating: 99,
    price: 80,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=300&h=300&fit=crop",
    name: "营养餐配送服务",
    spec: "1天/3餐",
    rating: 96,
    price: 60,
  },
]

export default function CategoryPage() {
  const [activeCategory, setActiveCategory] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className="w-[22%] bg-card border-r border-border">
        <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-3 py-4 flex items-center gap-2">
          <ChevronLeft className="w-5 h-5 text-white" />
          <span className="text-white font-medium">分类</span>
        </div>
        <div className="py-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full py-3 px-3 text-sm text-left transition-colors ${
                activeCategory === cat.id
                  ? "bg-secondary text-primary font-medium border-l-2 border-primary"
                  : "text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 pb-20">
        <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 py-4">
          <h2 className="text-white font-medium mb-3">
            {categories.find((c) => c.id === activeCategory)?.label}
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="搜索产品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/20 backdrop-blur-sm text-white placeholder:text-white/50 rounded-full px-4 py-2.5 pl-10 text-sm outline-none border border-white/30 focus:border-white/60 transition-colors"
            />
          </div>
        </div>

        <div className="p-3 space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
            <div key={product.id} className="bg-card rounded-2xl overflow-hidden shadow-sm flex">
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-cover"
              />
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-foreground text-sm line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {product.spec}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      好评 {product.rating}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary font-bold">¥{product.price}</span>
                  <button className="bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white text-xs px-4 py-1.5 rounded-full font-medium">
                    预约
                  </button>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground text-sm">未找到相关产品</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
