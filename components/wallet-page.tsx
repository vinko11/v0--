"use client"

import { useState } from "react"
import { ChevronLeft, Wallet, ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react"

interface WalletPageProps {
  onBack: () => void
  onWithdraw?: () => void
}

// Mock余额明细
const transactions = [
  { id: 1, type: "income", title: "订单收入", amount: 200, time: "2024-01-20 15:30", orderId: "QL202401200001" },
  { id: 2, type: "withdraw", title: "提现", amount: -188, time: "2024-01-18 10:20", status: "success" },
  { id: 3, type: "income", title: "订单收入", amount: 150, time: "2024-01-15 09:45", orderId: "QL202401150002" },
  { id: 4, type: "refund", title: "退款", amount: -120, time: "2024-01-10 14:00", orderId: "QL202401100003" },
  { id: 5, type: "income", title: "订单收入", amount: 300, time: "2024-01-08 11:30", orderId: "QL202401080004" },
  { id: 6, type: "withdraw", title: "提现", amount: -280, time: "2024-01-05 16:00", status: "success" },
]

export default function WalletPage({ onBack, onWithdraw }: WalletPageProps) {
  const [balance] = useState(862.50)
  const [frozenBalance] = useState(200.00)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-white">我的钱包</h1>
        </div>
        
        {/* Balance Card */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">可用余额（元）</p>
              <p className="text-3xl font-bold text-white mt-1">¥{balance.toFixed(2)}</p>
            </div>
            <Wallet className="w-10 h-10 text-white/80" />
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/20">
            <div>
              <p className="text-white/60 text-xs">冻结金额</p>
              <p className="text-white text-sm">¥{frozenBalance.toFixed(2)}</p>
            </div>
            <button 
              onClick={onWithdraw}
              className="px-6 py-2 bg-white text-primary rounded-full text-sm font-medium"
            >
              提现
            </button>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="p-4">
        <h2 className="font-bold text-foreground mb-3">收支明细</h2>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-card rounded-xl p-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.amount > 0 ? "bg-green-100" : "bg-red-100"
              }`}>
                {tx.amount > 0 ? (
                  <ArrowDownLeft className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{tx.title}</p>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toFixed(2)}
                </p>
                {tx.orderId && (
                  <p className="text-xs text-muted-foreground">{tx.orderId}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="px-4 pb-6">
        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-muted-foreground">
            说明：冻结金额为正在服务中的订单金额，服务完成后将自动解冻
          </p>
        </div>
      </div>
    </div>
  )
}
