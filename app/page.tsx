"use client"

import { useState } from "react"
import HomePage from "@/components/home-page"
import CategoryPage from "@/components/category-page"
import PostPage from "@/components/post-page"
import ProfilePage from "@/components/profile-page"
import TabBar from "@/components/tab-bar"

export default function App() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative">
      {/* Page Content */}
      {activeTab === "home" && <HomePage />}
      {activeTab === "category" && <CategoryPage />}
      {activeTab === "post" && <PostPage />}
      {activeTab === "profile" && <ProfilePage />}

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
