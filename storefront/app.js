/* Sealer Zone storefront — demo logic (vanilla JS, no dependencies) */
(function () {
  "use strict";

  let lang = ACCOUNT.lang;
  let activeCat = "all";
  const cart = {}; // sku -> qty
  const money = (n) => "$" + n.toFixed(2);
  const contractorPrice = (p) => p.price * (1 - ACCOUNT.discount);
  const t = (key) => I18N[lang][key] || key;

  /* ---------- i18n ---------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.getElementById("tierLabel").textContent =
      t("tier_pricing").replace("{tier}", ACCOUNT.tier);
    renderChips();
    renderGrid();
    renderUsual();
    renderCart();
    // refresh calculator result text if visible
    if (document.getElementById("calcResult").classList.contains("show")) calc();
  }

  document.querySelectorAll(".lang button").forEach((b) => {
    b.addEventListener("click", () => {
      lang = b.dataset.lang;
      document.querySelectorAll(".lang button").forEach((x) => x.classList.toggle("on", x === b));
      applyI18n();
    });
  });

  /* ---------- catalog ---------- */
  function catName(id) { const c = CATEGORIES.find((c) => c.id === id); return c ? c[lang] : id; }

  function renderChips() {
    const wrap = document.getElementById("chips");
    wrap.innerHTML = "";
    CATEGORIES.forEach((c) => {
      const b = document.createElement("button");
      b.className = "chip" + (c.id === activeCat ? " on" : "");
      b.textContent = c[lang];
      b.onclick = () => { activeCat = c.id; renderChips(); renderGrid(); };
      wrap.appendChild(b);
    });
  }

  function stockBadge(stock) {
    if (stock === "in") return `<span class="badge badge-green"><span class="dot"></span>${t("instock")}</span>`;
    if (stock === "low") return `<span class="badge badge-amber"><span class="dot"></span>${t("lowstock")}</span>`;
    return `<span class="badge badge-red"><span class="dot"></span>${t("outstock")}</span>`;
  }

  function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    const items = PRODUCTS.filter((p) => activeCat === "all" || p.cat === activeCat);
    items.forEach((p) => {
      const oos = p.stock === "out";
      const card = document.createElement("div");
      card.className = "prod" + (oos ? " oos" : "");
      card.innerHTML = `
        <div class="thumb"><span class="cat-ico">${catName(p.cat)}</span></div>
        <div class="sku">${p.sku}</div>
        <div class="pname">${p.name}</div>
        <div class="blurb">${p["blurb_" + lang]}</div>
        <div class="price-row">
          <span class="you-price">${money(contractorPrice(p))}</span>
          <span class="list-price">${money(p.price)}</span>
          <span class="unit">/ ${p.unit}</span>
        </div>
        <div class="pfoot">
          ${stockBadge(p.stock)}
          <button class="btn btn-primary btn-sm add" ${oos ? "disabled style=opacity:.5;cursor:not-allowed" : ""}>${t("add")}</button>
        </div>`;
      if (!oos) card.querySelector(".add").onclick = () => addToCart(p.sku);
      grid.appendChild(card);
    });
  }

  function renderUsual() {
    const wrap = document.getElementById("usualPills");
    wrap.innerHTML = "";
    USUAL_ORDER.forEach((sku) => {
      const p = PRODUCTS.find((x) => x.sku === sku);
      if (!p) return;
      const s = document.createElement("span");
      s.className = "pill";
      s.textContent = p.name;
      wrap.appendChild(s);
    });
  }

  /* ---------- cart ---------- */
  function addToCart(sku, qty = 1, quiet = false) {
    cart[sku] = (cart[sku] || 0) + qty;
    renderCart();
    if (!quiet) {
      const p = PRODUCTS.find((x) => x.sku === sku);
      toast(`${t("added")}: ${p.name}`);
    }
  }
  function setQty(sku, q) { if (q <= 0) delete cart[sku]; else cart[sku] = q; renderCart(); }

  function cartTotals() {
    let sub = 0, list = 0, count = 0;
    Object.entries(cart).forEach(([sku, q]) => {
      const p = PRODUCTS.find((x) => x.sku === sku);
      sub += contractorPrice(p) * q; list += p.price * q; count += q;
    });
    return { sub, list, save: list - sub, count };
  }

  function renderCart() {
    const { count, sub, save } = cartTotals();
    document.getElementById("cartCount").textContent = count;
    const items = document.getElementById("ditems");
    const foot = document.getElementById("dfoot");
    const entries = Object.entries(cart);

    if (!entries.length) {
      items.innerHTML = `<div class="empty">${t("cart_empty")}</div>`;
      foot.innerHTML = "";
      return;
    }
    items.innerHTML = entries.map(([sku, q]) => {
      const p = PRODUCTS.find((x) => x.sku === sku);
      return `<div class="ditem">
        <div class="ti">
          <div class="n">${p.name}</div>
          <div class="s">${p.sku} · ${money(contractorPrice(p))} / ${p.unit}</div>
          <div class="qtybox" data-sku="${sku}">
            <button data-d="-1">−</button><span>${q}</span><button data-d="1">+</button>
          </div>
        </div>
        <div class="lineprice">${money(contractorPrice(p) * q)}</div>
      </div>`;
    }).join("");

    items.querySelectorAll(".qtybox").forEach((box) => {
      const sku = box.dataset.sku;
      box.querySelectorAll("button").forEach((btn) => {
        btn.onclick = () => setQty(sku, (cart[sku] || 0) + parseInt(btn.dataset.d, 10));
      });
    });

    foot.innerHTML = `
      <div class="line"><span>${t("subtotal")}</span><span class="tnum">${money(sub)}</span></div>
      <div class="line save"><span>${t("savings")}</span><span class="tnum">− ${money(save)}</span></div>
      <div class="line"><span>${t("tax")}</span><span>${ACCOUNT.taxExempt ? t("tax_exempt") : money(sub * 0.07)}</span></div>
      <div class="line tot"><span>${t("total")}</span><span class="v tnum">${money(sub)}</span></div>
      <button class="btn btn-primary" style="width:100%;margin-top:.7rem" id="submitOrder">${t("checkout")}</button>
      <div class="pickup-note">${t("pickup_note")}</div>`;
    foot.querySelector("#submitOrder").onclick = submitOrder;
  }

  function submitOrder() {
    const items = document.getElementById("ditems");
    const foot = document.getElementById("dfoot");
    items.innerHTML = `<div class="empty" style="padding:4rem 1rem">
      <div style="width:54px;height:54px;border-radius:50%;background:var(--teal-soft);color:var(--teal-dark);
        display:grid;place-items:center;font-size:1.5rem;margin:0 auto .9rem">✓</div>
      <div style="font-family:var(--font-display);font-weight:600;font-size:1.1rem;color:var(--ink)">${t("submitted_title")}</div>
      <div style="margin-top:.4rem;max-width:26ch;margin-inline:auto">${t("submitted_sub")}</div>
    </div>`;
    foot.innerHTML = "";
    for (const k in cart) delete cart[k];
    document.getElementById("cartCount").textContent = "0";
  }

  /* ---------- coverage calculator ---------- */
  function calc() {
    const area = parseFloat(document.getElementById("cArea").value) || 0;
    const mil = parseFloat(document.getElementById("cMil").value) || 0;
    const gallons = (area * mil) / 1604;
    const kits = Math.max(1, Math.ceil(gallons / 3)); // ArmorCoat kit ≈ 3 gal
    document.getElementById("calcGal").textContent = gallons.toFixed(1);
    document.getElementById("calcKits").textContent = t("calc_kits").replace("{n}", kits);
    document.getElementById("calcResult").classList.add("show");
    document.getElementById("calcAdd").dataset.kits = kits;
  }
  document.getElementById("calcBtn").onclick = calc;
  document.getElementById("calcAdd").onclick = function () {
    const kits = parseInt(this.dataset.kits || "1", 10);
    addToCart("SZ-AC100", kits, true);
    toast(`${t("added")}: ${kits} × ArmorCoat`);
    openCart();
  };

  /* ---------- quick reorder ---------- */
  document.getElementById("reorderBtn").onclick = () => {
    USUAL_ORDER.forEach((sku) => { if ((PRODUCTS.find(p=>p.sku===sku)||{}).stock !== "out") addToCart(sku, 1, true); });
    toast(t("reorder"));
    openCart();
  };

  /* ---------- drawer ---------- */
  const drawer = document.getElementById("drawer");
  const scrim = document.getElementById("scrim");
  function openCart() { drawer.classList.add("show"); scrim.classList.add("show"); }
  function closeCart() { drawer.classList.remove("show"); scrim.classList.remove("show"); }
  document.getElementById("openCart").onclick = openCart;
  document.getElementById("closeCart").onclick = closeCart;
  scrim.onclick = closeCart;

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  /* ---------- init ---------- */
  applyI18n();
  calc();
})();
