import { ArrowLeft, Star, MessageCircle, Share, Flag, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrustScore } from "@/components/ui/trust-score"
import { TrustBadge } from "@/components/ui/trust-badge"
import { Card } from "@/components/ui/card"

// Mock business data matching the design
const mockBusiness = {
  name: "Reflection Beauty Clinic",
  category: "Skincare",
  trustScore: 85,
  trustLevel: "verified" as const,
  rating: 4.5,
  reviewCount: 75,
  location: "Victoria Island, Lagos",
  description: "Professional skincare treatments and beauty services",
  images: [
    "/placeholder.svg",
    "/placeholder.svg", 
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  verified: true,
  responseTime: "2 hours",
  resolutionRate: 89
}

const mockOpinions = [
  {
    id: 1,
    type: "complaint",
    author: "Anonymous",
    content: "Poor service delivery, didn't get what I ordered",
    status: "resolved",
    daysAgo: 3,
    emoji: "😞"
  },
  {
    id: 2,
    type: "praise", 
    author: "Sarah M.",
    content: "Excellent service! Very professional staff",
    status: "public",
    daysAgo: 5,
    emoji: "🤩"
  }
]

export default function BusinessProfile() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-background z-50">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Flag className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Business Header */}
        <div className="px-4 pb-6">
          <div className="flex items-start gap-4 mb-4">
            <img 
              src={mockBusiness.images[0]} 
              alt={mockBusiness.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{mockBusiness.name}</h1>
                {mockBusiness.verified && <CheckCircle className="w-5 h-5 text-status-verified" />}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{mockBusiness.category}</p>
              <TrustBadge level={mockBusiness.trustLevel} />
            </div>
            <TrustScore score={mockBusiness.trustScore} size="lg" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{mockBusiness.rating}/5</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{mockBusiness.reviewCount} reviews</span>
            </div>
            <span>•</span>
            <span>Resolution: {mockBusiness.resolutionRate}%</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4">{mockBusiness.description}</p>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {mockBusiness.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${mockBusiness.name} ${index + 1}`}
                className="aspect-square rounded-xl object-cover"
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90">
              Share Opinion
            </Button>
            <Button variant="outline" className="h-12 rounded-2xl">
              File Complaint
            </Button>
          </div>
        </div>

        {/* Opinions Section */}
        <div className="px-4 pb-20">
          <h3 className="text-lg font-semibold mb-4">Recent Opinions</h3>
          <div className="space-y-4">
            {mockOpinions.map((opinion) => (
              <Card key={opinion.id} className="p-4 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{opinion.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{opinion.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {opinion.daysAgo} days ago
                      </span>
                      {opinion.status === "resolved" && (
                        <span className="text-xs bg-status-verified text-white px-2 py-1 rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{opinion.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}