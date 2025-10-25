Uniloop - V2 Product Specification & Roadmap

Version: 2.0
Date: October 25, 2025
Status: DRAFT
Authors: [Your Name/Team Name], AI Assistant

Table of Contents

Executive Summary & Vision

1.1. App Name & Tagline

1.2. Vision Statement

1.3. The Uniloop Difference: Productivity, Connection, Trust

1.4. The "Why Now": Seizing the Moment

1.5. The 5-Year Vision: AI Campus Layer

Goals & Strategy

2.1. Business Goals

2.2. Product Goals (V2)

2.3. Strategic Approach: AI-First Utility & Verified Community

2.4. Go-to-Market Strategy (Pilot Phase)

Target Audience & Personas

3.1. Primary: University Students ("Priya")

3.2. Secondary: Faculty Admins/Moderators ("Prof. Sharma")

User Experience & Design Principles

4.1. Core Principles: AI-First, Simplicity, Speed, Trust

4.2. The "Magic Moment": Personalized AI Interaction

4.3. Hook -> Habit -> Expansion Loop

4.4. UI/UX Guidelines (Dark Theme, NativeWind, Accessibility)

MVP Specification (Phase 1 Recap)

5.1. MVP Goals & Hypotheses

5.2. MVP Feature Set (Brief List - refer to MVP Spec for details)

5.3. MVP Success Metrics

Uniloop V2 Feature Specification (Full Vision)

6.1. Core Architecture: AI as the Interface

6.2. Student Verification (Faculty-Backed)

6.3. "Campus Genie" AI Assistant (V2 - Text & Voice)

6.4. Visual "Today" Dashboard

6.5. Community Feed & Content (Posts, Reels - V2)

6.6. Groups & Micro-Communities (V2)

6.7. Productive Connections & Discovery (V2 - AI Enhanced)

6.8. Anonymous & Public Suggestions Hub (V2 - Integrated)

6.9. Campus Utilities (Mess Menu, Events Calendar - V2)

6.10. "Year Countdown" Productivity Nudges

6.11. Mental Wellness & Safety Features (V2 - Integrated SOS)

6.12. Real-Time Chat (V2 - DMs & Group Chat)

6.13. Admin Dashboard (V2 - Enhanced)

User Flow Analysis & Flowcharts (V2)

7.1. Onboarding & Verification Flow

7.2. Daily Utility Check Flow (AI & Visual)

7.3. Posting Flow (Public/Anonymous via AI)

7.4. Finding Connections/Groups Flow (via AI)

7.5. Safety Reporting Flow

Text-Based Flowchart Descriptions Appended

Technical Architecture & Stack (V2)

8.1. Architecture Pattern (BFF + Services)

8.2. Key Services & Responsibilities

8.3. Technology Stack (Frontend, Backend, AI, DB, Infra)

8.4. Scalability & Performance Considerations

8.5. AI Integration Details (Function Calling, Data Feeds)

Security, Privacy, Moderation & Governance

9.1. Security by Design (Encryption, Auth, Secure Storage)

9.2. Privacy Policy & Data Handling (PII, Minimization, Retention)

9.3. Moderation Strategy (Automated Filters + Human Review)

9.4. Governance Model (Faculty vs. Student Roles - RACI)

9.5. Incident Response Plan (Runbook Summary)

Roadmap & Future Vision

10.1. Phased Rollout (MVP -> V2 -> V3)

10.2. Potential Future Features (V3+)

10.3. Multi-Campus Expansion Strategy

1. Executive Summary & Vision

1.1. App Name & Tagline:

- Name: Uniloop
- Tagline: Your Campus, Connected. (Alternate: The AI Layer for Campus Life.)

  1.2. Vision Statement:
  To be the indispensable, AI-powered digital hub for university life, fostering a verified, secure, and productive campus community where students effortlessly access essential information, connect meaningfully, and navigate their academic journey.

  1.3. The Uniloop Difference: Productivity, Connection, Trust
  Uniloop transcends typical social media by integrating essential campus utilities, AI-driven information retrieval, verified interactions, and safety features. It prioritizes student well-being and productivity over passive consumption. The "Campus Genie" AI assistant serves as the primary, intuitive interface to this trusted ecosystem.

  1.4. The "Why Now": Seizing the Moment

