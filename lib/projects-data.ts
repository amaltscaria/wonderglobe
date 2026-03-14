export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  category: 'Mobile' | 'Web' | 'Dashboard' | 'Case Study';
  tags: string[];
  thumbnail: string;
  link?: string;
  featured?: boolean;
  gridSpan?: 'normal' | 'large'; // large = 2x2 grid span
}

export const projects: Project[] = [
  {
    id: 'wonderglobe',
    title: 'WONDERGLOBE',
    role: 'UX Research & Interaction Design',
    description: 'An immersive travel exploration app that lets users discover the world through interactive 3D experiences. Features comprehensive user research, task flows, and high-fidelity prototypes.',
    category: 'Mobile',
    tags: ['UX Research', 'Interaction Design', 'Prototyping', 'User Flows'],
    thumbnail: '/images/projects/wonderglobe/homepage.png',
    featured: true,
    gridSpan: 'large',
  },
  {
    id: 'companionx',
    title: 'CompanionX',
    role: 'Lean UX Case Study',
    description: 'A human-centered platform connecting overseas families with trusted companions for Kerala\'s elderly. Built using the Lean UX Method with Think-Make-Check phases.',
    category: 'Case Study',
    tags: ['Lean UX', 'User Research', 'Mobile UI', 'Social Impact'],
    thumbnail: 'https://res.cloudinary.com/your-cloud/companionx-thumb.jpg',
    link: '/companionx',
  },
  {
    id: 'shoeniverse',
    title: 'Shoeniverse',
    role: 'Multi-Platform E-commerce',
    description: 'Comprehensive shoe e-commerce platform designed for iOS, Android, and Web with native design patterns for each platform.',
    category: 'Mobile',
    tags: ['E-commerce', 'iOS', 'Android', 'Material Design'],
    thumbnail: 'https://res.cloudinary.com/your-cloud/shoeniverse-thumb.jpg',
    link: '/shoeniverse',
  },
  {
    id: 'universe',
    title: 'UniVerse',
    role: 'Mobile App Design',
    description: 'Digital wallet for university students to manage discounts, subscriptions, and campus payments. Built using Stanford d.school Design Process.',
    category: 'Mobile',
    tags: ['Mobile UI', 'FinTech', 'Student App', 'Design Thinking'],
    thumbnail: 'https://res.cloudinary.com/your-cloud/universe-thumb.jpg',
    link: '/universe',
  },
  {
    id: 'designer-dashboard',
    title: 'Designer Dashboard',
    role: 'Dashboard UI/UX',
    description: 'A centralized dashboard for stakeholders enabling effortless customization of web interfaces. Showcases design tools and workflow management.',
    category: 'Dashboard',
    tags: ['Dashboard', 'Design System', 'Data Visualization'],
    thumbnail: 'https://res.cloudinary.com/your-cloud/designer-dashboard-thumb.jpg',
    link: '/designer-dashboard',
  },
  {
    id: 'melic-music',
    title: 'Melic Music App',
    role: 'Music Discovery UI',
    description: 'A music discovery app with beautiful UI showcasing comprehensive design and user interface for streaming.',
    category: 'Mobile',
    tags: ['Music App', 'Mobile UI', 'Streaming'],
    thumbnail: 'https://res.cloudinary.com/your-cloud/melic-thumb.jpg',
    link: '/melic-music-app',
  },
  {
    id: 'everion',
    title: 'Everion Dashboard',
    role: 'IoT Dashboard',
    description: 'IoT dashboard for Everion device with real-time data visualization and device monitoring capabilities.',
    category: 'Dashboard',
    tags: ['IoT', 'Data Visualization', 'Real-time'],
    thumbnail: 'https://res.cloudinary.com/your-cloud/everion-thumb.jpg',
    link: '/everion-dashboard',
  },
];

export const featuredProjects = projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) =>
  projects.filter(p => p.category === category);
