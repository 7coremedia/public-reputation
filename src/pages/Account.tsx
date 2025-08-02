import { ArrowLeft, User, Settings, Bell, Shield, Building2, FileText, MessageCircle, Star, TrendingUp, Calendar, MapPin, Phone, Mail, Globe, Edit, Plus, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

// Mock user data
const mockUser = {
  id: "user-123",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+234 801 234 5678",
  avatar: "/placeholder.svg",
  isVerified: true,
  badges: ["verified", "top-helper"],
  joinDate: "2023-06-15",
  totalOpinions: 24,
  totalCases: 8,
  resolvedCases: 6,
  trustScore: 92
}

// Mock notifications
const mockNotifications = [
  {
    id: "1",
    type: "case_update",
    title: "Case Resolved",
    message: "Your case against Reflection Beauty Clinic has been resolved",
    timestamp: "2 hours ago",
    isRead: false,
    businessName: "Reflection Beauty Clinic"
  },
  {
    id: "2",
    type: "appeal_response",
    title: "Business Responded",
    message: "Mary's Kitchen has responded to your public appeal",
    timestamp: "1 day ago",
    isRead: true,
    businessName: "Mary's Kitchen"
  },
  {
    id: "3",
    type: "comment_reply",
    title: "New Reply",
    message: "Someone replied to your comment on a business review",
    timestamp: "2 days ago",
    isRead: true,
    businessName: "72 Wears"
  }
]

// Mock dispute history
const mockDisputes = [
  {
    id: "DISPUTE-001",
    businessName: "Reflection Beauty Clinic",
    issue: "Rushed treatment - requesting refund",
    status: "resolved",
    createdAt: "2024-01-15",
    resolvedAt: "2024-01-17",
    resolution: "Full refund + free treatment offered"
  },
  {
    id: "DISPUTE-002",
    businessName: "Mary's Kitchen & Catering",
    issue: "Food poisoning - medical compensation",
    status: "pending",
    createdAt: "2024-01-18",
    resolvedAt: null,
    resolution: null
  }
]

// Mock business claims
const mockBusinessClaims = [
  {
    id: "biz-123",
    name: "Reflection Beauty Clinic",
    status: "verified",
    verifiedAt: "2024-01-10",
    category: "Skincare",
    location: "Victoria Island, Lagos"
  }
]

export default function Account() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [showClaimForm, setShowClaimForm] = useState(false)
  const [showCreateBusiness, setShowCreateBusiness] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "case_update": return <CheckCircle className="w-4 h-4 text-status-verified" />
      case "appeal_response": return <MessageCircle className="w-4 h-4 text-status-pending" />
      case "comment_reply": return <MessageCircle className="w-4 h-4 text-muted-foreground" />
      default: return <Bell className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-status-verified text-white"
      case "pending": return "bg-status-pending text-white"
      case "verified": return "bg-status-verified text-white"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mobile-container">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-50">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Account</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* User Profile Header */}
        <div className="px-4 mb-4">
          <Card className="p-4 rounded-2xl">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{mockUser.name}</h2>
                  {mockUser.isVerified && <CheckCircle className="w-5 h-5 text-status-verified" />}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{mockUser.email}</p>
                <div className="flex flex-wrap gap-1">
                  {mockUser.badges.map((badge, index) => (
                    <Badge key={index} className="text-xs bg-status-verified text-white">
                      {badge.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="px-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Opinions</h4>
              </div>
              <div className="text-2xl font-bold">{mockUser.totalOpinions}</div>
              <p className="text-xs text-muted-foreground">Total shared</p>
            </Card>
            <Card className="p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Cases</h4>
              </div>
              <div className="text-2xl font-bold">{mockUser.totalCases}</div>
              <p className="text-xs text-muted-foreground">{mockUser.resolvedCases} resolved</p>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="businesses">Businesses</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="px-4 pb-20 mt-4">
              <TabsContent value="profile" className="space-y-4">
            {/* Profile Information */}
            <Card className="p-4 rounded-2xl">
              <h3 className="font-medium mb-3">Profile Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <Input value={mockUser.name} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input value={mockUser.email} type="email" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <Input value={mockUser.phone} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Bio</label>
                  <Textarea placeholder="Tell us about yourself..." rows={3} />
                </div>
              </div>
              <Button className="w-full mt-4">
                <Edit className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </Card>

            {/* Account Settings */}
            <Card className="p-4 rounded-2xl">
              <h3 className="font-medium mb-3">Account Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Notifications</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Privacy Settings</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Authentication</span>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="businesses" className="space-y-4">
            {/* Business Claims */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">My Businesses</h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowClaimForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Claim Business
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCreateBusiness(true)}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Create Business
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {mockBusinessClaims.map((business) => (
                <Card key={business.id} className="p-4 rounded-2xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{business.name}</h4>
                        <p className="text-xs text-muted-foreground">{business.category}</p>
                        <p className="text-xs text-muted-foreground">{business.location}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(business.status)}`}>
                      {business.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Dashboard
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            {/* Notifications List */}
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-4 rounded-2xl ${!notification.isRead ? 'ring-2 ring-primary/20' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                        {notification.businessName && (
                          <Badge variant="outline" className="text-xs">
                            {notification.businessName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {/* Dispute History */}
            <div>
              <h3 className="font-medium mb-3">Dispute History</h3>
              <div className="space-y-3">
                {mockDisputes.map((dispute) => (
                  <Card key={dispute.id} className="p-4 rounded-2xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{dispute.businessName}</h4>
                        <p className="text-xs text-muted-foreground">{dispute.issue}</p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(dispute.status)}`}>
                        {dispute.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Created: {dispute.createdAt}</span>
                      {dispute.resolvedAt && (
                        <span>Resolved: {dispute.resolvedAt}</span>
                      )}
                    </div>
                    {dispute.resolution && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-status-verified" />
                          <span className="text-xs font-medium">Resolution</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{dispute.resolution}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Claim Business Modal */}
        {showClaimForm && (
          <div className="fixed inset-0 bg-background z-50">
            <div className="mobile-container h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setShowClaimForm(false)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-semibold">Claim Business</h2>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Business Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Business Name</label>
                      <Input placeholder="Enter business name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skincare">Skincare</SelectItem>
                          <SelectItem value="food">Food & Restaurant</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Input placeholder="Enter business location" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">CAC Number</label>
                      <Input placeholder="Enter CAC registration number" />
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  onClick={() => setShowClaimForm(false)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Submit Claim
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Create Business Modal */}
        {showCreateBusiness && (
          <div className="fixed inset-0 bg-background z-50">
            <div className="mobile-container h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => setShowCreateBusiness(false)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-semibold">Create Business</h2>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Business Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Business Name</label>
                      <Input placeholder="Enter business name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skincare">Skincare</SelectItem>
                          <SelectItem value="food">Food & Restaurant</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea placeholder="Describe your business..." rows={3} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Contact Information</label>
                      <div className="space-y-2">
                        <Input placeholder="Phone number" />
                        <Input placeholder="Email address" />
                        <Input placeholder="Website (optional)" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  onClick={() => setShowCreateBusiness(false)}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Create Business
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 