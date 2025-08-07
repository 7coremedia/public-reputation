import { useState } from "react"
import { MobileHeader } from "@/components/ui/mobile-header"
import { SearchBar } from "@/components/search-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BusinessCard } from "@/components/ui/business-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  MapPin, 
  List, 
  Users, 
  Clock,
  TrendingUp,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  Car,
  Heart,
  Home,
  Briefcase,
  GraduationCap,
  Smartphone
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useBusinesses } from "@/hooks/useBusinesses"
import { useCategories } from "@/hooks/useCategories"
import { useOpinions } from "@/hooks/useOpinions"

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'UtensilsCrossed': UtensilsCrossed,
  'ShoppingBag': ShoppingBag,
  'Car': Car,
  'Heart': Heart,
  'Home': Home,
  'Briefcase': Briefcase,
  'GraduationCap': GraduationCap,
  'Smartphone': Smartphone,
  'CreditCard': Briefcase,
  'Plane': MapPin,
  'Sparkles': Heart,
  'Zap': Smartphone
};

// Helper functions (same as Home page)
const calculateTrustScore = (opinions: any[]) => {
  if (opinions.length === 0) return 50;
  
  const avgRating = opinions.reduce((sum, op) => sum + (op.rating || 3), 0) / opinions.length;
  const complaintPenalty = opinions.filter(op => op.type === 'complaint').length * 5;
  const praiseBonus = opinions.filter(op => op.type === 'praise').length * 5;
  
  return Math.max(10, Math.min(100, (avgRating / 5) * 100 + praiseBonus - complaintPenalty));
};

const getTrustLevel = (trustScore: number, isVerified: boolean) => {
  if (!isVerified) return 'pending' as const;
  if (trustScore >= 80) return 'verified' as const;
  return 'verified' as const; // Only pending or verified for now
};

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
    if (!acc[opinion.business_id]) acc[opinion.business_id] = [];
    acc[opinion.business_id].push(opinion);
    return acc;
  }, {} as Record<string, any[]>);

  // Get trending cases from recent opinions
  const trendingCases = opinions
    .filter(op => op.type === 'complaint' && op.status === 'under_review')
    .slice(0, 3)
    .map(op => ({
      id: op.id,
      name: op.business?.name || 'Unknown Business',
      category: op.business?.category || 'Unknown',
      issue: op.title,
      status: op.status,
      participants: Math.floor(Math.random() * 25) + 5, // Mock participant count
      timeAgo: new Date(op.created_at).toLocaleDateString()
    }));

  const filteredBusinesses = businesses
    .filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           business.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || business.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .map(business => {
      const businessOpinions = opinionsByBusiness[business.id] || [];
      const trustScore = calculateTrustScore(businessOpinions);
      const avgRating = businessOpinions.length > 0 
        ? businessOpinions.reduce((sum, op) => sum + (op.rating || 3), 0) / businessOpinions.length 
        : undefined;
      
      return {
        ...business,
        trustScore,
        trustLevel: getTrustLevel(trustScore, business.is_verified),
        rating: avgRating,
        reviewCount: businessOpinions.length,
        location: business.city || 'Unknown'
      };
    });

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchBusinesses(query, selectedCategory === "all" ? undefined : selectedCategory);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="centered-container">
        <MobileHeader />

        {/* Search */}
        <SearchBar 
          placeholder="Search businesses or categories..."
          onSearch={handleSearch}
        />

        {/* View Toggle */}
        <div className="px-4 mb-6">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "map")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Map
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="list" className="mt-0">
          <div className="space-y-6">
            {/* Categories Grid */}
            <div className="px-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="expressive-subheading">Categories</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary"
                  onClick={() => setSelectedCategory("all")}
                >
                  View All
                </Button>
              </div>
              
              {categoriesLoading ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Loading categories...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => {
                    const IconComponent = categoryIcons[category.icon || 'Store'] || Store
                    return (
                      <Card 
                        key={category.id}
                        className={cn(
                          "p-4 cursor-pointer transition-all hover:elevated-shadow",
                          selectedCategory === category.name && "ring-2 ring-primary"
                        )}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        <CardContent className="p-0 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm text-card-foreground">{category.name}</h3>
                            <p className="text-xs text-muted-foreground">{category.business_count} businesses</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Trending Cases */}
            {trendingCases.length > 0 && (
              <div className="px-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="expressive-subheading flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Cases
                  </h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {trendingCases.map((case_) => (
                    <Card key={case_.id} className="cursor-pointer hover:elevated-shadow transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-sm">{case_.name}</h4>
                              <Badge variant="destructive" className="text-xs">
                                Active
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{case_.issue}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{case_.category}</span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {case_.participants}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {case_.timeAgo}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Business Results */}
            <div className="flex-1 px-4 space-y-4 pb-20">
              <div className="flex items-center justify-between">
                <h2 className="expressive-subheading">
                  {selectedCategory === "all" ? "All Businesses" : selectedCategory}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({filteredBusinesses.length})
                  </span>
                </h2>
              </div>
              
              <div className="grid gap-4">
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
        </TabsContent>

        <TabsContent value="map" className="mt-0">
          <div className="px-4 pb-20">
            <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Map view coming soon</p>
            </div>
          </div>
        </TabsContent>
      </div>
    </div>
  )
}