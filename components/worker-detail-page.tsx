"use client"

import { ChevronLeft, Star, Heart, Share2, Phone, MessageCircle, MapPin, Award, Clock, Shield, Calendar } from "lucide-react"

interface WorkerDetailPageProps {
  onBack: () => void
  onOrder: (worker: any) => void
  worker?: {
    id: number
    name: string
    title: string
    price: string
    image: string
    rating?: number
    sold?: number
  }
}

export default function WorkerDetailPage({ onBack, onOrder, worker }: WorkerDetailPageProps) {
  const defaultWorker = {
    id: 1,
    name: "李护士",
    title: "执业护士",
    price: "¥200/天",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    rating: 4.9,
    sold: 328,
  }

  const currentWorker = worker || defaultWorker

  const certificates = [
    { name: "护士执业资格证", icon: Award },
    { name: "健康护理师证", icon: Shield },
    { name: "养老护理员证", icon: Award },
  ]

  const services = [
    "日常生活照料",
    "健康状况监测",
    "康复护理辅助",
    "用药提醒管理",
    "心理情感陪伴",
    "紧急情况处理",
  ]

  const reviews = [
    {
      id: 1,
      user: "张**",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      rating: 5,
      date: "2024-01-15",
      content: "李护士非常专业细心，对老人照顾得很周到，家人都很满意！",
    },
    {
      id: 2,
      user: "王**",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      date: "2024-01-10",
      content: "服务态度好，有耐心，老人很喜欢她，会继续预约。",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-20">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="font-medium text-white">护工详情</span>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Worker Profile Card */}
      <div className="bg-card mx-3 -mt-14 rounded-2xl p-4 shadow-sm relative z-10">
        <div className="flex gap-4">
          <img
            src={currentWorker.image}
            alt={currentWorker.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground">{currentWorker.name}</h1>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{currentWorker.title}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {currentWorker.rating}
              </span>
              <span>服务 {currentWorker.sold} 次</span>
            </div>
            <p className="text-primary font-bold mt-2">{currentWorker.price}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">5年</p>
            <p className="text-xs text-muted-foreground">从业经验</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">98%</p>
            <p className="text-xs text-muted-foreground">好评率</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground">投诉记录</p>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-card mx-3 mt-3 rounded-2xl p-4 shadow-sm">
        <h2 className="font-bold text-foreground mb-3">资质证书</h2>
        <div className="space-y-2">
          {certificates.map((cert, index) => (
            <div key={index} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <cert.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{cert.name}</span>
              <span className="ml-auto text-xs text-primary">已认证</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="bg-card mx-3 mt-3 rounded-2xl p-4 shadow-sm">
        <h2 className="font-bold text-foreground mb-3">服务项目</h2>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <span key={index} className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground">
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-card mx-3 mt-3 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground">用户评价</h2>
          <span className="text-xs text-primary">查看全部</span>
        </div>
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
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center gap-3">
        <button className="flex flex-col items-center gap-0.5">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">电话</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 ml-2">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">咨询</span>
        </button>
        <button
          onClick={() => onOrder(currentWorker)}
          className="flex-1 ml-4 py-2.5 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm"
        >
          立即预约
        </button>
      </div>
    </div>
  )
}
