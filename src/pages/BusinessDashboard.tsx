import { ArrowLeft, CheckCircle, Clock, AlertTriangle, MessageCircle, Phone, Mail, FileText, Camera, Send, MoreVertical, Eye, EyeOff, Calendar, MapPin, User, Shield, DollarSign, Package, Heart, TrendingUp, TrendingDown, BarChart3, Settings, Users, Star, Flag, Reply, Upload, Download, Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { OpinionItem, type Opinion } from "@/components/ui/opinion-item"

// Enhanced mock business dashboard data with trust system features
const mockBusiness = {
  name: "Reflection Beauty Clinic",
  businessId: "biz-123",
  category: "Skincare",
  trustScore: 85,
  trustLevel: "verified" as const,
  rating: 4.5,
  reviewCount: 75,
  location: "Victoria Island, Lagos",
  verified: true,
  responseTime: "2 hours",
  resolutionRate: 89,
  // Trust system metrics
  totalCases: 156,
  resolvedCases: 139,
  pendingCasesCount: 12,
  ignoredCases: 5,
  averageResolutionTime: "3.2 days",
  verifiedDetails: {
    cacNumber: "RC123456789",
    whatsappBusiness: "+234 801 234 5678",
    website: "reflectionbeauty.com",
    address: "123 Victoria Island, Lagos"
  },
  trustBadges: [
    { type: "verified-cac", label: "🛡 Verified CAC", color: "bg-status-verified" },
    { type: "fast-resolver", label: "🔥 Fast Resolver", color: "bg-status-verified" },
    { type: "community-favorite", label: "⭐ Community Favorite", color: "bg-status-verified" }
  ],
  // Weekly stats
  weeklyStats: {
    newOpinions: 12,
    resolvedCases: 8,
    averageResponseTime: "2.1 hours",
    trustScoreChange: +2,
    customerSatisfaction: 92
  },
  // Recent opinions
  recentOpinions: [
    {
      id: 1,
      type: "complaint",
      author: "Anonymous",
      content: "Poor service delivery, didn't get what I ordered. The staff was unprofessional and the treatment was rushed.",
      status: "pending",
      daysAgo: 1,
      emoji: "😞",
      priority: "medium",
      allowContact: true
    },
    {
      id: 2,
      type: "praise", 
      author: "Sarah M.",
      content: "Excellent service! Very professional staff and amazing results. Will definitely recommend to friends.",
      status: "public",
      daysAgo: 3,
      emoji: "🤩",
      priority: "low"
    },
    {
      id: 3,
      type: "complaint",
      author: "John D.",
      content: "Appointment was delayed by 2 hours without any explanation. Very disappointing experience.",
      status: "resolved",
      daysAgo: 5,
      emoji: "😡",
      priority: "high",
      resolution: "Offered free treatment and apology"
    }
  ],
  // Pending cases
  pendingCases: [
    {
      id: "CASE-001",
      customerName: "Anonymous",
      issue: "Rushed treatment - requesting refund",
      priority: "medium",
      daysOpen: 2,
      category: "Service Quality"
    },
    {
      id: "CASE-002",
      customerName: "Mary K.",
      issue: "Wrong product applied",
      priority: "high",
      daysOpen: 1,
      category: "Product Issue"
    }
  ]
}

export default function BusinessDashboard() {
  const navigate = useNavigate()
  const [selectedOpinion, setSelectedOpinion] = useState<any>(null)
  const [showResponseForm, setShowResponseForm] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-status-verified text-white"
      case "pending": return "bg-status-pending text-white"
      case "public": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-white"
      case "medium": return "bg-status-pending text-white"
      case "low": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-background z-50">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Business Dashboard</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Business Header */}
        <div className="px-4 mb-4">
          <div className="flex items-start gap-4 mb-4">
            <img 
              src="/placeholder.svg" 
              alt={mockBusiness.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{mockBusiness.name}</h2>
                {mockBusiness.verified && <CheckCircle className="w-5 h-5 text-status-verified" />}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{mockBusiness.category}</p>
              <div className="flex flex-wrap gap-1 pl-0">
                {mockBusiness.trustBadges.map((badge, index) => (
                  <Badge key={index} className={`text-xs ${badge.color}`}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="opinions">Opinions</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="pb-20">
              <TabsContent value="overview" className="space-y-4">
            {/* Trust Score Card */}
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Trust Score</h3>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-status-verified" />
                  <span className="text-sm text-status-verified">+2 this week</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">{mockBusiness.trustScore}</div>
                <div className="flex-1">
                  <Progress value={mockBusiness.trustScore} className="h-3 mb-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Excellent</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Weekly Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">New Opinions</h4>
                </div>
                <div className="text-2xl font-bold">{mockBusiness.weeklyStats.newOpinions}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </Card>
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-status-verified" />
                  <h4 className="text-sm font-medium">Resolved</h4>
                </div>
                <div className="text-2xl font-bold">{mockBusiness.weeklyStats.resolvedCases}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </Card>
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">Avg Response</h4>
                </div>
                <div className="text-2xl font-bold">{mockBusiness.weeklyStats.averageResponseTime}</div>
                <p className="text-xs text-muted-foreground">Response time</p>
              </Card>
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <h4 className="text-sm font-medium">Satisfaction</h4>
                </div>
                <div className="text-2xl font-bold">{mockBusiness.weeklyStats.customerSatisfaction}%</div>
                <p className="text-xs text-muted-foreground">Customer rating</p>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-4 rounded-2xl">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12">
                  <Reply className="w-4 h-4 mr-2" />
                  Respond to Cases
                </Button>
                <Button variant="outline" className="h-12">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Proof
                </Button>
                <Button variant="outline" className="h-12">
                  <Shield className="w-4 h-4 mr-2" />
                  Request Verification
                </Button>
                <Button variant="outline" className="h-12">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="opinions" className="space-y-4">
            {/* Opinion Filters */}
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="complaints">Complaints</SelectItem>
                  <SelectItem value="praise">Praise</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opinions List */}
            <div className="space-y-4">
              {mockBusiness.recentOpinions.map((opinion) => (
                <OpinionItem
                  key={opinion.id}
                  opinion={opinion as Opinion}
                  onViewCase={(op) => setSelectedOpinion(op)}
                  onRespond={(op) => {
                    setSelectedOpinion(op)
                    setShowResponseForm(true)
                  }}
                  onFlag={(op) => {
                    // Handle flag action
                    console.log('Flagging opinion:', op.id)
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            {/* Cases Summary */}
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Case Summary</h4>
                <Badge className="text-xs bg-status-verified text-white">
                  {mockBusiness.resolutionRate}% Resolution Rate
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{mockBusiness.totalCases}</div>
                  <p className="text-xs text-muted-foreground">Total Cases</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-status-verified">{mockBusiness.resolvedCases}</div>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-status-pending">{mockBusiness.pendingCasesCount}</div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </Card>

            {/* Pending Cases */}
            <div>
              <h4 className="font-medium mb-3">Pending Cases</h4>
              <div className="space-y-3">
                {mockBusiness.pendingCases.map((case_) => (
                  <Card key={case_.id} className="p-4 rounded-2xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-sm">{case_.issue}</h5>
                        <p className="text-xs text-muted-foreground">{case_.customerName}</p>
                      </div>
                      <Badge className={`text-xs ${getPriorityColor(case_.priority)}`}>
                        {case_.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>Category: {case_.category}</span>
                      <span>{case_.daysOpen} days open</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Respond
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Upload className="w-3 h-3 mr-1" />
                        Upload Proof
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {/* Business Information */}
            <Card className="p-4 rounded-2xl">
              <h4 className="font-medium mb-3">Business Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Business Name</label>
                  <Input value={mockBusiness.name} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select defaultValue={mockBusiness.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Skincare">Skincare</SelectItem>
                      <SelectItem value="Food">Food & Restaurant</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Input value={mockBusiness.location} />
                </div>
              </div>
            </Card>

            {/* Verification Status */}
            <Card className="p-4 rounded-2xl">
              <h4 className="font-medium mb-3">Verification Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">CAC Number</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{mockBusiness.verifiedDetails.cacNumber}</span>
                    <CheckCircle className="w-4 h-4 text-status-verified" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">WhatsApp Business</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{mockBusiness.verifiedDetails.whatsappBusiness}</span>
                    <CheckCircle className="w-4 h-4 text-status-verified" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Request Additional Verification
                </Button>
              </div>
            </Card>

            {/* Staff Management */}
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Staff Accounts</h4>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Staff
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span className="text-sm">John Doe</span>
                  <Badge className="text-xs">Admin</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span className="text-sm">Jane Smith</span>
                  <Badge className="text-xs">Staff</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Opinion Response Modal */}
        {selectedOpinion && (
          <div className="fixed inset-0 bg-background z-50">
            <div className="mobile-container h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setSelectedOpinion(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-semibold">Respond to Opinion</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Original Opinion */}
                <div>
                  <h4 className="font-medium mb-3">Original Opinion</h4>
                  <Card className="p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{selectedOpinion.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{selectedOpinion.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {selectedOpinion.daysAgo} days ago
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedOpinion.content}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Response Form */}
                <div>
                  <h4 className="font-medium mb-3">Your Response</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Response Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select response type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apology">Apology</SelectItem>
                          <SelectItem value="explanation">Explanation</SelectItem>
                          <SelectItem value="resolution">Resolution Offer</SelectItem>
                          <SelectItem value="clarification">Clarification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Response Message</label>
                      <Textarea 
                        placeholder="Type your response to this opinion..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Attach Proof (Optional)</label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Document
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  onClick={() => setSelectedOpinion(null)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 