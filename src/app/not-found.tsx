import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 md:px-8">
      <p className="kicker">404 · corridor missing</p>
      <h1 className="mt-4 text-5xl md:text-7xl">This address is not on the map.</h1>
      <p className="lede mt-6">Oracle cannot stage a crew to a URL that does not exist.</p>
      <Link href="/" className="btn btn-primary mt-10">
        Return to fleet
      </Link>
    </div>
  );
}
