
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function IntegrationLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const logs = [
    {
      id: 1,
      timestamp: "2024-02-02 14:30:25",
      endpoint: "/api/contracts/create",
      method: "POST",
      status: "success",
      responseTime: "145ms",
      userAgent: "Mobile App v2.1",
      ip: "192.168.1.100",
      details: "Contrato criado com sucesso"
    },
    {
      id: 2,
      timestamp: "2024-02-02 14:28:10",
      endpoint: "/api/documents/upload",
      method: "POST",
      status: "error",
      responseTime: "2.3s",
      userAgent: "CRM System v1.5",
      ip: "10.0.0.50",
      details: "Erro: Arquivo muito grande"
    },
    {
      id: 3,
      timestamp: "2024-02-02 14:25:45",
      endpoint: "/api/clients/list",
      method: "GET",
      status: "success",
      responseTime: "89ms",
      userAgent: "Web Dashboard",
      ip: "192.168.1.200",
      details: "Lista de clientes recuperada"
    },
    {
      id: 4,
      timestamp: "2024-02-02 14:20:15",
      endpoint: "/api/auth/token",
      method: "POST",
      status: "warning",
      responseTime: "300ms",
      userAgent: "API Client v3.0",
      ip: "172.16.0.10",
      details: "Token renovado - expiração próxima"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "warning":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Sucesso</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Aviso</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logs de Integração</h1>
          <p className="text-muted-foreground">
            Monitore todas as requisições da API e integrações do sistema
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registro de Atividades</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="success">Sucesso</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                  <SelectItem value="warning">Aviso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tempo Resposta</TableHead>
                <TableHead>User Agent</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="font-mono">
                    {log.endpoint}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {log.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(log.status)}
                      {getStatusBadge(log.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">
                    {log.responseTime}
                  </TableCell>
                  <TableCell className="text-sm">
                    {log.userAgent}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.ip}
                  </TableCell>
                  <TableCell className="text-sm">
                    {log.details}
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
