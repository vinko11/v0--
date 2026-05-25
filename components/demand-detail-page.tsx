"use client"

import { ChevronLeft, MapPin, Phone, User, Clock, CheckCircle, Users, XCircle, AlertCircle, Image, FileText } from "lucide-react"

interface DemandDetailPageProps {
  demand: any
  onBack?: () => void
}

const statusConfig = {
  pending: { label: "待审核", color: "#f59e0b", icon: Clock, bgColor: "#fef3c7", desc: "您的需求正在等待管理员审核" },
  accepted: { label: "已接单", color: "#3b82f6", icon: Users, bgColor: "#dbeafe", desc: "服务人员已接单，即将为您服务" },
  inProgress: { label: "服务中", color: "#8b5cf6", icon: AlertCircle, bgColor: "#ede9fe", desc: "服务人员正在为您提供服务" },
  completed: { label: "已完成", color: "#10b981", icon: CheckCircle, bgColor: "#d1fae5", desc: "服务已完成，感谢您的信任" },
  rejected: { label: "已拒绝", color: "#ef4444", icon: XCircle, bgColor: "#fee2e2", desc: "很抱歉，您的需求未能通过审核" },
}

export default function DemandDetailPage({ demand, onBack }: DemandDetailPageProps) {
  const status = statusConfig[demand.status as keyof typeof statusConfig]
  const StatusIcon = status.icon

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 py-4 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <h1 className="text-white font-bold text-lg">需求详情</h1>
      </div>

      {/* Status Card */}
      <div
        className="mx-4 -mt-2 rounded-2xl p-4 relative z-10"
        style={{ backgroundColor: status.bgColor }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: status.color + "20" }}
          >
            <StatusIcon className="w-6 h-6" style={{ color: status.color }} />
          </div>
          <div>
            <h2 className="font-bold text-lg" style={{ color: status.color }}>
              {status.label}
            </h2>
            <p className="text-sm text-muted-foreground">{status.desc}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Service Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            服务信息
          </h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <span className="text-sm text-muted-foreground">服务类别</span>
              <span className="text-sm text-foreground">{demand.category}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-sm text-muted-foreground">服务名称</span>
              <span className="text-sm text-foreground">{demand.serviceName}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-sm text-muted-foreground">发布时间</span>
              <span className="text-sm text-foreground">{demand.createdAt}</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-sm text-muted-foreground">价格</span>
              <span className="text-sm text-primary font-bold">{demand.price}</span>
            </div>
          </div>
        </div>

        {/* Service Content */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-foreground mb-3">服务内容</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {demand.content}
          </p>
        </div>

        {/* Related Materials */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Image className="w-4 h-4 text-primary" />
            相关资料
          </h3>
          <div className="flex gap-2">
            <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            服务地址
          </h3>
          <p className="text-sm text-muted-foreground">{demand.address}</p>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            联系方式
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">联系人</span>
              <span className="text-sm text-foreground">张先生</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">联系电话</span>
              <span className="text-sm text-foreground">138****8888</span>
            </div>
          </div>
        </div>

        {/* Service Provider - Only show if accepted */}
        {demand.acceptedBy && (
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              服务人员
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{demand.acceptedBy}</p>
                <p className="text-xs text-muted-foreground">专业护理人员 | 5年经验</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-500" />
              </button>
            </div>
          </div>
        )}

        {/* Reject Reason */}
        {demand.rejectReason && (
          <div className="bg-red-50 rounded-2xl p-4">
            <h3 className="font-medium text-red-600 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              拒绝原因
            </h3>
            <p className="text-sm text-red-500">{demand.rejectReason}</p>
          </div>
        )}

        {/* Payment Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-foreground mb-3">支付信息</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">付款方式</span>
              <span className="text-sm text-foreground">一口价</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">支付方式</span>
              <span className="text-sm text-foreground">微信支付</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">支付状态</span>
              <span className="text-sm text-primary">
                {demand.status === "completed" ? "已支付" : "待支付"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      {demand.status === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex gap-3">
          <button className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium">
            取消需求
          </button>
          <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium">
            修改需求
          </button>
        </div>
      )}

      {demand.status === "completed" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium">
            评价服务
          </button>
        </div>
      )}
    </div>
  )
}
