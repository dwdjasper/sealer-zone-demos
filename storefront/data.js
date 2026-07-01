/* Sealer Zone storefront — demo seed data (expanded for detail pages) */

const ACCOUNT = {
  company: "Silva Concrete Coatings",
  contact: "João Silva",
  tier: "Gold",            // Gold = 15% contractor discount in this demo
  discount: 0.15,
  taxExempt: true,
  lang: "en"
};

// discount by tier (used on product detail pricing table)
const TIERS = [
  { name: "List",   disc: 0.0 },
  { name: "Bronze", disc: 0.05 },
  { name: "Silver", disc: 0.10 },
  { name: "Gold",   disc: 0.15 }
];

const CATEGORIES = [
  { id: "all",       en: "All products",      pt: "Todos os produtos" },
  { id: "sealers",   en: "Concrete sealers",  pt: "Seladores" },
  { id: "epoxy",     en: "Floor epoxy",       pt: "Epóxi para piso" },
  { id: "sand",      en: "Polymeric sand",    pt: "Areia polimérica" },
  { id: "cleaning",  en: "Cleaning chemicals",pt: "Produtos de limpeza" },
  { id: "tools",     en: "Tools & accessories", pt: "Ferramentas" }
];

// coverage = sq ft per unit (for inline estimate on detail page; null = n/a)
const PRODUCTS = [
  { sku:"SZ-AS5000", cat:"sealers", name:"AquaSeal Pro 5000", blurb_en:"Penetrating concrete sealer, 5 gal", blurb_pt:"Selador penetrante, 5 gal", unit:"pail", price:189.00, stock:"in", coverage:1000,
    desc_en:"Water-based penetrating silane/siloxane sealer for concrete and pavers. Invisible finish, breathable, and resistant to salt, water, and freeze-thaw. Ideal for driveways, walkways, and exterior slabs.",
    desc_pt:"Selador penetrante à base de água para concreto e pavers. Acabamento invisível, respirável e resistente a sal, água e ciclos de congelamento.",
    specs:[["Coverage","800–1,000 sq ft / pail"],["Cure time","2–4 hrs to recoat"],["Finish","Invisible / matte"],["VOC","< 100 g/L"],["Base","Water-based silane"]] },
  { sku:"SZ-WL100", cat:"sealers", name:"WetLook Acrylic Sealer", blurb_en:"High-gloss wet-look, 5 gal", blurb_pt:"Acrílico brilho molhado, 5 gal", unit:"pail", price:164.00, stock:"in", coverage:900,
    desc_en:"Solvent-based acrylic sealer that gives concrete and pavers a rich, glossy wet look while protecting against UV and stains. Re-coatable and easy to maintain.",
    desc_pt:"Selador acrílico à base de solvente que dá um aspecto molhado brilhante ao concreto, protegendo contra UV e manchas.",
    specs:[["Coverage","700–900 sq ft / pail"],["Cure time","4–6 hrs"],["Finish","High gloss"],["VOC","350 g/L"],["Base","Solvent acrylic"]] },
  { sku:"SZ-DEN20", cat:"sealers", name:"LithiHard Densifier", blurb_en:"Lithium hardener/densifier, 5 gal", blurb_pt:"Endurecedor de lítio, 5 gal", unit:"pail", price:142.00, stock:"low", coverage:1200,
    desc_en:"Lithium-silicate densifier that hardens and dustproofs concrete, increasing abrasion resistance for polished and high-traffic floors.",
    desc_pt:"Densificador de silicato de lítio que endurece e elimina poeira do concreto, aumentando a resistência à abrasão.",
    specs:[["Coverage","1,000–1,200 sq ft / pail"],["Cure time","Penetrates in 30 min"],["Finish","Natural"],["VOC","0 g/L"],["Base","Lithium silicate"]] },
  { sku:"SZ-AC100", cat:"epoxy", name:"ArmorCoat 100% Solids Kit", blurb_en:"2-part epoxy kit, 3 gal coverage", blurb_pt:"Kit epóxi 2 partes, 3 gal", unit:"kit", price:248.00, stock:"in", coverage:480,
    desc_en:"Two-part 100% solids epoxy for garage and warehouse floors. High build, chemical-resistant, and compatible with flake or quartz broadcast. Each kit covers ~480 sq ft at 10 mils.",
    desc_pt:"Epóxi 100% sólidos de duas partes para pisos de garagem e galpão. Alta espessura, resistente a químicos.",
    specs:[["Coverage","~480 sq ft @ 10 mil"],["Mix ratio","2A : 1B"],["Pot life","40 min @ 75°F"],["Recoat","12–16 hrs"],["Solids","100%"]] },
  { sku:"SZ-PA70", cat:"epoxy", name:"Polyaspartic Topcoat", blurb_en:"Fast-cure UV-stable topcoat, 2 gal", blurb_pt:"Verniz poliaspártico, 2 gal", unit:"kit", price:312.00, stock:"in", coverage:600,
    desc_en:"Fast-cure, UV-stable polyaspartic topcoat for floors that need same-day return to service. Non-yellowing, abrasion-resistant, great over flake systems.",
    desc_pt:"Verniz poliaspártico de cura rápida e estável a UV, para retorno ao uso no mesmo dia. Não amarela.",
    specs:[["Coverage","~600 sq ft / kit"],["Mix ratio","1A : 1B"],["Pot life","20 min"],["Return to service","Same day"],["UV stable","Yes"]] },
  { sku:"SZ-EP01", cat:"epoxy", name:"Epoxy Primer Coat", blurb_en:"Moisture-tolerant primer, 2 gal", blurb_pt:"Primer epóxi, 2 gal", unit:"kit", price:138.00, stock:"in", coverage:640,
    desc_en:"Moisture-tolerant epoxy primer that promotes adhesion on green or damp concrete. The foundation coat for a long-lasting floor system.",
    desc_pt:"Primer epóxi tolerante à umidade que promove aderência em concreto úmido.",
    specs:[["Coverage","~640 sq ft / kit"],["Mix ratio","2A : 1B"],["Pot life","45 min"],["Recoat","10–14 hrs"],["Moisture","Tolerant to 12 lbs"]] },
  { sku:"SZ-FLK25", cat:"epoxy", name:"Vinyl Flake Media (25 lb)", blurb_en:"Decorative broadcast flakes, box", blurb_pt:"Flocos decorativos, caixa", unit:"box", price:96.00, stock:"low", coverage:null,
    desc_en:"1/4\" vinyl color flakes for broadcast into epoxy floors. Adds grip, hides imperfections, and gives a decorative terrazzo look. Multiple blends available.",
    desc_pt:"Flocos de vinil de 1/4\" para aplicação em pisos epóxi. Adiciona aderência e visual decorativo.",
    specs:[["Box weight","25 lb"],["Flake size","1/4 inch"],["Coverage","Full broadcast: 250–350 sq ft"],["Blends","12 colors"],["Use","Broadcast into base"]] },
  { sku:"SZ-PSG50", cat:"sand", name:"PolyBond Sand — Grey", blurb_en:"Polymeric joint sand, 50 lb", blurb_pt:"Areia polimérica cinza, 50 lb", unit:"bag", price:38.50, stock:"in", coverage:null,
    desc_en:"Polymeric jointing sand for pavers. Hardens with water to lock joints, resist weeds and washout. Grey blend for natural stone and concrete pavers.",
    desc_pt:"Areia polimérica para juntas de pavers. Endurece com água, resiste a ervas daninhas.",
    specs:[["Bag weight","50 lb"],["Coverage","30–60 sq ft (joint dependent)"],["Joint width","Up to 4 in"],["Color","Grey"],["Set","Activates with water"]] },
  { sku:"SZ-PST50", cat:"sand", name:"PolyBond Sand — Tan", blurb_en:"Polymeric joint sand, 50 lb", blurb_pt:"Areia polimérica bege, 50 lb", unit:"bag", price:38.50, stock:"out", coverage:null,
    desc_en:"Polymeric jointing sand for pavers in a tan blend. Hardens with water to lock joints, resist weeds and washout.",
    desc_pt:"Areia polimérica para juntas de pavers, cor bege. Endurece com água.",
    specs:[["Bag weight","50 lb"],["Coverage","30–60 sq ft (joint dependent)"],["Joint width","Up to 4 in"],["Color","Tan"],["Set","Activates with water"]] },
  { sku:"SZ-DEG01", cat:"cleaning", name:"Heavy-Duty Degreaser", blurb_en:"Concentrate, 1 gal", blurb_pt:"Desengordurante, 1 gal", unit:"jug", price:28.00, stock:"in", coverage:null,
    desc_en:"Industrial concentrate that strips oil, grease, and tire marks from concrete before coating. Dilutes up to 1:10.",
    desc_pt:"Concentrado industrial que remove óleo e graxa do concreto antes do revestimento.",
    specs:[["Size","1 gal concentrate"],["Dilution","Up to 1:10"],["Use","Pre-coat prep"],["Biodegradable","Yes"],["pH","11.5"]] },
  { sku:"SZ-EFF01", cat:"cleaning", name:"Efflorescence Remover", blurb_en:"Acid-free cleaner, 1 gal", blurb_pt:"Removedor de eflorescência, 1 gal", unit:"jug", price:34.00, stock:"in", coverage:null,
    desc_en:"Acid-free cleaner that removes efflorescence and mineral haze from concrete and pavers without etching the surface.",
    desc_pt:"Limpador sem ácido que remove eflorescência sem corroer a superfície.",
    specs:[["Size","1 gal"],["Coverage","200–300 sq ft"],["Acid-free","Yes"],["Use","Spot or full"],["Rinse","Water"]] },
  { sku:"SZ-ETCH", cat:"cleaning", name:"Surface Etch & Prep", blurb_en:"Concrete prep wash, 1 gal", blurb_pt:"Preparador de superfície, 1 gal", unit:"jug", price:31.00, stock:"in", coverage:null,
    desc_en:"Etching and profiling wash that opens the concrete pores for maximum coating adhesion. Safer alternative to muriatic acid.",
    desc_pt:"Solução de ataque que abre os poros do concreto para máxima aderência.",
    specs:[["Size","1 gal"],["Coverage","250–400 sq ft"],["Profile","CSP 1–2"],["Use","Pre-coat prep"],["Rinse","Water"]] },
  { sku:"SZ-ROLL", cat:"tools", name:"Spiked Roller — 9 in", blurb_en:"De-airing spike roller", blurb_pt:"Rolo de pregos 9 pol", unit:"each", price:42.00, stock:"in", coverage:null,
    desc_en:"9-inch spiked roller for releasing trapped air from self-leveling epoxy and metallic floors. Replaceable spike head.",
    desc_pt:"Rolo de pregos de 9 pol para liberar ar preso em pisos epóxi autonivelantes.",
    specs:[["Width","9 in"],["Spike length","1/4 in"],["Use","De-airing"],["Head","Replaceable"],["Handle","Threaded"]] },
  { sku:"SZ-SQGE", cat:"tools", name:"Notched Squeegee — 24 in", blurb_en:"Adjustable epoxy squeegee", blurb_pt:"Rodo dentado 24 pol", unit:"each", price:58.00, stock:"in", coverage:null,
    desc_en:"24-inch adjustable notched squeegee for spreading epoxy at a controlled film thickness. Swappable notched blades.",
    desc_pt:"Rodo dentado ajustável de 24 pol para espalhar epóxi com espessura controlada.",
    specs:[["Width","24 in"],["Notch","Adjustable 1/16–3/16 in"],["Use","Epoxy spread"],["Blade","Swappable"],["Frame","Aluminum"]] },
  { sku:"SZ-PAD", cat:"tools", name:"Mixing Paddle", blurb_en:"Heavy-duty drill paddle", blurb_pt:"Misturador para furadeira", unit:"each", price:24.00, stock:"in", coverage:null,
    desc_en:"Heavy-duty helical mixing paddle for blending 2-part epoxy and coatings without whipping in air.",
    desc_pt:"Misturador helicoidal para misturar epóxi de 2 partes sem incorporar ar.",
    specs:[["Length","24 in"],["Shaft","Hex 3/8 in"],["Use","2-part mixing"],["Material","Steel"],["Drill","Corded recommended"]] },
  { sku:"SZ-KIT-PPE", cat:"tools", name:"Spiked Shoes (pair)", blurb_en:"Resin application spiked shoes", blurb_pt:"Sapatos de pregos (par)", unit:"pair", price:36.00, stock:"low", coverage:null,
    desc_en:"Strap-on spiked shoes that let installers walk on wet epoxy and self-leveler without leaving marks.",
    desc_pt:"Sapatos de pregos que permitem caminhar sobre epóxi úmido sem deixar marcas.",
    specs:[["Spike length","3/4 in"],["Fit","Universal strap"],["Use","Walk on wet resin"],["Pair","2 shoes"],["Adjustable","Yes"]] }
];

