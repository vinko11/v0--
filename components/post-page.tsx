"use client"

import { useState } from "react"
import { ChevronLeft, Camera, ChevronRight } from "lucide-react"

const serviceTypes = [
  "居家护工",
  "住院陪护",
  "助医服务",
  "助浴服务",
  "助餐服务",
  "其他",
]

export default function PostPage() {
  const [selectedType, setSelectedType] = useState("居家护工")
  const [paymentMethod, setPaymentMethod] = useState("online")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 py-4 flex items-center gap-3">
        <ChevronLeft className="w-5 h-5 text-white" />
        <h1 className="text-white font-bold text-lg">发布需求</h1>
      </div>

      <div className="p-3 pb-24 space-y-3">
        {/* Service Type */}
        <div className="bg-card rounded-2xl p-3">
          <h3 className="text-sm font-medium text-foreground mb-2">服务类别</h3>
          <div className="flex flex-wrap gap-2">
            {serviceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  selectedType === type
                    ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Requirement Details */}
        <div className="bg-card rounded-2xl p-3">
          <h3 className="text-sm font-medium text-foreground mb-2">需求详情</h3>
          <textarea
            placeholder="请详细描述您的服务需求，如服务对象情况、特殊要求等..."
            className="w-full h-[120px] bg-muted rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
          />
        </div>

        {/* Attachments */}
        <div className="bg-card rounded-2xl p-3">
          <h3 className="text-sm font-medium text-foreground mb-2">附件上传</h3>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border"
              >
                <Camera className="w-6 h-6 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-2xl p-3">
          <h3 className="text-sm font-medium text-foreground mb-2">付款方式</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-foreground">在线支付</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "offline"}
                onChange={() => setPaymentMethod("offline")}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-foreground">线下支付</span>
            </label>
          </div>
        </div>

        {/* Service Time */}
        <div className="bg-card rounded-2xl p-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">服务时间</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">请选择</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl p-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">联系人</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">请填写</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Address */}
        <div className="bg-card rounded-2xl p-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">服务地址</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-sm">请选择</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background">
        <button className="w-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-bold py-3 rounded-xl shadow-lg">
          提交需求
        </button>
      </div>
    </div>
  )
}
