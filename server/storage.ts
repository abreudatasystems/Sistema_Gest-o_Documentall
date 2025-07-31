import { 
  users, clients, projects, timeEntries, invoices, invoiceItems,
  type User, type InsertUser, type Client, type InsertClient,
  type Project, type InsertProject, type TimeEntry, type InsertTimeEntry,
  type Invoice, type InsertInvoice, type InvoiceItem, type InsertInvoiceItem
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Clients
  getClients(userId: number): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
  
  // Projects
  getProjects(userId: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Time Entries
  getTimeEntries(userId: number): Promise<TimeEntry[]>;
  getTimeEntriesByProject(projectId: number): Promise<TimeEntry[]>;
  getTimeEntry(id: number): Promise<TimeEntry | undefined>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
  updateTimeEntry(id: number, timeEntry: Partial<InsertTimeEntry>): Promise<TimeEntry | undefined>;
  deleteTimeEntry(id: number): Promise<boolean>;
  
  // Invoices
  getInvoices(userId: number): Promise<Invoice[]>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: number): Promise<boolean>;
  
  // Invoice Items
  getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]>;
  createInvoiceItem(invoiceItem: InsertInvoiceItem): Promise<InvoiceItem>;
  deleteInvoiceItem(id: number): Promise<boolean>;
  
  // Dashboard stats
  getDashboardStats(userId: number): Promise<{
    totalProjects: number;
    activeProjects: number;
    totalHours: number;
    totalRevenue: number;
    pendingInvoices: number;
    thisMonthHours: number;
    thisMonthRevenue: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private clients: Map<number, Client> = new Map();
  private projects: Map<number, Project> = new Map();
  private timeEntries: Map<number, TimeEntry> = new Map();
  private invoices: Map<number, Invoice> = new Map();
  private invoiceItems: Map<number, InvoiceItem> = new Map();
  private currentUserId = 1;
  private currentClientId = 1;
  private currentProjectId = 1;
  private currentTimeEntryId = 1;
  private currentInvoiceId = 1;
  private currentInvoiceItemId = 1;

  constructor() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "admin",
      email: "admin@newsletter.com",
      password: "password",
      name: "Newsletter Admin",
      role: "admin",
      avatar: null,
      language: "pt",
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role || "user",
      avatar: insertUser.avatar || null,
      language: insertUser.language || "pt",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...user };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getClients(userId: number): Promise<Client[]> {
    return Array.from(this.clients.values()).filter(client => client.userId === userId);
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = {
      ...insertClient,
      id,
      address: insertClient.address || null,
      phone: insertClient.phone || null,
      userId: insertClient.userId || null,
      createdAt: new Date(),
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined> {
    const existingClient = this.clients.get(id);
    if (!existingClient) return undefined;
    
    const updatedClient = { ...existingClient, ...client };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async deleteClient(id: number): Promise<boolean> {
    return this.clients.delete(id);
  }

  async getProjects(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.userId === userId);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      description: insertProject.description || null,
      status: insertProject.status || "active",
      userId: insertProject.userId || null,
      clientId: insertProject.clientId || null,
      hourlyRate: insertProject.hourlyRate || null,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject = { ...existingProject, ...project };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getTimeEntries(userId: number): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values()).filter(entry => entry.userId === userId);
  }

  async getTimeEntriesByProject(projectId: number): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values()).filter(entry => entry.projectId === projectId);
  }

  async getTimeEntry(id: number): Promise<TimeEntry | undefined> {
    return this.timeEntries.get(id);
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const id = this.currentTimeEntryId++;
    const timeEntry: TimeEntry = {
      ...insertTimeEntry,
      id,
      projectId: insertTimeEntry.projectId || null,
      userId: insertTimeEntry.userId || null,
      createdAt: new Date(),
    };
    this.timeEntries.set(id, timeEntry);
    return timeEntry;
  }

  async updateTimeEntry(id: number, timeEntry: Partial<InsertTimeEntry>): Promise<TimeEntry | undefined> {
    const existingTimeEntry = this.timeEntries.get(id);
    if (!existingTimeEntry) return undefined;
    
    const updatedTimeEntry = { ...existingTimeEntry, ...timeEntry };
    this.timeEntries.set(id, updatedTimeEntry);
    return updatedTimeEntry;
  }

  async deleteTimeEntry(id: number): Promise<boolean> {
    return this.timeEntries.delete(id);
  }

  async getInvoices(userId: number): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(invoice => invoice.userId === userId);
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = this.currentInvoiceId++;
    const invoice: Invoice = {
      ...insertInvoice,
      id,
      status: insertInvoice.status || "pending",
      projectId: insertInvoice.projectId || null,
      userId: insertInvoice.userId || null,
      clientId: insertInvoice.clientId || null,
      dueDate: insertInvoice.dueDate || null,
      issueDate: insertInvoice.issueDate || null,
      createdAt: new Date(),
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async updateInvoice(id: number, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const existingInvoice = this.invoices.get(id);
    if (!existingInvoice) return undefined;
    
    const updatedInvoice = { ...existingInvoice, ...invoice };
    this.invoices.set(id, updatedInvoice);
    return updatedInvoice;
  }

  async deleteInvoice(id: number): Promise<boolean> {
    return this.invoices.delete(id);
  }

  async getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]> {
    return Array.from(this.invoiceItems.values()).filter(item => item.invoiceId === invoiceId);
  }

  async createInvoiceItem(insertInvoiceItem: InsertInvoiceItem): Promise<InvoiceItem> {
    const id = this.currentInvoiceItemId++;
    const invoiceItem: InvoiceItem = {
      ...insertInvoiceItem,
      id,
      invoiceId: insertInvoiceItem.invoiceId || null,
    };
    this.invoiceItems.set(id, invoiceItem);
    return invoiceItem;
  }

  async deleteInvoiceItem(id: number): Promise<boolean> {
    return this.invoiceItems.delete(id);
  }

  async getDashboardStats(userId: number): Promise<{
    totalProjects: number;
    activeProjects: number;
    totalHours: number;
    totalRevenue: number;
    pendingInvoices: number;
    thisMonthHours: number;
    thisMonthRevenue: number;
  }> {
    const userProjects = Array.from(this.projects.values()).filter(p => p.userId === userId);
    const userTimeEntries = Array.from(this.timeEntries.values()).filter(t => t.userId === userId);
    const userInvoices = Array.from(this.invoices.values()).filter(i => i.userId === userId);

    const totalHours = userTimeEntries.reduce((sum, entry) => sum + parseFloat(entry.hours || "0"), 0);
    const totalRevenue = userInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount || "0"), 0);
    const pendingInvoices = userInvoices.filter(invoice => invoice.status === "pending").length;

    const thisMonth = new Date();
    thisMonth.setDate(1);
    const thisMonthEntries = userTimeEntries.filter(entry => entry.date >= thisMonth);
    const thisMonthInvoices = userInvoices.filter(invoice => invoice.issueDate && invoice.issueDate >= thisMonth);

    const thisMonthHours = thisMonthEntries.reduce((sum, entry) => sum + parseFloat(entry.hours || "0"), 0);
    const thisMonthRevenue = thisMonthInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount || "0"), 0);

    return {
      totalProjects: userProjects.length,
      activeProjects: userProjects.filter(p => p.status === "active").length,
      totalHours,
      totalRevenue,
      pendingInvoices,
      thisMonthHours,
      thisMonthRevenue,
    };
  }
}

export const storage = new MemStorage();
