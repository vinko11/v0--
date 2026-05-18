"use client"

import { ChevronLeft, TrendingUp, Copy, Share2, Gift, Users, Award } from "lucide-react"

interface ReferralPageProps {
  onBack: () => void
}

const rewards = [
  { level: "1人", points: "100积分", color: "#f59e0b" },
  { level: "5人", points: "600积分", color: "#3b82f6" },
  { level: "10人", points: "1500积分", color: "#8b5cf6" },
  { level: "20人", points: "4000积分", color: "#ef4444" },
]

const records = [
  { name: "王**", phone: "138****6688", date: "2024-01-15", points: "+100" },
  { name: "李**", phone: "139****5566", date: "2024-01-12", points: "+100" },
  { name: "张**", phone: "136****3344", date: "2024-01-10", points: "+100" },
]

export default function ReferralPage({ onBack }: ReferralPageProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">推荐得积分</h1>
        </div>

        {/* Stats */}
        <div className="text-center text-white">
          <p className="text-white/80 text-sm mb-2">已获得积分</p>
          <p className="text-4xl font-bold">1,280</p>
        </div>
      </div>

      {/* Invite Code Card */}
      <div className="mx-4 -mt-10 bg-card rounded-2xl p-4 shadow-lg relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">我的邀请码</span>
          </div>
        </div>
        
        <div className="bg-muted rounded-xl p-4 text-center mb-4">
          <p className="text-2xl font-bold text-primary tracking-widest">QLYL8888</p>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary py-3 rounded-xl font-medium">
            <Copy className="w-4 h-4" />
            复制邀请码
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white py-3 rounded-xl font-medium">
            <Share2 className="w-4 h-4" />
            分享好友
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">如何获得积分</h3>
        
        <div className="flex justify-between">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Share2 className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-xs text-muted-foreground text-center">分享邀请码</span>
          </div>
          <div className="flex items-center text-muted-foreground">→</div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs text-muted-foreground text-center">好友注册</span>
          </div>
          <div className="flex items-center text-muted-foreground">→</div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-xs text-muted-foreground text-center">获得积分</span>
          </div>
        </div>
      </div>

      {/* Reward Tiers */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">奖励梯度</h3>
        
        <div className="grid grid-cols-4 gap-2">
          {rewards.map((reward, index) => (
            <div key={index} className="text-center">
              <div
                className="w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 mb-2"
                style={{ backgroundColor: `${reward.color}15` }}
              >
                <span className="text-xs font-medium" style={{ color: reward.color }}>邀请</span>
                <span className="text-lg font-bold" style={{ color: reward.color }}>{reward.level}</span>
              </div>
              <span className="text-xs text-muted-foreground">{reward.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Records */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">邀请记录</h3>
          <span className="text-xs text-muted-foreground">共邀请 3 人</span>
        </div>
        
        <div className="space-y-3">
          {records.map((record, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{record.name}</p>
                <p className="text-xs text-muted-foreground">{record.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-500">{record.points}</p>
                <p className="text-xs text-muted-foreground">{record.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
