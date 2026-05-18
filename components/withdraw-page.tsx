"use client"

import { useState } from "react"
import { ChevronLeft, AlertCircle, Check, Wallet } from "lucide-react"

interface WithdrawPageProps {
  onBack: () => void
}

export default function WithdrawPage({ onBack }: WithdrawPageProps) {
  const [amount, setAmount] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const balance = 862.50
  const serviceFeeRate = 0.06 // 6%服务费

  const handleAmountChange = (value: string) => {
    // 只允许数字和小数点
    const filtered = value.replace(/[^\d.]/g, "")
    // 限制小数点后两位
    const parts = filtered.split(".")
    if (parts.length > 2) return
    if (parts[1] && parts[1].length > 2) return
    setAmount(filtered)
  }

  const numAmount = parseFloat(amount) || 0
  const serviceFee = numAmount * serviceFeeRate
  const actualAmount = numAmount - serviceFee
  const canSubmit = numAmount >= 10 && numAmount <= balance

  const handleSubmit = () => {
    if (canSubmit) {
      setSubmitted(true)
    }
  }

  const handleWithdrawAll = () => {
    setAmount(balance.toFixed(2))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#71F2DC] to-[#4DD8CD] flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">提现申请已提交</h1>
        <p className="text-sm text-muted-foreground text-center mb-2">
          预计1-3个工作日到账
        </p>
        <div className="bg-card rounded-2xl p-4 w-full shadow-sm my-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">提现金额</span>
            <span className="text-sm text-foreground">¥{numAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">服务费（6%）</span>
            <span className="text-sm text-red-500">-¥{serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="font-medium text-foreground">实际到账</span>
            <span className="font-bold text-primary">¥{actualAmount.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={onBack}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium"
        >
          返回
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-4 pt-12 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">提现</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-white" />
            <span className="text-white/80 text-sm">可提现余额</span>
          </div>
          <p className="text-2xl font-bold text-white">¥{balance.toFixed(2)}</p>
        </div>

        {/* Amount Input */}
        <div className="bg-card rounded-2xl p-4">
          <label className="text-sm text-muted-foreground mb-2 block">提现金额</label>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">¥</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="flex-1 text-2xl font-bold text-foreground bg-transparent outline-none placeholder:text-muted-foreground/30"
            />
            <button
              onClick={handleWithdrawAll}
              className="text-primary text-sm"
            >
              全部提现
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">最低提现金额¥10.00</p>
        </div>

        {/* Fee Info */}
        {numAmount > 0 && (
          <div className="bg-card rounded-2xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">提现金额</span>
              <span className="text-sm text-foreground">¥{numAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">服务费（6%）</span>
              <span className="text-sm text-red-500">-¥{serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-medium text-foreground">实际到账</span>
              <span className="font-bold text-primary">¥{actualAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="bg-amber-50 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            <p className="font-medium mb-1">提现说明</p>
            <ul className="text-xs space-y-1">
              <li>• 平台收取6%服务费</li>
              <li>• 提现将在1-3个工作日内到账</li>
              <li>• 提现金额将转入您绑定的银行卡</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-3.5 rounded-full font-medium transition-opacity ${
            canSubmit
              ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {numAmount > balance ? "余额不足" : numAmount < 10 && numAmount > 0 ? "最低提现¥10" : "确认提现"}
        </button>
      </div>
    </div>
  )
}
