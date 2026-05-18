"use client"

import { ChevronLeft, Star, Heart, Share2, ShoppingCart, Minus, Plus, Check } from "lucide-react"

interface ProductDetailPageProps {
  onBack: () => void
  onOrder: (product: any) => void
  product?: {
    id: number
    name: string
    price: string
    image: string
    spec?: string
    rating?: number
    sold?: number
  }
}

export default function ProductDetailPage({ onBack, onOrder, product }: ProductDetailPageProps) {
  const defaultProduct = {
    id: 1,
    name: "资深护工24小时陪护",
    price: "¥180/天",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=600&fit=crop",
    spec: "24小时全天候",
    rating: 4.9,
    sold: 328,
  }

  const currentProduct = product || defaultProduct

  const features = [
    "持证上岗，专业培训",
    "24小时全天候服务",
    "定期健康检查",
    "服务可追溯，保障权益",
  ]

  const serviceItems = [
    { title: "日常照料", desc: "协助穿衣、洗漱、如厕等" },
    { title: "饮食护理", desc: "合理搭配营养膳食" },
    { title: "健康监测", desc: "定时测量血压、血糖等" },
    { title: "康复辅助", desc: "协助康复训练、肢体活动" },
    { title: "心理陪伴", desc: "聊天解闷、情感关怀" },
    { title: "紧急处理", desc: "突发情况及时应对" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-medium text-foreground">服务详情</span>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
              <Heart className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-video w-full">
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="bg-card mx-3 -mt-4 rounded-2xl p-4 shadow-sm relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{currentProduct.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{currentProduct.spec}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">{currentProduct.price}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {currentProduct.rating}
              </span>
              <span>已售 {currentProduct.sold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-card mx-3 mt-3 rounded-2xl p-4 shadow-sm">
        <h2 className="font-bold text-foreground mb-3">服务保障</h2>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Content */}
      <div className="bg-card mx-3 mt-3 rounded-2xl p-4 shadow-sm">
        <h2 className="font-bold text-foreground mb-3">服务内容</h2>
        <div className="space-y-3">
          {serviceItems.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#71F2DC] to-[#4DD8CD] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Process */}
      <div className="bg-card mx-3 mt-3 rounded-2xl p-4 shadow-sm">
        <h2 className="font-bold text-foreground mb-3">服务流程</h2>
        <div className="flex items-center justify-between text-center">
          {["在线预约", "确认订单", "支付费用", "上门服务", "服务评价"].map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className="w-8 h-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                {index + 1}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{step}</p>
              {index < 4 && (
                <div className="absolute top-4 left-[60%] w-[80%] h-[1px] bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center gap-3">
        <button className="flex flex-col items-center gap-0.5">
          <Heart className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">收藏</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 ml-2">
          <ShoppingCart className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">购物车</span>
        </button>
        <div className="flex-1 flex gap-2 ml-4">
          <button className="flex-1 py-2.5 rounded-full border-2 border-primary text-primary font-medium text-sm">
            加入购物车
          </button>
          <button
            onClick={() => onOrder(currentProduct)}
            className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm"
          >
            立即预约
          </button>
        </div>
      </div>
    </div>
  )
}
