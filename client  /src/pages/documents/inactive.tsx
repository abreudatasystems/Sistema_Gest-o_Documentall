
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Archive, Trash2, RefreshCw, Download, FileText, Calendar, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function InactiveFiles() {
  const [searchTerm, setSearchTerm] = useState("");

  const inactiveFiles = [
    {
      id: 1,
      name: "Contrato Antigo - Cliente XYZ.pdf",
      type: "Contrato",
      size: "2.4 MB",
      owner: "Carlos Admin",
      archivedDate: "15/12/2023",
      lastModified: "10/10/2023",
      reason: "Contrato expirado",
      status: "Arquivado"
    },
    {
      id: 2,
      name: "Proposta Comercial - Projeto ABC.docx",
      type: "Proposta",
      size: "1.8 MB",
      owner: "Maria Santos",
      archivedDate: "20/11/2023",
      lastModified: "15/09/2023",
      reason: "Projeto cancelado",
      status: "Arquivado"
    },
    {
      id: 3,
      name: "NDA - Empresa Descontinuada.pdf",
      type: "NDA",
      size: "856 KB",
      owner: "João Silva",
      archivedDate: "05/01/2024",
      lastModified: "20/12/2023",
      reason: "Empresa fechada",
      status: "Deletado"
    },
    {
      id: 4,
      name: "Relatório Trimestral Q2-2023.xlsx",
      type: "Relatório",
      size: "5.2 MB",
      owner: "Ana Costa",
      archivedDate: "30/12/2023",
      lastModified: "30/06/2023",
      reason: "Arquivo antigo",
      status: "Arquivado"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Arquivado":
        return <Badge className="bg-gray-100 text-gray-800">Arquivado</Badge>;
      case "Deletado":
        return <Badge className="bg-red-100 text-red-800">Deletado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const filteredFiles = inactiveFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Arquivos Inativos</h1>
          <p className="text-muted-foreground">
            Gerencie documentos arquivados e removidos do sistema
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Arquivar Selecionados
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-800">
            <Trash2 className="w-4 h-4 mr-2" />
            Deletar Permanentemente
          </Button>
        </div>
      </div>

      <Alert>
        <Archive className="h-4 w-4" />
        <AlertDescription>
          Arquivos inativos são mantidos por 90 dias antes da exclusão permanente. 
          Você pode restaurar ou fazer download dos arquivos durante este período.
        </AlertDescription>
      </Alert>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Arquivados</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Archive className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deletados</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Espaço Liberado</p>
                <p className="text-2xl font-bold">10.2 MB</p>
              </div>
              <RefreshCw className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Arquivos Inativos</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar arquivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Arquivo</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Arquivado em</TableHead>
                <TableHead>Última Modificação</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-muted-foreground">{file.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-muted-foreground" />
                      {file.owner}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {file.size}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                      {file.archivedDate}
                    </div>
                  </TableCell>
                  <TableCell>{file.lastModified}</TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {file.reason}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(file.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {file.status === "Arquivado" && (
                        <>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
