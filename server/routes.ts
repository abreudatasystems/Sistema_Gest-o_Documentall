import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema, insertProjectSchema, insertTimeEntrySchema, insertInvoiceSchema, insertInvoiceItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const userId = 1; // For demo purposes, using a fixed user ID

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Clients routes
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getClients(userId);
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const clientData = insertClientSchema.parse({ ...req.body, userId });
      const client = await storage.createClient(clientData);
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: "Invalid client data" });
    }
  });

  app.put("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const clientData = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(id, clientData);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: "Invalid client data" });
    }
  });

  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteClient(id);
      if (!deleted) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete client" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse({ ...req.body, userId });
      const project = await storage.createProject(projectData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Time entries routes
  app.get("/api/time-entries", async (req, res) => {
    try {
      const timeEntries = await storage.getTimeEntries(userId);
      res.json(timeEntries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch time entries" });
    }
  });

  app.get("/api/time-entries/project/:projectId", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const timeEntries = await storage.getTimeEntriesByProject(projectId);
      res.json(timeEntries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch time entries" });
    }
  });

  app.post("/api/time-entries", async (req, res) => {
    try {
      const timeEntryData = insertTimeEntrySchema.parse({ ...req.body, userId });
      const timeEntry = await storage.createTimeEntry(timeEntryData);
      res.json(timeEntry);
    } catch (error) {
      res.status(400).json({ error: "Invalid time entry data" });
    }
  });

  app.put("/api/time-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const timeEntryData = insertTimeEntrySchema.partial().parse(req.body);
      const timeEntry = await storage.updateTimeEntry(id, timeEntryData);
      if (!timeEntry) {
        return res.status(404).json({ error: "Time entry not found" });
      }
      res.json(timeEntry);
    } catch (error) {
      res.status(400).json({ error: "Invalid time entry data" });
    }
  });

  app.delete("/api/time-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteTimeEntry(id);
      if (!deleted) {
        return res.status(404).json({ error: "Time entry not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete time entry" });
    }
  });

  // Invoices routes
  app.get("/api/invoices", async (req, res) => {
    try {
      const invoices = await storage.getInvoices(userId);
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const invoiceData = insertInvoiceSchema.parse({ ...req.body, userId });
      const invoice = await storage.createInvoice(invoiceData);
      res.json(invoice);
    } catch (error) {
      res.status(400).json({ error: "Invalid invoice data" });
    }
  });

  app.put("/api/invoices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const invoiceData = insertInvoiceSchema.partial().parse(req.body);
      const invoice = await storage.updateInvoice(id, invoiceData);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      res.status(400).json({ error: "Invalid invoice data" });
    }
  });

  app.delete("/api/invoices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteInvoice(id);
      if (!deleted) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete invoice" });
    }
  });

  // Invoice items routes
  app.get("/api/invoices/:invoiceId/items", async (req, res) => {
    try {
      const invoiceId = parseInt(req.params.invoiceId);
      const items = await storage.getInvoiceItems(invoiceId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoice items" });
    }
  });

  app.post("/api/invoices/:invoiceId/items", async (req, res) => {
    try {
      const invoiceId = parseInt(req.params.invoiceId);
      const itemData = insertInvoiceItemSchema.parse({ ...req.body, invoiceId });
      const item = await storage.createInvoiceItem(itemData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid invoice item data" });
    }
  });

  app.delete("/api/invoice-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteInvoiceItem(id);
      if (!deleted) {
        return res.status(404).json({ error: "Invoice item not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete invoice item" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
