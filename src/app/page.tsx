import Hero from "@/components/Hero";
import BlogSection from "@/components/homepage/BlogSection";
import EventSection from "@/components/homepage/EventSection";
import HorizontalSection from "@/components/homepage/HorizontalSection";
import Introduction from "@/components/homepage/Introduction";
import EyeCatcher from "@/components/shared/EyeCatcher";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <HorizontalSection />
      <div className="padding-x">
        <EventSection />
        <BlogSection />
      </div>
      <EyeCatcher />
    </>
  );
}
