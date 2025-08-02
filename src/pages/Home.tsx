import { useState } from "react"
import { MobileHeader } from "@/components/ui/mobile-header"
import { SearchBar } from "@/components/search-bar"
import { BusinessCard } from "@/components/ui/business-card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock data matching the design
const mockBusinesses = [
  {
    id: 1,
    name: "Reflection Beauty Clinic",
    category: "Skincare",
    trustScore: 85,
    trustLevel: "verified" as const,
    rating: 4.5,
    reviewCount: 75,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Mary's Kitchen & Catering",
    category: "Food & Restaurant",
    trustScore: 72,
    trustLevel: "verified" as const,
    rating: 4.2,
    reviewCount: 45,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "72 Wears",
    category: "Fashion",
    trustScore: 91,
    trustLevel: "verified" as const,
    rating: 4.8,
    reviewCount: 120,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "The Tiny Needle",
    category: "Tailoring",
    trustScore: 67,
    trustLevel: "pending" as const,
    rating: 4.0,
    reviewCount: 28,
    image: "/placeholder.svg"
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const filteredBusinesses = mockBusinesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="centered-container">
        {/* Header */}
        <MobileHeader 
          title="Verify Business Trust"
          showSearch={true}
          showMenu={true}
          onMenu={() => navigate("/account")}
        />

        {/* Search */}
        <SearchBar 
          placeholder="Enter business name or search to report..."
          onSearch={setSearchQuery}
        />

        {/* Quick Actions */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="h-12 rounded-2xl flex items-center gap-2 text-sm"
              onClick={() => navigate("/discover")}
            >
              <TrendingUp className="w-4 h-4" />
              Trending
            </Button>
            <Button 
              variant="outline" 
              className="h-12 rounded-2xl flex items-center gap-2 text-sm"
              onClick={() => navigate("/discover")}
            >
              <MapPin className="w-4 h-4" />
              Near Me
            </Button>
            <Button 
              className="h-12 rounded-2xl flex items-center gap-2 text-sm bg-primary hover:bg-primary/90"
              onClick={() => navigate("/submit-opinion")}
            >
              <Plus className="w-4 h-4" />
              Report
            </Button>
          </div>
        </div>

        {/* Business Grid */}
        <div className="flex-1 px-4 space-y-4 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="expressive-subheading">Recent Businesses</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => navigate("/discover")}
            >
              View All
            </Button>
          </div>
          
          <div className="grid gap-4">
            {filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                name={business.name}
                category={business.category}
                trustScore={business.trustScore}
                trustLevel={business.trustLevel}
                rating={business.rating}
                reviewCount={business.reviewCount}
                image={business.image}
                onClick={() => navigate(`/business/${business.id}`)}
              />
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No businesses found</p>
              <Button 
                className="mt-4" 
                variant="outline"
                onClick={() => navigate("/submit-opinion")}
              >
                Be the first to report this business
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}