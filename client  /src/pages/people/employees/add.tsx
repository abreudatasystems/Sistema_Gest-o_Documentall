
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, ArrowLeft } from "lucide-react";

export default function AddEmployee() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Funcionário</h1>
            <p className="text-gray-600 mt-1">Preencha as informações do funcionário</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar Funcionário
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input id="name" placeholder="Digite o nome completo" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input id="cpf" placeholder="000.000.000-00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input id="rg" placeholder="00.000.000-0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input id="birthDate" type="date" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail Corporativo *</Label>
              <Input id="email" type="email" placeholder="funcionario@escritorio.com" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency">Contato de Emergência</Label>
                <Input id="emergency" placeholder="(11) 99999-9999" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea id="address" placeholder="Endereço completo" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Profissionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="position">Cargo *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="senior-lawyer">Advogado Sênior</SelectItem>
                  <SelectItem value="junior-lawyer">Advogado Júnior</SelectItem>
                  <SelectItem value="paralegal">Paralegal</SelectItem>
                  <SelectItem value="secretary">Secretária</SelectItem>
                  <SelectItem value="intern">Estagiário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Direito Civil</SelectItem>
                  <SelectItem value="criminal">Direito Criminal</SelectItem>
                  <SelectItem value="labor">Direito Trabalhista</SelectItem>
                  <SelectItem value="corporate">Direito Empresarial</SelectItem>
                  <SelectItem value="family">Direito de Família</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hireDate">Data de Contratação *</Label>
                <Input id="hireDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salário</Label>
                <Input id="salary" placeholder="R$ 0,00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="oabNumber">Número da OAB</Label>
              <Input id="oabNumber" placeholder="000000/UF" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissões de Acesso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessLevel">Nível de Acesso</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="readonly">Somente Leitura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Módulos Disponíveis</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="contracts" />
                  <Label htmlFor="contracts">Gestão de Contratos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="clients" />
                  <Label htmlFor="clients">Gestão de Clientes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="documents" />
                  <Label htmlFor="documents">Gestão Documental</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reports" />
                  <Label htmlFor="reports">Relatórios</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ai" />
                  <Label htmlFor="ai">Inteligência Artificial</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
