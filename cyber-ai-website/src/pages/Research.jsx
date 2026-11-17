import { useState } from "react";
import "./Research.css";

const researchAreas = [
  {
    id: 1,
    icon: "🤖",
    title: "Agentic AI & Autonomous Cyber Defense",
    shortDesc:
      "Intelligent agents for autonomous threat detection, vulnerability assessment and adaptive defense.",
    fullDesc:
      "Agentic AI systems possess the ability to perceive, reason, plan, and act autonomously in dynamic environments. Research at the Center focuses on developing intelligent agents capable of supporting cybersecurity operations through autonomous threat detection, vulnerability assessment, incident response, and adaptive defense mechanisms. The research also investigates multi-agent collaboration, trustworthy decision-making, explainable AI, and secure human-AI teaming for next-generation cyber defense systems.",
    keyAreas: [
      "Autonomous cyber defense agents",
      "Multi-agent collaboration and coordination",
      "AI-driven threat intelligence and threat hunting",
      "Explainable and trustworthy AI systems",
      "Human-AI collaborative security operations",
      "Adversarial robustness and secure AI deployment",
    ],
    color: "area-blue",
  },
  {
    id: 2,
    icon: "🦾",
    title: "Physical AI and Embodied Intelligence",
    shortDesc:
      "AI for autonomous systems, robotics, drones, and intelligent machines in complex environments.",
    fullDesc:
      "Physical AI combines artificial intelligence with intelligent machines that can perceive, understand, and interact with the physical world. Research focuses on enabling autonomous decision-making in robots, drones, autonomous vehicles, industrial systems, and smart environments through advanced perception, reasoning, and learning capabilities. Particular emphasis is placed on safety, resilience, real-time intelligence, and secure operation in complex real-world environments.",
    keyAreas: [
      "Embodied intelligence and autonomous systems",
      "AI-enabled robotics and intelligent machines",
      "Autonomous aerial and ground platforms",
      "Edge AI for real-time physical systems",
      "Human-machine interaction and collaboration",
      "Safety, resilience, and trustworthy autonomy",
    ],
    color: "area-cyan",
  },
  {
    id: 3,

    title: "AI Sovereignty and Trusted AI Infrastructure",
    shortDesc:
      "Sovereign AI platforms, federated learning, privacy-preserving AI architectures.",
    fullDesc:
      "AI Sovereignty focuses on enabling organizations and nations to develop, deploy, and govern artificial intelligence systems while maintaining control over data, models, computational resources, and digital infrastructure. Research explores secure and privacy-preserving AI architectures, sovereign foundation models, federated learning frameworks, trusted AI ecosystems, and governance mechanisms that promote transparency, accountability, and technological self-reliance.",
    keyAreas: [
      "Sovereign AI platforms and infrastructure",
      "Privacy-preserving and confidential AI",
      "Federated and distributed machine learning",
      "Indigenous foundation models and language technologies",
      "AI governance, ethics, and regulatory compliance",
      "Trusted and resilient AI ecosystems",
    ],
    color: "area-teal",
  },
  {
    id: 4,
    icon: "☁️",
    title: "Cloud-Based Soft Sensors & Hypervisor Re-Architecture",
    shortDesc:
      "Security-enabled data object (SEDO) layer for insider threat protection and tenant control.",
    fullDesc:
      "Cloud platforms currently available help providers control and manage customer virtual machines (VMs) through custom-built or existing solutions. To ensure that sensitive data hosted on the provider's infrastructure is secure against spurious internal actions (Malicious Insider Threat), we have introduced a new Security Enabled Data Object (SEDO) layer built within the hypervisor kernel. This SEDO component ensures that control over valuable assets hosted on the provider's infrastructure is passed back to their rightful owners, resolving the concern of \"Lack of Asset Control for the Cloud Tenant.\"",
    keyAreas: [
      "Security Enabled Data Object (SEDO) layer",
      "Hypervisor kernel security extensions",
      "Insider threat detection and prevention",
      "Cloud tenant asset control",
      "Virtual machine security monitoring",
      "Rogue provider detection mechanisms",
    ],
    color: "area-blue",
  },
  {
    id: 5,
    icon: "🏗️",
    title: "Scalable, Secure, and Resilient Cloud Platforms",
    shortDesc:
      "User-centric cloud with continuous monitoring and visibility for cloud users.",
    fullDesc:
      "Cloud scalability, elasticity, and security are critical features for cloud adoption. The objective of this research is the development of a user-centric cloud that provides greater control and visibility for continuous monitoring to the cloud user. Key challenges researched include stability, reliability, and encapsulation of typical complexities associated with hypervisors in the Amrita Cloud platform.",
    keyAreas: [
      "Scalable cloud infrastructure design",
      "User-centric monitoring and visibility",
      "Hypervisor complexity encapsulation",
      "High availability and reliability",
      "Cloud platform security controls",
      "Centralized control and management systems",
    ],
    color: "area-navy",
  },
  {
    id: 6,
    icon: "🤝",
    title: "Formal Models for Trust in Cloud Computing",
    shortDesc:
      "Logical and quantitative trust models for cloud provider evaluation and assurance.",
    fullDesc:
      "In a cloud computing environment, a trust model helps identify trustworthy providers for cloud hosting, assisting cloud consumers in computing the degree of trust they can place in a cloud provider. Addressing security and privacy issues in cloud computing alleviates tenant concerns and adds value to computing advancements.",
    keyAreas: [
      "Logical approach: semantic structure of trust",
      "Quantitative approach: uncertainty and trust dynamics",
      "Trust qualification and computation models",
      "Trust algorithms for cloud environments",
      "Privacy-aware provider evaluation",
      "Cloud consumer trust frameworks",
    ],
    color: "area-cyan",
  },
  {
    id: 7,
    icon: "📡",
    title: "Internet of Things (IoT) and Security",
    shortDesc:
      "Secure device identification, registration, and concurrent event processing for IoT.",
    fullDesc:
      "The Internet has evolved from a network of computer clusters to one that encompasses heterogeneous devices capable of generating and consuming data, referred to as the Internet of Things (IoT). From its initial concept supporting RFID devices, IoT has broadened its scope to include road traffic monitoring devices, building surveillance cameras, home utility-metering devices, and personal medical devices.",
    keyAreas: [
      "Unique device naming and identification",
      "Secure device registration and recognition",
      "New programming languages for concurrent IoT events",
      "IoT middleware security",
      "Lightweight cryptographic protocols",
      "IoT network intrusion detection",
    ],
    color: "area-teal",
  },
  {
    id: 8,
    icon: "🔑",
    title: "Cryptography & Boolean Functions",
    shortDesc:
      "Boolean function classification, higher-order nonlinearities, and Reed-Muller codes.",
    fullDesc:
      "Boolean functions play a crucial role in numerous cryptographic algorithms (for example, in stream ciphers), making the study of their properties vital. Our research focuses on designing algorithms for the classification of Boolean functions, particularly computing the higher-order non-linearities of Boolean functions. Investigations into list decoding algorithms for Reed-Muller codes and their applications to cryptanalysis are actively pursued.",
    keyAreas: [
      "Boolean function classification algorithms",
      "Higher-order non-linearity computation",
      "Stream cipher security analysis",
      "Reed-Muller code list decoding",
      "Cryptanalysis techniques",
      "Post-quantum cryptographic research",
    ],
    color: "area-blue",
  },
  {
    id: 9,
    icon: "🏥",
    title: "Healthcare Security",
    shortDesc:
      "Securing connected medical devices, wearables, and implantable devices for patient safety.",
    fullDesc:
      "With increasing concerns over the exploitation of security vulnerabilities in medical devices — which potentially risks human lives — the need for secure, smart, and low-cost medical devices and ecosystems has grown. This is driven by an aging population with chronic illnesses, rising healthcare costs, and mandated regulatory compliance.",
    keyAreas: [
      "Secure remote healthcare using mobile communications and cloud technologies",
      "Security of connected medical devices and systems",
      "Wearable and Implantable Medical Devices (IMD) security",
      "Privacy and security of healthcare data",
    ],
    color: "area-cyan",
  },
  {
    id: 10,
    icon: "📊",
    title: "Big Data Analytics Platform",
    shortDesc:
      "Distributed parallel database with auto-scalable ML analytics for streaming IoT data.",
    fullDesc:
      "IoT systems generate massive amounts of streaming data, demanding a Big Data platform to store and methodically analyze data for real-time reporting and instantaneous decision-supportive intelligence. Security challenges in this open platform are elevated because the environment provides a shared file system among all platform users.",
    keyAreas: [
      "Big Data platform with distributed parallel databases (auto-scalable, highly available)",
      "Predictive data analysis and auto-alert management and monitoring",
      "Multi-source data adaptors compatible with diverse IoT input devices",
      "Built-in data mining engines performing incremental and rule-based data mining",
      "Customizable mining rule maps using machine learning",
      "Parallelizing algorithms on Hadoop and Spark clusters",
    ],
    color: "area-navy",
  },
  {
    id: 11,
    icon: "🚗",
    title: "Automotive Security",
    shortDesc:
      "Secure automotive infotainment platforms for safe inter-vehicular data exchange.",
    fullDesc:
      "The objective of this research is to build a new Automotive Infotainment Platform that facilitates and secures reliable inter-vehicular data exchange. This platform includes the capability of segregating internal and external networks using a built-in security layer. The system also assists in reducing traffic congestion on Indian roads by sensing possible traffic build-ups in advance and advising drivers to take alternative routes, supported by low-cost roadside traffic monitoring systems.",
    keyAreas: [
      "Secure automotive infotainment systems",
      "Inter-vehicular communication security",
      "Internal/external network segregation",
      "Traffic monitoring and congestion reduction",
      "V2X (Vehicle-to-Everything) security protocols",
      "Automotive CAN bus security",
    ],
    color: "area-teal",
  },
  {
    id: 12,
    icon: "📈",
    title: "Security Data Visualization & Cyber-Physical Systems",
    shortDesc:
      "Visualizing security data and securing embedded cyber-physical systems.",
    keyAreas: [
      "Security data visualization tools",
      "Cyber-physical system threat modeling",
      "Embedded systems security",
      "Real-time security dashboards",
      "Anomaly detection visualization",
    ],
    color: "area-blue",
  },
  {
    id: 13,
    icon: "🎓",
    title: "Security Education",
    shortDesc:
      "Innovative approaches to cybersecurity education, training, and awareness.",
    keyAreas: [
      "Capture The Flag (CTF) competitions (InCTF)",
      "Cybersecurity curricula development",
      "Hands-on lab and simulation environments",
      "Security awareness programs",
      "Women in cybersecurity (ShaktiCon)",
    ],
    color: "area-navy",
  },
];

