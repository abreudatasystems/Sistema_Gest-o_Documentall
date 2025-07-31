
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, FileText, Calendar, AlertTriangle, TrendingUp, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LegislativeUpdates() {
  const [searchTerm, setSearchTerm] = useState("");

  const updates = [
    {
      id: 1,
      title: "Lei Geral de Proteção de Dados - Atualização",
      description: "Novas diretrizes para tratamento de dados pessoais em contratos",
      category: "Privacidade",
      date: "20/01/2024",
      impact: "Alto",
      source: "ANPD",
      affected: "Contratos Digitais"
    },
    {
      id: 2,
      title: "Marco Legal das Startups - Alterações",
      description: "Mudanças nas regras de investimento e sociedade",
      category: "Empresarial",
      date: "18/01/2024",
      impact: "Médio",
      source: "Congresso Nacional",
      affected: "Contratos de Investimento"
    },
    {
      id: 3,
      title: "CLT - Nova Regulamentação Home Office",
      description: "Regras atualizadas para trabalho remoto",
      category: "Trabalhista",
      date: "15/01/2024",
      impact: "Alto",
      source: "Ministério do Trabalho",
      affected: "Contratos de Trabalho"
    }
  ];

  const getImpactColor = (impact: string) => {
    const colors = {
      "Alto": "bg-red-100 text-red-800",
      "Médio": "bg-yellow-100 text-yellow-800",
      "Baixo": "bg-green-100 text-green-800"
    };
    return colors[impact as keyof typeof colors] || colors["Médio"];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Atualizações Legislativas</h1>
          <p className="text-gray-600 mt-1">Acompanhe mudanças na legislação que impactam seus contratos</p>
        </div>
        <Button>
          <Bell className="w-4 h-4 mr-2" />
          Configurar Alertas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Atualizações</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mês</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alto Impacto</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates Atualizados</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recentes</TabsTrigger>
          <TabsTrigger value="high-impact">Alto Impacto</TabsTrigger>
          <TabsTrigger value="alerts">Alertas Ativos</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Atualizações Recentes</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar atualizações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {updates.map((update) => (
                  <div key={update.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{update.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getImpactColor(update.impact)}>
                          {update.impact}
                        </Badge>
                        <Badge variant="outline">{update.category}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{update.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {update.date}
                        </span>
                        <span>Fonte: {update.source}</span>
                        <span>Afeta: {update.affected}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high-impact">
          <Card>
            <CardHeader>
              <CardTitle>Atualizações de Alto Impacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                  <h3 className="font-semibold text-red-900">LGPD - Novas Sanções</h3>
                  <p className="text-red-700">Aumento das multas por não conformidade. Revisão urgente necessária.</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                  <h3 className="font-semibold text-orange-900">Marco Civil da Internet</h3>
                  <p className="text-orange-700">Alterações na responsabilidade de provedores de aplicação.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Atualizações LGPD</h3>
                    <p className="text-sm text-gray-600">Receber notificações sobre mudanças na Lei Geral de Proteção de Dados</p>
                  </div>
                  <Button variant="outline">Ativo</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Legislação Trabalhista</h3>
                    <p className="text-sm text-gray-600">Alertas sobre mudanças na CLT e normas trabalhistas</p>
                  </div>
                  <Button variant="outline">Ativo</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
