"use client"

import { ChevronLeft, FileText, ChevronRight } from "lucide-react"

interface ServiceAgreementPageProps {
  onBack: () => void
}

const agreements = [
  { title: "用户服务协议", date: "2024-01-01 更新" },
  { title: "隐私政策", date: "2024-01-01 更新" },
  { title: "服务条款", date: "2023-12-15 更新" },
  { title: "退款政策", date: "2023-12-10 更新" },
  { title: "投诉处理规则", date: "2023-11-20 更新" },
]

export default function ServiceAgreementPage({ onBack }: ServiceAgreementPageProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">服务协议</h1>
        </div>
      </div>

      {/* Agreement List */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {agreements.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between px-4 py-4 ${
                index !== agreements.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
