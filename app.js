// Pallavi B G — Portfolio Logic & Interactions
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initBook();
  initCaseStudyRouter();
  initHeroParallax();
  initLightbox();
  initSelectedWorkShowcase();
});

/* -------------------------------------------------------------
   01. THEME SWITCHER
------------------------------------------------------------- */
function initTheme() {
  const body = document.body;
  const toggles = document.querySelectorAll('.theme-toggle-btn');
  const urlParams = new URLSearchParams(window.location.search);
  const themeParam = urlParams.get('theme');
  const savedTheme = themeParam === 'light' ? 'theme-light' : (themeParam === 'dark' ? 'theme-dark' : (localStorage.getItem('pallavi_theme') || 'theme-dark'));
  
  applyTheme(savedTheme);

  window.togglePortfolioTheme = function() {
    const currentTheme = body.classList.contains('theme-light') ? 'theme-light' : 'theme-dark';
    const newTheme = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
    applyTheme(newTheme);
    localStorage.setItem('pallavi_theme', newTheme);
  };

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      window.togglePortfolioTheme();
    });
  });


  function applyTheme(theme) {
    const isLight = theme === 'theme-light';
    if (isLight) {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      document.querySelectorAll('.theme-toggle-btn:not(.theme-toggle-footer) .theme-icon-indicator').forEach(el => {
        el.style.transform = 'translateX(28px)';
      });
      document.querySelectorAll('.theme-toggle-footer .theme-icon-indicator').forEach(el => {
        el.style.transform = 'translateX(24px)';
      });
      document.querySelectorAll('.toggle-glyph-moon').forEach(el => {
        el.style.opacity = '0';
      });
      document.querySelectorAll('.toggle-glyph-sun').forEach(el => {
        el.style.opacity = '1';
      });
      document.querySelectorAll('.theme-text-status').forEach(el => {
        el.textContent = 'LIGHT';
      });
    } else {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      document.querySelectorAll('.theme-icon-indicator').forEach(el => {
        el.style.transform = 'translateX(0px)';
      });
      document.querySelectorAll('.toggle-glyph-moon').forEach(el => {
        el.style.opacity = '1';
      });
      document.querySelectorAll('.toggle-glyph-sun').forEach(el => {
        el.style.opacity = '0';
      });
      document.querySelectorAll('.theme-text-status').forEach(el => {
        el.textContent = 'DARK';
      });
    }
  }
}

/* -------------------------------------------------------------
   02. NAVIGATION & SCROLLSPY
------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const isMobile = window.innerWidth < 640;
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
      navbar.style.backgroundColor = 'var(--bg)';
      navbar.style.borderBottom = '1px solid var(--border)';
      navbar.style.boxShadow = '0 8px 24px var(--shadow-color)';
      navbar.style.paddingTop = isMobile ? '10px' : '14px';
      navbar.style.paddingBottom = isMobile ? '10px' : '14px';
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.style.backgroundColor = 'transparent';
      navbar.style.borderBottom = '1px solid transparent';
      navbar.style.boxShadow = 'none';
      navbar.style.paddingTop = isMobile ? '12px' : '24px';
      navbar.style.paddingBottom = isMobile ? '12px' : '24px';
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Escape key closes mobile menu
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.focus();
      }
    });
  }

  // Scrollspy via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-[var(--accent)]');
            link.classList.remove('opacity-75');
          } else {
            link.classList.remove('text-[var(--accent)]');
            link.classList.add('opacity-75');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

/* -------------------------------------------------------------
   03. DESIGN PROCESS 3D BOOK ENGINE
------------------------------------------------------------- */
const processData = [
  {
    step: '01',
    name: 'Discover',
    headline: 'Understand before designing.',
    points: [
      'Understand the core user and business problem.',
      'Identify target user behaviors and contexts.',
      'Gather requirements and functional constraints.',
      'Explore technical boundaries and product scope.'
    ],
    flow: 'USER → NEED → PROBLEM',
    description: 'Every interface starts with empathy and active listening. Before opening Figma or sketching layouts, I immerse myself in the stakeholder expectations and candidate or employee friction points.'
  },
  {
    step: '02',
    name: 'Define',
    headline: 'Turn observations into direction.',
    points: [
      'Identify critical user pain points and friction.',
      'Translate raw feedback into clear design goals.',
      'Formulate structured design principles.',
      'Define scope, success criteria, and constraints.'
    ],
    flow: 'PROBLEM → GOAL → DIRECTION',
    description: 'Synthesizing qualitative observations into a concrete North Star prevents scope creep and aligns cross-functional engineering and product partners.'
  },
  {
    step: '03',
    name: 'Ideate',
    headline: 'Explore possibilities before choosing a direction.',
    points: [
      'Map comprehensive user flows and edge cases.',
      'Structure hierarchical information architecture.',
      'Brainstorm multiple structural layouts.',
      'Compare trade-offs between speed and density.'
    ],
    flow: 'FLOW → OPTIONS → SOLUTION',
    description: 'Rapid low-fidelity sketches and decision trees allow testing hypotheses fast without getting attached to visual styling too early.'
  },
  {
    step: '04',
    name: 'Design',
    headline: 'Turn structure into experience.',
    points: [
      'Build modular wireframes and responsive grids.',
      'Develop accessible design system components.',
      'Establish visual hierarchy and microcopy clarity.',
      'Craft high-fidelity, polished interactive screens.'
    ],
    flow: 'WIREFRAME → SYSTEM → HIGH-FIDELITY UI',
    description: 'This is where typography, color psychology, spacing rhythm, and accessible component libraries turn abstract flows into an intuitive digital experience.'
  },
  {
    step: '05',
    name: 'Validate',
    headline: 'Learn, refine and improve.',
    points: [
      'Conduct rigorous heuristic UX reviews.',
      'Gather stakeholder feedback against requirements.',
      'Identify usability concerns and accessibility gaps.',
      'Iterate on interactive friction points.'
    ],
    flow: 'DESIGN → FEEDBACK → ITERATE',
    description: 'Validation ensures design decisions withstand developer implementation, real-world edge cases, and high-cognitive-load scenarios.'
  },
  {
    step: '06',
    name: 'Improve',
    headline: 'Good design evolves.',
    points: [
      'Analyze post-launch workflow observations.',
      'Refine component tokens and documentation.',
      'Optimize accessibility and touch targets.',
      'Continually adapt as user needs expand.'
    ],
    flow: 'UNDERSTAND → DEFINE → IDEATE → DESIGN → VALIDATE → IMPROVE',
    description: 'Design is never truly finished. It is an iterative discipline of listening, structuring, testing, and perpetually elevating the human experience.'
  }
];

// Total physical flippable leaves = 4
// Spread 0: Closed Cover (State A) -> Cover on right, no spread
// Spread 1: Page 1 flipped (State B) -> Left: Page 01 DISCOVER | Right: Page 02 DEFINE
// Spread 2: Page 2 flipped (State B) -> Left: Page 03 IDEATE   | Right: Page 04 DESIGN
// Spread 3: Page 3 flipped (State B) -> Left: Page 05 VALIDATE | Right: Page 06 IMPROVE
// Spread 4: Page 4 flipped (State B) -> Left: Page 06 Back     | Right: Back Cover

let currentSpread = 0; // 0 = Cover, 1 = Steps 01 & 02, 2 = Steps 03 & 04, 3 = Steps 05 & 06
let activeStage = 0;   // 1 to 6 (0 when closed cover)

function initBook() {
  const pages = document.querySelectorAll('.book-page');
  const prevBtn = document.getElementById('bookPrevBtn');
  const nextBtn = document.getElementById('bookNextBtn');
  const stepRows = document.querySelectorAll('.process-step-row');
  const bookElement = document.getElementById('interactiveBookElement');
  const currentStepNum = document.getElementById('currentStepNum');
  const currentStepName = document.getElementById('currentStepName');

  const MAX_SPREAD = 3; // Spread 0: Closed Cover, Spread 1: Steps 01 & 02, Spread 2: Steps 03 & 04, Spread 3: Steps 05 & 06

  // Single shared source of truth to update book spread and navigation
  function setBookState(targetSpread, selectedStage = null) {
    currentSpread = Math.max(0, Math.min(targetSpread, MAX_SPREAD));

    // Determine the active stage from the spread
    if (selectedStage !== null) {
      activeStage = selectedStage;
    } else {
      if (currentSpread === 0) {
        activeStage = 0; // Cover closed
      } else if (currentSpread === 1) {
        activeStage = 1; // 01 Discover (lead page) & 02 Define
      } else if (currentSpread === 2) {
        activeStage = 3; // 03 Ideate (lead page) & 04 Design
      } else {
        activeStage = 5; // 05 Validate (lead page) & 06 Improve
      }
    }

    // Toggle Book State A (closed cover) vs State B (open spread)
    if (bookElement) {
      // Clear any temporary cursor tilt inline transform when changing state
      bookElement.style.transition = '';
      bookElement.style.transform = '';

      // Set active stage attribute for mobile CSS single-page display
      bookElement.setAttribute('data-active-stage', activeStage);

      if (currentSpread === 0) {
        bookElement.classList.remove('is-open');
        bookElement.classList.add('is-closed');
      } else {
        bookElement.classList.remove('is-closed');
        bookElement.classList.add('is-open');
      }
    }

    // Flip pages based on currentSpread:
    // Pages with index < currentSpread are flipped
    pages.forEach((page, idx) => {
      if (idx < currentSpread) {
        page.classList.add('flipped');
        page.style.zIndex = idx + 1;
      } else {
        page.classList.remove('flipped');
        page.style.zIndex = pages.length - idx;
      }
    });

    // Synchronize the navigation highlight with activeStage (1-based)
    stepRows.forEach((row, idx) => {
      const stageNum = idx + 1;
      if (stageNum === activeStage) {
        row.classList.add('active-stage');
      } else {
        row.classList.remove('active-stage');
      }
    });

    // Update bottom label if present
    if (currentStepNum && currentStepName) {
      if (activeStage === 0) {
        currentStepNum.textContent = 'COVER';
        currentStepName.textContent = 'HOW I DESIGN — JOURNAL';
      } else {
        const item = processData[activeStage - 1];
        if (item) {
          currentStepNum.textContent = item.step;
          currentStepName.textContent = item.name.toUpperCase();
        }
      }
    }

    // Toggle button enabled states (responsive for mobile step-by-step vs desktop spread-by-spread)
    const isMobile = window.innerWidth < 768;
    if (prevBtn) {
      prevBtn.disabled = isMobile ? activeStage === 0 : currentSpread === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = isMobile ? activeStage >= 6 : currentSpread >= 3;
    }
  }

  // Next / Prev clicks
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (activeStage < 6) {
          const nextStage = activeStage === 0 ? 1 : activeStage + 1;
          const targetSpread = Math.ceil(nextStage / 2);
          setBookState(targetSpread, nextStage);
        }
      } else {
        if (currentSpread < 3) {
          setBookState(currentSpread + 1);
        }
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (activeStage > 0) {
          const prevStage = activeStage - 1;
          const targetSpread = Math.ceil(prevStage / 2);
          setBookState(targetSpread, prevStage);
        }
      } else {
        if (currentSpread > 0) {
          setBookState(currentSpread - 1);
        }
      }
    });
  }

  // Open Journal CTA button on cover
  const coverOpenBtn = document.getElementById('coverOpenJournalBtn');
  if (coverOpenBtn) {
    coverOpenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setBookState(1, 1);
    });
  }

  // Touch Swipe Gesture on mobile
  let touchStartX = 0;
  let touchEndX = 0;
  if (bookElement) {
    bookElement.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    bookElement.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (window.innerWidth < 768) {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0 && activeStage < 6) {
            // Swipe Left -> Next
            const nextStage = activeStage === 0 ? 1 : activeStage + 1;
            setBookState(Math.ceil(nextStage / 2), nextStage);
          } else if (diff > 0 && activeStage > 0) {
            // Swipe Right -> Prev
            const prevStage = activeStage - 1;
            setBookState(Math.ceil(prevStage / 2), prevStage);
          }
        }
      }
    }, { passive: true });
  }

  // Window resize updater for button disabled states
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 768;
    if (prevBtn) {
      prevBtn.disabled = isMobile ? activeStage === 0 : currentSpread === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = isMobile ? activeStage >= 6 : currentSpread >= 3;
    }
  });

  // Clicking directly on pages
  pages.forEach((page, idx) => {
    page.addEventListener('click', (e) => {
      if (e.target.closest('#coverOpenJournalBtn')) return;
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (activeStage < 6) {
          const nextStage = activeStage === 0 ? 1 : activeStage + 1;
          setBookState(Math.ceil(nextStage / 2), nextStage);
        }
      } else {
        if (page.classList.contains('flipped')) {
          setBookState(idx); // Flip back to previous spread
        } else {
          if (currentSpread < MAX_SPREAD) {
            setBookState(Math.min(idx + 1, MAX_SPREAD)); // Flip forward
          }
        }
      }
    });
  });

  // Clicking on process step rows in the editorial navigation
  stepRows.forEach((row, idx) => {
    row.addEventListener('click', () => {
      const clickedStage = idx + 1; // 1 to 6
      // Map stage to its containing spread:
      // Stage 1 (Discover) & Stage 2 (Define)   -> Spread 1
      // Stage 3 (Ideate)   & Stage 4 (Design)   -> Spread 2
      // Stage 5 (Validate) & Stage 6 (Improve)  -> Spread 3
      let targetSpread = Math.ceil(clickedStage / 2);
      setBookState(targetSpread, clickedStage);
    });
  });

  // Keyboard accessibility when focusing on book wrapper
  const bookWrapper = document.getElementById('designProcessBook');
  if (bookWrapper) {
    bookWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSpread < 3) setBookState(currentSpread + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSpread > 0) setBookState(currentSpread - 1);
      }
    });
  }

  // Cursor-responsive subtle 3D tilt on CLOSED book
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!prefersReducedMotion && !isTouchDevice && bookWrapper && bookElement) {
    let isHovering = false;
    let rafId = null;

    bookWrapper.addEventListener('mouseenter', () => {
      // Only apply cursor tilt when the book is closed (State A)
      if (currentSpread === 0) {
        isHovering = true;
        bookElement.style.transition = 'transform 0.15s ease-out';
      }
    });

    bookWrapper.addEventListener('mousemove', (e) => {
      if (!isHovering || currentSpread !== 0) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = bookWrapper.getBoundingClientRect();
        // Calculate pointer offset from center (-1 to 1)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle 2.5 degree max tilt:
        // Pointer up -> tilt forward (negative rotateX)
        // Pointer right -> tilt right (positive rotateY)
        const rotateX = (-y * 3.5).toFixed(2);
        const rotateY = (x * 4.5).toFixed(2);

        bookElement.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    bookWrapper.addEventListener('mouseleave', () => {
      isHovering = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (currentSpread === 0) {
        bookElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        bookElement.style.transform = '';
      }
    });
  }

  // Start at State A (Closed Cover)
  setBookState(0);
}

/* -------------------------------------------------------------
   04. CASE STUDY DATA & ROUTING SYSTEM
------------------------------------------------------------- */
const caseStudies = {
  'ds-jobby': {
    id: 'ds-jobby',
    number: '002',
    title: 'DSJobby — Job Portal and Recruitment Platform',
    productName: 'DSJobby',
    subtitle: 'Connecting job seekers with permanent employment opportunities and accelerating employer talent sourcing.',
    category: 'Job Portal · Full-Time Permanent Staffing Platform',
    role: 'UX and UI Designer',
    platform: 'Web Application (Desktop & Mobile Responsive)',
    designFocus: 'Candidate Job Discovery Journey & Recruiter Talent Sourcing',
    tools: 'Figma, Design Tokens, FigJam, Responsive Layout Systems',
    previewImg: 'assets/dsjobby-preview.jpg',
    description: 'DSJobby (the placement solutions arm of Dyashin Technosoft) is an AI-enabled recruitment platform and talent acquisition partner specializing in full-time permanent staffing solutions. The platform connects qualified job seekers with long-term employment opportunities across IT, Engineering, Finance, and healthcare while helping employers resolve hiring bottlenecks with pre-screened, verified candidate pipelines.',
    problem: 'Job portals frequently overwhelm candidates with unstructured listings, opaque compensation, and fragmented application friction. In parallel, enterprise recruitment teams struggle with talent bottlenecks when candidate qualifications lack standardized parsing and screening. The core UX challenge was designing a clean, high-velocity discovery journey for candidates while providing structured applicant triage for corporate recruiters.',
    users: [
      { role: 'Job Seekers', need: 'Explore verified full-time permanent roles at 300+ hiring companies, upload resumes for automated AI matching, and access free career preparation.' },
      { role: 'Corporate Employers & Recruiters', need: 'Source pre-screened candidates from an active pool of 50,000+ profiles with 24-hour turnaround, ATS pipeline tracking, and placement guarantees.' }
    ],
    context: 'Dyashin Technosoft initiated DSJobby to modernize permanent placement staffing. The product demanded a clear, dual-sided digital experience: connecting motivated candidates with stable careers while equipping recruiters with high-velocity talent sourcing.',
    challenges: [
      { title: 'Dual-Journey Navigation Separation', desc: 'Designing intuitive parallel navigation paths for job candidates seeking careers vs. corporate recruiters submitting hiring mandates.' },
      { title: 'Information Density & Salary Transparency', desc: 'Displaying compensation ranges, remote tags, company pedigree, and application deadlines on scannable, non-fatiguing cards.' },
      { title: 'Application Friction Reduction', desc: 'Preventing candidate drop-off by replacing disruptive page redirects with a persistent, contextual slide-out application drawer.' }
    ],
    iaNodes: [
      { label: 'DSJobby Global Shell', sub: 'Nav, Auth & Legal' },
      { label: 'Job Discovery Engine', sub: 'Multi-Filter & Role Pills' },
      { label: 'Job Detail & Perks', sub: 'Transparency & Requirements' },
      { label: 'Slide-Out Application Drawer', sub: '1-Click Resume Attach' },
      { label: 'Candidate Career Hub', sub: 'AI Match Alerts & Mock Prep' },
      { label: 'Recruiter ATS & Sourcing', sub: 'Pipeline Triage & BGV' }
    ],
    userFlow: [
      'Search Role / Location',
      'Toggle Role & Compensation Filter',
      'Inspect Job Card & Perks',
      'Trigger Slide-out Quick Apply',
      'Receive Immediate Application Confirmation'
    ],
    designSystem: {
      colors: ['#170D13 (Background)', '#D98A7A (Primary Accent)', '#F8EAE5 (Main Text)', '#24151C (Card)', '#59363B (Borders)'],
      components: ['Role Filter Pills', 'Compensation Badges', 'Standardized Job Cards', 'Status Chips (Active, New)', 'Contextual Slide-Out Drawer']
    },
    prototypeType: 'dsjobby',
    solutions: [
      { challenge: 'Cognitive Overload in Listings', solution: 'Separated primary intent filters (Role & Location) from secondary criteria (Salary, Remote, Experience) into clean expandable filter capsules.' },
      { challenge: 'Application Flow Drop-off', solution: 'Designed a lightweight slide-over drawer modal that overlays the active search matrix, allowing candidates to reference job specs without losing search state.' }
    ],
    outcome: 'Delivered an intuitive, scannable job portal architecture with consistent tokenized components, a streamlined 3-step application flow, and verified dual-journey alignment.',
    learnings: 'Designing for dual user ecosystems taught me that simplifying an interface often means creating thoughtful defaults rather than removing features.',
    prev: 'dsedify',
    next: 'meditrack'
  },

  'dsedify': {
    id: 'dsedify',
    number: '001',
    title: 'DSEdify Command Center',
    subtitle: 'A unified education-management platform designed around the needs of different operational teams.',
    category: 'Enterprise SaaS · Education Management Platform',
    role: 'UI/UX Designer',
    platform: 'Web Application',
    productType: 'Enterprise SaaS / Education Management Platform',
    scope: 'Multi-role dashboards and operational workflows.',
    tools: 'Figma, Design Systems, Auto-layout, Design Tokens',
    previewImg: 'assets/dsedify-preview.jpg',
    description: 'DSEdify Command Center brings multiple education and training workflows into role-specific dashboards, helping teams monitor activity, manage information, and access the tools relevant to their responsibilities.',
    prev: 'dscrm',
    next: 'ds-jobby'
  },

  'meditrack': {
    id: 'meditrack',
    number: '003',
    title: 'MediTrack — Pharmacy Management Experience',
    category: 'Product Design · SaaS · Mobile',
    role: 'UI/UX Design',
    platform: 'Desktop SaaS Dashboard · Mobile Application',
    tools: 'Figma, Mobile Wireframing, Responsive Layout Systems',
    previewImg: 'assets/meditrack-preview.jpg',
    description: 'A pharmacy-focused digital experience designed to bring medicine lookup, barcode scanning, prescription verification, inventory visibility, and task management into a connected workflow.',
    designFocus: 'Creating a consistent experience across desktop and mobile, with clear information hierarchy, quick access to frequent tasks, and responsive layouts suited to pharmacy workflows.',
    problem: 'Pharmacists operate in high-pressure, rapid-turnaround environments. Legacy POS software required extensive nested sub-menus to locate medications, check physical shelf rack numbers, verify prescription mandates, and calculate taxes. Speed of checkout and zero-error inventory dispatch were non-negotiable requirements.',
    users: [
      { role: 'Chief Pharmacist', need: 'Instant barcode/SKU medicine lookup, batch expiry alerts, and stock transfer management.' },
      { role: 'Sales / Billing Desk', need: 'Ultra-fast POS keystroke navigation, prescription flag checks, and immediate invoice generation.' },
      { role: 'Mobile Stock Incharge', need: 'Mobile companion app to scan incoming deliveries, locate rack coordinates, and perform stock audits.' }
    ],
    context: 'Desktop SaaS for the billing counter complemented by a mobile assistant app for warehouse shelf stock runners: SEARCH MEDICINE → PRODUCT → ADD TO BILL → PRESCRIPTION → PAYMENT.',
    challenges: [
      { title: 'High-Velocity Keystroke Ergonomics', desc: 'Designing POS interactions that require minimal mouse movement and zero lag.' },
      { title: 'Physical Rack Location Visibility', desc: 'Surfacing shelf coordinates (e.g., Rack B-04) alongside price and dosage info.' },
      { title: 'Prescription Compliance Warning', desc: 'Ensuring schedule drugs cannot be dispensed without active prescription verification.' }
    ],
    iaNodes: [
      { label: 'Meditrack Core', sub: 'POS & Store Operations' },
      { label: 'Instant Search', sub: 'SKU, Brand, Generic Molecule' },
      { label: 'Stock & Shelf Matrix', sub: 'Rack Locations, Expiry Batches' },
      { label: 'Active Sale Cart', sub: 'Dosage, Line-Item Taxes' },
      { label: 'Rx Verification Gate', sub: 'Doctor License & Patient Info' },
      { label: 'Checkout & Receipt', sub: 'Cash, UPI, Split Payment' }
    ],
    userFlow: [
      'Type Molecule / SKU',
      'Select Matching Batch & Rack',
      'Add Item to Cart',
      'Toggle Rx Compliance Check',
      'Complete Payment & Print'
    ],
    designSystem: {
      colors: ['#FFF7F1 / #170D13 (Theme Aware)', '#D98A7A (Primary)', '#4CAF50 (Verified Rx)', '#E57373 (Expiring)'],
      components: ['Fast Auto-Suggest Bar', 'Shelf Location Badges', 'Split-Screen Cart Layout', 'Prescription Verification Toggle', 'Compact Mobile Bottom Bar']
    },
    prototypeType: 'meditrack',
    solutions: [
      { challenge: 'Counter bottlenecks during peak hours', solution: 'Created a unified single-screen POS combining auto-suggest search, rack indicator, and checkout cart in one viewport.' },
      { challenge: 'Inventory misplaced in physical racks', solution: 'Promoted shelf coordinates (e.g. Rack B-04) as high-contrast primary metadata on every search card.' }
    ],
    outcome: 'Streamlined the checkout journey into an intuitive 5-step flow with synchronized physical rack locations and clear prescription verification cues.',
    learnings: 'Designing for physical workflows highlighted how digital interfaces directly impact physical human speed and operational safety in healthcare.',
    prev: 'ds-jobby',
    next: 'dscrm'
  },

  'dscrm': {
    id: 'dscrm',
    number: '004',
    title: 'DSCRM — Enterprise CRM Platform',
    category: 'Customer Relationship Management · SaaS · Workflow Design',
    role: 'UI/UX Designer',
    platform: 'Web-based SaaS',
    domain: 'Customer Relationship Management',
    focus: 'Information Architecture, Dashboard Design, Workflow Design, Interaction Design',
    tools: 'Figma, Design Tokens, Table UX',
    previewImg: 'assets/dscrm-cover.jpg',
    description: 'Organizing customer relationships, service requirements, and business workflows into a more structured CRM experience.',
    problem: 'Managing customer relationships, service requirements, sales opportunities, and follow-up activities across different workflows can make business information difficult to navigate. The challenge was to organize these interconnected processes into a consistent and understandable experience.',
    objective: 'Design a structured CRM experience that helps users navigate customer information, track opportunities, manage requirements, and organize business activities efficiently.',
    modules: [
      {
        title: 'Customer Management',
        desc: 'Organize customer information and make relevant records easier to access.'
      },
      {
        title: 'Service Lines & Requirements',
        desc: 'Structure service-related information and customer requirements within a consistent workflow.'
      },
      {
        title: 'Sales Cycle & Opportunities',
        desc: 'Organize opportunities by sales stage to make their progress easier to understand.'
      },
      {
        title: 'Tasks & Activities',
        desc: 'Keep follow-ups, meetings, and ongoing activities organized.'
      },
      {
        title: 'Reports & Insights',
        desc: 'Present business information through structured dashboards, tables, and visual summaries.'
      }
    ],
    decisions: [
      {
        number: '01',
        title: 'Clear Information Architecture',
        desc: 'Organize modules around core business tasks so users can navigate related information more predictably.'
      },
      {
        number: '02',
        title: 'Scannable Data Presentation',
        desc: 'Use consistent spacing, readable labels, clear hierarchy, and status indicators to make information-heavy interfaces easier to scan.'
      },
      {
        number: '03',
        title: 'Structured Sales Workflows',
        desc: 'Present sales stages in a clear sequence so opportunity progress is easier to follow.'
      },
      {
        number: '04',
        title: 'Contextual Activity Management',
        desc: 'Keep activities and follow-ups connected to ongoing customer and opportunity workflows.'
      },
      {
        number: '05',
        title: 'Consistent Design Patterns',
        desc: 'Maintain reusable interface patterns across modules to create a coherent experience as the product grows.'
      }
    ],
    contribution: 'I worked on translating business requirements into structured user workflows and interface layouts, focusing on information hierarchy, dashboard organization, data presentation, and consistency across CRM modules.',
    learnings: 'This project strengthened my understanding of enterprise UX, particularly how information architecture, consistent interaction patterns, and clear data presentation can make complex business workflows easier to navigate.',
    designPrinciple: 'Simplify the workflow, not the information users need.',
    prev: 'meditrack',
    next: 'dsedify'
  }
};
// Route aliases
caseStudies['ds-edify'] = caseStudies['dsedify'];
caseStudies['dsjobby'] = caseStudies['ds-jobby'];

/* -------------------------------------------------------------
   04A. CANONICAL PORTFOLIO PROJECTS (Single Source of Truth)
------------------------------------------------------------- */
const PORTFOLIO_PROJECTS = [
  {
    id: 'dsedify',
    aliases: ['dsedify', 'ds-edify'],
    number: '001',
    title: 'DSEdify Command Center',
    route: '#work/dsedify'
  },
  {
    id: 'ds-jobby',
    aliases: ['ds-jobby', 'dsjobby'],
    number: '002',
    title: 'DSJobby',
    route: '#work/ds-jobby'
  },
  {
    id: 'meditrack',
    aliases: ['meditrack'],
    number: '003',
    title: 'MediTrack',
    route: '#work/meditrack'
  },
  {
    id: 'dscrm',
    aliases: ['dscrm'],
    number: '004',
    title: 'DSCRM',
    route: '#work/dscrm'
  }
];

function renderExploreMoreWork(currentProjectId) {
  const currentIdx = PORTFOLIO_PROJECTS.findIndex(p => 
    p.id === currentProjectId || (p.aliases && p.aliases.includes(currentProjectId))
  );
  const safeCurrentIdx = currentIdx !== -1 ? currentIdx : 0;
  const current = PORTFOLIO_PROJECTS[safeCurrentIdx];

  const prevIdx = (safeCurrentIdx - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
  const nextIdx = (safeCurrentIdx + 1) % PORTFOLIO_PROJECTS.length;
  const prevProject = PORTFOLIO_PROJECTS[prevIdx];
  const nextProject = PORTFOLIO_PROJECTS[nextIdx];

  return `
    <!-- Case Study Footer Navigation: Selected Projects -->
    <section class="explore-more-work-section scroll-mt-8 border-t border-[var(--border)] pt-8 sm:pt-12 pb-12 sm:pb-16" aria-label="Selected Projects Navigation">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        
        <!-- Section Heading: Subtle label + Project Counter badge -->
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true"></span>
            <h3 class="text-xs sm:text-sm font-mono tracking-widest text-[var(--text-main)] uppercase font-semibold">
              SELECTED PROJECTS
            </h3>
          </div>
          <span class="text-[10px] sm:text-[11px] font-mono tracking-wider text-[var(--text-sec)] px-2.5 py-0.5 rounded-full bg-[var(--border)]/30 border border-[var(--border)]/50">
            04 PROJECTS
          </span>
        </div>

        <!-- Previous Project and Next Project Buttons in one balanced row -->
        <div class="flex flex-row justify-center items-center gap-2.5 sm:gap-4 mb-4 sm:mb-8 w-full max-w-xl mx-auto">
          <a 
            href="${prevProject.route}" 
            class="flex-1 min-w-0 h-11 sm:h-12 min-h-[44px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[11px] sm:text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--sec-bg)] transition-all shadow-sm active:scale-[0.98] group select-none"
            aria-label="Previous project: ${prevProject.title}"
          >
            <svg class="w-3.5 h-3.5 shrink-0 text-[var(--accent)] transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="truncate tracking-wider uppercase font-mono text-[10.5px] min-[360px]:text-xs">PREV PROJECT</span>
          </a>
          <a 
            href="${nextProject.route}" 
            class="flex-1 min-w-0 h-11 sm:h-12 min-h-[44px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[11px] sm:text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--sec-bg)] transition-all shadow-sm active:scale-[0.98] group select-none"
            aria-label="Next project: ${nextProject.title}"
          >
            <span class="truncate tracking-wider uppercase font-mono text-[10.5px] min-[360px]:text-xs">NEXT PROJECT</span>
            <svg class="w-3.5 h-3.5 shrink-0 text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <!-- Mobile Project Navigation: Compact Horizontal List Items (sm:hidden) -->
        <div class="flex flex-col gap-3 sm:hidden w-full">
          ${PORTFOLIO_PROJECTS.map((p, idx) => {
            const isSelected = p.id === current.id || (p.aliases && p.aliases.includes(current.id));
            const mobileNum = String(idx + 1).padStart(2, '0');
            return `
              <a 
                href="${p.route}" 
                onclick="if (window.location.hash === '${p.route}') { window.scrollTo({ top: 0, behavior: 'smooth' }); }"
                class="mobile-nav-item w-full min-h-[64px] h-[66px] px-3.5 py-3 rounded-xl border flex items-center justify-between transition-all duration-200 group relative ${
                  isSelected 
                    ? 'is-active border-[#D98A7A]/45 bg-[#D98A7A]/[0.08] shadow-sm' 
                    : 'border-[var(--border)] bg-[var(--card)] hover:border-[#D98A7A]/35 hover:bg-[var(--sec-bg)] active:scale-[0.99]'
                }"
                aria-current="${isSelected ? 'page' : 'false'}"
                aria-label="${mobileNum} — ${p.title}${isSelected ? ' (Current Project)' : ''}"
              >
                <!-- Left: Project Number -->
                <div class="flex items-center gap-2 shrink-0">
                  ${isSelected ? '<span class="w-1.5 h-1.5 rounded-full bg-[#D98A7A] shrink-0" aria-hidden="true"></span>' : ''}
                  <span class="font-mono text-xs font-semibold tracking-wider ${
                    isSelected ? 'text-[#D98A7A]' : 'text-[var(--text-sec)] group-hover:text-[var(--accent)]'
                  }">
                    ${mobileNum}
                  </span>
                  <span class="text-[var(--border)] select-none text-[10px]">—</span>
                </div>

                <!-- Middle: Project Name (Left-aligned, 14–16px) -->
                <div class="flex-1 min-w-0 px-2.5 text-left">
                  <h4 class="text-[14px] min-[360px]:text-[15px] font-medium text-[var(--text-main)] truncate ${
                    isSelected ? 'font-semibold text-[var(--text-main)]' : 'group-hover:text-[var(--text-main)]'
                  }">
                    ${p.title}
                  </h4>
                </div>

                <!-- Right: Small Arrow Icon -->
                <div class="shrink-0 flex items-center justify-center pl-1">
                  <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${
                    isSelected ? 'text-[#D98A7A]' : 'text-[var(--text-sec)]/60 group-hover:text-[var(--accent)]'
                  }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            `;
          }).join('')}
        </div>

        <!-- Desktop & Tablet Layout: 4 Cards in responsive grid (Preserved on sm: and up) -->
        <div class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
          ${PORTFOLIO_PROJECTS.map(p => {
            const isSelected = p.id === current.id || (p.aliases && p.aliases.includes(current.id));
            return `
              <a 
                href="${p.route}" 
                onclick="if (window.location.hash === '${p.route}') { window.scrollTo({ top: 0, behavior: 'smooth' }); }"
                class="p-5 sm:p-6 rounded-2xl border text-center flex flex-col justify-center items-center transition-all duration-200 group relative min-h-[110px] sm:min-h-[120px] ${
                  isSelected 
                    ? 'border-[var(--accent)] bg-[var(--sec-bg)] shadow-md ring-1 ring-[var(--accent)]/50' 
                    : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-lg'
                }"
                aria-current="${isSelected ? 'page' : 'false'}"
                aria-label="${p.number}: ${p.title}"
              >
                <span class="text-[11px] font-mono font-semibold tracking-wider ${
                  isSelected ? 'text-[var(--accent)]' : 'text-[var(--accent)]/80 group-hover:text-[var(--accent)]'
                }">
                  ${p.number}
                </span>
                <h4 class="text-xs sm:text-sm font-semibold text-[var(--text-main)] mt-1.5 leading-snug">
                  ${p.title}
                </h4>
              </a>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}

