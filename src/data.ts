/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsPost, SiteSettings } from './types';

export const INITIAL_NEWS_POSTS: NewsPost[] = [
  {
    id: '1',
    title: 'Rubio’s India Visit: A Missing Cure for Strained US-India Ties?',
    summary: 'Senator Rubio\'s upcoming visit to India comes at a critical geopolitical juncture. However, deep-seated disagreements on trade tariffs, defense transfers, and digital sovereignty hint that this high-stakes summit might highlight ongoing diplomatic frictions rather than curing them.',
    content: `Senator Marco Rubio’s high-profile visit to New Delhi is slated to be one of the major diplomatic events of May 2026. This trip occurs against a turbulent backdrop where global alliances are being stress-tested by parallel crises in Europe and the Middle East. While both Washington and New Delhi officially proclaim the relationship as the "defining partnership of the 21st century," deep-seated structural disagreements continue to bottleneck real bilateral integration.

Analysts point out that behind the veneer of joint declarations and military handshakes lie tough stalemates. Over the past twelve months, trade disputes have flared again. The United States continues to press for higher agricultural market access and lower tariffs on American industrial tech, while India aggressively defends its domestic digital governance policies, data localization mandates, and sovereign trade policies.

Under the Initiative on Critical and Emerging Technology (iCET), both nations pledged to accelerate deep co-production of military hardware, including jet engines and advanced semiconductor architectures. Yet, bureaucratic delays on the American export controls side, coupled with India's defense diversification policies, have slowed progress. Rubio's visit is expected to address these defense bottlenecks, but observers caution that without concrete legislative revisions in Washington and regulatory flexibility in New Delhi, the visit may yield symbolic press releases rather than systemic solutions. 

Ultimately, Rubio's visit may expose a harsh truth: the US-India alliance remains tactical and transactional, driven by mutual geopolitical concerns rather than complete alignment in trade and global governance.`,
    date: '2026-05-27',
    category: 'world',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    views: 1240,
    likes: 85,
    isFeatured: true,
    comments: [
      { id: 'c1', author: 'Vikram Mehta', text: 'An insightful analysis. US and India must recognize that strategic alignment does not mean uniform policy agreement.', date: '2026-05-28' },
      { id: 'c2', author: 'Sarah Jenkins', text: 'The export control bureaucracy in the US is indeed the primary bottleneck. Industry leaders are frustrated.', date: '2026-05-28' }
    ]
  },
  {
    id: '2',
    title: 'How India Kept Fuel Price Hikes Lower Than Major Economies | Policy Deep Dive',
    summary: 'Amid an unprecedented global energy crisis and soaring crude oil rates, India managed to stabilize domestic petrol and diesel prices through aggressive reserve release, strategic tax revisions, and sourcing alternative imports.',
    content: `While consumers worldwide faced historic inflation at the pump in 2025 and early 2026, the domestic fuel prices in India remained remarkably steady. In this policy deep dive, MTD Globe News dissects the multi-tiered strategic maneuvers executed by the Indian government to insulate local transport systems and manufacturing blocks from global price shocks.

According to a comparative analysis of crude impacts from October 2025 to May 2026, while the United Kingdom, Germany, and Germany experienced consumer pump hikes ranging from 28% to 42%, India's fuel index recorded a cumulative rise of less than 7%. 

This containment was achieved via three core policy pillars:
1. Sourcing Diversification: Sourcing crude from alternative, non-traditional channels at significant discounts, and paying with local currencies to minimize US dollar dependency.
2. Dynamic Duty Cuts: The Union Cabinet adjusted central excise duties on petrol by up to ₹8 per liter, a move that reduced government revenues but directly sustained downstream stable prices.
3. Strategic Petroleum Reserves (SPR): Utilizing underground rock cavern reserves in Padur, Mangalore, and Visakhapatnam, the government released emergency crude to state-owned refiners during critical peak weeks, offsetting global marine shipment spikes.

While fiscal commentators warn that this strategy might increase the national current account deficit slightly, economists generally agree that maintaining affordable fuel averted a broader, more destructive hyper-inflation cascade across food distribution, trucking, and essential manufacturing.`,
    date: '2026-05-23',
    category: 'energy-economy',
    imageUrl: 'https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=800&q=80',
    views: 948,
    likes: 62,
    comments: [
      { id: 'c3', author: 'Rajesh Kumar', text: 'This was a masters class in geopolitical economics. High credit to the petroleum ministry.', date: '2026-05-24' }
    ]
  },
  {
    id: '3',
    title: '₹2 Lakh Crore Hit? How Iran War Is Shaking India\'s Economy | MTD Globe News',
    summary: 'The rising geopolitical conflicts in the Persian Gulf and a threat to block the vital Strait of Hormuz could place a monumental ₹2 Lakh Crore strain on the Indian economy, damaging trade flows and importing major energy vulnerability.',
    content: `A volatile security landscape in the Middle East has placed the crucial Strait of Hormuz under high tension. This geographical choke point, measuring just 21 miles wide at its narrowest channel, is the gateway for approximately details of 20% of global petroleum transit. For India, the stakes are staggeringly higher: over 60% of its crude imports and a vast volume of its liquefied natural gas pass directly through this zone.

Financial risk models completed by economic analysts suggest a full-scale regional escalation and even a temporary blockage would hit India with a massive ₹2 Lakh Crore expense. This multi-layered blow would manifest in four ways:
- Increased Oil Purchase Cost: Spot crude rates could leap overnight to $120+ a barrel, adding billions to India\'s import bill.
- Cargo Rerouting Delays: Diverting container carriers around the Cape of Good Hope increases maritime transit times by 12 to 15 days, which in turn spikes shipping carrier charter rates.
- Maritime Insurance Premiums: Underwriters have already marked the Persian Gulf as a high-risk zone, causing shipping insurance costs to climb by over 300%.
- Supply Chain Halts: Key industrial components, semiconductors, and agricultural inputs could get stuck, choking production lines across Noida, Chennai, and Pune.

Sovereign plans currently call for naval escorts of Indian commercial flagships and coordinated domestic stock deployments from deep storage to assure continuity in case of short-term trade disruption.`,
    date: '2026-04-04',
    category: 'energy-economy',
    imageUrl: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=800&q=80',
    views: 1845,
    likes: 120,
    comments: [
      { id: 'c4', author: 'Anil Deshmukh', text: 'The Strait of Hormuz is the single biggest choke point for our growth. Diversifying to domestic production is the only long-term cure.', date: '2026-04-05' }
    ]
  },
  {
    id: '4',
    title: 'Noida International Airport Opens: India\'s Mega Hub Awaits Its First Flights',
    summary: 'The massive development phase of India\'s newest aviation landmark in Jewar is officially complete. Built to serve up to 12 million global passangers and support automated logistics, this greenfield airport will transform Noida into a direct regional freight powerhouse.',
    content: `In a historic accomplishment for regional transit, Phase 1 of Noida International Airport (DXN) in Jewar has reached official operational completion. Spanning across 1,300 hectares in its initial layout, this massive infrastructure marvel is situated to relieve high congestion at New Delhi’s Indira Gandhi International (IGI) airport, while establishing Western Uttar Pradesh as a crucial air express and global corporate hub.

MTD Globe News was invited for an exclusive on-site preview of the facility. The terminal's architecture elegantly pairs Swiss-inspired carbon-neutral structural engineering with localized patterns. Standout tech highlights include biometric digital facial boarding, ultra-fast automated baggage matching pipelines, and an expansive multi-modal cargo terminal. The logistics center is directly integrated with adjacent expressways and the upcoming dedicated metro network.

With test flights completed without a hitch by regulatory authorities, commercial airlines are scheduling active routes. The airport’s first phase accommodates 12 million passengers annually. Major logistics enterprises, e-commerce giants, and electronics manufacturers have already acquired industrial warehousing facilities in the surrounding Yamuna Expressway zone. Real estate developers estimate Jewar’s launch will generate direct employment for 100,000+ residents and supercharge business investment across the region.`,
    date: '2026-03-31',
    category: 'business',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    views: 1410,
    likes: 98,
    comments: [
      { id: 'c5', author: 'Neha Sharma', text: 'This is a game changer for Noida and Greater Noida! Real estate prices are already soaring, and connectivity is going to be amazing.', date: '2026-04-01' }
    ]
  },
  {
    id: '5',
    title: 'India\'s Crude Oil Reserves: 74 Days of Security & Andaman Discovery | Energy News 2026',
    summary: 'India maintains a robust 74 days of strategic energy cover through emergency cavern systems and refining inventory. This cushion is further enhanced by major new offshore oil and natural gas reservoir discoveries in the Andaman deep waters.',
    content: `National energy autonomy has climbed to the top of India’s economic and defense priorities. Senior administrators recently confirmed that the nation’s cumulative petroleum and crude reserves now secure a 74-day import safeguard. This reserve is comprised of underground strategic caverns managed by Indian Strategic Petroleum Reserves Limited (ISPRL), alongside storage stocks maintained by public refiners.

Simultaneously, a massive exploratory exploration in the Andaman Sea has yielded historic results. Deep-sea drillships operating under the Open Acreage Licensing Policy discovered a multi-tier hydrocarbon column in deep waters of the Andaman basin.

Geological evaluation suggests this offshore discovery holds potential reserves exceeding 120 million barrels of premium light sweet crude, in combination with trillions of cubic feet of natural gas. While production from deep ocean beds takes five to seven years to fully mature, this discovery stands as a significant asset for domestic energy security. State energy conglomerates are drafting fast-track fast-development plans, planning multi-phase platforms and subsea pipelines to bring this rich field online and minimize the current strategic reliance on overseas shippers.`,
    date: '2026-03-24',
    category: 'energy-economy',
    imageUrl: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=800&q=80',
    views: 1105,
    likes: 74,
    comments: [
      { id: 'c6', author: 'Devendra S.', text: 'Fascinating news. Combining strategic cavern storage with new Andaman offshore resources gives India excellent leverage in trade discussions.', date: '2026-03-25' }
    ]
  },
  {
    id: '6',
    title: 'AI-Powered Grid Decarbonization: Next-Gen Batteries Meet Neural Models',
    summary: 'Innovative software companies are executing custom machine learning systems to optimize renewable solar-wind grid configurations, minimizing carbon output and grid loss.',
    content: `As central grids expand their dependence on volatile wind and solar energy systems, maintaining stability without resorting to coal-fired backups has become a primary hurdle. A consortium of software developers and energy utilities has unveiled a neural network controller that promises a path to pure zero-carbon system configurations.

The machine learning system actively monitors global weather grids, local consumer load indicators, and utility storage battery levels. By predicting supply fluctuations up to 48 hours in advance, the model computes optimal battery dispatch schedules.

Initial rollouts across experimental solar farms in Rajasthan and wind hubs in Tamil Nadu recorded a 14% drop in active power loss and improved dispatch speed. Energy executives describe this software integration as the critical transition piece that bridges the intermittency gap, allowing modern utilities to confidently run entirely on green resources without risking rolling blackouts.`,
    date: '2026-04-12',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    views: 820,
    likes: 45,
    comments: [
      { id: 'c7', author: 'Elena Rostova', text: 'Integrating AI under infrastructure grids is exactly the type of smart engineering we need for real climate action.', date: '2026-04-13' }
    ]
  },
  {
    id: '7',
    title: 'Quantum Core Achieves High-Fidelity Room Temperature Operations',
    summary: 'Physics laboratories report key achievements in maintaining modular diamond quantum processors with gate fidelities exceeding 99.9% without extreme cooling protocols.',
    content: `Superconducting quantum systems are notorious for demanding heavy cooling machinery, operating near absolute zero (-273°C) under expensive liquid-helium setups. Today, hardware start-ups announced they successfully sustained coherent qubit states at room-temperature elevations.

By embedding nitrogen-vacancy cores in synthetic diamond sheets under ultra-thin hydride layers, researchers preserved stable qubits. The processor accomplished single-qubit logic gate runs with 99.92% fidelity under room-temperature conditions.

Eliminating extreme coolers cuts quantum datacenter carbon footprints and facilitates smaller, standard rack mounts. Quantum labs plan to commercialize these diamond card cores for rapid financial risk modeling and organic chemical compound simulation by late 2027.`,
    date: '2026-04-20',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    views: 955,
    likes: 58,
    comments: [
      { id: 'c8', author: 'Marcus Vance', text: 'This diamond NV-center approach is very promising. If this scales up, standard cloud centers can house quantum processors directly.', date: '2026-04-21' }
    ]
  },
  {
    id: '8',
    title: 'Global Trade Redux: Adapting to Nearshoring and Safe Harbors',
    summary: 'A special report on how multinational manufacturing ecosystems are moving logistics centers closer to target consumers, with India and Mexico appearing as key winners.',
    content: `The age of hyper-globalized, single-source manufacturing is officially giving way to regional block resilience, an economic shift coined as "nearshoring" or "friendshoring." Spurred by persistent geopolitical unrest and oceanic supply vulnerabilities, major conglomerates are restructuring their manufacturing bases.

Business statistics indicate a massive, coordinated migration of assembly facilities away from high-exposure zones. This transition has triggered major investments in secondary hubs.

India's specialized electronics corridors in Noida and Chennai, alongside Mexico's automotive industrial parks in Monterrey, have emerged as the premier beneficiaries. Over 140 multi-national tech players established primary production centers in these regions in the past nine months. The report suggests that while this redundancy increases capital expenses initially, it creates a much stronger shield against sudden global shutdowns.`,
    date: '2026-05-10',
    category: 'opinion',
    imageUrl: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=800&q=80',
    views: 650,
    likes: 39,
    comments: [
      { id: 'c9', author: 'Aditi Roy', text: 'This opinions article perfectly matches my findings. Friendshoring is re-mapping world logistics.', date: '2026-05-11' }
    ]
  }
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'mtd global news',
  tagline: 'Your Window to the World',
  primaryColor: '#0a1e3c',
  secondaryColor: '#c0392b',
  backgroundColor: '#f4f4f4',
  darkMode: false,
  font: 'Poppins',
  layout: 'grid',
  breakingText: 'Breaking: US-India bilateral talks in focus as Senator Rubio visits New Delhi • In Operation: Noida International Airport reaches Phase 1 milestone',
  seoTitle: 'mtd global news - International News & Editorial Agency',
  seoDescription: 'The premier global news agency supplying deep strategic insights, business updates, tech breakthroughs, and energy-economy research.',
  contactEmail: 'contact@mtdglobalnews.com',
  contactPhone: '+1 (555) 789-1020',
  contactAddress: '74 Global Plaza, Media District, New Delhi / New York Office',
  footerText: 'mtd global news © 2026. All rights reserved. Providing accurate, ethical, and real-time international investigative insights.',
  visibleSections: {
    home: true,
    world: true,
    business: true,
    tech: true,
    energy: true,
    opinions: true,
    contact: true
  }
};

