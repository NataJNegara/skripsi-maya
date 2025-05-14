import Hero from "@/components/Hero";
import BlogSection from "@/components/homepage/BlogSection";
import EventSection from "@/components/homepage/EventSection";
import WisataCategory from "@/components/homepage/WisataCategory";
import EyeCatcher from "@/components/shared/EyeCatcher";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="padding-x">
        <WisataCategory />
        <EventSection />
        <BlogSection />
      </div>
      <EyeCatcher />
    </>
  );
}
