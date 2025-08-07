import { useState } from "react"
import { MobileHeader } from "@/components/ui/mobile-header"
import { useAuth } from "@/hooks/useAuth"
import { SearchBar } from "@/components/search-bar"
import { BusinessCard } from "@/components/ui/business-card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useBusinesses } from "@/hooks/useBusinesses"
import { useOpinions } from "@/hooks/useOpinions"

// Helper function to calculate trust score based on opinions
const calculateTrustScore = (opinions: any[]) => {
  if (opinions.length === 0) return 50; // Default score
  
  const avgRating = opinions.reduce((sum, op) => sum + (op.rating || 3), 0) / opinions.length;
  const complaintPenalty = opinions.filter(op => op.type === 'complaint').length * 5;
  const praiseBonus = opinions.filter(op => op.type === 'praise').length * 5;
  
  return Math.max(10, Math.min(100, (avgRating / 5) * 100 + praiseBonus - complaintPenalty));
};

// Helper function to determine trust level
const getTrustLevel = (trustScore: number, isVerified: boolean) => {
  if (!isVerified) return 'pending' as const;
  if (trustScore >= 80) return 'verified' as const;
  return 'verified' as const; // Only pending or verified for now
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { user } = useAuth()
  const { businesses, loading: businessesLoading } = useBusinesses()
  const { opinions } = useOpinions()

  // Group opinions by business for calculations
  const opinionsByBusiness = opinions.reduce((acc, opinion) => {
    if (!acc[opinion.business_id]) acc[opinion.business_id] = [];
    acc[opinion.business_id].push(opinion);
    return acc;
  }, {} as Record<string, any[]>);

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(business => {
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
    };
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="centered-container">
        {/* Header */}
        <MobileHeader 
          useTypingAnimation={true}
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
                  Be the first to report this business
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}