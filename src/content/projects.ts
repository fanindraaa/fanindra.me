export interface ProjectActionLink {
  label: string;
  url: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
  caption?: string;
  aspectRatio?: string;
  actionLink?: ProjectActionLink;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  role?: string;
  category: 'current' | 'previous' | 'academic' | 'personal';
  media?: MediaItem[];
  links?: ProjectLink[];
  actionLink?: ProjectActionLink;
  note?: string;
}

export const introContent = {
  lines: [
    "Hey! I’m Fanindra, a Product Designer obsessed with building consumer products in fast-paced environments. I care about interaction, systems, and craft",
    "Currently designing Hopr by Rapido",
  ],
};

export const currentWork: Project = {
  id: 'hopr',
  title: 'Hopr Carpool by Rapido',
  year: 'Current',
  role: 'Product Designer',
  category: 'current',
  description:
    'At Rapido, I’ve started as an intern and now an Associate Product Designer. My work includes designing Hopr (Rapido’s carpooling product), while exploring how trust, behavioral design, and user needs can shape adoption in an emerging shared-mobility category',
  actionLink: {
      label: 'Checkout Hopr',
      url: 'https://apps.apple.com/in/app/hopr-carpool-ride-share-app/id6745472733',
    },
  media: [
    {
      type: 'image',
      src: '/images/hopr/Hopr-1.webp',
      alt: 'Hopr mobile carpooling interface showing Bengaluru route matching and co-rider verification',
      caption: 'At Rapido, I’ve started as an intern and now an Associate Product Designer. My work includes designing Hopr (Rapido’s carpooling product), while exploring how trust, behavioral design, and user needs can shape adoption in an emerging shared-mobility category',
      aspectRatio: '16/9',
    },
    {
      type: 'image',
      src: '/images/hopr/Hopr-2.webp',
      alt: 'Hopr mobile ride sharing flow, driver and passenger interaction screens',
      caption: 'At Rapido, I’ve started as an intern and now an Associate Product Designer. My work includes designing Hopr (Rapido’s carpooling product), while exploring how trust, behavioral design, and user needs can shape adoption in an emerging shared-mobility category',
      aspectRatio: '4/5',
    },
    {
      type: 'image',
      src: '/images/hopr/Hopr-3.webp',
      alt: 'Hopr commute dashboard and trust-building social proof features',
      caption: 'At Rapido, I’ve started as an intern and now an Associate Product Designer. My work includes designing Hopr (Rapido’s carpooling product), while exploring how trust, behavioral design, and user needs can shape adoption in an emerging shared-mobility category',
      aspectRatio: '16/9',
    },
    {
      type: 'image',
      src: '/images/hopr/home-progression.webp',
      alt: 'Hopr home screen progression and commute state transitions',
      caption: 'At Rapido, I’ve started as an intern and now an Associate Product Designer. My work includes designing Hopr (Rapido’s carpooling product), while exploring how trust, behavioral design, and user needs can shape adoption in an emerging shared-mobility category',
      aspectRatio: '1.43',
    },
  ],
};

export const previousWork: Project = {
  id: 'cardtree',
  title: 'Cardtree',
  year: '2025',
  role: 'Founding Designer',
  category: 'previous',
  description:
    'As one of the founding designers at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
  actionLink: {
      label: 'Try Cardtree',
      url: 'https://thedouble.ai/',
    },
  links: [
    { label: 'thedouble.ai ↗', url: 'https://thedouble.ai/' },
  ],
  media: [
    {
      type: 'image',
      src: '/images/cardtree/cardtree-1.webp',
      alt: 'Cardtree physical NFC card paired with AI memory twin mobile interface',
      caption: 'As one of the founding designers at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
      aspectRatio: '16/9',
    },
    {
      type: 'image',
      src: '/images/cardtree/cardtree-2.webp',
      alt: 'Cardtree mobile application dashboard and active twin status',
      caption: 'As one of the founding designers at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
      aspectRatio: '16/9',
    },
    {
      type: 'image',
      src: '/images/cardtree/cardtree-3.webp',
      alt: 'Cardtree memory drawer and contextual card organization',
      caption: 'As one of the founding designers at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
      aspectRatio: '1.17',
    },
    {
      type: 'image',
      src: '/images/cardtree/cardtree-4.webp',
      alt: 'Cardtree interactive memory timeline and event extraction',
      caption: 'As one of the founding designers at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
      aspectRatio: '16/9',
    },
    {
      type: 'image',
      src: '/images/cardtree/cardtree-5.webp',
      alt: 'Cardtree design system and tactile visual language',
      caption: 'As one of the founding designers at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
      aspectRatio: '16/9',
    },
    {
      type: 'image',
      src: '/images/cardtree/cardtree-6.webp',
      alt: 'Cardtree mobile interaction flow and developer handoff specs',
      caption: 'As one of the founding designers at Cardtree, I shaped the core product and AI Twin, shipping new experiences, and collaborating closely with developers to ensure high-quality implementation',
      aspectRatio: '16/9',
    },
  ],
};

