import { WorkItem, ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "Web Design/Development",
    tags: "Intuitive Websites • Custom Layouts • Mobile Responsiveness",
    desc: "We build fast, responsive, and highly interactive web experiences tailored to your brand's unique needs.",
    price: "$1,000 - $5000+ depending on project scope and complexity",
  },
  {
    num: "02",
    title: "UI/UX & Graphic Designs",
    tags: "Mock Ups • User Experience First Design • Logos • Graphics",
    desc: "We create UI/UX & graphic designs focusing on intuitive user journeys, wireframing, and high-fidelity prototyping.",
    price: "$50 - $1000+ depending on project scope and complexity",
  },
  {
    num: "03",
    title: "SEO",
    tags: "Advertisement • Web Optimization",
    desc: "Optimize your digital presence to rank higher on search engines and drive organic, high-converting traffic.",
    price: "$200 - $1000+ depending on project scope and complexity",
  },
  {
    num: "04",
    title: "AI Automation",
    tags: "AI Chatbots • Integrated AI Tools • Email Summary",
    desc: "Streamline your workflows with custom AI solutions that save time and enhance customer interactions.",
    price: "$100 - $1000+ depending on project scope and complexity",
  },
];

export const WORK_EXPERIENCE: WorkItem[] = [
  {
    id: "1",
    title: "Web Developer / Designer",
    client: "IHConcept",
    description:
      "Modified and maintained company web pages in WordPress using a custom theme, applying HTML, CSS, PHP, and JavaScript.",
    longDescription:
      "Modified and maintained company web pages in WordPress using a custom theme, applying HTML, CSS, PHP, and JavaScript to create visually appealing, responsive, and intuitive user interfaces. Collaborated on design and UX decisions, enhancing navigation and layout, which improved site usability and boosted visitor engagement by 25%. Optimized site performance through custom CSS styling, front-end adjustments, and design improvements, reducing load times.",
    tags: ["WordPress", "PHP", "JavaScript", "HTML/CSS", "UX/UI"],
    coverUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    recordLabelColor: "#6488EA", // Cornflower
    year: "Sep 2025 - Present",
    websiteUrl: "https://ihconcept.com",
  },
  {
    id: "2",
    title: "Web Designer",
    client: "Treasure Taste",
    description:
      "Designed and developed a responsive website for a local restaurant, showcasing their mission, vision, and menu.",
    longDescription:
      "Designed and developed a responsive website for a local restaurant, showcasing their mission, vision, and menu while strengthening their digital presence. Created custom images, vectors, and icons in Adobe Photoshop and Illustrator, and built wireframes and prototypes in Figma, refining designs through client feedback to align with branding goals. Implemented the final site using HTML, CSS, and JavaScript.",
    tags: ["Figma", "Photoshop", "Illustrator", "HTML/CSS", "Branding"],
    coverUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    recordLabelColor: "#f59e0b", // Amber
    year: "May 2025 - Aug 2025",
    websiteUrl: "#",
  },
  {
    id: "3",
    title: "Web Designer Chair",
    client: "Lambda Phi Epsilon",
    description:
      "Developed, designed, and maintained the fraternity’s chapter official website, leading to a 30% increase in user engagement.",
    longDescription:
      "Developed, designed, and maintained the fraternity’s chapter official website, incorporating a responsive, interactive, and user-friendly interface using HTML, CSS, and JavaScript. Conducted user research and gathered feedback from fraternity members and external users to identify areas for improvement. Implemented performance optimizations and integrated SEO best practices.",
    tags: ["Leadership", "SEO", "User Research", "Web Development"],
    coverUrl:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
    recordLabelColor: "#1C2B4B", // Midnight Blue
    year: "Jan 2024 - May 2025",
    websiteUrl: "#",
  },
];
