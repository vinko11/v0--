'use client'

import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'

interface Announcement {
  id: number
  text: string
}

interface AnnouncementCarouselProps {
  onClick?: () => void
}

const announcements: Announcement[] = [
  {
    id: 1,
    text: '🎉 春季养老服务优惠活动，首次服务享9折优惠！',
  },
  {
    id: 2,
    text: '📢 本周日凌晨2:00-6:00进行系统维护，期间服务暂停',
  },
  {
    id: 3,
    text: '🆕 新增心理健康咨询服务，专业心理咨询师在线服务',
  },
]

export default function AnnouncementCarousel({ onClick }: AnnouncementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 自动轮播，每5秒切换一条
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentAnnouncement = announcements[currentIndex]

  return (
    <button
      onClick={onClick}
      className="w-full h-8 bg-yellow-50 rounded-lg overflow-hidden flex items-center gap-2 px-3 hover:bg-yellow-100 transition-colors"
    >
      <Volume2 className="w-4 h-4 text-yellow-600 flex-shrink-0" />
      
      {/* 跑马灯效果 */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm text-yellow-700">
          {currentAnnouncement.text}
        </div>
      </div>
    </button>
  )
}