export const academicProjects: Project[] = [
  {
    id: 'x-perception',
    title: 'Understanding Perception of X Users',
    year: '2025',
    role: 'UX Research & Usability Study',
    category: 'academic',
    description:
      'Conducted a usability study on X’s feed and verification changes, uncovering reduced trust, increased cognitive load, and a strong user preference for the Trending and Following feeds',
    links: [
      { label: 'Read Research Report ↗', url: 'https://heyzine.com/flip-book/db4e4a7431.html' },
    ],
    actionLink: {
      label: 'Read full report',
      url: 'https://heyzine.com/flip-book/db4e4a7431.html',
    },
    media: [
      {
        type: 'image',
        src: '/images/x/x-1.webp',
        alt: 'Understanding Perception of X Users UX research study and usability findings',
        caption: 'Conducted a usability study on X’s feed and verification changes, uncovering reduced trust, increased cognitive load, and a strong user preference for the Trending and Following feeds',
        aspectRatio: '3/2',
      }
    ],
  },
  {
    id: 'uber-dynamic-carpooling',
    title: 'Uber Dynamic Ride-Share',
    year: '2025',
    role: 'Personal Project',
    category: 'academic',
    description:
      'A speculative intervention that lets solo rideshare passengers opt into shared route segments mid-ride in exchange for upfront, dynamic fare savings',
    links: [
      { label: 'View on Behance ↗', url: 'https://www.behance.net/gallery/220957463/Uber-Dynamic-Carpooling' },
    ],
    actionLink: {
      label: 'Read case study',
      url: 'https://www.behance.net/gallery/220957463/Uber-Dynamic-Carpooling',
    },
    media: [
      {
        type: 'image',
        src: '/images/uberpool/uberpool-1.webp',
        alt: 'Uber Dynamic Ride-Share speculative route intervention hero view',
        caption: 'A speculative intervention that lets solo rideshare passengers opt into shared route segments mid-ride in exchange for upfront, dynamic fare savings',
        aspectRatio: '3/2',
      },
      {
        type: 'image',
        src: '/images/uberpool/uberpool-2.webp',
        alt: 'Uber Dynamic Ride-Share opt-in prompts and dynamic fare rebate calculations',
        caption: 'A speculative intervention that lets solo rideshare passengers opt into shared route segments mid-ride in exchange for upfront, dynamic fare savings',
        aspectRatio: '4/3',
      },
      {
        type: 'image',
        src: '/images/uberpool/uberpool-3.webp',
        alt: 'Uber Dynamic Ride-Share passenger matching and pickup synchronization',
        caption: 'A speculative intervention that lets solo rideshare passengers opt into shared route segments mid-ride in exchange for upfront, dynamic fare savings',
        aspectRatio: '4/3',
      },
      {
        type: 'image',
        src: '/images/uberpool/uberpool-4.webp',
        alt: 'Uber Dynamic Ride-Share behavioral study and trip completion analytics',
        caption: 'A speculative intervention that lets solo rideshare passengers opt into shared route segments mid-ride in exchange for upfront, dynamic fare savings',
        aspectRatio: '4/3',
      },
    ],
  },
];

export const personalProjects: Project[] = [
  {
    id: 'my-tags',
    title: 'My Tags',
    year: '2025',
    role: 'App UI Redesign',
    category: 'personal',
    description:
      'MyTags is a utility-focused mobile app that helps users tag, track, and recover personal items through QR codes, enabling finders to easily contact owners without revealing personal information',
    media: [
      {
        type: 'image',
        src: '/images/mytags/mytags-1.webp',
        alt: 'My Tags recovery architecture and encrypted token ecosystem',
        caption: 'MyTags is a utility-focused mobile app that helps users tag, track, and recover personal items through QR codes, enabling finders to easily contact owners without revealing personal information',
        aspectRatio: '3/2',
      },
      {
        type: 'image',
        src: '/images/mytags/mytags-2.webp',
        alt: 'My Tags item registration and NFC/QR association workflow',
        caption: 'MyTags is a utility-focused mobile app that helps users tag, track, and recover personal items through QR codes, enabling finders to easily contact owners without revealing personal information',
        aspectRatio: '16/9',
      },
      {
        type: 'image',
        src: '/images/mytags/mytags-3.webp',
        alt: 'My Tags finder interaction flow and anonymous messaging system',
        caption: 'MyTags is a utility-focused mobile app that helps users tag, track, and recover personal items through QR codes, enabling finders to easily contact owners without revealing personal information',
        aspectRatio: '16/9',
      },
      {
        type: 'image',
        src: '/images/mytags/mytags-4.webp',
        alt: 'My Tags recovery notification and safe return coordination',
        caption: 'MyTags is a utility-focused mobile app that helps users tag, track, and recover personal items through QR codes, enabling finders to easily contact owners without revealing personal information',
        aspectRatio: '16/9',
      },
    ],
  },
];

export const aboutContent = {
  paragraphs: [
    "I'm Fanindra Maharana, a product designer based in Bengaluru. I focus on interaction design, consumer workflows, and making software that feels tactile and deliberate.",
    'I care about typography, physical-digital artifacts, and prototyping in code to test fluid states and spring dynamics directly.',
  ],
};

export const contactContent = {
  email: {
    label: 'imfanindra@gmail.com',
    url: 'mailto:imfanindra@gmail.com',
  },
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/fanindra-m/' },
    { label: 'GitHub', url: 'https://github.com/fanindraaa' },
    { label: 'Twitter', url: 'https://x.com/fanindraaa' },
    { label: 'Résumé', url: 'mailto:imfanindra@gmail.com?subject=Fanindra%20Resume%20Request' },
  ],
};
