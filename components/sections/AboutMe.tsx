import { GradientCard } from "@/components/ui/gradient-card"

const workPrinciples = [
  {
    badgeText: "WORKING NOTE 01",
    badgeColor: "#d99a2b",
    title: "Start with a real problem",
    description:
      "I would rather spend an hour understanding what people are stuck on than a day polishing the wrong screen.",
    gradient: "orange" as const,
    imageUrl:
      "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-CVv0qK2DYZbOAQP2LboVFgQGt0UMfB.png&w=320&q=75",
  },
  {
    badgeText: "WORKING NOTE 02",
    badgeColor: "#4f87a8",
    title: "I care about the last 10%",
    description:
      "The useful details are usually small: the empty state, the loading edge, and the button that makes the next step obvious.",
    gradient: "gray" as const,
    imageUrl:
      "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-5i9EDsbgEZk9k7NBeKt3ImNXkx0F66.png&w=320&q=75",
  },
  {
    badgeText: "WORKING NOTE 03",
    badgeColor: "#8b5a9b",
    title: "Make it work, then make it good",
    description:
      "I learn fastest with something in my hands. I build a rough version, use it, break it, and keep the parts that hold up.",
    gradient: "purple" as const,
    imageUrl:
      "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-5WJZLkaCfLUnCYpgNz89tPx5C4KYgJ.png&w=320&q=75",
  },
]

export function AboutMe() {
  return (
    <section className="relative mx-auto w-full py-24 md:py-32" aria-labelledby="how-i-work">
      <h2 id="how-i-work" className="sr-only">
        How I work
      </h2>

      <div className="about-panels about-panels-top">
        {workPrinciples.slice(0, 2).map((card) => (
          <div key={card.title} className="about-panel">
            <GradientCard {...card} />
          </div>
        ))}
      </div>

      <div className="about-panel about-panel-wide">
        <GradientCard {...workPrinciples[2]} compact />
      </div>
    </section>
  )
}
