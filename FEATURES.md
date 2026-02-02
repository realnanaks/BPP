# Product Requirements Document (PRD): Self-Service Promotion Creation Wizard

## 0. Executive Summary

### Purpose
To empower CRM and Marketing teams to rapidly configure, simulate, and launch complex betting promotions without engineering application support. This PRD defines the **Promotion Creation Wizard**, a UI-driven workflow that abstracts the underlying Event-Driven Architecture into a user-friendly interface.

### Problem Statement
Currently, launching a new promotion (e.g., "Acca Insurance" or "Aviator Crash Bonus") requires significant engineering time to implement hardcoded logic. This results in slow time-to-market, limited experimentation, and high operational costs. Stakeholders lack visibility into active rules and cannot independently adjust parameters like "Minimum Odds" or "Refund Caps".

### Proposed Solution
A **6-Step Self-Service Wizard** that allows authorized users to define:
1.  **Scope**: Markets, Channels, and Audience Segments.
2.  **Triggers**: Real-time events (e.g., `BetSettled`, `Deposit`) that qualify a user.
3.  **Logic**: Complex boolean rules (e.g., `IF LosingSelections == 1 AND Stake > 50`).
4.  **Rewards**: Dynamic outcomes (e.g., `Refund Stake as Cash` or `Grant Free Bet`).
5.  **Schedule**: Automated start/end times and recurrence patterns.

### Scope
*   **Included**: The frontend wizard, JSON schema generation for promotion definitions, basic validation (overlap checks, cap limits), and persistence of configurations.
*   **Excluded**: The backend *execution* engine (Promotion Processor) and real-time wallet crediting (these are downstream consumers of the configuration).

### Risks & Mitigations available
*   **Risk**: Users creating financially dangerous promotions (e.g., infinite loops).
*   **Mitigation**: Mandatory "Simulation" step and "Compliance Audit" flag for high-value rewards.

### Go-live Success Criteria
*   Marketing team can configure and launch an "Acca Insurance" campaign in <10 minutes without writing SQL or code.

---

## 1. Context & Background

### Current State
*   Promotions are defined in backend code or complex SQL procedures.
*   "Cashia" and "Acca Insurance" logic is tightly coupled to core betting systems.
*   Changes to a variable (e.g., changing max refund from 1000 to 2000) require a deployment.

### Why Existing Systems Are Insufficient
*   **Rigidity**: Cannot support new verticals (e.g., Aviator) without code changes.
*   **Opacity**: No visual way to verify "Who is eligible?" or "What triggers this?".

### Fit into Architecture
This feature sits at the **Control Plane** level. It generates a **Promotion Definition Document (PDD)**—a JSON payload that dictates how the **Data Plane** (the Event Processor) evaluates transactions.

---

## 2. Goals & Non-Goals

### 2.1 Goals
*   **flexibility**: Support 95% of standard betting mechanics (Deposit Match, Cashback, Turnover Challenge) via configuration.
*   **Safety**: Prevent conflicting logic (e.g., two exclusive promos triggering on the same bet).
*   **Usability**: "No-Code" interface for Boolean logic builder (AND/OR groups).

### 2.2 Non-Goals
*   **Real-time Settlement**: This too defines *rules*, it does not execute them.
*   **cms/Frontend Display**: This tool configures the *mechanic*, not the marketing banner/landing page HTML (though it defines where it *should* appear).

---

## 3. Users & Stakeholders

| User Type | Responsibilities | Needs | Must Not Do |
| :--- | :--- | :--- | :--- |
| **CRM Manager** (Primary) | Designing and scheduling campaigns. | Intuitive logic builder, reusable templates. | Bypass financial caps set by Risk. |
| **Compliance Officer** | Approving sensitive promotions. | Audit log of who changed what rule. | Edit active promotions without re-approval. |
| **Risk Manager** | Setting exposure limits. | Global caps (e.g., "Max Budget 1M ETB"). | N/A |
| **Engineer** | Maintaining the platform. | Clean JSON output, clear error states. | Be required for day-to-day config changes. |

---

## 4. High-Level User Journeys

### Business User Journey: Creating "Acca Insurance"
1.  **Initiation**: User clicks "New Promotion" and selects "Cashback" template.
2.  **Basic Setup**: Names the promo "Ethiopia Acca Insurance", selects Market "ET".
3.  **Eligibility**:
    *   Adds Trigger: `Sportsbook > Accumulator Settled`.
    *   Adds Condition: `Losing Legs = 1`.
    *   Adds Condition: `Total Legs >= 6`.
4.  **Reward**:
    *   Selects `Stake Refund`.
    *   Sets Value `100%`.
    *   Sets Cap `100,000 ETB`.
5.  **Review**: Checks summary, sees "Draft" status.
6.  **Publish**: Clicks "Publish". System saves config and sets status to "Active".

### Operational Journey: Emergency Stop
1.  **Detection**: Risk Team detects abuse on "Aviator Rain".
2.  **Action**: Admin navigates to Promotions List, finds specific ID.
3.  **Deactivation**: Clicks "Deactivate" (Kill Switch).
4.  **Result**: Promotion status updates to `Suspended`; Event Processor immediately stops matching this rule.

---

## 5. Functional Requirements

### 5.1 Wizard Workflow
*   **FR-01**: The system must provide a guided, multi-step navigation (Stepper) preventing advancement if current step data is invalid.
*   **FR-02**: The system must verify unique Promotion IDs and non-overlapping names per market.

### 5.2 Trigger Configuration
*   **FR-03**: The system must display a categorized catalog of events (Sports, Casino, Wallet).
*   **FR-04**: The system must allow multiple triggers per promotion (OR logic) with nested conditions (AND logic).
*   **FR-05**: The system must validate parameter types (e.g., preventing text input for 'Stake Amount').
*   **FR-06**: The system must require strict Enum selection for finite fields (e.g., 'Outcome' must be Win/Loss/Void).