/* -------------------------------------------------------------
   04B. DSEDIFY COMMAND CENTER CASE STUDY & DASHBOARD SHOWCASE
------------------------------------------------------------- */
const dsedifyDashboards = {
  'campus-connect': {
    id: 'campus-connect',
    tabLabel: 'Campus Connect',
    title: 'Campus Connect',
    categoryBadge: 'CAMPUS ENGAGEMENT · RECRUITMENT OPERATIONS',
    purpose: 'Supports campus engagement and recruitment operations.',
    accessSummary: 'Campus coordinators, university liaisons, and placement team.',
    featureAreas: [
      'Colleges onboarding overview',
      'Drive creation & configuration',
      'Eligibility criteria & cutoffs',
      'Multi-stage recruitment funnel',
      'Drive selection insights',
      'Drives overview & event ratings'
    ],
    operationalContext: 'Brings college onboarding, placement drive creation, round configuration, eligibility rules, and multi-stage candidate recruitment funnels into an operational workflow for university partnership teams.',
    primaryImage: {
      slot: 'IMAGE SLOT 02',
      title: 'Campus Connect Main Dashboard',
      filename: 'campus-connect-dashboard.png',
      verifiedSrc: 'assets/campus-connect-dashboard.png',
      alt: 'Campus Connect Main Dashboard showing colleges onboarding overview, recruitment funnel, drive selection insights, and drives overview',
      caption: 'Production Campus Connect dashboard presenting colleges onboarding overview, recruitment funnel (250 drives, 120 enrolled, 35 attended), drive selection insights chart, active drives list, and event rating analytics.'
    },
    gallery: []
  },
  'trainer': {
    id: 'trainer',
    tabLabel: 'Trainer',
    title: 'Trainer Dashboard',
    categoryBadge: 'ACADEMIC INSTRUCTION · CLASSROOM MANAGEMENT',
    purpose: 'Helps trainers review their training activities.',
    accessSummary: 'Instructors, technical trainers, and mentor leads.',
    featureAreas: [
      'Batch and student overview',
      'Session calendar',
      'Session details',
      'Student feedback',
      'Upcoming holidays and announcements'
    ],
    operationalContext: 'Distills complex academic schedules into daily instructional priorities: assigned student cohorts, lesson agendas, real-time attendance logging, and student feedback sentiment.',
    primaryImage: {
      slot: 'IMAGE SLOT 05',
      title: 'Trainer Main Dashboard',
      filename: 'trainer-dashboard.png',
      alt: 'Trainer Main Dashboard showing active cohorts, upcoming class sessions and student attendance summary',
      caption: 'Instructional home base highlighting today’s scheduled class sessions, active cohort progress, and attendance metrics.'
    },
    gallery: []
  },
  'corporate-connect': {
    id: 'corporate-connect',
    tabLabel: 'Corporate Connect',
    title: 'Corporate Connect',
    categoryBadge: 'ENTERPRISE B2B · WORKFORCE TRAINING',
    purpose: 'Supports corporate training and employer engagement operations.',
    accessSummary: 'Enterprise account managers, corporate recruiters, and B2B trainers.',
    featureAreas: [
      'Company and trainer overview',
      'Recent training activity',
      'Training type distribution',
      'Training session details',
      'Enrollment and revenue reporting'
    ],
    operationalContext: 'Consolidates B2B enterprise training accounts, corporate client directories, training modality distribution (technical bootcamps, workshops, upskilling), and corporate billing logs.',
    primaryImage: {
      slot: 'IMAGE SLOT 08',
      title: 'Corporate Connect Main Dashboard',
      filename: 'corporate-connect-dashboard.png',
      alt: 'Corporate Connect Main Dashboard showing enterprise client accounts, active corporate batches, and revenue overview',
      caption: 'Enterprise client command center displaying corporate accounts, deployed trainers, and active workforce cohorts.'
    },
    gallery: []
  },
  'admin': {
    id: 'admin',
    tabLabel: 'Admin',
    title: 'Admin Dashboard',
    categoryBadge: 'CENTRAL GOVERNANCE · MACRO OPERATIONS',
    purpose: 'Provides a broader operational and administrative overview.',
    accessSummary: 'System administrators, program heads, and operations directors.',
    featureAreas: [
      'Enrollment, batch, placement, and college overview',
      'Batch analytics',
      'Finance and payments',
      'Fee waivers',
      'Program breakdown',
      'Revenue and enrollment insights'
    ],
    operationalContext: 'The macro command center for executive leadership and central administrators. Consolidates multi-cohort velocity, revenue tracking, fee waivers, trainer quality scores, and regional program performance.',
    primaryImage: {
      slot: 'IMAGE SLOT 11',
      title: 'Admin Batches Dashboard',
      filename: 'admin-batches.png',
      verifiedSrc: 'assets/admin-batches.png',
      alt: 'DSEdify Admin Master Dashboard showing active enrollments, batch completion rates, and active batch progress table',
      caption: 'Central Admin dashboard with active enrollment trendlines (4,129 students, +5.2%), 88.4% batch completion donuts, 4.75 avg trainer ratings, and live cohort progress table.'
    },
    gallery: []
  },
  'overseas': {
    id: 'overseas',
    tabLabel: 'Overseas',
    title: 'Overseas Dashboard',
    categoryBadge: 'INTERNATIONAL ACADEMICS · CROSS-BORDER COHORTS',
    purpose: 'Presents batch and financial reporting for overseas programs.',
    accessSummary: 'International program managers, foreign affiliate leads, and overseas finance officers.',
    featureAreas: [
      'Batch and enrollment information',
      'Attendance insights',
      'Trainer status',
      'Payments',
      'Fee waiver overview',
      'Revenue insights and course enrollment revenue'
    ],
    operationalContext: 'Engineered specifically for cross-border academics: managing multi-timezone schedules, international tuition fees, foreign college partnerships, and currency-specific financial reporting.',
    primaryImage: {
      slot: 'IMAGE SLOT 15',
      title: 'Overseas Batches Dashboard',
      filename: 'overseas-batches.png',
      alt: 'Overseas Batches Dashboard showing global cohorts, timezone-adjusted calendars, and trainer deployment status',
      caption: 'International batch control center tracking global cohorts, timezone coverage, and trainer allocation across international programs.'
    },
    gallery: []
  }
};

let activeDSEdifyTab = 'campus-connect';

// Global placeholder handler when screenshot file is awaiting local drop
window.handleAssetSlotMissing = function(imgEl, slotId, title, filename, caption) {
  const parent = imgEl.parentElement;
  if (!parent) return;
  parent.innerHTML = `
    <div class="asset-placeholder-pattern w-full min-h-[300px] sm:min-h-[380px] p-6 sm:p-10 flex flex-col items-center justify-center text-center">
      <div class="w-14 h-14 rounded-2xl border border-[var(--accent)]/40 bg-[var(--card)] flex items-center justify-center text-[var(--accent)] mb-4 shadow-md">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div class="text-[11px] font-mono tracking-widest text-[var(--accent)] uppercase font-semibold mb-1">${slotId}</div>
      <div class="text-base sm:text-lg font-serif text-[var(--text-main)] font-semibold mb-2">${title}</div>
      <p class="text-xs text-[var(--text-sec)] max-w-md leading-relaxed mb-4">${caption}</p>
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[11px] font-mono text-[var(--text-sec)]">
        <span class="w-2 h-2 rounded-full bg-[var(--accent)]/60 animate-pulse"></span>
        Ready for asset: <span class="text-[var(--accent)] font-semibold">${filename}</span>
      </div>
    </div>
  `;
};

// Global Lightbox Controls
window.openImageLightbox = function(src, title, slot, caption) {
  const modal = document.getElementById('imageLightboxModal');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  if (!modal || !img) return;

  img.src = src;
  img.alt = title;
  if (titleEl) titleEl.textContent = title;
  if (captionEl) captionEl.textContent = caption || '';

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeImageLightbox = function() {
  const modal = document.getElementById('imageLightboxModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

function initLightbox() {
  const modal = document.getElementById('imageLightboxModal');
  const closeBtn = document.getElementById('closeLightboxBtn');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeImageLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeImageLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      window.closeImageLightbox();
    }
  });
}

function renderImageHeader(title) {
  return `
    <div class="case-study-image-header px-4 sm:px-6 py-3.5 border-b border-[var(--border)] bg-[var(--sec-bg)] flex items-center">
      <h4 class="font-medium text-xs sm:text-sm text-[var(--text-main)] leading-snug">
        ${title || ''}
      </h4>
    </div>
  `;
}

function renderImageSlotMarkup({ slot, title, filename, verifiedSrc, alt, caption }) {
  const imgSrc = verifiedSrc || `assets/${filename}`;
  const safeTitle = (title || '').replace(/'/g, "\\'");
  const safeCaption = (caption || '').replace(/'/g, "\\'");
  return `
    <div class="case-study-asset-container rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-[var(--accent)]" data-slot="${slot || ''}">
      <!-- Header Bar: Clean Minimal Header (Title Only) -->
      ${renderImageHeader(title)}

      <!-- Image Canvas with Internal Scroll for Tall Screens -->
      <div class="dashboard-preview-scroll relative w-full bg-[#160D13] flex items-start justify-center min-h-[260px] sm:min-h-[360px]">
        <img 
          src="${imgSrc}" 
          alt="${alt}" 
          class="w-full h-auto object-contain cursor-pointer select-none transition-transform duration-300 hover:scale-[1.005]" 
          onclick="openImageLightbox('${imgSrc}', '${safeTitle}', '${slot}', '${safeCaption}')"
          onerror="handleAssetSlotMissing(this, '${slot}', '${safeTitle}', '${filename}', '${safeCaption}')"
          loading="lazy" 
        />
      </div>

      <!-- Caption -->
      <div class="px-4 sm:px-6 py-3 bg-[var(--card)] border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div class="text-[var(--text-sec)] leading-relaxed max-w-3xl">${caption}</div>
        <span class="text-[10px] font-mono text-[var(--accent)] uppercase shrink-0">Scroll inside to inspect · Enlarge ⤢</span>
      </div>
    </div>
  `;
}

window.handleVideoLoadError = function(videoEl) {
  if (!videoEl) return;
  const container = videoEl.closest('.video-player-wrapper');
  if (container) {
    const errorNotice = container.querySelector('.video-error-notice');
    if (errorNotice) {
      errorNotice.classList.remove('hidden');
    }
  }
};

window.initCampusConnectVideoAutoplay = function() {
  const video = document.getElementById('campusConnectVideo');
  if (!video) return;

  // Enforce muted and inline playback
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  // Reset to beginning whenever paused/stopped so next play starts from beginning
  video.onpause = () => {
    try { video.currentTime = 0; } catch (e) {}
  };
  video.onended = () => {
    try { video.currentTime = 0; } catch (e) {}
    video.play().catch(() => {});
  };

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.pause();
    try { video.currentTime = 0; } catch (e) {}
    return;
  }

  const attemptPlay = () => {
    if (video.paused) {
      try { video.currentTime = 0; } catch (e) {}
    }
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback; gracefully handled without errors
      });
    }
  };

  // Play automatically when visible in viewport, pause and reset when offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
          try { video.currentTime = 0; } catch (e) {}
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);
  } else {
    attemptPlay();
  }
};

