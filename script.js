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
       3. SCROLL ANIMATIONS - BERULANG & VARIATIF
       Animasi muncul saat scroll sampai ke section
       Menggunakan berbagai jenis animasi yang berbeda
       AKAN BERULANG setiap kali masuk/keluar viewport
       ======================================== */

      // Ambil semua elemen yang punya class animasi
      const animatedElements = document.querySelectorAll(
        ".fade-in, .slide-left, .slide-right, .zoom-in, .rotate-in, .flip-up, .bounce-in, .blur-in"
      );

      // Buat observer untuk deteksi saat elemen masuk/keluar viewport
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Kalau elemen terlihat di layar (masuk viewport)
            if (entry.isIntersecting) {
              entry.target.classList.add("visible"); // Tambah class visible untuk trigger animasi
            } else {
              // Kalau elemen keluar dari layar
              entry.target.classList.remove("visible"); // Hapus class visible, balik ke state awal
              // Nanti kalau di-scroll balik ke section ini, animasi akan muncul lagi!
            }
          });
        },
        {
          threshold: 0.15, // Trigger saat 15% elemen terlihat
          rootMargin: "0px 0px -80px 0px", // Buffer 80px dari bawah
        }
      );

      // Apply observer ke semua elemen dengan animasi
      animatedElements.forEach((el) => {
        animationObserver.observe(el);
      });

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
        document.body.style.overflow = "auto"; // Enable scroll
      });

      // Tutup modal saat klik di luar modal content
      orderModal.addEventListener("click", (e) => {
        if (e.target === orderModal) {
          orderModal.classList.remove("show");
          document.body.style.overflow = "auto";
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