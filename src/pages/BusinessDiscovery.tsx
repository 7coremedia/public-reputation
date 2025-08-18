import { useState } from "react"
import { Search, Filter, MapPin, List, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BusinessCard } from "@/components/ui/business-card"
import { CategoryGrid } from "@/components/category-grid"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { useBusinesses } from "@/hooks/useBusinesses"
import { useCategories } from "@/hooks/useCategories"
import useOpinions from "@/hooks/useOpinions" // Ensure default import

// Helper functions
const calculateTrustScore = (opinions: any[]) => {
  if (opinions.length === 0) return 50
  
  const avgRating = opinions.reduce((sum, op) => sum + (op.rating || 3), 0) / opinions.length
  const complaintPenalty = opinions.filter(op => op.type === 'complaint').length * 5
  const praiseBonus = opinions.filter(op => op.type === 'praise').length * 5
  
  return Math.max(10, Math.min(100, (avgRating / 5) * 100 + praiseBonus - complaintPenalty))
}

const getTrustLevel = (trustScore: number, isVerified: boolean) => {
  if (!isVerified) return 'pending' as const
  if (trustScore >= 80) return 'verified' as const
  return 'verified' as const
}

export default function BusinessDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const navigate = useNavigate()
  
  const { businesses, loading: businessesLoading, searchBusinesses } = useBusinesses()
  const { categories, loading: categoriesLoading } = useCategories()
  const { opinions } = useOpinions()

  // Group opinions by business for calculations
  const opinionsByBusiness = opinions.reduce((acc, opinion) => {
    if (!acc[opinion.business_id]) acc[opinion.business_id] = []
    acc[opinion.business_id].push(opinion)
    return acc
  }, {} as Record<string, any[]>)

  const filteredBusinesses = businesses
    .filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           business.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || business.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .map(business => {
      const businessOpinions = opinionsByBusiness[business.id] || []
      const trustScore = calculateTrustScore(businessOpinions)
      const avgRating = businessOpinions.length > 0 
        ? businessOpinions.reduce((sum, op) => sum + (op.rating || 3), 0) / businessOpinions.length 
        : undefined
      
      return {
        ...business,
        trustScore,
        trustLevel: getTrustLevel(trustScore, business.is_verified),
        rating: avgRating,
        reviewCount: businessOpinions.length,
        location: business.city || 'Unknown'
      }
    })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    searchBusinesses(query, selectedCategory === "all" ? undefined : selectedCategory)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/10">
        <div />
        <Button variant="ghost" size="sm" className="text-primary">
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search businesses or categories..."
              className="pl-10 bg-muted border-0 rounded-2xl h-12"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button 
            variant="secondary" 
            size="icon"
            className="h-12 w-12 rounded-2xl"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-4 mb-6">
        <div className="flex rounded-2xl bg-muted p-1">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            className={cn(
              "flex-1 rounded-xl",
              viewMode === "list" && "bg-background shadow-sm"
            )}
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "ghost"}
            size="sm"
            className={cn(
              "flex-1 rounded-xl",
              viewMode === "map" && "bg-background shadow-sm"
            )}
            onClick={() => setViewMode("map")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Map
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {viewMode === "list" ? (
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Categories</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary"
                  onClick={() => setSelectedCategory("all")}
                >
                  View All
                </Button>
              </div>
              
              <CategoryGrid
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                loading={categoriesLoading}
              />
            </div>

            {/* Business Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {selectedCategory === "all" ? "All Businesses" : selectedCategory}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({filteredBusinesses.length})
                  </span>
                </h2>
              </div>
              
              <div className="space-y-4">
                {businessesLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading businesses...</p>
                  </div>
                ) : filteredBusinesses.length > 0 ? (
                  filteredBusinesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      name={business.name}
                      category={business.category}
                      trustScore={business.trustScore}
                      trustLevel={business.trustLevel}
                      rating={business.rating}
                      reviewCount={business.reviewCount}
                      image={business.image_url || "/placeholder.svg"}
                      isVerified={business.is_verified}
                      onClick={() => navigate(`/business/${business.id}`)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No businesses found</p>
                    <Button 
                      className="mt-4" 
                      variant="outline"
                      onClick={() => navigate("/submit-opinion")}
                    >
                      Be the first to report a business
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
            <p className="text-muted-foreground">Map view coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}