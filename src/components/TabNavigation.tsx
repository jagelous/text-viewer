import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Info, FolderKanban, Code, Briefcase } from 'lucide-react';

interface TabItem {
  id: string;
  number: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const tabs: TabItem[] = [
  { id: 'home', number: '01', label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
  { id: 'about', number: '02', label: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
  { id: 'projects', number: '03', label: 'Projects', path: '/projects', icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'skills', number: '04', label: 'Skills', path: '/skills', icon: <Code className="w-4 h-4" /> },
  { id: 'experience', number: '05', label: 'Experience', path: '/experience', icon: <Briefcase className="w-4 h-4" /> },
];

export function TabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTabRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);

  const activeTab = tabs.find(tab => tab.path === location.pathname) || tabs[0];
  const activeIndex = tabs.findIndex(tab => tab.path === location.pathname);

  useEffect(() => {
    if (activeTabRef.current && indicatorRef.current) {
      const activeElement = activeTabRef.current;
      const indicator = indicatorRef.current;
      
      const updateIndicator = () => {
        const rect = activeElement.getBoundingClientRect();
        const containerRect = activeElement.parentElement?.getBoundingClientRect();
        
        if (containerRect) {
          indicator.classList.add('tab-indicator-slide');
          
          indicator.style.width = `${rect.width}px`;
          indicator.style.height = `${rect.height}px`;
          indicator.style.transform = `translateY(${rect.top - containerRect.top}px)`;
          
          setTimeout(() => {
            indicator.classList.remove('tab-indicator-slide');
          }, 400);
        }
      };

      if (activeIndex !== prevIndex) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
        setPrevIndex(activeIndex);
      }

      updateIndicator();
      window.addEventListener('resize', updateIndicator);
      
      return () => window.removeEventListener('resize', updateIndicator);
    }
  }, [activeTab, location.pathname, activeIndex, prevIndex]);

  const handleTabClick = (tab: TabItem) => {
    if (tab.path === location.pathname) return;
    
    setIsAnimating(true);
    navigate(tab.path);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <nav className="relative w-full">
      <div className="relative flex flex-col gap-1.5 p-3 rounded-2xl glass-strong backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Animated background indicator */}
        <div
          ref={indicatorRef}
          className="absolute left-3 top-3 rounded-xl bg-cyan-400/20 transition-all duration-500 ease-out"
          style={{
            zIndex: 0,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Tab items */}
        <div className="relative z-10 flex flex-col gap-1.5">
          {tabs.map((tab, index) => {
            const isActive = tab.path === location.pathname;
            
            return (
              <div
                key={tab.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => handleTabClick(tab)}
                className={`
                  group relative flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? 'text-white font-bold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }
                `}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {/* Vertical indicator bar - solid color */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-full transition-all duration-300" />
                )}

                {/* Number */}
                <span className={`
                  text-xs font-mono transition-colors duration-300
                  ${isActive ? 'text-cyan-400' : 'text-white/40'}
                `} style={isActive ? { transform: 'scale(1.2)' } : {}}>
                  {tab.number}
                </span>

                {/* Label */}
                <span className={`
                  text-sm font-medium transition-colors duration-300 flex-1
                  ${isActive 
                    ? 'text-white' 
                    : 'text-white/60 group-hover:text-white'
                  }
                `}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
