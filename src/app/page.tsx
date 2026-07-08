import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Secure Cloud Storage <br />
            <span className="text-indigo-600">For Enterprise Scale</span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-600 mx-auto mb-10">
            A hybrid storage architecture combining edge computing speed with decentralized cold storage reliability.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#architecture" className="px-8 py-4 font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition">
              Explore Architecture
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-3xl font-bold">Services Section Blueprint</h2>
      </section>

      <section id="architecture" className="min-h-screen flex items-center justify-center bg-slate-100">
        <h2 className="text-3xl font-bold">Architecture Section Blueprint</h2>
      </section>
    </div>
  );
}

