(async function () {
  const grid = document.getElementById("projects-grid");
  const nav = document.querySelector(".project-nav");

  if (!grid || !nav) {
    console.error("Required DOM elements not found");
    return;
  }

  let data = [];
  try {
    const response = await fetch("./data/projects.json");
    console.log("Fetch attempt made");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    data = await response.json();
    console.log("Projects data loaded:", data);
  } catch (err) {
    console.error("Error loading projects:", err);
    grid.innerHTML = `<p>Error loading projects: ${err.message}</p>`;
    return;
  }

  if (!Array.isArray(data)) {
    console.error("Invalid data format");
    return;
  }

  function createCard(project, idx) {
    if (!project) return "";
    const imagePath = project.image || "./img/placeholder.png";

    return `
      <article class="card-article" data-category="${
        project.category || ""
      }" data-index="${idx}">
        <img 
          src="${imagePath}" 
          alt="${project.title}"
          class="card-img"
          onerror="this.onerror=null; this.src='./img/placeholder.png';"
        />
        <div class="card-data">
          <span class="card-description">${project.title || ""}</span>
          <h2 class="card-title">${project.type || ""}</h2>
          <button class="card-button">Learn More</button>
          <div class="card-extra">
            <p>${project.summary || ""}</p>
          </div>
        </div>
      </article>
    `;
  }

  const cards = data.map((p, i) => createCard(p, i)).join("");
  grid.innerHTML = cards || "<p>No projects to display</p>";

  // Side drawer: open project details when Learn More is clicked
  const drawer = document.getElementById("project-drawer");
  const pdContent = drawer ? drawer.querySelector(".pd-content") : null;
  let _lastTrigger = null;
  const _drawerDetailCache = { project: null, experience: null };

  async function loadDrawerData(kind) {
    const key = kind === "experience" ? "experience" : "project";
    if (_drawerDetailCache[key]) return _drawerDetailCache[key];
    try {
      const resp = await fetch(`./data/${key}_drawer_content.json`);
      if (!resp.ok) throw new Error("Failed loading drawer data");
      const json = await resp.json();
      _drawerDetailCache[key] = Array.isArray(json) ? json : [];
      return _drawerDetailCache[key];
    } catch (err) {
      console.warn("Could not load drawer content for", kind, err);
      _drawerDetailCache[key] = [];
      return _drawerDetailCache[key];
    }
  }

  function findDrawerEntry(kind, base) {
    const key = kind === "experience" ? "experience" : "project";
    const list = _drawerDetailCache[key] || [];
    if (!base) return null;
    // prefer slug match, then title match
    const slug = (
      base.slug ||
      (base.title || "")
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
    ).toString();
    let found = list.find((x) => x.slug && x.slug === slug);
    if (found) return found;
    found = list.find(
      (x) =>
        x.title &&
        x.title.toString().trim() === (base.title || "").toString().trim()
    );
    return found || null;
  }

  function buildContent(project) {
    if (!project) return `<p>Details not available.</p>`;
    const title = project.title || project.name || "Untitled";
    const type = project.type || "";
    const organization = project.organization || project.company || "";
    const long =
      project.longSummary || project.description || project.summary || "";
    const dates = project.dates || project.period || "";
    const tools = Array.isArray(project.tools)
      ? project.tools
      : project.tools
      ? [project.tools]
      : [];
    const responsibilities = Array.isArray(project.responsibilities)
      ? project.responsibilities
      : project.responsibilities
      ? [project.responsibilities]
      : [];
    const images = Array.isArray(project.gallery)
      ? project.gallery
      : Array.isArray(project.images)
      ? project.images
      : project.image
      ? [project.image]
      : [];
    // gallery supports both string URLs and objects { src, alt, link }
    const galleryMarkup = images.length
      ? `<div class="pd-gallery">
      ${images
        .map((item) => {
          // CASE 1 — old format: "gallery": ["./img/foo.png"]
          if (typeof item === "string") {
            return `
              <img 
                src="${item}" 
                alt="${title}" 
                loading="lazy"
                onerror="this.onerror=null; this.src='./img/placeholder.png'" 
              />
            `;
          }

          // CASE 2 — new format: "gallery": [{ src, alt, link }]
          if (item && typeof item === "object") {
            const src = item.src;
            const alt = item.alt || title;
            const link = item.link;

            if (!src) return "";

            const imgTag = `
              <img 
                src="${src}" 
                alt="${alt}"
                loading="lazy"
                onerror="this.onerror=null; this.src='./img/placeholder.png'" 
              />
            `;

            // If link exists, wrap image with <a>
            return link
              ? `<a href="${link}" target="_blank" rel="noopener">${imgTag}</a>`
              : imgTag;
          }

          return "";
        })
        .join("")}
    </div>`
      : "";

    return `
      <header>
        <small class="pd-type">${type}</small>
        <h2>${title}</h2>
        ${organization ? `<h3 class="pd-org">${organization}</h3>` : ""}
        ${dates ? `<div class="pd-dates">${dates}</div>` : ""}
      </header>
      <section class="pd-body">
        <p>${long}</p>
        ${
          responsibilities.length
            ? `<div class="pd-resp"><h4>Responsibilities</h4><ul>${responsibilities
                .map((r) => `<li>${r}</li>`)
                .join("")}</ul></div>`
            : ""
        }
        
        ${
          tools.length
            ? `<p class="pd-tools"><strong>Tools:</strong> ${tools.join(
                ", "
              )}</p>`
            : ""
        }
        ${galleryMarkup}

      </section>
    `;
  }

  async function openDrawer(project, trigger, kind = "project") {
    if (!drawer || !pdContent) return;
    _lastTrigger = trigger || null;
    // try to fetch richer content for this item if available
    try {
      await loadDrawerData(kind);
      const detail = findDrawerEntry(kind, project);
      const merged = detail ? Object.assign({}, project, detail) : project;
      pdContent.innerHTML = buildContent(merged);
    } catch (err) {
      // fallback to basic
      pdContent.innerHTML = buildContent(project);
    }

    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    // focus management
    drawer.focus();

    // Esc to close
    document.addEventListener("keydown", handleKeydown);
  }

  function closeDrawer(returnFocus = true) {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", handleKeydown);
    // return focus to the trigger optionally; avoid immediate focus on overlay clicks
    if (returnFocus) {
      try {
        if (_lastTrigger && typeof _lastTrigger.focus === "function")
          _lastTrigger.focus();
      } catch (e) {}
    }
  }

  function handleKeydown(e) {
    if (e.key === "Escape") closeDrawer();
  }

  if (drawer) {
    // close when clicking the close button or anywhere outside the panel (overlay/click-through)
    drawer.addEventListener("click", (e) => {
      // prevent the click from bubbling to underlying elements
      e.stopPropagation();
      const closeBtn = e.target.closest(".pd-close");
      if (closeBtn) {
        closeDrawer(true);
        return;
      }

      // if the click target is not inside the panel, close (overlay click)
      const insidePanel = e.target.closest(".pd-panel");
      if (!insidePanel) {
        // when clicking outside (overlay), don't immediately return focus to the trigger
        // to avoid visual jumps on the originating card
        closeDrawer(false);
      }
    });
  }

  // delegate Learn More clicks
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-button");
    if (!btn) return;
    const card = btn.closest(".card-article");
    if (!card) return;
    const idx = Number(card.dataset.index);
    const project = data[idx];
    if (!project) return;
    openDrawer(project, btn);
  });

  // Add filter functionality (robust: support multi-category values and show/hide via style)
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const filter = (btn.dataset.filter || "all").toString();

    // toggle active class
    nav
      .querySelectorAll("button")
      .forEach((b) => b.classList.toggle("active", b === btn));

    // for each card, check its data-category (allow multiple categories separated by space or comma)
    grid.querySelectorAll(".card-article").forEach((card) => {
      const raw = card.dataset.category || "";
      const cats = raw
        .toString()
        .split(/[,\s]+/) // split on commas or whitespace
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (filter === "all" || cats.includes(filter.toLowerCase())) {
        // show with fade: remove is-hidden and ensure element is layout-visible
        card.classList.remove("is-hidden");
        card.style.display = "";
        // force reflow so transition runs if previously hidden
        void card.offsetWidth;
        card.style.opacity = "";
      } else {
        // start fade then remove from layout after transition
        card.classList.add("is-hidden");
        // after transition, set display:none to remove from layout
        const onEnd = (ev) => {
          if (ev.propertyName !== "opacity") return;
          card.style.display = "none";
          card.removeEventListener("transitionend", onEnd);
        };
        card.addEventListener("transitionend", onEnd);
      }
    });
  });
  // expose drawer opener so other scripts (experience.js) can reuse it
  try {
    window.__openDetailDrawer = function (
      dataObj,
      triggerEl,
      kind = "project"
    ) {
      try {
        // openDrawer is async but we don't need to await here
        openDrawer(dataObj, triggerEl, kind);
      } catch (err) {
        console.error("Error opening detail drawer:", err);
      }
    };
  } catch (e) {
    /* ignore */
  }
})();
