// All content below comes from the current ideatechnologies.net site.

// ── Company details ──────────────────────────────────────────────
// Edit these, then commit and push; the live site updates itself. Every page, the footer and the
// search-engine info read from here, so this is the only place to change them.
export const company = {
  name: 'Idea Technologies',
  legalName: 'IDEA Technologies LLC',
  founded: 2009,
  president: 'Rathiah Jammula',
  activeContractors: '23+', // "Active contractors placed": a number, or text like '23+' (keep the quotes)

  email: 'info@ideatechnologies.net',
  phone: '+1 (512) 366-0019', // include the +1 country code

  street: '7703 N Lamar Blvd STE 128',
  city: 'Austin',
  state: 'TX',
  zip: '78752',

  certifications: ['SBA 8(a) Certified', 'HUB Certified', 'Texas DIR Vendor'],

  // Contact form: messages are emailed from your Google Workspace account by a small
  // Google Apps Script (see "Contact form" in README.md). Paste the script's web app URL
  // (it ends in /exec) between the quotes. Leave it empty and the form falls back to
  // opening the visitor's email app.
  formEndpoint: '',
};

// Worked out from the details above. No need to edit.
company.address = `${company.street}, ${company.city}, ${company.state} ${company.zip}`;
company.mapQuery = company.address;
company.phoneHref = `tel:+${company.phone.replace(/\D/g, '')}`;

export const intro = [
  'Idea Technologies is a renowned global technology and management firm at the forefront of IT innovation. With a laser focus on IT project development, project management, and IT lifecycle management, we offer cutting-edge software solutions, robust technical support, and comprehensive staffing and consulting services.',
  'We offer a wide range of Software and Application Development, IT Infrastructure, Database support, Management and IT Consulting services to State and Local Government and Private/Public Enterprises with cutting-edge technology solutions.',
];

export const services = [
  {
    id: 'staffing',
    icon: 'users',
    title: 'Staffing Solutions',
    short: 'One of the most dependable IT staffing companies, built on customer satisfaction and deep market specialization.',
    long: 'Our unwavering commitment to customer satisfaction, combined with our specialization in the industry and market, has positioned us as one of the most dependable IT staffing companies. Through the Texas DIR ITSAC contract (DIR-CPO-5540) we place qualified IT professionals with state agencies, local governments and private organizations.',
    points: ['DIR ITSAC approved vendor', 'Hourly staff augmentation', '14+ IT role categories', 'Rapid placement'],
  },
  {
    id: 'software',
    icon: 'code',
    title: 'Software Development',
    short: 'A fusion of creativity and innovation that helps businesses become more efficient and productive.',
    long: 'We bring a fusion of creativity and innovation to Software Development and a wide range of Project Services, aiding businesses to transform into more efficient and productive entities. Expertise spans Java EE, .NET, EAI and legacy mainframe technologies, delivered as turn-key projects or consulting engagements.',
    points: ['Java EE & .NET', 'Enterprise integration (EAI)', 'Mainframe modernization', 'QA & application support'],
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Cloud Transformation',
    short: 'Top-tier security, enterprise-level scalability and open innovation for agility and uninterrupted operations.',
    long: 'Partnering with Idea Technologies, Cloud brings together top-tier security, enterprise-level scalability, and open innovation to enhance agility and ensure uninterrupted operations. We plan, migrate and manage workloads so your teams can move faster with less risk.',
    points: ['Migration planning', 'Security-first architecture', 'Scalable infrastructure', 'Continuous operations'],
  },
  {
    id: 'mobile',
    icon: 'phone',
    title: 'Mobile App Services',
    short: 'Tailored mobile solutions that improve accessibility and connectivity, driving efficiency and engagement.',
    long: 'With our mobile app services, we provide tailored solutions that enhance accessibility and connectivity, driving efficiency and engagement for citizens, customers and employees alike.',
    points: ['Native & cross-platform', 'Accessible by design', 'Backend integration', 'Lifecycle support'],
  },
  {
    id: 'managed',
    icon: 'server',
    title: 'IT Managed Services',
    short: 'On-demand IT support, issue resolution, implementation and consulting under one roof.',
    long: 'We offer comprehensive IT solutions, encompassing on-demand IT support, issue resolution, IT implementation, and consulting services, so your systems stay reliable while your team focuses on the mission.',
    points: ['On-demand support', 'Issue resolution', 'Implementation', 'Database administration'],
  },
  {
    id: 'pm',
    icon: 'kanban',
    title: 'IT Project Management',
    short: 'Planning, organizing and implementing technical projects from kickoff to delivery.',
    long: 'Our IT Project Managers plan, organize and implement technical projects for your organization, keeping scope, timelines and stakeholders aligned through the entire IT lifecycle.',
    points: ['Planning & scheduling', 'Stakeholder alignment', 'Risk management', 'On-time delivery'],
  },
];

export const lifecycle = [
  { title: 'Consult', text: 'Understand your goals and research future requirements, not just today’s needs.' },
  { title: 'Strategize', text: 'Business strategy, solution design and a plan that fits your timelines.' },
  { title: 'Build', text: 'Development, database design and quality assurance by certified engineers.' },
  { title: 'Integrate', text: 'Seamless integration with your existing systems and technologies.' },
  { title: 'Manage', text: 'Efficient ongoing management, administration and application support.' },
];

