import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "makan-sedap",
    title: "MakanSedap Restaurant",
    description:
      "A full-stack restaurant booking application that allows users to seamlessly order and purchase food directly from their tables.",
    image: "/images/makan-sedap.png",
    imageFit: "contain",
    imageBgClass: "bg-[#0c0e14] dark:bg-[#0c0e14]",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    status: "completed",
    linkUrl: "https://makan-sedap-restaurant.vercel.app/",
  },
  {
    id: "trylah",
    title: "TryLah! Ecommerce Platform with Virtual Try-On Technology",
    description:
      "A final-year project featuring an e-commerce platform with virtual try-on technology.",
    image: "/images/trylah.png",
    tags: ["PHP", "JavaScript", "CSS", "Blender 3D"],
    status: "completed",
  },
  {
    id: "dialects",
    title: "Mobile Platform for Sabah & Sarawak Dialects",
    description:
      "A full-stack language app that allows users to learn native languages from Sabah and Sarawak, such as Iban and Dusun",
    image: "/images/dialects.png",
    imageFit: "contain",
    imageBgClass: "bg-white dark:bg-white/95",
    tags: ["Flutter", "Dart"],
    status: "ongoing",
    linkUrl: "#",
  },
];
