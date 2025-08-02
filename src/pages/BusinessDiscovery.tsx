import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileHeader } from "@/components/ui/mobile-header"
import { SearchBar } from "@/components/search-bar"
import { BusinessCard } from "@/components/ui/business-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Filter, 
  Map,
  Store,
  Car,
  Utensils,
  Scissors,
  Heart,
  ShoppingBag,
  Zap
} from "lucide-react"

// Mock data
const categories = [
  { id: "fashion", name: "Fashion Vendors", icon: ShoppingBag, count: 156 },
  { id: "pos", name: "POS Agents", icon: Zap, count: 89 },
  { id: "logistics", name: "Logistics", icon: Car, count: 67 },
  { id: "food", name: "Food & Restaurant", icon: Utensils, count: 234 },
  { id: "beauty", name: "Beauty & Health", icon: Heart, count: 123 },
  { id: "tailoring", name: "Tailoring", icon: Scissors, count: 45 },
]

const trendingCases = [
  {
    id: 1,
    businessName: "QuickMart Express",
    category: "POS Agents",
    issue: "Failed to process withdrawal",
    status: "active",
    participants: 23,
    timeAgo: "2 hours ago"
  },
  {
    id: 2,
    businessName: "Fashion Hub Lagos",
    category: "Fashion Vendors",
    issue: "Delivered wrong size",
    status: "resolved",
    participants: 15,
    timeAgo: "1 day ago"
  },
  {
    id: 3,
    businessName: "Speedy Logistics",
    category: "Logistics",
    issue: "Package lost in transit",
    status: "active",
    participants: 8,
    timeAgo: "3 hours ago"
  }
]

const mockBusinesses = [
  {
    id: 1,
    name: "Reflection Beauty Clinic",
    category: "Beauty & Health",
    trustScore: 85,
    trustLevel: "verified" as const,
    rating: 4.5,
    reviewCount: 75,
    image: "/placeholder.svg",
    location: "Victoria Island, Lagos"
  },
  {
    id: 2,
    name: "Mary's Kitchen & Catering",
    category: "Food & Restaurant",
    trustScore: 72,
    trustLevel: "verified" as const,
    rating: 4.2,
    reviewCount: 45,
    image: "/placeholder.svg",
    location: "Ikeja, Lagos"
  },
  {
    id: 3,
    name: "72 Wears",
    category: "Fashion Vendors",
    trustScore: 91,
    trustLevel: "verified" as const,
    rating: 4.8,
    reviewCount: 120,
    image: "/placeholder.svg",
    location: "Lekki, Lagos"
  }
]

export default function BusinessDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || business.category.toLowerCase().includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="centered-container">
        <MobileHeader 
          title="Discover Businesses"
          showBack={true}
          showSearch={false}
          showMenu={true}
          onBack={() => window.history.back()}
        />

        <div className="flex-1 px-4 space-y-6">
          {/* Search Bar */}
          <SearchBar 
            placeholder="Search businesses, categories, or locations..."
            onSearch={setSearchQuery}
          />

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "map")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  List
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Map
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="expressive-subheading">Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all ${
                      selectedCategory === category.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.count} businesses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Trending Cases */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="expressive-subheading flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Cases
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {trendingCases.map((case_) => (
                <Card key={case_.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-sm">{case_.businessName}</h4>
                          <Badge 
                            variant={case_.status === "active" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {case_.status === "active" ? "Active" : "Resolved"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{case_.issue}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{case_.category}</span>
                          <span>{case_.participants} participants</span>
                          <span>{case_.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Business Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="expressive-subheading">Businesses</h3>
              <span className="text-sm text-muted-foreground">
                {filteredBusinesses.length} results
              </span>
            </div>
            
            <div className="space-y-4">
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
                  onClick={() => console.log(`Navigate to ${business.name}`)}
                />
              ))}

              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No businesses found</p>
                  <Button variant="outline">
                    Be the first to report this business
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 