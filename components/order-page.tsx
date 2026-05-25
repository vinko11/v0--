"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, MapPin, Calendar, Clock, CreditCard, Wallet, Check, AlertCircle, Navigation, ChevronDown, ChevronRight, Ticket, Camera, X, XCircle } from "lucide-react"

interface OrderPageProps {
  onBack: () => void
  onComplete: () => void
  orderItem?: {
    name: string
    price: string
    image: string
    type: "product" | "worker" | "institution"
  }
}

// 不同城市的价格倍数
const cityPriceMultiplier: Record<string, { name: string; multiplier: number }> = {
  nanjing: { name: "南京市", multiplier: 1 },
  shanghai: { name: "上海市", multiplier: 1.5 },
  beijing: { name: "北京市", multiplier: 1.4 },
  hangzhou: { name: "杭州市", multiplier: 1.2 },
  suzhou: { name: "苏州市", multiplier: 1.1 },
  wuxi: { name: "无锡市", multiplier: 1.0 },
}

// 省市区数据
const regionData = {
  jiangsu: {
    name: "江苏省",
    cities: {
      nanjing: { name: "南京市", districts: ["建邺区", "鼓楼区", "玄武区", "秦淮区", "栖霞区", "雨花台区"] },
      suzhou: { name: "苏州市", districts: ["姑苏区", "虎丘区", "吴中区", "相城区", "吴江区"] },
      wuxi: { name: "无锡市", districts: ["梁溪区", "锡山区", "惠山区", "滨湖区", "新吴区"] },
    },
  },
  shanghai: {
    name: "上海市",
    cities: {
      shanghai: { name: "上海市", districts: ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "浦东新区"] },
    },
  },
  zhejiang: {
    name: "浙江省",
    cities: {
      hangzhou: { name: "杭州市", districts: ["上城区", "下城区", "西湖区", "拱墅区", "滨江区", "余杭区"] },
    },
  },
  beijing: {
    name: "北京市",
    cities: {
      beijing: { name: "北京市", districts: ["东城区", "西城区", "朝阳区", "海淀区", "丰台区", "石景山区"] },
    },
  },
}

