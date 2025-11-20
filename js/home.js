// Lightweight Light/Dark toggle: keep it separate so it always runs
// It toggles `body.light-mode` when the checkbox is changed and persists the
// preference to localStorage so the choice survives page reloads.
document.addEventListener("DOMContentLoaded", function () {
  try {
    const toggle = document.getElementById("toggle");
    const body = document.body;

    // Restore preference if present
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      body.classList.add("light-mode");
      if (toggle) toggle.checked = true;
    } else if (saved === "dark") {
      body.classList.remove("light-mode");
      if (toggle) toggle.checked = false;
    } else if (toggle && toggle.checked) {
      // If no saved pref, use checkbox initial state
      body.classList.add("light-mode");
    }

    if (toggle) {
      toggle.addEventListener("change", function () {
        if (toggle.checked) {
          body.classList.add("light-mode");
          localStorage.setItem("theme", "light");
        } else {
          body.classList.remove("light-mode");
          localStorage.setItem("theme", "dark");
        }
      });
    }
  } catch (err) {
    // non-fatal; ensure script doesn't crash the rest of the file
    console.error("Error initializing theme toggle:", err);
  }
});

// Take cares of the modal for experience details

// (async function () {
//   const grid = document.getElementById("experiences-grid");
//   const nav = document.querySelector(".experience-nav");
//   const modal = document.getElementById("xp-modal");

//   if (!grid || !nav || !modal) {
//     console.error("Required DOM elements not found");
//     return;
//   }

//   // modal element refs
//   const mBox = modal.querySelector(".xp-modal__box");
//   const mClose = modal.querySelector(".xp-modal__close");
//   const mTitle = modal.querySelector("#xp-modal-title");
//   const mOrg = modal.querySelector(".xp-modal__org");
//   const mSummary = modal.querySelector(".xp-modal__summary");
//   const mRole = modal.querySelector(".xp-modal__role");
//   const mTools = modal.querySelector(".xp-modal__tools");
//   const mGallery = modal.querySelector(".xp-modal__gallery");
//   const mLinks = modal.querySelector(".xp-modal__links");

//   // helpers
//   const openModal = () => {
//     modal.classList.add("is-open");
//     document.body.classList.add("no-scroll");
//   };
//   const closeModal = () => {
//     modal.classList.remove("is-open");
//     document.body.classList.remove("no-scroll");
//   };

