"use client"

import { useState } from "react"
import { ChevronLeft, Bell, AlertTriangle, Info, Megaphone, X } from "lucide-react"

interface Announcement {
  id: number
  title: string
  content: string
  type: "urgent" | "normal" | "promotion"
  createdAt: string
  isRead: boolean
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "春节假期服务调整通知",
    content: "尊敬的用户，春节期间（2月9日-2月17日）部分服务可能会有延迟，请提前预约。祝您新春快乐！",
    type: "urgent",
    createdAt: "2024-02-01",
    isRead: false,
  },
  {
    id: 2,
    title: "新增心理健康服务上线",
    content: "青蓝养老现已推出专业心理健康服务，包括线上心理疏导、情绪管理等，欢迎体验。",
    type: "normal",
    createdAt: "2024-01-28",
    isRead: true,
  },
  {
    id: 3,
    title: "积分兑换活动开启",
    content: "即日起至2月底，积分可享双倍兑换服务时长，数量有限，先到先得！",
    type: "promotion",
    createdAt: "2024-01-25",
    isRead: true,
  },
  {
    id: 4,
    title: "平台服务协议更新",
    content: "为了更好地保障您的权益，我们更新了服务协议条款，请查阅最新版本。",
    type: "normal",
    createdAt: "2024-01-20",
    isRead: true,
  },
]

const typeConfig = {
  urgent: { label: "紧急", color: "#ef4444", bgColor: "#fee2e2", icon: AlertTriangle },
  normal: { label: "通知", color: "#3b82f6", bgColor: "#dbeafe", icon: Info },
  promotion: { label: "活动", color: "#10b981", bgColor: "#d1fae5", icon: Megaphone },
}

interface AnnouncementListPageProps {
  onBack: () => void
}

export default function AnnouncementListPage({ onBack }: AnnouncementListPageProps) {
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  const handleRead = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    )
  }

  const unreadCount = announcements.filter((a) => !a.isRead).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold text-lg flex-1">消息通知</h1>
          {unreadCount > 0 && (
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}条未读
            </span>
          )}
        </div>
      </div>

      {/* Announcement List */}
      <div className="p-4 space-y-3">
        {announcements.map((announcement) => {
          const config = typeConfig[announcement.type]
          const TypeIcon = config.icon
          return (
            <button
              key={announcement.id}
              onClick={() => {
                handleRead(announcement.id)
                setSelectedAnnouncement(announcement)
              }}
              className="w-full bg-card rounded-2xl p-4 shadow-sm text-left relative"
            >
              {!announcement.isRead && (
                <span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full" />
              )}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: config.bgColor }}
                >
                  <TypeIcon className="w-5 h-5" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: config.bgColor, color: config.color }}
                    >
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{announcement.createdAt}</span>
                  </div>
                  <h3 className={`font-medium text-sm ${!announcement.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                    {announcement.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {announcement.content}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-sm overflow-hidden">
            <div
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: typeConfig[selectedAnnouncement.type].bgColor }}
            >
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = typeConfig[selectedAnnouncement.type].icon
                  return <Icon className="w-5 h-5" style={{ color: typeConfig[selectedAnnouncement.type].color }} />
                })()}
                <span
                  className="font-medium text-sm"
                  style={{ color: typeConfig[selectedAnnouncement.type].color }}
                >
                  {typeConfig[selectedAnnouncement.type].label}
                </span>
              </div>
              <button onClick={() => setSelectedAnnouncement(null)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-foreground mb-2">{selectedAnnouncement.title}</h2>
              <p className="text-xs text-muted-foreground mb-3">{selectedAnnouncement.createdAt}</p>
              <p className="text-sm text-foreground leading-relaxed">{selectedAnnouncement.content}</p>
            </div>
            <div className="p-4 pt-0">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="w-full py-2.5 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white rounded-full font-medium text-sm"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 紧急公告弹窗组件（首页使用）
export function UrgentAnnouncementModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const urgentAnnouncement = mockAnnouncements.find((a) => a.type === "urgent" && !a.isRead)

  if (!isOpen || !urgentAnnouncement) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-white" />
          <span className="font-semibold text-white">紧急通知</span>
        </div>
        <div className="p-4">
          <h2 className="font-bold text-foreground mb-2">{urgentAnnouncement.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {urgentAnnouncement.content}
          </p>
        </div>
        <div className="p-4 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-border text-foreground rounded-full font-medium text-sm"
          >
            稍后查看
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white rounded-full font-medium text-sm"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  )
}

// 导出未读数量检查函数
export function hasUnreadAnnouncements(): boolean {
  return mockAnnouncements.some((a) => !a.isRead)
}

export function hasUrgentAnnouncement(): boolean {
  return mockAnnouncements.some((a) => a.type === "urgent" && !a.isRead)
}
