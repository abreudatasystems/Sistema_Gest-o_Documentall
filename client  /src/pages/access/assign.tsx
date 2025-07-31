
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Search, Save } from "lucide-react";

export default function AssignAccess() {
  const availableUsers = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@escritorio.com",
      role: "Advogada",
      currentAccess: "Usuário"
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@escritorio.com",
      role: "Paralegal",
      currentAccess: "Somente Leitura"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Atribuir Acesso</h1>
          <p className="text-gray-600 mt-1">Conceda ou modifique permissões de acesso aos usuários</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Selecionar Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar usuários..."
                className="pl-10"
              />
            </div>

            <div className="space-y-3">
              {availableUsers.map((user) => (
                <div key={user.id} className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.role}</div>
                    </div>
                    <Badge variant="secondary">{user.currentAccess}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurar Permissões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accessLevel">Nível de Acesso</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador Total</SelectItem>
                  <SelectItem value="manager">Gerente de Área</SelectItem>
                  <SelectItem value="senior">Usuário Sênior</SelectItem>
                  <SelectItem value="user">Usuário Padrão</SelectItem>
                  <SelectItem value="readonly">Somente Leitura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Módulos Disponíveis</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="contracts-access" />
                  <Label htmlFor="contracts-access">Gestão de Contratos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="clients-access" />
                  <Label htmlFor="clients-access">Gestão de Clientes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="documents-access" />
                  <Label htmlFor="documents-access">Gestão Documental</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reports-access" />
                  <Label htmlFor="reports-access">Relatórios</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ai-access" />
                  <Label htmlFor="ai-access">Inteligência Artificial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="api-access" />
                  <Label htmlFor="api-access">Integrações API</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Ações Permitidas</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="create-permission" />
                  <Label htmlFor="create-permission">Criar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-permission" />
                  <Label htmlFor="edit-permission">Editar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="delete-permission" />
                  <Label htmlFor="delete-permission">Excluir</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="export-permission" />
                  <Label htmlFor="export-permission">Exportar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-permission" />
                  <Label htmlFor="share-permission">Compartilhar</Label>
                </div>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Permissões
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
