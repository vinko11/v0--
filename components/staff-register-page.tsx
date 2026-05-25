"use client"

import { useState } from "react"
import { ChevronLeft, Upload, Camera, MapPin, Phone, Check, X, User, FileText, Shield, Clock, CheckCircle } from "lucide-react"

interface StaffRegisterPageProps {
  onBack: () => void
}

const serviceCategories = [
  { id: "home", label: "居家护工" },
  { id: "hospital", label: "住院陪护" },
  { id: "medical", label: "助医服务" },
  { id: "bath", label: "助浴服务" },
  { id: "meal", label: "助餐服务" },
  { id: "equipment", label: "器材租售" },
  { id: "cleaning", label: "保洁服务" },
  { id: "safety", label: "安全检查" },
  { id: "health", label: "慢病监测" },
  { id: "renovation", label: "适老改造" },
  { id: "warm", label: "暖心服务" },
]

const provinces = ["江苏省", "上海市", "浙江省", "安徽省", "北京市"]
const cities: Record<string, string[]> = {
  "江苏省": ["南京市", "苏州市", "无锡市", "常州市", "南通市"],
  "上海市": ["上海市"],
  "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市"],
  "安徽省": ["合肥市", "芜湖市", "马鞍山市"],
  "北京市": ["北京市"],
}
const districts: Record<string, string[]> = {
  "南京市": ["玄武区", "秦淮区", "建邺区", "鼓楼区", "浦口区", "栖霞区", "雨花台区", "江宁区"],
  "苏州市": ["姑苏区", "虎丘区", "吴中区", "相城区", "吴江区"],
  "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "浦东新区"],
  "杭州市": ["上城区", "下城区", "江干区", "拱墅区", "西湖区", "滨江区"],
  "北京市": ["东城区", "西城区", "朝阳区", "丰台区", "海淀区", "石景山区"],
}

