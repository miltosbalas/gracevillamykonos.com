/* =========================================================
   GRACE VILLA MYKONOS — main.js
   ========================================================= */

/* ---------- CONFIG ----------
   If you want "Book Now" to jump straight to an external URL
   (Airbnb, Booking.com, your booking engine, etc.) instead of
   opening the on-site form, just paste the link below between
   the quotes. Leave it as an empty string "" to keep the
   on-site booking form/modal behaviour.
------------------------------------------------------------- */
const BOOKING_URL = ""; // e.g. "https://www.airbnb.com/rooms/845582336211151746"

const CONTACT_EMAIL = "book@gracevillamykonos.com";
const CONTACT_PHONE = "+306989787742";

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
const preloader = document.getElementById('preloader');
if (document.readyState === 'complete') {
  setTimeout(() => preloader.classList.add('hide'), 400);
} else {
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 400);
  });
}
setTimeout(() => preloader.classList.add('hide'), 1800);

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById('cursorDot');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .g-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
  }

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* ---------- MOBILE BURGER MENU ---------- */
  const burger = document.getElementById('burger');
  const navLinksWrap = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinksWrap.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinksWrap.classList.remove('open');
    });
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-link');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(s => spyObserver.observe(s));

  /* ---------- HERO SLIDESHOW ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  let slideIndex = 0;
  if (slides.length) {
    setInterval(() => {
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add('active');
    }, 6000);
  }

  /* ---------- SCROLL REVEAL (AOS-lite) ---------- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- LIGHTBOX FOR GALLERY ---------- */
  const lightboxLinks = document.querySelectorAll('[data-lightbox]');
  if (lightboxLinks.length) {
    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.innerHTML = `
      <button class="lb-close" aria-label="Close">&times;</button>
      <img class="lb-img" src="" alt="Grace Villa Mykonos">
    `;
    document.body.appendChild(overlay);
    const style = document.createElement('style');
    style.textContent = `
      .lb-overlay{position:fixed;inset:0;background:rgba(10,18,28,.94);z-index:3000;
        display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;
        transition:.3s ease;padding:30px;}
      .lb-overlay.open{opacity:1;visibility:visible;}
      .lb-img{max-width:90vw;max-height:88vh;border-radius:6px;box-shadow:0 30px 80px rgba(0,0,0,.5);}
      .lb-close{position:absolute;top:24px;right:30px;background:none;border:0;color:#fff;
        font-size:36px;cursor:pointer;}
    `;
    document.head.appendChild(style);
    const lbImg = overlay.querySelector('.lb-img');
    lightboxLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        lbImg.src = link.getAttribute('href');
        overlay.classList.add('open');
      });
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('lb-close')) {
        overlay.classList.remove('open');
      }
    });
  }

  /* ---------- BOOKING / PM MODALS ---------- */
  const bookingModal = document.getElementById('bookingModal');
  const propMgmtModal = document.getElementById('propMgmtModal');

  function openModal(modal) {
    document.body.style.overflow = 'hidden';
    modal.classList.add('open');
  }
  function closeModal(modal) {
    document.body.style.overflow = '';
    modal.classList.remove('open');
  }

  function handleBookClick(e) {
    if (BOOKING_URL) {
      window.open(BOOKING_URL, '_blank');
    } else {
      openModal(bookingModal);
    }
  }

  ['bookNowBtn', 'heroBookBtn', 'aboutBookBtn', 'videoBookBtn', 'contactBookBtn']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', handleBookClick);
    });

  const pmOpenBtn = document.getElementById('pmOpenBtn');
  if (pmOpenBtn) pmOpenBtn.addEventListener('click', () => openModal(propMgmtModal));

  document.querySelectorAll('[data-close-booking]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(bookingModal);
      closeModal(propMgmtModal);
    });
  });
  [bookingModal, propMgmtModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(bookingModal); closeModal(propMgmtModal); }
  });

  /* ---------- BOOKING FORM SUBMIT ---------- */
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bk-name').value;
    const email = document.getElementById('bk-email').value;
    const phone = document.getElementById('bk-phone').value;
    const checkin = document.getElementById('bk-checkin').value;
    const checkout = document.getElementById('bk-checkout').value;
    const guests = document.getElementById('bk-guests').value;
    const comments = document.getElementById('bk-comments').value;

    const subject = encodeURIComponent(`Booking Request — Grace Villa Mykonos (${checkin} to ${checkout})`);
    const body = encodeURIComponent(
`Hello Grace Villa Mykonos,

I would like to request a booking:

Name: ${name}
Email: ${email}
Phone: ${phone}
Check-in: ${checkin}
Check-out: ${checkout}
Guests: ${guests}

Comments: ${comments}
`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    bookingForm.style.display = 'none';
    bookingSuccess.classList.add('show');
    setTimeout(() => {
      closeModal(bookingModal);
      bookingForm.reset();
      bookingForm.style.display = 'block';
      bookingSuccess.classList.remove('show');
    }, 4500);
  });

  /* ---------- PROPERTY MANAGEMENT FORM SUBMIT ---------- */
  const pmForm = document.getElementById('propMgmtForm');
  const pmSuccess = document.getElementById('propMgmtSuccess');
  pmForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('pm-name').value;
    const location = document.getElementById('pm-location').value;
    const bedrooms = document.getElementById('pm-bedrooms').value;
    const rented = document.querySelector('input[name="pm-rented"]:checked').value;
    const email = document.getElementById('pm-email').value;
    const phone = document.getElementById('pm-phone').value;
    const comments = document.getElementById('pm-comments').value;

    const subject = encodeURIComponent(`Property Management Enquiry — ${name}`);
    const body = encodeURIComponent(
`Hello,

My name is ${name} and I own a property in ${location} with ${bedrooms} bedroom(s).
It is currently: ${rented === 'yes' ? 'Already rented out' : 'Not yet rented'}

Email: ${email}
Phone: ${phone}

Comments: ${comments}
`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    pmForm.style.display = 'none';
    pmSuccess.classList.add('show');
    setTimeout(() => {
      closeModal(propMgmtModal);
      pmForm.reset();
      pmForm.style.display = 'block';
      pmSuccess.classList.remove('show');
    }, 4500);
  });

  /* ---------- QUICK CONTACT FORM ---------- */
  const quickForm = document.getElementById('quickContactForm');
  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('qc-name').value;
    const email = document.getElementById('qc-email').value;
    const message = document.getElementById('qc-message').value;
    const subject = encodeURIComponent(`Website Enquiry — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    quickForm.reset();
  });

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- MIN CHECKOUT > CHECKIN ---------- */
  const checkinInput = document.getElementById('bk-checkin');
  const checkoutInput = document.getElementById('bk-checkout');
  const todayStr = new Date().toISOString().split('T')[0];
  checkinInput.min = todayStr;
  checkoutInput.min = todayStr;
  checkinInput.addEventListener('change', () => {
    checkoutInput.min = checkinInput.value;
  });
});