export default function OrderPage({ onBack, onComplete, orderItem }: OrderPageProps) {
  // 地址相关状态
  const [selectedProvince, setSelectedProvince] = useState("jiangsu")
  const [selectedCity, setSelectedCity] = useState("nanjing")
  const [selectedDistrict, setSelectedDistrict] = useState("建邺区")
  const [detailAddress, setDetailAddress] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null)
  
  // 时间相关状态
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  
  // 支付和价格相关
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [orderComplete, setOrderComplete] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(true) // 支付结果状态
  const [showPriceChangeAlert, setShowPriceChangeAlert] = useState(false)
  const [previousCity, setPreviousCity] = useState("nanjing")
  
  // 优惠券相关
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null)
  
  // 服务备注和照片
  const [serviceRemark, setServiceRemark] = useState("")
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  
  // 地区选择器展开状态
  const [showRegionPicker, setShowRegionPicker] = useState(false)

  // Mock优惠券数据
  const coupons = [
    { id: 1, name: "新人专享券", discount: 20, minAmount: 100, expireDate: "2024-02-28", available: true },
    { id: 2, name: "满200减30", discount: 30, minAmount: 200, expireDate: "2024-03-15", available: true },
    { id: 3, name: "满300减50", discount: 50, minAmount: 300, expireDate: "2024-02-20", available: false },
  ]

  const defaultItem = {
    name: "资深护工24小时陪护",
    price: "¥180/天",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=300&fit=crop",
    type: "product" as const,
  }

  const currentItem = orderItem || defaultItem

  // 计算基础价格
  const getBasePrice = (): number => {
    const priceMatch = currentItem.price.match(/\d+/)
    return priceMatch ? parseInt(priceMatch[0]) : 180
  }

  // 计算当前城市的实际价格
  const getCurrentPrice = (): number => {
    const basePrice = getBasePrice()
    const multiplier = cityPriceMultiplier[selectedCity]?.multiplier || 1
    return Math.round(basePrice * multiplier)
  }

  // 计算优惠后价格
  const getFinalPrice = (): number => {
    const price = getCurrentPrice()
    if (selectedCoupon && price >= selectedCoupon.minAmount) {
      return price - selectedCoupon.discount
    }
    return price
  }

  // 模拟照片上传
  const handlePhotoUpload = () => {
    if (uploadedPhotos.length >= 3) {
      alert("最多上传3张照片")
      return
    }
    // Mock添加一张占位图
    const mockPhotos = [
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
    ]
    setUploadedPhotos([...uploadedPhotos, mockPhotos[uploadedPhotos.length]])
  }

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index))
  }

  // 监听城市变化，提示价格变动
  useEffect(() => {
    if (previousCity !== selectedCity) {
      const oldMultiplier = cityPriceMultiplier[previousCity]?.multiplier || 1
      const newMultiplier = cityPriceMultiplier[selectedCity]?.multiplier || 1
      if (oldMultiplier !== newMultiplier) {
        setShowPriceChangeAlert(true)
        setTimeout(() => setShowPriceChangeAlert(false), 5000)
      }
      setPreviousCity(selectedCity)
    }
  }, [selectedCity, previousCity])

  // 日期选项
  const dates = [
    { date: "今天", value: "2024-01-20" },
    { date: "明天", value: "2024-01-21" },
    { date: "后天", value: "2024-01-22" },
    { date: "01-23", value: "2024-01-23" },
    { date: "01-24", value: "2024-01-24" },
    { date: "01-25", value: "2024-01-25" },
    { date: "01-26", value: "2024-01-26" },
  ]

  // 时间选项
  const times = [
    "08:00-10:00",
    "10:00-12:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
  ]

  // 获取定位
  const handleGetLocation = () => {
    setIsLocating(true)
    // 模拟获取定位
    setTimeout(() => {
      setLocationCoords({ lat: 32.0617, lng: 118.7778 })
      setDetailAddress("江东中路388号阳光小区1栋502室")
      setIsLocating(false)
    }, 1500)
  }

  // 打开导航
  const handleOpenNavigation = () => {
    if (locationCoords) {
      // 这里可以调用地图导航
      alert(`打开导航：${selectedProvince} ${selectedCity} ${selectedDistrict} ${detailAddress}\n坐标：${locationCoords.lat}, ${locationCoords.lng}`)
    }
  }

  // 提交订单
  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !detailAddress || !contactName || !contactPhone) {
      alert("请填写完整的订单信息")
      return
    }
    // 模拟支付过程，随机成功或失败（90%成功率）
    const isSuccess = Math.random() > 0.1
    setPaymentSuccess(isSuccess)
    setOrderComplete(true)
  }

  // 获取当前省的城市列表
  const getCurrentCities = () => {
    return regionData[selectedProvince as keyof typeof regionData]?.cities || {}
  }

  // 获取当前城市的区县列表
  const getCurrentDistricts = () => {
    const cities = getCurrentCities()
    return cities[selectedCity as keyof typeof cities]?.districts || []
  }

  // 订单完成页面（成功/失败两种状态）
  if (orderComplete) {
    const orderNumber = `QY${Date.now().toString().slice(-10)}`
    
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        {paymentSuccess ? (
          // 支付成功
          <>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#71F2DC] to-[#4DD8CD] flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">支付成功</h1>
            <p className="text-sm text-muted-foreground text-center mb-2">
              您的订单已支付成功，服务人员将尽快与您联系
            </p>
            <p className="text-xs text-muted-foreground mb-6">订单号：{orderNumber}</p>
          </>
        ) : (
          // 支付失败
          <>
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">支付失败</h1>
            <p className="text-sm text-muted-foreground text-center mb-6">
              支付遇到问题，请重试或更换支付方式
            </p>
          </>
        )}
        
        <div className="bg-card rounded-2xl p-4 w-full shadow-sm mb-6">
          <div className="flex gap-3">
            <img src={currentItem.image} alt={currentItem.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">{currentItem.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                服务时间：{selectedDate} {selectedTime}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                服务地址：{regionData[selectedProvince as keyof typeof regionData]?.name}{cityPriceMultiplier[selectedCity]?.name}{selectedDistrict}
              </p>
              <p className="text-primary font-bold text-sm mt-1">¥{getFinalPrice()}</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 w-full">
          {paymentSuccess ? (
            <>
              <button
                onClick={onComplete}
                className="flex-1 py-3 rounded-full border border-border text-foreground font-medium text-sm"
              >
                返回首页
              </button>
              <button
                onClick={onComplete}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm"
              >
                查看订单
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onComplete}
                className="flex-1 py-3 rounded-full border border-border text-foreground font-medium text-sm"
              >
                返回首页
              </button>
              <button
                onClick={() => setOrderComplete(false)}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white font-medium text-sm"
              >
                重新支付
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border">
        <div className="flex items-center px-4 py-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="flex-1 text-center font-medium text-foreground">确认预约</span>
          <div className="w-9" />
        </div>
      </div>

      {/* Price Change Alert */}
      {showPriceChangeAlert && (
        <div className="mx-4 mt-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">服务价格已更新</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              由于您更改了服务地区，服务价格已从 ¥{Math.round(getBasePrice() * (cityPriceMultiplier[previousCity]?.multiplier || 1))} 
              调整为 ¥{getCurrentPrice()}
            </p>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Service Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-foreground mb-3">服务信息</h2>
          <div className="flex gap-3">
            <img src={currentItem.image} alt={currentItem.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{currentItem.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">规格：24小时全天候</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-primary font-bold">¥{getCurrentPrice()}/天</span>
                {cityPriceMultiplier[selectedCity]?.multiplier !== 1 && (
                  <span className="text-xs text-muted-foreground line-through">
                    ¥{getBasePrice()}/天
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Service Region Selection */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">服务地区</h2>
            <span className="text-xs text-muted-foreground">不同地区价格可能不同</span>
          </div>
          
          {/* Province/City/District Selector */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="relative">
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value)
                  const cities = Object.keys(regionData[e.target.value as keyof typeof regionData]?.cities || {})
                  if (cities.length > 0) {
                    setSelectedCity(cities[0])
                    const districts = regionData[e.target.value as keyof typeof regionData]?.cities[cities[0] as keyof typeof regionData.jiangsu.cities]?.districts || []
                    if (districts.length > 0) setSelectedDistrict(districts[0])
                  }
                }}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground appearance-none cursor-pointer"
              >
                {Object.entries(regionData).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value)
                  const districts = getCurrentCities()[e.target.value as keyof ReturnType<typeof getCurrentCities>]?.districts || []
                  if (districts.length > 0) setSelectedDistrict(districts[0])
                }}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground appearance-none cursor-pointer"
              >
                {Object.entries(getCurrentCities()).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground appearance-none cursor-pointer"
              >
                {getCurrentDistricts().map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Detailed Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="请输入详细地址（街道、门牌号等）"
                className="flex-1 bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={handleGetLocation}
                disabled={isLocating}
                className="flex items-center gap-1 px-3 py-2.5 bg-primary/10 text-primary rounded-lg text-sm whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" />
                {isLocating ? "定位中..." : "获取定位"}
              </button>
            </div>
            
            {locationCoords && (
              <div className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-700">已获取定位坐标</span>
                </div>
                <button
                  onClick={handleOpenNavigation}
                  className="flex items-center gap-1 text-xs text-primary"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  查看导航
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-foreground mb-3">联系方式</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="联系人姓名"
              className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="联系电话"
              className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* 服务备注和照片上传 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-foreground mb-3">服务备注</h2>
          <textarea
            value={serviceRemark}
            onChange={(e) => setServiceRemark(e.target.value)}
            placeholder="请输入服务备注，如特殊需求、注意事项等..."
            className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none min-h-[80px] resize-none"
          />
          
          {/* 照片上传 */}
          <div className="mt-3">
            <p className="text-sm text-muted-foreground mb-2">上传照片（最多3张）</p>
            <div className="flex gap-2 flex-wrap">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={photo} alt={`上传图片${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {uploadedPhotos.length < 3 && (
                <button
                  onClick={handlePhotoUpload}
                  className="w-20 h-20 bg-muted rounded-lg flex flex-col items-center justify-center gap-1 border-2 border-dashed border-border"
                >
                  <Camera className="w-6 h-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">添加</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 优惠券选择 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => setShowCouponModal(true)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">优惠券</span>
            </div>
            <div className="flex items-center gap-2">
              {selectedCoupon ? (
                <span className="text-sm text-red-500">-¥{selectedCoupon.discount}</span>
              ) : (
                <span className="text-sm text-muted-foreground">选择优惠券</span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
        </div>

        {/* Time Selection */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-foreground mb-3">选择服务时间</h2>
          
          {/* Date Selection */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">服务日期</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`flex-shrink-0 w-16 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    selectedDate === d.value
                      ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {d.date}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">服务时段</p>
            <div className="grid grid-cols-3 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedTime === t
                      ? "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-foreground mb-3">支付方式</h2>
          <div className="space-y-2">
            {[
              { id: "wechat", label: "微信支付", icon: Wallet, color: "#07C160" },
              { id: "balance", label: "余额支付", icon: CreditCard, color: "#f59e0b", balance: "¥520.00" },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                  paymentMethod === method.id ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${method.color}15` }}
                >
                  <method.icon className="w-5 h-5" style={{ color: method.color }} />
                </div>
                <span className="flex-1 text-left text-sm text-foreground">{method.label}</span>
                {method.balance && (
                  <span className="text-xs text-muted-foreground">余额：{method.balance}</span>
                )}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                >
                  {paymentMethod === method.id && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">服务费用</span>
            <span className="text-sm text-foreground">¥{getCurrentPrice()}.00</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">地区差价</span>
            <span className="text-sm text-foreground">
              {cityPriceMultiplier[selectedCity]?.multiplier !== 1 
                ? `+¥${getCurrentPrice() - getBasePrice()}.00` 
                : "¥0.00"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">优惠减免</span>
            <span className="text-sm text-red-500">
              {selectedCoupon ? `-¥${selectedCoupon.discount}.00` : "-¥0.00"}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="font-medium text-foreground">实付金额</span>
            <span className="text-lg font-bold text-primary">¥{getFinalPrice()}.00</span>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-yellow-50 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-700">
            预约成功后，服务人员将在服务开始前1小时与您联系确认。服务价格因地区不同可能有所差异。
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">合计</p>
            <p className="text-xl font-bold text-primary">¥{getFinalPrice()}.00</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime || !detailAddress || !contactName || !contactPhone}
            className={`flex-1 py-3.5 rounded-full font-medium text-sm transition-opacity ${
              !selectedDate || !selectedTime || !detailAddress || !contactName || !contactPhone
                ? "bg-muted text-muted-foreground"
                : "bg-gradient-to-r from-[#71F2DC] to-[#4DD8CD] text-white"
            }`}
          >
            提交订单
          </button>
        </div>
      </div>

      {/* 优惠券选择弹窗 */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-card rounded-t-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-foreground">选择优惠券</h3>
              <button onClick={() => setShowCouponModal(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {/* 不使用优惠券选项 */}
              <button
                onClick={() => {
                  setSelectedCoupon(null)
                  setShowCouponModal(false)
                }}
                className={`w-full p-3 rounded-xl mb-3 border-2 text-left ${
                  !selectedCoupon ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"
                }`}
              >
                <span className="text-sm text-foreground">不使用优惠券</span>
              </button>
              
              {/* 可用优惠券 */}
              <p className="text-sm text-muted-foreground mb-2">可用优惠券</p>
              {coupons.filter(c => c.available && getCurrentPrice() >= c.minAmount).map((coupon) => (
                <button
                  key={coupon.id}
                  onClick={() => {
                    setSelectedCoupon(coupon)
                    setShowCouponModal(false)
                  }}
                  className={`w-full p-3 rounded-xl mb-2 border-2 text-left ${
                    selectedCoupon?.id === coupon.id ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      ¥{coupon.discount}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{coupon.name}</p>
                      <p className="text-xs text-muted-foreground">满{coupon.minAmount}可用 · {coupon.expireDate}到期</p>
                    </div>
                    {selectedCoupon?.id === coupon.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
              
              {/* 不可用优惠券 */}
              {coupons.filter(c => !c.available || getCurrentPrice() < c.minAmount).length > 0 && (
                <>
                  <p className="text-sm text-muted-foreground mb-2 mt-4">暂不可用</p>
                  {coupons.filter(c => !c.available || getCurrentPrice() < c.minAmount).map((coupon) => (
                    <div
                      key={coupon.id}
                      className="w-full p-3 rounded-xl mb-2 bg-muted/30 opacity-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-400 text-white px-2 py-1 rounded text-sm font-bold">
                          ¥{coupon.discount}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-muted-foreground text-sm">{coupon.name}</p>
                          <p className="text-xs text-muted-foreground">
                            满{coupon.minAmount}可用 · {coupon.expireDate}到期
                            {getCurrentPrice() < coupon.minAmount && ` · 还差¥${coupon.minAmount - getCurrentPrice()}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              
              {/* 领券中心入口 */}
              <button className="w-full py-3 mt-4 border border-primary text-primary rounded-full font-medium text-sm">
                前往领券中心
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
