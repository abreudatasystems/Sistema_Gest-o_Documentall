
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, Filter, Archive } from "lucide-react";

export default function ExportReports() {
  const exportHistory = [
    {
      id: 1,
      report: "Relatório de Contratos",
      format: "PDF",
      date: "2024-01-20 10:30",
      size: "2.3 MB",
      status: "Concluído"
    },
    {
      id: 2,
      report: "Uso da Plataforma",
      format: "Excel",
      date: "2024-01-19 15:45",
      size: "1.8 MB",
      status: "Concluído"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exportar Relatórios</h1>
          <p className="text-gray-600 mt-1">Configure e exporte relatórios personalizados</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Archive className="w-4 h-4 mr-2" />
          Histórico
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurar Exportação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Selecionar Relatórios</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="contracts-report" />
                  <Label htmlFor="contracts-report">Relatório de Contratos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="clients-report" />
                  <Label htmlFor="clients-report">Relatório de Clientes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="usage-report" />
                  <Label htmlFor="usage-report">Uso da Plataforma</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="clauses-report" />
                  <Label htmlFor="clauses-report">Cláusulas Mais Utilizadas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="access-report" />
                  <Label htmlFor="access-report">Logs de Acesso</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Formato de Exportação</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Período</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Últimos 7 dias</SelectItem>
                  <SelectItem value="last-30-days">Últimos 30 dias</SelectItem>
                  <SelectItem value="last-3-months">Últimos 3 meses</SelectItem>
                  <SelectItem value="last-6-months">Últimos 6 meses</SelectItem>
                  <SelectItem value="last-year">Último ano</SelectItem>
                  <SelectItem value="custom">Período personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Opções Avançadas</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-charts" />
                  <Label htmlFor="include-charts">Incluir gráficos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-summary" />
                  <Label htmlFor="include-summary">Incluir resumo executivo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="detailed-data" />
                  <Label htmlFor="detailed-data">Dados detalhados</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compress-file" />
                  <Label htmlFor="compress-file">Compactar arquivo</Label>
                </div>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatórios
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Exportações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exportHistory.map((export_item) => (
                <div key={export_item.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{export_item.report}</div>
                      <div className="text-sm text-gray-500">{export_item.date}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{export_item.format}</Badge>
                      <div className="text-sm text-gray-500 mt-1">{export_item.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="default">{export_item.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Programados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum relatório programado</h3>
            <p className="text-gray-600 mb-4">Configure exportações automáticas para receber relatórios periodicamente</p>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Programar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
