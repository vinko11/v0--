"use client"

import { useState } from "react"
import { MapPin, TrendingUp, Users, Building2, AlertCircle, ChevronDown } from "lucide-react"

// 省份入驻数据
const provinceData: Record<string, { name: string; providers: number; workers: number; orders: number; level: "high" | "medium" | "low" | "none" }> = {
  jiangsu: { name: "江苏", providers: 45, workers: 328, orders: 1256, level: "high" },
  zhejiang: { name: "浙江", providers: 38, workers: 276, orders: 1089, level: "high" },
  shanghai: { name: "上海", providers: 52, workers: 412, orders: 1678, level: "high" },
  guangdong: { name: "广东", providers: 41, workers: 298, orders: 1134, level: "high" },
  beijing: { name: "北京", providers: 35, workers: 245, orders: 987, level: "high" },
  shandong: { name: "山东", providers: 28, workers: 189, orders: 756, level: "medium" },
  henan: { name: "河南", providers: 22, workers: 156, orders: 623, level: "medium" },
  sichuan: { name: "四川", providers: 25, workers: 178, orders: 712, level: "medium" },
  hubei: { name: "湖北", providers: 18, workers: 134, orders: 534, level: "medium" },
  hunan: { name: "湖南", providers: 15, workers: 112, orders: 445, level: "medium" },
  fujian: { name: "福建", providers: 20, workers: 145, orders: 578, level: "medium" },
  anhui: { name: "安徽", providers: 12, workers: 89, orders: 356, level: "low" },
  jiangxi: { name: "江西", providers: 8, workers: 56, orders: 224, level: "low" },
  hebei: { name: "河北", providers: 10, workers: 78, orders: 312, level: "low" },
  shanxi: { name: "山西", providers: 6, workers: 45, orders: 178, level: "low" },
  shaanxi: { name: "陕西", providers: 9, workers: 67, orders: 267, level: "low" },
  chongqing: { name: "重庆", providers: 11, workers: 82, orders: 328, level: "low" },
  liaoning: { name: "辽宁", providers: 7, workers: 52, orders: 208, level: "low" },
  jilin: { name: "吉林", providers: 3, workers: 23, orders: 92, level: "none" },
  heilongjiang: { name: "黑龙江", providers: 4, workers: 31, orders: 124, level: "none" },
  yunnan: { name: "云南", providers: 5, workers: 38, orders: 152, level: "none" },
  guizhou: { name: "贵州", providers: 2, workers: 15, orders: 60, level: "none" },
  guangxi: { name: "广西", providers: 6, workers: 44, orders: 176, level: "low" },
  hainan: { name: "海南", providers: 3, workers: 22, orders: 88, level: "none" },
  gansu: { name: "甘肃", providers: 1, workers: 8, orders: 32, level: "none" },
  qinghai: { name: "青海", providers: 0, workers: 0, orders: 0, level: "none" },
  ningxia: { name: "宁夏", providers: 1, workers: 6, orders: 24, level: "none" },
  xinjiang: { name: "新疆", providers: 2, workers: 14, orders: 56, level: "none" },
  xizang: { name: "西藏", providers: 0, workers: 0, orders: 0, level: "none" },
  neimenggu: { name: "内蒙古", providers: 2, workers: 16, orders: 64, level: "none" },
  tianjin: { name: "天津", providers: 14, workers: 98, orders: 392, level: "low" },
}

// 城市级别数据（江苏省示例）
const cityData: Record<string, { name: string; providers: number; workers: number; level: "high" | "medium" | "low" | "none" }> = {
  nanjing: { name: "南京", providers: 12, workers: 89, level: "high" },
  suzhou: { name: "苏州", providers: 10, workers: 76, level: "high" },
  wuxi: { name: "无锡", providers: 8, workers: 58, level: "high" },
  changzhou: { name: "常州", providers: 5, workers: 38, level: "medium" },
  nantong: { name: "南通", providers: 4, workers: 28, level: "medium" },
  yangzhou: { name: "扬州", providers: 2, workers: 15, level: "low" },
  zhenjiang: { name: "镇江", providers: 2, workers: 12, level: "low" },
  taizhou: { name: "泰州", providers: 1, workers: 8, level: "low" },
  yancheng: { name: "盐城", providers: 1, workers: 4, level: "none" },
  huaian: { name: "淮安", providers: 0, workers: 0, level: "none" },
  suqian: { name: "宿迁", providers: 0, workers: 0, level: "none" },
  lianyungang: { name: "连云港", providers: 0, workers: 0, level: "none" },
  xuzhou: { name: "徐州", providers: 0, workers: 0, level: "none" },
}

