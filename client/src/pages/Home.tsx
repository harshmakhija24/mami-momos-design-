/**
 * Rajasthan Atelier Archive, simplified: the home screen only curates projects.
 * A tile opens its own calm detail screen where proof sides and variants are reviewed.
 */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowUpRight, FileStack, LayoutTemplate, PanelTop } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type Side = "front" | "back";
type Tone = "teal" | "paprika" | "amber" | "monsoon" | "hawa";

type Variant = {
  id: string;
  label: string;
  note: string;
  front: string;
  back: string;
  tone: Tone;
  marker: string;
  artwork?: "hawa-pamphlet" | "imported-leaflet";
  format?: string;
};

type DesignProject = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  tileImage: string;
  tilePosition: string;
  variants: Variant[];
};

const projects: DesignProject[] = [
  {
    id: "mami-momos",
    index: "01",
    title: "Mami Momos",
    category: "Hawa Mahal collateral",
    description: "A simple working library for visitor-facing pamphlets and menu collateral.",
    tileImage: "/manus-storage/mami-menu-page-1_e82f82a2.png",
    tilePosition: "50% 15%",
    variants: [
      {
        id: "jaipur-kyoto-leaflet",
        label: "Variant 1 — Jaipur × Kyoto Leaflet",
        note: "Imported two-sided A5 leaflet from the original design source",
        front: "",
        back: "",
        tone: "teal",
        marker: "#17262c",
        artwork: "imported-leaflet",
        format: "A5 portrait",
      },
      {
        id: "hawa-mahal-a5",
        label: "Variant 2 — Hawa Mahal A5",
        note: "Visitor pamphlet / matching front and back",
        front: "",
        back: "",
        tone: "hawa",
        marker: "#e84d2a",
        artwork: "hawa-pamphlet",
        format: "A5 portrait",
      },
      {
        id: "cover-steam",
        label: "Variant 3 — Menu cover",
        note: "Cover page / first momo catalogue",
        front: "/manus-storage/mami-menu-page-1_e82f82a2.png",
        back: "/manus-storage/mami-menu-page-2_b673ed98.png",
        tone: "teal",
        marker: "#1e6c72",
        format: "A4 portrait",
      },
      {
        id: "small-plates",
        label: "Variant 4 — Menu interiors",
        note: "Momos, noodles, and starters edit",
        front: "/manus-storage/mami-menu-page-3_fa75ef5c.png",
        back: "/manus-storage/mami-menu-page-4_3231e81e.png",
        tone: "paprika",
        marker: "#e84d2a",
        format: "A4 portrait",
      },
    ],
  },
  {
    id: "taxi-driver",
    index: "02",
    title: "Taxi Driver",
    category: "Poster study",
    description: "A later poster exploration held here as a separate project.",
    tileImage: "/manus-storage/taxi-driver-front_7540f84a.jpg",
    tilePosition: "50% 50%",
    variants: [
      {
        id: "amber-proof",
        label: "Variant 1 — Amber proof",
        note: "Warm headlight and registration-bar edit",
        front: "/manus-storage/taxi-driver-front_7540f84a.jpg",
        back: "/manus-storage/taxi-driver-back_fac09305.jpg",
        tone: "amber",
        marker: "#d87c25",
        format: "A3 portrait",
      },
      {
        id: "monsoon-proof",
        label: "Variant 2 — Monsoon proof",
        note: "Cooler ink separation and rain treatment",
        front: "/manus-storage/taxi-driver-front_7540f84a.jpg",
        back: "/manus-storage/taxi-driver-back_fac09305.jpg",
        tone: "monsoon",
        marker: "#315b85",
        format: "A3 portrait",
      },
    ],
  },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Return to the project library">
      <img src="/manus-storage/mami-momos-archive-mark_720c60a2.png" alt="" />
      <span><b>MAMI MOMOS</b><em>Design Library</em></span>
    </Link>
  );
}

