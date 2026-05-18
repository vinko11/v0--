"use client"

import { useState, useEffect } from "react"
import { MapPin, Bell, Search, Phone, Navigation, Star, ChevronRight, Home, Users, Stethoscope, Bath, UtensilsCrossed, Wrench, Sparkles, ShieldCheck, Activity, Settings, Heart, MoreHorizontal } from "lucide-react"
import CitySelectorModal, { cities } from "./city-selector-modal"

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=400&fit=crop",
    title: "专业护理服务",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop",
    title: "康复理疗特惠",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=400&fit=crop",
    title: "温馨养老机构",
  },
]

const services = [
  { icon: Home, label: "居家护工", color: "#4DD8CD", id: "home" },
  { icon: Users, label: "住院陪护", color: "#f59e0b", id: "hospital" },
  { icon: Stethoscope, label: "助医服务", color: "#ef4444", id: "medical" },
  { icon: Bath, label: "助浴服务", color: "#8b5cf6", id: "bath" },
  { icon: UtensilsCrossed, label: "助餐服务", color: "#ec4899", id: "meal" },
  { icon: Wrench, label: "器材租售", color: "#3b82f6", id: "equipment" },
  { icon: Sparkles, label: "保洁服务", color: "#10b981", id: "cleaning" },
  { icon: ShieldCheck, label: "安全检查", color: "#f97316", id: "safety" },
  { icon: Activity, label: "慢病监测", color: "#06b6d4", id: "health" },
  { icon: Settings, label: "适老改造", color: "#6366f1", id: "renovation" },
  { icon: Heart, label: "暖心服务", color: "#f43f5e", id: "warm" },
  { icon: MoreHorizontal, label: "更多", color: "#6b7280", id: "more" },
]

const featuredServices = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=400&fit=crop",
    name: "资深护工24小时陪护",
    price: "¥180/天",
    spec: "24小时全天候",
    rating: 4.9,
    sold: 328,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    name: "专业康复理疗服务",
    price: "¥120/次",
    spec: "单次服务",
    rating: 4.8,
    sold: 256,
  },
]

const recommendedWorkers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    name: "李护士",
    title: "执业护士",
    rating: 4.9,
    sold: 328,
    price: "¥200/天",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
    name: "王医生",
    title: "康复理疗师",
    rating: 4.8,
    sold: 256,
    price: "¥180/天",
  },
]

const institutions = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
    name: "阳光养老院",
    rating: 4.8,
    reviews: 256,
    address: "南京市建邺区江东中路388号",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
    name: "康乐护理中心",
    rating: 4.9,
    reviews: 312,
    address: "南京市鼓楼区中央路201号",
  },
]

interface HomePageProps {
  onProductClick?: (product: any) => void
  onWorkerClick?: (worker: any) => void
  onInstitutionClick?: (institution: any) => void
  onServiceClick?: (serviceId: string) => void
}

export default function HomePage({ onProductClick, onWorkerClick, onInstitutionClick, onServiceClick }: HomePageProps) {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [currentWorker, setCurrentWorker] = useState(0)
  const [selectedCity, setSelectedCity] = useState("nanjing")
  const [showCityModal, setShowCityModal] = useState(false)

  const currentCityName = cities.find((c) => c.id === selectedCity)?.name || "南京市"
  const priceMultiplier = cities.find((c) => c.id === selectedCity)?.priceMultiplier || 1

  const getAdjustedPrice = (basePrice: string): string => {
    const numMatch = basePrice.match(/\d+/)
    if (!numMatch) return basePrice
    const baseNum = parseInt(numMatch[0])
    const adjustedNum = Math.round(baseNum * priceMultiplier)
    return basePrice.replace(/\d+/, adjustedNum.toString())
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-8">
        <div className="flex items-center justify-between text-white">
          <button
            onClick={() => setShowCityModal(true)}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{currentCityName}</span>
          </button>
          <h1 className="text-lg font-bold">青蓝养老</h1>
          <Bell className="w-5 h-5" />
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <div className="bg-white/30 backdrop-blur-md rounded-full px-4 py-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-white/80" />
            <input
              type="text"
              placeholder="搜索服务、机构..."
              className="bg-transparent text-white placeholder:text-white/70 outline-none flex-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Banner Carousel */}
      <div className="px-4 -mt-3">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="w-full flex-shrink-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-36 object-cover"
                />
              </div>
            ))}
          </div>
          {/* Indicator Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner
                    ? "bg-white w-4"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Services Grid */}
      <div className="px-4 py-4 bg-card mx-3 mt-3 rounded-2xl shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => service.id !== "more" && onServiceClick?.(service.id)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-6 h-6" style={{ color: service.color }} />
              </div>
              <span className="text-xs text-foreground">{service.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Services */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">精选服务</h2>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onProductClick?.(service)}
              className="bg-card rounded-2xl overflow-hidden shadow-sm text-left"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full aspect-video object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-foreground line-clamp-1">{service.name}</h3>
                <p className="text-primary font-bold mt-1">{getAdjustedPrice(service.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hot Recommendations - Carousel */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">热门推荐</h2>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-3"
              style={{ transform: `translateX(-${currentWorker * 50}%)` }}
            >
              {recommendedWorkers.map((worker) => (
                <div key={worker.id} className="w-1/2 flex-shrink-0">
                  <button
                    onClick={() => onWorkerClick?.(worker)}
                    className="w-full bg-card rounded-2xl overflow-hidden shadow-sm text-left"
                  >
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-bold text-foreground text-sm mb-1">{worker.name}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded inline-block mb-2">
                        {worker.title}
                      </span>
                      <div className="flex items-center gap-2 text-xs mb-2">
                        <span className="flex items-center gap-0.5 font-medium">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          {worker.rating}
                        </span>
                        <span className="text-muted-foreground">已售 {worker.sold}</span>
                      </div>
                      <p className="text-primary font-bold text-sm">{getAdjustedPrice(worker.price)}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentWorker((prev) => (prev - 1 + recommendedWorkers.length) % recommendedWorkers.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
          </button>
          <button
            onClick={() => setCurrentWorker((prev) => (prev + 1) % recommendedWorkers.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>

          {/* Indicator Dots */}
          <div className="flex gap-1.5 justify-center mt-3">
            {Math.ceil(recommendedWorkers.length / 2) > 1 && recommendedWorkers.map((_, index) => {
              if (index % 2 === 0 && index / 2 < Math.ceil(recommendedWorkers.length / 2)) {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentWorker(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentWorker
                        ? "bg-primary w-4"
                        : "bg-border"
                    }`}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      </div>

      {/* Institutions */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">养老机构查询</h2>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {institutions.map((inst) => (
            <button
              key={inst.id}
              onClick={() => onInstitutionClick?.(inst)}
              className="w-full bg-card rounded-2xl p-3 flex gap-3 shadow-sm items-start text-left"
            >
              <img
                src={inst.image}
                alt={inst.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-sm mb-1">{inst.name}</h3>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(inst.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-foreground">{inst.rating}</span>
                  <span className="text-xs text-muted-foreground">({inst.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                  <p className="line-clamp-1">{inst.address}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* City Selector Modal */}
      <CitySelectorModal
        isOpen={showCityModal}
        selectedCity={selectedCity}
        onClose={() => setShowCityModal(false)}
        onSelectCity={setSelectedCity}
      />
    </div>
  )
}
