export default function Stars({ n }: { n: number }) {
  return <span className="text-amber-400" aria-label={`${n} out of 5`}>{"★".repeat(n)}<span className="text-slate-300">{"★".repeat(5 - n)}</span></span>;
}
