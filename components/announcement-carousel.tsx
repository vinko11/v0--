'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, AlertCircle, Volume2 } from 'lucide-react'

interface Announcement {
  id: number
  title: string
  content: string
  type: 'notice' | 'promotion' | 'urgent'
  date: string
}

interface AnnouncementCarouselProps {
  onClick?: () => void
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: '春季养老服务优惠活动',
    content: '3月-5月，首次服务享9折优惠，立即预约不要错过...',
    type: 'promotion',
    date: '2024-03-01',
  },
  {
    id: 2,
    title: '平台维护公告',
    content: '本周日凌晨2:00-6:00进行系统维护，期间服务暂停...',
    type: 'notice',
    date: '2024-02-28',
  },
  {
    id: 3,
    title: '紧急通知',
    content: '新增心理健康咨询服务，专业心理咨询师在线为您服务...',
    type: 'urgent',
    date: '2024-02-27',
  },
]

export default function AnnouncementCarousel({ onClick }: AnnouncementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // 自动轮播
  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const currentAnnouncement = announcements[currentIndex]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return { bg: '#fee2e2', text: '#ef4444', icon: AlertCircle }
      case 'promotion':
        return { bg: '#fef3c7', text: '#f59e0b', icon: Volume2 }
      default:
        return { bg: '#dbeafe', text: '#3b82f6', icon: AlertCircle }
    }
  }

  const typeColor = getTypeColor(currentAnnouncement.type)
  const TypeIcon = typeColor.icon

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
      className="w-full bg-card rounded-2xl shadow-sm overflow-hidden px-4 py-3 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        {/* 类型标签 */}
        <div
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ backgroundColor: typeColor.bg }}
        >
          <TypeIcon className="w-4 h-4" style={{ color: typeColor.text }} />
        </div>

        {/* 公告内容 */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {currentAnnouncement.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {currentAnnouncement.content}
          </p>
        </div>

        {/* 查看更多箭头 */}
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>

      {/* 轮播指示器 */}
      <div className="flex items-center gap-1 mt-2 justify-center">
        {announcements.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex(index)
              setAutoPlay(false)
            }}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 bg-primary'
                : 'w-1.5 bg-muted'
            }`}
          />
        ))}
      </div>
    </button>
  )
}
