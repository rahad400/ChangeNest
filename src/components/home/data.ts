import {
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Leaf,
  LifeBuoy,
  MapPinned,
  Megaphone,
  PawPrint,
  Search,
  Sprout,
  UsersRound,
} from "lucide-react";

import activityCharity from "@/app/assets/home/activity-charity.jpg";
import activityGarden from "@/app/assets/home/activity-garden.jpg";
import eventAnimals from "@/app/assets/home/event-animals.jpg";
import eventAwareness from "@/app/assets/home/event-awareness.jpg";
import eventCleanup from "@/app/assets/home/event-cleanup.jpg";
import eventCommunity from "@/app/assets/home/event-community.jpg";
import eventDisaster from "@/app/assets/home/event-disaster.jpg";
import eventEducation from "@/app/assets/home/event-education.jpg";
import eventHealth from "@/app/assets/home/event-health.jpg";
import heroInset from "@/app/assets/home/hero-inset.jpg";
import storyPortrait from "@/app/assets/home/story-1.jpg";
import storyTeam from "@/app/assets/home/story-3.jpg";
import testimonialOne from "@/app/assets/home/testimonial-1.jpg";
import testimonialThree from "@/app/assets/home/testimonial-3.jpg";
import testimonialTwo from "@/app/assets/home/testimonial-2.jpg";
import volunteerMonth from "@/app/assets/home/volunteer-month.jpg";

import type {
  Activity,
  Category,
  CategoryId,
  Community,
  Faq,
  HomeEvent,
  HowItWorksStep,
  ImpactStat,
  Partner,
  Story,
  Testimonial,
  VolunteerProfile,
} from "@/types";

export type {
  Activity,
  Category,
  CategoryId,
  Community,
  Faq,
  HomeEvent,
  HowItWorksStep,
  ImpactStat,
  Partner,
  Story,
  Testimonial,
  VolunteerProfile,
};

