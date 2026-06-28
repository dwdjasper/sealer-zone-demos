/* Sealer Zone storefront — demo seed data */

const ACCOUNT = {
  company: "Silva Concrete Coatings",
  contact: "João Silva",
  tier: "Gold",            // Gold = 15% contractor discount in this demo
  discount: 0.15,
  taxExempt: true,
  lang: "en"
};

const CATEGORIES = [
  { id: "all",       en: "All products",      pt: "Todos os produtos" },
  { id: "sealers",   en: "Concrete sealers",  pt: "Seladores" },
  { id: "epoxy",     en: "Floor epoxy",       pt: "Epóxi para piso" },
  { id: "sand",      en: "Polymeric sand",    pt: "Areia polimérica" },
  { id: "cleaning",  en: "Cleaning chemicals",pt: "Produtos de limpeza" },
  { id: "tools",     en: "Tools & accessories", pt: "Ferramentas" }
];

// price = list price; contractor price derived from tier discount
const PRODUCTS = [
  { sku: "SZ-AS5000", cat: "sealers",  name: "AquaSeal Pro 5000",        blurb_en: "Penetrating concrete sealer, 5 gal", blurb_pt: "Selador penetrante, 5 gal", unit: "pail", price: 189.00, stock: "in" },
  { sku: "SZ-WL100",  cat: "sealers",  name: "WetLook Acrylic Sealer",   blurb_en: "High-gloss wet-look, 5 gal",        blurb_pt: "Acrílico brilho molhado, 5 gal", unit: "pail", price: 164.00, stock: "in" },
  { sku: "SZ-DEN20",  cat: "sealers",  name: "LithiHard Densifier",      blurb_en: "Lithium hardener/densifier, 5 gal", blurb_pt: "Endurecedor de lítio, 5 gal", unit: "pail", price: 142.00, stock: "low" },
  { sku: "SZ-AC100",  cat: "epoxy",    name: "ArmorCoat 100% Solids Kit",blurb_en: "2-part epoxy kit, 3 gal coverage",  blurb_pt: "Kit epóxi 2 partes, 3 gal", unit: "kit",  price: 248.00, stock: "in" },
  { sku: "SZ-PA70",   cat: "epoxy",    name: "Polyaspartic Topcoat",     blurb_en: "Fast-cure UV-stable topcoat, 2 gal",blurb_pt: "Verniz poliaspártico, 2 gal", unit: "kit",  price: 312.00, stock: "in" },
  { sku: "SZ-EP01",   cat: "epoxy",    name: "Epoxy Primer Coat",        blurb_en: "Moisture-tolerant primer, 2 gal",   blurb_pt: "Primer epóxi, 2 gal", unit: "kit",  price: 138.00, stock: "in" },
  { sku: "SZ-FLK25",  cat: "epoxy",    name: "Vinyl Flake Media (25 lb)",blurb_en: "Decorative broadcast flakes, box",  blurb_pt: "Flocos decorativos, caixa", unit: "box",  price: 96.00, stock: "low" },
  { sku: "SZ-PSG50",  cat: "sand",     name: "PolyBond Sand — Grey",     blurb_en: "Polymeric joint sand, 50 lb",       blurb_pt: "Areia polimérica cinza, 50 lb", unit: "bag",  price: 38.50, stock: "in" },
  { sku: "SZ-PST50",  cat: "sand",     name: "PolyBond Sand — Tan",      blurb_en: "Polymeric joint sand, 50 lb",       blurb_pt: "Areia polimérica bege, 50 lb", unit: "bag",  price: 38.50, stock: "out" },
  { sku: "SZ-DEG01",  cat: "cleaning", name: "Heavy-Duty Degreaser",     blurb_en: "Concentrate, 1 gal",                blurb_pt: "Desengordurante, 1 gal", unit: "jug",  price: 28.00, stock: "in" },
  { sku: "SZ-EFF01",  cat: "cleaning", name: "Efflorescence Remover",    blurb_en: "Acid-free cleaner, 1 gal",          blurb_pt: "Removedor de eflorescência, 1 gal", unit: "jug",  price: 34.00, stock: "in" },
  { sku: "SZ-ETCH",   cat: "cleaning", name: "Surface Etch & Prep",      blurb_en: "Concrete prep wash, 1 gal",         blurb_pt: "Preparador de superfície, 1 gal", unit: "jug",  price: 31.00, stock: "in" },
  { sku: "SZ-ROLL",   cat: "tools",    name: "Spiked Roller — 9 in",     blurb_en: "De-airing spike roller",            blurb_pt: "Rolo de pregos 9 pol", unit: "each", price: 42.00, stock: "in" },
  { sku: "SZ-SQGE",   cat: "tools",    name: "Notched Squeegee — 24 in", blurb_en: "Adjustable epoxy squeegee",         blurb_pt: "Rodo dentado 24 pol", unit: "each", price: 58.00, stock: "in" },
  { sku: "SZ-PAD",    cat: "tools",    name: "Mixing Paddle",            blurb_en: "Heavy-duty drill paddle",           blurb_pt: "Misturador para furadeira", unit: "each", price: 24.00, stock: "in" },
  { sku: "SZ-KIT-PPE",cat: "tools",    name: "Spiked Shoes (pair)",      blurb_en: "Resin application spiked shoes",    blurb_pt: "Sapatos de pregos (par)", unit: "pair", price: 36.00, stock: "low" }
];

