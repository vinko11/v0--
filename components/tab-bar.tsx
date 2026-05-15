"use client"

import { Home, Grid3X3, PlusCircle, User } from "lucide-react"

interface TabBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", icon: Home, label: "首页" },
  { id: "category", icon: Grid3X3, label: "分类" },
  { id: "post", icon: PlusCircle, label: "发布" },
  { id: "profile", icon: User, label: "我的" },
]

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 flex items-center justify-around z-50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const isPost = tab.id === "post"
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 ${
              isPost ? "-mt-4" : ""
            }`}
          >
            {isPost ? (
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] flex items-center justify-center shadow-lg">
                <tab.icon className="w-6 h-6 text-white" />
              </div>
            ) : (
              <tab.icon
                className={`w-6 h-6 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
            )}
            <span
              className={`text-xs ${
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
