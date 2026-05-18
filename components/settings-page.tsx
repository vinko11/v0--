"use client"

import { ChevronLeft, Settings as SettingsIcon, ChevronRight, Bell, Lock, Globe, Trash2, LogOut } from "lucide-react"

interface SettingsPageProps {
  onBack: () => void
}

const settingItems = [
  { icon: Bell, label: "消息通知", desc: "管理推送通知设置", color: "#f59e0b" },
  { icon: Lock, label: "账户安全", desc: "密码、手机号管理", color: "#3b82f6" },
  { icon: Globe, label: "语言设置", desc: "简体中文", color: "#10b981" },
  { icon: Trash2, label: "清除缓存", desc: "12.5 MB", color: "#6b7280" },
]

export default function SettingsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">设置</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Settings List */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {settingItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between px-4 py-4 ${
                index !== settingItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full bg-card rounded-2xl shadow-sm px-4 py-4 flex items-center justify-center gap-2 text-red-500">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">退出登录</span>
        </button>

        {/* Version */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">当前版本: V1.0.0</p>
        </div>
      </div>
    </div>
  )
}
