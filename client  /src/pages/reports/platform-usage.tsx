
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Activity, Users, Clock, Calendar, Download, BarChart3 } from "lucide-react";

export default function PlatformUsage() {
  const usageData = [
    {
      user: "Ana Costa",
      role: "Advogada Senior",
      logins: 23,
      timeSpent: "47h 32m",
      documents: 89,
      lastAccess: "2024-01-20 15:30"
    },
    {
      user: "Carlos Oliveira",
      role: "Advogado Junior",
      logins: 18,
      timeSpent: "32h 15m",
      documents: 45,
      lastAccess: "2024-01-20 14:22"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Uso da Plataforma</h1>
          <p className="text-gray-600 mt-1">Análise de atividades e engajamento dos usuários</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Período
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sessões Hoje</p>
                <p className="text-2xl font-bold text-gray-900">67</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-gray-900">2h 15m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Engajamento</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atividade por Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Logins (mês)</TableHead>
                <TableHead>Tempo Online</TableHead>
                <TableHead>Documentos</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.user}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.logins}</TableCell>
                  <TableCell>{user.timeSpent}</TableCell>
                  <TableCell>{user.documents}</TableCell>
                  <TableCell>{user.lastAccess}</TableCell>
                  <TableCell>
                    <Badge variant="default">Online</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Módulos Mais Utilizados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Gestão de Contratos</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Gestão Documental</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Relatórios</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>IA</span>
                <span className="font-medium">32%</span>
              </div>
              <Progress value={32} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Picos de Uso (Horários)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>09:00 - 11:00</span>
                <div className="flex items-center space-x-2">
                  <Progress value={85} className="w-20" />
                  <span className="text-sm">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>14:00 - 16:00</span>
                <div className="flex items-center space-x-2">
                  <Progress value={72} className="w-20" />
                  <span className="text-sm">72%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>16:00 - 18:00</span>
                <div className="flex items-center space-x-2">
                  <Progress value={58} className="w-20" />
                  <span className="text-sm">58%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>11:00 - 14:00</span>
                <div className="flex items-center space-x-2">
                  <Progress value={42} className="w-20" />
                  <span className="text-sm">42%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
