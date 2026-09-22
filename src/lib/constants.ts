import type {
  Pillar,
  TeamPreview,
  TeamDetail,
  Prototype,
  PrototypeDetail,
  ValueProp,
  SponsorTier,
  LeadershipMember,
  NavLink,
  PhilosophyCard,
  ProjectItem,
} from "./types";
import edfTestBedPhoto from "@/assets/edf-test-bed.jpg";
import supersonicTeaser from "@/assets/supersonic-teaser.jpg";
import v01Assembly from "@/assets/v01-assembly.jpg";
import v01FanInstall from "@/assets/v01-fan-install.jpg";

// Labels changed 2026-09-22 to match the redesign. The underlying routes are
// deliberately unchanged so existing links and the sitemap keep working.
export const NAV_LINKS: NavLink[] = [
  { label: "Program", href: "/efforts" },
  { label: "Process", href: "/#process" },
  { label: "Team", href: "/teams" },
  { label: "Sponsors", href: "/sponsor" },
  // { label: "News", href: "/news", hidden: true },
  // { label: "Resources", href: "/resources", hidden: true },
];

// The flight program, shown as a timeline on the home page. Dates and scope
// come from the project rescope; do not add phases that are not real.
export const PROGRAM_PHASES = [
  {
    period: "Fall 2026",
    status: "In progress" as const,
    title: "EDF platform and turbine hot fire",
  },
  {
    period: "Spring 2027",
    status: "Planned" as const,
    title: "25 to 100 kg airframe, 15 km record",
  },
  {
    period: "2027",
    status: "Planned" as const,
    title: "World record attempt",
  },
  {
    period: "2028",
    status: "Planned" as const,
    title: "Supersonic attempt",
  },
];

// How the team works. Four steps, in order, so they are numbered.
export const PROCESS_STEPS_DETAIL = [
  { label: "Build", note: "Prototype early" },
  { label: "Fly", note: "Test in the air" },
  { label: "Validate", note: "Learn from the data" },
  { label: "Repeat", note: "Improve the design" },
];

// Real sponsors only. An empty list renders nothing rather than placeholders.
// `logo` is an imported image; without one the name renders as set type.
export const SPONSORS: { name: string; logo?: string; url?: string }[] = [
  { name: "Texas Instruments" },
  { name: "Coca-Cola" },
  { name: "CORVAC Composites" },
  { name: "Anduril" },
  { name: "The Ohio State University" },
];

// Slide: "Work Philosophy": three cards + Research/Design/Test/Refine cycle
export const WORK_PHILOSOPHY: PhilosophyCard[] = [
  {
    icon: "ArrowsClockwise",
    title: "Prototype to Learn",
    points: [
      "Multi-prototype development",
      "Early flight testing",
      "Data-driven refinement",
    ],
  },
  {
    icon: "UsersThree",
    title: "Adaptive Teams",
    points: [
      "Cross-project collaboration",
      "Flexible contribution paths",
      "Shared technical ownership",
    ],
  },
  {
    icon: "MagnifyingGlass",
    title: "Research Drives Engineering",
    points: [
      "Trade studies and literature",
      "Simulation and test planning",
      "Experimental validation",
    ],
  },
];

export const PROCESS_STEPS = ["Research", "Design", "Test", "Refine"];

// Slide: "Positions": organizational hierarchy, top tier first
export const POSITION_TIERS: string[][] = [
  ["President", "Vice President", "Technical Director"],
  ["Program Managers", "Directors"],
  ["Leads"],
  ["Engineers"],
  ["Members"],
];

export const UNIT_LABELS = ["Design Units", "Work Units", "Actions"];

