export default function TopToolsBar() {
  return (
    <div className="fixed top-4 left-4 flex gap-2 z-50">
      <button 
        className="glassmorphism px-4 py-2 rounded-full text-white font-bold hover:bg-white/20 transition-all duration-300 golden-border"
        data-testid="button-language"
      >
        🌍 زبان
      </button>
      <button 
        className="glassmorphism px-4 py-2 rounded-full text-white font-bold hover:bg-white/20 transition-all duration-300 golden-border"
        data-testid="button-theme"
      >
        🌙 حالت شب
      </button>
      <button 
        className="glassmorphism px-4 py-2 rounded-full text-white font-bold hover:bg-white/20 transition-all duration-300 golden-border"
        data-testid="button-login"
      >
        👤 ورود
      </button>
      <div 
        className="glassmorphism px-3 py-2 rounded-full text-xs bg-green-500/30"
        data-testid="text-user-status"
      >
        کاربر: مهمان
      </div>
    </div>
  );
}
