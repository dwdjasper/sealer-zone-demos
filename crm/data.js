/* Sealer Zone CRM — demo seed data */

const CUSTOMERS = [
  { id:"C-1027", company:"Silva Concrete Coatings", contact:"João Silva",   lang:"PT", tier:"Gold",   taxExempt:true,  ltv:48250, orders:64, last:"2 days ago",  balance:1240.50, phone:"(407) 555-0142" },
  { id:"C-1031", company:"Oliveira Epoxy Floors",   contact:"Marcos Oliveira",lang:"PT", tier:"Silver", taxExempt:true,  ltv:31180, orders:41, last:"5 days ago",  balance:0,        phone:"(407) 555-0177" },
  { id:"C-1009", company:"Costa Surface Solutions",  contact:"Ana Costa",     lang:"EN", tier:"Gold",   taxExempt:true,  ltv:52940, orders:73, last:"yesterday",  balance:2980.00, phone:"(321) 555-0119" },
  { id:"C-1044", company:"Pereira Garage Floors",    contact:"Bruno Pereira", lang:"PT", tier:"Bronze", taxExempt:false, ltv:9870,  orders:18, last:"3 weeks ago", balance:0,        phone:"(407) 555-0203" },
  { id:"C-1052", company:"Santos Decorative Concrete",contact:"Tiago Santos", lang:"PT", tier:"Silver", taxExempt:true,  ltv:27600, orders:38, last:"1 week ago",  balance:430.00,   phone:"(386) 555-0188" },
  { id:"C-1063", company:"Almeida Industrial Coatings",contact:"Rafael Almeida",lang:"EN",tier:"Gold",  taxExempt:true,  ltv:61420, orders:81, last:"today",      balance:5120.75, phone:"(813) 555-0150" },
  { id:"C-1071", company:"Sunshine State Garage Pros",contact:"Mike Dolan",   lang:"EN", tier:"Bronze", taxExempt:false, ltv:6240,  orders:11, last:"2 months ago",balance:0,        phone:"(407) 555-0291" },
  { id:"C-1078", company:"Ferreira Flooring",        contact:"Lucas Ferreira",lang:"PT", tier:"Silver", taxExempt:true,  ltv:22150, orders:33, last:"4 days ago",  balance:865.20,   phone:"(321) 555-0244" },
  { id:"C-1085", company:"Tampa Bay Coatings",       contact:"Dana Reyes",    lang:"EN", tier:"Bronze", taxExempt:false, ltv:4115,  orders:7,  last:"6 weeks ago", balance:0,        phone:"(813) 555-0312" },
  { id:"C-1090", company:"Rocha Resinous Floors",    contact:"Pedro Rocha",   lang:"PT", tier:"Gold",   taxExempt:true,  ltv:44980, orders:59, last:"2 days ago",  balance:1750.00, phone:"(407) 555-0358" }
];

// fulfillment pipeline stages
const STAGES = [
  { id:"quote",  label:"Quote" },
  { id:"packing",label:"Packing" },
  { id:"ready",  label:"Ready for pickup" },
  { id:"done",   label:"Picked up" }
];

const ORDERS = [
  { id:"#4821", cust:"C-1063", company:"Almeida Industrial Coatings", total:5120.75, items:7, stage:"packing", age:"3h", note:"Bulk ArmorCoat + flake" },
  { id:"#4820", cust:"C-1009", company:"Costa Surface Solutions",     total:2980.00, items:5, stage:"ready",   age:"6h", note:"Polyaspartic restock" },
  { id:"#4819", cust:"C-1027", company:"Silva Concrete Coatings",     total:1240.50, items:4, stage:"quote",   age:"1d", note:"Awaiting confirm" },
  { id:"#4818", cust:"C-1078", company:"Ferreira Flooring",           total:865.20,  items:3, stage:"packing", age:"1d", note:"Sealer + degreaser" },
  { id:"#4817", cust:"C-1052", company:"Santos Decorative Concrete",  total:430.00,  items:2, stage:"ready",   age:"2d", note:"Pickup Fri AM" },
  { id:"#4816", cust:"C-1090", company:"Rocha Resinous Floors",       total:1750.00, items:6, stage:"done",    age:"2d", note:"Completed" },
  { id:"#4815", cust:"C-1031", company:"Oliveira Epoxy Floors",       total:610.00,  items:3, stage:"done",    age:"3d", note:"Completed" }
];

const TIER_BADGE = { Gold:"badge-amber", Silver:"badge-slate", Bronze:"badge-slate" };
