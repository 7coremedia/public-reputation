import { ArrowLeft, Star, MessageCircle, Share, Flag, CheckCircle, Clock, AlertTriangle, TrendingUp, MapPin, Phone, Mail, Globe, Shield, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/trust-score";
import { TrustBadge } from "@/components/ui/trust-badge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentSection } from "@/components/ui/comment-section";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Enhanced mock business data with trust system features
const mockBusiness = {
  name: "Reflection Beauty Clinic",
  category: "Skincare",
  trustScore: 85,
  trustLevel: "verified" as const,
  rating: 4.5,
  reviewCount: 75,
  location: "Victoria Island, Lagos",
  description: "Professional skincare treatments and beauty services",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  verified: true,
  responseTime: "2 hours",
  resolutionRate: 89,
  // Trust system metrics
  totalCases: 156,
  resolvedCases: 139,
  pendingCases: 12,
  ignoredCases: 5,
  averageResolutionTime: "3.2 days",
  verifiedDetails: {
    cacNumber: "RC123456789",
    whatsappBusiness: "+234 801 234 5678",
    website: "reflectionbeauty.com",
    address: "123 Victoria Island, Lagos"
  },
  trustBadges: [{
    type: "verified-cac",
    label: "🛡 Verified CAC",
    color: "bg-status-verified"
  }, {
    type: "fast-resolver",
    label: "🔥 Fast Resolver",
    color: "bg-status-verified"
  }, {
    type: "community-favorite",
    label: "⭐ Community Favorite",
    color: "bg-status-verified"
  }],
  // Resolution timeline data
  resolutionTimeline: [{
    date: "2024-01-15",
    resolved: 8,
    pending: 3
  }, {
    date: "2024-01-16",
    resolved: 12,
    pending: 2
  }, {
    date: "2024-01-17",
    resolved: 15,
    pending: 1
  }, {
    date: "2024-01-18",
    resolved: 10,
    pending: 4
  }, {
    date: "2024-01-19",
    resolved: 18,
    pending: 2
  }]
};
const mockOpinions = [{
  id: 1,
  type: "complaint",
  author: "Anonymous",
  content: "Poor service delivery, didn't get what I ordered. The staff was unprofessional and the treatment was rushed.",
  status: "resolved",
  daysAgo: 3,
  emoji: "😞",
  reactions: {
    agree: 12,
    suspicious: 2,
    true: 8,
    cap: 1
  },
  comments: 5,
  resolution: "Business contacted customer and offered full refund + free treatment"
}, {
  id: 2,
  type: "praise",
  author: "Sarah M.",
  content: "Excellent service! Very professional staff and amazing results. Will definitely recommend to friends.",
  status: "public",
  daysAgo: 5,
  emoji: "🤩",
  reactions: {
    agree: 25,
    suspicious: 0,
    true: 18,
    cap: 0
  },
  comments: 8
}, {
  id: 3,
  type: "complaint",
  author: "John D.",
  content: "Appointment was delayed by 2 hours without any explanation. Very disappointing experience.",
  status: "pending",
  daysAgo: 1,
  emoji: "😡",
  reactions: {
    agree: 6,
    suspicious: 1,
    true: 4,
    cap: 0
  },
  comments: 3
}];
export default function BusinessProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const resolutionPercentage = mockBusiness.resolvedCases / mockBusiness.totalCases * 100;

  // Mock comments data
  const mockComments = [{
    id: "1",
    author: {
      id: "user1",
      name: "Sarah M.",
      avatar: "/placeholder.svg",
      badges: ["verified", "top-helper"],
      isVerified: true,
      isModerator: false
    },
    content: "I had a similar experience with this clinic. The staff was very professional and resolved my issue quickly.",
    timestamp: "2hr ago",
    reactions: {
      agree: 12,
      disagree: 1,
      hmm: 0,
      suspicious: 0,
      true: 8,
      cap: 0
    },
    replies: [],
    isEdited: false,
    isFlagged: false
  }, {
    id: "2",
    author: {
      id: "user2",
      name: "John D.",
      avatar: "/placeholder.svg",
      badges: ["watchdog"],
      isVerified: false,
      isModerator: false
    },
    content: "I'm skeptical about this review. The business has a good track record. Can you provide more details?",
    timestamp: "1hr ago",
    reactions: {
      agree: 3,
      disagree: 0,
      hmm: 0,
      suspicious: 8,
      true: 2,
      cap: 1
    },
    replies: [{
      id: "2.1",
      author: {
        id: "user1",
        name: "Sarah M.",
        avatar: "/placeholder.svg",
        badges: ["verified"],
        isVerified: true,
        isModerator: false
      },
      content: "I can vouch for the business. They've been consistent with their service quality.",
      timestamp: "30m ago",
      reactions: {
        agree: 5,
        disagree: 0,
        hmm: 0,
        suspicious: 0,
        true: 3,
        cap: 0
      },
      replies: [],
      isEdited: false,
      isFlagged: false
    }],
    isEdited: false,
    isFlagged: false
  }];
  const handleAddComment = (content: string) => {
    console.log("Adding comment:", content);
  };
  const handleReact = (commentId: string, reaction: string) => {
    console.log("Reacting to comment:", commentId, reaction);
  };
  const handleReply = (commentId: string, content: string) => {
    console.log("Replying to comment:", commentId, content);
  };
  const handleFlag = (commentId: string, reason?: string) => {
    console.log("Flagging comment:", commentId, "Reason:", reason);
  };
  return <div className="min-h-screen bg-background">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-background z-50">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
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
            <div className="flex flex-col items-center">
              <img src={mockBusiness.images[0]} alt={mockBusiness.name} className="w-16 h-16 rounded-2xl object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{mockBusiness.name}</h1>
                {mockBusiness.verified && <CheckCircle className="w-5 h-5 text-status-verified" />}
                <TrustScore score={mockBusiness.trustScore} size="sm" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{mockBusiness.category}</p>
              
            </div>
          </div>

          {/* Trust Badges and Location - aligned with profile image */}
          <div className="flex flex-col gap-2 mb-4">
            {/* Trust Badges - ordered by verification status (red, yellow, green) */}
            <div className="flex items-center gap-2">
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
            </div>
            
            {/* Location Badge - wider and responsive */}
            <div className="flex items-center">
              <Badge variant="outline" className="text-xs max-w-full truncate">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{mockBusiness.location}</span>
              </Badge>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card className="p-3 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{mockBusiness.rating}/5</span>
              </div>
              <p className="text-xs text-muted-foreground">{mockBusiness.reviewCount} reviews</p>
            </Card>
            <Card className="p-3 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-status-verified" />
                <span className="text-sm font-medium">{mockBusiness.responseTime}</span>
              </div>
              <p className="text-xs text-muted-foreground">Avg. response time</p>
            </Card>
          </div>

          {/* Resolution Progress */}
          <Card className="p-4 rounded-xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Resolution Rate</h3>
              <span className="text-sm font-bold text-status-verified">{mockBusiness.resolutionRate}%</span>
            </div>
            <Progress value={mockBusiness.resolutionRate} className="mb-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{mockBusiness.resolvedCases} resolved</span>
              <span>{mockBusiness.pendingCases} pending</span>
              <span>{mockBusiness.ignoredCases} ignored</span>
            </div>
          </Card>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4">{mockBusiness.description}</p>

          {/* Verified Details */}
          <Card className="p-4 rounded-xl mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-status-verified" />
              <h3 className="font-medium">Verified Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-status-verified" />
                <span>CAC: {mockBusiness.verifiedDetails.cacNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{mockBusiness.verifiedDetails.whatsappBusiness}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span>{mockBusiness.verifiedDetails.website}</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90" onClick={() => navigate("/submit-opinion")}>
              Share Opinion
            </Button>
            <Button variant="outline" className="h-12 rounded-2xl" onClick={() => navigate("/submit-opinion")}>
              File Complaint
            </Button>
          </div>
        </div>

        {/* Enhanced Opinions Section with Tabs */}
        <div className="px-4 pb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="opinions">Opinions ({mockOpinions.length})</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="appeals">Appeals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {mockOpinions.slice(0, 2).map(opinion => <OpinionCard key={opinion.id} opinion={opinion} />)}
            </TabsContent>
            
            <TabsContent value="opinions" className="space-y-4">
              {mockOpinions.map(opinion => <OpinionCard key={opinion.id} opinion={opinion} />)}
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-4">
              <CommentSection opinionId="opinion-1" comments={mockComments} onAddComment={handleAddComment} onReact={handleReact} onReply={handleReply} onFlag={handleFlag} />
            </TabsContent>
            
            <TabsContent value="appeals" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No public appeals for this business</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/appeals")}>
                  View All Appeals
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}

// Enhanced Opinion Card Component
function OpinionCard({
  opinion
}: {
  opinion: any;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-status-verified text-white";
      case "pending":
        return "bg-status-pending text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  return <Card className="p-4 rounded-2xl">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{opinion.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{opinion.author}</span>
            <span className="text-xs text-muted-foreground">
              {opinion.daysAgo} days ago
            </span>
            <Badge className={`text-xs ${getStatusColor(opinion.status)}`}>
              {opinion.status === "resolved" ? "Resolved" : opinion.status === "pending" ? "Pending" : "Public"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{opinion.content}</p>
          
          {/* Resolution details */}
          {opinion.resolution && <div className="bg-muted/50 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-status-verified" />
                <span className="text-xs font-medium">Resolution</span>
              </div>
              <p className="text-xs text-muted-foreground">{opinion.resolution}</p>
            </div>}
          
          {/* Reactions */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>🔥 {opinion.reactions.agree}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🤔 {opinion.reactions.suspicious}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👌 {opinion.reactions.true}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🥟 {opinion.reactions.cap}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              <span>{opinion.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>;
}