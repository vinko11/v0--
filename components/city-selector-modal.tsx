"use client"

import { X } from "lucide-react"

export const cities = [
  { id: "nanjing", name: "南京市", priceMultiplier: 1 },
  { id: "shanghai", name: "上海市", priceMultiplier: 1.2 },
  { id: "beijing", name: "北京市", priceMultiplier: 1.3 },
  { id: "hangzhou", name: "杭州市", priceMultiplier: 1.1 },
  { id: "suzhou", name: "苏州市", priceMultiplier: 1.05 },
  { id: "wuxi", name: "无锡市", priceMultiplier: 1.0 },
]

interface CitySelectorModalProps {
  isOpen: boolean
  selectedCity: string
  onClose: () => void
  onSelectCity: (cityId: string) => void
}

export default function CitySelectorModal({
  isOpen,
  selectedCity,
  onClose,
  onSelectCity,
}: CitySelectorModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-card rounded-2xl w-80 max-w-[90vw] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">选择城市</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="py-2 max-h-96 overflow-y-auto">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                onSelectCity(city.id)
                onClose()
              }}
              className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between ${
                selectedCity === city.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span>{city.name}</span>
              {selectedCity === city.id && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