// this contractor's frequent items -> "quick reorder"
const USUAL_ORDER = ["SZ-AC100", "SZ-EP01", "SZ-PA70", "SZ-FLK25"];

const I18N = {
  en: {
    nav_products: "Products", nav_calc: "Coverage calculator", nav_account: "My account",
    hero_kicker: "Contractor supply · Central Florida",
    hero_title: "Sealers, epoxy & coatings — now order online, anytime.",
    hero_sub: "The same contractor pricing you get at the counter, without waiting for the 7:30–2:00 window. Place an order tonight, pick it up tomorrow.",
    hero_cta: "Browse products",
    calc_title: "Coverage calculator",
    calc_sub: "How much epoxy for the job?",
    calc_area: "Floor area (sq ft)", calc_mil: "Coat thickness (mils)",
    calc_btn: "Calculate gallons", calc_result: "You'll need about",
    calc_gal: "gallons", calc_kits: "≈ {n} ArmorCoat kits (3 gal each)",
    calc_add: "Add kits to order",
    trust_1: "Order 24/7 online", trust_2: "Contractor & volume pricing", trust_3: "Tax-exempt accounts",
    cat_title: "Products", logged_as: "Signed in as", tier_pricing: "{tier} pricing active",
    list: "List", you: "You", add: "Add to order", added: "Added",
    instock: "In stock", lowstock: "Low stock", outstock: "Out of stock",
    usual_title: "Your usual order", usual_sub: "One tap to reorder what you buy most.",
    reorder: "Add all to order",
    cart_title: "Your order", cart_empty: "No items yet. Add products to build your order.",
    subtotal: "Subtotal", savings: "Contractor savings", tax: "Tax", tax_exempt: "Exempt",
    total: "Estimated total", checkout: "Submit order for pickup", continue: "Keep shopping",
    qty: "Qty", remove: "Remove", pickup_note: "We'll text you when it's packed and ready.",
    submitted_title: "Order submitted", submitted_sub: "Sealer Zone will confirm by text shortly. This is a demo — no real order was placed."
  },
  pt: {
    nav_products: "Produtos", nav_calc: "Calculadora de cobertura", nav_account: "Minha conta",
    hero_kicker: "Fornecedor para empreiteiros · Flórida Central",
    hero_title: "Seladores, epóxi e revestimentos — agora peça online, a qualquer hora.",
    hero_sub: "O mesmo preço de empreiteiro do balcão, sem esperar o horário das 7:30 às 14:00. Faça o pedido hoje à noite e retire amanhã.",
    hero_cta: "Ver produtos",
    calc_title: "Calculadora de cobertura",
    calc_sub: "Quanto epóxi para o serviço?",
    calc_area: "Área do piso (pés²)", calc_mil: "Espessura (mils)",
    calc_btn: "Calcular galões", calc_result: "Você vai precisar de aproximadamente",
    calc_gal: "galões", calc_kits: "≈ {n} kits ArmorCoat (3 gal cada)",
    calc_add: "Adicionar kits ao pedido",
    trust_1: "Peça online 24h", trust_2: "Preço de empreiteiro e volume", trust_3: "Contas isentas de imposto",
    cat_title: "Produtos", logged_as: "Conectado como", tier_pricing: "Preço {tier} ativo",
    list: "Tabela", you: "Você", add: "Adicionar", added: "Adicionado",
    instock: "Em estoque", lowstock: "Estoque baixo", outstock: "Esgotado",
    usual_title: "Seu pedido habitual", usual_sub: "Um toque para repetir o que você mais compra.",
    reorder: "Adicionar tudo",
    cart_title: "Seu pedido", cart_empty: "Nenhum item ainda. Adicione produtos ao pedido.",
    subtotal: "Subtotal", savings: "Economia de empreiteiro", tax: "Imposto", tax_exempt: "Isento",
    total: "Total estimado", checkout: "Enviar pedido para retirada", continue: "Continuar comprando",
    qty: "Qtd", remove: "Remover", pickup_note: "Avisaremos por mensagem quando estiver pronto.",
    submitted_title: "Pedido enviado", submitted_sub: "A Sealer Zone confirmará por mensagem em breve. Demonstração — nenhum pedido real foi feito."
  }
};
