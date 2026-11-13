import AuthForm from "@/components/AuthForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "";
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-4 py-16">
      {sp.error === "link" && <p className="mb-4 rounded-lg bg-amber-100 p-3 text-sm text-amber-900">That confirmation link is invalid or has expired. If you already confirmed your email, just log in. Otherwise sign up again.</p>}
      <AuthForm next={next} />
    </div>
  );
}
