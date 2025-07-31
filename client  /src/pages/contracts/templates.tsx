import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Download, Edit, Copy, Star } from "lucide-react";

export default function Templates() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates = [
    {
      id: 1,
      name: "Contrato de Compra e Venda",
      category: "civil",
      description: "Modelo padrão para contratos de compra e venda de imóveis",
      tags: ["imóvel", "compra", "venda"],
      downloads: 245,
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: "Contrato de Trabalho CLT",
      category: "labor",
      description: "Modelo completo para contratos de trabalho no regime CLT",
      tags: ["trabalho", "CLT", "emprego"],
      downloads: 189,
      rating: 4.9,
      featured: true
    },
    {
      id: 3,
      name: "Contrato de Prestação de Serviços",
      category: "corporate",
      description: "Modelo para contratos de prestação de serviços empresariais",
      tags: ["serviços", "empresa", "prestação"],
      downloads: 156,
      rating: 4.7,
      featured: false
    },
    {
      id: 4,
      name: "Contrato de Locação Residencial",
      category: "civil",
      description: "Modelo para contratos de locação de imóveis residenciais",
      tags: ["locação", "aluguel", "residencial"],
      downloads: 203,
      rating: 4.6,
      featured: false
    },
    {
      id: 5,
      name: "Acordo de Confidencialidade (NDA)",
      category: "corporate",
      description: "Modelo de acordo de confidencialidade para empresas",
      tags: ["confidencialidade", "NDA", "sigilo"],
      downloads: 134,
      rating: 4.8,
      featured: true
    },
    {
      id: 6,
      name: "Contrato de Terceirização",
      category: "labor",
      description: "Modelo para contratos de terceirização de serviços",
      tags: ["terceirização", "outsourcing", "serviços"],
      downloads: 98,
      rating: 4.5,
      featured: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "civil": return "bg-blue-100 text-blue-800";
      case "labor": return "bg-green-100 text-green-800";
      case "corporate": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("templateLibrary")}</h1>
          <p className="text-gray-600 mt-1">Modelos jurídicos prontos para uso</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Criar Nova Minuta
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar minutas..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            <SelectItem value="civil">Civil</SelectItem>
            <SelectItem value="labor">Trabalhista</SelectItem>
            <SelectItem value="corporate">Empresarial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Minutas em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.filter(template => template.featured).map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{template.downloads} downloads</span>
                  <span>⭐ {template.rating}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Baixar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Todas as Minutas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{template.downloads} downloads</span>
                  <span>⭐ {template.rating}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Baixar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}