
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Shield, Key, Upload, Download, CheckCircle, XCircle } from "lucide-react";

export default function DigitalSignature() {
  const certificates = [
    {
      id: 1,
      name: "Certificado A1 - João Silva",
      type: "A1",
      status: "Válido",
      expiry: "2024-12-31",
      issuer: "ICP-Brasil"
    },
    {
      id: 2,
      name: "Certificado A3 - Empresa",
      type: "A3",
      status: "Expirado",
      expiry: "2023-12-31",
      issuer: "ICP-Brasil"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assinatura Digital</h1>
          <p className="text-gray-600 mt-1">Configure certificados e assinaturas digitais</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Importar Certificado
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status da Assinatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="digitalSignature">Assinatura Digital</Label>
              <Switch id="digitalSignature" defaultChecked />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Certificados válidos: 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm">Certificados expirados: 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Padrão ICP-Brasil</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Certificados Digitais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{cert.name}</span>
                      </div>
                      <Badge variant={cert.status === 'Válido' ? 'default' : 'destructive'}>
                        {cert.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Tipo:</span> {cert.type}
                      </div>
                      <div>
                        <span className="font-medium">Expira em:</span> {cert.expiry}
                      </div>
                      <div>
                        <span className="font-medium">Emissor:</span> {cert.issuer}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Exportar
                      </Button>
                      <Button variant="outline" size="sm">
                        Renovar
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Assinatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultCert">Certificado Padrão</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar certificado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cert1">Certificado A1 - João Silva</SelectItem>
                  <SelectItem value="cert2">Certificado A3 - Empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signatureFormat">Formato de Assinatura</Label>
              <Select defaultValue="pades">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pades">PAdES (PDF)</SelectItem>
                  <SelectItem value="cades">CAdES</SelectItem>
                  <SelectItem value="xades">XAdES</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="autoSign">Assinatura Automática</Label>
              <Switch id="autoSign" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="timestampSignature">Carimbo de Tempo</Label>
              <Switch id="timestampSignature" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timestampServer">Servidor de Carimbo</Label>
              <Input id="timestampServer" defaultValue="http://timestamp.iti.gov.br" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Políticas de Assinatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signaturePolicy">Política de Assinatura</Label>
              <Select defaultValue="ad-rb">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ad-rb">AD-RB (Referência Básica)</SelectItem>
                  <SelectItem value="ad-rt">AD-RT (Referência de Tempo)</SelectItem>
                  <SelectItem value="ad-rc">AD-RC (Referência Completa)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="requireMultiSign">Múltiplas Assinaturas</Label>
              <Switch id="requireMultiSign" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="validateCertChain">Validar Cadeia de Certificação</Label>
              <Switch id="validateCertChain" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="requireCRL">Verificar Lista de Revogação</Label>
              <Switch id="requireCRL" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signatureReason">Motivo Padrão da Assinatura</Label>
              <Input id="signatureReason" defaultValue="Aprovação de documento" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signatureLocation">Local Padrão da Assinatura</Label>
              <Input id="signatureLocation" defaultValue="São Paulo, SP" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Assinaturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma assinatura registrada</h3>
            <p className="text-gray-600">As assinaturas digitais realizadas aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
