
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Download, ExternalLink, Book, Zap, Shield, Globe } from "lucide-react";

export default function APIDocumentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      method: "GET",
      path: "/api/contracts",
      description: "Lista todos os contratos",
      params: ["page", "limit", "status"]
    },
    {
      method: "POST",
      path: "/api/contracts",
      description: "Cria um novo contrato",
      params: ["title", "client_id", "template_id"]
    },
    {
      method: "GET",
      path: "/api/contracts/{id}",
      description: "Obtém detalhes de um contrato específico",
      params: ["id"]
    },
    {
      method: "PUT",
      path: "/api/contracts/{id}",
      description: "Atualiza um contrato existente",
      params: ["id", "title", "status"]
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method: string) => {
    const colors = {
      "GET": "bg-green-100 text-green-800",
      "POST": "bg-blue-100 text-blue-800",
      "PUT": "bg-yellow-100 text-yellow-800",
      "DELETE": "bg-red-100 text-red-800"
    };
    return colors[method as keyof typeof colors] || colors["GET"];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentação da API</h1>
          <p className="text-gray-600 mt-1">Guia completo para integração com nossa plataforma</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button>
            <ExternalLink className="w-4 h-4 mr-2" />
            Playground
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Endpoints</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <Code className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Versão Atual</p>
                <p className="text-2xl font-bold text-gray-900">v2.1</p>
              </div>
              <Book className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rate Limit</p>
                <p className="text-2xl font-bold text-gray-900">1000/h</p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="authentication">Autenticação</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Exemplos</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introdução</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nossa API REST permite integração completa com a plataforma de gestão de contratos.
                Você pode criar, ler, atualizar e deletar contratos, além de acessar funcionalidades
                avançadas como geração automática e análise por IA.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Base URL</h4>
                <code className="text-blue-800">https://api.contratosgpt.com/v2</code>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Formato de Resposta
                  </h4>
                  <p className="text-sm">Todas as respostas são em formato JSON</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Autenticação
                  </h4>
                  <p className="text-sm">API Key via header Authorization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Todas as requisições para a API devem incluir uma chave de API válida no header Authorization.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <pre className="text-sm">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.contratosgpt.com/v2/contracts`}
                </pre>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Importante</h4>
                <p className="text-yellow-800">
                  Mantenha sua API Key segura e nunca a compartilhe publicamente.
                  Use variáveis de ambiente em aplicações cliente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <code className="font-mono text-sm">{endpoint.path}</code>
                      </div>
                      <Button variant="outline" size="sm">
                        Testar
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-2">{endpoint.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Parâmetros:</span>
                      {endpoint.params.map((param) => (
                        <Badge key={param} variant="outline" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Criar um novo contrato</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`curl -X POST https://api.contratosgpt.com/v2/contracts`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre className="text-sm">
{`curl -X POST https://api.contratosgpt.com/v2/contracts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Contrato de Prestação de Serviços",
    "client_id": "123",
    "template_id": "service_template",
    "value": 50000.00
  }'`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Resposta de sucesso</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
{`{
  "id": "contract_abc123",
  "title": "Contrato de Prestação de Serviços",
  "status": "draft",
  "created_at": "2024-01-20T10:00:00Z",
  "client": {
    "id": "123",
    "name": "Empresa ABC Ltda"
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SDKs Oficiais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">JavaScript/TypeScript</h4>
                  <p className="text-sm text-gray-600 mb-4">SDK oficial para Node.js e navegadores</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>npm install @contratosgpt/sdk</code>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Python</h4>
                  <p className="text-sm text-gray-600 mb-4">SDK para aplicações Python</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>pip install contratosgpt</code>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">PHP</h4>
                  <p className="text-sm text-gray-600 mb-4">SDK para aplicações PHP</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>composer require contratosgpt/sdk</code>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">C#/.NET</h4>
                  <p className="text-sm text-gray-600 mb-4">SDK para aplicações .NET</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>dotnet add package ContratosGPT.SDK</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
