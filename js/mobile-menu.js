const navList = document.getElementById("main-nav");
const headerNav = document.querySelector(".header-nav");
const modalContent = document.getElementById("modalContent");
const burgerBtn = document.getElementById("burgerBtn");
const closeModal = document.getElementById("closeModal");
const mobileModal = document.getElementById("mobileModal");
const mobileContainerControls = document.getElementById("mobileControls");
// const overflow = document.querySelector(".overflow");

function moveNav() {
    if (window.innerWidth <= 1024) {
      if (!modalContent.contains(navList)) {
        modalContent.appendChild(navList);
      }
      if (!modalContent.contains(mobileContainerControls)) {
        modalContent.appendChild(mobileContainerControls);
      }
    } else {
      if (!headerNav.contains(navList)) {
        headerNav.appendChild(navList);
      }
      if (!headerNav.contains(mobileControls)) {
        headerNav.appendChild(mobileControls);
      }
    }
  }

function onEscClose(e) {
  if (e.code === 'Escape') {
    modalMobileNav.close();
  }
}

const modalMobileNav = {
  onShow: () => {
    document.body.classList.add('is-scroll-block');
    mobileModal.classList.add("open","scale-in-center");
    document.body.classList.add("is-scroll-block");
    // overflow?.classList.remove("visually-hidden");
    document.addEventListener("keydown", onEscClose);
  },
  onClose: () => {
    document.body.classList.remove('is-scroll-block');
    mobileModal.classList.remove("scale-in-center");
    mobileModal.classList.add("scale-out-center");
    // mobileModal.classList.remove("open");
    document.body.classList.remove("is-scroll-block");
    // overflow?.classList.add("visually-hidden");
    document.removeEventListener("keydown", onEscClose);
    setTimeout(() => {
        mobileModal.classList.remove("open", "scale-out-center");
        // overflow?.classList.add("visually-hidden");
      }, 300); 
  },
  
  close: () => {
    modalMobileNav.onClose();
  }
};

// Відкриття
burgerBtn.addEventListener("click", modalMobileNav.onShow);


closeModal.addEventListener("click", modalMobileNav.close);


mobileModal.addEventListener("click", e => {
  if (e.target === mobileModal) {
    modalMobileNav.close();
  }
});


document.querySelectorAll('.nav-list .link').forEach(link => {
  link.addEventListener('click', modalMobileNav.close);
});

window.addEventListener("resize", moveNav);
window.addEventListener("DOMContentLoaded", moveNav);

