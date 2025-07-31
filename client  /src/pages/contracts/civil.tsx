import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Eye, Edit, Plus } from "lucide-react";

export default function CivilTemplates() {
  const [searchTerm, setSearchTerm] = useState("");

  const templates = [
    {
      id: 1,
      name: "Contrato de Compra e Venda",
      description: "Template para contratos de compra e venda de bens móveis e imóveis",
      category: "Patrimonial",
      lastModified: "15/01/2024",
      usage: 45,
      status: "Ativo"
    },
    {
      id: 2,
      name: "Contrato de Locação Residencial",
      description: "Template para locação de imóveis residenciais",
      category: "Imobiliário",
      lastModified: "20/01/2024",
      usage: 32,
      status: "Ativo"
    },
    {
      id: 3,
      name: "Contrato de Prestação de Serviços",
      description: "Template genérico para prestação de serviços civis",
      category: "Serviços",
      lastModified: "10/01/2024",
      usage: 28,
      status: "Ativo"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates Civis</h1>
          <p className="text-gray-600 mt-1">Gerencie templates para contratos de direito civil</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{template.category}</Badge>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{template.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>Última modificação: {template.lastModified}</p>
                    <p>Usado {template.usage} vezes</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}