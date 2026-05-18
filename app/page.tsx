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
import ServiceListPage from "@/components/service-list-page"
import { getServiceCategory } from "@/lib/service-data"

type PageType = "home" | "category" | "post" | "profile" | "product-detail" | "worker-detail" | "institution-detail" | "order" | "service-list"

export default function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedWorker, setSelectedWorker] = useState<any>(null)
  const [selectedInstitution, setSelectedInstitution] = useState<any>(null)
  const [orderItem, setOrderItem] = useState<any>(null)
  const [selectedServiceId, setSelectedServiceId] = useState<string>("")

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

  const handleServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId)
    setCurrentPage("service-list")
  }

  const handleServiceItemClick = (service: any) => {
    setSelectedProduct({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image,
      desc: service.desc,
      rating: service.rating,
      sold: service.sold,
      tags: service.tags,
      unit: service.unit,
    })
    setCurrentPage("product-detail")
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
    if (currentPage === "product-detail" && selectedServiceId) {
      setCurrentPage("service-list")
    } else {
      setCurrentPage(activeTab as PageType)
      setSelectedServiceId("")
    }
  }

  const handleServiceListBack = () => {
    setCurrentPage(activeTab as PageType)
    setSelectedServiceId("")
  }

  const handleOrderComplete = () => {
    setCurrentPage(activeTab as PageType)
    setSelectedServiceId("")
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(tab as PageType)
    setSelectedServiceId("")
  }

  // Check if we should show TabBar
  const showTabBar = ["home", "category", "post", "profile"].includes(currentPage)

  // Get service category data
  const serviceCategory = selectedServiceId ? getServiceCategory(selectedServiceId) : null

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
        <CategoryPage onProductClick={handleProductClick} />
      )}
      {currentPage === "post" && <PostPage />}
      {currentPage === "profile" && <ProfilePage />}

      {/* Service List Page */}
      {currentPage === "service-list" && serviceCategory && (
        <ServiceListPage
          title={serviceCategory.label}
          icon={serviceCategory.icon}
          color={serviceCategory.color}
          services={serviceCategory.services}
          onBack={handleServiceListBack}
          onServiceClick={handleServiceItemClick}
        />
      )}

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
