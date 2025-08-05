import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MessageSquare, Building2, Shield, Users, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { TermsModal } from "@/components/ui/terms-modal"

const Onboarding = () => {
  const [step, setStep] = useState<"welcome" | "path-selection" | "auth" | "terms">("welcome")
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [selectedPath, setSelectedPath] = useState<string>("")
  const navigate = useNavigate()

  const handlePathSelection = (path: string) => {
    // Store the user's path choice
    setSelectedPath(path)
    localStorage.setItem("userPath", path)
    setShowTermsModal(true)
  }

  const handleTermsAccepted = () => {
    setShowTermsModal(false)
    setStep("auth")
  }

  const handleTermsDeclined = () => {
    setShowTermsModal(false)
    setStep("path-selection")
  }

  const handleAuthComplete = () => {
    navigate("/")
  }

  const getUserType = (): "user" | "business" => {
    return selectedPath === "business" ? "business" : "user"
  }

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="expressive-heading text-gray-900">
            Welcome to Public Opinions
          </h1>
          <p className="text-gray-600 text-lg">
            The civic accountability platform for African businesses
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Expose bad behavior</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Encourage customer-first cultures</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Build public trust</span>
          </div>
        </div>

        <Button 
          onClick={() => setStep("path-selection")}
          className="w-full h-12 text-lg font-semibold"
        >
          Get Started
        </Button>
      </div>
    </div>
  )

  const renderPathSelection = () => (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-12 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="expressive-heading">What do you want to do?</h1>
          <p className="text-muted-foreground">Choose your path to get started</p>
        </div>

        <div className="space-y-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePathSelection("lookup")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Look up a business</CardTitle>
                  <CardDescription>Search and verify business trust</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePathSelection("report")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Report or Review</CardTitle>
                  <CardDescription>Share your experience with a business</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePathSelection("business")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">I own a business</CardTitle>
                  <CardDescription>Manage your business profile and responses</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderAuth = () => (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-12 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="expressive-heading">Verify your phone</h1>
          <p className="text-muted-foreground">We'll send you a verification code</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="flex gap-2">
              <div className="w-20 h-12 border rounded-lg flex items-center justify-center text-sm font-medium">
                +234
              </div>
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                className="flex-1 h-12 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="whatsapp" className="w-4 h-4" />
            <label htmlFor="whatsapp" className="text-sm text-muted-foreground">
              Send verification via WhatsApp (optional)
            </label>
          </div>

          <Button 
            onClick={handleAuthComplete}
            className="w-full h-12 text-lg font-semibold"
          >
            Send Verification Code
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (step) {
      case "welcome":
        return renderWelcome()
      case "path-selection":
        return renderPathSelection()
      case "auth":
        return renderAuth()
      default:
        return renderWelcome()
    }
  }

  return (
    <>
      {renderCurrentStep()}
      <TermsModal
        isOpen={showTermsModal}
        onClose={handleTermsDeclined}
        onAgree={handleTermsAccepted}
        userType={getUserType()}
      />
    </>
  )
}

export default Onboarding