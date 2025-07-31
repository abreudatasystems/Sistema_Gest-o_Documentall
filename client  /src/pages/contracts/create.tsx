import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Bot, Save, Eye, Send, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

export default function CreateContract() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [contractData, setContractData] = useState({
    type: "",
    title: "",
    client: "",
    description: "",
    clauses: [] as string[],
    customClauses: "",
    aiSuggestions: true
  });

  const steps = [
    { id: 1, title: "Informações Básicas", description: "Defina o tipo e dados do contrato" },
    { id: 2, title: "Seleção de Cláusulas", description: "Escolha as cláusulas aplicáveis" },
    { id: 3, title: "Personalização", description: "Ajuste o conteúdo com IA" },
    { id: 4, title: "Revisão Final", description: "Revise antes de finalizar" }
  ];

  const contractTypes = [
    { value: "compra_venda", label: "Compra e Venda" },
    { value: "locacao", label: "Locação" },
    { value: "prestacao_servicos", label: "Prestação de Serviços" },
    { value: "trabalho", label: "Trabalho" },
    { value: "confidencialidade", label: "Confidencialidade (NDA)" },
    { value: "parceria", label: "Parceria Comercial" }
  ];

  const availableClauses = [
    { id: "objeto", title: "Objeto do Contrato", required: true },
    { id: "prazo", title: "Prazo e Vigência", required: true },
    { id: "valor", title: "Valor e Pagamento", required: true },
    { id: "rescisao", title: "Rescisão e Terminação", required: false },
    { id: "multa", title: "Multa e Penalidades", required: false },
    { id: "foro", title: "Foro e Jurisdição", required: true },
    { id: "confidencialidade", title: "Confidencialidade", required: false },
    { id: "propriedade", title: "Propriedade Intelectual", required: false },
    { id: "garantias", title: "Garantias e Responsabilidades", required: false },
    { id: "caso_fortuito", title: "Caso Fortuito e Força Maior", required: false }
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClauseToggle = (clauseId: string) => {
    setContractData(prev => ({
      ...prev,
      clauses: prev.clauses.includes(clauseId)
        ? prev.clauses.filter(id => id !== clauseId)
        : [...prev.clauses, clauseId]
    }));
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("createContract")}</h1>
          <p className="text-gray-600 mt-1">Crie um novo contrato com assistência de IA</p>
        </div>
        <Badge variant="outline" className="text-blue-600">
          <Bot className="w-4 h-4 mr-1" />
          IA Ativada
        </Badge>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Passo {currentStep} de {steps.length}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                getStepStatus(step.id) === "completed" 
                  ? "bg-green-600 text-white" 
                  : getStepStatus(step.id) === "current"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}>
                {getStepStatus(step.id) === "completed" ? <CheckCircle className="w-4 h-4" /> : step.id}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contractType">Tipo de Contrato</Label>
                  <Select value={contractData.type} onValueChange={(value) => setContractData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {contractTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="client">Cliente</Label>
                  <Input
                    id="client"
                    placeholder="Nome do cliente"
                    value={contractData.client}
                    onChange={(e) => setContractData(prev => ({ ...prev, client: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Título do Contrato</Label>
                <Input
                  id="title"
                  placeholder="Ex: Contrato de Prestação de Serviços Jurídicos"
                  value={contractData.title}
                  onChange={(e) => setContractData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o objetivo e escopo do contrato"
                  value={contractData.description}
                  onChange={(e) => setContractData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Cláusulas Disponíveis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableClauses.map((clause) => (
                    <div key={clause.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={clause.id}
                        checked={contractData.clauses.includes(clause.id)}
                        onChange={() => handleClauseToggle(clause.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={clause.id} className="flex-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{clause.title}</span>
                          {clause.required && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              Obrigatória
                            </Badge>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="customClauses">Cláusulas Personalizadas</Label>
                <Textarea
                  id="customClauses"
                  placeholder="Adicione cláusulas específicas para este contrato"
                  value={contractData.customClauses}
                  onChange={(e) => setContractData(prev => ({ ...prev, customClauses: e.target.value }))}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Bot className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-medium text-blue-900">Assistência de IA</h3>
                </div>
                <p className="text-blue-700 mb-4">
                  Nossa IA analisará seu contrato e fornecerá sugestões personalizadas baseadas nas melhores práticas jurídicas.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Bot className="w-4 h-4 mr-2" />
                  Gerar Sugestões
                </Button>
              </div>

              <Tabs defaultValue="suggestions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
                  <TabsTrigger value="preview">Visualizar</TabsTrigger>
                  <TabsTrigger value="edit">Editar</TabsTrigger>
                </TabsList>
                
                <TabsContent value="suggestions" className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Sugestão para Cláusula de Rescisão</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Recomendamos incluir uma cláusula de rescisão antecipada com prazo de 30 dias para ambas as partes.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Aceitar</Button>
                        <Button size="sm" variant="ghost">Rejeitar</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Sugestão para Pagamento</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Considere incluir juros de mora e multa por atraso no pagamento de acordo com o Código Civil.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Aceitar</Button>
                        <Button size="sm" variant="ghost">Rejeitar</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preview">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-4">Pré-visualização do Contrato</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>CONTRATO DE {contractData.type?.toUpperCase()}</strong></p>
                      <p><strong>Título:</strong> {contractData.title}</p>
                      <p><strong>Cliente:</strong> {contractData.client}</p>
                      <p><strong>Descrição:</strong> {contractData.description}</p>
                      <p><strong>Cláusulas selecionadas:</strong> {contractData.clauses.length}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="edit">
                  <div>
                    <Label htmlFor="contractContent">Conteúdo do Contrato</Label>
                    <Textarea
                      id="contractContent"
                      placeholder="Edite o conteúdo do contrato aqui..."
                      rows={10}
                      className="mt-2"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-medium text-green-900">Contrato Pronto</h3>
                </div>
                <p className="text-green-700">
                  Seu contrato foi criado com sucesso! Revise as informações abaixo antes de finalizar.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-4">Resumo do Contrato</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Tipo:</strong> {contractData.type}</p>
                    <p><strong>Cliente:</strong> {contractData.client}</p>
                    <p><strong>Título:</strong> {contractData.title}</p>
                  </div>
                  <div>
                    <p><strong>Cláusulas:</strong> {contractData.clauses.length} selecionadas</p>
                    <p><strong>Status:</strong> <Badge variant="outline" className="text-green-600">Pronto para envio</Badge></p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Contrato
                </Button>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar para Cliente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length}
        >
          Próximo
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}