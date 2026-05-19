"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mock 登录验证
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin_logged_in", "true")
      router.push("/admin")
    } else {
      setError("账号或密码错误（提示：admin / admin123）")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4DD8CD]/20 to-[#71F2DC]/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#4DD8CD]">青蓝养老</h1>
            <p className="text-gray-500 mt-2">管理后台</p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                账号
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入管理员账号"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50 focus:border-[#4DD8CD]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DD8CD]/50 focus:border-[#4DD8CD] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4DD8CD] to-[#71F2DC] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              登录
            </button>
          </form>

          {/* 提示 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              演示账号：admin / admin123
            </p>
          </div>
        </div>

        {/* 返回C端 */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-500 hover:text-[#4DD8CD]">
            返回用户端
          </a>
        </div>
      </div>
    </div>
  )
}
