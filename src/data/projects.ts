import type { ProjectData } from "@/components/ProjectLayout";

export const openaiProject: ProjectData = {
  title: "The future of AI & hardware",
  subtitle: "OpenAI x Hardware • Concept 2025",
  heroMedia: {
    type: "video",
    src: "/projects/openai/openai.mp4",
    poster: "/projects/openai/openai.png",
  },
  metadata: [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "August - September 2025" },
    { label: "Team", value: "3 Designers" },
    { label: "Skills", value: "Product Design, Product Strategy, Prototyping" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "As a team of 3 product designers, our goal was to land on a clear vision within 7 weeks.",
      ],
      media: [
        { type: "image", src: "/projects/openai/1-problem.svg", alt: "Problem diagram" },
      ],
    },
    {
      id: "solution",
      title: "Solution",
      content: [
        "A pin and pendant wearable, serving as a camera and microphone on-the-go.",
        "Moments is a new atomic unit in ChatGPT, logging all the events, conversations, and solo adventures captured with Tomo.",
      ],
      media: [
        { type: "image", src: "/projects/openai/2-tomo.png", alt: "Tomo device" },
        { type: "video", src: "/projects/openai/moments.mp4" },
      ],
    },
    {
      id: "core-flows",
      title: "Core Flows",
      content: [
        "Smart prompts, in-the-moment — Get prompts relevant to you in-the-moment, with Tomo.",
        "Chat with real-time context — ChatGPT can now respond to you with understanding of your real life.",
        "Look back on your moments — In the new Moments page, you can look back on everything that\u2019s happened, categorized by context.",
        "Review a specific moment — Tap into each moment to see all the important things that happened.",
        "Onboarding to Tomo — Designing for an experience that will show users how Moments work and the immediate value of Tomo.",
      ],
      media: [
        { type: "video", src: "/projects/openai/cf-smart-prompt.mp4" },
        { type: "video", src: "/projects/openai/cf-chat-context.mp4" },
        { type: "video", src: "/projects/openai/cf-moments.mp4" },
        { type: "video", src: "/projects/openai/cf-apartmoment.mp4" },
        { type: "video", src: "/projects/openai/onboarding.mp4" },
      ],
    },
    {
      id: "research",
      title: "Research",
      content: [
        "We went deep into understanding OpenAI, and the world of consumer AI, agents, trends, and more. We researched existing devices and tried some out ourselves!",
      ],
      media: [
        { type: "image", src: "/projects/openai/4-ai-rabbit-hole.png", alt: "AI research" },
      ],
    },
    {
      id: "exploring-form-factors",
      title: "Exploring Form Factors",
      content: [
        "We explored product direction and form factor, and designed for an experience that will show users how Moments work and the immediate value of Tomo.",
      ],
      media: [
        { type: "image", src: "/projects/openai/5-form-factor.png", alt: "Form factor exploration" },
        { type: "image", src: "/projects/openai/7-why-tomo.png", alt: "Why Tomo" },
      ],
    },
    {
      id: "prototyping-and-testing",
      title: "Prototyping and Testing",
      content: [
        "We explored a ton of concepts for these 3 strategic directions, here are select few of them:",
        "Testing and iterating with feedback! We got users to try these prototypes, observed how they used them, how they felt, and got tons of valuable feedback.",
      ],
      media: [
        { type: "video", src: "/projects/openai/exp1-prompt.mp4" },
        { type: "video", src: "/projects/openai/exp2-bg-mode.mp4" },
        { type: "video", src: "/projects/openai/exp3-decons-ar.mp4" },
        { type: "video", src: "/projects/openai/exp4-transcript.mp4" },
        { type: "video", src: "/projects/openai/exp5-stories.mp4" },
        { type: "video", src: "/projects/openai/exp6-timeline.mp4" },
        { type: "video", src: "/projects/openai/user-testing.mp4" },
      ],
    },
    {
      id: "design-decisions",
      title: "Design Decisions",
      content: [
        "We identified the most intuitive way to bring this feature to life.",
        "With insights and iteration from prototyping and testing, we got to thinking how a clear, intuitive solution could be integrated within the existing ChatGPT ecosystem.",
      ],
      media: [
        { type: "image", src: "/projects/openai/systems-thinking.svg", alt: "Systems thinking" },
        { type: "video", src: "/projects/openai/ins-chat-context.mp4" },
        { type: "image", src: "/projects/openai/ins-moment-page.png", alt: "Moments page" },
        { type: "image", src: "/projects/openai/ins-prompt.png", alt: "Smart prompts" },
        { type: "video", src: "/projects/openai/ins-moment-prompt.mp4" },
      ],
    },
    {
      id: "designing-for-hardware-constraints",
      title: "Designing for Hardware Constraints",
      content: [
        "A device that is light-weight and always-recording isn\u2019t possible, yet.",
        "We researched a bunch of products and found that high-quality camera recording doesn\u2019t last more than a few hours.",
        "How do we maximize memory despite constraints of camera battery life?",
      ],
      media: [
        { type: "image", src: "/projects/openai/research-devices.png", alt: "Device research" },
        { type: "image", src: "/projects/openai/context-based.png", alt: "Context-based capture" },
        { type: "image", src: "/projects/openai/cons-1.png", alt: "Consideration 1" },
        { type: "image", src: "/projects/openai/cons-2.png", alt: "Consideration 2" },
        { type: "image", src: "/projects/openai/manual-capture.png", alt: "Manual capture" },
        { type: "image", src: "/projects/openai/cons-3.png", alt: "Consideration 3" },
        { type: "image", src: "/projects/openai/cons-4.png", alt: "Consideration 4" },
        { type: "image", src: "/projects/openai/cons-5.png", alt: "Consideration 5" },
        { type: "image", src: "/projects/openai/memory-vs-privacy.png", alt: "Memory vs privacy" },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "Social signals matter. We can\u2019t design just for the user, but also for those who will be around them and perceive them. What does Tomo imply for social settings? How can we design hardware for self-expression?",
        "Think in systems. It\u2019s not just about designing an amazing feature, but how it fits into the existing system, and how it fits into users\u2019 mental models.",
      ],
    },
  ],
};

