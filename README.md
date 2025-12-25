# FlightFrontend  --Fetches Real Time Flight details 

A modern Angular (standalone) frontend for a flight booking system, built to work with a Spring Boot microservices backend behind an API Gateway.

The application focuses on clean UX, clear flows, and real backend integration rather than mock data . The backend fetched flight details using amadeus self serving api.


https://github.com/user-attachments/assets/0d9c7962-beaf-492b-b399-cd90fadbd7b4


# Screens

## Home
<img width="1899" height="936" alt="image" src="https://github.com/user-attachments/assets/717cc52f-18c0-440c-a5cc-a004b76d2d2e" />

## FlightSearch Results
<img width="1916" height="935" alt="image" src="https://github.com/user-attachments/assets/0462774b-047a-40ca-a68b-b6b1d2ee8bca" />

---
<img width="1913" height="1003" alt="image" src="https://github.com/user-attachments/assets/3af6f021-a832-47f3-b272-b2915307641b" />

## AddFlight form for admin
<img width="1911" height="978" alt="image" src="https://github.com/user-attachments/assets/d046385b-3110-47b8-9231-df41c9968578" />

## Bookings page loading active bookings first 
<img width="1908" height="994" alt="image" src="https://github.com/user-attachments/assets/45c4acbe-af48-46dc-875b-8bd2f1bc724a" />

## Seat-selection Page
<img width="1905" height="985" alt="image" src="https://github.com/user-attachments/assets/c37b9c31-d7b3-42b6-8d4e-b91d3fc9bacc" />

## Profiles 
<img width="1903" height="832" alt="image" src="https://github.com/user-attachments/assets/bc005e55-4b20-4da2-be12-a732e587ac09" />


## Login Screen
<img width="1911" height="853" alt="image" src="https://github.com/user-attachments/assets/d6cbdf38-161c-423b-aa65-592455e5d480" />

## change Password
<img width="1908" height="900" alt="image" src="https://github.com/user-attachments/assets/41e1480f-694e-433a-b8fa-b845586901ba" />

---

## Features Implemented

### 1. Authentication

- Login and Signup flows integrated with backend
- JWT-based authentication handled via API Gateway
- Token stored in localStorage
- AuthGuard to protect private routes
- Logout clears token and redirects to login
- Navbar reacts to authentication state (username / logout)

---

### 2. Routing & Guards

- Standalone Angular routing
- Public routes:
  - `/login`
  - `/signup`
- Protected routes:
  - `/` (Home)
  - `/search-results`
- `AuthGuard` prevents unauthenticated access and redirects to login

---

### 3. Home Page

- Cinematic hero section with background image
- Clean, minimal UI focused on search intent
- Smooth scroll interaction for “Discover more” and explore cards

---

### 4. Flight Search Flow

- Search triggers backend POST request:
  - Source
  - Destination
  - Date
- Request goes through API Gateway
- Real backend response used (no mock data)
- Loader overlay shown during search
- Smooth transition to results page after response

---

### 5. Loader Overlay

- Full-screen loader overlay component
- Plays a flight animation video during search
- Minimum visible duration to avoid flicker
- Covers entire app and blocks interaction
- Automatically hides after navigation completes

---

### 6. Search Results Page

- Modify Search summary bar at top
- Filters panel (UI-ready, logic to be added)
- Scrollable flight results section
- Flight cards rendered from backend response
- Displays:
  - Airline name
  - Flight number
  - Source → Destination
  - Departure & Arrival time
  - Price
  - Computed flight duration

---

### 7. State Handling

- In-memory store service to pass flight data between routes
- Clean separation between:
  - API calls
  - State storage
  - UI rendering
- Avoids query string overload for complex data

---

## Backend Integration

- Frontend communicates only with API Gateway
- Backend services:
  - Auth Service (`/api/auth`)
  - Flight Service (`/api/flight/search`)
- JWT validation handled at Gateway level
- Public endpoints configured for auth and flight search
- CORS configured for local frontend development

---