- Inevitable Shift: With universities rapidly digitizing post-COVID and Gen Z students native to AI (like ChatGPT) and mobile-first interactions, the demand for integrated, intelligent campus solutions is peaking. Students crave trusted, distraction-free digital spaces tailored to their specific university context.
- Uniloop's Position: Uniloop capitalizes on this shift, offering the next natural step – an AI campus layer where verified trust and seamless utility come first. 2025/2026 represents the perfect launch window as AI acceptance solidifies and the need for focused digital campus tools becomes critical.

  1.5. The 5-Year Vision: AI Campus Layer
  In 5 years, Uniloop will be the verified AI campus layer for universities globally — connecting 10M+ students to real-time campus intelligence and opportunities. It will be the indispensable daily habit that replaces fragmented WhatsApp groups, outdated notice boards, and clunky portals — becoming the trusted, intelligent interface between students, faculty, resources, and their future. It's not just an app; it's the operating system for the modern campus experience.

2. Goals & Strategy

2.1. Business Goals:

- Achieve dominant market share within pilot university within 12 months.
- Secure partnerships with university administration for verification and data feeds.
- Establish a sustainable model (freemium, university partnerships).
- Expand to multiple campuses within 3 years.

  2.2. Product Goals (V2):

- Deliver a seamless, reliable, and "magical" AI assistant experience for core campus tasks.
- Foster a highly engaged, verified community focused on productive interactions.
- Become the primary source for daily campus utility information (Menu, Events).
- Successfully integrate and promote wellness and safety features.
- Achieve high user satisfaction (NPS > 50) and retention (>40% Month 1).

  2.3. Strategic Approach: AI-First Utility & Verified Community

- AI as the Interface: Leverage the "Campus Genie" (Gemini API with robust function calling) as the primary, natural language method for accessing information and performing actions. This isn't just a chatbot feature; it's the core interaction model. \* Utility Drives Habit: Anchor daily usage through indispensable features like the Mess Menu and Events Calendar, made instantly accessible via AI and visual snippets.
- Verification Builds Trust: Mandate faculty-backed verification to create a uniquely safe and relevant environment, enabling features (like safety reporting and productive connections) that are impossible on open platforms.
- Productivity Focus: Differentiate from time-wasting social media by integrating features like the "Year Countdown" and facilitating connections for study groups, projects, and internships.

  2.4. Go-to-Market Strategy (Pilot Phase):

- Target: Launch within one specific, supportive university (e.g., your own).
- Partnerships: Secure formal agreement with university administration for verification support, data access (menu, events), and promotion. Partner with the student council/government.
- Onboarding: Utilize QR codes at high-traffic locations (mess halls, library, orientation events) leading directly to app download and verification flow. Leverage university email lists for initial invites.
- Initial Traction: Aim for 500-1000 verified users within the first month through targeted outreach via student clubs, class representatives, and orientation sessions. Seed initial content (events, club info).

3. Target Audience & Personas

3.1. Primary Persona: "Priya" - The Engaged Undergrad (As defined in MVP Spec) - Focus: Needs instant info, reliable connections, safety.

3.2. Secondary Persona: "Prof. Sharma" - Faculty Admin/Moderator (As defined in MVP Spec) - Focus: Needs efficient tools for verification, data updates, report handling.

4. User Experience & Design Principles

4.1. Core Principles:

- AI-First, Visually Assisted: Chat is primary; use clean visuals to clarify and summarize.
- Simplicity & Speed: Minimalist UI, instant responses, fluid navigation. Performance is paramount.
- Trust & Transparency: Clear communication on verification, data use, AI actions, safety processes.
- Personalized & Contextual: AI should feel like a personal assistant, aware of user context (course, interests).
- Productive & Actionable: Guide users towards useful actions and connections.

  4.2. The "Magic Moment": Personalized AI Interaction
  The core "Aha!" moment occurs when the Campus Genie provides a personalized, context-aware, and effortlessly useful response that saves the user time and feels uniquely tailored to them.

