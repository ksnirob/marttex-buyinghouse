import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ArrowLeft, Calendar } from "lucide-react";
import factory from "@/assets/factory.jpg";
import sourcing from "@/assets/sourcing.jpg";
import quality from "@/assets/quality.jpg";

export const articles = [
  {
    slug: "bangladesh-rmg-exports",
    img: factory,
    tag: "Industry",
    date: "April 2026",
    title: "Bangladesh RMG exports cross USD 50B — what it means for buyers",
    lead: "Bangladesh's ready-made garment sector has crossed a historic milestone, surpassing USD 50 billion in annual exports for the first time. For global buyers, this signals both a maturing supplier ecosystem and a new set of strategic opportunities.",
    body: [
      "The Bangladesh Garment Manufacturers and Exporters Association (BGMEA) confirmed the milestone in its Q1 2026 report, attributing the growth to stronger demand from the EU, UK and USA, alongside a significant uptick in value-added product categories such as outerwear, knitwear and technical fabrics.",
      "For buying houses and brand sourcing teams, the milestone carries practical implications. A larger export base means more factories competing for orders — which typically improves lead times and pricing. However, it also means capacity is tighter at the top end, where compliance-certified and sustainability-audited factories are increasingly in demand.",
      "Mart Tex's sourcing team has noted a 22% increase in new factory inquiries over the past two quarters, with brands specifically asking for WRAP, BSCI and GOTS-certified production partners. Our vetted network currently spans 60+ factories across Dhaka, Gazipur and Chittagong.",
      "The key takeaway for buyers entering or scaling Bangladesh sourcing: the ecosystem is more sophisticated than ever, but so is the competition for the best factory slots. Establishing long-term relationships with a trusted local partner remains the most reliable way to lock in capacity and quality.",
    ],
  },
  {
    slug: "cotton-recycled-blends",
    img: sourcing,
    tag: "Sourcing",
    date: "March 2026",
    title: "Cotton vs. recycled blends: a cost and quality comparison for SS27",
    lead: "As sustainability mandates increase, more brands are asking us to spec recycled polyester and organic cotton blends. Here is a frank breakdown of where the cost and quality tradeoffs actually sit for SS27 production.",
    body: [
      "Recycled polyester (rPET) derived from post-consumer bottles has become the most commercially accessible sustainable fibre in Bangladesh's supply chain. Mill-gate pricing is now within 8–12% of virgin poly, down from a 25%+ premium three years ago. For performance-oriented knitwear — activewear, outerwear linings, interlock fleece — rPET is often the right call.",
      "Organic cotton tells a different story. The premium over conventional cotton sits at 18–30% depending on certification (GOTS vs. OCS) and yarn count. The quality uplift is real — better handle, cleaner dye uptake, less fibre breakage — but for basic T-shirt programmes where brand marketing doesn't lean into sustainability, the math rarely closes.",
      "The winning formula we're seeing for SS27: hybrid specs. A 70/30 conventional cotton / rPET blend for core basics hits a sweet spot of cost, performance and a credible sustainability story. For hero pieces, full organic or full rPET with a verified chain of custody.",
      "Mart Tex can arrange fabric lab dips and salesman samples in 12–15 days from most partner mills. Reach out with your fibre brief and target FOB and we'll map the right options.",
    ],
  },
  {
    slug: "qa-protocol",
    img: quality,
    tag: "Quality",
    date: "February 2026",
    title: "Inside our in-line QA protocol — how we cut defect rates by 38%",
    lead: "Quality assurance at final inspection is too late. Our multi-stage in-line protocol, refined over 18 years, is how we reduced client-reported defect rates by 38% across all programmes in 2025.",
    body: [
      "The standard factory QA model — one final inspection before shipping — catches defects after the cost has already been incurred. Rework at final stage is expensive, time-consuming and rarely perfect. Our protocol intervenes at three earlier points: pre-production, during cutting, and at 50% inline.",
      "Pre-production sign-off covers the approved trim card, fabric shrinkage and colour fastness results, and a first pattern check against the approved sample. This single gate eliminates roughly 40% of downstream defects in our experience.",
      "The cutting room check audits lay planning, marker efficiency and first-ply inspection. Fabric defects caught here cost nothing to fix; the same defect at packing costs three times as much in rework labour and delays the line.",
      "Our 50% inline audit uses AQL 2.5 sampling on a live production run. This is where fit, stitch quality, label placement and trims are validated against the approved counter sample. Any critical finding triggers a line stop until corrective action is confirmed.",
      "The result across our 2025 programmes: average final inspection defect rate down from 3.1% to 1.9%. For clients shipping 500,000+ pieces annually, that is thousands of fewer rejects per season.",
    ],
  },
  {
    slug: "knitwear-capacity",
    img: factory,
    tag: "Capability",
    date: "January 2026",
    title: "Knitwear capacity: what 12M pieces a season looks like",
    lead: "Scaling knitwear production to 12 million pieces a season requires more than factory space. Here is how we approach capacity planning, factory alignment and risk distribution across our knit partner network.",
    body: [
      "Knitwear is Bangladesh's largest export category by volume, accounting for nearly 60% of total RMG output. The country's knit factories range from small 200-machine operations to vertically integrated giants running 3,000+ circular knitting machines with in-house dyeing, cutting and finishing.",
      "For a 12M piece season across multiple styles and constructions, we typically distribute across three to five factories. Single-factory concentration creates schedule risk — a machine breakdown, a power disruption or a compliance issue can cascade into a missed shipment window.",
      "Our capacity allocation model starts with style complexity. Basic single-jersey tees and polos go to high-volume, mid-tier factories where efficiency is paramount. Engineered stripes, jacquards, full-fashion knitwear and heavy fleece are allocated to specialist mills with the right equipment and pattern-making capability.",
      "Lead times for knit programmes: 90–110 days from approved sample to loading, assuming fabric is in-stock at the mill. Custom yarn colours add 15–20 days. Rush programmes can be accommodated at select factories for an FOB premium of 4–8%.",
    ],
  },
];

export const Route = createFileRoute("/news/$slug")({
  component: NewsDetail,
  head: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    return { meta: [{ title: article ? `${article.title} — Mart Tex` : "Article — Mart Tex" }] };
  },
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <SiteLayout>
        <div className="container-x py-32 text-center">
          <h1 className="font-display text-4xl text-primary">Article not found</h1>
          <Link to="/news" className="btn-primary mt-8 inline-flex">
            Back to News
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="section-reveal container-x pt-10">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News
        </Link>
      </div>

      <div className="section-reveal container-x mt-6">
        <div className="overflow-hidden rounded-3xl">
          <img
            src={article.img}
            alt={article.title}
            loading="eager"
            className="aspect-[16/8] w-full object-cover"
          />
        </div>
      </div>

      <article className="section-reveal container-x max-w-4xl py-14">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="rounded-full bg-secondary px-3 py-1">{article.tag}</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" /> {article.date}
          </span>
        </div>
        <h1 className="mt-6 font-display text-4xl leading-tight text-primary md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 border-l-4 border-primary/30 pl-5 text-lg leading-relaxed text-muted-foreground">
          {article.lead}
        </p>
        <div className="mt-10 space-y-6">
          {article.body.map((para, i) => (
            <p key={i} className="leading-relaxed text-foreground/80">
              {para}
            </p>
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
