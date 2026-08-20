/**
 * Rajasthan Atelier Archive: a tactile editorial print library with a warm paper field,
 * Jaipur indigo type, paprika selection states, and an asymmetric open-folio layout.
 */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileImage,
  Layers3,
  PanelTop,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

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
  artwork?: "hawa-pamphlet";
  format?: string;
  archive?: string;
};

type DesignProject = {
  id: string;
  index: string;
  title: string;
  type: string;
  description: string;
  dimensions: string;
  year: string;
  sheets: string;
  tileImage: string;
  tilePosition: string;
  variants: Variant[];
};

const projects: DesignProject[] = [
  {
    id: "mami-momos-hawa-mahal",
    index: "01",
    title: "Mami Momos — Jaipur Menu",
    type: "MENU COLLECTION",
    description:
      "A six-sheet menu archive where misty mountain forms frame a generous all-day momo offering.",
    dimensions: "A4 portrait",
    year: "2026",
    sheets: "06 sheets",
    tileImage: "/manus-storage/mami-menu-page-1_e82f82a2.png",
    tilePosition: "50% 16%",
    variants: [
      {
        id: "hawa-mahal-a5",
        label: "Hawa Mahal A5 / Visitor Handout",
        note: "Matching front + back street-distribution proof",
        front: "",
        back: "",
        tone: "hawa",
        marker: "#e84d2a",
        artwork: "hawa-pamphlet",
        format: "A5 portrait",
        archive: "02 matching sides",
      },
      {
        id: "cover-steam",
        label: "Cover / Steam Momo",
        note: "Cover page + first momo catalogue",
        front: "/manus-storage/mami-menu-page-1_e82f82a2.png",
        back: "/manus-storage/mami-menu-page-2_b673ed98.png",
        tone: "teal",
        marker: "#1e6c72",
      },
      {
        id: "small-plates",
        label: "Small Plates / Cafe",
        note: "Momos, noodles and starters edit",
        front: "/manus-storage/mami-menu-page-3_fa75ef5c.png",
        back: "/manus-storage/mami-menu-page-4_3231e81e.png",
        tone: "paprika",
        marker: "#e84d2a",
      },
      {
        id: "breads-beverages",
        label: "Breads / Beverages",
        note: "Café, pizza and chilled drinks edit",
        front: "/manus-storage/mami-menu-page-5_5c0cb8ec.png",
        back: "/manus-storage/mami-menu-page-6_abbb9f28.png",
        tone: "amber",
        marker: "#cd8a25",
      },
    ],
  },
  {
    id: "taxi-driver",
    index: "02",
    title: "Taxi Driver",
    type: "POSTER STUDY",
    description:
      "A rain-darkened street study, tuned as two contrasting print proofs around one persistent taxi silhouette.",
    dimensions: "A3 portrait",
    year: "2026",
    sheets: "02 sheets",
    tileImage: "/manus-storage/taxi-driver-front_7540f84a.jpg",
    tilePosition: "50% 50%",
    variants: [
      {
        id: "amber-proof",
        label: "Amber Proof",
        note: "Warm headlight and registration-bar edit",
        front: "/manus-storage/taxi-driver-front_7540f84a.jpg",
        back: "/manus-storage/taxi-driver-back_fac09305.jpg",
        tone: "amber",
        marker: "#d87c25",
      },
      {
        id: "monsoon-proof",
        label: "Monsoon Proof",
        note: "Cooler ink separation and rain treatment",
        front: "/manus-storage/taxi-driver-front_7540f84a.jpg",
        back: "/manus-storage/taxi-driver-back_fac09305.jpg",
        tone: "monsoon",
        marker: "#315b85",
      },
    ],
  },
];

