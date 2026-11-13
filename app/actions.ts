"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SETTING_DEFAULTS } from "@/lib/content";
import { uploadImage } from "@/lib/upload";
import { createClient } from "@/utils/supabase/server";

export type Result = { ok: boolean; message: string };

const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

export async function createBooking(_: Result | null, f: FormData): Promise<Result> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const { error } = await supabase.from("bookings").insert({
    user_id: auth.user?.id ?? null,
    name: s(f, "name"),
    phone: s(f, "phone"),
    service: s(f, "service"),
    vehicle: s(f, "vehicle") || null,
    pickup: s(f, "pickup"),
    drop_location: s(f, "drop") || null,
    pickup_date: s(f, "pickup_date") || null,
    pickup_time: s(f, "pickup_time") || null,
    drop_date: s(f, "drop_date") || null,
    passengers: Number(s(f, "passengers")) || null,
    notes: s(f, "notes") || null,
  });
  if (error) return { ok: false, message: "Could not save your enquiry. Please call us directly." };
  revalidatePath("/account");
  return { ok: true, message: "Enquiry received! We will contact you shortly." };
}

export async function submitReview(_: Result | null, f: FormData): Promise<Result> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { ok: false, message: "Please log in to submit a review." };
  const { error } = await supabase.from("reviews").insert({
    user_id: auth.user.id,
    name: s(f, "name"),
    rating: Number(s(f, "rating")) || 5,
    comment: s(f, "comment"),
  });
  if (error) return { ok: false, message: "Could not submit review. Try again." };
  revalidatePath("/account");
  return { ok: true, message: "Thank you! Your review will be published after admin approval." };
}

export async function login(_: Result | null, f: FormData): Promise<Result> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: s(f, "email"), password: s(f, "password") });
  if (error) return { ok: false, message: error.message };
  const next = s(f, "next");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/account");
}

export async function signup(_: Result | null, f: FormData): Promise<Result> {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "https://svtourstravel.com";
  const { data, error } = await supabase.auth.signUp({
    email: s(f, "email"),
    password: s(f, "password"),
    options: { emailRedirectTo: `${origin}/auth/callback`, data: { full_name: s(f, "full_name"), phone: s(f, "phone") } },
  });
  if (error) return { ok: false, message: error.message };
  if (!data.session) return { ok: true, message: "Account created. Check your email to confirm, then log in." };
  redirect("/account");
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");
  const { data: p } = await supabase.from("profiles").select("role").eq("id", auth.user.id).single();
  if (p?.role !== "admin") redirect("/account");
  return supabase;
}

export async function setBookingStatus(f: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("bookings").update({ status: s(f, "status") }).eq("id", s(f, "id"));
  revalidatePath("/admin", "layout");
}

export async function deleteBooking(f: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("bookings").delete().eq("id", s(f, "id"));
  revalidatePath("/admin", "layout");
}

export async function moderateReview(f: FormData) {
  const supabase = await requireAdmin();
  const id = s(f, "id");
  if (s(f, "action") === "delete") await supabase.from("reviews").delete().eq("id", id);
  else await supabase.from("reviews").update({ approved: s(f, "action") === "approve" }).eq("id", id);
  revalidatePath("/", "layout");
}

export async function updateProfile(_: Result | null, f: FormData): Promise<Result> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");
  const { error } = await supabase.from("profiles").update({ full_name: s(f, "full_name"), phone: s(f, "phone") }).eq("id", auth.user.id);
  if (error) return { ok: false, message: "Could not update profile." };
  revalidatePath("/account");
  return { ok: true, message: "Profile updated." };
}

export async function addVehicle(f: FormData) {
  const supabase = await requireAdmin();
  const photo = f.get("photo");
  let image_url = s(f, "image_url") || null;
  if (photo instanceof File && photo.size > 0) {
    const up = await uploadImage(supabase, photo, "vehicles");
    if (up.error) redirect(`/admin/vehicles?error=${encodeURIComponent(up.error)}`);
    image_url = up.url ?? image_url;
  }
  await supabase.from("vehicles").insert({
    name: s(f, "name"),
    category: s(f, "category") || "sedan",
    seats: s(f, "seats") || null,
    reg_number: s(f, "reg_number").toUpperCase() || null,
    note: s(f, "note") || null,
    image_url,
  });
  revalidatePath("/", "layout");
}

export async function setVehiclePhoto(f: FormData) {
  const supabase = await requireAdmin();
  const id = s(f, "id");
  if (s(f, "remove") === "1") {
    await supabase.from("vehicles").update({ image_url: null }).eq("id", id);
  } else {
    const photo = f.get("photo");
    if (!(photo instanceof File) || photo.size === 0) redirect("/admin/vehicles?error=" + encodeURIComponent("Choose an image first."));
    const up = await uploadImage(supabase, photo, "vehicles");
    if (up.error) redirect(`/admin/vehicles?error=${encodeURIComponent(up.error)}`);
    await supabase.from("vehicles").update({ image_url: up.url }).eq("id", id);
  }
  revalidatePath("/", "layout");
}