export const alexaProject: ProjectData = {
  title: "Novel consumer AI experiences",
  subtitle: "Amazon Alexa+ \u2022 Contract 2025",
  heroMedia: {
    type: "video",
    src: "/projects/alexa/alexa.mp4",
    poster: "/projects/alexa/alexa.png",
  },
  metadata: [
    { label: "Role", value: "Product Designer & Engineer" },
    { label: "Timeline", value: "November 2025 - Present" },
    { label: "Team", value: "Dean Dijour, Michael Kim" },
    { label: "Skills", value: "Product Strategy, Product Design, Prototyping" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "As part of a small team, I am actively engaged with Amazon to imagine the future of consumer AI with Alexa+. Our work is exploratory, consisting of research, strategy, design, and engineering.",
        "This project is confidential, reach out to me directly to learn more!",
      ],
    },
  ],
};

export const figmaProject: ProjectData = {
  title: "Mobile-first for Figma",
  subtitle: "Figma \u2022 Concept 2025",
  heroMedia: {
    type: "video",
    src: "/projects/figma/figma.mp4",
    poster: "/projects/figma/figma.png",
  },
  metadata: [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "October 2025" },
    { label: "Team", value: "Emmi Wu, Christina Raganit, Angelina Cao" },
    { label: "Skills", value: "Product Design, User Research, Prototyping" },
  ],
  sections: [
    {
      id: "challenge",
      title: "Challenge",
      content: [
        "We were 4 designers with 6 days to tackle this design challenge.",
      ],
      media: [
        { type: "image", src: "/projects/figma/challenge.png", alt: "Design challenge" },
      ],
    },
    {
      id: "problem",
      title: "Problem",
      content: [
        "Designers rely on constant back-and-forth: sharing ideas early, getting feedback often, and aligning quickly.",
        "Yet today, that experience feels clunky. You ping a teammate who\u2019s out for coffee or wait for your manager to have time for a huddle tomorrow. What should feel like a quick nudge turns into a waiting game.",
        "What if there was a powerful way to asynchronously share design ideas and feedback?",
      ],
      media: [
        { type: "image", src: "/projects/figma/collaboration.png", alt: "Collaboration problem" },
      ],
    },
    {
      id: "solution",
      title: "Solution",
      content: [
        "Live comments pair sketch annotations with live voice recordings to create live comments that are convenient to make and easy to understand. This serves as an asynchronous way to share ideas and feedback with your team without losing momentum or context.",
        "Easily understand ideas, no matter how big or small.",
        "Review live comments on desktop at a glance and replay the moment for full context.",
      ],
      media: [
        { type: "video", src: "/projects/figma/mobile.mp4" },
        { type: "video", src: "/projects/figma/desktop.mp4" },
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      content: [
        "We had the chance to share our work with incredible designers in NYC!",
        "They voted us the winner of the event and shared a lot of valuable feedback!",
      ],
      media: [
        { type: "image", src: "/projects/figma/nyc.png", alt: "NYC event" },
      ],
    },
  ],
};

