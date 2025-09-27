// DISCTRICT DATA
export async function getDistricts() {
  try {
    const res = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/districts/1603.json"
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch district data.");
  }
}

export const navigationLinks = [
  { title: "Destinasi", href: "/destinasi" },
  { title: "Event", href: "/events" },
  { title: "Blog", href: "/blogs" },
  { title: "Tentang", href: "/tentang" },
];

export const footerSocials = [
  { title: "instagram", href: "/" },
  { title: "facebook", href: "/" },
  { title: "youtube", href: "/" },
];

export const sampleData = {
  categories: [
    {
      name: "alam",
      slug: "alam",
      bannerImg: "https://muara-enim.t3.storage.dev/wisata%20alam.jpg",
      tagline: "jelajahi keindahan alam muara enim",
      description: `Jelajahi surga hijau Muara Enim—air terjun jernih, hutan asri, dan pemandangan yang bikin betah berlama-lama.`,
    },
    {
      name: "buatan",
      slug: "buatan",
      bannerImg: "https://muara-enim.t3.storage.dev/wisata%20buatan.jpg",
      tagline: "temukan keunikan budaya muara enim",
      description: `Rasakan hangatnya kearifan lokal, seni tradisional, dan warisan sejarah yang memikat hati.`,
    },
    {
      name: "budaya",
      slug: "budaya",
      bannerImg: "https://muara-enim.t3.storage.dev/wisata%20budaya.jpg",
      tagline: "kunjungin tempat kreasi keluarga",
      description: `Serunya atraksi buatan khas Muara Enim—tempat hiburan, spot foto, dan wahana untuk semua usia.`,
    },
  ],
};