// Ongoing hardware projects, shown in the navbar "Projects" dropdown.
// Each entry gets a page at /projects/<slug> automatically.
export const PROJECTS: ProjectItem[] = [
  {
    name: "EDF Engine Test Bed",
    slug: "edf-test-bed",
    status: "In Development",
    blurb:
      "An electric ducted fan aircraft flown in two configurations, first on a complete flight definition and then on control and data systems we build ourselves.",
    description:
      "The EDF Test Bed is our first flying platform and the foundation for everything after it. V01 flies the aircraft under a complete flight definition, which establishes our flight operations, safety procedures, and a baseline set of performance data. V02 flies the same airframe using data collection and control methods developed in house, replacing the stock systems with our own avionics and instrumentation. Proving both stages on a recoverable, low risk platform is what makes the turbine powered aircraft that follow possible.",
    image: edfTestBedPhoto,
    imageAlt: "BExA EDF test bed aircraft",
    gallery: [
      { src: v01Assembly, alt: "Airframe assembly on the V01 EDF test bed" },
      { src: v01FanInstall, alt: "Installing the ducted fan unit into the V01 airframe" },
    ],
  },
  {
    name: "JetCat Hot Fire and Characterization",
    slug: "jetcat-characterization",
    status: "In Planning",
    blurb:
      "Ground testing a JetCat turbine to characterize thrust, fuel flow, and thermal behavior before it is integrated into an airframe.",
    description:
      "Before a turbine goes into an aircraft, we need measured data on how it actually behaves. This project runs a JetCat engine through hot fire testing on an instrumented stand, recording thrust, fuel consumption, exhaust gas temperature, and spool response across the operating range. The scope covers test stand design, instrumentation and data acquisition, and the operating procedures that jet fuel and high temperature exhaust require. The resulting performance envelope is what our first turbine powered airframe gets designed around.",
  },
  {
    name: "Custom Jet Powered Aircraft",
    slug: "custom-jet-aircraft",
    status: "Planned",
    blurb:
      "A jet powered aircraft designed and manufactured entirely in house, targeting flight by May 2027.",
    description:
      "Our first aircraft built from our own design rather than adapted from an existing airframe. Structure, propulsion integration, avionics, and control systems are all designed, manufactured, and tested by the team. The target is a flying jet powered vehicle by May 2027. It depends on the flight operations proven on the EDF test bed and the engine data produced by turbine characterization, which is why those two projects come first.",
    image: supersonicTeaser,
    imageAlt: "Custom jet powered aircraft, in development",
  },
];

export const PILLARS: Pillar[] = [
  {
    title: "Autonomous Systems",
    description:
      "Developing intelligent flight control systems and autonomous decision-making capabilities for unmanned platforms.",
    icon: "Robot",
  },
  {
    title: "High Speed Aerodynamics",
    description:
      "Modeling, simulating, and testing aerodynamic performance from subsonic through transonic flight regimes.",
    icon: "Wind",
  },
  {
    title: "Propulsion",
    description:
      "Designing, integrating, and validating propulsion systems from electric ducted fans to jet turbine engines.",
    icon: "Engine",
  },
  {
    title: "Flight Test & Systems Integration",
    description:
      "End-to-end test planning, safety compliance, data collection, and full-system integration for every prototype.",
    icon: "AirplaneTilt",
  },
];

export const TEAMS_PREVIEW: TeamPreview[] = [
  {
    name: "Propulsion",
    slug: "propulsion",
    description: "Design, integration, and testing of all propulsion systems.",
    icon: "Engine",
  },
  {
    name: "Aerothermal",
    slug: "aerothermal",
    description: "CFD modeling, wind-tunnel testing, and thermal analysis.",
    icon: "Thermometer",
  },
  {
    name: "Structures",
    slug: "structures",
    description: "Airframe design, FEA, and composite manufacturing.",
    icon: "CubeTransparent",
  },
  {
    name: "Controls",
    slug: "controls",
    description: "Flight dynamics modeling and autonomous control systems.",
    icon: "SlidersHorizontal",
  },
  {
    name: "Avionics",
    slug: "avionics",
    description: "Flight computers, sensors, telemetry, and PCB design.",
    icon: "Cpu",
  },
  {
    name: "Flight Test",
    slug: "flight-test",
    description: "Test planning, safety, airspace authorization, and data.",
    icon: "AirplaneTilt",
  },
  {
    name: "Business",
    slug: "business",
    description: "Budgets, sponsorship, outreach, and events.",
    icon: "Briefcase",
  },
];

