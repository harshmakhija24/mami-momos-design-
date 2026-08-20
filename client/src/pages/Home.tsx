/**
 * Rajasthan Atelier Archive, simplified: the home screen only curates projects.
 * A tile opens its own calm detail screen where proof sides and variants are reviewed.
 */
import { ArrowLeft, ArrowUpRight, Download, FileStack, LayoutTemplate, PanelTop } from "lucide-react";
import "./leaflet-variants.css";
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
  artwork?: "hawa-pamphlet" | "imported-leaflet" | "tank-talk" | "pink-city";
  format?: string;
  download: string;
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

const useGitHubPagesAssets = import.meta.env.BASE_URL !== "/";
const asset = (fileName: string, manusPath: string) =>
  useGitHubPagesAssets ? `${import.meta.env.BASE_URL}assets/${fileName}` : manusPath;
const download = (fileName: string, manusPath: string) =>
  useGitHubPagesAssets ? `${import.meta.env.BASE_URL}downloads/${fileName}` : manusPath;

const assets = {
  mark: asset("mami-momos-archive-mark.png", "/manus-storage/mami-momos-archive-mark_720c60a2.png"),
  menu1: asset("mami-menu-page-1.png", "/manus-storage/mami-menu-page-1_e82f82a2.png"),
  menu2: asset("mami-menu-page-2.png", "/manus-storage/mami-menu-page-2_b673ed98.png"),
  menu3: asset("mami-menu-page-3.png", "/manus-storage/mami-menu-page-3_fa75ef5c.png"),
  menu4: asset("mami-menu-page-4.png", "/manus-storage/mami-menu-page-4_3231e81e.png"),
  taxiFront: asset("taxi-driver-front.jpg", "/manus-storage/taxi-driver-front_7540f84a.jpg"),
  taxiBack: asset("taxi-driver-back.jpg", "/manus-storage/taxi-driver-back_fac09305.jpg"),
  leafletHero: asset("jaipur-kyoto-leaflet-hero.webp", "/manus-storage/jaipur-kyoto-leaflet-hero_e90ed94d.webp"),
};

const downloads = {
  jaipurKyoto: download("variant-1-jaipur-kyoto.pdf", "/manus-storage/variant-1-jaipur-kyoto_64579826.pdf"),
  hawaMahal: download("variant-2-hawa-mahal-walk.pdf", "/manus-storage/variant-2-hawa-mahal-walk_6866245b.pdf"),
  tankTalk: download("variant-3-tank-talk.pdf", "/manus-storage/variant-3-tank-talk_ecac3850.pdf"),
  pinkCity: download("variant-4-pink-city-express.pdf", "/manus-storage/variant-4-pink-city-express_6ffcb5ec.pdf"),
};

const projects: DesignProject[] = [
  {
    id: "mami-momos",
    index: "01",
    title: "Mami Momos",
    category: "Hawa Mahal A5 leaflet proofs",
    description: "Four A5 front/back leaflet directions for high-intent visitors around Hawa Mahal.",
    tileImage: assets.menu1,
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
        download: downloads.jaipurKyoto,
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
        download: downloads.hawaMahal,
      },
      {
        id: "tank-talk",
        label: "Variant 3 — Tank Talk",
        note: "Shark Tank India-led social-proof leaflet with simple basket choices",
        front: "",
        back: "",
        tone: "amber",
        marker: "#e84d2a",
        artwork: "tank-talk",
        format: "A5 portrait",
        download: downloads.tankTalk,
      },
      {
        id: "pink-city-express",
        label: "Variant 4 — Pink City Express",
        note: "Fast, high-contrast street-handout with an immediate three-item menu",
        front: "",
        back: "",
        tone: "paprika",
        marker: "#194a72",
        artwork: "pink-city",
        format: "A5 portrait",
        download: downloads.pinkCity,
      },
    ],
  },
  {
    id: "taxi-driver",
    index: "02",
    title: "Taxi Driver",
    category: "Poster study",
    description: "A later poster exploration held here as a separate project.",
    tileImage: assets.taxiFront,
    tilePosition: "50% 50%",
    variants: [
      {
        id: "amber-proof",
        label: "Variant 1 — Amber proof",
        note: "Warm headlight and registration-bar edit",
        front: assets.taxiFront,
        back: assets.taxiBack,
        tone: "amber",
        marker: "#d87c25",
        format: "A3 portrait",
        download: "",
      },
      {
        id: "monsoon-proof",
        label: "Variant 2 — Monsoon proof",
        note: "Cooler ink separation and rain treatment",
        front: assets.taxiFront,
        back: assets.taxiBack,
        tone: "monsoon",
        marker: "#315b85",
        format: "A3 portrait",
        download: "",
      },
    ],
  },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Return to the project library">
      <img src={assets.mark} alt="" />
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
          <div className="pamphlet-footer"><span>ADDRESS / QR / CONTACT — EDIT BEFORE PRINTING</span><img src={assets.mark} alt="" /></div>
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
          <div className="pamphlet-footer"><span>FRONT / BACK DESIGNED AS ONE SET</span><img src={assets.mark} alt="" /></div>
        </>
      )}
    </div>
  );
}

