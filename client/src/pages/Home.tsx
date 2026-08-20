/**
 * Pink City Heatwave design philosophy: a high-contrast Jaipur street-poster
 * studio with dramatic A5 print artboards, bold food editorial cues, and
 * an exacting, production-minded export experience.
 */
import { useMemo, useRef, useState } from "react";
import { toPng, toSvg } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clipboard,
  Download,
  FileCode2,
  FileText,
  MapPin,
  Printer,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const brandLogo = "/manus-storage/momo-mami-official-logo_66c28af6.jpg";
const dumplingMark = "/manus-storage/mami-momos-dumpling-mark_ffbbd326.png";

const variants = [
  {
    id: "heatwave",
    number: "01",
    name: "Heatwave",
    kicker: "PINK CITY HOT BITE",
    headline: ["HAWA MAHAL", "CAN WAIT."],
    subline: "Your momos are steaming.",
    image: "/manus-storage/mami-momos-steam-reference_d3fa6675.jpg",
    menu: [
      ["Steam Veg Momo · 6 pcs", "₹99"],
      ["Fried Veg Momo · 6 pcs", "₹129"],
      ["Momos Burger", "₹99"],
    ],
    note: "Maximum street visibility. Coral field, dark ink, giant offer stamp.",
    palette: ["#F25C46", "#27130F", "#FFF2DF"],
  },
  {
    id: "receipt",
    number: "02",
    name: "Bazaar Receipt",
    kicker: "VALID AT GANGORI BAZAAR",
    headline: ["BRING THIS", "SLIP."],
    subline: "Unlock the good stuff.",
    image: "/manus-storage/mami-momos-pinkcity-feast_bf6bec30.jpg",
    menu: [
      ["Zinger Veg Dumpling · 6 pcs", "₹139"],
      ["Steam Veg Momo · 6 pcs", "₹99"],
      ["Kadak Masala Chai", "₹49"],
    ],
    note: "Coupon-led and collectible. Printed like a prized bazaar receipt.",
    palette: ["#F5EAD7", "#612B2B", "#EB6A4C"],
  },
  {
    id: "saffron",
    number: "03",
    name: "Steam & Saffron",
    kicker: "A HOT DETOUR, WELL SPENT",
    headline: ["STEAMED.", "SERVED."],
    subline: "A little Jaipur pause, folded perfectly.",
    image: "/manus-storage/mami-momos-kurkure-hero_4f1c1b35.jpg",
    menu: [
      ["Kurkure Veg Dumpling · 6 pcs", "₹139"],
      ["Chilli Veg Momo · 6 pcs", "₹159"],
      ["Momos Burger", "₹99"],
    ],
    note: "Food-editorial and premium. Saffron, cream, steam ribbons, appetite first.",
    palette: ["#E7952C", "#2A1710", "#FFF7E8"],
  },
  {
    id: "afterglow",
    number: "04",
    name: "Afterglow",
    kicker: "FEATURED ON SHARK TANK",
    headline: ["THE HOT", "STOP."],
    subline: "Bold bites near the Pink City rush.",
    image: "/manus-storage/mami-momos-bazaar-night_623e9c93.jpg",
    menu: [
      ["Pan Fried Veg Momo · 6 pcs", "₹129"],
      ["Paneer Momos Burger", "₹109"],
      ["Saffron Chai", "₹59"],
    ],
    note: "High-contrast dusk poster. Charcoal ink and hot orange handle late-afternoon traffic.",
    palette: ["#171412", "#FE7039", "#F7E2B0"],
  },
  {
    id: "crossroads",
    number: "05",
    name: "Crossroads",
    kicker: "PINK CITY × KYOTO",
    headline: ["TWO WORLDS.", "ONE FOLD."],
    subline: "A little Hawa Mahal rhythm. A little Kyoto calm. All hot momos.",
    image: "/manus-storage/mami-momos-jaipur-kyoto-hero_22d6a504.png",
    menu: [
      ["Steam Veg Momo · 6 pcs", "₹99"],
      ["Piro Piro Veg Momo · 6 pcs", "₹139"],
      ["Makhani Veg Momo · 6 pcs", "₹179"],
    ],
    note: "Jaipur jharokha rhythm meets Kyoto restraint — a calmer editorial collector’s cut.",
    palette: ["#D77466", "#112D2A", "#EFE1CA"],
  },
] as const;

