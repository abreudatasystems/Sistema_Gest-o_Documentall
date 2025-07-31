import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Key,
  Globe,
  Settings as SettingsIcon,
  Save,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Building2,
  FileText
} from "lucide-react";

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: "João Silva",
      email: "joao.silva@sgd.com",
      phone: "+55 11 99999-9999",
      department: "Jurídico",
      role: "Advogado Sênior",
      avatar: ""
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      contractExpiry: true,
      documentSharing: true,
      systemUpdates: false,
      marketingEmails: false,
      frequency: "immediate"
    },
    security: {
      twoFactor: true,
      sessionTimeout: "60",
      passwordExpiry: "90",
      loginNotifications: true,
      deviceTracking: true
    },
    appearance: {
      theme: "light",
      language: language,
      timezone: "America/Sao_Paulo",
      dateFormat: "dd/MM/yyyy",
      compactView: false
    },
    system: {
      autoBackup: true,
      backupFrequency: "daily",
      storageLimit: "10GB",
      apiAccess: true,
      debugMode: false,
      maintainanceMode: false
    }
  });

  const handleSave = (section: string) => {
    toast({
      title: "Configurações salvas",
      description: `As configurações de ${section} foram salvas com sucesso.`
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as any);
    setSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, language: newLanguage }
    }));
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'sgd-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Configurações exportadas",
      description: "Suas configurações foram exportadas com sucesso."
    });
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast({
            title: "Configurações importadas",
            description: "Suas configurações foram importadas com sucesso."
          });
        } catch (error) {
          toast({
            title: "Erro na importação",
            description: "Arquivo de configurações inválido.",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie suas preferências e configurações do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImportSettings}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações do Perfil
              </CardTitle>
              <CardDescription>
                Configure suas informações pessoais e profissionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, name: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.profile.phone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, phone: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Select value={settings.profile.department} onValueChange={(value) => 
                    setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, department: value }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jurídico">Jurídico</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="TI">TI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Input
                    id="role"
                    value={settings.profile.role}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      profile: { ...prev.profile, role: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("perfil")}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Perfil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>
                Controle como e quando receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por email</h4>
                    <p className="text-sm text-gray-600">Receba notificações por email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailNotifications: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações push</h4>
                    <p className="text-sm text-gray-600">Receba notificações no navegador</p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, pushNotifications: checked }
                    }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Vencimento de contratos</h4>
                    <p className="text-sm text-gray-600">Avisos sobre contratos próximos do vencimento</p>
                  </div>
                  <Switch
                    checked={settings.notifications.contractExpiry}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, contractExpiry: checked }
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Compartilhamento de documentos</h4>
                    <p className="text-sm text-gray-600">Notificações sobre documentos compartilhados</p>
                  </div>
                  <Switch
                    checked={settings.notifications.documentSharing}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, documentSharing: checked }
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Frequência de notificações</Label>
                  <Select value={settings.notifications.frequency} onValueChange={(value) => 
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, frequency: value }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Imediata</SelectItem>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diária</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => handleSave("notificações")}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Notificações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>
                Gerencie a segurança da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Autenticação de dois fatores</h4>
                    <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.security.twoFactor}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, twoFactor: checked }
                      }))}
                    />
                    <Badge variant={settings.security.twoFactor ? "default" : "secondary"}>
                      {settings.security.twoFactor ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Timeout de sessão (minutos)</Label>
                  <Select value={settings.security.sessionTimeout} onValueChange={(value) => 
                    setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: value }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                      <SelectItem value="480">8 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Expiração de senha (dias)</Label>
                  <Select value={settings.security.passwordExpiry} onValueChange={(value) => 
                    setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordExpiry: value }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="60">60 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="180">180 dias</SelectItem>
                      <SelectItem value="365">1 ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Alterar senha</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nova senha"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button variant="outline">
                      <Key className="w-4 h-4 mr-2" />
                      Alterar
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("segurança")}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Segurança
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Configurações de Aparência
              </CardTitle>
              <CardDescription>
                Personalize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <Select value={settings.appearance.theme} onValueChange={(value) => 
                    setSettings(prev => ({
                      ...prev,
                      appearance: { ...prev.appearance, theme: value }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select value={settings.appearance.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fuso horário</Label>
                  <Select value={settings.appearance.timezone} onValueChange={(value) => 
                    setSettings(prev => ({
                      ...prev,
                      appearance: { ...prev.appearance, timezone: value }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                      <SelectItem value="America/New_York">Nova York (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">Londres (UTC+0)</SelectItem>
                      <SelectItem value="Europe/Madrid">Madrid (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Formato de data</Label>
                  <Select value={settings.appearance.dateFormat} onValueChange={(value) => 
                    setSettings(prev => ({
                      ...prev,
                      appearance: { ...prev.appearance, dateFormat: value }
                    }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/MM/yyyy">DD/MM/AAAA</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/AAAA</SelectItem>
                      <SelectItem value="yyyy-MM-dd">AAAA-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Visualização compacta</h4>
                    <p className="text-sm text-gray-600">Reduz o espaçamento entre elementos</p>
                  </div>
                  <Switch
                    checked={settings.appearance.compactView}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      appearance: { ...prev.appearance, compactView: checked }
                    }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("aparência")}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Aparência
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Dados da Empresa
                </CardTitle>
                <CardDescription>
                  Informações da empresa e configurações corporativas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      placeholder="SGD Advogados Associados"
                      defaultValue="SGD Advogados Associados"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      placeholder="00.000.000/0001-00"
                      defaultValue="12.345.678/0001-90"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyAddress">Endereço</Label>
                    <Textarea
                      id="companyAddress"
                      placeholder="Endereço completo da empresa"
                      defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyPhone">Telefone</Label>
                      <Input
                        id="companyPhone"
                        placeholder="(11) 0000-0000"
                        defaultValue="(11) 3333-4444"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyEmail">Email</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        placeholder="contato@sgd.com"
                        defaultValue="contato@sgd.com"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Digital Signature */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Assinatura Digital
                </CardTitle>
                <CardDescription>
                  Configurações de certificado digital e assinatura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Certificado A1</h4>
                      <p className="text-sm text-gray-600">Certificado instalado e válido</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Upload de Certificado</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Arraste e solte o arquivo .p12 ou clique para selecionar
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Selecionar Arquivo
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="certPassword">Senha do Certificado</Label>
                    <Input
                      id="certPassword"
                      type="password"
                      placeholder="Digite a senha do certificado"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Backup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Segurança e Backup
                </CardTitle>
                <CardDescription>
                  Configurações de segurança e backup automático
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Backup automático</h4>
                      <p className="text-sm text-gray-600">Backup regular dos dados do sistema</p>
                    </div>
                    <Switch
                      checked={settings.system.autoBackup}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, autoBackup: checked }
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Frequência do backup</Label>
                    <Select value={settings.system.backupFrequency} onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, backupFrequency: value }
                      }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">A cada hora</SelectItem>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Criptografia de dados</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AES-256 ativada</span>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Log de auditoria</h4>
                      <p className="text-sm text-gray-600">Registro de todas as ações do sistema</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Preferências do Sistema
                </CardTitle>
                <CardDescription>
                  Configurações gerais e preferências administrativas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Uso de armazenamento</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">6.5GB de 10GB</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Acesso à API</h4>
                      <p className="text-sm text-gray-600">Permite integração com sistemas externos</p>
                    </div>
                    <Switch
                      checked={settings.system.apiAccess}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, apiAccess: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Modo de manutenção</h4>
                      <p className="text-sm text-gray-600">Bloqueia acesso durante manutenção</p>
                    </div>
                    <Switch
                      checked={settings.system.maintainanceMode}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, maintainanceMode: checked }
                      }))}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Operações de sistema</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Backup Manual
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Restaurar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Logs do Sistema
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Limpar Cache
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => handleSave("sistema")} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Todas as Configurações
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}