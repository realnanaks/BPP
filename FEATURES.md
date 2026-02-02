# Betika Promotions Platform (BPP) - Feature Roadmap

Based on the Product Requirements Document (PRD), the development is grouped into high-level feature sets. We will prioritize **Foundation**, **Dashboard**, and **Promotion Configuration** as the core MVP UI.

## 1. Platform Foundation (Core UI)
**Goal:** Establish the "Premium" Betika aesthetic and shell navigation.
- **Design System**: Dark mode, Betika Yellow/Green accents, Glassmorphism, Responsive text.
- **Navigation**: Sidebar with collapsed states, Header with user profile/notifications.
- **Layout**: Main content area with breadcrumbs and page titles.

## 2. Dashboard Interface
**Goal:** Operational visibility.
- **KPI Cards**: Active Promotions, Total Liability, Claims Today.
- **Live Feed**: Activity stream (simulated events).
- **Shortcuts**: "Create Promotion", "Approve Pending".

## 3. Promotion Factory (The "Wizard")
**Goal:** Step-by-step creation of complex promotions.
- **Step 1: Basics**: Promo Name, Description, Type (Deposit, Freebet, etc.).
- **Step 2: Scope**: Markets (KE, GH, ET), Products (Sports, Casino), Segments.
- **Step 3: Rules**: Triggers (Sign Up, Deposit), Conditions (> 100 KES).
- **Step 4: Rewards**: Bonus amount, Wager requirements, Expiry.
- **Step 5: Review**: Json preview / Summary card.

## 4. Promotion Management
**Goal:** List and manage lifecycle.
- **Promo List**: Data grid with Status chips (Active, Paused, Draft).
- **Actions**: Pause, Terminate, Clone.
- **Detail View**: Read-only display of a full promotion config.

## 5. Governance & Approvals
**Goal:** Review flow.
- **Approval Queue**: List of items waiting for sign-off.
- **Decision UI**: Approve/Reject with comments.
- **Audit Log**: History of changes (Who changed what).

## 6. Experimentation (Advanced)
**Goal:** A/B Testing.
- **Experiment Builder**: Create variants (Control vs Variant A).
- **Traffic Split**: 50/50 sliders.

---

### Implementation Plan (Current Session)
1.  **Setup**: Project initialization and CSS Variables (Betika Brand).
2.  **Layout**: Build the App Shell (Sidebar + Header).
3.  **Dashboard**: Implement the Home Page with dummy KPI data.
4.  **Navigation**: Ensure links to "Promotions" work.
