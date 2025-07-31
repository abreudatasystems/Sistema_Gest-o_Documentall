import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Search, Filter, Download, Share2, Edit, Trash2, MoreHorizontal, Eye, FolderOpen, Calendar, User } from "lucide-react";

export default function AllDocuments() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const documents = [
    {
      id: 1,
      name: "Contrato de Prestação de Serviços - Empresa ABC",
      type: "contract",
      status: "active",
      client: "Empresa ABC Ltda",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      size: "2.3 MB",
      tags: ["contrato", "prestação", "serviços"],
      shared: true,
      version: "1.2"
    },
    {
      id: 2,
      name: "Acordo de Confidencialidade - Projeto XYZ",
      type: "nda",
      status: "signed",
      client: "Startup XYZ",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      size: "1.8 MB",
      tags: ["confidencialidade", "NDA", "projeto"],
      shared: false,
      version: "1.0"
    },
    {
      id: 3,
      name: "Contrato de Compra e Venda - Imóvel Centro",
      type: "purchase",
      status: "draft",
      client: "João Silva",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-22",
      size: "3.1 MB",
      tags: ["compra", "venda", "imóvel"],
      shared: true,
      version: "0.8"
    },
    {
      id: 4,
      name: "Termo de Rescisão - Funcionário Maria",
      type: "termination",
      status: "signed",
      client: "Maria Santos",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-25",
      size: "1.2 MB",
      tags: ["rescisão", "trabalho", "funcionário"],
      shared: false,
      version: "1.1"
    },
    {
      id: 5,
      name: "Proposta Comercial - Consultoria Jurídica",
      type: "proposal",
      status: "pending",
      client: "Tech Solutions",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-19",
      size: "2.7 MB",
      tags: ["proposta", "consultoria", "jurídica"],
      shared: true,
      version: "1.3"
    },
    {
      id: 6,
      name: "Contrato de Locação - Escritório Comercial",
      type: "lease",
      status: "active",
      client: "Imobiliária Centro",
      createdAt: "2024-01-03",
      updatedAt: "2024-01-21",
      size: "2.9 MB",
      tags: ["locação", "escritório", "comercial"],
      shared: false,
      version: "2.0"
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "signed": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Ativo";
      case "signed": return "Assinado";
      case "draft": return "Rascunho";
      case "pending": return "Pendente";
      default: return "Desconhecido";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contract": return <FileText className="w-4 h-4" />;
      case "nda": return <FileText className="w-4 h-4" />;
      case "purchase": return <FileText className="w-4 h-4" />;
      case "termination": return <FileText className="w-4 h-4" />;
      case "proposal": return <FileText className="w-4 h-4" />;
      case "lease": return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "contract": return "Contrato";
      case "nda": return "NDA";
      case "purchase": return "Compra/Venda";
      case "termination": return "Rescisão";
      case "proposal": return "Proposta";
      case "lease": return "Locação";
      default: return "Documento";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("allDocuments")}</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os documentos da plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <FolderOpen className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Novo Documento
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar documentos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="contract">Contratos</SelectItem>
            <SelectItem value="nda">NDAs</SelectItem>
            <SelectItem value="purchase">Compra/Venda</SelectItem>
            <SelectItem value="proposal">Propostas</SelectItem>
            <SelectItem value="lease">Locações</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="signed">Assinado</SelectItem>
            <SelectItem value="draft">Rascunho</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ativos</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Share2 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Compartilhados</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.shared).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {getTypeIcon(doc.type)}
                    <div className="ml-2">
                      <CardTitle className="text-lg line-clamp-2">{doc.name}</CardTitle>
                      <p className="text-sm text-gray-600">{getTypeText(doc.type)}</p>
                    </div>
                  </div>
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
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusText(doc.status)}
                    </Badge>
                    <span className="text-sm text-gray-500">v{doc.version}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {doc.client}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500">{doc.size}</span>
                    {doc.shared && (
                      <Badge variant="outline" className="text-xs">
                        <Share2 className="w-3 h-3 mr-1" />
                        Compartilhado
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Modificação</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {getTypeIcon(doc.type)}
                      <div className="ml-2">
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-gray-500">v{doc.version}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeText(doc.type)}</TableCell>
                  <TableCell>{doc.client}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusText(doc.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(doc.updatedAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{doc.size}</TableCell>
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
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartilhar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Baixar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}