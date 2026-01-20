const NavButton = ({ active, onClick, icon, label, badge }: any) => (
  <button
    onClick={onClick}
    className={`relative p-3 rounded-full transition-all duration-300 group ${
      active
        ? "bg-zinc-100 text-black shadow-lg shadow-white/10"
        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
    }`}
  >
    {icon}
    {badge && !active && (
      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-zinc-900"></span>
    )}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-300 text-[10px] font-mono py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5 shadow-xl">
      {label}
    </span>
  </button>
);

export default NavButton;
