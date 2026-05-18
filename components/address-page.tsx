"use client"

import { useState } from "react"
import { ChevronLeft, MapPin, Plus, Phone, Edit2, Trash2, Check } from "lucide-react"

interface AddressPageProps {
  onBack: () => void
}

const initialAddresses = [
  {
    id: 1,
    name: "张先生",
    phone: "138****8888",
    address: "江苏省南京市建邺区江东中路388号金融城1号楼",
    isDefault: true,
  },
  {
    id: 2,
    name: "张先生",
    phone: "138****8888",
    address: "江苏省南京市鼓楼区中央路201号",
    isDefault: false,
  },
]

export default function AddressPage({ onBack }: AddressPageProps) {
  const [addresses] = useState(initialAddresses)
  const [showForm, setShowForm] = useState(false)

  if (showForm) {
    return (
      <div className="min-h-screen bg-background pb-6">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white font-bold text-lg">新增地址</h1>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 py-4 space-y-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">联系人</label>
              <input
                type="text"
                placeholder="请输入联系人姓名"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">联系电话</label>
              <input
                type="tel"
                placeholder="请输入联系电话"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">所在地区</label>
              <input
                type="text"
                placeholder="请选择省/市/区"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">详细地址</label>
              <textarea
                placeholder="请输入详细地址，如小区、楼栋、门牌号等"
                rows={3}
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">设为默认地址</span>
              <button className="w-12 h-6 rounded-full bg-primary flex items-center px-0.5">
                <div className="w-5 h-5 rounded-full bg-white ml-auto" />
              </button>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity">
            保存地址
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">我的地址</h1>
        </div>
      </div>

      {/* Address List */}
      <div className="px-4 py-4 space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-foreground">{addr.name}</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {addr.phone}
                  </span>
                  {addr.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">默认</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{addr.address}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-4 mt-3 pt-3 border-t border-border">
              {!addr.isDefault && (
                <button className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Check className="w-3.5 h-3.5" />
                  设为默认
                </button>
              )}
              <button className="flex items-center gap-1 text-xs text-muted-foreground">
                <Edit2 className="w-3.5 h-3.5" />
                编辑
              </button>
              <button className="flex items-center gap-1 text-xs text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            新增地址
          </button>
        </div>
      </div>
    </div>
  )
}
