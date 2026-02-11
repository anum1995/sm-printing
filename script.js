// ====== EDIT THIS ======
const BUSINESS_PHONE_US = "18324808328"; // 1 + 832-480-8328
const DISPLAY_PHONE = "832-480-8328";
// =======================

function buildLinks() {
  const smsBody = encodeURIComponent(
    "Hi! I want a quote for T-shirt printing.\nQuantity: __\nSizes: __\nFront/Back: __\nDesign/Logo: __"
  );

  // On iPhone/Android, sms: works. Some desktop browsers may ignore it (that's normal).
  const smsHref = `sms:${DISPLAY_PHONE}?&body=${smsBody}`;

  const waText = encodeURIComponent(
    "Hi! I want a quote for T-shirt printing.\nQuantity: __\nSizes: __\nFront/Back: __\n(I can send my design here)"
  );
  const waHref = `https://wa.me/${BUSINESS_PHONE_US}?text=${waText}`;

  const sms = document.getElementById("smsLink");
  const wa = document.getElementById("waLink");

  if (sms) sms.href = smsHref;
  if (wa) wa.href = waHref;
}

function setupModal() {
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("closeModal");
  if (!backdrop) return;

  const openButtons = [
    "contactBtn","contactBtn2","contactBtn3","contactBtn4","contactBtn5","contactBtn6"
  ].map(id => document.getElementById(id)).filter(Boolean);

  function openModal() {
    buildLinks();
    backdrop.classList.add("show");
    backdrop.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    backdrop.classList.remove("show");
    backdrop.setAttribute("aria-hidden", "true");
  }

  openButtons.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function setupYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function setupFiltersAndSearch() {
  const chips = document.querySelectorAll(".filters .chip");
  const items = document.querySelectorAll(".work");
  const searchInput = document.getElementById("searchInput");

  if (!items.length) return;

  let activeFilter = "all";
  let searchTerm = "";

  const apply = () => {
    items.forEach(item => {
      const tags = (item.dataset.tags || "").split(" ").filter(Boolean);
      const title = (item.dataset.title || "").toLowerCase();
      const hay = (title + " " + tags.join(" ")).toLowerCase();

      const matchFilter = activeFilter === "all" || tags.includes(activeFilter);
      const matchSearch = !searchTerm || hay.includes(searchTerm);

      item.style.display = (matchFilter && matchSearch) ? "" : "none";
    });
  };

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter || "all";
      apply();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = (searchInput.value || "").trim().toLowerCase();
      apply();
    });
  }
}

setupYear();
setupModal();
setupFiltersAndSearch();
