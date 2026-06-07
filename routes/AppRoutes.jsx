import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";

import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";

import ExplorePage from "../pages/Explore/ExplorePage";

import BusinessResearchPage from "../pages/BusinessResearch/BusinessResearchPage";

import AIChatPage from "../pages/AIChat/AIChatPage";

import DocumentAnalysisPage from "../pages/DocumentAnalysis/DocumentAnalysisPage";

import ReportsPage from "../pages/Reports/ReportsPage";
import ReportViewerPage from "../pages/Reports/ReportViewerPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route
          path="/explore"
          element={<ExplorePage />}
        />

        <Route
          path="/business-research"
          element={<BusinessResearchPage />}
        />

        <Route
          path="/ai-chat"
          element={<AIChatPage />}
        />

        <Route
          path="/document-analysis"
          element={<DocumentAnalysisPage />}
        />

        <Route
          path="/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/reports/:id"
          element={<ReportViewerPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}