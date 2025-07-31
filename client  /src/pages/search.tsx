import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  FileText, 
  Users, 
  Building2, 
  Clock, 
  Eye, 
  Download, 
  Star, 
  Shield, 
  BookOpen 
} from "lucide-react";

export default function SearchPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  const searchResults = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços - Empresa ABC",
      type: "Contrato",
      status: "Assinado",
      client: "Empresa ABC Ltda",
      author: "João Silva",
      date: "2024-01-15",
      lastModified: "2024-01-15T10:30:00",
      tags: ["Empresarial", "Mensal", "Software"],
      content: "Contrato para desenvolvimento de sistema de gestão comercial...",
      favorite: true,
      priority: "high",
      department: "Jurídico",
      size: "2.5 MB"
    },
    {
      id: 2,
      title: "Contrato de Locação Comercial - Imobiliária Centro",
      type: "Contrato",
      status: "Pendente",
      client: "Imobiliária Centro",
      author: "Maria Santos",
      date: "2024-01-10",
      lastModified: "2024-01-12T14:20:00",
      tags: ["Imobiliário", "Comercial", "5 anos"],
      content: "Contrato de locação para estabelecimento comercial no centro da cidade...",
      favorite: false,
      priority: "medium",
      department: "Imobiliário",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Parecer Jurídico - Questão Tributária",
      type: "Documento",
      status: "Finalizado",
      client: "Startup XYZ",
      author: "Carlos Mendes",
      date: "2024-01-12",
      lastModified: "2024-01-12T16:45:00",
      tags: ["Tributário", "Consultoria", "Urgente"],
      content: "Análise sobre questão tributária relacionada ao regime de apuração...",
      favorite: true,
      priority: "high",
      department: "Tributário",
      size: "750 KB"
    },
    {
      id: 4,
      title: "Minuta de Acordo Extrajudicial",
      type: "Documento",
      status: "Revisão",
      client: "Cliente Individual",
      author: "Ana Paula",
      date: "2024-01-08",
      lastModified: "2024-01-09T11:15:00",
      tags: ["Civil", "Acordo", "Mediação"],
      content: "Minuta para acordo extrajudicial em questão de direito civil...",
      favorite: false,
      priority: "medium",
      department: "Civil",
      size: "450 KB"
    },
    {
      id: 5,
      title: "Cláusula de Confidencialidade",
      type: "Cláusula",
      status: "Aprovada",
      client: "Padrão",
      author: "João Silva",
      date: "2024-01-05",
      lastModified: "2024-01-05T09:00:00",
      tags: ["Padrão", "NDA", "Empresarial"],
      content: "As partes comprometem-se a manter em sigilo todas as informações...",
      favorite: false,
      priority: "low",
      department: "Jurídico",
      size: "120 KB"
    },
    {
      id: 6,
      title: "Cláusula de Rescisão por Justa Causa",
      type: "Cláusula",
      status: "Aprovada",
      client: "Padrão",
      author: "Maria Santos",
      date: "2024-01-03",
      lastModified: "2024-01-03T15:30:00",
      tags: ["Trabalhista", "Rescisão", "Justa Causa"],
      content: "Constitui justa causa para rescisão do presente contrato...",
      favorite: false,
      priority: "low",
      department: "Trabalhista",
      size: "200 KB"
    }
  ];

  const filterOptions = [
    { id: "contract", label: "Contratos", count: 2 },
    { id: "document", label: "Documentos", count: 2 },
    { id: "clause", label: "Cláusulas", count: 2 },
    { id: "assinado", label: "Assinados", count: 1 },
    { id: "pendente", label: "Pendentes", count: 1 },
    { id: "finalizado", label: "Finalizados", count: 1 },
    { id: "revisao", label: "Em Revisão", count: 1 },
    { id: "aprovada", label: "Aprovados", count: 2 }
  ];

  const recentSearches = [
    "contratos de prestação",
    "cláusulas de confidencialidade",
    "parecer tributário",
    "documentos empresa abc",
    "templates padrão"
  ];

  const quickFilters = [
    { id: "favorites", label: "Favoritos", icon: Star },
    { id: "recent", label: "Recentes", icon: Clock },
    { id: "shared", label: "Compartilhados", icon: Users },
    { id: "urgent", label: "Urgentes", icon: Shield }
  ];

  const filteredResults = searchResults.filter(item => {
    const matchesQuery = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.some(filter => 
        item.type.toLowerCase().includes(filter) || 
        item.status.toLowerCase().includes(filter) ||
        (filter === "favorites" && item.favorite) ||
        (filter === "urgent" && item.priority === "high")
      );

    const matchesTab = activeTab === "all" || 
      item.type.toLowerCase() === activeTab;

    return matchesQuery && matchesFilters && matchesTab;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "modified":
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "client":
        return a.client.localeCompare(b.client);
      default:
        return 0;
    }
  });

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Contrato":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "Documento":
        return <FileText className="w-4 h-4 text-green-600" />;
      case "Cláusula":
        return <BookOpen className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assinado":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Revisão":
        return "bg-orange-100 text-orange-800";
      case "Finalizado":
        return "bg-blue-100 text-blue-800";
      case "Aprovada":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Busca Avançada</h1>
          <p className="text-gray-600 mt-1">Encontre documentos, contratos e cláusulas rapidamente</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevância</SelectItem>
              <SelectItem value="date">Data de criação</SelectItem>
              <SelectItem value="modified">Última modificação</SelectItem>
              <SelectItem value="title">Título</SelectItem>
              <SelectItem value="client">Cliente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar com filtros */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtros rápidos */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filtros rápidos</h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickFilters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id)}
                      className="justify-start"
                    >
                      <filter.icon className="w-3 h-3 mr-1" />
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Tipo de documento</h4>
                {filterOptions.slice(0, 3).map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={() => toggleFilter(filter.id)}
                    />
                    <label
                      htmlFor={filter.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                    >
                      {filter.label}
                    </label>
                    <Badge variant="secondary" className="text-xs">
                      {filter.count}
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Status</h4>
                {filterOptions.slice(3).map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={() => toggleFilter(filter.id)}
                    />
                    <label
                      htmlFor={filter.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                    >
                      {filter.label}
                    </label>
                    <Badge variant="secondary" className="text-xs">
                      {filter.count}
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Departamento</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="juridico">Jurídico</SelectItem>
                    <SelectItem value="tributario">Tributário</SelectItem>
                    <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Período</h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                            {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                          </>
                        ) : (
                          format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                        )
                      ) : (
                        <span>Selecionar período</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={(range) => setDateRange(range || {})}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Buscas recentes</h4>
                <ScrollArea className="h-32">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="block w-full text-left p-2 rounded text-sm hover:bg-gray-50"
                    >
                      <Clock className="w-3 h-3 inline mr-2" />
                      {search}
                    </button>
                  ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {/* Barra de busca */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar documentos, contratos, cláusulas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>

            {/* Filtros ativos */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filterId) => {
                  const filter = filterOptions.find(f => f.id === filterId) || 
                    quickFilters.find(f => f.id === filterId);
                  return (
                    <Badge key={filterId} variant="secondary" className="flex items-center gap-1">
                      {filter?.label || filterId}
                      <button
                        onClick={() => toggleFilter(filterId)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFilters([])}
                  className="text-red-600 hover:text-red-700"
                >
                  Limpar todos
                </Button>
              </div>
            )}

            {/* Estatísticas de busca */}
            <div className="text-sm text-gray-600">
              {searchQuery && (
                <span>
                  Resultados para "<strong>{searchQuery}</strong>" - {sortedResults.length} encontrado(s)
                </span>
              )}
            </div>

            {/* Abas de resultados */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Todos ({searchResults.length})</TabsTrigger>
                <TabsTrigger value="contrato">Contratos ({searchResults.filter(r => r.type === "Contrato").length})</TabsTrigger>
                <TabsTrigger value="documento">Documentos ({searchResults.filter(r => r.type === "Documento").length})</TabsTrigger>
                <TabsTrigger value="cláusula">Cláusulas ({searchResults.filter(r => r.type === "Cláusula").length})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                <div className="space-y-4">
                  {sortedResults.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {getTypeIcon(result.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-lg">{result.title}</h3>
                                {result.favorite && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                )}
                                <Badge className={getStatusColor(result.status)}>
                                  {result.status}
                                </Badge>
                                <Badge variant="outline" className={getPriorityColor(result.priority)}>
                                  {result.priority}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{result.content}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {result.client}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {result.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  {format(new Date(result.date), "dd/MM/yyyy")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {format(new Date(result.lastModified), "dd/MM/yyyy HH:mm")}
                                </span>
                                <span>{result.department}</span>
                                <span>{result.size}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                {result.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-gray-50">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {sortedResults.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum resultado encontrado
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Tente ajustar seus filtros ou termos de busca
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedFilters([]);
                        setDateRange({});
                      }}
                    >
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}