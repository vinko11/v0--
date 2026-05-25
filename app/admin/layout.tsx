"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, Users, Package, ShoppingCart, FileText, UserCheck, Building2, 
  ClipboardCheck, Bell, Ticket, ShoppingBag, Activity, Home, LogOut, ChevronRight,
  Menu, X, Map
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "工作台", href: "/admin", badge: null },
  { icon: Users, label: "用户管理", href: "/admin/users", badge: null },
  { icon: Package, label: "服务商品", href: "/admin/products", badge: null },
  { icon: ShoppingCart, label: "订单管理", href: "/admin/orders", badge: "8" },
  { icon: FileText, label: "需求发布审核", href: "/admin/demands", badge: "12" },
  { icon: UserCheck, label: "服务人员", href: "/admin/workers", badge: null },
  { icon: Building2, label: "服务商/机构", href: "/admin/providers", badge: null },
  { icon: ClipboardCheck, label: "入驻审核", href: "/admin/applications", badge: "5" },
  { icon: Map, label: "入驻地图", href: "/admin/provider-map", badge: null },
  { divider: true, label: "运营管理" },
  { icon: Bell, label: "公告管理", href: "/admin/announcements", badge: null },
  { icon: Ticket, label: "优惠券/活动", href: "/admin/coupons", badge: null },
  { icon: ShoppingBag, label: "购物车优惠", href: "/admin/cart-promos", badge: null },
  { icon: Activity, label: "慢病监测", href: "/admin/health-monitor", badge: null },
  { icon: Home, label: "首页运营", href: "/admin/home-config", badge: null },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const logged = localStorage.getItem("admin_logged_in")
    if (logged === "true") {
      setIsLoggedIn(true)
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    setIsLoggedIn(false)
    router.push("/admin/login")
  }

  // 登录页不显示布局
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (!isLoggedIn) {
    return null
  }

  // 生成面包屑
  const getBreadcrumb = () => {
    const item = menuItems.find(m => m.href === pathname)
    return item ? item.label : "工作台"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏 */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen && <span className="text-lg font-bold text-[#4DD8CD]">青蓝养老</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-gray-100 rounded">
            {sidebarOpen ? <X className="w-5 h-5 text-gray-500" /> : <Menu className="w-5 h-5 text-gray-500" />}
          </button>
        </div>

        {/* 菜单 */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item, index) => {
            if ('divider' in item && item.divider) {
              return sidebarOpen ? (
                <div key={index} className="px-4 py-2 mt-4">
                  <span className="text-xs font-medium text-gray-400 uppercase">{item.label}</span>
                </div>
              ) : <div key={index} className="my-2 border-t border-gray-200" />
            }

            const Icon = item.icon!
            const isActive = pathname === item.href

            return (
              <Link
                key={index}
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-[#4DD8CD]/10 text-[#4DD8CD]" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* 底部 */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">机构子账号可见：订单、人员</p>
          </div>
        )}
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶栏 */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/admin" className="hover:text-[#4DD8CD]">首页</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{getBreadcrumb()}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">超级管理员</span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500"
            >
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
