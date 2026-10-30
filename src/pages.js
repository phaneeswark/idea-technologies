import { icon } from './icons.js';
import {
  company, intro, services, lifecycle, industries, clients, clientLogos, dir, expertise, sectorsExpertise, interests,
} from './data.js';

const typeLabel = { state: 'State Government', local: 'Local Government', private: 'Private Sector' };

const pageHero = (eyebrow, title, sub, extra = '') => `
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow reveal">${eyebrow}</span>
      <h1 class="reveal">${title}</h1>
      ${sub ? `<p class="lead reveal">${sub}</p>` : ''}
      ${extra}
    </div>
  </section>`;

const sectionHead = (eyebrow, title, sub = '', center = false) => `
  <div class="section-head ${center ? 'center' : ''}">
    <span class="eyebrow reveal">${eyebrow}</span>
    <h2 class="reveal">${title}</h2>
    ${sub ? `<p class="reveal muted">${sub}</p>` : ''}
  </div>`;

const serviceCard = (s, i) => `
  <button class="card service-card tilt reveal" style="--d:${i * 60}ms" data-service="${s.id}" aria-label="Learn more about ${s.title}">
    <span class="card-glow"></span>
    <span class="icon-tile">${icon(s.icon)}</span>
    <h3>${s.title}</h3>
    <p>${s.short}</p>
    <span class="card-link">Learn more ${icon('arrow')}</span>
  </button>`;

const logoCarousel = () => `
  <section class="section logo-section">
    <div class="container">
      ${sectionHead('Our clients', 'Trusted by Texas state agencies', '', true)}
      <div class="logo-carousel reveal" data-logo-carousel role="region" aria-roledescription="carousel" aria-label="Client logos">
        <button class="lc-nav lc-prev" data-lc-prev aria-label="Previous logo">${icon('left')}</button>
        <div class="lc-viewport">
          <ul class="lc-track">
            ${clientLogos.map((l, i) => `
              <li class="lc-slide" aria-roledescription="slide" aria-label="${i + 1} of ${clientLogos.length}">
                <figure class="lc-tile" title="${l.name}">
                  <img src="${l.file}" alt="${l.name}" loading="lazy" draggable="false">
                </figure>
              </li>`).join('')}
          </ul>
        </div>
        <button class="lc-nav lc-next" data-lc-next aria-label="Next logo">${icon('right')}</button>
        <div class="lc-dots">
          ${clientLogos.map((l, i) => `<button class="lc-dot ${i === 0 ? 'active' : ''}" data-lc-dot="${i}" aria-label="Show ${l.name}" ${i === 0 ? 'aria-current="true"' : ''}></button>`).join('')}
        </div>
      </div>
      <div class="center-link reveal"><a class="card-link" href="#/clients">See all ${clients.length}+ clients ${icon('arrow')}</a></div>
    </div>
  </section>`;

const ctaBand = () => `
  <section class="section">
    <div class="container">
      <div class="cta-band reveal">
        <div class="cta-orb"></div>
        <div>
          <h2>Ready to put technology to work?</h2>
          <p>Tell us about your project, staffing need or DIR contract question. We respond within one business day.</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-primary" href="#/contact">Talk to our team ${icon('arrow')}</a>
          <a class="btn btn-ghost" href="${company.phoneHref}">${icon('call')} ${company.phone}</a>
        </div>
      </div>
    </div>
  </section>`;

