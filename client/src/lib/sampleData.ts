
export const provinces = [
  {
    id: "kabul",
    name: "کابل",
    productCount: 324
  },
  {
    id: "herat",
    name: "هرات", 
    productCount: 298
  },
  {
    id: "kandahar",
    name: "قندهار",
    productCount: 187
  },
  {
    id: "balkh",
    name: "بلخ",
    productCount: 156
  },
  {
    id: "nangarhar",
    name: "ننگرهار",
    productCount: 143
  },
  {
    id: "badakhshan",
    name: "بدخشان",
    productCount: 98
  },
  {
    id: "ghazni",
    name: "غزنی",
    productCount: 87
  },
  {
    id: "bamyan",
    name: "بامیان",
    productCount: 76
  },
  {
    id: "farah",
    name: "فراه",
    productCount: 65
  },
  {
    id: "kunduz",
    name: "کندوز",
    productCount: 54
  },
  {
    id: "takhar",
    name: "تخار",
    productCount: 43
  },
  {
    id: "faryab",
    name: "فاریاب",
    productCount: 39
  },
  {
    id: "baghlan",
    name: "بغلان",
    productCount: 37
  },
  {
    id: "parwan",
    name: "پروان",
    productCount: 35
  },
  {
    id: "wardak",
    name: "وردک",
    productCount: 32
  },
  {
    id: "khost",
    name: "خوست",
    productCount: 29
  },
  {
    id: "laghman",
    name: "لغمان",
    productCount: 27
  },
  {
    id: "kapisa",
    name: "کاپیسا",
    productCount: 25
  },
  {
    id: "helmand",
    name: "هلمند",
    productCount: 24
  },
  {
    id: "kunar",
    name: "کنر",
    productCount: 22
  },
  {
    id: "logar",
    name: "لوگر",
    productCount: 21
  },
  {
    id: "jawzjan",
    name: "جوزجان",
    productCount: 19
  },
  {
    id: "badghis",
    name: "بادغیس",
    productCount: 18
  },
  {
    id: "sar-e-pol",
    name: "سرپل",
    productCount: 16
  },
  {
    id: "ghor",
    name: "غور",
    productCount: 15
  },
  {
    id: "paktya",
    name: "پکتیا",
    productCount: 14
  },
  {
    id: "paktika",
    name: "پکتیکا",
    productCount: 13
  },
  {
    id: "zabul",
    name: "زابل",
    productCount: 12
  },
  {
    id: "uruzgan",
    name: "ارزگان",
    productCount: 11
  },
  {
    id: "daykundi",
    name: "دایکندی",
    productCount: 10
  },
  {
    id: "panjshir",
    name: "پنجشیر",
    productCount: 9
  },
  {
    id: "samangan",
    name: "سمنگان",
    productCount: 8
  },
  {
    id: "nimroz",
    name: "نیمروز",
    productCount: 7
  },
  {
    id: "nuristan",
    name: "نورستان",
    productCount: 6
  }
];

export const categories = [
  { id: 1, name: "وسایل نقلیه", productCount: 45 },
  { id: 2, name: "املاک", productCount: 38 },
  { id: 3, name: "الکترونیکی", productCount: 52 },
  { id: 4, name: "لباس مردانه", productCount: 29 },
  { id: 5, name: "لباس زنانه", productCount: 41 },
  { id: 6, name: "لباس کودکان", productCount: 23 },
  { id: 7, name: "طلا و جواهرات", productCount: 18 },
  { id: 8, name: "آموزش", productCount: 31 },
  { id: 9, name: "لوازم کودک", productCount: 26 },
  { id: 10, name: "لوازم خانگی", productCount: 34 },
  { id: 11, name: "استخدام", productCount: 15 },
  { id: 12, name: "خدمات", productCount: 47 },
  { id: 13, name: "میوه‌جات", productCount: 22 },
  { id: 14, name: "مواد غذایی", productCount: 39 },
  { id: 15, name: "ورزشی", productCount: 19 },
  { id: 16, name: "سرگرمی", productCount: 24 },
  { id: 17, name: "موسیقی", productCount: 13 },
  { id: 18, name: "دوربین", productCount: 16 },
  { id: 19, name: "ساعت", productCount: 11 },
  { id: 20, name: "هدایا", productCount: 21 }
];

export const sampleProducts = [
  // وسایل نقلیه - کابل
  { id: "1", title: "تویوتا کامری ۲۰۲۰", price: 25000, location: "کابل", category: "وسایل نقلیه", description: "خودروی تمیز و بدون تصادف" },
  { id: "2", title: "هوندا سیویک ۲۰۱۹", price: 22000, location: "کابل", category: "وسایل نقلیه", description: "کیلومتر کم، نگهداری شده" },
  { id: "3", title: "موتور یاماها ۲۵۰", price: 3500, location: "کابل", category: "وسایل نقلیه", description: "موتور سیکلت سالم و آماده کار" },
  
  // املاک - هرات
  { id: "4", title: "خانه ۴ خوابه", price: 85000, location: "هرات", category: "املاک", description: "خانه نوساز با حیاط بزرگ" },
  { id: "5", title: "آپارتمان ۲ خوابه", price: 45000, location: "هرات", category: "املاک", description: "آپارتمان مدرن در مرکز شهر" },
  { id: "6", title: "زمین تجاری", price: 120000, location: "هرات", category: "املاک", description: "زمین در منطقه تجاری" },
  
  // الکترونیکی - قندهار
  { id: "7", title: "آیفون ۱۴ پرو", price: 1200, location: "قندهار", category: "الکترونیکی", description: "گوشی نو و اورجینال" },
  { id: "8", title: "لپ‌تاپ دل", price: 800, location: "قندهار", category: "الکترونیکی", description: "لپ‌تاپ گیمینگ قدرتمند" },
  { id: "9", title: "تلویزیون سامسونگ ۵۵ اینچ", price: 650, location: "قندهار", category: "الکترونیکی", description: "تلویزیون ۴K هوشمند" },
  
  // لباس مردانه - بلخ
  { id: "10", title: "کت و شلوار مجلسی", price: 150, location: "بلخ", category: "لباس مردانه", description: "کت شلوار برند ترک" },
  { id: "11", title: "پیراهن کتان", price: 45, location: "بلخ", category: "لباس مردانه", description: "پیراهن تابستانی راحت" },
  { id: "12", title: "کفش چرم", price: 85, location: "بلخ", category: "لباس مردانه", description: "کفش چرم طبیعی دست‌دوز" },
  
  // لباس زنانه - ننگرهار
  { id: "13", title: "لباس مجلسی", price: 120, location: "ننگرهار", category: "لباس زنانه", description: "لباس شب زیبا و شیک" },
  { id: "14", title: "مانتو بهاره", price: 75, location: "ننگرهار", category: "لباس زنانه", description: "مانتو طرح جدید" },
  { id: "15", title: "کفش پاشنه بلند", price: 95, location: "ننگرهار", category: "لباس زنانه", description: "کفش مجلسی راحت" },
  
  // لوازم خانگی - غزنی
  { id: "16", title: "یخچال فریزر", price: 450, location: "غزنی", category: "لوازم خانگی", description: "یخچال بزرگ و کم مصرف" },
  { id: "17", title: "ماشین لباسشویی", price: 320, location: "غزنی", category: "لوازم خانگی", description: "ماشین لباسشویی ۷ کیلو" },
  { id: "18", title: "مبل ۷ نفره", price: 680, location: "غزنی", category: "لوازم خانگی", description: "مبل چوبی با پارچه مخمل" }
];
