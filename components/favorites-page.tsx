"use client"

import { useState } from "react"
import { ChevronLeft, Heart, Trash2, Star } from "lucide-react"

interface FavoritesPageProps {
  onBack: () => void
  onProductClick?: (product: any) => void
}

// Mock收藏数据
const initialFavorites = [
  { 
    id: 1, 
    name: "资深护工24小时陪护", 
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop",
    price: "¥180/天",
    rating: 4.9,
    sold: 328,
    category: "居家护工",
  },
  { 
    id: 2, 
    name: "专业康复理疗服务", 
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    price: "¥120/次",
    rating: 4.8,
    sold: 256,
    category: "助医服务",
  },
  { 
    id: 3, 
    name: "3小时深度保洁", 
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
    price: "¥168/次",
    rating: 4.9,
    sold: 456,
    category: "保洁服务",
  },
  { 
    id: 4, 
    name: "心理疏导【线上】", 
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    price: "¥150/次",
    rating: 4.8,
    sold: 189,
    category: "心理健康",
  },
]

export default function FavoritesPage({ onBack, onProductClick }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [isEditing, setIsEditing] = useState(false)

  const removeItem = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-4 pt-12 pb-4 border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack}>
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">我的收藏</h1>
            <span className="text-sm text-muted-foreground">({favorites.length})</span>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-primary"
          >
            {isEditing ? "完成" : "编辑"}
          </button>
        </div>
      </div>

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">暂无收藏</p>
          <button 
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm"
          >
            去逛逛
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {favorites.map((item) => (
            <button
              key={item.id}
              onClick={() => !isEditing && onProductClick?.(item)}
              className="w-full bg-card rounded-2xl p-3 shadow-sm flex gap-3 text-left"
            >
              {/* Image */}
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-foreground text-sm line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">已售{item.sold}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{item.price}</span>
                  {isEditing && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(item.id)
                      }}
                      className="text-red-500 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
