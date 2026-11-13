export const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200";
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<div className="mt-1">{children}</div></label>;
}