- Example: User asks, "What's happening tonight?"
- Magic Response: "Hey Priya 👋! Tonight your hostel mess has Pizza Night 🍕 (rated 4 stars yesterday!). Also, the Coding Club (which you follow) has a workshop at 7 PM in Room 301. Need directions?"
- Implementation: Requires AI to access user profile data (name, hostel, followed clubs/interests), recent data (mess ratings), and event data, then synthesize a friendly, actionable response using appropriate tone and emojis.

  4.3. Hook -> Habit -> Expansion Loop:

- Hook (Day 1 - Utility): Instant access to Mess Menu/Events via AI/Snippet. Faster than asking friends or checking websites. User Think: "Wow, that was easy."
- Habit (Week 1 - Routine & Micro-Feedback): Daily check becomes routine. Add subtle, non-intrusive feedback like "Checked the menu 5 days in a row? You're officially a Uniloop regular 🔁!" User Think: "This is my go-to for campus info."
- Expansion (Month 1 - Proactive AI & Connection): AI starts suggesting relevant connections, groups, or events based on user profile/activity. "Priya, someone in your CS class just posted looking for a study partner for the upcoming exam. Want me to connect you?" or "The Photography Club you might like has an event today." User Think: "Uniloop helps me discover things and connect."

  4.4. UI/UX Guidelines:

- Theme: Default Dark Mode with optional Light Mode. Use university brand colors sparingly as accents.
- Framework: NativeWind for Tailwind CSS utility classes – ensures consistency and rapid development.
- Performance: Optimize list rendering (FlashList), image loading (expo-image), minimize bundle size. Prioritize Time-to-Interact (TTI).
- AI Interface: Clean chat bubbles, clear distinction between user/AI, integrated suggested prompts, seamless display of rich results (cards for events/profiles) within chat.
- Accessibility: Adhere to WCAG AA standards (contrast, font scaling, screen reader support).

5. MVP Specification (Phase 1 Recap)

5.1. MVP Goals & Hypotheses: (As defined in MVP Spec V1.1)

5.2. MVP Feature Set:

- Streamlined Email Verification
- AI Chat (Text): getMessMenu, getTodaysEvents, getCampusInfo, createPost (Text, Anon), getRecentPosts
- Visual "Today" Snippet
- Basic User Profiles (View via AI)
- Safety Reporting Button -> Admin Queue
- Admin Dashboard: Verification Mgt, AI Data Entry (Menu, Events, FAQs), Report Queue

  5.3. MVP Success Metrics: (As defined in MVP Spec V1.1 - Adoption, DAU, Core Utility Engagement, AI Interaction Rate, etc.)

6. Uniloop V2 Feature Specification (Full Vision)

This represents the target feature set after iterating on the MVP.

6.1. Core Architecture: AI as the Interface

- Positioning: Emphasize that "Campus Genie isn’t just chat — it’s the natural language interface to all campus systems. Every menu, event, or safety report flows through structured data → AI understands it → students interact effortlessly." AI acts as the intelligent orchestration layer.

  6.2. Student Verification (Faculty-Backed)

- Robust flow including Email, Enrollment No., ID Upload, Live Selfie (as per initial docs). Faculty review via Admin Dashboard. Secure, encrypted storage and minimal retention.

  6.3. "Campus Genie" AI Assistant (V2 - Text & Voice)

- Voice I/O: Add STT (@react-native-voice/voice) and TTS (expo-speech) integration. Microphone button in chat interface.
- Expanded Functions:
- findUsers(criteria): Search based on interests, course, year, clubs, "looking for study partner".
- findGroups(interest): Discover relevant groups.
- getEventDetails(event_id) / rsvpEvent(event_id)
- getMenuRating(date, meal) / rateMenuItem(item_id, rating)
- createReminder(details, time)
- getYearCountdownInfo(): Retrieve productivity prompts.
- Personalization: Implement the "Magic Moment" logic (using name, context, suggestions).
- Proactive Suggestions: Based on user activity and calendar (Expansion Loop).

  6.4. Visual "Today" Dashboard

- Enhanced glanceable view: Today's Menu items (maybe with top rating), next 2-3 Events, link to full Event Calendar, one "Year Countdown" prompt. May include widgets for key group updates.

  6.5. Community Feed & Content (Posts, Reels - V2)

