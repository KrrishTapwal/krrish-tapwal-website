import Link from "next/link";
import MountainScene from "@/components/MountainScene";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-24">
      <MountainScene className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full opacity-70" />
      <div className="container-x text-center">
        <p className="eyebrow justify-center">404 · Raasta bhatak gaye?</p>
        <h1 className="mt-5 text-6xl font-extrabold sm:text-8xl">Trail not found</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-mist">Yeh page pahadon mein kahin kho gaya. Chalo wapas base camp chalte hain.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </section>
  );
}