export const TEAMS_DETAIL: TeamDetail[] = [
  {
    name: "Propulsion",
    slug: "propulsion",
    icon: "Engine",
    lead: "TBD",
    description:
      "Design, integration, testing, and validation of all propulsion systems including electric ducted fans, turbine engines, fuel systems, and thermal protections.",
    software: ["MATLAB/Simulink", "Siemens NX", "LabVIEW", "StarCCM+"],
    hardware: ["JetCat/EDF engines", "Test stands", "Sensors"],
    skills: ["Thermodynamics", "Fluid mechanics", "CAD", "Test engineering"],
  },
  {
    name: "Aerothermal",
    slug: "aerothermal",
    icon: "Thermometer",
    lead: "TBD",
    description:
      "CFD modeling, wind-tunnel testing, thermal load analysis, and aeroelastic simulations to characterize aerodynamic performance across all flight regimes.",
    software: [
      "StarCCM+",
      "Siemens NX",
      "LabVIEW",
      "Paraview",
      "Ohio Supercomputer Center",
    ],
    hardware: [
      "Subsonic and high-speed wind tunnels",
      "Pressure scanners",
      "Keil probes",
    ],
    skills: ["Aerodynamics", "CFD", "Heat transfer", "Data analysis"],
  },
  {
    name: "Structures",
    slug: "structures",
    icon: "CubeTransparent",
    lead: "TBD",
    description:
      "Airframe design, finite element analysis, composite manufacturing with detailed layup schedules, and structural testing to validate airframe integrity.",
    software: ["Siemens NX", "SimCenter"],
    hardware: ["3D printers", "Vacuum pump", "Machine shop", "Tooling board"],
    skills: ["Structural analysis", "FEA", "Composites", "Manufacturing"],
  },
  {
    name: "Controls",
    slug: "controls",
    icon: "SlidersHorizontal",
    lead: "TBD",
    description:
      "Six-degree-of-freedom dynamic modeling, control law development, autonomous flight systems, and abort logic for safe unmanned operations.",
    software: ["MATLAB/Simulink", "Python", "X-Plane"],
    hardware: [
      "Flight controllers",
      "Servos",
      "Sensor suites",
      "HIL rigs",
      "RC/telemetry links",
    ],
    skills: ["Control theory", "Dynamics", "MATLAB", "Embedded systems"],
  },
  {
    name: "Avionics",
    slug: "avionics",
    icon: "Cpu",
    lead: "TBD",
    description:
      "Flight computers, sensor suites, telemetry systems, power distribution, and PCB design for all onboard electronic systems.",
    software: ["MATLAB/Simulink", "Altium", "QGroundControl"],
    hardware: [
      "Flight computer",
      "Soldering station",
      "Telemetry radio",
      "Data logger",
    ],
    skills: [
      "Electronics",
      "PCB design",
      "Embedded programming",
      "Soldering",
    ],
  },
  {
    name: "Flight Test",
    slug: "flight-test",
    icon: "AirplaneTilt",
    lead: "TBD",
    description:
      "Test planning, safety compliance, FAA airspace authorization, flight data collection, and vehicle recovery for every prototype mission.",
    software: ["LabVIEW", "MATLAB/Simulink", "QGroundControl"],
    hardware: [
      "Ground control station",
      "Recovery parachutes",
      "Fire suppression",
      "Weather station",
    ],
    skills: [
      "Test engineering",
      "Safety analysis",
      "Data acquisition",
      "Flight operations",
    ],
  },
  {
    name: "Business",
    slug: "business",
    icon: "Briefcase",
    lead: "TBD",
    description:
      "Budget management, corporate sponsorship acquisition, community outreach, social media, and event coordination for the organization.",
    software: ["Adobe Suite", "Excel", "PowerPoint"],
    hardware: ["N/A"],
    skills: [
      "Marketing",
      "Finance",
      "Communications",
      "Graphic design",
      "Event planning",
    ],
  },
];

export const PROTOTYPES: Prototype[] = [
  {
    title: "Prototype 1: EDF",
    badge: "Active",
    timeline: "Fall 2026",
    description:
      "Electric ducted fan integration with bench and flight testing to validate our airframe and systems architecture.",
  },
  {
    title: "Prototype 2: Jet Engine",
    badge: "Upcoming",
    timeline: "Spring 2027",
    description:
      "Turbine-powered flight with full fuel system validation and high-thrust performance testing.",
  },
  {
    title: "Prototype 3: High-Speed",
    badge: "Upcoming",
    timeline: "Fall 2027 - Spring 2028",
    description:
      "Transonic flight testing and Guinness World Record attempt for fastest unmanned aircraft.",
  },
];