- Visual Feed Tab: A dedicated, browsable feed screen (using FlashList). Filterable by tags.
- Reels/Short Video: Support for uploading short videos (transcoded backend), displayed in feed or separate Reels tab. Basic in-app viewer.
- Enhanced Posts: Support images alongside text. AI function createPost updated.
- Reporting: Add "Report Post" option.

  6.6. Groups & Micro-Communities (V2)

- Dedicated Groups Tab: Browse official clubs and user-created interest groups.
- Group Pages: Each group has a dedicated feed, member list, basic info.
- Admin/Moderator Roles: Allow verified club admins or group creators to manage posts/members within their group.

  6.7. Productive Connections & Discovery (V2 - AI Enhanced)

- AI-Driven Suggestions: Genie proactively suggests relevant users (study partners, project collaborators) based on profile tags, course, and posts (e.g., "Priya, Raj from your class posted in #StudyHelp about needing help with the Algo assignment. Connect?").
- Profile Enhancements: Add sections for skills, projects, "Looking for..." (study buddy, band member, etc.).
- Opt-In "Connect": Potential simple feature (separate from core) for social/dating matching based on shared interests/events attended, strictly opt-in.

  6.8. Anonymous & Public Suggestions Hub (V2 - Integrated)

- Integrate suggestions into the main feed using #Suggestion or #Anonymous tags.
- Dedicated filter/view for suggestions.
- Faculty can respond via comments (clearly marked as Admin) or trigger actions. Track status (Received, In Progress, Addressed).

  6.9. Campus Utilities (Mess Menu, Events Calendar - V2)

- Interactive Menu: Full menu view (not just snippet), filter by dietary needs, view ratings/comments per item. Submit ratings/feedback directly.
- Events Calendar: Full visual calendar view, filter by category (Academic, Club, Social), RSVP functionality, add-to-device-calendar option.

  6.10. "Year Countdown" Productivity Nudges

- Dedicated section or integrated prompts in AI chat/dashboard.
- Links to relevant campus resources (career services, workshops, library databases).
- Calendar-aware (e.g., "Midterms are in 3 weeks! Check out these study resources...").

  6.11. Mental Wellness & Safety Features (V2 - Integrated SOS)

- Mood Journal (Optional): Simple private mood logging. AI can offer generic supportive resources (link to counseling services) based on negative trends if explicitly opted-in. No AI therapy.
- SOS Alert: Persistent button. Streamlined reporting. Clear escalation path defined in Admin Dashboard and Runbook. Faculty receive immediate notification.
- Resource Links: Easy access to campus counseling, helplines, safety procedures.

  6.12. Real-Time Chat (V2 - DMs & Group Chat)

- Direct Messaging: Basic 1:1 chat between connected/followed users.
- Group Chat: Simple real-time chat within joined Groups (optional, may rely on AI posting in V2).
- Faculty Control: Backend infrastructure managed by faculty for security/compliance. Consider E2EE options for private chats in later phases.

  6.13. Admin Dashboard (V2 - Enhanced)

- Improved UI for verification, report handling, data entry.
- Content moderation queue with tools (remove, warn, ban user).
- Basic analytics (user growth, feature usage, AI query stats).
- Announcement broadcasting tool.
- User management (suspend/reactivate accounts).

7. User Flow Analysis & Flowcharts (V2)

(Detailed flow diagrams are best done visually. Below are text descriptions)

7.1. Onboarding & Verification Flow:

- App Open -> Sign Up Screen -> Enter Email -> Email Sent -> User Clicks Link -> App Confirms -> Enter Enrollment/ID Info -> Upload ID Photo -> Capture Live Selfie -> Submit -> Pending Review Screen -> [Admin Approves] -> Verified -> Main App Access

  7.2. Daily Utility Check Flow (AI & Visual):

- App Open -> View "Today" Dashboard Snippet (Menu/Events)
- App Open -> Tap AI Chat -> Type/Speak "What's for lunch?" -> AI Function Call (getMessMenu) -> AI Displays Formatted Menu in Chat

  7.3. Posting Flow (Public/Anonymous via AI):

