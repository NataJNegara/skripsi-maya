"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WisataSectionOne from "./WisataSectionOne";
import WisataMain from "./WisataMain";
import { BASE_URL } from "@/lib/constant";

const HorizontalSection = () => {
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let pin = undefined;
    if (window.innerWidth >= 1280) {
      pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-270vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000 top",
            scrub: 1.2,
            pin: true,
          },
        }
      );
    }

    return () => {
      pin?.kill();
    };
  }, []);

  return (
    <section className="scroll-section-outer">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
          <div className="scroll-section flex items-center justify-center">
            <WisataSectionOne />
          </div>
          <div className="scroll-section">
            <WisataMain
              title="wisata alam"
              subTitle="jelajahi keindahan alam muara enim"
              descriptionText={`Jelajahi surga hijau Muara Enim—air terjun jernih, hutan asri, dan pemandangan yang bikin betah berlama-lama.`}
              link={`${BASE_URL}/destinasi?tag=ALAM`}
              imageUrl="/images/wisata-alam.jpg"
            />
          </div>
          <div className="scroll-section">
            <WisataMain
              title="wisata budaya"
              subTitle="temukan keunikan budaya muara enim"
              descriptionText={`Rasakan hangatnya kearifan lokal, seni tradisional, dan warisan sejarah yang memikat hati.`}
              link={`${BASE_URL}/destinasi?tag=BUDAYA`}
              imageUrl="/images/wisata-budaya.jpg"
            />
          </div>
          <div className="scroll-section">
            <WisataMain
              title="wisata buatan"
              subTitle="kunjungin tempat kreasi keluarga"
              descriptionText={`Serunya atraksi buatan khas Muara Enim—tempat hiburan, spot foto, dan wahana untuk semua usia.`}
              link={`${BASE_URL}/destinasi?tag=BUATAN`}
              imageUrl="/images/wisata-buatan.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalSection;
