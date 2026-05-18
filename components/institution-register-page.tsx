"use client"

import { useState } from "react"
import { ChevronLeft, Building2, Upload, Camera, MapPin, ChevronDown, Check, Navigation } from "lucide-react"

interface InstitutionRegisterPageProps {
  onBack: () => void
}

// 省市区数据
const locationData = {
  provinces: [
    { id: "jiangsu", name: "江苏省" },
    { id: "zhejiang", name: "浙江省" },
    { id: "shanghai", name: "上海市" },
    { id: "anhui", name: "安徽省" },
  ],
  cities: {
    jiangsu: [
      { id: "nanjing", name: "南京市" },
      { id: "suzhou", name: "苏州市" },
      { id: "wuxi", name: "无锡市" },
      { id: "changzhou", name: "常州市" },
    ],
    zhejiang: [
      { id: "hangzhou", name: "杭州市" },
      { id: "ningbo", name: "宁波市" },
      { id: "wenzhou", name: "温州市" },
    ],
    shanghai: [
      { id: "shanghai", name: "上海市" },
    ],
    anhui: [
      { id: "hefei", name: "合肥市" },
      { id: "wuhu", name: "芜湖市" },
    ],
  } as Record<string, Array<{ id: string; name: string }>>,
  districts: {
    nanjing: [
      { id: "xuanwu", name: "玄武区" },
      { id: "qinhuai", name: "秦淮区" },
      { id: "jianye", name: "建邺区" },
      { id: "gulou", name: "鼓楼区" },
      { id: "pukou", name: "浦口区" },
      { id: "qixia", name: "栖霞区" },
    ],
    suzhou: [
      { id: "gusu", name: "姑苏区" },
      { id: "wuzhong", name: "吴中区" },
      { id: "xiangcheng", name: "相城区" },
    ],
    wuxi: [
      { id: "liangxi", name: "梁溪区" },
      { id: "xishan", name: "锡山区" },
    ],
    hangzhou: [
      { id: "shangcheng", name: "上城区" },
      { id: "xihu", name: "西湖区" },
      { id: "binjiang", name: "滨江区" },
    ],
    shanghai: [
      { id: "huangpu", name: "黄浦区" },
      { id: "xuhui", name: "徐汇区" },
      { id: "pudong", name: "浦东新区" },
    ],
    hefei: [
      { id: "luyang", name: "庐阳区" },
      { id: "yaohai", name: "瑶海区" },
    ],
  } as Record<string, Array<{ id: string; name: string }>>,
}

// 服务类别
const serviceCategories = [
  { id: "equipment", name: "器材租赁" },
  { id: "nursing", name: "养老机构" },
  { id: "housekeeping", name: "家政服务" },
  { id: "medical", name: "医疗机构" },
  { id: "other", name: "其他" },
]

export default function InstitutionRegisterPage({ onBack }: InstitutionRegisterPageProps) {
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [detailAddress, setDetailAddress] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [institutionName, setInstitutionName] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [agreeAgreement, setAgreeAgreement] = useState(false)
  const [introduction, setIntroduction] = useState("")
  const [isLocating, setIsLocating] = useState(false)

  const availableCities = selectedProvince ? locationData.cities[selectedProvince] || [] : []
  const availableDistricts = selectedCity ? locationData.districts[selectedCity] || [] : []

  const handleGetLocation = () => {
    setIsLocating(true)
    // 模拟获取定位
    setTimeout(() => {
      setSelectedProvince("jiangsu")
      setSelectedCity("nanjing")
      setSelectedDistrict("jianye")
      setDetailAddress("江东中路388号")
      setIsLocating(false)
    }, 1500)
  }

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province)
    setSelectedCity("")
    setSelectedDistrict("")
  }

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setSelectedDistrict("")
  }

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
        {/* 1. 机构位置选择 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">机构位置</h3>
          </div>
          
          {/* 省市区三级选择 */}
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <select
                value={selectedProvince}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors appearance-none pr-8"
              >
                <option value="">选择省份</option>
                {locationData.provinces.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={!selectedProvince}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors appearance-none pr-8 disabled:opacity-50"
              >
                <option value="">选择城市</option>
                {availableCities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedCity}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none border border-transparent focus:border-primary transition-colors appearance-none pr-8 disabled:opacity-50"
              >
                <option value="">选择区县</option>
                {availableDistricts.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* 详细地址输入 */}
          <div>
            <input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="请输入详细地址（街道、门牌号等）"
              className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
            />
          </div>

          {/* 获取定位按钮 */}
          <button
            onClick={handleGetLocation}
            disabled={isLocating}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? "animate-pulse" : ""}`} />
            <span className="text-sm">{isLocating ? "正在获取定位..." : "获取当前位置自动填写"}</span>
          </button>
        </div>

        {/* 2. 服务类别选择 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">服务类别</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 基本信息 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">基本信息</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">机构名称 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="请输入机构名称"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">联系人 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="请输入联系人姓名"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">联系电话 <span className="text-red-500">*</span></label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="请输入联系电话"
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 4. 入驻协议 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => setAgreeAgreement(!agreeAgreement)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                agreeAgreement ? "bg-primary border-primary" : "border-border"
              }`}
            >
              {agreeAgreement && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="text-sm text-muted-foreground">
              我已阅读并同意
              <span className="text-primary">《平台入驻协议》</span>
              ，包括同意平台服务折扣政策、平台佣金比例、服务规范要求等相关内容
            </div>
          </label>
        </div>

        {/* 5. 营业执照 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">营业执照 <span className="text-red-500">*</span></h3>
          
          <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">点击上传营业执照</span>
            <span className="text-xs text-muted-foreground">支持 JPG、PNG 格式，文件大小不超过 5MB</span>
          </div>
        </div>

        {/* 6. 资质证明 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">资质证明上传</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
              <Camera className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">资质证明1</span>
            </div>
            <div className="aspect-video bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
              <Camera className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">资质证明2</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">如有相关行业资质证书、许可证等，请上传</p>
        </div>

        {/* 7. 机构情况简介 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">机构情况简介</h3>
          
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="请简要介绍机构的服务特色、设施设备、团队资质等情况（200字以内）"
            maxLength={200}
            rows={4}
            className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors resize-none"
          />
          <div className="text-right text-xs text-muted-foreground">
            {introduction.length}/200
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={!agreeAgreement || !institutionName || !contactPerson || !contactPhone}
          className="w-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          提交入驻申请
        </button>

        <p className="text-xs text-muted-foreground text-center">
          提交后我们将在1-3个工作日内审核，审核结果将以短信形式通知
        </p>
      </div>
    </div>
  )
}