//   let data = [];
//   try {
//     const response = await fetch("./data/experience.json");
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     data = await response.json();
//     console.log("Loaded experiences:", data);
//   } catch (err) {
//     console.error("Error loading experiences:", err);
//     grid.innerHTML = `<p>Error loading experiences: ${err.message}</p>`;
//     return;
//   }
//   if (!Array.isArray(data)) return;

  // ---- create card now includes data-index ----
  // function createCard(experience, idx) {
  //   if (!experience) return "";
  //   const imagePath = experience.image || "./img/placeholder.png";

  //   return `
  //     <article class="card-article" data-index="${idx}" data-category="${
  //     experience.category || ""
  //   }">
  //       <img 
  //         src="${imagePath}" 
  //         alt="${experience.title}"
  //         class="card-img"
  //         onerror="this.onerror=null; this.src='./img/placeholder.png';"
  //       />
  //       <div class="card-data">
  //         <span class="card-description">${experience.title || ""}</span>
  //         <h2 class="card-title">${experience.organization || ""}</h2>
  //         <button class="card-button">Learn More</button>
  //         <div class="card-extra">
  //           <p>${experience.summary || ""}</p>
  //         </div>
  //       </div>
  //     </article>
  //   `;
  // }

  // const cards = data.map((exp, i) => createCard(exp, i)).join("");
  // grid.innerHTML = cards || "<p>No experiences to display</p>";

  // ---- event delegation: open modal and populate from data ----
  // grid.addEventListener("click", (e) => {
  //   const btn = e.target.closest(".card-button");
  //   if (!btn) return;

  //   const card = btn.closest(".card-article");
  //   const idx = Number(card?.dataset.index);
  //   const xp = data[idx];
  //   if (!xp) return;

  //   console.log("Opening modal for:", xp.title, xp);

  // Fill modal content safely
  // mTitle.textContent = xp.title || "Untitled";
  // mOrg.textContent = xp.organization || "";
  // mSummary.textContent = xp.longSummary || xp.summary || "";

  // roles / responsibilities list (array of strings)
  // mRole.innerHTML = Array.isArray(xp.responsibilities)
  //   ? xp.responsibilities.map((r) => `<li>• ${r}</li>`).join("")
  //   : "";

  // tools list (array of strings)
  // mTools.innerHTML = Array.isArray(xp.tools)
  //   ? xp.tools.map((t) => `<li>#${t}</li>`).join("")
  //   : "";

  // gallery (supports both string URLs and objects { src, alt, link })
  // if (Array.isArray(xp.gallery) && xp.gallery.length) {
  //   console.log("Rendering gallery for:", xp.title, xp.gallery);

  //   mGallery.innerHTML = xp.gallery
  //     .map((item) => {
  //       let src, alt, link;

  // Old format: ["./img/foo.png", "./img/bar.png"]
  // if (typeof item === "string") {
  //   src = item;
  //   alt = `${xp.title} image`;
  //   link = null;
  // }
  // New format: [{ src, alt, link }]
  // else if (item && typeof item === "object") {
  //   src = item.src;
  //   alt = item.alt || `${xp.title} image`;
  //   link = item.link || null;
  // } else {
  //   return "";
  // }

  // if (!src) return "";

  // const imgMarkup = `<img src="${src}" alt="${alt}">`;

  // Make image clickable if link exists
  //       if (link) {
  //         return `<a href="${link}" target="_blank" rel="noopener">${imgMarkup}</a>`;
  //       }

  //       return imgMarkup;
  //     })
  //     .join("");
  // } else if (xp.image) {
  // Fallback if no gallery
  //   mGallery.innerHTML = `<img src="${xp.image}" alt="${xp.title} image">`;
  // } else {
  //   mGallery.innerHTML = "";
  // }

  // links (array of {label, url})
  //   mLinks.innerHTML = Array.isArray(xp.links)
  //     ? xp.links
  //         .filter((l) => l?.url)
  //         .map(
  //           (l) =>
  //             `<a href="${l.url}" target="_blank" rel="noopener">${
  //               l.label || "Open"
  //             }</a>`
  //         )
  //         .join("")
  //     : "";

  //   openModal();
  // });

  // ---- close interactions ----
  // mClose.addEventListener("click", closeModal);
  // modal.addEventListener("click", (e) => {
  //   if (e.target === modal || e.target.classList.contains("xp-modal__backdrop"))
  //     closeModal();
  // });

  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  // });

  // ---- filter code unchanged ----
//   nav.addEventListener("click", (e) => {
//     const btn = e.target.closest("button");
//     if (!btn) return;

//     const filter = (btn.dataset.filter || "all").toString();
//     nav
//       .querySelectorAll("button")
//       .forEach((b) => b.classList.toggle("active", b === btn));

//     grid.querySelectorAll(".card-article").forEach((card) => {
//       const raw = card.dataset.category || "";
//       const cats = raw
//         .toString()
//         .split(/[,\s]+/)
//         .map((s) => s.trim().toLowerCase())
//         .filter(Boolean);

//       if (filter === "all" || cats.includes(filter.toLowerCase())) {
//         card.classList.remove("is-hidden");
//         card.style.display = "";
//         void card.offsetWidth;
//         card.style.opacity = "";
//       } else {
//         card.classList.add("is-hidden");
//         const onEnd = (ev) => {
//           if (ev.propertyName !== "opacity") return;
//           card.style.display = "none";
//           card.removeEventListener("transitionend", onEnd);
//         };
//         card.addEventListener("transitionend", onEnd);
//       }
//     });
//   });
// })();