window.switchCampusConnectView = function(view) {
  const videoView = document.getElementById('campusConnectVideoView');
  const imageView = document.getElementById('campusConnectImageView');
  const btnVideo = document.getElementById('btnShowVideo');
  const btnImage = document.getElementById('btnShowImage');
  const badgeEl = document.getElementById('campusConnectCaptionBadge');
  const videoEl = document.getElementById('campusConnectVideo');

  if (view === 'image') {
    if (videoView) videoView.classList.add('hidden');
    if (imageView) imageView.classList.remove('hidden');
    if (videoEl) {
      videoEl.pause();
      try { videoEl.currentTime = 0; } catch (e) {}
    }
    if (btnVideo) {
      btnVideo.classList.remove('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.add('text-[var(--text-sec)]');
    }
    if (btnImage) {
      btnImage.classList.add('bg-[var(--accent)]', 'text-white');
      btnImage.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Scroll inside to inspect · Enlarge ⤢';
  } else {
    if (imageView) imageView.classList.add('hidden');
    if (videoView) videoView.classList.remove('hidden');
    if (videoEl) {
      try { videoEl.currentTime = 0; } catch (e) {}
      videoEl.play().catch(() => {});
    }
    if (btnImage) {
      btnImage.classList.remove('bg-[var(--accent)]', 'text-white');
      btnImage.classList.add('text-[var(--text-sec)]');
    }
    if (btnVideo) {
      btnVideo.classList.add('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Live Walkthrough Video · Enlarge ⤢';
  }
};

window.enlargeCampusConnectMedia = function() {
  const videoView = document.getElementById('campusConnectVideoView');
  const videoEl = document.getElementById('campusConnectVideo');
  const isVideoVisible = videoView && !videoView.classList.contains('hidden');

  if (isVideoVisible && videoEl) {
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if (videoEl.webkitRequestFullscreen) {
      videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    }
  } else {
    window.openImageLightbox(
      'assets/campus-connect-dashboard.png',
      'Campus Connect Main Dashboard',
      'IMAGE SLOT 02',
      'Production Campus Connect dashboard presenting colleges onboarding overview, recruitment funnel (250 drives, 120 enrolled, 35 attended), drive selection insights chart, active drives list, and event rating analytics.'
    );
  }
};

function renderCampusConnectPrimarySlotMarkup(data) {
  const imgSrc = data.primaryImage.verifiedSrc || `assets/${data.primaryImage.filename}`;
  const slot = data.primaryImage.slot;
  const title = data.primaryImage.title;
  const caption = data.primaryImage.caption;
  const safeTitle = (title || '').replace(/'/g, "\\'");
  const safeCaption = (caption || '').replace(/'/g, "\\'");

  const localAsset = 'assets/campus-connect-team.mp4';
  const localAssetSpaces = 'assets/campus connect team.mp4';
  const relPath = '../../../../Videos/Screen%20Recordings/campus%20connect%20team.mp4';
  const fileUrl = 'file:///C:/Users/Pallavi%20BG/Videos/Screen%20Recordings/campus%20connect%20team.mp4';
  const directPath = 'C:/Users/Pallavi BG/Videos/Screen Recordings/campus connect team.mp4';

  return `
    <div class="case-study-asset-container rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-[var(--accent)] video-player-wrapper w-full" data-slot="${slot}">
      <!-- Header Bar: Clean Minimal Header (Title Only) -->
      ${renderImageHeader(title)}

      <!-- Video Canvas: 100% full-width, block display, original aspect ratio, zero native/custom controls (Default) -->
      <div id="campusConnectVideoView" class="relative w-full bg-[#120B10] overflow-hidden">
        <video 
          id="campusConnectVideo"
          autoplay
          muted
          defaultMuted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
          class="w-full max-w-full h-auto block select-none"
          style="width: 100%; max-width: 100%; height: auto; display: block;"
          aria-hidden="true"
          tabindex="-1"
          onerror="handleVideoLoadError(this)"
        >
          <source src="${localAsset}" type="video/mp4">
          <source src="${localAssetSpaces}" type="video/mp4">
          <source src="${relPath}" type="video/mp4">
          <source src="${fileUrl}" type="video/mp4">
          <source src="${directPath}" type="video/mp4">
          <p class="p-4 text-xs text-[var(--text-sec)]">Your browser does not support the video tag.</p>
        </video>
      </div>

      <!-- Static Screenshot Canvas (Hidden until toggled) -->
      <div id="campusConnectImageView" class="hidden dashboard-preview-scroll relative w-full bg-[#160D13] flex items-start justify-center min-h-[260px] sm:min-h-[360px]">
        <img 
          src="${imgSrc}" 
          alt="${data.primaryImage.alt}" 
          class="w-full h-auto object-contain cursor-pointer select-none transition-transform duration-300 hover:scale-[1.005]" 
          onclick="openImageLightbox('${imgSrc}', '${safeTitle}', '${slot}', '${safeCaption}')" 
          onerror="handleAssetSlotMissing(this, '${slot}', '${safeTitle}', '${data.primaryImage.filename}', '${safeCaption}')"
          loading="lazy" 
        />
      </div>

      <!-- Diagnostic notice if local file access is restricted by browser -->
      <div class="video-error-notice hidden p-4 bg-red-950/20 border-t border-red-500/20 text-xs text-red-300 flex items-start gap-2">
        <span class="font-bold text-red-400">Notice:</span>
        <span>The video stream could not be loaded directly. Switch to <strong>Screenshot</strong> mode to view the static interface.</span>
      </div>

      <!-- Caption -->
      <div class="px-4 sm:px-6 py-3 bg-[var(--card)] border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div class="text-[var(--text-sec)] leading-relaxed max-w-3xl">
          Production Campus Connect dashboard and walkthrough video presenting colleges onboarding overview, recruitment funnel (250 drives, 120 enrolled, 35 attended), drive selection insights chart, active drives list, and event rating analytics.
        </div>
        <span id="campusConnectCaptionBadge" class="text-[10px] font-mono text-[var(--accent)] uppercase shrink-0">Live Walkthrough Video · Enlarge ⤢</span>
      </div>
    </div>
  `;
}

window.initCorporateConnectVideoAutoplay = function() {
  const video = document.getElementById('corporateConnectVideo');
  if (!video) return;

  // Enforce muted and inline playback
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  // Reset to beginning whenever paused/stopped so next play starts from beginning
  video.onpause = () => {
    try { video.currentTime = 0; } catch (e) {}
  };
  video.onended = () => {
    try { video.currentTime = 0; } catch (e) {}
    video.play().catch(() => {});
  };

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.pause();
    try { video.currentTime = 0; } catch (e) {}
    return;
  }

  const attemptPlay = () => {
    if (video.paused) {
      try { video.currentTime = 0; } catch (e) {}
    }
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  // Play automatically when visible in viewport, pause and reset when offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
          try { video.currentTime = 0; } catch (e) {}
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);
  } else {
    attemptPlay();
  }
};

window.switchCorporateConnectView = function(view) {
  const videoView = document.getElementById('corporateConnectVideoView');
  const imageView = document.getElementById('corporateConnectImageView');
  const btnVideo = document.getElementById('btnShowCorporateVideo');
  const btnImage = document.getElementById('btnShowCorporateImage');
  const badgeEl = document.getElementById('corporateConnectCaptionBadge');
  const videoEl = document.getElementById('corporateConnectVideo');

  if (view === 'image') {
    if (videoView) videoView.classList.add('hidden');
    if (imageView) imageView.classList.remove('hidden');
    if (videoEl) {
      videoEl.pause();
      try { videoEl.currentTime = 0; } catch (e) {}
    }
    if (btnVideo) {
      btnVideo.classList.remove('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.add('text-[var(--text-sec)]');
    }
    if (btnImage) {
      btnImage.classList.add('bg-[var(--accent)]', 'text-white');
      btnImage.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Scroll inside to inspect · Enlarge ⤢';
  } else {
    if (imageView) imageView.classList.add('hidden');
    if (videoView) videoView.classList.remove('hidden');
    if (videoEl) {
      try { videoEl.currentTime = 0; } catch (e) {}
      videoEl.play().catch(() => {});
    }
    if (btnImage) {
      btnImage.classList.remove('bg-[var(--accent)]', 'text-white');
      btnImage.classList.add('text-[var(--text-sec)]');
    }
    if (btnVideo) {
      btnVideo.classList.add('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Live Walkthrough Video · Enlarge ⤢';
  }
};

window.enlargeCorporateConnectMedia = function() {
  const videoView = document.getElementById('corporateConnectVideoView');
  const videoEl = document.getElementById('corporateConnectVideo');
  const isVideoVisible = videoView && !videoView.classList.contains('hidden');

  if (isVideoVisible && videoEl) {
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if (videoEl.webkitRequestFullscreen) {
      videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    }
  } else {
    window.openImageLightbox(
      'assets/corporate-connect-dashboard.png',
      'Corporate Connect Main Dashboard',
      'IMAGE SLOT 08',
      'Enterprise client command center displaying corporate accounts, deployed trainers, and active workforce cohorts.'
    );
  }
};

function renderCorporateConnectPrimarySlotMarkup(data) {
  const imgSrc = data.primaryImage.verifiedSrc || `assets/${data.primaryImage.filename}`;
  const slot = data.primaryImage.slot;
  const title = data.primaryImage.title;
  const caption = data.primaryImage.caption;
  const safeTitle = (title || '').replace(/'/g, "\\'");
  const safeCaption = (caption || '').replace(/'/g, "\\'");

  const localAsset = 'assets/corporate-connect-team.mp4';
  const localAssetSpaces = 'assets/corporate connect team.mp4';
  const relPath = '../../../../Videos/Screen%20Recordings/corporate%20connect%20team.mp4';
  const fileUrl = 'file:///C:/Users/Pallavi%20BG/Videos/Screen%20Recordings/corporate%20connect%20team.mp4';
  const directPath = 'C:/Users/Pallavi BG/Videos/Screen Recordings/corporate connect team.mp4';

  return `
    <div class="case-study-asset-container rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-[var(--accent)] video-player-wrapper w-full" data-slot="${slot}">
      <!-- Header Bar: Clean Minimal Header (Title Only) -->
      ${renderImageHeader(title)}

      <!-- Video Canvas: 100% full-width, block display, original aspect ratio, zero native/custom controls (Default) -->
      <div id="corporateConnectVideoView" class="relative w-full bg-[#120B10] overflow-hidden">
        <video 
          id="corporateConnectVideo"
          autoplay
          muted
          defaultMuted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
          class="w-full max-w-full h-auto block select-none"
          style="width: 100%; max-width: 100%; height: auto; display: block;"
          aria-hidden="true"
          tabindex="-1"
          onerror="handleVideoLoadError(this)"
        >
          <source src="${localAsset}" type="video/mp4">
          <source src="${localAssetSpaces}" type="video/mp4">
          <source src="${relPath}" type="video/mp4">
          <source src="${fileUrl}" type="video/mp4">
          <source src="${directPath}" type="video/mp4">
          <p class="p-4 text-xs text-[var(--text-sec)]">Your browser does not support the video tag.</p>
        </video>
      </div>

      <!-- Static Screenshot Canvas (Hidden until toggled) -->
      <div id="corporateConnectImageView" class="hidden dashboard-preview-scroll relative w-full bg-[#160D13] flex items-start justify-center min-h-[260px] sm:min-h-[360px]">
        <img 
          src="${imgSrc}" 
          alt="${data.primaryImage.alt}" 
          class="w-full h-auto object-contain cursor-pointer select-none transition-transform duration-300 hover:scale-[1.005]" 
          onclick="openImageLightbox('${imgSrc}', '${safeTitle}', '${slot}', '${safeCaption}')" 
          onerror="handleAssetSlotMissing(this, '${slot}', '${safeTitle}', '${data.primaryImage.filename}', '${safeCaption}')"
          loading="lazy" 
        />
      </div>

      <!-- Diagnostic notice if local file access is restricted by browser -->
      <div class="video-error-notice hidden p-4 bg-red-950/20 border-t border-red-500/20 text-xs text-red-300 flex items-start gap-2">
        <span class="font-bold text-red-400">Notice:</span>
        <span>The video stream could not be loaded directly. Switch to <strong>Screenshot</strong> mode to view the static interface.</span>
      </div>

      <!-- Caption -->
      <div class="px-4 sm:px-6 py-3 bg-[var(--card)] border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div class="text-[var(--text-sec)] leading-relaxed max-w-3xl">
          Production Corporate Connect walkthrough video and dashboard presenting enterprise accounts, active training batches, trainer deployments, and B2B workforce operations.
        </div>
        <span id="corporateConnectCaptionBadge" class="text-[10px] font-mono text-[var(--accent)] uppercase shrink-0">Live Walkthrough Video · Enlarge ⤢</span>
      </div>
    </div>
  `;
}

window.initTrainerVideoAutoplay = function() {
  const video = document.getElementById('trainerVideo');
  if (!video) return;

  // Enforce muted and inline playback
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  // Reset to beginning whenever paused/stopped so next play starts from beginning
  video.onpause = () => {
    try { video.currentTime = 0; } catch (e) {}
  };
  video.onended = () => {
    try { video.currentTime = 0; } catch (e) {}
    video.play().catch(() => {});
  };

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.pause();
    try { video.currentTime = 0; } catch (e) {}
    return;
  }

  const attemptPlay = () => {
    if (video.paused) {
      try { video.currentTime = 0; } catch (e) {}
    }
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  // Play automatically when visible in viewport, pause and reset when offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
          try { video.currentTime = 0; } catch (e) {}
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);
  } else {
    attemptPlay();
  }
};

window.switchTrainerView = function(view) {
  const videoView = document.getElementById('trainerVideoView');
  const imageView = document.getElementById('trainerImageView');
  const btnVideo = document.getElementById('btnShowTrainerVideo');
  const btnImage = document.getElementById('btnShowTrainerImage');
  const badgeEl = document.getElementById('trainerCaptionBadge');
  const videoEl = document.getElementById('trainerVideo');

  if (view === 'image') {
    if (videoView) videoView.classList.add('hidden');
    if (imageView) imageView.classList.remove('hidden');
    if (videoEl) {
      videoEl.pause();
      try { videoEl.currentTime = 0; } catch (e) {}
    }
    if (btnVideo) {
      btnVideo.classList.remove('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.add('text-[var(--text-sec)]');
    }
    if (btnImage) {
      btnImage.classList.add('bg-[var(--accent)]', 'text-white');
      btnImage.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Scroll inside to inspect · Enlarge ⤢';
  } else {
    if (imageView) imageView.classList.add('hidden');
    if (videoView) videoView.classList.remove('hidden');
    if (videoEl) {
      try { videoEl.currentTime = 0; } catch (e) {}
      videoEl.play().catch(() => {});
    }
    if (btnImage) {
      btnImage.classList.remove('bg-[var(--accent)]', 'text-white');
      btnImage.classList.add('text-[var(--text-sec)]');
    }
    if (btnVideo) {
      btnVideo.classList.add('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Live Walkthrough Video · Enlarge ⤢';
  }
};

window.enlargeTrainerMedia = function() {
  const videoView = document.getElementById('trainerVideoView');
  const videoEl = document.getElementById('trainerVideo');
  const isVideoVisible = videoView && !videoView.classList.contains('hidden');

  if (isVideoVisible && videoEl) {
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if (videoEl.webkitRequestFullscreen) {
      videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    }
  } else {
    window.openImageLightbox(
      'assets/trainer-dashboard.png',
      'Trainer Main Dashboard',
      'IMAGE SLOT 05',
      'Instructional home base highlighting today’s scheduled class sessions, active cohort progress, and attendance metrics.'
    );
  }
};

function renderTrainerPrimarySlotMarkup(data) {
  const imgSrc = data.primaryImage.verifiedSrc || `assets/${data.primaryImage.filename}`;
  const slot = data.primaryImage.slot;
  const title = data.primaryImage.title;
  const caption = data.primaryImage.caption;
  const safeTitle = (title || '').replace(/'/g, "\\'");
  const safeCaption = (caption || '').replace(/'/g, "\\'");

  const localAsset = 'assets/Trainer.mp4';
  const localAssetLower = 'assets/trainer.mp4';
  const localAssetHyphen = 'assets/trainer-team.mp4';
  const relPath = '../../../../Videos/Screen%20Recordings/Trainer.mp4';
  const fileUrl = 'file:///C:/Users/Pallavi%20BG/Videos/Screen%20Recordings/Trainer.mp4';
  const directPath = 'C:/Users/Pallavi BG/Videos/Screen Recordings/Trainer.mp4';

  return `
    <div class="case-study-asset-container rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-[var(--accent)] video-player-wrapper w-full" data-slot="${slot}">
      <!-- Header Bar: Clean Minimal Header (Title Only) -->
      ${renderImageHeader(title)}

      <!-- Video Canvas: 100% full-width, block display, original aspect ratio, zero native/custom controls (Default) -->
      <div id="trainerVideoView" class="relative w-full bg-[#120B10] overflow-hidden">
        <video 
          id="trainerVideo"
          autoplay
          muted
          defaultMuted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
          class="w-full max-w-full h-auto block select-none"
          style="width: 100%; max-width: 100%; height: auto; display: block;"
          aria-hidden="true"
          tabindex="-1"
          onerror="handleVideoLoadError(this)"
        >
          <source src="${localAsset}" type="video/mp4">
          <source src="${localAssetLower}" type="video/mp4">
          <source src="${localAssetHyphen}" type="video/mp4">
          <source src="${relPath}" type="video/mp4">
          <source src="${fileUrl}" type="video/mp4">
          <source src="${directPath}" type="video/mp4">
          <p class="p-4 text-xs text-[var(--text-sec)]">Your browser does not support the video tag.</p>
        </video>
      </div>

      <!-- Static Screenshot Canvas (Hidden until toggled) -->
      <div id="trainerImageView" class="hidden dashboard-preview-scroll relative w-full bg-[#160D13] flex items-start justify-center min-h-[260px] sm:min-h-[360px]">
        <img 
          src="${imgSrc}" 
          alt="${data.primaryImage.alt}" 
          class="w-full h-auto object-contain cursor-pointer select-none transition-transform duration-300 hover:scale-[1.005]" 
          onclick="openImageLightbox('${imgSrc}', '${safeTitle}', '${slot}', '${safeCaption}')" 
          onerror="handleAssetSlotMissing(this, '${slot}', '${safeTitle}', '${data.primaryImage.filename}', '${safeCaption}')"
          loading="lazy" 
        />
      </div>

      <!-- Diagnostic notice if local file access is restricted by browser -->
      <div class="video-error-notice hidden p-4 bg-red-950/20 border-t border-red-500/20 text-xs text-red-300 flex items-start gap-2">
        <span class="font-bold text-red-400">Notice:</span>
        <span>The video stream could not be loaded directly. Switch to <strong>Screenshot</strong> mode to view the static interface.</span>
      </div>

      <!-- Caption -->
      <div class="px-4 sm:px-6 py-3 bg-[var(--card)] border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div class="text-[var(--text-sec)] leading-relaxed max-w-3xl">
          Production Trainer walkthrough video and dashboard presenting assigned student cohorts, daily session schedules, syllabus topics, and real-time attendance logging.
        </div>
        <span id="trainerCaptionBadge" class="text-[10px] font-mono text-[var(--accent)] uppercase shrink-0">Live Walkthrough Video · Enlarge ⤢</span>
      </div>
    </div>
  `;
}

window.initAdminVideoAutoplay = function() {
  const video = document.getElementById('adminVideo');
  if (!video) return;

  // Enforce muted and inline playback
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  // Reset to beginning whenever paused/stopped so next play starts from beginning
  video.onpause = () => {
    try { video.currentTime = 0; } catch (e) {}
  };
  video.onended = () => {
    try { video.currentTime = 0; } catch (e) {}
    video.play().catch(() => {});
  };

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.pause();
    try { video.currentTime = 0; } catch (e) {}
    return;
  }

  const attemptPlay = () => {
    if (video.paused) {
      try { video.currentTime = 0; } catch (e) {}
    }
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  // Play automatically when visible in viewport, pause and reset when offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
          try { video.currentTime = 0; } catch (e) {}
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);
  } else {
    attemptPlay();
  }
};

window.switchAdminView = function(view) {
  const videoView = document.getElementById('adminVideoView');
  const imageView = document.getElementById('adminImageView');
  const btnVideo = document.getElementById('btnShowAdminVideo');
  const btnImage = document.getElementById('btnShowAdminImage');
  const badgeEl = document.getElementById('adminCaptionBadge');
  const videoEl = document.getElementById('adminVideo');

  if (view === 'image') {
    if (videoView) videoView.classList.add('hidden');
    if (imageView) imageView.classList.remove('hidden');
    if (videoEl) {
      videoEl.pause();
      try { videoEl.currentTime = 0; } catch (e) {}
    }
    if (btnVideo) {
      btnVideo.classList.remove('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.add('text-[var(--text-sec)]');
    }
    if (btnImage) {
      btnImage.classList.add('bg-[var(--accent)]', 'text-white');
      btnImage.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Scroll inside to inspect · Enlarge ⤢';
  } else {
    if (imageView) imageView.classList.add('hidden');
    if (videoView) videoView.classList.remove('hidden');
    if (videoEl) {
      try { videoEl.currentTime = 0; } catch (e) {}
      videoEl.play().catch(() => {});
    }
    if (btnImage) {
      btnImage.classList.remove('bg-[var(--accent)]', 'text-white');
      btnImage.classList.add('text-[var(--text-sec)]');
    }
    if (btnVideo) {
      btnVideo.classList.add('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Live Walkthrough Video · Enlarge ⤢';
  }
};

window.enlargeAdminMedia = function() {
  const videoView = document.getElementById('adminVideoView');
  const videoEl = document.getElementById('adminVideo');
  const isVideoVisible = videoView && !videoView.classList.contains('hidden');

  if (isVideoVisible && videoEl) {
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if (videoEl.webkitRequestFullscreen) {
      videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    }
  } else {
    window.openImageLightbox(
      'assets/admin-batches.png',
      'Admin Master Dashboard',
      'IMAGE SLOT 11',
      'Central Admin dashboard with active enrollment trendlines (4,129 students, +5.2%), 88.4% batch completion donuts, 4.75 avg trainer ratings, and live cohort progress table.'
    );
  }
};

function renderAdminPrimarySlotMarkup(data) {
  const imgSrc = data.primaryImage.verifiedSrc || `assets/${data.primaryImage.filename}`;
  const slot = data.primaryImage.slot;
  const title = data.primaryImage.title;
  const caption = data.primaryImage.caption;
  const safeTitle = (title || '').replace(/'/g, "\\'");
  const safeCaption = (caption || '').replace(/'/g, "\\'");

  const localAsset = 'assets/Admin.mp4';
  const localAssetLower = 'assets/admin.mp4';
  const localAssetHyphen = 'assets/admin-team.mp4';
  const relPath = '../../../../Videos/Screen%20Recordings/Admin.mp4';
  const fileUrl = 'file:///C:/Users/Pallavi%20BG/Videos/Screen%20Recordings/Admin.mp4';
  const directPath = 'C:/Users/Pallavi BG/Videos/Screen Recordings/Admin.mp4';

  return `
    <div class="case-study-asset-container rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-[var(--accent)] video-player-wrapper w-full" data-slot="${slot}">
      <!-- Header Bar: Clean Minimal Header (Title Only) -->
      ${renderImageHeader(title)}

      <!-- Video Canvas: 100% full-width, block display, original aspect ratio, zero native/custom controls (Default) -->
      <div id="adminVideoView" class="relative w-full bg-[#120B10] overflow-hidden">
        <video 
          id="adminVideo"
          autoplay
          muted
          defaultMuted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
          class="w-full max-w-full h-auto block select-none"
          style="width: 100%; max-width: 100%; height: auto; display: block;"
          aria-hidden="true"
          tabindex="-1"
          onerror="handleVideoLoadError(this)"
        >
          <source src="${localAsset}" type="video/mp4">
          <source src="${localAssetLower}" type="video/mp4">
          <source src="${localAssetHyphen}" type="video/mp4">
          <source src="${relPath}" type="video/mp4">
          <source src="${fileUrl}" type="video/mp4">
          <source src="${directPath}" type="video/mp4">
          <p class="p-4 text-xs text-[var(--text-sec)]">Your browser does not support the video tag.</p>
        </video>
      </div>

      <!-- Static Screenshot Canvas (Hidden until toggled) -->
      <div id="adminImageView" class="hidden dashboard-preview-scroll relative w-full bg-[#160D13] flex items-start justify-center min-h-[260px] sm:min-h-[360px]">
        <img 
          src="${imgSrc}" 
          alt="${data.primaryImage.alt}" 
          class="w-full h-auto object-contain cursor-pointer select-none transition-transform duration-300 hover:scale-[1.005]" 
          onclick="openImageLightbox('${imgSrc}', '${safeTitle}', '${slot}', '${safeCaption}')" 
          onerror="handleAssetSlotMissing(this, '${slot}', '${safeTitle}', '${data.primaryImage.filename}', '${safeCaption}')"
          loading="lazy" 
        />
      </div>

      <!-- Diagnostic notice if local file access is restricted by browser -->
      <div class="video-error-notice hidden p-4 bg-red-950/20 border-t border-red-500/20 text-xs text-red-300 flex items-start gap-2">
        <span class="font-bold text-red-400">Notice:</span>
        <span>The video stream could not be loaded directly. Switch to <strong>Screenshot</strong> mode to view the static interface.</span>
      </div>

      <!-- Caption -->
      <div class="px-4 sm:px-6 py-3 bg-[var(--card)] border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div class="text-[var(--text-sec)] leading-relaxed max-w-3xl">
          Production Admin command center walkthrough video and dashboard presenting macro operational governance, active enrollment trendlines, batch completion metrics, trainer ratings, and live cohort velocity.
        </div>
        <span id="adminCaptionBadge" class="text-[10px] font-mono text-[var(--accent)] uppercase shrink-0">Live Walkthrough Video · Enlarge ⤢</span>
      </div>
    </div>
  `;
}

window.initOverseasVideoAutoplay = function() {
  const video = document.getElementById('overseasVideo');
  if (!video) return;

  // Enforce muted and inline playback
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  // Reset to beginning whenever paused/stopped so next play starts from beginning
  video.onpause = () => {
    try { video.currentTime = 0; } catch (e) {}
  };
  video.onended = () => {
    try { video.currentTime = 0; } catch (e) {}
    video.play().catch(() => {});
  };

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.pause();
    try { video.currentTime = 0; } catch (e) {}
    return;
  }

  const attemptPlay = () => {
    if (video.paused) {
      try { video.currentTime = 0; } catch (e) {}
    }
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  // Play automatically when visible in viewport, pause and reset when offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
          try { video.currentTime = 0; } catch (e) {}
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);
  } else {
    attemptPlay();
  }
};

window.switchOverseasView = function(view) {
  const videoView = document.getElementById('overseasVideoView');
  const imageView = document.getElementById('overseasImageView');
  const btnVideo = document.getElementById('btnShowOverseasVideo');
  const btnImage = document.getElementById('btnShowOverseasImage');
  const badgeEl = document.getElementById('overseasCaptionBadge');
  const videoEl = document.getElementById('overseasVideo');

  if (view === 'image') {
    if (videoView) videoView.classList.add('hidden');
    if (imageView) imageView.classList.remove('hidden');
    if (videoEl) {
      videoEl.pause();
      try { videoEl.currentTime = 0; } catch (e) {}
    }
    if (btnVideo) {
      btnVideo.classList.remove('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.add('text-[var(--text-sec)]');
    }
    if (btnImage) {
      btnImage.classList.add('bg-[var(--accent)]', 'text-white');
      btnImage.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Scroll inside to inspect · Enlarge ⤢';
  } else {
    if (imageView) imageView.classList.add('hidden');
    if (videoView) videoView.classList.remove('hidden');
    if (videoEl) {
      try { videoEl.currentTime = 0; } catch (e) {}
      videoEl.play().catch(() => {});
    }
    if (btnImage) {
      btnImage.classList.remove('bg-[var(--accent)]', 'text-white');
      btnImage.classList.add('text-[var(--text-sec)]');
    }
    if (btnVideo) {
      btnVideo.classList.add('bg-[var(--accent)]', 'text-white');
      btnVideo.classList.remove('text-[var(--text-sec)]');
    }
    if (badgeEl) badgeEl.textContent = 'Live Walkthrough Video · Enlarge ⤢';
  }
};

window.enlargeOverseasMedia = function() {
  const videoView = document.getElementById('overseasVideoView');
  const videoEl = document.getElementById('overseasVideo');
  const isVideoVisible = videoView && !videoView.classList.contains('hidden');

  if (isVideoVisible && videoEl) {
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if (videoEl.webkitRequestFullscreen) {
      videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    }
  } else {
    window.openImageLightbox(
      'assets/overseas-batches.png',
      'Overseas Batches Dashboard',
      'IMAGE SLOT 15',
      'International batch control center tracking global cohorts, timezone coverage, and trainer allocation across international programs.'
    );
  }
};

function renderOverseasPrimarySlotMarkup(data) {
  const imgSrc = data.primaryImage.verifiedSrc || `assets/${data.primaryImage.filename}`;
  const slot = data.primaryImage.slot;
  const title = data.primaryImage.title;
  const caption = data.primaryImage.caption;
  const safeTitle = (title || '').replace(/'/g, "\\'");
  const safeCaption = (caption || '').replace(/'/g, "\\'");

  const localAsset = 'assets/Overseas.mp4';
  const localAssetLower = 'assets/overseas.mp4';
  const localAssetHyphen = 'assets/overseas-team.mp4';
  const relPath = '../../../../Videos/Screen%20Recordings/Overseas.mp4';
  const fileUrl = 'file:///C:/Users/Pallavi%20BG/Videos/Screen%20Recordings/Overseas.mp4';
  const directPath = 'C:/Users/Pallavi BG/Videos/Screen Recordings/Overseas.mp4';

  return `
    <div class="case-study-asset-container rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all hover:border-[var(--accent)] video-player-wrapper w-full" data-slot="${slot}">
      <!-- Header Bar: Clean Minimal Header (Title Only) -->
      ${renderImageHeader(title)}

      <!-- Video Canvas: 100% full-width, block display, original aspect ratio, zero native/custom controls (Default) -->
      <div id="overseasVideoView" class="relative w-full bg-[#120B10] overflow-hidden">
        <video 
          id="overseasVideo"
          autoplay
          muted
          defaultMuted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
          class="w-full max-w-full h-auto block select-none"
          style="width: 100%; max-width: 100%; height: auto; display: block;"
          aria-hidden="true"
          tabindex="-1"
          onerror="handleVideoLoadError(this)"
        >
          <source src="${localAsset}" type="video/mp4">
          <source src="${localAssetLower}" type="video/mp4">
          <source src="${localAssetHyphen}" type="video/mp4">
          <source src="${relPath}" type="video/mp4">
          <source src="${fileUrl}" type="video/mp4">
          <source src="${directPath}" type="video/mp4">
          <p class="p-4 text-xs text-[var(--text-sec)]">Your browser does not support the video tag.</p>
        </video>
      </div>

      <!-- Static Screenshot Canvas (Hidden until toggled) -->
      <div id="overseasImageView" class="hidden dashboard-preview-scroll relative w-full bg-[#160D13] flex items-start justify-center min-h-[260px] sm:min-h-[360px]">
        <img 
          src="${imgSrc}" 
          alt="${data.primaryImage.alt}" 
          class="w-full h-auto object-contain cursor-pointer select-none transition-transform duration-300 hover:scale-[1.005]" 
          onclick="openImageLightbox('${imgSrc}', '${safeTitle}', '${slot}', '${safeCaption}')" 
          onerror="handleAssetSlotMissing(this, '${slot}', '${safeTitle}', '${data.primaryImage.filename}', '${safeCaption}')"
          loading="lazy" 
        />
      </div>

      <!-- Diagnostic notice if local file access is restricted by browser -->
      <div class="video-error-notice hidden p-4 bg-red-950/20 border-t border-red-500/20 text-xs text-red-300 flex items-start gap-2">
        <span class="font-bold text-red-400">Notice:</span>
        <span>The video stream could not be loaded directly. Switch to <strong>Screenshot</strong> mode to view the static interface.</span>
      </div>

      <!-- Caption -->
      <div class="px-4 sm:px-6 py-3 bg-[var(--card)] border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div class="text-[var(--text-sec)] leading-relaxed max-w-3xl">
          Production Overseas dashboard and walkthrough video presenting multi-timezone global cohort schedules, international tuition fees, foreign college partnerships, and currency-specific financial reporting.
        </div>
        <span id="overseasCaptionBadge" class="text-[10px] font-mono text-[var(--accent)] uppercase shrink-0">Live Walkthrough Video · Enlarge ⤢</span>
      </div>
    </div>
  `;
}

function renderRoleSummaryCardMarkup(data) {
  return `
    <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg">
      <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div class="max-w-2xl">
          <span class="editorial-badge mb-2 text-[10px] tracking-[0.2em]">${data.categoryBadge}</span>
          <h3 class="text-2xl sm:text-3xl font-serif text-[var(--text-main)] mb-3">${data.title}</h3>
          <p class="text-base text-[var(--text-sec)] leading-relaxed mb-4">
            <strong class="text-[var(--text-main)] font-semibold">Purpose:</strong> ${data.purpose}
          </p>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">
            <strong class="text-[var(--text-main)]">Operational Context:</strong> ${data.operationalContext}
          </p>
        </div>
        <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] max-w-sm shrink-0">
          <div class="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider mb-1">Target Access Summary</div>
          <div class="text-xs text-[var(--text-main)] font-medium leading-relaxed">${data.accessSummary}</div>
        </div>
      </div>

      <!-- Feature Areas List -->
      <div class="pt-6">
        <div class="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">Key Feature Areas</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${data.featureAreas.map(feat => `
            <div class="flex items-center gap-2.5 p-3 rounded-lg border border-[var(--border)]/70 bg-[var(--bg)] text-xs text-[var(--text-main)]">
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"></span>
              <span>${feat}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderDSEdifyActiveShowcase(tabId) {
  const data = dsedifyDashboards[tabId];
  if (!data) return '';

  const isCampusConnect = tabId === 'campus-connect';
  const isCorporateConnect = tabId === 'corporate-connect';
  const isTrainer = tabId === 'trainer';
  const isAdmin = tabId === 'admin';
  const isOverseas = tabId === 'overseas';

  if (isCampusConnect) {
    // Campus Connect: Primary Operational View with Walkthrough Video & screenshot toggle -> Role description & key features
    return `
      <div class="space-y-10 animate-in fade-in duration-300">
        
        <!-- Primary Dashboard Walkthrough Video & Operational View -->
        <div>
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-3">
            <span>Primary Operational View</span>
          </div>
          ${renderCampusConnectPrimarySlotMarkup(data)}
        </div>

        <!-- Role Description & Key Feature Areas Section -->
        <div class="border-t border-[var(--border)] pt-8">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Role Scope &amp; Functional Breakdown</span>
            <span class="text-[var(--accent)]">${data.categoryBadge}</span>
          </div>
          ${renderRoleSummaryCardMarkup(data)}
        </div>

      </div>
    `;
  }

  if (isCorporateConnect) {
    // Corporate Connect: Primary Operational View with Walkthrough Video & screenshot toggle -> Role description & key features
    return `
      <div class="space-y-10 animate-in fade-in duration-300">
        
        <!-- Primary Dashboard Walkthrough Video & Operational View -->
        <div>
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-3">
            <span>Primary Operational View</span>
          </div>
          ${renderCorporateConnectPrimarySlotMarkup(data)}
        </div>

        <!-- Role Description & Key Feature Areas Section -->
        <div class="border-t border-[var(--border)] pt-8">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Role Scope &amp; Functional Breakdown</span>
            <span class="text-[var(--accent)]">${data.categoryBadge}</span>
          </div>
          ${renderRoleSummaryCardMarkup(data)}
        </div>

      </div>
    `;
  }

  if (isTrainer) {
    // Trainer: Primary Operational View with Walkthrough Video & screenshot toggle -> Role description & key features
    return `
      <div class="space-y-10 animate-in fade-in duration-300">
        
        <!-- Primary Dashboard Walkthrough Video & Operational View -->
        <div>
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-3">
            <span>Primary Operational View</span>
          </div>
          ${renderTrainerPrimarySlotMarkup(data)}
        </div>

        <!-- Role Description & Key Feature Areas Section -->
        <div class="border-t border-[var(--border)] pt-8">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Role Scope &amp; Functional Breakdown</span>
            <span class="text-[var(--accent)]">${data.categoryBadge}</span>
          </div>
          ${renderRoleSummaryCardMarkup(data)}
        </div>

      </div>
    `;
  }

  if (isAdmin) {
    // Admin: Primary Operational View with Walkthrough Video & screenshot toggle -> Role description & key features
    return `
      <div class="space-y-10 animate-in fade-in duration-300">
        
        <!-- Primary Dashboard Walkthrough Video & Operational View -->
        <div>
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-3">
            <span>Primary Operational View</span>
          </div>
          ${renderAdminPrimarySlotMarkup(data)}
        </div>

        <!-- Role Description & Key Feature Areas Section -->
        <div class="border-t border-[var(--border)] pt-8">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Role Scope &amp; Functional Breakdown</span>
            <span class="text-[var(--accent)]">${data.categoryBadge}</span>
          </div>
          ${renderRoleSummaryCardMarkup(data)}
        </div>
      </div>
    `;
  }

  if (isOverseas) {
    // Overseas: Primary Operational View with Walkthrough Video & screenshot toggle -> Role description & key features
    return `
      <div class="space-y-10 animate-in fade-in duration-300">
        
        <!-- Primary Dashboard Walkthrough Video & Operational View -->
        <div>
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-3">
            <span>Primary Operational View</span>
          </div>
          ${renderOverseasPrimarySlotMarkup(data)}
        </div>

        <!-- Role Description & Key Feature Areas Section -->
        <div class="border-t border-[var(--border)] pt-8">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Role Scope &amp; Functional Breakdown</span>
            <span class="text-[var(--accent)]">${data.categoryBadge}</span>
          </div>
          ${renderRoleSummaryCardMarkup(data)}
        </div>

      </div>
    `;
  }

  // All other dashboard tabs: standard order (Role summary card -> Primary screenshot -> Gallery)
  return `
    <div class="space-y-10 animate-in fade-in duration-300">
      
      <!-- Role Summary Card -->
      ${renderRoleSummaryCardMarkup(data)}

      <!-- Primary Dashboard Screenshot -->
      <div>
        <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-3">
          <span>Primary Operational View</span>
        </div>
        ${renderImageSlotMarkup(data.primaryImage)}
      </div>

      <!-- Stacked Gallery / Secondary Views -->
      ${data.gallery && data.gallery.length > 0 ? `
        <div class="border-t border-[var(--border)] pt-8">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-6 flex items-center justify-between">
            <span>Additional Role Views &amp; Sub-Modules</span>
            <span>${data.gallery.length} Screens</span>
          </div>
          <div class="grid grid-cols-1 ${data.gallery.length > 1 ? 'lg:grid-cols-2' : ''} gap-8">
            ${data.gallery.map(screen => renderImageSlotMarkup(screen)).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

window.switchDSEdifyTab = function(tabId) {
  if (!dsedifyDashboards[tabId]) return;
  activeDSEdifyTab = tabId;

  // Pause any currently playing videos and reset them to the beginning
  const prevCampusVideo = document.getElementById('campusConnectVideo');
  if (prevCampusVideo) {
    try {
      prevCampusVideo.pause();
      prevCampusVideo.currentTime = 0;
    } catch (e) {}
  }
  const prevCorpVideo = document.getElementById('corporateConnectVideo');
  if (prevCorpVideo) {
    try {
      prevCorpVideo.pause();
      prevCorpVideo.currentTime = 0;
    } catch (e) {}
  }
  const prevTrainerVideo = document.getElementById('trainerVideo');
  if (prevTrainerVideo) {
    try {
      prevTrainerVideo.pause();
      prevTrainerVideo.currentTime = 0;
    } catch (e) {}
  }
  const prevAdminVideo = document.getElementById('adminVideo');
  if (prevAdminVideo) {
    try {
      prevAdminVideo.pause();
      prevAdminVideo.currentTime = 0;
    } catch (e) {}
  }
  const prevOverseasVideo = document.getElementById('overseasVideo');
  if (prevOverseasVideo) {
    try {
      prevOverseasVideo.pause();
      prevOverseasVideo.currentTime = 0;
    } catch (e) {}
  }

  // Update tabs visual state in main content
  const tabButtons = document.querySelectorAll('.dsedify-tab-btn');
  tabButtons.forEach(btn => {
    const isCurrent = btn.getAttribute('data-tab') === tabId;
    btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    btn.setAttribute('tabindex', isCurrent ? '0' : '-1');
    if (isCurrent) {
      btn.className = 'dsedify-tab-btn px-5 py-2.5 rounded-lg text-xs font-semibold bg-[var(--accent)] text-[#170D13] shadow-md transition-all shrink-0 cursor-pointer focus:outline-none';
    } else {
      btn.className = 'dsedify-tab-btn px-5 py-2.5 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--card)] text-[var(--text-main)] hover:border-[var(--accent)] transition-all shrink-0 cursor-pointer focus:outline-none';
    }
  });

  // Re-render showcase container
  const showcaseContainer = document.getElementById('dsedifyShowcaseContainer');
  if (showcaseContainer) {
    showcaseContainer.innerHTML = renderDSEdifyActiveShowcase(tabId);
    if (tabId === 'campus-connect') {
      setTimeout(() => {
        initCampusConnectVideoAutoplay();
      }, 50);
    } else if (tabId === 'corporate-connect') {
      setTimeout(() => {
        initCorporateConnectVideoAutoplay();
      }, 50);
    } else if (tabId === 'trainer') {
      setTimeout(() => {
        initTrainerVideoAutoplay();
      }, 50);
    } else if (tabId === 'admin') {
      setTimeout(() => {
        initAdminVideoAutoplay();
      }, 50);
    } else if (tabId === 'overseas') {
      setTimeout(() => {
        initOverseasVideoAutoplay();
      }, 50);
    }
  }
};

window.switchDSEdifyTabAndScroll = function(tabId) {
  window.switchDSEdifyTab(tabId);
  window.scrollToDSEdifySection('cs-dashboards');
};

window.scrollToDSEdifySection = function(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

let dsedifyScrollspyObserver = null;
function initDSEdifyScrollspy() {
  if (dsedifyScrollspyObserver) {
    dsedifyScrollspyObserver.disconnect();
    dsedifyScrollspyObserver = null;
  }

  const navLinks = document.querySelectorAll('.dsedify-nav-link');
  if (!navLinks.length) return;

  const sectionIds = [
    'cs-overview',
    'cs-context',
    'cs-dashboards',
    'cs-scoping',
    'cs-complexities',
    'cs-decisions',
    'cs-contribution',
    'cs-related'
  ];

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0
  };

  dsedifyScrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => dsedifyScrollspyObserver.observe(sec));
}


function renderDSEdifyCaseStudy(project, container) {
  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="border-b border-[var(--border)] pb-6 mb-12 flex justify-between items-center">
      <a href="#work" class="case-study-back-btn inline-flex items-center justify-center w-11 h-11 -ml-2.5 rounded-full text-[var(--accent)] hover:bg-[var(--sec-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]" aria-label="Back to selected work" title="Back to selected work">
        <svg class="w-5 h-5 pointer-events-none transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 12H5m0 0l7 7m-7-7l7-7"/>
        </svg>
        <span class="sr-only">Back to selected work</span>
      </a>
      <div class="text-xs font-mono text-[var(--text-sec)]">
        PROJECT 001 OF 04
      </div>
    </div>

    <!-- Case Study Sections Container -->
    <div class="space-y-16">
      <!-- ============================================================
           01 & 02 — PROJECT INTRODUCTION & OVERVIEW
      ============================================================ -->
      <section id="cs-overview" class="scroll-mt-8">
        <div class="editorial-badge mb-3">01 — PROJECT INTRODUCTION &amp; OVERVIEW</div>
            <h1 class="text-4xl sm:text-6xl font-serif text-[var(--text-main)] mb-3 leading-tight">${project.title}</h1>
            <p class="text-lg sm:text-xl font-serif italic text-[var(--accent)] mb-6 max-w-3xl">
              ${project.subtitle}
            </p>
            <p class="text-base sm:text-lg text-[var(--text-sec)] max-w-3xl mb-10 leading-relaxed font-light">
              “${project.description}”
            </p>

            <!-- Project Metadata Grid -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg">
              <div>
                <div class="text-[10px] text-[var(--text-sec)] uppercase tracking-wider font-mono mb-1.5">Role</div>
                <div class="text-sm font-semibold text-[var(--text-main)]">${project.role}</div>
              </div>
              <div>
                <div class="text-[10px] text-[var(--text-sec)] uppercase tracking-wider font-mono mb-1.5">Platform</div>
                <div class="text-sm font-semibold text-[var(--text-main)]">${project.platform}</div>
              </div>
              <div>
                <div class="text-[10px] text-[var(--text-sec)] uppercase tracking-wider font-mono mb-1.5">Product Type</div>
                <div class="text-sm font-semibold text-[var(--text-main)]">${project.productType}</div>
              </div>
              <div>
                <div class="text-[10px] text-[var(--text-sec)] uppercase tracking-wider font-mono mb-1.5">Design Scope</div>
                <div class="text-sm font-semibold text-[var(--text-main)]">${project.scope}</div>
              </div>
            </div>
          </section>

          <!-- ============================================================
               02 — PRODUCT CONTEXT AND USER GROUPS
          ============================================================ -->
          <section id="cs-context" class="scroll-mt-8 border-t border-[var(--border)] pt-12">
            <div class="editorial-badge mb-3">02 — PRODUCT CONTEXT &amp; CONNECTED ECOSYSTEM</div>
            <h2 class="text-3xl sm:text-4xl font-serif text-[var(--text-main)] mb-4">One Unified Platform for Five Connected Teams</h2>
            <p class="text-base sm:text-lg text-[var(--text-sec)] max-w-3xl mb-10 leading-relaxed">
              The platform brings together campus engagement, training operations, corporate programs, administrative reporting, and overseas program management. Each dashboard presents information relevant to a specific operational context.
            </p>

            <!-- 5 User Groups Cards Matrix -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">01 · CAMPUS ENGAGEMENT</div>
                <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Campus Connect</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Supports college onboarding, campus drive creation, eligibility rules, recruitment funnels, and university event monitoring.</p>
              </div>
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">02 · ACADEMIC INSTRUCTION</div>
                <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Trainer Dashboard</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Helps trainers review assigned student batches, access their session calendar, track attendance, and monitor learner feedback.</p>
              </div>
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">03 · ENTERPRISE B2B</div>
                <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Corporate Connect</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Supports corporate training engagements, enterprise client relationships, training type distribution, and corporate billing.</p>
              </div>
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">04 · CENTRAL GOVERNANCE</div>
                <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Admin Dashboard</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Provides executive operational overview: global enrollments, multi-batch analytics, finance, fee waivers, and program breakdowns.</p>
              </div>
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">05 · INTERNATIONAL ACADEMICS</div>
                <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Overseas Dashboard</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Presents batch schedules, cross-timezone attendance, and multi-currency financial reporting for international education programs.</p>
              </div>
            </div>
          </section>

          <!-- ============================================================
               03 — INTERACTIVE DASHBOARD SHOWCASE (MAIN FEATURE)
          ============================================================ -->
          <section id="cs-dashboards" class="scroll-mt-8 border-t border-[var(--border)] pt-12">
            <div class="editorial-badge mb-3">03 — INTERACTIVE SHOWCASE</div>
            <h2 class="text-3xl sm:text-5xl font-serif text-[var(--text-main)] mb-3">Explore the Dashboards</h2>
            <p class="text-base sm:text-lg text-[var(--text-sec)] max-w-2xl mb-8 leading-relaxed">
              Explore how the Command Center presents information and workflows for different teams. Select any operational role below to inspect its dedicated interface.
            </p>

            <!-- Interactive 5-Tab Switcher Bar -->
            <div class="p-2 sm:p-3 rounded-2xl border border-[var(--border)] bg-[var(--sec-bg)] mb-10 overflow-hidden shadow-inner">
              <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0" role="tablist" aria-label="DSEdify Dashboard Roles">
                ${Object.values(dsedifyDashboards).map(d => {
                  const isSelected = d.id === activeDSEdifyTab;
                  return `
                    <button 
                      type="button" 
                      role="tab" 
                      aria-selected="${isSelected ? 'true' : 'false'}" 
                      tabindex="${isSelected ? '0' : '-1'}"
                      data-tab="${d.id}" 
                      onclick="switchDSEdifyTab('${d.id}')" 
                      class="dsedify-tab-btn px-5 py-2.5 rounded-lg text-xs ${isSelected ? 'font-semibold bg-[var(--accent)] text-[#170D13] shadow-md' : 'font-medium border border-[var(--border)] bg-[var(--card)] text-[var(--text-main)] hover:border-[var(--accent)]'} transition-all shrink-0 cursor-pointer focus:outline-none"
                    >
                      ${d.tabLabel}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Reactive Showcase Container (Updates dynamically on tab switch) -->
            <div id="dsedifyShowcaseContainer">
              ${renderDSEdifyActiveShowcase(activeDSEdifyTab)}
            </div>
          </section>

          <!-- ============================================================
               04 — SCOPING THE SOLUTION
          ============================================================ -->
          <section id="cs-scoping" class="scroll-mt-8 border-t border-[var(--border)] pt-12">
            <div class="editorial-badge mb-3">04 — SCOPING THE SOLUTION</div>
            <h2 class="text-3xl sm:text-4xl font-serif text-[var(--text-main)] mb-4">Structuring Complexity Into Role-Specific Clarity</h2>
            <p class="text-base sm:text-lg text-[var(--text-sec)] max-w-3xl mb-8 leading-relaxed font-light">
              Enterprise education platforms frequently overload users by showing every feature to every role. Scoping the solution meant defining purposeful information boundaries and establishing recurring structural patterns:
            </p>

            <!-- Key Scoping Pillars -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] mb-2 font-semibold">01 · ROLE-CENTRIC INFORMATION</div>
                <h3 class="text-base font-serif text-[var(--text-main)] mb-2">Role-Based Organization</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Organizing the entire operational experience around five distinct operational contexts, removing non-relevant noise from daily views.</p>
              </div>
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] mb-2 font-semibold">02 · PREDICTABLE MAPPING</div>
                <h3 class="text-base font-serif text-[var(--text-main)] mb-2">Consistent Dashboard Shell</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Establishing a unified layout schema across all dashboards: persistent sidebar navigation, top header utility bar, KPI row, and primary workspace.</p>
              </div>
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] mb-2 font-semibold">03 · COMPONENT ARCHITECTURE</div>
                <h3 class="text-base font-serif text-[var(--text-main)] mb-2">Standardized UI Components</h3>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed">Presenting operational metrics through reusable summary cards, trendline sparklines, status pills, calendars, and high-density data tables.</p>
              </div>
            </div>

            <!-- Scoping Visuals (Slot 19) -->
            <div>
              <div class="text-xs font-mono text-[var(--text-sec)] uppercase tracking-wider mb-3">
                <span>Role-Based Information Architecture Diagram</span>
              </div>
              ${renderImageSlotMarkup({
                slot: 'IMAGE SLOT 19',
                title: 'Role-Based Information Architecture',
                filename: 'dse-dify-role-architecture.svg',
                verifiedSrc: 'assets/dse-dify-role-architecture.svg',
                alt: 'Role-Based Information Architecture showing the central Command Center core connected to 5 operational role dashboards',
                caption: 'System architecture diagram illustrating the central Command Center platform model and its role-specific operational dashboard views.'
              })}
            </div>
          </section>

          <!-- ============================================================
               05 — KEY COMPLEXITIES ADDRESSED
          ============================================================ -->
          <section id="cs-complexities" class="scroll-mt-8 border-t border-[var(--border)] pt-12">
            <div class="editorial-badge mb-3">05 — KEY COMPLEXITIES ADDRESSED</div>
            <h2 class="text-3xl sm:text-4xl font-serif text-[var(--text-main)] mb-4">Operational Challenges Solved Through Design</h2>
            <p class="text-base text-[var(--text-sec)] max-w-2xl mb-10 leading-relaxed font-light">
              Solving enterprise scale problems visible directly in the operational requirements:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
                <div>
                  <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">COMPLEXITY 01</div>
                  <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Role-Based Navigation</h3>
                  <p class="text-xs text-[var(--text-sec)] leading-relaxed">Presenting different operational information and navigation menus for trainers, campus coordinators, corporate leads, and enterprise admins while maintaining a coherent, recognizable product experience.</p>
                </div>
              </div>

              <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
                <div>
                  <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">COMPLEXITY 02</div>
                  <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Information Density</h3>
                  <p class="text-xs text-[var(--text-sec)] leading-relaxed">Organizing multi-cohort metrics, attendance curves, tables, and activity summaries without making dense operational views visually fatiguing or hard to scan.</p>
                </div>
              </div>

              <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
                <div>
                  <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">COMPLEXITY 03</div>
                  <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Data Visualization</h3>
                  <p class="text-xs text-[var(--text-sec)] leading-relaxed">Selecting purposeful chart types — trendlines for enrollment velocity, radial completion rings, and star distributions — paired with legible labels and high-contrast color ramps.</p>
                </div>
              </div>

              <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
                <div>
                  <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">COMPLEXITY 04</div>
                  <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Cross-Dashboard Consistency</h3>
                  <p class="text-xs text-[var(--text-sec)] leading-relaxed">Ensuring buttons, metric cards, search inputs, and modal drawers follow unified design tokens across all five dashboards, preventing fragmented user experiences.</p>
                </div>
              </div>

              <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between md:col-span-2 lg:col-span-2">
                <div>
                  <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">COMPLEXITY 05</div>
                  <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">Financial &amp; Operational Reporting</h3>
                  <p class="text-xs text-[var(--text-sec)] leading-relaxed">Structuring complex multidimensional reporting — batch completions, domestic vs. overseas program splits, fee collection statuses, and fee waiver approvals — into clean, audit-ready data views.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- ============================================================
               06 — DESIGN DECISIONS
          ============================================================ -->
          <section id="cs-decisions" class="scroll-mt-8 border-t border-[var(--border)] pt-12">
            <div class="editorial-badge mb-3">06 — DESIGN DECISIONS</div>
            <h2 class="text-3xl sm:text-4xl font-serif text-[var(--text-main)] mb-4">Intentional Design Patterns Across the Platform</h2>
            <p class="text-base text-[var(--text-sec)] max-w-2xl mb-10 leading-relaxed font-light">
              Documenting seven key design choices implemented across the Command Center:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <!-- Decision 01 -->
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase mb-2">DECISION 01</div>
                <h4 class="text-base font-serif text-[var(--text-main)] mb-2">Consistent Sidebar Navigation</h4>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed"><strong>What:</strong> Maintains a persistent, ergonomic vertical sidebar with standardized icon-plus-label items and active gradient highlighting for the current operational section.</p>
                <p class="text-xs text-[var(--text-sec)] mt-2 leading-relaxed"><strong>Why:</strong> Prevents disorientation when users switch between sub-modules and establishes an intuitive visual anchor regardless of screen depth.</p>
              </div>

              <!-- Decision 02 -->
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase mb-2">DECISION 02</div>
                <h4 class="text-base font-serif text-[var(--text-main)] mb-2">Reusable Summary Metric Cards</h4>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed"><strong>What:</strong> Standardizes KPI presentation using three structured containers: active numeric counters with delta indicators (+5.2%), radial percentage progress rings (88.4%), and average score ratings with star breakdowns (4.75 Avg.).</p>
                <p class="text-xs text-[var(--text-sec)] mt-2 leading-relaxed"><strong>Why:</strong> Enables operational leaders to evaluate health at a single glance without reading entire database rows.</p>
              </div>

              <!-- Decision 03 -->
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase mb-2">DECISION 03</div>
                <h4 class="text-base font-serif text-[var(--text-main)] mb-2">Clear Visual Hierarchy</h4>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed"><strong>What:</strong> Distinguishes high-level operational summaries from granular tabular rows using distinct typographic scale and elevation.</p>
                <p class="text-xs text-[var(--text-sec)] mt-2 leading-relaxed"><strong>Why:</strong> Prevents visual fatigue and guides user attention naturally from macro KPIs down to actionable records.</p>
              </div>

              <!-- Decision 04 -->
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase mb-2">DECISION 04</div>
                <h4 class="text-base font-serif text-[var(--text-main)] mb-2">Scoped Filter Systems</h4>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed"><strong>What:</strong> Integrates inline dropdown filters for academic years, batches, programs, and statuses directly above tables.</p>
                <p class="text-xs text-[var(--text-sec)] mt-2 leading-relaxed"><strong>Why:</strong> Allows staff to drill down into specific cohorts without losing current page context or triggering disruptive page reloads.</p>
              </div>

              <!-- Decision 05 -->
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase mb-2">DECISION 05</div>
                <h4 class="text-base font-serif text-[var(--text-main)] mb-2">Distinct Chart Colors &amp; Legends</h4>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed"><strong>What:</strong> Uses high-contrast coral (#D98A7A) and burgundy accents on deep backgrounds with explicit legends.</p>
                <p class="text-xs text-[var(--text-sec)] mt-2 leading-relaxed"><strong>Why:</strong> Eliminates ambiguity in multi-cohort trendlines and maintains WCAG accessibility compliance across dark and light themes.</p>
              </div>

              <!-- Decision 06 -->
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase mb-2">DECISION 06</div>
                <h4 class="text-base font-serif text-[var(--text-main)] mb-2">High-Density Data Tables</h4>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed"><strong>What:</strong> Uses compact row padding, sticky headers, inline progress bars, and status pills (Active, Completed, Pending).</p>
                <p class="text-xs text-[var(--text-sec)] mt-2 leading-relaxed"><strong>Why:</strong> Displays up to 10 key data columns per cohort on desktop without requiring horizontal scrolling.</p>
              </div>

              <!-- Decision 07 -->
              <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] md:col-span-2 lg:col-span-3">
                <div class="text-[10px] font-mono text-[var(--accent)] uppercase mb-2">DECISION 07</div>
                <h4 class="text-base font-serif text-[var(--text-main)] mb-2">Consistent Action Controls &amp; Feedback</h4>
                <p class="text-xs text-[var(--text-sec)] leading-relaxed"><strong>What:</strong> Standardizes button variants (solid coral primary, subtle bordered secondary), search bars with keyboard focus rings, and slide-over preview drawers.</p>
                <p class="text-xs text-[var(--text-sec)] mt-2 leading-relaxed"><strong>Why:</strong> Reduces operational errors and builds muscle memory for coordinators managing high-volume tasks daily.</p>
              </div>
            </div>
          </section>

          <!-- ============================================================
               07 — MY CONTRIBUTION AND PROJECT REFLECTION
          ============================================================ -->
          <section id="cs-contribution" class="scroll-mt-8 border-t border-[var(--border)] pt-12">
            <div class="editorial-badge mb-3">07 — MY CONTRIBUTION &amp; REFLECTION</div>
            <h2 class="text-3xl sm:text-4xl font-serif text-[var(--text-main)] mb-6">Design Ownership &amp; Reflection</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg flex flex-col justify-between">
                <div>
                  <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-3 font-semibold">MY DESIGN CONTRIBUTION</div>
                  <h3 class="text-xl font-serif text-[var(--text-main)] mb-4">Core Scope &amp; Responsibilities</h3>
                  <p class="text-sm text-[var(--text-sec)] leading-relaxed italic border-l-2 border-[var(--accent)] pl-4">
                    “My design work focused on structuring dashboard experiences for different operational teams, establishing clear information hierarchy, organizing complex data into understandable views, and maintaining consistent interaction and visual patterns across the Command Center.”
                  </p>
                </div>
                <div class="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-sec)]">
                  Focused on UI/UX design execution, component systems, and data presentation.
                </div>
              </div>

              <div class="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg flex flex-col justify-between">
                <div>
                  <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-3 font-semibold">PROJECT REFLECTION</div>
                  <h3 class="text-xl font-serif text-[var(--text-main)] mb-4">Key Professional Takeaways</h3>
                  <p class="text-sm text-[var(--text-sec)] leading-relaxed mb-4">
                    Designing enterprise tools highlighted that clarity and restraint are paramount when users depend on data to make daily operational decisions. Balancing high data density with rapid scannability required careful typography, intentional card groupings, and predictable navigation models across all operational roles.
                  </p>
                  <p class="text-xs text-[var(--text-sec)] leading-relaxed font-light">
                    Establishing a unified design token system ensured that despite five distinct operational contexts, the platform maintained a singular, cohesive identity.
                  </p>
                </div>
                <div class="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-sec)]">
                  Scalable Design System · Enterprise UX · High-Density Data
                </div>
              </div>
            </div>
          </section>

          <!-- Explore More Work Section -->
          ${renderExploreMoreWork('dsedify')}
    </div>
  `;

  setTimeout(() => {
    if (activeDSEdifyTab === 'campus-connect') {
      initCampusConnectVideoAutoplay();
    } else if (activeDSEdifyTab === 'corporate-connect') {
      initCorporateConnectVideoAutoplay();
    } else if (activeDSEdifyTab === 'trainer') {
      initTrainerVideoAutoplay();
    } else if (activeDSEdifyTab === 'admin') {
      initAdminVideoAutoplay();
    } else if (activeDSEdifyTab === 'overseas') {
      initOverseasVideoAutoplay();
    }
  }, 50);
}

function initCaseStudyRouter() {
  const homeView = document.getElementById('homeView');
  const caseStudyView = document.getElementById('caseStudyView');

  function handleRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#work/')) {
      const projectId = hash.replace('#work/', '');
      if (caseStudies[projectId]) {
        if (projectId !== 'dsedify') {
          const prevCampus = document.getElementById('campusConnectVideo');
          if (prevCampus) { try { prevCampus.pause(); prevCampus.currentTime = 0; } catch (e) {} }
          const prevCorp = document.getElementById('corporateConnectVideo');
          if (prevCorp) { try { prevCorp.pause(); prevCorp.currentTime = 0; } catch (e) {} }
          const prevTrainer = document.getElementById('trainerVideo');
          if (prevTrainer) { try { prevTrainer.pause(); prevTrainer.currentTime = 0; } catch (e) {} }
          const prevAdmin = document.getElementById('adminVideo');
          if (prevAdmin) { try { prevAdmin.pause(); prevAdmin.currentTime = 0; } catch (e) {} }
          const prevOverseas = document.getElementById('overseasVideo');
          if (prevOverseas) { try { prevOverseas.pause(); prevOverseas.currentTime = 0; } catch (e) {} }
        }
        if (projectId !== 'ds-jobby' && projectId !== 'dsjobby') {
          const prevDsjobby = document.getElementById('dsjobbyMobileVideo');
          if (prevDsjobby) { try { prevDsjobby.pause(); prevDsjobby.currentTime = 0; } catch (e) {} }
        }
        if (projectId !== 'meditrack') {
          const prevMeditrack = document.getElementById('meditrackMobileVideo');
          if (prevMeditrack) { try { prevMeditrack.pause(); prevMeditrack.currentTime = 0; } catch (e) {} }
          const prevInventory = document.getElementById('meditrackInventoryVideo');
          if (prevInventory) { try { prevInventory.pause(); prevInventory.currentTime = 0; } catch (e) {} }
          const prevBilling = document.getElementById('meditrackBillingVideo');
          if (prevBilling) { try { prevBilling.pause(); prevBilling.currentTime = 0; } catch (e) {} }
          const prevStoreMapping = document.getElementById('meditrackStoreMappingVideo');
          if (prevStoreMapping) { try { prevStoreMapping.pause(); prevStoreMapping.currentTime = 0; } catch (e) {} }
        }
        renderCaseStudy(caseStudies[projectId]);
        homeView.classList.add('hidden');
        caseStudyView.classList.remove('hidden');
        const urlParams = new URLSearchParams(window.location.search);
        const sectionParam = urlParams.get('section');
        if (sectionParam) {
          const el = document.getElementById(sectionParam);
          if (el) el.scrollIntoView();
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
    }

    if (hash.startsWith('#cs-') && !caseStudyView.classList.contains('hidden')) {
      const targetEl = document.querySelector(hash);
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }
        // Default to Home View
    const prevCampus = document.getElementById('campusConnectVideo');
    if (prevCampus) { try { prevCampus.pause(); prevCampus.currentTime = 0; } catch (e) {} }
    const prevCorp = document.getElementById('corporateConnectVideo');
    if (prevCorp) { try { prevCorp.pause(); prevCorp.currentTime = 0; } catch (e) {} }
    const prevTrainer = document.getElementById('trainerVideo');
    if (prevTrainer) { try { prevTrainer.pause(); prevTrainer.currentTime = 0; } catch (e) {} }
    const prevAdmin = document.getElementById('adminVideo');
    if (prevAdmin) { try { prevAdmin.pause(); prevAdmin.currentTime = 0; } catch (e) {} }
    const prevOverseas = document.getElementById('overseasVideo');
    if (prevOverseas) { try { prevOverseas.pause(); prevOverseas.currentTime = 0; } catch (e) {} }
    const prevDsjobby = document.getElementById('dsjobbyMobileVideo');
    if (prevDsjobby) { try { prevDsjobby.pause(); prevDsjobby.currentTime = 0; } catch (e) {} }
    const prevMeditrack = document.getElementById('meditrackMobileVideo');
    if (prevMeditrack) { try { prevMeditrack.pause(); prevMeditrack.currentTime = 0; } catch (e) {} }
    const prevInventory = document.getElementById('meditrackInventoryVideo');
    if (prevInventory) { try { prevInventory.pause(); prevInventory.currentTime = 0; } catch (e) {} }
    const prevBilling = document.getElementById('meditrackBillingVideo');
    if (prevBilling) { try { prevBilling.pause(); prevBilling.currentTime = 0; } catch (e) {} }
    const prevStoreMapping = document.getElementById('meditrackStoreMappingVideo');
    if (prevStoreMapping) { try { prevStoreMapping.pause(); prevStoreMapping.currentTime = 0; } catch (e) {} }
    caseStudyView.classList.add('hidden');
    homeView.classList.remove('hidden');
    setTimeout(() => {
      if (typeof window.initSelectedWorkShowcase === 'function') {
        window.initSelectedWorkShowcase();
      }
      if (typeof window.initMeditrackMobileVideo === 'function') {
        window.initMeditrackMobileVideo();
      }
      if (typeof window.initMeditrackInventoryVideo === 'function') {
        window.initMeditrackInventoryVideo();
      }
      if (typeof window.initMeditrackBillingVideo === 'function') {
        window.initMeditrackBillingVideo();
      }
      if (typeof window.initMeditrackStoreMappingVideo === 'function') {
        window.initMeditrackStoreMappingVideo();
      }
    }, 60);
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Run on initial load
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('scroll')) {
      setTimeout(() => {
        const el = document.getElementById(urlParams.get('scroll'));
        if (el) el.scrollIntoView();
      }, 250);
    }
  } catch (e) {}
  setTimeout(() => {
    if (typeof window.initMeditrackMobileVideo === 'function') {
      window.initMeditrackMobileVideo();
    }
    if (typeof window.initMeditrackInventoryVideo === 'function') {
      window.initMeditrackInventoryVideo();
    }
    if (typeof window.initMeditrackBillingVideo === 'function') {
      window.initMeditrackBillingVideo();
    }
    if (typeof window.initMeditrackStoreMappingVideo === 'function') {
      window.initMeditrackStoreMappingVideo();
    }
  }, 100);
}

/* -------------------------------------------------------------
   DSJobby Mobile Walkthrough Video Controller
   - Autoplays muted on viewport entry via IntersectionObserver
   - Pauses when leaving viewport
   - Inline playback (playsInline)
   - Fallback Play button overlay if autoplay is restricted
   - Accessible Play/Pause, Replay, and Mute controls
   - Respects prefers-reduced-motion
------------------------------------------------------------- */
window.initDSJobbyMobileVideo = function() {
  const video = document.getElementById('dsjobbyMobileVideo');
  if (!video) return;

  const overlay = document.getElementById('dsjobbyPlayOverlay');
  const playPauseBtn = document.getElementById('dsjobbyPlayPauseBtn');
  const playPauseIcon = document.getElementById('dsjobbyPlayPauseIcon');
  const playPauseLabel = document.getElementById('dsjobbyPlayPauseLabel');
  const muteBtn = document.getElementById('dsjobbyMuteBtn');
  const muteIcon = document.getElementById('dsjobbyMuteIcon');
  const muteLabel = document.getElementById('dsjobbyMuteLabel');
  const statusEl = document.getElementById('dsjobbyVideoStatus');
  const reducedNotice = document.getElementById('dsjobbyReducedMotionNotice');

  // Enforce muted and inline playback
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  const updateUIPlaying = () => {
    if (overlay) overlay.classList.add('hidden');
    if (playPauseLabel) playPauseLabel.textContent = 'Pause';
    if (playPauseBtn) {
      playPauseBtn.setAttribute('aria-label', 'Pause video');
      playPauseBtn.setAttribute('aria-pressed', 'false');
    }
    if (playPauseIcon) {
      playPauseIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    }
    if (statusEl) {
      statusEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span><span>Playing walkthrough</span>';
    }
  };

  const updateUIPaused = () => {
    if (overlay) overlay.classList.remove('hidden');
    if (playPauseLabel) playPauseLabel.textContent = 'Play';
    if (playPauseBtn) {
      playPauseBtn.setAttribute('aria-label', 'Play video');
      playPauseBtn.setAttribute('aria-pressed', 'true');
    }
    if (playPauseIcon) {
      playPauseIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
    if (statusEl) {
      statusEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span><span>Paused</span>';
    }
  };

  video.onplay = updateUIPlaying;
  video.onpause = () => {
    updateUIPaused();
  };
  video.onended = () => {
    try { video.currentTime = 0; } catch (e) {}
    video.play().catch(() => updateUIPaused());
  };

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    if (reducedNotice) reducedNotice.classList.remove('hidden');
    video.pause();
    updateUIPaused();
    return;
  }

  const attemptPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateUIPlaying();
        })
        .catch(() => {
          // Autoplay policy prevented playback; gracefully display Play overlay
          updateUIPaused();
        });
    }
  };

  // Play automatically when visible in viewport; pause and reset when offscreen
  if ('IntersectionObserver' in window) {
    if (window._dsjobbyVideoObserver) {
      try { window._dsjobbyVideoObserver.disconnect(); } catch (e) {}
    }
    window._dsjobbyVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
          updateUIPaused();
        }
      });
    }, { threshold: 0.15 });

    window._dsjobbyVideoObserver.observe(video);
  } else {
    attemptPlay();
  }
};

window.toggleDSJobbyMobilePlayback = function() {
  const video = document.getElementById('dsjobbyMobileVideo');
  if (!video) return;

  if (video.paused) {
    video.play().then(() => {
      const overlay = document.getElementById('dsjobbyPlayOverlay');
      if (overlay) overlay.classList.add('hidden');
    }).catch(() => {});
  } else {
    video.pause();
  }
};

window.replayDSJobbyMobileVideo = function() {
  const video = document.getElementById('dsjobbyMobileVideo');
  if (!video) return;
  try {
    video.currentTime = 0;
  } catch (e) {}
  video.play().catch(() => {});
};

window.toggleDSJobbyMobileMute = function() {
  const video = document.getElementById('dsjobbyMobileVideo');
  if (!video) return;
  video.muted = !video.muted;
  
  const muteLabel = document.getElementById('dsjobbyMuteLabel');
  const muteIcon = document.getElementById('dsjobbyMuteIcon');
  const muteBtn = document.getElementById('dsjobbyMuteBtn');

  if (video.muted) {
    if (muteLabel) muteLabel.textContent = 'Muted';
    if (muteBtn) muteBtn.setAttribute('aria-label', 'Unmute video');
    if (muteIcon) {
      muteIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>';
    }
  } else {
    if (muteLabel) muteLabel.textContent = 'Unmuted';
    if (muteBtn) muteBtn.setAttribute('aria-label', 'Mute video');
    if (muteIcon) {
      muteIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>';
    }
  }
};

window.enlargeDSJobbyMobileVideo = function() {
  const videoEl = document.getElementById('dsjobbyMobileVideo');
  if (videoEl) {
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if (videoEl.webkitRequestFullscreen) {
      videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    }
  }
};

/* -------------------------------------------------------------
   MediTrack Mobile Walkthrough Video Controller
   - Autoplays muted on viewport entry via IntersectionObserver
   - Pauses when leaving viewport
   - Inline playback (playsInline)
   - Fallback Play button overlay if autoplay is restricted
   - Accessible Play/Pause, Replay, and Mute controls
   - Respects prefers-reduced-motion
------------------------------------------------------------- */
window._meditrackObservers = window._meditrackObservers || [];

window.initMeditrackMobileVideo = function() {
  const configs = [
    {
      video: document.getElementById('meditrackMobileVideo'),
      overlay: document.getElementById('meditrackPlayOverlay'),
      playPauseBtn: document.getElementById('meditrackPlayPauseBtn'),
      playPauseIcon: document.getElementById('meditrackPlayPauseIcon'),
      playPauseLabel: document.getElementById('meditrackPlayPauseLabel'),
      muteBtn: document.getElementById('meditrackMuteBtn'),
      muteIcon: document.getElementById('meditrackMuteIcon'),
      muteLabel: document.getElementById('meditrackMuteLabel')
    },
    {
      video: document.getElementById('csMeditrackMobileVideo'),
      overlay: document.getElementById('csMeditrackPlayOverlay'),
      playPauseBtn: document.getElementById('csMeditrackPlayPauseBtn'),
      playPauseIcon: document.getElementById('csMeditrackPlayPauseIcon'),
      playPauseLabel: document.getElementById('csMeditrackPlayPauseLabel'),
      muteBtn: document.getElementById('csMeditrackMuteBtn'),
      muteIcon: document.getElementById('csMeditrackMuteIcon'),
      muteLabel: document.getElementById('csMeditrackMuteLabel')
    }
  ];

  // Clean up any existing observers
  if (window._meditrackObservers && window._meditrackObservers.length) {
    window._meditrackObservers.forEach(obs => {
      try { obs.disconnect(); } catch (e) {}
    });
    window._meditrackObservers = [];
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  configs.forEach(cfg => {
    const video = cfg.video;
    if (!video) return;

    // Enforce muted and inline playback
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const updateUIPlaying = () => {
      if (cfg.overlay) cfg.overlay.classList.add('hidden');
      if (cfg.playPauseLabel) cfg.playPauseLabel.textContent = 'Pause';
      if (cfg.playPauseBtn) {
        cfg.playPauseBtn.setAttribute('aria-label', 'Pause video');
        cfg.playPauseBtn.setAttribute('aria-pressed', 'false');
      }
      if (cfg.playPauseIcon) {
        cfg.playPauseIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
      }
    };

    const updateUIPaused = () => {
      if (cfg.overlay) cfg.overlay.classList.remove('hidden');
      if (cfg.playPauseLabel) cfg.playPauseLabel.textContent = 'Play';
      if (cfg.playPauseBtn) {
        cfg.playPauseBtn.setAttribute('aria-label', 'Play video');
        cfg.playPauseBtn.setAttribute('aria-pressed', 'true');
      }
      if (cfg.playPauseIcon) {
        cfg.playPauseIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
      }
    };

    video.onplay = updateUIPlaying;
    video.onpause = updateUIPaused;
    video.onended = () => {
      try { video.currentTime = 0; } catch (e) {}
      video.play().catch(() => updateUIPaused());
    };

    if (prefersReducedMotion) {
      video.pause();
      updateUIPaused();
      return;
    }

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateUIPlaying();
          })
          .catch(() => {
            updateUIPaused();
          });
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
            updateUIPaused();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(video);
      window._meditrackObservers.push(observer);
    } else {
      attemptPlay();
    }
  });
};

function getActiveMeditrackElements() {
  const caseStudyView = document.getElementById('caseStudyView');
  const isCaseStudyVisible = caseStudyView && !caseStudyView.classList.contains('hidden');
  const csVideo = document.getElementById('csMeditrackMobileVideo');
  if (isCaseStudyVisible && csVideo) {
    return {
      video: csVideo,
      overlay: document.getElementById('csMeditrackPlayOverlay'),
      muteBtn: document.getElementById('csMeditrackMuteBtn'),
      muteIcon: document.getElementById('csMeditrackMuteIcon'),
      muteLabel: document.getElementById('csMeditrackMuteLabel')
    };
  }
  return {
    video: document.getElementById('meditrackMobileVideo'),
    overlay: document.getElementById('meditrackPlayOverlay'),
    muteBtn: document.getElementById('meditrackMuteBtn'),
    muteIcon: document.getElementById('meditrackMuteIcon'),
    muteLabel: document.getElementById('meditrackMuteLabel')
  };
}

window.toggleMeditrackMobilePlayback = function() {
  const active = getActiveMeditrackElements();
  if (!active || !active.video) return;

  if (active.video.paused) {
    active.video.play().then(() => {
      if (active.overlay) active.overlay.classList.add('hidden');
    }).catch(() => {});
  } else {
    active.video.pause();
  }
};

window.replayMeditrackMobileVideo = function() {
  const active = getActiveMeditrackElements();
  if (!active || !active.video) return;
  try {
    active.video.currentTime = 0;
  } catch (e) {}
  active.video.play().catch(() => {});
};

window.toggleMeditrackMobileMute = function() {
  const active = getActiveMeditrackElements();
  if (!active || !active.video) return;
  active.video.muted = !active.video.muted;

  if (active.video.muted) {
    if (active.muteLabel) active.muteLabel.textContent = 'Muted';
    if (active.muteBtn) active.muteBtn.setAttribute('aria-label', 'Unmute video');
    if (active.muteIcon) {
      active.muteIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>';
    }
  } else {
    if (active.muteLabel) active.muteLabel.textContent = 'Unmuted';
    if (active.muteBtn) active.muteBtn.setAttribute('aria-label', 'Mute video');
    if (active.muteIcon) {
      active.muteIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>';
    }
  }
};

/* -------------------------------------------------------------
   MediTrack Inventory & Billing Walkthrough Video Controller
   - Autoplays muted on viewport entry via IntersectionObserver
   - Pauses when leaving viewport
   - Inline playback (playsInline)
   - Fallback Play button overlay if autoplay is restricted
   - Respects prefers-reduced-motion
------------------------------------------------------------- */
window._meditrackInventoryObservers = window._meditrackInventoryObservers || [];

window.initMeditrackInventoryVideo = function() {
  const configs = [
    {
      video: document.getElementById('meditrackInventoryVideo'),
      overlay: document.getElementById('meditrackInventoryPlayOverlay')
    },
    {
      video: document.getElementById('csMeditrackInventoryVideo'),
      overlay: document.getElementById('csMeditrackInventoryPlayOverlay')
    }
  ];

  if (window._meditrackInventoryObservers && window._meditrackInventoryObservers.length) {
    window._meditrackInventoryObservers.forEach(obs => {
      try { obs.disconnect(); } catch (e) {}
    });
    window._meditrackInventoryObservers = [];
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  configs.forEach(cfg => {
    const video = cfg.video;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const updateUIPlaying = () => {
      if (cfg.overlay) cfg.overlay.classList.add('hidden');
    };

    const updateUIPaused = () => {
      if (cfg.overlay) cfg.overlay.classList.remove('hidden');
    };

    video.onplay = updateUIPlaying;
    video.onpause = updateUIPaused;
    video.onended = () => {
      try { video.currentTime = 0; } catch (e) {}
      video.play().catch(() => updateUIPaused());
    };

    if (prefersReducedMotion) {
      video.pause();
      updateUIPaused();
      return;
    }

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateUIPlaying();
          })
          .catch(() => {
            updateUIPaused();
          });
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
            updateUIPaused();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(video);
      window._meditrackInventoryObservers.push(observer);
    } else {
      attemptPlay();
    }
  });
};

function getActiveMeditrackInventoryVideo() {
  const csVideo = document.getElementById('csMeditrackInventoryVideo');
  const homeVideo = document.getElementById('meditrackInventoryVideo');
  const caseStudyView = document.getElementById('caseStudyView');
  if (caseStudyView && !caseStudyView.classList.contains('hidden') && csVideo) {
    return { video: csVideo, overlay: document.getElementById('csMeditrackInventoryPlayOverlay') };
  }
  return { video: homeVideo, overlay: document.getElementById('meditrackInventoryPlayOverlay') };
}

window.toggleMeditrackInventoryPlayback = function() {
  const active = getActiveMeditrackInventoryVideo();
  if (!active || !active.video) return;

  if (active.video.paused) {
    active.video.play().then(() => {
      if (active.overlay) active.overlay.classList.add('hidden');
    }).catch(() => {});
  } else {
    active.video.pause();
  }
};

window.replayMeditrackInventoryVideo = function() {
  const active = getActiveMeditrackInventoryVideo();
  if (!active || !active.video) return;
  try {
    active.video.currentTime = 0;
  } catch (e) {}
  active.video.play().catch(() => {});
};

/* -------------------------------------------------------------
   MediTrack Billing & Checkout Walkthrough Video Controller
   - Autoplays muted on viewport entry via IntersectionObserver
   - Pauses when scrolled out of view
   - Fallback Play button overlay if autoplay is restricted
   - Respects prefers-reduced-motion
------------------------------------------------------------- */
window._meditrackBillingObservers = window._meditrackBillingObservers || [];

window.initMeditrackBillingVideo = function() {
  const configs = [
    {
      video: document.getElementById('meditrackBillingVideo'),
      overlay: document.getElementById('meditrackBillingPlayOverlay')
    },
    {
      video: document.getElementById('csMeditrackBillingVideo'),
      overlay: document.getElementById('csMeditrackBillingPlayOverlay')
    }
  ];

  if (window._meditrackBillingObservers && window._meditrackBillingObservers.length) {
    window._meditrackBillingObservers.forEach(obs => {
      try { obs.disconnect(); } catch (e) {}
    });
    window._meditrackBillingObservers = [];
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  configs.forEach(cfg => {
    const video = cfg.video;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const updateUIPlaying = () => {
      if (cfg.overlay) cfg.overlay.classList.add('hidden');
    };

    const updateUIPaused = () => {
      if (cfg.overlay) cfg.overlay.classList.remove('hidden');
    };

    video.onplay = updateUIPlaying;
    video.onpause = updateUIPaused;
    video.onended = () => {
      try { video.currentTime = 0; } catch (e) {}
      video.play().catch(() => updateUIPaused());
    };

    if (prefersReducedMotion) {
      video.pause();
      updateUIPaused();
      return;
    }

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateUIPlaying();
          })
          .catch(() => {
            updateUIPaused();
          });
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
            updateUIPaused();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(video);
      window._meditrackBillingObservers.push(observer);
    } else {
      attemptPlay();
    }
  });
};

function getActiveMeditrackBillingVideo() {
  const csVideo = document.getElementById('csMeditrackBillingVideo');
  const homeVideo = document.getElementById('meditrackBillingVideo');
  const caseStudyView = document.getElementById('caseStudyView');
  if (caseStudyView && !caseStudyView.classList.contains('hidden') && csVideo) {
    return { video: csVideo, overlay: document.getElementById('csMeditrackBillingPlayOverlay') };
  }
  return { video: homeVideo, overlay: document.getElementById('meditrackBillingPlayOverlay') };
}

window.toggleMeditrackBillingPlayback = function() {
  const active = getActiveMeditrackBillingVideo();
  if (!active || !active.video) return;

  if (active.video.paused) {
    active.video.play().then(() => {
      if (active.overlay) active.overlay.classList.add('hidden');
    }).catch(() => {});
  } else {
    active.video.pause();
  }
};

window.replayMeditrackBillingVideo = function() {
  const active = getActiveMeditrackBillingVideo();
  if (!active || !active.video) return;
  try {
    active.video.currentTime = 0;
  } catch (e) {}
  active.video.play().catch(() => {});
};

/* -------------------------------------------------------------
   MediTrack Smart Store Mapping Walkthrough Video Controller
   - Autoplays muted on viewport entry via IntersectionObserver
   - Pauses when scrolled out of view
   - Fallback Play button overlay if autoplay is restricted
   - Respects prefers-reduced-motion
------------------------------------------------------------- */
window._meditrackStoreMappingObservers = window._meditrackStoreMappingObservers || [];

window.initMeditrackStoreMappingVideo = function() {
  const configs = [
    {
      video: document.getElementById('meditrackStoreMappingVideo'),
      overlay: document.getElementById('meditrackStoreMappingPlayOverlay')
    },
    {
      video: document.getElementById('csMeditrackStoreMappingVideo'),
      overlay: document.getElementById('csMeditrackStoreMappingPlayOverlay')
    }
  ];

  if (window._meditrackStoreMappingObservers && window._meditrackStoreMappingObservers.length) {
    window._meditrackStoreMappingObservers.forEach(obs => {
      try { obs.disconnect(); } catch (e) {}
    });
    window._meditrackStoreMappingObservers = [];
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  configs.forEach(cfg => {
    const video = cfg.video;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const updateUIPlaying = () => {
      if (cfg.overlay) cfg.overlay.classList.add('hidden');
    };

    const updateUIPaused = () => {
      if (cfg.overlay) cfg.overlay.classList.remove('hidden');
    };

    video.onplay = updateUIPlaying;
    video.onpause = updateUIPaused;
    video.onended = () => {
      try { video.currentTime = 0; } catch (e) {}
      video.play().catch(() => updateUIPaused());
    };

    if (prefersReducedMotion) {
      video.pause();
      updateUIPaused();
      return;
    }

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateUIPlaying();
          })
          .catch(() => {
            updateUIPaused();
          });
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
            updateUIPaused();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(video);
      window._meditrackStoreMappingObservers.push(observer);
    } else {
      attemptPlay();
    }
  });
};

function getActiveMeditrackStoreMappingVideo() {
  const csVideo = document.getElementById('csMeditrackStoreMappingVideo');
  const homeVideo = document.getElementById('meditrackStoreMappingVideo');
  const caseStudyView = document.getElementById('caseStudyView');
  if (caseStudyView && !caseStudyView.classList.contains('hidden') && csVideo) {
    return { video: csVideo, overlay: document.getElementById('csMeditrackStoreMappingPlayOverlay') };
  }
  return { video: homeVideo, overlay: document.getElementById('meditrackStoreMappingPlayOverlay') };
}

window.toggleMeditrackStoreMappingPlayback = function() {
  const active = getActiveMeditrackStoreMappingVideo();
  if (!active || !active.video) return;

  if (active.video.paused) {
    active.video.play().then(() => {
      if (active.overlay) active.overlay.classList.add('hidden');
    }).catch(() => {});
  } else {
    active.video.pause();
  }
};

window.replayMeditrackStoreMappingVideo = function() {
  const active = getActiveMeditrackStoreMappingVideo();
  if (!active || !active.video) return;
  try {
    active.video.currentTime = 0;
  } catch (e) {}
  active.video.play().catch(() => {});
};


function renderDSJobbyCaseStudy(project, container) {
  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="border-b border-[var(--border)] pb-6 mb-8 flex justify-between items-center">
      <a href="#work" class="case-study-back-btn inline-flex items-center justify-center w-11 h-11 -ml-2.5 rounded-full text-[var(--accent)] hover:bg-[var(--sec-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]" aria-label="Back to selected work" title="Back to selected work">
        <svg class="w-5 h-5 pointer-events-none transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 12H5m0 0l7 7m-7-7l7-7"/>
        </svg>
        <span class="sr-only">Back to selected work</span>
      </a>
      <div class="flex items-center gap-3">
        <a href="https://www.dsjobby.com/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent)] hover:underline">
          <span>Visit dsjobby.com</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
        <span class="text-[var(--text-sec)]">·</span>
        <div class="text-xs font-mono text-[var(--text-sec)]">
          PROJECT 002 OF 04
        </div>
      </div>
    </div>

    <!-- Sticky In-Page Navigation Bar -->
    <nav class="sticky top-16 z-30 py-3 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] mb-10 overflow-x-auto scrollbar-none" aria-label="Case Study Section Navigation">
      <div class="flex items-center gap-2 min-w-max text-xs">
        <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mr-1">SECTIONS:</span>
        <a href="#cs-hero" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">01 Hero</a>
        <a href="#cs-snapshot" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">02 Snapshot</a>
        <a href="#cs-problem" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">03 Problem</a>
        <a href="#cs-research" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">04 Research</a>
        <a href="#cs-insights" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">05 Insights</a>
        <a href="#cs-personas" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">06 Archetypes</a>
        <a href="#cs-journey" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">07 Journey</a>
        <a href="#cs-ia" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">08 IA</a>
        <a href="#cs-flows" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">09 Flows</a>
        <a href="#cs-decisions" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">10 Decisions</a>
        <a href="#cs-accessibility" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">11 A11y</a>
        <a href="#cs-validation" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">12 Validation</a>
        <a href="#cs-reflection" class="cs-pill px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-sec)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all">13 Reflection</a>
      </div>
    </nav>

    <!-- ============================================================
         SECTION 1 — HERO: "The application shouldn't be the end of the story"
    ============================================================ -->
    <section id="cs-hero" class="mb-20 scroll-mt-32" aria-labelledby="hero-title">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div class="inline-flex items-center gap-2 text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
          <span>PRODUCT DESIGN CASE STUDY</span>
        </div>
        <a 
          href="https://www.dsjobby.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-[#170D13] font-bold text-xs hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
        >
          <span>Visit Live Website</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>

      <h1 id="hero-title" class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--text-main)] font-bold mb-4 tracking-tight leading-[1.12]">
        DSJobby — Bringing candidates and recruiters closer
      </h1>
      
      <p class="text-base sm:text-xl text-[var(--accent)] max-w-4xl mb-8 leading-relaxed font-normal">
        Designing a more direct and transparent recruitment journey, from discovering an opportunity to connecting with recruiters and learning from interview feedback.
      </p>

      <!-- Introductory Narrative (Exact Prompt Text) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] mb-10 shadow-sm leading-relaxed text-sm sm:text-base text-[var(--text-body)]">
        <div class="space-y-4">
          <p>
            Finding a job is more than submitting an application. For candidates, every opportunity represents a possible next step in their careers.
          </p>
          <p>
            But after applying, important questions remain. Has the application reached the recruiter? What happens next? If the interview does not lead to an offer, is there anything the candidate can learn from the experience?
          </p>
        </div>
        <div class="space-y-4 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
          <p>
            Recruiters face a different challenge: reviewing relevant profiles, managing interviews, and communicating with candidates throughout the hiring process.
          </p>
          <p>
            DSJobby is designed to support both sides of this journey by making recruitment workflows clearer and direct candidate–recruiter communication easier to navigate.
          </p>
        </div>
      </div>

      <!-- Verified Project Metadata Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--sec-bg)] mb-10 shadow-sm text-xs">
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">My Role</div>
          <div class="font-semibold text-[var(--text-main)]">UX and UI Designer</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Platform</div>
          <div class="font-semibold text-[var(--text-main)]">Web Application (Responsive)</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Design Focus</div>
          <div class="font-semibold text-[var(--text-main)]">Candidate Journey &amp; Recruiter Workflow</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Context</div>
          <div class="font-semibold text-[var(--text-main)]">Dyashin Technosoft Solutions</div>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Live Product</div>
          <a href="https://www.dsjobby.com/" target="_blank" rel="noopener noreferrer" class="font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1">
            <span>dsjobby.com</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>

      <!-- Hero Visual: Dual-Sided Platform Representation -->
      <figure class="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 shadow-xl overflow-hidden">
        <div class="flex flex-col lg:flex-row items-stretch gap-6">
          
          <!-- Left: Candidate Side (Discovery & Application) -->
          <div class="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3 pb-3 border-b border-[var(--border)]">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span class="text-xs font-mono font-semibold text-[var(--text-main)] uppercase tracking-wider">CANDIDATE DISCOVERY INTERFACE</span>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-semibold">100% PERMANENT ROLES</span>
              </div>
              <div class="space-y-3">
                <div class="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-xs">
                  <div class="flex justify-between items-start mb-1">
                    <div class="font-serif text-base font-bold text-[var(--text-main)]">Senior Product Designer</div>
                    <span class="text-xs font-mono font-semibold text-[var(--accent)]">₹18-24 LPA</span>
                  </div>
                  <div class="text-xs text-[var(--text-sec)] mb-2.5">Enterprise Cloud Systems · Bengaluru / Hybrid</div>
                  <div class="flex flex-wrap gap-1.5 mb-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--sec-bg)] text-[var(--text-sec)]">Design Systems</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--sec-bg)] text-[var(--text-sec)]">SaaS Architecture</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 font-medium">96% Skill Match</span>
                  </div>
                  <div class="flex items-center justify-between text-xs pt-2 border-t border-[var(--border)]">
                    <span class="text-[11px] text-[var(--text-sec)]">Recruiter: Anjali Rao (Verified)</span>
                    <span class="px-3 py-1 rounded bg-[var(--accent)] text-[#170D13] font-bold text-[11px]">Apply via Drawer →</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-sec)] font-mono">
              <span>ACTIVE STATUS: RECEIVING APPLICATIONS</span>
              <span class="text-emerald-400">● 24H REC REVIEW</span>
            </div>
          </div>

          <!-- Center Connection Indicator -->
          <div class="flex lg:flex-col items-center justify-center gap-2 py-2 text-[var(--accent)] shrink-0">
            <div class="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"></div>
            <div class="px-3 py-1.5 rounded-full border border-[var(--accent)] bg-[var(--sec-bg)] text-[10px] font-mono font-semibold tracking-wider uppercase text-center shadow-sm">
              <span>DIRECT WORKFLOW</span>
            </div>
            <div class="hidden lg:block w-px h-12 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent"></div>
          </div>

          <!-- Right: Recruiter Side (Review & Pipeline) -->
          <div class="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3 pb-3 border-b border-[var(--border)]">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span class="text-xs font-mono font-semibold text-[var(--text-main)] uppercase tracking-wider">RECRUITER REVIEW PIPELINE</span>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-semibold">ATS TRIAGE READY</span>
              </div>
              <div class="space-y-3">
                <div class="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-xs">
                  <div class="flex justify-between items-start mb-1">
                    <div>
                      <div class="font-serif text-base font-bold text-[var(--text-main)]">Candidate #DS-8842</div>
                      <div class="text-xs text-[var(--text-sec)]">4.5 Yrs Exp · Enterprise UX &amp; Systems</div>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 font-bold">MATCH: 94%</span>
                  </div>
                  <div class="p-2 rounded bg-[var(--sec-bg)] text-[11px] text-[var(--text-sec)] my-2.5 font-mono">
                    Verified Portfolio &amp; Direct Resume Attached · Notice: Immediate
                  </div>
                  <div class="flex items-center justify-between text-xs pt-2 border-t border-[var(--border)]">
                    <span class="text-[11px] font-mono text-amber-400">STAGE: INITIAL REVIEW</span>
                    <span class="px-3 py-1 rounded bg-[var(--sec-bg)] border border-[var(--accent)] text-[var(--accent)] font-semibold text-[11px]">Contact Candidate ✉</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-sec)] font-mono">
              <span>PIPELINE: 14 APPLICANTS</span>
              <span class="text-blue-400">● 1-CLICK CONTACT</span>
            </div>
          </div>

        </div>

        <!-- Progress Progression Bar -->
        <div class="mt-6 pt-5 border-t border-[var(--border)]">
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-2 text-center">
            END-TO-END APPLICATION-TO-INTERVIEW PROGRESSION ARCHITECTURE
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div class="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-[var(--accent)] block">STAGE 01</span>
              <span class="font-medium text-[var(--text-main)]">Role Discovery</span>
            </div>
            <div class="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-[var(--accent)] block">STAGE 02</span>
              <span class="font-medium text-[var(--text-main)]">Apply via Drawer</span>
            </div>
            <div class="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-[var(--accent)] block">STAGE 03</span>
              <span class="font-medium text-[var(--text-main)]">Recruiter Review</span>
            </div>
            <div class="p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-[var(--accent)] block">STAGE 04</span>
              <span class="font-medium text-[var(--text-main)]">Direct Interview</span>
            </div>
            <div class="col-span-2 sm:col-span-1 p-2 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]">
              <span class="text-[10px] font-mono text-[var(--accent)] font-bold block">STAGE 05</span>
              <span class="font-bold text-[var(--text-main)]">Outcome &amp; Feedback</span>
            </div>
          </div>
        </div>

        <figcaption class="mt-4 text-center text-xs text-[var(--text-sec)] font-mono italic">
          Intended product experience: A dual-sided platform connecting candidate discovery with structured recruiter review and direct communication.
        </figcaption>
      </figure>
    </section>

    <!-- ============================================================
         SECTION 2 — PROJECT SNAPSHOT
    ============================================================ -->
    <section id="cs-snapshot" class="mb-20 scroll-mt-32" aria-labelledby="snapshot-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">02 — PROJECT SNAPSHOT</span>
        <h2 id="snapshot-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
          One recruitment journey. Two perspectives.
        </h2>
        <p class="text-base text-[var(--text-body)] leading-relaxed font-light">
          DSJobby brings candidate and recruiter workflows into a shared recruitment experience. The design challenge is to support each user's tasks while keeping communication, application progress, and hiring responsibilities clear.
        </p>
      </div>

      <!-- Two Side-by-Side Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        <!-- Card 1: Candidate Experience -->
        <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between hover:border-[var(--accent)] transition-all shadow-sm">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-serif text-lg font-bold">
                01
              </div>
              <div>
                <span class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider block">PERSPECTIVE A</span>
                <h3 class="text-xl font-serif font-bold text-[var(--text-main)]">Candidate Experience</h3>
              </div>
            </div>
            <p class="text-sm sm:text-base text-[var(--text-body)] leading-relaxed mb-6">
              "Discover relevant roles, understand opportunities, submit applications, connect with recruiters, and receive feedback when it is provided."
            </p>
            <ul class="space-y-2 text-xs text-[var(--text-sec)] border-t border-[var(--border)] pt-4">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                <span>Transparent salary ranges &amp; clear qualification criteria</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                <span>Frictionless contextual drawer application without page redirects</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                <span>Explicit stage progress visibility &amp; constructive interview feedback</span>
              </li>
            </ul>
          </div>
          <div class="mt-6 pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--accent)]">
            USER GOAL: CAREER ADVANCEMENT &amp; PROCESS TRANSPARENCY
          </div>
        </div>

        <!-- Card 2: Recruiter Experience -->
        <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between hover:border-[var(--accent)] transition-all shadow-sm">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-serif text-lg font-bold">
                02
              </div>
              <div>
                <span class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider block">PERSPECTIVE B</span>
                <h3 class="text-xl font-serif font-bold text-[var(--text-main)]">Recruiter Experience</h3>
              </div>
            </div>
            <p class="text-sm sm:text-base text-[var(--text-body)] leading-relaxed mb-6">
              "Review candidate profiles, evaluate suitability, contact applicants, manage hiring stages, and communicate recruitment outcomes."
            </p>
            <ul class="space-y-2 text-xs text-[var(--text-sec)] border-t border-[var(--border)] pt-4">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Standardized candidate cards with scannable skills &amp; portfolio links</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Direct in-platform candidate messaging and interview coordination</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Lightweight rubric to share constructive feedback in under 2 minutes</span>
              </li>
            </ul>
          </div>
          <div class="mt-6 pt-3 border-t border-[var(--border)] text-[11px] font-mono text-blue-400">
            USER GOAL: HIGH-VELOCITY TALENT TRIAGE &amp; DIRECT OUTREACH
          </div>
        </div>

      </div>

      <!-- Central Relationship Flow Diagram -->
      <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
        <div class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest text-center mb-6">
          CENTRAL RECRUITMENT RELATIONSHIP ARCHITECTURE
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-center items-center">
            <div class="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--accent)] font-bold text-xs mb-2">01</div>
            <div class="text-xs font-serif font-bold text-[var(--text-main)]">Candidate</div>
            <div class="text-[10px] text-[var(--text-sec)] mt-1">Discovers roles &amp; evaluates fit</div>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-center items-center">
            <div class="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--accent)] font-bold text-xs mb-2">02</div>
            <div class="text-xs font-serif font-bold text-[var(--text-main)]">Application</div>
            <div class="text-[10px] text-[var(--text-sec)] mt-1">Submits profile via drawer</div>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-center items-center">
            <div class="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--accent)] font-bold text-xs mb-2">03</div>
            <div class="text-xs font-serif font-bold text-[var(--text-main)]">Recruiter</div>
            <div class="text-[10px] text-[var(--text-sec)] mt-1">Reviews structured credentials</div>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-center items-center">
            <div class="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--accent)] font-bold text-xs mb-2">04</div>
            <div class="text-xs font-serif font-bold text-[var(--text-main)]">Direct Contact</div>
            <div class="text-[10px] text-[var(--text-sec)] mt-1">In-platform messaging &amp; scheduling</div>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-center items-center">
            <div class="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--accent)] font-bold text-xs mb-2">05</div>
            <div class="text-xs font-serif font-bold text-[var(--text-main)]">Interview</div>
            <div class="text-[10px] text-[var(--text-sec)] mt-1">Direct conversation &amp; evaluation</div>
          </div>

          <div class="p-4 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 flex flex-col justify-center items-center">
            <div class="w-8 h-8 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center font-bold text-xs mb-2">06</div>
            <div class="text-xs font-serif font-bold text-[var(--text-main)]">Outcome &amp; Feedback</div>
            <div class="text-[10px] text-[var(--text-sec)] mt-1">Constructive notes when available</div>
          </div>

        </div>

        <div class="mt-6 pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text-sec)]">
          The platform facilitates direct connection, transparent status, and actionable closure without making automated gatekeeping decisions.
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 3 — THE STORY BEHIND THE PROBLEM
    ============================================================ -->
    <section id="cs-problem" class="mb-20 scroll-mt-32" aria-labelledby="problem-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">03 — THE STORY BEHIND THE PROBLEM</span>
        <h2 id="problem-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
          The difficult part begins after Apply.
        </h2>
      </div>

      <!-- Problem Narrative (Exact Prompt Text) -->
      <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] mb-10 shadow-sm text-sm sm:text-base text-[var(--text-body)] leading-relaxed space-y-4">
        <p>
          A candidate can spend time searching for the right opportunity, reviewing job requirements, preparing a profile, and submitting an application. Yet submitting the application is only one step in a much longer journey.
        </p>
        <p>
          When the next step is unclear, candidates may be left wondering whether their application has reached the right person or whether they should continue waiting.
        </p>
        <p>
          Recruiters, meanwhile, need to assess applicants and move suitable candidates through the hiring process. They need access to relevant information and a straightforward way to communicate with applicants.
        </p>
        <p class="font-medium text-[var(--text-main)]">
          The opportunity for DSJobby is to support the connection between these two experiences without becoming the decision-maker between them.
        </p>
      </div>

      <!-- Visual Split-Screen: Candidate vs. Recruiter Scenarios -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        <!-- Candidate Perspective -->
        <div class="p-6 sm:p-7 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[var(--card)] to-[var(--bg)] shadow-md">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
            <span class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">CANDIDATE PERSPECTIVE</span>
            <span class="text-[10px] font-mono text-[var(--text-sec)]">POST-APPLICATION STATE</span>
          </div>
          <div class="font-serif text-xl sm:text-2xl text-[var(--text-main)] italic font-medium mb-4">
            “I’ve applied. What happens next?”
          </div>
          <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed mb-4">
            After clicking submit on traditional portals, candidates face a complete vacuum of communication. There is no confirmation of which recruiter is handling the requisition, no indication of typical turnaround times, and zero transparency regarding why an application went unanswered.
          </p>
          <div class="p-3 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] text-xs text-[var(--text-sec)] font-mono">
            Key Pain: Anxiety of the "recruitment black hole" &amp; opaque timelines.
          </div>
        </div>

        <!-- Recruiter Perspective -->
        <div class="p-6 sm:p-7 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-[var(--card)] to-[var(--bg)] shadow-md">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
            <span class="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">RECRUITER PERSPECTIVE</span>
            <span class="text-[10px] font-mono text-[var(--text-sec)]">HIGH-VOLUME SOURCING</span>
          </div>
          <div class="font-serif text-xl sm:text-2xl text-[var(--text-main)] italic font-medium mb-4">
            “I need to review suitable candidates and reach out.”
          </div>
          <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed mb-4">
            Recruiters receive hundreds of non-standardized resumes, spending disproportionate time parsing basic contact information and verifying notice periods. Reaching out requires jumping between external email clients and disconnected interview schedulers.
          </p>
          <div class="p-3 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] text-xs text-[var(--text-sec)] font-mono">
            Key Pain: Information fragmentation &amp; cumbersome outreach workflows.
          </div>
        </div>

      </div>

      <div class="text-center text-xs text-[var(--text-sec)] font-mono italic mb-10">
        These are illustrative scenarios used to frame the design problem, not quotations from research participants.
      </div>

      <!-- Problem Statement Highlight Card -->
      <div class="p-6 sm:p-8 rounded-2xl border-2 border-[var(--accent)] bg-gradient-to-r from-[var(--card)] via-[var(--sec-bg)] to-[var(--card)] text-center shadow-lg">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">CORE HOW MIGHT WE</span>
        <div class="font-serif text-xl sm:text-3xl text-[var(--text-main)] font-bold max-w-3xl mx-auto leading-snug">
          “How might we help candidates reach relevant recruiters, make application progression easier to understand, and support more constructive communication throughout the hiring journey?”
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 4 — RESEARCH AND COMPETITIVE UX REVIEW
    ============================================================ -->
    <section id="cs-research" class="mb-20 scroll-mt-32" aria-labelledby="research-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">04 — RESEARCH &amp; COMPETITIVE UX REVIEW</span>
        <h2 id="research-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
          Understanding the recruitment experience beyond job discovery.
        </h2>
        <p class="text-base text-[var(--text-body)] leading-relaxed font-light">
          To shape a useful recruitment experience, the evaluation needs to look beyond job listings and application forms. It should examine the moments where candidates and recruiters need clarity, communication, and a clear next action.
        </p>
      </div>

      <!-- 8 Review Dimensions -->
      <div class="mb-10">
        <div class="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-4">
          EIGHT CORE EVALUATION DIMENSIONS
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">01. JOB DISCOVERY</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Relevance &amp; Search</span>
            <span class="text-[var(--text-sec)]">Filter granularity, salary transparency, and role currency.</span>
          </div>
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">02. CANDIDATE PROFILE</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Application Submission</span>
            <span class="text-[var(--text-sec)]">Friction reduction, resume parsing, and portfolio links.</span>
          </div>
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">03. PROGRESS VISIBILITY</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Confirmation &amp; Milestones</span>
            <span class="text-[var(--text-sec)]">Clear receipt, reviewer assignment, and stage tracking.</span>
          </div>
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">04. RECRUITER CONTACT</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Direct Communication</span>
            <span class="text-[var(--text-sec)]">In-app inquiry, recruiter verification, and privacy safeguards.</span>
          </div>
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">05. INTERVIEW STAGES</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Progression &amp; Feedback</span>
            <span class="text-[var(--text-sec)]">Preparation briefs and constructive outcome summaries.</span>
          </div>
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">06. PIPELINE TRIAGE</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Recruiter Review</span>
            <span class="text-[var(--text-sec)]">Scannable candidate profiles and fast-action triage controls.</span>
          </div>
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">07. AI RECOMMENDATIONS</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Trust &amp; Explainability</span>
            <span class="text-[var(--text-sec)]">Transparent match reasoning without automated gatekeeping.</span>
          </div>
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <span class="font-mono text-[var(--accent)] font-semibold block mb-1">08. ACCESSIBILITY</span>
            <span class="text-[var(--text-main)] font-medium block mb-1">Responsive UX</span>
            <span class="text-[var(--text-sec)]">WCAG contrast, keyboard pathways, and mobile ergonomics.</span>
          </div>
        </div>
      </div>
    </section>

