export default function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
    </div>
  );
}
