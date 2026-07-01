/* Sealer Zone CRM — demo seed data (expanded for detail pages) */

const CUSTOMERS = [
  { id:"C-1027", company:"Silva Concrete Coatings", contact:"João Silva", lang:"PT", tier:"Gold", taxExempt:true, ltv:48250, orders:64, last:"2 days ago", balance:1240.50, phone:"(407) 555-0142", email:"joao@silvacoatings.com", since:"2019", aov:754,
    spend:[2.1,3.4,2.8,4.1,3.2,5.0,4.4,3.8,4.9,5.6,4.2,5.3], notes:[{t:"Prefers Portuguese for all quotes and texts.",w:"Counter",d:"Mar 2026"},{t:"Buys ArmorCoat + flake in bulk monthly — good upsell on polyaspartic.",w:"Counter",d:"Jan 2026"}] },
  { id:"C-1031", company:"Oliveira Epoxy Floors", contact:"Marcos Oliveira", lang:"PT", tier:"Silver", taxExempt:true, ltv:31180, orders:41, last:"5 days ago", balance:0, phone:"(407) 555-0177", email:"marcos@oliveiraepoxy.com", since:"2020", aov:760,
    spend:[1.8,2.2,2.0,2.6,3.1,2.4,2.9,3.3,2.7,3.0,3.4,2.8], notes:[{t:"Pays on pickup, never on terms.",w:"Counter",d:"Feb 2026"}] },
  { id:"C-1009", company:"Costa Surface Solutions", contact:"Ana Costa", lang:"EN", tier:"Gold", taxExempt:true, ltv:52940, orders:73, last:"yesterday", balance:2980.00, phone:"(321) 555-0119", email:"ana@costasurface.com", since:"2018", aov:725,
    spend:[3.0,3.5,4.0,3.8,4.5,4.1,5.2,4.8,5.0,5.4,5.1,4.6], notes:[{t:"Largest commercial accounts — warehouses. Net-30 terms approved.",w:"Owner",d:"Dec 2025"}] },
  { id:"C-1044", company:"Pereira Garage Floors", contact:"Bruno Pereira", lang:"PT", tier:"Bronze", taxExempt:false, ltv:9870, orders:18, last:"3 weeks ago", balance:0, phone:"(407) 555-0203", email:"bruno@pereiragarage.com", since:"2023", aov:548,
    spend:[0.4,0.6,0.9,0.7,1.1,0.8,1.0,1.2,0.9,1.3,0.7,1.0], notes:[] },
  { id:"C-1052", company:"Santos Decorative Concrete", contact:"Tiago Santos", lang:"PT", tier:"Silver", taxExempt:true, ltv:27600, orders:38, last:"1 week ago", balance:430.00, phone:"(386) 555-0188", email:"tiago@santosdecor.com", since:"2021", aov:726,
    spend:[1.5,1.9,2.2,2.0,2.4,2.1,2.6,2.3,2.7,2.5,2.8,2.4], notes:[{t:"Interested in metallic epoxy systems — send new color cards.",w:"Counter",d:"Feb 2026"}] },
  { id:"C-1063", company:"Almeida Industrial Coatings", contact:"Rafael Almeida", lang:"EN", tier:"Gold", taxExempt:true, ltv:61420, orders:81, last:"today", balance:5120.75, phone:"(813) 555-0150", email:"rafael@almeidaind.com", since:"2017", aov:758,
    spend:[4.2,4.8,5.1,4.9,5.6,5.3,6.0,5.8,6.2,6.5,5.9,6.3], notes:[{t:"Top account. Always confirm stock before promising lead time.",w:"Owner",d:"Nov 2025"},{t:"Runs large industrial jobs — orders 6+ ArmorCoat kits at a time.",w:"Counter",d:"Jan 2026"}] },
  { id:"C-1071", company:"Sunshine State Garage Pros", contact:"Mike Dolan", lang:"EN", tier:"Bronze", taxExempt:false, ltv:6240, orders:11, last:"2 months ago", balance:0, phone:"(407) 555-0291", email:"mike@sunshinegarage.com", since:"2024", aov:567,
    spend:[0.3,0.5,0.4,0.7,0.6,0.5,0.8,0.4,0.6,0.5,0.3,0.4], notes:[{t:"Newer account, slowing down — worth a check-in call.",w:"Counter",d:"Mar 2026"}] },
  { id:"C-1078", company:"Ferreira Flooring", contact:"Lucas Ferreira", lang:"PT", tier:"Silver", taxExempt:true, ltv:22150, orders:33, last:"4 days ago", balance:865.20, phone:"(321) 555-0244", email:"lucas@ferreiraflooring.com", since:"2021", aov:671,
    spend:[1.2,1.6,1.4,1.9,1.7,2.0,1.8,2.1,1.9,2.2,2.0,1.8], notes:[] },
  { id:"C-1085", company:"Tampa Bay Coatings", contact:"Dana Reyes", lang:"EN", tier:"Bronze", taxExempt:false, ltv:4115, orders:7, last:"6 weeks ago", balance:0, phone:"(813) 555-0312", email:"dana@tampabaycoatings.com", since:"2025", aov:588,
    spend:[0.0,0.0,0.3,0.5,0.6,0.4,0.7,0.5,0.6,0.4,0.5,0.6], notes:[] },
  { id:"C-1090", company:"Rocha Resinous Floors", contact:"Pedro Rocha", lang:"PT", tier:"Gold", taxExempt:true, ltv:44980, orders:59, last:"2 days ago", balance:1750.00, phone:"(407) 555-0358", email:"pedro@rocharesin.com", since:"2019", aov:762,
    spend:[3.2,3.6,3.9,3.7,4.3,4.0,4.6,4.2,4.8,4.5,4.9,4.4], notes:[{t:"Reliable Gold account. Frequently reorders primer + topcoat together.",w:"Counter",d:"Jan 2026"}] }
];

