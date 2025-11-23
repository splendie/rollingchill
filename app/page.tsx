import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero Section - Yellow background with centered RC logo */}
      <section className="relative min-h-screen bg-[#FDD835] flex items-center justify-center overflow-hidden">
        {/* Centered RC Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Large RC Logo - Black silhouette with capybara */}
          <div className="mb-20">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* R Letter */}
              <path d="M 30 50 L 30 250 L 50 250 L 50 160 L 90 160 L 130 250 L 155 250 L 110 155 Q 140 140 140 105 Q 140 70 110 60 Q 95 50 70 50 Z M 50 70 L 75 70 Q 95 70 105 80 Q 115 90 115 105 Q 115 120 105 130 Q 95 140 75 140 L 50 140 Z" fill="black"/>
              
              {/* C Letter */}
              <path d="M 170 250 Q 130 250 105 225 Q 80 200 80 150 Q 80 100 105 75 Q 130 50 170 50 Q 200 50 220 65 L 205 85 Q 190 75 170 75 Q 140 75 120 95 Q 100 115 100 150 Q 100 185 120 205 Q 140 225 170 225 Q 190 225 205 215 L 220 235 Q 200 250 170 250 Z" fill="black"/>
              
              {/* Capybara silhouette inside R */}
              <ellipse cx="70" cy="110" rx="15" ry="12" fill="#FDD835"/>
              <ellipse cx="65" cy="108" rx="4" ry="5" fill="#FDD835"/>
              <ellipse cx="75" cy="108" rx="4" ry="5" fill="#FDD835"/>
              <circle cx="65" cy="107" r="2" fill="black"/>
              <circle cx="75" cy="107" r="2" fill="black"/>
              <ellipse cx="70" cy="112" rx="2" ry="1.5" fill="black"/>
            </svg>
          </div>
        </div>

        {/* Scroll Down Indicator - Bottom Right */}
        <div className="absolute bottom-10 right-10 animate-bounce">
          <div className="flex flex-col items-center">
            {/* Capybara illustration */}
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
              <ellipse cx="50" cy="60" rx="35" ry="30" fill="#8D6E63"/>
              <ellipse cx="40" cy="50" rx="8" ry="10" fill="#6D4C41"/>
              <ellipse cx="60" cy="50" rx="8" ry="10" fill="#6D4C41"/>
              <circle cx="40" cy="48" r="3" fill="#000"/>
              <circle cx="60" cy="48" r="3" fill="#000"/>
              <ellipse cx="50" cy="58" rx="4" ry="3" fill="#4E342E"/>
              <path d="M 45 62 Q 50 65 55 62" stroke="#4E342E" strokeWidth="2" fill="none"/>
              <ellipse cx="25" cy="70" rx="12" ry="15" fill="#A1887F"/>
              <ellipse cx="75" cy="70" rx="12" ry="15" fill="#A1887F"/>
            </svg>
            <span className="text-white text-sm font-medium mb-1">Scroll Down</span>
            <ArrowDown className="w-5 h-5 text-white" />
          </div>
        </div>
      </section>

      {/* More sections will be added here */}
    </main>
  );
}
