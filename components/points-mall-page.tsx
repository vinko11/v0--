"use client"

import { useState } from "react"
import { ChevronLeft, Star, ShoppingBag } from "lucide-react"

interface PointsMallPageProps {
  onBack: () => void
  onOrderList?: () => void
  onRules?: () => void
}

// Mock积分商品
const pointsProducts = [
  { id: 1, name: "护理眼罩", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=200&fit=crop", cash: 9.9, points: 500, stock: 100 },
  { id: 2, name: "养生茶礼盒", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200&h=200&fit=crop", cash: 19.9, points: 1000, stock: 50 },
  { id: 3, name: "血压计", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=200&fit=crop", cash: 49.9, points: 2000, stock: 30 },
  { id: 4, name: "按摩枕", image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=200&h=200&fit=crop", cash: 29.9, points: 1500, stock: 0 },
  { id: 5, name: "护膝套装", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&h=200&fit=crop", cash: 0, points: 3000, stock: 20 },
  { id: 6, name: "保温杯", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop", cash: 0, points: 800, stock: 80 },
]

export default function PointsMallPage({ onBack, onOrderList, onRules }: PointsMallPageProps) {
  const [userPoints] = useState(5680)

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white">积分商城</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onOrderList} className="text-white text-sm">
              兑换记录
            </button>
            <button onClick={onRules} className="text-white text-sm">
              规则
            </button>
          </div>
        </div>
        
        {/* Points Card */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">我的积分</p>
              <p className="text-3xl font-bold text-white mt-1">{userPoints.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <h2 className="font-bold text-foreground mb-3">热门兑换</h2>
        <div className="grid grid-cols-2 gap-3">
          {pointsProducts.map((product) => (
            <div key={product.id} className="bg-card rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full aspect-square object-cover ${product.stock === 0 ? "opacity-50" : ""}`}
                />
                {product.stock === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="text-white font-bold">已售罄</span>
                  </div>
                )}
                {product.stock > 0 && product.stock <= 30 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                    仅剩{product.stock}件
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-foreground line-clamp-1">{product.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  {product.cash > 0 ? (
                    <>
                      <span className="text-primary font-bold">¥{product.cash}</span>
                      <span className="text-xs text-muted-foreground">+</span>
                    </>
                  ) : null}
                  <span className="text-primary font-bold text-sm">{product.points}积分</span>
                </div>
                <button 
                  disabled={product.stock === 0 || userPoints < product.points}
                  className={`w-full mt-2 py-1.5 rounded-full text-xs font-medium ${
                    product.stock === 0 || userPoints < product.points
                      ? "bg-muted text-muted-foreground"
                      : "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                  }`}
                >
                  {product.stock === 0 ? "已售罄" : userPoints < product.points ? "积分不足" : "立即兑换"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