type Variant = (typeof variants)[number];

const locationLine = "Shop No. 146, Gangori Bazar Rd, Tripolia Bazar, Pink City, Jaipur 302002";

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function HeatStamp() {
  return (
    <div className="heat-stamp" aria-label="Bring this flyer to get 10 percent off">
      <span>BRING THIS</span>
      <strong>10%</strong>
      <span>OFF MOMOS</span>
    </div>
  );
}

function FlyerArtboard({ variant, showGuides }: { variant: Variant; showGuides: boolean }) {
  return (
    <article
      id="printable-flyer"
      className={`flyer-artboard flyer--${variant.id}`}
      aria-label={`${variant.name} A5 pamphlet preview`}
    >
      <div className="flyer-photo" style={{ backgroundImage: `url(${variant.image})` }} />
      <div className="flyer-grain" />
      {showGuides && (
        <>
          <span className="print-guide print-guide--top">3 mm BLEED</span>
          <span className="safe-guide" />
        </>
      )}

      <header className="flyer-head">
        <div className="flyer-brand-lockup">
          <img src={dumplingMark} alt="Momo dumpling emblem" className="flyer-mark" />
          <div>
            <strong>MAMI<br />MOMOS</strong>
            <span>JAIPUR · HOT &amp; FOLDED</span>
          </div>
        </div>
        <div className="flyer-edition"><span>COUPON EDITION</span><b>{variant.number} / 05</b></div>
      </header>

      <div className="flyer-content">
        <div className="flyer-kicker">{variant.kicker}</div>
        <h2>
          {variant.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="flyer-subline">{variant.subline}</p>
      </div>

      <div className="steam-ribbons" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <HeatStamp />

      <div className="flyer-menu-card">
        <div className="flyer-menu-label">MOMO MOMENT / STARTING AT</div>
        {variant.menu.map(([label, price]) => (
          <div className="flyer-menu-row" key={label}>
            <span>{label}</span>
            <strong>{price}</strong>
          </div>
        ))}
      </div>

      <footer className="flyer-footer">
        <div className="flyer-footer-top">
          <span>NEAR HAWA MAHAL</span>
          <span className="footer-dot" />
          <span>BRING THIS FLYER</span>
        </div>
        <div className="flyer-address">{locationLine}</div>
      </footer>
    </article>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState<Variant["id"]>("heatwave");
  const [showGuides, setShowGuides] = useState(true);
  const [toast, setToast] = useState("A5 studio ready — choose a design.");
  const [showCode, setShowCode] = useState(false);
  const artboardRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () => variants.find((variant) => variant.id === activeId) ?? variants[0],
    [activeId],
  );

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };

  const capturePng = async () => {
    if (!artboardRef.current) return;
    try {
      artboardRef.current.classList.add("exporting-artboard");
      const url = await toPng(artboardRef.current, {
        cacheBust: true,
        pixelRatio: 4,
        backgroundColor: "#ffffff",
      });
      downloadDataUrl(url, `momo-mami-${active.id}-a5.png`);
      announce("High-resolution PNG downloaded.");
    } catch {
      announce("PNG export needs a quick retry after images finish loading.");
    } finally {
      artboardRef.current?.classList.remove("exporting-artboard");
    }
  };

  const exportSvg = async () => {
    if (!artboardRef.current) return;
    try {
      artboardRef.current.classList.add("exporting-artboard");
      const url = await toSvg(artboardRef.current, { cacheBust: true });
      downloadDataUrl(url, `momo-mami-${active.id}-a5.svg`);
      announce("SVG export downloaded for design review / Figma import.");
    } catch {
      announce("SVG export needs a quick retry after images finish loading.");
    } finally {
      artboardRef.current?.classList.remove("exporting-artboard");
    }
  };

  const exportPdf = async () => {
    if (!artboardRef.current) return;
    try {
      artboardRef.current.classList.add("exporting-artboard");
      const image = await toPng(artboardRef.current, {
        cacheBust: true,
        pixelRatio: 4,
        backgroundColor: "#ffffff",
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [148, 210], compress: true });
      pdf.addImage(image, "PNG", 0, 0, 148, 210, undefined, "FAST");
      pdf.save(`momo-mami-${active.id}-a5-print.pdf`);
      announce("A5 print PDF downloaded.");
    } catch {
      announce("PDF export needs a quick retry after images finish loading.");
    } finally {
      artboardRef.current?.classList.remove("exporting-artboard");
    }
  };

  const copySpec = async () => {
    const productionCopy = `${active.name} — A5 (148 × 210 mm)\nOffer: Bring this flyer and get 10% off.\nBleed: 3 mm | Safe area: 8 mm\nAddress: ${locationLine}\nPrint stock: 170–220 GSM matte / uncoated\nNote: Confirm final offer terms and printer CMYK conversion before the print run.`;
    await navigator.clipboard.writeText(productionCopy);
    announce("Selected design’s print specification copied.");
  };

  const openPrint = () => {
    document.body.classList.add("print-flyer");
    window.print();
    window.setTimeout(() => document.body.classList.remove("print-flyer"), 500);
  };

  const sourcePreview = `// ${active.name} / A5 flyer artboard\n<article className="flyer-artboard flyer--${active.id}">\n  <h2>${active.headline.join(" ")}</h2>\n  <p>Bring this flyer. Get 10% off.</p>\n  <Menu startingAt="₹99" />\n  <Location near="Hawa Mahal" />\n</article>`;

  return (
    <main className="studio-shell">
      <section className="studio-header">
        <div className="studio-header__brand">
          <div className="header-wordmark" aria-label="Mami Momos Jaipur">
            <img src={dumplingMark} alt="" />
            <strong>MAMI<br />MOMOS</strong>
            <span>JAIPUR</span>
          </div>
          <div className="brand-family-mark">
            <span>FEATURED WITH</span>
            <img src={brandLogo} alt="Momo Mami brand family reference" />
          </div>
          <span className="studio-header__eyebrow">PINK CITY COUPON WORKSHOP</span>
        </div>
        <div className="studio-header__status">
          <SunMedium size={16} />
          <span>DAYLIGHT-SAFE PALETTE</span>
          <span className="status-dot" />
          <span>A5 / 148 × 210 mm</span>
        </div>
      </section>

      <section className="studio-intro">
        <div>
          <p className="eyebrow"><span className="eyebrow-stamp">MAMI MOMOS</span> STREET DISTRIBUTION / HAWA MAHAL TO GANGORI BAZAAR</p>
          <h1>
            A poster-sized excuse
            <span>to take the momo detour.</span>
          </h1>
        </div>
        <p className="studio-intro__copy">
          Four hot-bite coupon directions built around momos from ₹99 and a walk from Hawa Mahal.
          Made to catch eyes in Jaipur sun—not just on a laptop.
        </p>
      </section>

      <section className="workbench" aria-label="Pamphlet design workbench">
        <aside className="design-rail">
          <div className="rail-section">
            <span className="rail-label">SELECT A DESIGN</span>
            <Select value={active.id} onValueChange={(value) => setActiveId(value as Variant["id"])}>
              <SelectTrigger aria-label="Select pamphlet design" className="design-select">
                <SelectValue />
                <ChevronDown size={16} />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant) => (
                  <SelectItem value={variant.id} key={variant.id}>
                    {variant.number}. {variant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="variant-list" role="list" aria-label="Pamphlet designs">
            {variants.map((variant) => (
              <button
                type="button"
                key={variant.id}
                className={`variant-option ${variant.id === active.id ? "is-active" : ""}`}
                onClick={() => setActiveId(variant.id)}
                aria-pressed={variant.id === active.id}
              >
                <span className="variant-swatch" style={{ background: `linear-gradient(135deg, ${variant.palette[0]}, ${variant.palette[1]})` }} />
                <span>
                  <b>{variant.number}</b>
                  <strong>{variant.name}</strong>
                  <small>{variant.note}</small>
                </span>
                {variant.id === active.id && <Check size={15} />}
              </button>
            ))}
          </div>

          <div className="rail-divider" />

          <div className="rail-section rail-section--compact">
            <span className="rail-label">PRINT CHECK</span>
            <label className="guide-toggle">
              <input checked={showGuides} onChange={(event) => setShowGuides(event.target.checked)} type="checkbox" />
              <span className="guide-toggle__track" />
              <span>Preview safe-area guides</span>
            </label>
            <p className="rail-caption">Exports remove guides. PDF stays A5 at 148 × 210 mm.</p>
          </div>

          <div className="rail-location">
            <MapPin size={18} />
            <div>
              <span>OUTLET</span>
              <strong>Gangori Bazaar, Jaipur</strong>
              <p>Near Hawa Mahal</p>
            </div>
          </div>
        </aside>

        <section className="artboard-zone">
          <div className="artboard-zone__topline">
            <span className="artboard-stamp">LIVE COUPON / A5</span>
            <span>{active.name.toUpperCase()} / FRONT</span>
          </div>
          <div className="artboard-wrap" ref={artboardRef}>
            <FlyerArtboard variant={active} showGuides={showGuides} />
          </div>
          <div className="artboard-caption">
            <div>
              <span>FORMAT</span>
              <strong>A5 portrait / 3 mm bleed / 8 mm safe area</strong>
            </div>
            <div>
              <span>REWARD</span>
              <strong>Bring flyer · 10% off</strong>
            </div>
          </div>
        </section>

        <aside className="export-bench">
          <div className="export-bench__heading">
            <div>
              <span className="rail-label">GANGORI BAZAAR PRINT BENCH</span>
              <h2>Send a hot coupon to print.</h2>
            </div>
            <Sparkles size={20} />
          </div>
          <p>Pick the handout that makes the detour feel worth it, then send a crisp A5 file to your printer or designer.</p>

          <div className="export-grid">
            <Button className="export-button export-button--primary" onClick={exportPdf}>
              <FileText size={18} />
              <span>Send to printer</span>
              <small>A5 coupon PDF</small>
            </Button>
            <Button variant="outline" className="export-button" onClick={exportSvg}>
              <FileCode2 size={18} />
              <span>Hand off SVG</span>
              <small>Figma-friendly vector</small>
            </Button>
            <Button variant="outline" className="export-button" onClick={capturePng}>
              <Download size={18} />
              <span>Share the proof</span>
              <small>High-res PNG</small>
            </Button>
            <Button variant="outline" className="export-button" onClick={openPrint}>
              <Printer size={18} />
              <span>Test in sunlight</span>
              <small>Print / save as PDF</small>
            </Button>
          </div>

          <div className="terms-card">
            <div className="terms-card__icon"><Clipboard size={17} /></div>
            <div>
              <span>INK IT ONLY AFTER THIS</span>
              <p>The 10% flyer reward is a working coupon. Lock expiry, minimum order, and final terms before the full print run.</p>
              <button type="button" onClick={copySpec}>Copy this coupon’s print brief <ArrowUpRight size={14} /></button>
            </div>
          </div>

          <button type="button" className="code-toggle" onClick={() => setShowCode((value) => !value)}>
            <span><FileCode2 size={17} /> SEE HOW THIS COUPON IS MADE</span>
            <ChevronDown className={showCode ? "is-open" : ""} size={18} />
          </button>
          {showCode && (
            <pre className="code-preview"><code>{sourcePreview}</code></pre>
          )}

          <div className="sunlight-card">
            <ShieldIcon />
            <div>
              <strong>Made for the Hawa Mahal walk</strong>
              <p>Dark ink meets hot light fields. Headline, reward, and “bring this flyer” stay readable as three clear punches.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="studio-footer">
        <span>DESIGN SYSTEM: PINK CITY HEATWAVE</span>
        <span>YOUR MENU ANCHORS: MOMOS FROM ₹99 · FLYER BENEFIT: 10% OFF</span>
        <span>PRINT ON MATTE / UNCOATED 170–220 GSM</span>
      </section>

      {toast && <div className="studio-toast" role="status">{toast}</div>}
    </main>
  );
}

function ShieldIcon() {
  return (
    <span className="shield-icon" aria-hidden="true">
      <Check size={15} />
    </span>
  );
}
