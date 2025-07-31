import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Search, ThumbsUp, ThumbsDown, Copy, Bookmark, Sparkles, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function ClauseSuggestions() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [customRequest, setCustomRequest] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestions = [
    {
      id: 1,
      title: "Cláusula de Rescisão Antecipada",
      category: "rescisao",
      confidence: 95,
      content: "Qualquer das partes poderá rescindir o presente contrato, antecipadamente, mediante notificação por escrito com antecedência mínima de 30 (trinta) dias, sem necessidade de justificativa.",
      context: "Contrato de Prestação de Serviços",
      tags: ["rescisão", "antecipada", "notificação"],
      votes: { up: 23, down: 2 },
      status: "approved"
    },
    {
      id: 2,
      title: "Cláusula de Pagamento com Juros",
      category: "pagamento",
      confidence: 88,
      content: "O atraso no pagamento sujeitará o devedor ao pagamento de juros de mora de 1% (um por cento) ao mês, bem como multa de 2% (dois por cento) sobre o valor em atraso, sem prejuízo da correção monetária.",
      context: "Contrato de Compra e Venda",
      tags: ["pagamento", "juros", "mora", "multa"],
      votes: { up: 31, down: 1 },
      status: "approved"
    },
    {
      id: 3,
      title: "Cláusula de Confidencialidade",
      category: "confidencialidade",
      confidence: 92,
      content: "As partes se comprometem a manter sigilo absoluto sobre todas as informações confidenciais trocadas durante a vigência deste contrato, pelo prazo de 5 (cinco) anos após seu término.",
      context: "Acordo de Confidencialidade",
      tags: ["confidencialidade", "sigilo", "informações"],
      votes: { up: 18, down: 0 },
      status: "new"
    },
    {
      id: 4,
      title: "Cláusula de Força Maior",
      category: "forca_maior",
      confidence: 90,
      content: "Nenhuma das partes será responsável pelo inadimplemento de suas obrigações se este resultar de caso fortuito ou força maior, conforme definido no Código Civil Brasileiro.",
      context: "Contrato Geral",
      tags: ["força maior", "caso fortuito", "inadimplemento"],
      votes: { up: 15, down: 3 },
      status: "under_review"
    },
    {
      id: 5,
      title: "Cláusula de Propriedade Intelectual",
      category: "propriedade",
      confidence: 85,
      content: "Todos os direitos de propriedade intelectual sobre os trabalhos desenvolvidos no âmbito deste contrato pertencerão exclusivamente ao CONTRATANTE, incluindo, mas não se limitando a, direitos autorais, marcas e patentes.",
      context: "Contrato de Desenvolvimento",
      tags: ["propriedade intelectual", "direitos autorais", "desenvolvimento"],
      votes: { up: 12, down: 4 },
      status: "approved"
    }
  ];

  const categories = [
    { value: "all", label: "Todas as Categorias" },
    { value: "rescisao", label: "Rescisão" },
    { value: "pagamento", label: "Pagamento" },
    { value: "confidencialidade", label: "Confidencialidade" },
    { value: "forca_maior", label: "Força Maior" },
    { value: "propriedade", label: "Propriedade Intelectual" }
  ];

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || suggestion.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-100 text-green-800";
    if (confidence >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "under_review": return <Clock className="w-4 h-4 text-yellow-600" />;
      case "new": return <Sparkles className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved": return "Aprovada";
      case "under_review": return "Em Análise";
      case "new": return "Nova";
      default: return "Pendente";
    }
  };

  const handleGenerateCustom = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("clauseSuggestions")}</h1>
          <p className="text-gray-600 mt-1">Sugestões inteligentes de cláusulas baseadas em IA</p>
        </div>
        <Badge variant="outline" className="text-blue-600">
          <Bot className="w-4 h-4 mr-1" />
          IA Jurídica
        </Badge>
      </div>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
          <TabsTrigger value="generate">Gerar Personalizada</TabsTrigger>
          <TabsTrigger value="favorites">Favoritas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggestions" className="space-y-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar cláusulas..."
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
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Suggestions List */}
          <div className="space-y-4">
            {filteredSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                        {getStatusIcon(suggestion.status)}
                        <span className="text-sm text-gray-500">{getStatusText(suggestion.status)}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getConfidenceColor(suggestion.confidence)}>
                          {suggestion.confidence}% confiança
                        </Badge>
                        <Badge variant="outline">
                          {suggestion.context}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-800">{suggestion.content}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {suggestion.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-600">{suggestion.votes.up}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-600">{suggestion.votes.down}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4 mr-1" />
                          Copiar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="w-4 h-4 mr-1" />
                          Salvar
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Usar Cláusula
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                Gerar Cláusula Personalizada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Descreva o que você precisa:
                </label>
                <Textarea
                  placeholder="Ex: Preciso de uma cláusula que defina responsabilidades em caso de atraso na entrega de produtos..."
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Contrato:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compra_venda">Compra e Venda</SelectItem>
                      <SelectItem value="prestacao_servicos">Prestação de Serviços</SelectItem>
                      <SelectItem value="trabalho">Trabalho</SelectItem>
                      <SelectItem value="locacao">Locação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Área do Direito:</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                      <SelectItem value="trabalhista">Trabalhista</SelectItem>
                      <SelectItem value="consumidor">Consumidor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleGenerateCustom}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isGenerating || !customRequest.trim()}
              >
                {isGenerating ? (
                  <>
                    <Bot className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Cláusula
                  </>
                )}
              </Button>
              
              {isGenerating && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Bot className="w-5 h-5 text-blue-600 mr-2 animate-pulse" />
                    <span className="text-blue-900 font-medium">Analisando sua solicitação...</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Nossa IA está processando sua solicitação e analisando jurisprudência relevante.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-6">
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma cláusula favorita</h3>
            <p className="text-gray-600">
              Salve suas cláusulas favoritas para acesso rápido
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}