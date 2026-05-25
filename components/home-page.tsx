"use client"

import { useState, useEffect } from "react"
import { MapPin, ChevronRight, ChevronDown, Search } from "lucide-react"
import CitySelectorModal from "./city-selector-modal"
import Image from "next/image"

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
            <svg className="w-5 h-5 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Value Propositions - 四个价值主张 */}
      <div className="bg-white px-4 pb-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-1.5">
            <svg className="w-6 h-6 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              <path d="M7 12h10M12 7v10"/>
            </svg>
            <span className="text-sm text-[#4DD8CD] font-medium">敬老向善</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-6 h-6 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="5"/>
              <path d="M3 21v-2a7 7 0 0114 0v2"/>
              <path d="M16 11l2 2 4-4"/>
            </svg>
            <span className="text-sm text-[#4DD8CD] font-medium">专业赋能</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-6 h-6 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 11V7a5 5 0 0110 0v4"/>
              <path d="M17 11V7a5 5 0 00-10 0v4"/>
              <path d="M12 17l-3-3 3 3 3-3-3 3z"/>
            </svg>
            <span className="text-sm text-[#4DD8CD] font-medium">诚信共赢</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-6 h-6 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span className="text-sm text-[#4DD8CD] font-medium">责任担当</span>
          </div>
        </div>
      </div>

      {/* Banner Carousel - 轮播图 */}
      <div className="px-4 mt-3">
        <div className="relative rounded-2xl overflow-hidden h-48">
          <Image 
            src="/images/banner-elderly-couple.jpg"
            alt="温暖相伴 幸福晚年"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e8f8f5]/90 via-[#e8f8f5]/70 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#2d5a53] leading-tight">
              温暖相伴
            </h2>
            <h2 className="text-2xl font-bold text-[#2d5a53] leading-tight">
              幸福晚年
            </h2>
            <p className="text-sm text-[#5a8a82] mt-2">专业养老服务·让爱更近</p>
            <button className="mt-4 bg-[#4DD8CD] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1 w-fit">
              了解更多
              <ChevronRight className="w-4 h-4" />
            </button>
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
            {/* 居家护理 */}
            <button onClick={() => onServiceClick?.("home")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">居家护理</span>
            </button>
            
            {/* 住院陪护 */}
            <button onClick={() => onServiceClick?.("hospital")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">住院陪护</span>
            </button>
            
            {/* 助医服务 */}
            <button onClick={() => onServiceClick?.("medical")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/>
                  <path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4"/>
                  <circle cx="20" cy="10" r="2"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">助医服务</span>
            </button>
            
            {/* 助浴服务 */}
            <button onClick={() => onServiceClick?.("bath")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/>
                  <path d="M6 12V5a2 2 0 012-2h3v2.25"/>
                  <path d="M4 21l1-1.5M20 21l-1-1.5"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">助浴服务</span>
            </button>
            
            {/* 助餐服务 */}
            <button onClick={() => onServiceClick?.("meal")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">助餐服务</span>
            </button>
            
            {/* 器材租售 */}
            <button onClick={() => onServiceClick?.("equipment")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">器材租售</span>
            </button>
            
            {/* 保洁服务 */}
            <button onClick={() => onServiceClick?.("cleaning")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l1.5 7.5L22 12l-7.5 1.5L13 21l-1.5-7.5L4 12l7.5-1.5L13 3z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">保洁服务</span>
            </button>
            
            {/* 安全检查 */}
            <button onClick={() => onServiceClick?.("safety")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">安全检查</span>
            </button>
            
            {/* 慢病监测 */}
            <button onClick={() => onServiceClick?.("health")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">慢病监测</span>
            </button>
            
            {/* 适老改造 */}
            <button onClick={() => onServiceClick?.("renovation")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">适老改造</span>
            </button>
            
            {/* 暖心服务 */}
            <button onClick={() => onServiceClick?.("warm")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">暖心服务</span>
            </button>
            
            {/* 心理健康 */}
            <button onClick={() => onServiceClick?.("psychology")} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl border border-[#e0e8e8] flex items-center justify-center bg-white">
                <svg className="w-8 h-8 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z"/>
                  <path d="M6 10a6 6 0 0012 0"/>
                  <path d="M12 12v4M8 22l4-6 4 6"/>
                  <circle cx="12" cy="5" r="1"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">心理健康</span>
            </button>
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
            <svg className="w-6 h-6 text-[#4DD8CD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="2" width="16" height="20" rx="2"/>
              <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/>
            </svg>
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
          {/* 家庭保洁 */}
          <button
            onClick={() => onProductClick?.({ id: 1 })}
            className="bg-white rounded-2xl overflow-hidden text-left"
          >
            <div className="relative h-28">
              <Image
                src="/images/service-cleaning.jpg"
                alt="3小时家庭保洁"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold text-gray-800">3小时家庭保洁</h3>
              <p className="text-xs text-gray-500 mt-0.5">日常清洁整理</p>
              <p className="mt-2">
                <span className="text-[#4DD8CD] font-bold">¥128</span>
                <span className="text-xs text-gray-400">/次</span>
              </p>
            </div>
          </button>
          
          {/* 陪诊就医 */}
          <button
            onClick={() => onProductClick?.({ id: 2 })}
            className="bg-white rounded-2xl overflow-hidden text-left"
          >
            <div className="relative h-28">
              <Image
                src="/images/service-medical.jpg"
                alt="陪诊就医"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold text-gray-800">陪诊就医（4h）</h3>
              <p className="text-xs text-gray-500 mt-0.5">全程陪同安心就医</p>
              <p className="mt-2">
                <span className="text-[#4DD8CD] font-bold">¥180</span>
                <span className="text-xs text-gray-400">/次</span>
              </p>
            </div>
          </button>
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
