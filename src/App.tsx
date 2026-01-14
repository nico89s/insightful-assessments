import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AssessmentPage from "./pages/AssessmentPage";
import AssessmentResults from "./pages/AssessmentResults";
import EmployeeDetails from "./pages/EmployeeDetails";
import ResultDetails from "./pages/ResultDetails";
import UnderConstruction from "./pages/UnderConstruction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AssessmentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Employee routes */}
              <Route path="/assessment/:assessmentId" element={<AssessmentPage />} />
              <Route path="/assessment/results" element={<AssessmentResults />} />
              <Route path="/assessments" element={<UnderConstruction />} />
              
              {/* Assessor routes */}
              <Route path="/assessor/results" element={<UnderConstruction />} />
              <Route path="/assessor/candidates" element={<UnderConstruction />} />
              <Route path="/assessor/result/:resultId" element={<ResultDetails />} />
              <Route path="/assessor/employee/:employeeId" element={<EmployeeDetails />} />
              
              {/* Admin routes */}
              <Route path="/admin/users" element={<UnderConstruction />} />
              <Route path="/admin/assessments" element={<UnderConstruction />} />
              <Route path="/admin/settings" element={<UnderConstruction />} />
              
              {/* Settings */}
              <Route path="/settings" element={<UnderConstruction />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AssessmentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