export async function toggleVehicle(f: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("vehicles").update({ active: s(f, "active") === "true" }).eq("id", s(f, "id"));
  revalidatePath("/", "layout");
}

export async function deleteVehicle(f: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("vehicles").delete().eq("id", s(f, "id"));
  revalidatePath("/", "layout");
}

const num = (f: FormData, k: string) => {
  const v = s(f, k);
  if (v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

export async function updateRate(f: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("rates").update({
    cars: s(f, "cars"),
    price: num(f, "price"),
    extra_km: num(f, "extra_km"),
    extra_hour: num(f, "extra_hour"),
    contact_only: f.get("contact_only") === "on",
    updated_at: new Date().toISOString(),
  }).eq("id", s(f, "id"));
  revalidatePath("/services");
  revalidatePath("/admin/rates");
}

export async function loadDefaultRates() {
  const supabase = await requireAdmin();
  const { DEFAULT_RATES } = await import("@/lib/rates");
  await supabase.from("rates").upsert(
    DEFAULT_RATES.map((r, i) => ({ ...r, sort: (i % 4) + 1 })),
    { onConflict: "kind,category", ignoreDuplicates: true }
  );
  revalidatePath("/services");
  revalidatePath("/admin/rates");
}

const KINDS = ["location", "tour", "service", "faq", "condition", "trust", "step", "stat", "vehicle_type"];
const SETTING_KEYS = Object.keys(SETTING_DEFAULTS);

function refreshSite() {
  revalidatePath("/", "layout");
}

export async function saveSettings(f: FormData) {
  const supabase = await requireAdmin();
  const rows = SETTING_KEYS.filter((k) => k !== "hero_image").map((key) => ({ key, value: s(f, key), updated_at: new Date().toISOString() }));
  const banner = f.get("hero_image_file");
  if (f.get("hero_image_remove") === "on") {
    rows.push({ key: "hero_image", value: "", updated_at: new Date().toISOString() });
  } else if (banner instanceof File && banner.size > 0) {
    const up = await uploadImage(supabase, banner, "banner", { width: 1920, height: 900 });
    if (up.error) redirect(`/admin/settings?error=${encodeURIComponent(up.error)}`);
    rows.push({ key: "hero_image", value: up.url ?? "", updated_at: new Date().toISOString() });
  }
  await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  refreshSite();
}

async function itemImage(supabase: Awaited<ReturnType<typeof requireAdmin>>, f: FormData, current: string | null) {
  if (f.get("remove_image") === "on") return null;
  const file = f.get("image");
  if (file instanceof File && file.size > 0) {
    const up = await uploadImage(supabase, file, "content");
    if (up.error) redirect(`/admin/content/tours?error=${encodeURIComponent(up.error)}`);
    return up.url ?? current;
  }
  return current;
}

export async function saveItem(f: FormData) {
  const supabase = await requireAdmin();
  const hasImageField = f.has("image");
  const extra3 = hasImageField ? await itemImage(supabase, f, s(f, "extra3") || null) : s(f, "extra3") || null;
  await supabase.from("content_items").update({
    title: s(f, "title"), subtitle: s(f, "subtitle") || null, extra: s(f, "extra") || null,
    extra2: s(f, "extra2") || null, extra3,
    sort: Number(s(f, "sort")) || 0, active: f.get("active") === "on",
  }).eq("id", s(f, "id"));
  refreshSite();
}

export async function addItem(f: FormData) {
  const supabase = await requireAdmin();
  const kind = s(f, "kind");
  if (!KINDS.includes(kind) || !s(f, "title")) return;
  const extra3 = f.has("image") ? await itemImage(supabase, f, null) : s(f, "extra3") || null;
  await supabase.from("content_items").insert({
    kind, title: s(f, "title"), subtitle: s(f, "subtitle") || null, extra: s(f, "extra") || null,
    extra2: s(f, "extra2") || null, extra3, sort: Number(s(f, "sort")) || 99,
  });
  refreshSite();
}

export async function deleteItem(f: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("content_items").delete().eq("id", s(f, "id"));
  refreshSite();
}

export async function seedKind(f: FormData) {
  const supabase = await requireAdmin();
  const kind = s(f, "kind") as "location";
  if (!KINDS.includes(kind)) return;
  const { count } = await supabase.from("content_items").select("*", { count: "exact", head: true }).eq("kind", kind);
  if (count) return;
  const { DEFAULT_ITEMS } = await import("@/lib/content");
  await supabase.from("content_items").insert(DEFAULT_ITEMS[kind].map(({ id: _id, ...r }) => r));
  refreshSite();
}

export async function savePage(f: FormData) {
  const supabase = await requireAdmin();
  const slug = s(f, "slug");
  if (!["terms", "privacy", "refund"].includes(slug)) return;
  await supabase.from("site_pages").upsert({
    slug, title: s(f, "title"), updated: s(f, "updated") || null, intro: s(f, "intro") || null,
    body: String(f.get("body") ?? "").trim(), updated_at: new Date().toISOString(),
  }, { onConflict: "slug" });
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/pages/" + slug);
}
