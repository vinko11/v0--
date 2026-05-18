"use client"

import { ChevronLeft, Star, Heart, Share2, Phone, Navigation, MapPin, Clock, Users, Bed, Coffee, Wifi, Car, Shield, ChevronRight, Image } from "lucide-react"
import { useState } from "react"

interface InstitutionDetailPageProps {
  onBack: () => void
  onOrder: (institution: any) => void
  institution?: {
    id: number
    name: string
    image: string
    rating?: number
    reviews?: number
    address?: string
  }
}

export default function InstitutionDetailPage({ onBack, onOrder, institution }: InstitutionDetailPageProps) {
  const [activeTab, setActiveTab] = useState("intro")

  const defaultInstitution = {
    id: 1,
    name: "阳光养老院",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 256,
    address: "南京市建邺区江东中路388号",
  }

  const currentInstitution = institution || defaultInstitution

  const images = [
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop",
  ]

  const facilities = [
    { icon: Bed, label: "床位 200张" },
    { icon: Users, label: "护工 50人" },
    { icon: Coffee, label: "餐厅 2个" },
    { icon: Wifi, label: "免费WiFi" },
    { icon: Car, label: "停车场" },
    { icon: Shield, label: "24h安保" },
  ]

  const services = [
    { name: "自理型养老", price: "¥3,000/月起", desc: "适合生活能自理的老人" },
    { name: "半护理型", price: "¥4,500/月起", desc: "需要部分生活协助的老人" },
    { name: "全护理型", price: "¥6,000/月起", desc: "需要全天候护理的老人" },
    { name: "特护型", price: "¥8,000/月起", desc: "需要专业医疗护理的老人" },
  ]

  const reviews = [
    {
      id: 1,
      user: "李**家属",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      rating: 5,
      date: "2024-01-15",
      content: "环境很好，护工态度也好，老人住得很满意。餐食也不错，营养搭配合理。",
    },
    {
      id: 2,
      user: "王**家属",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      date: "2024-01-10",
      content: "已经入住半年了，非常满意。工作人员很专业，对老人照顾得很周到。",
    },
  ]

  const tabs = [
    { id: "intro", label: "机构介绍" },
    { id: "service", label: "服务项目" },
    { id: "review", label: "评价" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-medium text-foreground">机构详情</span>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
              <Heart className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={images[0]}
            alt={currentInstitution.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Image className="w-3 h-3" />
          1/{images.length}
        </div>
      </div>

      {/* Institution Info */}
      <div className="bg-card mx-3 -mt-4 rounded-2xl p-4 shadow-sm relative z-10">
        <h1 className="text-lg font-bold text-foreground">{currentInstitution.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(currentInstitution.rating || 0) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{currentInstitution.rating}</span>
          <span className="text-sm text-muted-foreground">({currentInstitution.reviews}条评价)</span>
        </div>
        <div className="flex items-start gap-2 mt-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p>{currentInstitution.address}</p>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-primary text-primary text-sm">
            <Phone className="w-4 h-4" />
            电话咨询
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-primary text-primary text-sm">
            <Navigation className="w-4 h-4" />
            导航前往
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card mx-3 mt-3 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === "intro" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">机构简介</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  阳光养老院是一家集养老、护理、康复、娱乐为一体的综合性养老机构。
                  院内环境优美，设施齐全，配备专业医护团队，为老年人提供温馨、舒适、安全的养老服务。
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">设施设备</h3>
                <div className="grid grid-cols-3 gap-3">
                  {facilities.map((facility, index) => (
                    <div key={index} className="flex flex-col items-center gap-1 bg-muted/50 rounded-lg p-3">
                      <facility.icon className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">{facility.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "service" && (
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{service.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{service.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold text-sm">{service.price}</p>
                    <button className="text-xs text-primary mt-1">详情</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "review" && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-2">
                    <img src={review.avatar} alt={review.user} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{review.user}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex">
        <button className="flex-1 flex flex-col items-center justify-center gap-1 py-4 border-r border-border hover:bg-muted/50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <Phone className="w-5 h-5 text-green-500" />
          </div>
          <span className="text-xs text-muted-foreground">电话</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center gap-1 py-4 hover:bg-muted/50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">位置</span>
        </button>
      </div>
    </div>
  )
}