export const rbcProject: ProjectData = {
  title: "Patent-pending AI",
  subtitle: "Royal Bank of Canada \u2022 Handed off 2024",
  heroMedia: {
    type: "image",
    src: "/projects/rbc/rbc.png",
  },
  metadata: [
    { label: "Role", value: "Developer, unofficial product designer" },
    { label: "Timeline", value: "May - August 2024" },
    { label: "Team", value: "1 Business Analyst, 1 Data Engineer, 2 Engineers" },
    { label: "Skills", value: "Product Strategy, Full Stack Engineering, Pitching & Storytelling" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "RBC Amplify is an internship program that challenges teams of 4 interns to solve a real business problem with technology, from understanding the problem space, researching, and designing, to developing, deploying, and pitching to senior leaders. My team was tasked with designing and building a generative AI solution for RBC\u2019s Global HR Advice Centre.",
        "Note: Due to my NDA, I cannot disclose details on this project and its designs.",
      ],
      media: [
        { type: "image", src: "/projects/rbc/1-rbc-overview.png", alt: "RBC overview" },
      ],
    },
    {
      id: "the-journey",
      title: "The Journey",
      content: [
        "The HR Technology and HR Advice teams came together to present us with a real problem they were facing.",
        "We designed, built, and pitched our solution to senior leaders and executives across the bank!",
        "We collected beta-launch data, continuously refined our pitch, and secured executive buy-in from the Head of Global Functions Technology.",
      ],
      media: [
        { type: "image", src: "/projects/rbc/2-hmw.svg", alt: "How might we" },
        { type: "image", src: "/projects/rbc/4-pitch.svg", alt: "Pitch" },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "Push back against stakeholders who think solution-first. Our problem statement had a solution in mind. We had to go beyond that and build a solution to solve the underlying problems even if it wasn\u2019t as \u2018cool\u2019.",
        "How to navigate the sensitivity of various user and business needs. We had to bring value to the business, balancing: making employees feel heard, dealing with PII, managing the risk of misinformation, and working with the complexities of content ownership.",
      ],
    },
  ],
};

