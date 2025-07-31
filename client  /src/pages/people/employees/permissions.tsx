
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Shield, User, Settings, Save } from "lucide-react";

export default function AccessPermissions() {
  const employees = [
    {
      id: 1,
      name: "Ana Costa",
      position: "Advogada Senior",
      accessLevel: "Admin",
      permissions: {
        contracts: true,
        clients: true,
        documents: true,
        reports: true,
        ai: true,
        settings: true
      }
    },
    {
      id: 2,
      name: "Carlos Oliveira",
      position: "Advogado Junior",
      accessLevel: "Usuário",
      permissions: {
        contracts: true,
        clients: true,
        documents: false,
        reports: false,
        ai: true,
        settings: false
      }
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permissões de Acesso</h1>
          <p className="text-gray-600 mt-1">Gerencie as permissões dos funcionários no sistema</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Administradores</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendente Configuração</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Matriz de Permissões</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Contratos</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead>Relatórios</TableHead>
                <TableHead>IA</TableHead>
                <TableHead>Configurações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.position}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.accessLevel === 'Admin' ? 'default' : 'secondary'}>
                      {employee.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={employee.permissions.contracts} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={employee.permissions.clients} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={employee.permissions.documents} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={employee.permissions.reports} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={employee.permissions.ai} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={employee.permissions.settings} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuração de Módulos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Módulos Principais</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="global-contracts">Gestão de Contratos</Label>
                  <Switch id="global-contracts" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="global-clients">Gestão de Clientes</Label>
                  <Switch id="global-clients" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="global-documents">Gestão Documental</Label>
                  <Switch id="global-documents" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Módulos Avançados</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="global-ai">Inteligência Artificial</Label>
                  <Switch id="global-ai" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="global-reports">Relatórios Avançados</Label>
                  <Switch id="global-reports" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="global-api">Integrações API</Label>
                  <Switch id="global-api" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
