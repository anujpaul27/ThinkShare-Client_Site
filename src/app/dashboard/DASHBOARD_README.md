# Dashboard Implementation Guide

## Overview
This document explains the new dashboard structure implemented for both User and Admin roles.

## Dashboard Structure

```
/app/dashboard/
├── page.tsx                    # Redirect page (auto-routes to user/admin)
├── layout.tsx                  # Main dashboard layout with sidebar
├── user/
│   ├── page.tsx               # User dashboard home
│   ├── add-idea/
│   │   └── page.tsx           # Add idea page
│   ├── my-ideas/
│   │   └── page.tsx           # View user's ideas
│   ├── my-interactions/
│   │   └── page.tsx           # View comments/interactions
│   └── profile/
│       └── page.tsx           # User profile
└── admin/
    ├── page.tsx               # Admin dashboard home
    ├── add-idea/
    │   └── page.tsx           # Add idea (admin can also add ideas)
    ├── my-ideas/
    │   └── page.tsx           # View admin's ideas
    ├── my-interactions/
    │   └── page.tsx           # View admin's interactions
    ├── profile/
    │   └── page.tsx           # Admin profile
    ├── all-ideas/
    │   └── page.tsx           # Manage all ideas on platform
    └── all-users/
        └── page.tsx           # Manage all users on platform
```

## Components

### DashboardLayout (`/Component/Dashboard/DashboardLayout.tsx`)
- Main wrapper for all dashboard pages
- Renders sidebar and main content area
- Handles responsive mobile/desktop views

### DashboardSidebar (`/Component/Dashboard/DashboardSidebar.tsx`)
- Fixed sidebar navigation
- Shows different menu items based on role
- Mobile-responsive with hamburger menu
- Logout button at bottom

## Features Implemented

✅ **User Dashboard**
- Add Ideas
- View My Ideas
- View My Interactions
- View/Edit Profile
- Logout

✅ **Admin Dashboard**
- Add Ideas
- View My Ideas
- View My Interactions
- View/Edit Profile
- **Manage All Ideas** (view all platform ideas)
- **Manage All Users** (view all platform users)
- Logout

✅ **UI/UX**
- Responsive sidebar navigation
- Mobile-friendly hamburger menu
- Gradient headers
- Stats cards
- Quick action buttons
- Professional styling with Tailwind CSS

## Next Steps & TODOs

### 1. **Implement Role System in Backend**
```
- Add `role` field to user model (values: "user", "admin")
- Create API endpoint to check user role on login
- Return role in auth session/JWT token
```

### 2. **Update Auth Configuration**
File: `Frontend/src/lib/auth.ts`
```typescript
// Add role plugin from better-auth if available
// Or extend user schema to include role field
```

### 3. **Update Dashboard Layout to Get Role from Backend**
File: `Frontend/src/app/dashboard/layout.tsx`
```typescript
// Replace the TODO comment with actual API call to get user role
const role = await fetchUserRole(); // from backend
```

### 4. **Connect to Existing APIs**
- **All Ideas Page**: Connect to `/api/ideas` endpoint
- **All Users Page**: Connect to `/api/users` endpoint
- **My Ideas Page**: Filter ideas by current user
- **My Interactions Page**: Fetch comments/interactions for user's ideas

### 5. **Implement Missing Features**
- [ ] Edit Profile functionality
- [ ] Delete idea confirmation dialog
- [ ] Delete user confirmation dialog
- [ ] Pagination for large datasets
- [ ] Search/filter functionality
- [ ] Real-time stats updates

### 6. **Security Considerations**
- ✅ Protected routes (redirects to login if not authenticated)
- ⚠️ Role-based access control (verify on backend)
- ⚠️ Verify admin permissions when accessing `/admin` routes
- Implement middleware for protected routes

### 7. **API Endpoints Needed**
```
GET  /api/user/role              # Get current user's role
GET  /api/ideas                  # Get all ideas (for admin)
GET  /api/ideas/user/:id         # Get ideas by specific user
GET  /api/ideas/:id/interactions # Get interactions for an idea
GET  /api/users                  # Get all users (admin only)
DELETE /api/ideas/:id            # Delete an idea (admin only)
DELETE /api/users/:id            # Delete a user (admin only)
```

## Navigation Routes

### User Access
- `/dashboard` → Auto-redirects to `/dashboard/user`
- `/dashboard/user` → Dashboard home
- `/dashboard/user/add-idea` → Add new idea
- `/dashboard/user/my-ideas` → View user's ideas
- `/dashboard/user/my-interactions` → View interactions
- `/dashboard/user/profile` → User profile

### Admin Access
- `/dashboard` → Auto-redirects to `/dashboard/admin`
- `/dashboard/admin` → Admin dashboard home
- `/dashboard/admin/add-idea` → Add new idea
- `/dashboard/admin/my-ideas` → View admin's ideas
- `/dashboard/admin/my-interactions` → View interactions
- `/dashboard/admin/profile` → Admin profile
- `/dashboard/admin/all-ideas` → Manage all ideas
- `/dashboard/admin/all-users` → Manage all users

## Usage Example

### Accessing the Dashboard
Users can access the dashboard by:
1. Logging in successfully
2. Navigating to `/dashboard`
3. Auto-redirected to their role-based dashboard

## Styling Notes

- **Color Scheme**:
  - User: Blue theme
  - Admin: Red/Orange theme
- **Icons**: Using `lucide-react` library
- **Animations**: Smooth transitions and hover effects
- **Typography**: Using Tailwind CSS for responsive text sizing

## Important Notes

1. **Role Detection**: Currently using placeholder role detection. Update `layout.tsx` to fetch actual role from backend.
2. **Database Schema**: Ensure user model has a `role` field in MongoDB.
3. **Permissions**: Always verify permissions on the backend, not just frontend.
4. **Loading States**: All pages show loading indicators while fetching data.

## Example: Updating Role Detection

Current implementation (placeholder):
```typescript
const role = (session.user as any)?.role || "user";
```

Should be updated to:
```typescript
const role = session.user?.role; // where role comes from backend
if (!role) throw new Error("Role not found");
```

---

Created: 2026-07-15
Status: Ready for backend integration
