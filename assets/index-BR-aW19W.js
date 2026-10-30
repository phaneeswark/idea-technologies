(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const pe="modulepreload",he=function(e,t){return new URL(e,t).href},Y={},ue=function(t,a,n){let s=Promise.resolve();if(a&&a.length>0){const r=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),h=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=Promise.allSettled(a.map(u=>{if(u=he(u,n),u in Y)return;Y[u]=!0;const $=u.endsWith(".css"),g=$?'[rel="stylesheet"]':"";if(!!n)for(let m=r.length-1;m>=0;m--){const y=r[m];if(y.href===u&&(!$||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${g}`))return;const f=document.createElement("link");if(f.rel=$?"stylesheet":pe,$||(f.as="script"),f.crossOrigin="",f.href=u,h&&f.setAttribute("nonce",h),document.head.appendChild(f),$)return new Promise((m,y)=>{f.addEventListener("load",m),f.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return s.then(r=>{for(const l of r||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},me={users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',code:'<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/><path d="m14.5 4-5 16"/>',cloud:'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',phone:'<rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M12 18h.01"/>',server:'<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',kanban:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',landmark:'<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="m12 2 8 5H4z"/>',bolt:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',factory:'<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>',chip:'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',call:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',check:'<path d="M20 6 9 17l-5-5"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',file:'<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',external:'<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',sparkle:'<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',cube:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>',award:'<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',command:'<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',handshake:'<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>',refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M8 16H3v5"/>',rotate:'<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',up:'<path d="m18 15-6-6-6 6"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v1"/>',left:'<path d="m15 18-6-6 6-6"/>',right:'<path d="m9 18 6-6-6-6"/>'};function o(e,t=""){return`<svg class="icon ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${me[e]||""}</svg>`}const c={founded:2009,president:"Rathiah Jammula",activeContractors:"23+",email:"info@ideatechnologies.net",phone:"+1 (512) 366-0019",street:"7703 N Lamar Blvd STE 128",city:"Austin",state:"TX",zip:"78752",certifications:["SBA 8(a) Certified","HUB Certified","Texas DIR Vendor"]};c.address=`${c.street}, ${c.city}, ${c.state} ${c.zip}`;c.mapQuery=c.address;c.phoneHref=`tel:+${c.phone.replace(/\D/g,"")}`;const ve=["Idea Technologies is a renowned global technology and management firm at the forefront of IT innovation. With a laser focus on IT project development, project management, and IT lifecycle management, we offer cutting-edge software solutions, robust technical support, and comprehensive staffing and consulting services.","We offer a wide range of Software and Application Development, IT Infrastructure, Database support, Management and IT Consulting services to State and Local Government and Private/Public Enterprises with cutting-edge technology solutions."],z=[{id:"staffing",icon:"users",title:"Staffing Solutions",short:"One of the most dependable IT staffing companies, built on customer satisfaction and deep market specialization.",long:"Our unwavering commitment to customer satisfaction, combined with our specialization in the industry and market, has positioned us as one of the most dependable IT staffing companies. Through the Texas DIR ITSAC contract (DIR-CPO-5540) we place qualified IT professionals with state agencies, local governments and private organizations.",points:["DIR ITSAC approved vendor","Hourly staff augmentation","14+ IT role categories","Rapid placement"]},{id:"software",icon:"code",title:"Software Development",short:"A fusion of creativity and innovation that helps businesses become more efficient and productive.",long:"We bring a fusion of creativity and innovation to Software Development and a wide range of Project Services, aiding businesses to transform into more efficient and productive entities. Expertise spans Java EE, .NET, EAI and legacy mainframe technologies, delivered as turn-key projects or consulting engagements.",points:["Java EE & .NET","Enterprise integration (EAI)","Mainframe modernization","QA & application support"]},{id:"cloud",icon:"cloud",title:"Cloud Transformation",short:"Top-tier security, enterprise-level scalability and open innovation for agility and uninterrupted operations.",long:"Partnering with Idea Technologies, Cloud brings together top-tier security, enterprise-level scalability, and open innovation to enhance agility and ensure uninterrupted operations. We plan, migrate and manage workloads so your teams can move faster with less risk.",points:["Migration planning","Security-first architecture","Scalable infrastructure","Continuous operations"]},{id:"mobile",icon:"phone",title:"Mobile App Services",short:"Tailored mobile solutions that improve accessibility and connectivity, driving efficiency and engagement.",long:"With our mobile app services, we provide tailored solutions that enhance accessibility and connectivity, driving efficiency and engagement for citizens, customers and employees alike.",points:["Native & cross-platform","Accessible by design","Backend integration","Lifecycle support"]},{id:"managed",icon:"server",title:"IT Managed Services",short:"On-demand IT support, issue resolution, implementation and consulting under one roof.",long:"We offer comprehensive IT solutions, encompassing on-demand IT support, issue resolution, IT implementation, and consulting services, so your systems stay reliable while your team focuses on the mission.",points:["On-demand support","Issue resolution","Implementation","Database administration"]},{id:"pm",icon:"kanban",title:"IT Project Management",short:"Planning, organizing and implementing technical projects from kickoff to delivery.",long:"Our IT Project Managers plan, organize and implement technical projects for your organization, keeping scope, timelines and stakeholders aligned through the entire IT lifecycle.",points:["Planning & scheduling","Stakeholder alignment","Risk management","On-time delivery"]}],ge=[{title:"Consult",text:"Understand your goals and research future requirements, not just today’s needs."},{title:"Strategize",text:"Business strategy, solution design and a plan that fits your timelines."},{title:"Build",text:"Development, database design and quality assurance by certified engineers."},{title:"Integrate",text:"Seamless integration with your existing systems and technologies."},{title:"Manage",text:"Efficient ongoing management, administration and application support."}],Z=[{icon:"landmark",title:"Government",text:"Helping government sectors effectively maintain efficient systems."},{icon:"bolt",title:"Energy",text:"Energy efficiency strategies for current IT infrastructures."},{icon:"factory",title:"Manufacturing",text:"Intricate, streamlined solutions for manufacturing processes."},{icon:"chip",title:"Information Technology",text:"Services and strategies that coexist with existing or new technologies."},{icon:"shield",title:"Financial",text:"Security and reliability for infrastructure in an ever-changing digital world."}],D=[{short:"HHSC",name:"Health & Human Services Commission",type:"state"},{short:"TEA",name:"Texas Education Agency",type:"state"},{short:"DFPS",name:"Dept of Family & Protective Services",type:"state"},{short:"SOS",name:"Secretary of State",type:"state"},{short:"CPA",name:"Comptroller of Public Accounts",type:"state"},{short:"TxDOT",name:"Dept of Transportation",type:"state"},{short:"TWC",name:"Texas Workforce Commission",type:"state"},{short:"OAG",name:"Office of the Attorney General",type:"state"},{short:"RRC",name:"Railroad Commission",type:"state"},{short:"DPS",name:"Texas Department of Public Safety",type:"state"},{short:"TxDMV",name:"Texas Dept of Motor Vehicles",type:"state"},{short:"VA",name:"US Dept of Veterans Affairs",type:"state"},{short:"Plano",name:"City of Plano",type:"local"},{short:"LCRA",name:"Lower Colorado River Authority",type:"local"},{short:"Austin",name:"City of Austin",type:"local"},{short:"AE",name:"Austin Energy",type:"local"},{short:"Dell",name:"Dell",type:"private"},{short:"HP",name:"HP",type:"private"},{short:"Infosys",name:"Infosys",type:"private"},{short:"Walmart",name:"Wal-Mart",type:"private"},{short:"Bayer",name:"Bayer Pharmaceuticals",type:"private"}],F=[{file:"clients/tea.png",name:"Texas Education Agency"},{file:"clients/tdot.png",name:"Texas Department of Transportation"},{file:"clients/sos.png",name:"Texas Secretary of State"},{file:"clients/rrc.png",name:"Railroad Commission of Texas"},{file:"clients/oag.png",name:"Office of the Attorney General of Texas"},{file:"clients/dads.png",name:"Texas Department of Aging and Disability Services"},{file:"clients/tpwd.png",name:"Texas Parks & Wildlife"}],v={contract:"DIR-CPO-5540",contractUrl:"https://dir.texas.gov/contracts/dir-cpo-5540",programUrl:"http://dir.texas.gov/View-Contracts-And-Services/Pages/Content.aspx?id=13",coopUrl:"https://dir.texas.gov/cooperative-contracts",contact:"Rathu Jammula",roles:["Applications Architect","Business Analyst","Data Analyst / Data Architect","Database Administrator","DevOps Engineer","Developer / Programmer Analyst","Enterprise Architect","Network Engineer / Administrator","Project Manager","Quality Assurance / Test Engineer","Security Analyst","Systems Analyst","Technical Support Specialist","Web Developer / Web Designer"],docs:[{title:"Appendix D — IT Staffing Services Titles & Descriptions",note:"Per Amendment 1",url:"https://txdir.widen.net/view/pdf/dwzbheejoi/DIR-CPO-5540-Appendix-D-ITSAC-Job-Category-Title-Descriptions-per-Amendment-1.pdf"},{title:"Appendix B — HUB Subcontracting Plan",note:"In place of List of Subcontractors",url:"https://txdir.widen.net/view/pdf/axeeqxbtog/DIR-CPO-5540-Appendix-B-HUB-Subcontracting-Plan.pdf?t.download=true&u=tmwul0"},{title:"Appendix C — Not To Exceed (NTE) Rates",note:"Contract pricing",url:"https://txdir.widen.net/view/pdf/cfd8rpo1yq/DIR-CPO-5540-Appendix-C-ITSAC-Not-To-Exceed-Rates.pdf?t.download=true&u=tmwul0"}]},fe=["Java EE",".NET","EAI","IBM Mainframe","Oracle","C / C++","Web Services","CORBA","Business Intelligence","Data Warehousing","ERP","CRM","Supply Chain","Client/Server","QA Testing"],ye=["Manufacturing","Telecom","Financial","Insurance","Retail","Government"],be=["Staff Augmentation","Application Development / Support","DIR Staff Augmentation (ITSAC) Contracts","TIPS Contracts","Other"],$e={state:"State Government",local:"Local Government",private:"Private Sector"},A=(e,t,a,n="")=>`
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow reveal">${e}</span>
      <h1 class="reveal">${t}</h1>
      ${a?`<p class="lead reveal">${a}</p>`:""}
      ${n}
    </div>
  </section>`,I=(e,t,a="",n=!1)=>`
  <div class="section-head ${n?"center":""}">
    <span class="eyebrow reveal">${e}</span>
    <h2 class="reveal">${t}</h2>
    ${a?`<p class="reveal muted">${a}</p>`:""}
  </div>`,we=(e,t)=>`
  <button class="card service-card tilt reveal" style="--d:${t*60}ms" data-service="${e.id}" aria-label="Learn more about ${e.title}">
    <span class="card-glow"></span>
    <span class="icon-tile">${o(e.icon)}</span>
    <h3>${e.title}</h3>
    <p>${e.short}</p>
    <span class="card-link">Learn more ${o("arrow")}</span>
  </button>`,Te=()=>{const e=D.map(t=>`<span class="marquee-item"><b>${t.short}</b><small>${t.name}</small></span>`).join("");return`
  <section class="marquee-wrap" aria-label="Clients we have served">
    <p class="marquee-label">Trusted by Texas agencies, cities and global enterprises</p>
    <div class="marquee"><div class="marquee-track">${e}${e}</div></div>
  </section>`},xe=()=>`
  <section class="section logo-section">
    <div class="container">
      ${I("Our clients","Trusted by Texas state agencies","",!0)}
      <div class="logo-carousel reveal" data-logo-carousel role="region" aria-roledescription="carousel" aria-label="Client logos">
        <button class="lc-nav lc-prev" data-lc-prev aria-label="Previous logo">${o("left")}</button>
        <div class="lc-viewport">
          <ul class="lc-track">
            ${F.map((e,t)=>`
              <li class="lc-slide" aria-roledescription="slide" aria-label="${t+1} of ${F.length}">
                <figure class="lc-tile" title="${e.name}">
                  <img src="${e.file}" alt="${e.name}" loading="lazy" draggable="false">
                </figure>
              </li>`).join("")}
          </ul>
        </div>
        <button class="lc-nav lc-next" data-lc-next aria-label="Next logo">${o("right")}</button>
        <div class="lc-dots">
          ${F.map((e,t)=>`<button class="lc-dot ${t===0?"active":""}" data-lc-dot="${t}" aria-label="Show ${e.name}" ${t===0?'aria-current="true"':""}></button>`).join("")}
        </div>
      </div>
      <div class="center-link reveal"><a class="card-link" href="#/clients">See all ${D.length}+ clients ${o("arrow")}</a></div>
    </div>
  </section>`,q=()=>`
  <section class="section">
    <div class="container">
      <div class="cta-band reveal">
        <div class="cta-orb"></div>
        <div>
          <h2>Ready to put technology to work?</h2>
          <p>Tell us about your project, staffing need or DIR contract question. We respond within one business day.</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-primary" href="#/contact">Talk to our team ${o("arrow")}</a>
          <a class="btn btn-ghost" href="${c.phoneHref}">${o("call")} ${c.phone}</a>
        </div>
      </div>
    </div>
  </section>`,Ie={home:{title:"Idea Technologies — IT Services, Staffing & Consulting · Austin, TX",render:()=>`
    <section class="hero">
      <div class="hero-aurora" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="pill-row reveal">
          ${c.certifications.map(e=>`<span class="pill">${o("award")} ${e}</span>`).join("")}
        </div>
        <div class="hero-stage" data-logo3d aria-label="3D Idea Technologies logo" role="img"></div>
        <h1 class="hero-title reveal">Pioneering <span class="grad">IT excellence</span><br class="br-lg"> for government &amp; enterprise.</h1>
        <p class="hero-sub reveal">Software development, IT staffing, cloud transformation and managed services — delivered from Austin, Texas with a strong presence across the United States and India.</p>
        <div class="hero-cta reveal">
          <a class="btn btn-primary btn-lg magnetic" href="#/contact">Start a project ${o("arrow")}</a>
          <a class="btn btn-ghost btn-lg" href="#/dir">${o("file")} DIR-CPO-5540 Contract</a>
        </div>
      </div>
      <a class="scroll-hint" href="#why" data-scroll aria-label="Scroll to content"><span></span></a>
    </section>

    ${Te()}

    <section class="section" id="why">
      <div class="container">
        <div class="stats">
          <div class="stat reveal"><span class="stat-num" data-count="${c.founded}" data-plain>0</span><span class="stat-label">Founded in Austin, TX</span></div>
          <div class="stat reveal"><span class="stat-num" data-count="${D.length}" data-suffix="+">0</span><span class="stat-label">Public &amp; private clients</span></div>
          <div class="stat reveal"><span class="stat-num" data-count="${parseInt(c.activeContractors,10)||0}" data-suffix="${String(c.activeContractors).replace(/^\d+/,"")}">0</span><span class="stat-label">Active contractors placed</span></div>
          <div class="stat reveal"><span class="stat-num" data-count="${v.roles.length}">0</span><span class="stat-label">DIR IT role categories</span></div>
        </div>

        <div class="split">
          <div>
            ${I("Why choose us","A trusted partner for the full IT lifecycle")}
            ${ve.map(e=>`<p class="reveal muted">${e}</p>`).join("")}
            <a class="btn btn-ghost reveal" href="#/company">More about the company ${o("arrow")}</a>
          </div>
          <div class="feature-grid">
            ${[["award","SBA 8(a) & HUB Certified","Certified small business partner for state and federal procurement."],["landmark","Texas DIR Vendor","Approved ITSAC vendor under contract DIR-CPO-5540."],["globe","US & India Presence","Onshore delivery with global scale and expertise."],["refresh","End-to-End Delivery","From consulting and strategy to integration and management."]].map(([e,t,a],n)=>`
              <div class="card feature reveal" style="--d:${n*80}ms">
                <span class="icon-tile sm">${o(e)}</span>
                <div><h4>${t}</h4><p>${a}</p></div>
              </div>`).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${I("Our services","What we do best","Cutting-edge software solutions, robust technical support, and comprehensive staffing and consulting services.",!0)}
        <div class="grid-3">${z.map(we).join("")}</div>
      </div>
    </section>

    ${xe()}

    <section class="section">
      <div class="container">
        ${I("How we work","From first conversation to long-term support","",!0)}
        <ol class="timeline">
          ${ge.map((e,t)=>`
            <li class="reveal" style="--d:${t*100}ms">
              <span class="step-num">0${t+1}</span>
              <h4>${e.title}</h4>
              <p>${e.text}</p>
            </li>`).join("")}
        </ol>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${I("Industries","Built for the sectors that keep things running","",!0)}
        <div class="industry-grid">
          ${Z.map((e,t)=>`
            <div class="card industry tilt reveal" style="--d:${t*70}ms">
              <span class="card-glow"></span>
              <span class="icon-tile">${o(e.icon)}</span>
              <h4>${e.title}</h4>
              <p>${e.text}</p>
            </div>`).join("")}
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
              <a class="btn btn-primary" href="#/dir">View contract details ${o("arrow")}</a>
              <button class="btn btn-ghost" data-copy="${v.contract}">${o("copy")} Copy contract #</button>
            </div>
          </div>
          <div class="dir-roles-cloud" aria-hidden="true">
            ${v.roles.slice(0,10).map((e,t)=>`<span style="--i:${t}">${e}</span>`).join("")}
          </div>
        </div>
      </div>
    </section>

    ${q()}
    `},company:{title:"Company — Idea Technologies",render:()=>`
    ${A("Our company",'Empowering businesses with <span class="grad">cutting-edge IT</span>',"A software services consulting company with a strong presence in the United States and India, offering services across the entire software life cycle.")}

    <section class="section">
      <div class="container split">
        <div>
          ${I("Overview","Who we are")}
          <p class="reveal muted">Idea Technologies is an SBA 8(a) and HUB Certified company based in Austin, Texas, and one of the rapidly growing IT services companies. We provide IT services in Application Development, IT Managed Services, IT Staffing, and Digital and Cloud Transformations.</p>
          <p class="reveal muted">Our top priority is customer satisfaction. Our team works diligently to help you succeed across all facets of your business — meeting your objectives within set timelines — and we research ahead to anticipate your future requirements, not just your immediate needs.</p>
          <p class="reveal muted">We offer both turn-key project execution and consulting services encompassing business strategy, solution design and development, database design, database administration, quality assurance, and application support.</p>
        </div>
        <div class="mv-stack">
          <div class="card mv reveal">
            <span class="icon-tile">${o("target")}</span>
            <h3>Mission</h3>
            <p>Empowering businesses with cutting-edge IT strategies, our mission is to drive success through technology — providing quality products and services with absolute commitment and dedication, fostering growth, efficiency, and security for our clients.</p>
          </div>
          <div class="card mv vision reveal">
            <span class="icon-tile">${o("eye")}</span>
            <h3>Vision</h3>
            <blockquote>“Pioneering IT excellence, our vision is to transform organizations by harnessing the full potential of technology, making them leaders in their industries.”</blockquote>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${I("Executive team","Entrepreneurial, certified, battle-tested","Our executive team is a group of entrepreneurial, self-motivated, dynamic software professionals with a combined experience of more than 20 years, certified in Oracle, Microsoft .NET, Sun Java and C/C++.",!0)}
        <h4 class="chip-title reveal">Technology expertise</h4>
        <div class="chips reveal">${fe.map(e=>`<span class="chip">${e}</span>`).join("")}</div>
        <h4 class="chip-title reveal">Industry expertise</h4>
        <div class="chips reveal">${ye.map(e=>`<span class="chip chip-brand">${e}</span>`).join("")}</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid-3">
          <div class="card info-card tilt reveal"><span class="card-glow"></span><span class="icon-tile">${o("handshake")}</span><h3>Alliances</h3><p>We partner with Solution Partners who incorporate Idea Technologies’ solutions into their offerings — driving cost efficiencies, sharing industry insight, and delivering solutions tailored to each client.</p></div>
          <div class="card info-card tilt reveal" style="--d:80ms"><span class="card-glow"></span><span class="icon-tile">${o("briefcase")}</span><h3>Careers</h3><p>If you’re looking to build a great career and desire to learn and to lead, you have come to the right place.</p><a class="card-link" href="#/careers">Explore careers ${o("arrow")}</a></div>
          <div class="card info-card tilt reveal" style="--d:160ms"><span class="card-glow"></span><span class="icon-tile">${o("users")}</span><h3>Clients</h3><p>We serve government, energy, manufacturing, information technology and financial organizations.</p><a class="card-link" href="#/clients">See our clients ${o("arrow")}</a></div>
        </div>
      </div>
    </section>
    ${q()}
    `},services:{title:"Services — Idea Technologies",render:()=>`
    ${A("Services",'Technology services across the <span class="grad">entire lifecycle</span>',"Software and application development, IT infrastructure, database support, management and IT consulting for state & local government and private/public enterprises.")}
    <section class="section">
      <div class="container service-rows">
        ${z.map((e,t)=>`
          <article class="service-row reveal ${t%2?"flip":""}" id="svc-${e.id}">
            <div class="service-visual">
              <div class="orb-icon">${o(e.icon)}</div>
              <span class="service-index">0${t+1}</span>
            </div>
            <div>
              <h2>${e.title}</h2>
              <p class="muted">${e.long}</p>
              <ul class="checklist">${e.points.map(a=>`<li>${o("check")} ${a}</li>`).join("")}</ul>
              <a class="btn btn-ghost" href="#/contact?interest=${encodeURIComponent(e.title)}">Discuss ${e.title} ${o("arrow")}</a>
            </div>
          </article>`).join("")}
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        ${I("Engagement models","Turn-key projects or expert consulting","",!0)}
        <div class="chips center reveal">
          ${["Business strategy","Solution design & development","Database design","Database administration","Quality assurance","Application support","Project management","Staff augmentation"].map(e=>`<span class="chip chip-lg">${e}</span>`).join("")}
        </div>
      </div>
    </section>
    ${q()}
    `},clients:{title:"Clients — Idea Technologies",render:()=>`
    ${A("Our clients",'Serving those who <span class="grad">serve millions</span>',"From Texas state agencies and city governments to global technology leaders.")}
    <section class="section">
      <div class="container">
        <div class="industry-grid">
          ${Z.map((e,t)=>`
            <div class="card industry tilt reveal" style="--d:${t*70}ms">
              <span class="card-glow"></span>
              <span class="icon-tile">${o(e.icon)}</span>
              <h4>${e.title}</h4><p>${e.text}</p>
            </div>`).join("")}
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        ${I("Client directory","Who we’ve worked with","",!0)}
        <div class="toolbar reveal">
          <div class="tabs" role="tablist">
            ${[["all","All"],["state","State"],["local","Local"],["private","Private"]].map(([e,t],a)=>`<button role="tab" class="tab ${a===0?"active":""}" data-filter="${e}" aria-selected="${a===0}">${t} <small>${e==="all"?D.length:D.filter(n=>n.type===e).length}</small></button>`).join("")}
          </div>
          <label class="search-field">${o("search")}<input type="search" placeholder="Search clients…" data-client-search aria-label="Search clients"></label>
        </div>
        <div class="client-grid" data-client-grid>
          ${D.map(e=>`
            <div class="client-card" data-type="${e.type}" data-name="${(e.name+" "+e.short).toLowerCase()}">
              <span class="monogram">${e.short}</span>
              <div><strong>${e.name}</strong><small>${$e[e.type]}</small></div>
            </div>`).join("")}
        </div>
        <p class="empty muted" data-client-empty hidden>No clients match your search.</p>
      </div>
    </section>
    ${q()}
    `},dir:{title:"DIR ITSAC Contract DIR-CPO-5540 — Idea Technologies",render:()=>`
    ${A("Texas DIR · IT Staffing Services (ITSAC)",`Contract <span class="grad">${v.contract}</span>`,"IDEA Technologies LLC (ITL) is an approved vendor authorized to provide IT staffing services to State of Texas agencies and other eligible customers through the DIR Cooperative Contracts Program.",`
      <div class="contract-card reveal">
        <div><small>Contract number</small><strong>${v.contract}</strong></div>
        <div><small>Program</small><strong>DIR IT Staffing Services</strong></div>
        <div><small>Basis</small><strong>Hourly staff augmentation</strong></div>
        <div class="contract-actions">
          <button class="btn btn-primary" data-copy="${v.contract}">${o("copy")} Copy</button>
          <a class="btn btn-ghost" href="${v.contractUrl}" target="_blank" rel="noopener">${o("external")} View on DIR</a>
        </div>
      </div>`)}

    <section class="section">
      <div class="container split">
        <div>
          ${I("About the contract","Fast, compliant access to IT talent")}
          <p class="reveal muted">IT Staffing Services contracts provide temporary IT staffing augmentation on a time (hourly) basis. Contracted staff render services and are compensated hourly.</p>
          <p class="reveal muted">This contract vehicle allows Texas state agencies, public institutions of higher education, public school districts, and other eligible local government entities to work directly with IDEA Technologies LLC to procure IT staff augmentation services in accordance with DIR program guidelines.</p>
          <p class="reveal muted">Founded in 2009 in Austin, ITL started with a modest team of contractors. Through strategic alliances and DIR vendorship, ITL has grown to ${c.activeContractors} active contractors engaged with state agencies and private organizations.</p>
        </div>
        <div>
          <h3 class="reveal">How to order</h3>
          <ol class="steps reveal">
            <li><span>1</span><div><strong>Review the program</strong><p>See ordering procedures on the <a href="${v.programUrl}" target="_blank" rel="noopener">DIR IT Staffing program</a> site and the <a href="${v.coopUrl}" target="_blank" rel="noopener">DIR Cooperative Contracts</a> program.</p></div></li>
            <li><span>2</span><div><strong>Contact ITL</strong><p>Reach ${v.contact} for quotes, purchase orders and warranty information.</p></div></li>
            <li><span>3</span><div><strong>Issue your PO</strong><p>Reference ${v.contract} and we’ll match qualified professionals to your project.</p></div></li>
          </ol>
          <div class="card contact-mini reveal">
            <strong>${v.contact}</strong>
            <span>${o("pin")} ${c.address}</span>
            <a href="mailto:${c.email}?subject=${encodeURIComponent(v.contract+" inquiry")}">${o("mail")} ${c.email}</a>
            <a href="${c.phoneHref}">${o("call")} ${c.phone}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        ${I("Services offered","IT roles available under the contract","Including but not limited to:",!0)}
        <div class="toolbar center reveal">
          <label class="search-field">${o("search")}<input type="search" placeholder="Search roles…" data-role-search aria-label="Search roles"></label>
        </div>
        <div class="role-grid" data-role-grid>
          ${v.roles.map((e,t)=>`<div class="role reveal" style="--d:${t*30}ms" data-name="${e.toLowerCase()}">${o("check")} ${e}</div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${I("Contract documents","Appendices & pricing","",!0)}
        <div class="grid-3">
          ${v.docs.map((e,t)=>`
            <a class="card doc tilt reveal" style="--d:${t*80}ms" href="${e.url}" target="_blank" rel="noopener">
              <span class="card-glow"></span>
              <span class="icon-tile">${o("file")}</span>
              <h4>${e.title}</h4>
              <p>${e.note}</p>
              <span class="card-link">Open PDF ${o("external")}</span>
            </a>`).join("")}
        </div>
      </div>
    </section>
    `},careers:{title:"Careers — Idea Technologies",render:()=>`
    ${A("Careers",'Build a career where you <span class="grad">learn and lead</span>',"If you’re looking to build a great career and desire to learn and to lead, you have come to the right place — whatever your career aspirations.",`<div class="hero-cta left reveal"><a class="btn btn-primary btn-lg" href="mailto:${c.email}?subject=Career%20inquiry">${o("mail")} Send your resume</a></div>`)}
    <section class="section">
      <div class="container">
        <div class="grid-3">
          ${[["landmark","Public-sector impact","Work on systems used by Texas state agencies, cities and the communities they serve."],["sparkle","Modern & legacy tech","From cloud and mobile to Java EE, .NET and mainframe — broaden your toolkit."],["users","Grow with us","Join a rapidly growing, certified IT services company headquartered in Austin."]].map(([e,t,a],n)=>`<div class="card info-card tilt reveal" style="--d:${n*80}ms"><span class="card-glow"></span><span class="icon-tile">${o(e)}</span><h3>${t}</h3><p>${a}</p></div>`).join("")}
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        ${I("Disciplines","Roles we regularly hire for","Don’t see an exact match? Send us your resume anyway.",!0)}
        <div class="role-grid">
          ${v.roles.map((e,t)=>`<a class="role role-link reveal" style="--d:${t*30}ms" href="mailto:${c.email}?subject=${encodeURIComponent("Application: "+e)}">${o("briefcase")} ${e}<span>${o("arrow")}</span></a>`).join("")}
        </div>
      </div>
    </section>
    ${q()}
    `},contact:{title:"Contact — Idea Technologies",render:()=>`
    ${A("Contact us",'Let’s build what’s <span class="grad">next</span>',"Corporate office in Austin, Texas. Tell us what you need and the right person will get back to you.")}
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
              ${be.map(e=>`<label class="choice"><input type="checkbox" name="interest" value="${e}"><span>${e}</span></label>`).join("")}
            </div>
          </fieldset>
          <label class="field"><span>Your message</span><textarea name="message" rows="5" placeholder="Tell us about your project, timeline, or staffing needs…"></textarea></label>
          <button class="btn btn-primary btn-lg" type="submit">Send message ${o("arrow")}</button>
          <p class="form-note muted">Submitting opens your email app with the message ready to send to ${c.email}.</p>
        </form>
        <div class="contact-side">
          <div class="card contact-item reveal"><span class="icon-tile">${o("user")}</span><div><small>President</small><strong>${c.president}</strong></div></div>
          <a class="card contact-item reveal" href="${c.phoneHref}"><span class="icon-tile">${o("call")}</span><div><small>Call us</small><strong>${c.phone}</strong></div></a>
          <a class="card contact-item reveal" href="mailto:${c.email}"><span class="icon-tile">${o("mail")}</span><div><small>Email</small><strong>${c.email}</strong></div></a>
          <a class="card contact-item reveal" href="https://maps.google.com/?q=${encodeURIComponent(c.mapQuery)}" target="_blank" rel="noopener"><span class="icon-tile">${o("pin")}</span><div><small>Corporate office</small><strong>${c.address}</strong></div></a>
          <div class="map reveal">
            <iframe title="Idea Technologies office map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&z=15&output=embed"></iframe>
          </div>
        </div>
      </div>
    </section>
    `},legal:{title:"Legal — Idea Technologies",render:()=>`
    ${A("Legal","Legal disclaimer","")}
    <section class="section tight">
      <div class="container prose">
        <p>All trademarks, service marks, and trade names are proprietary to Idea Technologies or other respective owners which have granted Idea Technologies the right and license to use such marks. While Idea Technologies uses reasonable efforts to include accurate and up-to-date information on the Site, Idea Technologies makes no warranties or representations as to its accuracy. Idea Technologies assumes no liability or responsibility for any errors or representations in the content of this Site.</p>
        <p>The materials on this site are provided “as is” without warranties of any kind either express or implied. To the fullest extent possible pursuant to the applicable law, Idea Technologies disclaims all warranties, expressed or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or other violation of rights. Under no circumstances, including, but not limited to, negligence, shall Idea Technologies be liable for any direct, indirect, special, incidental or consequential damages, including, but not limited to, loss of data or profit, arising out of the use, or the inability to use, the materials on this site, even if Idea Technologies or an Idea Technologies authorized representative has been advised of the possibility of such damages.</p>
        <p>All text, images, graphics, animation, videos, music, sounds and other materials on this site are subject to the copyrights and other intellectual property rights of Idea Technologies, its affiliated companies and its licensors.</p>
        <p>Questions about this statement, the practices of this site, or your dealings with this site can be sent to <a href="mailto:${c.email}">${c.email}</a>.</p>
      </div>
    </section>
    `},notFound:{title:"Page not found — Idea Technologies",render:()=>`
    ${A("404",'This page took a <span class="grad">wrong turn</span>',"The page you’re looking for doesn’t exist or has moved.",`<div class="hero-cta left reveal"><a class="btn btn-primary" href="#/">Back to home ${o("arrow")}</a></div>`)}
    `}};function Ce(){return[...[["Home","#/","Page"],["Company","#/company","Page"],["Services","#/services","Page"],["Clients","#/clients","Page"],["DIR Contract DIR-CPO-5540","#/dir","Page"],["Careers","#/careers","Page"],["Contact","#/contact","Page"],["Legal disclaimer","#/legal","Page"]].map(([e,t,a])=>({label:e,href:t,kind:a,icon:"arrow"})),...z.map(e=>({label:e.title,href:`#/services#svc-${e.id}`,kind:"Service",icon:e.icon})),...v.roles.map(e=>({label:e,href:"#/dir",kind:"IT Role",icon:"briefcase"})),...D.map(e=>({label:e.name,href:"#/clients",kind:"Client",icon:"landmark"})),...v.docs.map(e=>({label:e.title,href:e.url,kind:"Document",icon:"file",external:!0})),{label:"Toggle light / dark theme",action:"theme",kind:"Action",icon:"moon"},{label:`Copy contract number ${v.contract}`,action:"copy-contract",kind:"Action",icon:"copy"},{label:`Email ${c.email}`,href:`mailto:${c.email}`,kind:"Action",icon:"mail"},{label:`Call ${c.phone}`,href:c.phoneHref,kind:"Action",icon:"call"}]}function Me(e){const t=e.getContext("2d"),a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let n=0,s=0,i=1,r=[],l=0;const h={x:-9999,y:-9999};let u=$();function $(){const m=getComputedStyle(document.documentElement);return{node:m.getPropertyValue("--net-node").trim()||"rgba(249,139,58,0.8)",line:m.getPropertyValue("--net-line").trim()||"120,140,180",accent:m.getPropertyValue("--net-accent").trim()||"249,139,58"}}function g(){i=Math.min(window.devicePixelRatio,2),n=window.innerWidth,s=window.innerHeight,e.width=n*i,e.height=s*i,e.style.width=n+"px",e.style.height=s+"px",t.setTransform(i,0,0,i,0,0);const m=Math.round(Math.min(110,n*s/15e3));r=Array.from({length:m},()=>({x:Math.random()*n,y:Math.random()*s,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.6+.6,hot:Math.random()<.18}))}function T(){t.clearRect(0,0,n,s);const m=140;for(let y=0;y<r.length;y++){const d=r[y];if(!a){const S=h.x-d.x,x=h.y-d.y;S*S+x*x<200*200&&(d.vx+=S*4e-5,d.vy+=x*4e-5),d.vx*=.995,d.vy*=.995,d.x+=d.vx,d.y+=d.vy,d.x<-20&&(d.x=n+20),d.x>n+20&&(d.x=-20),d.y<-20&&(d.y=s+20),d.y>s+20&&(d.y=-20)}for(let S=y+1;S<r.length;S++){const x=r[S],O=d.x-x.x,w=d.y-x.y,M=Math.hypot(O,w);if(M<m){const W=(1-M/m)*.35;t.strokeStyle=`rgba(${d.hot||x.hot?u.accent:u.line},${W})`,t.lineWidth=.8,t.beginPath(),t.moveTo(d.x,d.y),t.lineTo(x.x,x.y),t.stroke()}}t.fillStyle=d.hot?`rgba(${u.accent},0.9)`:u.node,t.beginPath(),t.arc(d.x,d.y,d.r,0,Math.PI*2),t.fill()}if(h.x>-999){const y=t.createRadialGradient(h.x,h.y,0,h.x,h.y,220);y.addColorStop(0,`rgba(${u.accent},0.08)`),y.addColorStop(1,`rgba(${u.accent},0)`),t.fillStyle=y,t.fillRect(h.x-220,h.y-220,440,440)}}function f(){T(),l=requestAnimationFrame(f)}return g(),window.addEventListener("resize",g),window.addEventListener("pointermove",m=>{h.x=m.clientX,h.y=m.clientY},{passive:!0}),document.addEventListener("visibilitychange",()=>{cancelAnimationFrame(l),!document.hidden&&!a&&f()}),a?T():f(),{refreshColors(){u=$(),a&&T()}}}const p=(e,t=document)=>t.querySelector(e),b=(e,t=document)=>[...t.querySelectorAll(e)],R=p("#app"),P=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let Se=null;const Ee=()=>Se??(Se=ue(()=>import("./logo3d-BLTfL9G8.js"),[],import.meta.url));let k=null;const ee={get(e){try{return localStorage.getItem(e)}catch{return null}},set(e,t){try{localStorage.setItem(e,t)}catch{}}};function te(){return document.documentElement.dataset.theme}function ae(e){document.documentElement.dataset.theme=e,p('meta[name="theme-color"]').setAttribute("content",e==="dark"?"#070B14":"#F7F7F9"),b("[data-theme-toggle]").forEach(t=>{t.innerHTML=o(e==="dark"?"sun":"moon"),t.setAttribute("aria-label",`Switch to ${e==="dark"?"light":"dark"} theme`)}),N==null||N.refreshColors(),k==null||k.setTheme(e)}function ne(){const e=te()==="dark"?"light":"dark";ee.set("theme",e),ae(e)}const se=ee.get("theme")||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=se;const N=Me(p("#bg-net"));ae(se);let K;function X(e){const t=p("#toast");t.innerHTML=`${o("check")} ${e}`,t.classList.add("show"),clearTimeout(K),K=setTimeout(()=>t.classList.remove("show"),2400)}async function ie(e){try{await navigator.clipboard.writeText(e)}catch{const t=Object.assign(document.createElement("textarea"),{value:e});document.body.append(t),t.select(),document.execCommand("copy"),t.remove()}X(`Copied ${e}`)}const Ae={"/":"home","/company":"company","/about":"company","/services":"services","/clients":"clients","/dir":"dir","/careers":"careers","/contact":"contact","/legal":"legal"};function ke(){const e=location.hash.replace(/^#/,"")||"/",[t,a]=e.split("#"),[n,s]=t.split("?");return{path:n||"/",anchor:a,params:new URLSearchParams(s||"")}}let _=!0;const oe=[];async function J(){const{path:e,anchor:t,params:a}=ke(),n=Ae[e]||"notFound",s=Ie[n];!_&&!P&&(R.classList.add("leaving"),await new Promise(i=>setTimeout(i,180))),k==null||k.dispose(),k=null,oe.splice(0).forEach(i=>i()),R.innerHTML=s.render(),document.title=s.title,R.classList.remove("leaving"),R.classList.add("entering"),requestAnimationFrame(()=>requestAnimationFrame(()=>R.classList.remove("entering"))),b(".nav a[data-route]").forEach(i=>i.classList.toggle("active",i.dataset.route===n)),Ue(),t?setTimeout(()=>{var i;return(i=document.getElementById(t))==null?void 0:i.scrollIntoView({behavior:"smooth",block:"start"})},120):window.scrollTo({top:0,behavior:_?"auto":"instant"}),Le(n,a),_=!1,R.focus({preventScroll:!0})}window.addEventListener("hashchange",J);function Le(e,t){if(Pe(),De(),Re(),je(),b("[data-logo-carousel]").forEach(He),e==="home"){const a=p("[data-logo3d]");Ee().then(({createLogo3D:n})=>{a.isConnected&&(k=n(a,{theme:te(),interactive:"tilt"}),a.classList.add("ready"))})}e==="clients"&&Oe(),e==="dir"&&qe(),e==="contact"&&Be(t)}function Pe(){const e=b(".reveal");if(P){e.forEach(a=>a.classList.add("in"));return}const t=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("in"),t.unobserve(n.target))})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});e.forEach(a=>t.observe(a))}function De(){const e=new IntersectionObserver(t=>{t.forEach(a=>{if(!a.isIntersecting)return;e.unobserve(a.target);const n=a.target,s=+n.dataset.count,r="plain"in n.dataset?s-60:0,l=n.dataset.suffix||"",h=P?0:1600,u=performance.now(),$=g=>{const T=h?Math.min(1,(g-u)/h):1,f=Math.round(r+(s-r)*(1-Math.pow(1-T,4)));n.textContent=f+l,T<1&&requestAnimationFrame($)};requestAnimationFrame($)})},{threshold:.5});b("[data-count]").forEach(t=>e.observe(t))}function Re(){P||!matchMedia("(hover: hover)").matches||b(".tilt").forEach(e=>{e.addEventListener("pointermove",t=>{const a=e.getBoundingClientRect(),n=(t.clientX-a.left)/a.width,s=(t.clientY-a.top)/a.height;e.style.setProperty("--rx",`${(.5-s)*8}deg`),e.style.setProperty("--ry",`${(n-.5)*10}deg`),e.style.setProperty("--mx",`${n*100}%`),e.style.setProperty("--my",`${s*100}%`)}),e.addEventListener("pointerleave",()=>{e.style.setProperty("--rx","0deg"),e.style.setProperty("--ry","0deg")})})}function je(){P||!matchMedia("(hover: hover)").matches||b(".magnetic").forEach(e=>{e.addEventListener("pointermove",t=>{const a=e.getBoundingClientRect();e.style.transform=`translate(${(t.clientX-a.left-a.width/2)*.15}px, ${(t.clientY-a.top-a.height/2)*.25}px)`}),e.addEventListener("pointerleave",()=>{e.style.transform=""})})}function He(e){const t=p(".lc-viewport",e),a=p(".lc-track",e),n=b(".lc-slide",a),s=b("[data-lc-dot]",e),i=n.length;n.slice(0,Math.min(i,6)).forEach(w=>{const M=w.cloneNode(!0);M.setAttribute("aria-hidden","true"),p("img",M).alt="",a.append(M)});let r=0,l=0,h=!1;const u=()=>parseInt(getComputedStyle(e).getPropertyValue("--per-view"),10)||6,$=()=>t.clientWidth/u();function g(w,M=!0){a.style.transition=M&&!P?"transform .7s cubic-bezier(.2,.8,.2,1)":"none",a.style.transform=`translateX(${-w*$()}px)`;const W=(w%i+i)%i;s.forEach((U,Q)=>{U.classList.toggle("active",Q===W),Q===W?U.setAttribute("aria-current","true"):U.removeAttribute("aria-current")})}function T(w){r=w,g(r,!1),a.offsetWidth}function f(){r>=i&&T(r-i),r++,g(r)}function m(){r<=0&&T(r+i),r--,g(r)}a.addEventListener("transitionend",()=>{r>=i&&T(r-i)}),p("[data-lc-next]",e).addEventListener("click",()=>{f(),x()}),p("[data-lc-prev]",e).addEventListener("click",()=>{m(),x()}),s.forEach(w=>w.addEventListener("click",()=>{r=+w.dataset.lcDot,g(r),x()}));let y=null;t.addEventListener("pointerdown",w=>{y=w.clientX}),t.addEventListener("pointerup",w=>{if(y===null)return;const M=w.clientX-y;y=null,Math.abs(M)>40&&(M<0?f():m(),x())});function d(){!P&&!l&&(l=setInterval(()=>{!h&&!document.hidden&&f()},2600))}function S(){clearInterval(l),l=0}function x(){S(),d()}e.addEventListener("pointerenter",()=>{h=!0}),e.addEventListener("pointerleave",()=>{h=!1}),e.addEventListener("focusin",()=>{h=!0}),e.addEventListener("focusout",()=>{h=!1});const O=()=>g(r,!1);window.addEventListener("resize",O),g(0,!1),d(),oe.push(()=>{S(),window.removeEventListener("resize",O)})}function Oe(){let e="all",t="";const a=b(".client-card"),n=()=>{let s=0;a.forEach(i=>{const r=(e==="all"||i.dataset.type===e)&&i.dataset.name.includes(t);i.hidden=!r,r&&s++}),p("[data-client-empty]").hidden=s>0};b(".tab[data-filter]").forEach(s=>s.addEventListener("click",()=>{b(".tab[data-filter]").forEach(i=>{i.classList.remove("active"),i.setAttribute("aria-selected","false")}),s.classList.add("active"),s.setAttribute("aria-selected","true"),e=s.dataset.filter,n()})),p("[data-client-search]").addEventListener("input",s=>{t=s.target.value.trim().toLowerCase(),n()})}function qe(){const e=b("[data-role-grid] .role");p("[data-role-search]").addEventListener("input",t=>{const a=t.target.value.trim().toLowerCase();e.forEach(n=>{n.hidden=!n.dataset.name.includes(a)})})}function Be(e){const t=p("[data-contact-form]"),a=e.get("interest");if(a){const s={"Staffing Solutions":"Staff Augmentation"}[a]||"Application Development / Support",i=b('input[name="interest"]',t).find(r=>r.value===s);i&&(i.checked=!0),t.message.value=`I'd like to discuss ${a}.`}t.addEventListener("submit",n=>{var $;n.preventDefault();let s=!0;if(b("[required]",t).forEach(g=>{const T=g.value.trim()&&(g.type!=="email"||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g.value));g.closest(".field").classList.toggle("invalid",!T),T||(s=!1)}),!s){X("Please complete the required fields"),($=p(".invalid input",t))==null||$.focus();return}const i=new FormData(t),r=i.getAll("interest"),l=[`Name: ${i.get("name")}`];i.get("org")&&l.push(`Company/Agency: ${i.get("org")}`),l.push(`Email: ${i.get("email")}`),i.get("phone")&&l.push(`Phone: ${i.get("phone")}`),r.length&&l.push(`Interested in: ${r.join(", ")}`),l.push("",i.get("message")||"");const h=l.join(`
`),u=`Website inquiry${r.length?" — "+r[0]:""}`;window.location.href=`mailto:${c.email}?subject=${encodeURIComponent(u)}&body=${encodeURIComponent(h)}`,X("Opening your email app…")}),b("input, textarea",t).forEach(n=>n.addEventListener("input",()=>{var s;return(s=n.closest(".field"))==null?void 0:s.classList.remove("invalid")}))}const B=p("#service-modal");function We(e){const t=z.find(a=>a.id===e);t&&(p(".modal-body",B).innerHTML=`
    <span class="icon-tile lg">${o(t.icon)}</span>
    <h2>${t.title}</h2>
    <p class="muted">${t.long}</p>
    <ul class="checklist">${t.points.map(a=>`<li>${o("check")} ${a}</li>`).join("")}</ul>
    <div class="hero-cta left">
      <a class="btn btn-primary" href="#/contact?interest=${encodeURIComponent(t.title)}" data-close>Start a conversation ${o("arrow")}</a>
      <a class="btn btn-ghost" href="#/services#svc-${t.id}" data-close>All services</a>
    </div>`,B.showModal())}B.addEventListener("click",e=>{(e.target===B||e.target.closest("[data-close]"))&&B.close()});document.addEventListener("click",e=>{var s;const t=e.target.closest("[data-service]");if(t){We(t.dataset.service);return}const a=e.target.closest("[data-copy]");if(a){ie(a.dataset.copy);return}if(e.target.closest("[data-theme-toggle]")){ne();return}if(e.target.closest("[data-palette-open]")){G();return}const n=e.target.closest('a[href^="#"]');n&&!n.getAttribute("href").startsWith("#/")&&(e.preventDefault(),(s=document.getElementById(n.getAttribute("href").slice(1)))==null||s.scrollIntoView({behavior:"smooth"}))});const ze=p(".site-header"),Ve=p("#progress"),re=p("#to-top");function ce(){const e=window.scrollY,t=document.documentElement.scrollHeight-innerHeight;ze.classList.toggle("scrolled",e>20),Ve.style.transform=`scaleX(${t>0?e/t:0})`,re.classList.toggle("show",e>900)}window.addEventListener("scroll",ce,{passive:!0});re.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));const j=p("[data-nav-toggle]");function Ue(){document.body.classList.remove("nav-open"),j.setAttribute("aria-expanded","false"),j.innerHTML=o("menu")}j.addEventListener("click",()=>{const e=!document.body.classList.contains("nav-open");document.body.classList.toggle("nav-open",e),j.setAttribute("aria-expanded",e),j.innerHTML=o(e?"x":"menu")});const L=p("#palette"),H=p("#palette-input"),le=p("#palette-list"),Fe=Ce();let E=[],C=0;function V(){const e=H.value.trim().toLowerCase(),t=e.split(/\s+/).filter(Boolean);E=Fe.map(a=>{const n=`${a.label} ${a.kind}`.toLowerCase();if(!t.every(i=>n.includes(i)))return null;const s=a.label.toLowerCase().startsWith(e)?0:a.kind==="Page"?1:2;return{...a,score:s}}).filter(Boolean).sort((a,n)=>a.score-n.score).slice(0,e?12:9),C=Math.min(C,Math.max(0,E.length-1)),le.innerHTML=E.length?E.map((a,n)=>`
      <li role="option" id="pal-${n}" aria-selected="${n===C}" class="${n===C?"active":""}" data-i="${n}">
        ${o(a.icon)}<span>${a.label}</span><small>${a.kind}</small>
      </li>`).join(""):'<li class="none">No results</li>',H.setAttribute("aria-activedescendant",E.length?`pal-${C}`:"")}function de(e){const t=E[e];t&&(L.close(),t.action==="theme"?ne():t.action==="copy-contract"?ie(v.contract):t.external?window.open(t.href,"_blank","noopener"):t.href.startsWith("#")?location.hash===t.href?J():location.hash=t.href:window.location.href=t.href)}function G(){H.value="",C=0,V(),L.showModal(),H.focus()}H.addEventListener("input",()=>{C=0,V()});H.addEventListener("keydown",e=>{e.key==="ArrowDown"&&(e.preventDefault(),C=(C+1)%Math.max(1,E.length),V()),e.key==="ArrowUp"&&(e.preventDefault(),C=(C-1+E.length)%Math.max(1,E.length),V()),e.key==="Enter"&&(e.preventDefault(),de(C))});le.addEventListener("click",e=>{const t=e.target.closest("[data-i]");t&&de(+t.dataset.i)});L.addEventListener("click",e=>{e.target===L&&L.close()});document.addEventListener("keydown",e=>{(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"&&(e.preventDefault(),L.open?L.close():G()),e.key==="/"&&!/input|textarea/i.test(document.activeElement.tagName)&&!L.open&&(e.preventDefault(),G())});p(".kbd-hint").textContent=/Mac|iPhone|iPad/.test(navigator.platform)?"⌘K":"Ctrl K";p("#year").textContent=new Date().getFullYear();j.innerHTML=o("menu");b("[data-icon]").forEach(e=>{e.innerHTML=o(e.dataset.icon)});J().then(()=>{ce(),setTimeout(()=>{var e;return(e=p("#loader"))==null?void 0:e.classList.add("done")},P?0:500)});