export const PROTOTYPES_DETAIL: PrototypeDetail[] = [
  {
    title: "Prototype 1: EDF",
    badge: "Active",
    timeline: "Fall 2026",
    description:
      "Electric ducted fan integration with bench and flight testing to validate our airframe and systems architecture.",
    objective:
      "Validate airframe design and systems architecture using an electric ducted fan propulsion system.",
    milestones: [
      "EDF integration",
      "Bench test campaign",
      "First flight",
      "Data review",
    ],
    teamsInvolved: [
      "Propulsion",
      "Structures",
      "Controls",
      "Avionics",
      "Flight Test",
    ],
    image: v01Assembly,
    imageAlt: "Airframe assembly on the V01 EDF test bed",
  },
  {
    title: "Prototype 2: Jet Engine",
    badge: "Upcoming",
    timeline: "Spring 2027",
    description:
      "Turbine-powered flight with full fuel system validation and high-thrust performance testing.",
    objective:
      "Achieve turbine-powered flight with validated fuel system and thermal management.",
    milestones: [
      "Engine integration",
      "Fuel system validation",
      "Flight test series",
      "Performance analysis",
    ],
    teamsInvolved: [
      "Propulsion",
      "Aerothermal",
      "Structures",
      "Controls",
      "Avionics",
      "Flight Test",
    ],
  },
  {
    title: "Prototype 3: High-Speed",
    badge: "Upcoming",
    timeline: "Fall 2027 - Spring 2028",
    description:
      "Transonic flight testing and Guinness World Record attempt for fastest unmanned aircraft.",
    objective:
      "Attempt Guinness World Record for fastest unmanned aircraft through transonic flight testing.",
    milestones: [
      "High-speed airframe design",
      "Transonic CFD validation",
      "Flight test series",
      "Record attempt",
    ],
    teamsInvolved: ["All teams"],
  },
];

export const JOIN_VALUE_PROPS: ValueProp[] = [
  {
    icon: "Wrench",
    title: "Hands-On Engineering",
    body: "Work with MATLAB, Siemens NX, StarCCM+, wind tunnels, composites labs, and real propulsion hardware, not just textbook theory.",
  },
  {
    icon: "Users",
    title: "Real Team Experience",
    body: "Collaborate across six engineering disciplines on a shared mission. Practice the cross-functional teamwork that top employers look for.",
  },
  {
    icon: "Trophy",
    title: "Build Your Resume",
    body: "Design, build, test, and fly unmanned aircraft. Present results. Publish data. Stand out in internship and job interviews.",
  },
];

export const SPONSOR_VALUE_PROPS: ValueProp[] = [
  {
    icon: "GraduationCap",
    title: "Talent Pipeline",
    body: "Get direct access to top engineering students. BExA members graduate with hands-on experience in propulsion, structures, avionics, and flight test.",
  },
  {
    icon: "Eye",
    title: "Brand Visibility",
    body: "Your logo on our aircraft, website, presentations, and event materials, seen by hundreds of engineering students, faculty, and industry partners.",
  },
  {
    icon: "Handshake",
    title: "Community Impact",
    body: "Fund real student-led aerospace research. Help build the engineers who will shape the future of flight, defense, and space.",
  },
];

export const CONTACT_EMAIL = "bexa.aero@gmail.com";