function HawaMahalPamphlet({ side }: { side: Side }) {
  const isFront = side === "front";
  return (
    <div className={`pamphlet-art pamphlet-${side}`}>
      <div className="pamphlet-trim" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="pamphlet-kicker">MAMI MOMOS / HAWA MAHAL EDITION / A5 PROOF</div>
      {isFront ? (
        <>
          <div className="pamphlet-front-copy">
            <span>FOR THE JAIPUR WALK</span>
            <h2>PINK CITY,<br /><i>HOT MOMO.</i></h2>
            <p>A warm stop for the Hawa Mahal wander.</p>
          </div>
          <div className="hawa-scene" aria-hidden="true">
            <div className="tokyo-roof roof-one"><i /><i /><i /></div>
            <div className="tokyo-roof roof-two"><i /><i /></div>
            <div className="hawa-facade">{Array.from({ length: 15 }, (_, index) => <span key={index} />)}</div>
            <div className="hawa-base"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="front-offer-card"><span>HAWA MAHAL WALKER OFFER</span><strong>6 PC MOMO + MASALA CHAI</strong><em>₹ — FINAL PRICE TO BE ADDED</em></div>
          <div className="pamphlet-footer"><span>ADDRESS / QR / CONTACT — EDIT BEFORE PRINTING</span><img src="/manus-storage/mami-momos-archive-mark_720c60a2.png" alt="" /></div>
        </>
      ) : (
        <>
          <div className="pamphlet-back-head"><span>THE NEARBY STOP</span><h2>THREE WAYS TO <i>PAUSE.</i></h2><p>Featured combinations for the Hawa Mahal stroll.</p></div>
          <div className="combo-stack">
            <article className="combo-card"><span>01 / CITY LOOP</span><strong>Veg Steam Momo · 6 pcs<br />Kadak Masala Chai</strong><em>₹ —</em></article>
            <article className="combo-card combo-two"><span>02 / JHAROKHA</span><strong>Paneer Steam Momo · 6 pcs<br />Classic French Fries · Cold Coffee</strong><em>₹ —</em></article>
            <article className="combo-card combo-three"><span>03 / EVENING EDIT</span><strong>Veg Schezwan Momo · 6 pcs<br />Chilli Garlic Noodles Veg</strong><em>₹ —</em></article>
          </div>
          <div className="back-note">ALL PRICES, QR, ADDRESS &amp; OFFER TERMS ARE EDITABLE PLACEHOLDERS.</div>
          <div className="pamphlet-footer"><span>FRONT / BACK DESIGNED AS ONE SET</span><img src="/manus-storage/mami-momos-archive-mark_720c60a2.png" alt="" /></div>
        </>
      )}
    </div>
  );
}

function ImportedLeaflet({ side }: { side: Side }) {
  if (side === "front") {
    return (
      <div className="imported-leaflet imported-front">
        <div className="imported-front-art" aria-hidden="true"><i className="imported-jharokha" /><i className="imported-shoji" /></div>
        <div className="imported-sheet">
          <div className="imported-topline"><div className="imported-brand"><b>◒</b><span><strong>MAMI</strong><small>MOMOS</small></span></div><em>JAIPUR × KYOTO</em></div>
          <div className="imported-front-copy"><p>✦&nbsp; A SMALLER, WARMER WORLD</p><h2>Fold the<br /><i>ordinary.</i></h2><span>Hand-rolled momos with Jaipur fire and a quiet Kyoto finish.</span></div>
          <div className="imported-flavour"><span>STEAMED</span><i /><span>SPICED</span><i /><span>SHARED</span></div>
          <div className="imported-front-bottom"><span>JHAROKHA TO SHOJI<br />ONE BITE AT A TIME.</span><b>↹<small>TURN FOR<br />COMBOS</small></b><em>01 / FRONT</em></div>
        </div>
      </div>
    );
  }

  return (
    <div className="imported-leaflet imported-back">
      <i className="imported-arch-one" aria-hidden="true" /><i className="imported-arch-two" aria-hidden="true" />
      <div className="imported-sheet imported-back-sheet">
        <div className="imported-topline"><div className="imported-brand"><b>◒</b><span><strong>MAMI</strong><small>MOMOS</small></span></div><em className="imported-stamp">◌ MOMO CLUB</em></div>
        <div className="imported-back-heading"><p>JAIPUR HEAT · KYOTO HUSH</p><h2>Pick your<br /><i>fold.</i></h2></div>
        <section className="imported-combos">
          <div className="imported-section-line"><span>COMBOS / BUILT TO SHARE</span><small>CHOOSE YOUR MOOD</small></div>
          <article className="imported-solo"><div className="imported-six">6<i /><i /><i /></div><div><small>01 / THE SOLO FOLD</small><h3>One basket.<br /><i>Zero compromise.</i></h3><p>6 momos · 2 signature dips · iced chai</p><b>SET PRICE <strong>₹ ___</strong></b></div></article>
          <div className="imported-pair-row"><article><small>02 / THE PAIR UP</small><h3>12<br /><i>momos</i></h3><p>2 drinks · 2 dips</p><b>₹ ___</b></article><article><small>03 / BIG TABLE</small><h3>20<br /><i>momos</i></h3><p>4 drinks · 3 dips</p><b>₹ ___</b></article></div>
        </section>
        <section className="imported-fillings"><div className="imported-section-line"><span>PICK A FILLING</span><small>VEG / PANEER / MUSHROOM</small></div><div><span>ROSE CHILLI VEG</span><span>BLACK SESAME PANEER</span><span>MISO MUSHROOM</span></div></section>
        <footer className="imported-back-footer"><span>▦ PRICES LEFT OPEN FOR FINAL MENU INSERT.</span><span>⌁ ASK ABOUT VEGAN &amp; ALLERGEN OPTIONS.</span><em>02 / BACK</em></footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="library-page">
      <header className="simple-header"><Brand /><span>PROJECT ARCHIVE / 02</span></header>
      <section className="library-intro">
        <p>SELECT A PROJECT</p>
        <h1>Designs, kept <i>simple.</i></h1>
        <span>Open a tile to view its variants, then switch the front and back.</span>
      </section>
      <section className="tile-grid" aria-label="Projects">
        {projects.map((project) => (
          <Link className="project-card" href={`/project/${project.id}`} key={project.id}>
            <span className="project-number">{project.index}</span>
            <div className="project-image"><img src={project.tileImage} alt="" style={{ objectPosition: project.tilePosition }} /><span><ArrowUpRight size={21} /></span></div>
            <div className="project-card-copy"><p>{project.category}</p><h2>{project.title}</h2><small>OPEN PROJECT</small></div>
          </Link>
        ))}
      </section>
      <footer className="simple-footer">CLICK A TILE TO ENTER THE PROJECT.</footer>
    </main>
  );
}