// frequently-bought-with (by sku) — drives "pairs well with" on detail pages
const RELATED = {
  "SZ-AC100": ["SZ-EP01","SZ-FLK25","SZ-PA70"],
  "SZ-PA70":  ["SZ-AC100","SZ-FLK25","SZ-ROLL"],
  "SZ-EP01":  ["SZ-AC100","SZ-ETCH","SZ-PAD"],
  "SZ-FLK25": ["SZ-AC100","SZ-PA70","SZ-KIT-PPE"],
  "SZ-AS5000":["SZ-DEG01","SZ-EFF01"],
  "SZ-WL100": ["SZ-DEG01","SZ-ETCH"],
  "SZ-PSG50": ["SZ-PST50","SZ-DEG01"]
};

// this contractor's frequent items -> "quick reorder"
const USUAL_ORDER = ["SZ-AC100", "SZ-EP01", "SZ-PA70", "SZ-FLK25"];

// past orders for the My Account view
const ORDER_HISTORY = [
  { id:"#4788", date:"Jun 14, 2026", total:1018.30, items:[["SZ-AC100",3],["SZ-EP01",2],["SZ-ROLL",1]] },
  { id:"#4761", date:"May 30, 2026", total:642.60,  items:[["SZ-PA70",2],["SZ-KIT-PPE",1]] },
  { id:"#4733", date:"May 12, 2026", total:1330.50, items:[["SZ-AC100",4],["SZ-FLK25",3],["SZ-EP01",1]] },
  { id:"#4702", date:"Apr 28, 2026", total:489.60,  items:[["SZ-AS5000",2],["SZ-DEG01",4]] }
];

