import sharp from "sharp";
import type { SupabaseClient } from "@supabase/supabase-js";

const OK = ["image/jpeg", "image/png", "image/webp"];
export const MAX_UPLOAD = 4 * 1024 * 1024;

/** Resizes to a web-friendly WebP and uploads to the public "site-images" bucket. Returns the public URL. */
export async function uploadImage(supabase: SupabaseClient, file: File, folder: string, size = { width: 1200, height: 750 }): Promise<{ url?: string; error?: string }> {
  if (!file || file.size === 0) return {};
  if (!OK.includes(file.type)) return { error: "Please choose a JPG, PNG or WebP image." };
  if (file.size > MAX_UPLOAD) return { error: "Image is too large (max 4 MB)." };
  const input = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(input).rotate().resize({ width: size.width, height: size.height, fit: "cover" }).webp({ quality: 80 }).toBuffer();
  const path = `${folder}/${crypto.randomUUID()}.webp`;
  const { error } = await supabase.storage.from("site-images").upload(path, webp, { contentType: "image/webp", cacheControl: "31536000" });
  if (error) return { error: "Upload failed. Run supabase/storage.sql in Supabase first." };
  return { url: supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl };
}