export default function Research() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="research-page">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">Research</span>
          <h1>Cutting-Edge Cybersecurity Research</h1>
          <p>
            13 active research focus areas spanning AI, Cloud, IoT,
            Cryptography, Healthcare, Automotive, and more.
          </p>
        </div>
      </section>

      {/* Summary Grid */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Research Focus Areas</span>
            <h2 className="section-title">Our Areas of Research</h2>
            <div className="divider"></div>
          </div>
          <div className="research-overview-grid">
            {researchAreas.map((r, i) => (
              <div key={r.id} className={`research-overview-card ${r.color}`}>
                <div className="roc-num">0{i < 9 ? i + 1 : i + 1}</div>
                <div className="roc-icon">{r.icon}</div>
                <h4>{r.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Research Areas */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">In Depth</span>
            <h2 className="section-title">Detailed Research Descriptions</h2>
            <div className="divider"></div>
          </div>
          <div className="research-accordion">
            {researchAreas.map((r) => (
              <div
                key={r.id}
                className={`ra-item ${expanded === r.id ? "open" : ""}`}
              >
                <button
                  className="ra-header"
                  onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                >
                  <div className="ra-left">
                    <span className="ra-num">
                      {String(r.id).padStart(2, "0")}
                    </span>
                    <span className="ra-icon">{r.icon}</span>
                    <div className="ra-title-wrap">
                      <h4 className="ra-title">{r.title}</h4>
                      <p className="ra-short">{r.shortDesc}</p>
                    </div>
                  </div>
                  <span className="ra-toggle">
                    {expanded === r.id ? "−" : "+"}
                  </span>
                </button>

                {expanded === r.id && (
                  <div className="ra-body">
                    {r.fullDesc && <p className="ra-desc">{r.fullDesc}</p>}
                    <div className="ra-key-areas">
                      <h5>Key Areas of Research</h5>
                      <ul>
                        {r.keyAreas.map((k, i) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
