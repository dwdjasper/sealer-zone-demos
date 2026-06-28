/* Sealer Zone inventory — demo seed data
   onHand: units in stock   reorder: reorder point   vel: avg units sold / week
   cost: unit cost (for inventory valuation) */

const STOCK = [
  { sku:"SZ-AS5000", name:"AquaSeal Pro 5000",        cat:"Sealers",  unit:"pail", onHand:34, reorder:20, vel:6.5,  cost:118 },
  { sku:"SZ-WL100",  name:"WetLook Acrylic Sealer",   cat:"Sealers",  unit:"pail", onHand:22, reorder:16, vel:4.0,  cost:101 },
  { sku:"SZ-DEN20",  name:"LithiHard Densifier",      cat:"Sealers",  unit:"pail", onHand:9,  reorder:12, vel:3.5,  cost:88  },
  { sku:"SZ-AC100",  name:"ArmorCoat 100% Solids Kit",cat:"Epoxy",    unit:"kit",  onHand:48, reorder:24, vel:11.0, cost:152 },
  { sku:"SZ-PA70",   name:"Polyaspartic Topcoat",     cat:"Epoxy",    unit:"kit",  onHand:15, reorder:14, vel:5.5,  cost:198 },
  { sku:"SZ-EP01",   name:"Epoxy Primer Coat",        cat:"Epoxy",    unit:"kit",  onHand:31, reorder:18, vel:7.0,  cost:84  },
  { sku:"SZ-FLK25",  name:"Vinyl Flake Media (25 lb)",cat:"Epoxy",    unit:"box",  onHand:7,  reorder:15, vel:6.0,  cost:58  },
  { sku:"SZ-PSG50",  name:"PolyBond Sand — Grey",     cat:"Sand",     unit:"bag",  onHand:64, reorder:30, vel:9.0,  cost:22  },
  { sku:"SZ-PST50",  name:"PolyBond Sand — Tan",      cat:"Sand",     unit:"bag",  onHand:0,  reorder:30, vel:8.5,  cost:22  },
  { sku:"SZ-DEG01",  name:"Heavy-Duty Degreaser",     cat:"Cleaning", unit:"jug",  onHand:41, reorder:20, vel:5.0,  cost:16  },
  { sku:"SZ-EFF01",  name:"Efflorescence Remover",    cat:"Cleaning", unit:"jug",  onHand:18, reorder:15, vel:3.0,  cost:20  },
  { sku:"SZ-ETCH",   name:"Surface Etch & Prep",      cat:"Cleaning", unit:"jug",  onHand:26, reorder:14, vel:3.5,  cost:18  },
  { sku:"SZ-ROLL",   name:"Spiked Roller — 9 in",     cat:"Tools",    unit:"each", onHand:12, reorder:10, vel:2.0,  cost:24  },
  { sku:"SZ-SQGE",   name:"Notched Squeegee — 24 in", cat:"Tools",    unit:"each", onHand:5,  reorder:8,  vel:2.5,  cost:33  },
  { sku:"SZ-PAD",    name:"Mixing Paddle",            cat:"Tools",    unit:"each", onHand:19, reorder:10, vel:1.5,  cost:13  },
  { sku:"SZ-KIT-PPE",name:"Spiked Shoes (pair)",      cat:"Tools",    unit:"pair", onHand:6,  reorder:8,  vel:2.0,  cost:21  }
];

const TARGET_WEEKS = 4; // reorder target: keep ~4 weeks of cover
