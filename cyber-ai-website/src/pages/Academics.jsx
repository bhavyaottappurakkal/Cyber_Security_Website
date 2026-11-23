import ProgramPageRenderer from "../components/ProgramPageRenderer";

export const DEFAULT_ACADEMICS_CONTENT = {
  hero: {
    eyebrow: "Academics · Undergraduate",
    title: "Under Graduate Programme",
    subtitle:
      "A four-year B.Tech. that blends strong computing fundamentals with research, open source, security, and a values-driven campus life.",
  },
};

export default function Academics() {
  return <ProgramPageRenderer programKey="ug" />;
}
