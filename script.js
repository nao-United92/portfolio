document.addEventListener('DOMContentLoaded', () => {
  // Function to load header
  async function loadHeader() {
    try {
      const response = await fetch('header.html');
      const headerHtml = await response.text();
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHtml;
      }
    } catch (error) {
      console.error('Error loading header:', error);
    }
  }

  // Load header and footer when DOM is ready
  loadHeader();

  const introScreen = document.getElementById('intro-screen');
  const magicBookIcon = document.getElementById('magic-book-icon');
  const mainContent = document.getElementById('main-content');

  // --- Initial Page Load Logic ---
  if (introScreen) {
    introScreen.classList.remove('hide');
    if (mainContent) {
      mainContent.classList.add('hidden');
      mainContent.classList.remove('show');
    }
    if (magicBookIcon) {
      magicBookIcon.addEventListener('click', () => {
        magicBookIcon.classList.add('animate-book-open');
        introScreen.classList.add('fade-out');
        setTimeout(() => {
          introScreen.classList.add('hide');
          if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('show');
          }
        }, 500);
      });
    }
  }

  // --- COMMON FUNCTIONS ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  };
  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('opacity-100');
      } else {
        scrollToTopBtn.classList.remove('opacity-100');
      }
    });
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- ABOUT Page Logic ---
  const accordionButton = document.getElementById('accordion-button');
  if (accordionButton) {
    const accordionContent = document.getElementById('accordion-content');
    const accordionIcon = document.getElementById('accordion-icon');
    accordionButton.addEventListener('click', () => {
      accordionIcon.classList.toggle('rotate-180');
      if (accordionContent.style.maxHeight !== '0px') {
        accordionContent.style.maxHeight = '0px';
      } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      }
    });
  }

  // --- BLOG LOGIC ---
  const postsContainer = document.getElementById('blog-container');
  if (postsContainer) {
    const paginationContainer = document.getElementById(
      'blog-pagination-container'
    );
    const allPosts = JSON.parse(localStorage.getItem('blogPosts')) || blogPosts;
    if (!localStorage.getItem('blogPosts')) {
      localStorage.setItem('blogPosts', JSON.stringify(allPosts));
    }
    const postsPerPage = 9;
    let currentPage = 1;

    function displayPosts(page) {
      postsContainer.innerHTML = '';
      page = page < 1 ? 1 : page;
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const paginatedPosts = allPosts.slice(startIndex, endIndex);

      paginatedPosts.forEach((post) => {
        const postCard = document.createElement('a');
        postCard.href = `blog-post.html?id=${post.id}`;
        postCard.className =
          'blog-card bg-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 block';

        postCard.addEventListener('mouseenter', () => {
          postCard.classList.add('blog-card-hover-bg');
        });

        postCard.addEventListener('mouseleave', () => {
          postCard.classList.remove('blog-card-hover-bg');
        });
        postCard.innerHTML = `
          <img src="${post.thumbnailUrl}" alt="${post.title}" class="w-full h-48 object-cover">
          <div class="p-6">
            <p class="text-sm text-gray-400 mb-2">${post.date}</p>
            <h3 class="text-xl font-bold">${post.title}</h3>
            <a href="blog-post.html?id=${post.id}" class="text-blue-400 hover:underline">Read More</a>
          </div>
        `;
        postsContainer.appendChild(postCard);
      });
    }

    function setupPagination() {
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(allPosts.length / postsPerPage);
        for (let i = 1; i <= pageCount; i++) {
          const btn = document.createElement('button');
          btn.innerText = i;
          (btn.className =
            'pagination-btn px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500'),
            currentPage === i ? 'bg-blue-500' : 'bg-gray-700';
          btn.addEventListener('click', () => {
            currentPage = i;
            displayPosts(currentPage);
            document.querySelectorAll('.pagination-btn').forEach((b) => {
              b.classList.remove('bg-blue-500', 'text-white');
              b.classList.add('bg-gray-600', 'hover:bg-gray-500');
            });
            btn.classList.add('bg-blue-500', 'text-white');
          });
          paginationContainer.appendChild(btn);
        }
      }
    }

    displayPosts(currentPage);
    setupPagination();
  }

  // --- WORKS LOGIC ---
  const worksContainer = document.getElementById('works-container');
  if (worksContainer) {
    const worksPaginationContainer = document.getElementById(
      'works-pagination-container'
    );
    const allWorks = worksData; // worksData is loaded from public/works-data.js
    const worksPerPage = 9;
    let currentWorksPage = 1;

    function displayWorks(page) {
      worksContainer.innerHTML = '';
      page = page < 1 ? 1 : page;
      const startIndex = (page - 1) * worksPerPage;
      const endIndex = startIndex + worksPerPage;
      const paginatedWorks = allWorks.slice(startIndex, endIndex);

      paginatedWorks.forEach((work) => {
        const workCard = document.createElement('a');
        workCard.href = `works-detail.html?id=${work.id}`;
        workCard.className =
          'blog-card bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl block';
        workCard.innerHTML = `
          <img src="${work.imageSrc}" alt="${work.altText}" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-2">${work.title}</h3>
            <p class="text-gray-400">${work.description}</p>
          </div>
        `;
        worksContainer.appendChild(workCard);
      });
    }

    function setupWorksPagination() {
      if (worksPaginationContainer) {
        worksPaginationContainer.innerHTML = '';
        const pageCount = Math.ceil(allWorks.length / worksPerPage);
        for (let i = 1; i <= pageCount; i++) {
          const btn = document.createElement('button');
          btn.innerText = i;
          btn.className = `pagination-btn px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 ${
            currentWorksPage === i ? 'bg-blue-500 text-white' : ''
          }`;
          btn.addEventListener('click', () => {
            currentWorksPage = i;
            displayWorks(currentWorksPage);
            document
              .querySelectorAll('#works-pagination-container .pagination-btn')
              .forEach((b) => {
                b.classList.remove('bg-blue-500', 'text-white');
                b.classList.add('bg-gray-600', 'hover:bg-gray-500');
              });
            btn.classList.add('bg-blue-500', 'text-white');
          });
          worksPaginationContainer.appendChild(btn);
        }
      }
    }

    displayWorks(currentWorksPage);
    setupWorksPagination();
  }

  // --- CONTACT FORM VALIDATION (only on main page) ---
  const form = document.querySelector('form');
  if (form) {
    const requiredFields = form.querySelectorAll('[required]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      requiredFields.forEach((field) => {
        const parent = field.parentElement;
        const errorMessage = parent.querySelector('.validation-message');
        if (!field.value) {
          isValid = false;
          errorMessage.classList.remove('hidden');
          field.classList.add('border-red-500');
        } else {
          errorMessage.classList.add('hidden');
          field.classList.remove('border-red-500');
        }
      });
      if (isValid) {
        alert('フォームが正常に送信されました。');
        form.reset();
      }
    });
    requiredFields.forEach((field) => {
      field.addEventListener('input', () => {
        const parent = field.parentElement;
        const errorMessage = parent.querySelector('.validation-message');
        if (field.value) {
          errorMessage.classList.add('hidden');
          field.classList.remove('border-red-500');
        }
      });
    });
  }
});