export const pokergptProject: ProjectData = {
  title: "The world\u2019s first AI poker coach",
  subtitle: "PokerGPT \u2022 Shipped 2023",
  heroMedia: {
    type: "video",
    src: "/projects/pokergpt/pokergpt.mp4",
    poster: "/projects/pokergpt/pokergpt.png",
  },
  metadata: [
    { label: "Role", value: "Product Designer & Frontend Engineer" },
    { label: "Timeline", value: "May - August 2023" },
    { label: "Team", value: "1 PM, 2 Engineers, 1 Designer (me!)" },
    { label: "Skills", value: "Product Design, Frontend Engineering, User Research" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "There is no convenient and low-cost solution to support beginner to intermediate poker players in their learning. This gap in the market for beginner-friendly, intuitive poker agents, was the starting point for PokerGPT.",
        "PokerGPT is live and has been making waves in the Toronto poker community.",
      ],
      media: [
        { type: "video", src: "/projects/pokergpt/formation.mp4" },
        { type: "video", src: "/projects/pokergpt/chat.mp4" },
        { type: "video", src: "/projects/pokergpt/handhistory.mp4" },
        { type: "image", src: "/projects/pokergpt/2-outcomes.svg", alt: "Outcomes" },
      ],
    },
    {
      id: "initial-observations",
      title: "Initial Observations",
      content: [
        "Poker solvers are hard to interpret and usually require pros, like coaches, to extract useful insights. Initial discussions with casual to semi-professional poker players and discovery led us to uncover 2 key pain points:",
        "Key Insight: Some players are prompting ChatGPT in a way to get hand analysis, pot odds, game feedback, and playing strategies!",
        "These pain points were not exactly surprising to us since we knew what the market looked like at that moment: crazy complex poker solvers, courses and bootcamps that are time and money-intensive, and coaches that cost an arm and a leg. However, these user insights validated our solution and unique position in the market.",
      ],
    },
    {
      id: "market-research",
      title: "Market Research",
      content: [
        "Poker Solvers \u2014 Platforms like GTO Wizard, Deepsolver, and more recently, Ruse AI provide interfaces to complex mathematical models. These tools are robust but often require a solid understanding of poker theory, making them less suitable for beginners.",
        "Courses & Bootcamps \u2014 Poker bootcamps and online courses provide structured learning but are costly and require a lot of time commitment.",
        "Personal Coaching \u2014 One-on-one personalized coaching can be highly effective but requires a significant time and cost investment.",
        "How might we create an intuitive, convenient, and personalized experience for building poker skills?",
      ],
      media: [
        { type: "image", src: "/projects/pokergpt/3-market-position.svg", alt: "Market position" },
      ],
    },
    {
      id: "becoming-my-users",
      title: "Becoming My Users",
      content: [
        "I didn\u2019t know how to play poker... so I learned!",
        "Starting with Youtube videos, playing online, and I started to learn the basics and eventually threw in (and lost) a few hundred dollars.",
      ],
      media: [
        { type: "image", src: "/projects/pokergpt/5-learning.png", alt: "Learning poker" },
      ],
    },
    {
      id: "competitor-research",
      title: "Competitor Research",
      content: [
        "The current poker solvers on the market are highly complex and mathematical \u2014 great for the serious poker people, but not for those who want a way to casually learn and improve their performance.",
      ],
      media: [
        { type: "image", src: "/projects/pokergpt/6-competitors.svg", alt: "Competitor analysis" },
      ],
    },
    {
      id: "design-process",
      title: "Design Process",
      content: [
        "The concept of an AI chatbot for poker solving had already been validated by our initial user research, but this also led us to another problem...",
        "How might we provide a better poker learning experience than ChatGPT?",
        "I started by exploring a design for a more structured and visual interface tailored to poker analysis responses.",
        "Next, our team looked into streamlining the flow of prompting with a built-in hand history template that makes it easy to copy over past games and suggested prompts to get the conversations started.",
        "While the game simulation direction was interesting, we decided to prioritize an MVP and observe how users would use the initial open-ended chatbot product.",
      ],
      media: [
        { type: "image", src: "/projects/pokergpt/8-chatgpt-interface.png", alt: "ChatGPT interface" },
        { type: "image", src: "/projects/pokergpt/9-feature-exploration.svg", alt: "Feature exploration" },
        { type: "image", src: "/projects/pokergpt/game-mode.svg", alt: "Game mode" },
      ],
    },
    {
      id: "final-designs",
      title: "Final Designs",
      content: [
        "We prioritized a simple, familiar, and clean interface.",
        "Our main interface is a chat with structured responses and the ability to set game formations. This offers a familiar chat-style experience with poker-tailored features.",
      ],
      media: [
        { type: "image", src: "/projects/pokergpt/10-mockups.svg", alt: "Final mockups" },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "Keep cutting it down to the MLP. We were laser-focused on shipping a Minimum Lovable Product, and that\u2019s what allowed us to ship fast and quickly gather feedback.",
        "User research is not enough. Observing user stories and conducting interviews is not enough. Especially for a niche market, you need to become your users to truly empathize with their needs.",
      ],
    },
  ],
};

