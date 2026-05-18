"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Clock, CheckCircle, Users, XCircle, AlertCircle } from "lucide-react"

interface DemandListPageProps {
  onBack?: () => void
  onDemandClick?: (demand: any) => void
  onNewDemand?: () => void
}

const statusConfig = {
  pending: { label: "待审核", color: "#f59e0b", icon: Clock, bgColor: "#fef3c7" },
  accepted: { label: "已接单", color: "#3b82f6", icon: Users, bgColor: "#dbeafe" },
  inProgress: { label: "服务中", color: "#8b5cf6", icon: AlertCircle, bgColor: "#ede9fe" },
  completed: { label: "已完成", color: "#10b981", icon: CheckCircle, bgColor: "#d1fae5" },
  rejected: { label: "已拒绝", color: "#ef4444", icon: XCircle, bgColor: "#fee2e2" },
}

const mockDemands = [
  {
    id: 1,
    category: "居家护工",
    serviceName: "老人日常护理",
    content: "需要一位有经验的护工照顾80岁老人，每天8小时...",
    status: "accepted",
    price: "¥200/天",
    createdAt: "2024-01-15",
    address: "南京市建邺区江东中路388号",
    acceptedBy: "李护士",
  },
  {
    id: 2,
    category: "助浴服务",
    serviceName: "上门助浴",
    content: "需要专业助浴服务，老人行动不便...",
    status: "pending",
    price: "¥150/次",
    createdAt: "2024-01-18",
    address: "南京市鼓楼区中央路201号",
  },
  {
    id: 3,
    category: "保洁服务",
    serviceName: "家庭深度保洁",
    content: "三室两厅深度清洁，包括厨房卫生间...",
    status: "completed",
    price: "¥300/次",
    createdAt: "2024-01-10",
    address: "南京市玄武区珠江路88号",
    acceptedBy: "张阿姨",
  },
  {
    id: 4,
    category: "助医服务",
    serviceName: "医院陪诊",
    content: "陪同老人去医院做检查，需要全程陪护...",
    status: "inProgress",
    price: "¥180/次",
    createdAt: "2024-01-20",
    address: "南京市秦淮区中山南路1号",
    acceptedBy: "王医生",
  },
  {
    id: 5,
    category: "器材租售",
    serviceName: "轮椅租赁",
    content: "需要租赁一台电动轮椅，预计使用3个月...",
    status: "rejected",
    price: "上门估价",
    createdAt: "2024-01-08",
    address: "南京市栖霞区仙林大道100号",
    rejectReason: "该区域暂无服务",
  },
]

const tabs = [
  { id: "all", label: "全部" },
  { id: "pending", label: "待审核" },
  { id: "accepted", label: "已接单" },
  { id: "inProgress", label: "服务中" },
  { id: "completed", label: "已完成" },
]

export default function DemandListPage({ onBack, onDemandClick, onNewDemand }: DemandListPageProps) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredDemands = activeTab === "all"
    ? mockDemands
    : mockDemands.filter((d) => d.status === activeTab)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack}>
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}
          <h1 className="text-white font-bold text-lg">我的需求</h1>
        </div>
        <button
          onClick={onNewDemand}
          className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full"
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm">发布需求</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 bg-card border-b border-border overflow-x-auto">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm whitespace-nowrap pb-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-primary font-medium"
                  : "text-muted-foreground border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demand List */}
      <div className="p-4 pb-24 space-y-3">
        {filteredDemands.length > 0 ? (
          filteredDemands.map((demand) => {
            const status = statusConfig[demand.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            return (
              <button
                key={demand.id}
                onClick={() => onDemandClick?.(demand)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {demand.category}
                    </span>
                    <span className="font-medium text-foreground">{demand.serviceName}</span>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                    style={{ backgroundColor: status.bgColor, color: status.color }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {demand.content}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{demand.createdAt}</span>
                  <span className="text-primary font-bold">{demand.price}</span>
                </div>
                {demand.acceptedBy && (
                  <div className="mt-2 pt-2 border-t border-border flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      服务人员：{demand.acceptedBy}
                    </span>
                  </div>
                )}
                {demand.rejectReason && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <span className="text-xs text-red-500">
                      拒绝原因：{demand.rejectReason}
                    </span>
                  </div>
                )}
              </button>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">暂无相关需求</p>
          </div>
        )}
      </div>
    </div>
  )
}
