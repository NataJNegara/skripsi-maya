import Hero from "@/components/Hero";
import BlogSection from "@/components/homepage/BlogSection";
import EventSection from "@/components/homepage/EventSection";
import WisataCategory from "@/components/homepage/WisataCategory";
import EyeCatcher from "@/components/shared/EyeCatcher";

export default function Home() {
  return (
    <>
      <div className="min-h-screen h-full px-20">
        <Hero />
        <WisataCategory />
        <EventSection />
        <BlogSection />
      </div>
      <EyeCatcher />
    </>
  );
}
