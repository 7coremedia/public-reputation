# 🧠 Product Vision Doc: Public Opinions - Rethinking Reviews & Ratings

## 🏷️ Product Name

**Public Opinions** (a H202 Labs tool)

## 💡 Core Idea

A mobile-first platform that shifts reviews from vanity ratings to **civic accountability**. It's not just about 5-star reviews. It's about:

* Exposing bad behavior
* Encouraging customer-first cultures
* Enabling businesses to rebuild public trust

This product is **TrustPilot meets NairaLand meets Uber Support**, designed **for African markets**, starting with Nigeria.

---

## 🗭 Overall User Flow

1. **User Onboarding**
2. **Create Account / Login**
3. **Business Lookup / Discovery**
4. **Business Profile (Public Trust Dashboard)**
5. **File a Public Opinion (Complaint / Praise / Feedback)**
6. **Ongoing Case Resolution Tracker**
7. **Social Interaction & Comment Layer**
8. **Account & Profile Management**
9. **Business Dashboard (For Verified Vendors)**
10. **Trust Layer & Reputation System**
11. **Public Refund Appeal System**

---

## 1. 🧭 Onboarding Experience

### Screens:

* Screen 1: Logo + Tagline — "Change starts from culture"
* Screen 2: Brief What We Do — "We help you report, verify and track business behavior in Africa."
* Screen 3: Why It Matters — "Your voice builds public trust and protects others."
* Final screen: Choose path → "Get Started"

---

## 2. 🔐 Create Account / Login

### Screens:

* Phone number input screen (fake auth only, no verification)
* Input name (optional avatar auto-generated)
* Continue as Guest or Save to Device (cache local storage)

### Features:

* Avatar auto-generated (3D style) unless user uploads one
* Skip login flow supported (guest mode)
* Profile picture shown on Home after login
* All updates saved to local cache for MVP testing

---

## 3. 🔍 Business Lookup / Discovery

### Screens:

* Search bar (business name, category, location)
* Explore businesses by category (e.g., Fashion Vendors, POS Agents, Logistics)
* Map view (geo-located businesses with trust ratings)
* Trending Cases (businesses with active complaints)

### Features:

* Autocomplete search
* Business badges (Trusted / Under Investigation / Pending Case)

---

## 4. 🏪 Business Profile (Trust Dashboard)

### Sections:

* Business Summary
* **Trust Score** (0-100 scale with sentiment dial)
* Most Recent Public Opinions (tiles showing complaint or praise)
* Verified Details (CAC Number, WhatsApp Business, etc.)
* Resolution Record (number of complaints resolved vs. ignored)
* Response Timeline (how fast they respond)

### Features:

* Heatmap of complaints by time
* Public comments
* “Flag this Business” button
* Verified owner responses are highlighted in color

---

## 5. 📣 Leave a Public Opinion (Complaint / Review / Testimonial)

### Steps:

1. Select business (auto-suggest or manual)
2. Type of opinion:

   * Complaint
   * Praise
   * Suggestion
3. Upload proof (images, receipts, chat screenshots)
4. Short story (140–280 characters max)
5. Pick 1 of 6 **rating emojis**:

   * 😡 Horrible
   * 😞 Disappointing
   * 😐 Mid
   * 🙂 Okay
   * 😃 Good
   * 🤩 Excellent
6. Optional:

   * Allow business to contact you
   * Choose to remain anonymous

### Features:

* Form autosaves
* AI moderation + human review queue
* “Resolve privately first” toggle

---

## 6. 📊 Resolution Tracker

### Screens:

* Case status timeline (Pending → Contacted → In Talks → Resolved / Unresolved)
* Option to chat with business (when permitted)
* Get updates via SMS / WhatsApp
* Public View: “This issue was resolved in 2 days”

### Features:

* Anonymous status updates
* Public “Resolution Ratio” for each business
* Visual timelines (like a delivery tracker)

---

## 7. 💬 Comment + Social Layer

### Screens:

* Comment threads under each opinion
* Reactions (🔥 Agree / 🤔 Suspicious / 👌 True / 🥟 Cap)
* Follow users
* Report abusive comments

### Features:

* Community moderation badges
* “Top Helpers” or “Most Accurate Watchdogs”
* Private DM system (opt-in)

---

## 8. 👤 Account & Profile Management

### Screens:

* My Profile
* Edit Profile Info (name, phone, avatar)
* View received payments
* View open/closed disputes
* Notification center (could be icon on top or next to profile avatar)

### Features:

* 3D avatar assigned by default (can be updated)
* Account data stored locally for now
* Notifications triggered by complaint updates or responses
* Dispute summary page like a ticket inbox

---

## 9. 🧑🏽‍💻 Business Dashboard

### Screens:

* My Profile
* All Public Opinions
* Respond to Issues
* Submit Proof of Resolution
* Trust Score Insights
* Timeline of interactions
* Add staff accounts

### Features:

* Request Verification (CAC + NIN/BVN)
* Custom business profile design
* Weekly trust report card

---

## 10. 🏆 Trust Layer & Reputation System

### Components:

* Trust Score (0–100, based on resolution, reviews, transparency)
* Business Tags:

  * 🛡 Verified CAC
  * 🔥 Fast Resolution
  * 🚩 Under Review
  * ⭐ Community Favorite
* Ranking Boards:

  * “Top 10 Trusted Vendors in Lagos”
  * “Most Complained About Businesses This Month”

---

## 11. 🧡 Public Refund Appeal System

### Objective:

To give customers the ability to escalate unresolved cases **to the public** and initiate a structured, public-facing **refund appeal**. This increases social accountability and protects users who were treated unfairly.

### Screens:

* Refund Appeal Submission Screen:

  * Select business (pre-filled from complaint)
  * Attach proof: screenshots, receipts, DMs
  * State what you ordered, what you received
  * Select type of redress: Refund / Exchange / Apology
  * Describe attempted resolution (optional)
  * Submit for public review

* Appeal Showcase Screen:

  * Headline: "This Customer Is Appealing for a Refund"
  * Timeline: what happened + current status
  * Community reactions (Agree / Disagree)
  * Business Response (or Lack of Response)
  * Countdown: Time left for business to respond before being flagged

### Logic & Enforcement:

* If business does not respond within 5 working days, their trust score takes a hit
* Multiple unresolved public appeals trigger a “Needs Oversight” badge
* Businesses who resolve appeals get a green checkmark on the case
* Businesses who ignore multiple refund appeals are shown in the “Civic Risk” category
* Users cannot fake claims: All appeals go through moderation and must include at least 1 proof item
* Appeals remain part of a business’s public record

### Why It Works:

* **Customers feel heard** beyond DMs
* **Businesses are held to the cultural value of fairness**
* **Resolutions aren’t about happiness, they’re about justice**

---

## 🎨 Visual Identity Notes

* App-like, mobile-first interface
* Heavy use of white, soft blacks, and bright green for CTA
* Rating system uses emoji instead of stars (more expressive, less gamified)
* Use of icons, avatars, receipts, badges

---

## 📦 Tech Stack & Design Implementation

* React + TypeScript (Next.js App Router)
* TailwindCSS + Shadcn/ui
* Supabase (Auth + DB)
* Vercel for deploy
* Optional: WhatsApp Cloud API for bot reports
* Framer Motion for transitions

---

## 🛡️ Final Words

This isn’t just a review tool.
This is **the public court of business accountability** — empowering customers, spotlighting bad actors, and helping serious businesses build trust.

It’s not about ratings.
It’s about **reputation with receipts**.

Built in Africa. For the culture.
