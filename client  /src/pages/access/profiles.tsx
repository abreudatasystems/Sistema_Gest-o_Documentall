import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Shield, Users, Edit, Trash2, Plus, MoreHorizontal, Key, Lock, Eye, Settings } from "lucide-react";

export default function ProfilesPermissions() {
  const { t } = useLanguage();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const profiles = [
    {
      id: 1,
      name: "Administrador",
      description: "Acesso total ao sistema",
      users: 2,
      permissions: {
        contracts: { read: true, write: true, delete: true },
        clients: { read: true, write: true, delete: true },
        documents: { read: true, write: true, delete: true },
        reports: { read: true, write: true, delete: true },
        settings: { read: true, write: true, delete: true },
        users: { read: true, write: true, delete: true },
      },
      color: "bg-red-100 text-red-800",
      level: "total"
    },
    {
      id: 2,
      name: "Advogado Sênior",
      description: "Acesso avançado a contratos e documentos",
      users: 5,
      permissions: {
        contracts: { read: true, write: true, delete: true },
        clients: { read: true, write: true, delete: false },
        documents: { read: true, write: true, delete: true },
        reports: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        users: { read: true, write: false, delete: false },
      },
      color: "bg-blue-100 text-blue-800",
      level: "advanced"
    },
    {
      id: 3,
      name: "Advogado Júnior",
      description: "Acesso básico a contratos e visualização",
      users: 8,
      permissions: {
        contracts: { read: true, write: true, delete: false },
        clients: { read: true, write: false, delete: false },
        documents: { read: true, write: true, delete: false },
        reports: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        users: { read: false, write: false, delete: false },
      },
      color: "bg-green-100 text-green-800",
      level: "basic"
    },
    {
      id: 4,
      name: "Secretário",
      description: "Acesso limitado para suporte administrativo",
      users: 3,
      permissions: {
        contracts: { read: true, write: false, delete: false },
        clients: { read: true, write: true, delete: false },
        documents: { read: true, write: false, delete: false },
        reports: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        users: { read: false, write: false, delete: false },
      },
      color: "bg-yellow-100 text-yellow-800",
      level: "limited"
    },
    {
      id: 5,
      name: "Cliente",
      description: "Acesso apenas aos próprios documentos",
      users: 25,
      permissions: {
        contracts: { read: true, write: false, delete: false },
        clients: { read: false, write: false, delete: false },
        documents: { read: true, write: false, delete: false },
        reports: { read: false, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        users: { read: false, write: false, delete: false },
      },
      color: "bg-gray-100 text-gray-800",
      level: "read_only"
    }
  ];

  const [newProfile, setNewProfile] = useState({
    name: "",
    description: "",
    permissions: {
      contracts: { read: false, write: false, delete: false },
      clients: { read: false, write: false, delete: false },
      documents: { read: false, write: false, delete: false },
      reports: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
      users: { read: false, write: false, delete: false },
    }
  });

  const permissionModules = [
    { key: "contracts", label: "Contratos", icon: Shield },
    { key: "clients", label: "Clientes", icon: Users },
    { key: "documents", label: "Documentos", icon: Eye },
    { key: "reports", label: "Relatórios", icon: Eye },
    { key: "settings", label: "Configurações", icon: Settings },
    { key: "users", label: "Usuários", icon: Users },
  ];

  const handlePermissionChange = (module: string, permission: string, value: boolean) => {
    setNewProfile(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [permission]: value
        }
      }
    }));
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "total": return <Badge className="bg-red-100 text-red-800">Total</Badge>;
      case "advanced": return <Badge className="bg-blue-100 text-blue-800">Avançado</Badge>;
      case "basic": return <Badge className="bg-green-100 text-green-800">Básico</Badge>;
      case "limited": return <Badge className="bg-yellow-100 text-yellow-800">Limitado</Badge>;
      case "read_only": return <Badge className="bg-gray-100 text-gray-800">Somente Leitura</Badge>;
      default: return <Badge variant="outline">Personalizado</Badge>;
    }
  };

  const getPermissionIcon = (has: boolean) => {
    return has ? (
      <span className="text-green-600">✓</span>
    ) : (
      <span className="text-red-600">✗</span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("profilesPermissions")}</h1>
          <p className="text-gray-600 mt-1">Gerencie perfis e permissões de acesso</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Perfil
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Perfil</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Perfil</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Advogado Pleno"
                    value={newProfile.name}
                    onChange={(e) => setNewProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    placeholder="Descrição do perfil"
                    value={newProfile.description}
                    onChange={(e) => setNewProfile(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Permissões</h3>
                <div className="space-y-4">
                  {permissionModules.map((module) => (
                    <Card key={module.key}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-base">
                          <module.icon className="w-4 h-4 mr-2" />
                          {module.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`${module.key}-read`}
                              checked={newProfile.permissions[module.key]?.read}
                              onCheckedChange={(checked) => handlePermissionChange(module.key, 'read', checked)}
                            />
                            <Label htmlFor={`${module.key}-read`}>Visualizar</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`${module.key}-write`}
                              checked={newProfile.permissions[module.key]?.write}
                              onCheckedChange={(checked) => handlePermissionChange(module.key, 'write', checked)}
                            />
                            <Label htmlFor={`${module.key}-write`}>Editar</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`${module.key}-delete`}
                              checked={newProfile.permissions[module.key]?.delete}
                              onCheckedChange={(checked) => handlePermissionChange(module.key, 'delete', checked)}
                            />
                            <Label htmlFor={`${module.key}-delete`}>Excluir</Label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsCreateDialogOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Criar Perfil
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Perfis</p>
                <p className="text-2xl font-bold">{profiles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold">{profiles.reduce((sum, p) => sum + p.users, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Key className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Permissões</p>
                <p className="text-2xl font-bold">{permissionModules.length * 3}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Lock className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Perfis Bloqueados</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profiles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Perfis de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Usuários</TableHead>
                <TableHead>Permissões</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.description}</TableCell>
                  <TableCell>{getLevelBadge(profile.level)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{profile.users} usuários</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProfile(profile)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="w-4 h-4 mr-2" />
                          Gerenciar Usuários
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
        </CardContent>
      </Card>

      {/* Permission Details Dialog */}
      {selectedProfile && (
        <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Perfil: {selectedProfile.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <p className="text-sm text-gray-600">{selectedProfile.name}</p>
                </div>
                <div>
                  <Label>Descrição</Label>
                  <p className="text-sm text-gray-600">{selectedProfile.description}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Permissões Detalhadas</h3>
                <div className="space-y-4">
                  {permissionModules.map((module) => (
                    <Card key={module.key}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-base">
                          <module.icon className="w-4 h-4 mr-2" />
                          {module.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Visualizar</span>
                            {getPermissionIcon(selectedProfile.permissions[module.key]?.read)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Editar</span>
                            {getPermissionIcon(selectedProfile.permissions[module.key]?.write)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Excluir</span>
                            {getPermissionIcon(selectedProfile.permissions[module.key]?.delete)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={() => setSelectedProfile(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Fechar
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}