// Join page interest form. Submissions POST straight into a Google Form owned
// by bexa.aero@gmail.com, so responses collect in its linked Google Sheet.
//
// The `entry.*` ids come from the form's "Get pre-filled link" output. If a
// question is ever added, removed, or reordered in Google Forms, regenerate a
// pre-filled link and update these ids.
//
// IMPORTANT: option text below must match the Google Form's choices exactly.
// Google rejects values it does not recognize, which silently drops the answer.
export const JOIN_FORM = {
  action:
    "https://docs.google.com/forms/d/e/1FAIpQLSdtCT_Ntl8_kjo9beXnoHoo8teObdXqHs_1fz93pl2d02rXQg/formResponse",
  fields: {
    fullName: "entry.1388268618",
    email: "entry.1399407890",
    year: "entry.1527919009",
    major: "entry.944276116",
    teams: "entry.1676710126",
    whyBexa: "entry.1209205276",
  },
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/buckeye-experimental-aeronautics/",
  instagram: "https://www.instagram.com/bexa.aero/",
} as const;

// From the BExA Sponsorship Packet 2026-27. Benefits are cumulative:
// each tier includes everything in the tiers below it.
export const SPONSOR_TIERS: SponsorTier[] = [
  {
    name: "Gray",
    price: "$500",
    tagline: "Get your brand on the team",
    benefits: ["Logo & link on team website", "Recognition on team social media"],
  },
  {
    name: "Scarlet",
    price: "$1,000",
    tagline: "Everything in Gray, plus",
    benefits: [
      "Sponsor spotlight feature",
      "Logo on team apparel",
      "Access to member résumé book",
    ],
  },
  {
    name: "Buckeye",
    price: "$2,500",
    tagline: "Everything in Scarlet, plus",
    benefits: [
      "Logo on aircraft",
      "Invitations to flight test & demo days",
      "Hosted recruiting event or info session",
    ],
  },
  {
    name: "Carmen",
    price: "$5,000",
    tagline: "Everything in Buckeye, plus",
    benefits: [
      "Premier logo placement (largest, all media)",
      "Aircraft naming rights",
    ],
    highlight: true,
  },
];

// NOTE: the three officer addresses were transcribed from the design mockup
// image and have NOT been verified. Confirm each one before this ships.
export const LEADERSHIP: LeadershipMember[] = [
  {
    name: "Viktor Bakhurynskyy",
    title: "President",
    linkedin: "https://www.linkedin.com/in/vikibax/",
    email: "bakhurynskyy.1@osu.edu",
  },
  {
    name: "Sam Patterson",
    title: "Technical Director",
    linkedin: "https://www.linkedin.com/in/sampatterson521/",
    email: "patterson.1368@osu.edu",
  },
  {
    name: "Quinn Cohen",
    title: "Vice President",
    linkedin: "https://www.linkedin.com/in/quinnmcohen/",
    email: "cohen.1344@osu.edu",
  },
  { name: "Dr. Matthew H. McCrink", title: "Advisor" },
];

// ---------------------------------------------------------------------------
// SITE_URL is the canonical origin, used for canonical tags, Open Graph URLs,
// and social share images. If the domain ever changes, update this line plus
// the matching URLs in public/sitemap.xml, public/robots.txt, and index.html.
// No trailing slash.
// ---------------------------------------------------------------------------
export const SITE_URL = "https://flybexa.com";

export const SEO = {
  home: {
    path: "/",
    title: "BExA - Buckeye Experimental Aeronautics",
    description:
      "BExA is a student-led aerospace engineering program building unmanned aircraft and pushing the boundaries of high-speed flight.",
  },
  teams: {
    path: "/teams",
    title: "Our Teams - BExA | Buckeye Experimental Aeronautics",
    description:
      "Explore BExA's seven specialized teams: Propulsion, Aerothermal, Structures, Controls, Avionics, Flight Test, and Business.",
  },
  efforts: {
    path: "/efforts",
    title: "Current Efforts - BExA | Buckeye Experimental Aeronautics",
    description:
      "Follow BExA's prototype roadmap from electric ducted fan testing through jet-powered transonic flight and a Guinness World Record attempt.",
  },
  join: {
    path: "/join",
    title: "Join BExA - Buckeye Experimental Aeronautics",
    description:
      "Join Buckeye Experimental Aeronautics. Work on real aerospace hardware across six engineering disciplines.",
  },
  sponsor: {
    path: "/sponsor",
    title: "Sponsor BExA - Partner With Student Aerospace Engineers",
    description:
      "Partner with BExA to support student aerospace engineering. Access top talent, gain brand visibility, and fund real flight research.",
  },
};
