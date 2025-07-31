
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Send, Eye, Clock, AlertTriangle, User, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PendingSignatures() {
  const [searchTerm, setSearchTerm] = useState("");

  const pendingDocuments = [
    {
      id: 1,
      name: "Contrato de Prestação de Serviços - Empresa ABC",
      client: "João Silva",
      clientEmail: "joao@empresa.com",
      sentDate: "25/01/2024",
      dueDate: "10/02/2024",
      daysRemaining: 5,
      status: "Enviado",
      priority: "Normal",
      remindersSent: 1
    },
    {
      id: 2,
      name: "NDA - Acordo de Confidencialidade",
      client: "Maria Santos",
      clientEmail: "maria@startup.com",
      sentDate: "20/01/2024",
      dueDate: "05/02/2024",
      daysRemaining: 0,
      status: "Vencido",
      priority: "Alta",
      remindersSent: 3
    },
    {
      id: 3,
      name: "Contrato de Licenciamento de Software",
      client: "Carlos Oliveira",
      clientEmail: "carlos@tech.com",
      sentDate: "30/01/2024",
      dueDate: "15/02/2024",
      daysRemaining: 10,
      status: "Visualizado",
      priority: "Normal",
      remindersSent: 0
    },
    {
      id: 4,
      name: "Acordo de Parceria Comercial",
      client: "Ana Costa",
      clientEmail: "ana@parceiro.com",
      sentDate: "28/01/2024",
      dueDate: "08/02/2024",
      daysRemaining: 3,
      status: "Enviado",
      priority: "Urgente",
      remindersSent: 2
    }
  ];

  const getStatusBadge = (status: string, daysRemaining: number) => {
    if (status === "Vencido" || daysRemaining < 0) {
      return <Badge className="bg-red-100 text-red-800">Vencido</Badge>;
    }
    if (daysRemaining <= 2) {
      return <Badge className="bg-orange-100 text-orange-800">Urgente</Badge>;
    }
    if (status === "Visualizado") {
      return <Badge className="bg-blue-100 text-blue-800">Visualizado</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Enviado</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Urgente":
        return <Badge className="bg-red-100 text-red-800">Urgente</Badge>;
      case "Alta":
        return <Badge className="bg-orange-100 text-orange-800">Alta</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const filteredDocuments = pendingDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assinaturas Pendentes</h1>
          <p className="text-muted-foreground">
            Monitore documentos aguardando assinatura dos clientes
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Enviar Lembrete
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Novo Documento
          </Button>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pendente</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vencidos</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vence em 2 dias</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visualizados</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documentos Aguardando Assinatura</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Enviado em</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Dias Restantes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Lembretes</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="font-medium">{doc.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {doc.client.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{doc.client}</div>
                        <div className="text-sm text-muted-foreground">{doc.clientEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                      {doc.sentDate}
                    </div>
                  </TableCell>
                  <TableCell>{doc.dueDate}</TableCell>
                  <TableCell>
                    <div className={`font-medium ${
                      doc.daysRemaining < 0 ? 'text-red-600' :
                      doc.daysRemaining <= 2 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {doc.daysRemaining < 0 ? 'Vencido' : `${doc.daysRemaining} dias`}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(doc.status, doc.daysRemaining)}</TableCell>
                  <TableCell>{getPriorityBadge(doc.priority)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.remindersSent}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="w-4 h-4" />
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
