"use client"

import { useState, useEffect } from "react"
import { MapPin, Search, ChevronRight, ChevronDown, Home, Users, Stethoscope, Bath, UtensilsCrossed, Wrench, Sparkles, ShieldCheck, Activity, Settings, Heart, Brain, Mail, Building2 } from "lucide-react"
import CitySelectorModal from "./city-selector-modal"

// 4个价值主张
const valueProps = [
  { icon: "🤝", label: "敬老向善" },
  { icon: "🏅", label: "专业赋能" },
  { icon: "🤝", label: "诚信共赢" },
  { icon: "✓", label: "责任担当" },
]

// 12个服务金刚区
const services = [
  { icon: Home, label: "居家护理", id: "home" },
  { icon: Users, label: "住院陪护", id: "hospital" },
  { icon: Stethoscope, label: "助医服务", id: "medical" },
  { icon: Bath, label: "助浴服务", id: "bath" },
  { icon: UtensilsCrossed, label: "助餐服务", id: "meal" },
  { icon: Wrench, label: "器材租售", id: "equipment" },
  { icon: Sparkles, label: "保洁服务", id: "cleaning" },
  { icon: ShieldCheck, label: "安全检查", id: "safety" },
  { icon: Activity, label: "慢病监测", id: "health" },
  { icon: Settings, label: "适老改造", id: "renovation" },
  { icon: Heart, label: "暖心服务", id: "warm" },
  { icon: Brain, label: "心理健康", id: "psychology" },
]

// 为您推荐服务
const recommendedServices = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    name: "3小时家庭保洁",
    desc: "日常清洁整理",
    price: 128,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    name: "陪诊就医（4h）",
    desc: "全程陪同安心就医",
    price: 180,
  },
]

interface HomePageProps {
  onProductClick?: (product: any) => void
  onWorkerClick?: (worker: any) => void
  onInstitutionClick?: (institution: any) => void
  onServiceClick?: (serviceId: string) => void
  onAnnouncementClick?: () => void
}

export default function HomePage({ onProductClick, onInstitutionClick, onServiceClick }: HomePageProps) {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [selectedCity, setSelectedCity] = useState("南京市")
  const [showCityModal, setShowCityModal] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f7f7] pb-20">
      {/* Header - 顶部导航 */}
      <div className="bg-white px-4 pt-3 pb-3">
        <div className="flex items-center justify-between">
          {/* 左侧定位 */}
          <button
            onClick={() => setShowCityModal(true)}
            className="flex items-center gap-1 text-gray-700"
          >
            <MapPin className="w-4 h-4 text-[#4DD8CD]" />
            <span className="text-sm">{selectedCity}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
          
          {/* 中间标题 */}
          <h1 className="text-lg font-bold text-[#4DD8CD]">青蓝养老</h1>
          
          {/* 右侧小程序图标 */}
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center ml-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar - 搜索框 */}
      <div className="bg-white px-4 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#f0f5f5] rounded-full px-4 py-2.5 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 text-sm">搜索服务、机构、文章...</span>
          </div>
          <button className="w-10 h-10 bg-[#e8f5f3] rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#4DD8CD]" />
          </button>
        </div>
      </div>

      {/* Value Propositions - 四个价值主张 */}
      <div className="bg-white px-4 pb-4">
        <div className="flex justify-between">
          {valueProps.map((prop, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#e8f5f3] flex items-center justify-center">
                <span className="text-xs">{prop.icon}</span>
              </div>
              <span className="text-sm text-[#4DD8CD] font-medium">{prop.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Carousel - 轮播图 */}
      <div className="px-4 mt-3">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#e8f8f5] to-[#d0f0eb]">
          <div className="p-6 pb-8 relative z-10">
            <h2 className="text-2xl font-bold text-[#2d5a53] leading-tight">
              温暖相伴
            </h2>
            <h2 className="text-2xl font-bold text-[#2d5a53] leading-tight">
              幸福晚年
            </h2>
            <p className="text-sm text-[#5a8a82] mt-2">专业养老服务·让爱更近</p>
            <button className="mt-4 bg-[#4DD8CD] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1">
              了解更多
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* 右侧插画区域 */}
          <div className="absolute right-0 bottom-0 w-1/2 h-full">
            <img 
              src="https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=400&h=400&fit=crop"
              alt="elderly"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* 指示点 */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentBanner
                    ? "bg-[#4DD8CD] w-4"
                    : "bg-white/60 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid - 12个服务金刚区 */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4">
          <div className="grid grid-cols-4 gap-y-5">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => onServiceClick?.(service.id)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                  <service.icon className="w-7 h-7 text-[#4DD8CD]" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-gray-700">{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Institution Query - 养老机构查询 */}
      <div className="px-4 mt-4">
        <button 
          onClick={() => onInstitutionClick?.({})}
          className="w-full bg-[#e8f5f3] rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-[#4DD8CD]" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-base font-bold text-gray-800">养老机构查询</h3>
            <p className="text-xs text-gray-500 mt-0.5">查找优质养老机构，了解服务与环境</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#4DD8CD]" />
        </button>
      </div>

      {/* Recommendations - 为您推荐 */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">为您推荐</h2>
          <button className="text-sm text-[#4DD8CD] flex items-center">
            更多服务
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {recommendedServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onProductClick?.(service)}
              className="bg-white rounded-2xl overflow-hidden text-left"
            >
              <div className="relative h-28">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-800">{service.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{service.desc}</p>
                <p className="mt-2">
                  <span className="text-[#4DD8CD] font-bold">¥{service.price}</span>
                  <span className="text-xs text-gray-400">/次</span>
                </p>
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
        onSelectCity={(city) => {
          setSelectedCity(city)
          setShowCityModal(false)
        }}
      />
    </div>
  )
}
