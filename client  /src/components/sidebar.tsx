import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Clock, 
  Users, 
  FileText,
  Settings,
  X,
  Globe,
  ChevronDown,
  ChevronUp,
  Bot,
  Zap,
  Archive,
  Shield,
  BarChart,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  path: string;
  icon: any;
  label: string;
  subItems?: { path: string; label: string; }[];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    { 
      path: "/", 
      icon: LayoutDashboard, 
      label: t("dashboard"),
      subItems: [
        { path: "/", label: t("overview") },
        { path: "/my-contracts", label: t("myContracts") },
        { path: "/recent-activities", label: t("recentActivities") },
      ]
    },
    { 
      path: "/contracts", 
      icon: FileText, 
      label: t("contractsTemplates"),
      subItems: [
        { path: "/templates", label: t("templateLibrary") },
        { path: "/templates/civil", label: t("civil") },
        { path: "/templates/labor", label: t("labor") },
        { path: "/templates/corporate", label: t("corporate") },
        { path: "/templates/others", label: t("others") },
        { path: "/contracts/create", label: t("createContract") },
        { path: "/contracts/ai", label: t("aiPersonalization") },
        { path: "/contracts/review", label: t("contractsReview") },
        { path: "/contracts/finalized", label: t("contractsFinalized") },
      ]
    },
    { 
      path: "/ai", 
      icon: Bot, 
      label: t("artificialIntelligence"),
      subItems: [
        { path: "/ai/clauses", label: t("clauseSuggestions") },
        { path: "/ai/updates", label: t("legislativeUpdates") },
        { path: "/ai/history", label: t("recommendationHistory") },
      ]
    },
    { 
      path: "/integrations", 
      icon: Zap, 
      label: t("integrations"),
      subItems: [
        { path: "/integrations/docs", label: t("apiDocumentation") },
        { path: "/integrations/keys", label: t("accessKeys") },
        { path: "/integrations/logs", label: t("integrationLogs") },
      ]
    },
    { 
      path: "/documents", 
      icon: Archive, 
      label: t("documentManagement"),
      subItems: [
        { path: "/documents/all", label: t("allDocuments") },
        { path: "/documents/shared", label: t("sharedWithClients") },
        { path: "/documents/signatures", label: t("pendingSignatures") },
        { path: "/documents/inactive", label: t("inactiveFiles") },
      ]
    },
    { 
      path: "/people", 
      icon: Users, 
      label: t("peopleManagement"),
      subItems: [
        { path: "/clients", label: t("clients") },
        { path: "/clients/list", label: t("listClients") },
        { path: "/clients/register", label: t("registerClient") },
        { path: "/clients/contracts", label: t("viewContracts") },
        { path: "/employees", label: t("employees") },
        { path: "/employees/list", label: t("listEmployees") },
        { path: "/employees/register", label: t("registerEmployee") },
        { path: "/employees/permissions", label: t("accessPermissions") },
      ]
    },
    { 
      path: "/access", 
      icon: Shield, 
      label: t("accessControl"),
      subItems: [
        { path: "/access/profiles", label: t("profilesPermissions") },
        { path: "/access/levels", label: t("assignAccessLevels") },
        { path: "/access/logs", label: t("accessLogs") },
      ]
    },
    { 
      path: "/reports", 
      icon: BarChart, 
      label: t("reportsIndicators"),
      subItems: [
        { path: "/reports/contracts", label: t("contractsGenerated") },
        { path: "/reports/clauses", label: t("mostUsedClauses") },
        { path: "/reports/usage", label: t("platformUsage") },
        { path: "/reports/export", label: t("exportReports") },
      ]
    },
    { 
      path: "/settings", 
      icon: Settings, 
      label: t("settings"),
      subItems: [
        { path: "/settings/company", label: t("companyData") },
        { path: "/settings/preferences", label: t("systemPreferences") },
        { path: "/settings/signature", label: t("digitalSignature") },
        { path: "/settings/security", label: t("securityBackup") },
      ]
    },
  ];

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  const languages = [
    { code: "pt" as const, name: t("portuguese") },
    { code: "en" as const, name: t("english") },
    { code: "es" as const, name: t("spanish") },
  ];

  const currentLanguageName = languages.find(lang => lang.code === language)?.name || "Português";

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-80 sidebar-bg transform transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0 lg:static lg:inset-0"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 sidebar-border border-b">
          <h1 className="text-xl font-bold sidebar-text">SGD</h1>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="sidebar-text hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              const isExpanded = expandedItems.includes(item.path);
              const hasSubItems = item.subItems && item.subItems.length > 0;
              
              return (
                <li key={item.path}>
                  <div>
                    <button
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors",
                        isActive 
                          ? "sidebar-accent sidebar-accent-text" 
                          : "sidebar-text hover:bg-white/10"
                      )}
                      onClick={() => hasSubItems ? toggleExpanded(item.path) : null}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                      </div>
                      {hasSubItems && (
                        isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      )}
                    </button>
                    
                    {hasSubItems && isExpanded && (
                      <ul className="mt-2 ml-8 space-y-1">
                        {item.subItems!.map((subItem) => {
                          const isSubActive = location === subItem.path;
                          return (
                            <li key={subItem.path}>
                              <Link href={subItem.path}>
                                <button
                                  className={cn(
                                    "flex items-center w-full px-3 py-2 rounded-lg transition-colors text-sm",
                                    isSubActive 
                                      ? "sidebar-accent sidebar-accent-text" 
                                      : "sidebar-text hover:bg-white/10"
                                  )}
                                  onClick={() => isMobile && onClose()}
                                >
                                  <span>{subItem.label}</span>
                                </button>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language Selector */}
        <div className="px-4 py-4 sidebar-border border-t">
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center justify-between w-full px-4 py-2 sidebar-text hover:bg-white/10"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>{currentLanguageName}</span>
              </div>
              {languageMenuOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            
            {languageMenuOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      setLanguage(lang.code);
                      setLanguageMenuOpen(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
