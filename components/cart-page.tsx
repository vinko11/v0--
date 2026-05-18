"use client"

import { useState } from "react"
import { ChevronLeft, Trash2, Minus, Plus, Check, ShoppingCart } from "lucide-react"

interface CartPageProps {
  onBack: () => void
  onCheckout?: (items: any[]) => void
  onProductClick?: (product: any) => void
}

// Mock购物车数据
const initialCartItems = [
  { 
    id: 1, 
    name: "资深护工24小时陪护", 
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop",
    spec: "24小时全天候",
    price: 180,
    quantity: 2,
    selected: true,
  },
  { 
    id: 2, 
    name: "专业康复理疗服务", 
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    spec: "单次服务",
    price: 120,
    quantity: 1,
    selected: true,
  },
  { 
    id: 3, 
    name: "3小时深度保洁", 
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
    spec: "深度清洁",
    price: 168,
    quantity: 1,
    selected: false,
  },
]

export default function CartPage({ onBack, onCheckout, onProductClick }: CartPageProps) {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [isEditing, setIsEditing] = useState(false)

  const selectedItems = cartItems.filter(item => item.selected)
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected)

  const toggleSelect = (id: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  const toggleSelectAll = () => {
    setCartItems(prev => prev.map(item => ({ ...item, selected: !allSelected })))
  }

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const removeSelected = () => {
    setCartItems(prev => prev.filter(item => !item.selected))
  }

  const handleCheckout = () => {
    if (selectedItems.length > 0 && onCheckout) {
      onCheckout(selectedItems)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card px-4 pt-12 pb-4 border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack}>
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">购物车</h1>
            <span className="text-sm text-muted-foreground">({cartItems.length})</span>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-primary"
          >
            {isEditing ? "完成" : "编辑"}
          </button>
        </div>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">购物车空空如也</p>
          <button 
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm"
          >
            去逛逛
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl p-3 shadow-sm">
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <button 
                  onClick={() => toggleSelect(item.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    item.selected 
                      ? "bg-primary border-primary" 
                      : "border-muted-foreground/30"
                  }`}
                >
                  {item.selected && <Check className="w-3 h-3 text-white" />}
                </button>

                {/* Image */}
                <button 
                  onClick={() => onProductClick?.(item)}
                  className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.spec}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-bold">¥{item.price}</span>
                    
                    {isEditing ? (
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-muted flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3 text-muted-foreground" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Discount Hint */}
          {selectedItems.length >= 2 && (
            <div className="bg-red-50 rounded-xl p-3 flex items-center gap-2">
              <span className="text-red-500 text-sm">满2件享9折优惠</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Select All */}
            <button 
              onClick={toggleSelectAll}
              className="flex items-center gap-2"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                allSelected 
                  ? "bg-primary border-primary" 
                  : "border-muted-foreground/30"
              }`}>
                {allSelected && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-foreground">全选</span>
            </button>

            {isEditing ? (
              <button 
                onClick={removeSelected}
                disabled={selectedItems.length === 0}
                className="ml-auto px-6 py-2.5 bg-red-500 text-white rounded-full text-sm font-medium disabled:opacity-50"
              >
                删除所选
              </button>
            ) : (
              <>
                <div className="flex-1 text-right">
                  <p className="text-xs text-muted-foreground">
                    已选 {selectedItems.length} 件
                    {selectedItems.length >= 2 && <span className="text-red-500 ml-1">（9折）</span>}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ¥{selectedItems.length >= 2 ? Math.round(totalPrice * 0.9) : totalPrice}
                  </p>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white rounded-full text-sm font-medium disabled:opacity-50"
                >
                  去结算
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
