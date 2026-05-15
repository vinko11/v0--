"use client"

import { MapPin, Bell, Search, Phone, Navigation, Star, ChevronRight, Home, Users, Stethoscope, Bath, UtensilsCrossed, Wrench, Sparkles, ShieldCheck, Activity, Settings, Heart, MoreHorizontal } from "lucide-react"

const services = [
  { icon: Home, label: "居家护工", color: "#4DD8CD" },
  { icon: Users, label: "住院陪护", color: "#f59e0b" },
  { icon: Stethoscope, label: "助医服务", color: "#ef4444" },
  { icon: Bath, label: "助浴服务", color: "#8b5cf6" },
  { icon: UtensilsCrossed, label: "助餐服务", color: "#ec4899" },
  { icon: Wrench, label: "器材租售", color: "#3b82f6" },
  { icon: Sparkles, label: "保洁服务", color: "#10b981" },
  { icon: ShieldCheck, label: "安全检查", color: "#f97316" },
  { icon: Activity, label: "慢病监测", color: "#06b6d4" },
  { icon: Settings, label: "适老改造", color: "#6366f1" },
  { icon: Heart, label: "暖心服务", color: "#f43f5e" },
  { icon: MoreHorizontal, label: "更多", color: "#6b7280" },
]

const featuredServices = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=400&fit=crop",
    name: "资深护工24小时陪护",
    price: "¥180/天",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    name: "专业康复理疗服务",
    price: "¥120/次",
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
    address: "南京市建邺区江东中路388号",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
    name: "康乐护理中心",
    address: "南京市鼓楼区中央路201号",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">南京市</span>
          </div>
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

      {/* Quick Services Grid */}
      <div className="px-4 py-4 bg-card mx-3 -mt-2 rounded-2xl shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          {services.map((service, index) => (
            <button key={index} className="flex flex-col items-center gap-2">
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
            <div key={service.id} className="bg-card rounded-2xl overflow-hidden shadow-sm">
              <img
                src={service.image}
                alt={service.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-foreground line-clamp-1">{service.name}</h3>
                <p className="text-primary font-bold mt-1">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Recommendations */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">热门推荐</h2>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {recommendedWorkers.map((worker) => (
            <div key={worker.id} className="bg-card rounded-2xl p-3 flex gap-3 shadow-sm">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{worker.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {worker.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {worker.rating}
                  </span>
                  <span>已售 {worker.sold}</span>
                </div>
                <p className="text-primary font-bold mt-2">{worker.price}</p>
              </div>
            </div>
          ))}
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
            <div key={inst.id} className="bg-card rounded-2xl p-3 flex gap-3 shadow-sm">
              <img
                src={inst.image}
                alt={inst.name}
                className="w-24 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{inst.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{inst.address}</p>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <button className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-500" />
                </button>
                <button className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-blue-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
