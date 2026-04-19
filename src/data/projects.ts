import type { ProjectData } from "@/components/ProjectLayout";

export const setuLabsProject: ProjectData = {
  title: "AI tools that remove barriers",
  subtitle: "Setu Labs \u2022 Building 2022\u2013Now",
  heroMedia: {
    type: "image",
    src: "/projects/setu-labs/hero.png",
    alt: "Setu Labs",
  },
  metadata: [
    { label: "Role", value: "Founder & CEO" },
    { label: "Timeline", value: "2022 \u2014 Present" },
    { label: "Current Product", value: "Lucky (beta)" },
    { label: "Skills", value: "Product, Engineering, Business" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "Setu Labs is the AI company I founded (originally as Aigenie Enterprises) to build tools that remove barriers so people of all abilities can reach their full potential.",
        "Our current focus is Lucky \u2014 an AI-powered accessibility product \u2014 available in beta at lucky.setulabs.ai.",
      ],
    },
    {
      id: "mission",
      title: "Mission",
      content: [
        "Making the world more accessible and equitable with technology that understands you. That line isn\u2019t marketing \u2014 it\u2019s the filter I run every product decision through.",
        "I\u2019ve felt the wrong side of access gaps myself: at nine, I had to convince the CEO of AWS I was ready to sit their certification exam because no one expected a kid to want it. Age, background, and ability shouldn\u2019t decide who gets to use the internet, learn a skill, or participate in the future we\u2019re building.",
      ],
    },
    {
      id: "lucky",
      title: "Lucky",
      content: [
        "Lucky is Setu Labs\u2019 current product \u2014 an AI-powered accessibility app designed to help people navigate the web more easily. It\u2019s in beta; you can follow progress at lucky.setulabs.ai.",
        "The core bet: accessibility is an AI problem now. Models that can see, read, and reason in real time make it possible to build software that adapts to the user instead of forcing the user to adapt to the software.",
      ],
    },
    {
      id: "evolution",
      title: "How We Got Here",
      content: [
        "Setu Labs started in 2022 as Aigenie Enterprises, focused on AI in education. We shipped Ktutor, an AI tutoring product built around digital avatar teachers. Ktutor taught us what the technology could and couldn\u2019t carry \u2014 and where the bigger barrier-removal opportunity actually lived.",
        "We sunset Ktutor, rebranded to Setu Labs, and refocused the company on accessibility. Same mission, sharper target.",
      ],
    },
    {
      id: "team-mentorship",
      title: "Team & Mentorship",
      content: [
        "As part of Setu Labs\u2019 mission, I serve as the industry partner for a summer internship program at El Segundo High School in California. Last summer I mentored four high school interns, developed curricula, and coordinated with school staff and tech professionals so students walked out with real AI and cloud experience on their r\u00e9sum\u00e9.",
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "The hardest part of building Setu Labs hasn\u2019t been the technology \u2014 it\u2019s been the discipline of saying what we\u2019re not. Sunsetting Ktutor was a hard call. Staying the course would have been easier than admitting a sharper bet was in front of us.",
        "What keeps me building: every person I meet who\u2019s been locked out of a product because it wasn\u2019t built with them in mind. That\u2019s the gap Lucky \u2014 and Setu Labs \u2014 exists to close.",
      ],
    },
  ],
};

