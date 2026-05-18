"use client"

import { ChevronLeft, Users, Upload, Camera } from "lucide-react"

interface StaffRegisterPageProps {
  onBack: () => void
}

export default function StaffRegisterPage({ onBack }: StaffRegisterPageProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">服务人员入驻</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-4 space-y-4">
        {/* Icon */}
        <div className="flex justify-center py-4">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
            <Users className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">个人信息</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">姓名</label>
              <input
                type="text"
                placeholder="请输入真实姓名"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">性别</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="male" className="w-4 h-4 accent-primary" />
                  <span className="text-sm">男</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="female" className="w-4 h-4 accent-primary" />
                  <span className="text-sm">女</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">身份证号</label>
              <input
                type="text"
                placeholder="请输入身份证号"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">联系电话</label>
              <input
                type="tel"
                placeholder="请输入联系电话"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">服务类型</label>
              <select className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors appearance-none">
                <option value="">请选择服务类型</option>
                <option value="nurse">执业护士</option>
                <option value="caregiver">护工</option>
                <option value="rehabilitation">康复理疗师</option>
                <option value="housekeeper">家政服务</option>
                <option value="companion">陪护员</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">工作经验</label>
              <select className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors appearance-none">
                <option value="">请选择工作经验</option>
                <option value="1">1年以下</option>
                <option value="1-3">1-3年</option>
                <option value="3-5">3-5年</option>
                <option value="5-10">5-10年</option>
                <option value="10+">10年以上</option>
              </select>
            </div>
          </div>
        </div>

        {/* ID Card Upload */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">身份证照片</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">身份证正面</span>
            </div>
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">身份证背面</span>
            </div>
          </div>
        </div>

        {/* Certificate Upload */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">资质证书</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {["健康证", "资格证", "其他"].map((label, i) => (
              <div key={i} className="aspect-square bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary transition-colors">
                <Camera className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity">
          提交入驻申请
        </button>

        <p className="text-xs text-muted-foreground text-center">
          提交后我们将在1-3个工作日内审核
        </p>
      </div>
    </div>
  )
}
