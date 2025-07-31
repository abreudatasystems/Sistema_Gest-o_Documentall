
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
import { BarChart3, Download, TrendingUp, FileText, Calendar } from "lucide-react";

export default function MostUsedClauses() {
  const clausesData = [
    {
      id: 1,
      clause: "Cláusula de Confidencialidade",
      category: "Empresarial",
      usage: 89,
      contracts: 156,
      lastUsed: "2024-01-20"
    },
    {
      id: 2,
      clause: "Cláusula de Rescisão",
      category: "Trabalhista",
      usage: 76,
      contracts: 134,
      lastUsed: "2024-01-19"
    },
    {
      id: 3,
      clause: "Cláusula de Pagamento",
      category: "Civil",
      usage: 68,
      contracts: 120,
      lastUsed: "2024-01-18"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cláusulas Mais Utilizadas</h1>
          <p className="text-gray-600 mt-1">Análise de uso das cláusulas contratuais</p>
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
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Cláusulas</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mais Utilizadas</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taxa de Uso</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Personalizadas</p>
                <p className="text-2xl font-bold text-gray-900">43</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ranking de Cláusulas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Cláusula</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Taxa de Uso</TableHead>
                <TableHead>Contratos</TableHead>
                <TableHead>Último Uso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clausesData.map((clause, index) => (
                <TableRow key={clause.id}>
                  <TableCell className="font-bold">{index + 1}</TableCell>
                  <TableCell>
                    <div className="font-medium">{clause.clause}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{clause.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={clause.usage} className="w-20" />
                      <span className="text-sm font-medium">{clause.usage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{clause.contracts}</TableCell>
                  <TableCell>{clause.lastUsed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Uso por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Empresarial</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Trabalhista</span>
                <span className="font-medium">28%</span>
              </div>
              <Progress value={28} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Civil</span>
                <span className="font-medium">27%</span>
              </div>
              <Progress value={27} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendência de Uso (Últimos 6 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Janeiro</span>
                <div className="flex items-center space-x-2">
                  <Progress value={65} className="w-20" />
                  <span className="text-sm">156</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dezembro</span>
                <div className="flex items-center space-x-2">
                  <Progress value={58} className="w-20" />
                  <span className="text-sm">142</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Novembro</span>
                <div className="flex items-center space-x-2">
                  <Progress value={62} className="w-20" />
                  <span className="text-sm">148</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