const STAGES = [
  { id:"quote",  label:"Quote" },
  { id:"packing",label:"Packing" },
  { id:"ready",  label:"Ready for pickup" },
  { id:"done",   label:"Picked up" }
];

// active orders (pipeline) + line items
const ORDERS = [
  { id:"#4821", cust:"C-1063", company:"Almeida Industrial Coatings", total:5120.75, items:7, stage:"packing", age:"3h", placed:"Today, 9:14 AM",
    lines:[["ArmorCoat 100% Solids Kit",12,210.80],["Epoxy Primer Coat",6,117.30],["Vinyl Flake Media (25 lb)",8,81.60],["Polyaspartic Topcoat",2,265.20]] },
  { id:"#4820", cust:"C-1009", company:"Costa Surface Solutions", total:2980.00, items:5, stage:"ready", age:"6h", placed:"Today, 6:02 AM",
    lines:[["Polyaspartic Topcoat",6,265.20],["Spiked Roller — 9 in",3,35.70],["Notched Squeegee — 24 in",2,49.30]] },
  { id:"#4819", cust:"C-1027", company:"Silva Concrete Coatings", total:1240.50, items:4, stage:"quote", age:"1d", placed:"Yesterday, 7:48 PM",
    lines:[["ArmorCoat 100% Solids Kit",4,210.80],["Epoxy Primer Coat",2,117.30]] },
  { id:"#4818", cust:"C-1078", company:"Ferreira Flooring", total:865.20, items:3, stage:"packing", age:"1d", placed:"Yesterday, 11:20 AM",
    lines:[["AquaSeal Pro 5000",3,160.65],["Heavy-Duty Degreaser",4,23.80]] },
  { id:"#4817", cust:"C-1052", company:"Santos Decorative Concrete", total:430.00, items:2, stage:"ready", age:"2d", placed:"Jun 26, 2:30 PM",
    lines:[["Vinyl Flake Media (25 lb)",3,81.60],["Surface Etch & Prep",4,26.35]] },
  { id:"#4816", cust:"C-1090", company:"Rocha Resinous Floors", total:1750.00, items:6, stage:"done", age:"2d", placed:"Jun 26, 8:05 AM",
    lines:[["Epoxy Primer Coat",5,117.30],["Polyaspartic Topcoat",4,265.20]] },
  { id:"#4815", cust:"C-1031", company:"Oliveira Epoxy Floors", total:610.00, items:3, stage:"done", age:"3d", placed:"Jun 25, 1:12 PM",
    lines:[["AquaSeal Pro 5000",2,160.65],["WetLook Acrylic Sealer",1,139.40]] }
];

// short per-customer history for the account detail page
const HISTORY = {
  "C-1027":[["#4819","Jun 27, 2026",1240.50],["#4788","Jun 14, 2026",1018.30],["#4761","May 30, 2026",642.60],["#4733","May 12, 2026",1330.50]],
  "C-1063":[["#4821","Jun 28, 2026",5120.75],["#4790","Jun 15, 2026",3980.00],["#4759","Jun 1, 2026",4210.50],["#4721","May 18, 2026",2875.00]],
  "C-1009":[["#4820","Jun 28, 2026",2980.00],["#4782","Jun 12, 2026",3120.00],["#4744","May 28, 2026",2640.00]],
  "C-1090":[["#4816","Jun 26, 2026",1750.00],["#4778","Jun 10, 2026",1420.00],["#4740","May 25, 2026",1980.00]]
};

const TIER_BADGE = { Gold:"badge-amber", Silver:"badge-slate", Bronze:"badge-slate" };
