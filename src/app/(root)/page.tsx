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
      <EyeCatcher
        text="setiap perjalanan bukan hanya tentang tempat tapi tentang pulang dengan cerita"
        imageSrc="/images/eye-catcher-02.jpg"
      />
      <HorizontalSection />
      <div className="padding-x">
        <EventSection />
        <BlogSection />
      </div>
      <EyeCatcher
        text={`bagikan kenangan anda`}
        secondText="#TandangMuaraEnim"
        imageSrc="/images/eye-catcher-01.jpg"
      />
    </>
  );
}