export const pages = {
  home: {
    title: 'Idea Technologies — IT Services, Staffing & Consulting · Austin, TX',
    render: () => `
    <section class="hero">
      <div class="hero-aurora" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="pill-row reveal">
          ${company.certifications.map((c) => `<span class="pill">${icon('award')} ${c}</span>`).join('')}
        </div>
        <div class="hero-stage" data-logo3d aria-label="3D Idea Technologies logo" role="img"></div>
        <h1 class="hero-title reveal">Pioneering <span class="grad">IT excellence</span><br class="br-lg"> for government &amp; enterprise.</h1>
        <p class="hero-sub reveal">Software development, IT staffing, cloud transformation and managed services — delivered from Austin, Texas with a strong presence across the United States and India.</p>
        <div class="hero-cta reveal">
          <a class="btn btn-primary btn-lg magnetic" href="#/contact">Start a project ${icon('arrow')}</a>
          <a class="btn btn-ghost btn-lg" href="#/dir">${icon('file')} DIR-CPO-5540 Contract</a>
        </div>
      </div>
      <a class="scroll-hint" href="#why" data-scroll aria-label="Scroll to content"><span></span></a>
    </section>

    <section class="section" id="why">
      <div class="container">
        <div class="stats">
          <div class="stat reveal"><span class="stat-num" data-count="${company.founded}" data-plain>0</span><span class="stat-label">Founded in Austin, TX</span></div>
          <div class="stat reveal"><span class="stat-num" data-count="${clients.length}" data-suffix="+">0</span><span class="stat-label">Public &amp; private clients</span></div>
          <div class="stat reveal"><span class="stat-num" data-count="${parseInt(company.activeContractors, 10) || 0}" data-suffix="${String(company.activeContractors).replace(/^\d+/, '')}">0</span><span class="stat-label">Active contractors placed</span></div>
          <div class="stat reveal"><span class="stat-num" data-count="${dir.roles.length}">0</span><span class="stat-label">DIR IT role categories</span></div>
        </div>

        <div class="split">
          <div>
            ${sectionHead('Why choose us', 'A trusted partner for the full IT lifecycle')}
            ${intro.map((p) => `<p class="reveal muted">${p}</p>`).join('')}
            <a class="btn btn-ghost reveal" href="#/company">More about the company ${icon('arrow')}</a>
          </div>
          <div class="feature-grid">
            ${[
              ['award', 'SBA 8(a) & HUB Certified', 'Certified small business partner for state and federal procurement.'],
              ['landmark', 'Texas DIR Vendor', 'Approved ITSAC vendor under contract DIR-CPO-5540.'],
              ['globe', 'US & India Presence', 'Onshore delivery with global scale and expertise.'],
              ['refresh', 'End-to-End Delivery', 'From consulting and strategy to integration and management.'],
            ].map(([ic, t, d], i) => `
              <div class="card feature reveal" style="--d:${i * 80}ms">
                <span class="icon-tile sm">${icon(ic)}</span>
                <div><h4>${t}</h4><p>${d}</p></div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${sectionHead('Our services', 'What we do best', 'Cutting-edge software solutions, robust technical support, and comprehensive staffing and consulting services.', true)}
        <div class="grid-3">${services.map(serviceCard).join('')}</div>
      </div>
    </section>

    ${logoCarousel()}

    <section class="section">
      <div class="container">
        ${sectionHead('How we work', 'From first conversation to long-term support', '', true)}
        <ol class="timeline">
          ${lifecycle.map((s, i) => `
            <li class="reveal" style="--d:${i * 100}ms">
              <span class="step-num">0${i + 1}</span>
              <h4>${s.title}</h4>
              <p>${s.text}</p>
            </li>`).join('')}
        </ol>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${sectionHead('Industries', 'Built for the sectors that keep things running', '', true)}
        <div class="industry-grid">
          ${industries.map((it, i) => `
            <div class="card industry tilt reveal" style="--d:${i * 70}ms">
              <span class="card-glow"></span>
              <span class="icon-tile">${icon(it.icon)}</span>
              <h4>${it.title}</h4>
              <p>${it.text}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="dir-band reveal">
          <div class="dir-band-text">
            <span class="eyebrow">Texas DIR Cooperative Contracts</span>
            <h2>Procure IT staff directly through <span class="grad">DIR-CPO-5540</span></h2>
            <p class="muted">Texas state agencies, public universities, school districts and local governments can engage our IT professionals on an hourly basis through the DIR IT Staffing Services (ITSAC) program.</p>
            <div class="hero-cta left">
              <a class="btn btn-primary" href="#/dir">View contract details ${icon('arrow')}</a>
              <button class="btn btn-ghost" data-copy="${dir.contract}">${icon('copy')} Copy contract #</button>
            </div>
          </div>
          <div class="dir-roles-cloud" aria-hidden="true">
            ${dir.roles.slice(0, 10).map((r, i) => `<span style="--i:${i}">${r}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    ${ctaBand()}
    `,
  },

  company: {
    title: 'Company — Idea Technologies',
    render: () => `
    ${pageHero('Our company', 'Empowering businesses with <span class="grad">cutting-edge IT</span>', 'A software services consulting company with a strong presence in the United States and India, offering services across the entire software life cycle.')}

    <section class="section">
      <div class="container split">
        <div>
          ${sectionHead('Overview', 'Who we are')}
          <p class="reveal muted">Idea Technologies is an SBA 8(a) and HUB Certified company based in Austin, Texas, and one of the rapidly growing IT services companies. We provide IT services in Application Development, IT Managed Services, IT Staffing, and Digital and Cloud Transformations.</p>
          <p class="reveal muted">Our top priority is customer satisfaction. Our team works diligently to help you succeed across all facets of your business — meeting your objectives within set timelines — and we research ahead to anticipate your future requirements, not just your immediate needs.</p>
          <p class="reveal muted">We offer both turn-key project execution and consulting services encompassing business strategy, solution design and development, database design, database administration, quality assurance, and application support.</p>
        </div>
        <div class="mv-stack">
          <div class="card mv reveal">
            <span class="icon-tile">${icon('target')}</span>
            <h3>Mission</h3>
            <p>Empowering businesses with cutting-edge IT strategies, our mission is to drive success through technology — providing quality products and services with absolute commitment and dedication, fostering growth, efficiency, and security for our clients.</p>
          </div>
          <div class="card mv vision reveal">
            <span class="icon-tile">${icon('eye')}</span>
            <h3>Vision</h3>
            <blockquote>“Pioneering IT excellence, our vision is to transform organizations by harnessing the full potential of technology, making them leaders in their industries.”</blockquote>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${sectionHead('Executive team', 'Entrepreneurial, certified, battle-tested', 'Our executive team is a group of entrepreneurial, self-motivated, dynamic software professionals with a combined experience of more than 20 years, certified in Oracle, Microsoft .NET, Sun Java and C/C++.', true)}
        <h4 class="chip-title reveal">Technology expertise</h4>
        <div class="chips reveal">${expertise.map((e) => `<span class="chip">${e}</span>`).join('')}</div>
        <h4 class="chip-title reveal">Industry expertise</h4>
        <div class="chips reveal">${sectorsExpertise.map((e) => `<span class="chip chip-brand">${e}</span>`).join('')}</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid-3">
          <div class="card info-card tilt reveal"><span class="card-glow"></span><span class="icon-tile">${icon('handshake')}</span><h3>Alliances</h3><p>We partner with Solution Partners who incorporate Idea Technologies’ solutions into their offerings — driving cost efficiencies, sharing industry insight, and delivering solutions tailored to each client.</p></div>
          <div class="card info-card tilt reveal" style="--d:80ms"><span class="card-glow"></span><span class="icon-tile">${icon('briefcase')}</span><h3>Careers</h3><p>If you’re looking to build a great career and desire to learn and to lead, you have come to the right place.</p><a class="card-link" href="#/careers">Explore careers ${icon('arrow')}</a></div>
          <div class="card info-card tilt reveal" style="--d:160ms"><span class="card-glow"></span><span class="icon-tile">${icon('users')}</span><h3>Clients</h3><p>We serve government, energy, manufacturing, information technology and financial organizations.</p><a class="card-link" href="#/clients">See our clients ${icon('arrow')}</a></div>
        </div>
      </div>
    </section>
    ${ctaBand()}
    `,
  },

  services: {
    title: 'Services — Idea Technologies',
    render: () => `
    ${pageHero('Services', 'Technology services across the <span class="grad">entire lifecycle</span>', 'Software and application development, IT infrastructure, database support, management and IT consulting for state & local government and private/public enterprises.')}
    <section class="section">
      <div class="container service-rows">
        ${services.map((s, i) => `
          <article class="service-row reveal ${i % 2 ? 'flip' : ''}" id="svc-${s.id}">
            <div class="service-visual">
              <div class="orb-icon">${icon(s.icon)}</div>
              <span class="service-index">0${i + 1}</span>
            </div>
            <div>
              <h2>${s.title}</h2>
              <p class="muted">${s.long}</p>
              <ul class="checklist">${s.points.map((p) => `<li>${icon('check')} ${p}</li>`).join('')}</ul>
              <a class="btn btn-ghost" href="#/contact?interest=${encodeURIComponent(s.title)}">Discuss ${s.title} ${icon('arrow')}</a>
            </div>
          </article>`).join('')}
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        ${sectionHead('Engagement models', 'Turn-key projects or expert consulting', '', true)}
        <div class="chips center reveal">
          ${['Business strategy', 'Solution design & development', 'Database design', 'Database administration', 'Quality assurance', 'Application support', 'Project management', 'Staff augmentation'].map((e) => `<span class="chip chip-lg">${e}</span>`).join('')}
        </div>
      </div>
    </section>
    ${ctaBand()}
    `,
  },

  clients: {
    title: 'Clients — Idea Technologies',
    render: () => `
    ${pageHero('Our clients', 'Serving those who <span class="grad">serve millions</span>', 'From Texas state agencies and city governments to global technology leaders.')}
    <section class="section">
      <div class="container">
        <div class="industry-grid">
          ${industries.map((it, i) => `
            <div class="card industry tilt reveal" style="--d:${i * 70}ms">
              <span class="card-glow"></span>
              <span class="icon-tile">${icon(it.icon)}</span>
              <h4>${it.title}</h4><p>${it.text}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        ${sectionHead('Client directory', 'Who we’ve worked with', '', true)}
        <div class="toolbar reveal">
          <div class="tabs" role="tablist">
            ${[['all', 'All'], ['state', 'State'], ['local', 'Local'], ['private', 'Private']].map(([k, l], i) => `<button role="tab" class="tab ${i === 0 ? 'active' : ''}" data-filter="${k}" aria-selected="${i === 0}">${l} <small>${k === 'all' ? clients.length : clients.filter((c) => c.type === k).length}</small></button>`).join('')}
          </div>
          <label class="search-field">${icon('search')}<input type="search" placeholder="Search clients…" data-client-search aria-label="Search clients"></label>
        </div>
        <div class="client-grid" data-client-grid>
          ${clients.map((c) => `
            <div class="client-card" data-type="${c.type}" data-name="${(c.name + ' ' + c.short).toLowerCase()}">
              <span class="monogram">${c.short}</span>
              <div><strong>${c.name}</strong><small>${typeLabel[c.type]}</small></div>
            </div>`).join('')}
        </div>
        <p class="empty muted" data-client-empty hidden>No clients match your search.</p>
      </div>
    </section>
    ${ctaBand()}
    `,
  },

  dir: {
    title: 'DIR ITSAC Contract DIR-CPO-5540 — Idea Technologies',
    render: () => `
    ${pageHero('Texas DIR · IT Staffing Services (ITSAC)', `Contract <span class="grad">${dir.contract}</span>`, 'IDEA Technologies LLC (ITL) is an approved vendor authorized to provide IT staffing services to State of Texas agencies and other eligible customers through the DIR Cooperative Contracts Program.', `
      <div class="contract-card reveal">
        <div><small>Contract number</small><strong>${dir.contract}</strong></div>
        <div><small>Program</small><strong>DIR IT Staffing Services</strong></div>
        <div><small>Basis</small><strong>Hourly staff augmentation</strong></div>
        <div class="contract-actions">
          <button class="btn btn-primary" data-copy="${dir.contract}">${icon('copy')} Copy</button>
          <a class="btn btn-ghost" href="${dir.contractUrl}" target="_blank" rel="noopener">${icon('external')} View on DIR</a>
        </div>
      </div>`)}

    <section class="section">
      <div class="container split">
        <div>
          ${sectionHead('About the contract', 'Fast, compliant access to IT talent')}
          <p class="reveal muted">IT Staffing Services contracts provide temporary IT staffing augmentation on a time (hourly) basis. Contracted staff render services and are compensated hourly.</p>
          <p class="reveal muted">This contract vehicle allows Texas state agencies, public institutions of higher education, public school districts, and other eligible local government entities to work directly with IDEA Technologies LLC to procure IT staff augmentation services in accordance with DIR program guidelines.</p>
          <p class="reveal muted">Founded in 2009 in Austin, ITL started with a modest team of contractors. Through strategic alliances and DIR vendorship, ITL has grown to ${company.activeContractors} active contractors engaged with state agencies and private organizations.</p>
        </div>
        <div>
          <h3 class="reveal">How to order</h3>
          <ol class="steps reveal">
            <li><span>1</span><div><strong>Review the program</strong><p>See ordering procedures on the <a href="${dir.programUrl}" target="_blank" rel="noopener">DIR IT Staffing program</a> site and the <a href="${dir.coopUrl}" target="_blank" rel="noopener">DIR Cooperative Contracts</a> program.</p></div></li>
            <li><span>2</span><div><strong>Contact ITL</strong><p>Reach ${dir.contact} for quotes, purchase orders and warranty information.</p></div></li>
            <li><span>3</span><div><strong>Issue your PO</strong><p>Reference ${dir.contract} and we’ll match qualified professionals to your project.</p></div></li>
          </ol>
          <div class="card contact-mini reveal">
            <strong>${dir.contact}</strong>
            <span>${icon('pin')} ${company.address}</span>
            <a href="mailto:${company.email}?subject=${encodeURIComponent(dir.contract + ' inquiry')}">${icon('mail')} ${company.email}</a>
            <a href="${company.phoneHref}">${icon('call')} ${company.phone}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${sectionHead('Services offered', 'IT roles available under the contract', 'Including but not limited to:', true)}
        <div class="toolbar center reveal">
          <label class="search-field">${icon('search')}<input type="search" placeholder="Search roles…" data-role-search aria-label="Search roles"></label>
        </div>
        <div class="role-grid" data-role-grid>
          ${dir.roles.map((r, i) => `<div class="role reveal" style="--d:${i * 30}ms" data-name="${r.toLowerCase()}">${icon('check')} ${r}</div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${sectionHead('Contract documents', 'Appendices & pricing', '', true)}
        <div class="grid-3">
          ${dir.docs.map((d, i) => `
            <a class="card doc tilt reveal" style="--d:${i * 80}ms" href="${d.url}" target="_blank" rel="noopener">
              <span class="card-glow"></span>
              <span class="icon-tile">${icon('file')}</span>
              <h4>${d.title}</h4>
              <p>${d.note}</p>
              <span class="card-link">Open PDF ${icon('external')}</span>
            </a>`).join('')}
        </div>
      </div>
    </section>
    `,
  },

  careers: {
    title: 'Careers — Idea Technologies',
    render: () => `
    ${pageHero('Careers', 'Build a career where you <span class="grad">learn and lead</span>', 'If you’re looking to build a great career and desire to learn and to lead, you have come to the right place — whatever your career aspirations.', `<div class="hero-cta left reveal"><a class="btn btn-primary btn-lg" href="mailto:${company.email}?subject=Career%20inquiry">${icon('mail')} Send your resume</a></div>`)}
    <section class="section">
      <div class="container">
        <div class="grid-3">
          ${[
            ['landmark', 'Public-sector impact', 'Work on systems used by Texas state agencies, cities and the communities they serve.'],
            ['sparkle', 'Modern & legacy tech', 'From cloud and mobile to Java EE, .NET and mainframe — broaden your toolkit.'],
            ['users', 'Grow with us', 'Join a rapidly growing, certified IT services company headquartered in Austin.'],
          ].map(([ic, t, d], i) => `<div class="card info-card tilt reveal" style="--d:${i * 80}ms"><span class="card-glow"></span><span class="icon-tile">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        ${sectionHead('Disciplines', 'Roles we regularly hire for', 'Don’t see an exact match? Send us your resume anyway.', true)}
        <div class="role-grid">
          ${dir.roles.map((r, i) => `<a class="role role-link reveal" style="--d:${i * 30}ms" href="mailto:${company.email}?subject=${encodeURIComponent('Application: ' + r)}">${icon('briefcase')} ${r}<span>${icon('arrow')}</span></a>`).join('')}
        </div>
      </div>
    </section>
    ${ctaBand()}
    `,
  },

  contact: {
    title: 'Contact — Idea Technologies',
    render: () => `
    ${pageHero('Contact us', 'Let’s build what’s <span class="grad">next</span>', 'Corporate office in Austin, Texas. Tell us what you need and the right person will get back to you.')}
    <section class="section">
      <div class="container contact-grid">
        <form class="card contact-form reveal" novalidate data-contact-form>
          <div class="field-row">
            <label class="field"><span>Your name *</span><input name="name" required autocomplete="name"></label>
            <label class="field"><span>Company / Agency</span><input name="org" autocomplete="organization"></label>
          </div>
          <div class="field-row">
            <label class="field"><span>Email *</span><input name="email" type="email" required autocomplete="email"></label>
            <label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel"></label>
          </div>
          <fieldset class="field">
            <legend>I am interested in</legend>
            <div class="choice-chips">
              ${interests.map((it) => `<label class="choice"><input type="checkbox" name="interest" value="${it}"><span>${it}</span></label>`).join('')}
            </div>
          </fieldset>
          <label class="field"><span>Your message</span><textarea name="message" rows="5" placeholder="Tell us about your project, timeline, or staffing needs…"></textarea></label>
          <button class="btn btn-primary btn-lg" type="submit">Send message ${icon('arrow')}</button>
          <p class="form-note muted">Submitting opens your email app with the message ready to send to ${company.email}.</p>
        </form>
        <div class="contact-side">
          <div class="card contact-item reveal"><span class="icon-tile">${icon('user')}</span><div><small>President</small><strong>${company.president}</strong></div></div>
          <a class="card contact-item reveal" href="${company.phoneHref}"><span class="icon-tile">${icon('call')}</span><div><small>Call us</small><strong>${company.phone}</strong></div></a>
          <a class="card contact-item reveal" href="mailto:${company.email}"><span class="icon-tile">${icon('mail')}</span><div><small>Email</small><strong>${company.email}</strong></div></a>
          <a class="card contact-item reveal" href="https://maps.google.com/?q=${encodeURIComponent(company.mapQuery)}" target="_blank" rel="noopener"><span class="icon-tile">${icon('pin')}</span><div><small>Corporate office</small><strong>${company.address}</strong></div></a>
          <div class="map reveal">
            <iframe title="Idea Technologies office map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&z=15&output=embed"></iframe>
          </div>
        </div>
      </div>
    </section>
    `,
  },

  legal: {
    title: 'Legal — Idea Technologies',
    render: () => `
    ${pageHero('Legal', 'Legal disclaimer', '')}
    <section class="section tight">
      <div class="container prose">
        <p>All trademarks, service marks, and trade names are proprietary to Idea Technologies or other respective owners which have granted Idea Technologies the right and license to use such marks. While Idea Technologies uses reasonable efforts to include accurate and up-to-date information on the Site, Idea Technologies makes no warranties or representations as to its accuracy. Idea Technologies assumes no liability or responsibility for any errors or representations in the content of this Site.</p>
        <p>The materials on this site are provided “as is” without warranties of any kind either express or implied. To the fullest extent possible pursuant to the applicable law, Idea Technologies disclaims all warranties, expressed or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or other violation of rights. Under no circumstances, including, but not limited to, negligence, shall Idea Technologies be liable for any direct, indirect, special, incidental or consequential damages, including, but not limited to, loss of data or profit, arising out of the use, or the inability to use, the materials on this site, even if Idea Technologies or an Idea Technologies authorized representative has been advised of the possibility of such damages.</p>
        <p>All text, images, graphics, animation, videos, music, sounds and other materials on this site are subject to the copyrights and other intellectual property rights of Idea Technologies, its affiliated companies and its licensors.</p>
        <p>Questions about this statement, the practices of this site, or your dealings with this site can be sent to <a href="mailto:${company.email}">${company.email}</a>.</p>
      </div>
    </section>
    `,
  },

  notFound: {
    title: 'Page not found — Idea Technologies',
    render: () => `
    ${pageHero('404', 'This page took a <span class="grad">wrong turn</span>', 'The page you’re looking for doesn’t exist or has moved.', `<div class="hero-cta left reveal"><a class="btn btn-primary" href="#/">Back to home ${icon('arrow')}</a></div>`)}
    `,
  },
};

// Search index for the command palette
export function searchIndex() {
  return [
    ...[
      ['Home', '#/', 'Page'], ['Company', '#/company', 'Page'], ['Services', '#/services', 'Page'],
      ['Clients', '#/clients', 'Page'], ['DIR Contract DIR-CPO-5540', '#/dir', 'Page'], ['Careers', '#/careers', 'Page'],
      ['Contact', '#/contact', 'Page'], ['Legal disclaimer', '#/legal', 'Page'],
    ].map(([label, href, kind]) => ({ label, href, kind, icon: 'arrow' })),
    ...services.map((s) => ({ label: s.title, href: `#/services#svc-${s.id}`, kind: 'Service', icon: s.icon })),
    ...dir.roles.map((r) => ({ label: r, href: '#/dir', kind: 'IT Role', icon: 'briefcase' })),
    ...clients.map((c) => ({ label: c.name, href: '#/clients', kind: 'Client', icon: 'landmark' })),
    ...dir.docs.map((d) => ({ label: d.title, href: d.url, kind: 'Document', icon: 'file', external: true })),
    { label: 'Toggle light / dark theme', action: 'theme', kind: 'Action', icon: 'moon' },
    { label: `Copy contract number ${dir.contract}`, action: 'copy-contract', kind: 'Action', icon: 'copy' },
    { label: `Email ${company.email}`, href: `mailto:${company.email}`, kind: 'Action', icon: 'mail' },
    { label: `Call ${company.phone}`, href: company.phoneHref, kind: 'Action', icon: 'call' },
  ];
}