export const onePasswordProject: ProjectData = {
  title: "Bringing autofill to macOS",
  subtitle: "1Password \u2022 Shipped 2025",
  heroMedia: {
    type: "video",
    src: "/projects/1password/1password.mp4",
    poster: "/projects/1password/1password.png",
  },
  metadata: [
    { label: "Role", value: "Product Design Intern" },
    { label: "Timeline", value: "Jan - April 2025" },
    { label: "Team", value: "Product Manager, Engineering Manager" },
    { label: "Skills", value: "User Research, Competitive Analysis, Prototyping" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "1Password is a password manager, where millions of users keep their life\u2019s secrets.",
        "Logins, payment details, and sensitive personal information \u2014 these secrets that users trust to be there the moment they need it, wherever that may be: browser, iOS and Android, Windows...",
      ],
      media: [
        { type: "image", src: "/projects/1password/1-overview.png", alt: "1Password overview" },
      ],
    },
    {
      id: "problem",
      title: "Problem",
      content: [
        "Native macOS autofill is not supported on 1Password...",
        "Users don\u2019t get the password they need on native macOS desktop apps, which means trust is broken with users. This feature was table stakes to retain trust with users.",
        "Operating in Apple\u2019s ecosystem means dealing with the complexities and constraints of macOS, and that means doing a lot of explorations and making a lot of tradeoffs for difficult systems problems.",
      ],
      media: [
        { type: "video", src: "/projects/1password/2-macos.mp4" },
      ],
    },
    {
      id: "navigating-the-mess",
      title: "Navigating the Mess",
      content: [
        "The final flows were simple, but there was a big problem hidden within.",
        "I researched the password managers on macOS and found 3 key players to the problem.",
        "Apple Passwords is visually dominant over 1Password for macOS. This is a problem for 1Password as a business since we want users to choose us over the competitor, but it\u2019s also a problem for users.",
        "My mission was to bring clarity to this mess. I went into the settings of both macOS and Safari, testing every single possible combination of settings.",
      ],
      media: [
        { type: "video", src: "/projects/1password/3-final-flows.mp4" },
        { type: "image", src: "/projects/1password/4-research.png", alt: "Research" },
        { type: "image", src: "/projects/1password/5-players.png", alt: "Key players" },
        { type: "image", src: "/projects/1password/mac-app-problem.png", alt: "Mac app problem" },
        { type: "image", src: "/projects/1password/safari-problem.png", alt: "Safari problem" },
        { type: "image", src: "/projects/1password/6-exploring-chaos.png", alt: "Exploring chaos" },
        { type: "video", src: "/projects/1password/safari-exp1.mp4" },
        { type: "video", src: "/projects/1password/safari-exp2.mp4" },
        { type: "image", src: "/projects/1password/safari-solution.png", alt: "Safari solution" },
        { type: "video", src: "/projects/1password/mac-exp.mp4" },
        { type: "video", src: "/projects/1password/macos-solution.mp4" },
      ],
    },
    {
      id: "onboarding-users",
      title: "Onboarding Users",
      content: [
        "Where is the entry point to setting up macOS autofill?",
        "The key question was now how do users discover this setting? There were many possible entry points.",
        "Do More with 1Password \u2014 These are suggested setup steps for features like macOS autofill. This is a new addition to the system that I designed, recognizing that there are many other features that would be valuable to have suggestions for.",
      ],
      media: [
        { type: "video", src: "/projects/1password/entry-points.mp4" },
        { type: "video", src: "/projects/1password/ep-onboarding.mp4" },
        { type: "video", src: "/projects/1password/ep-guided-setup.mp4" },
        { type: "video", src: "/projects/1password/ep-core-product.mp4" },
        { type: "image", src: "/projects/1password/dmw1p.png", alt: "Do More with 1Password" },
        { type: "image", src: "/projects/1password/dmw1p-exp.png", alt: "Exploration" },
        { type: "video", src: "/projects/1password/new-and-existing.mp4" },
      ],
    },
    {
      id: "final-flow",
      title: "Final Flow",
      content: [
        "Discovering & setting up macOS autofill:",
      ],
      media: [
        { type: "video", src: "/projects/1password/final-flow.mp4" },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "The simplest designs hold a lot of complexity. My job as a designer is to explore the complexity and bring simplicity to users. Elegant solutions require a lot of exploration and iteration.",
        "Flows aren\u2019t always perfect because the tech isn\u2019t always perfect. Technical constraints with API availability and conflicting applications were inevitable. The user flow couldn\u2019t be perfect, but we had to work with it.",
      ],
    },
  ],
};

