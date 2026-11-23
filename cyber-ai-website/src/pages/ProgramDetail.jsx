import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resolveMediaUrl } from "../utils/mediaStore";

const FALLBACK_PROGRAMS = [
  {
    id: 1,
    eyebrow: "Undergraduate",
    title: "Undergraduate Programs",
    desc: "Flexible, rigorous degree programs combining foundational theory with hands-on project experience.",
  },
  {
    id: 2,
    eyebrow: "Graduate",
    title: "Master’s & Professional Degrees",
    desc: "Specialized graduate education designed for advanced technical depth and leadership.",
  },
  {
    id: 3,
    eyebrow: "Doctoral",
    title: "Ph.D. & Research Fellowships",
    desc: "Original research alongside world-renowned faculty mentors in state-of-the-art laboratories.",
  },
];

export default function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [resolvedImg, setResolvedImg] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("adminSiteData") || "null");
      const list = saved?.academicsContent?.programs?.length
        ? saved.academicsContent.programs
        : FALLBACK_PROGRAMS;
      const menuLinks = saved?.academicsContent?.menuLinks || [];
      const foundProgram = list.find(
        (p, idx) => String(p.id) === String(id) || String(idx) === String(id)
      );
      const foundMenuLink = !foundProgram
        ? menuLinks.find((m, idx) => String(m.id) === String(id) || String(idx) === String(id))
        : null;
      const found =
        foundProgram ||
        (foundMenuLink
          ? {
              id: foundMenuLink.id,
              eyebrow: "Academics",
              title: foundMenuLink.label,
              desc: "Explore curriculum, faculty mentorship, research opportunities, and admissions details for this academic program.",
            }
          : list[0]);
      setProgram(found);
    } catch {
      setProgram(FALLBACK_PROGRAMS[0]);
    }
  }, [id]);

  useEffect(() => {
    let active = true;
    if (!program?.image) {
      setResolvedImg("");
      return;
    }
    resolveMediaUrl(program.image).then((url) => {
      if (active) setResolvedImg(url);
    });
    return () => {
      active = false;
    };
  }, [program?.image]);

  if (!program) return null;

  return (
    <div style={{ background: "#ffffff", minHeight: "70vh" }}>
      <div
        style={{
          background: "#dff0f6",
          borderBottom: "4px solid #52a9bc",
          padding: "56px 0",
        }}
      >
        <div className="container">
          <Link
            to="/#academics"
            style={{
              display: "inline-block",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#276e7d",
              marginBottom: "16px",
              textDecoration: "none",
            }}
          >
            ← Back to Academics
          </Link>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#52a9bc",
              marginBottom: "8px",
            }}
          >
            {program.eyebrow}
          </div>
          <h1 style={{ margin: "0 0 14px", color: "#0e2930" }}>{program.title}</h1>
          <p style={{ maxWidth: "700px", color: "#334047", margin: 0 }}>{program.desc}</p>
        </div>
      </div>

      <div className="container" style={{ padding: "56px 24px" }}>
        {resolvedImg && (
          <img
            src={resolvedImg}
            alt={program.title}
            style={{
              width: "100%",
              maxHeight: "420px",
              objectFit: "cover",
              marginBottom: "32px",
              borderTop: "4px solid #52a9bc",
            }}
          />
        )}
        <div
          style={{
            background: "#f4f8f9",
            padding: "32px",
            borderLeft: "4px solid #52a9bc",
          }}
        >
          <h2 style={{ margin: "0 0 12px", color: "#0e2930", fontSize: "1.5rem" }}>
            Program Overview
          </h2>
          <p style={{ margin: 0, color: "#334047", lineHeight: 1.75 }}>{program.desc}</p>
        </div>
      </div>
    </div>
  );
}

