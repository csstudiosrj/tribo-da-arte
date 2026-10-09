/* ==========================================================================
   TRIBO DA ARTE — Interações do site
   Sem dependências. Cada bloco é independente e seguro contra erros.
   ========================================================================== */

/* >>> CONFIGURAÇÕES (edite aqui) ----------------------------------------- */
const CONFIG = {
  // Chave do formulário (gratuita) em https://web3forms.com — veja o README, passo 5.
  web3formsKey: "COLE_SUA_CHAVE_AQUI",
  whatsapp: "5511976701636",
  assuntoEmail: "Novo pedido de orçamento — Site Tribo da Arte"
};
/* <<< ---------------------------------------------------------------------- */

(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const safe = (fn) => { try { fn(); } catch (e) { console.warn("[Tribo]", e); } };

  /* Preloader: mostra só na primeira visita da sessão */
  safe(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("tribo-seen") === "1"; sessionStorage.setItem("tribo-seen", "1"); } catch (e) {}
    const delay = seen || reduce ? 0 : 1100;
    const done = () => document.documentElement.classList.add("is-loaded");
    const run = () => setTimeout(() => { document.body.classList.add("is-loaded"); done(); }, delay);
    if (document.readyState === "complete") run(); else window.addEventListener("load", run);
    setTimeout(() => document.body.classList.add("is-loaded"), 3500); // segurança
  });

  /* Cabeçalho: sombra + esconde ao rolar para baixo + barra de progresso */
  safe(() => {
    const header = $(".site-header");
    const bar = $(".scroll-progress");
    let lastY = window.scrollY, ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (header) {
        header.classList.toggle("is-scrolled", y > 30);
        const goingDown = y > lastY && y > 400;
        header.classList.toggle("is-hidden", goingDown && !document.body.classList.contains("menu-open"));
      }
      if (bar && max > 0) bar.style.transform = "scaleX(" + Math.min(y / max, 1) + ")";
      lastY = y; ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  });

  /* Menu mobile */
  safe(() => {
    const btn = $(".menu-toggle");
    const nav = $("#menu");
    if (!btn || !nav) return;
    const set = (open) => {
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    btn.addEventListener("click", () => set(!document.body.classList.contains("menu-open")));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    $$("a", nav).forEach((a) => a.addEventListener("click", () => set(false)));
  });

  /* Revelar ao rolar */
  safe(() => {
    const els = $$("[data-reveal], .line, .step");
    if (!("IntersectionObserver" in window) || reduce) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => {
      const d = el.getAttribute("data-delay");
      if (d) el.style.setProperty("--d", d + "s");
      io.observe(el);
    });
  });

  /* Cursor personalizado (apenas mouse) */
  safe(() => {
    const cur = $(".cursor");
    if (!cur || !finePointer || reduce) return;
    let x = 0, y = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; cur.classList.add("is-on"); }, { passive: true });
    document.addEventListener("mouseleave", () => cur.classList.remove("is-on"));
    const loop = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; cur.style.transform = "translate(" + cx + "px," + cy + "px)"; requestAnimationFrame(loop); };
    loop();
    document.addEventListener("mouseover", (e) => {
      cur.classList.toggle("is-hover", !!e.target.closest("a, button, summary, .work, input, select, textarea, label"));
    });
  });

  /* Botões magnéticos + paralaxe do emblema */
  safe(() => {
    if (!finePointer || reduce) return;
    $$(".btn").forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.18) + "px," + ((e.clientY - r.top - r.height / 2) * 0.28) + "px)";
      });
      b.addEventListener("mouseleave", () => { b.style.transform = ""; });
    });
    const seal = $(".hero-emblem .seal");
    const hero = $(".hero");
    if (seal && hero) {
      hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        seal.style.transform = "translate(" + dx * 26 + "px," + dy * 26 + "px) rotate(" + dx * 10 + "deg)";
      });
    }
  });

  /* Transição suave entre páginas */
  safe(() => {
    $$("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || a.target === "_blank") return;
      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        document.body.classList.add("page-leave");
        setTimeout(() => { window.location.href = href; }, reduce ? 0 : 320);
      });
    });
    window.addEventListener("pageshow", (e) => { if (e.persisted) document.body.classList.remove("page-leave"); });
  });

  /* Ano no rodapé */
  safe(() => { $$("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear())); });

  /* ---------------- Portfólio ---------------- */
  const ICONES = {
    esculturas: '<svg viewBox="0 0 100 100" fill="none" stroke="#F3ECE2" stroke-width="1.6"><path d="M50 8c10 0 17 8 17 18 0 7-4 12-8 16 14 4 24 16 24 32v8H17v-8c0-16 10-28 24-32-4-4-8-9-8-16 0-10 7-18 17-18Z"/></svg>',
    mockups: '<svg viewBox="0 0 100 100" fill="none" stroke="#F3ECE2" stroke-width="1.6"><path d="M50 10 88 30v40L50 90 12 70V30l38-20Z"/><path d="M12 30l38 20 38-20M50 50v40"/></svg>',
    aderecos: '<svg viewBox="0 0 100 100" fill="none" stroke="#F3ECE2" stroke-width="1.6"><path d="M30 12h40l6 22H24l6-22Z"/><path d="M28 34c0 30 6 40 22 54 16-14 22-24 22-54"/></svg>',
    eventos: '<svg viewBox="0 0 100 100" fill="none" stroke="#F3ECE2" stroke-width="1.6"><path d="M10 80h80M20 80V40l30-24 30 24v40"/><path d="M42 80V56h16v24"/></svg>',
    vitrines: '<svg viewBox="0 0 100 100" fill="none" stroke="#F3ECE2" stroke-width="1.6"><rect x="12" y="16" width="76" height="62" rx="4"/><path d="M12 62h76M34 78v10M66 78v10M30 62c0-14 8-24 20-24s20 10 20 24"/></svg>',
    audiovisual: '<svg viewBox="0 0 100 100" fill="none" stroke="#F3ECE2" stroke-width="1.6"><rect x="10" y="26" width="58" height="48" rx="6"/><path d="m68 42 22-12v40L68 58"/></svg>'
  };
  const FUNDOS = {
    esculturas: "linear-gradient(135deg,#8F3318,#1a0b06 70%)",
    mockups: "linear-gradient(135deg,#2b2118,#0B0908 70%)",
    aderecos: "linear-gradient(135deg,#6a2a12,#14100E 70%)",
    eventos: "linear-gradient(135deg,#E8461E,#3a1409 75%)",
    vitrines: "linear-gradient(135deg,#3a2d1f,#0B0908 70%)",
    audiovisual: "linear-gradient(135deg,#1D1815,#6a2a12 90%)"
  };
  const nomeCat = (id) => { const c = (window.TRIBO_CATEGORIAS || []).find((x) => x.id === id); return c ? c.nome : id; };
  const media = (p) => p.image
    ? '<img src="' + p.image + '" alt="' + p.titulo.replace(/"/g, "&quot;") + '" loading="lazy" decoding="async">'
    : '<div class="ph" style="--bg:' + (FUNDOS[p.cat] || FUNDOS.esculturas) + '">' + (ICONES[p.cat] || ICONES.esculturas) + "<small>Foto em breve</small></div>";

  safe(() => {
    const grid = $("[data-works]");
    if (!grid || !window.TRIBO_PROJETOS) return;
    const limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    const lista = limit ? window.TRIBO_PROJETOS.slice(0, limit) : window.TRIBO_PROJETOS;

    grid.innerHTML = lista.map((p, i) =>
      '<button class="work" type="button" data-cat="' + p.cat + '" data-i="' + i + '" data-reveal data-delay="' + ((i % 3) * 0.08).toFixed(2) + '" aria-haspopup="dialog">' +
      '<div class="work-media">' + media(p) + "</div>" +
      '<div class="work-info"><h3>' + p.titulo + "</h3><span>" + nomeCat(p.cat).split(" & ")[0] + "</span></div></button>"
    ).join("");

    // reativa o "revelar" para os itens recém-criados
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.1 });
      $$(".work", grid).forEach((el) => { const d = el.getAttribute("data-delay"); if (d) el.style.setProperty("--d", d + "s"); io.observe(el); });
    } else { $$(".work", grid).forEach((el) => el.classList.add("is-in")); }

    // filtros
    const fbox = $("[data-filters]");
    if (fbox) {
      fbox.innerHTML = window.TRIBO_CATEGORIAS.map((c, i) => '<button class="chip" type="button" data-f="' + c.id + '" aria-pressed="' + (i === 0) + '">' + c.nome + "</button>").join("");
      fbox.addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        $$(".chip", fbox).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
        const f = b.getAttribute("data-f");
        $$(".work", grid).forEach((w) => w.classList.toggle("is-hidden", f !== "todos" && w.getAttribute("data-cat") !== f));
      });
    }

    // modal
    const dlg = $("#work-modal");
    if (dlg && typeof dlg.showModal === "function") {
      grid.addEventListener("click", (e) => {
        const w = e.target.closest(".work"); if (!w) return;
        const p = lista[parseInt(w.getAttribute("data-i"), 10)];
        $(".modal-media", dlg).innerHTML = media(p);
        $(".modal-body .tag", dlg).textContent = nomeCat(p.cat) + (p.ano ? " · " + p.ano : "");
        $(".modal-body h3", dlg).textContent = p.titulo;
        $(".modal-body p", dlg).textContent = p.descricao;
        const msg = encodeURIComponent("Olá! Vi o projeto \"" + p.titulo + "\" no site da Tribo da Arte e gostaria de um orçamento.");
        $(".modal-body .wa", dlg).setAttribute("href", "https://wa.me/" + CONFIG.whatsapp + "?text=" + msg);
        dlg.showModal();
      });
      dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".modal-close")) dlg.close(); });
    }
  });

  /* ---------------- Formulário de contato ---------------- */
  safe(() => {
    const form = $("#contact-form");
    if (!form) return;
    const status = $(".form-status", form);
    const btn = $("button[type=submit]", form);
    const say = (msg, kind) => { status.textContent = msg; status.className = "form-status " + (kind || ""); };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = new FormData(form);
      if (data.get("botcheck")) return; // anti-spam (honeypot)

      const nome = data.get("nome"), tipo = data.get("tipo");
      const resumo = "Olá! Meu nome é " + nome + ". Gostaria de um orçamento — " + tipo + ".\n" + (data.get("mensagem") || "");
      const waUrl = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(resumo);

      // Enquanto a chave não for configurada, abre o WhatsApp como alternativa.
      if (!CONFIG.web3formsKey || CONFIG.web3formsKey.indexOf("COLE_") === 0) {
        say("Formulário ainda não ativado — abrindo o WhatsApp para você falar direto conosco.", "err");
        window.open(waUrl, "_blank", "noopener");
        return;
      }

      data.append("access_key", CONFIG.web3formsKey);
      data.append("subject", CONFIG.assuntoEmail);
      data.append("from_name", "Site Tribo da Arte");
      btn.disabled = true; say("Enviando…");
      try {
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: data });
        const json = await res.json();
        if (json.success) {
          say("Mensagem enviada! Retornamos em breve. Se for urgente, chame no WhatsApp.", "ok");
          form.reset();
        } else { throw new Error(json.message || "erro"); }
      } catch (err) {
        say("Não conseguimos enviar agora. Tente pelo WhatsApp ou por e-mail.", "err");
      } finally { btn.disabled = false; }
    });
  });
})();
