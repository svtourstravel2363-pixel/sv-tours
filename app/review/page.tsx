import ReviewForm from "@/components/ReviewForm";
import Link from "next/link";

export const metadata = {
  title: "Write a Review | SV Tours & Travels",
  description: "Share your experience with SV Tours & Travels.",
};

export default function ReviewPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-3 text-center text-3xl font-extrabold text-slate-900">
        Write a Review
      </h1>

      <p className="mb-8 text-center text-slate-600">
        Share your experience with SV Tours & Travels.
      </p>

      <ReviewForm />

      <p className="mt-6 text-center">
        <Link href="/" className="font-semibold text-indigo-700">
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}