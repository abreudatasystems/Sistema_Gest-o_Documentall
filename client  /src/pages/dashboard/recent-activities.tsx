import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Edit, Download, Share, Clock, User, Calendar } from "lucide-react";

export default function RecentActivities() {
  const activities = [
    {
      id: 1,
      type: "contract_created",
      title: "Contrato de Prestação de Serviços criado",
      description: "Novo contrato criado para Empresa ABC Ltda",
      user: "João Silva",
      avatar: "/avatars/joao.jpg",
      timestamp: "2 horas atrás",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      type: "document_signed",
      title: "Documento assinado digitalmente",
      description: "NDA assinado por Startup XYZ",
      user: "Maria Santos",
      avatar: "/avatars/maria.jpg",
      timestamp: "4 horas atrás",
      icon: Edit,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      type: "contract_shared",
      title: "Contrato compartilhado",
      description: "Contrato de licenciamento compartilhado com cliente",
      user: "Pedro Costa",
      avatar: "/avatars/pedro.jpg",
      timestamp: "6 horas atrás",
      icon: Share,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      type: "template_updated",
      title: "Template atualizado",
      description: "Template de contrato empresarial foi modificado",
      user: "Ana Lima",
      avatar: "/avatars/ana.jpg",
      timestamp: "1 dia atrás",
      icon: Edit,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 5,
      type: "backup_completed",
      title: "Backup automático concluído",
      description: "Backup diário dos dados foi realizado com sucesso",
      user: "Sistema",
      avatar: null,
      timestamp: "1 dia atrás",
      icon: Download,
      color: "bg-gray-100 text-gray-600"
    }
  ];

  const getActivityTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      contract_created: "Contrato Criado",
      document_signed: "Documento Assinado",
      contract_shared: "Compartilhado",
      template_updated: "Template Atualizado",
      backup_completed: "Backup"
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Atividades Recentes</h1>
          <p className="text-gray-600 mt-1">Acompanhe todas as atividades e alterações do sistema</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Log
        </Button>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hoje</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Esta Semana</p>
                <p className="text-2xl font-bold text-gray-900">67</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mês</p>
                <p className="text-2xl font-bold text-gray-900">284</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <User className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {getActivityTypeLabel(activity.type)}
                        </Badge>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      {activity.avatar ? (
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={activity.avatar} />
                          <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-gray-500" />
                        </div>
                      )}
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute left-6 mt-8 w-px h-6 bg-gray-200"></div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

