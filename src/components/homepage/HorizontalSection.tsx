"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WisataSectionOne from "./WisataSectionOne";
import WisataMain from "./WisataMain";

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
            <WisataMain />
          </div>
          <div className="scroll-section">
            <WisataMain />
          </div>
          <div className="scroll-section">
            <WisataMain />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalSection;
