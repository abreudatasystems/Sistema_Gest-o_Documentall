
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Eye, Edit, MessageSquare, Clock, User, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ContractsInReview() {
  const [searchTerm, setSearchTerm] = useState("");

  const contracts = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços - Tech Corp",
      client: "Tech Corp Ltda",
      reviewer: "Ana Silva",
      reviewerAvatar: "/avatars/ana.jpg",
      status: "Em Análise",
      priority: "Alta",
      daysInReview: 3,
      lastActivity: "2 horas atrás",
      comments: 5
    },
    {
      id: 2,
      title: "Acordo de Confidencialidade - Startup XYZ",
      client: "Startup XYZ",
      reviewer: "João Santos",
      reviewerAvatar: "/avatars/joao.jpg",
      status: "Aguardando Correções",
      priority: "Média",
      daysInReview: 7,
      lastActivity: "1 dia atrás",
      comments: 3
    },
    {
      id: 3,
      title: "Contrato de Licenciamento - Software Ltd",
      client: "Software Ltd",
      reviewer: "Maria Costa",
      reviewerAvatar: "/avatars/maria.jpg",
      status: "Aprovação Final",
      priority: "Alta",
      daysInReview: 2,
      lastActivity: "30 min atrás",
      comments: 8
    }
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      "Alta": "bg-red-100 text-red-800",
      "Média": "bg-yellow-100 text-yellow-800",
      "Baixa": "bg-green-100 text-green-800"
    };
    return colors[priority as keyof typeof colors] || colors["Média"];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Em Análise": "bg-blue-100 text-blue-800",
      "Aguardando Correções": "bg-orange-100 text-orange-800",
      "Aprovação Final": "bg-green-100 text-green-800"
    };
    return colors[status as keyof typeof colors] || colors["Em Análise"];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contratos em Revisão</h1>
          <p className="text-gray-600 mt-1">Acompanhe o status de todos os contratos em processo de revisão</p>
        </div>
        <Button>
          <Eye className="w-4 h-4 mr-2" />
          Ver Todos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Revisão</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prioridade Alta</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <MessageSquare className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aguardando Correções</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Edit className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-gray-900">5 dias</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Contratos</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar contratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Revisor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Dias em Revisão</TableHead>
                <TableHead>Comentários</TableHead>
                <TableHead>Última Atividade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.title}</TableCell>
                  <TableCell>{contract.client}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={contract.reviewerAvatar} />
                        <AvatarFallback>{contract.reviewer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{contract.reviewer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(contract.priority)}>
                      {contract.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{contract.daysInReview} dias</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      {contract.comments}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{contract.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