function ImportedLeaflet({ side }: { side: Side }) {
  if (side === "front") {
    return (
      <div className="imported-leaflet imported-front">
        <div className="imported-front-art" style={{ backgroundImage: `linear-gradient(160deg,rgba(91,25,34,.37),rgba(13,35,39,.14) 48%,rgba(7,20,24,.76)),url(${assets.leafletHero})` }} aria-hidden="true"><i className="imported-jharokha" /><i className="imported-shoji" /></div>
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
    <div className="imported-leaflet imported-back imported-revamp-back">
      <div className="imported-revamp-glow" aria-hidden="true" />
      <div className="imported-revamp-sheet">
        <div className="imported-topline"><div className="imported-brand"><b>◒</b><span><strong>MAMI</strong><small>MOMOS</small></span></div><em className="imported-stamp">JAIPUR × KYOTO / 02</em></div>
        <div className="imported-revamp-head"><p>FROM HAWA MAHAL, WITH HEAT.</p><h2>THE BEST<br />MOMOS NEED<br /><i>NO FILTER.</i></h2></div>
        <div className="imported-photo-slots" aria-label="Food-photo placeholders"><article><span>PHOTO PLACEHOLDER</span><strong>STEAM</strong><small>Veg Steam · 6 pcs</small></article><article><span>PHOTO PLACEHOLDER</span><strong>SPICE</strong><small>Veg Schezwan · 6 pcs</small></article><article><span>PHOTO PLACEHOLDER</span><strong>SIP</strong><small>Kadak Masala Chai</small></article></div>
        <div className="imported-menu-rail"><span>MENU CUES</span><p>Veg Steam Momo · Paneer Steam Momo · Veg Schezwan Momo · Classic French Fries · Cold Coffee</p></div>
        <div className="imported-combo-placeholders"><article><span>COMBO PLACEHOLDER / 01</span><strong>THE HAWA WALK</strong><small>6 momos + chai + a final price</small></article><article><span>COMBO PLACEHOLDER / 02</span><strong>THE PINK CITY TABLE</strong><small>12 momos + sides + a final price</small></article></div>
        <footer className="imported-revamp-footer"><span>REAL FOOD PHOTOS, FINAL PRICES, QR &amp; ADDRESS TO BE INSERTED.</span><em>FRONT / BACK — ONE STORY</em></footer>
      </div>
    </div>
  );
}

function TankTalkLeaflet({ side }: { side: Side }) {
  if (side === "front") {
    return <div className="print-leaflet tank-talk-front"><div className="tank-side" /><div className="tank-foot"><span>ONE BITE. BIG TALK.</span><strong>Steam it. Spice it. Share it.</strong><small>ADDRESS / QR / CONTACT — EDIT BEFORE PRINTING</small></div><div className="tank-copy"><em>FEATURED ON SHARK TANK INDIA</em><h2>THE MOMO<br />THAT MADE<br /><i>THE TANK</i><br />TALK.</h2><p>Hand-folded comfort food for the Hawa Mahal walk.</p></div></div>;
  }

  return <div className="print-leaflet tank-talk-back"><header><span>MAMI MOMOS / FEATURED ON SHARK TANK INDIA</span><small>A5 / BACK</small></header><div className="tank-back-copy"><em>PICK YOUR BASKET</em><h2>MAKE IT<br /><i>A TABLE.</i></h2><p>Clear choices for the first stop, the couple stop, or the full table.</p></div><div className="tank-baskets"><div><b>01 / SOLO FOLD</b><strong>6 MOMOS</strong><span>2 DIPS · ICED CHAI · PRICE TBD</span></div><div><b>02 / PAIR UP</b><strong>12 MOMOS</strong><span>2 DRINKS · 2 DIPS · PRICE TBD</span></div><div><b>03 / BIG TABLE</b><strong>20 MOMOS</strong><span>4 DRINKS · 3 DIPS · PRICE TBD</span></div></div><footer>PICK A FILLING — VEG STEAM · PANEER STEAM · VEG SCHEZWAN</footer></div>;
}

function PinkCityLeaflet({ side }: { side: Side }) {
  if (side === "front") {
    return <div className="print-leaflet pink-city-front"><aside><span>MAMI MOMOS</span><small>PINK CITY EXPRESS / FRONT</small></aside><div className="pink-top">FEATURED ON SHARK TANK INDIA</div><div className="pink-copy"><h2>TAKE THE<br /><i>LONG WAY.</i><br />TAKE THE<br /><b>MOMO.</b></h2><p>Street-ready warmth for the Jaipur walk.</p><small>QR / ADDRESS / CONTACT — EDIT BEFORE PRINTING</small></div></div>;
  }

  return <div className="print-leaflet pink-city-back"><header>MAMI MOMOS / PINK CITY EXPRESS / A5 BACK</header><div className="pink-back-copy"><em>THE QUICK PICK MENU</em><h2>KEEP IT<br /><i>SIMPLE.</i></h2></div><div className="pink-menu"><div><b>STEAM</b><strong>VEG STEAM MOMO</strong><span>PRICE TBD</span></div><div><b>SPICE</b><strong>VEG SCHEZWAN MOMO</strong><span>PRICE TBD</span></div><div><b>SIP</b><strong>KADAK MASALA CHAI</strong><span>PRICE TBD</span></div></div><footer>ASK ABOUT VEG / VEGAN OPTIONS · FINAL PRICE &amp; ALLERGEN NOTES TO BE INSERTED</footer></div>;
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

function preferredVariant(project: DesignProject) {
  if (typeof window === "undefined") return project.variants[0].id;
  const hashQuery = window.location.hash.includes("?") ? window.location.hash.slice(window.location.hash.indexOf("?") + 1) : "";
  const requested = new URLSearchParams(hashQuery || window.location.search).get("variant");
  return project.variants.some((item) => item.id === requested) ? requested! : project.variants[0].id;
}

function preferredSide() {
  if (typeof window === "undefined") return "front" as Side;
  const hashQuery = window.location.hash.includes("?") ? window.location.hash.slice(window.location.hash.indexOf("?") + 1) : "";
  return new URLSearchParams(hashQuery || window.location.search).get("side") === "back" ? "back" : "front";
}

export function ProjectDetail({ projectId }: { projectId: string }) {
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  const [side, setSide] = useState<Side>(() => preferredSide());
  const [variantId, setVariantId] = useState(() => preferredVariant(project));

  useEffect(() => { setSide(preferredSide()); setVariantId(preferredVariant(project)); }, [project.id]);

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
            {variant.artwork === "hawa-pamphlet" ? <HawaMahalPamphlet side={side} /> : variant.artwork === "imported-leaflet" ? <ImportedLeaflet side={side} /> : variant.artwork === "tank-talk" ? <TankTalkLeaflet side={side} /> : variant.artwork === "pink-city" ? <PinkCityLeaflet side={side} /> : <img src={preview} alt={`${project.title} ${variant.label} ${side}`} />}
            <div className="proof-label">{side.toUpperCase()} / PROOF</div>
          </div>
          <p className="proof-note">{variant.note}</p>
        </section>
        <aside className="detail-controls">
          <label className="control-block"><span>VARIANT</span><select className="variant-select" value={variant.id} onChange={(event) => setVariantId(event.target.value)}>{project.variants.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
          <div className="control-block"><p>VIEW SIDE</p><div className="side-tabs">{(["front", "back"] as Side[]).map((item) => <button key={item} type="button" className={side === item ? "active" : ""} onClick={() => setSide(item)} aria-pressed={side === item}><PanelTop size={15} />{item}</button>)}</div></div>
          <div className="project-facts"><div><LayoutTemplate size={18} /><span><b>FORMAT</b>{variant.format}</span></div><div><FileStack size={18} /><span><b>STATUS</b>Review proof</span></div></div>
          {variant.download ? <a className="download-proof" href={variant.download} download><Download size={16} /> DOWNLOAD PRINT-READY A5 PDF</a> : null}
          <p className="placeholder-note">Final price, contact details, QR, and offer terms are still placeholders until you approve the design.</p>
        </aside>
      </section>
    </main>
  );
}
