import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="lost-planet" aria-hidden="true"><i /></div>
      <p className="eyebrow">ERROR / 404</p>
      <h1>Lost in space.</h1>
      <p>This coordinate does not exist in Noor’s portfolio.</p>
      <Link className="primary-action" href="/">Return to the galaxy</Link>
    </main>
  );
}
