import type { Metadata } from "next";
import Link from "next/link";
import MountainScene from "@/components/MountainScene";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-24">
      <MountainScene className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full opacity-70" />
      <div className="container-x text-center">
        <p className="eyebrow justify-center">404 · Page not found</p>
        <h1 className="mt-5 text-6xl font-extrabold sm:text-8xl">Trail not found</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-mist">This page may have moved or no longer exists. Return to the homepage to continue exploring.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Return home
        </Link>
      </div>
    </section>
  );
}
