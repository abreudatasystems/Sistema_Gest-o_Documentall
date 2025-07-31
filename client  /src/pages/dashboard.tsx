import { useLanguage } from "@/hooks/use-language";
import { KPICards } from "@/components/kpi-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, FileText, DollarSign, CheckCircle } from "lucide-react";

const mockChartData = [
  { name: "Jan", hours: 120, revenue: 2400 },
  { name: "Feb", hours: 150, revenue: 3000 },
  { name: "Mar", hours: 180, revenue: 3600 },
  { name: "Apr", hours: 140, revenue: 2800 },
  { name: "May", hours: 200, revenue: 4000 },
  { name: "Jun", hours: 160, revenue: 3200 },
];

const mockRecentActivities = [
  {
    id: 1,
    title: "Novo projeto criado",
    description: "Newsletter Campaign Q2",
    time: "2 horas atrás",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Entrada de tempo registrada",
    description: "3.5 horas no projeto ABC",
    time: "4 horas atrás",
    icon: Clock,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Fatura enviada",
    description: "Fatura #001 para Cliente XYZ",
    time: "6 horas atrás",
    icon: DollarSign,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Projeto concluído",
    description: "Newsletter Design Project",
    time: "1 dia atrás",
    icon: CheckCircle,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("welcome")}, Newsletter Admin!
        </h1>
        <p className="text-gray-600">
          {t("activitiesSummary")}
        </p>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("monthlyActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full mr-3 ${activity.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
