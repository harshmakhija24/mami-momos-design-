/**
 * Pink City Heatwave design philosophy: a high-contrast Jaipur street-poster
 * studio with dramatic A5 print artboards, bold food editorial cues, and
 * an exacting, production-minded export experience.
 */
import { useState } from "react";
import {
  ArrowUpRight,
  CircleDotDashed,
  Fish,
  FlipHorizontal2,
  Grid2X2,
  Minus,
  Plus,
  Printer,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

type LeafletSide = "front" | "back";

const combos = [
  {
    no: "01",
    title: "The solo fold",
    meta: "6 pcs · one dip · iced chai",
    accent: "coral",
  },
  {
    no: "02",
    title: "The pair up",
    meta: "12 pcs · two dips · two drinks",
    accent: "ink",
  },
  {
    no: "03",
    title: "The big table",
    meta: "20 pcs · three dips · four drinks",
    accent: "sand",
  },
];

function Mark() {
  return (
    <span className="leaflet-mark" aria-hidden="true">
      <Fish size={19} strokeWidth={2.1} />
    </span>
  );
}

function Brand() {
  return (
    <div className="leaflet-brand" aria-label="Mami Momos">
      <Mark />
      <span><strong>MAMI</strong><small>MOMOS</small></span>
    </div>
  );
}

function FrontLeaflet() {
  return (
    <article className="leaflet-sheet leaflet-front" aria-label="Mami Momos leaflet front">
      <div className="front-visual" aria-hidden="true">
        <div className="front-visual__wash" />
        <div className="front-visual__jharokha" />
        <div className="front-visual__shoji" />
      </div>
      <div className="leaflet-safe-area leaflet-front__content">
        <div className="leaflet-topline">
          <Brand />
          <span className="edition-label">JAIPUR × KYOTO</span>
        </div>

        <div className="front-copy">
          <p className="front-kicker"><Sparkles size={13} /> A SMALLER, WARMER WORLD</p>
          <h1>Fold the<br /><em>ordinary.</em></h1>
          <p className="front-deck">Hand-rolled momos with Jaipur fire and a quiet Kyoto finish.</p>
        </div>

        <div className="front-flavour-line">
          <span>STEAMED</span><i /> <span>SPICED</span><i /> <span>SHARED</span>
        </div>

        <div className="front-bottom">
          <p>JHAROKHA TO SHOJI<br />ONE BITE AT A TIME.</p>
          <div className="turn-cue"><FlipHorizontal2 size={16} /><span>TURN FOR<br />COMBOS</span></div>
          <span className="leaflet-number">01 / FRONT</span>
        </div>
      </div>
    </article>
  );
}

function BackLeaflet() {
  return (
    <article className="leaflet-sheet leaflet-back" aria-label="Mami Momos leaflet back">
      <div className="back-arch back-arch--one" aria-hidden="true" />
      <div className="back-arch back-arch--two" aria-hidden="true" />
      <div className="leaflet-safe-area leaflet-back__content">
        <div className="leaflet-topline leaflet-topline--back">
          <Brand />
          <div className="back-stamp"><CircleDotDashed size={13} /> MOMO CLUB</div>
        </div>

        <header className="back-heading">
          <p>JAIPUR HEAT · KYOTO HUSH</p>
          <h2>Pick your<br /><em>fold.</em></h2>
        </header>

        <section className="combo-section" aria-labelledby="combos-title">
          <div className="section-line"><span id="combos-title">COMBOS / BUILT TO SHARE</span><span>CHOOSE YOUR MOOD</span></div>
          <div className="combo-featured">
            <div className="combo-featured__graphic" aria-hidden="true"><span>6</span><i /><i /><i /></div>
            <div className="combo-featured__copy">
              <span className="combo-number">01 / THE SOLO FOLD</span>
              <h3>One basket.<br /><em>Zero compromise.</em></h3>
              <p>6 momos · 2 signature dips · iced chai</p>
              <div className="price-open"><span>SET PRICE</span><b>₹ ___</b></div>
            </div>
          </div>
          <div className="combo-pair">
            <article className="combo-mini combo-mini--ink">
              <span className="combo-number">02 / THE PAIR UP</span>
              <h3>12<br /><em>momos</em></h3>
              <p>2 drinks · 2 dips</p>
              <b>₹ ___</b>
            </article>
            <article className="combo-mini combo-mini--sand">
              <span className="combo-number">03 / BIG TABLE</span>
              <h3>20<br /><em>momos</em></h3>
              <p>4 drinks · 3 dips</p>
              <b>₹ ___</b>
            </article>
          </div>
        </section>

        <section className="flavour-section" aria-labelledby="flavour-title">
          <div className="section-line"><span id="flavour-title">PICK A FILLING</span><span>VEG / PANEER / MUSHROOM</span></div>
          <div className="flavour-pills">
            <span>ROSE CHILLI VEG</span>
            <span>BLACK SESAME PANEER</span>
            <span>MISO MUSHROOM</span>
          </div>
        </section>

        <footer className="back-footer">
          <p><Grid2X2 size={13} /> PRICES LEFT OPEN FOR FINAL MENU INSERT.</p>
          <p><UtensilsCrossed size={13} /> ASK ABOUT VEGAN & ALLERGEN OPTIONS.</p>
          <span>02 / BACK</span>
        </footer>
      </div>
    </article>
  );
}

export default function Home() {
  const [side, setSide] = useState<LeafletSide>("front");

  const printLeaflet = () => window.print();

  return (
    <main className="leaflet-studio">
      <header className="studio-header">
        <div>
          <p className="studio-eyebrow">MAMI MOMOS / PRINT STUDY</p>
          <h1>Two-sided leaflet</h1>
        </div>
        <div className="studio-actions">
          <div className="side-switch" role="group" aria-label="Choose leaflet side">
            <button type="button" className={side === "front" ? "is-active" : ""} onClick={() => setSide("front")} aria-pressed={side === "front"}>FRONT</button>
            <button type="button" className={side === "back" ? "is-active" : ""} onClick={() => setSide("back")} aria-pressed={side === "back"}>BACK / COMBOS</button>
          </div>
          <button type="button" className="print-button" onClick={printLeaflet}><Printer size={15} /> PRINT BOTH SIDES</button>
        </div>
      </header>

      <section className="leaflet-workspace" aria-live="polite">
        <div className="workspace-note workspace-note--left">A5 LEAFLET<br />DOUBLE-SIDED</div>
        <div className="leaflet-preview">
          {side === "front" ? <FrontLeaflet /> : <BackLeaflet />}
        </div>
        <div className="workspace-note workspace-note--right">
          <span>FRONT / IDENTITY</span>
          <i />
          <span>BACK / BITES + COMBOS</span>
        </div>
      </section>

      <footer className="studio-footer">
        <span>PRINT NOTE — SELECT <b>TWO-SIDED / FLIP ON SHORT EDGE</b> IN YOUR PRINTER DIALOGUE.</span>
        <span>FRONT: BRAND STORY · BACK: MENU + COMBO TYPES</span>
      </footer>

      <div className="print-double" aria-hidden="true">
        <FrontLeaflet />
        <BackLeaflet />
      </div>
    </main>
  );
}