const POSTS_KEY = 'mtd_news_posts_v1';
const SETTINGS_KEY = 'mtd_site_settings_v1';

export function getNewsPosts(): NewsPost[] {
  try {
    const data = localStorage.getItem(POSTS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading posts from localStorage', e);
  }
  // If not present, seed and return
  saveNewsPosts(INITIAL_NEWS_POSTS);
  return INITIAL_NEWS_POSTS;
}

export function saveNewsPosts(posts: NewsPost[]): void {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving posts to localStorage', e);
  }
}

export function getSiteSettings(): SiteSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading settings from localStorage', e);
  }
  saveSiteSettings(DEFAULT_SITE_SETTINGS);
  return DEFAULT_SITE_SETTINGS;
}

export function saveSiteSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
}

// Function to dynamically update CSS variables on :root to match settings
export function applyThemeVariables(settings: SiteSettings) {
  const root = document.documentElement;
  
  // Choose background based on dark mode setting
  const isDark = settings.darkMode;
  const primary = settings.primaryColor;
  const secondary = settings.secondaryColor;
  const bg = isDark ? '#111827' : settings.backgroundColor;
  const text = isDark ? '#f9fafb' : '#1f2937';
  const cardBg = isDark ? '#1f2937' : '#ffffff';
  const cardBorder = isDark ? '#374151' : '#e5e7eb';
  
  root.style.setProperty('--primary-color', primary);
  root.style.setProperty('--secondary-color', secondary);
  root.style.setProperty('--bg-color', bg);
  root.style.setProperty('--text-color', text);
  root.style.setProperty('--card-bg-color', cardBg);
  root.style.setProperty('--card-border-color', cardBorder);

  // Set font family
  if (settings.font === 'Poppins') {
    root.style.setProperty('--font-family-current', '"Poppins", sans-serif');
  } else if (settings.font === 'Roboto') {
    root.style.setProperty('--font-family-current', '"Roboto", sans-serif');
  } else if (settings.font === 'Merriweather') {
    root.style.setProperty('--font-family-current', '"Merriweather", serif');
  }
  
  // Set window title simulated SEO
  document.title = settings.seoTitle;
}
