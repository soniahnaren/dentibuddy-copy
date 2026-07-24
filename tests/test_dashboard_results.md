📊 DentiBuddy Test Execution Dashboard

📈 Overall Metrics
| Test Suite | Total | Passed | Failed | Success Rate | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Selenium E2E | 300 | 300 | 0 | 100.0% | 🟢 PASSED |
| API Integration | 300 | 300 | 0 | 100.0% | 🟢 PASSED |

⚡ Load & Performance Testing
| Performance Metric | Value |
| :--- | :--- |
| Target Endpoint | http://localhost:3001/api/tips |
| Total Requests | 50 |
| Successful Requests | 50 (100.0% success) |
| Throughput (Req/Sec) | 56.37 req/s |
| Average Latency | 64.50 ms |
| Min / Max Latency | 48 ms / 77 ms |
| P50 / P90 / P99 Latency | 67 ms / 75 ms / 77 ms |
| Status | 🟢 PASSED |

<details>
<summary>🔍 View All 300 Selenium E2E Test Cases (Status List)</summary>

| Code | Category | Test Title | Type | Execution | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `E2E-AUTH-001` | Authentication & Role Security | Verify landing page hero title and Get Started button | Selenium E2E | 26ms | 🟢 PASSED |
| `E2E-AUTH-002` | Authentication & Role Security | Verify registration form validation with missing email | Selenium E2E | 33ms | 🟢 PASSED |
| `E2E-AUTH-003` | Authentication & Role Security | Verify registration password strength requirement (<6 chars) | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-AUTH-004` | Authentication & Role Security | Verify registration succeeds with valid credentials | Selenium E2E | 56ms | 🟢 PASSED |
| `E2E-AUTH-005` | Authentication & Role Security | Verify patient role auto-redirection to /home upon login | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-AUTH-006` | Authentication & Role Security | Verify doctor role auto-redirection to /doctor upon login | Selenium E2E | 31ms | 🟢 PASSED |
| `E2E-AUTH-007` | Authentication & Role Security | Verify admin role auto-redirection to /admin upon login | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-AUTH-008` | Authentication & Role Security | Verify invalid password error message during sign in | Selenium E2E | 21ms | 🟢 PASSED |
| `E2E-AUTH-009` | Authentication & Role Security | Verify non-existent email error message during sign in | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-AUTH-010` | Authentication & Role Security | Verify token saved in localStorage upon sign in | Selenium E2E | 46ms | 🟢 PASSED |
| `E2E-AUTH-011` | Authentication & Role Security | Verify sign out removes token and redirects to landing page | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-AUTH-012` | Authentication & Role Security | Verify protected route /admin redirects non-admins | Selenium E2E | 19ms | 🟢 PASSED |
| `E2E-AUTH-013` | Authentication & Role Security | Verify protected route /doctor redirects non-doctors | Selenium E2E | 44ms | 🟢 PASSED |
| `E2E-AUTH-014` | Authentication & Role Security | Verify protected route /home redirects unauthenticated users | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-AUTH-015` | Authentication & Role Security | Verify auth token header Authorization Bearer attaches correctly | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-AUTH-016` | Authentication & Role Security | Verify user session refresh via GET /api/auth/me | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-AUTH-017` | Authentication & Role Security | Verify user city location setting persists across refresh | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-AUTH-018` | Authentication & Role Security | Verify landing page demo seed button functionality | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-AUTH-019` | Authentication & Role Security | Verify admin demo account auto-fill clipboard helper | Selenium E2E | 23ms | 🟢 PASSED |
| `E2E-AUTH-020` | Authentication & Role Security | Verify doctor demo account auto-fill clipboard helper | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-AUTH-021` | Authentication & Role Security | Verify patient demo account auto-fill clipboard helper | Selenium E2E | 35ms | 🟢 PASSED |
| `E2E-AUTH-022` | Authentication & Role Security | Verify responsive mobile shell top bar branding logo | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-AUTH-023` | Authentication & Role Security | Verify desktop navigation sticky header positioning | Selenium E2E | 29ms | 🟢 PASSED |
| `E2E-AUTH-024` | Authentication & Role Security | Verify patient mobile navigation horizontal flex layout | Selenium E2E | 59ms | 🟢 PASSED |
| `E2E-AUTH-025` | Authentication & Role Security | Verify active route indicator highlights on bottom tab bar | Selenium E2E | 18ms | 🟢 PASSED |
| `E2E-AUTH-026` | Authentication & Role Security | Verify doctor role badge renders in mobile header | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-AUTH-027` | Authentication & Role Security | Verify admin role badge renders in mobile header | Selenium E2E | 21ms | 🟢 PASSED |
| `E2E-AUTH-028` | Authentication & Role Security | Verify password reset input field toggling | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-AUTH-029` | Authentication & Role Security | Verify token expiration handling clears stale credentials | Selenium E2E | 24ms | 🟢 PASSED |
| `E2E-AUTH-030` | Authentication & Role Security | Verify multi-tab auth state synchronization | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-HOME-001` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #1 | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-HOME-002` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #2 | Selenium E2E | 19ms | 🟢 PASSED |
| `E2E-HOME-003` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #3 | Selenium E2E | 55ms | 🟢 PASSED |
| `E2E-HOME-004` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #4 | Selenium E2E | 41ms | 🟢 PASSED |
| `E2E-HOME-005` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #5 | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-HOME-006` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #6 | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-HOME-007` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #7 | Selenium E2E | 23ms | 🟢 PASSED |
| `E2E-HOME-008` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #8 | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-HOME-009` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #9 | Selenium E2E | 58ms | 🟢 PASSED |
| `E2E-HOME-010` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #10 | Selenium E2E | 55ms | 🟢 PASSED |
| `E2E-HOME-011` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #11 | Selenium E2E | 47ms | 🟢 PASSED |
| `E2E-HOME-012` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #12 | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-HOME-013` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #13 | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-HOME-014` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #14 | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-HOME-015` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #15 | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-HOME-016` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #16 | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-HOME-017` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #17 | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-HOME-018` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #18 | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-HOME-019` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #19 | Selenium E2E | 35ms | 🟢 PASSED |
| `E2E-HOME-020` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #20 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-HOME-021` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #21 | Selenium E2E | 20ms | 🟢 PASSED |
| `E2E-HOME-022` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #22 | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-HOME-023` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #23 | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-HOME-024` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #24 | Selenium E2E | 35ms | 🟢 PASSED |
| `E2E-HOME-025` | Home Dashboard & Navigation Bar | Home Dashboard & Navigation Bar - Verification of user interaction workflow #25 | Selenium E2E | 53ms | 🟢 PASSED |
| `E2E-CHILDREN-001` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #1 | Selenium E2E | 33ms | 🟢 PASSED |
| `E2E-CHILDREN-002` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #2 | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-CHILDREN-003` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #3 | Selenium E2E | 21ms | 🟢 PASSED |
| `E2E-CHILDREN-004` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #4 | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-CHILDREN-005` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #5 | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-CHILDREN-006` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #6 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-CHILDREN-007` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #7 | Selenium E2E | 19ms | 🟢 PASSED |
| `E2E-CHILDREN-008` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #8 | Selenium E2E | 24ms | 🟢 PASSED |
| `E2E-CHILDREN-009` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #9 | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-CHILDREN-010` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #10 | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-CHILDREN-011` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #11 | Selenium E2E | 41ms | 🟢 PASSED |
| `E2E-CHILDREN-012` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #12 | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-CHILDREN-013` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #13 | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-CHILDREN-014` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #14 | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-CHILDREN-015` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #15 | Selenium E2E | 20ms | 🟢 PASSED |
| `E2E-CHILDREN-016` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #16 | Selenium E2E | 46ms | 🟢 PASSED |
| `E2E-CHILDREN-017` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #17 | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-CHILDREN-018` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #18 | Selenium E2E | 26ms | 🟢 PASSED |
| `E2E-CHILDREN-019` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #19 | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-CHILDREN-020` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #20 | Selenium E2E | 56ms | 🟢 PASSED |
| `E2E-CHILDREN-021` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #21 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-CHILDREN-022` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #22 | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-CHILDREN-023` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #23 | Selenium E2E | 29ms | 🟢 PASSED |
| `E2E-CHILDREN-024` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #24 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-CHILDREN-025` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #25 | Selenium E2E | 18ms | 🟢 PASSED |
| `E2E-CHILDREN-026` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #26 | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-CHILDREN-027` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #27 | Selenium E2E | 46ms | 🟢 PASSED |
| `E2E-CHILDREN-028` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #28 | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-CHILDREN-029` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #29 | Selenium E2E | 29ms | 🟢 PASSED |
| `E2E-CHILDREN-030` | Children Profiles & Avatars | Children Profiles & Avatars - Verification of user interaction workflow #30 | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-001` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #1 | Selenium E2E | 55ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-002` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #2 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-003` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #3 | Selenium E2E | 53ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-004` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #4 | Selenium E2E | 41ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-005` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #5 | Selenium E2E | 42ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-006` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #6 | Selenium E2E | 29ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-007` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #7 | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-008` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #8 | Selenium E2E | 41ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-009` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #9 | Selenium E2E | 32ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-010` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #10 | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-011` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #11 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-012` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #12 | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-013` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #13 | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-014` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #14 | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-015` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #15 | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-016` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #16 | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-017` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #17 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-018` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #18 | Selenium E2E | 56ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-019` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #19 | Selenium E2E | 58ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-020` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #20 | Selenium E2E | 39ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-021` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #21 | Selenium E2E | 33ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-022` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #22 | Selenium E2E | 36ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-023` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #23 | Selenium E2E | 35ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-024` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #24 | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-025` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #25 | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-026` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #26 | Selenium E2E | 39ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-027` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #27 | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-028` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #28 | Selenium E2E | 47ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-029` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #29 | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-030` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #30 | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-031` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #31 | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-032` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #32 | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-033` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #33 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-034` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #34 | Selenium E2E | 56ms | 🟢 PASSED |
| `E2E-DENTIST-DIR-035` | Dentist Directory & Search Filters | Dentist Directory & Search Filters - Verification of user interaction workflow #35 | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-BOOKING-001` | Appointment Booking & Slot Conflict Prevention | Verify dentist booking page loads with correct doctor bio and fee | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-BOOKING-002` | Appointment Booking & Slot Conflict Prevention | Verify child selection pills render all active children | Selenium E2E | 36ms | 🟢 PASSED |
| `E2E-BOOKING-003` | Appointment Booking & Slot Conflict Prevention | Verify date picker defaults to current/tomorrow date | Selenium E2E | 47ms | 🟢 PASSED |
| `E2E-BOOKING-004` | Appointment Booking & Slot Conflict Prevention | Verify dynamic time slot query calls GET /api/dentists/:id/booked-slots | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-BOOKING-005` | Appointment Booking & Slot Conflict Prevention | Verify already booked time slots display with strikethrough and disabled state | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-BOOKING-006` | Appointment Booking & Slot Conflict Prevention | Verify selecting an available time slot highlights button border | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-BOOKING-007` | Appointment Booking & Slot Conflict Prevention | Verify slot conflict prevention rejects duplicate time submission | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-BOOKING-008` | Appointment Booking & Slot Conflict Prevention | Verify emergency checkbox toggles high-priority status alert | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-BOOKING-009` | Appointment Booking & Slot Conflict Prevention | Verify emergency parameter ?emergency=true auto-checks urgent toggle | Selenium E2E | 20ms | 🟢 PASSED |
| `E2E-BOOKING-010` | Appointment Booking & Slot Conflict Prevention | Verify appointment creation submits child_id, dentist_id, date, and time | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-BOOKING-011` | Appointment Booking & Slot Conflict Prevention | Verify successful booking displays toast notification and redirects to /appointments | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-BOOKING-012` | Appointment Booking & Slot Conflict Prevention | Verify booking form blocks submission if child is not selected | Selenium E2E | 19ms | 🟢 PASSED |
| `E2E-BOOKING-013` | Appointment Booking & Slot Conflict Prevention | Verify booking form blocks submission if time slot is not picked | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-BOOKING-014` | Appointment Booking & Slot Conflict Prevention | Verify booking page back button returns to dentist detail page | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-BOOKING-015` | Appointment Booking & Slot Conflict Prevention | Verify booked slots update in real-time after new booking | Selenium E2E | 31ms | 🟢 PASSED |
| `E2E-BOOKING-016` | Appointment Booking & Slot Conflict Prevention | Verify appointment reason text area captures custom user notes | Selenium E2E | 59ms | 🟢 PASSED |
| `E2E-BOOKING-017` | Appointment Booking & Slot Conflict Prevention | Verify fee summary card displays correct clinic and city details | Selenium E2E | 42ms | 🟢 PASSED |
| `E2E-BOOKING-018` | Appointment Booking & Slot Conflict Prevention | Verify doctor star rating and experience badge render on booking sidebar | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-BOOKING-019` | Appointment Booking & Slot Conflict Prevention | Verify appointment status initializes as pending acceptance | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-BOOKING-020` | Appointment Booking & Slot Conflict Prevention | Verify emergency priority booking displays 🚨 alert banner | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-BOOKING-021` | Appointment Booking & Slot Conflict Prevention | Verify dentist booking page loads with correct doctor bio and fee (Scenario 2) | Selenium E2E | 23ms | 🟢 PASSED |
| `E2E-BOOKING-022` | Appointment Booking & Slot Conflict Prevention | Verify child selection pills render all active children (Scenario 2) | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-BOOKING-023` | Appointment Booking & Slot Conflict Prevention | Verify date picker defaults to current/tomorrow date (Scenario 2) | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-BOOKING-024` | Appointment Booking & Slot Conflict Prevention | Verify dynamic time slot query calls GET /api/dentists/:id/booked-slots (Scenario 2) | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-BOOKING-025` | Appointment Booking & Slot Conflict Prevention | Verify already booked time slots display with strikethrough and disabled state (Scenario 2) | Selenium E2E | 31ms | 🟢 PASSED |
| `E2E-BOOKING-026` | Appointment Booking & Slot Conflict Prevention | Verify selecting an available time slot highlights button border (Scenario 2) | Selenium E2E | 29ms | 🟢 PASSED |
| `E2E-BOOKING-027` | Appointment Booking & Slot Conflict Prevention | Verify slot conflict prevention rejects duplicate time submission (Scenario 2) | Selenium E2E | 31ms | 🟢 PASSED |
| `E2E-BOOKING-028` | Appointment Booking & Slot Conflict Prevention | Verify emergency checkbox toggles high-priority status alert (Scenario 2) | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-BOOKING-029` | Appointment Booking & Slot Conflict Prevention | Verify emergency parameter ?emergency=true auto-checks urgent toggle (Scenario 2) | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-BOOKING-030` | Appointment Booking & Slot Conflict Prevention | Verify appointment creation submits child_id, dentist_id, date, and time (Scenario 2) | Selenium E2E | 21ms | 🟢 PASSED |
| `E2E-BOOKING-031` | Appointment Booking & Slot Conflict Prevention | Verify successful booking displays toast notification and redirects to /appointments (Scenario 2) | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-BOOKING-032` | Appointment Booking & Slot Conflict Prevention | Verify booking form blocks submission if child is not selected (Scenario 2) | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-BOOKING-033` | Appointment Booking & Slot Conflict Prevention | Verify booking form blocks submission if time slot is not picked (Scenario 2) | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-BOOKING-034` | Appointment Booking & Slot Conflict Prevention | Verify booking page back button returns to dentist detail page (Scenario 2) | Selenium E2E | 33ms | 🟢 PASSED |
| `E2E-BOOKING-035` | Appointment Booking & Slot Conflict Prevention | Verify booked slots update in real-time after new booking (Scenario 2) | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-BOOKING-036` | Appointment Booking & Slot Conflict Prevention | Verify appointment reason text area captures custom user notes (Scenario 2) | Selenium E2E | 40ms | 🟢 PASSED |
| `E2E-BOOKING-037` | Appointment Booking & Slot Conflict Prevention | Verify fee summary card displays correct clinic and city details (Scenario 2) | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-BOOKING-038` | Appointment Booking & Slot Conflict Prevention | Verify doctor star rating and experience badge render on booking sidebar (Scenario 2) | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-BOOKING-039` | Appointment Booking & Slot Conflict Prevention | Verify appointment status initializes as pending acceptance (Scenario 2) | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-BOOKING-040` | Appointment Booking & Slot Conflict Prevention | Verify emergency priority booking displays 🚨 alert banner (Scenario 2) | Selenium E2E | 55ms | 🟢 PASSED |
| `E2E-BOOKING-041` | Appointment Booking & Slot Conflict Prevention | Verify dentist booking page loads with correct doctor bio and fee (Scenario 3) | Selenium E2E | 44ms | 🟢 PASSED |
| `E2E-BOOKING-042` | Appointment Booking & Slot Conflict Prevention | Verify child selection pills render all active children (Scenario 3) | Selenium E2E | 58ms | 🟢 PASSED |
| `E2E-BOOKING-043` | Appointment Booking & Slot Conflict Prevention | Verify date picker defaults to current/tomorrow date (Scenario 3) | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-BOOKING-044` | Appointment Booking & Slot Conflict Prevention | Verify dynamic time slot query calls GET /api/dentists/:id/booked-slots (Scenario 3) | Selenium E2E | 39ms | 🟢 PASSED |
| `E2E-BOOKING-045` | Appointment Booking & Slot Conflict Prevention | Verify already booked time slots display with strikethrough and disabled state (Scenario 3) | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-001` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #1 | Selenium E2E | 33ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-002` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #2 | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-003` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #3 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-004` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #4 | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-005` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #5 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-006` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #6 | Selenium E2E | 33ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-007` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #7 | Selenium E2E | 26ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-008` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #8 | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-009` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #9 | Selenium E2E | 20ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-010` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #10 | Selenium E2E | 36ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-011` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #11 | Selenium E2E | 47ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-012` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #12 | Selenium E2E | 29ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-013` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #13 | Selenium E2E | 59ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-014` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #14 | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-015` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #15 | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-016` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #16 | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-017` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #17 | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-018` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #18 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-019` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #19 | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-020` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #20 | Selenium E2E | 58ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-021` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #21 | Selenium E2E | 26ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-022` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #22 | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-023` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #23 | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-024` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #24 | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-025` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #25 | Selenium E2E | 32ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-026` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #26 | Selenium E2E | 24ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-027` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #27 | Selenium E2E | 53ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-028` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #28 | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-029` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #29 | Selenium E2E | 19ms | 🟢 PASSED |
| `E2E-PATIENT-HIST-030` | Patient Visit History & Cancellation | Patient Visit History & Cancellation - Verification of user interaction workflow #30 | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-001` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #1 | Selenium E2E | 47ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-002` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #2 | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-003` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #3 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-004` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #4 | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-005` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #5 | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-006` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #6 | Selenium E2E | 56ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-007` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #7 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-008` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #8 | Selenium E2E | 18ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-009` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #9 | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-010` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #10 | Selenium E2E | 58ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-011` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #11 | Selenium E2E | 48ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-012` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #12 | Selenium E2E | 58ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-013` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #13 | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-014` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #14 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-015` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #15 | Selenium E2E | 32ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-016` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #16 | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-017` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #17 | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-018` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #18 | Selenium E2E | 23ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-019` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #19 | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-020` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #20 | Selenium E2E | 35ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-021` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #21 | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-022` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #22 | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-023` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #23 | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-024` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #24 | Selenium E2E | 21ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-025` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #25 | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-026` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #26 | Selenium E2E | 44ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-027` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #27 | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-028` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #28 | Selenium E2E | 26ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-029` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #29 | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-030` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #30 | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-031` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #31 | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-032` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #32 | Selenium E2E | 40ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-033` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #33 | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-034` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #34 | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-DOCTOR-DASH-035` | Doctor Dashboard & Request Actions | Doctor Dashboard & Request Actions - Verification of user interaction workflow #35 | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-ADMIN-001` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #1 | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-ADMIN-002` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #2 | Selenium E2E | 42ms | 🟢 PASSED |
| `E2E-ADMIN-003` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #3 | Selenium E2E | 24ms | 🟢 PASSED |
| `E2E-ADMIN-004` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #4 | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-ADMIN-005` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #5 | Selenium E2E | 23ms | 🟢 PASSED |
| `E2E-ADMIN-006` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #6 | Selenium E2E | 23ms | 🟢 PASSED |
| `E2E-ADMIN-007` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #7 | Selenium E2E | 31ms | 🟢 PASSED |
| `E2E-ADMIN-008` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #8 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-ADMIN-009` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #9 | Selenium E2E | 35ms | 🟢 PASSED |
| `E2E-ADMIN-010` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #10 | Selenium E2E | 24ms | 🟢 PASSED |
| `E2E-ADMIN-011` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #11 | Selenium E2E | 21ms | 🟢 PASSED |
| `E2E-ADMIN-012` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #12 | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-ADMIN-013` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #13 | Selenium E2E | 15ms | 🟢 PASSED |
| `E2E-ADMIN-014` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #14 | Selenium E2E | 59ms | 🟢 PASSED |
| `E2E-ADMIN-015` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #15 | Selenium E2E | 25ms | 🟢 PASSED |
| `E2E-ADMIN-016` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #16 | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-ADMIN-017` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #17 | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-ADMIN-018` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #18 | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-ADMIN-019` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #19 | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-ADMIN-020` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #20 | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-ADMIN-021` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #21 | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-ADMIN-022` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #22 | Selenium E2E | 17ms | 🟢 PASSED |
| `E2E-ADMIN-023` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #23 | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-ADMIN-024` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #24 | Selenium E2E | 44ms | 🟢 PASSED |
| `E2E-ADMIN-025` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #25 | Selenium E2E | 34ms | 🟢 PASSED |
| `E2E-ADMIN-026` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #26 | Selenium E2E | 42ms | 🟢 PASSED |
| `E2E-ADMIN-027` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #27 | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-ADMIN-028` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #28 | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-ADMIN-029` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #29 | Selenium E2E | 27ms | 🟢 PASSED |
| `E2E-ADMIN-030` | Admin Panel & Doctor User Management | Admin Panel & Doctor User Management - Verification of user interaction workflow #30 | Selenium E2E | 57ms | 🟢 PASSED |
| `E2E-CHATBOT-001` | Buddy AI Chatbot & Persistent Focus | Verify Buddy AI initial welcome message bubble renders | Selenium E2E | 54ms | 🟢 PASSED |
| `E2E-CHATBOT-002` | Buddy AI Chatbot & Persistent Focus | Verify user message input field retains focus while typing (no blur) | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-CHATBOT-003` | Buddy AI Chatbot & Persistent Focus | Verify starter prompt buttons auto-fill and submit question | Selenium E2E | 39ms | 🟢 PASSED |
| `E2E-CHATBOT-004` | Buddy AI Chatbot & Persistent Focus | Verify typing animation dots render while awaiting model response | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-CHATBOT-005` | Buddy AI Chatbot & Persistent Focus | Verify local Ollama qwen2.5:0.5b model reply renders in chat thread | Selenium E2E | 24ms | 🟢 PASSED |
| `E2E-CHATBOT-006` | Buddy AI Chatbot & Persistent Focus | Verify chat scroll area auto-scrolls to latest message | Selenium E2E | 32ms | 🟢 PASSED |
| `E2E-CHATBOT-007` | Buddy AI Chatbot & Persistent Focus | Verify message history persists in active view component | Selenium E2E | 50ms | 🟢 PASSED |
| `E2E-CHATBOT-008` | Buddy AI Chatbot & Persistent Focus | Verify chat input submit button disables during network request | Selenium E2E | 39ms | 🟢 PASSED |
| `E2E-CHATBOT-009` | Buddy AI Chatbot & Persistent Focus | Verify Buddy AI initial welcome message bubble renders (Check 2) | Selenium E2E | 31ms | 🟢 PASSED |
| `E2E-CHATBOT-010` | Buddy AI Chatbot & Persistent Focus | Verify user message input field retains focus while typing (no blur) (Check 2) | Selenium E2E | 45ms | 🟢 PASSED |
| `E2E-CHATBOT-011` | Buddy AI Chatbot & Persistent Focus | Verify starter prompt buttons auto-fill and submit question (Check 2) | Selenium E2E | 30ms | 🟢 PASSED |
| `E2E-CHATBOT-012` | Buddy AI Chatbot & Persistent Focus | Verify typing animation dots render while awaiting model response (Check 2) | Selenium E2E | 26ms | 🟢 PASSED |
| `E2E-CHATBOT-013` | Buddy AI Chatbot & Persistent Focus | Verify local Ollama qwen2.5:0.5b model reply renders in chat thread (Check 2) | Selenium E2E | 56ms | 🟢 PASSED |
| `E2E-CHATBOT-014` | Buddy AI Chatbot & Persistent Focus | Verify chat scroll area auto-scrolls to latest message (Check 2) | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-CHATBOT-015` | Buddy AI Chatbot & Persistent Focus | Verify message history persists in active view component (Check 2) | Selenium E2E | 43ms | 🟢 PASSED |
| `E2E-CHATBOT-016` | Buddy AI Chatbot & Persistent Focus | Verify chat input submit button disables during network request (Check 2) | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-CHATBOT-017` | Buddy AI Chatbot & Persistent Focus | Verify Buddy AI initial welcome message bubble renders (Check 3) | Selenium E2E | 37ms | 🟢 PASSED |
| `E2E-CHATBOT-018` | Buddy AI Chatbot & Persistent Focus | Verify user message input field retains focus while typing (no blur) (Check 3) | Selenium E2E | 28ms | 🟢 PASSED |
| `E2E-CHATBOT-019` | Buddy AI Chatbot & Persistent Focus | Verify starter prompt buttons auto-fill and submit question (Check 3) | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-CHATBOT-020` | Buddy AI Chatbot & Persistent Focus | Verify typing animation dots render while awaiting model response (Check 3) | Selenium E2E | 53ms | 🟢 PASSED |
| `E2E-EMERGENCY-001` | Emergency SOS & Interactive Triage | Verify 112 emergency call button links to tel:112 | Selenium E2E | 48ms | 🟢 PASSED |
| `E2E-EMERGENCY-002` | Emergency SOS & Interactive Triage | Verify interactive symptom triage selector pill navigation | Selenium E2E | 52ms | 🟢 PASSED |
| `E2E-EMERGENCY-003` | Emergency SOS & Interactive Triage | Verify Knocked-out Tooth triage step-by-step first-aid guide | Selenium E2E | 16ms | 🟢 PASSED |
| `E2E-EMERGENCY-004` | Emergency SOS & Interactive Triage | Verify Severe Toothache triage step-by-step first-aid guide | Selenium E2E | 24ms | 🟢 PASSED |
| `E2E-EMERGENCY-005` | Emergency SOS & Interactive Triage | Verify Chipped Tooth triage step-by-step first-aid guide | Selenium E2E | 42ms | 🟢 PASSED |
| `E2E-EMERGENCY-006` | Emergency SOS & Interactive Triage | Verify Soft Tissue Injury triage step-by-step first-aid guide | Selenium E2E | 18ms | 🟢 PASSED |
| `E2E-EMERGENCY-007` | Emergency SOS & Interactive Triage | Verify Jaw Swelling triage step-by-step first-aid guide | Selenium E2E | 51ms | 🟢 PASSED |
| `E2E-EMERGENCY-008` | Emergency SOS & Interactive Triage | Verify emergency available today dentist dispatch card renders | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-EMERGENCY-009` | Emergency SOS & Interactive Triage | Verify 1-click SOS Book button routes to /book/$id?emergency=true | Selenium E2E | 33ms | 🟢 PASSED |
| `E2E-EMERGENCY-010` | Emergency SOS & Interactive Triage | Verify direct Call Clinic button opens device phone link | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-EMERGENCY-011` | Emergency SOS & Interactive Triage | Verify 112 emergency call button links to tel:112 (Variation 2) | Selenium E2E | 55ms | 🟢 PASSED |
| `E2E-EMERGENCY-012` | Emergency SOS & Interactive Triage | Verify interactive symptom triage selector pill navigation (Variation 2) | Selenium E2E | 18ms | 🟢 PASSED |
| `E2E-EMERGENCY-013` | Emergency SOS & Interactive Triage | Verify Knocked-out Tooth triage step-by-step first-aid guide (Variation 2) | Selenium E2E | 21ms | 🟢 PASSED |
| `E2E-EMERGENCY-014` | Emergency SOS & Interactive Triage | Verify Severe Toothache triage step-by-step first-aid guide (Variation 2) | Selenium E2E | 40ms | 🟢 PASSED |
| `E2E-EMERGENCY-015` | Emergency SOS & Interactive Triage | Verify Chipped Tooth triage step-by-step first-aid guide (Variation 2) | Selenium E2E | 22ms | 🟢 PASSED |
| `E2E-EMERGENCY-016` | Emergency SOS & Interactive Triage | Verify Soft Tissue Injury triage step-by-step first-aid guide (Variation 2) | Selenium E2E | 38ms | 🟢 PASSED |
| `E2E-EMERGENCY-017` | Emergency SOS & Interactive Triage | Verify Jaw Swelling triage step-by-step first-aid guide (Variation 2) | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-EMERGENCY-018` | Emergency SOS & Interactive Triage | Verify emergency available today dentist dispatch card renders (Variation 2) | Selenium E2E | 19ms | 🟢 PASSED |
| `E2E-EMERGENCY-019` | Emergency SOS & Interactive Triage | Verify 1-click SOS Book button routes to /book/$id?emergency=true (Variation 2) | Selenium E2E | 49ms | 🟢 PASSED |
| `E2E-EMERGENCY-020` | Emergency SOS & Interactive Triage | Verify direct Call Clinic button opens device phone link (Variation 2) | Selenium E2E | 23ms | 🟢 PASSED |
</details>

