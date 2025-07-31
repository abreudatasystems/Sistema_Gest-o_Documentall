import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, FileText, Users, Clock, AlertCircle, CheckCircle, Info, X } from "lucide-react";

export function NotificationsPanel() {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "contract",
      title: "Contrato vencendo em 3 dias",
      message: "Contrato de Prestação de Serviços - Empresa ABC vence em 15/01/2024",
      timestamp: "2024-01-12T10:30:00",
      read: false,
      priority: "high",
      action: "Revisar contrato",
      url: "/contracts/1"
    },
    {
      id: 2,
      type: "document",
      title: "Documento compartilhado",
      message: "Maria Santos compartilhou 'Parecer Jurídico - Questão Tributária' com você",
      timestamp: "2024-01-12T09:15:00",
      read: false,
      priority: "medium",
      action: "Visualizar documento",
      url: "/documents/2"
    },
    {
      id: 3,
      type: "client",
      title: "Novo cliente cadastrado",
      message: "Cliente 'Tech Solutions' foi cadastrado no sistema",
      timestamp: "2024-01-12T08:45:00",
      read: true,
      priority: "low",
      action: "Ver detalhes",
      url: "/clients/3"
    },
    {
      id: 4,
      type: "system",
      title: "Backup realizado",
      message: "Backup automático dos dados foi concluído com sucesso",
      timestamp: "2024-01-12T07:00:00",
      read: true,
      priority: "low",
      action: null,
      url: null
    },
    {
      id: 5,
      type: "signature",
      title: "Assinatura pendente",
      message: "Contrato de Locação Comercial aguarda sua assinatura",
      timestamp: "2024-01-11T16:30:00",
      read: false,
      priority: "high",
      action: "Assinar documento",
      url: "/contracts/5"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "document":
        return <FileText className="w-4 h-4 text-green-600" />;
      case "client":
        return <Users className="w-4 h-4 text-purple-600" />;
      case "signature":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "system":
        return <Info className="w-4 h-4 text-gray-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "agora";
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </span>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
              >
                Marcar todas como lidas
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {notifications.filter(n => n.priority === 'high').length} Alta prioridade
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {notifications.filter(n => n.priority === 'medium').length} Média
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {notifications.filter(n => n.priority === 'low').length} Baixa
              </span>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all ${
                    !notification.read 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1 ml-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getPriorityColor(notification.priority)}`}
                              >
                                {notification.priority}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                className="h-4 w-4 p-0 text-gray-400 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {formatTime(notification.timestamp)}
                            </div>
                            {notification.action && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-6 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (notification.url) {
                                    window.location.href = notification.url;
                                  }
                                }}
                              >
                                {notification.action}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <CheckCircle className="w-12 h-12 mb-2 text-gray-300" />
            <p className="text-sm">Nenhuma notificação</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}