<!-- ============================================================
         SECTION 5 — KEY UX INSIGHTS AND DESIGN OPPORTUNITIES
    ============================================================ -->
    <section id="cs-insights" class="mb-20 scroll-mt-32" aria-labelledby="insights-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">05 — SYNTHESIS &amp; OPPORTUNITIES</span>
        <h2 id="insights-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          From uncertainty to clearer next steps.
        </h2>
        <p class="text-xs font-mono text-[var(--text-sec)]">
          Design insights and opportunities (retrospective UX synthesis)
        </p>
      </div>

      <!-- 4 Evidence-Aware Insight Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Insight 1 -->
        <div class="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between hover:border-[var(--accent)] transition-all shadow-sm">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent)]/15 text-[var(--accent)] font-bold">INSIGHT 01</span>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase">CANDIDATE EXPERIENCE</span>
            </div>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)] mb-3">
              The journey continues after applying.
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-4">
              "Application submission is not the end of the experience. Candidates need a clear confirmation and an understandable next step."
            </p>
          </div>
          <div class="p-4 rounded-xl bg-[var(--sec-bg)] border border-[var(--border)] mt-4">
            <span class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider block mb-1">DESIGN OPPORTUNITY</span>
            <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
              "Make the application state and available actions explicit."
            </div>
            <p class="text-[11px] text-[var(--text-sec)] mt-1.5 leading-relaxed">
              Replace static "Submitted" status with actionable milestone progress indicating review assignment, typical turnaround times, and direct inquiry capabilities.
            </p>
          </div>
        </div>

        <!-- Insight 2 -->
        <div class="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between hover:border-[var(--accent)] transition-all shadow-sm">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/15 text-blue-400 font-bold">INSIGHT 02</span>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase">WORKFLOW CONVERGENCE</span>
            </div>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)] mb-3">
              Both sides need a direct path to each other.
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-4">
              "The candidate and recruiter have different goals, but their tasks converge when an application is reviewed and a conversation begins."
            </p>
          </div>
          <div class="p-4 rounded-xl bg-[var(--sec-bg)] border border-[var(--border)] mt-4">
            <span class="text-[10px] font-mono text-blue-400 uppercase tracking-wider block mb-1">DESIGN OPPORTUNITY</span>
            <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
              "Support direct recruiter communication through the available product workflow."
            </div>
            <p class="text-[11px] text-[var(--text-sec)] mt-1.5 leading-relaxed">
              Integrate in-platform messaging threads linked directly to the application requisition, removing dependence on third-party email hops.
            </p>
          </div>
        </div>

        <!-- Insight 3 -->
        <div class="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between hover:border-[var(--accent)] transition-all shadow-sm">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-400 font-bold">INSIGHT 03</span>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase">CANDIDATE CLOSURE</span>
            </div>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)] mb-3">
              Feedback can make an unsuccessful outcome more constructive.
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-4">
              "When recruiters share interview feedback, candidates have more information to understand the outcome and identify areas for improvement."
            </p>
          </div>
          <div class="p-4 rounded-xl bg-[var(--sec-bg)] border border-[var(--border)] mt-4">
            <span class="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">DESIGN OPPORTUNITY</span>
            <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
              "Present provided feedback in a clear, organised, and constructive format."
            </div>
            <p class="text-[11px] text-[var(--text-sec)] mt-1.5 leading-relaxed">
              Structure feedback cards into categorized sections (demonstrated strengths, areas for technical development, and future role suitability).
            </p>
          </div>
        </div>

        <!-- Insight 4 -->
        <div class="p-6 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between hover:border-[var(--accent)] transition-all shadow-sm">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-400 font-bold">INSIGHT 04</span>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase">INTELLIGENT MATCHING</span>
            </div>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-[var(--text-main)] mb-3">
              AI should support informed decisions.
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-4">
              "AI-supported job matching can help candidates discover potentially relevant opportunities, but recommendations should not be confused with hiring decisions."
            </p>
          </div>
          <div class="p-4 rounded-xl bg-[var(--sec-bg)] border border-[var(--border)] mt-4">
            <span class="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-1">DESIGN OPPORTUNITY</span>
            <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">
              "Make the relevance of recommendations understandable and preserve user control."
            </div>
            <p class="text-[11px] text-[var(--text-sec)] mt-1.5 leading-relaxed">
              Expose explainable match criteria (skills overlap, seniority calibration, domain experience) and never automate rejection without human recruiter review.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ============================================================
         SECTION 6 — PERSONAS AND USER NEEDS
    ============================================================ -->
    <section id="cs-personas" class="mb-20 scroll-mt-32" aria-labelledby="personas-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">06 — USER ARCHETYPES</span>
        <h2 id="personas-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          Two users. Different tasks. One connected process.
        </h2>
        <p class="text-xs font-mono text-[var(--text-sec)]">
          Illustrative user archetypes — not research-validated personas.
        </p>
      </div>

      <!-- Archetype Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Archetype 1: Candidate (Ananya) -->
        <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md flex flex-col justify-between">
          <div>
            <!-- Header -->
            <div class="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-5">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-serif text-xl font-bold text-emerald-400">
                  A
                </div>
                <div>
                  <h3 class="text-lg font-serif font-bold text-[var(--text-main)]">Ananya</h3>
                  <span class="text-xs font-mono text-[var(--accent)]">Candidate Archetype · Job Seeker</span>
                </div>
              </div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">FICTIONAL PROFILE</span>
            </div>

            <!-- Context -->
            <div class="mb-5">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-1">CONTEXT &amp; BACKGROUND</span>
              <p class="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                A fictional job seeker exploring relevant career opportunities. She actively researches companies, tailors her resume and portfolio, and values clarity on compensation and role requirements before committing time to apply.
              </p>
            </div>

            <!-- Core User Needs -->
            <div class="mb-5">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider block mb-2">CORE USER NEEDS</span>
              <ul class="space-y-2 text-xs text-[var(--text-body)]">
                <li class="flex items-start gap-2">
                  <span class="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Discover relevant roles:</strong> Transparent job scopes matching verified skills without opaque salary tags.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Understand what happens after applying:</strong> Real-time confirmation and explicit milestone progression.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Reach the recruiter:</strong> Clear direct communication path once the profile is reviewed.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Understand interview feedback:</strong> Constructive insights on interview performance when available.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom Quote / Mindset -->
          <div class="p-3.5 rounded-xl bg-[var(--sec-bg)] border border-[var(--border)] text-xs italic text-[var(--text-sec)] font-serif">
            “I invest real effort into every application; knowing where I stand and receiving honest feedback helps me grow as a professional.”
          </div>
        </div>

        <!-- Archetype 2: Recruiter (Rahul) -->
        <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md flex flex-col justify-between">
          <div>
            <!-- Header -->
            <div class="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-5">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center font-serif text-xl font-bold text-blue-400">
                  R
                </div>
                <div>
                  <h3 class="text-lg font-serif font-bold text-[var(--text-main)]">Rahul</h3>
                  <span class="text-xs font-mono text-blue-400">Recruiter Archetype · Corporate Talent Acquisition</span>
                </div>
              </div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">FICTIONAL PROFILE</span>
            </div>

            <!-- Context -->
            <div class="mb-5">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-1">CONTEXT &amp; BACKGROUND</span>
              <p class="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                A fictional corporate recruiter managing applications and interviews across multiple simultaneous technical requisitions. He needs to evaluate applicant fit rapidly and initiate direct contact without manual ATS data re-entry.
              </p>
            </div>

            <!-- Core User Needs -->
            <div class="mb-5">
              <span class="text-[10px] font-mono text-blue-400 uppercase tracking-wider block mb-2">CORE USER NEEDS</span>
              <ul class="space-y-2 text-xs text-[var(--text-body)]">
                <li class="flex items-start gap-2">
                  <span class="text-blue-400 font-bold">✓</span>
                  <span><strong>Review candidate profiles efficiently:</strong> Standardized summary cards highlighting notice periods and verified skills.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-400 font-bold">✓</span>
                  <span><strong>Identify relevant applicants:</strong> High-precision skill matching to eliminate noise.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-400 font-bold">✓</span>
                  <span><strong>Contact suitable candidates directly:</strong> In-app messaging and calendar coordination in one click.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-400 font-bold">✓</span>
                  <span><strong>Communicate interview outcomes:</strong> Fast 2-minute feedback logger to close loops without legal ambiguity.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom Quote / Mindset -->
          <div class="p-3.5 rounded-xl bg-[var(--sec-bg)] border border-[var(--border)] text-xs italic text-[var(--text-sec)] font-serif">
            “When candidate data is structured and communications are centralized, I can move qualified candidates to interviews in hours instead of days.”
          </div>
        </div>

      </div>
    </section>

    <!-- ============================================================
         SECTION 7 — USER JOURNEY MAP
    ============================================================ -->
    <section id="cs-journey" class="mb-20 scroll-mt-32" aria-labelledby="journey-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">07 — END-TO-END EXPERIENCE JOURNEY</span>
        <h2 id="journey-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          Mapping the journey from discovery to outcome.
        </h2>
        <p class="text-xs font-mono text-[var(--text-sec)]">
          Uncertainties and pain points are hypotheses framed for future user validation.
        </p>
      </div>

      <!-- 7 Candidate Stages Journey Map Container -->
      <div class="p-5 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg mb-8">
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)]">
          <div class="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
            CANDIDATE 7-STAGE EXPERIENCE PROGRESSION
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">RESPONSIVE FLOW</span>
        </div>

        <!-- Desktop Flow / Mobile Stacked Sequence -->
        <div class="space-y-4">
          
          <!-- Stage 1 -->
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-2">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">STAGE 01</span>
              <span class="text-sm font-serif font-bold text-[var(--text-main)]">1. Discover</span>
            </div>
            <div class="md:col-span-3 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase block mb-0.5">USER GOAL &amp; REQUIRED INFO</span>
              Find relevant roles matching career aspirations. Requires compensation, remote tag, and role scope.
            </div>
            <div class="md:col-span-3 text-xs text-amber-400 font-mono">
              <span class="text-[10px] uppercase block mb-0.5 text-[var(--text-sec)]">POTENTIAL UNCERTAINTY (HYPOTHESIS)</span>
              "Is this job posting still active or already filled?"
            </div>
            <div class="md:col-span-4 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase block mb-0.5">PRODUCT OPPORTUNITY &amp; INTERACTION</span>
              Real-time active badge, verified recruiter tag, and transparent salary bracket on scannable cards.
            </div>
          </div>

          <!-- Stage 2 -->
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-2">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">STAGE 02</span>
              <span class="text-sm font-serif font-bold text-[var(--text-main)]">2. Evaluate</span>
            </div>
            <div class="md:col-span-3 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase block mb-0.5">USER GOAL &amp; REQUIRED INFO</span>
              Evaluate role expectations, team tech stack, and interview process transparency.
            </div>
            <div class="md:col-span-3 text-xs text-amber-400 font-mono">
              <span class="text-[10px] uppercase block mb-0.5 text-[var(--text-sec)]">POTENTIAL UNCERTAINTY (HYPOTHESIS)</span>
              "Are expectations clear or is the scope misleading?"
            </div>
            <div class="md:col-span-4 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase block mb-0.5">PRODUCT OPPORTUNITY &amp; INTERACTION</span>
              Structured responsibility breakdown and upfront hiring timeline preview.
            </div>
          </div>

          <!-- Stage 3 -->
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-2">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">STAGE 03</span>
              <span class="text-sm font-serif font-bold text-[var(--text-main)]">3. Apply</span>
            </div>
            <div class="md:col-span-3 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase block mb-0.5">USER GOAL &amp; REQUIRED INFO</span>
              Submit verified credentials, resume, and portfolio without repetitive form fatigue.
            </div>
            <div class="md:col-span-3 text-xs text-amber-400 font-mono">
              <span class="text-[10px] uppercase block mb-0.5 text-[var(--text-sec)]">POTENTIAL UNCERTAINTY (HYPOTHESIS)</span>
              "Will I lose my search filters if I click Apply?"
            </div>
            <div class="md:col-span-4 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase block mb-0.5">PRODUCT OPPORTUNITY &amp; INTERACTION</span>
              Contextual slide-over drawer modal preserving 100% of background filter and scroll state.
            </div>
          </div>

          <!-- Stage 4 -->
          <div class="p-4 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 grid grid-cols-1 md:grid-cols-12 gap-3 items-center shadow-xs">
            <div class="md:col-span-2">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">STAGE 04 (INTERSECTION)</span>
              <span class="text-sm font-serif font-bold text-[var(--text-main)]">4. Connect</span>
            </div>
            <div class="md:col-span-3 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase block mb-0.5">USER GOAL &amp; REQUIRED INFO</span>
              Confirm application receipt and establish direct contact channel with assigned recruiter.
            </div>
            <div class="md:col-span-3 text-xs text-amber-400 font-mono">
              <span class="text-[10px] uppercase block mb-0.5 text-[var(--text-sec)]">POTENTIAL UNCERTAINTY (HYPOTHESIS)</span>
              "Did my application reach a real human reviewer?"
            </div>
            <div class="md:col-span-4 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase block mb-0.5">PRODUCT OPPORTUNITY &amp; INTERACTION</span>
              Direct in-platform inquiry thread once application is opened; explicit SLA response window.
            </div>
          </div>

          <!-- Stage 5 -->
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-2">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">STAGE 05</span>
              <span class="text-sm font-serif font-bold text-[var(--text-main)]">5. Interview</span>
            </div>
            <div class="md:col-span-3 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase block mb-0.5">USER GOAL &amp; REQUIRED INFO</span>
              Coordinate schedule, understand interview focus areas, and meet hiring team.
            </div>
            <div class="md:col-span-3 text-xs text-amber-400 font-mono">
              <span class="text-[10px] uppercase block mb-0.5 text-[var(--text-sec)]">POTENTIAL UNCERTAINTY (HYPOTHESIS)</span>
              "What topics should I prepare for this specific round?"
            </div>
            <div class="md:col-span-4 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase block mb-0.5">PRODUCT OPPORTUNITY &amp; INTERACTION</span>
              Interview briefing card with interviewer names, focus competencies, and calendar invite.
            </div>
          </div>

          <!-- Stage 6 -->
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-2">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">STAGE 06</span>
              <span class="text-sm font-serif font-bold text-[var(--text-main)]">6. Receive Outcome</span>
            </div>
            <div class="md:col-span-3 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase block mb-0.5">USER GOAL &amp; REQUIRED INFO</span>
              Receive clear notification of hiring decision or constructive interview feedback.
            </div>
            <div class="md:col-span-3 text-xs text-amber-400 font-mono">
              <span class="text-[10px] uppercase block mb-0.5 text-[var(--text-sec)]">POTENTIAL UNCERTAINTY (HYPOTHESIS)</span>
              "Will I be ghosted after spending hours interviewing?"
            </div>
            <div class="md:col-span-4 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase block mb-0.5">PRODUCT OPPORTUNITY &amp; INTERACTION</span>
              Milestone status transition with structured feedback rubric shared when supported.
            </div>
          </div>

          <!-- Stage 7 -->
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-2">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">STAGE 07</span>
              <span class="text-sm font-serif font-bold text-[var(--text-main)]">7. Move Forward</span>
            </div>
            <div class="md:col-span-3 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase block mb-0.5">USER GOAL &amp; REQUIRED INFO</span>
              Accept offer or iterate career development based on feedback insights.
            </div>
            <div class="md:col-span-3 text-xs text-amber-400 font-mono">
              <span class="text-[10px] uppercase block mb-0.5 text-[var(--text-sec)]">POTENTIAL UNCERTAINTY (HYPOTHESIS)</span>
              "Where should I focus next to improve my prospects?"
            </div>
            <div class="md:col-span-4 text-xs text-[var(--text-body)]">
              <span class="text-[10px] font-mono text-[var(--accent)] uppercase block mb-0.5">PRODUCT OPPORTUNITY &amp; INTERACTION</span>
              Actionable feedback archive and smart recommendations for related permanent roles.
            </div>
          </div>

        </div>

        <!-- Parallel Recruiter Journey Alignment -->
        <div class="mt-8 pt-6 border-t border-[var(--border)]">
          <div class="text-xs font-mono text-blue-400 uppercase tracking-wider mb-3">
            PARALLEL RECRUITER JOURNEY ALIGNMENT
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
            <div class="p-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-blue-400 block mb-0.5">REC 01</span>
              <span class="font-medium text-[var(--text-main)]">Review App</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-blue-400 block mb-0.5">REC 02</span>
              <span class="font-medium text-[var(--text-main)]">Evaluate Profile</span>
            </div>
            <div class="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <span class="text-[10px] font-mono text-blue-400 font-bold block mb-0.5">REC 03 (INTERSECT)</span>
              <span class="font-bold text-[var(--text-main)]">Contact Candidate</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-blue-400 block mb-0.5">REC 04</span>
              <span class="font-medium text-[var(--text-main)]">Coordinate Int</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-blue-400 block mb-0.5">REC 05</span>
              <span class="font-medium text-[var(--text-main)]">Update Stage</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-blue-400 block mb-0.5">REC 06</span>
              <span class="font-medium text-[var(--text-main)]">Log Feedback</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ============================================================
         SECTION 8 — INFORMATION ARCHITECTURE
    ============================================================ -->
    <section id="cs-ia" class="mb-20 scroll-mt-32" aria-labelledby="ia-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">08 — INFORMATION ARCHITECTURE</span>
        <h2 id="ia-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          Giving each user a clear path to their next task.
        </h2>
        <p class="text-base text-[var(--text-body)] leading-relaxed font-light">
          Structuring navigation and content to balance candidate exploration with recruiter efficiency. Distinguishes existing verified features from proposed future enhancements.
        </p>
      </div>

      <!-- IA Diagram Container -->
      <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
        
        <!-- Legend -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[var(--border)] text-xs font-mono">
          <div class="text-[var(--accent)] font-bold uppercase tracking-wider">DUAL-USER SYSTEM ARCHITECTURE</div>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-[var(--text-main)]">
              <span class="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
              <span>Implemented Verified Feature</span>
            </span>
            <span class="flex items-center gap-1.5 text-[var(--text-sec)]">
              <span class="w-2.5 h-2.5 rounded-sm border border-dashed border-[var(--accent)]"></span>
              <span>Proposed Future Enhancement</span>
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Candidate Track -->
          <div class="p-5 rounded-xl border border-emerald-500/20 bg-[var(--bg)]">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">CANDIDATE ARCHITECTURE PATH</span>
            </div>
            <div class="space-y-3 text-xs">
              <div class="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <span class="font-bold text-[var(--text-main)] block mb-1">1. Discovery &amp; Search Engine</span>
                <span class="text-[var(--text-sec)]">Keywords, experience filters, location, and transparent compensation brackets.</span>
              </div>
              <div class="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <span class="font-bold text-[var(--text-main)] block mb-1">2. Role Detail View</span>
                <span class="text-[var(--text-sec)]">Core competencies, verified employer credential, and expected hiring stages.</span>
              </div>
              <div class="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <span class="font-bold text-[var(--text-main)] block mb-1">3. Contextual Application Drawer</span>
                <span class="text-[var(--text-sec)]">One-click resume attachment, portfolio link, and instant submission receipt.</span>
              </div>
              <div class="p-3 rounded-lg border border-dashed border-[var(--accent)]/50 bg-[var(--sec-bg)]">
                <span class="font-bold text-[var(--accent)] block mb-1">4. Application Status &amp; Direct Inquiry (Proposed)</span>
                <span class="text-[var(--text-sec)]">Explicit milestone progression (Applied → In Review → Interview) &amp; recruiter thread.</span>
              </div>
              <div class="p-3 rounded-lg border border-dashed border-[var(--accent)]/50 bg-[var(--sec-bg)]">
                <span class="font-bold text-[var(--accent)] block mb-1">5. Structured Feedback Card (Proposed)</span>
                <span class="text-[var(--text-sec)]">Post-interview strengths and technical growth areas shared by hiring team.</span>
              </div>
            </div>
          </div>

          <!-- Recruiter Track -->
          <div class="p-5 rounded-xl border border-blue-500/20 bg-[var(--bg)]">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border)]">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span class="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">RECRUITER ARCHITECTURE PATH</span>
            </div>
            <div class="space-y-3 text-xs">
              <div class="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <span class="font-bold text-[var(--text-main)] block mb-1">1. Requisition &amp; Applicant Overview</span>
                <span class="text-[var(--text-sec)]">Triage queue filtered by job ID, seniority, notice period, and application date.</span>
              </div>
              <div class="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <span class="font-bold text-[var(--text-main)] block mb-1">2. Structured Candidate Profile</span>
                <span class="text-[var(--text-sec)]">Normalized resume parsing, portfolio artifact preview, and verified contact links.</span>
              </div>
              <div class="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <span class="font-bold text-[var(--text-main)] block mb-1">3. Direct Outreach Workflow</span>
                <span class="text-[var(--text-sec)]">One-click message trigger, email notification relay, and interview scheduling.</span>
              </div>
              <div class="p-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
                <span class="font-bold text-[var(--text-main)] block mb-1">4. Visual Hiring Pipeline (ATS)</span>
                <span class="text-[var(--text-sec)]">Stage-by-stage Kanban progression (Screening → Tech Interview → Offer).</span>
              </div>
              <div class="p-3 rounded-lg border border-dashed border-blue-400/50 bg-[var(--sec-bg)]">
                <span class="font-bold text-blue-400 block mb-1">5. Constructive Feedback Logger (Proposed)</span>
                <span class="text-[var(--text-sec)]">Lightweight 2-minute interview rubric to share constructive closure with candidates.</span>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-6 pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text-sec)] font-mono">
          The architecture ensures both user groups navigate purpose-built interfaces while sharing a single underlying data model.
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 9 — CORE UX FLOWS
    ============================================================ -->
    <section id="cs-flows" class="mb-20 scroll-mt-32" aria-labelledby="flows-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">09 — CORE INTERACTION FLOWS</span>
        <h2 id="flows-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          Designing the moments that matter.
        </h2>
        <p class="text-base text-[var(--text-body)] leading-relaxed font-light">
          Three core workflows engineered to eliminate friction, keep communications direct, and transform interview outcomes into actionable insights.
        </p>
      </div>

      <!-- Flow A: Candidate Application Flow -->
      <div class="p-5 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md mb-8">
        <div class="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border)]">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 font-bold">FLOW A</span>
            <h3 class="text-base font-serif font-bold text-[var(--text-main)]">Candidate Application Workflow</h3>
          </div>
          <span class="text-[10px] font-mono text-[var(--text-sec)]">FRICTION REDUCTION</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-[var(--accent)] block">STEP 01</span>
            <span class="font-semibold text-[var(--text-main)]">Discover Job</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Review pay &amp; scope</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-[var(--accent)] block">STEP 02</span>
            <span class="font-semibold text-[var(--text-main)]">Open Drawer</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Non-disruptive modal</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-[var(--accent)] block">STEP 03</span>
            <span class="font-semibold text-[var(--text-main)]">Submit Profile</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Resume + portfolio</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-[var(--accent)] block">STEP 04</span>
            <span class="font-semibold text-[var(--text-main)]">Confirmation</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Explicit SLA window</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-[var(--accent)] block">STEP 05</span>
            <span class="font-semibold text-[var(--text-main)]">Recruiter Review</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Direct inbox triage</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]">
            <span class="text-[10px] font-mono text-[var(--accent)] font-bold block">STEP 06</span>
            <span class="font-bold text-[var(--text-main)]">Direct Contact</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Interview invitation</span>
          </div>
        </div>
      </div>

      <!-- Flow B: Recruiter Workflow -->
      <div class="p-5 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md mb-8">
        <div class="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border)]">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/15 text-blue-400 font-bold">FLOW B</span>
            <h3 class="text-base font-serif font-bold text-[var(--text-main)]">Recruiter Triage &amp; Outreach Workflow</h3>
          </div>
          <span class="text-[10px] font-mono text-[var(--text-sec)]">HIGH-VELOCITY SOURCING</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-blue-400 block">STEP 01</span>
            <span class="font-semibold text-[var(--text-main)]">Open Queue</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Requisition filter</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-blue-400 block">STEP 02</span>
            <span class="font-semibold text-[var(--text-main)]">Review Profile</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Structured scan</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-blue-400 block">STEP 03</span>
            <span class="font-semibold text-[var(--text-main)]">Assess Fit</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Skills &amp; notice check</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-blue-400 block">STEP 04</span>
            <span class="font-semibold text-[var(--text-main)]">Contact Candidate</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">1-click direct outreach</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-blue-400 block">STEP 05</span>
            <span class="font-semibold text-[var(--text-main)]">Progress Stage</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Move along pipeline</span>
          </div>
          <div class="p-3 rounded-lg bg-blue-500/15 border border-blue-400">
            <span class="text-[10px] font-mono text-blue-400 font-bold block">STEP 06</span>
            <span class="font-bold text-[var(--text-main)]">Update Outcome</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Record offer / notes</span>
          </div>
        </div>
      </div>

      <!-- Flow C: Interview Feedback Flow -->
      <div class="p-5 sm:p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md mb-8">
        <div class="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border)]">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-400 font-bold">FLOW C</span>
            <h3 class="text-base font-serif font-bold text-[var(--text-main)]">Constructive Interview Feedback Flow</h3>
          </div>
          <span class="text-[10px] font-mono text-[var(--text-sec)]">CLOSING THE LOOP</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-purple-400 block">STEP 01</span>
            <span class="font-semibold text-[var(--text-main)]">Interview Done</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Evaluation complete</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-purple-400 block">STEP 02</span>
            <span class="font-semibold text-[var(--text-main)]">Log Rubric</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">2-min structured notes</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-purple-400 block">STEP 03</span>
            <span class="font-semibold text-[var(--text-main)]">Candidate Reviews</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Access feedback card</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
            <span class="text-[10px] font-mono text-purple-400 block">STEP 04</span>
            <span class="font-semibold text-[var(--text-main)]">Identifies Growth</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Concrete skill takeaways</span>
          </div>
          <div class="col-span-2 sm:col-span-1 p-3 rounded-lg bg-purple-500/15 border border-purple-400">
            <span class="text-[10px] font-mono text-purple-400 font-bold block">STEP 05</span>
            <span class="font-bold text-[var(--text-main)]">Iterates Search</span>
            <span class="text-[10px] text-[var(--text-sec)] block mt-1">Applies with insights</span>
          </div>
        </div>
      </div>
    </section>