const I18N = {
  en: {
    nav_products:"Products", nav_calc:"Coverage calculator", nav_account:"My account",
    hero_kicker:"Contractor supply · Central Florida",
    hero_title:"Sealers, epoxy & coatings — now order online, anytime.",
    hero_sub:"The same contractor pricing you get at the counter, without waiting for the 7:30–2:00 window. Place an order tonight, pick it up tomorrow.",
    hero_cta:"Browse products",
    calc_title:"Coverage calculator", calc_sub:"How much epoxy for the job?",
    calc_area:"Floor area (sq ft)", calc_mil:"Coat thickness (mils)",
    calc_btn:"Calculate gallons", calc_result:"You'll need about", calc_gal:"gallons",
    calc_kits:"≈ {n} ArmorCoat kits (3 gal each)", calc_add:"Add kits to order",
    trust_1:"Order 24/7 online", trust_2:"Contractor & volume pricing", trust_3:"Tax-exempt accounts",
    cat_title:"Products", logged_as:"Signed in as", tier_pricing:"{tier} pricing active",
    list:"List", you:"You", add:"Add to order", added:"Added",
    instock:"In stock", lowstock:"Low stock", outstock:"Out of stock",
    usual_title:"Your usual order", usual_sub:"One tap to reorder what you buy most.", reorder:"Add all to order",
    cart_title:"Your order", cart_empty:"No items yet. Add products to build your order.",
    subtotal:"Subtotal", savings:"Contractor savings", tax:"Tax", tax_exempt:"Exempt",
    total:"Estimated total", checkout:"Review order", continue:"Keep shopping",
    qty:"Qty", remove:"Remove", pickup_note:"We'll text you when it's packed and ready.",
    search_ph:"Search products…", sort_by:"Sort", sort_featured:"Featured", sort_price_lo:"Price: low to high",
    sort_price_hi:"Price: high to low", sort_name:"Name A–Z", no_results:"No products match your search.",
    view_details:"View details", pairs:"Pairs well with", specs:"Specifications", description:"Description",
    your_price:"Your price", tier_table:"Pricing by tier", est_for_job:"Estimate for your job",
    sqft:"sq ft", coverage_note:"Covers ~{n} sq ft per {unit}", need_units:"≈ {n} {unit} for this area",
    back_products:"Back to products", in_cart:"In your order",
    co_review:"Review", co_pickup:"Pickup", co_done:"Done",
    co_title:"Review your order", co_pickup_title:"Pickup details", co_when:"Pickup day",
    co_po:"PO / job reference (optional)", co_notes:"Notes for the counter (optional)",
    co_place:"Place order", co_back:"Back", co_pickup_window:"Counter hours: Mon–Fri 7:30 AM – 2:00 PM",
    submitted_title:"Order submitted", submitted_sub:"Sealer Zone will confirm by text shortly. This is a demo — no real order was placed.",
    order_no:"Order", pickup_on:"Pickup", new_order:"Start a new order",
    acct_title:"My account", acct_sub:"Order history and account details",
    past_orders:"Past orders", reorder_btn:"Reorder", acct_details:"Account details",
    contact:"Contact", pricing_tier:"Pricing tier", tax_status:"Tax status", lang_pref:"Language"
  },
  pt: {
    nav_products:"Produtos", nav_calc:"Calculadora de cobertura", nav_account:"Minha conta",
    hero_kicker:"Fornecedor para empreiteiros · Flórida Central",
    hero_title:"Seladores, epóxi e revestimentos — agora peça online, a qualquer hora.",
    hero_sub:"O mesmo preço de empreiteiro do balcão, sem esperar o horário das 7:30 às 14:00. Faça o pedido hoje à noite e retire amanhã.",
    hero_cta:"Ver produtos",
    calc_title:"Calculadora de cobertura", calc_sub:"Quanto epóxi para o serviço?",
    calc_area:"Área do piso (pés²)", calc_mil:"Espessura (mils)",
    calc_btn:"Calcular galões", calc_result:"Você vai precisar de aproximadamente", calc_gal:"galões",
    calc_kits:"≈ {n} kits ArmorCoat (3 gal cada)", calc_add:"Adicionar kits ao pedido",
    trust_1:"Peça online 24h", trust_2:"Preço de empreiteiro e volume", trust_3:"Contas isentas de imposto",
    cat_title:"Produtos", logged_as:"Conectado como", tier_pricing:"Preço {tier} ativo",
    list:"Tabela", you:"Você", add:"Adicionar", added:"Adicionado",
    instock:"Em estoque", lowstock:"Estoque baixo", outstock:"Esgotado",
    usual_title:"Seu pedido habitual", usual_sub:"Um toque para repetir o que você mais compra.", reorder:"Adicionar tudo",
    cart_title:"Seu pedido", cart_empty:"Nenhum item ainda. Adicione produtos ao pedido.",
    subtotal:"Subtotal", savings:"Economia de empreiteiro", tax:"Imposto", tax_exempt:"Isento",
    total:"Total estimado", checkout:"Revisar pedido", continue:"Continuar comprando",
    qty:"Qtd", remove:"Remover", pickup_note:"Avisaremos por mensagem quando estiver pronto.",
    search_ph:"Buscar produtos…", sort_by:"Ordenar", sort_featured:"Destaques", sort_price_lo:"Preço: menor",
    sort_price_hi:"Preço: maior", sort_name:"Nome A–Z", no_results:"Nenhum produto encontrado.",
    view_details:"Ver detalhes", pairs:"Combina bem com", specs:"Especificações", description:"Descrição",
    your_price:"Seu preço", tier_table:"Preços por nível", est_for_job:"Estimativa para seu serviço",
    sqft:"pés²", coverage_note:"Cobre ~{n} pés² por {unit}", need_units:"≈ {n} {unit} para esta área",
    back_products:"Voltar aos produtos", in_cart:"No seu pedido",
    co_review:"Revisar", co_pickup:"Retirada", co_done:"Pronto",
    co_title:"Revise seu pedido", co_pickup_title:"Detalhes da retirada", co_when:"Dia da retirada",
    co_po:"Referência do serviço (opcional)", co_notes:"Observações para o balcão (opcional)",
    co_place:"Fazer pedido", co_back:"Voltar", co_pickup_window:"Horário: Seg–Sex 7:30 – 14:00",
    submitted_title:"Pedido enviado", submitted_sub:"A Sealer Zone confirmará por mensagem em breve. Demonstração — nenhum pedido real foi feito.",
    order_no:"Pedido", pickup_on:"Retirada", new_order:"Novo pedido",
    acct_title:"Minha conta", acct_sub:"Histórico de pedidos e detalhes da conta",
    past_orders:"Pedidos anteriores", reorder_btn:"Pedir de novo", acct_details:"Detalhes da conta",
    contact:"Contato", pricing_tier:"Nível de preço", tax_status:"Situação fiscal", lang_pref:"Idioma"
  }
};

