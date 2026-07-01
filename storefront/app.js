/* Sealer Zone storefront — demo logic (vanilla JS, no dependencies) */
(function () {
  "use strict";
  let lang = ACCOUNT.lang, activeCat = "all", search = "", sortBy = "featured";
  const cart = {};                 // sku -> qty
  const checkout = { step: 1, day: "", po: "", notes: "" };
  const money = (n) => "$" + n.toFixed(2);
  const cp = (p) => p.price * (1 - ACCOUNT.discount);   // contractor price
  const t = (k) => (I18N[lang][k] || k);
  const prod = (sku) => PRODUCTS.find((x) => x.sku === sku);
  const catName = (id) => { const c = CATEGORIES.find((c) => c.id === id); return c ? c[lang] : id; };
  const $ = (id) => document.getElementById(id);

  /* ---------------- i18n ---------------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
    $("tierLabel").textContent = t("tier_pricing").replace("{tier}", ACCOUNT.tier);
    $("prodSearch").placeholder = t("search_ph");
    renderChips(); renderGrid(); renderUsual(); renderCart();
    if ($("calcResult").classList.contains("show")) calc();
    // re-render current non-shop view if open
    if (current === "detail" && currentSku) openDetail(currentSku, true);
    if (current === "account") openAccount(true);
    if (current === "builder") renderBuilder();
    if (current === "checkout") renderCheckout();
    if (document.getElementById("chatChips")) renderChatChrome();
  }
  document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    document.querySelectorAll(".lang button").forEach((x) => x.classList.toggle("on", x === b));
    applyI18n();
  }));

  /* ---------------- routing ---------------- */
  let current = "shop", currentSku = null;
  function go(view) {
    current = view;
    document.querySelectorAll(".view").forEach((v) => v.classList.toggle("on", v.id === "view-" + view));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (view === "account") openAccount();
    if (view === "builder") renderBuilder();
    if (view === "checkout") { checkout.step = 1; renderCheckout(); }
  }
  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-go]"); if (g) { go(g.dataset.go); }
    const s = e.target.closest("[data-scroll]");
    if (s) { go("shop"); const el = $(s.dataset.scroll); if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 30); }
  });

  /* ---------------- catalog ---------------- */
  function renderChips() {
    const w = $("chips"); w.innerHTML = "";
    CATEGORIES.forEach((c) => {
      const b = document.createElement("button");
      b.className = "chip" + (c.id === activeCat ? " on" : "");
      b.textContent = c[lang];
      b.onclick = () => { activeCat = c.id; renderChips(); renderGrid(); };
      w.appendChild(b);
    });
  }
  function stockBadge(s) {
    if (s === "in") return `<span class="badge badge-green"><span class="dot"></span>${t("instock")}</span>`;
    if (s === "low") return `<span class="badge badge-amber"><span class="dot"></span>${t("lowstock")}</span>`;
    return `<span class="badge badge-red"><span class="dot"></span>${t("outstock")}</span>`;
  }
  function visibleProducts() {
    let items = PRODUCTS.filter((p) => activeCat === "all" || p.cat === activeCat);
    if (search) { const q = search.toLowerCase(); items = items.filter((p) => (p.name + p.sku + p["blurb_" + lang]).toLowerCase().includes(q)); }
    if (sortBy === "plo") items = [...items].sort((a, b) => cp(a) - cp(b));
    else if (sortBy === "phi") items = [...items].sort((a, b) => cp(b) - cp(a));
    else if (sortBy === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }
  function renderGrid() {
    const grid = $("grid"); const items = visibleProducts();
    if (!items.length) { grid.innerHTML = `<div class="empty" style="grid-column:1/-1">${t("no_results")}</div>`; return; }
    grid.innerHTML = "";
    items.forEach((p) => {
      const oos = p.stock === "out";
      const card = document.createElement("div");
      card.className = "prod" + (oos ? " oos" : "");
      card.innerHTML = `
        <div class="thumb"><span class="cat-ico">${catName(p.cat)}</span></div>
        <div class="sku">${p.sku}</div>
        <div class="pname">${p.name}</div>
        <div class="blurb">${p["blurb_" + lang]}</div>
        <div class="price-row"><span class="you-price">${money(cp(p))}</span><span class="list-price">${money(p.price)}</span><span class="unit">/ ${p.unit}</span></div>
        <div class="pfoot">${stockBadge(p.stock)}
          <button class="btn btn-primary btn-sm add" ${oos ? "disabled style=opacity:.5;cursor:not-allowed" : ""}>${t("add")}</button></div>`;
      card.onclick = (e) => { if (!e.target.closest(".add")) openDetail(p.sku); };
      if (!oos) card.querySelector(".add").onclick = (e) => { e.stopPropagation(); addToCart(p.sku); };
      grid.appendChild(card);
    });
  }
  $("prodSearch").addEventListener("input", (e) => { search = e.target.value; renderGrid(); });
  $("sortSel").addEventListener("change", (e) => { sortBy = e.target.value; renderGrid(); });

  function renderUsual() {
    const w = $("usualPills"); w.innerHTML = "";
    USUAL_ORDER.forEach((sku) => { const p = prod(sku); if (p) { const s = document.createElement("span"); s.className = "pill"; s.textContent = p.name; w.appendChild(s); } });
  }

  /* ---------------- product detail ---------------- */
  function openDetail(sku, keep) {
    currentSku = sku; const p = prod(sku); if (!p) return;
    const oos = p.stock === "out";
    const tierRows = TIERS.map((tr) => {
      const price = p.price * (1 - tr.disc);
      const isYou = tr.name === ACCOUNT.tier;
      return `<tr class="${isYou ? "you" : ""}"><td>${tr.name}${isYou ? " ←" : ""}</td><td>${money(price)}</td></tr>`;
    }).join("");
    const specs = p.specs.map((s) => `<div class="spec"><span class="k">${s[0]}</span><span class="v">${s[1]}</span></div>`).join("");
    const related = (RELATED[sku] || []).map(prod).filter(Boolean);
    const relHTML = related.length ? `
      <div class="sec-head" style="margin-top:2rem"><div><div class="eyebrow">${t("pairs")}</div></div></div>
      <div class="grid" style="grid-template-columns:repeat(${Math.min(related.length,4)},1fr)">
        ${related.map((r) => `
          <div class="prod" data-rel="${r.sku}">
            <div class="thumb"><span class="cat-ico">${catName(r.cat)}</span></div>
            <div class="pname">${r.name}</div>
            <div class="price-row"><span class="you-price">${money(cp(r))}</span><span class="unit">/ ${r.unit}</span></div>
          </div>`).join("")}
      </div>` : "";
    const estHTML = p.coverage ? `
      <div class="estbox">
        <div class="field-label">${t("est_for_job")}</div>
        <div class="er"><input class="inp" id="estArea" type="number" value="1200"> <span class="muted">${t("sqft")}</span>
          <span class="muted">·</span> <span id="estOut" class="strong"></span></div>
      </div>` : "";

    $("detailBody").innerHTML = `
      <button class="backlink" data-go="shop">← ${t("back_products")}</button>
      <div class="detail-grid">
        <div class="dimg"><span class="sku-chip">${p.sku}</span><span class="cat-ico">${catName(p.cat)}</span></div>
        <div>
          ${stockBadge(p.stock)}
          <div class="dname" style="margin-top:.6rem">${p.name}</div>
          <div class="muted" style="font-size:.92rem">${p["blurb_" + lang]}</div>
          <div class="dprice"><span class="you">${money(cp(p))}</span><span class="list">${money(p.price)}</span><span class="save">${t(ACCOUNT.tier === "Gold" ? "your_price" : "your_price")} · -${Math.round(ACCOUNT.discount*100)}%</span><span class="unit muted">/ ${p.unit}</span></div>
          <div class="addbar">
            <div class="qtybox" id="dQty"><button data-d="-1">−</button><span>1</span><button data-d="1">+</button></div>
            <button class="btn btn-primary" id="dAdd" style="flex:1" ${oos ? "disabled style=opacity:.5" : ""}>${oos ? t("outstock") : t("add")}</button>
          </div>
          ${estHTML}
          <div class="field-label" style="margin-top:1.4rem">${t("tier_table")}</div>
          <table class="tierprice"><tbody>${tierRows}</tbody></table>
        </div>
      </div>
      <div class="sec-head" style="margin-top:2rem"><div><div class="eyebrow">${t("description")}</div></div></div>
      <p style="max-width:70ch;color:var(--slate-700);line-height:1.6">${p["desc_" + lang]}</p>
      <div class="sec-head" style="margin-top:1.6rem"><div><div class="eyebrow">${t("specs")}</div></div></div>
      <div class="spec-list">${specs}</div>
      ${relHTML}`;

    // qty stepper
    let q = 1; const qEl = $("dQty");
    qEl.querySelectorAll("button").forEach((b) => b.onclick = () => { q = Math.max(1, q + parseInt(b.dataset.d, 10)); qEl.querySelector("span").textContent = q; });
    if (!oos) $("dAdd").onclick = () => { addToCart(sku, q); };
    $("detailBody").querySelectorAll("[data-rel]").forEach((el) => el.onclick = () => openDetail(el.dataset.rel));
    // coverage estimator
    if (p.coverage) {
      const calcEst = () => { const a = parseFloat($("estArea").value) || 0; const n = Math.max(1, Math.ceil(a / p.coverage)); $("estOut").textContent = t("need_units").replace("{n}", n).replace("{unit}", p.unit); };
      $("estArea").addEventListener("input", calcEst); calcEst();
    }
    if (!keep) go("detail");
  }

  /* ---------------- floor system builder ---------------- */
  const builder = { sqft: 1200, system: "garage" };
  function bom(sys, sqft) {
    const lines = [];
    sys.coats.forEach(([sku, basis]) => {
      const p = prod(sku); let qty, note;
      if (basis === "broadcast") { qty = Math.ceil(sqft / FLAKE_COVERAGE); note = t("builder_broadcast"); }
      else { qty = Math.ceil(sqft / p.coverage) * basis; note = basis + " " + t("builder_coats"); }
      lines.push({ sku, qty, note });
    });
    sys.tools.forEach((sku) => lines.push({ sku, qty: 1, note: t("builder_tools") }));
    return lines;
  }
  function renderBuilder() {
    const sys = SYSTEMS.find((s) => s.id === builder.system) || SYSTEMS[0];
    const lines = bom(sys, builder.sqft || 0);
    let sub = 0, list = 0;
    lines.forEach((l) => { const p = prod(l.sku); sub += cp(p) * l.qty; list += p.price * l.qty; });
    const cards = SYSTEMS.map((s) => `
      <div data-sys="${s.id}" style="border:1px solid ${s.id===builder.system?"var(--teal)":"var(--line)"};border-radius:12px;padding:1rem 1.1rem;cursor:pointer;background:${s.id===builder.system?"var(--teal-soft)":"#fff"};transition:.12s">
        <div style="font-weight:600;font-family:var(--font-display)">${s[lang]}</div>
        <div class="muted" style="font-size:.8rem;margin-top:.25rem;line-height:1.4">${s["blurb_"+lang]}</div>
      </div>`).join("");
    const rows = lines.map((l) => { const p = prod(l.sku); return `
      <tr><td><div class="strong">${p.name}</div><div class="muted" style="font-size:.74rem">${p.sku} · ${l.note}</div></td>
        <td class="t-right tnum">${l.qty}</td><td class="t-right tnum muted">${money(cp(p))}</td>
        <td class="t-right tnum strong">${money(cp(p) * l.qty)}</td></tr>`; }).join("");
    $("builderBody").innerHTML = `
      <button class="backlink" data-go="shop">← ${t("back_products")}</button>
      <div class="detail-head"><div><div class="detail-title">${t("builder_title")}</div><div class="detail-sub" style="max-width:60ch">${t("builder_sub")}</div></div></div>
      <div class="row" style="gap:1.6rem;align-items:flex-start;flex-wrap:wrap">
        <div style="flex:1;min-width:300px">
          <label class="field-label">${t("builder_area")}</label>
          <input class="inp" id="bSqft" type="number" value="${builder.sqft}" style="max-width:200px;margin-bottom:1.2rem">
          <div class="field-label">${t("builder_pick")}</div>
          <div style="display:flex;flex-direction:column;gap:.7rem">${cards}</div>
        </div>
        <div style="flex:1.3;min-width:320px">
          <div class="sec-head" style="margin-top:0"><div><div class="eyebrow">${t("builder_bom")}</div><h2 style="font-size:1.05rem">${sys[lang]} · ${builder.sqft || 0} ${t("sqft")}</h2></div></div>
          <div class="table-wrap"><table class="data"><thead><tr><th>${t("cat_title")}</th><th class="t-right">${t("qty")}</th><th class="t-right">${t("you")}</th><th class="t-right">Total</th></tr></thead><tbody>${rows}</tbody></table></div>
          <div class="summary-box">
            <div class="line"><span>${t("subtotal")}</span><span class="tnum">${money(sub)}</span></div>
            <div class="line save"><span>${t("savings")}</span><span class="tnum">− ${money(list - sub)}</span></div>
            <div class="line tot"><span>${t("total")}</span><span class="tnum">${money(sub)}</span></div>
          </div>
          <button class="btn btn-primary" style="width:100%;margin-top:1rem" id="bAdd">${t("builder_add")}</button>
        </div>
      </div>`;
    $("bSqft").addEventListener("input", (e) => { builder.sqft = parseInt(e.target.value, 10) || 0; renderBuilder(); });
    $("builderBody").querySelectorAll("[data-sys]").forEach((el) => el.onclick = () => { builder.system = el.dataset.sys; renderBuilder(); });
    $("bAdd").onclick = () => { bom(sys, builder.sqft).forEach((l) => addToCart(l.sku, l.qty, true)); toast(t("builder_add")); openCart(); };
  }

  /* ---------------- cart ---------------- */
  function addToCart(sku, qty = 1, quiet = false) {
    cart[sku] = (cart[sku] || 0) + qty; renderCart();
    if (!quiet) { toast(`${t("added")}: ${prod(sku).name}`); openCart(); }
  }
  function setQty(sku, q) { if (q <= 0) delete cart[sku]; else cart[sku] = q; renderCart(); if (current === "checkout") renderCheckout(); }
  function totals() {
    let sub = 0, list = 0, count = 0;
    Object.entries(cart).forEach(([sku, q]) => { const p = prod(sku); sub += cp(p) * q; list += p.price * q; count += q; });
    return { sub, list, save: list - sub, count };
  }
  function renderCart() {
    const { count, sub, save } = totals();
    $("cartCount").textContent = count;
    const items = $("ditems"), foot = $("dfoot"), entries = Object.entries(cart);
    if (!entries.length) { items.innerHTML = `<div class="empty">${t("cart_empty")}</div>`; foot.innerHTML = ""; return; }
    items.innerHTML = entries.map(([sku, q]) => { const p = prod(sku); return `
      <div class="ditem"><div class="ti"><div class="n">${p.name}</div><div class="s">${p.sku} · ${money(cp(p))} / ${p.unit}</div>
        <div class="qtybox sm" data-sku="${sku}" style="margin-top:.35rem"><button data-d="-1">−</button><span>${q}</span><button data-d="1">+</button></div></div>
        <div class="lineprice">${money(cp(p) * q)}</div></div>`; }).join("");
    items.querySelectorAll(".qtybox").forEach((box) => { const sku = box.dataset.sku; box.querySelectorAll("button").forEach((btn) => btn.onclick = () => setQty(sku, (cart[sku] || 0) + parseInt(btn.dataset.d, 10))); });
    foot.innerHTML = `
      <div class="line"><span>${t("subtotal")}</span><span class="tnum">${money(sub)}</span></div>
      <div class="line save"><span>${t("savings")}</span><span class="tnum">− ${money(save)}</span></div>
      <div class="line"><span>${t("tax")}</span><span>${ACCOUNT.taxExempt ? t("tax_exempt") : money(sub * 0.07)}</span></div>
      <div class="line tot"><span>${t("total")}</span><span class="v tnum">${money(sub)}</span></div>
      <button class="btn btn-primary" style="width:100%;margin-top:.7rem" id="toCheckout">${t("checkout")} →</button>`;
    foot.querySelector("#toCheckout").onclick = () => { closeCart(); go("checkout"); };
  }

  /* ---------------- checkout (multi-step) ---------------- */
  function stepper() {
    const labels = [t("co_review"), t("co_pickup"), t("co_done")];
    return `<div class="steps">${labels.map((l, i) => {
      const n = i + 1, cls = checkout.step === n ? "on" : checkout.step > n ? "done" : "";
      return `<div class="s ${cls}"><span class="n">${checkout.step > n ? "✓" : n}</span>${l}</div>${i < 2 ? '<span class="bar"></span>' : ""}`;
    }).join("")}</div>`;
  }
  function renderCheckout() {
    const { sub, save } = totals(); const entries = Object.entries(cart);
    const body = $("checkoutBody");
    if (!entries.length && checkout.step < 3) { body.innerHTML = `<button class="backlink" data-go="shop">← ${t("continue")}</button><div class="empty">${t("cart_empty")}</div>`; return; }

    if (checkout.step === 1) {
      body.innerHTML = `${stepper()}<button class="backlink" data-go="shop">← ${t("continue")}</button>
        <h2 style="margin-bottom:1rem">${t("co_title")}</h2>
        ${entries.map(([sku, q]) => { const p = prod(sku); return `
          <div class="co-line"><div class="ci"><div class="n">${p.name}</div><div class="s">${p.sku} · ${money(cp(p))} / ${p.unit}</div></div>
            <div class="qtybox sm" data-sku="${sku}"><button data-d="-1">−</button><span>${q}</span><button data-d="1">+</button></div>
            <div class="lp" style="width:90px;text-align:right">${money(cp(p) * q)}</div></div>`; }).join("")}
        <div class="summary-box">
          <div class="line"><span>${t("subtotal")}</span><span class="tnum">${money(sub)}</span></div>
          <div class="line save"><span>${t("savings")}</span><span class="tnum">− ${money(save)}</span></div>
          <div class="line"><span>${t("tax")}</span><span>${ACCOUNT.taxExempt ? t("tax_exempt") : money(sub * 0.07)}</span></div>
          <div class="line tot"><span>${t("total")}</span><span class="tnum">${money(sub)}</span></div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:1.2rem"><button class="btn btn-primary" id="coNext">${t("co_pickup")} →</button></div>`;
      body.querySelectorAll(".qtybox").forEach((box) => { const sku = box.dataset.sku; box.querySelectorAll("button").forEach((btn) => btn.onclick = () => setQty(sku, (cart[sku] || 0) + parseInt(btn.dataset.d, 10))); });
      $("coNext").onclick = () => { checkout.step = 2; renderCheckout(); };
    } else if (checkout.step === 2) {
      body.innerHTML = `${stepper()}
        <h2 style="margin-bottom:.3rem">${t("co_pickup_title")}</h2>
        <div class="muted" style="font-size:.85rem;margin-bottom:1.2rem">${t("co_pickup_window")}</div>
        <label class="field-label">${t("co_when")}</label>
        <select class="inp" id="coDay" style="margin-bottom:1rem">
          <option>Tomorrow — Mon, 7:30 AM</option><option>Tomorrow — Mon, afternoon</option>
          <option>Tue, 7:30 AM</option><option>Tue, afternoon</option><option>Wed, 7:30 AM</option>
        </select>
        <label class="field-label">${t("co_po")}</label><input class="inp" id="coPo" placeholder="Job #1208 / Maple St" style="margin-bottom:1rem">
        <label class="field-label">${t("co_notes")}</label><textarea class="inp" id="coNotes" rows="3" placeholder=""></textarea>
        <div style="display:flex;justify-content:space-between;margin-top:1.3rem">
          <button class="btn btn-ghost" id="coBack">← ${t("co_back")}</button>
          <button class="btn btn-primary" id="coPlace">${t("co_place")}</button>
        </div>`;
      $("coBack").onclick = () => { checkout.step = 1; renderCheckout(); };
      $("coPlace").onclick = () => { checkout.day = $("coDay").value; checkout.po = $("coPo").value; checkout.step = 3; renderCheckout(); };
    } else {
      const onum = "#" + (4820 + Math.floor(Math.random() * 60));
      body.innerHTML = `${stepper()}
        <div class="conf">
          <div class="ok">✓</div>
          <div class="onum">${t("submitted_title")}</div>
          <div class="muted" style="max-width:34ch;margin:.5rem auto 1.2rem">${t("submitted_sub")}</div>
          <div class="summary-box" style="max-width:340px;margin:0 auto;text-align:left">
            <div class="line"><span>${t("order_no")}</span><span class="strong">${onum}</span></div>
            <div class="line"><span>${t("pickup_on")}</span><span class="strong">${checkout.day || "Tomorrow"}</span></div>
            ${checkout.po ? `<div class="line"><span>PO</span><span class="strong">${checkout.po}</span></div>` : ""}
          </div>
          <button class="btn btn-ghost" style="margin-top:1.4rem" id="coNew">${t("new_order")}</button>
        </div>`;
      for (const k in cart) delete cart[k]; $("cartCount").textContent = "0"; renderCart();
      $("coNew").onclick = () => { checkout.step = 1; go("shop"); };
    }
  }

  /* ---------------- account ---------------- */
  function openAccount() {
    const rows = ORDER_HISTORY.map((o) => {
      const names = o.items.map(([sku, q]) => `${q}× ${prod(sku) ? prod(sku).name : sku}`).join(", ");
      return `<tr><td class="strong">${o.id}</td><td class="muted">${o.date}</td><td style="max-width:320px" class="muted">${names}</td>
        <td class="t-right tnum strong">${money(o.total)}</td>
        <td class="t-right"><button class="btn btn-ghost btn-sm" data-reorder="${o.id}">${t("reorder_btn")}</button></td></tr>`;
    }).join("");
    $("accountBody").innerHTML = `
      <button class="backlink" data-go="shop">← ${t("back_products")}</button>
      <div class="detail-head"><div><div class="detail-title">${ACCOUNT.company}</div><div class="detail-sub">${t("acct_sub")}</div></div>
        <span class="badge badge-amber">${ACCOUNT.tier} ${t("pricing_tier")}</span></div>
      <div class="spec-list" style="margin-bottom:1.6rem">
        <div class="spec"><span class="k">${t("contact")}</span><span class="v">${ACCOUNT.contact}</span></div>
        <div class="spec"><span class="k">${t("pricing_tier")}</span><span class="v">${ACCOUNT.tier} (−${Math.round(ACCOUNT.discount*100)}%)</span></div>
        <div class="spec"><span class="k">${t("tax_status")}</span><span class="v">${ACCOUNT.taxExempt ? t("tax_exempt") : "—"}</span></div>
        <div class="spec"><span class="k">${t("lang_pref")}</span><span class="v">${ACCOUNT.lang === "pt" ? "Português" : "English"}</span></div>
      </div>
      <div class="sec-head"><div><div class="eyebrow">${t("past_orders")}</div></div></div>
      <div class="table-wrap"><table class="data"><tbody>${rows}</tbody></table></div>`;
    $("accountBody").querySelectorAll("[data-reorder]").forEach((b) => b.onclick = () => {
      const o = ORDER_HISTORY.find((x) => x.id === b.dataset.reorder);
      o.items.forEach(([sku, q]) => { if (prod(sku) && prod(sku).stock !== "out") addToCart(sku, q, true); });
      toast(t("reorder_btn") + " " + o.id); openCart();
    });
  }

  /* ---------------- coverage calc (hero) ---------------- */
  function calc() {
    const area = parseFloat($("cArea").value) || 0, mil = parseFloat($("cMil").value) || 0;
    const gallons = (area * mil) / 1604, kits = Math.max(1, Math.ceil(gallons / 3));
    $("calcGal").textContent = gallons.toFixed(1);
    $("calcKits").textContent = t("calc_kits").replace("{n}", kits);
    $("calcResult").classList.add("show"); $("calcAdd").dataset.kits = kits;
  }
  $("calcBtn").onclick = calc;
  $("calcAdd").onclick = function () { addToCart("SZ-AC100", parseInt(this.dataset.kits || "1", 10)); };
  $("reorderBtn").onclick = () => { USUAL_ORDER.forEach((sku) => { if (prod(sku).stock !== "out") addToCart(sku, 1, true); }); toast(t("reorder")); openCart(); };

  /* ---------------- drawer + toast ---------------- */
  const drawer = $("drawer"), scrim = $("scrim");
  function openCart() { drawer.classList.add("show"); scrim.classList.add("show"); }
  function closeCart() { drawer.classList.remove("show"); scrim.classList.remove("show"); }
  $("openCart").onclick = openCart; $("closeCart").onclick = closeCart; scrim.onclick = closeCart;
  let tm; function toast(m) { const e = $("toast"); e.textContent = m; e.classList.add("show"); clearTimeout(tm); tm = setTimeout(() => e.classList.remove("show"), 1700); }

  /* ---------------- bilingual assistant ---------------- */
  const CHAT = {
    en: {
      title: "Sealer Zone Assistant", sub: "Ask in English or Portuguese",
      placeholder: "Ask about coverage, products, hours…", send: "Send",
      welcome: "Hi! I can work out how much product you need for a job, check prices and stock, or point you to the right floor system. Try “How much epoxy for 1500 sq ft?”",
      chips: ["How much epoxy for 1500 sq ft?", "What do I need for a garage floor?", "Price of polyaspartic", "Store hours"],
      greet: "Hey! How can I help — coverage math, a product price, or what you need for a job?",
      hours: "The counter is open Mon–Fri, 7:30 AM–2:00 PM. You can place orders online any time and pick them up the next day.",
      askArea: "Sure — how many square feet is the job?",
      system: "Tell me the job — garage, showroom, or industrial — plus the square footage, and I'll size the whole system. You can also use the Floor System Builder.",
      fallback: "I can help with product coverage (how much you need), prices, stock, store hours, and floor systems. What would you like to know?",
      price: (p) => `${p.name} is ${money(cp(p))} per ${p.unit} at your contractor price (list ${money(p.price)}).`,
      stock: (p) => p.stock === "out" ? `${p.name} is out of stock right now — I can suggest an alternative if you'd like.` : p.stock === "low" ? `${p.name} is in stock but running low — worth ordering soon.` : `Yes — ${p.name} is in stock and ready for pickup.`,
      product: (p) => `${p.name} — ${p.blurb_en} It's ${money(cp(p))} per ${p.unit} at your price.`,
      needProduct: (p, a, u) => `For ${a.toLocaleString()} sq ft you'll need about ${u} ${p.unit}${u > 1 ? "s" : ""} of ${p.name}. At your contractor price that's about ${money(cp(p) * u)}.`,
      needSystem: (a, lines) => `A full garage floor at ${a.toLocaleString()} sq ft typically needs:\n${lines.map((l) => `• ${l.qty} × ${prod(l.sku).name}`).join("\n")}\nWant me to build the full list?`,
      actAdd: "Add to order", actView: "View product", actBuilder: "Open System Builder", actAddSys: "Add whole system"
    },
    pt: {
      title: "Assistente Sealer Zone", sub: "Pergunte em inglês ou português",
      placeholder: "Pergunte sobre cobertura, produtos, horário…", send: "Enviar",
      welcome: "Olá! Posso calcular quanto produto você precisa para um serviço, verificar preços e estoque, ou indicar o sistema de piso certo. Experimente “Quanto epóxi para 1500 pés²?”",
      chips: ["Quanto epóxi para 1500 pés²?", "O que preciso para uma garagem?", "Preço do poliaspártico", "Horário da loja"],
      greet: "Olá! Como posso ajudar — cálculo de cobertura, preço de um produto, ou o que você precisa para um serviço?",
      hours: "O balcão abre de segunda a sexta, das 7:30 às 14:00. Você pode fazer pedidos online a qualquer hora e retirar no dia seguinte.",
      askArea: "Claro — quantos pés quadrados tem o serviço?",
      system: "Me diga o serviço — garagem, showroom ou industrial — e a metragem, que eu calculo o sistema inteiro. Você também pode usar o Montador de Sistema.",
      fallback: "Posso ajudar com cobertura de produtos (quanto você precisa), preços, estoque, horário e sistemas de piso. O que você gostaria de saber?",
      price: (p) => `${p.name} custa ${money(cp(p))} por ${p.unit} no seu preço de empreiteiro (tabela ${money(p.price)}).`,
      stock: (p) => p.stock === "out" ? `${p.name} está esgotado no momento — posso sugerir uma alternativa.` : p.stock === "low" ? `${p.name} está em estoque, mas acabando — vale pedir logo.` : `Sim — ${p.name} está em estoque e pronto para retirada.`,
      product: (p) => `${p.name} — ${p.blurb_pt} Custa ${money(cp(p))} por ${p.unit} no seu preço.`,
      needProduct: (p, a, u) => `Para ${a.toLocaleString()} pés² você vai precisar de cerca de ${u} ${p.unit}${u > 1 ? "s" : ""} de ${p.name}. No seu preço de empreiteiro, fica em torno de ${money(cp(p) * u)}.`,
      needSystem: (a, lines) => `Um piso de garagem completo com ${a.toLocaleString()} pés² geralmente precisa de:\n${lines.map((l) => `• ${l.qty} × ${prod(l.sku).name}`).join("\n")}\nQuer que eu monte a lista completa?`,
      actAdd: "Adicionar ao pedido", actView: "Ver produto", actBuilder: "Abrir Montador", actAddSys: "Adicionar sistema"
    }
  };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function detectLang(s) { return /(quanto|quantos|preciso|precisa|preço|preco|custa|galões|galao|garagem|galpão|galpao|estoque|horário|horario|retirada|olá|\bola\b|\boi\b|pés|pes|areia|selador|floco|demão|demao|epóxi|epoxi|quero|você|voce|qual|para que)/i.test(s) ? "pt" : null; }
  function productFromText(s) {
    const map = [[/armor|epoxy kit|100%|base coat|base epóxi/, "SZ-AC100"], [/primer/, "SZ-EP01"],
      [/polyaspartic|poliaspárt|poliaspart|topcoat|verniz/, "SZ-PA70"], [/flake|floco/, "SZ-FLK25"],
      [/densifier|densific|lítio|litio/, "SZ-DEN20"], [/wetlook|wet look|acrylic|acrílic|acrilic/, "SZ-WL100"],
      [/aquaseal|penetrat|penetrante/, "SZ-AS5000"], [/degreaser|desengord/, "SZ-DEG01"],
      [/efflor|eflores/, "SZ-EFF01"], [/\betch\b|prep|preparad/, "SZ-ETCH"], [/squeegee|rodo/, "SZ-SQGE"],
      [/roller|rolo/, "SZ-ROLL"], [/sand|areia/, "SZ-PSG50"], [/epoxy|epóxi|epoxi/, "SZ-AC100"], [/sealer|selador/, "SZ-AS5000"]];
    for (const [re, sku] of map) { if (re.test(s)) return prod(sku); }
    return null;
  }
  function chatReply(raw) {
    const L = detectLang(raw) || lang, R = CHAT[L], s = raw.toLowerCase();
    const num = (s.replace(/,/g, "").match(/(\d+(\.\d+)?)/) || [])[1];
    const sqft = num ? parseFloat(num) : null;
    const p = productFromText(s);
    if (/^(hi|hello|hey|good morning|olá|ola|oi|bom dia|boa tarde|boa noite)\b/.test(s)) return { text: R.greet };
    if (/(hour|open|pickup|pick up|when.*(open|closed)|horário|horario|aberto|retirada|quando)/.test(s)) return { text: R.hours };
    if (/(price|cost|how much is|how much are|preç|preco|custa|valor)/.test(s) && p) return { text: R.price(p) };
    if (/(stock|available|in stock|do you have|estoque|dispon|tem em|têm)/.test(s) && p) return { text: R.stock(p) };
    if (/(how much|how many|need|cover|coverage|quant|precis|cobr|galõe|galoe|\bkit|demão|demao)/.test(s)) {
      if (!sqft) {
        if (/(garage|showroom|warehouse|industrial|floor|system|garagem|galpão|galpao|piso|sistema)/.test(s)) return { text: R.system, actions: [{ label: R.actBuilder, fn: () => { go("builder"); closeChat(); } }] };
        return { text: R.askArea };
      }
      if (p && p.coverage) { const u = Math.ceil(sqft / p.coverage); return { text: R.needProduct(p, sqft, u), actions: [{ label: R.actAdd, fn: () => { addToCart(p.sku, u, true); toast(t("added")); openCart(); } }, { label: R.actView, fn: () => openDetail(p.sku) }] }; }
      const sys = SYSTEMS[0], lines = bom(sys, sqft);
      return { text: R.needSystem(sqft, lines), actions: [{ label: R.actBuilder, fn: () => { builder.sqft = sqft; go("builder"); closeChat(); } }, { label: R.actAddSys, fn: () => { lines.forEach((l) => addToCart(l.sku, l.qty, true)); toast(t("added")); openCart(); } }] };
    }
    if (/(garage|showroom|warehouse|industrial|system|floor|recommend|garagem|galpão|galpao|sistema|piso|recomend)/.test(s)) return { text: R.system, actions: [{ label: R.actBuilder, fn: () => { go("builder"); closeChat(); } }] };
    if (p) return { text: R.product(p), actions: [{ label: R.actView, fn: () => openDetail(p.sku) }] };
    return { text: R.fallback };
  }
  function addChatMsg(who, html, actions) {
    const wrap = document.createElement("div"); wrap.className = "cmsg " + who;
    wrap.innerHTML = `<div class="bub">${html}</div>`;
    if (actions && actions.length) { const a = document.createElement("div"); a.className = "cacts"; actions.forEach((ac) => { const b = document.createElement("button"); b.className = "cchip"; b.textContent = ac.label; b.onclick = ac.fn; a.appendChild(b); }); wrap.appendChild(a); }
    $("chatMsgs").appendChild(wrap); $("chatMsgs").scrollTop = $("chatMsgs").scrollHeight;
  }
  function chatSend(text) {
    if (!text.trim()) return; addChatMsg("me", esc(text)); $("chatInput").value = "";
    const r = chatReply(text);
    setTimeout(() => addChatMsg("bot", r.text.replace(/\n/g, "<br>"), r.actions), 260);
  }
  function renderChatChrome() {
    const R = CHAT[lang];
    $("chatTitle").textContent = R.title; $("chatSub").textContent = R.sub; $("chatInput").placeholder = R.placeholder;
    const chips = $("chatChips"); chips.innerHTML = "";
    R.chips.forEach((c) => { const b = document.createElement("button"); b.className = "qc"; b.textContent = c; b.onclick = () => chatSend(c); chips.appendChild(b); });
  }
  let chatSeeded = false;
  function openChat() { $("chatPanel").classList.add("show"); $("chatFab").style.display = "none"; if (!chatSeeded) { addChatMsg("bot", CHAT[lang].welcome); chatSeeded = true; } $("chatInput").focus(); }
  function closeChat() { $("chatPanel").classList.remove("show"); $("chatFab").style.display = ""; }
  function initChat() {
    renderChatChrome();
    $("chatFab").onclick = openChat; $("chatClose").onclick = closeChat;
    $("chatSendBtn").onclick = () => chatSend($("chatInput").value);
    $("chatInput").addEventListener("keydown", (e) => { if (e.key === "Enter") chatSend($("chatInput").value); });
  }

  /* ---------------- init ---------------- */
  applyI18n(); calc(); initChat();
})();
