const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((entry) => {
      entry.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

const observeReveals = (elements) => {
  elements.forEach((element) => observer.observe(element));
};

observeReveals(reveals);

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const primaryNavigation = document.getElementById('primary-navigation');

if (mobileMenuToggle && primaryNavigation) {
  const srText = mobileMenuToggle.querySelector('.sr-only');

  mobileMenuToggle.addEventListener('click', () => {
    const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNavigation.classList.toggle('open');
    mobileMenuToggle.classList.toggle('open');

    if (srText) {
      srText.textContent = expanded ? 'Abrir menu' : 'Fechar menu';
    }
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
