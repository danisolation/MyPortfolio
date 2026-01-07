import {
  Project,
  Education,
  Experience,
  NavItem,
  PersonalInfo,
} from "./types";

export const personalInfo: PersonalInfo = {
  name: "Tran Quoc Dung",
  title: "Software Developer",
  email: "tranquocdungb4@gmail.com",
  phone: "+84327585534",
  github: "https://github.com/danisolation",
  linkedin:
    "https://www.linkedin.com/in/tr%E1%BA%A7n-qu%E1%BB%91c-d%C5%A9ng-5317a1277/",
  image: "/images/pro5.jpg",
  bio: [
    "Hello! I'm Tran Quoc Dung, a passionate Software Developer with a strong focus on creating efficient and innovative solutions. I specialize in JavaScript (including React library, NodeJS, NestJS, NextJS) and ASP.NET.",
    "My journey began at Bach Khoa University, where I majored in Computer Science Engineer. During my studies, I developed a passion for software technology and completed various projects that laid the foundation for my career, and since then, I have been continuously honing my skills and expanding my knowledge. I thrive in dynamic environments where I can challenge myself and collaborate with others to bring ideas to life.",
    "Beyond coding, I enjoy learning about new technologies, which keeps me inspired and motivated to always deliver my best work.",
    "I'm excited to share my portfolio with you, showcasing some of the projects I've been working on. Let's create something amazing together!",
  ],
};

export const skills = [
  "devicon:cplusplus",
  "devicon:javascript",
  "devicon:csharp",
  "devicon:html5",
  "devicon:css3",
  "devicon:react",
  "devicon:nodejs",
  "devicon:nextjs",
  "devicon:express",
  "devicon:nestjs",
  "devicon:dotnetcore",
  "devicon:mongodb",
  "devicon:postgresql",
  "devicon:mysql",
];

export const navItems: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Shub",
    category: "web",
    image: "/images/shub.png",
    link: "https://github.com/AKflower/Shub",
    description:
      '"Shub" is short for Secret Hub. Shub is a document storage and management system built on the Blockchain platform, providing a secure and transparent solution for managing your organization\'s confidential documents.',
    technologies: ["Next.js", "NestJS", "IPFS", "Hyperledger Fabric Blockchain"],
    role: ["Front-end Developer", "IPFS"],
    media: [
      { type: "image", url: "/images/shub.png" },
      { type: "image", url: "/images/MainScreen.png" },
      { type: "image", url: "/images/Setting.png" },
      { type: "image", url: "/images/UserManage.png" },
    ],
  },
  {
    id: 2,
    title: "Forsaken",
    category: "web",
    image: "/images/forsaken.png",
    link: "https://github.com/danisolation/app",
    description:
      "Design and build a smart home monitoring and control system that automates electronic devices and provides security monitoring and protection. The system integrates sensors, control devices, mobile applications and computers to create a smart, flexible and convenient system.",
    technologies: ["React", "Node.js", "Adafruit.io"],
    role: ["Fullstack Developer"],
    media: [
      { type: "image", url: "/images/forsaken.png" },
      { type: "image", url: "/images/webdashboard.PNG" },
      { type: "image", url: "/images/sensorweb.PNG" },
      { type: "image", url: "/images/conditionerweb.PNG" },
    ],
  },
  {
    id: 3,
    title: "EventHub",
    category: "web",
    image: "/images/EH.png",
    link: "https://github.com/AKflower/EventHub",
    description:
      "EventHub is a comprehensive solution that helps you easily manage every aspect of your event, from planning and promotion to ticket sales and attendee engagement. With its user-friendly interface and powerful features, EventHub empowers you to create memorable experiences for both organizers and attendees.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL"],
    role: ["Back-end Developer"],
    media: [
      { type: "image", url: "/images/EH.png" },
      { type: "image", url: "/images/demo.gif" },
    ],
  },
  {
    id: 4,
    title: "ClinidShed",
    category: "web",
    image: "/images/CS.jpg",
    link: "https://github.com/AKflower/Clinic-Sched",
    description:
      "Clinic-Sched is a clinic appointment management application developed to make booking and managing appointments easier for both patients and doctors. With Clinic-Sched, patients can search for doctors by specialty, book appointments online, and receive appointment reminders. In addition, doctors and administrators can easily manage their schedules, confirm, change, or cancel appointments.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    role: ["Back-end Developer"],
    media: [
      { type: "image", url: "/images/CS.jpg" },
      { type: "image", url: "/images/login.png" },
      { type: "image", url: "/images/first.png" },
      { type: "image", url: "/images/cd.png" },
      { type: "image", url: "/images/dl.png" },
      { type: "image", url: "/images/hoso.png" },
      { type: "image", url: "/images/user.png" },
    ],
  },
  {
    id: 5,
    title: "Mall",
    category: "web",
    image: "/images/mall.png",
    link: "https://github.com/AKflower/mall",
    description:
      "Mall is a comprehensive shopping mall management system designed to help managers easily monitor and operate the operations of booths, tenants, and revenue. The application provides optimal management tools for booth management, lease contracts, and customer service support in a modern and user-friendly interface.",
    technologies: ["React", "ASP.NET", "PostgreSQL"],
    role: ["Back-end Developer"],
    media: [
      { type: "image", url: "/images/mall.png" },
      { type: "image", url: "/images/mall.gif" },
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Computer Science Engineering",
    institution: "Bach Khoa University",
    year: "2020 - 2024",
    description:
      "Focused on software engineering and computer science fundamentals. Completed various projects in web development, algorithms, and data structures.",
  },
];

export const experience: Experience[] = [
  {
    title: "Front-end Developer",
    company: "JDO GROUP",
    location: "Ho Chi Minh City, Viet Nam",
    period: "Oct 2024 – Present",
    highlights: [
      "Working as part of a front-end team to develop jChat, a real-time messaging web application.",
      "Implemented state management using Redux Toolkit, Redux-Saga, and Redux-Persist.",
      "Integrated WebSocket for real-time communication.",
      "Implemented internationalization using i18n-next.",
      "Participated in code reviews, team discussions, and Agile development processes.",
    ],
    link: {
      url: "https://web.jchat.io",
      label: "jChat",
    },
  },
];

