"use client"

import { useState } from "react"
import { ChevronLeft, Camera, MapPin, ChevronDown, Check, Video, Info } from "lucide-react"

interface PostPageProps {
  onBack?: () => void
  onSubmit?: () => void
}

const serviceCategories = [
  { id: "home", label: "居家护工", refPrice: "¥150-300/天" },
  { id: "hospital", label: "住院陪护", refPrice: "¥200-350/天" },
  { id: "medical", label: "助医服务", refPrice: "¥100-200/次" },
  { id: "bath", label: "助浴服务", refPrice: "¥80-150/次" },
  { id: "meal", label: "助餐服务", refPrice: "¥50-100/次" },
  { id: "equipment", label: "器材租售", refPrice: "按具体器材定价" },
  { id: "cleaning", label: "保洁服务", refPrice: "¥100-300/次" },
  { id: "safety", label: "安全检查", refPrice: "¥200-500/次" },
  { id: "health", label: "慢病监测", refPrice: "¥150-300/次" },
  { id: "renovation", label: "适老改造", refPrice: "上门估价" },
  { id: "warm", label: "暖心服务", refPrice: "¥80-200/次" },
  { id: "other", label: "其他服务", refPrice: "上门估价" },
]

const provinces = [
  { id: "jiangsu", name: "江苏省", cities: [
    { id: "nanjing", name: "南京市", districts: ["玄武区", "秦淮区", "建邺区", "鼓楼区", "浦口区", "栖霞区", "雨花台区", "江宁区"] },
    { id: "suzhou", name: "苏州市", districts: ["姑苏区", "虎丘区", "吴中区", "相城区", "吴江区"] },
    { id: "wuxi", name: "无锡市", districts: ["锡山区", "惠山区", "滨湖区", "梁溪区", "新吴区"] },
  ]},
  { id: "shanghai", name: "上海市", cities: [
    { id: "shanghai", name: "上海市", districts: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "浦东新区"] },
  ]},
  { id: "zhejiang", name: "浙江省", cities: [
    { id: "hangzhou", name: "杭州市", districts: ["上城区", "下城区", "江干区", "拱墅区", "西湖区", "滨江区", "余杭区"] },
  ]},
]

