export const company = {
  name: "Humanoid Movers",
  short: "HUMANOID",
  domain: "humanoidmovers.com",
  tagline: "The last moving company.",
  lede: "A commercial humanoid fleet that packs, lifts, loads, and unpacks entire homes — with the care of a conservator and the strength of a freight crew.",
  email: "dispatch@humanoidmovers.com",
  press: "press@humanoidmovers.com",
  phone: "+1 (415) 555-0140",
  hq: "Pier 70, San Francisco",
  founded: "2024",
};

export const nav = [
  { href: "/fleet", label: "Fleet" },
  { href: "/operations", label: "Operations" },
  { href: "/live", label: "Live" },
  { href: "/coverage", label: "Coverage" },
  { href: "/company", label: "Company" },
];

export const stats = [
  { value: "0.04%", label: "Damage rate", hint: "insured inventory" },
  { value: "18 min", label: "Median arrival", hint: "core metros" },
  { value: "2,416", label: "Units in field", hint: "Atlas + Finch" },
  { value: "14", label: "Cities live", hint: "North America" },
];

export const fleet = [
  {
    id: "atlas",
    name: "Atlas",
    class: "Heavy-lift humanoid",
    image: "/media/atlas-studio.jpg",
    portrait: "/media/atlas-portrait.jpg",
    scene: "/media/piano-lift.jpg",
    payload: "1,200 lb dynamic",
    endurance: "18-hour pack",
    height: "6′1″",
    summary:
      "The spine of every crew. Atlas walks brownstone stairs, threads elevators, and relocates pianos, safes, and stone without a second body on the load.",
    specs: [
      ["Lift", "1,200 lb dynamic / 2,400 lb static"],
      ["Hands", "Force-limited, 12-DoF"],
      ["Terrain", "Stairs, gravel, marble, freight lifts"],
      ["Power", "Swap-pack, 18 h mixed duty"],
      ["Sensing", "Lidar + RGB-D + tactile skin"],
      ["Safety", "ISO/TS 15066 collaborative envelope"],
    ],
  },
  {
    id: "finch",
    name: "Finch",
    class: "Precision packer",
    image: "/media/kitchen-pack.jpg",
    portrait: "/media/hand-detail.jpg",
    scene: "/media/hallway-walk.jpg",
    payload: "0.2 mm placement",
    endurance: "22-hour pack",
    height: "5′10″",
    summary:
      "Finch wraps crystal, hangs canvases, and inventories every object it touches. Same titanium chassis as Atlas — different hands, different mind.",
    specs: [
      ["Placement", "0.2 mm repeatability"],
      ["Grip", "Soft-tip, 0–80 N adaptive"],
      ["Catalog", "On-device object graph"],
      ["Specialties", "Art, wine, instruments, couture"],
      ["Scan", "Room mesh in under 90 s"],
      ["Unpack", "Room-faithful placement map"],
    ],
  },
  {
    id: "hauler",
    name: "Hauler",
    class: "Autonomous freight",
    image: "/media/night-load.jpg",
    portrait: "/media/night-load.jpg",
    scene: "/media/night-load.jpg",
    payload: "1,800 cu ft",
    endurance: "320-mile range",
    height: "Class 4 EV",
    summary:
      "A silent electric bay that docks six humanoids and a household. Level-4 urban autonomy, night-legal, and quiet enough for a 2 a.m. SoHo load-out.",
    specs: [
      ["Volume", "1,800 cubic feet"],
      ["Bay", "6 humanoid berths"],
      ["Drive", "Level-4 urban, remote copilot"],
      ["Range", "320 miles packed"],
      ["Noise", "48 dB at curb"],
      ["Climate", "Art-grade humidity lock"],
    ],
  },
];

export const operations = [
  {
    n: "01",
    title: "Scan",
    kicker: "Ninety seconds",
    body: "A Finch unit meshes the origin in under ninety seconds. Every object becomes a node: mass, fragility, room, and destination. You approve the inventory from your phone — or let Oracle do it.",
    image: "/media/ops-center.jpg",
  },
  {
    n: "02",
    title: "Pack",
    kicker: "Conservator hands",
    body: "Finch wraps, crates, and labels. Atlas clears structure. Nothing is stacked by guesswork. High-value items ride in climate cells inside the Hauler.",
    image: "/media/kitchen-pack.jpg",
  },
  {
    n: "03",
    title: "Transit",
    kicker: "Night-legal freight",
    body: "Hauler rolls on a live corridor. You watch the convoy on the Live board — unit IDs, inertial load, humidity, ETA. No dispatcher radio. No “truck is running late.”",
    image: "/media/night-load.jpg",
  },
  {
    n: "04",
    title: "Unpack",
    kicker: "Room-faithful",
    body: "At destination the inverse map runs. Beds rebuilt. Art rehung to the millimeter. Kitchen put away. The crew walks out. The apartment looks lived-in, not abandoned.",
    image: "/media/hero-penthouse.jpg",
  },
];

