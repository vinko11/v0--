"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, CreditCard, Wallet, Check, AlertCircle } from "lucide-react"

interface OrderPageProps {
  onBack: () => void
  onComplete: () => void
  orderItem?: {
    name: string
    price: string
    image: string
    type: "product" | "worker" | "institution"
  }
}

export default function OrderPage({ onBack, onComplete, orderItem }: OrderPageProps) {
  const [step, setStep] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState(0)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [orderComplete, setOrderComplete] = useState(false)

  const defaultItem = {
    name: "资深护工24小时陪护",
    price: "¥180/天",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=300&fit=crop",
    type: "product" as const,
  }

  const currentItem = orderItem || defaultItem

  const addresses = [
    { id: 1, name: "张先生", phone: "138****8888", address: "南京市建邺区江东中路388号阳光小区1栋502室", isDefault: true },
    { id: 2, name: "李女士", phone: "139****9999", address: "南京市鼓楼区中山北路201号幸福花园3栋1201室", isDefault: false },
  ]

  const dates = [
    { date: "今天", value: "2024-01-20" },
    { date: "明天", value: "2024-01-21" },
    { date: "后天", value: "2024-01-22" },
    { date: "01-23", value: "2024-01-23" },
    { date: "01-24", value: "2024-01-24" },
  ]

  const times = [
    "08:00-10:00",
    "10:00-12:00",
    "14:00-16:00",
    "16:00-18:00",
  ]

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setOrderComplete(true)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      onBack()
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#71F2DC] to-[#4DD8CD] flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">预约成功</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          您的订单已提交成功，服务人员将尽快与您联系确认服务详情
        </p>
        <div className="bg-card rounded-2xl p-4 w-full shadow-sm mb-6">
          <div className="flex gap-3">
            <img src={currentItem.image} alt={currentItem.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">{currentItem.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                服务时间：{selectedDate} {selectedTime}
              </p>
              <p className="text-primary font-bold text-sm mt-1">{currentItem.price}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onComplete}
            className="flex-1 py-3 rounded-full border border-border text-foreground font-medium text-sm"
          >
            返回首页
          </button>
          <button
            onClick={onComplete}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm"
          >
            查看订单
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border">
        <div className="flex items-center px-4 py-3">
          <button onClick={handlePrevStep} className="w-9 h-9 rounded-full flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="flex-1 text-center font-medium text-foreground">
            {step === 1 ? "选择地址" : step === 2 ? "选择时间" : "确认订单"}
          </span>
          <div className="w-9" />
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 pb-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  s <= step
                    ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="w-3 h-3" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-0.5 ${s < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Address Selection */}
      {step === 1 && (
        <div className="p-4 space-y-3">
          <h2 className="font-bold text-foreground mb-3">选择服务地址</h2>
          {addresses.map((addr, index) => (
            <button
              key={addr.id}
              onClick={() => setSelectedAddress(index)}
              className={`w-full text-left bg-card rounded-2xl p-4 shadow-sm border-2 transition-colors ${
                selectedAddress === index ? "border-primary" : "border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selectedAddress === index ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                >
                  {selectedAddress === index && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{addr.name}</span>
                    <span className="text-sm text-muted-foreground">{addr.phone}</span>
                    {addr.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">默认</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{addr.address}</p>
                </div>
              </div>
            </button>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-muted-foreground text-sm">
            + 添加新地址
          </button>
        </div>
      )}

      {/* Step 2: Time Selection */}
      {step === 2 && (
        <div className="p-4 space-y-4">
          <div>
            <h2 className="font-bold text-foreground mb-3">选择服务日期</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`flex-shrink-0 w-16 py-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedDate === d.value
                      ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                      : "bg-card text-foreground"
                  }`}
                >
                  {d.date}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-foreground mb-3">选择服务时间</h2>
            <div className="grid grid-cols-2 gap-3">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 rounded-xl text-sm font-medium transition-colors ${
                    selectedTime === t
                      ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                      : "bg-card text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700">
              预约成功后，服务人员将在服务开始前1小时与您联系确认
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Order Confirmation */}
      {step === 3 && (
        <div className="p-4 space-y-3">
          {/* Service Info */}
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-foreground mb-3">服务信息</h2>
            <div className="flex gap-3">
              <img src={currentItem.image} alt={currentItem.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{currentItem.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">规格：24小时全天候</p>
                <p className="text-primary font-bold mt-2">{currentItem.price}</p>
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-foreground">服务地址</h2>
              <button className="text-xs text-primary">修改</button>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground">
                  {addresses[selectedAddress].name} {addresses[selectedAddress].phone}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{addresses[selectedAddress].address}</p>
              </div>
            </div>
          </div>

          {/* Time Info */}
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-foreground">服务时间</h2>
              <button className="text-xs text-primary">修改</button>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{selectedDate}</span>
              <Clock className="w-4 h-4 text-primary ml-2" />
              <span className="text-sm text-foreground">{selectedTime}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-foreground mb-3">支付方式</h2>
            <div className="space-y-2">
              {[
                { id: "wechat", label: "微信支付", icon: Wallet, color: "#07C160" },
                { id: "alipay", label: "支付宝", icon: CreditCard, color: "#1677FF" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                    paymentMethod === method.id ? "border-primary" : "border-transparent bg-muted/50"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${method.color}15` }}
                  >
                    <method.icon className="w-5 h-5" style={{ color: method.color }} />
                  </div>
                  <span className="flex-1 text-left text-sm text-foreground">{method.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}
                  >
                    {paymentMethod === method.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">服务费用</span>
              <span className="text-sm text-foreground">¥180.00</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">优惠减免</span>
              <span className="text-sm text-red-500">-¥0.00</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="font-medium text-foreground">实付金额</span>
              <span className="text-lg font-bold text-primary">¥180.00</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          {step === 3 && (
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">合计</p>
              <p className="text-lg font-bold text-primary">¥180.00</p>
            </div>
          )}
          <button
            onClick={handleNextStep}
            disabled={step === 2 && (!selectedDate || !selectedTime)}
            className={`${step === 3 ? "flex-1" : "w-full"} py-3 rounded-full font-medium text-sm transition-opacity ${
              step === 2 && (!selectedDate || !selectedTime)
                ? "bg-muted text-muted-foreground"
                : "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
            }`}
          >
            {step === 3 ? "提交订单" : "下一步"}
          </button>
        </div>
      </div>
    </div>
  )
}
