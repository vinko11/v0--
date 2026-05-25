"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Star, Heart, Share2, ShoppingCart, Check, Phone, X, Download, QrCode } from "lucide-react"

interface ProductDetailPageProps {
  onBack: () => void
  onOrder: (product: any) => void
  onAddToCart?: (product: any) => void
  product?: {
    id: number
    name: string
    price: string
    image: string
    spec?: string
    rating?: number
    sold?: number
    category?: string
  }
}

// 从localStorage获取收藏列表
const getFavorites = (): number[] => {
  if (typeof window === "undefined") return []
  const saved = localStorage.getItem("favorites")
  return saved ? JSON.parse(saved) : []
}

// 保存收藏列表到localStorage
const saveFavorites = (favorites: number[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

export default function ProductDetailPage({ onBack, onOrder, onAddToCart, product }: ProductDetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showPosterModal, setShowPosterModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [cartCount, setCartCount] = useState(0)

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

  // 计算积分（价格 × 100）
  const getPoints = (priceStr: string): number => {
    const match = priceStr.match(/\d+/)
    return match ? parseInt(match[0]) * 100 : 0
  }

  const points = getPoints(currentProduct.price)

  // 积分活动文案（Mock后台配置）
  const pointsActivity = "限时活动：下单即送双倍积分，可用于下次抵扣"

  useEffect(() => {
    // 检查是否已收藏
    const favorites = getFavorites()
    setIsFavorite(favorites.includes(currentProduct.id))
    
    // 获取购物车数量
    const cart = localStorage.getItem("cart")
    if (cart) {
      const cartItems = JSON.parse(cart)
      setCartCount(cartItems.length)
    }
  }, [currentProduct.id])

  const handleToggleFavorite = () => {
    const favorites = getFavorites()
    let newFavorites: number[]
    
    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== currentProduct.id)
    } else {
      newFavorites = [...favorites, currentProduct.id]
    }
    
    saveFavorites(newFavorites)
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleAddToCart = () => {
    const cart = localStorage.getItem("cart")
    const cartItems = cart ? JSON.parse(cart) : []
    
    // 检查是否已在购物车
    const exists = cartItems.find((item: any) => item.id === currentProduct.id)
    if (!exists) {
      cartItems.push({ ...currentProduct, quantity: 1 })
      localStorage.setItem("cart", JSON.stringify(cartItems))
      setCartCount(cartItems.length)
    }
    
    onAddToCart?.(currentProduct)
    alert("已加入购物车")
  }

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
            <button 
              onClick={handleToggleFavorite}
              className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
            </button>
            <button 
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center"
            >
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

      {/* Product Info - 价格双行展示 */}
      <div className="bg-card mx-3 -mt-4 rounded-2xl p-4 shadow-sm relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{currentProduct.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{currentProduct.spec}</p>
          </div>
          <div className="text-right">
            {/* 价格双行展示 */}
            <p className="text-xl font-bold text-primary">{currentProduct.price}</p>
            <p className="text-xs text-orange-500 mt-0.5">{points.toLocaleString()} 积分可抵</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {currentProduct.rating}
              </span>
              <span>已售 {currentProduct.sold}</span>
            </div>
          </div>
        </div>
        
        {/* 积分活动文案区 */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
            <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded">积分</span>
            <span className="text-xs text-orange-600">{pointsActivity}</span>
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
        <button 
          onClick={() => setShowPhoneModal(true)}
          className="flex flex-col items-center gap-0.5"
        >
          <Phone className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">电话</span>
        </button>
        <button 
          onClick={handleToggleFavorite}
          className="flex flex-col items-center gap-0.5"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          <span className="text-xs text-muted-foreground">收藏</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 relative">
          <ShoppingCart className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">购物车</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <div className="flex-1 flex gap-2 ml-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 py-2.5 rounded-full border-2 border-primary text-primary font-medium text-sm"
          >
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

      {/* 电话弹窗 */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-sm overflow-hidden">
            <div className="p-4 text-center">
              <Phone className="w-12 h-12 mx-auto text-primary mb-3" />
              <h3 className="font-bold text-foreground mb-2">联系客服</h3>
              <p className="text-2xl font-bold text-primary mb-1">400-888-9999</p>
              <p className="text-xs text-muted-foreground">服务时间：周一至周日 8:00-22:00</p>
            </div>
            <div className="p-4 pt-0 flex gap-3">
              <button
                onClick={() => setShowPhoneModal(false)}
                className="flex-1 py-2.5 border border-border text-foreground rounded-full font-medium text-sm"
              >
                取消
              </button>
              <a
                href="tel:400-888-9999"
                className="flex-1 py-2.5 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white rounded-full font-medium text-sm text-center"
              >
                立即拨打
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 分享弹窗 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-card rounded-t-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">分享服务</h3>
                <button onClick={() => setShowShareModal(false)}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <button 
                  onClick={() => {
                    alert("分享到微信（模拟）")
                    setShowShareModal(false)
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">微</span>
                  </div>
                  <span className="text-xs text-muted-foreground">微信</span>
                </button>
                <button 
                  onClick={() => {
                    alert("分享到朋友圈（模拟）")
                    setShowShareModal(false)
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">圈</span>
                  </div>
                  <span className="text-xs text-muted-foreground">朋友圈</span>
                </button>
                <button 
                  onClick={() => {
                    setShowShareModal(false)
                    setShowPosterModal(true)
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">生成海报</span>
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href)
                    alert("链接已复制")
                    setShowShareModal(false)
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">链</span>
                  </div>
                  <span className="text-xs text-muted-foreground">复制链接</span>
                </button>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-3 bg-muted text-foreground rounded-full font-medium text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 海报生成弹窗 */}
      {showPosterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">服务海报</h3>
                <button onClick={() => setShowPosterModal(false)}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              {/* 海报预览 */}
              <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] rounded-xl p-4">
                <div className="bg-white rounded-lg overflow-hidden">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-bold text-foreground text-sm">{currentProduct.name}</h4>
                    <p className="text-primary font-bold mt-1">{currentProduct.price}</p>
                    <p className="text-xs text-orange-500">{points.toLocaleString()} 积分可抵</p>
                  </div>
                  <div className="p-3 pt-0 flex items-center justify-between border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">长按识别二维码</p>
                      <p className="text-xs text-muted-foreground">查看服务详情</p>
                    </div>
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="text-white text-xs">青蓝养老 · 专业养老服务平台</p>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button
                onClick={() => {
                  alert("海报已保存到相册（模拟）")
                  setShowPosterModal(false)
                }}
                className="w-full py-3 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white rounded-full font-medium text-sm"
              >
                保存海报
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
