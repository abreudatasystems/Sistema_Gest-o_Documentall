
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Brain, ThumbsUp, ThumbsDown, TrendingUp, Lightbulb, History } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecommendationHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  const recommendations = [
    {
      id: 1,
      type: "Cláusula",
      title: "Cláusula de Proteção de Dados",
      description: "Adicionar cláusula específica sobre tratamento de dados pessoais",
      contract: "Contrato de Prestação de Serviços - Tech Corp",
      date: "20/01/2024",
      status: "Aplicada",
      confidence: 95,
      feedback: "positive"
    },
    {
      id: 2,
      type: "Revisão",
      title: "Prazo de Pagamento",
      description: "Sugestão para alterar prazo de 60 para 30 dias",
      contract: "Contrato Comercial - ABC Ltda",
      date: "18/01/2024",
      status: "Rejeitada",
      confidence: 87,
      feedback: "negative"
    },
    {
      id: 3,
      type: "Otimização",
      title: "Simplificação de Linguagem",
      description: "Simplificar termos técnicos para melhor compreensão",
      contract: "Acordo de Licenciamento - Software Inc",
      date: "15/01/2024",
      status: "Pendente",
      confidence: 92,
      feedback: null
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Aplicada": "bg-green-100 text-green-800",
      "Rejeitada": "bg-red-100 text-red-800",
      "Pendente": "bg-yellow-100 text-yellow-800"
    };
    return colors[status as keyof typeof colors] || colors["Pendente"];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Histórico de Recomendações</h1>
          <p className="text-gray-600 mt-1">Acompanhe todas as sugestões da IA e seus resultados</p>
        </div>
        <Button>
          <TrendingUp className="w-4 h-4 mr-2" />
          Relatório de Performance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Sugestões</p>
                <p className="text-2xl font-bold text-gray-900">834</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Aceitação</p>
                <p className="text-2xl font-bold text-gray-900">73%</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Precisão Média</p>
                <p className="text-2xl font-bold text-gray-900">89%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mês</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <Lightbulb className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="applied">Aplicadas</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Histórico Completo</CardTitle>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar recomendações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <DateRangePicker />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline">{rec.type}</Badge>
                          <Badge className={getStatusColor(rec.status)}>
                            {rec.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Confiança: {rec.confidence}%
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                        <p className="text-gray-600 mb-2">{rec.description}</p>
                        <p className="text-sm text-gray-500">
                          Contrato: {rec.contract} • {rec.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {rec.feedback === "positive" && (
                          <ThumbsUp className="w-5 h-5 text-green-500" />
                        )}
                        {rec.feedback === "negative" && (
                          <ThumbsDown className="w-5 h-5 text-red-500" />
                        )}
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${rec.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applied">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações Aplicadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <History className="w-12 h-12 mx-auto mb-4" />
                <p>Mostrando apenas recomendações que foram aplicadas aos contratos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações Rejeitadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <ThumbsDown className="w-12 h-12 mx-auto mb-4" />
                <p>Análise das recomendações rejeitadas para melhorar a IA</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-4" />
                <p>Recomendações aguardando revisão e decisão</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
