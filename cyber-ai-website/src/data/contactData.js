import { useState, useEffect } from "react";

export const DEFAULT_CONTACT_CONTENT = {
  hiddenSections: {
    hero: false,
    contactMain: false,
    quickContacts: false,
  },
  heroLabel: "Contact Us",
  heroTitle: "Get in Touch",
  heroSubtitle:
    "Reach out for research collaboration, admissions inquiries, industry partnerships, or any other queries.",
  sectionTitle: "Contact Information",
  sectionIntro:
    "We're always open to new collaborations and conversations. Reach out to us through any of the channels below.",
  addressLines: [
    "Amrita Center for Cybersecurity Systems & Networks",
    "Amrita Vishwa Vidyapeetham, Amritapuri Campus",
    "Clappanna P.O., Kollam, Kerala – 690525, India",
  ],
  phoneNumbers: [
    "+91 (0) 476 2804517",
    "+91 (0) 476 2804531",
    "+91 (0) 476 2804518",
    "+91 (0) 476 2804525",
  ],
  emails: ["cyber@am.amrita.edu"],
  websites: [
    { id: 1, label: "cyber-ai.amrita.edu", url: "https://cyber-ai.amrita.edu" },
    { id: 2, label: "www.amrita.edu", url: "https://www.amrita.edu" },
  ],
  mapTitle: "Amritapuri Campus",
  mapSubtitle: "Clappanna P.O., Kollam, Kerala – 690525",
  mapUrl:
    "https://maps.google.com/?q=Amrita+Vishwa+Vidyapeetham+Amritapuri+Campus+Kerala",
  formHeading: "Send Us a Message",
  formIntro:
    "Fill out the form below and our team will get back to you within 2–3 business days.",
  quickContacts: [
    {
      id: 1,
      title: "Admissions",
      email: "cyber@am.amrita.edu",
      desc: "B.Tech., M.Tech., MCA, Ph.D. program admissions",
      icon: "🎓",
    },
    {
      id: 2,
      title: "Research Collaboration",
      email: "cyber@am.amrita.edu",
      desc: "Academic and industry research partnerships",
      icon: "🔬",
    },
    {
      id: 3,
      title: "Industry Relations",
      email: "cyber@am.amrita.edu",
      desc: "Placement, internship, and industry engagement",
      icon: "🏭",
    },
    {
      id: 4,
      title: "General Inquiries",
      email: "cyber@am.amrita.edu",
      desc: "General questions about the Center",
      icon: "💬",
    },
  ],
};

export function normalizeContactContent(raw) {
  if (!raw || typeof raw !== "object") return DEFAULT_CONTACT_CONTENT;
  return {
    ...DEFAULT_CONTACT_CONTENT,
    ...raw,
    hiddenSections: {
      ...DEFAULT_CONTACT_CONTENT.hiddenSections,
      ...(raw.hiddenSections || {}),
    },
    addressLines: Array.isArray(raw.addressLines)
      ? raw.addressLines
      : DEFAULT_CONTACT_CONTENT.addressLines,
    phoneNumbers: Array.isArray(raw.phoneNumbers)
      ? raw.phoneNumbers
      : DEFAULT_CONTACT_CONTENT.phoneNumbers,
    emails: Array.isArray(raw.emails)
      ? raw.emails
      : DEFAULT_CONTACT_CONTENT.emails,
    websites: Array.isArray(raw.websites)
      ? raw.websites
      : DEFAULT_CONTACT_CONTENT.websites,
    quickContacts: Array.isArray(raw.quickContacts)
      ? raw.quickContacts
      : DEFAULT_CONTACT_CONTENT.quickContacts,
  };
}

export function loadContactContent() {
  try {
    const saved = JSON.parse(localStorage.getItem("adminSiteData") || "null");
    return normalizeContactContent(saved?.contactContent);
  } catch {
    return DEFAULT_CONTACT_CONTENT;
  }
}

export function useContactContent() {
  const [contact, setContact] = useState(() => loadContactContent());

  useEffect(() => {
    const sync = () => setContact(loadContactContent());
    window.addEventListener("adminSiteDataUpdated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("adminSiteDataUpdated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return contact;
}

