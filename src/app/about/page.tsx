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
                I&apos;m Karthick Arun &mdash; an 11th grader in Chandler,
                Arizona, and Founder &amp; CEO of Aigenie Enterprises. I come
                from a family of engineers and entrepreneurs &mdash; both my
                parents immigrated from South India, and I&apos;ve been building
                since kindergarten.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                At 9, I became the youngest AWS Cloud Practitioner in the world
                and later keynoted the AWS Public Sector Summit in Washington, DC
                in front of 40,000 people. That experience inspired me to
                organize KidCon 2021, a cloud computing conference for young
                people. Today I&apos;m building Lucky at Aigenie &mdash; an
                AI-powered accessibility app that helps blind and visually
                impaired users browse the web through voice.
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                I sit at the intersection of business and CS &mdash; equally
                interested in product strategy and writing the code. Outside of
                building: pickleball, podcasting (The AI Tripod), casual gaming,
                writing, and passionate about UN SDG 4 (Quality Education).
              </p>

              <p className="text-[15px] text-foreground-light leading-[1.5]">
                Open to collaborations &mdash; reach out on{" "}
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
                , or{" "}
                <a
                  href="mailto:karthickarun2009@gmail.com"
                  className="text-foreground underline underline-offset-4"
                >
                  email
                </a>
                .
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
