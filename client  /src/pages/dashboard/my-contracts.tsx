import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Calendar, User, MoreHorizontal, Eye, Edit, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MyContracts() {
  const [searchTerm, setSearchTerm] = useState("");

  const contracts = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços",
      client: "Empresa ABC Ltda",
      status: "Ativo",
      type: "Prestação de Serviços",
      createdDate: "15/01/2024",
      expiryDate: "15/01/2025",
      value: "R$ 50.000,00"
    },
    {
      id: 2,
      title: "Acordo de Confidencialidade",
      client: "Startup XYZ",
      status: "Pendente",
      type: "NDA",
      createdDate: "20/01/2024",
      expiryDate: "-",
      value: "-"
    },
    {
      id: 3,
      title: "Contrato de Licenciamento",
      client: "Tech Solutions",
      status: "Em Revisão",
      type: "Licenciamento",
      createdDate: "25/01/2024",
      expiryDate: "25/12/2024",
      value: "R$ 120.000,00"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Ativo": "bg-green-100 text-green-800",
      "Pendente": "bg-yellow-100 text-yellow-800",
      "Em Revisão": "bg-blue-100 text-blue-800",
      "Vencido": "bg-red-100 text-red-800"
    };
    return variants[status] || "bg-gray-100 text-gray-800";
  };

  const filteredContracts = contracts.filter(contract =>
    contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Contratos</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os seus contratos ativos e histórico</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Contratos</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contratos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Revisão</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vencendo em 30 dias</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar contratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {contract.client}
                    </div>
                  </TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(contract.status)}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{contract.createdDate}</TableCell>
                  <TableCell>{contract.expiryDate}</TableCell>
                  <TableCell>{contract.value}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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