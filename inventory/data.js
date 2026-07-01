/* Sealer Zone inventory — demo seed data (expanded for detail + receiving) */

const STOCK = [
  { sku:"SZ-AS5000", name:"AquaSeal Pro 5000", cat:"Sealers", unit:"pail", onHand:34, reorder:20, vel:6.5, cost:118, supplier:"Coastal Chemical Co.", lead:"5 days", trend:[5,6,7,6,8,6,7,7],
    log:[["Sold","−4","Jun 27"],["Sold","−3","Jun 26"],["Received","+24","Jun 22"],["Sold","−5","Jun 21"],["Sold","−2","Jun 20"]] },
  { sku:"SZ-WL100", name:"WetLook Acrylic Sealer", cat:"Sealers", unit:"pail", onHand:22, reorder:16, vel:4.0, cost:101, supplier:"Coastal Chemical Co.", lead:"5 days", trend:[3,4,4,5,3,4,4,5],
    log:[["Sold","−2","Jun 27"],["Sold","−1","Jun 25"],["Received","+18","Jun 20"],["Sold","−3","Jun 19"]] },
  { sku:"SZ-DEN20", name:"LithiHard Densifier", cat:"Sealers", unit:"pail", onHand:9, reorder:12, vel:3.5, cost:88, supplier:"Coastal Chemical Co.", lead:"5 days", trend:[3,4,3,4,4,3,4,4],
    log:[["Sold","−2","Jun 27"],["Sold","−2","Jun 24"],["Sold","−3","Jun 22"],["Received","+12","Jun 14"]] },
  { sku:"SZ-AC100", name:"ArmorCoat 100% Solids Kit", cat:"Epoxy", unit:"kit", onHand:48, reorder:24, vel:11.0, cost:152, supplier:"Apex Resins Mfg.", lead:"7 days", trend:[9,10,12,11,13,10,12,11],
    log:[["Sold","−12","Jun 28"],["Sold","−6","Jun 27"],["Received","+36","Jun 23"],["Sold","−9","Jun 22"],["Sold","−7","Jun 21"]] },
  { sku:"SZ-PA70", name:"Polyaspartic Topcoat", cat:"Epoxy", unit:"kit", onHand:15, reorder:14, vel:5.5, cost:198, supplier:"Apex Resins Mfg.", lead:"7 days", trend:[4,5,6,5,7,5,6,6],
    log:[["Sold","−6","Jun 28"],["Sold","−2","Jun 26"],["Received","+18","Jun 20"],["Sold","−4","Jun 19"]] },
  { sku:"SZ-EP01", name:"Epoxy Primer Coat", cat:"Epoxy", unit:"kit", onHand:31, reorder:18, vel:7.0, cost:84, supplier:"Apex Resins Mfg.", lead:"7 days", trend:[6,7,7,8,6,7,8,7],
    log:[["Sold","−6","Jun 28"],["Sold","−5","Jun 26"],["Received","+24","Jun 21"],["Sold","−3","Jun 20"]] },
  { sku:"SZ-FLK25", name:"Vinyl Flake Media (25 lb)", cat:"Epoxy", unit:"box", onHand:7, reorder:15, vel:6.0, cost:58, supplier:"DecoFlake Supply", lead:"10 days", trend:[5,6,6,7,5,6,7,6],
    log:[["Sold","−8","Jun 28"],["Sold","−3","Jun 26"],["Sold","−4","Jun 24"],["Received","+20","Jun 16"]] },
  { sku:"SZ-PSG50", name:"PolyBond Sand — Grey", cat:"Sand", unit:"bag", onHand:64, reorder:30, vel:9.0, cost:22, supplier:"Gulf Hardscape Dist.", lead:"4 days", trend:[8,9,9,10,8,9,10,9],
    log:[["Sold","−5","Jun 27"],["Received","+48","Jun 24"],["Sold","−9","Jun 23"],["Sold","−7","Jun 22"]] },
  { sku:"SZ-PST50", name:"PolyBond Sand — Tan", cat:"Sand", unit:"bag", onHand:0, reorder:30, vel:8.5, cost:22, supplier:"Gulf Hardscape Dist.", lead:"4 days", trend:[8,9,8,9,8,9,8,9],
    log:[["Sold","−6","Jun 26"],["Sold","−8","Jun 24"],["Sold","−9","Jun 22"],["Stockout","0","Jun 26"]] },
  { sku:"SZ-DEG01", name:"Heavy-Duty Degreaser", cat:"Cleaning", unit:"jug", onHand:41, reorder:20, vel:5.0, cost:16, supplier:"Coastal Chemical Co.", lead:"5 days", trend:[4,5,5,6,4,5,5,5],
    log:[["Sold","−4","Jun 27"],["Received","+30","Jun 23"],["Sold","−5","Jun 22"]] },
  { sku:"SZ-EFF01", name:"Efflorescence Remover", cat:"Cleaning", unit:"jug", onHand:18, reorder:15, vel:3.0, cost:20, supplier:"Coastal Chemical Co.", lead:"5 days", trend:[2,3,3,4,3,3,3,3],
    log:[["Sold","−2","Jun 26"],["Sold","−1","Jun 24"],["Received","+15","Jun 18"]] },
  { sku:"SZ-ETCH", name:"Surface Etch & Prep", cat:"Cleaning", unit:"jug", onHand:26, reorder:14, vel:3.5, cost:18, supplier:"Coastal Chemical Co.", lead:"5 days", trend:[3,4,3,4,4,3,4,4],
    log:[["Sold","−4","Jun 27"],["Received","+20","Jun 22"],["Sold","−3","Jun 21"]] },
  { sku:"SZ-ROLL", name:"Spiked Roller — 9 in", cat:"Tools", unit:"each", onHand:12, reorder:10, vel:2.0, cost:24, supplier:"ProTool Wholesale", lead:"6 days", trend:[2,2,3,2,2,3,2,2],
    log:[["Sold","−3","Jun 28"],["Sold","−1","Jun 25"],["Received","+12","Jun 19"]] },
  { sku:"SZ-SQGE", name:"Notched Squeegee — 24 in", cat:"Tools", unit:"each", onHand:5, reorder:8, vel:2.5, cost:33, supplier:"ProTool Wholesale", lead:"6 days", trend:[2,3,2,3,2,3,2,3],
    log:[["Sold","−2","Jun 28"],["Sold","−2","Jun 26"],["Sold","−3","Jun 24"],["Received","+10","Jun 17"]] },
  { sku:"SZ-PAD", name:"Mixing Paddle", cat:"Tools", unit:"each", onHand:19, reorder:10, vel:1.5, cost:13, supplier:"ProTool Wholesale", lead:"6 days", trend:[1,2,1,2,2,1,2,1],
    log:[["Sold","−1","Jun 26"],["Received","+15","Jun 20"],["Sold","−2","Jun 18"]] },
  { sku:"SZ-KIT-PPE", name:"Spiked Shoes (pair)", cat:"Tools", unit:"pair", onHand:6, reorder:8, vel:2.0, cost:21, supplier:"ProTool Wholesale", lead:"6 days", trend:[2,2,3,2,2,2,3,2],
    log:[["Sold","−2","Jun 27"],["Sold","−1","Jun 25"],["Received","+8","Jun 19"]] }
];

const CATS = ["Sealers","Epoxy","Sand","Cleaning","Tools"];
const TARGET_WEEKS = 4; // reorder target: keep ~4 weeks of cover
