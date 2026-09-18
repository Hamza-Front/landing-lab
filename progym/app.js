/* ============================================================
   0) علّم الصفحة أن JS تعمل + فحص prefers-reduced-motion
   ============================================================ */
document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-counter]').forEach(el => {
  const prefix   = el.dataset.prefix || '';
  const suffix   = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  el.textContent = prefix + (0).toFixed(decimals) + suffix;
});


/* ============================================================
   1) قائمة الموبايل
   ============================================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const iconMenu   = document.getElementById('iconMenu');
const iconClose  = document.getElementById('iconClose');

menuToggle?.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  iconMenu.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});


/* ============================================================
   2) FAQ Accordion
   ============================================================ */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('is-open');
      i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


/* ============================================================
   3) عناصر النموذج — مرجع مركزي
   ============================================================ */
const form            = document.getElementById('bookingForm');
const formMsg         = document.getElementById('formMsg');
const nameInput       = document.getElementById('name');
const phoneInput      = document.getElementById('phone');
const branchSelect    = document.getElementById('branchSelect');
const serviceSelect   = document.getElementById('serviceSelect');
const trainerSelect   = document.getElementById('trainerSelect');
const selectedBranch  = document.getElementById('selectedBranch');
const selectedService = document.getElementById('selectedService');
const selectedTrainer = document.getElementById('selectedTrainer');
const selectionBadge  = document.getElementById('selectionBadge');
const badgeText       = document.getElementById('badgeText');
const clearSelection  = document.getElementById('clearSelection');


/* ============================================================
   4) تنظيف الاسم من رموز التحكم (Control chars)
   ============================================================ */
nameInput?.addEventListener('input', () => {
  const cleaned = nameInput.value.replace(/[\u0000-\u001F\u007F]/g, '');
  if (nameInput.value !== cleaned) nameInput.value = cleaned;
});


/* ============================================================
   5) تنظيف الهاتف تلقائياً من المسافات والرموز
   ============================================================ */
phoneInput?.addEventListener('input', (e) => {
  const original = e.target.value;
  const cleaned  = original.replace(/[\s\-().]/g, '');
  if (original !== cleaned) {
    const pos  = e.target.selectionStart;
    const diff = original.length - cleaned.length;
    e.target.value = cleaned;
    try { e.target.setSelectionRange(pos - diff, pos - diff); } catch {}
  }
});

phoneInput?.addEventListener('blur', () => {
  phoneInput.value = phoneInput.value.replace(/[\s\-().]/g, '');
});


/* ============================================================
   6) التحقق من صحة قيم القوائم والاسم والهاتف قبل الإرسال
   ============================================================ */
const ALLOWED_BRANCHES = ['جلاء', 'بردى', 'الغربية', 'العباسيين', 'جبلة', 'اللاذقية', 'قرية معلا'];
const ALLOWED_SERVICES = ['سباحة', 'كمال أجسام', 'لياقة', 'آيروبيك', 'قوة بدنية', 'منتجع'];
const ALLOWED_TRAINERS = [
  '', 'Wagdy Hasson', 'Abdalhamed Mohamad', 'Abdulrahman AlHamal',
  'Manal Al-Masri', 'Zoya Jumaa', 'Maha Shami', 'Rama Abbas',
  'Alaa Sebai', 'no-preference'
];

function validateForm() {
  if (!ALLOWED_BRANCHES.includes(branchSelect.value)) {
    branchSelect.setCustomValidity('الرجاء اختيار فرع صحيح من القائمة');
    branchSelect.reportValidity();
    return false;
  }
  branchSelect.setCustomValidity('');

  if (!ALLOWED_SERVICES.includes(serviceSelect.value)) {
    serviceSelect.setCustomValidity('الرجاء اختيار خدمة صحيحة من القائمة');
    serviceSelect.reportValidity();
    return false;
  }
  serviceSelect.setCustomValidity('');

  if (!ALLOWED_TRAINERS.includes(trainerSelect.value)) {
    trainerSelect.setCustomValidity('الرجاء اختيار مدرب من القائمة');
    trainerSelect.reportValidity();
    return false;
  }
  trainerSelect.setCustomValidity('');

  const nameVal = (nameInput.value || '').trim();
  if (nameVal.length < 2) {
    nameInput.setCustomValidity('الاسم قصير جداً');
    nameInput.reportValidity();
    return false;
  }
  const letterCount = (nameVal.match(/[\u0600-\u06FFA-Za-z]/g) || []).length;
  if (letterCount < 2) {
    nameInput.setCustomValidity('الاسم يجب أن يحتوي على حرفين على الأقل');
    nameInput.reportValidity();
    return false;
  }
  if (/[0-9]/.test(nameVal)) {
    nameInput.setCustomValidity('الاسم لا يجب أن يحتوي على أرقام');
    nameInput.reportValidity();
    return false;
  }
  nameInput.setCustomValidity('');

  const cleanPhone = phoneInput.value.replace(/[\s\-().]/g, '');
  if (!/^(\+963|00963|0)?9[0-9]{8}$/.test(cleanPhone)) {
    phoneInput.setCustomValidity('رقم هاتف سوري غير صحيح. مثال: 0991234567');
    phoneInput.reportValidity();
    return false;
  }
  phoneInput.setCustomValidity('');
  phoneInput.value = cleanPhone;

  return true;
}