export function ProjectDetail({ projectId }: { projectId: string }) {
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  const [side, setSide] = useState<Side>("front");
  const [variantId, setVariantId] = useState(project.variants[0].id);

  useEffect(() => { setSide("front"); setVariantId(project.variants[0].id); }, [project.id]);

  const variant = useMemo(
    () => project.variants.find((item) => item.id === variantId) ?? project.variants[0],
    [project, variantId],
  );

  const preview = variant[side];
  return (
    <main className="detail-page">
      <header className="simple-header detail-header"><Brand /><Link href="/" className="back-link"><ArrowLeft size={16} /> ALL PROJECTS</Link></header>
      <div className="detail-title"><p>{project.category.toUpperCase()}</p><h1>{project.title}</h1><span>{project.description}</span></div>
      <section className="detail-layout">
        <section className="proof-area" aria-label="Design preview">
          <div className={`proof-paper tone-${variant.tone}`}>
            {variant.artwork === "hawa-pamphlet" ? <HawaMahalPamphlet side={side} /> : variant.artwork === "imported-leaflet" ? <ImportedLeaflet side={side} /> : <img src={preview} alt={`${project.title} ${variant.label} ${side}`} />}
            <div className="proof-label">{side.toUpperCase()} / PROOF</div>
          </div>
          <p className="proof-note">{variant.note}</p>
        </section>
        <aside className="detail-controls">
          <div className="control-block"><p>VARIANT</p><Select value={variant.id} onValueChange={setVariantId}><SelectTrigger className="variant-select"><SelectValue /></SelectTrigger><SelectContent>{project.variants.map((item) => <SelectItem value={item.id} key={item.id}>{item.label}</SelectItem>)}</SelectContent></Select></div>
          <div className="control-block"><p>VIEW SIDE</p><div className="side-tabs">{(["front", "back"] as Side[]).map((item) => <button key={item} type="button" className={side === item ? "active" : ""} onClick={() => setSide(item)} aria-pressed={side === item}><PanelTop size={15} />{item}</button>)}</div></div>
          <div className="project-facts"><div><LayoutTemplate size={18} /><span><b>FORMAT</b>{variant.format}</span></div><div><FileStack size={18} /><span><b>STATUS</b>Review proof</span></div></div>
          <p className="placeholder-note">Final price, contact details, QR, and offer terms are still placeholders until you approve the design.</p>
        </aside>
      </section>
    </main>
  );
}
