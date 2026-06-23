import { Link } from "react-router-dom";
import { ROUTES } from "../routes/ROUTES";

export default function RepairRequestSuccess() {
  return (
    <div className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-gray-800 bg-neutral-950 p-12 text-center shadow-2xl">

        <div className="mb-8 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
            <svg
              className="h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <span className="inline-flex rounded-full border border-blue-800 px-5 py-2 text-sm font-medium text-blue-400">
          Request Submitted
        </span>

        <h1 className="mt-8 text-5xl font-bold text-white">
          Repair Request Sent Successfully
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
          Thank you for contacting us.
          Your repair request has been successfully received and forwarded to
          our technical team for review.
        </p>

        <div className="mt-10 rounded-2xl border border-blue-900 bg-blue-950/40 p-6">
          <p className="text-lg text-blue-300">
            We will review your request and contact you within
            <span className="font-bold text-white">
              {" "}
              24 to 48 hours
            </span>{" "}
            by email or phone.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-black p-6">
            <p className="text-3xl font-bold text-blue-500">1</p>
            <p className="mt-3 text-gray-400">
              Request Received
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-black p-6">
            <p className="text-3xl font-bold text-blue-500">2</p>
            <p className="mt-3 text-gray-400">
              Technical Review
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-black p-6">
            <p className="text-3xl font-bold text-blue-500">3</p>
            <p className="mt-3 text-gray-400">
              Customer Contact
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to={ROUTES.HOME}
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Back to Home
          </Link>

          <Link
            to={ROUTES.REPAIR_REQUEST_CREATE}
            className="rounded-xl border border-gray-700 px-8 py-4 font-semibold text-gray-300 transition hover:border-blue-500 hover:text-white"
          >
            Submit Another Request
          </Link>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500">
            Repair Flow • Professional Device Repair Management
          </p>
        </div>
      </div>
    </div>
  );
}