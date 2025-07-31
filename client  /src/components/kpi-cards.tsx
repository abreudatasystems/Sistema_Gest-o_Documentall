import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { FolderOpen, Clock, DollarSign, FileText, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface KPICardsProps {}

export function KPICards({}: KPICardsProps) {
  const { t } = useLanguage();
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
  });

  const kpiData = [
    {
      title: t("totalProjects"),
      value: stats?.totalProjects || 0,
      icon: FolderOpen,
      color: "bg-blue-100 text-blue-600",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: t("activeProjects"),
      value: stats?.activeProjects || 0,
      icon: Clock,
      color: "bg-green-100 text-green-600",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: t("totalHours"),
      value: stats?.totalHours ? `${stats.totalHours.toFixed(1)}h` : "0h",
      icon: Clock,
      color: "bg-purple-100 text-purple-600",
      change: "+15%",
      changeType: "positive" as const,
    },
    {
      title: t("totalRevenue"),
      value: stats?.totalRevenue ? `$${stats.totalRevenue.toFixed(2)}` : "$0.00",
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
      change: "+23%",
      changeType: "positive" as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div className={`p-3 rounded-full ${kpi.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`flex items-center ${
                  kpi.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {kpi.change}
                </span>
                <span className="text-gray-500 ml-2">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
