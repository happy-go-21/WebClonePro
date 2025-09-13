export const categories = [
  {
    id: "textiles",
    name: "Textiles & Carpets",
    icon: "fas fa-tshirt",
    description: "Carpets, Fabrics",
    productCount: 145
  },
  {
    id: "handicrafts", 
    name: "Handicrafts",
    icon: "fas fa-palette",
    description: "Art, Pottery",
    productCount: 89
  },
  {
    id: "jewelry",
    name: "Jewelry",
    icon: "fas fa-gem", 
    description: "Traditional, Modern",
    productCount: 67
  },
  {
    id: "spices",
    name: "Spices & Herbs",
    icon: "fas fa-pepper-hot",
    description: "Saffron, Herbs",
    productCount: 134
  },
  {
    id: "dried-fruits",
    name: "Dried Fruits & Nuts",
    icon: "fas fa-apple-alt",
    description: "Nuts, Raisins",
    productCount: 178
  },
  {
    id: "instruments",
    name: "Musical Instruments",
    icon: "fas fa-music",
    description: "Traditional Music",
    productCount: 23
  },
  {
    id: "clothing",
    name: "Traditional Clothing",
    icon: "fas fa-hat-cowboy",
    description: "Ethnic Wear",
    productCount: 56
  },
  {
    id: "leather",
    name: "Leather Goods",
    icon: "fas fa-briefcase",
    description: "Bags, Accessories",
    productCount: 34
  }
];

export const provinces = [
  {
    id: "kabul",
    name: "Kabul",
    productCount: 324
  },
  {
    id: "herat",
    name: "Herat", 
    productCount: 298
  },
  {
    id: "kandahar",
    name: "Kandahar",
    productCount: 187
  },
  {
    id: "balkh",
    name: "Balkh",
    productCount: 156
  },
  {
    id: "nangarhar",
    name: "Nangarhar",
    productCount: 143
  },
  {
    id: "badakhshan",
    name: "Badakhshan",
    productCount: 98
  },
  {
    id: "ghazni",
    name: "Ghazni",
    productCount: 87
  },
  {
    id: "bamyan",
    name: "Bamyan",
    productCount: 76
  },
  {
    id: "farah",
    name: "Farah",
    productCount: 65
  },
  {
    id: "kunduz",
    name: "Kunduz",
    productCount: 54
  },
  {
    id: "takhar",
    name: "Takhar",
    productCount: 43
  },
  {
    id: "faryab",
    name: "Faryab",
    productCount: 39
  },
  {
    id: "baghlan",
    name: "Baghlan",
    productCount: 37
  },
  {
    id: "parwan",
    name: "Parwan",
    productCount: 35
  },
  {
    id: "wardak",
    name: "Wardak",
    productCount: 32
  },
  {
    id: "khost",
    name: "Khost",
    productCount: 29
  },
  {
    id: "laghman",
    name: "Laghman",
    productCount: 27
  },
  {
    id: "kapisa",
    name: "Kapisa",
    productCount: 25
  },
  {
    id: "helmand",
    name: "Helmand",
    productCount: 24
  },
  {
    id: "kunar",
    name: "Kunar",
    productCount: 22
  },
  {
    id: "logar",
    name: "Logar",
    productCount: 21
  },
  {
    id: "jawzjan",
    name: "Jawzjan",
    productCount: 19
  },
  {
    id: "badghis",
    name: "Badghis",
    productCount: 18
  },
  {
    id: "sar-e-pol",
    name: "Sar-e-Pol",
    productCount: 16
  },
  {
    id: "ghor",
    name: "Ghor",
    productCount: 15
  },
  {
    id: "paktya",
    name: "Paktya",
    productCount: 14
  },
  {
    id: "paktika",
    name: "Paktika",
    productCount: 13
  },
  {
    id: "zabul",
    name: "Zabul",
    productCount: 12
  },
  {
    id: "uruzgan",
    name: "Uruzgan",
    productCount: 11
  },
  {
    id: "daykundi",
    name: "Daykundi",
    productCount: 10
  },
  {
    id: "panjshir",
    name: "Panjshir",
    productCount: 9
  },
  {
    id: "samangan",
    name: "Samangan",
    productCount: 8
  },
  {
    id: "nimroz",
    name: "Nimroz",
    productCount: 7
  },
  {
    id: "nuristan",
    name: "Nuristan",
    productCount: 6
  }
];

// Sample products with authentic Afghan product types
export const sampleProducts = [
  {
    id: "1",
    title: "Handwoven Herat Carpet",
    description: "Traditional Afghan carpet with intricate geometric patterns, hand-woven by master craftsmen in Herat. Made with premium wool and natural dyes.",
    price: "$850",
    category: "Textiles & Carpets",
    location: "Herat",
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
    createdAt: new Date().toISOString()
  },
  {
    id: "2", 
    title: "Premium Afghan Saffron",
    description: "World's finest saffron from the valleys of Herat. Hand-picked and dried using traditional methods. Grade A quality with intense aroma and color.",
    price: "$45/10g",
    category: "Spices & Herbs",
    location: "Herat",
    images: ["https://pixabay.com/get/g314dca748a20cd6ce7130a7ed12cf7a871410c1072a2c0702d959bbff573230ae7ee3ce24b475333c4c019c888462af594fb55b00a42f29c9e2c2eb34cb69123_1280.jpg"],
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Traditional Silver Necklace", 
    description: "Authentic Afghan jewelry crafted with traditional techniques. Features intricate silver work with turquoise stones, representing centuries-old Afghan craftsmanship.",
    price: "$125",
    category: "Jewelry",
    location: "Kabul",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Premium Dried Fruits Mix",
    description: "Assorted dried fruits from Kandahar including almonds, raisins, pistachios, and dried apricots. Naturally dried and packed fresh.",
    price: "$28/kg", 
    category: "Dried Fruits & Nuts",
    location: "Kandahar",
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Traditional Bamyan Pottery",
    description: "Handcrafted ceramic pottery with traditional blue and white patterns. Made using ancient techniques passed down through generations in Bamyan.",
    price: "$85",
    category: "Handicrafts", 
    location: "Bamyan",
    images: ["https://pixabay.com/get/gfbc90b44bcc7e288b4878c0f4196d7b6c761ada17d6e462a0b183791ff8579073b8764adb4ec66fecd1b40b799e25300_1280.jpg"],
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "Handcrafted Leather Bag",
    description: "Premium leather handbag crafted by skilled artisans in Ghazni. Features traditional Afghan designs and durable construction.",
    price: "$145",
    category: "Leather Goods",
    location: "Ghazni", 
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
    createdAt: new Date().toISOString()
  },
  {
    id: "7",
    title: "Traditional Afghan Rubab",
    description: "Authentic Afghan rubab handcrafted by master instrument makers. Features traditional wooden construction with decorative inlays.",
    price: "$420",
    category: "Musical Instruments",
    location: "Kabul",
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
    createdAt: new Date().toISOString()
  },
  {
    id: "8", 
    title: "Embroidered Kuchi Dress",
    description: "Traditional Afghan dress with intricate embroidery and mirror work. Authentic Kuchi style representing nomadic Afghan culture.",
    price: "$95",
    category: "Traditional Clothing",
    location: "Balkh",
    images: ["https://images.unsplash.com/photo-1583846835272-a66aba0885a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
    createdAt: new Date().toISOString()
  }
];
