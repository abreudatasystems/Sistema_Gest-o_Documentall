
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Share, Eye, Download, Users, Calendar, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SharedDocuments() {
  const [searchTerm, setSearchTerm] = useState("");

  const sharedDocuments = [
    {
      id: 1,
      name: "Contrato de Prestação de Serviços.pdf",
      type: "Contrato",
      sharedWith: [
        { name: "João Silva", email: "joao@empresa.com", avatar: "" },
        { name: "Maria Santos", email: "maria@cliente.com", avatar: "" }
      ],
      sharedBy: "Carlos Admin",
      sharedDate: "15/01/2024",
      permissions: "Visualizar",
      status: "Ativo",
      lastAccessed: "02/02/2024"
    },
    {
      id: 2,
      name: "NDA - Acordo de Confidencialidade.docx",
      type: "NDA",
      sharedWith: [
        { name: "Ana Costa", email: "ana@startup.com", avatar: "" }
      ],
      sharedBy: "Maria Admin",
      sharedDate: "20/01/2024",
      permissions: "Editar",
      status: "Pendente",
      lastAccessed: "-"
    },
    {
      id: 3,
      name: "Relatório de Compliance Q1.pdf",
      type: "Relatório",
      sharedWith: [
        { name: "Pedro Oliveira", email: "pedro@auditoria.com", avatar: "" },
        { name: "Lucia Fernandes", email: "lucia@compliance.com", avatar: "" },
        { name: "Roberto Lima", email: "roberto@juridico.com", avatar: "" }
      ],
      sharedBy: "Ana Admin",
      sharedDate: "25/01/2024",
      permissions: "Visualizar",
      status: "Expirado",
      lastAccessed: "30/01/2024"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case "Pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "Expirado":
        return <Badge className="bg-red-100 text-red-800">Expirado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPermissionsBadge = (permissions: string) => {
    return (
      <Badge variant={permissions === "Editar" ? "default" : "outline"}>
        {permissions}
      </Badge>
    );
  };

  const filteredDocuments = sharedDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.sharedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documentos Compartilhados</h1>
          <p className="text-muted-foreground">
            Gerencie documentos compartilhados com clientes e parceiros
          </p>
        </div>
        
        <Button>
          <Share className="w-4 h-4 mr-2" />
          Compartilhar Documento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documentos Ativos</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
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
                <TableHead>Documento</TableHead>
                <TableHead>Compartilhado com</TableHead>
                <TableHead>Compartilhado por</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Permissões</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">{doc.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        {doc.sharedWith.slice(0, 3).map((person, idx) => (
                          <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                            <AvatarImage src={person.avatar} />
                            <AvatarFallback className="text-xs">
                              {person.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {doc.sharedWith.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                            +{doc.sharedWith.length - 3}
                          </div>
                        )}
                      </div>
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{doc.sharedWith.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>{doc.sharedBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                      {doc.sharedDate}
                    </div>
                  </TableCell>
                  <TableCell>{getPermissionsBadge(doc.permissions)}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>{doc.lastAccessed}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4" />
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
