/* TODO: Replace placeholder photos in /public/about/ with Karthick's own photos */
const aboutImages = [
  { src: "/about/about1.png", alt: "About image 1" },
  { src: "/about/about2.png", alt: "About image 2" },
  { src: "/about/about3.png", alt: "About image 3" },
  { src: "/about/about4.png", alt: "About image 4" },
  { src: "/about/about6.png", alt: "About image 5" },
  { src: "/about/about7.png", alt: "About image 6" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col p-6 w-full items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-between w-full max-w-[1800px] gap-12 min-h-[calc(100vh-120px)]">
        {/* Hero */}
        <div className="flex flex-col gap-8 py-8 animate-fade-in">
          <h1 className="hero-h1 font-serif lg:w-1/2 lg:min-w-[640px]" style={{ fontSize: '52px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
            I&apos;m a builder, entrepreneur, &amp; engineer&mdash;at the
            intersection of business and CS.
          </h1>

          <div className="flex flex-col md:flex-row gap-12 lg:w-2/5 lg:min-w-[640px] animate-fade-in stagger-1">
            <div className="flex flex-col gap-3 max-w-[720px]">
              <p className="text-[15px] text-foreground-light leading-[1.5]">
                I&apos;m Karthick Arun &mdash; an 11th grader at Basha High
                School in Chandler, Arizona, and Founder &amp; CEO of Aigenie
                Enterprises. I grew up surrounded by technologists &mdash; both
                my parents are engineers who immigrated from South India. I come
                from a family of entrepreneurs; my great-grandfathers run
                companies in India. They inspire me to take my passion for
                technology and build something that transforms the world.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                I&apos;ve been building since kindergarten &mdash; from a
                Raspberry Pi &quot;talking fruits&quot; app that taught nutrition
                to an Android app that tracked laps for my school running club.
                At 9, I convinced the CEO of Amazon Web Services to let me take
                the Cloud Practitioner exam and became the youngest person in the
                world to pass it. I was invited to AWS re:Invent 2018 and later
                keynoted the AWS Worldwide Public Sector Summit in Washington, DC
                in front of 40,000 people.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                That experience at re:Invent also showed me a problem: kids
                couldn&apos;t attend the conference due to age restrictions. So I
                organized KidCon 2021, a cloud computing conference for young
                people, bringing in industry experts to share knowledge with
                young attendees. I also founded the Kids Cloud Club in elementary
                school to teach cloud computing to my peers.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                Today, I&apos;m building Lucky at Aigenie &mdash; an AI-powered
                accessibility app that acts as a digital guide dog for web
                navigation, helping blind and visually impaired users browse the
                web through voice. I&apos;m passionate about UN SDG 4 (Quality
                Education) and using AI to remove barriers so people of all
                abilities can reach their full potential.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                I sit at the intersection of business and computer science
                &mdash; I&apos;m as interested in product marketing strategies,
                competitive analysis, and bringing products to market as I am in
                writing the code. I also earned the AWS AI Practitioner
                certification in 2024.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                Open to collaborations and opportunities. If you&apos;re working
                on something cool,{" "}
                <a
                  href="mailto:karthickarun2009@gmail.com"
                  className="text-foreground underline underline-offset-4"
                >
                  let&apos;s chat!
                </a>
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                Outside of building and engineering, I&apos;m:
              </p>

              <ul className="list-disc list-inside pl-3 text-foreground-light text-[16px] leading-[1.5]">
                <li>playing pickleball</li>
                <li>podcasting (The AI Tripod Podcast)</li>
                <li>casual gaming (Mac + Nintendo Switch)</li>
                <li>writing</li>
                <li>passionate about UN SDG 4 (Quality Education)</li>
              </ul>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                I was also on my middle school robotics team, which was one of my
                earliest hands-on engineering experiences.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                To connect or collaborate, reach out on{" "}
                <a
                  href="https://linkedin.com/in/karthickarun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  LinkedIn
                </a>
                ,{" "}
                <a
                  href="https://bsky.app/profile/aicoder2009.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  Bluesky
                </a>
                , or by{" "}
                <a
                  href="mailto:karthickarun2009@gmail.com"
                  className="text-foreground underline underline-offset-4"
                >
                  email
                </a>
                &mdash;can&apos;t wait to meet you!
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 animate-fade-in stagger-2">
          {aboutImages.map((img, i) => (
            <div
              key={i}
              className="relative w-full aspect-[1/1] overflow-hidden"
            >
              {/* Gradient fallback behind image */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #e8e0d8, #d4cfc8)' }} />
              <img
                src={img.src}
                alt={img.alt}
                className="relative object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
