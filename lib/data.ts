export const BIZ = {
  name: "SV Tours & Travels",
  legal: "SV Enterprises",
  tagline: "Your Journey, Our Responsibility",
  phones: ["9860740890", "9881372700"],
  whatsapp: "919860740890",
  email: "svtourstravel2363@gmail.com",
  address: "Lane no. 8, Telco Colony, Dattanagar, Ambegaon, Jambhulwadi Road, Pune 411046",
  site: "svtourstravel.com",
  instagram: "https://www.instagram.com/sv_tours_and_travels",
  instagramHandle: "@sv_tours_and_travels",
};

export const SERVICES = ["Local Travel", "Outstation Trip", "Airport Pickup & Drop", "Tour Package"];
export const VEHICLES = ["Sedan", "SUV / MUV", "Premium SUV (Innova Crysta)", "Tempo Traveller / Urbania"];

export const LOCAL = [
  { type: "Sedan", cars: "Hyundai Aura, Xcent, Glanza, Dzire", price: 2200, km: 13, hr: 100 },
  { type: "SUV / MUV", cars: "Toyota Rumion, Ertiga, Creta", price: 3000, km: 16, hr: 200 },
  { type: "Premium SUV", cars: "Toyota Innova Crysta", price: 4500, km: 20, hr: 300 },
];

export const OUTSTATION = [
  { type: "Sedan", cars: "Hyundai Aura, Xcent, Glanza, Dzire", rate: 13 },
  { type: "SUV / MUV", cars: "Rumion, Ertiga, Creta", rate: 16 },
  { type: "Premium SUV", cars: "Innova Crysta", rate: 20 },
];

export const CONDITIONS = ["Minimum running: 300 KM per day", "Toll charges: Extra", "Parking charges: Extra", "Driver allowance: Extra"];

export const TOURS = [
  { name: "Mahabaleshwar", desc: "Enjoy a refreshing trip to the beautiful hill station.", grad: "from-emerald-500 to-teal-700", colour: "green" },
  { name: "Goa", desc: "Experience beaches, scenic views and memorable journeys.", grad: "from-sky-500 to-blue-700", colour: "blue" },
  { name: "Lonavala", desc: "Discover beautiful landscapes and scenic destinations.", grad: "from-lime-500 to-green-700", colour: "lime" },
  { name: "All India Tours", desc: "Contact us to plan your preferred destination.", grad: "from-amber-500 to-orange-700", colour: "amber" },
];

export const FLEET = [
  { type: "Sedan", model: "Toyota Glanza", note: "Aura, Xcent and Dzire also available.", seats: "4 seats", kind: "sedan" as const, image: null as string | null },
  { type: "SUV / MUV", model: "Toyota Rumion", note: "Ertiga and Creta also available.", seats: "6-7 seats", kind: "suv" as const, image: null as string | null },
  { type: "Premium SUV", model: "Toyota Innova Crysta", note: "Comfortable premium travel.", seats: "7 seats", kind: "premium" as const, image: null as string | null },
  { type: "Tempo Traveller / Urbania", model: "Force Urbania", note: "Different seating capacities available.", seats: "12-17 seats", kind: "van" as const, image: null as string | null },
];

export const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
};

export const FAQ: [string, string][] = [
  ["How do I confirm a booking?", "Submit the booking form or WhatsApp us. Our team will call to confirm the vehicle, fare and driver details. A booking is confirmed only after our confirmation."],
  ["What is included in the local 8 hr / 80 km package?", "Car with driver for up to 8 hours and 80 km within the city. Extra km and extra hours are charged at the published rates."],
  ["Are toll, parking and driver allowance included in outstation trips?", "No. Toll, parking and driver allowance are extra. Outstation trips have a minimum running of 300 km per day."],
  ["Do you provide airport pickup and drop?", "Yes, for all vehicle categories. Contact us for pricing based on your route."],
  ["Can I cancel or change my booking?", "Yes. Please read our Cancellation & Refund Policy. Informing us early avoids charges."],
  ["Do you offer tour packages?", "Yes — Mahabaleshwar, Goa, Lonavala and All India tours. Contact us for packages and details."],
];

export type Place = { name: string; sub: string; icon: "plane" | "city" | "hill" | "beach" | "temple" | "train" };

export const POPULAR: Place[] = [
  { name: "Pune Airport (PNQ)", sub: "Lohegaon", icon: "plane" },
  { name: "Mumbai Airport (BOM)", sub: "Chhatrapati Shivaji Intl.", icon: "plane" },
  { name: "Mumbai", sub: "Pune to Mumbai", icon: "city" },
  { name: "Lonavala", sub: "Khandala · 65 km", icon: "hill" },
  { name: "Mahabaleshwar", sub: "Panchgani", icon: "hill" },
  { name: "Goa", sub: "Beaches & more", icon: "beach" },
  { name: "Shirdi", sub: "Sai Baba Temple", icon: "temple" },
  { name: "Nashik", sub: "Trimbakeshwar", icon: "temple" },
  { name: "Kolhapur", sub: "Mahalaxmi Temple", icon: "temple" },
  { name: "Chh. Sambhajinagar", sub: "Ajanta · Ellora", icon: "city" },
  { name: "Pune Railway Station", sub: "Pune Junction", icon: "train" },
  { name: "Hinjewadi IT Park", sub: "Pune", icon: "city" },
];

export const PLACE_SUGGESTIONS = [
  ...POPULAR.map((p) => p.name),
  "Ambegaon, Pune", "Katraj, Pune", "Swargate, Pune", "Kothrud, Pune", "Hadapsar, Pune", "Viman Nagar, Pune", "Pimpri Chinchwad", "Shivajinagar, Pune",
  "Navi Mumbai", "Thane", "Dadar, Mumbai", "Bandra, Mumbai", "Andheri, Mumbai", "Panvel", "Satara", "Sangli", "Solapur", "Nagpur",
  "Hyderabad", "Bengaluru", "Delhi", "Ahmedabad", "Jaipur", "Udaipur", "Mysuru", "Kerala", "Manali", "Varanasi",
];
