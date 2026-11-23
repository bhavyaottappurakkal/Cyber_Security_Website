import { useState, useEffect } from "react";
import { saveMediaFile, resolveMediaUrl, deleteMediaFile } from "../utils/mediaStore";
import { DEFAULT_PROGRAM_PAGES } from "../data/programPagesData";

function swapItems(arr, idxA, idxB) {
  if (idxA < 0 || idxB < 0 || idxA >= arr.length || idxB >= arr.length) return arr;
  const copy = [...arr];
  const temp = copy[idxA];
  copy[idxA] = copy[idxB];
  copy[idxB] = temp;
  return copy;
}

function ImagePreview({ src, alt }) {
  const [resolved, setResolved] = useState(() => (src?.startsWith("idb://") ? "" : src));

  useEffect(() => {
    let active = true;
    if (!src) {
      setResolved("");
      return;
    }
    resolveMediaUrl(src).then((url) => {
      if (active) setResolved(url);
    });
    return () => {
      active = false;
    };
  }, [src]);

  if (!resolved) {
    return (
      <div
        style={{
          width: "120px",
          height: "68px",
          borderRadius: "6px",
          border: "1px dashed #cbd5e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          color: "#64748b",
          background: "#ffffff",
          flexShrink: 0,
        }}
      >
        No Image
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      style={{
        width: "120px",
        height: "68px",
        objectFit: "cover",
        borderRadius: "6px",
        border: "1px solid #cbd5e1",
        flexShrink: 0,
      }}
    />
  );
}

export default function ProgramPageEditor({
  programKey,
  page,
  onChangePage,
  onSavePage,
  onResetPage,
  showToast,
}) {
  const [newStat, setNewStat] = useState({ label: "", value: "" });
  const [newHighlight, setNewHighlight] = useState("");
  const [newBandTitle, setNewBandTitle] = useState("");

  if (!page) return null;

  const updateHero = (patch) => {
    onChangePage({
      ...page,
      hero: { ...page.hero, ...patch },
    });
  };

  const updateFeature = (patch) => {
    onChangePage({
      ...page,
      feature: { ...page.feature, ...patch },
    });
  };

  const handleImageUpload = async (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const idbKey = await saveMediaFile(file);
      if (target === "hero") {
        if (page.hero.image?.startsWith("idb://")) deleteMediaFile(page.hero.image);
        const updated = { ...page, hero: { ...page.hero, image: idbKey } };
        onSavePage(updated, `Hero image "${file.name}" uploaded and saved!`);
      } else {
        if (page.feature.image?.startsWith("idb://")) deleteMediaFile(page.feature.image);
        const updated = { ...page, feature: { ...page.feature, image: idbKey } };
        onSavePage(updated, `Feature image "${file.name}" uploaded and saved!`);
      }
    } catch {
      showToast("Could not store image in browser storage.", "error");
    }
    e.target.value = "";
  };

  const handleRemoveImage = (target) => {
    if (target === "hero") {
      if (page.hero.image?.startsWith("idb://")) deleteMediaFile(page.hero.image);
      onSavePage({ ...page, hero: { ...page.hero, image: "" } }, "Hero image removed.");
    } else {
      if (page.feature.image?.startsWith("idb://")) deleteMediaFile(page.feature.image);
      onSavePage({ ...page, feature: { ...page.feature, image: "" } }, "Feature image removed.");
    }
  };

  return (
    <div className="ia-form">
      <div className="ia-cms-toolbar">
        <div>
          <h2 className="ia-cms-toolbar-title">
            Editing: {DEFAULT_PROGRAM_PAGES[programKey]?.tabLabel || page.breadcrumbLabel}
          </h2>
          <p className="ia-cms-toolbar-sub">
            Full edit, image upload/remove, add, delete, and swap/reorder privileges.
          </p>
        </div>
        <div className="ia-cms-actions">
          <button
            type="button"
            className="ia-btn-secondary"
            onClick={() => {
              if (window.confirm(`Reset ${page.breadcrumbLabel} to default content?`)) {
                onResetPage();
              }
            }}
          >
            Reset to Default
          </button>
          <button
            type="button"
            className="ia-btn-primary"
            onClick={() => onSavePage(page, `${page.breadcrumbLabel} saved!`)}
          >
            Save All Changes
          </button>
        </div>
      </div>

      {/* 0. PAGE BACKGROUND & THEME COLORS */}
      <div className="ia-cms-section">
        <div className="ia-cms-section-head">
          <h3>Page Background &amp; Theme Colors</h3>
          <button
            type="button"
            className="ia-btn-secondary"
            onClick={() =>
              onChangePage({
                ...page,
                pageBgColor: "#ffffff",
                bandAltBgColor: "#f4f6f9",
                heroBgColor: "#f1f5f9",
                accentColor: "",
              })
            }
          >
            Reset Colors
          </button>
        </div>

        <div className="ia-cms-color-grid">
          <div className="ia-cms-color-field">
            <span>Page Background Color</span>
            <div className="ia-cms-color-row">
              <input
                type="color"
                className="ia-cms-color-picker"
                value={page.pageBgColor || "#ffffff"}
                onChange={(e) => onChangePage({ ...page, pageBgColor: e.target.value })}
              />
              <input
                type="text"
                className="ia-cms-input"
                value={page.pageBgColor || "#ffffff"}
                onChange={(e) => onChangePage({ ...page, pageBgColor: e.target.value })}
              />
            </div>
          </div>

          <div className="ia-cms-color-field">
            <span>Alternate Section Background Color</span>
            <div className="ia-cms-color-row">
              <input
                type="color"
                className="ia-cms-color-picker"
                value={page.bandAltBgColor || "#f4f6f9"}
                onChange={(e) => onChangePage({ ...page, bandAltBgColor: e.target.value })}
              />
              <input
                type="text"
                className="ia-cms-input"
                value={page.bandAltBgColor || "#f4f6f9"}
                onChange={(e) => onChangePage({ ...page, bandAltBgColor: e.target.value })}
              />
            </div>
          </div>

          <div className="ia-cms-color-field">
            <span>Hero Banner Background Color</span>
            <div className="ia-cms-color-row">
              <input
                type="color"
                className="ia-cms-color-picker"
                value={page.heroBgColor || "#0f172a"}
                onChange={(e) => onChangePage({ ...page, heroBgColor: e.target.value })}
              />
              <input
                type="text"
                className="ia-cms-input"
                value={page.heroBgColor || "#0f172a"}
                onChange={(e) => onChangePage({ ...page, heroBgColor: e.target.value })}
              />
            </div>
          </div>

          <div className="ia-cms-color-field">
            <span>Accent Color (Borders &amp; Badges)</span>
            <div className="ia-cms-color-row">
              <input
                type="color"
                className="ia-cms-color-picker"
                value={page.accentColor || "#c59b27"}
                onChange={(e) => onChangePage({ ...page, accentColor: e.target.value })}
              />
              <input
                type="text"
                className="ia-cms-input"
                placeholder="Default theme accent"
                value={page.accentColor || ""}
                onChange={(e) => onChangePage({ ...page, accentColor: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 1. BREADCRUMB & HERO BANNER */}
      <div className="ia-cms-section">
        <div className="ia-cms-section-head">
          <h3>1. Hero Banner &amp; Quick Stats</h3>
        </div>

        <label className="ia-field">
          <span>Breadcrumb Label</span>
          <input
            type="text"
            value={page.breadcrumbLabel || ""}
            onChange={(e) => onChangePage({ ...page, breadcrumbLabel: e.target.value })}
          />
        </label>

        <div className="ia-field">
          <span>Hero Background Image (Add / Upload / URL / Remove)</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <ImagePreview src={page.hero.image} alt="Hero preview" />
            <div style={{ flex: 1, minWidth: "220px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <input
                type="text"
                placeholder="Image URL (e.g. /ug-program.jpg or https://...)"
                value={page.hero.image?.startsWith("idb://") ? "Uploaded custom image (stored in browser)" : page.hero.image || ""}
                readOnly={page.hero.image?.startsWith("idb://")}
                onChange={(e) => updateHero({ image: e.target.value })}
              />
              <div className="ia-cms-actions">
                <label className="ia-upload-btn" style={{ margin: 0 }}>
                  Upload Hero Image
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "hero")} hidden />
                </label>
                {page.hero.image && (
                  <button
                    type="button"
                    className="ia-btn-danger"
                    onClick={() => handleRemoveImage("hero")}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <label className="ia-field">
          <span>Hero Eyebrow Badge</span>
          <input
            type="text"
            value={page.hero.eyebrow || ""}
            onChange={(e) => updateHero({ eyebrow: e.target.value })}
          />
        </label>

        <label className="ia-field">
          <span>Page Title (H1)</span>
          <input
            type="text"
            value={page.hero.title || ""}
            onChange={(e) => updateHero({ title: e.target.value })}
          />
        </label>

        <label className="ia-field">
          <span>Lead Summary</span>
          <textarea
            rows={2}
            value={page.hero.lead || ""}
            onChange={(e) => updateHero({ lead: e.target.value })}
          />
        </label>

        <label className="ia-field">
          <span>Intro Body Text</span>
          <textarea
            rows={3}
            value={page.hero.body || ""}
            onChange={(e) => updateHero({ body: e.target.value })}
          />
        </label>

        {/* Hero Stats List with Swap & Delete */}
        <div className="ia-field">
          <span>Hero Quick-Facts Strip (Edit / Swap Order / Add / Delete)</span>
          <div className="ia-list" style={{ marginBottom: "8px" }}>
            {(page.hero.stats || []).map((st, idx) => (
              <div key={st.id} className="ia-list-row" style={{ flexWrap: "wrap" }}>
                <input
                  type="text"
                  className="ia-cms-input"
                  placeholder="Label"
                  style={{ flex: "0.7", minWidth: "120px" }}
                  value={st.label}
                  onChange={(e) => {
                    const updated = [...page.hero.stats];
                    updated[idx] = { ...st, label: e.target.value };
                    updateHero({ stats: updated });
                  }}
                />
                <input
                  type="text"
                  className="ia-cms-input"
                  placeholder="Value"
                  style={{ flex: "1.2", minWidth: "160px" }}
                  value={st.value}
                  onChange={(e) => {
                    const updated = [...page.hero.stats];
                    updated[idx] = { ...st, value: e.target.value };
                    updateHero({ stats: updated });
                  }}
                />
                <button
                  type="button"
                  className="ia-btn-swap"
                  disabled={idx === 0}
                  onClick={() => updateHero({ stats: swapItems(page.hero.stats, idx, idx - 1) })}
                  title="Swap Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="ia-btn-swap"
                  disabled={idx === page.hero.stats.length - 1}
                  onClick={() => updateHero({ stats: swapItems(page.hero.stats, idx, idx + 1) })}
                  title="Swap Down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="ia-btn-danger"
                  onClick={() =>
                    updateHero({
                      stats: page.hero.stats.filter((item) => item.id !== st.id),
                    })
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="ia-inline-form" style={{ marginBottom: 0 }}>
            <input
              type="text"
              placeholder="New stat label (e.g. Credits)"
              value={newStat.label}
              onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
            />
            <input
              type="text"
              placeholder="New stat value (e.g. 160 Credits)"
              value={newStat.value}
              onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
            />
            <button
              type="button"
              className="ia-btn-primary"
              onClick={() => {
                if (!newStat.label.trim() || !newStat.value.trim()) return;
                updateHero({
                  stats: [
                    ...(page.hero.stats || []),
                    { id: `st-${Date.now()}`, label: newStat.label.trim(), value: newStat.value.trim() },
                  ],
                });
                setNewStat({ label: "", value: "" });
              }}
            >
              + Add Stat
            </button>
          </div>
        </div>
      </div>

      {/* 2. FEATURE SPLIT SECTION */}
      <div className="ia-cms-section">
        <div className="ia-cms-section-head">
          <h3>2. Visual Feature Split Section</h3>
          <div className="ia-cms-actions">
            <button
              type="button"
              className="ia-btn-swap"
              onClick={() => updateFeature({ reverse: !page.feature.reverse })}
            >
              ⇄ Swap Image Side ({page.feature.reverse ? "Right" : "Left"})
            </button>
            <button
              type="button"
              className="ia-btn-secondary"
              onClick={() => updateFeature({ enabled: page.feature.enabled === false })}
            >
              {page.feature.enabled === false ? "Show Section" : "Hide Section"}
            </button>
          </div>
        </div>

        <div className="ia-field">
          <span>Feature Section Image (Add / Upload / URL / Remove)</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <ImagePreview src={page.feature.image} alt="Feature preview" />
            <div style={{ flex: 1, minWidth: "220px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <input
                type="text"
                placeholder="Image URL (e.g. /campus-life.jpg)"
                value={page.feature.image?.startsWith("idb://") ? "Uploaded custom image (stored in browser)" : page.feature.image || ""}
                readOnly={page.feature.image?.startsWith("idb://")}
                onChange={(e) => updateFeature({ image: e.target.value })}
              />
              <div className="ia-cms-actions">
                <label className="ia-upload-btn" style={{ margin: 0 }}>
                  Upload Feature Image
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "feature")} hidden />
                </label>
                {page.feature.image && (
                  <button
                    type="button"
                    className="ia-btn-danger"
                    onClick={() => handleRemoveImage("feature")}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <label className="ia-field">
          <span>Image Caption</span>
          <input
            type="text"
            value={page.feature.caption || ""}
            onChange={(e) => updateFeature({ caption: e.target.value })}
          />
        </label>

        <div className="ia-cms-row-2">
          <label className="ia-field">
            <span>Section Kicker</span>
            <input
              type="text"
              value={page.feature.kicker || ""}
              onChange={(e) => updateFeature({ kicker: e.target.value })}
            />
          </label>

          <label className="ia-field">
            <span>Section Heading</span>
            <input
              type="text"
              value={page.feature.title || ""}
              onChange={(e) => updateFeature({ title: e.target.value })}
            />
          </label>
        </div>

        <label className="ia-field">
          <span>Description Paragraph</span>
          <textarea
            rows={2}
            value={page.feature.body || ""}
            onChange={(e) => updateFeature({ body: e.target.value })}
          />
        </label>

        <div className="ia-field">
          <span>Highlight Bullets (Edit / Swap / Add / Delete)</span>
          <div className="ia-list" style={{ marginBottom: "8px" }}>
            {(page.feature.highlights || []).map((hl, idx) => (
              <div key={hl.id} className="ia-list-row">
                <input
                  type="text"
                  className="ia-cms-input"
                  style={{ flex: 1 }}
                  value={hl.text}
                  onChange={(e) => {
                    const updated = [...page.feature.highlights];
                    updated[idx] = { ...hl, text: e.target.value };
                    updateFeature({ highlights: updated });
                  }}
                />
                <button
                  type="button"
                  className="ia-btn-swap"
                  disabled={idx === 0}
                  onClick={() =>
                    updateFeature({ highlights: swapItems(page.feature.highlights, idx, idx - 1) })
                  }
                  title="Swap Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="ia-btn-swap"
                  disabled={idx === page.feature.highlights.length - 1}
                  onClick={() =>
                    updateFeature({ highlights: swapItems(page.feature.highlights, idx, idx + 1) })
                  }
                  title="Swap Down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="ia-btn-danger"
                  onClick={() =>
                    updateFeature({
                      highlights: page.feature.highlights.filter((item) => item.id !== hl.id),
                    })
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="ia-inline-form" style={{ marginBottom: 0 }}>
            <input
              type="text"
              placeholder="Add new highlight bullet..."
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
            />
            <button
              type="button"
              className="ia-btn-primary"
              onClick={() => {
                if (!newHighlight.trim()) return;
                updateFeature({
                  highlights: [
                    ...(page.feature.highlights || []),
                    { id: `hl-${Date.now()}`, text: newHighlight.trim() },
                  ],
                });
                setNewHighlight("");
              }}
            >
              + Add Bullet
            </button>
          </div>
        </div>
      </div>

      {/* 3. CONTENT SECTIONS & CARDS */}
      <div className="ia-cms-section">
        <div className="ia-cms-section-head">
          <h3>3. Content Sections &amp; Cards (Add / Edit / Delete / Swap Any Section or Card)</h3>
        </div>

        {(page.bands || []).map((band, bIdx) => (
          <div key={band.id} className="ia-cms-band">
            <div className="ia-cms-band-head">
              <input
                type="text"
                className="ia-cms-band-title-input"
                placeholder="Section Heading"
                value={band.title}
                onChange={(e) => {
                  const nextBands = [...page.bands];
                  nextBands[bIdx] = { ...band, title: e.target.value };
                  onChangePage({ ...page, bands: nextBands });
                }}
              />
              <div className="ia-cms-actions">
                <button
                  type="button"
                  className="ia-btn-secondary"
                  onClick={() => {
                    const nextBands = [...page.bands];
                    nextBands[bIdx] = { ...band, greyBg: !band.greyBg };
                    onChangePage({ ...page, bands: nextBands });
                  }}
                >
                  Bg: {band.greyBg ? "Grey" : "White"}
                </button>
                <button
                  type="button"
                  className="ia-btn-swap"
                  disabled={bIdx === 0}
                  onClick={() =>
                    onChangePage({ ...page, bands: swapItems(page.bands, bIdx, bIdx - 1) })
                  }
                  title="Swap Section Up"
                >
                  ↑ Section
                </button>
                <button
                  type="button"
                  className="ia-btn-swap"
                  disabled={bIdx === page.bands.length - 1}
                  onClick={() =>
                    onChangePage({ ...page, bands: swapItems(page.bands, bIdx, bIdx + 1) })
                  }
                  title="Swap Section Down"
                >
                  ↓ Section
                </button>
                <button
                  type="button"
                  className="ia-btn-danger"
                  onClick={() =>
                    onChangePage({
                      ...page,
                      bands: page.bands.filter((b) => b.id !== band.id),
                    })
                  }
                >
                  Delete Section
                </button>
              </div>
            </div>

            {/* Cards inside this band */}
            <div className="ia-cms-cards-grid">
              {(band.cards || []).map((card, cIdx) => {
                const updateCard = (patch) => {
                  const nextBands = [...page.bands];
                  const nextCards = [...band.cards];
                  nextCards[cIdx] = { ...card, ...patch };
                  nextBands[bIdx] = { ...band, cards: nextCards };
                  onChangePage({ ...page, bands: nextBands });
                };

                return (
                  <div key={card.id} className="ia-cms-card">
                    <div className="ia-cms-card-head">
                      <span className="ia-cms-card-num">Card #{cIdx + 1}</span>
                      <div className="ia-cms-actions">
                        <button
                          type="button"
                          className="ia-btn-swap"
                          disabled={cIdx === 0}
                          onClick={() => {
                            const nextBands = [...page.bands];
                            nextBands[bIdx] = {
                              ...band,
                              cards: swapItems(band.cards, cIdx, cIdx - 1),
                            };
                            onChangePage({ ...page, bands: nextBands });
                          }}
                          title="Swap Card Left / Up"
                        >
                          ← Swap
                        </button>
                        <button
                          type="button"
                          className="ia-btn-swap"
                          disabled={cIdx === band.cards.length - 1}
                          onClick={() => {
                            const nextBands = [...page.bands];
                            nextBands[bIdx] = {
                              ...band,
                              cards: swapItems(band.cards, cIdx, cIdx + 1),
                            };
                            onChangePage({ ...page, bands: nextBands });
                          }}
                          title="Swap Card Right / Down"
                        >
                          Swap →
                        </button>
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() => {
                            const nextBands = [...page.bands];
                            nextBands[bIdx] = {
                              ...band,
                              cards: band.cards.filter((item) => item.id !== card.id),
                            };
                            onChangePage({ ...page, bands: nextBands });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="ia-cms-row-2">
                      <label className="ia-cms-mini-label">
                        <span>Badge</span>
                        <input
                          type="text"
                          className="ia-cms-input"
                          placeholder="e.g. Semesters 1–4"
                          value={card.badge || ""}
                          onChange={(e) => updateCard({ badge: e.target.value })}
                        />
                      </label>
                      <label className="ia-cms-mini-label">
                        <span>Anchor ID (optional)</span>
                        <input
                          type="text"
                          className="ia-cms-input"
                          placeholder="e.g. bios, foss"
                          value={card.domId || ""}
                          onChange={(e) => updateCard({ domId: e.target.value })}
                        />
                      </label>
                    </div>

                    <label className="ia-cms-mini-label">
                      <span>Card Title</span>
                      <input
                        type="text"
                        className="ia-cms-input"
                        placeholder="Card Title"
                        value={card.title || ""}
                        onChange={(e) => updateCard({ title: e.target.value })}
                      />
                    </label>

                    <label className="ia-cms-mini-label">
                      <span>Card Description</span>
                      <textarea
                        rows={3}
                        className="ia-cms-textarea"
                        placeholder="Card Body Text"
                        value={card.body || ""}
                        onChange={(e) => updateCard({ body: e.target.value })}
                      />
                    </label>

                    <div className="ia-cms-row-2">
                      <label className="ia-cms-mini-label">
                        <span>Link Label (optional)</span>
                        <input
                          type="text"
                          className="ia-cms-input"
                          placeholder="e.g. Visit team bi0s →"
                          value={card.linkLabel || ""}
                          onChange={(e) => updateCard({ linkLabel: e.target.value })}
                        />
                      </label>
                      <label className="ia-cms-mini-label">
                        <span>Link URL (optional)</span>
                        <input
                          type="text"
                          className="ia-cms-input"
                          placeholder="e.g. https://bi0s.in/"
                          value={card.linkUrl || ""}
                          onChange={(e) => updateCard({ linkUrl: e.target.value })}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <button
                type="button"
                className="ia-btn-secondary"
                onClick={() => {
                  const nextBands = [...page.bands];
                  nextBands[bIdx] = {
                    ...band,
                    cards: [
                      ...(band.cards || []),
                      {
                        id: `card-${Date.now()}`,
                        domId: "",
                        badge: "New",
                        title: "New Card Title",
                        body: "Enter card description here.",
                        linkLabel: "",
                        linkUrl: "",
                      },
                    ],
                  };
                  onChangePage({ ...page, bands: nextBands });
                }}
              >
                + Add Card to Section
              </button>
            </div>
          </div>
        ))}

        <div className="ia-inline-form" style={{ marginBottom: 0 }}>
          <input
            type="text"
            placeholder="New Section Title (e.g. Placements & Internships)"
            value={newBandTitle}
            onChange={(e) => setNewBandTitle(e.target.value)}
          />
          <button
            type="button"
            className="ia-btn-primary"
            onClick={() => {
              if (!newBandTitle.trim()) return;
              onChangePage({
                ...page,
                bands: [
                  ...(page.bands || []),
                  {
                    id: `band-${Date.now()}`,
                    title: newBandTitle.trim(),
                    greyBg: (page.bands?.length || 0) % 2 === 1,
                    cards: [
                      {
                        id: `card-${Date.now()}`,
                        domId: "",
                        badge: "Overview",
                        title: "Card Title",
                        body: "Describe this section here.",
                        linkLabel: "",
                        linkUrl: "",
                      },
                    ],
                  },
                ],
              });
              setNewBandTitle("");
            }}
          >
            + Add New Section
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          className="ia-btn-primary"
          onClick={() => onSavePage(page, `${page.breadcrumbLabel} changes saved!`)}
        >
          Save All Changes to {page.breadcrumbLabel}
        </button>
      </div>
    </div>
  );
}
