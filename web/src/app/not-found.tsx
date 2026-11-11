import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell text-center">
        <p className="label">Error 404</p>
        <h1 className="display h-page mt-5">This page isn&apos;t here.</h1>
        <p className="lede mx-auto mt-6 max-w-md">
          The link may be old, or the page may have moved. The work and the contact page are still where
          they should be.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary w-full sm:w-auto">
            Back to home
          </Link>
          <Link href="/work" className="btn btn-ghost w-full sm:w-auto">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