[nameInput, phoneInput, branchSelect, serviceSelect, trainerSelect].forEach(el => {
  el?.addEventListener('input',  () => el.setCustomValidity(''));
  el?.addEventListener('change', () => el.setCustomValidity(''));
});


/* ============================================================
   7) نموذج الحجز — Formspree (fetch + AJAX)
   ============================================================ */
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  formMsg.textContent = 'جاري الإرسال...';
  formMsg.className   = 'text-sm mt-3 min-h-[1.25rem] text-center text-zinc-300';

  try {
    // Formspree يحتاج FormData + Accept: application/json
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      let errorMsg = 'HTTP ' + res.status;
      try {
        const data = await res.json();
        if (data?.errors?.length) errorMsg = data.errors.map(x => x.message).join(' · ');
      } catch {}
      throw new Error(errorMsg);
    }

    // نجاح
    form.reset();
    selectedBranch.value  = '';
    selectedService.value = '';
    selectedTrainer.value = '';
    branchSelect.value    = '';
    serviceSelect.value   = '';
    trainerSelect.value   = '';
    selectionBadge.classList.add('hidden');
    selectionBadge.classList.remove('flex');

    formMsg.textContent = '✓ تم استلام طلبك. سنتواصل معك خلال 24 ساعة.';
    formMsg.className   = 'text-sm mt-3 min-h-[1.25rem] text-center text-green-400 font-semibold';
  } catch (err) {
    formMsg.textContent = '✗ حدث خطأ. تواصل معنا على واتساب مباشرة.';
    formMsg.className   = 'text-sm mt-3 min-h-[1.25rem] text-center text-red-400 font-semibold';
    console.error('Form submit error:', err);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
});


/* ============================================================
   8) Reveal on scroll + Counter
   ============================================================ */
const revealEls  = document.querySelectorAll('.reveal');
const counterEls = document.querySelectorAll('[data-counter]');

function animateCounter(el) {
  const target   = parseFloat(el.dataset.counter);
  const prefix   = el.dataset.prefix || '';
  const suffix   = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);

  if (prefersReducedMotion) {
    el.textContent = prefix + target.toFixed(decimals) + suffix;
    return;
  }

  const duration = 1500;
  const start    = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = target * eased;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.hasAttribute('data-counter')) animateCounter(entry.target);
        entry.target.querySelectorAll?.('[data-counter]').forEach(animateCounter);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
  counterEls.forEach(el => io.observe(el));

  setTimeout(() => {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }, 3000);
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
  counterEls.forEach(animateCounter);
}


/* ============================================================
   9) زر العودة للأعلى
   ============================================================ */
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    toTop.classList.remove('opacity-0', 'pointer-events-none');
  } else {
    toTop.classList.add('opacity-0', 'pointer-events-none');
  }
}, { passive: true });

toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   10) تعبئة النموذج تلقائياً
   ============================================================ */
function updateBadge() {
  const parts = [];
  if (selectedBranch.value)  parts.push(`فرع ${selectedBranch.value}`);
  if (selectedService.value) parts.push(selectedService.value);
  if (selectedTrainer.value && selectedTrainer.value !== 'no-preference') {
    const opt = trainerSelect.options[trainerSelect.selectedIndex];
    parts.push(opt?.text.split(' — ')[0] || selectedTrainer.value);
  }

  if (parts.length) {
    badgeText.textContent = parts.join(' · ');
    selectionBadge.classList.remove('hidden');
    selectionBadge.classList.add('flex');
  } else {
    selectionBadge.classList.add('hidden');
    selectionBadge.classList.remove('flex');
  }
}

function pulseForm() {
  if (prefersReducedMotion) {
    setTimeout(() => nameInput?.focus({ preventScroll: true }), 400);
    return;
  }
  setTimeout(() => {
    form?.classList.add('form-pulse');
    setTimeout(() => form?.classList.remove('form-pulse'), 1300);
  }, 400);
  setTimeout(() => nameInput?.focus({ preventScroll: true }), 700);
}

document.querySelectorAll('[data-branch]').forEach(btn => {
  btn.addEventListener('click', () => {
    const branch = btn.dataset.branch;
    selectedBranch.value = branch;
    branchSelect.value   = branch;
    updateBadge();
    pulseForm();
  });
});

document.querySelectorAll('[data-service]').forEach(el => {
  el.addEventListener('click', () => {
    const service = el.dataset.service;
    selectedService.value = service;
    serviceSelect.value   = service;
    updateBadge();
    pulseForm();
  });
});

branchSelect?.addEventListener('change', (e) => {
  selectedBranch.value = e.target.value;
  updateBadge();
});

serviceSelect?.addEventListener('change', (e) => {
  selectedService.value = e.target.value;
  updateBadge();
});

trainerSelect?.addEventListener('change', (e) => {
  selectedTrainer.value = e.target.value;
  updateBadge();
});

clearSelection?.addEventListener('click', () => {
  selectedBranch.value  = '';
  selectedService.value = '';
  selectedTrainer.value = '';
  branchSelect.value    = '';
  serviceSelect.value   = '';
  trainerSelect.value   = '';
  updateBadge();
});