- Open AI Chat -> Type/Speak "Post: [Content] #TagName" -> AI Confirms "Post public?" -> User Confirms -> AI Function Call (createPost) -> Post Appears in Feed
- Open AI Chat -> Type/Speak "Post anonymously: [Content] #Suggestion" -> AI Confirms "Post anonymous?" -> User Confirms -> AI Function Call (createPost, anon=true) -> Post Appears (Anonymously)

  7.4. Finding Connections/Groups Flow (via AI):

- Open AI Chat -> Type/Speak "Find CS students interested in AI" -> AI Function Call (findUsers) -> AI Displays List of Matching Profiles (Cards) -> User Taps Profile -> View Profile -> Option to "Connect"
- Open AI Chat -> Type/Speak "Show me coding clubs" -> AI Function Call (findGroups) -> AI Displays List of Groups (Cards) -> User Taps Group -> View Group Page -> Option to "Join"

  7.5. Safety Reporting Flow:

- Any Screen -> Tap Persistent SOS Button -> Report Screen (Categories) -> Select Category -> Add Description (Optional) -> Submit -> Confirmation Screen -> Return to Previous Screen

8. Technical Architecture & Stack (V2)

8.1. Architecture Pattern: BFF + Modular Services (as described in FYND doc).

8.2. Key Services & Responsibilities: Auth, Verification, Feed, Groups, Messaging, Moderation, Media, AI Function Handler, Admin, Notifications. Faculty controls Auth, Verification, Messaging Backend, Admin, and final oversight of Moderation data.

8.3. Technology Stack: (As per FYND Doc: Expo, NativeWind, Zustand, Node/Python/Go, Postgres, Redis, S3, Keycloak, Gemini API).

8.4. Scalability & Performance: Load balancing for BFF/services, DB read replicas, Redis caching, efficient AI function call implementation (batching, async processing where possible), CDN for media.

8.5. AI Integration: Robust backend service dedicated to handling function calls from Gemini API. Securely passes necessary context (user ID, query params) and retrieves structured data from other services/DBs. Data pipelines to keep Menu, Events, User Directory fresh for AI.

9. Security, Privacy, Moderation & Governance

9.1. Security: TLS, Encryption at Rest (KMS for PII), Signed URLs, JWT (short-lived + refresh), 2FA for Admins, WAF, Rate Limiting. Regular security audits.

9.2. Privacy: Clear policy, consent for verification data, strict data minimization, defined retention periods, GDPR/Local Law compliance reviewed by university legal.

9.3. Moderation: Hybrid approach: Automated filters (NSFW, toxicity - e.g., Perspective API) -> Human Moderator Queue (Faculty + Trained Student Mods) -> Action (Warn, Remove, Suspend) -> Escalation Path. Clear guidelines.

9.4. Governance: Formal MOU with university. Clear RACI matrix defining Faculty (Accountable/Responsible for sensitive data, security, prod deploys) and Student Devs (Responsible for frontend, non-sensitive features, staging deploys). Regular handover process documented.

9.5. Incident Response: Documented Runbook (accessible to Faculty Admins) covering: Security Breach, Safety Incident (SOS), Service Outage, Moderation Failure. Includes detection, triage, containment, remediation, communication, and postmortem steps.

10. Roadmap & Future Vision

10.1. Phased Rollout:

- Phase 1 (MVP - 3-5 months): Core utility, verification, basic AI chat/posting, safety button, admin panel. Pilot launch.
- Phase 2 (V2 - 6-9 months post-MVP): Voice AI, Reels, DMs/Group Chat, Enhanced AI Connections, Wellness Features, Moderation Tools. Wider university rollout.
- Phase 3 (Scaling - 12+ months post-MVP): Deeper integrations, advanced analytics, multi-campus exploration, potential premium features.

  10.2. Potential Future Features (V3+): Campus marketplace, advanced event ticketing, alumni network integration, deeper ERP integration (grades, schedules - requires significant university partnership), gamified campus challenges.

  10.3. Multi-Campus Expansion: Requires standardizing verification, data feeds, and moderation across institutions. Potential for federated architecture.

This document provides a comprehensive, professional blueprint for Uniloop V2, integrating all previous ideas and incorporating strategic best practices. It's ready to be used as a guide for development, discussion with stakeholders, and future planning.
