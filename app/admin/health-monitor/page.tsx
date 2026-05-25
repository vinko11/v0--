"use client"

import { useState } from "react"
import { Eye, X, Download, TrendingUp, TrendingDown } from "lucide-react"

// 模拟慢病监测数据
const healthData = [
  { id: "H001", orderId: "QL202401200001", user: "张三", project: "血压监测", status: "正常", time: "2024-01-20", data: { systolic: [120, 118, 122, 119, 121, 120, 118], diastolic: [80, 78, 82, 79, 81, 80, 79] } },
  { id: "H002", orderId: "QL202401190002", user: "王阿姨", project: "血糖监测", status: "偏高", time: "2024-01-19", data: { fasting: [5.8, 6.2, 6.0, 6.5, 6.3, 6.8, 7.0], postprandial: [8.5, 9.0, 8.8, 9.2, 9.5, 9.8, 10.0] } },
  { id: "H003", orderId: "QL202401180003", user: "李先生", project: "心率监测", status: "正常", time: "2024-01-18", data: { heartRate: [72, 75, 70, 73, 71, 74, 72] } },
  { id: "H004", orderId: "QL202401170004", user: "陈女士", project: "血压监测", status: "偏低", time: "2024-01-17", data: { systolic: [100, 98, 102, 99, 101, 100, 98], diastolic: [65, 63, 67, 64, 66, 65, 64] } },
]

export default function HealthMonitorPage() {
  const [selectedRecord, setSelectedRecord] = useState<typeof healthData[0] | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleExport = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "正常": return "bg-green-100 text-green-600"
      case "偏高": return "bg-red-100 text-red-600"
      case "偏低": return "bg-yellow-100 text-yellow-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  // 简单的折线图组件
  const SimpleChart = ({ data, label, color }: { data: number[], label: string, color: string }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center gap-1 text-xs">
            {data[data.length - 1] > data[0] ? (
              <>
                <TrendingUp className="w-3 h-3 text-red-500" />
                <span className="text-red-500">上升</span>
              </>
            ) : data[data.length - 1] < data[0] ? (
              <>
                <TrendingDown className="w-3 h-3 text-green-500" />
                <span className="text-green-500">下降</span>
              </>
            ) : (
              <span className="text-gray-500">稳定</span>
            )}
          </div>
        </div>
        <div className="h-32 flex items-end gap-2">
          {data.map((value, index) => {
            const height = ((value - min) / range) * 80 + 20
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{value}</span>
                <div
                  className="w-full rounded-t"
                  style={{ height: `${height}%`, backgroundColor: color }}
                />
                <span className="text-xs text-gray-400">{days[index]}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">慢病监测</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90"
        >
          <Download className="w-4 h-4" />
          导出报告
        </button>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">订单号</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">用户</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">检测项目</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">状态</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">监测日期</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {healthData.map((record) => (
                <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-mono text-xs">{record.orderId}</td>
                  <td className="py-3 px-4 text-gray-600">{record.user}</td>
                  <td className="py-3 px-4 text-gray-600">{record.project}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{record.time}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="text-[#4DD8CD] hover:underline"
                    >
                      <Eye className="w-4 h-4 inline" /> 详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情侧栏 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">监测详情</h2>
              <button onClick={() => setSelectedRecord(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">用户</p>
                  <p className="font-medium">{selectedRecord.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">检测项目</p>
                  <p className="font-medium">{selectedRecord.project}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">监测状态</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs ${getStatusColor(selectedRecord.status)}`}>
                    {selectedRecord.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">监测日期</p>
                  <p className="font-medium">{selectedRecord.time}</p>
                </div>
              </div>

              {/* 图表 */}
              <div className="space-y-4 pt-4">
                <h3 className="font-medium text-gray-900">近7天数据趋势</h3>
                {selectedRecord.data.systolic && (
                  <>
                    <SimpleChart data={selectedRecord.data.systolic} label="收缩压 (mmHg)" color="#4DD8CD" />
                    <SimpleChart data={selectedRecord.data.diastolic} label="舒张压 (mmHg)" color="#71F2DC" />
                  </>
                )}
                {selectedRecord.data.fasting && (
                  <>
                    <SimpleChart data={selectedRecord.data.fasting} label="空腹血糖 (mmol/L)" color="#4DD8CD" />
                    <SimpleChart data={selectedRecord.data.postprandial} label="餐后血糖 (mmol/L)" color="#71F2DC" />
                  </>
                )}
                {selectedRecord.data.heartRate && (
                  <SimpleChart data={selectedRecord.data.heartRate} label="心率 (次/分)" color="#4DD8CD" />
                )}
              </div>

              <button
                onClick={handleExport}
                className="w-full py-2 bg-[#4DD8CD] text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                导出此用户报告
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
          导出成功！文件已下载
        </div>
      )}
    </div>
  )
}
