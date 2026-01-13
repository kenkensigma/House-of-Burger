/* ========================================
       1. NAVIGATION ACTIVE STATE
       Mengubah warna link yang aktif berdasarkan scroll
       ======================================== */

// Ambil semua link navigasi
const navLinks = document.querySelectorAll(".nav-link");
// Ambil semua section di halaman
const sections = document.querySelectorAll("section");

// Event listener saat user scroll
window.addEventListener("scroll", () => {
  let current = ""; // Variable untuk nyimpan section yang aktif

  // Loop semua section untuk cek mana yang sedang dilihat
  sections.forEach((section) => {
    const sectionTop = section.offsetTop; // Jarak section dari atas
    const sectionHeight = section.clientHeight; // Tinggi section

    // Kalau posisi scroll sudah melewati section ini (dikurangi 200px buffer)
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id"); // Ambil id section (home, about, dll)
    }
  });

  // Loop semua link navigasi
  navLinks.forEach((link) => {
    link.classList.remove("active"); // Hapus class active dari semua link

    // Kalau href link sama dengan section yang aktif, tambahkan class active
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

/* ========================================
       2. SMOOTH SCROLL
       Saat klik link navigasi, scroll halus ke section
       ======================================== */

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Cegah behavior default (langsung jump)

    const targetId = link.getAttribute("href"); // Ambil href (#home, #about, dll)
    const targetSection = document.querySelector(targetId); // Cari section dengan id tersebut

    // Scroll ke section dengan animasi smooth
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

/* ========================================
       3. SCROLL ANIMATIONS - FORCE MODE
       Paksa animasi muncul di mobile
       ======================================== */

const animatedElements = document.querySelectorAll(
  ".fade-in, .slide-left, .slide-right, .zoom-in, .rotate-in, .flip-up, .bounce-in, .blur-in"
);

const isMobile = window.innerWidth <= 768;

// Di mobile, langsung trigger animasi tanpa observer
if (isMobile) {
  // Paksa visible saat scroll ke section menu
  window.addEventListener("scroll", () => {
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Jika elemen di viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });
  });

  // Trigger sekali pas load
  window.addEventListener("load", () => {
    setTimeout(() => {
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          el.classList.add("visible");
        }
      });
    }, 300);
  });
} else {
  // Desktop pakai intersection observer biasa
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
}

/* ========================================
       4. CONTACT FORM SUBMISSION
       Handle submit form kontak
       ======================================== */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Cegah form submit secara default (refresh halaman)

  // Tampilkan pesan sukses
  formSuccess.classList.add("show");

  // Reset semua field form
  contactForm.reset();

  // Sembunyikan pesan sukses setelah 5 detik
  setTimeout(() => {
    formSuccess.classList.remove("show");
  }, 5000);
});

/* ========================================
       5. MOBILE MENU TOGGLE
       Buka/tutup menu di mobile
       ======================================== */

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinksContainer = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");

  // Ganti icon hamburger jadi X saat menu terbuka
  if (navLinksContainer.classList.contains("active")) {
    mobileMenuBtn.textContent = "✕";
  } else {
    mobileMenuBtn.textContent = "☰";
  }
});

// Tutup menu saat link diklik
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    mobileMenuBtn.textContent = "☰";
  });
});

// Tutup menu saat klik di luar
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-container")) {
    navLinksContainer.classList.remove("active");
    mobileMenuBtn.textContent = "☰";
  }
});

/* ========================================
       6. RUNNING TEXT DUPLICATION
       Duplikasi konten running text biar seamless loop
       ======================================== */

const runningText = document.querySelector(".running-text");
// Duplikasi innerHTML nya sendiri supaya pas looping ga ada gap
runningText.innerHTML = runningText.innerHTML + runningText.innerHTML;

/* ========================================
       7. ORDER MODAL - FORM PEMESANAN
       Buka modal pemesanan saat klik tombol order
       ======================================== */

const orderModal = document.getElementById("orderModal");
const orderBtns = document.querySelectorAll(".btn-primary, .order-btn");
const closeModal = document.querySelector(".close-modal");
const orderForm = document.getElementById("orderForm");
const orderSuccess = document.getElementById("orderSuccess");

// Buka modal saat klik tombol pesan
orderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    orderModal.classList.add("show");
    document.body.style.overflow = "hidden"; // Disable scroll
  });
});

// Tutup modal saat klik tombol close
closeModal.addEventListener("click", () => {
  orderModal.classList.remove("show");
});

// Tutup modal saat klik di luar modal content
orderModal.addEventListener("click", (e) => {
  if (e.target === orderModal) {
    orderModal.classList.remove("show");
  }
});

// Handle form submission
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Sembunyikan form, tampilkan pesan sukses
  orderForm.style.display = "none";
  orderSuccess.classList.add("show");

  // Tutup modal setelah 3 detik
  setTimeout(() => {
    orderModal.classList.remove("show");
    document.body.style.overflow = "auto";
    orderForm.style.display = "block";
    orderSuccess.classList.remove("show");
    orderForm.reset();
  }, 3000);
});

// Update total harga berdasarkan quantity
const quantityInput = document.getElementById("quantity");
const burgerSelect = document.getElementById("burger");
const totalPrice = document.getElementById("totalPrice");
const grandTotal = document.getElementById("grandTotal");
const deliveryFee = 10000;

function updateTotal() {
  const selectedOption = burgerSelect.options[burgerSelect.selectedIndex];
  const price = parseInt(selectedOption.getAttribute("data-price") || 0);
  const quantity = parseInt(quantityInput.value) || 1;
  const total = price * quantity;
  const grand = total + deliveryFee;

  totalPrice.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  grandTotal.textContent = `Rp ${grand.toLocaleString("id-ID")}`;
}

burgerSelect.addEventListener("change", updateTotal);
quantityInput.addEventListener("input", updateTotal);