export const cities = [
  { id: "sfo", name: "San Francisco", region: "Bay Area", x: 9, y: 46, status: "hub", eta: "12 min" },
  { id: "lax", name: "Los Angeles", region: "SoCal", x: 14, y: 64, status: "hub", eta: "14 min" },
  { id: "sea", name: "Seattle", region: "PNW", x: 11, y: 22, status: "live", eta: "16 min" },
  { id: "pdx", name: "Portland", region: "PNW", x: 10, y: 30, status: "live", eta: "19 min" },
  { id: "den", name: "Denver", region: "Mountain", x: 34, y: 44, status: "live", eta: "17 min" },
  { id: "phx", name: "Phoenix", region: "Southwest", x: 24, y: 64, status: "live", eta: "18 min" },
  { id: "aus", name: "Austin", region: "Texas", x: 44, y: 70, status: "hub", eta: "13 min" },
  { id: "dal", name: "Dallas", region: "Texas", x: 46, y: 60, status: "live", eta: "16 min" },
  { id: "chi", name: "Chicago", region: "Midwest", x: 60, y: 38, status: "hub", eta: "15 min" },
  { id: "nsh", name: "Nashville", region: "South", x: 64, y: 54, status: "live", eta: "20 min" },
  { id: "atl", name: "Atlanta", region: "South", x: 70, y: 62, status: "live", eta: "18 min" },
  { id: "mia", name: "Miami", region: "Florida", x: 78, y: 84, status: "live", eta: "16 min" },
  { id: "nyc", name: "New York", region: "Northeast", x: 84, y: 36, status: "hub", eta: "11 min" },
  { id: "bos", name: "Boston", region: "Northeast", x: 88, y: 30, status: "live", eta: "17 min" },
];

export const jobs = [
  { id: "HM-14B", city: "San Francisco", route: "Pacific Heights → Mission Bay", unit: "ATLAS-07", status: "unpacking" },
  { id: "HM-22F", city: "New York", route: "West Village → DUMBO", unit: "FINCH-19", status: "packing" },
  { id: "HM-08A", city: "Los Angeles", route: "Los Feliz → Santa Monica", unit: "HAULER-03", status: "transit" },
  { id: "HM-31C", city: "Austin", route: "Clarksville → East Cesar Chavez", unit: "ATLAS-12", status: "scan" },
  { id: "HM-19D", city: "Chicago", route: "Lincoln Park → West Loop", unit: "FINCH-04", status: "unpacking" },
  { id: "HM-44K", city: "Miami", route: "Coconut Grove → Edgewater", unit: "HAULER-11", status: "transit" },
  { id: "HM-02S", city: "Seattle", route: "Capitol Hill → Ballard", unit: "ATLAS-21", status: "packing" },
  { id: "HM-17M", city: "Denver", route: "Highlands → RiNo", unit: "FINCH-08", status: "scan" },
];

export const cases = [
  {
    title: "A Bösendorfer, three floors, no crane.",
    city: "Brooklyn Heights",
    image: "/media/piano-lift.jpg",
    body: "Atlas walked a 9-foot concert grand down a brownstone stair with inertial damping the whole way. Zero wall contact. The owner stayed at dinner.",
  },
  {
    title: "A penthouse in the rain.",
    city: "Pacific Heights",
    image: "/media/hero-penthouse.jpg",
    body: "Fourteen rooms, a wine wall, and a 2 a.m. building window. Finch packed 1,842 objects. Hauler was gone before the doorman changed shifts.",
  },
  {
    title: "Crystal, not cardboard.",
    city: "West Hollywood",
    image: "/media/hand-detail.jpg",
    body: "A 1920s Meissen service. Finch wrapped each cup in a custom foam negative milled on the truck. Insurance never opened a claim.",
  },
];

export const sizes = [
  { id: "studio", label: "Studio", base: 890 },
  { id: "1br", label: "1 bedroom", base: 1480 },
  { id: "2br", label: "2 bedroom", base: 2190 },
  { id: "3br", label: "3 bedroom", base: 2940 },
  { id: "4br", label: "4+ bedroom", base: 3720 },
  { id: "office", label: "Office / studio loft", base: 4100 },
];

export const extras = [
  { id: "piano", label: "Piano", price: 240 },
  { id: "art", label: "Fine art wall", price: 320 },
  { id: "wine", label: "Wine cellar", price: 180 },
  { id: "safe", label: "Safe / stone", price: 280 },
  { id: "auto", label: "Vehicle", price: 400 },
  { id: "pool", label: "Pool table", price: 260 },
];

export const tickerItems = [
  "ATLAS-07 unpacking · Pacific Heights",
  "HAULER-03 in corridor · LAX-WST",
  "FINCH-19 inventory locked · 1,842 objects",
  "Damage rate 0.04% trailing 90d",
  "NYC hub · 11 min median arrival",
  "ORACLE reroute · rain cell over SoMa",
  "FINCH-04 hanging canvas · West Loop",
  "Crew 22F complete · DUMBO",
];