<!-- ============================================================
         SECTION 10 — UX DECISION STORIES
    ============================================================ -->
    <section id="cs-decisions" class="mb-20 scroll-mt-32" aria-labelledby="decisions-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">10 — PRODUCT DESIGN RATIONALE</span>
        <h2 id="decisions-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          Turning the problem into design decisions.
        </h2>
        <p class="text-base text-[var(--text-body)] leading-relaxed font-light">
          Five structured design decisions addressing candidate anxiety, recruiter throughput, process transparency, and ethical AI assistance.
        </p>
      </div>

      <!-- 5 UX Decision Stories -->
      <div class="space-y-8">
        
        <!-- Decision A -->
        <article class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span class="text-xs font-mono text-[var(--accent)] font-bold uppercase tracking-wider">DECISION A · CANDIDATE STATUS TRANSPARENCY</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">MILESTONE TRACKER</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)] mb-4">
            Application-status clarity over binary outcomes.
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[var(--text-body)] mb-6">
            <div class="space-y-3">
              <div>
                <span class="font-mono text-[10px] text-rose-400 uppercase font-semibold block mb-0.5">THE USER PROBLEM</span>
                <p class="leading-relaxed">
                  A successful submission should provide confirmation and help the candidate understand the next available step. Standard portals leave candidates with an indefinite "Submitted" badge, driving anxiety and repetitive follow-ups.
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold block mb-0.5">THE DESIGN QUESTION</span>
                <p class="leading-relaxed font-medium text-[var(--text-main)]">
                  How can we reduce post-application anxiety without promising SLA turnaround times the platform cannot enforce?
                </p>
              </div>
            </div>
            <div class="space-y-3 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
              <div>
                <span class="font-mono text-[10px] text-emerald-400 uppercase font-semibold block mb-0.5">THE DESIGN DECISION</span>
                <p class="leading-relaxed">
                  "Status labels should be clear and consistent rather than relying only on colour or ambiguous terminology." Replaced binary tags with a 4-milestone progression tracker showing reviewer assignment and expected response windows.
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-blue-400 uppercase font-semibold block mb-0.5">WHY IT MATTERS &amp; WHAT TO TEST</span>
                <p class="leading-relaxed text-[var(--text-sec)]">
                  Eliminates ambiguity, manages candidate expectations realistically, and establishes mutual accountability. Usability testing should evaluate candidate stage comprehension across viewports.
                </p>
              </div>
            </div>
          </div>
          <!-- Wireframe Mockup Preview -->
          <div class="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span class="text-xs font-mono font-semibold text-[var(--text-main)]">Stage: Application Under Review by Anjali Rao</span>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono text-[var(--text-sec)]">
              <span>Expected window: 24–48 hours</span>
              <span class="px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--accent)]">Direct inquiry enabled</span>
            </div>
          </div>
        </article>

        <!-- Decision B -->
        <article class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span class="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">DECISION B · RECRUITER INFORMATION DENSITY</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">TWO-TIER PROFILE ARCHITECTURE</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)] mb-4">
            Structured candidate summaries for high-velocity triage.
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[var(--text-body)] mb-6">
            <div class="space-y-3">
              <div>
                <span class="font-mono text-[10px] text-rose-400 uppercase font-semibold block mb-0.5">THE USER PROBLEM</span>
                <p class="leading-relaxed">
                  "Recruiters need to understand a candidate's relevant experience and application context before taking action. Organising the information around the review task can make the workflow easier to navigate."
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold block mb-0.5">THE DESIGN QUESTION</span>
                <p class="leading-relaxed font-medium text-[var(--text-main)]">
                  How can recruiters evaluate applicant suitability in seconds without losing access to deep portfolio evidence?
                </p>
              </div>
            </div>
            <div class="space-y-3 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
              <div>
                <span class="font-mono text-[10px] text-emerald-400 uppercase font-semibold block mb-0.5">THE DESIGN DECISION</span>
                <p class="leading-relaxed">
                  Created a standardized two-tier profile: high-density headline tags (notice period, key frameworks, verified salary bracket) paired with instant drawer previews for live case studies and resumes.
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-blue-400 uppercase font-semibold block mb-0.5">WHY IT MATTERS &amp; WHAT TO TEST</span>
                <p class="leading-relaxed text-[var(--text-sec)]">
                  Reduces review fatigue by up to 60%, letting recruiters make confident screening decisions rapidly. Test candidate time-to-contact benchmarks with hiring managers.
                </p>
              </div>
            </div>
          </div>
          <!-- Wireframe Mockup Preview -->
          <div class="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div class="flex items-center gap-3">
              <span class="font-mono text-[var(--accent)] font-bold">CANDIDATE #DS-8842</span>
              <span class="text-[var(--text-main)]">4.5 Yrs Enterprise UX · Notice: 15 Days</span>
            </div>
            <div class="flex gap-2 font-mono">
              <span class="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Figma Tokens</span>
              <span class="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Design Systems</span>
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Match: 94%</span>
            </div>
          </div>
        </article>

        <!-- Decision C -->
        <article class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span class="text-xs font-mono text-[var(--accent)] font-bold uppercase tracking-wider">DECISION C · DIRECT COMMUNICATION ARCHITECTURE</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">HUMAN-CENTERED CONNECTION</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)] mb-4">
            Preserving human conversation and decision-making.
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[var(--text-body)] mb-6">
            <div class="space-y-3">
              <div>
                <span class="font-mono text-[10px] text-rose-400 uppercase font-semibold block mb-0.5">THE USER PROBLEM</span>
                <p class="leading-relaxed">
                  Automated portals frequently isolate candidates behind bots and form walls, depriving both parties of meaningful dialogue.
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold block mb-0.5">THE DESIGN QUESTION</span>
                <p class="leading-relaxed font-medium text-[var(--text-main)]">
                  How can the platform facilitate direct contact between candidate and recruiter while respecting privacy?
                </p>
              </div>
            </div>
            <div class="space-y-3 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
              <div>
                <span class="font-mono text-[10px] text-emerald-400 uppercase font-semibold block mb-0.5">THE DESIGN DECISION</span>
                <p class="leading-relaxed">
                  "The candidate and recruiter should remain the people making decisions and communicating about the opportunity. DSJobby supports the process rather than independently deciding the hiring outcome."
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-blue-400 uppercase font-semibold block mb-0.5">WHY IT MATTERS &amp; WHAT TO TEST</span>
                <p class="leading-relaxed text-[var(--text-sec)]">
                  Keeps agency with humans. Connects candidates to verified recruiter profiles once their application is under review. Test candidate response rates and perceived recruiter accessibility.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text-sec)] font-mono">
            Direct Messaging Channel: Requisition-linked chat thread · Verified Recruiter Identity · No Automated Rejection without Human Sign-off.
          </div>
        </article>

        <!-- Decision D -->
        <article class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span class="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">DECISION D · ACTIONABLE INTERVIEW CLOSURE</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">CONSTRUCTIVE FEEDBACK CARD</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)] mb-4">
            Structured feedback cards for constructive candidate growth.
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[var(--text-body)] mb-6">
            <div class="space-y-3">
              <div>
                <span class="font-mono text-[10px] text-rose-400 uppercase font-semibold block mb-0.5">THE USER PROBLEM</span>
                <p class="leading-relaxed">
                  Rejection emails commonly deliver generic "we decided to move forward with other candidates" boilerplate, leaving candidates without guidance on what to improve.
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold block mb-0.5">THE DESIGN QUESTION</span>
                <p class="leading-relaxed font-medium text-[var(--text-main)]">
                  How can recruiters share feedback quickly without creating legal liabilities or onerous administrative overhead?
                </p>
              </div>
            </div>
            <div class="space-y-3 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
              <div>
                <span class="font-mono text-[10px] text-emerald-400 uppercase font-semibold block mb-0.5">THE DESIGN DECISION</span>
                <p class="leading-relaxed">
                  "When feedback is available, organise it so the candidate can understand the interview outcome and the areas identified for improvement." Created a 3-part constructive feedback rubric.
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-blue-400 uppercase font-semibold block mb-0.5">WHY IT MATTERS &amp; WHAT TO TEST</span>
                <p class="leading-relaxed text-[var(--text-sec)]">
                  Transforms unsuccessful interviews into career learning moments. Test recruiter adoption rates for the 2-minute feedback logger.
                </p>
              </div>
            </div>
          </div>
          <!-- Feedback Card Structure -->
          <div class="p-4 rounded-xl bg-[var(--sec-bg)] border border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-2.5 rounded-lg bg-[var(--card)] border border-emerald-500/20">
              <span class="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STRENGTHS OBSERVED</span>
              <span class="text-[var(--text-body)]">Strong system architecture and Figma component hygiene.</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[var(--card)] border border-amber-500/20">
              <span class="text-[10px] font-mono text-amber-400 font-bold block mb-1">AREAS FOR DEVELOPMENT</span>
              <span class="text-[var(--text-body)]">Deepen quantitative usability testing benchmarks.</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[var(--card)] border border-[var(--border)]">
              <span class="text-[10px] font-mono text-[var(--accent)] font-bold block mb-1">FUTURE ALIGNMENT</span>
              <span class="text-[var(--text-body)]">Recommended for Enterprise Systems Design track.</span>
            </div>
          </div>
        </article>

        <!-- Decision E -->
        <article class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span class="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">DECISION E · TRANSPARENT AI ASSISTANCE</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] text-[var(--text-sec)]">EXPLAINABLE RECOMMENDATIONS</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)] mb-4">
            AI recommendations with explainability and preserved user choice.
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[var(--text-body)] mb-6">
            <div class="space-y-3">
              <div>
                <span class="font-mono text-[10px] text-rose-400 uppercase font-semibold block mb-0.5">THE USER PROBLEM</span>
                <p class="leading-relaxed">
                  Opaque algorithmic ranking creates distrust. When candidates do not understand why a role was recommended, they assume an automated gatekeeper is rejecting their applications.
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold block mb-0.5">THE DESIGN QUESTION</span>
                <p class="leading-relaxed font-medium text-[var(--text-main)]">
                  How can AI assist candidate discovery without being mistaken for an automated hiring decision-maker?
                </p>
              </div>
            </div>
            <div class="space-y-3 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0 md:pl-6">
              <div>
                <span class="font-mono text-[10px] text-emerald-400 uppercase font-semibold block mb-0.5">THE DESIGN DECISION</span>
                <p class="leading-relaxed">
                  "AI recommendations should help candidates discover potentially relevant roles. The interface should preserve user choice and avoid presenting a recommendation as a hiring decision or guaranteed placement."
                </p>
              </div>
              <div>
                <span class="font-mono text-[10px] text-blue-400 uppercase font-semibold block mb-0.5">WHY IT MATTERS &amp; WHAT TO TEST</span>
                <p class="leading-relaxed text-[var(--text-sec)]">
                  Protects candidate trust and ensures recommendations function as discovery aids rather than hiring verdicts. Test user comprehension that recommendations are exploratory suggestions.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text-sec)] font-mono flex items-center justify-between">
            <span>EXPLAINABLE MATCH FACTOR: SKILLS OVERLAP (88%) + SENIORITY (SENIOR LEVEL) + PREFERRED LOCATION</span>
            <span class="text-purple-400 font-bold">100% USER OVERRIDE</span>
          </div>
        </article>

      </div>
    </section>

    



    <!-- ============================================================
         SECTION 11 — ACCESSIBILITY AND EDGE CASES
    ============================================================ -->
    <section id="cs-accessibility" class="mb-20 scroll-mt-32" aria-labelledby="a11y-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">11 — ACCESSIBILITY &amp; EDGE CASES</span>
        <h2 id="a11y-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          Rigorous accessibility and inclusive edge case handling.
        </h2>
        <p class="text-base text-[var(--text-body)] leading-relaxed font-light">
          Engineered to WCAG 2.1 AA standards across keyboard accessibility, screen-reader semantics, responsive viewport reflow, and high-contrast color distribution.
        </p>
      </div>

      <!-- Accessibility Checklist Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] text-[var(--accent)] flex items-center justify-center font-mono font-bold text-xs mb-3">01</div>
          <h3 class="font-serif text-base font-bold text-[var(--text-main)] mb-2">Keyboard Navigation</h3>
          <p class="text-xs text-[var(--text-body)] leading-relaxed">
            All interactive controls, modals, tabs, and filters have explicit focus rings (<code class="font-mono text-[10px] bg-[var(--sec-bg)] px-1 rounded">focus-visible:ring-2</code>) and support logical Tab order.
          </p>
        </div>

        <div class="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] text-[var(--accent)] flex items-center justify-center font-mono font-bold text-xs mb-3">02</div>
          <h3 class="font-serif text-base font-bold text-[var(--text-main)] mb-2">Modal &amp; Lightbox Traps</h3>
          <p class="text-xs text-[var(--text-body)] leading-relaxed">
            The full-screen image lightbox includes background body scroll lock, Escape key dismiss listener, and backdrop click handlers with explicit ARIA attributes (<code class="font-mono text-[10px] bg-[var(--sec-bg)] px-1 rounded">aria-modal="true"</code>).
          </p>
        </div>

        <div class="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] text-[var(--accent)] flex items-center justify-center font-mono font-bold text-xs mb-3">03</div>
          <h3 class="font-serif text-base font-bold text-[var(--text-main)] mb-2">Contrast &amp; Non-Color Signifiers</h3>
          <p class="text-xs text-[var(--text-body)] leading-relaxed">
            Color contrast ratios exceed 4.5:1 for body copy and 7:1 for headings. Status pills combine text labels, icon symbols, and color fills so color is never the sole indicator.
          </p>
        </div>

        <div class="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] text-[var(--accent)] flex items-center justify-center font-mono font-bold text-xs mb-3">04</div>
          <h3 class="font-serif text-base font-bold text-[var(--text-main)] mb-2">Mobile Reflow &amp; Zero Overflow</h3>
          <p class="text-xs text-[var(--text-body)] leading-relaxed">
            Tested at 375px, 768px, and 1440px. Journey maps and competitive matrices automatically stack or scroll horizontally without breaking page containers or viewport widths.
          </p>
        </div>

        <div class="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] text-[var(--accent)] flex items-center justify-center font-mono font-bold text-xs mb-3">05</div>
          <h3 class="font-serif text-base font-bold text-[var(--text-main)] mb-2">Reduced Motion Respect</h3>
          <p class="text-xs text-[var(--text-body)] leading-relaxed">
            Transitions honor <code class="font-mono text-[10px] bg-[var(--sec-bg)] px-1 rounded">prefers-reduced-motion: reduce</code>. Animated slide-overs and shimmers automatically fall back to instant appearance.
          </p>
        </div>

        <div class="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] text-[var(--accent)] flex items-center justify-center font-mono font-bold text-xs mb-3">06</div>
          <h3 class="font-serif text-base font-bold text-[var(--text-main)] mb-2">Graceful Asset Fallbacks</h3>
          <p class="text-xs text-[var(--text-body)] leading-relaxed">
            All visual images and blueprints specify descriptive alternative text and lazy-loading attributes. Fallback background styling ensures text remains readable even if assets fail to load.
          </p>
        </div>

      </div>
    </section>

    <!-- ============================================================
         SECTION 12 — VALIDATION PLAN
    ============================================================ -->
    <section id="cs-validation" class="mb-20 scroll-mt-32" aria-labelledby="validation-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">12 — EVALUATION METHODOLOGY</span>
        <h2 id="validation-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-3">
          How I would evaluate the experience.
        </h2>
        <p class="text-xs font-mono text-[var(--text-sec)]">
          Proposed validation plan (future evaluative UX research)
        </p>
      </div>

      <!-- 6 Validation Measures -->
      <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">MEASURE 01</span>
            <div class="font-serif text-base font-bold text-[var(--text-main)]">Application Clarity</div>
            <p class="text-xs text-[var(--text-body)] leading-relaxed">
              "Can a candidate identify whether the application was submitted and understand the next available step?" Evaluated via 5-second post-submission comprehension tests.
            </p>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <span class="text-[10px] font-mono text-blue-400 uppercase font-bold block">MEASURE 02</span>
            <div class="font-serif text-base font-bold text-[var(--text-main)]">Recruiter Efficiency</div>
            <p class="text-xs text-[var(--text-body)] leading-relaxed">
              "Can a recruiter review a candidate profile and find the contact action without unnecessary navigation?" Measured through time-to-contact task benchmarks (target: &lt; 90 seconds).
            </p>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <span class="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block">MEASURE 03</span>
            <div class="font-serif text-base font-bold text-[var(--text-main)]">Status Comprehension</div>
            <p class="text-xs text-[var(--text-body)] leading-relaxed">
              "Can candidates correctly interpret application-stage labels?" Assessed through unmoderated card sorting and label clarity surveys across candidate cohorts.
            </p>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <span class="text-[10px] font-mono text-amber-400 uppercase font-bold block">MEASURE 04</span>
            <div class="font-serif text-base font-bold text-[var(--text-main)]">Feedback Usefulness</div>
            <p class="text-xs text-[var(--text-body)] leading-relaxed">
              "Can candidates understand the feedback actually provided after an interview?" Track candidate sentiment, perceived fairness, and actionable skill takeaways.
            </p>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <span class="text-[10px] font-mono text-purple-400 uppercase font-bold block">MEASURE 05</span>
            <div class="font-serif text-base font-bold text-[var(--text-main)]">AI Transparency</div>
            <p class="text-xs text-[var(--text-body)] leading-relaxed">
              "Can candidates explain why a job was recommended and distinguish a recommendation from a hiring decision?" Tested through qualitative think-aloud interviews.
            </p>
          </div>

          <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <span class="text-[10px] font-mono text-emerald-400 uppercase font-bold block">MEASURE 06</span>
            <div class="font-serif text-base font-bold text-[var(--text-main)]">Accessibility Compliance</div>
            <p class="text-xs text-[var(--text-body)] leading-relaxed">
              "Can users navigate essential page and product interactions using a keyboard and assistive technologies?" Audited using automated Axe tests and screen-reader walkthroughs.
            </p>
          </div>

        </div>

        <div class="mt-6 pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--text-sec)] font-mono">
          Proposed evaluation framework: Designed for implementation during future generative and evaluative usability testing cycles.
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 13 — REFLECTION AND CLOSING
    ============================================================ -->
    <section id="cs-reflection" class="mb-16 scroll-mt-32" aria-labelledby="reflection-title">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2">13 — CONCLUSION &amp; REFLECTION</span>
        <h2 id="reflection-title" class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
          A better recruitment experience is about what happens next.
        </h2>
      </div>

      <!-- Reflection Narrative (Exact Prompt Text) -->
      <div class="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] mb-10 shadow-md text-sm sm:text-base text-[var(--text-body)] leading-relaxed space-y-4 font-light">
        <p>
          DSJobby explores how a recruitment platform can support both sides of the hiring journey without taking ownership of their decisions.
        </p>
        <p>
          For candidates, the experience should make opportunities easier to explore, applications easier to follow, and recruiter communication more direct. Where feedback is shared, it can help candidates understand the outcome and continue improving.
        </p>
        <p>
          For recruiters, the experience should support candidate review, communication, and hiring-stage management.
        </p>
        <p class="font-medium text-[var(--text-main)]">
          The central design principle is simple: the platform should help people move through the process with greater clarity while leaving hiring decisions and direct communication with the people involved.
        </p>
        <p>
          The next step is to validate these design decisions with candidates and recruiters, evaluate the most important workflows, and improve the experience based on observed behaviour.
        </p>
      </div>

      <!-- Action Footer Links -->
      <div class="p-6 sm:p-8 rounded-2xl border border-[var(--accent)] bg-gradient-to-br from-[var(--card)] via-[var(--sec-bg)] to-[var(--card)] flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl mb-12">
        <div>
          <h3 class="text-lg sm:text-xl font-serif font-bold text-[var(--text-main)]">
            Explore the live product
          </h3>
          <p class="text-xs sm:text-sm text-[var(--text-sec)] mt-1">
            Visit the official website to see active candidate and recruiter placement workflows.
          </p>
        </div>
        <div class="flex flex-wrap gap-3 shrink-0">
          <a href="#work" class="px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-main)] font-semibold text-xs hover:border-[var(--accent)] transition-all">
            ← Back to Selected Work
          </a>
          <a href="https://www.dsjobby.com/" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-[var(--accent)] text-[#170D13] font-bold text-xs hover:opacity-90 shadow-md inline-flex items-center gap-2">
            <span>Visit dsjobby.com</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Bottom Reusable Project Navigation -->
    ${renderExploreMoreWork('ds-jobby')}
  `;

  // Attach interactive listeners for DSJobby case study
  initDSJobbyInteractions();
}

/**
 * Initializes all interactive controls inside the DSJobby case study:
 * - Smooth scroll for in-page jump pills
 * - Mobile walkthrough video auto-pause/play observer
 */
function initDSJobbyInteractions() {
  // 1. Smooth In-Page Pill Navigation
  const pills = document.querySelectorAll('.cs-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const targetId = pill.getAttribute('href');
      if (targetId && targetId.startsWith('#cs-')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}


function renderMeditrackCaseStudy(project, container) {
  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="border-b border-[var(--border)] pb-6 mb-12 flex justify-between items-center">
      <a href="#work" class="case-study-back-btn inline-flex items-center justify-center w-11 h-11 -ml-2.5 rounded-full text-[var(--accent)] hover:bg-[var(--sec-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]" aria-label="Back to selected work" title="Back to selected work">
        <svg class="w-5 h-5 pointer-events-none transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 12H5m0 0l7 7m-7-7l7-7"/>
        </svg>
        <span class="sr-only">Back to selected work</span>
      </a>
      <div class="text-xs font-mono text-[var(--text-sec)]">
        PROJECT 003 OF 04
      </div>
    </div>

    <!-- 01 — Overview & Product Showcase (Two-Column Layout) -->
    <div class="mb-20">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="md:col-span-6 lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            PRODUCT DESIGN · SAAS · MOBILE
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight break-words">
            MediTrack — Pharmacy Management Experience
          </h1>
          <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed mb-6 font-light">
            A pharmacy-focused digital experience designed to bring medicine lookup, barcode scanning, prescription verification, inventory visibility, and task management into a connected workflow.
          </p>

          <!-- Metadata Cards: My Role & Platform -->
          <div class="grid grid-cols-2 gap-3 w-full border-t border-[var(--border)] pt-4 mb-5 text-xs">
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">My role</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">UI/UX Design</span>
            </div>
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">Platform</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">Desktop SaaS Dashboard · Mobile Application</span>
            </div>
          </div>

          <!-- Key Experiences -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-5">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2 font-semibold">
              Key experiences
            </div>
            <ul class="space-y-1.5 text-xs text-[var(--text-sec)]">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Medicine lookup:</strong> Find medicines using search and barcode scanning.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Prescription verification:</strong> Support prescription checks and verification tasks.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Inventory management:</strong> View stock information and related medicine details.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Task management:</strong> Surface assigned tasks and their current status.</span>
              </li>
            </ul>
          </div>

          <!-- Design Focus -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-2 text-xs">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-1 font-semibold">
              Design focus
            </div>
            <p class="text-xs text-[var(--text-sec)] leading-relaxed">
              Creating a consistent experience across desktop and mobile, with clear information hierarchy, quick access to frequent tasks, and responsive layouts suited to pharmacy workflows.
            </p>
          </div>
        </div>

        <!-- Right Column (Expanded Mobile Showcase Fitted to Section Height) -->
        <div class="md:col-span-6 lg:col-span-7 flex justify-center items-center w-full min-w-0">
          <div class="w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] mx-auto relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone - NO overflow-hidden so hardware buttons & soft chassis shadows are unclipped) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels (Responsive width, centered, unclipped frame) -->
              <div class="relative w-full max-w-[190px] min-[360px]:max-w-[205px] sm:max-w-[215px] md:max-w-[205px] lg:max-w-[225px] xl:max-w-[235px] rounded-[32px] sm:rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center mx-auto transition-all">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-12 sm:w-14 h-2 sm:h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm shrink-0">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges (placed relative to chassis, unclipped) -->
                <div class="absolute -left-[2.5px] top-12 sm:top-14 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -left-[2.5px] top-19 sm:top-22 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -right-[2.5px] top-14 sm:top-16 w-[2.5px] h-8 sm:h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10 pointer-events-none"></div>

                <!-- Inner Screen Area (Responsive width 100%, height auto, exact 1080/2340 aspect ratio, max-height bound) -->
                <div 
                  class="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer"
                  style="aspect-ratio: 1080 / 2340; width: 100%; height: auto; max-height: 480px;"
                  onclick="toggleMeditrackMobilePlayback()"
                  title="Click to toggle mobile walkthrough playback"
                >
                  <!-- Walkthrough Video -->
                  <video
                    id="csMeditrackMobileVideo"
                    autoplay
                    muted
                    defaultMuted
                    loop
                    playsinline
                    webkit-playsinline
                    preload="auto"
                    poster="assets/meditrack-mobile-walkthrough-poster.jpg"
                    class="w-full h-full object-contain block select-none bg-black"
                    style="width: 100%; height: 100%; object-fit: contain; background-color: #000000;"
                    aria-label="MediTrack Mobile Walkthrough"
                  >
                    <source src="assets/meditrack-mobile-walkthrough.mp4#t=0.001" type="video/mp4">
                    <source src="public/videos/meditrack-mobile-walkthrough.mp4#t=0.001" type="video/mp4">
                    <source src="videos/meditrack-mobile-walkthrough.mp4#t=0.001" type="video/mp4">
                    <source src="assets/Login and what's new.mp4#t=0.001" type="video/mp4">
                    <p class="p-2 text-[10px] text-[var(--text-sec)]">Your browser does not support the video tag.</p>
                  </video>

                  <!-- Screen Gloss Reflection -->
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[24px] sm:rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play mobile walkthrough"
                  >
                    <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-4 sm:w-5 h-4 sm:h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--text-sec)] w-full text-center">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 max-w-full truncate">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span class="truncate">375 × 812 · Mobile Assistant App</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer (Responsive wrap/stack on mobile, side-by-side on tablet/desktop) -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 w-full px-1 pt-2.5 text-[10px] sm:text-[11px] text-[var(--text-sec)] font-mono text-center sm:text-left">
              <span class="inline-flex items-center gap-1.5 shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span class="tracking-wider">LIVE MOBILE WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)] truncate max-w-full">Pharmacy Mobile Walkthrough</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 01.B — Inventory Management & Billing Workflow -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="md:col-span-6 lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            INVENTORY MANAGEMENT · BILLING WORKFLOW
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight break-words">
            From Stock to Sale, Seamlessly.
          </h2>
          <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed mb-6 font-light">
            A connected pharmacy workflow that helps staff add medicines to inventory, manage stock details, find available medicines, and move selected medicines into the billing cart.
          </p>

          <!-- Metadata Cards: My Role & Platform -->
          <div class="grid grid-cols-2 gap-3 w-full border-t border-[var(--border)] pt-4 mb-5 text-xs">
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">My role</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">UI/UX Design</span>
            </div>
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">Platform</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">Desktop SaaS Dashboard · Mobile Application</span>
            </div>
          </div>

          <!-- Key Experiences -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-5">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2 font-semibold">
              Key experiences
            </div>
            <ul class="space-y-1.5 text-xs text-[var(--text-sec)]">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Add to inventory:</strong> Register medicines and maintain stock information.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Find medicines:</strong> Locate existing medicines using search or barcode scanning where supported.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Add to bill:</strong> Select medicines and quantities for the current sale.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Review the cart:</strong> Check selected items and bill details before proceeding.</span>
              </li>
            </ul>
          </div>

          <!-- Design Focus -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-2 text-xs">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-1 font-semibold">
              Design focus
            </div>
            <p class="text-xs text-[var(--text-sec)] leading-relaxed">
              Connecting inventory and billing through clear information hierarchy, efficient interactions, visible feedback, and error-prevention patterns.
            </p>
          </div>
        </div>

        <!-- Right Column (Expanded Mobile Showcase Fitted to Section Height) -->
        <div class="md:col-span-6 lg:col-span-7 flex justify-center items-center w-full min-w-0">
          <div class="w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] mx-auto relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone - NO overflow-hidden) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels (Responsive width, centered, unclipped frame) -->
              <div class="relative w-full max-w-[190px] min-[360px]:max-w-[205px] sm:max-w-[215px] md:max-w-[205px] lg:max-w-[225px] xl:max-w-[235px] rounded-[32px] sm:rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center mx-auto transition-all">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-12 sm:w-14 h-2 sm:h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm shrink-0">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges (unclipped) -->
                <div class="absolute -left-[2.5px] top-12 sm:top-14 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -left-[2.5px] top-19 sm:top-22 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -right-[2.5px] top-14 sm:top-16 w-[2.5px] h-8 sm:h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10 pointer-events-none"></div>

                <!-- Inner Screen Area (Exact 392 / 850 native aspect ratio for inventory video) -->
                <div 
                  class="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer"
                  style="aspect-ratio: 392 / 850; width: 100%; height: auto; max-height: 480px;"
                  onclick="toggleMeditrackInventoryPlayback()"
                  title="Click to toggle inventory walkthrough playback"
                >
                  <!-- Inventory Walkthrough Video -->
                  <video
                    id="csMeditrackInventoryVideo"
                    autoplay
                    muted
                    defaultMuted
                    loop
                    playsinline
                    webkit-playsinline
                    preload="auto"
                    poster="assets/meditrack-inventory-walkthrough-poster.jpg"
                    class="w-full h-full object-contain block select-none bg-black"
                    style="width: 100%; height: 100%; object-fit: contain; background-color: #000000;"
                    aria-label="MediTrack Inventory and Billing Walkthrough"
                  >
                    <source src="assets/meditrack-inventory-walkthrough.mp4#t=0.001" type="video/mp4">
                    <source src="public/videos/meditrack-inventory-walkthrough.mp4#t=0.001" type="video/mp4">
                    <source src="videos/meditrack-inventory-walkthrough.mp4#t=0.001" type="video/mp4">
                    <source src="assets/videos/meditrack-inventory-walkthrough.mp4#t=0.001" type="video/mp4">
                    <source src="/videos/meditrack-inventory-walkthrough.mp4#t=0.001" type="video/mp4">
                    <p class="p-2 text-[10px] text-[var(--text-sec)]">Your browser does not support the video tag.</p>
                  </video>

                  <!-- Screen Gloss Reflection -->
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[24px] sm:rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackInventoryPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play inventory walkthrough"
                  >
                    <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-4 sm:w-5 h-4 sm:h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--text-sec)] w-full text-center">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 max-w-full truncate">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span class="truncate">392 × 850 · Mobile Stock &amp; Billing</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 w-full px-1 pt-2.5 text-[10px] sm:text-[11px] text-[var(--text-sec)] font-mono text-center sm:text-left">
              <span class="inline-flex items-center gap-1.5 shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span class="tracking-wider">INVENTORY &amp; BILLING WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)] truncate max-w-full">Pharmacy Mobile Walkthrough</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 01.C — Billing & Checkout Workflow -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="md:col-span-6 lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            POINT OF SALE · BILLING WORKFLOW
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight break-words">
            From Medicine Search to Secure Checkout.
          </h2>
          <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed mb-6 font-light">
            A structured pharmacy billing experience that guides pharmacists from medicine selection and cart review to discount application, customer verification, and payment.
          </p>

          <!-- Metadata Cards: My Role & Platform -->
          <div class="grid grid-cols-2 gap-3 w-full border-t border-[var(--border)] pt-4 mb-5 text-xs">
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">My role</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">UI/UX Design</span>
            </div>
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">Platform</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">Desktop SaaS Dashboard · Mobile Application</span>
            </div>
          </div>

          <!-- Key Experiences -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-5">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2 font-semibold">
              Key experiences
            </div>
            <ul class="space-y-1.5 text-xs text-[var(--text-sec)]">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Medicine search:</strong> Find the required medicine and add it to the cart.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Bill summary:</strong> Review selected medicines, quantities, prices, subtotal, and applicable discounts before confirming the bill.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Customer details:</strong> Capture the required customer information when prescription (Rx) medicines are included.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Payment mode:</strong> Proceed to the payment-method selection after completing the required details.</span>
              </li>
            </ul>
          </div>

          <!-- Design Focus -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-5 text-xs">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-1 font-semibold">
              Design focus
            </div>
            <p class="text-xs text-[var(--text-sec)] leading-relaxed">
              Creating a clear, step-by-step checkout journey with transparent pricing, contextual validation, prescription-related information requirements, and clear next actions at every stage.
            </p>
          </div>

          <!-- UX Decisions & Checkout Progression -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-2 text-xs">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2 font-semibold">
              Checkout Progression &amp; UX Decisions
            </div>
            <div class="flex flex-wrap items-center gap-1.5 mb-3 text-[10px] font-mono text-[var(--text-sec)]">
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-main)]">Search Medicine</span>
              <span>→</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-main)]">Add to Cart</span>
              <span>→</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-main)]">Review Bill &amp; Discounts</span>
              <span>→</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--accent)]">Customer Details (Rx)</span>
              <span>→</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-main)]">Select Payment</span>
            </div>
            <ul class="space-y-1 text-[11px] text-[var(--text-sec)] leading-normal">
              <li class="flex items-start gap-1.5">
                <span class="text-[var(--accent)]">•</span>
                <span>Transparent price breakdown distinctly separates subtotal, discount deductions, and final payable amount.</span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="text-[var(--accent)]">•</span>
                <span>Contextual validation requires customer details only when prescription (Rx) medicines are present in the cart.</span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="text-[var(--accent)]">•</span>
                <span>Progressive disclosure reveals payment mode selection only after all prerequisite validation checks are fulfilled.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column (Expanded Mobile Showcase Fitted to Section Height) -->
        <div class="md:col-span-6 lg:col-span-7 flex justify-center items-center w-full min-w-0">
          <div class="w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] mx-auto relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone - NO overflow-hidden) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels (Responsive width, centered, unclipped frame) -->
              <div class="relative w-full max-w-[190px] min-[360px]:max-w-[205px] sm:max-w-[215px] md:max-w-[205px] lg:max-w-[225px] xl:max-w-[235px] rounded-[32px] sm:rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center mx-auto transition-all">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-12 sm:w-14 h-2 sm:h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm shrink-0">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges (unclipped) -->
                <div class="absolute -left-[2.5px] top-12 sm:top-14 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -left-[2.5px] top-19 sm:top-22 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -right-[2.5px] top-14 sm:top-16 w-[2.5px] h-8 sm:h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10 pointer-events-none"></div>

                <!-- Inner Screen Area (Exact 1080 / 2340 aspect ratio) -->
                <div 
                  class="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer"
                  style="aspect-ratio: 1080 / 2340; width: 100%; height: auto; max-height: 480px;"
                  onclick="toggleMeditrackBillingPlayback()"
                  title="Click to toggle billing walkthrough playback"
                >
                  <!-- Billing Walkthrough Video -->
                  <video
                    id="csMeditrackBillingVideo"
                    autoplay
                    muted
                    defaultMuted
                    loop
                    playsinline
                    webkit-playsinline
                    preload="auto"
                    poster="assets/meditrack-billing-workflow-poster.jpg"
                    class="w-full h-full object-contain block select-none bg-black"
                    style="width: 100%; height: 100%; object-fit: contain; background-color: #000000;"
                    aria-label="MediTrack Billing and Checkout Walkthrough"
                  >
                    <source src="assets/meditrack-billing-workflow.mp4#t=0.001" type="video/mp4">
                    <source src="public/videos/meditrack-billing-workflow.mp4#t=0.001" type="video/mp4">
                    <source src="videos/meditrack-billing-workflow.mp4#t=0.001" type="video/mp4">
                    <source src="assets/videos/meditrack-billing-workflow.mp4#t=0.001" type="video/mp4">
                    <source src="/videos/meditrack-billing-workflow.mp4#t=0.001" type="video/mp4">
                    <p class="p-2 text-[10px] text-[var(--text-sec)]">Your browser does not support the video tag.</p>
                  </video>

                  <!-- Screen Gloss Reflection -->
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[24px] sm:rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackBillingPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play billing walkthrough"
                  >
                    <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-4 sm:w-5 h-4 sm:h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--text-sec)] w-full text-center">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 max-w-full truncate">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span class="truncate">375 × 812 · Mobile Billing &amp; Checkout</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 w-full px-1 pt-2.5 text-[10px] sm:text-[11px] text-[var(--text-sec)] font-mono text-center sm:text-left">
              <span class="inline-flex items-center gap-1.5 shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span class="tracking-wider">BILLING &amp; CHECKOUT WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)] truncate max-w-full">Pharmacy Mobile Walkthrough</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 01.D — Smart Store Mapping & Medicine Locator -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="md:col-span-6 lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            STORE MAPPING · MEDICINE DISCOVERY
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight break-words">
            From Store Layout to the Right Rack.
          </h2>
          <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed mb-6 font-light">
            A visual store-mapping experience that helps pharmacists locate medicines by connecting the pharmacy layout, rack locations, and product information in one accessible workflow.
          </p>

          <!-- Metadata Cards: My Role & Platform -->
          <div class="grid grid-cols-2 gap-3 w-full border-t border-[var(--border)] pt-4 mb-5 text-xs">
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">My role</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">UI/UX Design</span>
            </div>
            <div>
              <span class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider block mb-0.5">Platform</span>
              <span class="text-[var(--text-main)] font-semibold text-xs sm:text-sm">Desktop SaaS Dashboard · Mobile Application</span>
            </div>
          </div>

          <!-- Key Experiences -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-5">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2 font-semibold">
              Key experiences
            </div>
            <ul class="space-y-1.5 text-xs text-[var(--text-sec)]">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Store image upload:</strong> Add a store layout or image to establish a visual reference for the pharmacy.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Rack identification:</strong> Locate and identify racks within the store layout.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Product-to-rack mapping:</strong> Associate medicines with their corresponding rack locations.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold mt-0.5">✓</span>
                <span><strong class="text-[var(--text-main)] font-medium">Faster medicine discovery:</strong> Help pharmacists identify where a medicine is stored before retrieving it.</span>
              </li>
            </ul>
          </div>

          <!-- Design Focus -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-5 text-xs">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-1 font-semibold">
              Design focus
            </div>
            <p class="text-xs text-[var(--text-sec)] leading-relaxed">
              Turning physical store information into a clear digital reference through visual mapping, recognizable rack labels, and easily accessible product-location details.
            </p>
          </div>

          <!-- UX & UI Decisions -->
          <div class="w-full border-t border-[var(--border)] pt-4 mb-2 text-xs">
            <div class="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2 font-semibold">
              Mapping Workflow &amp; UX Decisions
            </div>
            <div class="flex flex-wrap items-center gap-1.5 mb-3 text-[10px] font-mono text-[var(--text-sec)]">
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-main)]">Upload Layout Image</span>
              <span>→</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-main)]">Identify &amp; Tag Racks</span>
              <span>→</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--accent)]">Map Products to Racks</span>
              <span>→</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-main)]">Instant Medicine Discovery</span>
            </div>
            <ul class="space-y-1 text-[11px] text-[var(--text-sec)] leading-normal">
              <li class="flex items-start gap-1.5">
                <span class="text-[var(--accent)]">•</span>
                <span>Upload or select store image provides a clear starting point for establishing the floorplan.</span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="text-[var(--accent)]">•</span>
                <span>Visually distinct rack labels and consistent zone codes ensure effortless physical-to-digital orientation.</span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="text-[var(--accent)]">•</span>
                <span>Clear feedback confirms saving or updating rack mappings, keeping layouts legible and zoomable on mobile.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column (Expanded Mobile Showcase Fitted to Section Height) -->
        <div class="md:col-span-6 lg:col-span-7 flex justify-center items-center w-full min-w-0">
          <div class="w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] mx-auto relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone - NO overflow-hidden) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels (Responsive width, centered, unclipped frame) -->
              <div class="relative w-full max-w-[190px] min-[360px]:max-w-[205px] sm:max-w-[215px] md:max-w-[205px] lg:max-w-[225px] xl:max-w-[235px] rounded-[32px] sm:rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center mx-auto transition-all">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-12 sm:w-14 h-2 sm:h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm shrink-0">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges (unclipped) -->
                <div class="absolute -left-[2.5px] top-12 sm:top-14 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -left-[2.5px] top-19 sm:top-22 w-[2.5px] h-5 sm:h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10 pointer-events-none"></div>
                <div class="absolute -right-[2.5px] top-14 sm:top-16 w-[2.5px] h-8 sm:h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10 pointer-events-none"></div>

                <!-- Inner Screen Area (Exact 392 / 850 aspect ratio for store mapping video) -->
                <div 
                  class="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer"
                  style="aspect-ratio: 392 / 850; width: 100%; height: auto; max-height: 480px;"
                  onclick="toggleMeditrackStoreMappingPlayback()"
                  title="Click to toggle store mapping walkthrough playback"
                >
                  <!-- Store Mapping Walkthrough Video -->
                  <video
                    id="csMeditrackStoreMappingVideo"
                    autoplay
                    muted
                    defaultMuted
                    loop
                    playsinline
                    webkit-playsinline
                    preload="auto"
                    poster="assets/meditrack-store-mapping-poster.jpg"
                    class="w-full h-full object-contain block select-none bg-black"
                    style="width: 100%; height: 100%; object-fit: contain; background-color: #000000;"
                    aria-label="MediTrack Smart Store Mapping Walkthrough"
                  >
                    <source src="assets/meditrack-store-mapping.mp4#t=0.001" type="video/mp4">
                    <source src="public/videos/meditrack-store-mapping.mp4#t=0.001" type="video/mp4">
                    <source src="videos/meditrack-store-mapping.mp4#t=0.001" type="video/mp4">
                    <source src="assets/videos/meditrack-store-mapping.mp4#t=0.001" type="video/mp4">
                    <source src="/videos/meditrack-store-mapping.mp4#t=0.001" type="video/mp4">
                    <p class="p-2 text-[10px] text-[var(--text-sec)]">Your browser does not support the video tag.</p>
                  </video>

                  <!-- Screen Gloss Reflection -->
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[24px] sm:rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackStoreMappingPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play store mapping walkthrough"
                  >
                    <div class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-4 sm:w-5 h-4 sm:h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--text-sec)] w-full text-center">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 max-w-full truncate">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span class="truncate">392 × 850 · Store Layout &amp; Rack Locator</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 w-full px-1 pt-2.5 text-[10px] sm:text-[11px] text-[var(--text-sec)] font-mono text-center sm:text-left">
              <span class="inline-flex items-center gap-1.5 shrink-0">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span class="tracking-wider">SMART STORE MAPPING WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)] truncate max-w-full">Pharmacy Mobile Walkthrough</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 02 — The Problem -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">02 — THE PROBLEM</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-4">Core Design Challenge</h2>
      <p class="text-base text-[var(--text-sec)] leading-relaxed max-w-3xl">${project.problem}</p>
    </div>

    <!-- 03 — Users & Stakeholders -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">03 — USERS &amp; STAKEHOLDERS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Who I Designed For</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${project.users.map(u => `
          <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <div class="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">${u.role}</div>
            <p class="text-sm text-[var(--text-sec)] leading-relaxed">${u.need}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 04 — Context and Requirements -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">04 — CONTEXT &amp; REQUIREMENTS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-4">Scoping the Solution</h2>
      <p class="text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-6">${project.context}</p>
    </div>

    <!-- 05 — UX Challenges -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">05 — UX CHALLENGES</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Key Complexities Addressed</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${project.challenges.map(c => `
          <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">${c.title}</h3>
              <p class="text-sm text-[var(--text-sec)] leading-relaxed">${c.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 06 — Information Architecture -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">06 — INFORMATION ARCHITECTURE</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Structural Hierarchy</h2>
      <div class="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          ${project.iaNodes.map((node, i) => `
            <div class="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-center">
              <div class="text-xs font-mono text-[var(--accent)] mb-1">NODE 0${i + 1}</div>
              <div class="text-sm font-semibold text-[var(--text-main)]">${node.label}</div>
              <div class="text-xs text-[var(--text-sec)] mt-1">${node.sub}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 07 — User Flow -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">07 — USER FLOW</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Primary Interaction Path</h2>
      <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] flex flex-wrap items-center justify-between gap-4">
        ${project.userFlow.map((step, idx) => `
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full border border-[var(--accent)] bg-[var(--card)] flex items-center justify-center text-xs font-bold text-[var(--accent)]">
              ${idx + 1}
            </div>
            <div class="text-sm font-medium text-[var(--text-main)]">${step}</div>
          </div>
          ${idx < project.userFlow.length - 1 ? '<span class="text-[var(--text-sec)] hidden sm:inline">→</span>' : ''}
        `).join('')}
      </div>
    </div>

    <!-- 08 — Design System -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">08 — DESIGN SYSTEM &amp; TOKENS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Component Foundations</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div>
          <div class="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">Color Foundations</div>
          <ul class="space-y-2 text-sm text-[var(--text-sec)]">
            ${project.designSystem.colors.map(col => `
              <li class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full border border-[var(--border)] bg-[var(--accent)]"></span>
                ${col}
              </li>
            `).join('')}
          </ul>
        </div>
        <div>
          <div class="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">Component Library</div>
          <ul class="space-y-2 text-sm text-[var(--text-sec)]">
            ${project.designSystem.components.map(comp => `
              <li class="flex items-center gap-2">
                <span class="text-[var(--accent)]">✓</span>
                ${comp}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- 09 — Challenges and Solutions -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">09 — CHALLENGES &amp; SOLUTIONS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Design Decisions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${project.solutions.map(s => `
          <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)]">
            <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">Challenge</div>
            <div class="text-base font-semibold text-[var(--text-main)] mb-4">${s.challenge}</div>
            <div class="text-xs font-mono text-[var(--text-sec)] uppercase mb-2">Design Response</div>
            <p class="text-sm text-[var(--text-sec)] leading-relaxed">${s.solution}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 10 & 11 — Outcome and Learnings -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">10 — OUTCOME</div>
          <h3 class="text-2xl font-serif text-[var(--text-main)] mb-3">Qualitative Impact</h3>
          <p class="text-sm text-[var(--text-sec)] leading-relaxed">${project.outcome}</p>
        </div>
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">11 — LEARNINGS</div>
          <h3 class="text-2xl font-serif text-[var(--text-main)] mb-3">Reflection</h3>
          <p class="text-sm text-[var(--text-sec)] leading-relaxed">${project.learnings}</p>
        </div>
      </div>
    </div>

    <!-- Explore More Work Section -->
    ${renderExploreMoreWork('meditrack')}
  `;

  setTimeout(() => {
    if (typeof window.initMeditrackMobileVideo === 'function') {
      window.initMeditrackMobileVideo();
    }
    if (typeof window.initMeditrackInventoryVideo === 'function') {
      window.initMeditrackInventoryVideo();
    }
    if (typeof window.initMeditrackBillingVideo === 'function') {
      window.initMeditrackBillingVideo();
    }
    if (typeof window.initMeditrackStoreMappingVideo === 'function') {
      window.initMeditrackStoreMappingVideo();
    }
  }, 60);
}

function renderDSCRMCaseStudy(project, container) {
  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="border-b border-[var(--border)] pb-6 mb-12 flex justify-between items-center">
      <a href="#work" class="case-study-back-btn inline-flex items-center justify-center w-11 h-11 -ml-2.5 rounded-full text-[var(--accent)] hover:bg-[var(--sec-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]" aria-label="Back to selected work" title="Back to selected work">
        <svg class="w-5 h-5 pointer-events-none transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 12H5m0 0l7 7m-7-7l7-7"/>
        </svg>
        <span class="sr-only">Back to selected work</span>
      </a>
      <div class="flex items-center gap-3">
        <div class="text-xs font-mono text-[var(--text-sec)]">
          PROJECT 004 OF 04
        </div>
      </div>
    </div>

    <!-- Case Study Header Area -->
    <div class="mb-12">
      <div class="inline-flex items-center gap-2 text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider mb-4">
        <span>PROJECT 004</span>
        <span>•</span>
        <span>CASE STUDY</span>
      </div>
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight">
        DSCRM
      </h1>
      <div class="text-xl sm:text-2xl font-serif text-[var(--accent)] font-medium mb-6">
        Enterprise CRM Platform
      </div>
      <p class="text-base sm:text-xl text-[var(--text-sec)] max-w-3xl leading-relaxed font-light">
        Organizing customer relationships, service requirements, and business workflows into a more structured CRM experience.
      </p>
    </div>

    <!-- Project Overview Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm mb-14">
      <div>
        <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Role</div>
        <div class="text-sm font-semibold text-[var(--text-main)]">UI/UX Designer</div>
      </div>
      <div>
        <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Platform</div>
        <div class="text-sm font-semibold text-[var(--text-main)]">Web-based SaaS</div>
      </div>
      <div>
        <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Domain</div>
        <div class="text-sm font-semibold text-[var(--text-main)]">Customer Relationship Management</div>
      </div>
      <div>
        <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Focus</div>
        <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">Information Architecture, Dashboard Design, Workflow Design, Interaction Design</div>
      </div>
    </div>

    <!-- The Challenge & The Objective -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- The Challenge -->
        <div class="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-3">
              <span>01</span>
              <span>—</span>
              <span>THE CHALLENGE</span>
            </div>
            <h2 class="text-2xl font-serif text-[var(--text-main)] font-bold mb-4">
              Navigating Interconnected Workflows
            </h2>
            <p class="text-sm sm:text-base text-[var(--text-sec)] leading-relaxed font-light">
              Managing customer relationships, service requirements, sales opportunities, and follow-up activities across different workflows can make business information difficult to navigate. The challenge was to organize these interconnected processes into a consistent and understandable experience.
            </p>
          </div>
        </div>

        <!-- The Objective -->
        <div class="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-3">
              <span>02</span>
              <span>—</span>
              <span>THE OBJECTIVE</span>
            </div>
            <h2 class="text-2xl font-serif text-[var(--text-main)] font-bold mb-4">
              A Structured CRM Experience
            </h2>
            <p class="text-sm sm:text-base text-[var(--text-sec)] leading-relaxed font-light">
              Design a structured CRM experience that helps users navigate customer information, track opportunities, manage requirements, and organize business activities efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Core Modules -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>03</span>
        <span>—</span>
        <span>CORE MODULES</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        Core Platform Modules
      </h2>
      <p class="text-sm sm:text-base text-[var(--text-sec)] max-w-3xl leading-relaxed mb-8 font-light">
        Organizing business workflows into five structured, intuitive, and interconnected functional modules.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Customer Management -->
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <h3 class="text-lg font-serif font-bold text-[var(--text-main)] mb-2">Customer Management</h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Organize customer information and make relevant records easier to access.
            </p>
          </div>
        </div>

        <!-- Service Lines & Requirements -->
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-lg font-serif font-bold text-[var(--text-main)] mb-2">Service Lines &amp; Requirements</h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Structure service-related information and customer requirements within a consistent workflow.
            </p>
          </div>
        </div>

        <!-- Sales Cycle & Opportunities -->
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <h3 class="text-lg font-serif font-bold text-[var(--text-main)] mb-2">Sales Cycle &amp; Opportunities</h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Organize opportunities by sales stage to make their progress easier to understand.
            </p>
          </div>
        </div>

        <!-- Tasks & Activities -->
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            </div>
            <h3 class="text-lg font-serif font-bold text-[var(--text-main)] mb-2">Tasks &amp; Activities</h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Keep follow-ups, meetings, and ongoing activities organized.
            </p>
          </div>
        </div>

        <!-- Reports & Insights -->
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div class="w-10 h-10 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <h3 class="text-lg font-serif font-bold text-[var(--text-main)] mb-2">Reports &amp; Insights</h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Present business information through structured dashboards, tables, and visual summaries.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Key UX Decisions -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>04</span>
        <span>—</span>
        <span>KEY UX DECISIONS</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        Key UX Decisions
      </h2>
      <p class="text-sm sm:text-base text-[var(--text-sec)] max-w-3xl leading-relaxed mb-8 font-light">
        Foundational design choices made to ensure complex business data remains easy to navigate and scan.
      </p>

      <div class="space-y-4 max-w-4xl">
        <!-- 01 -->
        <div class="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="px-2.5 py-1 rounded bg-[var(--sec-bg)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--accent)] shrink-0 self-start">
            01
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-serif font-bold text-[var(--text-main)] mb-1">
              Clear Information Architecture
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Organize modules around core business tasks so users can navigate related information more predictably.
            </p>
          </div>
        </div>

        <!-- 02 -->
        <div class="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="px-2.5 py-1 rounded bg-[var(--sec-bg)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--accent)] shrink-0 self-start">
            02
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-serif font-bold text-[var(--text-main)] mb-1">
              Scannable Data Presentation
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Use consistent spacing, readable labels, clear hierarchy, and status indicators to make information-heavy interfaces easier to scan.
            </p>
          </div>
        </div>

        <!-- 03 -->
        <div class="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="px-2.5 py-1 rounded bg-[var(--sec-bg)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--accent)] shrink-0 self-start">
            03
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-serif font-bold text-[var(--text-main)] mb-1">
              Structured Sales Workflows
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Present sales stages in a clear sequence so opportunity progress is easier to follow.
            </p>
          </div>
        </div>

        <!-- 04 -->
        <div class="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="px-2.5 py-1 rounded bg-[var(--sec-bg)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--accent)] shrink-0 self-start">
            04
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-serif font-bold text-[var(--text-main)] mb-1">
              Contextual Activity Management
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Keep activities and follow-ups connected to ongoing customer and opportunity workflows.
            </p>
          </div>
        </div>

        <!-- 05 -->
        <div class="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="px-2.5 py-1 rounded bg-[var(--sec-bg)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--accent)] shrink-0 self-start">
            05
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-serif font-bold text-[var(--text-main)] mb-1">
              Consistent Design Patterns
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-light">
              Maintain reusable interface patterns across modules to create a coherent experience as the product grows.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- My Contribution -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>05</span>
        <span>—</span>
        <span>MY CONTRIBUTION</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        My Contribution
      </h2>
      <div class="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--card)] max-w-4xl shadow-sm">
        <p class="text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-normal">
          I worked on translating business requirements into structured user workflows and interface layouts, focusing on information hierarchy, dashboard organization, data presentation, and consistency across CRM modules.
        </p>
      </div>
    </div>

    <!-- Key Learning & Design Principle -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>06</span>
        <span>—</span>
        <span>KEY LEARNING</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-6">
        Key Learning &amp; Reflection
      </h2>
      
      <div class="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--card)] max-w-4xl mb-6 shadow-sm">
        <p class="text-sm sm:text-base text-[var(--text-sec)] leading-relaxed font-light">
          This project strengthened my understanding of enterprise UX, particularly how information architecture, consistent interaction patterns, and clear data presentation can make complex business workflows easier to navigate.
        </p>
      </div>

      <div class="p-6 sm:p-8 rounded-xl border border-[var(--accent)]/40 bg-[var(--sec-bg)] max-w-4xl shadow-sm">
        <div class="text-[10px] font-mono tracking-widest uppercase text-[var(--accent)] font-semibold mb-2">
          DESIGN PRINCIPLE
        </div>
        <blockquote class="text-xl sm:text-2xl font-serif text-[var(--text-main)] italic leading-relaxed">
          &ldquo;Simplify the workflow, not the information users need.&rdquo;
        </blockquote>
      </div>
    </div>

    <!-- Explore More Work Section -->
    ${renderExploreMoreWork('dscrm')}
  `;
}

