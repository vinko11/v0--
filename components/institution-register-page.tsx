"use client"

import { ChevronLeft, Building2, Upload, Camera } from "lucide-react"

interface InstitutionRegisterPageProps {
  onBack: () => void
}

export default function InstitutionRegisterPage({ onBack }: InstitutionRegisterPageProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">机构入驻</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-4 space-y-4">
        {/* Icon */}
        <div className="flex justify-center py-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">基本信息</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">机构名称</label>
              <input
                type="text"
                placeholder="请输入机构名称"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">机构类型</label>
              <select className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors appearance-none">
                <option value="">请选择机构类型</option>
                <option value="nursing">养老院</option>
                <option value="daycare">日间照料中心</option>
                <option value="community">社区服务中心</option>
                <option value="rehabilitation">康复中心</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">联系人</label>
              <input
                type="text"
                placeholder="请输入联系人姓名"
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
              <label className="text-sm text-muted-foreground mb-1.5 block">机构地址</label>
              <input
                type="text"
                placeholder="请输入机构地址"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* License Upload */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">资质证明</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">营业执照</span>
            </div>
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
              <Camera className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">许可证</span>
            </div>
          </div>
        </div>

        {/* Institution Photos */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">机构照片</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary transition-colors">
                <Camera className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">照片{i}</span>
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