export const kidconProject: ProjectData = {
  title: "The first cloud conference built for kids",
  subtitle: "KidCon 2021 \u2022 Shipped 2021",
  heroMedia: {
    type: "image",
    src: "/projects/kidcon/hero.png",
    alt: "KidCon 2021",
  },
  metadata: [
    { label: "Role", value: "Organizer & Host" },
    { label: "Year", value: "2021" },
    { label: "Audience", value: "Young learners in cloud" },
    { label: "Skills", value: "Event Production, Outreach, Community" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "KidCon 2021 was a cloud computing conference designed for young people \u2014 a direct response to the age restrictions that kept kids out of industry events like AWS re:Invent.",
        "As president of the Kids Cloud Club, I organized the event, recruited industry experts and leading analysts as speakers, and built the program around curiosity rather than credentials.",
      ],
    },
    {
      id: "why",
      title: "Why I Built It",
      content: [
        "At AWS re:Invent, I hit a wall: children couldn\u2019t attend the conference. I\u2019d already been on that main stage as a speaker, but peers my age couldn\u2019t sit in the audience.",
        "That didn\u2019t sit right. If young people were going to work in cloud and AI one day, they deserved a room where age wasn\u2019t a gatekeeper to knowledge or networking.",
      ],
    },
    {
      id: "what-we-did",
      title: "What We Did",
      content: [
        "I pulled together a lineup of industry experts and analysts willing to speak directly to young learners \u2014 no dumbed-down content, just accessible framing.",
        "Sessions covered cloud fundamentals, career paths in AI, and how to get hands-on even before college. We paired talks with time for kids to ask the unfiltered questions they\u2019d never get to ask at a corporate keynote.",
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      content: [
        "KidCon proved the demand I suspected was there: a generation of kids who wanted to learn the hard technical stuff, if anyone would take them seriously.",
        "Multiple attendees went on to pursue their own AWS certifications after the event. The format \u2014 industry access without age barriers \u2014 became a blueprint I\u2019ve kept using as I build Setu Labs.",
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "The simplest access-expanding idea in the world is: invite the people you\u2019re told are too young. Almost everything I\u2019ve built since has been a variation on that move.",
      ],
    },
  ],
};

export const awsCertProject: ProjectData = {
  title: "Youngest AWS Cloud Practitioner in the world",
  subtitle: "AWS \u2022 Certified 2018",
  heroMedia: {
    type: "image",
    src: "/projects/aws-cert/hero.png",
    alt: "AWS Cloud Practitioner at age 9",
  },
  metadata: [
    { label: "Achievement", value: "World Record" },
    { label: "Age", value: "9 years old" },
    { label: "Cert", value: "AWS Cloud Practitioner" },
    { label: "Also", value: "AWS AI Practitioner (2024)" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "At nine, I became the youngest person in the world to earn the AWS Cloud Practitioner Certification. In 2024 I went back and earned the AWS Certified AI Practitioner Certification to match where the industry \u2014 and my own work \u2014 was moving.",
      ],
    },
    {
      id: "the-ask",
      title: "The Ask",
      content: [
        "The certification exam wasn\u2019t designed for a nine-year-old to take. I had to make a direct case to the CEO of Amazon Web Services that I was ready \u2014 that age shouldn\u2019t be the gate, competence should be.",
        "Getting the yes was half the work. The other half was actually passing.",
      ],
    },
    {
      id: "what-came-after",
      title: "What Came After",
      content: [
        "The certification opened doors that shaped everything that followed. I was invited to speak at AWS re:Invent 2018 and later delivered a keynote at the AWS Public Sector Summit in Washington, D.C., in front of a 40,000-person audience.",
        "I was recognized by my school district, my state senator, and my district\u2019s congressman. More importantly, other kids saw a ceiling lift and started pursuing their own certifications.",
      ],
    },
    {
      id: "what-it-taught-me",
      title: "What It Taught Me",
      content: [
        "Barriers to learning are often social, not technical. The exam was hard but finite; the permission to take it was the real fight.",
        "Every project I\u2019ve built since \u2014 Kids Cloud Club, KidCon 2021, Setu Labs, the El Segundo internship program \u2014 is me handing that permission to the next kid.",
      ],
    },
  ],
};

