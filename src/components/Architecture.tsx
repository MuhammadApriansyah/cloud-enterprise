export default function Architecture() {
  return (
    <section id="architecture" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">System Architecture</h2>
          <p className="text-lg text-slate-600">Unified data flow from Edge to Cloud.</p>
        </div>

        <div className="relative border-l-2 border-indigo-200 ml-4 md:ml-0 space-y-12">
          {/* Step 1: Client Request */}
          <div className="relative pl-8 md:pl-0 md:flex md:items-center">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full"></div>
            <div className="md:w-1/2 md:pr-12 md:text-right">
              <h3 className="text-xl font-bold text-slate-900">Client Request</h3>
              <p className="text-slate-600">Upload initiates via Next.js Frontend using secure access token.</p>
            </div>
          </div>

          {/* Step 2: Hybrid Gateway */}
          <div className="relative pl-8 md:pl-0 md:flex md:items-center">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full"></div>
            <div className="md:w-1/2 md:ml-auto md:pl-12">
              <h3 className="text-xl font-bold text-slate-900">Hybrid Storage Gateway</h3>
              <p className="text-slate-600">Backend routes data streams to local disk or redirects to Google Drive API.</p>
            </div>
          </div>

          {/* Step 3: Persistence */}
          <div className="relative pl-8 md:pl-0 md:flex md:items-center">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full"></div>
            <div className="md:w-1/2 md:pr-12 md:text-right">
              <h3 className="text-xl font-bold text-slate-900">Data Persistence</h3>
              <p className="text-slate-600">Database (PostgreSQL) catalogs metadata with stateful pointers for retrieval.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