export default function StaffRegisterPage({ onBack }: StaffRegisterPageProps) {
  const [formData, setFormData] = useState({
    realName: "",
    idCardFront: null as string | null,
    idCardBack: null as string | null,
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    introduction: "",
    selectedServices: [] as string[],
    agreeTerms: false,
    photo: null as string | null,
    province: "",
    city: "",
    district: "",
    certificates: [] as string[],
    insurance: null as string | null,
  })

  const [isSubmitted, setIsSubmitted] = useState(false) // 提交审核状态

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }))
  }

  const handleGetPhone = () => {
    setFormData((prev) => ({ ...prev, phone: "138****8888" }))
  }

  const handleImageUpload = (field: string) => {
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=200&h=200&fit=crop`
    if (field === "certificates") {
      setFormData((prev) => ({
        ...prev,
        certificates: [...prev.certificates, mockUrl],
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: mockUrl }))
    }
  }

  const removeCertificate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }))
  }

  const availableCities = formData.province ? cities[formData.province] || [] : []
  const availableDistricts = formData.city ? districts[formData.city] || [] : []

  const isFormValid =
    formData.realName &&
    formData.idCardFront &&
    formData.idCardBack &&
    formData.phone &&
    formData.emergencyContact &&
    formData.emergencyPhone &&
    formData.selectedServices.length > 0 &&
    formData.agreeTerms &&
    formData.photo &&
    formData.district

  const handleSubmit = () => {
    if (isFormValid) {
      setIsSubmitted(true)
    }
  }

  // 审核中页面
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
          <Clock className="w-12 h-12 text-yellow-500" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">提交成功，审核中</h1>
        <p className="text-sm text-muted-foreground text-center mb-2">
          您的入驻申请已提交，工作人员将在1-3个工作日内完成审核
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          审核结果将通过短信通知，请保持手机畅通
        </p>
        
        <div className="w-full bg-card rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="font-medium text-foreground mb-3">申请信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">姓名</span>
              <span className="text-foreground">{formData.realName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">联系电话</span>
              <span className="text-foreground">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">服务类别</span>
              <span className="text-foreground">{formData.selectedServices.length}项</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">服务区域</span>
              <span className="text-foreground">{formData.city} {formData.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">审核状态</span>
              <span className="text-yellow-500 font-medium">审核中</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-full border border-border text-foreground font-medium text-sm"
          >
            返回首页
          </button>
          <button
            onClick={() => setIsSubmitted(false)}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm"
          >
            修改申请
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 py-4 flex items-center gap-3">
        <button onClick={onBack}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-medium text-lg">服务人员入驻</h1>
      </div>

      <div className="px-4 py-4 pb-24 space-y-4">
        {/* 基本信息 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            基本信息
          </h2>

          {/* 真实姓名 */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1 block">
              真实姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="请输入您的真实姓名"
              value={formData.realName}
              onChange={(e) => setFormData((prev) => ({ ...prev, realName: e.target.value }))}
              className="w-full px-3 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* 身份证上传 */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              身份证 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => handleImageUpload("idCardFront")}
                className="aspect-[3/2] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
              >
                {formData.idCardFront ? (
                  <img src={formData.idCardFront} alt="身份证正面" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">人像面</span>
                  </>
                )}
              </div>
              <div
                onClick={() => handleImageUpload("idCardBack")}
                className="aspect-[3/2] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
              >
                {formData.idCardBack ? (
                  <img src={formData.idCardBack} alt="身份证背面" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">国徽面</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 手机号码 */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1 block">
              手机号码 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="点击右侧按钮授权获取"
                value={formData.phone}
                readOnly
                className="flex-1 px-3 py-2.5 bg-muted rounded-lg text-sm outline-none"
              />
              <button
                onClick={handleGetPhone}
                className="px-4 py-2.5 bg-green-500 text-white rounded-lg text-sm font-medium flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                微信授权
              </button>
            </div>
          </div>

          {/* 紧急联系人 */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1 block">
              紧急联系人及电话 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="联系人姓名"
                value={formData.emergencyContact}
                onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                className="px-3 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="联系人电话"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                className="px-3 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* 自我介绍 */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">自我介绍</label>
            <textarea
              placeholder="请简单介绍您的工作经历、技能特长等..."
              value={formData.introduction}
              onChange={(e) => setFormData((prev) => ({ ...prev, introduction: e.target.value }))}
              className="w-full px-3 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary resize-none h-24"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right mt-1">{formData.introduction.length}/500</p>
          </div>
        </div>

        {/* 服务行业选择 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            选择服务行业（多选）<span className="text-red-500">*</span>
          </h2>
          <p className="text-xs text-muted-foreground mb-3">请选择您可以提供的服务类型</p>
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceToggle(service.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  formData.selectedServices.includes(service.id)
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {formData.selectedServices.includes(service.id) && <Check className="w-3 h-3 inline mr-1" />}
                {service.label}
              </button>
            ))}
          </div>
        </div>

        {/* 照片上传 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary" />
            个人照片（必传）<span className="text-red-500">*</span>
          </h2>
          <p className="text-xs text-muted-foreground mb-3">请上传清晰的个人正面照片，将展示给用户</p>
          <div
            onClick={() => handleImageUpload("photo")}
            className="w-28 h-28 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
          >
            {formData.photo ? (
              <img src={formData.photo} alt="个人照片" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera className="w-8 h-8 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">上传照片</span>
              </>
            )}
          </div>
        </div>

        {/* 服务位置 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            服务位置（区县）<span className="text-red-500">*</span>
          </h2>
          <p className="text-xs text-muted-foreground mb-3">请选择您可以提供服务的区域</p>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={formData.province}
              onChange={(e) => setFormData((prev) => ({ ...prev, province: e.target.value, city: "", district: "" }))}
              className="px-3 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">选择省份</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value, district: "" }))}
              disabled={!formData.province}
              className="px-3 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">选择城市</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={formData.district}
              onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
              disabled={!formData.city}
              className="px-3 py-2.5 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">选择区县</option>
              {availableDistricts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 资质证书 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            资质证书
          </h2>
          <p className="text-xs text-muted-foreground mb-3">如有相关资质证书请上传（可选）</p>
          <div className="flex flex-wrap gap-3">
            {formData.certificates.map((cert, index) => (
              <div key={index} className="relative w-20 h-20">
                <img src={cert} alt={`证书${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                <button
                  onClick={() => removeCertificate(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            <div
              onClick={() => handleImageUpload("certificates")}
              className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mt-1">上传</span>
            </div>
          </div>
        </div>

        {/* 意外伤害保险单 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            ��外伤害保险单
          </h2>
          <p className="text-xs text-muted-foreground mb-3">请上传有效期内的意外伤害保险单（可选）</p>
          <div
            onClick={() => handleImageUpload("insurance")}
            className="w-full aspect-[2/1] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
          >
            {formData.insurance ? (
              <img src={formData.insurance} alt="保险单" className="w-full h-full object-cover" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">点击上传保险单</span>
              </>
            )}
          </div>
        </div>

        {/* 入驻协议 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => setFormData((prev) => ({ ...prev, agreeTerms: !prev.agreeTerms }))}
            className="flex items-start gap-3"
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                formData.agreeTerms ? "bg-primary border-primary" : "border-border"
              }`}
            >
              {formData.agreeTerms && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="text-left">
              <p className="text-sm text-foreground">
                我已阅读并同意
                <span className="text-primary">《服务人员入驻协议》</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                包含服务规范、平台佣金抽成比例、服务质量要求、用户评价机制、违规处罚规定等内容
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-4">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-full text-white font-medium transition-opacity ${
            isFormValid
              ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          提交审核
        </button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          提交后请等待管理员审核，审核通过后即可接单
        </p>
      </div>
    </div>
  )
}