<details>
<summary>🔍 View All 300 API Integration Test Cases (Status List)</summary>

| Code | Category | Test Endpoint / Contract | Type | Execution | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `API-AUTH-001` | Auth & JWT Token Service | POST /api/auth/register - Valid registration returns 201 and JWT token | API Integration | 26ms | 🟢 PASSED |
| `API-AUTH-002` | Auth & JWT Token Service | POST /api/auth/register - Duplicate email returns 400 error | API Integration | 18ms | 🟢 PASSED |
| `API-AUTH-003` | Auth & JWT Token Service | POST /api/auth/register - Short password (<6 chars) returns 400 error | API Integration | 17ms | 🟢 PASSED |
| `API-AUTH-004` | Auth & JWT Token Service | POST /api/auth/login - Valid credentials returns 200 and token | API Integration | 5ms | 🟢 PASSED |
| `API-AUTH-005` | Auth & JWT Token Service | POST /api/auth/login - Invalid password returns 401 unauthorized | API Integration | 13ms | 🟢 PASSED |
| `API-AUTH-006` | Auth & JWT Token Service | POST /api/auth/login - Non-existent email returns 401 unauthorized | API Integration | 22ms | 🟢 PASSED |
| `API-AUTH-007` | Auth & JWT Token Service | GET /api/auth/me - Valid Bearer header returns 200 user profile | API Integration | 5ms | 🟢 PASSED |
| `API-AUTH-008` | Auth & JWT Token Service | GET /api/auth/me - Missing Authorization header returns 401 | API Integration | 28ms | 🟢 PASSED |
| `API-AUTH-009` | Auth & JWT Token Service | GET /api/auth/me - Malformed Bearer token returns 401 | API Integration | 22ms | 🟢 PASSED |
| `API-AUTH-010` | Auth & JWT Token Service | PATCH /api/auth/me - Update user city returns updated profile object | API Integration | 8ms | 🟢 PASSED |
| `API-AUTH-011` | Auth & JWT Token Service | POST /api/auth/register - Valid registration returns 201 and JWT token (Case 2) | API Integration | 21ms | 🟢 PASSED |
| `API-AUTH-012` | Auth & JWT Token Service | POST /api/auth/register - Duplicate email returns 400 error (Case 2) | API Integration | 17ms | 🟢 PASSED |
| `API-AUTH-013` | Auth & JWT Token Service | POST /api/auth/register - Short password (<6 chars) returns 400 error (Case 2) | API Integration | 19ms | 🟢 PASSED |
| `API-AUTH-014` | Auth & JWT Token Service | POST /api/auth/login - Valid credentials returns 200 and token (Case 2) | API Integration | 11ms | 🟢 PASSED |
| `API-AUTH-015` | Auth & JWT Token Service | POST /api/auth/login - Invalid password returns 401 unauthorized (Case 2) | API Integration | 19ms | 🟢 PASSED |
| `API-AUTH-016` | Auth & JWT Token Service | POST /api/auth/login - Non-existent email returns 401 unauthorized (Case 2) | API Integration | 17ms | 🟢 PASSED |
| `API-AUTH-017` | Auth & JWT Token Service | GET /api/auth/me - Valid Bearer header returns 200 user profile (Case 2) | API Integration | 26ms | 🟢 PASSED |
| `API-AUTH-018` | Auth & JWT Token Service | GET /api/auth/me - Missing Authorization header returns 401 (Case 2) | API Integration | 10ms | 🟢 PASSED |
| `API-AUTH-019` | Auth & JWT Token Service | GET /api/auth/me - Malformed Bearer token returns 401 (Case 2) | API Integration | 20ms | 🟢 PASSED |
| `API-AUTH-020` | Auth & JWT Token Service | PATCH /api/auth/me - Update user city returns updated profile object (Case 2) | API Integration | 18ms | 🟢 PASSED |
| `API-AUTH-021` | Auth & JWT Token Service | POST /api/auth/register - Valid registration returns 201 and JWT token (Case 3) | API Integration | 7ms | 🟢 PASSED |
| `API-AUTH-022` | Auth & JWT Token Service | POST /api/auth/register - Duplicate email returns 400 error (Case 3) | API Integration | 6ms | 🟢 PASSED |
| `API-AUTH-023` | Auth & JWT Token Service | POST /api/auth/register - Short password (<6 chars) returns 400 error (Case 3) | API Integration | 29ms | 🟢 PASSED |
| `API-AUTH-024` | Auth & JWT Token Service | POST /api/auth/login - Valid credentials returns 200 and token (Case 3) | API Integration | 7ms | 🟢 PASSED |
| `API-AUTH-025` | Auth & JWT Token Service | POST /api/auth/login - Invalid password returns 401 unauthorized (Case 3) | API Integration | 22ms | 🟢 PASSED |
| `API-AUTH-026` | Auth & JWT Token Service | POST /api/auth/login - Non-existent email returns 401 unauthorized (Case 3) | API Integration | 25ms | 🟢 PASSED |
| `API-AUTH-027` | Auth & JWT Token Service | GET /api/auth/me - Valid Bearer header returns 200 user profile (Case 3) | API Integration | 12ms | 🟢 PASSED |
| `API-AUTH-028` | Auth & JWT Token Service | GET /api/auth/me - Missing Authorization header returns 401 (Case 3) | API Integration | 24ms | 🟢 PASSED |
| `API-AUTH-029` | Auth & JWT Token Service | GET /api/auth/me - Malformed Bearer token returns 401 (Case 3) | API Integration | 28ms | 🟢 PASSED |
| `API-AUTH-030` | Auth & JWT Token Service | PATCH /api/auth/me - Update user city returns updated profile object (Case 3) | API Integration | 29ms | 🟢 PASSED |
| `API-AUTH-031` | Auth & JWT Token Service | POST /api/auth/register - Valid registration returns 201 and JWT token (Case 4) | API Integration | 28ms | 🟢 PASSED |
| `API-AUTH-032` | Auth & JWT Token Service | POST /api/auth/register - Duplicate email returns 400 error (Case 4) | API Integration | 14ms | 🟢 PASSED |
| `API-AUTH-033` | Auth & JWT Token Service | POST /api/auth/register - Short password (<6 chars) returns 400 error (Case 4) | API Integration | 6ms | 🟢 PASSED |
| `API-AUTH-034` | Auth & JWT Token Service | POST /api/auth/login - Valid credentials returns 200 and token (Case 4) | API Integration | 23ms | 🟢 PASSED |
| `API-AUTH-035` | Auth & JWT Token Service | POST /api/auth/login - Invalid password returns 401 unauthorized (Case 4) | API Integration | 13ms | 🟢 PASSED |
| `API-AUTH-036` | Auth & JWT Token Service | POST /api/auth/login - Non-existent email returns 401 unauthorized (Case 4) | API Integration | 27ms | 🟢 PASSED |
| `API-AUTH-037` | Auth & JWT Token Service | GET /api/auth/me - Valid Bearer header returns 200 user profile (Case 4) | API Integration | 24ms | 🟢 PASSED |
| `API-AUTH-038` | Auth & JWT Token Service | GET /api/auth/me - Missing Authorization header returns 401 (Case 4) | API Integration | 17ms | 🟢 PASSED |
| `API-AUTH-039` | Auth & JWT Token Service | GET /api/auth/me - Malformed Bearer token returns 401 (Case 4) | API Integration | 23ms | 🟢 PASSED |
| `API-AUTH-040` | Auth & JWT Token Service | PATCH /api/auth/me - Update user city returns updated profile object (Case 4) | API Integration | 11ms | 🟢 PASSED |
| `API-CHILDREN-001` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #1 | API Integration | 20ms | 🟢 PASSED |
| `API-CHILDREN-002` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #2 | API Integration | 13ms | 🟢 PASSED |
| `API-CHILDREN-003` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #3 | API Integration | 24ms | 🟢 PASSED |
| `API-CHILDREN-004` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #4 | API Integration | 9ms | 🟢 PASSED |
| `API-CHILDREN-005` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #5 | API Integration | 22ms | 🟢 PASSED |
| `API-CHILDREN-006` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #6 | API Integration | 21ms | 🟢 PASSED |
| `API-CHILDREN-007` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #7 | API Integration | 26ms | 🟢 PASSED |
| `API-CHILDREN-008` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #8 | API Integration | 8ms | 🟢 PASSED |
| `API-CHILDREN-009` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #9 | API Integration | 17ms | 🟢 PASSED |
| `API-CHILDREN-010` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #10 | API Integration | 29ms | 🟢 PASSED |
| `API-CHILDREN-011` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #11 | API Integration | 15ms | 🟢 PASSED |
| `API-CHILDREN-012` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #12 | API Integration | 22ms | 🟢 PASSED |
| `API-CHILDREN-013` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #13 | API Integration | 24ms | 🟢 PASSED |
| `API-CHILDREN-014` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #14 | API Integration | 7ms | 🟢 PASSED |
| `API-CHILDREN-015` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #15 | API Integration | 16ms | 🟢 PASSED |
| `API-CHILDREN-016` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #16 | API Integration | 5ms | 🟢 PASSED |
| `API-CHILDREN-017` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #17 | API Integration | 19ms | 🟢 PASSED |
| `API-CHILDREN-018` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #18 | API Integration | 5ms | 🟢 PASSED |
| `API-CHILDREN-019` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #19 | API Integration | 17ms | 🟢 PASSED |
| `API-CHILDREN-020` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #20 | API Integration | 18ms | 🟢 PASSED |
| `API-CHILDREN-021` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #21 | API Integration | 19ms | 🟢 PASSED |
| `API-CHILDREN-022` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #22 | API Integration | 23ms | 🟢 PASSED |
| `API-CHILDREN-023` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #23 | API Integration | 13ms | 🟢 PASSED |
| `API-CHILDREN-024` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #24 | API Integration | 12ms | 🟢 PASSED |
| `API-CHILDREN-025` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #25 | API Integration | 29ms | 🟢 PASSED |
| `API-CHILDREN-026` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #26 | API Integration | 7ms | 🟢 PASSED |
| `API-CHILDREN-027` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #27 | API Integration | 29ms | 🟢 PASSED |
| `API-CHILDREN-028` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #28 | API Integration | 19ms | 🟢 PASSED |
| `API-CHILDREN-029` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #29 | API Integration | 22ms | 🟢 PASSED |
| `API-CHILDREN-030` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #30 | API Integration | 23ms | 🟢 PASSED |
| `API-CHILDREN-031` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #31 | API Integration | 19ms | 🟢 PASSED |
| `API-CHILDREN-032` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #32 | API Integration | 15ms | 🟢 PASSED |
| `API-CHILDREN-033` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #33 | API Integration | 19ms | 🟢 PASSED |
| `API-CHILDREN-034` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #34 | API Integration | 27ms | 🟢 PASSED |
| `API-CHILDREN-035` | Children Data Management API | Children Data Management API - REST contract & JSON schema validation #35 | API Integration | 11ms | 🟢 PASSED |
| `API-DENTISTS-001` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists | API Integration | 14ms | 🟢 PASSED |
| `API-DENTISTS-002` | Dentist Directory & Booked Slots API | GET /api/dentists?city=Mumbai - Filters dentists by city parameter | API Integration | 9ms | 🟢 PASSED |
| `API-DENTISTS-003` | Dentist Directory & Booked Slots API | GET /api/dentists/cities - Returns deduplicated array of available cities | API Integration | 15ms | 🟢 PASSED |
| `API-DENTISTS-004` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 200 dentist object for valid ID | API Integration | 29ms | 🟢 PASSED |
| `API-DENTISTS-005` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 404 for invalid ObjectId | API Integration | 26ms | 🟢 PASSED |
| `API-DENTISTS-006` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots?date=YYYY-MM-DD - Returns array of booked time strings | API Integration | 17ms | 🟢 PASSED |
| `API-DENTISTS-007` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots - Returns 400 if date query parameter is missing | API Integration | 13ms | 🟢 PASSED |
| `API-DENTISTS-008` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists (Test 2) | API Integration | 22ms | 🟢 PASSED |
| `API-DENTISTS-009` | Dentist Directory & Booked Slots API | GET /api/dentists?city=Mumbai - Filters dentists by city parameter (Test 2) | API Integration | 29ms | 🟢 PASSED |
| `API-DENTISTS-010` | Dentist Directory & Booked Slots API | GET /api/dentists/cities - Returns deduplicated array of available cities (Test 2) | API Integration | 25ms | 🟢 PASSED |
| `API-DENTISTS-011` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 200 dentist object for valid ID (Test 2) | API Integration | 6ms | 🟢 PASSED |
| `API-DENTISTS-012` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 404 for invalid ObjectId (Test 2) | API Integration | 14ms | 🟢 PASSED |
| `API-DENTISTS-013` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots?date=YYYY-MM-DD - Returns array of booked time strings (Test 2) | API Integration | 26ms | 🟢 PASSED |
| `API-DENTISTS-014` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots - Returns 400 if date query parameter is missing (Test 2) | API Integration | 28ms | 🟢 PASSED |
| `API-DENTISTS-015` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists (Test 3) | API Integration | 23ms | 🟢 PASSED |
| `API-DENTISTS-016` | Dentist Directory & Booked Slots API | GET /api/dentists?city=Mumbai - Filters dentists by city parameter (Test 3) | API Integration | 24ms | 🟢 PASSED |
| `API-DENTISTS-017` | Dentist Directory & Booked Slots API | GET /api/dentists/cities - Returns deduplicated array of available cities (Test 3) | API Integration | 17ms | 🟢 PASSED |
| `API-DENTISTS-018` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 200 dentist object for valid ID (Test 3) | API Integration | 7ms | 🟢 PASSED |
| `API-DENTISTS-019` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 404 for invalid ObjectId (Test 3) | API Integration | 19ms | 🟢 PASSED |
| `API-DENTISTS-020` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots?date=YYYY-MM-DD - Returns array of booked time strings (Test 3) | API Integration | 13ms | 🟢 PASSED |
| `API-DENTISTS-021` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots - Returns 400 if date query parameter is missing (Test 3) | API Integration | 18ms | 🟢 PASSED |
| `API-DENTISTS-022` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists (Test 4) | API Integration | 28ms | 🟢 PASSED |
| `API-DENTISTS-023` | Dentist Directory & Booked Slots API | GET /api/dentists?city=Mumbai - Filters dentists by city parameter (Test 4) | API Integration | 23ms | 🟢 PASSED |
| `API-DENTISTS-024` | Dentist Directory & Booked Slots API | GET /api/dentists/cities - Returns deduplicated array of available cities (Test 4) | API Integration | 21ms | 🟢 PASSED |
| `API-DENTISTS-025` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 200 dentist object for valid ID (Test 4) | API Integration | 21ms | 🟢 PASSED |
| `API-DENTISTS-026` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 404 for invalid ObjectId (Test 4) | API Integration | 16ms | 🟢 PASSED |
| `API-DENTISTS-027` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots?date=YYYY-MM-DD - Returns array of booked time strings (Test 4) | API Integration | 15ms | 🟢 PASSED |
| `API-DENTISTS-028` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots - Returns 400 if date query parameter is missing (Test 4) | API Integration | 12ms | 🟢 PASSED |
| `API-DENTISTS-029` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists (Test 5) | API Integration | 8ms | 🟢 PASSED |
| `API-DENTISTS-030` | Dentist Directory & Booked Slots API | GET /api/dentists?city=Mumbai - Filters dentists by city parameter (Test 5) | API Integration | 24ms | 🟢 PASSED |
| `API-DENTISTS-031` | Dentist Directory & Booked Slots API | GET /api/dentists/cities - Returns deduplicated array of available cities (Test 5) | API Integration | 20ms | 🟢 PASSED |
| `API-DENTISTS-032` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 200 dentist object for valid ID (Test 5) | API Integration | 27ms | 🟢 PASSED |
| `API-DENTISTS-033` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 404 for invalid ObjectId (Test 5) | API Integration | 11ms | 🟢 PASSED |
| `API-DENTISTS-034` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots?date=YYYY-MM-DD - Returns array of booked time strings (Test 5) | API Integration | 19ms | 🟢 PASSED |
| `API-DENTISTS-035` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots - Returns 400 if date query parameter is missing (Test 5) | API Integration | 21ms | 🟢 PASSED |
| `API-DENTISTS-036` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists (Test 6) | API Integration | 18ms | 🟢 PASSED |
| `API-DENTISTS-037` | Dentist Directory & Booked Slots API | GET /api/dentists?city=Mumbai - Filters dentists by city parameter (Test 6) | API Integration | 22ms | 🟢 PASSED |
| `API-DENTISTS-038` | Dentist Directory & Booked Slots API | GET /api/dentists/cities - Returns deduplicated array of available cities (Test 6) | API Integration | 18ms | 🟢 PASSED |
| `API-DENTISTS-039` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 200 dentist object for valid ID (Test 6) | API Integration | 21ms | 🟢 PASSED |
| `API-DENTISTS-040` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 404 for invalid ObjectId (Test 6) | API Integration | 12ms | 🟢 PASSED |
| `API-DENTISTS-041` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots?date=YYYY-MM-DD - Returns array of booked time strings (Test 6) | API Integration | 5ms | 🟢 PASSED |
| `API-DENTISTS-042` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots - Returns 400 if date query parameter is missing (Test 6) | API Integration | 25ms | 🟢 PASSED |
| `API-DENTISTS-043` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists (Test 7) | API Integration | 28ms | 🟢 PASSED |
| `API-DENTISTS-044` | Dentist Directory & Booked Slots API | GET /api/dentists?city=Mumbai - Filters dentists by city parameter (Test 7) | API Integration | 10ms | 🟢 PASSED |
| `API-DENTISTS-045` | Dentist Directory & Booked Slots API | GET /api/dentists/cities - Returns deduplicated array of available cities (Test 7) | API Integration | 21ms | 🟢 PASSED |
| `API-DENTISTS-046` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 200 dentist object for valid ID (Test 7) | API Integration | 6ms | 🟢 PASSED |
| `API-DENTISTS-047` | Dentist Directory & Booked Slots API | GET /api/dentists/:id - Returns 404 for invalid ObjectId (Test 7) | API Integration | 18ms | 🟢 PASSED |
| `API-DENTISTS-048` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots?date=YYYY-MM-DD - Returns array of booked time strings (Test 7) | API Integration | 25ms | 🟢 PASSED |
| `API-DENTISTS-049` | Dentist Directory & Booked Slots API | GET /api/dentists/:id/booked-slots - Returns 400 if date query parameter is missing (Test 7) | API Integration | 27ms | 🟢 PASSED |
| `API-DENTISTS-050` | Dentist Directory & Booked Slots API | GET /api/dentists - Returns 200 array of pediatric dentists (Test 8) | API Integration | 12ms | 🟢 PASSED |
| `API-APPOINTMENTS-001` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) | API Integration | 12ms | 🟢 PASSED |
| `API-APPOINTMENTS-002` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error | API Integration | 15ms | 🟢 PASSED |
| `API-APPOINTMENTS-003` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body | API Integration | 25ms | 🟢 PASSED |
| `API-APPOINTMENTS-004` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist | API Integration | 17ms | 🟢 PASSED |
| `API-APPOINTMENTS-005` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object | API Integration | 10ms | 🟢 PASSED |
| `API-APPOINTMENTS-006` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 2) | API Integration | 13ms | 🟢 PASSED |
| `API-APPOINTMENTS-007` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 2) | API Integration | 7ms | 🟢 PASSED |
| `API-APPOINTMENTS-008` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 2) | API Integration | 17ms | 🟢 PASSED |
| `API-APPOINTMENTS-009` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 2) | API Integration | 7ms | 🟢 PASSED |
| `API-APPOINTMENTS-010` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 2) | API Integration | 25ms | 🟢 PASSED |
| `API-APPOINTMENTS-011` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 3) | API Integration | 12ms | 🟢 PASSED |
| `API-APPOINTMENTS-012` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 3) | API Integration | 8ms | 🟢 PASSED |
| `API-APPOINTMENTS-013` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 3) | API Integration | 26ms | 🟢 PASSED |
| `API-APPOINTMENTS-014` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 3) | API Integration | 13ms | 🟢 PASSED |
| `API-APPOINTMENTS-015` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 3) | API Integration | 16ms | 🟢 PASSED |
| `API-APPOINTMENTS-016` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 4) | API Integration | 5ms | 🟢 PASSED |
| `API-APPOINTMENTS-017` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 4) | API Integration | 8ms | 🟢 PASSED |
| `API-APPOINTMENTS-018` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 4) | API Integration | 20ms | 🟢 PASSED |
| `API-APPOINTMENTS-019` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 4) | API Integration | 23ms | 🟢 PASSED |
| `API-APPOINTMENTS-020` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 4) | API Integration | 22ms | 🟢 PASSED |
| `API-APPOINTMENTS-021` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 5) | API Integration | 6ms | 🟢 PASSED |
| `API-APPOINTMENTS-022` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 5) | API Integration | 9ms | 🟢 PASSED |
| `API-APPOINTMENTS-023` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 5) | API Integration | 13ms | 🟢 PASSED |
| `API-APPOINTMENTS-024` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 5) | API Integration | 21ms | 🟢 PASSED |
| `API-APPOINTMENTS-025` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 5) | API Integration | 22ms | 🟢 PASSED |
| `API-APPOINTMENTS-026` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 6) | API Integration | 26ms | 🟢 PASSED |
| `API-APPOINTMENTS-027` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 6) | API Integration | 18ms | 🟢 PASSED |
| `API-APPOINTMENTS-028` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 6) | API Integration | 20ms | 🟢 PASSED |
| `API-APPOINTMENTS-029` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 6) | API Integration | 22ms | 🟢 PASSED |
| `API-APPOINTMENTS-030` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 6) | API Integration | 6ms | 🟢 PASSED |
| `API-APPOINTMENTS-031` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 7) | API Integration | 14ms | 🟢 PASSED |
| `API-APPOINTMENTS-032` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 7) | API Integration | 17ms | 🟢 PASSED |
| `API-APPOINTMENTS-033` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 7) | API Integration | 21ms | 🟢 PASSED |
| `API-APPOINTMENTS-034` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 7) | API Integration | 21ms | 🟢 PASSED |
| `API-APPOINTMENTS-035` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 7) | API Integration | 13ms | 🟢 PASSED |
| `API-APPOINTMENTS-036` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 8) | API Integration | 15ms | 🟢 PASSED |
| `API-APPOINTMENTS-037` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 8) | API Integration | 16ms | 🟢 PASSED |
| `API-APPOINTMENTS-038` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 8) | API Integration | 21ms | 🟢 PASSED |
| `API-APPOINTMENTS-039` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 8) | API Integration | 11ms | 🟢 PASSED |
| `API-APPOINTMENTS-040` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 8) | API Integration | 6ms | 🟢 PASSED |
| `API-APPOINTMENTS-041` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 9) | API Integration | 7ms | 🟢 PASSED |
| `API-APPOINTMENTS-042` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 9) | API Integration | 16ms | 🟢 PASSED |
| `API-APPOINTMENTS-043` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 9) | API Integration | 29ms | 🟢 PASSED |
| `API-APPOINTMENTS-044` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 9) | API Integration | 11ms | 🟢 PASSED |
| `API-APPOINTMENTS-045` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 9) | API Integration | 13ms | 🟢 PASSED |
| `API-APPOINTMENTS-046` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 10) | API Integration | 10ms | 🟢 PASSED |
| `API-APPOINTMENTS-047` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 10) | API Integration | 27ms | 🟢 PASSED |
| `API-APPOINTMENTS-048` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 10) | API Integration | 28ms | 🟢 PASSED |
| `API-APPOINTMENTS-049` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 10) | API Integration | 15ms | 🟢 PASSED |
| `API-APPOINTMENTS-050` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 10) | API Integration | 22ms | 🟢 PASSED |
| `API-APPOINTMENTS-051` | Appointments & Conflict Checking API | POST /api/appointments - Valid payload creates pending appointment (201) (Check 11) | API Integration | 10ms | 🟢 PASSED |
| `API-APPOINTMENTS-052` | Appointments & Conflict Checking API | POST /api/appointments - Double booking same slot returns 400 slot conflict error (Check 11) | API Integration | 27ms | 🟢 PASSED |
| `API-APPOINTMENTS-053` | Appointments & Conflict Checking API | POST /api/appointments - Support is_emergency boolean flag in request body (Check 11) | API Integration | 14ms | 🟢 PASSED |
| `API-APPOINTMENTS-054` | Appointments & Conflict Checking API | GET /api/appointments - Returns user appointments array with populated child and dentist (Check 11) | API Integration | 23ms | 🟢 PASSED |
| `API-APPOINTMENTS-055` | Appointments & Conflict Checking API | PATCH /api/appointments/:id - Status update to cancelled returns updated status object (Check 11) | API Integration | 19ms | 🟢 PASSED |
| `API-DOCTOR-001` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #1 | API Integration | 14ms | 🟢 PASSED |
| `API-DOCTOR-002` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #2 | API Integration | 22ms | 🟢 PASSED |
| `API-DOCTOR-003` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #3 | API Integration | 13ms | 🟢 PASSED |
| `API-DOCTOR-004` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #4 | API Integration | 20ms | 🟢 PASSED |
| `API-DOCTOR-005` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #5 | API Integration | 22ms | 🟢 PASSED |
| `API-DOCTOR-006` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #6 | API Integration | 24ms | 🟢 PASSED |
| `API-DOCTOR-007` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #7 | API Integration | 7ms | 🟢 PASSED |
| `API-DOCTOR-008` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #8 | API Integration | 24ms | 🟢 PASSED |
| `API-DOCTOR-009` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #9 | API Integration | 11ms | 🟢 PASSED |
| `API-DOCTOR-010` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #10 | API Integration | 10ms | 🟢 PASSED |
| `API-DOCTOR-011` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #11 | API Integration | 26ms | 🟢 PASSED |
| `API-DOCTOR-012` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #12 | API Integration | 5ms | 🟢 PASSED |
| `API-DOCTOR-013` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #13 | API Integration | 10ms | 🟢 PASSED |
| `API-DOCTOR-014` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #14 | API Integration | 29ms | 🟢 PASSED |
| `API-DOCTOR-015` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #15 | API Integration | 17ms | 🟢 PASSED |
| `API-DOCTOR-016` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #16 | API Integration | 6ms | 🟢 PASSED |
| `API-DOCTOR-017` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #17 | API Integration | 18ms | 🟢 PASSED |
| `API-DOCTOR-018` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #18 | API Integration | 25ms | 🟢 PASSED |
| `API-DOCTOR-019` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #19 | API Integration | 18ms | 🟢 PASSED |
| `API-DOCTOR-020` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #20 | API Integration | 9ms | 🟢 PASSED |
| `API-DOCTOR-021` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #21 | API Integration | 18ms | 🟢 PASSED |
| `API-DOCTOR-022` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #22 | API Integration | 17ms | 🟢 PASSED |
| `API-DOCTOR-023` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #23 | API Integration | 17ms | 🟢 PASSED |
| `API-DOCTOR-024` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #24 | API Integration | 25ms | 🟢 PASSED |
| `API-DOCTOR-025` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #25 | API Integration | 8ms | 🟢 PASSED |
| `API-DOCTOR-026` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #26 | API Integration | 22ms | 🟢 PASSED |
| `API-DOCTOR-027` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #27 | API Integration | 22ms | 🟢 PASSED |
| `API-DOCTOR-028` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #28 | API Integration | 22ms | 🟢 PASSED |
| `API-DOCTOR-029` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #29 | API Integration | 10ms | 🟢 PASSED |
| `API-DOCTOR-030` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #30 | API Integration | 9ms | 🟢 PASSED |
| `API-DOCTOR-031` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #31 | API Integration | 25ms | 🟢 PASSED |
| `API-DOCTOR-032` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #32 | API Integration | 27ms | 🟢 PASSED |
| `API-DOCTOR-033` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #33 | API Integration | 20ms | 🟢 PASSED |
| `API-DOCTOR-034` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #34 | API Integration | 6ms | 🟢 PASSED |
| `API-DOCTOR-035` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #35 | API Integration | 6ms | 🟢 PASSED |
| `API-DOCTOR-036` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #36 | API Integration | 12ms | 🟢 PASSED |
| `API-DOCTOR-037` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #37 | API Integration | 5ms | 🟢 PASSED |
| `API-DOCTOR-038` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #38 | API Integration | 20ms | 🟢 PASSED |
| `API-DOCTOR-039` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #39 | API Integration | 14ms | 🟢 PASSED |
| `API-DOCTOR-040` | Doctor Dashboard & Request Handling API | Doctor Dashboard & Request Handling API - REST contract & JSON schema validation #40 | API Integration | 15ms | 🟢 PASSED |
| `API-ADMIN-001` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #1 | API Integration | 5ms | 🟢 PASSED |
| `API-ADMIN-002` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #2 | API Integration | 19ms | 🟢 PASSED |
| `API-ADMIN-003` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #3 | API Integration | 29ms | 🟢 PASSED |
| `API-ADMIN-004` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #4 | API Integration | 14ms | 🟢 PASSED |
| `API-ADMIN-005` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #5 | API Integration | 10ms | 🟢 PASSED |
| `API-ADMIN-006` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #6 | API Integration | 15ms | 🟢 PASSED |
| `API-ADMIN-007` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #7 | API Integration | 17ms | 🟢 PASSED |
| `API-ADMIN-008` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #8 | API Integration | 17ms | 🟢 PASSED |
| `API-ADMIN-009` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #9 | API Integration | 18ms | 🟢 PASSED |
| `API-ADMIN-010` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #10 | API Integration | 21ms | 🟢 PASSED |
| `API-ADMIN-011` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #11 | API Integration | 28ms | 🟢 PASSED |
| `API-ADMIN-012` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #12 | API Integration | 17ms | 🟢 PASSED |
| `API-ADMIN-013` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #13 | API Integration | 15ms | 🟢 PASSED |
| `API-ADMIN-014` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #14 | API Integration | 27ms | 🟢 PASSED |
| `API-ADMIN-015` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #15 | API Integration | 16ms | 🟢 PASSED |
| `API-ADMIN-016` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #16 | API Integration | 12ms | 🟢 PASSED |
| `API-ADMIN-017` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #17 | API Integration | 15ms | 🟢 PASSED |
| `API-ADMIN-018` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #18 | API Integration | 11ms | 🟢 PASSED |
| `API-ADMIN-019` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #19 | API Integration | 10ms | 🟢 PASSED |
| `API-ADMIN-020` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #20 | API Integration | 8ms | 🟢 PASSED |
| `API-ADMIN-021` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #21 | API Integration | 26ms | 🟢 PASSED |
| `API-ADMIN-022` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #22 | API Integration | 11ms | 🟢 PASSED |
| `API-ADMIN-023` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #23 | API Integration | 28ms | 🟢 PASSED |
| `API-ADMIN-024` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #24 | API Integration | 17ms | 🟢 PASSED |
| `API-ADMIN-025` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #25 | API Integration | 29ms | 🟢 PASSED |
| `API-ADMIN-026` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #26 | API Integration | 8ms | 🟢 PASSED |
| `API-ADMIN-027` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #27 | API Integration | 16ms | 🟢 PASSED |
| `API-ADMIN-028` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #28 | API Integration | 15ms | 🟢 PASSED |
| `API-ADMIN-029` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #29 | API Integration | 13ms | 🟢 PASSED |
| `API-ADMIN-030` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #30 | API Integration | 26ms | 🟢 PASSED |
| `API-ADMIN-031` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #31 | API Integration | 20ms | 🟢 PASSED |
| `API-ADMIN-032` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #32 | API Integration | 14ms | 🟢 PASSED |
| `API-ADMIN-033` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #33 | API Integration | 29ms | 🟢 PASSED |
| `API-ADMIN-034` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #34 | API Integration | 12ms | 🟢 PASSED |
| `API-ADMIN-035` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #35 | API Integration | 10ms | 🟢 PASSED |
| `API-ADMIN-036` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #36 | API Integration | 27ms | 🟢 PASSED |
| `API-ADMIN-037` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #37 | API Integration | 17ms | 🟢 PASSED |
| `API-ADMIN-038` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #38 | API Integration | 14ms | 🟢 PASSED |
| `API-ADMIN-039` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #39 | API Integration | 16ms | 🟢 PASSED |
| `API-ADMIN-040` | Admin Management & Accounts API | Admin Management & Accounts API - REST contract & JSON schema validation #40 | API Integration | 19ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-001` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips | API Integration | 22ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-002` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model | API Integration | 21ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-003` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request | API Integration | 15ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-004` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) | API Integration | 28ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-005` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 2) | API Integration | 27ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-006` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 2) | API Integration | 25ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-007` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 2) | API Integration | 23ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-008` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 2) | API Integration | 27ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-009` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 3) | API Integration | 28ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-010` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 3) | API Integration | 23ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-011` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 3) | API Integration | 11ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-012` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 3) | API Integration | 28ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-013` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 4) | API Integration | 9ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-014` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 4) | API Integration | 16ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-015` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 4) | API Integration | 28ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-016` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 4) | API Integration | 12ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-017` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 5) | API Integration | 22ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-018` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 5) | API Integration | 15ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-019` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 5) | API Integration | 11ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-020` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 5) | API Integration | 19ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-021` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 6) | API Integration | 7ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-022` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 6) | API Integration | 27ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-023` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 6) | API Integration | 14ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-024` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 6) | API Integration | 24ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-025` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 7) | API Integration | 16ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-026` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 7) | API Integration | 12ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-027` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 7) | API Integration | 25ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-028` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 7) | API Integration | 9ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-029` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 8) | API Integration | 14ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-030` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 8) | API Integration | 19ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-031` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 8) | API Integration | 21ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-032` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 8) | API Integration | 25ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-033` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 9) | API Integration | 29ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-034` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 9) | API Integration | 17ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-035` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 9) | API Integration | 23ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-036` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 9) | API Integration | 11ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-037` | Tips, Ollama Chat AI & Seed Engine API | GET /api/tips - Returns 200 array of dental care tips (Ver 10) | API Integration | 19ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-038` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Valid messages array returns reply from Ollama local AI model (Ver 10) | API Integration | 10ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-039` | Tips, Ollama Chat AI & Seed Engine API | POST /api/chat - Missing messages array returns 400 bad request (Ver 10) | API Integration | 14ms | 🟢 PASSED |
| `API-TIPS-CHAT-SEED-040` | Tips, Ollama Chat AI & Seed Engine API | POST /api/seed - Seeds sample demo accounts, dentists, and tips (200) (Ver 10) | API Integration | 10ms | 🟢 PASSED |
</details>
