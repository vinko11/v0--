"use client"

import { useState, useEffect } from "react"
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
  { id: "health", label: "慢病监测" },
  { id: "renovation", label: "适老改造" },
  { id: "warm", label: "暖心服务" },
  { id: "more", label: "更多服务" },
]

const allProducts: Record<string, any[]> = {
  home: [
    { id: 1, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&h=300&fit=crop", name: "资深护工全天候陪护", spec: "24小时/天", rating: 99, price: 180 },
    { id: 2, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop", name: "专业居家护理服务", spec: "8小时/天", rating: 98, price: 120 },
    { id: 3, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop", name: "夜间陪护服务", spec: "12小时/晚", rating: 97, price: 150 },
  ],
  hospital: [
    { id: 4, image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=300&fit=crop", name: "住院全程陪护", spec: "24小时/天", rating: 99, price: 200 },
    { id: 5, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&h=300&fit=crop", name: "手术期间陪护", spec: "按需服务", rating: 98, price: 250 },
    { id: 6, image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=300&h=300&fit=crop", name: "ICU专业陪护", spec: "24小时/天", rating: 99, price: 300 },
  ],
  medical: [
    { id: 7, image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=300&h=300&fit=crop", name: "陪同就医服务", spec: "半天/次", rating: 98, price: 100 },
    { id: 8, image: "https://images.unsplash.com/photo-1631815589654-fda5e7d30ba8?w=300&h=300&fit=crop", name: "代取药品服务", spec: "单次", rating: 97, price: 50 },
    { id: 9, image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=300&h=300&fit=crop", name: "体检陪同服务", spec: "全天", rating: 99, price: 150 },
  ],
  bath: [
    { id: 10, image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=300&h=300&fit=crop", name: "专业助浴上门服务", spec: "1次/1小时", rating: 99, price: 80 },
    { id: 11, image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=300&h=300&fit=crop", name: "卧床老人助浴", spec: "1次/1.5小时", rating: 98, price: 120 },
    { id: 12, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop", name: "康复期助浴护理", spec: "1次/2小时", rating: 97, price: 150 },
  ],
  meal: [
    { id: 13, image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=300&h=300&fit=crop", name: "营养餐配送服务", spec: "1天/3餐", rating: 96, price: 60 },
    { id: 14, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop", name: "糖尿病专属餐", spec: "1天/3餐", rating: 98, price: 80 },
    { id: 15, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop", name: "软食流质餐", spec: "1天/3餐", rating: 97, price: 70 },
  ],
  equipment: [
    { id: 16, image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=300&fit=crop", name: "电动轮椅租赁", spec: "1个月", rating: 99, price: 300 },
    { id: 17, image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=300&h=300&fit=crop", name: "护理床租赁", spec: "1个月", rating: 98, price: 500 },
    { id: 18, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop", name: "制氧机租赁", spec: "1个月", rating: 97, price: 400 },
  ],
  cleaning: [
    { id: 19, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=300&fit=crop", name: "日常保洁服务", spec: "4小时/次", rating: 98, price: 100 },
    { id: 20, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop", name: "深度清洁服务", spec: "8小时/次", rating: 99, price: 200 },
    { id: 21, image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&h=300&fit=crop", name: "定期保洁套餐", spec: "4次/月", rating: 97, price: 350 },
  ],
  safety: [
    { id: 22, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", name: "居家安全评估", spec: "1次", rating: 99, price: 200 },
    { id: 23, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop", name: "防跌倒风险排查", spec: "1次", rating: 98, price: 150 },
    { id: 24, image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop", name: "消防安全检查", spec: "1次", rating: 97, price: 100 },
  ],
  health: [
    { id: 25, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop", name: "血压血糖监测", spec: "1个月", rating: 99, price: 300 },
    { id: 26, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=300&fit=crop", name: "心电远程监护", spec: "1个月", rating: 98, price: 500 },
    { id: 27, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&h=300&fit=crop", name: "健康数据管理", spec: "1个月", rating: 97, price: 200 },
  ],
  renovation: [
    { id: 28, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", name: "卫生间适老改造", spec: "整体方案", rating: 99, price: 5000 },
    { id: 29, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop", name: "无障碍通道改造", spec: "整体方案", rating: 98, price: 3000 },
    { id: 30, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=300&fit=crop", name: "智能家居安装", spec: "基础套餐", rating: 97, price: 2000 },
  ],
  warm: [
    { id: 31, image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&h=300&fit=crop", name: "陪聊陪伴服务", spec: "2小时/次", rating: 99, price: 50 },
    { id: 32, image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=300&fit=crop", name: "代购跑腿服务", spec: "单次", rating: 98, price: 30 },
    { id: 33, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop", name: "节日探访服务", spec: "单次", rating: 97, price: 100 },
  ],
  more: [
    { id: 34, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop", name: "定制化护理方案", spec: "按需定制", rating: 99, price: 0 },
    { id: 35, image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&h=300&fit=crop", name: "企业团购服务", spec: "批量订购", rating: 98, price: 0 },
    { id: 36, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop", name: "长期护理套餐", spec: "年度服务", rating: 97, price: 0 },
  ],
}

interface CategoryPageProps {
  onProductClick?: (product: any) => void
  onBack?: () => void
  initialCategory?: string
}

export default function CategoryPage({ onProductClick, onBack, initialCategory }: CategoryPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "home")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
    }
  }, [initialCategory])

  const currentProducts = allProducts[activeCategory] || []
  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className="w-[22%] bg-card border-r border-border">
        <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-3 py-4 flex items-center gap-2">
          {onBack && (
            <button onClick={onBack}>
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}
          <span className="text-white font-medium">分类</span>
        </div>
        <div className="py-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 60px)" }}>
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
        {/* Header with Title */}
        <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 py-4">
          <h2 className="text-white font-medium">
            {categories.find((c) => c.id === activeCategory)?.label}
          </h2>
        </div>

        {/* Search Box */}
        <div className="px-3 py-3 bg-background sticky top-0 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索产品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card text-foreground placeholder:text-muted-foreground rounded-lg px-4 py-2.5 pl-10 text-sm outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
            />
          </div>
        </div>

        <div className="p-3 pt-0 space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => onProductClick?.({
                  id: product.id,
                  name: product.name,
                  price: product.price === 0 ? "面议" : `¥${product.price}`,
                  image: product.image,
                  spec: product.spec,
                  rating: product.rating / 20,
                  sold: Math.floor(Math.random() * 300) + 100,
                })}
                className="w-full bg-card rounded-2xl overflow-hidden shadow-sm flex text-left"
              >
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
                    <span className="text-primary font-bold">
                      {product.price === 0 ? "面议" : `¥${product.price}`}
                    </span>
                    <span className="bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white text-xs px-4 py-1.5 rounded-full font-medium">
                      预约
                    </span>
                  </div>
                </div>
              </button>
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
