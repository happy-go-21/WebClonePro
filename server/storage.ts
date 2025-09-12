import { type Product, type InsertProduct, type Category, type InsertCategory, type Province, type InsertProvince } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByLocation(location: string): Promise<Product[]>;
  searchProducts(query: string, category?: string, location?: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Provinces
  getProvinces(): Promise<Province[]>;
  getProvinceById(id: string): Promise<Province | undefined>;
  createProvince(province: InsertProvince): Promise<Province>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private categories: Map<string, Category>;
  private provinces: Map<string, Province>;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.provinces = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const defaultCategories: InsertCategory[] = [
      { name: "املاک", icon: "🏠", count: 0 },
      { name: "خودرو", icon: "🚗", count: 0 },
      { name: "الکترونیکی", icon: "📱", count: 0 },
      { name: "لباس مردانه", icon: "👔", count: 0 },
      { name: "لباس زنانه", icon: "👗", count: 0 },
      { name: "لباس کودکان", icon: "👶", count: 0 },
      { name: "طلا و جواهرات", icon: "💎", count: 0 },
      { name: "لوازم خانگی", icon: "🛋️", count: 0 },
      { name: "کتاب و آموزش", icon: "📚", count: 0 },
      { name: "لوازم کودک", icon: "🧸", count: 0 },
      { name: "استخدام", icon: "💼", count: 0 },
      { name: "خدمات", icon: "🛠️", count: 0 },
      { name: "میوه‌جات", icon: "🍎", count: 0 },
      { name: "مواد غذایی", icon: "🥘", count: 0 },
      { name: "ورزشی", icon: "⚽", count: 0 },
      { name: "سرگرمی", icon: "🎮", count: 0 },
    ];

    defaultCategories.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id, count: cat.count || 0 });
    });

    // Initialize provinces
    const defaultProvinces: InsertProvince[] = [
      { name: "کابل", icon: "🏛️", population: "4.6M" },
      { name: "هرات", icon: "🕌", population: "1.9M" },
      { name: "بلخ", icon: "🏺", population: "1.5M" },
      { name: "قندهار", icon: "🏜️", population: "614K" },
      { name: "ننگرهار", icon: "🏔️", population: "1.7M" },
      { name: "غزنی", icon: "🏰", population: "1.3M" },
      { name: "بامیان", icon: "⛰️", population: "455K" },
      { name: "فراه", icon: "🌾", population: "385K" },
      { name: "کندز", icon: "🌿", population: "1.1M" },
      { name: "بدخشان", icon: "🏔️", population: "970K" },
    ];

    defaultProvinces.forEach(prov => {
      const id = randomUUID();
      this.provinces.set(id, { ...prov, id, population: prov.population || null });
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async getProductsByLocation(location: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.location === location);
  }

  async searchProducts(query: string, category?: string, location?: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => {
      const matchesQuery = !query || 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !category || product.category === category;
      const matchesLocation = !location || product.location === location;
      
      return matchesQuery && matchesCategory && matchesLocation && product.isActive;
    });
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      isActive: true,
      createdAt: new Date(),
      imageUrl: insertProduct.imageUrl || null,
    };
    this.products.set(id, product);
    
    // Update category count
    const category = Array.from(this.categories.values()).find(c => c.name === product.category);
    if (category) {
      category.count = (category.count || 0) + 1;
    }
    
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const product = this.products.get(id);
    if (!product) return false;
    
    // Update category count
    const category = Array.from(this.categories.values()).find(c => c.name === product.category);
    if (category && (category.count || 0) > 0) {
      category.count = (category.count || 0) - 1;
    }
    
    return this.products.delete(id);
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id, count: insertCategory.count || 0 };
    this.categories.set(id, category);
    return category;
  }

  // Provinces
  async getProvinces(): Promise<Province[]> {
    return Array.from(this.provinces.values());
  }

  async getProvinceById(id: string): Promise<Province | undefined> {
    return this.provinces.get(id);
  }

  async createProvince(insertProvince: InsertProvince): Promise<Province> {
    const id = randomUUID();
    const province: Province = { ...insertProvince, id, population: insertProvince.population || null };
    this.provinces.set(id, province);
    return province;
  }
}

export const storage = new MemStorage();
