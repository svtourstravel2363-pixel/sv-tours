import { Car, MapPin, Plane, Mountain, Building2, TreePine, Waves, Landmark, TrainFront, UserCheck, Clock, BadgeIndianRupee, ShieldCheck } from "lucide-react";

const MAP = { car: Car, map: MapPin, plane: Plane, mountain: Mountain, city: Building2, hill: TreePine, beach: Waves, temple: Landmark, train: TrainFront, UserCheck, Clock, BadgeIndianRupee, ShieldCheck } as const;

export default function ContentIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = MAP[name as keyof typeof MAP] ?? MapPin;
  return <Icon size={size} />;
}
