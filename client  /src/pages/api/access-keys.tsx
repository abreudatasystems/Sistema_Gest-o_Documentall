
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Plus, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AccessKeys() {
  const [keys, setKeys] = useState([
    {
      id: 1,
      name: "Integração Mobile App",
      key: "sk_live_abc123def456ghi789",
      status: "Ativa",
      permissions: ["read", "write"],
      created: "15/01/2024",
      lastUsed: "02/02/2024"
    },
    {
      id: 2,
      name: "Sistema CRM",
      key: "sk_live_xyz789abc123def456",
      status: "Inativa",
      permissions: ["read"],
      created: "10/01/2024",
      lastUsed: "25/01/2024"
    }
  ]);

  const [showKey, setShowKey] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const { toast } = useToast();

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Chave copiada",
      description: "A chave foi copiada para a área de transferência."
    });
  };

  const handleCreateKey = () => {
    const newKey = {
      id: keys.length + 1,
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substr(2, 20)}`,
      status: "Ativa",
      permissions: ["read", "write"],
      created: new Date().toLocaleDateString("pt-BR"),
      lastUsed: "-"
    };
    
    setKeys([...keys, newKey]);
    setNewKeyName("");
    setIsDialogOpen(false);
    
    toast({
      title: "Chave criada",
      description: "Nova chave de acesso foi criada com sucesso."
    });
  };

  const handleDeleteKey = (id: number) => {
    setKeys(keys.filter(key => key.id !== id));
    toast({
      title: "Chave removida",
      description: "A chave de acesso foi removida."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chaves de Acesso</h1>
          <p className="text-muted-foreground">
            Gerencie as chaves de API para integração com sistemas externos
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Chave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Chave de Acesso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="keyName">Nome da Chave</Label>
                <Input
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Ex: Integração Mobile App"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateKey} disabled={!newKeyName}>
                  Criar Chave
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chaves de API Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Chave</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissões</TableHead>
                <TableHead>Criada em</TableHead>
                <TableHead>Último uso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell className="font-mono">
                    <div className="flex items-center space-x-2">
                      <span>
                        {showKey === key.id 
                          ? key.key 
                          : key.key.slice(0, 8) + "..." + key.key.slice(-4)
                        }
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                      >
                        {showKey === key.id ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyKey(key.key)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={key.status === "Ativa" ? "default" : "secondary"}>
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {key.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                      {key.created}
                    </div>
                  </TableCell>
                  <TableCell>{key.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