/* Floor system presets for the System Builder (demo) */
const FLAKE_COVERAGE = 300; // sq ft per 25 lb box at full broadcast
const SYSTEMS = [
  { id:"garage", en:"Residential garage", pt:"Garagem residencial",
    blurb_en:"1-day flake floor — primer, epoxy base, full color-flake broadcast, polyaspartic topcoat.",
    blurb_pt:"Piso de flocos em 1 dia — primer, base epóxi, flocos coloridos e verniz poliaspártico.",
    coats:[["SZ-EP01",1],["SZ-AC100",1],["SZ-FLK25","broadcast"],["SZ-PA70",1]],
    tools:["SZ-ROLL","SZ-SQGE","SZ-KIT-PPE"] },
  { id:"showroom", en:"Showroom / retail", pt:"Showroom / varejo",
    blurb_en:"High-gloss display floor — primer, epoxy base, and two polyaspartic topcoats for depth.",
    blurb_pt:"Piso de alto brilho — primer, base epóxi e duas camadas de verniz para profundidade.",
    coats:[["SZ-EP01",1],["SZ-AC100",1],["SZ-PA70",2]],
    tools:["SZ-ROLL","SZ-SQGE"] },
  { id:"industrial", en:"Industrial / warehouse", pt:"Industrial / galpão",
    blurb_en:"Heavy-duty build — primer, two epoxy base coats, and a chemical-resistant topcoat.",
    blurb_pt:"Alta resistência — primer, duas camadas de base epóxi e verniz resistente a químicos.",
    coats:[["SZ-EP01",1],["SZ-AC100",2],["SZ-PA70",1]],
    tools:["SZ-ROLL","SZ-SQGE","SZ-PAD"] }
];

