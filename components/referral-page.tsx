"use client"

import { useState } from "react"
import { ChevronLeft, TrendingUp, Copy, Share2, Gift, Users, Award, Check, ChevronRight } from "lucide-react"

interface ReferralPageProps {
  onBack: () => void
}

const rewards = [
  { level: "1人", points: "100积分", color: "#f59e0b" },
  { level: "5人", points: "600积分", color: "#3b82f6" },
  { level: "10人", points: "1500积分", color: "#8b5cf6" },
  { level: "20人", points: "4000积分", color: "#ef4444" },
]

// 我的推荐列表（包含头像、ID、下级关系）
const referralList = [
  { 
    id: "U10001", 
    name: "张三", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", 
    date: "2024-01-15", 
    status: "completed", 
    points: 100, 
    level: 1,
    orders: 3,
    children: [
      { id: "U10004", name: "赵六", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", date: "2024-01-18", status: "completed", points: 50 },
    ]
  },
  { 
    id: "U10002", 
    name: "李四", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", 
    date: "2024-01-10", 
    status: "completed", 
    points: 100, 
    level: 1,
    orders: 5,
    children: []
  },
  { 
    id: "U10003", 
    name: "王五", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", 
    date: "2024-01-05", 
    status: "pending", 
    points: 0, 
    level: 1,
    orders: 0,
    children: []
  },
]

export default function ReferralPage({ onBack }: ReferralPageProps) {
  const [activeTab, setActiveTab] = useState<"rules" | "list">("rules")
  const [expandedUser, setExpandedUser] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("QLYL8888")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalReferrals = referralList.length
  const totalPoints = referralList.reduce((sum, r) => sum + r.points, 0) + 
    referralList.reduce((sum, r) => sum + r.children.reduce((s, c) => s + c.points, 0), 0)

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
        <div className="flex justify-center gap-12 text-white">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">已获得积分</p>
            <p className="text-3xl font-bold">{totalPoints}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">邀请人数</p>
            <p className="text-3xl font-bold">{totalReferrals}</p>
          </div>
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
          <button 
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary py-3 rounded-xl font-medium"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "已复制" : "复制邀请码"}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white py-3 rounded-xl font-medium">
            <Share2 className="w-4 h-4" />
            分享好友
          </button>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-1 shadow-sm flex">
        <button
          onClick={() => setActiveTab("rules")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "rules" 
              ? "bg-primary text-white" 
              : "text-muted-foreground"
          }`}
        >
          推荐规则
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "list" 
              ? "bg-primary text-white" 
              : "text-muted-foreground"
          }`}
        >
          我的推荐
        </button>
      </div>

      {activeTab === "rules" ? (
        <>
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

          {/* Rules Description */}
          <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-foreground mb-3">规则说明</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>邀请好友注册并完成首单，您可获得100积分</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>好友的好友（二级）下单，您可获得50积分</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>积分可在积分商城兑换商品或抵扣服务费用</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>同一用户只能被邀请一次，重复邀请无效</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        /* 我的推荐列表 */
        <div className="mx-4 mt-4 space-y-3">
          {referralList.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 shadow-sm text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">暂无推荐记录</p>
              <p className="text-sm text-muted-foreground mt-1">快去邀请好友吧！</p>
            </div>
          ) : (
            referralList.map((user) => (
              <div key={user.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                {/* 用户主信息 */}
                <button
                  onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                  className="w-full p-4 flex items-center gap-3 text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{user.name}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        ID: {user.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">
                        注册时间：{user.date}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        已下单：{user.orders}次
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${user.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
                      {user.status === "completed" ? `+${user.points}积分` : "待激活"}
                    </span>
                    {user.children.length > 0 && (
                      <ChevronRight className={`w-4 h-4 text-muted-foreground mt-1 mx-auto transition-transform ${
                        expandedUser === user.id ? "rotate-90" : ""
                      }`} />
                    )}
                  </div>
                </button>

                {/* 二级下线（展开显示） */}
                {expandedUser === user.id && user.children.length > 0 && (
                  <div className="border-t border-border bg-muted/30 px-4 py-3">
                    <p className="text-xs text-muted-foreground mb-2">二级下线（{user.children.length}人）</p>
                    {user.children.map((child) => (
                      <div key={child.id} className="flex items-center gap-3 py-2">
                        <div className="w-6 h-px bg-border" />
                        <img
                          src={child.avatar}
                          alt={child.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{child.name}</span>
                            <span className="text-xs text-muted-foreground">ID: {child.id}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{child.date}</span>
                        </div>
                        <span className={`text-xs font-bold ${child.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
                          {child.status === "completed" ? `+${child.points}积分` : "待激活"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}

          {/* 总计 */}
          <div className="bg-primary/5 rounded-2xl p-4 text-center">
            <p className="text-sm text-muted-foreground">
              共邀请 <span className="font-bold text-primary">{totalReferrals}</span> 人，
              获得 <span className="font-bold text-primary">{totalPoints}</span> 积分
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
