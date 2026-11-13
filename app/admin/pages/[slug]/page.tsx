import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LEGAL_DEFAULTS, serializeBody } from "@/lib/legal";
import { savePage } from "@/app/actions";
import { inputCls } from "@/components/Field";

export default async function AdminPage({ params }: PageProps<"/admin/pages/[slug]">) {
  const { slug } = await params;
  const def = LEGAL_DEFAULTS[slug];
  if (!def) notFound();
  const supabase = await createClient();
  const { data } = await supabase.from("site_pages").select("*").eq("slug", slug).maybeSingle();
  const saved = !!data && !!data.body.trim();
  const body = saved ? data!.body : serializeBody(def.sections);
  const lbl = "block text-sm font-medium text-slate-700";
  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">{def.title}</h1>
      <p className="mb-6 text-sm text-slate-600">Edit the text of this page. Start each section with <code>## Heading</code>, then write paragraphs separated by a blank line. <a href={`/${slug}`} target="_blank" className="font-semibold text-indigo-700">View page</a></p>
      <form action={savePage} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <input type="hidden" name="slug" value={slug} />
        <label className={lbl}>Page title<input name="title" defaultValue={data?.title || def.title} required className={inputCls + " mt-1"} /></label>
        <label className={lbl}>Last updated (text shown on page)<input name="updated" defaultValue={data?.updated || def.updated} className={inputCls + " mt-1"} /></label>
        <label className={lbl}>Introduction<textarea name="intro" rows={4} defaultValue={data?.intro ?? def.intro} className={inputCls + " mt-1"} /></label>
        <label className={lbl}>Sections<textarea name="body" rows={24} defaultValue={body} className={inputCls + " mt-1 font-mono text-sm"} /></label>
        <button className="rounded-lg bg-slate-900 px-6 py-2.5 font-semibold text-white">Save Page</button>
        {!saved && <p className="text-xs text-slate-500">Showing the current website text. Saving stores it so you can change it later. (If saving fails, run <code>supabase/content2.sql</code> first.)</p>}
      </form>
    </div>
  );
}
