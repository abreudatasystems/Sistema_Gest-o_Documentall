import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthProvider } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { Layout } from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import TimeTracking from "@/pages/time-tracking";
import Clients from "@/pages/clients";
import Invoices from "@/pages/invoices";
import NotFound from "@/pages/not-found";

// Legal Platform Pages
import Templates from "@/pages/contracts/templates";
import CreateContract from "@/pages/contracts/create";
import ClauseSuggestions from "@/pages/ai/clauses";
import AllDocuments from "@/pages/documents/all";
import ContractsReport from "@/pages/reports/contracts";
import ProfilesPermissions from "@/pages/access/profiles";
import SettingsPage from "@/pages/settings";
import SearchPage from "@/pages/search";

// Contract Templates
import CivilTemplates from "@/pages/contracts/civil";
import WorkTemplates from "@/pages/contracts/work";
import BusinessTemplates from "@/pages/contracts/business";
import OtherTemplates from "@/pages/contracts/other";

// Contract Management
import AICustomization from "@/pages/contracts/ai-customization";
import ContractsInReview from "@/pages/contracts/in-review";
import CompletedContracts from "@/pages/contracts/completed";

// AI Features
import LegislativeUpdates from "@/pages/ai/legislative-updates";
import RecommendationHistory from "@/pages/ai/recommendation-history";

// API Management
import APIDocumentation from "@/pages/api/documentation";
import AccessKeys from "@/pages/api/access-keys";
import IntegrationLogs from "@/pages/api/integration-logs";

// Document Management
import SharedDocuments from "@/pages/documents/shared";
import PendingSignatures from "@/pages/documents/pending-signatures";
import InactiveFiles from "@/pages/documents/inactive";

// Dashboard pages
import MyContracts from "@/pages/dashboard/my-contracts";
import RecentActivities from "@/pages/dashboard/recent-activities";
// People Management
import ClientsList from "@/pages/people/clients/list";
import AddClient from "@/pages/people/clients/add";
import ViewContracts from "@/pages/people/clients/contracts";
import EmployeesList from "@/pages/people/employees/list";
import AddEmployee from "@/pages/people/employees/add";
import AccessPermissions from "@/pages/people/employees/permissions";

// Access Control
import AssignAccess from "@/pages/access/assign";
import AccessLogs from "@/pages/access/logs";

// Reports
import MostUsedClauses from "@/pages/reports/most-used-clauses";
import PlatformUsage from "@/pages/reports/platform-usage";
import ExportReports from "@/pages/reports/export";
// Settings
import CompanyData from "@/pages/settings/company-data";
import SystemPreferences from "@/pages/settings/preferences";
import DigitalSignature from "@/pages/settings/digital-signature";
import SecurityBackup from "@/pages/settings/security-backup";

function Router() {
  return (
    <ProtectedRoute>
      <Layout>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/projects" component={Projects} />
          <Route path="/time-tracking" component={TimeTracking} />
          <Route path="/clients" component={Clients} />
          <Route path="/invoices" component={Invoices} />

          {/* Dashboard Routes */}
          <Route path="/dashboard/my-contracts" component={MyContracts} />
          <Route path="/dashboard/recent-activities" component={RecentActivities} />

          {/* Legal Platform Routes */}
          <Route path="/templates" component={Templates} />
          <Route path="/contracts/create" component={CreateContract} />
          <Route path="/contracts/civil" component={CivilTemplates} />
          <Route path="/contracts/work" component={WorkTemplates} />
          <Route path="/contracts/business" component={BusinessTemplates} />
          <Route path="/contracts/other" component={OtherTemplates} />
          <Route path="/contracts/ai-customization" component={AICustomization} />
          <Route path="/contracts/in-review" component={ContractsInReview} />
          <Route path="/contracts/completed" component={CompletedContracts} />

          {/* AI Routes */}
          <Route path="/ai/clauses" component={ClauseSuggestions} />
          <Route path="/ai/legislative-updates" component={LegislativeUpdates} />
          <Route path="/ai/recommendation-history" component={RecommendationHistory} />

          {/* API Routes */}
          <Route path="/api/documentation" component={APIDocumentation} />
          <Route path="/api/access-keys" component={AccessKeys} />
          <Route path="/api/integration-logs" component={IntegrationLogs} />

          {/* Document Management */}
          <Route path="/documents/all" component={AllDocuments} />
          <Route path="/documents/shared" component={SharedDocuments} />
          <Route path="/documents/pending-signatures" component={PendingSignatures} />
          <Route path="/documents/inactive" component={InactiveFiles} />
           {/* People Management */}
           <Route path="/people/clients/list" component={ClientsList} />
          <Route path="/people/clients/add" component={AddClient} />
          <Route path="/people/clients/contracts" component={ViewContracts} />
          <Route path="/people/employees/list" component={EmployeesList} />
          <Route path="/people/employees/add" component={AddEmployee} />
          <Route path="/people/employees/permissions" component={AccessPermissions} />

          {/* Access Control */}
          <Route path="/access/profiles" component={ProfilesPermissions} />
          <Route path="/access/assign" component={AssignAccess} />
          <Route path="/access/logs" component={AccessLogs} />

          {/* Reports */}
          <Route path="/reports/contracts" component={ContractsReport} />
          <Route path="/reports/most-used-clauses" component={MostUsedClauses} />
          <Route path="/reports/platform-usage" component={PlatformUsage} />
          <Route path="/reports/export" component={ExportReports} />

          {/* Settings */}
          <Route path="/settings" component={SettingsPage} />
          <Route path="/settings/company-data" component={CompanyData} />
          <Route path="/settings/preferences" component={SystemPreferences} />
          <Route path="/settings/digital-signature" component={DigitalSignature} />
          <Route path="/settings/security-backup" component={SecurityBackup} />

          <Route path="/search" component={SearchPage} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <Toaster />
            <Router />
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}