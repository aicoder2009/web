const aboutImages = [
  { src: "/about/about1.png", alt: "Rachel outdoors" },
  { src: "/about/about2.png", alt: "Rachel with friends" },
  { src: "/about/about3.png", alt: "Rachel at an event" },
  { src: "/about/about4.png", alt: "Rachel dancing" },
  { src: "/about/about6.png", alt: "Rachel exploring" },
  { src: "/about/about7.png", alt: "Rachel portrait" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col p-6 w-full items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-between w-full max-w-[1800px] gap-12 min-h-[calc(100vh-120px)]">
        {/* Hero */}
        <div className="flex flex-col gap-8 py-8 animate-fade-in">
          <h1 className="font-serif text-foreground lg:w-1/2 lg:min-w-[640px]" style={{ fontSize: 'clamp(44px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
            I&apos;m a designer, builder, &amp; dancer&mdash;always seeking new
            adventures.
          </h1>

          <div className="flex flex-col gap-6 animate-fade-in delay-100">
            <p className="text-[15px] text-foreground-light leading-[1.5]">
              I think deeply about people, products, and the future of
              technology. Currently rabbit-holing into the world of human-AI
              interaction.
            </p>

            <p className="text-[15px] text-foreground-light leading-[1.5]">
              Open to contract and freelance opportunities. If you&apos;re
              working on something cool,{" "}
              <a
                href="mailto:rachelc0715@gmail.com"
                className="text-foreground underline underline-offset-4"
              >
                let&apos;s chat!
              </a>
            </p>

            <p className="text-[15px] text-foreground-light leading-[1.5]">
              Outside of design, engineering, and being a comp sci + business
              student, I&apos;m:
            </p>

            <ul className="list-disc list-inside pl-3 text-foreground-light text-[15px] leading-[1.5]">
              <li>leading student clubs in the tech space</li>
              <li>searching for food</li>
              <li>flashing V4&apos;s</li>
              <li>dancing, dancing, &amp; dancing</li>
            </ul>

            <p className="text-[15px] text-foreground-light leading-[1.5]">
              To befriend me or hire me, reach out on{" "}
              <a
                href="https://www.linkedin.com/in/rachel-jiayi-chen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                LinkedIn
              </a>
              ,{" "}
              <a
                href="https://x.com/racheljychen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                X
              </a>
              , or by{" "}
              <a
                href="mailto:rachelc0715@gmail.com"
                className="text-foreground underline underline-offset-4"
              >
                email
              </a>
              &mdash;can&apos;t wait to meet you!
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 animate-fade-in delay-200">
          {aboutImages.map((img, i) => {
            const gradients = [
              "from-[#e8d5c4] to-[#c9b8a8]",
              "from-[#c4d5e0] to-[#a8b8c4]",
              "from-[#d5cce0] to-[#b8aec4]",
              "from-[#d5e0cc] to-[#b8c4a8]",
              "from-[#e0d5cc] to-[#c4b8a8]",
              "from-[#ccd5e0] to-[#a8b4c4]",
            ];
            return (
              <div
                key={i}
                className={`relative aspect-square overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]} border border-foreground/10`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-cover w-full h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
