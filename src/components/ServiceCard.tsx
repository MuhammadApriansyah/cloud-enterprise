interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="relative group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 shadow-xl hover:shadow-indigo-500/5 overflow-hidden">
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Animated Icon Container */}
        <div className="mb-6 inline-flex p-3 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}

