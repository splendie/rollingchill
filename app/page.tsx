import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section - Yellow background with centered RC logo */}
      <section className="relative min-h-screen bg-[#FDD835] flex items-center justify-center overflow-hidden">
        {/* Centered RC Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Large RC Logo using favicon */}
          <div className="mb-20">
            <Image 
              src="/images/logos/640.webp" 
              alt="RC Logo" 
              width={300} 
              height={300}
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
              priority
            />
          </div>
        </div>

        {/* Scroll Down Indicator - Bottom Right */}
        <div className="absolute bottom-10 right-10 animate-bounce">
          <div className="flex flex-col items-center">
            {/* Capybara illustration */}
            <Image 
              src="/images/logos/capy.webp" 
              alt="Capybara" 
              width={60} 
              height={60}
              className="mb-2 object-contain"
            />
            <span className="text-white text-sm font-medium mb-1">Scroll Down</span>
            <ArrowDown className="w-5 h-5 text-white" />
          </div>
        </div>
      </section>

      {/* More sections will be added here */}
    </main>
  );
}