export const categories: Category[] = [
  {
    id: "environment",
    label: "Environment",
    description: "Cleanups, planting, and climate action.",
    icon: Leaf,
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "Health camps, screenings, and wellbeing.",
    icon: HeartPulse,
    tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  {
    id: "education",
    label: "Education",
    description: "Tutoring, reading circles, and digital skills.",
    icon: GraduationCap,
    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
  },
  {
    id: "charity",
    label: "Charity",
    description: "Food, essentials, and direct support.",
    icon: HandHeart,
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  {
    id: "community-service",
    label: "Community Service",
    description: "Neighbourhood care and shared spaces.",
    icon: UsersRound,
    tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  {
    id: "disaster-relief",
    label: "Disaster Relief",
    description: "Rapid response and recovery support.",
    icon: LifeBuoy,
    tone: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    dot: "bg-orange-500",
  },
  {
    id: "animal-welfare",
    label: "Animal Welfare",
    description: "Shelter care, rescue, and adoption.",
    icon: PawPrint,
    tone: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    dot: "bg-teal-500",
  },
  {
    id: "social-awareness",
    label: "Social Awareness",
    description: "Workshops, campaigns, and safer communities.",
    icon: Megaphone,
    tone: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    dot: "bg-indigo-500",
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.id, category]),
) as Record<CategoryId, Category>;

// Demo events. Backend ashle ei array ta API data diye replace kora jabe.
export const events: HomeEvent[] = [
  {
    id: "riverside-cleanup",
    title: "Riverside Cleanup & Picnic",
    categoryId: "environment",
    city: "Dhaka",
    venue: "Buriganga Riverside Park",
    dateLabel: "Sat, Nov 21",
    month: "Nov",
    day: "21",
    time: "9:00 AM",
    attendees: 48,
    spotsLeft: 12,
    description:
      "Spend a morning by the water with neighbours, coffee, and one shared goal: leave the riverbank cleaner than we found it.",
    image: eventCleanup,
    featured: true,
  },
  {
    id: "community-health-camp",
    title: "Community Health & Wellness Camp",
    categoryId: "healthcare",
    city: "Sylhet",
    venue: "Shahjalal Community Center",
    dateLabel: "Thu, Dec 3",
    month: "Dec",
    day: "3",
    time: "10:00 AM",
    attendees: 26,
    spotsLeft: 10,
    description:
      "Support free check-ups, health screenings, and friendly guidance with local clinicians and community health workers.",
    image: eventHealth,
    featured: true,
  },
  {
    id: "after-school-reading",
    title: "After-School Reading Circle",
    categoryId: "education",
    city: "Dhaka",
    venue: "Dhanmondi Public Library",
    dateLabel: "Tue, Dec 15",
    month: "Dec",
    day: "15",
    time: "4:30 PM",
    attendees: 18,
    spotsLeft: 6,
    description:
      "Read, draw, and trade favourite stories with curious young readers. No teaching experience required.",
    image: eventEducation,
    featured: true,
  },
  {
    id: "winter-warmth-kits",
    title: "Winter Warmth Kit Packing",
    categoryId: "charity",
    city: "Khulna",
    venue: "Sonadanga Community School",
    dateLabel: "Sun, Dec 6",
    month: "Dec",
    day: "6",
    time: "11:00 AM",
    attendees: 52,
    spotsLeft: 25,
    description:
      "Pack blankets, socks, and hygiene kits for families facing the cold. Music, snacks, and good company included.",
    image: heroInset,
    featured: false,
  },
  {
    id: "neighbourhood-repair",
    title: "Neighbourhood Repair Day",
    categoryId: "community-service",
    city: "Chattogram",
    venue: "Hillview Community Centre",
    dateLabel: "Fri, Dec 11",
    month: "Dec",
    day: "11",
    time: "8:30 AM",
    attendees: 21,
    spotsLeft: 9,
    description:
      "Fix benches, paint a shared hall, and freshen up the little places where a neighbourhood comes together.",
    image: eventCommunity,
    featured: false,
  },
  {
    id: "flood-relief-packing",
    title: "Flood Relief Packing Drive",
    categoryId: "disaster-relief",
    city: "Rajshahi",
    venue: "Padma Community Hall",
    dateLabel: "Fri, Dec 18",
    month: "Dec",
    day: "18",
    time: "9:00 AM",
    attendees: 74,
    spotsLeft: 16,
    description:
      "Sort essential supplies and build family relief packs for communities recovering from seasonal flooding.",
    image: eventDisaster,
    featured: false,
  },
  {
    id: "animal-shelter-morning",
    title: "Animal Shelter Morning",
    categoryId: "animal-welfare",
    city: "Dhaka",
    venue: "Paws & Care Shelter",
    dateLabel: "Sun, Dec 20",
    month: "Dec",
    day: "20",
    time: "10:30 AM",
    attendees: 19,
    spotsLeft: 8,
    description:
      "Walk, feed, and spend a calm morning with rescue dogs and cats waiting for their next home.",
    image: eventAnimals,
    featured: false,
  },
  {
    id: "digital-safety-families",
    title: "Digital Safety for Families",
    categoryId: "social-awareness",
    city: "Chattogram",
    venue: "Innovation Hub, Agrabad",
    dateLabel: "Sat, Jan 9",
    month: "Jan",
    day: "9",
    time: "6:00 PM",
    attendees: 33,
    spotsLeft: 14,
    description:
      "A practical session on scams, privacy, and healthy screen habits for parents, carers, and teenagers.",
    image: eventAwareness,
    featured: false,
  },
  {
    id: "tree-planting-saturday",
    title: "Tree Planting Saturday",
    categoryId: "environment",
    city: "Dhaka",
    venue: "Hatirjheel Green Belt",
    dateLabel: "Sat, Jan 16",
    month: "Jan",
    day: "16",
    time: "8:00 AM",
    attendees: 41,
    spotsLeft: 18,
    description:
      "Plant native saplings, learn simple care tips, and help a public green space grow shade for the next generation.",
    image: eventCleanup,
    featured: false,
  },
  {
    id: "community-blood-drive",
    title: "Community Blood Drive",
    categoryId: "healthcare",
    city: "Dhaka",
    venue: "Dhanmondi Community Hall",
    dateLabel: "Sat, Jan 23",
    month: "Jan",
    day: "23",
    time: "10:00 AM",
    attendees: 29,
    spotsLeft: 12,
    description:
      "Register donors, welcome first-time givers, and help the local hospital keep its shelves ready for emergencies.",
    image: eventHealth,
    featured: false,
  },
  {
    id: "digital-skills-seniors",
    title: "Digital Skills for Seniors",
    categoryId: "education",
    city: "Sylhet",
    venue: "Shahjalal Community Center",
    dateLabel: "Sat, Jan 30",
    month: "Jan",
    day: "30",
    time: "4:00 PM",
    attendees: 22,
    spotsLeft: 10,
    description:
      "A patient, hands-on session on video calls, online safety, and staying connected with family far away.",
    image: storyTeam,
    featured: false,
  },
  {
    id: "neighbourhood-soup-kitchen",
    title: "Neighbourhood Soup Kitchen",
    categoryId: "charity",
    city: "Chattogram",
    venue: "Hillview Community Kitchen",
    dateLabel: "Sat, Feb 6",
    month: "Feb",
    day: "6",
    time: "11:30 AM",
    attendees: 37,
    spotsLeft: 15,
    description:
      "Chop, cook, and serve a warm lunch alongside neighbours who make this kitchen feel like a second home.",
    image: heroInset,
    featured: false,
  },
];

export const cities = Array.from(new Set(events.map((event) => event.city)));

export const featuredEvents = events.filter((event) => event.featured);

export const eventCountByCategory = categories.reduce(
  (counts, category) => {
    counts[category.id] = events.filter(
      (event) => event.categoryId === category.id,
    ).length;
    return counts;
  },
  {} as Record<CategoryId, number>,
);

// Demo figures. Real backend data ashle ei values replace koro.
export const impactStats: ImpactStat[] = [
  {
    value: "12,400",
    suffix: "+",
    label: "Total volunteers",
    detail: "People who have joined a cause through the nest.",
    icon: UsersRound,
  },
  {
    value: "1,860",
    suffix: "",
    label: "Events completed",
    detail: "Cleanups, camps, workshops, and community drives.",
    icon: CalendarDays,
  },
  {
    value: "96",
    suffix: "",
    label: "Communities reached",
    detail: "Neighbourhoods from Dhaka to Chattogram.",
    icon: MapPinned,
  },
  {
    value: "310k",
    suffix: "",
    label: "Volunteer hours",
    detail: "Time turned into visible local change.",
    icon: Clock3,
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Discover events",
    description:
      "Browse by cause, city, or the kind of afternoon you want to have. Every listing is local and welcoming.",
    icon: Search,
    points: ["Filter by cause and location", "See time, venue, and spots"],
  },
  {
    title: "Join a community",
    description:
      "Register in a few clicks, meet your host, and arrive knowing exactly what to expect.",
    icon: UsersRound,
    points: ["Simple registration", "Clear joining instructions"],
  },
  {
    title: "Make an impact",
    description:
      "Show up as you are, lend a hand, and leave with a story — plus a community that remembers you.",
    icon: HeartHandshake,
    points: ["No experience needed", "Track your volunteer hours"],
  },
];

// Demo activity feed. Completed event photos ar summaries.
export const recentActivities: Activity[] = [
  {
    title: "Rooftop Garden Makeover",
    location: "Chattogram",
    participants: 21,
    description:
      "An empty rooftop became a shared garden for herbs, shade, and slow summer evenings.",
    image: activityGarden,
    date: "Nov 2, 2026",
  },
  {
    title: "School Library Refresh",
    location: "Dhaka",
    participants: 34,
    description:
      "Volunteers sorted, repaired, and reimagined a library corner that had been closed for months.",
    image: activityCharity,
    date: "Oct 24, 2026",
  },
  {
    title: "Winter Kit Packing",
    location: "Khulna",
    participants: 52,
    description:
      "Neighbours packed blankets, socks, and hygiene kits for families preparing for the cold season.",
    image: heroInset,
    date: "Oct 18, 2026",
  },
];

// Sample partner network. Real partner logos ashle ekhane replace koro.
export const partners: Partner[] = [
  { name: "GreenRoots", focus: "Climate & land", icon: Leaf },
  { name: "LearningBridge", focus: "Education access", icon: BookOpen },
  { name: "CareCircle", focus: "Community health", icon: HeartPulse },
  { name: "CityHarvest", focus: "Food security", icon: Sprout },
  { name: "OpenHands", focus: "Direct relief", icon: HandHeart },
  { name: "NeighbourLab", focus: "Civic spaces", icon: UsersRound },
];

// Sample profile. Real volunteer data ashle replace koro.
export const volunteerOfMonth: VolunteerProfile = {
  name: "Maya Sullivan",
  role: "Community cleanup lead",
  city: "Dhaka",
  quote:
    "I came for one cleanup and stayed for the people. Showing up a little every month has changed how I see my own neighbourhood.",
  hours: 128,
  events: 14,
  causes: 6,
  image: volunteerMonth,
  achievements: [
    "Led six riverside cleanups",
    "Mentored 20 first-time volunteers",
    "Completed community first-aid training",
  ],
};

// Demonstration testimonials. Real quotes ashle replace koro.
export const testimonials: Testimonial[] = [
  {
    quote:
      "I signed up for one cleanup and stayed for the people. Now my Sunday mornings have a purpose I can actually point to.",
    name: "Claire Bennett",
    role: "Volunteer · Dhaka",
    event: "Riverside Cleanup",
    image: testimonialOne,
  },
  {
    quote:
      "I thought volunteering needed a special skill. It turns out showing up, being kind, and carrying a few chairs is enough.",
    name: "Tanvir Islam",
    role: "Mentor · Chattogram",
    event: "Code & Coffee",
    image: testimonialTwo,
  },
  {
    quote:
      "The organizers made space for my whole family. My daughter packed her first meal kit and has not stopped talking about it.",
    name: "Sofia Larsen",
    role: "Volunteer · Khulna",
    event: "Winter Warmth Drive",
    image: testimonialThree,
  },
];

// Illustrative stories for the homepage preview.
export const stories: Story[] = [
  {
    title: "The rooftop garden that changed a block",
    excerpt:
      "How one shared patch of soil turned a forgotten rooftop into the greenest meeting place in the neighbourhood.",
    category: "Environment",
    readTime: "4 min read",
    image: activityGarden,
  },
  {
    title: "A reading circle finds its rhythm",
    excerpt:
      "What happens when volunteers stop worrying about perfect lessons and start reading alongside children instead.",
    category: "Education",
    readTime: "5 min read",
    image: storyPortrait,
  },
  {
    title: "Teaching families to spot an online scam",
    excerpt:
      "A practical workshop, a room full of questions, and one simple rule that made the internet feel safer at home.",
    category: "Social awareness",
    readTime: "3 min read",
    image: storyTeam,
  },
];

export const communities: Community[] = [
  {
    city: "Dhaka",
    events: 24,
    focus: "Environment · Education",
    description: "Riverside cleanups, reading circles, and neighbourhood drives.",
    x: 54,
    y: 62,
  },
  {
    city: "Chattogram",
    events: 16,
    focus: "Community · Awareness",
    description: "Repair days, digital safety workshops, and coastal care.",
    x: 72,
    y: 76,
  },
  {
    city: "Sylhet",
    events: 9,
    focus: "Healthcare · Relief",
    description: "Health camps and rapid response teams in the northeast.",
    x: 78,
    y: 28,
  },
  {
    city: "Khulna",
    events: 11,
    focus: "Charity · Community",
    description: "Winter kits, meal packing, and shared community spaces.",
    x: 35,
    y: 72,
  },
  {
    city: "Rajshahi",
    events: 7,
    focus: "Environment · Arts",
    description: "Garden makeovers, story walks, and riverbank care.",
    x: 24,
    y: 42,
  },
];

export const faqs: Faq[] = [
  {
    question: "Do I need experience to volunteer?",
    answer:
      "Almost never. Most events need friendly people, not specialists. If an event does require a skill or certification, the listing says so clearly before you register.",
  },
  {
    question: "How do I register for an event?",
    answer:
      "Open an event, choose Join Now, and complete the short registration form. You will get the time, venue, and a simple checklist of what to bring.",
  },
  {
    question: "Can I bring a friend or family member?",
    answer:
      "Many events welcome families and groups. Check the event details for age guidance and available spots, then register each person so the host can plan properly.",
  },
  {
    question: "How do I create my own event?",
    answer:
      "Create a free ChangeNest account, choose Create Event, and share your cause, date, location, and what volunteers should expect. Our team reviews new listings for safety and clarity.",
  },
  {
    question: "Is volunteering free?",
    answer:
      "Yes. Joining ChangeNest and registering for most community events is free. Any event with a materials fee will show that cost up front, before you sign up.",
  },
  {
    question: "How are organizations vetted?",
    answer:
      "Organizers provide contact and organization details before publishing. We review listings for clear information and community safety, and we encourage volunteers to ask questions before attending.",
  },
];

export const finalCta = {
  title: "Small actions. Big changes.",
  description:
    "Start with one afternoon, one cause, or one neighbour. The nest has room for every kind of helper.",
} as const;
