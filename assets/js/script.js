'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    if (!modalImg || !modalTitle || !modalText) return;

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    if (!selectValue || !select) return;

    const selectedValue = this.innerText.trim();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const normalizeCategory = function (value) {
  return String(value || "").trim().toLowerCase();
};

const filterFunc = function (selectedValue) {
  const normalizedSelectedValue = normalizeCategory(selectedValue);

  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = normalizeCategory(filterItems[i].dataset.category);

    if (normalizedSelectedValue === "all" || itemCategory === normalizedSelectedValue) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
if (filterBtn.length) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      const selectedValue = this.innerText.trim();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    if (!form || !formBtn) return;

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Handle form submission
if (form) {
  form.addEventListener("submit", function (e) {
    const originalText = formBtn.querySelector("span").textContent;
    formBtn.querySelector("span").textContent = "Sending...";
    formBtn.disabled = true;

    // Formspree will handle the rest automatically
    // After submission, it redirects or shows success message
  });
}





// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const syncPageFromHash = function () {
  const hash = location.hash.replace("#", "");
  const pageName = hash || "about";

  pages.forEach((page) => {
    const isMatch = page.dataset.page === pageName;
    page.classList.toggle("active", isMatch);
  });

  navigationLinks.forEach((link) => {
    const linkPage = link.dataset.page || link.textContent.trim().toLowerCase().replace(/\s+/g, "-");
    link.classList.toggle("active", linkPage === pageName);
  });
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.dataset.page || this.textContent.trim().toLowerCase().replace(/\s+/g, "-");

    pages.forEach((page) => {
      const isMatch = page.dataset.page === pageName;
      page.classList.toggle("active", isMatch);
    });

    navigationLinks.forEach((link) => {
      const linkPage = link.dataset.page || link.textContent.trim().toLowerCase().replace(/\s+/g, "-");
      link.classList.toggle("active", linkPage === pageName);
    });

    history.replaceState(null, "", `#${pageName}`);
    window.scrollTo(0, 0);
  });
}

window.addEventListener("hashchange", syncPageFromHash);
syncPageFromHash();