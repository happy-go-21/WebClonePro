import { type Product, type InsertProduct, type Category, type InsertCategory, type Province, type InsertProvince, products, categories, provinces } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, and, desc } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  private initialized = false;

  private async initializeData() {
    if (this.initialized) return;
    
    // Check if categories exist
    const existingCategories = await db.select().from(categories).limit(1);
    if (existingCategories.length === 0) {
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

      await db.insert(categories).values(defaultCategories);
    }

    // Check if provinces exist
    const existingProvinces = await db.select().from(provinces).limit(1);
    if (existingProvinces.length === 0) {
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

      await db.insert(provinces).values(defaultProvinces);
    }

    this.initialized = true;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    await this.initializeData();
    return await db.select().from(products)
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt));
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products)
      .where(and(eq(products.category, category), eq(products.isActive, true)))
      .orderBy(desc(products.createdAt));
  }

  async getProductsByLocation(location: string): Promise<Product[]> {
    return await db.select().from(products)
      .where(and(eq(products.location, location), eq(products.isActive, true)))
      .orderBy(desc(products.createdAt));
  }

  async searchProducts(query: string, category?: string, location?: string): Promise<Product[]> {
    let conditions = [eq(products.isActive, true)];
    
    if (query) {
      conditions.push(
        // Search in title or description
        // Note: Using ILIKE for case-insensitive search
        // This is a simplified search - in production you'd want full-text search
      );
    }
    
    if (category) {
      conditions.push(eq(products.category, category));
    }
    
    if (location) {
      conditions.push(eq(products.location, location));
    }

    // For text search, we'll filter in memory for now since it's more complex with Drizzle
    const allProducts = await db.select().from(products)
      .where(and(...conditions))
      .orderBy(desc(products.createdAt));

    if (query) {
      return allProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    return allProducts;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    
    // Update category count - count products in this category
    const productCount = await db.select().from(products)
      .where(and(eq(products.category, product.category), eq(products.isActive, true)));
    
    await db.update(categories)
      .set({ count: productCount.length })
      .where(eq(categories.name, product.category));
    
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const [product] = await db.update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    await this.initializeData();
    return await db.select().from(categories);
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  // Provinces
  async getProvinces(): Promise<Province[]> {
    await this.initializeData();
    return await db.select().from(provinces);
  }

  async getProvinceById(id: string): Promise<Province | undefined> {
    const [province] = await db.select().from(provinces).where(eq(provinces.id, id));
    return province || undefined;
  }

  async createProvince(insertProvince: InsertProvince): Promise<Province> {
    const [province] = await db.insert(provinces).values(insertProvince).returning();
    return province;
  }
}

export const storage = new DatabaseStorage();
