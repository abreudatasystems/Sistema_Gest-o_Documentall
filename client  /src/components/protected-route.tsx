
import { useAuth } from "@/contexts/auth-context";
import { LoginDialog } from "@/components/login-dialog";
import { useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission } = useAuth();
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  if (!isAuthenticated) {
    return <LoginDialog open={showLogin} onOpenChange={setShowLogin} />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