I18N.en.builder_nav="System builder";
I18N.en.builder_title="Floor system builder";
I18N.en.builder_sub="Tell us the job. We'll size the whole system — primer, base, flake, topcoat, and tools — and price it at your contractor rate.";
I18N.en.builder_area="Job size (sq ft)";
I18N.en.builder_pick="Pick a system";
I18N.en.builder_bom="Your bill of materials";
I18N.en.builder_add="Add whole system to order";
I18N.en.builder_coats="coats"; I18N.en.builder_broadcast="full broadcast"; I18N.en.builder_tools="tools";
I18N.en.builder_none="Enter a job size and pick a system to build the materials list.";
I18N.pt.builder_nav="Montar sistema";
I18N.pt.builder_title="Montador de sistema de piso";
I18N.pt.builder_sub="Diga o serviço. Calculamos o sistema inteiro — primer, base, flocos, verniz e ferramentas — no seu preço de empreiteiro.";
I18N.pt.builder_area="Tamanho do serviço (pés²)";
I18N.pt.builder_pick="Escolha um sistema";
I18N.pt.builder_bom="Sua lista de materiais";
I18N.pt.builder_add="Adicionar sistema inteiro ao pedido";
I18N.pt.builder_coats="demãos"; I18N.pt.builder_broadcast="cobertura total"; I18N.pt.builder_tools="ferramentas";
I18N.pt.builder_none="Informe o tamanho e escolha um sistema para montar a lista.";
