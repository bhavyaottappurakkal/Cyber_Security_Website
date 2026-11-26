import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProgramPageData } from "../data/programPagesData";
import { resolveMediaUrl } from "../utils/mediaStore";
import "../pages/Academics.css";

function ResolvedCardImage({ src, alt }) {
  const [url, setUrl] = useState(() => (src && !src.startsWith("idb://") ? src : ""));

  useEffect(() => {
    let active = true;
    if (!src) {
      setUrl("");
      return;
    }
    if (!src.startsWith("idb://")) {
      setUrl(src);
      return;
    }
    resolveMediaUrl(src).then((resolved) => {
      if (active) setUrl(resolved || "");
    });
    return () => {
      active = false;
    };
  }, [src]);

  if (!url) return null;
  return (
    <div className="cmu-card-media">
      <img src={url} alt={alt || "Card image"} className="cmu-card-media-img" />
    </div>
  );
}

function CurriculumTabs({ years }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentYear = years?.[activeIdx] || years?.[0];
  if (!currentYear) return null;

  return (
    <div className="cmu-curr-wrap">
      <div className="cmu-curr-tabs" role="tablist" aria-label="Curriculum years">
        {years.map((yr, idx) => (
          <button
            key={yr.id || yr.label}
            type="button"
            role="tab"
            aria-selected={idx === activeIdx}
            className={`cmu-curr-tab ${idx === activeIdx ? "is-active" : ""}`}
            onClick={() => setActiveIdx(idx)}
          >
            {yr.label}
          </button>
        ))}
      </div>

      <div key={currentYear.id || safeIdx} className="cmu-col2-grid cmu-curr-slide">
        {(currentYear.semesters || []).map((sem, sIdx) => (
          <div
            key={sem.id || sem.title}
            className="cmu-col2-card cmu-curr-card"
            style={{ "--stagger": `${sIdx * 100}ms` }}
          >
            <span className="cmu-curr-sem-label">{sem.title}</span>
            <ol className="cmu-curr-list">
              {(sem.courses || []).map((course, idx) => (
                <li key={idx} className="cmu-curr-item">
                  <span className="cmu-curr-num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="cmu-curr-name">{course}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const [showBackTop, setShowBackTop] = useState(false);

  const isUg = true;

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 360);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isUg) return;
    const targets = document.querySelectorAll(".cmu-ug-motion [data-reveal]:not(.is-visible)");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isUg, page, heroImg, featureImg]);

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
    <div
      className={`cmu-subpage ${page.themeClass || ""} ${isUg ? "cmu-ug-motion" : ""}`}
      style={customStyle}
    >
      {/* 1. Breadcrumbs */}
      <div className="cmu-sub-breadcrumbs">
        <div className="cmu-sub-wrap">
          <Link to="/">Home</Link>
          <span className="cmu-crumb-sep">/</span>
          {programKey !== "internships" && (
            <>
              <span>Academics</span>
              <span className="cmu-crumb-sep">/</span>
            </>
          )}
          <span className="cmu-crumb-current">{page.breadcrumbLabel}</span>
        </div>
      </div>

      {/* 2. Hero Banner */}
      {hero?.enabled !== false && (
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
        </div>
      </section>
      )}

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
                <div className="cmu-feature-media" data-reveal="slide-left">
                  <img src={featureImg} alt={feature.imageAlt || feature.title} />
                </div>
              )}
              <div className="cmu-feature-content" data-reveal="up">
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
      {(bands || []).filter((band) => !band.hidden).map((band) => (
        <section
          key={band.id}
          id={band.domId || undefined}
          className={`cmu-sub-band ${band.greyBg ? "cmu-sub-band--grey" : ""}`}
        >
          <div className="cmu-sub-wrap">
            {band.title && (
              <h2
                className={`cmu-sub-h2 ${band.subtitle ? "cmu-sub-h2--with-sub" : ""}`}
                data-reveal="up"
              >
                {band.title}
              </h2>
            )}
            {band.subtitle && (
              <p className="cmu-band-subtitle" data-reveal="up">
                {band.subtitle}
              </p>
            )}
            {band.layout === "curriculum" && band.years?.length > 0 ? (
              <div data-reveal="up">
                <CurriculumTabs years={band.years} />
              </div>
            ) : band.layout === "rows" ? (
              <div className="cmu-rows-list" data-reveal="up">
                {(band.cards || []).filter((card) => !card.hidden).map((card) => (
                  <div
                    key={card.id}
                    id={card.domId || undefined}
                    className="cmu-rows-item"
                  >
                    <h3 className="cmu-rows-title">{card.title}</h3>
                    <p className="cmu-rows-body">{renderMultiLine(card.body)}</p>
                  </div>
                ))}
              </div>
            ) : (
            <div className="cmu-col2-grid">
              {(band.cards || []).filter((card) => !card.hidden).map((card, cIdx) => (
                <div
                  key={card.id}
                  id={card.domId || undefined}
                  className="cmu-col2-card"
                  data-reveal={cIdx % 2 === 0 ? "up-left" : "up-right"}
                  style={{ "--stagger": `${cIdx * 110}ms` }}
                >
                  {card.image && (
                    <ResolvedCardImage src={card.image} alt={card.title} />
                  )}
                  {card.badge && (
                    <span className="cmu-card-badge">{card.badge}</span>
                  )}
                  <h3 className="cmu-col2-title">{card.title}</h3>
                  <p>{renderMultiLine(card.body)}</p>
                  {card.bullets?.length > 0 && (
                    <ul className="cmu-card-bullets">
                      {card.bullets.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {card.tags?.length > 0 && (
                    <div className="cmu-card-tags">
                      {card.tags.map((tag, idx) => (
                        <span key={idx} className="cmu-card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
            )}
          </div>
        </section>
      ))}

      {showBackTop && (
        <button
          type="button"
          className="cmu-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

