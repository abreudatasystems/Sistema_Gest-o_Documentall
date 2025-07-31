import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Users, Building2, Calendar as CalendarIcon, Clock } from "lucide-react";

export function QuickSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [_, navigate] = useLocation();

  const quickResults = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços - Empresa ABC",
      type: "Contrato",
      client: "Empresa ABC",
      date: "15/01/2024",
      url: "/contracts/1"
    },
    {
      id: 2,
      title: "Cláusula de Confidencialidade",
      type: "Cláusula",
      client: "Padrão",
      date: "10/01/2024",
      url: "/clauses/2"
    },
    {
      id: 3,
      title: "Parecer Jurídico - Questão Tributária",
      type: "Documento",
      client: "Startup XYZ",
      date: "12/01/2024",
      url: "/documents/3"
    }
  ];

  const recentSearches = [
    "contratos de prestação",
    "cláusulas padrão",
    "parecer tributário",
    "acordo extrajudicial"
  ];

  const handleSearch = (searchQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setIsOpen(false);
    setQuery("");
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-64 justify-start text-gray-500">
          <Search className="w-4 h-4 mr-2" />
          Buscar contratos, documentos...
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Busca Rápida</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua busca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
              className="flex-1"
            />
            <Button onClick={() => handleSearch(query)} disabled={!query}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {query && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Resultados</h3>
                <div className="space-y-2">
                  {quickResults
                    .filter(item => 
                      item.title.toLowerCase().includes(query.toLowerCase()) ||
                      item.type.toLowerCase().includes(query.toLowerCase()) ||
                      item.client.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleResultClick(item.url)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <p className="font-medium text-sm">{item.title}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {item.client}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3" />
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                </div>
                <div className="mt-3 pt-3 border-t">
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => handleSearch(query)}
                    className="w-full"
                  >
                    Ver todos os resultados para "{query}"
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!query && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Buscas Recentes
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="block w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Acessos Rápidos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/contracts/create')}
                      className="justify-start"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Novo Contrato
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/templates')}
                      className="justify-start"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Templates
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/clients')}
                      className="justify-start"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Clientes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/documents/all')}
                      className="justify-start"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Documentos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}