import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <PageHero title="Trail Not Found" subtitle="404 · Page not found">
        <p>This page may have moved or no longer exists. Return to the homepage to continue exploring.</p>
        <Link href="/" className="btn btn-coral mt-8">
          Return Home
        </Link>
      </PageHero>
      <div className="h-24 bg-coral" />
    </>
  );
}
