import { Link } from "react-router-dom";
import { useProgramPageData } from "../data/programPagesData";
import "../pages/Academics.css";

function renderMultiLine(text) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

function isLightHex(hex) {
  if (!hex || typeof hex !== "string") return false;
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6 && clean.length !== 3) return false;
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return false;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62;
}

export default function ProgramPageRenderer({ programKey }) {
  const { page, heroImg, featureImg } = useProgramPageData(programKey);

  if (!page) return null;

  const { hero, feature, bands } = page;
  const isLightHero = isLightHex(page.heroBgColor);

  const customStyle = {
    ...(page.pageBgColor ? { "--page-bg": page.pageBgColor } : {}),
    ...(page.bandAltBgColor ? { "--band-alt-bg": page.bandAltBgColor } : {}),
    ...(page.heroBgColor ? { "--hero-bg": page.heroBgColor } : {}),
    ...(page.accentColor ? { "--prog-accent": page.accentColor } : {}),
  };

  return (
    <div className={`cmu-subpage ${page.themeClass || ""}`} style={customStyle}>
      {/* 1. Breadcrumbs */}
      <div className="cmu-sub-breadcrumbs">
        <div className="cmu-sub-wrap">
          <Link to="/">Home</Link>
          <span className="cmu-crumb-sep">/</span>
          <span>Academics</span>
          <span className="cmu-crumb-sep">/</span>
          <span className="cmu-crumb-current">{page.breadcrumbLabel}</span>
        </div>
      </div>

      {/* 2. Hero Banner */}
      <section className={`cmu-prog-hero ${isLightHero ? "cmu-prog-hero--light" : ""}`}>
        {heroImg && (
          <img
            src={heroImg}
            alt={hero.imageAlt || hero.title}
            className="cmu-prog-hero-bg"
          />
        )}
        <div className="cmu-prog-hero-scrim" />
        <div className="cmu-sub-wrap cmu-prog-hero-inner">
          {hero.eyebrow && <span className="cmu-prog-eyebrow">{hero.eyebrow}</span>}
          <h1 className="cmu-sub-h1">{hero.title}</h1>
          {hero.lead && <p className="cmu-sub-lead">{hero.lead}</p>}
          {hero.body && <p className="cmu-sub-body">{hero.body}</p>}

          {hero.stats?.length > 0 && (
            <div className="cmu-prog-stats">
              {hero.stats.map((stat) => (
                <div key={stat.id} className="cmu-prog-stat">
                  <span className="cmu-prog-stat-label">{stat.label}</span>
                  <span className="cmu-prog-stat-val">{stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Visual Feature Split Band */}
      {feature?.enabled !== false && (
        <section className="cmu-sub-band cmu-sub-band--grey">
          <div className="cmu-sub-wrap">
            <div
              className={`cmu-feature-split ${
                feature.reverse ? "cmu-feature-split--reverse" : ""
              }`}
              style={!featureImg ? { gridTemplateColumns: "1fr" } : undefined}
            >
              {featureImg && (
                <div className="cmu-feature-media">
                  <img src={featureImg} alt={feature.imageAlt || feature.title} />
                </div>
              )}
              <div className="cmu-feature-content">
                {feature.kicker && (
                  <span className="cmu-feature-kicker">{feature.kicker}</span>
                )}
                {feature.title && <h2 className="cmu-sub-h2">{feature.title}</h2>}
                {feature.body && <p>{feature.body}</p>}
                {feature.highlights?.length > 0 && (
                  <ul className="cmu-feature-list">
                    {feature.highlights.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Dynamic 2-Column Content Bands */}
      {(bands || []).map((band) => (
        <section
          key={band.id}
          className={`cmu-sub-band ${band.greyBg ? "cmu-sub-band--grey" : ""}`}
        >
          <div className="cmu-sub-wrap">
            {band.title && <h2 className="cmu-sub-h2">{band.title}</h2>}
            <div className="cmu-col2-grid">
              {(band.cards || []).map((card) => (
                <div
                  key={card.id}
                  id={card.domId || undefined}
                  className="cmu-col2-card"
                >
                  {card.badge && (
                    <span className="cmu-card-badge">{card.badge}</span>
                  )}
                  <h3 className="cmu-col2-title">{card.title}</h3>
                  <p>{renderMultiLine(card.body)}</p>
                  {card.linkLabel && card.linkUrl && (
                    card.linkUrl.startsWith("/") ? (
                      <Link to={card.linkUrl} className="cmu-sub-link">
                        {card.linkLabel}
                      </Link>
                    ) : (
                      <a
                        href={card.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cmu-sub-link"
                      >
                        {card.linkLabel}
                      </a>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