const levelColors = {
  high: { bg: "#10b981", text: "覆盖良好", description: "机构≥30，可维护" },
  medium: { bg: "#f59e0b", text: "正在拓展", description: "机构10-29，需加强" },
  low: { bg: "#f97316", text: "覆盖不足", description: "机构1-9，重点突破" },
  none: { bg: "#ef4444", text: "尚未入驻", description: "机构0，急需拓展" },
}

// 省份卡片组件
interface ProvinceTileProps {
  id: string
  data: { name: string; providers: number; workers: number; orders: number; level: "high" | "medium" | "low" | "none" }
  selected: boolean
  onClick: () => void
}

function ProvinceTile({ id, data, selected, onClick }: ProvinceTileProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg text-center transition-all hover:scale-105 aspect-square flex flex-col items-center justify-center ${
        selected ? "ring-2 ring-offset-2" : ""
      }`}
      style={{
        backgroundColor: levelColors[data.level].bg + "20",
        borderColor: levelColors[data.level].bg,
        ringColor: levelColors[data.level].bg,
      }}
    >
      <div 
        className="w-3 h-3 rounded-full mb-1"
        style={{ backgroundColor: levelColors[data.level].bg }}
      />
      <p className="text-xs font-medium text-gray-700">{data.name}</p>
      <p className="text-xs text-gray-500">{data.providers}家</p>
    </button>
  )
}

export default function ProviderMapPage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [viewLevel, setViewLevel] = useState<"province" | "city">("province")

  // 统计数据
  const stats = {
    totalProvinces: Object.keys(provinceData).length,
    coveredProvinces: Object.values(provinceData).filter(p => p.level !== "none").length,
    totalProviders: Object.values(provinceData).reduce((sum, p) => sum + p.providers, 0),
    totalWorkers: Object.values(provinceData).reduce((sum, p) => sum + p.workers, 0),
    noCoverageProvinces: Object.values(provinceData).filter(p => p.level === "none").length,
  }

  // 按覆盖级别分组省份
  const provincesByLevel = {
    high: Object.entries(provinceData).filter(([_, p]) => p.level === "high"),
    medium: Object.entries(provinceData).filter(([_, p]) => p.level === "medium"),
    low: Object.entries(provinceData).filter(([_, p]) => p.level === "low"),
    none: Object.entries(provinceData).filter(([_, p]) => p.level === "none"),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">入驻地图</h1>
          <p className="text-gray-500 mt-1">查看各地区服务商入驻情况，识别拓展机会</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={viewLevel}
            onChange={(e) => setViewLevel(e.target.value as "province" | "city")}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="province">省级视图</option>
            <option value="city">城市视图（江苏）</option>
          </select>
          <button className="px-4 py-2 bg-[#4DD8CD] text-white rounded-lg text-sm font-medium hover:bg-[#3bc4ba]">
            导出报告
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.coveredProvinces}/{stats.totalProvinces}</p>
              <p className="text-sm text-gray-500">已覆盖省份</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProviders}</p>
              <p className="text-sm text-gray-500">入驻机构</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalWorkers}</p>
              <p className="text-sm text-gray-500">服务人员</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{provincesByLevel.low.length}</p>
              <p className="text-sm text-gray-500">待突破区域</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.noCoverageProvinces}</p>
              <p className="text-sm text-gray-500">空白区域</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            {viewLevel === "province" ? "全国入驻热力图" : "江苏省城市覆盖图"}
          </h3>
          
          {viewLevel === "province" ? (
            // 中国地图地理位置布局 (9行7列)
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gridAutoRows: 'auto' }}>
              {/* 第1行：新疆、内蒙古、黑龙江 */}
              <div className="col-span-1 row-span-1" />
              <ProvinceTile key="xinjiang" id="xinjiang" data={provinceData.xinjiang} selected={selectedProvince === "xinjiang"} onClick={() => setSelectedProvince("xinjiang")} />
              <div className="col-span-2" />
              <ProvinceTile key="neimenggu" id="neimenggu" data={provinceData.neimenggu} selected={selectedProvince === "neimenggu"} onClick={() => setSelectedProvince("neimenggu")} />
              <div className="col-span-2" />
              <ProvinceTile key="heilongjiang" id="heilongjiang" data={provinceData.heilongjiang} selected={selectedProvince === "heilongjiang"} onClick={() => setSelectedProvince("heilongjiang")} />

              {/* 第2行：西藏、青海、甘肃、宁夏、陕西、山西、河北 */}
              <ProvinceTile key="xizang" id="xizang" data={provinceData.xizang} selected={selectedProvince === "xizang"} onClick={() => setSelectedProvince("xizang")} />
              <ProvinceTile key="qinghai" id="qinghai" data={provinceData.qinghai} selected={selectedProvince === "qinghai"} onClick={() => setSelectedProvince("qinghai")} />
              <ProvinceTile key="gansu" id="gansu" data={provinceData.gansu} selected={selectedProvince === "gansu"} onClick={() => setSelectedProvince("gansu")} />
              <ProvinceTile key="ningxia" id="ningxia" data={provinceData.ningxia} selected={selectedProvince === "ningxia"} onClick={() => setSelectedProvince("ningxia")} />
              <ProvinceTile key="shaanxi" id="shaanxi" data={provinceData.shaanxi} selected={selectedProvince === "shaanxi"} onClick={() => setSelectedProvince("shaanxi")} />
              <ProvinceTile key="shanxi" id="shanxi" data={provinceData.shanxi} selected={selectedProvince === "shanxi"} onClick={() => setSelectedProvince("shanxi")} />
              <ProvinceTile key="hebei" id="hebei" data={provinceData.hebei} selected={selectedProvince === "hebei"} onClick={() => setSelectedProvince("hebei")} />

              {/* 第3行：云南、贵州、四川、重庆、湖北、河南、山东、北京、天津 */}
              <ProvinceTile key="yunnan" id="yunnan" data={provinceData.yunnan} selected={selectedProvince === "yunnan"} onClick={() => setSelectedProvince("yunnan")} />
              <div className="col-span-1" />
              <ProvinceTile key="guizhou" id="guizhou" data={provinceData.guizhou} selected={selectedProvince === "guizhou"} onClick={() => setSelectedProvince("guizhou")} />
              <ProvinceTile key="sichuan" id="sichuan" data={provinceData.sichuan} selected={selectedProvince === "sichuan"} onClick={() => setSelectedProvince("sichuan")} />
              <ProvinceTile key="chongqing" id="chongqing" data={provinceData.chongqing} selected={selectedProvince === "chongqing"} onClick={() => setSelectedProvince("chongqing")} />
              <ProvinceTile key="hubei" id="hubei" data={provinceData.hubei} selected={selectedProvince === "hubei"} onClick={() => setSelectedProvince("hubei")} />
              <ProvinceTile key="henan" id="henan" data={provinceData.henan} selected={selectedProvince === "henan"} onClick={() => setSelectedProvince("henan")} />

              {/* 第4行：广西、湖南、江西、福建、浙江、江苏、上海 */}
              <div className="col-span-1" />
              <ProvinceTile key="guangxi" id="guangxi" data={provinceData.guangxi} selected={selectedProvince === "guangxi"} onClick={() => setSelectedProvince("guangxi")} />
              <ProvinceTile key="hunan" id="hunan" data={provinceData.hunan} selected={selectedProvince === "hunan"} onClick={() => setSelectedProvince("hunan")} />
              <ProvinceTile key="jiangxi" id="jiangxi" data={provinceData.jiangxi} selected={selectedProvince === "jiangxi"} onClick={() => setSelectedProvince("jiangxi")} />
              <ProvinceTile key="fujian" id="fujian" data={provinceData.fujian} selected={selectedProvince === "fujian"} onClick={() => setSelectedProvince("fujian")} />
              <ProvinceTile key="zhejiang" id="zhejiang" data={provinceData.zhejiang} selected={selectedProvince === "zhejiang"} onClick={() => setSelectedProvince("zhejiang")} />
              <ProvinceTile key="jiangsu" id="jiangsu" data={provinceData.jiangsu} selected={selectedProvince === "jiangsu"} onClick={() => setSelectedProvince("jiangsu")} />
              <ProvinceTile key="shanghai" id="shanghai" data={provinceData.shanghai} selected={selectedProvince === "shanghai"} onClick={() => setSelectedProvince("shanghai")} />

              {/* 第5行：广东、海南、山东、辽宁、吉林 */}
              <div className="col-span-2" />
              <ProvinceTile key="guangdong" id="guangdong" data={provinceData.guangdong} selected={selectedProvince === "guangdong"} onClick={() => setSelectedProvince("guangdong")} />
              <div className="col-span-1" />
              <ProvinceTile key="shandong" id="shandong" data={provinceData.shandong} selected={selectedProvince === "shandong"} onClick={() => setSelectedProvince("shandong")} />
              <ProvinceTile key="liaoning" id="liaoning" data={provinceData.liaoning} selected={selectedProvince === "liaoning"} onClick={() => setSelectedProvince("liaoning")} />
              <ProvinceTile key="jilin" id="jilin" data={provinceData.jilin} selected={selectedProvince === "jilin"} onClick={() => setSelectedProvince("jilin")} />

              {/* 第6行：海南 */}
              <div className="col-span-2" />
              <ProvinceTile key="hainan" id="hainan" data={provinceData.hainan} selected={selectedProvince === "hainan"} onClick={() => setSelectedProvince("hainan")} />
            </div>
          ) : (
            // 城市级网格地图
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(cityData).map(([key, city]) => (
                <button
                  key={key}
                  onClick={() => setSelectedProvince(key)}
                  className={`p-4 rounded-lg text-center transition-all hover:scale-105 ${
                    selectedProvince === key ? "ring-2 ring-[#4DD8CD]" : ""
                  }`}
                  style={{ backgroundColor: levelColors[city.level].bg + "20" }}
                >
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: levelColors[city.level].bg }}
                  />
                  <p className="text-sm font-medium text-gray-700">{city.name}</p>
                  <p className="text-xs text-gray-500">{city.providers}家机构</p>
                  <p className="text-xs text-gray-500">{city.workers}名人员</p>
                </button>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
            {Object.entries(levelColors).map(([level, config]) => (
              <div key={level} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.bg }}
                />
                <span className="text-xs text-gray-600">{config.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Selected Region Detail */}
          {selectedProvince && viewLevel === "province" && provinceData[selectedProvince] && (
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                {provinceData[selectedProvince].name}省详情
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">覆盖状态</span>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: levelColors[provinceData[selectedProvince].level].bg + "20",
                      color: levelColors[provinceData[selectedProvince].level].bg
                    }}
                  >
                    {levelColors[provinceData[selectedProvince].level].text}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">入驻机构</span>
                  <span className="text-sm font-medium">{provinceData[selectedProvince].providers}家</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">服务人员</span>
                  <span className="text-sm font-medium">{provinceData[selectedProvince].workers}人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">累计订单</span>
                  <span className="text-sm font-medium">{provinceData[selectedProvince].orders}单</span>
                </div>
              </div>
              {provinceData[selectedProvince].level === "none" && (
                <button className="w-full mt-4 py-2 bg-[#4DD8CD] text-white rounded-lg text-sm font-medium">
                  发起招商任务
                </button>
              )}
            </div>
          )}

          {/* Priority Regions */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              重点突破区域
            </h4>
            <div className="space-y-2">
              {provincesByLevel.none.slice(0, 5).map(([key, province]) => (
                <div 
                  key={key}
                  className="flex items-center justify-between p-2 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100"
                  onClick={() => setSelectedProvince(key)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm text-gray-700">{province.name}</span>
                  </div>
                  <span className="text-xs text-red-500">尚未入驻</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage Improvement */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-yellow-500" />
              待加强区域
            </h4>
            <div className="space-y-2">
              {provincesByLevel.low.slice(0, 5).map(([key, province]) => (
                <div 
                  key={key}
                  className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100"
                  onClick={() => setSelectedProvince(key)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-sm text-gray-700">{province.name}</span>
                  </div>
                  <span className="text-xs text-yellow-600">{province.providers}家机构</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Regions */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-green-500" />
              覆盖良好区域
            </h4>
            <div className="space-y-2">
              {provincesByLevel.high.map(([key, province]) => (
                <div 
                  key={key}
                  className="flex items-center justify-between p-2 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100"
                  onClick={() => setSelectedProvince(key)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-700">{province.name}</span>
                  </div>
                  <span className="text-xs text-green-600">{province.providers}家机构</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