export default function PostPage({ onBack, onSubmit }: PostPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [serviceName, setServiceName] = useState("")
  const [serviceContent, setServiceContent] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("fixed") // fixed | estimate
  const [price, setPrice] = useState("")
  const [payMethod, setPayMethod] = useState("wechat") // wechat | balance
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [detailAddress, setDetailAddress] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  
  // Location
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [showProvinceSelect, setShowProvinceSelect] = useState(false)
  const [showCitySelect, setShowCitySelect] = useState(false)
  const [showDistrictSelect, setShowDistrictSelect] = useState(false)

  const currentProvince = provinces.find((p) => p.id === selectedProvince)
  const currentCity = currentProvince?.cities.find((c) => c.id === selectedCity)
  const currentRefPrice = serviceCategories.find((c) => c.id === selectedCategory)?.refPrice || ""

  const handleGetLocation = () => {
    // Simulate getting location from WeChat
    setSelectedProvince("jiangsu")
    setSelectedCity("nanjing")
    setSelectedDistrict("建邺区")
    setDetailAddress("江东中路388号")
  }

  const handleSubmit = () => {
    // Validate form
    if (!selectedCategory || !serviceName || !serviceContent || !contactName || !contactPhone) {
      alert("请填写完整信息")
      return
    }
    onSubmit?.()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#71F2DC] to-[#4DD8CD] px-4 py-4 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack}>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <h1 className="text-white font-bold text-lg">发布需求</h1>
      </div>

      <div className="p-3 pb-28 space-y-3">
        {/* Service Category */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-3">
            服务类别 <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Name */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-3">
            服务名称 <span className="text-red-500">*</span>
          </h3>
          <input
            type="text"
            placeholder="请输入服务名称，如：老人日常护理"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Service Content */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-3">
            服务内容 <span className="text-red-500">*</span>
          </h3>
          <textarea
            placeholder="请详细描述您的服务需求，如服务对象情况、特殊要求等..."
            value={serviceContent}
            onChange={(e) => setServiceContent(e.target.value)}
            className="w-full h-[120px] bg-muted rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
          />
        </div>

        {/* Related Materials */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-3">相关资料</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">上传照片（最多6张）</p>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <button
                    key={i}
                    className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border"
                  >
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">上传视频（最多2个）</p>
              <div className="flex gap-2">
                {[...Array(2)].map((_, i) => (
                  <button
                    key={i}
                    className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border"
                  >
                    <Video className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-3">
            付款方式 <span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => setPaymentMethod("fixed")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                paymentMethod === "fixed"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              一口价
            </button>
            <button
              onClick={() => setPaymentMethod("estimate")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                paymentMethod === "estimate"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              上门估价
            </button>
          </div>
        </div>

        {/* Price */}
        {paymentMethod === "fixed" && (
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-foreground mb-3">
              价格 <span className="text-red-500">*</span>
            </h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">¥</span>
              <input
                type="number"
                placeholder="请输入价格"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-muted rounded-xl px-4 py-3 pl-8 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            {currentRefPrice && (
              <div className="flex items-center gap-1 mt-2">
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  市场参考价：{currentRefPrice}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Location */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">
              服务位置 <span className="text-red-500">*</span>
            </h3>
            <button
              onClick={handleGetLocation}
              className="flex items-center gap-1 text-primary text-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              获取定位
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {/* Province */}
            <div className="relative">
              <button
                onClick={() => setShowProvinceSelect(!showProvinceSelect)}
                className="w-full bg-muted rounded-xl px-3 py-2.5 text-xs text-left flex items-center justify-between"
              >
                <span className={selectedProvince ? "text-foreground" : "text-muted-foreground"}>
                  {currentProvince?.name || "选择省"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {showProvinceSelect && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-xl shadow-lg border border-border z-20 max-h-40 overflow-y-auto">
                  {provinces.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProvince(p.id)
                        setSelectedCity("")
                        setSelectedDistrict("")
                        setShowProvinceSelect(false)
                      }}
                      className="w-full px-3 py-2 text-xs text-left hover:bg-muted flex items-center justify-between"
                    >
                      {p.name}
                      {selectedProvince === p.id && <Check className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* City */}
            <div className="relative">
              <button
                onClick={() => currentProvince && setShowCitySelect(!showCitySelect)}
                className="w-full bg-muted rounded-xl px-3 py-2.5 text-xs text-left flex items-center justify-between"
              >
                <span className={selectedCity ? "text-foreground" : "text-muted-foreground"}>
                  {currentCity?.name || "选择市"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {showCitySelect && currentProvince && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-xl shadow-lg border border-border z-20 max-h-40 overflow-y-auto">
                  {currentProvince.cities.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCity(c.id)
                        setSelectedDistrict("")
                        setShowCitySelect(false)
                      }}
                      className="w-full px-3 py-2 text-xs text-left hover:bg-muted flex items-center justify-between"
                    >
                      {c.name}
                      {selectedCity === c.id && <Check className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* District */}
            <div className="relative">
              <button
                onClick={() => currentCity && setShowDistrictSelect(!showDistrictSelect)}
                className="w-full bg-muted rounded-xl px-3 py-2.5 text-xs text-left flex items-center justify-between"
              >
                <span className={selectedDistrict ? "text-foreground" : "text-muted-foreground"}>
                  {selectedDistrict || "选择区"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {showDistrictSelect && currentCity && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-xl shadow-lg border border-border z-20 max-h-40 overflow-y-auto">
                  {currentCity.districts.map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setSelectedDistrict(d)
                        setShowDistrictSelect(false)
                      }}
                      className="w-full px-3 py-2 text-xs text-left hover:bg-muted flex items-center justify-between"
                    >
                      {d}
                      {selectedDistrict === d && <Check className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            placeholder="请输入详细地址"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-3">
            联系方式 <span className="text-red-500">*</span>
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="请输入联系人姓名"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <input
              type="tel"
              placeholder="请输入联系电话"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* Pay Method */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-3">
            支付方式 <span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => setPayMethod("wechat")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                payMethod === "wechat"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              微信支付
            </button>
            <button
              onClick={() => setPayMethod("balance")}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                payMethod === "balance"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              余额支付
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-amber-50 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-700 leading-relaxed">
              <p className="font-medium mb-1">温馨提示</p>
              <p>1. 提交发布后，由后台管理员查看并选择是否接单</p>
              <p>2. 接单后会有专业服务人员与您联系</p>
              <p>3. 服务完成后请确认并完成支付</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-bold py-3.5 rounded-xl shadow-lg"
        >
          确认发布
        </button>
      </div>
    </div>
  )
}