export const publicSectorKeynoteProject: ProjectData = {
  title: "Keynote to 40,000 in Washington, D.C.",
  subtitle: "AWS Public Sector Summit \u2022 Keynoted 2019",
  heroMedia: {
    type: "image",
    src: "/projects/aws-keynote/hero.png",
    alt: "AWS Public Sector Summit keynote",
  },
  metadata: [
    { label: "Role", value: "Keynote Speaker" },
    { label: "Venue", value: "AWS Public Sector Summit, DC" },
    { label: "Audience", value: "~40,000 including global officials" },
    { label: "Skills", value: "Public Speaking, Storytelling" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "I was invited to deliver a keynote at the AWS Worldwide Public Sector Summit in Washington, D.C., speaking at the main keynote session in front of roughly 40,000 attendees \u2014 including government officials from around the world.",
      ],
    },
    {
      id: "the-message",
      title: "The Message",
      content: [
        "I used the stage to make the same argument I\u2019d been making since I first asked to sit the AWS exam: access to knowledge and opportunity should never be limited by age, background, or circumstance.",
        "I shared my story honestly \u2014 the rejection, the convincing, the certification, the Kids Cloud Club \u2014 and asked the room of public-sector leaders to imagine what happens when institutions start betting on young people sooner.",
      ],
    },
    {
      id: "what-it-unlocked",
      title: "What It Unlocked",
      content: [
        "The keynote led directly to KidCon 2021 and accelerated the Kids Cloud Club\u2019s reach. It also taught me how to hold a room, which has shaped every pitch I\u2019ve given since \u2014 to schools, to government partners, and to investors for Setu Labs.",
      ],
    },
  ],
};

export const kidsCloudClubProject: ProjectData = {
  title: "Teaching cloud computing to my peers",
  subtitle: "Kids Cloud Club \u2022 Founded 2020",
  heroMedia: {
    type: "image",
    src: "/projects/kids-cloud-club/hero.png",
    alt: "Kids Cloud Club",
  },
  metadata: [
    { label: "Role", value: "Founder & President" },
    { label: "Timeline", value: "2020 \u2014 2021" },
    { label: "Focus", value: "Cloud computing for young learners" },
    { label: "Led to", value: "KidCon 2021" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "I founded the Kids Cloud Club in elementary school with one goal: teach cloud computing to other kids the way no one was willing to teach it to me.",
      ],
    },
    {
      id: "what-it-looked-like",
      title: "What It Looked Like",
      content: [
        "Meetings broke down AWS services into things a kid could actually use \u2014 S3 for hosting a static website, Lambda for a \u201cdoes this work?\u201d function, IAM for understanding why permissions matter.",
        "I pulled in what I\u2019d learned preparing for my certification and rewrote it for an audience that was smart but impatient with corporate slides.",
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      content: [
        "Several members went on to earn their own AWS certifications. The club became the launchpad for KidCon 2021 and for my ongoing work on Setu Labs \u2014 both directly trace back to the conversations we had in those early meetings.",
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "Teaching is the fastest way to find the holes in your own understanding. Running the club taught me more cloud than the exam did, and it\u2019s still the loop I try to close on every product I build.",
      ],
    },
  ],
};

export const infotrusterProject: ProjectData = {
  title: "Building a startup in a summer",
  subtitle: "Infotruster \u2022 Leangap 2024",
  heroMedia: {
    type: "image",
    src: "/projects/infotruster/hero.png",
    alt: "Infotruster",
  },
  metadata: [
    { label: "Role", value: "Co-founder" },
    { label: "Program", value: "Leangap (Summer 2024)" },
    { label: "Award", value: "Most Outstanding Company" },
    { label: "Skills", value: "Product, Pitching, Team Building" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "Leangap is a high school entrepreneurship program where teams build and launch a real startup in a summer. My team, Infotruster, won the \u201cMost Outstanding Company\u201d Award across the cohort.",
      ],
    },
    {
      id: "what-we-built",
      title: "What We Built",
      content: [
        "We tackled the trust gap in online information: how do you decide which sources are reliable when everyone is trying to look credible?",
        "We shipped a working product, tested it with real users, and went through the full motion of customer discovery, iteration, and pitch \u2014 all compressed into the program window.",
      ],
    },
    {
      id: "what-it-taught-me",
      title: "What It Taught Me",
      content: [
        "How to move fast with a team I\u2019d just met. How to cut scope brutally so we\u2019d actually have something to show users. How to pitch a company\u2019s story in a way that respects the audience\u2019s time.",
        "Every one of those muscles transferred directly into Setu Labs.",
      ],
    },
  ],
};

