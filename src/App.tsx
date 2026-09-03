import { AnimatePresence } from 'framer-motion'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { useApp } from './store/AppContext'
import { BottomNav } from './components/BottomNav'
import { ErrorBoundary } from './components/ErrorBoundary'
import { OfflineBar } from './components/OfflineBar'
import { RouteFallback } from './components/RouteFallback'

// Auth
const Splash = lazy(() => import('./screens/Splash'))
const Welcome = lazy(() => import('./screens/Welcome'))
const ChooseRole = lazy(() => import('./screens/ChooseRole'))
const BrandSignup = lazy(() => import('./screens/BrandSignup'))
const CreatorSignup = lazy(() => import('./screens/CreatorSignup'))
const Login = lazy(() => import('./screens/Login'))
// Brand onboarding
const BrandProfile = lazy(() => import('./screens/onboarding/BrandProfile'))
const BrandPlanning = lazy(() => import('./screens/onboarding/BrandPlanning'))
const BrandTeam = lazy(() => import('./screens/onboarding/BrandTeam'))
const BrandReady = lazy(() => import('./screens/onboarding/BrandReady'))
// Brand app
const Home = lazy(() => import('./screens/brand/Home'))
const Discover = lazy(() => import('./screens/brand/Discover'))
const Search = lazy(() => import('./screens/brand/Search'))
const Refine = lazy(() => import('./screens/brand/Refine'))
const CreatorProfile = lazy(() => import('./screens/brand/CreatorProfile'))
const AudienceFit = lazy(() => import('./screens/brand/AudienceFit'))
const SendOffer = lazy(() => import('./screens/brand/SendOffer'))
const Shortlist = lazy(() => import('./screens/brand/Shortlist'))
const Compare = lazy(() => import('./screens/brand/Compare'))
const NewCampaign = lazy(() => import('./screens/brand/NewCampaign'))
const CampaignBudget = lazy(() => import('./screens/brand/CampaignBudget'))
const CampaignReview = lazy(() => import('./screens/brand/CampaignReview'))
const Campaigns = lazy(() => import('./screens/brand/Campaigns'))
const CampaignDetail = lazy(() => import('./screens/brand/CampaignDetail'))
const CampaignTimeline = lazy(() => import('./screens/brand/CampaignTimeline'))
const CampaignAnalytics = lazy(() => import('./screens/brand/CampaignAnalytics'))
const ExportReport = lazy(() => import('./screens/brand/ExportReport'))
const ApprovalQueue = lazy(() => import('./screens/brand/ApprovalQueue'))
const DraftReview = lazy(() => import('./screens/brand/DraftReview'))
const Profile = lazy(() => import('./screens/brand/Profile'))
// Shared
const Messages = lazy(() => import('./screens/shared/Messages'))
const Chat = lazy(() => import('./screens/shared/Chat'))
const Notifications = lazy(() => import('./screens/shared/Notifications'))
const Settings = lazy(() => import('./screens/shared/Settings'))
const Privacy = lazy(() => import('./screens/shared/Privacy'))
const Support = lazy(() => import('./screens/shared/Support'))
const NotFound = lazy(() => import('./screens/shared/NotFound'))
// Creator onboarding
const CreatorProfileSetup = lazy(() => import('./screens/creator/CreatorProfileSetup'))
const CreatorWork = lazy(() => import('./screens/creator/CreatorWork'))
const RateCard = lazy(() => import('./screens/creator/RateCard'))
const CreatorLive = lazy(() => import('./screens/creator/CreatorLive'))
// Creator app
const CreatorHome = lazy(() => import('./screens/creator/CreatorHome'))
const Deals = lazy(() => import('./screens/creator/Deals'))
const DealFilters = lazy(() => import('./screens/creator/DealFilters'))
const DealDetail = lazy(() => import('./screens/creator/DealDetail'))
const Pitch = lazy(() => import('./screens/creator/Pitch'))
const PitchSent = lazy(() => import('./screens/creator/PitchSent'))
const Collabs = lazy(() => import('./screens/creator/Collabs'))
const CollabDetail = lazy(() => import('./screens/creator/CollabDetail'))
const Contract = lazy(() => import('./screens/creator/Contract'))
const UploadDraft = lazy(() => import('./screens/creator/UploadDraft'))
const BrandFeedback = lazy(() => import('./screens/creator/BrandFeedback'))
const ProfileAnalytics = lazy(() => import('./screens/creator/ProfileAnalytics'))
const Earnings = lazy(() => import('./screens/creator/Earnings'))
const PayoutDetail = lazy(() => import('./screens/creator/PayoutDetail'))
const PortfolioEditor = lazy(() => import('./screens/creator/PortfolioEditor'))
const MediaKit = lazy(() => import('./screens/creator/MediaKit'))
const Subscription = lazy(() => import('./screens/creator/Subscription'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

/** Redirects signed-out users to Welcome and keeps each role inside its own space. */
function RequireAuth({ role }: { role?: 'brand' | 'creator' }) {
  const { state } = useApp()
  const loc = useLocation()
  if (!state.session) return <Navigate to="/welcome" replace state={{ from: loc.pathname }} />
  if (role && state.session.role !== role) return <Navigate to={state.session.role === 'brand' ? '/home' : '/creator/home'} replace />
  return <Outlet />
}

/** Signed-in users skip the marketing/auth screens. */
function PublicOnly() {
  const { state } = useApp()
  if (state.session) {
    const r = state.session.role
    return <Navigate to={r === 'brand' ? (state.onboardingComplete ? '/home' : '/onboarding/brand/profile') : state.onboardingComplete ? '/creator/home' : '/onboarding/creator/profile'} replace />
  }
  return <Outlet />
}

function Shell({ role }: { role: 'brand' | 'creator' }) {
  return (
    <>
      <Outlet />
      <BottomNav role={role} />
    </>
  )
}

function SharedShell() {
  const { state } = useApp()
  return <Shell role={state.session?.role ?? 'brand'} />
}

export default function App() {
  const location = useLocation()
  return (
    <ErrorBoundary>
      <OfflineBar />
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Splash />} />

          <Route element={<PublicOnly />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/role" element={<ChooseRole />} />
            <Route path="/signup/brand" element={<BrandSignup />} />
            <Route path="/signup/creator" element={<CreatorSignup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Brand onboarding (no bottom nav) */}
          <Route element={<RequireAuth role="brand" />}>
            <Route path="/onboarding/brand/profile" element={<BrandProfile />} />
            <Route path="/onboarding/brand/planning" element={<BrandPlanning />} />
            <Route path="/onboarding/brand/team" element={<BrandTeam />} />
            <Route path="/onboarding/brand/ready" element={<BrandReady />} />
          </Route>

          {/* Brand app */}
          <Route element={<RequireAuth role="brand" />}>
            <Route element={<Shell role="brand" />}>
              <Route path="/home" element={<Home />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:id" element={<Chat />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/search" element={<Search />} />
              <Route path="/refine" element={<Refine />} />
              <Route path="/creators/:id" element={<CreatorProfile />} />
              <Route path="/creators/:id/insights" element={<AudienceFit />} />
              <Route path="/creators/:id/offer" element={<SendOffer />} />
              <Route path="/shortlist" element={<Shortlist />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/create" element={<NewCampaign />} />
              <Route path="/create/budget" element={<CampaignBudget />} />
              <Route path="/create/review" element={<CampaignReview />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/:id" element={<CampaignDetail />} />
              <Route path="/campaigns/:id/timeline" element={<CampaignTimeline />} />
              <Route path="/campaigns/:id/analytics" element={<CampaignAnalytics />} />
              <Route path="/campaigns/:id/export" element={<ExportReport />} />
              <Route path="/approvals" element={<ApprovalQueue />} />
              <Route path="/approvals/:id" element={<DraftReview />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Creator onboarding (no bottom nav) */}
          <Route element={<RequireAuth role="creator" />}>
            <Route path="/onboarding/creator/profile" element={<CreatorProfileSetup />} />
            <Route path="/onboarding/creator/work" element={<CreatorWork />} />
            <Route path="/onboarding/creator/rates" element={<RateCard />} />
            <Route path="/onboarding/creator/live" element={<CreatorLive />} />
          </Route>

          {/* Creator app */}
          <Route element={<RequireAuth role="creator" />}>
            <Route element={<Shell role="creator" />}>
              <Route path="/creator/home" element={<CreatorHome />} />
              <Route path="/creator/deals" element={<Deals />} />
              <Route path="/creator/deals/filters" element={<DealFilters />} />
              <Route path="/creator/deals/:id" element={<DealDetail />} />
              <Route path="/creator/pitch" element={<Pitch />} />
              <Route path="/creator/pitch/sent" element={<PitchSent />} />
              <Route path="/creator/collabs" element={<Collabs />} />
              <Route path="/creator/collabs/:id" element={<CollabDetail />} />
              <Route path="/creator/collabs/:id/upload" element={<UploadDraft />} />
              <Route path="/creator/collabs/:id/feedback" element={<BrandFeedback />} />
              <Route path="/creator/contract" element={<Contract />} />
              <Route path="/creator/messages" element={<Messages />} />
              <Route path="/creator/messages/:id" element={<Chat />} />
              <Route path="/creator/settings" element={<Settings />} />
              <Route path="/creator/analytics" element={<ProfileAnalytics />} />
              <Route path="/creator/earnings" element={<Earnings />} />
              <Route path="/creator/earnings/:id" element={<PayoutDetail />} />
              <Route path="/creator/portfolio" element={<PortfolioEditor />} />
              <Route path="/creator/media-kit" element={<MediaKit />} />
              <Route path="/creator/rate-card" element={<RateCard />} />
              <Route path="/creator/subscription" element={<Subscription />} />
            </Route>
          </Route>

          {/* Shared, role-aware */}
          <Route element={<RequireAuth />}>
            <Route element={<SharedShell />}>
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  )
}
