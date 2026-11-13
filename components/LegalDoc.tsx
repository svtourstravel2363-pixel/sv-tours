import LegalPage from "./LegalPage";
import { createClient } from "@/utils/supabase/server";
import { LEGAL_DEFAULTS, parseBody } from "@/lib/legal";

export async function getLegal(slug: string) {
  const base = LEGAL_DEFAULTS[slug];
  const supabase = await createClient();
  const { data } = await supabase.from("site_pages").select("*").eq("slug", slug).maybeSingle();
  if (!data || !data.body.trim()) return base;
  return { title: data.title || base.title, updated: data.updated || base.updated, intro: data.intro ?? base.intro, sections: parseBody(data.body) };
}

export default async function LegalDoc({ slug }: { slug: string }) {
  const d = await getLegal(slug);
  return <LegalPage title={d.title} updated={d.updated} intro={d.intro} sections={d.sections} />;
}
