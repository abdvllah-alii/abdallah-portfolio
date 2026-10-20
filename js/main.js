// ===================================================================
// Abdallah Ali - Portfolio Script
// Contact form validation, live FormSubmit AJAX sending & navigation
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Handle Contact Form Submission via FormSubmit.co
  const form = document.getElementById('contactForm');
  const successAlert = document.getElementById('formSuccessAlert');
  const submitBtn = document.getElementById('btnSubmitContact');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let isValid = true;

      // Validate Name
      if (!name) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
      }

      // Validate Subject
      if (!subject) {
        subjectInput.classList.add('is-invalid');
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
      }

      // Validate Message
      if (!message) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
      }

      if (!isValid) {
        return;
      }

      // Set Loading State on Button
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> جارٍ إرسال الرسالة إلى بريدك...';

      try {
        const response = await fetch('https://formsubmit.co/ajax/abdallah.ali.business@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'الاسم': name,
            'البريد_الإلكتروني': email,
            'الموضوع': subject,
            'الرسالة': message,
            '_subject': `📩 رسالة جديدة من موقع Portfolio: ${subject}`
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
          if (successAlert) {
            successAlert.className = 'alert alert-success mt-3 rounded-3';
            successAlert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> تم إرسال رسالتك بنجاح إلى البريد الإلكتروني (abdallah.ali.business@gmail.com)! سيتم الرد عليك قريباً.';
            successAlert.classList.remove('d-none');
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          form.reset();
        } else {
          throw new Error('Submission error');
        }
      } catch (err) {
        // Fallback: If network error or CORS, inform user and offer direct email click
        if (successAlert) {
          successAlert.className = 'alert alert-info mt-3 rounded-3';
          successAlert.innerHTML = `<i class="bi bi-info-circle-fill me-2"></i> يمكنك تأكيد إرسال رسالتك مباشرة: <a href="mailto:abdallah.ali.business@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('الاسم: ' + name + '\n\n' + message)}" class="fw-bold text-dark text-decoration-underline">اضغط هنا لإرسالها عبر تطبيق البريد مباشرة</a>`;
          successAlert.classList.remove('d-none');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  // Auto-close Bootstrap mobile navbar on link click
  const navLinks = document.querySelectorAll('.nm-nav-link');
  const menuCollapse = document.getElementById('navMenu');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && menuCollapse && menuCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nm-nav-link[href*="${sectionId}"]`);
      
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});