### 5.3 Reward Logic
*   **FR-07**: The system must support tiered rewards based on trigger parameters (e.g., "If Legs >= 10, Reward 200%").
*   **FR-08**: The system must enforce a "Maximum Cap" field for all percentage-based rewards.

### 5.4 persistence
*   **FR-09**: The system must save drafts automatically to prevent data loss.
*   **FR-10**: The system must generate a version-controlled JSON Configuration upon publishing.

---

## 6. Non-Functional Requirements

### Reliability & Determinism
*   **NFR-01**: The generated JSON configuration must be deterministic; the same input event must always result in the same evaluation outcome.

### Availability & Resilience
*   **NFR-02**: The Creation Wizard must be available 99.9% of the time during business hours.
*   **NFR-03**: UI must handle network failures gracefully during "Save" operations (retry logic).

### Security & Access Control
*   **NFR-04**: Only users with `PROMOTION_EDITOR` role can create/edit.
*   **NFR-05**: Only users with `PROMOTION_PUBLISHER` role can change status to "Active".

### Auditability
*   **NFR-06**: Every field change in the wizard must be logged with `User_ID`, `Timestamp`, `Old_Value`, and `New_Value`.

---

## 7. User Stories & Acceptance Criteria

| Scenario | User Story | Acceptance Criteria (Gherkin) | QA Validation Question |
| :--- | :--- | :--- | :--- |
| **Acca Insurance** | As a CRM Manager, I want to refund bets that lose by exactly one leg so that I can encourage larger accumulators. | **GIVEN** I am on the Eligibility Step<br>**WHEN** I select event 'Accumulator Settled'<br>**AND** I set 'Losing Legs' equal to 1<br>**THEN** The system validates the rule and allows saving. | Can I save a rule specifically for 'Losing Legs = 1'? (Yes/No) |
| **Market Isolation** | As a Country Manager, I want to create a promo only for Ethiopia so false claims aren't made in Kenya. | **GIVEN** I am on the Scope Step<br>**WHEN** I select 'Ethiopia' from the Market list<br>**THEN** The generated config includes `"market": "ET"`<br>**AND** Users in 'KE' are excluded. | Does the config JSON explicitly state the target market? (Yes/No) |
| **Event Catalog** | As a Product Owner, I want to see 'Aviator' events so I can target crash game players. | **GIVEN** I open the Trigger Application<br>**WHEN** I search for 'Aviator'<br>**THEN** I see 'Aviator Bet' and 'Aviator Crash' options. | Are Aviator events visible in the selector? (Yes/No) |

---

## 8. Edge Cases & Failure Scenarios

*   **Edit Active Promotion**: User tries to change logic for a live promotion.
    *   *System Behavior*: Must prevent critical logic edits. User must "Clone" and "Supersede" (Version 2).
*   **Conflicting Rules**: Two promotions award "First Deposit Bonus".
    *   *System Behavior*: "Priority" field determines execution order. System warns user of potential overlap.
*   **Zero/Negative Values**: User enters "-50%" reward.
    *   *System Behavior*: Input validation blocks negative numbers for rewards.

---

## 9. Dependencies & Integrations

*   **Upstream**:
    *   **PAM (Player Account Management)**: Source of truth for Player Segments and Wallet Balance.
    *   **Sportsbook Provider**: Source of `BetSettled` and `AccumulatorSettled` events.
*   **Downstream**:
    *   **Promotion Engine (Backend)**: Consumes the JSON config to evaluate rules.
    *   **Wallet System**: Executes the payout command (Credit Transaction).

---

## 10. Risks & Mitigations

| Risk | Impact | Owner | Mitigation |
| :--- | :--- | :--- | :--- |
| **Financial Exposure** | Unlimited liability if caps aren't enforced. | Risk Team | Hard caps in code. "Budget Stop" feature that auto-pauses promo when budget hits 100%. |
| **Complexity Overload** | Users creating rules too complex to debug. | Product | Limit nesting depth to 3 levels. Provide "Text Summary" of logic (e.g., "IF A and B"). |
| **Performance Impact** | Too many active rules slowing down bet settlement. | Tech Lead | Limit "Active" promotions to 50 per market. Cache rule definitions. |

---

## 11. Success Metrics & KPIs

*   **Operational**:
    *   Time-to-Configure: < 5 minutes for standard templates.
    *   Error Rate: < 1% of published promotions requiring rollback.
*   **Business**:
    *   Adoption: % of total GGR driven by wizard-created promotions.
    *   Campaign Frequency: Increase from 2/month to 5/week.

---

## 12. Rollout, Experimentation & Backward Compatibility

*   **Rollout Strategy**:
    *   **Phase 1 (Alpha)**: Internal tech team use only (Production verification).
    *   **Phase 2 (Beta)**: Ethiopia Marketing Team only (Single Market).
    *   **Phase 3 (GA)**: Global rollout to all markets.
*   **Backward Compatibility**:
    *   Existing hardcoded promotions ("Legacy") will coexist with new Wizard promotions until migrated. New engine must support "Legacy Mock Wrappers" if strict migration isn't possible.

---

## 13. Open Questions & TBDs

| Topic | Question | Owner | Next Step |
| :--- | :--- | :--- | :--- |
| **Translations** | Do we need localized UI for French-speaking markets (DRC)? | Product | Verify roadmap for DRC expansion. |
| **Approval Flow** | Is a "4-eyes" approval workflow required for MVP? | Compliance | Decision needed by [Date]. |
