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
  { id: "psychology", label: "心理健康" },
  { id: "more", label: "更多服务" },
]

const allProducts: Record<string, any[]> = {
  home: [
    { id: 1, image: "/images/service-1-caregiver-fullday.jpg", name: "资深护工全天候陪护", spec: "24小时/天", rating: 99, price: 180 },
    { id: 2, image: "/images/service-2-home-care.jpg", name: "专业居家护理服务", spec: "8小时/天", rating: 98, price: 120 },
    { id: 3, image: "/images/service-3-night-care.jpg", name: "夜间陪护服务", spec: "12小时/晚", rating: 97, price: 150 },
  ],
  hospital: [
    { id: 4, image: "/images/service-4-hospital-care.jpg", name: "住院全程陪护", spec: "24小时/天", rating: 99, price: 200 },
    { id: 5, image: "/images/service-5-surgery-care.jpg", name: "手术期间陪护", spec: "按需服务", rating: 98, price: 250 },
    { id: 6, image: "/images/service-6-icu-care.jpg", name: "ICU专业陪护", spec: "24小时/天", rating: 99, price: 300 },
  ],
  medical: [
    { id: 7, image: "/images/service-7-medical-companion.jpg", name: "陪同就医服务", spec: "半天/次", rating: 98, price: 100 },
    { id: 8, image: "/images/service-8-medicine-delivery.jpg", name: "代取药品服务", spec: "单次", rating: 97, price: 50 },
    { id: 9, image: "/images/service-9-health-checkup.jpg", name: "体检陪同服务", spec: "全天", rating: 99, price: 150 },
  ],
  bath: [
    { id: 10, image: "/images/service-10-bathing.jpg", name: "专业助浴上门服务", spec: "1次/1小时", rating: 99, price: 80 },
    { id: 11, image: "/images/service-11-bedside-bathing.jpg", name: "卧床老人助浴", spec: "1次/1.5小时", rating: 98, price: 120 },
    { id: 12, image: "/images/service-12-recovery-bathing.jpg", name: "康复期助浴护理", spec: "1次/2小时", rating: 97, price: 150 },
  ],
  meal: [
    { id: 13, image: "/images/service-13-nutrition-meal.jpg", name: "营养餐配送服务", spec: "1天/3餐", rating: 96, price: 60 },
    { id: 14, image: "/images/service-14-diabetes-meal.jpg", name: "糖尿病专属餐", spec: "1天/3餐", rating: 98, price: 80 },
    { id: 15, image: "/images/service-15-soft-food.jpg", name: "软食流质餐", spec: "1天/3餐", rating: 97, price: 70 },
  ],
  equipment: [
    { id: 16, image: "/images/service-16-wheelchair-rental.jpg", name: "电动轮椅租赁", spec: "1个月", rating: 99, price: 300 },
    { id: 17, image: "/images/service-17-nursing-bed.jpg", name: "护理床租赁", spec: "1个月", rating: 98, price: 500 },
    { id: 18, image: "/images/service-18-oxygen-machine.jpg", name: "制氧机租赁", spec: "1个月", rating: 97, price: 400 },
  ],
  cleaning: [
    { id: 19, image: "/images/service-19-daily-cleaning.jpg", name: "日常保洁服务", spec: "4小时/次", rating: 98, price: 100 },
    { id: 20, image: "/images/service-20-deep-cleaning.jpg", name: "深度清洁服务", spec: "8小时/次", rating: 99, price: 200 },
    { id: 21, image: "/images/service-21-cleaning-package.jpg", name: "定期保洁套餐", spec: "4次/月", rating: 97, price: 350 },
  ],
  safety: [
    { id: 22, image: "/images/service-22-safety-assessment.jpg", name: "居家安全评估", spec: "1次", rating: 99, price: 200 },
    { id: 23, image: "/images/service-23-fall-prevention.jpg", name: "防跌倒风险排查", spec: "1次", rating: 98, price: 150 },
    { id: 24, image: "/images/service-24-fire-safety.jpg", name: "消防安全检查", spec: "1次", rating: 97, price: 100 },
  ],
  health: [
    { id: 25, image: "/images/service-25-health-monitoring.jpg", name: "血压血糖监测", spec: "1个月", rating: 99, price: 300 },
    { id: 26, image: "/images/service-26-heart-monitoring.jpg", name: "心电远程监护", spec: "1个月", rating: 98, price: 500 },
    { id: 27, image: "/images/service-27-health-data.jpg", name: "健康数据管理", spec: "1个月", rating: 97, price: 200 },
  ],
  renovation: [
    { id: 28, image: "/images/service-28-bathroom-renovation.jpg", name: "卫生间适老改造", spec: "整体方案", rating: 99, price: 5000 },
    { id: 29, image: "/images/service-29-accessible-passage.jpg", name: "无障碍通道改造", spec: "整体方案", rating: 98, price: 3000 },
    { id: 30, image: "/images/service-30-smart-home.jpg", name: "智能家居安装", spec: "基础套餐", rating: 97, price: 2000 },
  ],
  warm: [
    { id: 31, image: "/images/service-31-companionship.jpg", name: "陪聊陪伴服务", spec: "2小时/次", rating: 99, price: 50 },
    { id: 32, image: "/images/service-32-shopping-errand.jpg", name: "代购跑腿服务", spec: "单次", rating: 98, price: 30 },
    { id: 33, image: "/images/service-33-holiday-visit.jpg", name: "节日探访服务", spec: "单次", rating: 97, price: 100 },
  ],
  psychology: [
    { id: 37, image: "/images/service-37-psychology-online.jpg", name: "心理疏导【线上】", spec: "1小时/次", rating: 99, price: 150 },
    { id: 38, image: "/images/service-38-emotion-consulting.jpg", name: "情绪管理咨询", spec: "1.5小时/次", rating: 98, price: 200 },
    { id: 39, image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=300&fit=crop", name: "睡眠障�����调理", spec: "整体方案", rating: 97, price: 500 },
    { id: 40, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop", name: "认知功能训练", spec: "10次/疗程", rating: 99, price: 800 },
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
        <div className="py-2 overflow-y-auto" style={{ maxHeight: "100vh" }}>
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
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {product.spec}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">好评 {product.rating}%</span>
                      </div>
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
