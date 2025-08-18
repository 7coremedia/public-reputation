import { ArrowLeft, Star, MessageCircle, Share, Flag, CheckCircle, Clock, TrendingUp, MapPin, Phone, Mail, Globe, Shield, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/trust-score";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentSection } from "@/components/ui/comment-section";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useBusinesses } from "@/hooks/useBusinesses";
import useOpinions from "@/hooks/useOpinions"; // Corrected import for useOpinions

export default function BusinessProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { businesses } = useBusinesses();
  const { opinions } = useOpinions();
  
  const [activeTab, setActiveTab] = useState("overview");

  const business = businesses.find(b => b.id === id);
  const businessOpinions = opinions.filter(o => o.business_id === id);

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Business not found.</p>
      </div>
    );
  }

  // MOCK DATA for display purposes until fully dynamic
  const mockBusinessDetails = {
    rating: 4.5,
    reviewCount: businessOpinions.length,
    location: business.address || "Location not available",
    description: business.description || "No description provided.",
    images: [business.image_url || "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    responseTime: "2 hours",
    resolutionRate: 89,
    totalCases: 156,
    resolvedCases: 139,
    pendingCases: 12,
    ignoredCases: 5,
    verifiedDetails: {
      cacNumber: "RC123456789",
      whatsappBusiness: business.phone || "Not available",
      website: business.website || "Not available",
      address: business.address || "Not available"
    },
  };

  const getTrustLevelText = (score: number) => {
    if (score >= 80) return "Great";
    if (score >= 60) return "Good";
    if (score >= 40) return "Okay";
    if (score >= 20) return "Poor";
    return "Bad";
  };
  
  // MOCK comments - Added isEdited and isFlagged to match Comment interface
  const mockComments = [{
    id: "1",
    author: { id: "user1", name: "Sarah M.", avatar: "/placeholder.svg", isVerified: true, badges:[], isModerator: false },
    content: "Great service!",
    timestamp: "2hr ago",
    reactions: { agree: 12, disagree: 1, hmm: 0, suspicious: 0, true: 8, cap: 0},
    replies: [],
    isEdited: false, // Added missing property
    isFlagged: false, // Added missing property
  }];

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container">
        <div className="flex items-center justify-between p-4 sticky top-0 bg-background z-50">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full"><Share className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><Flag className="w-5 h-5" /></Button>
          </div>
        </div>

        <div className="px-4 pb-6">
          <div className="flex items-start gap-4 mb-4">
            <img src={business.image_url || "/placeholder.svg"} alt={business.name} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{business.name}</h1>
                {business.is_verified && <CheckCircle className="w-9 h-9 text-status-verified" />}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{business.category}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mb-4">
             <div className="flex items-center gap-2 justify-between">
              <div className="flex gap-2">
                  <div className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium flex items-center gap-1" title="Location Not Verified">
                  📍 <span className="text-white">Location</span>
                </div>
                <div className="px-2 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium flex items-center gap-1" title="Phone Verification Pending">
                  📞 <span className="text-white">Phone</span>
                </div>
                <div className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1" title="CAC Verified">
                  🛡️ <span className="text-white">CAC</span>
                </div>
              </div>
               <div className="flex items-center gap-1">
                <CircularProgress value={mockBusinessDetails.rating * 20} size={28} strokeWidth={2} />
                <span className="text-xs font-medium">{getTrustLevelText(mockBusinessDetails.rating * 20)}</span>
              </div>
            </div>
             <div className="flex items-center">
              <Badge variant="outline" className="text-xs max-w-full truncate">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{mockBusinessDetails.location}</span>
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card className="p-3 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{mockBusinessDetails.rating}/5</span>
              </div>
              <p className="text-xs text-muted-foreground">{mockBusinessDetails.reviewCount} reviews</p>
            </Card>
            <Card className="p-3 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-status-verified" />
                <span className="text-sm font-medium">{mockBusinessDetails.responseTime}</span>
              </div>
              <p className="text-xs text-muted-foreground">Avg. response time</p>
            </Card>
          </div>

          <Card className="p-4 rounded-xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Resolution Rate</h3>
              <span className="text-sm font-bold text-status-verified">{mockBusinessDetails.resolutionRate}%</span>
            </div>
            <Progress value={mockBusinessDetails.resolutionRate} className="mb-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{mockBusinessDetails.resolvedCases} resolved</span>
              <span>{mockBusinessDetails.pendingCases} pending</span>
            </div>
          </Card>

          <p className="text-sm text-muted-foreground mb-4">{mockBusinessDetails.description}</p>
          
          <Card className="p-4 rounded-xl mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-status-verified" />
              <h3 className="font-medium">Verified Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-status-verified" />
                <span>CAC: {mockBusinessDetails.verifiedDetails.cacNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{mockBusinessDetails.verifiedDetails.whatsappBusiness}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span>{mockBusinessDetails.verifiedDetails.website}</span>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90" onClick={() => navigate("/submit-opinion", { state: { initialStep: "addOpinion", initialBusinessId: business.id }})}>
              Share Opinion
            </Button>
            <Button variant="outline" className="h-12 rounded-2xl" onClick={() => navigate("/submit-opinion", { state: { initialStep: "addOpinion", initialBusinessId: business.id }})}>
              File Complaint
            </Button>
          </div>
        </div>

        <div className="px-4 pb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="opinions">Opinions ({businessOpinions.length})</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="appeals">Appeals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {businessOpinions.slice(0, 2).map(opinion => <OpinionCard key={opinion.id} opinion={opinion} />)}
            </TabsContent>
            
            <TabsContent value="opinions" className="space-y-4">
              {businessOpinions.map(opinion => <OpinionCard key={opinion.id} opinion={opinion} />)}
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-4">
              <CommentSection opinionId="opinion-1" comments={mockComments} onAddComment={() => {}} onReact={() => {}} onReply={() => {}} onFlag={() => {}} />
            </TabsContent>
            
            <TabsContent value="appeals" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No public appeals for this business.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function OpinionCard({ opinion }: { opinion: any; }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-status-verified text-white";
      case "pending": return "bg-status-pending text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };
  return (
    <Card className="p-4 rounded-2xl">
      <div className="flex items-start gap-3">
        <div className="text-2xl">
          {opinion.type === 'praise' ? '🤩' : '😞'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{opinion.is_anonymous ? "Anonymous" : "User"}</span>
            <Badge className={`text-xs ${getStatusColor(opinion.status)}`}>
              {opinion.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{opinion.opinion_text}</p>
        </div>
      </div>
    </Card>
  );
}