export const devopsClubProject: ProjectData = {
  title: "Rebuilding a high school coding community",
  subtitle: "Basha DevOps Club \u2022 2023\u2013Now",
  heroMedia: {
    type: "image",
    src: "/projects/devops-club/hero.png",
    alt: "Basha DevOps Club",
  },
  metadata: [
    { label: "Role", value: "VP (25\u201326), prev. Secretary" },
    { label: "School", value: "Basha High School" },
    { label: "Anchor Event", value: "Community Day of Code" },
    { label: "Partnered With", value: "Hack Club" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "At Basha High, the DevOps Club was oriented around competitions, not learning. I didn\u2019t want to leave that alone.",
        "I partnered with Hack Club \u2014 a nonprofit for hands-on coding education \u2014 and built a parallel track inside the club for students who wanted to actually ship projects. What started small became a core part of the club\u2019s identity.",
      ],
    },
    {
      id: "what-i-lead",
      title: "What I Lead",
      content: [
        "As VP of DevOps (2025\u201326), I organize our Community Day of Code \u2014 coordinating volunteers and logistics to give younger students hands-on tech experiences.",
        "As the club\u2019s elected Secretary in 2024\u201325, I helped run events like FBLA prep and weekly coding sessions that kept the community practicing.",
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      content: [
        "What was once a competition-only room is now a place where beginners actually get to code. That shift is what earned me NHS membership and directly set up my role as NHS Blood Drive Coordinator \u2014 another quarterly, outreach-heavy program I now help run with Vitalant.",
      ],
    },
  ],
};

export const talkingFruitsProject: ProjectData = {
  title: "Talking fruits built with Raspberry Pi",
  subtitle: "Kindergarten Project \u2022 Shipped early",
  heroMedia: {
    type: "image",
    src: "/projects/talking-fruits/hero.png",
    alt: "Talking Fruits project",
  },
  metadata: [
    { label: "Role", value: "Builder" },
    { label: "Hardware", value: "Raspberry Pi + capacity sensors" },
    { label: "Goal", value: "Nutritional awareness, made fun" },
    { label: "Also", value: "Running Club Lap Tracker (Android)" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "In kindergarten, I watched friends eat junk food at lunch and wondered how to make nutrition feel fun instead of preachy. My dad was tinkering with a Raspberry Pi, and that gave me a starting point.",
        "The result: real fruits wired up with capacity sensors. Touch a fruit, and it \u201ctalks\u201d \u2014 telling you about itself and why eating it matters.",
      ],
    },
    {
      id: "building-it",
      title: "Building It",
      content: [
        "Capacitive touch sensing on each fruit, audio triggered per fruit with its nutritional story, all orchestrated on the Pi. It was my first time gluing hardware and software into something another human could use.",
      ],
    },
    {
      id: "the-sibling-project",
      title: "Running Club Lap Tracker",
      content: [
        "Around the same chapter of my life, I heard my room mom describe how manual and painful it was to track laps for the school running club. I built an Android app that tracked laps and auto-generated reports for the school administration.",
        "My principal called to thank me. It was the first time a product I built helped a person I wasn\u2019t related to \u2014 and I\u2019ve been chasing that feeling ever since.",
      ],
    },
    {
      id: "reflection",
      title: "Reflection",
      content: [
        "Start with a problem you can see from your own lunch table or classroom. The smallest local problems have taught me more about building than any textbook has.",
      ],
    },
  ],
};

export const projects: Record<string, ProjectData> = {
  "setu-labs": setuLabsProject,
  kidcon: kidconProject,
  "aws-cert": awsCertProject,
  "aws-keynote": publicSectorKeynoteProject,
  "kids-cloud-club": kidsCloudClubProject,
  infotruster: infotrusterProject,
  "devops-club": devopsClubProject,
  "talking-fruits": talkingFruitsProject,
};