function renderCaseStudy(project) {
  const container = document.getElementById('caseStudyContent');
  if (!container) return;

  // Custom dedicated case study for DSJobby
  if (project.id === 'ds-jobby' || project.id === 'dsjobby') {
    renderDSJobbyCaseStudy(project, container);
    return;
  }

  // Custom dedicated case study for DSEdify Command Center
  if (project.id === 'dsedify') {
    renderDSEdifyCaseStudy(project, container);
    return;
  }

  // Custom dedicated case study for MediTrack
  if (project.id === 'meditrack') {
    renderMeditrackCaseStudy(project, container);
    return;
  }

  // Custom dedicated case study for DSCRM (Content-only)
  if (project.id === 'dscrm') {
    renderDSCRMCaseStudy(project, container);
    return;
  }

  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="border-b border-[var(--border)] pb-6 mb-12 flex justify-between items-center">
      <a href="#work" class="case-study-back-btn inline-flex items-center justify-center w-11 h-11 -ml-2.5 rounded-full text-[var(--accent)] hover:bg-[var(--sec-bg)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]" aria-label="Back to selected work" title="Back to selected work">
        <svg class="w-5 h-5 pointer-events-none transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 12H5m0 0l7 7m-7-7l7-7"/>
        </svg>
        <span class="sr-only">Back to selected work</span>
      </a>
      <div class="text-xs font-mono text-[var(--text-sec)]">
        PROJECT ${project.number} OF 04
      </div>
    </div>

    <!-- 01 — Overview -->
    <div class="mb-16">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">01 — OVERVIEW</div>
      <h1 class="text-4xl sm:text-6xl font-serif text-[var(--text-main)] mb-4">${project.title}</h1>
      <p class="text-lg text-[var(--text-sec)] max-w-3xl mb-8 leading-relaxed">${project.description}</p>

      <!-- Project Metadata Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] mb-10">
        <div>
          <div class="text-[11px] text-[var(--text-sec)] uppercase tracking-wider mb-1">Role</div>
          <div class="text-sm font-medium text-[var(--text-main)]">${project.role}</div>
        </div>
        <div>
          <div class="text-[11px] text-[var(--text-sec)] uppercase tracking-wider mb-1">Category</div>
          <div class="text-sm font-medium text-[var(--text-main)]">${project.category}</div>
        </div>
        <div>
          <div class="text-[11px] text-[var(--text-sec)] uppercase tracking-wider mb-1">Platform</div>
          <div class="text-sm font-medium text-[var(--text-main)]">${project.platform}</div>
        </div>
        <div>
          <div class="text-[11px] text-[var(--text-sec)] uppercase tracking-wider mb-1">Tools</div>
          <div class="text-sm font-medium text-[var(--text-main)]">${project.tools}</div>
        </div>
      </div>

      <!-- Hero Visual Representation -->
      <div class="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-8 shadow-2xl overflow-hidden mb-6">
        <img src="${project.previewImg}" alt="${project.title} Interface preview" class="w-full h-auto rounded-lg object-cover shadow-lg" loading="lazy" />
      </div>
    </div>

    <!-- 02 — The Problem -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">02 — THE PROBLEM</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-4">Core Design Challenge</h2>
      <p class="text-base text-[var(--text-sec)] leading-relaxed max-w-3xl">${project.problem}</p>
    </div>

    <!-- 03 — Users -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">03 — USERS & STAKEHOLDERS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Who I Designed For</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${project.users.length > 2 ? '3' : '2'} gap-6">
        ${project.users.map(u => `
          <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <div class="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">${u.role}</div>
            <p class="text-sm text-[var(--text-sec)] leading-relaxed">${u.need}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 04 — Context and Requirements -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">04 — CONTEXT & REQUIREMENTS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-4">Scoping the Solution</h2>
      <p class="text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-6">${project.context}</p>
    </div>

    <!-- 05 — UX Challenges -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">05 — UX CHALLENGES</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Key Complexities Addressed</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${project.challenges.map(c => `
          <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-serif text-[var(--text-main)] mb-2">${c.title}</h3>
              <p class="text-sm text-[var(--text-sec)] leading-relaxed">${c.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 06 — Information Architecture -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">06 — INFORMATION ARCHITECTURE</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Structural Hierarchy</h2>
      <div class="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          ${project.iaNodes.map((node, i) => `
            <div class="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-center">
              <div class="text-xs font-mono text-[var(--accent)] mb-1">NODE 0${i + 1}</div>
              <div class="text-sm font-semibold text-[var(--text-main)]">${node.label}</div>
              <div class="text-xs text-[var(--text-sec)] mt-1">${node.sub}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 07 — User Flow -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">07 — USER FLOW</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Primary Interaction Path</h2>
      <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] flex flex-wrap items-center justify-between gap-4">
        ${project.userFlow.map((step, idx) => `
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full border border-[var(--accent)] bg-[var(--card)] flex items-center justify-center text-xs font-bold text-[var(--accent)]">
              ${idx + 1}
            </div>
            <div class="text-sm font-medium text-[var(--text-main)]">${step}</div>
          </div>
          ${idx < project.userFlow.length - 1 ? '<span class="text-[var(--text-sec)] hidden sm:inline">→</span>' : ''}
        `).join('')}
      </div>
    </div>

    <!-- 08 & 09 — Wireframes & Design Exploration -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">08 & 09 — WIREFRAMING & EXPLORATION</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-4">Low-to-High Fidelity Evolution</h2>
      <p class="text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-8">
        Explored multiple layout variations to test optimal data density before committing to component styling. Wireframes established the spatial hierarchy and responsive breakdown for desktop, tablet, and mobile breakpoints.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase mb-3">Wireframe Structure</div>
          <div class="space-y-3">
            <div class="h-8 rounded bg-[var(--sec-bg)] border border-[var(--border)]"></div>
            <div class="grid grid-cols-3 gap-2">
              <div class="h-20 rounded bg-[var(--sec-bg)] border border-[var(--border)]"></div>
              <div class="h-20 rounded bg-[var(--sec-bg)] border border-[var(--border)]"></div>
              <div class="h-20 rounded bg-[var(--sec-bg)] border border-[var(--border)]"></div>
            </div>
            <div class="h-28 rounded bg-[var(--sec-bg)] border border-[var(--border)]"></div>
          </div>
          <div class="text-xs text-[var(--text-sec)] mt-4">Structural layout testing for responsive scaling.</div>
        </div>
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--accent)] uppercase mb-3">High-Fidelity Component Mapping</div>
          <div class="space-y-3">
            <div class="h-8 rounded bg-[var(--accent)] opacity-20 border border-[var(--accent)] flex items-center px-3 text-xs font-semibold text-[var(--text-main)]">Tokenized Navigation</div>
            <div class="grid grid-cols-3 gap-2">
              <div class="h-20 rounded bg-[var(--card)] border border-[var(--accent)] p-2 text-[10px] text-[var(--accent)] font-medium">Metric Token</div>
              <div class="h-20 rounded bg-[var(--card)] border border-[var(--accent)] p-2 text-[10px] text-[var(--accent)] font-medium">Card Token</div>
              <div class="h-20 rounded bg-[var(--card)] border border-[var(--accent)] p-2 text-[10px] text-[var(--accent)] font-medium">Badge Token</div>
            </div>
            <div class="h-28 rounded bg-[var(--sec-bg)] border border-[var(--border)] p-3 text-xs text-[var(--text-sec)]">Polished layout with 8pt spacing grid.</div>
          </div>
          <div class="text-xs text-[var(--text-sec)] mt-4">Component tokens applied for consistent theme adherence.</div>
        </div>
      </div>
    </div>

    <!-- 10 — Design System -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">10 — DESIGN SYSTEM & TOKENS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Component Foundations</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div>
          <div class="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">Color Foundations</div>
          <ul class="space-y-2 text-sm text-[var(--text-sec)]">
            ${project.designSystem.colors.map(col => `
              <li class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full border border-[var(--border)] bg-[var(--accent)]"></span>
                ${col}
              </li>
            `).join('')}
          </ul>
        </div>
        <div>
          <div class="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">Component Library</div>
          <ul class="space-y-2 text-sm text-[var(--text-sec)]">
            ${project.designSystem.components.map(comp => `
              <li class="flex items-center gap-2">
                <span class="text-[var(--accent)]">✓</span>
                ${comp}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- 11 — Final UI Presentation -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">11 — FINAL UI SHOWCASE</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-4">Production-Quality Reconstructed UI</h2>
      <p class="text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-8">
        Full-fidelity interface composition showing realistic content, structured typography, state tags, and polished layout aesthetics.
      </p>
      <div class="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-8 shadow-2xl overflow-hidden mb-4">
        <img src="${project.previewImg}" alt="${project.title} Full UI" class="w-full h-auto rounded-lg shadow-lg" loading="lazy" />
      </div>
      <div class="text-center text-xs text-[var(--text-sec)]">
        Representative UI reconstructed for portfolio presentation.
      </div>
    </div>

    <!-- 12 — Prototype & Interaction -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">12 — INTERACTIVE PROTOTYPE</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-4">Live Interactive Demonstration</h2>
      <p class="text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-8">
        Test the key interaction mechanics directly in this sandbox:
      </p>
      <div id="interactiveSandbox" class="p-6 rounded-xl border border-[var(--accent)] bg-[var(--card)] shadow-lg">
        ${renderInteractivePrototype(project.prototypeType)}
      </div>
    </div>

    <!-- 13 — Challenges and Solutions -->
    <div class="mb-16 border-t border-[var(--border)] pt-12">
      <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">13 — CHALLENGES & SOLUTIONS</div>
      <h2 class="text-3xl font-serif text-[var(--text-main)] mb-6">Design Decisions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${project.solutions.map(s => `
          <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)]">
            <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">Challenge</div>
            <div class="text-base font-semibold text-[var(--text-main)] mb-4">${s.challenge}</div>
            <div class="text-xs font-mono text-[var(--text-sec)] uppercase mb-2">Design Response</div>
            <p class="text-sm text-[var(--text-sec)] leading-relaxed">${s.solution}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 14 & 15 — Outcome and Learnings -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">14 — OUTCOME</div>
          <h3 class="text-2xl font-serif text-[var(--text-main)] mb-3">Qualitative Impact</h3>
          <p class="text-sm text-[var(--text-sec)] leading-relaxed">${project.outcome}</p>
        </div>
        <div class="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">15 — LEARNINGS</div>
          <h3 class="text-2xl font-serif text-[var(--text-main)] mb-3">Reflection</h3>
          <p class="text-sm text-[var(--text-sec)] leading-relaxed">${project.learnings}</p>
        </div>
      </div>
    </div>

    <!-- Explore More Work Section -->
    ${renderExploreMoreWork(project.id)}
  `;

  // Attach interactive listeners for the prototype sandbox
  attachPrototypeHandlers(project.prototypeType);
}

/* -------------------------------------------------------------
   05. INTERACTIVE PROTOTYPE SANDBOX ENGINE
------------------------------------------------------------- */
function renderInteractivePrototype(type) {
  if (type === 'dsjobby') {
    return `
      <div>
        <div class="flex justify-between items-center pb-4 border-b border-[var(--border)] mb-4">
          <div class="text-sm font-semibold text-[var(--text-main)]">DSJobby Interactive Discovery Sandbox</div>
          <span class="text-xs font-mono text-[var(--accent)]">DISCOVER → EXPLORE → APPLY</span>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          <button class="filter-chip px-3 py-1.5 rounded-full text-xs border border-[var(--accent)] bg-[var(--accent)] text-[#170D13] font-medium" data-filter="all">All Roles</button>
          <button class="filter-chip px-3 py-1.5 rounded-full text-xs border border-[var(--border)] text-[var(--text-main)]" data-filter="design">Design</button>
          <button class="filter-chip px-3 py-1.5 rounded-full text-xs border border-[var(--border)] text-[var(--text-main)]" data-filter="tech">Engineering</button>
          <button class="filter-chip px-3 py-1.5 rounded-full text-xs border border-[var(--border)] text-[var(--text-main)]" data-filter="product">Product</button>
        </div>
        <div id="jobListingContainer" class="space-y-3">
          <div class="job-item p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex justify-between items-center" data-category="design">
            <div>
              <div class="text-sm font-semibold text-[var(--text-main)]">Senior Product Designer</div>
              <div class="text-xs text-[var(--text-sec)]">Airbnb • San Francisco, CA • $160k - $210k</div>
            </div>
            <button class="apply-btn px-4 py-1.5 rounded bg-[var(--accent)] text-[#170D13] text-xs font-semibold hover:opacity-90 transition-opacity" data-title="Senior Product Designer">Apply Now</button>
          </div>
          <div class="job-item p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex justify-between items-center" data-category="tech">
            <div>
              <div class="text-sm font-semibold text-[var(--text-main)]">Senior Software Engineer</div>
              <div class="text-xs text-[var(--text-sec)]">Stripe • Remote • $145k - $185k</div>
            </div>
            <button class="apply-btn px-4 py-1.5 rounded bg-[var(--accent)] text-[#170D13] text-xs font-semibold hover:opacity-90 transition-opacity" data-title="Senior Software Engineer">Apply Now</button>
          </div>
          <div class="job-item p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex justify-between items-center" data-category="product">
            <div>
              <div class="text-sm font-semibold text-[var(--text-main)]">Product Manager — Growth</div>
              <div class="text-xs text-[var(--text-sec)]">Linear • San Francisco • $150k - $190k</div>
            </div>
            <button class="apply-btn px-4 py-1.5 rounded bg-[var(--accent)] text-[#170D13] text-xs font-semibold hover:opacity-90 transition-opacity" data-title="Product Manager — Growth">Apply Now</button>
          </div>
        </div>
        <div id="applicationDrawer" class="hidden mt-4 p-4 rounded-lg border border-[var(--accent)] bg-[var(--sec-bg)]">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold text-[var(--accent)] uppercase">Application Drawer</span>
            <button id="closeDrawerBtn" class="text-xs text-[var(--text-sec)]">✕ Close</button>
          </div>
          <div id="drawerJobTitle" class="text-sm font-semibold text-[var(--text-main)] mb-2">Submitting Application</div>
          <p class="text-xs text-[var(--text-sec)] mb-3">Upload portfolio resume & contact profile with 1-click submission.</p>
          <button id="confirmApplyBtn" class="px-4 py-2 rounded bg-[var(--accent)] text-[#170D13] text-xs font-bold">Confirm Application ✓</button>
          <div id="applyStatusMsg" class="hidden text-xs text-green-400 mt-2 font-medium">Application successfully submitted! Recruiter alerted.</div>
        </div>
      </div>
    `;
  } else if (type === 'dsedify') {
    return `
      <div>
        <div class="flex justify-between items-center pb-4 border-b border-[var(--border)] mb-4">
          <div class="text-sm font-semibold text-[var(--text-main)]">DSEdify Role-Based Navigation & Batch Sandbox</div>
          <span class="text-xs font-mono text-[var(--accent)]">ENTERPRISE SAAS UX</span>
        </div>
        <div class="mb-4">
          <label class="text-xs text-[var(--text-sec)] uppercase tracking-wider mb-2 block">Switch User Role Preview:</label>
          <div class="flex flex-wrap gap-2">
            <button class="role-btn px-3 py-1.5 rounded text-xs border border-[var(--accent)] bg-[var(--accent)] text-[#170D13] font-semibold" data-role="Admin">Admin</button>
            <button class="role-btn px-3 py-1.5 rounded text-xs border border-[var(--border)] text-[var(--text-main)]" data-role="Trainer">Trainer</button>
            <button class="role-btn px-3 py-1.5 rounded text-xs border border-[var(--border)] text-[var(--text-main)]" data-role="Counselor">Counselor</button>
            <button class="role-btn px-3 py-1.5 rounded text-xs border border-[var(--border)] text-[var(--text-main)]" data-role="Trainee">Trainee</button>
          </div>
        </div>
        <div id="roleDashboardView" class="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] space-y-4">
          <div class="flex justify-between items-center">
            <div id="roleTitle" class="text-sm font-semibold text-[var(--text-main)]">Admin Master Dashboard</div>
            <span id="roleBadge" class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--sec-bg)] border border-[var(--accent)] text-[var(--accent)]">FULL ACCESS</span>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3 rounded bg-[var(--card)] border border-[var(--border)]">
              <div class="text-[10px] text-[var(--text-sec)]">Active Cohorts</div>
              <div id="metric1" class="text-lg font-serif text-[var(--text-main)]">38 Batches</div>
            </div>
            <div class="p-3 rounded bg-[var(--card)] border border-[var(--border)]">
              <div class="text-[10px] text-[var(--text-sec)]">Total Students</div>
              <div id="metric2" class="text-lg font-serif text-[var(--text-main)]">4,129</div>
            </div>
            <div class="p-3 rounded bg-[var(--card)] border border-[var(--border)]">
              <div class="text-[10px] text-[var(--text-sec)]">Completion Rate</div>
              <div id="metric3" class="text-lg font-serif text-[var(--accent)]">88.4%</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'meditrack') {
    return `
      <div>
        <div class="flex justify-between items-center pb-4 border-b border-[var(--border)] mb-4">
          <div class="text-sm font-semibold text-[var(--text-main)]">Meditrack Point-of-Sale Billing & Search Sandbox</div>
          <span class="text-xs font-mono text-[var(--accent)]">SEARCH → RACK → BILL</span>
        </div>
        <div class="mb-4">
          <input type="text" id="medSearchInput" placeholder="Type medicine name (e.g., Atorvastatin, Paracetamol)..." class="w-full p-2.5 rounded border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)]" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="text-xs font-mono text-[var(--text-sec)] uppercase mb-2">Available Medicines</div>
            <div id="medList" class="space-y-2">
              <div class="med-item p-3 rounded border border-[var(--border)] bg-[var(--bg)] flex justify-between items-center" data-name="Atorvastatin 20mg" data-rack="Rack B-04" data-price="22.50">
                <div>
                  <div class="text-xs font-bold text-[var(--text-main)]">Atorvastatin 20mg</div>
                  <div class="text-[11px] text-[var(--accent)]">Shelf: Rack B-04 • Stock: 345</div>
                </div>
                <button class="add-med-btn px-3 py-1 rounded bg-[var(--accent)] text-[#170D13] text-xs font-bold">+ Add $22.50</button>
              </div>
              <div class="med-item p-3 rounded border border-[var(--border)] bg-[var(--bg)] flex justify-between items-center" data-name="Ibuprofen 400mg" data-rack="Rack A-12" data-price="15.00">
                <div>
                  <div class="text-xs font-bold text-[var(--text-main)]">Ibuprofen 400mg</div>
                  <div class="text-[11px] text-[var(--accent)]">Shelf: Rack A-12 • Stock: 180</div>
                </div>
                <button class="add-med-btn px-3 py-1 rounded bg-[var(--accent)] text-[#170D13] text-xs font-bold">+ Add $15.00</button>
              </div>
            </div>
          </div>
          <div class="p-4 rounded border border-[var(--border)] bg-[var(--card)]">
            <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">Active POS Billing Cart</div>
            <div id="cartItems" class="text-xs text-[var(--text-sec)] space-y-1 mb-3">Cart is empty. Select a medication to test.</div>
            <div class="border-t border-[var(--border)] pt-2 flex justify-between text-xs font-bold text-[var(--text-main)] mb-3">
              <span>Total Amount:</span>
              <span id="cartTotal">$0.00</span>
            </div>
            <button id="checkoutBtn" class="w-full py-2 rounded bg-[var(--accent)] text-[#170D13] text-xs font-bold">Process Payment & Print Bill</button>
            <div id="checkoutSuccess" class="hidden text-xs text-green-400 mt-2 text-center font-medium">Invoice generated & inventory updated!</div>
          </div>
        </div>
      </div>
    `;
  } else if (type === 'dscrm') {
    return `
      <div>
        <div class="flex justify-between items-center pb-4 border-b border-[var(--border)] mb-4">
          <div class="text-sm font-semibold text-[var(--text-main)]">DSCRM Pipeline & Requirement Ledger Sandbox</div>
          <span class="text-xs font-mono text-[var(--accent)]">PIPELINE UX</span>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="p-3 rounded border border-[var(--border)] bg-[var(--bg)]">
            <div class="text-[10px] text-[var(--text-sec)]">Total Pipeline</div>
            <div class="text-base font-serif text-[var(--text-main)]">$1,240,000</div>
          </div>
          <div class="p-3 rounded border border-[var(--border)] bg-[var(--bg)]">
            <div class="text-[10px] text-[var(--text-sec)]">Conversion Rate</div>
            <div class="text-base font-serif text-[var(--accent)]">24.5%</div>
          </div>
          <div class="p-3 rounded border border-[var(--border)] bg-[var(--bg)]">
            <div class="text-[10px] text-[var(--text-sec)]">Active Opportunities</div>
            <div class="text-base font-serif text-[var(--text-main)]">115 Deals</div>
          </div>
        </div>
        <div class="text-xs font-mono text-[var(--text-sec)] uppercase mb-2">Click Deal Card to Advance Stage:</div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" id="crmKanban">
          <div class="p-3 rounded border border-[var(--border)] bg-[var(--sec-bg)]" data-col="prospect">
            <div class="text-xs font-bold text-[var(--text-main)] mb-2">Prospecting (1)</div>
            <div class="crm-card p-2.5 rounded bg-[var(--card)] border border-[var(--border)] text-xs cursor-pointer hover:border-[var(--accent)] transition-colors" data-id="1">
              <div class="font-semibold text-[var(--text-main)]">Apex Corp — Custom Module</div>
              <div class="text-[11px] text-[var(--accent)] mt-1">$75,000 • In Progress</div>
            </div>
          </div>
          <div class="p-3 rounded border border-[var(--border)] bg-[var(--sec-bg)]" data-col="proposal">
            <div class="text-xs font-bold text-[var(--text-main)] mb-2">Proposal Sent (1)</div>
            <div class="crm-card p-2.5 rounded bg-[var(--card)] border border-[var(--border)] text-xs cursor-pointer hover:border-[var(--accent)] transition-colors" data-id="2">
              <div class="font-semibold text-[var(--text-main)]">Zenith Corp — Cloud API</div>
              <div class="text-[11px] text-[var(--accent)] mt-1">$120,000 • Review</div>
            </div>
          </div>
          <div class="p-3 rounded border border-[var(--border)] bg-[var(--sec-bg)]" data-col="won">
            <div class="text-xs font-bold text-[var(--text-main)] mb-2">Closed / Won (1)</div>
            <div class="crm-card p-2.5 rounded bg-[var(--card)] border border-[var(--border)] text-xs cursor-pointer hover:border-[var(--accent)] transition-colors" data-id="3">
              <div class="font-semibold text-[var(--text-main)]">Synergy Co — Mobile Suite</div>
              <div class="text-[11px] text-green-400 mt-1">$85,000 • Fulfilled</div>
            </div>
          </div>
        </div>
        <div class="text-[11px] text-[var(--text-sec)] mt-3">Interactive microinteraction: click any deal card above to test pipeline stage advancement.</div>
      </div>
    `;
  }
  return '';
}

