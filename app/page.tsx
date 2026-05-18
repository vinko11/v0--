"use client"

import { useState } from "react"
import HomePage from "@/components/home-page"
import CategoryPage from "@/components/category-page"
import PostPage from "@/components/post-page"
import ProfilePage from "@/components/profile-page"
import TabBar from "@/components/tab-bar"
import ProductDetailPage from "@/components/product-detail-page"
import WorkerDetailPage from "@/components/worker-detail-page"
import InstitutionDetailPage from "@/components/institution-detail-page"
import OrderPage from "@/components/order-page"
import DemandListPage from "@/components/demand-list-page"
import DemandDetailPage from "@/components/demand-detail-page"

type PageType = "home" | "category" | "post" | "profile" | "product-detail" | "worker-detail" | "institution-detail" | "order" | "demand-list" | "demand-detail"

export default function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedWorker, setSelectedWorker] = useState<any>(null)
  const [selectedInstitution, setSelectedInstitution] = useState<any>(null)
  const [selectedDemand, setSelectedDemand] = useState<any>(null)
  const [orderItem, setOrderItem] = useState<any>(null)
  const [initialCategory, setInitialCategory] = useState<string>("")

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setCurrentPage("product-detail")
  }

  const handleWorkerClick = (worker: any) => {
    setSelectedWorker(worker)
    setCurrentPage("worker-detail")
  }

  const handleInstitutionClick = (institution: any) => {
    setSelectedInstitution(institution)
    setCurrentPage("institution-detail")
  }

  // 金刚区点击 -> 跳转到分类页并选中对应分类
  const handleServiceClick = (serviceId: string) => {
    if (serviceId === "more") {
      setInitialCategory("")
    } else {
      setInitialCategory(serviceId)
    }
    setActiveTab("category")
    setCurrentPage("category")
  }

  const handleOrder = (item: any) => {
    setOrderItem({
      name: item.name,
      price: item.price,
      image: item.image,
      type: "product",
    })
    setCurrentPage("order")
  }

  const handleBack = () => {
    setCurrentPage(activeTab as PageType)
  }

  const handleOrderComplete = () => {
    setCurrentPage("home")
    setActiveTab("home")
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // 如果点击"发布"tab，显示需求列表页
    if (tab === "post") {
      setCurrentPage("demand-list")
    } else {
      setCurrentPage(tab as PageType)
    }
    if (tab !== "category") {
      setInitialCategory("")
    }
  }

  const handleCategoryBack = () => {
    setCurrentPage("home")
    setActiveTab("home")
    setInitialCategory("")
  }

  // 需求相关导航
  const handleDemandClick = (demand: any) => {
    setSelectedDemand(demand)
    setCurrentPage("demand-detail")
  }

  const handleNewDemand = () => {
    setCurrentPage("post")
  }

  const handleDemandBack = () => {
    setCurrentPage("demand-list")
  }

  const handlePostBack = () => {
    setCurrentPage("demand-list")
  }

  const handlePostSubmit = () => {
    setCurrentPage("demand-list")
  }

  // Check if we should show TabBar
  const showTabBar = ["home", "category", "demand-list", "profile"].includes(currentPage)

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative">
      {/* Main Pages */}
      {currentPage === "home" && (
        <HomePage
          onProductClick={handleProductClick}
          onWorkerClick={handleWorkerClick}
          onInstitutionClick={handleInstitutionClick}
          onServiceClick={handleServiceClick}
        />
      )}
      {currentPage === "category" && (
        <CategoryPage
          onProductClick={handleProductClick}
          onBack={initialCategory ? handleCategoryBack : undefined}
          initialCategory={initialCategory}
        />
      )}
      {currentPage === "demand-list" && (
        <DemandListPage
          onDemandClick={handleDemandClick}
          onNewDemand={handleNewDemand}
        />
      )}
      {currentPage === "demand-detail" && (
        <DemandDetailPage
          demand={selectedDemand}
          onBack={handleDemandBack}
        />
      )}
      {currentPage === "post" && (
        <PostPage
          onBack={handlePostBack}
          onSubmit={handlePostSubmit}
        />
      )}
      {currentPage === "profile" && <ProfilePage />}

      {/* Detail Pages */}
      {currentPage === "product-detail" && (
        <ProductDetailPage
          onBack={handleBack}
          onOrder={handleOrder}
          product={selectedProduct}
        />
      )}
      {currentPage === "worker-detail" && (
        <WorkerDetailPage
          onBack={handleBack}
          onOrder={handleOrder}
          worker={selectedWorker}
        />
      )}
      {currentPage === "institution-detail" && (
        <InstitutionDetailPage
          onBack={handleBack}
          onOrder={handleOrder}
          institution={selectedInstitution}
        />
      )}

      {/* Order Page */}
      {currentPage === "order" && (
        <OrderPage
          onBack={handleBack}
          onComplete={handleOrderComplete}
          orderItem={orderItem}
        />
      )}

      {/* Tab Bar - only show on main pages */}
      {showTabBar && <TabBar activeTab={activeTab} onTabChange={handleTabChange} />}
    </div>
  )
}
