import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, CalendarCheck, Star, Users, Car, ExternalLink, IndianRupee, Settings, MapPin, Mountain, Briefcase, HelpCircle, ListChecks, FileText, ShieldCheck, ListOrdered, Gauge } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login?next=/admin");
  const { data: p } = await supabase.from("profiles").select("role,full_name").eq("id", auth.user.id).single();
  if (p?.role !== "admin") redirect("/account");
  const nav = [[LayoutDashboard, "Dashboard", "/admin"], [CalendarCheck, "Bookings", "/admin/bookings"], [Car, "Vehicles", "/admin/vehicles"], [IndianRupee, "Rates", "/admin/rates"], [Star, "Reviews", "/admin/reviews"], [Users, "Customers", "/admin/users"], [Settings, "Settings", "/admin/settings"], [Briefcase, "Services", "/admin/content/services"], [MapPin, "Locations", "/admin/content/locations"], [Mountain, "Tour Packages", "/admin/content/tours"], [HelpCircle, "FAQs", "/admin/content/faqs"], [ListChecks, "Conditions", "/admin/content/conditions"], [ShieldCheck, "Trust Strip", "/admin/content/trust"], [ListOrdered, "How It Works", "/admin/content/steps"], [Gauge, "Home Stats", "/admin/content/stats"], [Car, "Booking Vehicle Types", "/admin/content/vehicle-types"], [FileText, "Terms", "/admin/pages/terms"], [FileText, "Privacy", "/admin/pages/privacy"], [FileText, "Refund Policy", "/admin/pages/refund"]] as const;
  return (
    <div className="bg-slate-50">
      <div className="border-b border-amber-200 bg-gradient-to-r from-slate-950 to-indigo-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">Admin Panel</p><h1 className="text-xl font-extrabold">Welcome, {p?.full_name || "Admin"}</h1></div>
          <Link href="/" target="_blank" className="flex items-center gap-1 text-sm text-amber-300 hover:text-amber-200">View website <ExternalLink size={14} /></Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[210px_1fr]">
        <aside className="h-fit md:sticky md:top-20">
          <nav className="flex gap-1 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200 md:flex-col">
            {nav.map(([I, l, h]) => <Link key={h} href={h} className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-800"><I size={17} />{l}</Link>)}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
