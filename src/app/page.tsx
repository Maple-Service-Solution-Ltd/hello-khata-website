import HeroSection from '@/components/sections/HeroSection';
import TransformationSection from '@/components/sections/TransformationSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TrustedBySection from '@/components/sections/TrustedBySection';
import StatsTickerSection from '@/components/sections/StatsTickerSection';
import InteractiveDemoSection from '@/components/sections/InteractiveDemoSection';
import LiveActivitySection from '@/components/sections/LiveActivitySection';


const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <TransformationSection />
            <HowItWorksSection />
            <InteractiveDemoSection />
            <TrustedBySection />
            <StatsTickerSection />
            <LiveActivitySection />
        </div>
    )
}

export default HomePage