export const earthProject: ProjectData = {
  title: "Innovation management for Fortune 500s",
  subtitle: "Earth \u2022 Shipped 2023",
  heroMedia: {
    type: "video",
    src: "/projects/earth/earth.mp4",
    poster: "/projects/earth/earth.png",
  },
  metadata: [
    { label: "Role", value: "Product Designer & Frontend Engineer" },
    { label: "Timeline", value: "Jan - Dec 2023" },
    { label: "Team", value: "1 PM, 2 Engineers, 1 Designer (me!)" },
    { label: "Skills", value: "Product Design, Frontend Engineering, User Research" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "Onova is an innovation consultancy that hosts large-scale, internal hackathons for some of the world\u2019s largest companies (like Capgemini, BMO, and McDonald\u2019s!). However, navigating the hackathon logistical ecosystem was painful.",
        "Earth is a unified platform that allows Onova to host large-scale hybrid hackathons. From registration and team-formation, to project submission and judging, Earth supports every step of the hackathon lifecycle.",
      ],
      media: [
        { type: "video", src: "/projects/earth/home-page.mp4" },
        { type: "video", src: "/projects/earth/create-team.mp4" },
        { type: "video", src: "/projects/earth/admin-dashboard.mp4" },
        { type: "image", src: "/projects/earth/2-companies.png", alt: "Companies served" },
      ],
    },
    {
      id: "initial-findings",
      title: "Initial Findings",
      content: [
        "The lack of cohesion between platforms used to run events made the experience confusing and frustrating.",
        "With my stakeholders and PM, we used past survey data to identify key pain points throughout the event journey, setting a clear direction for our new product.",
      ],
      media: [
        { type: "image", src: "/projects/earth/3-painpoints.svg", alt: "Pain points" },
      ],
    },
    {
      id: "design-system",
      title: "Design System",
      content: [
        "I built a design system to support our rapid product development.",
        "When I came onto this project, the existing system was not built for scale. I started by working with the team to identify brand keywords, which were used to set a moodboard to guide the visual direction.",
        "With the brand vision and considerations, I went on to develop a simple design system to streamline the development of the core product features and allow for consistency across the platform.",
      ],
      media: [
        { type: "image", src: "/projects/earth/4-moodboard.svg", alt: "Moodboard" },
        { type: "image", src: "/projects/earth/5-design-system.svg", alt: "Design system" },
      ],
    },
    {
      id: "live-dashboard",
      title: "Live Dashboard",
      content: [
        "Participants need a place that acts as the home page for their hackathon experience.",
        "I explored new layouts and presented alternatives to the internal team. These focused on displaying the core features of the page and improving on the problems of the use of space and hierarchy.",
        "A challenge we encountered was designing the page in a way that would allow for the most important content to be presented at the top without disrupting the flow. Our solution was a simple collapse and expand toggle.",
      ],
      media: [
        { type: "image", src: "/projects/earth/6-layout.svg", alt: "Layout exploration" },
        { type: "image", src: "/projects/earth/7-scroll-challenge.svg", alt: "Scroll challenge" },
        { type: "video", src: "/projects/earth/8-final.mov" },
      ],
    },
    {
      id: "beta-launch-testing",
      title: "Beta Launch & Testing",
      content: [
        "We went live with Earth at a real student hackathon.",
        "During the hackathon, I conducted user interviews, gathering valuable feedback to inform our next steps in Earth\u2019s development process.",
      ],
      media: [
        { type: "image", src: "/projects/earth/9-beta-launch.svg", alt: "Beta launch" },
      ],
    },
    {
      id: "iterating-with-insights",
      title: "Iterating with Insights",
      content: [
        "Key Finding: Users are not discovering the live dashboard.",
        "From user interviews and Google Analytics data, we found that users are not finding their way to the \u2018Live Now\u2019 dashboard page.",
        "I identified that there was a lot of room for improvement in the overall architecture of Earth that would make navigation clearer and more intuitive.",
        "With the new structure, page naming, and visual changes to the navigation bar, we saw a massive improvement in the discovery of the live dashboard page at our next event!",
      ],
      media: [
        { type: "image", src: "/projects/earth/10-nav-problem.svg", alt: "Navigation problem" },
        { type: "image", src: "/projects/earth/11-info-arch.svg", alt: "Information architecture" },
        { type: "image", src: "/projects/earth/12-nav-results.svg", alt: "Navigation results" },
      ],
    },
    {
      id: "the-big-launch",
      title: "The Big Launch!",
      content: [
        "We launched Earth at the Capgemini x Google Cloud Gen AI Hackathon 2023.",
        "Our official launch served Capgemini and Google Cloud\u2019s partnered Gen AI Hackathon event with participation from over 1000 employees from these companies!",
        "The success of this hackathon sparked the beginning of a long-term business relationship and recurring events for the future.",
      ],
      media: [
        { type: "video", src: "/projects/earth/13-launch.mp4" },
        { type: "image", src: "/projects/earth/14-goals.svg", alt: "Goals achieved" },
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "Build fast, iterate faster. Startups don\u2019t wait for the perfect product. They build, test, and iterate. We needed to be able to build and test quickly to get feedback and improve the product.",
        "Design and development are not separate disciplines. A lot of my time was spent developing the front-end of the product. By understanding how the product was built, I was able to make more informed design decisions and ship faster.",
      ],
    },
  ],
};

export const projects: Record<string, ProjectData> = {
  openai: openaiProject,
  alexa: alexaProject,
  figma: figmaProject,
  rbc: rbcProject,
  pokergpt: pokergptProject,
  "1password": onePasswordProject,
  earth: earthProject,
};
