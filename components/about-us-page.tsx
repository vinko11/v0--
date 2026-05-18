"use client"

import { ChevronLeft, Shield, Award, Users, Heart } from "lucide-react"

interface AboutUsPageProps {
  onBack: () => void
}

const features = [
  { icon: Shield, label: "安全保障", desc: "实名认证，保险全覆盖", color: "#3b82f6" },
  { icon: Award, label: "专业服务", desc: "严格培训，持证上岗", color: "#10b981" },
  { icon: Users, label: "优质团队", desc: "1000+专业服务人员", color: "#f59e0b" },
  { icon: Heart, label: "贴心关怀", desc: "24小时客户服务", color: "#ef4444" },
]

export default function AboutUsPage({ onBack }: AboutUsPageProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">关于我们</h1>
        </div>

        {/* Logo & Name */}
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-primary">青蓝</span>
          </div>
          <h2 className="text-xl font-bold">青蓝养老</h2>
          <p className="text-white/80 text-sm mt-1">专业养老服务平台</p>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        {/* Features */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-foreground mb-3">公司简介</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            青蓝养老是一家专注于为老年人提供高品质养老服务的平台。我们致力于整合优质养老资源，为老年人及其家庭提供便捷、专业、贴心的养老服务解决方案。
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            平台汇聚了众多经验丰富的护理人员、康复理疗师和家政服务人员，所有服务人员均经过严格的资质审核和专业培训，确保为您提供安全、可靠的服务体验。
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-foreground mb-3">联系信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">客服热线</span>
              <span className="text-foreground">400-888-8888</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">服务邮箱</span>
              <span className="text-foreground">service@qinglan.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">公司地址</span>
              <span className="text-foreground text-right">南京市建邺区</span>
            </div>
          </div>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">版本号: V1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">Copyright 2024 青蓝养老</p>
        </div>
      </div>
    </div>
  )
}
