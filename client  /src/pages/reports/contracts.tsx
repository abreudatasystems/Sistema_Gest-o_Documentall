
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { exportToCSV, exportToPDF, exportToExcel, exportToJSON } from "@/utils/export-utils";
import {
  FileText,
  TrendingUp,
  RefreshCw,
  Download,
  Filter,
  Search,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  ChevronDown
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line } from "recharts";

export default function ContractsReport() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const contractsData = [
    {
      id: 1,
      number: "CT-2024-001",
      client: "Empresa ABC Ltda",
      type: "Prestação de Serviços",
      value: 125000,
      status: "signed",
      createdAt: "2024-01-15",
      signedAt: "2024-01-20",
      expiresAt: "2025-01-20",
      responsible: "João Silva"
    },
    {
      id: 2,
      number: "CT-2024-002",
      client: "Startup XYZ",
      type: "Confidencialidade",
      value: 0,
      status: "pending",
      createdAt: "2024-01-18",
      signedAt: null,
      expiresAt: "2024-12-31",
      responsible: "Maria Santos"
    },
    {
      id: 3,
      number: "CT-2024-003",
      client: "Tech Solutions",
      type: "Desenvolvimento",
      value: 89000,
      status: "signed",
      createdAt: "2024-01-22",
      signedAt: "2024-01-25",
      expiresAt: "2024-07-25",
      responsible: "Pedro Costa"
    },
    {
      id: 4,
      number: "CT-2024-004",
      client: "Construtora Alpha",
      type: "Consultoria",
      value: 67000,
      status: "draft",
      createdAt: "2024-01-25",
      signedAt: null,
      expiresAt: "2024-06-30",
      responsible: "Ana Oliveira"
    }
  ];

  const chartData = [
    { month: "Jan", contracts: 15, value: 450000 },
    { month: "Fev", contracts: 22, value: 680000 },
    { month: "Mar", contracts: 18, value: 520000 },
    { month: "Abr", contracts: 25, value: 750000 },
    { month: "Mai", contracts: 30, value: 890000 },
    { month: "Jun", contracts: 28, value: 820000 },
  ];

  const statusData = [
    { name: "Assinados", value: 65, color: "#10B981" },
    { name: "Pendentes", value: 20, color: "#F59E0B" },
    { name: "Rascunhos", value: 15, color: "#6B7280" },
  ];

  const stats = [
    {
      title: "Total de Contratos",
      value: "329",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Contratos Assinados",
      value: "285",
      change: "+8%",
      trend: "up",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Taxa de Conversão",
      value: "86.6%",
      change: "+2.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600"
    },
    {
      title: "Receita Gerada",
      value: "R$ 2.814.000",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return <Badge className="bg-green-100 text-green-800">Assinado</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const filteredContracts = contractsData.filter(contract => {
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    const matchesClient = clientFilter === "" || contract.client.toLowerCase().includes(clientFilter.toLowerCase());
    const matchesSearch = searchTerm === "" || 
      contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesClient && matchesSearch;
  });

  const handleExport = (format: 'csv' | 'pdf' | 'excel' | 'json') => {
    const exportData = {
      headers: ['Número', 'Cliente', 'Tipo', 'Valor', 'Status', 'Data Criação', 'Responsável'],
      data: filteredContracts.map(contract => ({
        'número': contract.number,
        'cliente': contract.client,
        'tipo': contract.type,
        'valor': `R$ ${contract.value.toLocaleString('pt-BR')}`,
        'status': contract.status === 'signed' ? 'Assinado' : 
                 contract.status === 'pending' ? 'Pendente' : 'Rascunho',
        'data criação': new Date(contract.createdAt).toLocaleDateString('pt-BR'),
        'responsável': contract.responsible
      })),
      filename: `relatorio-contratos-${new Date().toISOString().split('T')[0]}`,
      title: 'Relatório de Contratos Gerados'
    };

    switch (format) {
      case 'csv':
        exportToCSV(exportData);
        break;
      case 'pdf':
        exportToPDF(exportData);
        break;
      case 'excel':
        exportToExcel(exportData);
        break;
      case 'json':
        exportToJSON(exportData);
        break;
    }

    toast({
      title: "Relatório exportado",
      description: `Relatório exportado em formato ${format.toUpperCase()} com sucesso!`
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatório de Contratos</h1>
          <p className="text-gray-600 mt-1">Análise detalhada de contratos gerados no sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Exportar
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                <FileText className="w-4 h-4 mr-2" />
                Exportar como PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Exportar como Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <FileText className="w-4 h-4 mr-2" />
                Exportar como CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <FileText className="w-4 h-4 mr-2" />
                Exportar como JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar contratos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="signed">Assinados</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="draft">Rascunhos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cliente</Label>
              <Input
                placeholder="Filtrar por cliente..."
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
              />
            </div>
            <div>
              <Label>Período</Label>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Selecionar período
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Contratos por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="contracts" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Status dos Contratos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Tooltip />
                  <pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead>Responsável</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.number}</TableCell>
                  <TableCell>{contract.client}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>
                    {contract.value > 0 ? `R$ ${contract.value.toLocaleString('pt-BR')}` : 'N/A'}
                  </TableCell>
                  <TableCell>{getStatusBadge(contract.status)}</TableCell>
                  <TableCell>{new Date(contract.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{contract.responsible}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredContracts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum contrato encontrado com os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
