import { Link } from "react-router-dom";
import { ROUTES } from "../routes/ROUTES";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
          Seven Tech Repair Center
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Expert phone repair for all brands and models
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Welcome to Seven Tech. We repair smartphones, screens, batteries,
          motherboards, charging ports, software issues, and we also provide
          professional data transfer services.
        </p>

        <div className="mt-10 grid gap-4 text-left md:grid-cols-4">
          {[
            "Screen repair",
            "Motherboard repair",
            "Data transfer",
            "Battery replacement",
          ].map((service) => (
            <div
              key={service}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"
            >
              <div className="mb-3 h-2 w-10 rounded-full bg-blue-500" />
              <h3 className="font-semibold text-white">{service}</h3>
            </div>
          ))}
        </div>

        <Link
          to={ROUTES.REPAIR_REQUEST_CREATE}
          className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
        >
          Start device diagnosis
        </Link>
      </section>
    </main>
  );
}