function HawaMahalPamphlet({ side }: { side: Side }) {
  const isFront = side === "front";

  return (
    <div className={`pamphlet-art pamphlet-${side}`}>
      <div className="pamphlet-trim" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="pamphlet-kicker">MAMI MOMOS / HAWA MAHAL EDITION / A5 PROOF</div>

      {isFront ? (
        <>
          <div className="pamphlet-front-copy">
            <span className="pamphlet-micro">FOR THE JAIPUR WALK</span>
            <h2>
              PINK CITY,
              <br />
              <i>HOT MOMO.</i>
            </h2>
            <p>A warm stop for the Hawa Mahal wander.</p>
          </div>

          <div className="hawa-scene" aria-hidden="true">
            <div className="tokyo-roof roof-one"><i /><i /><i /></div>
            <div className="tokyo-roof roof-two"><i /><i /></div>
            <div className="hawa-facade">
              {Array.from({ length: 15 }, (_, index) => <span key={index} />)}
            </div>
            <div className="hawa-base"><i /><i /><i /><i /><i /></div>
          </div>

          <div className="front-offer-card">
            <span>HAWA MAHAL WALKER OFFER</span>
            <strong>6 PC MOMO + MASALA CHAI</strong>
            <em>₹ — FINAL PRICE TO BE ADDED</em>
          </div>

          <div className="pamphlet-footer-line">
            <span>ADDRESS / QR / CONTACT — EDIT BEFORE PRINTING</span>
            <img src="/manus-storage/mami-momos-archive-mark_720c60a2.png" alt="" />
          </div>
        </>
      ) : (
        <>
          <div className="pamphlet-back-head">
            <span className="pamphlet-micro">THE NEARBY STOP</span>
            <h2>THREE WAYS TO <i>PAUSE.</i></h2>
            <p>Featured combinations for the Hawa Mahal stroll.</p>
          </div>

          <div className="combo-stack">
            <article className="combo-card combo-one">
              <span>01 / CITY LOOP</span>
              <strong>Veg Steam Momo · 6 pcs<br />Kadak Masala Chai</strong>
              <em>₹ —</em>
            </article>
            <article className="combo-card combo-two">
              <span>02 / JHAROKHA</span>
              <strong>Paneer Steam Momo · 6 pcs<br />Classic French Fries · Cold Coffee</strong>
              <em>₹ —</em>
            </article>
            <article className="combo-card combo-three">
              <span>03 / EVENING EDIT</span>
              <strong>Veg Schezwan Momo · 6 pcs<br />Chilli Garlic Noodles Veg</strong>
              <em>₹ —</em>
            </article>
          </div>

          <div className="back-note">ALL PRICES, QR, ADDRESS &amp; OFFER TERMS ARE EDITABLE PLACEHOLDERS.</div>
          <div className="pamphlet-footer-line">
            <span>FRONT / BACK DESIGNED AS ONE SET</span>
            <img src="/manus-storage/mami-momos-archive-mark_720c60a2.png" alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [selectedVariantId, setSelectedVariantId] = useState(projects[0].variants[0].id);
  const [side, setSide] = useState<Side>("front");

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );

  const selectedVariant = useMemo(
    () =>
      selectedProject.variants.find((variant) => variant.id === selectedVariantId) ??
      selectedProject.variants[0],
    [selectedProject, selectedVariantId],
  );

  const previewImage = selectedVariant[side];

  function selectProject(project: DesignProject) {
    setSelectedProjectId(project.id);
    setSelectedVariantId(project.variants[0].id);
    setSide("front");
  }

  return (
    <main className="archive-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#library" aria-label="Mami Momos Design Library">
          <img
            className="brand-mark"
            src="/manus-storage/mami-momos-archive-mark_720c60a2.png"
            alt=""
          />
          <span className="brand-type">
            <strong>MAMI MOMOS</strong>
            <em>Design Library</em>
          </span>
        </a>

        <div className="topbar-note">
          <span className="availability-dot" aria-hidden="true" />
          <span>LIVE PROOF ARCHIVE</span>
        </div>

        <div className="topbar-index" aria-label="Current project count">
          <span>02</span>
          <i />
          <span>PROJECTS</span>
        </div>
      </header>

      <section className="archive-layout" id="library">
        <aside className="project-rail" aria-label="Project library">
          <div className="rail-heading">
            <p>THE SHELF</p>
            <span>SELECT A PROJECT</span>
          </div>

          <div className="project-stack">
            {projects.map((project) => {
              const selected = project.id === selectedProject.id;
              return (
                <button
                  key={project.id}
                  className={`project-tile ${selected ? "is-selected" : ""}`}
                  type="button"
                  onClick={() => selectProject(project)}
                  aria-pressed={selected}
                >
                  <span className="tile-number">{project.index}</span>
                  <span className="tile-preview" aria-hidden="true">
                    <img
                      src={project.tileImage}
                      alt=""
                      style={{ objectPosition: project.tilePosition }}
                    />
                    <span className="tile-wash" />
                    <ArrowUpRight className="tile-arrow" size={18} strokeWidth={1.6} />
                  </span>
                  <span className="tile-copy">
                    <strong>{project.title}</strong>
                    <small>{project.type}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rail-footer">
            <Sparkles size={15} strokeWidth={1.5} />
            <span>NEW WORK, ONE SHEET AT A TIME.</span>
          </div>
        </aside>

        <section className="folio-stage" aria-labelledby="selected-project-title">
          <div className="stage-head">
            <div>
              <p className="eyebrow">PROJECT FOCUS / {selectedProject.index}</p>
              <h1 id="selected-project-title">{selectedProject.title}</h1>
            </div>
            <div className="stage-identifiers">
              <span>{selectedProject.type}</span>
              <span className="date-pill">{selectedProject.year}</span>
            </div>
          </div>

          <div className={`artboard-wrap preview-${selectedVariant.tone}`}>
            <div className="measurement measurement-top" aria-hidden="true">
              <span>0</span>
              <i />
              <i />
              <i />
              <span>210 MM</span>
            </div>
            <div className="measurement measurement-side" aria-hidden="true">
              <span>0</span>
              <i />
              <i />
              <i />
              <span>297 MM</span>
            </div>

            <div className="artboard-frame">
              <span className="crop-corner crop-tl" />
              <span className="crop-corner crop-tr" />
              <span className="crop-corner crop-bl" />
              <span className="crop-corner crop-br" />
              <div className={`artboard-paper ${selectedVariant.artwork ? "is-artwork" : ""}`}>
                {selectedVariant.artwork === "hawa-pamphlet" ? (
                  <HawaMahalPamphlet side={side} />
                ) : (
                  <img
                    key={`${selectedProject.id}-${selectedVariant.id}-${side}`}
                    className="design-preview"
                    src={previewImage}
                    alt={`${selectedProject.title}, ${selectedVariant.label}, ${side} side`}
                  />
                )}
                <div className="proof-stamp" aria-hidden="true">
                  <span>{side.toUpperCase()}</span>
                  <i />
                  <span>PROOF</span>
                </div>
                <div className="artboard-gloss" aria-hidden="true" />
              </div>
            </div>

            <div className="artboard-caption">
              <span>{selectedVariant.note}</span>
              <span>{side === "front" ? "Obverse sheet" : "Reverse sheet"}</span>
            </div>
          </div>

          <div className="stage-pagination" aria-label="Sheet navigation preview">
            <button type="button" className="pagination-button" aria-label="Previous project">
              <ChevronLeft size={18} strokeWidth={1.6} />
            </button>
            <div>
              <b>{selectedProject.index}</b>
              <span>/ 02</span>
            </div>
            <button type="button" className="pagination-button" aria-label="Next project">
              <ChevronRight size={18} strokeWidth={1.6} />
            </button>
          </div>
        </section>

        <aside className="proof-panel" aria-label="Preview controls and project details">
          <div className="panel-section panel-controls">
            <p className="eyebrow">VIEW THE PROOF</p>
            <div className="side-switch" role="group" aria-label="Select design side">
              {(["front", "back"] as Side[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={side === option ? "is-active" : ""}
                  aria-pressed={side === option}
                  onClick={() => setSide(option)}
                >
                  <PanelTop size={15} strokeWidth={1.7} />
                  {option}
                </button>
              ))}
            </div>

            <label className="variant-field" htmlFor="edition-select">
              <span>EDITION</span>
              <Select value={selectedVariant.id} onValueChange={setSelectedVariantId}>
                <SelectTrigger id="edition-select" className="edition-select" aria-label="Choose design edition">
                  <SelectValue placeholder="Choose edition" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProject.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <div className="edition-swatch" aria-label={`Edition color ${selectedVariant.marker}`}>
              <span style={{ backgroundColor: selectedVariant.marker }} />
              <p>
                <strong>INK FAMILY</strong>
                <small>{selectedVariant.tone} treatment</small>
              </p>
            </div>
          </div>

          <div className="panel-rule" />

          <div className="panel-section panel-details">
            <p className="eyebrow">CATALOGUE NOTE</p>
            <p className="project-description">{selectedProject.description}</p>

            <dl className="spec-list">
              <div>
                <dt>FORMAT</dt>
                <dd>{selectedVariant.format ?? selectedProject.dimensions}</dd>
              </div>
              <div>
                <dt>ARCHIVE</dt>
                <dd>{selectedVariant.archive ?? selectedProject.sheets}</dd>
              </div>
              <div>
                <dt>ACTIVE SHEET</dt>
                <dd>{side === "front" ? "Front / Obverse" : "Back / Reverse"}</dd>
              </div>
            </dl>
          </div>

          <div className="panel-bottom">
            <FileImage size={18} strokeWidth={1.5} />
            <span>PREVIEW UPDATES AS YOU COMPARE.</span>
          </div>
        </aside>
      </section>

      <footer className="archive-footer">
        <span>MADE FOR THE TABLE, CATALOGUED FOR THE STUDIO.</span>
        <span className="footer-rule" />
        <span>JAIPUR / 2026</span>
      </footer>
    </main>
  );
}
