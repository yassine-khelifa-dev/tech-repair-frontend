import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/ROUTES";

export default function RepairRequestSuccess() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-10 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-24 w-24 text-green-500" />
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Repair Request Sent Successfully
        </h1>

        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          Thank you for contacting us.
          <br />
          Your repair request has been received successfully and forwarded to
          our technical team.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="text-blue-800 font-medium">
            We will review your request and contact you within
            <span className="font-bold"> 24 to 48 hours </span>
            by email or phone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg border p-4">
            <p className="text-2xl font-bold text-blue-600">1</p>
            <p className="text-sm text-slate-600 mt-2">Request Received</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-sm text-slate-600 mt-2">Technical Review</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-slate-600 mt-2">Customer Contact</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to={ROUTES.HOME}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>

          <Link
            to={ROUTES.HOME}
            className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            New Request
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Repair Flow • Professional Device Repair Management
        </p>
      </div>
    </div>
  );
}
