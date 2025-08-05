import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
  onAgree: () => void
  userType: "user" | "business"
}

const USER_TERMS = `# 🧾 Public Opinions — Terms & Conditions for Users

_Last Updated: August 2025_

Welcome to **Public Opinions**, a platform by H202 Labs where your voice helps shape the future of business in Africa.

By accessing or using our platform, you agree to these Terms & Conditions ("Terms") and our Privacy Policy. If you do not agree, do not use the platform.

---

## 1. 📲 Who Can Use Public Opinions
You must:
- Be at least 16 years old
- Use your real phone number and name (even if posting anonymously)
- Follow our community guidelines

We may suspend or restrict access if you violate these rules.

---

## 2. 🛡 What You're Allowed To Do
- Submit **honest** feedback about businesses you've interacted with
- Upload supporting documents (receipts, screenshots, chats)
- Participate in public resolution processes and comment threads
- Remain anonymous if you choose

---

## 3. 🚫 What You're NOT Allowed To Do
- Post fake reviews or reports
- Use hate speech, threats, or defamatory content
- Disclose someone's private info without consent (doxxing)
- Impersonate businesses or individuals
- Spam the system or abuse appeals

---

## 4. 🤝 Trust & Accuracy
All opinions are moderated. Users who repeatedly post misleading content may be banned.

We don't edit your submissions — but we may reject or hide posts that break these Terms.

---

## 5. ⚖️ Liability & Disputes
We are a neutral platform. While we help users file opinions and appeals, we are not responsible for enforcing refunds or business behaviour.

However, we reserve the right to:
- Intervene in serious or harmful cases
- Share data with authorities if legally required

---

## 6. ✅ Accepting These Terms
You accept these Terms by clicking "Agree" and continuing to use Public Opinions.

If you ever want to delete your data, just email us at: [support@opinions.com.ng](mailto:support@opinions.com.ng)

---

Let's build a culture of truth and trust — together.`

const BUSINESS_TERMS = `# 🧾 Public Opinions — Terms & Conditions for Businesses

_Last Updated: August 2025_

Welcome to **Public Opinions**, Africa's civic-trust layer for businesses. By claiming or registering your business on our platform, you agree to the following Terms & Conditions.

---

## 1. 🧾 Who Can Register a Business
To manage a business profile, you must:
- Be a verified representative (owner, manager, or authorized staff)
- Provide accurate registration details (CAC, address, etc.)
- Act in good faith when responding to users

---

## 2. 📣 Your Responsibilities
- Monitor public opinions about your business
- Respond to feedback constructively
- Provide proof when resolving a complaint
- Acknowledge valid refund appeals in a timely manner

---

## 3. 🚫 Prohibited Behavior
- Attempting to delete, hide, or downvote genuine complaints
- Harassing users who leave public feedback
- Posting fake reviews to boost your rating
- Ignoring legitimate refund requests or disputes
- Registering fake or impersonated business profiles

---

## 4. 🧠 Trust Score & Transparency
Your business Trust Score is calculated based on:
- Volume of feedback
- Resolution rate
- Speed of response
- Community interaction

We do not offer paid deletion or trust score manipulation under any condition.

---

## 5. 📉 Reputation & Sanctions
Repeated violations may result in:
- Account suspension
- Loss of Verified Status
- Permanent visibility as "Under Review" or "High Risk"
- Inclusion in public Risk Reports

---

## 6. ⚖️ Legal Responsibility
You are responsible for:
- Ensuring your team follows our standards
- Handling refunds or redress fairly
- Representing your business truthfully

Public Opinions is not liable for reputational loss if claims are truthful and documented.

---

## 7. ✅ Acceptance
By registering or managing a business on this platform, you acknowledge and accept these Terms.

For disputes or help, contact: [business@opinions.com.ng](mailto:business@opinions.com.ng)

---

Let's build your business with trust, not tricks.`

export const TermsModal = ({ isOpen, onClose, onAgree, userType }: TermsModalProps) => {
  const [hasAgreed, setHasAgreed] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

  const termsContent = userType === "business" ? BUSINESS_TERMS : USER_TERMS
  const title = userType === "business" ? "Business Terms & Conditions" : "User Terms & Conditions"

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50
    if (bottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true)
    }
  }

  const handleAgree = () => {
    if (hasAgreed && hasScrolledToBottom) {
      onAgree()
    }
  }

  const canProceed = hasAgreed && hasScrolledToBottom

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea 
            className="flex-1 px-6" 
            onScrollCapture={handleScroll}
          >
            <div className="py-4 space-y-4">
              {termsContent.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-xl font-bold mb-4">{line.slice(2)}</h1>
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-lg font-semibold mt-6 mb-3">{line.slice(3)}</h2>
                }
                if (line.startsWith('_') && line.endsWith('_')) {
                  return <p key={index} className="text-sm text-muted-foreground italic mb-4">{line.slice(1, -1)}</p>
                }
                if (line.startsWith('- ')) {
                  return <li key={index} className="ml-4 mb-1 list-disc">{line.slice(2)}</li>
                }
                if (line === '---') {
                  return <hr key={index} className="my-6 border-border" />
                }
                if (line.trim() === '') {
                  return <div key={index} className="h-3" />
                }
                return <p key={index} className="mb-3 leading-relaxed">{line}</p>
              })}
              
              {/* Extra padding at bottom to ensure scroll detection */}
              <div className="h-8" />
            </div>
          </ScrollArea>

          {!hasScrolledToBottom && (
            <div className="text-center py-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm border-t">
              ⬇ Scroll to read all terms ⬇
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-background shrink-0">
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agree-terms" 
                checked={hasAgreed}
                onCheckedChange={(checked) => setHasAgreed(checked === true)}
                disabled={!hasScrolledToBottom}
              />
              <label 
                htmlFor="agree-terms" 
                className={`text-sm ${!hasScrolledToBottom ? 'text-muted-foreground' : 'text-foreground'}`}
              >
                I have read and agree to the Terms & Conditions
              </label>
            </div>
            
            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAgree}
                disabled={!canProceed}
                className="flex-1"
              >
                Agree and Continue
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}