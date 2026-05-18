"use client"

import { ChevronLeft, Star, Search } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ServiceItem {
  id: number
  image: string
  name: string
  desc: string
  price: string
  unit: string
  rating: number
  sold: number
  tags?: string[]
}

interface ServiceListPageProps {
  title: string
  icon: LucideIcon
  color: string
  services: ServiceItem[]
  onBack: () => void
  onServiceClick: (service: ServiceItem) => void
}

export default function ServiceListPage({
  title,
  icon: Icon,
  color,
  services,
  onBack,
  onServiceClick,
}: ServiceListPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="px-4 pt-12 pb-6"
        style={{ background: `linear-gradient(to bottom, ${color}20, transparent)` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`搜索${title}...`}
            className="w-full bg-card text-foreground placeholder:text-muted-foreground rounded-lg px-4 py-2.5 pl-10 text-sm outline-none border border-border focus:border-primary transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Service List */}
      <div className="px-4 pb-6 space-y-3">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceClick(service)}
            className="w-full bg-card rounded-2xl p-3 flex gap-3 shadow-sm text-left"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-1">{service.name}</h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{service.desc}</p>
              {service.tags && service.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {service.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {service.rating}
                  </span>
                  <span className="text-muted-foreground">已售 {service.sold}</span>
                </div>
                <p className="text-sm">
                  <span className="text-primary font-bold">{service.price}</span>
                  <span className="text-xs text-muted-foreground">/{service.unit}</span>
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
