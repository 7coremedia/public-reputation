import { useState, useEffect } from "react"
import { MobileHeader } from "@/components/ui/mobile-header"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  MessageSquare, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Star,
  BarChart3
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useOpinions } from "@/hooks/useOpinions"

interface Business {
  id: string;
  name: string;
  category: string;
  is_verified: boolean;
  created_at: string;
}

export default function BusinessPortal() {
  const [claimedBusinesses, setClaimedBusinesses] = useState<Business[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const { opinions } = useOpinions(selectedBusiness || undefined)

  useEffect(() => {
    if (!user) {
      navigate("/auth")
      return
    }
    fetchClaimedBusinesses()
  }, [user, navigate])

  const fetchClaimedBusinesses = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('claimed_by', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setClaimedBusinesses(data || [])
      if (data && data.length > 0 && !selectedBusiness) {
        setSelectedBusiness(data[0].id)
      }
    } catch (error) {
      console.error('Error fetching businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="centered-container">
          <MobileHeader />
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your businesses...</p>
          </div>
        </div>
      </div>
    )
  }

  if (claimedBusinesses.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="centered-container">
          <MobileHeader />
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Claimed Businesses</h2>
            <p className="text-muted-foreground mb-6">
              You haven't claimed any businesses yet. Claim your business to manage reviews and respond to customer feedback.
            </p>
            <Button onClick={() => navigate("/discover")}>
              Find Your Business
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const selectedBusinessData = claimedBusinesses.find(b => b.id === selectedBusiness)
  const businessOpinions = opinions.filter(op => op.business_id === selectedBusiness)
  
  const stats = {
    totalOpinions: businessOpinions.length,
    complaints: businessOpinions.filter(op => op.type === 'complaint').length,
    praise: businessOpinions.filter(op => op.type === 'praise').length,
    pending: businessOpinions.filter(op => op.status === 'pending').length,
    avgRating: businessOpinions.length > 0 
      ? (businessOpinions.reduce((sum, op) => sum + (op.rating || 3), 0) / businessOpinions.length).toFixed(1)
      : 'N/A'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="centered-container">
        <MobileHeader />
        
        {/* Business Selector */}
        <div className="px-4 mb-6">
          <h1 className="expressive-heading mb-4">Business Portal</h1>
          
          {claimedBusinesses.length > 1 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Select a business:</p>
              <div className="grid gap-2">
                {claimedBusinesses.map((business) => (
                  <Card 
                    key={business.id}
                    className={`cursor-pointer transition-all ${
                      selectedBusiness === business.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedBusiness(business.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{business.name}</h3>
                          <p className="text-sm text-muted-foreground">{business.category}</p>
                        </div>
                        {business.is_verified && (
                          <Badge variant="secondary">Verified</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedBusinessData && (
          <div className="px-4 space-y-6 pb-20">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageSquare className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.totalOpinions}</p>
                  <p className="text-xs text-muted-foreground">Total Reviews</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.complaints}</p>
                  <p className="text-xs text-muted-foreground">Complaints</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.praise}</p>
                  <p className="text-xs text-muted-foreground">Praise</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different views */}
            <Tabs defaultValue="opinions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="opinions">Recent Opinions</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="opinions" className="space-y-4">
                {businessOpinions.length > 0 ? (
                  businessOpinions.map((opinion) => (
                    <Card key={opinion.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              opinion.type === 'complaint' ? 'destructive' : 
                              opinion.type === 'praise' ? 'default' : 'secondary'
                            }>
                              {opinion.type}
                            </Badge>
                            <Badge variant="outline">
                              {opinion.status}
                            </Badge>
                          </div>
                          {opinion.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{opinion.rating}/5</span>
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-base">{opinion.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{opinion.content}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {opinion.is_anonymous ? 'Anonymous' : opinion.profile?.full_name || 'User'}
                          </span>
                          <span>{new Date(opinion.created_at).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No opinions yet for this business</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Performance Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Response Rate</p>
                        <p className="font-semibold">0%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Response Time</p>
                        <p className="font-semibold">N/A</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Resolution Rate</p>
                        <p className="font-semibold">0%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Customer Satisfaction</p>
                        <p className="font-semibold">{stats.avgRating}/5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {stats.pending > 0 && (
                        <li className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          Respond to {stats.pending} pending opinion{stats.pending > 1 ? 's' : ''}
                        </li>
                      )}
                      {stats.complaints > 0 && (
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          Address recurring complaint themes
                        </li>
                      )}
                      {businessOpinions.length === 0 && (
                        <li className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          Encourage customers to leave reviews
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}