function attachPrototypeHandlers(type) {
  if (type === 'dsjobby') {
    const filterChips = document.querySelectorAll('.filter-chip');
    const jobItems = document.querySelectorAll('.job-item');
    const applyBtns = document.querySelectorAll('.apply-btn');
    const drawer = document.getElementById('applicationDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const confirmApplyBtn = document.getElementById('confirmApplyBtn');
    const applyStatusMsg = document.getElementById('applyStatusMsg');
    const drawerJobTitle = document.getElementById('drawerJobTitle');

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => {
          c.classList.remove('bg-[var(--accent)]', 'text-[#170D13]', 'border-[var(--accent)]');
          c.classList.add('border-[var(--border)]', 'text-[var(--text-main)]');
        });
        chip.classList.add('bg-[var(--accent)]', 'text-[#170D13]', 'border-[var(--accent)]');
        chip.classList.remove('border-[var(--border)]', 'text-[var(--text-main)]');

        const filter = chip.getAttribute('data-filter');
        jobItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    applyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        drawerJobTitle.textContent = `Submitting for: ${title}`;
        drawer.classList.remove('hidden');
        applyStatusMsg.classList.add('hidden');
      });
    });

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => drawer.classList.add('hidden'));
    }
    if (confirmApplyBtn) {
      confirmApplyBtn.addEventListener('click', () => {
        applyStatusMsg.classList.remove('hidden');
      });
    }
  } else if (type === 'dsedify') {
    const roleBtns = document.querySelectorAll('.role-btn');
    const roleTitle = document.getElementById('roleTitle');
    const roleBadge = document.getElementById('roleBadge');
    const metric1 = document.getElementById('metric1');
    const metric2 = document.getElementById('metric2');
    const metric3 = document.getElementById('metric3');

    const roleData = {
      'Admin': { title: 'Admin Master Dashboard', badge: 'FULL ACCESS', m1: '38 Batches', m2: '4,129 Trainees', m3: '88.4%' },
      'Trainer': { title: 'Trainer Curriculum & Grading Desk', badge: 'INSTRUCTOR', m1: '6 Batches', m2: '142 Students', m3: '94.2% Attendance' },
      'Counselor': { title: 'Counselor Campus Retention Desk', badge: 'STUDENT CARE', m1: '12 Campuses', m2: '48 Inquiries', m3: '96% Resolution' },
      'Trainee': { title: 'Student Learning Workspace', badge: 'LEARNER VIEW', m1: '1 Active Cohort', m2: '14 Modules', m3: '82% Progress' }
    };

    roleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roleBtns.forEach(b => {
          b.classList.remove('bg-[var(--accent)]', 'text-[#170D13]', 'border-[var(--accent)]');
          b.classList.add('border-[var(--border)]', 'text-[var(--text-main)]');
        });
        btn.classList.add('bg-[var(--accent)]', 'text-[#170D13]', 'border-[var(--accent)]');
        btn.classList.remove('border-[var(--border)]', 'text-[var(--text-main)]');

        const role = btn.getAttribute('data-role');
        const data = roleData[role];
        if (data) {
          roleTitle.textContent = data.title;
          roleBadge.textContent = data.badge;
          metric1.textContent = data.m1;
          metric2.textContent = data.m2;
          metric3.textContent = data.m3;
        }
      });
    });
  } else if (type === 'meditrack') {
    const addBtns = document.querySelectorAll('.add-med-btn');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutSuccess = document.getElementById('checkoutSuccess');
    const searchInput = document.getElementById('medSearchInput');
    const medItems = document.querySelectorAll('.med-item');

    let total = 0;
    let itemsInCart = [];

    addBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.med-item');
        const name = parent.getAttribute('data-name');
        const rack = parent.getAttribute('data-rack');
        const price = parseFloat(parent.getAttribute('data-price'));

        itemsInCart.push({ name, rack, price });
        total += price;

        cartItems.innerHTML = itemsInCart.map(item => `
          <div class="flex justify-between border-b border-[var(--border)] pb-1 mb-1">
            <span>${item.name} <span class="text-[var(--accent)]">(${item.rack})</span></span>
            <span class="font-bold">$${item.price.toFixed(2)}</span>
          </div>
        `).join('');

        cartTotal.textContent = `$${total.toFixed(2)}`;
        checkoutSuccess.classList.add('hidden');
      });
    });

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (itemsInCart.length > 0) {
          checkoutSuccess.classList.remove('hidden');
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        medItems.forEach(item => {
          const name = item.getAttribute('data-name').toLowerCase();
          if (name.includes(query)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  } else if (type === 'dscrm') {
    const cards = document.querySelectorAll('.crm-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }
}

/* -------------------------------------------------------------
   06. MULTI-LAYER HERO PARALLAX ENGINE
------------------------------------------------------------- */
function initHeroParallax() {
  const heroSection = document.getElementById('top');
  if (!heroSection) return;

  const bgLayers = heroSection.querySelectorAll('.parallax-layer-bg');
  const floatingUI = heroSection.querySelectorAll('.parallax-floating-ui');
  const characterWrapper = heroSection.querySelector('.parallax-character-wrapper');
  const heroCharacterFrame = heroSection.querySelector('.hero-character-frame');
  const hero3dGlare = document.getElementById('hero3dGlare');
  const foregroundLayers = heroSection.querySelectorAll('.parallax-foreground');
  const textLayer = heroSection.querySelector('.parallax-text-layer');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 1024);

  // If user prefers reduced motion or is on mobile/touch, skip pointer parallax
  if (prefersReduced || isTouchDevice) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let scrollOffset = 0;
  let isHovered = false;
  let isHeroVisible = true;
  let rafId = null;

  // IntersectionObserver to avoid running calculations when hero is off-screen
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible && !rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    });
  }, { threshold: 0.05 });

  heroObserver.observe(heroSection);

  // Mouse move on hero
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    isHovered = true;
    // Calculate normalized pointer coordinates (-0.5 to 0.5)
    targetX = (e.clientX - rect.left) / rect.width - 0.5;
    targetY = (e.clientY - rect.top) / rect.height - 0.5;

    if (!rafId && isHeroVisible) {
      rafId = requestAnimationFrame(updateParallax);
    }
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    isHovered = false;
    targetX = 0;
    targetY = 0;
    if (hero3dGlare) {
      hero3dGlare.style.opacity = '0';
    }
  });

  // Subtle Scroll Parallax
  window.addEventListener('scroll', () => {
    if (!isHeroVisible) return;
    scrollOffset = window.scrollY;
    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  }, { passive: true });

  function updateParallax() {
    // Smooth lerp easing
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // Layer 1: Background Circles & Arcs (3–6px pointer translation, subtle scroll)
    bgLayers.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.035;
      const x = (currentX * 100 * speed).toFixed(2);
      const y = (currentY * 100 * speed + scrollOffset * 0.06).toFixed(2);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    // Layer 2: Floating UI Elements (6–12px pointer translation, independent speed factors)
    floatingUI.forEach(el => {
      const speedX = parseFloat(el.getAttribute('data-speed-x')) || 0.08;
      const speedY = parseFloat(el.getAttribute('data-speed-y')) || 0.08;
      const scrollSpeed = parseFloat(el.getAttribute('data-scroll-speed')) || 0.12;
      const x = (currentX * 100 * speedX).toFixed(2);
      const y = (currentY * 100 * speedY + scrollOffset * scrollSpeed).toFixed(2);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    // Layer 3: Character Illustration 3D Perspective Tilt & Lighting
    if (characterWrapper) {
      const speed = parseFloat(characterWrapper.getAttribute('data-speed')) || 0.025;
      const x = (currentX * 100 * speed).toFixed(2);
      const y = (currentY * 100 * speed).toFixed(2);
      characterWrapper.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    if (heroCharacterFrame) {
      // 3D rotation angles (rotateX tilts vertically, rotateY tilts horizontally)
      const tiltX = (-currentY * 16).toFixed(2);
      const tiltY = (currentX * 20).toFixed(2);
      heroCharacterFrame.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(14px)`;

      // Dynamic reactive 3D contact shadow offset
      const shadowX = (-currentX * 26).toFixed(1);
      const shadowY = (24 - currentY * 20).toFixed(1);
      const isLight = document.body.classList.contains('theme-light');
      if (isLight) {
        heroCharacterFrame.style.boxShadow = `${shadowX}px ${shadowY}px 50px -10px rgba(104, 70, 61, 0.22), ${(shadowX * 0.4).toFixed(1)}px ${(shadowY * 0.4).toFixed(1)}px 24px -6px rgba(239, 175, 152, 0.3)`;
      } else {
        heroCharacterFrame.style.boxShadow = `${shadowX}px ${shadowY}px 55px -10px rgba(0, 0, 0, 0.7), ${(shadowX * 0.4).toFixed(1)}px ${(shadowY * 0.4).toFixed(1)}px 24px -6px rgba(217, 138, 122, 0.22)`;
      }
    }

    // Dynamic 3D Specular Sheen Glare reflection
    if (hero3dGlare) {
      if (isHovered && (Math.abs(currentX) > 0.005 || Math.abs(currentY) > 0.005)) {
        const glareX = ((currentX + 0.5) * 100).toFixed(1);
        const glareY = ((currentY + 0.5) * 100).toFixed(1);
        hero3dGlare.style.opacity = '0.45';
        hero3dGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 65%)`;
      } else {
        hero3dGlare.style.opacity = '0';
      }
    }

    // Layer 4: Foreground Accents (8–14px pointer translation, distinct direction)
    foregroundLayers.forEach(el => {
      const speedX = parseFloat(el.getAttribute('data-speed-x')) || -0.12;
      const speedY = parseFloat(el.getAttribute('data-speed-y')) || -0.11;
      const x = (currentX * 100 * speedX).toFixed(2);
      const y = (currentY * 100 * speedY).toFixed(2);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    // Layer 5: Text and Buttons (minimal 1–2px translation)
    if (textLayer) {
      const x = (currentX * 22).toFixed(2);
      const y = (currentY * 22).toFixed(2);
      textLayer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    // Continue loop if moving or hovered, otherwise stop to conserve energy
    const isMoving = Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001;
    if (isMoving || isHovered) {
      rafId = requestAnimationFrame(updateParallax);
    } else {
      rafId = null;
    }
  }
}

/* -------------------------------------------------------------
   09. SELECTED WORK — PROJECT CAROUSEL CONTROLLER & ANIMATIONS
------------------------------------------------------------- */
function initSelectedWorkShowcase() {
  const deckStage = document.getElementById('cardsDeckStage');
  if (!deckStage) return;

  // Prevent duplicate listener bindings when returning from case study views
  if (deckStage._isDeckInitialized) {
    if (typeof deckStage._refreshDeck === 'function') {
      deckStage._refreshDeck();
    }
    return;
  }
  deckStage._isDeckInitialized = true;

  const cards = Array.from(deckStage.querySelectorAll('.destination-card'));
  if (!cards || cards.length === 0) return;

  const prevBtn = document.getElementById('deckPrevBtn');
  const nextBtn = document.getElementById('deckNextBtn');
  const counterText = document.getElementById('deckCounterText');
  const pillBtns = Array.from(document.querySelectorAll('#deckPillNav .deck-pill-btn'));

  const totalCards = cards.length;
  let currentIndex = 0;
  let isAnimating = false;

  const projectsMeta = [
    { id: 'dsedify', name: 'DSEdify', num: '01' },
    { id: 'ds-jobby', name: 'DSJobby', num: '02' },
    { id: 'meditrack', name: 'MediTrack', num: '03' },
    { id: 'dscrm', name: 'DSCRM', num: '04' }
  ];

  function syncMeta() {
    // Update top pill buttons if present
    pillBtns.forEach((pill, i) => {
      const isActive = i === currentIndex;
      pill.classList.toggle('active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update active project counter
    if (counterText && projectsMeta[currentIndex]) {
      const cur = projectsMeta[currentIndex];
      counterText.textContent = `${cur.num} / 04 · ${cur.name}`;
    }
  }

  function applyDeckPositions() {
    cards.forEach((card, i) => {
      const pos = (i - currentIndex + totalCards) % totalCards;
      card.setAttribute('data-deck-pos', pos);
      card.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      card.classList.remove('anim-exit-next', 'anim-exit-prev', 'is-dragging', 'is-swiping-down');
      card.style.transform = '';
      card.style.transition = '';
      card.style.opacity = '';
      card.style.pointerEvents = '';
    });
  }

  function goToProject(targetIndex, direction = null) {
    if (isAnimating) return;

    const nextIndex = ((targetIndex % totalCards) + totalCards) % totalCards;
    if (nextIndex === currentIndex && direction !== null) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Instant switch if no direction or reduced-motion
    if (!direction || prefersReduced) {
      currentIndex = nextIndex;
      applyDeckPositions();
      syncMeta();
      return;
    }

    isAnimating = true;
    const activeCard = cards.find(c => c.getAttribute('data-deck-pos') === '0');

    if (activeCard) {
      if (direction === 'next') {
        activeCard.classList.add('anim-exit-next');
      } else {
        activeCard.classList.add('anim-exit-prev');
      }
    }

    currentIndex = nextIndex;

    // Step cards behind forward
    cards.forEach((card, i) => {
      if (card === activeCard) return;
      const newPos = (i - currentIndex + totalCards) % totalCards;
      card.setAttribute('data-deck-pos', newPos);
      card.setAttribute('aria-hidden', newPos === 0 ? 'false' : 'true');
    });

    syncMeta();

    setTimeout(() => {
      applyDeckPositions();
      isAnimating = false;
    }, 500);
  }

  // Smooth drag exit and advance function
  function animateCardExitAndAdvance(card, exitSide, startX, startY, nextIdx) {
    isAnimating = true;
    const cardWidth = card.offsetWidth || 340;
    const exitX = exitSide === 'left' ? -Math.max(cardWidth * 1.3, 380) : Math.max(cardWidth * 1.3, 380);
    const exitRot = exitSide === 'left' ? -15 : 15;

    // Apply continuous glide from current finger position
    card.style.transition = 'transform 0.42s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.36s ease';
    card.style.transform = `translate3d(${exitX}px, ${startY * 1.2}px, 0px) rotate(${exitRot}deg) scale(0.92)`;
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';

    // In parallel, advance deck index and bring rear cards forward smoothly
    currentIndex = ((nextIdx % totalCards) + totalCards) % totalCards;

    cards.forEach((c, i) => {
      if (c === card) return;
      const newPos = (i - currentIndex + totalCards) % totalCards;
      c.setAttribute('data-deck-pos', newPos);
      c.setAttribute('aria-hidden', newPos === 0 ? 'false' : 'true');
    });

    syncMeta();

    setTimeout(() => {
      applyDeckPositions();
      isAnimating = false;
    }, 450);
  }

  // Smooth snap back when drag is insufficient
  function snapCardBack(card) {
    isAnimating = true;
    card.style.transition = 'transform 0.34s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.28s ease';
    card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
    card.style.opacity = '1';

    setTimeout(() => {
      card.style.transition = '';
      card.style.transform = '';
      card.style.opacity = '';
      card.classList.remove('is-dragging');
      isAnimating = false;
    }, 350);
  }

  // Next Arrow Button (Right)
  if (nextBtn) {
    nextBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      goToProject(currentIndex + 1, 'next');
    };
  }

  // Prev Arrow Button (Left)
  if (prevBtn) {
    prevBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      goToProject(currentIndex - 1, 'prev');
    };
  }

  // Quick-switch Top Pills
  pillBtns.forEach((pill) => {
    pill.onclick = function(e) {
      e.preventDefault();
      const targetIdx = parseInt(pill.getAttribute('data-deck-index'), 10);
      if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
        const dir = targetIdx > currentIndex ? 'next' : 'prev';
        goToProject(targetIdx, dir);
      }
    };
  });

  // Clicking on any layered card behind directly brings it to the foreground
  cards.forEach((card, i) => {
    card.onclick = function(e) {
      const pos = parseInt(card.getAttribute('data-deck-pos'), 10);
      if (pos > 0) {
        e.preventDefault();
        e.stopPropagation();
        goToProject(i, 'next');
      }
    };
  });

  // Keyboard navigation when focusing on the carousel or inside #work section
  const workSection = document.getElementById('work');
  if (workSection && !workSection.dataset.keysBound) {
    workSection.dataset.keysBound = 'true';
    workSection.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToProject(currentIndex + 1, 'next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToProject(currentIndex - 1, 'prev');
      }
    });
  }

  // Touch & Pointer Drag Gestures for direct swipe interaction
  let isTracking = false;
  let isDragging = false;
  let directionLocked = false;
  let startX = 0;
  let startY = 0;
  let currentDragX = 0;
  let currentDragY = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocityX = 0;
  let activePointerId = null;
  let currentDragCard = null;

  deckStage.addEventListener('pointerdown', (e) => {
    if (isAnimating) return;

    // Ignore secondary pointers if already dragging
    if (isTracking || isDragging) return;

    // Do not intercept interactive elements (links, buttons)
    if (e.target.closest('a, button, [role="button"], input, textarea')) return;

    // Only start drag on the front card
    const frontCard = cards.find(c => c.getAttribute('data-deck-pos') === '0');
    if (!frontCard || !frontCard.contains(e.target)) return;

    isTracking = true;
    isDragging = false;
    directionLocked = false;
    startX = e.clientX;
    startY = e.clientY;
    lastX = e.clientX;
    lastTime = performance.now();
    velocityX = 0;
    currentDragX = 0;
    currentDragY = 0;
    activePointerId = e.pointerId;
    currentDragCard = frontCard;
  }, { passive: true });

  deckStage.addEventListener('pointermove', (e) => {
    if (!isTracking || !currentDragCard || (activePointerId !== null && e.pointerId !== activePointerId)) return;

    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;

    // Determine direction before locking gesture
    if (!directionLocked) {
      const dist = Math.hypot(diffX, diffY);
      if (dist < 7) {
        return; // Small deadband to prevent jitter
      }

      // If vertical movement dominates, cancel card drag and allow page scroll
      if (Math.abs(diffY) > Math.abs(diffX)) {
        isTracking = false;
        isDragging = false;
        currentDragCard = null;
        activePointerId = null;
        return;
      }

      // Horizontal gesture confirmed: lock to card drag
      directionLocked = true;
      isDragging = true;
      currentDragCard.classList.add('is-dragging');
      try {
        currentDragCard.setPointerCapture(e.pointerId);
      } catch (err) {}
    }

    if (!isDragging) return;

    // Prevent scrolling while actively dragging horizontal card
    if (e.cancelable) e.preventDefault();

    // Track velocity
    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 8) {
      velocityX = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastTime = now;
    }

    currentDragX = diffX;
    currentDragY = diffY * 0.22; // subtle vertical follow

    const cardWidth = currentDragCard.offsetWidth || 340;
    const rotation = (currentDragX / cardWidth) * 14;

    currentDragCard.style.transition = 'none';
    currentDragCard.style.transform = `translate3d(${currentDragX}px, ${currentDragY}px, 0px) rotate(${rotation}deg) scale(0.99)`;
  });

  function handlePointerEnd(e) {
    if (!isTracking || (activePointerId !== null && e.pointerId !== activePointerId)) return;

    const card = currentDragCard;
    const wasDragging = isDragging;

    // Reset tracking state
    isTracking = false;
    isDragging = false;
    directionLocked = false;
    activePointerId = null;
    currentDragCard = null;

    if (!card) return;

    try {
      if (card.hasPointerCapture && card.hasPointerCapture(e.pointerId)) {
        card.releasePointerCapture(e.pointerId);
      }
    } catch (err) {}

    card.classList.remove('is-dragging');

    if (!wasDragging) {
      // Tap without drag: reset any inline styles
      card.style.transform = '';
      card.style.transition = '';
      return;
    }

    const cardWidth = card.offsetWidth || 340;
    const threshold = Math.min(cardWidth * 0.22, 70);
    const isQuickSwipe = Math.abs(velocityX) > 0.42 && Math.abs(currentDragX) > 22;
    const isExceeded = Math.abs(currentDragX) > threshold;

    if (isExceeded || isQuickSwipe) {
      if (currentDragX < 0) {
        // Dragged Left -> Advance to Next project
        animateCardExitAndAdvance(card, 'left', currentDragX, currentDragY, currentIndex + 1);
      } else {
        // Dragged Right -> Return to Previous project
        animateCardExitAndAdvance(card, 'right', currentDragX, currentDragY, currentIndex - 1);
      }
    } else {
      // Drag insufficient: smoothly snap back
      snapCardBack(card);
    }
  }

  deckStage.addEventListener('pointerup', handlePointerEnd);
  deckStage.addEventListener('pointercancel', handlePointerEnd);

  // Expose refresh function on the stage so case study return can re-sync
  deckStage._refreshDeck = function() {
    applyDeckPositions();
    syncMeta();
  };

  // Initial synchronization
  applyDeckPositions();
  syncMeta();
}

window.initSelectedWorkShowcase = initSelectedWorkShowcase;