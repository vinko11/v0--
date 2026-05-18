"use client"

import { ChevronLeft, Phone, MessageCircle, Clock, ChevronRight } from "lucide-react"

interface CustomerServicePageProps {
  onBack: () => void
}

const faqs = [
  { question: "如何预约服务？", answer: "在首页选择所需服务，填写需求后提交即可。" },
  { question: "如何取消订单？", answer: "在订单详情页点击取消订单按钮即可。" },
  { question: "如何申请退款？", answer: "在订单详情页点击申请退款，填写原因后提交。" },
  { question: "服务人员资质如何保证？", answer: "所有服务人员均经过严格审核和培训。" },
]

export default function CustomerServicePage({ onBack }: CustomerServicePageProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">联系客服</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Contact Options */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">联系方式</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-green-500/10 rounded-xl">
              <Phone className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-foreground">电话客服</span>
              <span className="text-xs text-muted-foreground">400-888-8888</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-blue-500/10 rounded-xl">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-foreground">在线客服</span>
              <span className="text-xs text-muted-foreground">9:00-21:00</span>
            </button>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">服务时间</p>
              <p className="text-xs text-muted-foreground">周一至周日 09:00 - 21:00</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-bold text-foreground">常见问题</h3>
          </div>
          
          {faqs.map((faq, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                index !== faqs.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-foreground">{faq.question}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
