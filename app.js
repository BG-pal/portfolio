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
  const savedTheme = localStorage.getItem('pallavi_theme') || 'theme-dark';
  
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
      <a href="#work" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity">
        ← BACK TO SELECTED WORK
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
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
    <div class="border-b border-[var(--border)] pb-6 mb-12 flex justify-between items-center">
      <a href="#work" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity">
        ← BACK TO SELECTED WORK
      </a>
      <div class="flex items-center gap-3">
        <a href="https://www.dsjobby.com/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent)] hover:underline">
          <span>Visit dsjobby.com</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
        <span class="text-[var(--text-sec)] hidden sm:inline">·</span>
        <div class="text-xs font-mono text-[var(--text-sec)] hidden sm:inline">
          PROJECT 002 OF 04
        </div>
      </div>
    </div>

    <!-- Project Header & Compact Information Area (Section 4) -->
    <div class="mb-16">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider">
          <span>PROJECT 002</span>
          <span>•</span>
          <span>CASE STUDY</span>
        </div>
        <a 
          href="https://www.dsjobby.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[#170D13] font-bold text-xs hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
        >
          <span>Visit Live Website</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>

      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--text-main)] font-bold mb-4 tracking-tight">
        DSJobby — Job Portal and Recruitment Platform
      </h1>
      <p class="text-base sm:text-xl text-[var(--text-sec)] max-w-3xl mb-8 leading-relaxed font-light">
        Connecting job seekers with permanent employment opportunities and accelerating corporate talent sourcing through structured workflows and pre-screened talent pipelines.
      </p>

      <!-- Compact Project Information Grid with Direct Live Link -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Project Name</div>
          <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">DSJobby</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">My Role</div>
          <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">UX and UI Designer</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Platform</div>
          <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">Web Application (Desktop &amp; Mobile)</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Product Category</div>
          <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">Job Portal &amp; Recruitment Platform</div>
        </div>
        <div class="col-span-2">
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Design Focus</div>
          <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">Candidate Job Discovery &amp; Recruiter Sourcing Workflow</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Tools &amp; Methods</div>
          <div class="text-xs sm:text-sm font-semibold text-[var(--text-main)]">Figma, Design Tokens, Responsive Systems</div>
        </div>
        <div>
          <div class="text-[10px] font-mono text-[var(--text-sec)] uppercase tracking-wider mb-1">Live Website</div>
          <a href="https://www.dsjobby.com/" target="_blank" rel="noopener noreferrer" class="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1">
            <span>dsjobby.com</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- ========================================================
         A. PROJECT OVERVIEW
         ======================================================== -->
    <section class="mb-20 border-t border-[var(--border)] pt-12" id="cs-dsjobby-overview">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>01</span>
        <span>—</span>
        <span>A. PROJECT OVERVIEW</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        Purpose, Placement Model &amp; Audience
      </h2>
      <div class="prose max-w-3xl text-sm sm:text-base text-[var(--text-sec)] leading-relaxed space-y-4 mb-8">
        <p>
          <strong>DSJobby</strong> is the talent acquisition and placement solutions platform of <strong>Dyashin Technosoft</strong>. In contrast to high-churn freelance marketplaces or temporary gig sites, DSJobby specializes exclusively in <strong>100% full-time permanent staffing</strong>.
        </p>
        <p>
          The platform operates as a dual-sided ecosystem: bridging qualified professionals with long-term employment opportunities across IT, Engineering, Finance, and Healthcare, while providing enterprise recruitment teams with verified, interview-ready candidate profiles backed by strict service-level agreements (SLAs).
        </p>
      </div>

      <!-- Verified Platform Metrics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-2xl sm:text-3xl font-serif font-bold text-[var(--accent)]">300+</div>
          <div class="text-xs font-semibold text-[var(--text-main)] mt-1">Hiring Companies</div>
          <div class="text-[11px] text-[var(--text-sec)] mt-0.5">From high-growth tech startups to enterprise leaders.</div>
        </div>
        <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-2xl sm:text-3xl font-serif font-bold text-[var(--accent)]">50,000+</div>
          <div class="text-xs font-semibold text-[var(--text-main)] mt-1">Pre-Screened Talent</div>
          <div class="text-[11px] text-[var(--text-sec)] mt-0.5">Vetted, interview-ready candidate repository.</div>
        </div>
        <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-2xl sm:text-3xl font-serif font-bold text-[var(--accent)]">24 Hours</div>
          <div class="text-xs font-semibold text-[var(--text-main)] mt-1">SLA Profile Delivery</div>
          <div class="text-[11px] text-[var(--text-sec)] mt-0.5">Guaranteed candidate turnaround for active requisitions.</div>
        </div>
        <div class="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-2xl sm:text-3xl font-serif font-bold text-[var(--accent)]">100%</div>
          <div class="text-xs font-semibold text-[var(--text-main)] mt-1">Permanent Roles</div>
          <div class="text-[11px] text-[var(--text-sec)] mt-0.5">Zero gig or contract churn; long-term career focus.</div>
        </div>
      </div>

      <!-- Primary Website Navigation Card (Direct navigation to dsjobby.com) -->
      <a 
        href="https://www.dsjobby.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 hover:border-[var(--accent)] transition-all group shadow-lg cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--sec-bg)] text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Website Platform
            </div>
            <h3 class="text-xl sm:text-2xl font-serif text-[var(--text-main)] font-bold group-hover:text-[var(--accent)] transition-colors flex items-center gap-2">
              <span>Explore the Live DSJobby Platform</span>
              <span class="text-sm font-mono text-[var(--accent)]">↗</span>
            </h3>
            <p class="text-xs sm:text-sm text-[var(--text-sec)] max-w-xl leading-relaxed">
              Navigate directly to the official production website to experience the actual candidate search experience, permanent job listings, and recruiter talent sourcing portal.
            </p>
            <div class="text-xs font-mono text-[var(--accent)] pt-1 flex items-center gap-2">
              <span>https://www.dsjobby.com/</span>
              <span class="text-[10px] text-[var(--text-sec)] font-sans">· Click to open website</span>
            </div>
          </div>
          <div class="shrink-0">
            <div class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[#170D13] text-xs sm:text-sm font-bold tracking-wide group-hover:opacity-90 group-hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md">
              <span>Visit dsjobby.com</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
          </div>
        </div>
      </a>
    </section>

    <!-- ========================================================
         B. PRODUCT AND USER GROUPS
         ======================================================== -->
    <section class="mb-20 border-t border-[var(--border)] pt-12" id="cs-dsjobby-users">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>02</span>
        <span>—</span>
        <span>B. PRODUCT &amp; USER GROUPS</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        Serving Two Interconnected User Ecosystems
      </h2>
      <p class="text-sm sm:text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-8">
        The user experience required clear differentiation between job seekers seeking long-term stability and corporate recruiters seeking qualified, vetted talent quickly.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- User Group 1: Job Seekers -->
        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
              <span class="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
              User Group 01
            </div>
            <h3 class="text-xl font-serif text-[var(--text-main)] font-bold mb-2">Job Seekers</h3>
            <p class="text-xs text-[var(--text-sec)] leading-relaxed mb-4">
              People actively exploring full-time permanent career opportunities, presenting their technical and functional qualifications, and seeking transparent, verified roles.
            </p>
            <div class="space-y-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--text-sec)]">
              <div class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold">✓</span>
                <span><strong>Fast Role Discovery:</strong> Filter by domain, salary range, experience, and location without pagination friction.</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold">✓</span>
                <span><strong>Contextual Application:</strong> Submit resumes directly via a persistent slide-out drawer without losing search context.</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold">✓</span>
                <span><strong>Career Support:</strong> Free mock interviews, resume critique, and automated skill-to-job matching alerts.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- User Group 2: Employers and Recruiters -->
        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
              <span class="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
              User Group 02
            </div>
            <h3 class="text-xl font-serif text-[var(--text-main)] font-bold mb-2">Employers &amp; Recruiters</h3>
            <p class="text-xs text-[var(--text-sec)] leading-relaxed mb-4">
              Talent acquisition teams, HR leaders, and hiring managers looking to fill critical permanent requisitions with thoroughly vetted, interview-ready professionals.
            </p>
            <div class="space-y-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--text-sec)]">
              <div class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold">✓</span>
                <span><strong>Pre-Screened Candidates:</strong> Instant access to an active talent pool of 50,000+ candidates vetted for core technical competencies.</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold">✓</span>
                <span><strong>24-Hour SLA Delivery:</strong> Guaranteed candidate submission turnaround to eliminate prolonged hiring bottlenecks.</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-[var(--accent)] font-bold">✓</span>
                <span><strong>Risk Mitigation:</strong> Optional comprehensive background verification (BGV) and candidate replacement warranty.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Direct Website Navigation Callout -->
      <div class="p-5 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0"></span>
          <span class="text-[var(--text-sec)]">
            Explore both candidate role discovery and employer mandate submission live on the production website.
          </span>
        </div>
        <a 
          href="https://www.dsjobby.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-[#170D13] font-semibold text-xs hover:opacity-90 transition-all shrink-0 shadow-sm"
        >
          <span>Open Portals on dsjobby.com</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </section>

    <!-- ========================================================
         C. KEY PRODUCT CAPABILITIES
         ======================================================== -->
    <section class="mb-20 border-t border-[var(--border)] pt-12" id="cs-dsjobby-capabilities">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>03</span>
        <span>—</span>
        <span>C. KEY PRODUCT CAPABILITIES</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        Verified Core Functionality &amp; Workflows
      </h2>
      <p class="text-sm sm:text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-8">
        Based strictly on the verified capabilities of the live website, DSJobby integrates candidate self-service with recruiter sourcing tools:
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-3 font-mono text-xs font-bold">01</div>
          <h4 class="text-sm font-semibold text-[var(--text-main)] mb-1.5">Job Discovery &amp; Applications</h4>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">Multi-facet role exploration by domain, location, experience tier, and verified permanent compensation.</p>
        </div>
        <div class="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-3 font-mono text-xs font-bold">02</div>
          <h4 class="text-sm font-semibold text-[var(--text-main)] mb-1.5">Contextual Slide-Out Drawer</h4>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">Instant resume submission modal preserving search filters and candidate scroll position without redirects.</p>
        </div>
        <div class="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-3 font-mono text-xs font-bold">03</div>
          <h4 class="text-sm font-semibold text-[var(--text-main)] mb-1.5">AI-Powered Skill Matching</h4>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">Algorithmic alignment matching candidate profile competencies directly against employer job descriptions.</p>
        </div>
        <div class="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div class="w-8 h-8 rounded-lg bg-[var(--sec-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-3 font-mono text-xs font-bold">04</div>
          <h4 class="text-sm font-semibold text-[var(--text-main)] mb-1.5">Recruiter Talent Sourcing</h4>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">24-hour SLA profile turnaround, technical pre-screening reports, and background verification management.</p>
        </div>
      </div>

      <!-- Direct Website Navigation Callout -->
      <div class="p-5 rounded-xl border border-[var(--border)] bg-[var(--sec-bg)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0"></span>
          <span class="text-[var(--text-sec)]">
            All capabilities are live and operational on the production web application.
          </span>
        </div>
        <a 
          href="https://www.dsjobby.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-[#170D13] font-semibold text-xs hover:opacity-90 transition-all shrink-0 shadow-sm"
        >
          <span>View Active Jobs on dsjobby.com</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </section>

    <!-- ========================================================
         D. DESIGN DECISIONS
         ======================================================== -->
    <section class="mb-20 border-t border-[var(--border)] pt-12" id="cs-dsjobby-decisions">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>04</span>
        <span>—</span>
        <span>D. DESIGN DECISIONS</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        Evidence-Based UX &amp; Architectural Choices
      </h2>
      <p class="text-sm sm:text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-8">
        Each interface decision was guided by usability evidence from portal behavior and corporate recruitment friction:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">Decision 01</div>
          <h3 class="text-lg font-serif text-[var(--text-main)] font-bold mb-2">Dual-Journey Separation</h3>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">
            Rather than blending candidate search with employer lead forms on a single chaotic landing page, the global navigation establishes clear, isolated entry paths: "Find Jobs" vs. "Hire Talent". This immediately streamlines information scent.
          </p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">Decision 02</div>
          <h3 class="text-lg font-serif text-[var(--text-main)] font-bold mb-2">Slide-Out Application Drawer</h3>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">
            Traditional job boards redirect applicants to 3-step external pages, causing high candidate drop-off. DSJobby employs a contextual right-hand drawer modal that preserves search filter state and allows quick resume submission in under 60 seconds.
          </p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">Decision 03</div>
          <h3 class="text-lg font-serif text-[var(--text-main)] font-bold mb-2">Scannable Job Card Hierarchy</h3>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">
            Card anatomy prioritizes the 4 most critical decision factors: Role Title, Transparent Salary Range, Company Pedigree, and Work Model (Onsite/Remote). Secondary metadata is collapsed into clean, accessible pills.
          </p>
        </div>
        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">Decision 04</div>
          <h3 class="text-lg font-serif text-[var(--text-main)] font-bold mb-2">WCAG 2.1 AA Editorial Palette</h3>
          <p class="text-xs text-[var(--text-sec)] leading-relaxed">
            Engineered a warm editorial palette (warm cream, blush, muted coral #D98A7A, dark charcoal #170D13) that satisfies WCAG 2.1 AA contrast requirements, preventing eye fatigue during lengthy candidate application sessions.
          </p>
        </div>
      </div>
    </section>

    <!-- ========================================================
         E. MY CONTRIBUTION
         ======================================================== -->
    <section class="mb-20 border-t border-[var(--border)] pt-12" id="cs-dsjobby-contribution">
      <div class="flex items-center gap-2 text-xs tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">
        <span>05</span>
        <span>—</span>
        <span>E. MY CONTRIBUTION</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-serif text-[var(--text-main)] font-bold mb-4">
        Design Ownership &amp; Scope Distinction
      </h2>
      <p class="text-sm sm:text-base text-[var(--text-sec)] leading-relaxed max-w-3xl mb-8">
        A concise, verified breakdown of my design responsibilities, distinguishing personal UI/UX deliverables from the live commercial recruitment platform:
      </p>

      <!-- Ownership Matrix -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--accent)] uppercase mb-2">My Design Responsibilities</div>
          <h3 class="text-base font-serif text-[var(--text-main)] font-bold mb-4">What I Designed &amp; Delivered</h3>
          <ul class="space-y-2.5 text-xs text-[var(--text-sec)]">
            <li class="flex items-start gap-2">
              <span class="text-[var(--accent)] font-bold">✓</span>
              <span><strong>Dual-Journey UX Architecture:</strong> User journey mapping for job seekers and corporate recruiters.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[var(--accent)] font-bold">✓</span>
              <span><strong>Figma Design System:</strong> Tokenized component library (Job Cards, Salary Tags, Modal Drawer, Filter Chips) adhering to 8pt spatial grid.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[var(--accent)] font-bold">✓</span>
              <span><strong>Multi-Viewport Layouts:</strong> Responsive layouts for Desktop (1440px), Tablet (768px), and Mobile (375px).</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[var(--accent)] font-bold">✓</span>
              <span><strong>Interactive Prototyping:</strong> Usability validation for the contextual slide-out application flow.</span>
            </li>
          </ul>
        </div>

        <div class="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div class="text-xs font-mono text-[var(--text-sec)] uppercase mb-2">Platform &amp; Commercial Scope</div>
          <h3 class="text-base font-serif text-[var(--text-main)] font-bold mb-4">Operated by Dyashin Technosoft</h3>
          <ul class="space-y-2.5 text-xs text-[var(--text-sec)]">
            <li class="flex items-start gap-2">
              <span class="text-[var(--text-sec)]">•</span>
              <span><strong>Candidate Database Management:</strong> Maintenance and screening of 50,000+ candidate talent pool.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[var(--text-sec)]">•</span>
              <span><strong>Corporate SLA Fulfillment:</strong> 24-hour candidate profile turnaround and placement guarantees.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[var(--text-sec)]">•</span>
              <span><strong>Commercial Staffing Agreements:</strong> Permanent recruitment contracts with 300+ hiring organizations.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[var(--text-sec)]">•</span>
              <span><strong>Production Engineering:</strong> Backend microservices, database storage, and AI parsing deployment.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Final CTA Link to Live Website -->
      <div class="p-6 sm:p-8 rounded-2xl border border-[var(--accent)] bg-[var(--card)] text-center space-y-3 shadow-lg">
        <h3 class="text-lg sm:text-2xl font-serif text-[var(--text-main)] font-bold">
          Ready to experience DSJobby?
        </h3>
        <p class="text-xs sm:text-sm text-[var(--text-sec)] max-w-md mx-auto leading-relaxed">
          Visit the official live website to explore active jobs, candidate profiles, and corporate recruitment services.
        </p>
        <div class="pt-2">
          <a 
            href="https://www.dsjobby.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-[#170D13] font-bold text-xs sm:text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
          >
            <span>Navigate to dsjobby.com</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Explore More Work Section -->
    ${renderExploreMoreWork('ds-jobby')}
  `;

}

function renderMeditrackCaseStudy(project, container) {
  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div class="border-b border-[var(--border)] pb-6 mb-12 flex justify-between items-center">
      <a href="#work" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity">
        ← BACK TO SELECTED WORK
      </a>
      <div class="text-xs font-mono text-[var(--text-sec)]">
        PROJECT 003 OF 04
      </div>
    </div>

    <!-- 01 — Overview & Product Showcase (Two-Column Layout) -->
    <div class="mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            PRODUCT DESIGN · SAAS · MOBILE
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight">
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
        <div class="lg:col-span-7 flex justify-center items-center">
          <div class="w-full max-w-sm sm:max-w-md relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[280px] h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[240px] h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner overflow-hidden">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels (Sized to fit section height) -->
              <div class="relative rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center shrink-0">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-14 h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges -->
                <div class="absolute -left-[2.5px] top-14 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -left-[2.5px] top-22 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -right-[2.5px] top-16 w-[2.5px] h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10"></div>

                <!-- Inner Screen Area (Constrained height fitting section height, exact 1080/2340 aspect ratio) -->
                <div 
                  class="relative rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer h-[380px] sm:h-[410px] md:h-[440px] lg:h-[450px] xl:h-[470px] w-auto max-w-full"
                  style="aspect-ratio: 1080 / 2340;"
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
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play mobile walkthrough"
                  >
                    <div class="w-12 h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center gap-2 text-[10px] font-mono text-[var(--text-sec)]">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>375 × 812 · Mobile Assistant App</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer -->
            <div class="flex justify-between items-center w-full px-1 pt-2.5 text-[11px] text-[var(--text-sec)] font-mono">
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>LIVE MOBILE WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)]">Pharmacy Mobile Walkthrough</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 01.B — Inventory Management & Billing Workflow -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            INVENTORY MANAGEMENT · BILLING WORKFLOW
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight">
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
        <div class="lg:col-span-7 flex justify-center items-center">
          <div class="w-full max-w-sm sm:max-w-md relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[280px] h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[240px] h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner overflow-hidden">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels -->
              <div class="relative rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center shrink-0">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-14 h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges -->
                <div class="absolute -left-[2.5px] top-14 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -left-[2.5px] top-22 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -right-[2.5px] top-16 w-[2.5px] h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10"></div>

                <!-- Inner Screen Area (Constrained height fitting section height, exact 1080/2340 aspect ratio) -->
                <div 
                  class="relative rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer h-[380px] sm:h-[410px] md:h-[440px] lg:h-[450px] xl:h-[470px] w-auto max-w-full"
                  style="aspect-ratio: 1080 / 2340;"
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
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackInventoryPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play inventory walkthrough"
                  >
                    <div class="w-12 h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center gap-2 text-[10px] font-mono text-[var(--text-sec)]">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>375 × 812 · Mobile Stock &amp; Billing</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer -->
            <div class="flex justify-between items-center w-full px-1 pt-2.5 text-[11px] text-[var(--text-sec)] font-mono">
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>INVENTORY &amp; BILLING WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)]">Pharmacy Mobile Walkthrough</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 01.C — Billing & Checkout Workflow -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            POINT OF SALE · BILLING WORKFLOW
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight">
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
        <div class="lg:col-span-7 flex justify-center items-center">
          <div class="w-full max-w-sm sm:max-w-md relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[280px] h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[240px] h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner overflow-hidden">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels -->
              <div class="relative rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center shrink-0">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-14 h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges -->
                <div class="absolute -left-[2.5px] top-14 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -left-[2.5px] top-22 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -right-[2.5px] top-16 w-[2.5px] h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10"></div>

                <!-- Inner Screen Area (Constrained height fitting section height, exact 1080/2340 aspect ratio) -->
                <div 
                  class="relative rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer h-[380px] sm:h-[410px] md:h-[440px] lg:h-[450px] xl:h-[470px] w-auto max-w-full"
                  style="aspect-ratio: 1080 / 2340;"
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
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackBillingPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play billing walkthrough"
                  >
                    <div class="w-12 h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center gap-2 text-[10px] font-mono text-[var(--text-sec)]">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>375 × 812 · Mobile Billing &amp; Checkout</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer -->
            <div class="flex justify-between items-center w-full px-1 pt-2.5 text-[11px] text-[var(--text-sec)] font-mono">
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>BILLING &amp; CHECKOUT WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)]">Pharmacy Mobile Walkthrough</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 01.D — Smart Store Mapping & Medicine Locator -->
    <div class="mb-20 border-t border-[var(--border)] pt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left Column (45% ~ lg:col-span-5) -->
        <div class="lg:col-span-5 flex flex-col items-start justify-center">
          <div class="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 font-semibold">
            STORE MAPPING · MEDICINE DISCOVERY
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--text-main)] font-bold mb-3 tracking-tight">
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
        <div class="lg:col-span-7 flex justify-center items-center">
          <div class="w-full max-w-sm sm:max-w-md relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 sm:p-4 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
            
            <!-- Subtle Ambient Glow Backdrop -->
            <div class="absolute w-[280px] h-[280px] rounded-full bg-[var(--accent)]/15 blur-[80px] pointer-events-none -top-10 -right-10"></div>
            <div class="absolute w-[240px] h-[240px] rounded-full bg-[#ff7a59]/10 blur-[70px] pointer-events-none -bottom-8 -left-8"></div>

            <!-- Inner Card Framing Canvas (Terracotta / Warm Burgundy tone) -->
            <div class="relative w-full rounded-xl bg-gradient-to-b from-[#341b23] via-[#24131b] to-[#1a0c14] border border-white/5 py-3 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center shadow-inner overflow-hidden">
              
              <!-- Phone Exterior Chassis with titanium rim & bezels -->
              <div class="relative rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2d1f2a] via-[#1a1118] to-[#120910] border-2 border-[var(--border)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/80 flex flex-col items-center shrink-0">
                
                <!-- Top Speaker / Dynamic Island on Outer Bezel -->
                <div class="w-14 h-2.5 bg-black rounded-full mx-auto mb-1.5 border border-white/10 flex items-center justify-center gap-1 shadow-sm">
                  <div class="w-1 h-1 rounded-full bg-[#1c2c44]/80"></div>
                  <div class="w-0.5 h-0.5 rounded-full bg-white/20"></div>
                </div>

                <!-- Hardware buttons on phone edges -->
                <div class="absolute -left-[2.5px] top-14 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -left-[2.5px] top-22 w-[2.5px] h-6 bg-[#3d2a36] rounded-l border-l border-t border-b border-white/10"></div>
                <div class="absolute -right-[2.5px] top-16 w-[2.5px] h-9 bg-[#3d2a36] rounded-r border-r border-t border-b border-white/10"></div>

                <!-- Inner Screen Area (Constrained height fitting section height, exact 1080/2340 aspect ratio) -->
                <div 
                  class="relative rounded-[28px] overflow-hidden bg-black flex items-center justify-center group/screen cursor-pointer h-[380px] sm:h-[410px] md:h-[440px] lg:h-[450px] xl:h-[470px] w-auto max-w-full"
                  style="aspect-ratio: 1080 / 2340;"
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
                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-10 rounded-[28px]"></div>

                  <!-- Bottom Home Bar Indicator inside screen -->
                  <div class="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/40 rounded-full z-10"></div>

                  <!-- Fallback Play Overlay when Paused / Autoplay Blocked -->
                  <div 
                    id="csMeditrackStoreMappingPlayOverlay" 
                    class="hidden absolute inset-0 bg-black/45 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-200"
                    aria-label="Play store mapping walkthrough"
                  >
                    <div class="w-12 h-12 rounded-full bg-[var(--accent)] text-[#170D13] flex items-center justify-center shadow-2xl transform group-hover/screen:scale-105 active:scale-95 transition-all">
                      <svg class="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Device Spec Label Tag -->
              <div class="mt-2.5 flex items-center gap-2 text-[10px] font-mono text-[var(--text-sec)]">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>375 × 812 · Store Layout &amp; Rack Locator</span>
                </span>
              </div>

            </div>

            <!-- Caption Footer -->
            <div class="flex justify-between items-center w-full px-1 pt-2.5 text-[11px] text-[var(--text-sec)] font-mono">
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>SMART STORE MAPPING WALKTHROUGH</span>
              </span>
              <span class="text-[var(--text-sec)]">Pharmacy Mobile Walkthrough</span>
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
      <a href="#work" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity">
        ← BACK TO SELECTED WORK
      </a>
      <div class="flex items-center gap-3">
        <div class="text-xs font-mono text-[var(--text-sec)]">
          PROJECT 004 OF 04
        </div>
      </div>
    </div>

    <!-- Case Study Header Area -->
    <div class="mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider mb-4">
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
      <a href="#work" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity">
        ← BACK TO SELECTED WORK
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
    // Update top pill buttons
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

  function goToProject(targetIndex, direction = null) {
    if (isAnimating) return;

    // Wrap-around calculation
    const nextIndex = ((targetIndex % totalCards) + totalCards) % totalCards;
    if (nextIndex === currentIndex && direction !== null) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is requested or no direction, update instantly
    if (!direction || prefersReduced) {
      currentIndex = nextIndex;
      cards.forEach((card, i) => {
        const pos = (i - currentIndex + totalCards) % totalCards;
        card.setAttribute('data-deck-pos', pos);
        card.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
        card.classList.remove('anim-exit-next', 'anim-exit-prev', 'is-swiping-down');
        card.style.transform = '';
        card.style.transition = '';
      });
      syncMeta();
      return;
    }

    isAnimating = true;

    // Find the current active card in the foreground
    const activeCard = cards.find(c => c.getAttribute('data-deck-pos') === '0');

    if (direction === 'next') {
      // Forward transition: active card glides out to the right with subtle tilt & fade
      if (activeCard) {
        activeCard.classList.add('anim-exit-next');
      }

      currentIndex = nextIndex;

      // Bring behind cards forward into new positions
      cards.forEach((card, i) => {
        if (card === activeCard) return;
        const newPos = (i - currentIndex + totalCards) % totalCards;
        card.setAttribute('data-deck-pos', newPos);
        card.setAttribute('aria-hidden', newPos === 0 ? 'false' : 'true');
      });

      syncMeta();

      // Complete transition after 480ms
      setTimeout(() => {
        if (activeCard) {
          activeCard.classList.remove('anim-exit-next');
          const finalPos = (cards.indexOf(activeCard) - currentIndex + totalCards) % totalCards;
          activeCard.setAttribute('data-deck-pos', finalPos);
          activeCard.setAttribute('aria-hidden', finalPos === 0 ? 'false' : 'true');
        }
        isAnimating = false;
      }, 500);

    } else if (direction === 'prev') {
      // Backward transition: active card glides out to the left with subtle tilt & fade
      if (activeCard) {
        activeCard.classList.add('anim-exit-prev');
      }

      currentIndex = nextIndex;

      // Step cards behind into new positions
      cards.forEach((card, i) => {
        if (card === activeCard) return;
        const newPos = (i - currentIndex + totalCards) % totalCards;
        card.setAttribute('data-deck-pos', newPos);
        card.setAttribute('aria-hidden', newPos === 0 ? 'false' : 'true');
      });

      syncMeta();

      // Complete transition after 480ms
      setTimeout(() => {
        if (activeCard) {
          activeCard.classList.remove('anim-exit-prev');
          const finalPos = (cards.indexOf(activeCard) - currentIndex + totalCards) % totalCards;
          activeCard.setAttribute('data-deck-pos', finalPos);
          activeCard.setAttribute('aria-hidden', finalPos === 0 ? 'false' : 'true');
        }
        isAnimating = false;
      }, 500);
    }
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
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentDragCard = null;

  deckStage.addEventListener('pointerdown', (e) => {
    if (isAnimating) return;
    const frontCard = cards.find(c => c.getAttribute('data-deck-pos') === '0');
    if (!frontCard || !frontCard.contains(e.target)) return;
    if (e.target.closest('a') || e.target.closest('button')) return;

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    currentDragCard = frontCard;
    try {
      frontCard.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  deckStage.addEventListener('pointermove', (e) => {
    if (!isDragging || !currentDragCard) return;
    const deltaX = (e.clientX - startX) * 0.75;
    const deltaY = (e.clientY - startY) * 0.35;

    currentDragCard.style.transition = 'none';
    currentDragCard.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0px) rotate(${deltaX * 0.04}deg)`;
  });

  function handleDragEnd(e) {
    if (!isDragging || !currentDragCard) return;
    isDragging = false;
    try {
      if (e.pointerId) currentDragCard.releasePointerCapture(e.pointerId);
    } catch (err) {}

    const deltaX = e.clientX - startX;
    currentDragCard.style.transition = '';
    currentDragCard.style.transform = '';

    if (deltaX < -50) {
      goToProject(currentIndex + 1, 'next');
    } else if (deltaX > 50) {
      goToProject(currentIndex - 1, 'prev');
    }
    currentDragCard = null;
  }

  deckStage.addEventListener('pointerup', handleDragEnd);
  deckStage.addEventListener('pointercancel', handleDragEnd);

  // Expose refresh function on the stage so case study return can re-sync
  deckStage._refreshDeck = function() {
    goToProject(currentIndex);
  };

  // Initial synchronization
  goToProject(currentIndex);
}

window.initSelectedWorkShowcase = initSelectedWorkShowcase;