export const industries = [
  { icon: 'landmark', title: 'Government', text: 'Helping government sectors effectively maintain efficient systems.' },
  { icon: 'bolt', title: 'Energy', text: 'Energy efficiency strategies for current IT infrastructures.' },
  { icon: 'factory', title: 'Manufacturing', text: 'Intricate, streamlined solutions for manufacturing processes.' },
  { icon: 'chip', title: 'Information Technology', text: 'Services and strategies that coexist with existing or new technologies.' },
  { icon: 'shield', title: 'Financial', text: 'Security and reliability for infrastructure in an ever-changing digital world.' },
];

export const clients = [
  { short: 'HHSC', name: 'Health & Human Services Commission', type: 'state' },
  { short: 'TEA', name: 'Texas Education Agency', type: 'state' },
  { short: 'DFPS', name: 'Dept of Family & Protective Services', type: 'state' },
  { short: 'SOS', name: 'Secretary of State', type: 'state' },
  { short: 'CPA', name: 'Comptroller of Public Accounts', type: 'state' },
  { short: 'TxDOT', name: 'Dept of Transportation', type: 'state' },
  { short: 'TWC', name: 'Texas Workforce Commission', type: 'state' },
  { short: 'OAG', name: 'Office of the Attorney General', type: 'state' },
  { short: 'RRC', name: 'Railroad Commission', type: 'state' },
  { short: 'DPS', name: 'Texas Department of Public Safety', type: 'state' },
  { short: 'TxDMV', name: 'Texas Dept of Motor Vehicles', type: 'state' },
  { short: 'VA', name: 'US Dept of Veterans Affairs', type: 'state' },
  { short: 'Plano', name: 'City of Plano', type: 'local' },
  { short: 'LCRA', name: 'Lower Colorado River Authority', type: 'local' },
  { short: 'Austin', name: 'City of Austin', type: 'local' },
  { short: 'AE', name: 'Austin Energy', type: 'local' },
  { short: 'Dell', name: 'Dell', type: 'private' },
  { short: 'HP', name: 'HP', type: 'private' },
  { short: 'Infosys', name: 'Infosys', type: 'private' },
  { short: 'Walmart', name: 'Wal-Mart', type: 'private' },
  { short: 'Bayer', name: 'Bayer Pharmaceuticals', type: 'private' },
];

// Logos shown in the "Our Clients" carousel on the current homepage (same order).
export const clientLogos = [
  { file: 'clients/tea.png', name: 'Texas Education Agency' },
  { file: 'clients/tdot.png', name: 'Texas Department of Transportation' },
  { file: 'clients/sos.png', name: 'Texas Secretary of State' },
  { file: 'clients/rrc.png', name: 'Railroad Commission of Texas' },
  { file: 'clients/oag.png', name: 'Office of the Attorney General of Texas' },
  { file: 'clients/dads.png', name: 'Texas Department of Aging and Disability Services' },
  { file: 'clients/tpwd.png', name: 'Texas Parks & Wildlife' },
];

export const dir = {
  contract: 'DIR-CPO-5540',
  contractUrl: 'https://dir.texas.gov/contracts/dir-cpo-5540',
  programUrl: 'http://dir.texas.gov/View-Contracts-And-Services/Pages/Content.aspx?id=13',
  coopUrl: 'https://dir.texas.gov/cooperative-contracts',
  contact: 'Rathu Jammula',
  roles: [
    'Applications Architect',
    'Business Analyst',
    'Data Analyst / Data Architect',
    'Database Administrator',
    'DevOps Engineer',
    'Developer / Programmer Analyst',
    'Enterprise Architect',
    'Network Engineer / Administrator',
    'Project Manager',
    'Quality Assurance / Test Engineer',
    'Security Analyst',
    'Systems Analyst',
    'Technical Support Specialist',
    'Web Developer / Web Designer',
  ],
  docs: [
    {
      title: 'Appendix D — IT Staffing Services Titles & Descriptions',
      note: 'Per Amendment 1',
      url: 'https://txdir.widen.net/view/pdf/dwzbheejoi/DIR-CPO-5540-Appendix-D-ITSAC-Job-Category-Title-Descriptions-per-Amendment-1.pdf',
    },
    {
      title: 'Appendix B — HUB Subcontracting Plan',
      note: 'In place of List of Subcontractors',
      url: 'https://txdir.widen.net/view/pdf/axeeqxbtog/DIR-CPO-5540-Appendix-B-HUB-Subcontracting-Plan.pdf?t.download=true&u=tmwul0',
    },
    {
      title: 'Appendix C — Not To Exceed (NTE) Rates',
      note: 'Contract pricing',
      url: 'https://txdir.widen.net/view/pdf/cfd8rpo1yq/DIR-CPO-5540-Appendix-C-ITSAC-Not-To-Exceed-Rates.pdf?t.download=true&u=tmwul0',
    },
  ],
};

export const expertise = [
  'Java EE', '.NET', 'EAI', 'IBM Mainframe', 'Oracle', 'C / C++', 'Web Services', 'CORBA',
  'Business Intelligence', 'Data Warehousing', 'ERP', 'CRM', 'Supply Chain', 'Client/Server', 'QA Testing',
];

export const sectorsExpertise = ['Manufacturing', 'Telecom', 'Financial', 'Insurance', 'Retail', 'Government'];

export const interests = [
  'Staff Augmentation',
  'Application Development / Support',
  'DIR Staff Augmentation (ITSAC) Contracts',
  'TIPS Contracts',
  'Other',
];
