import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialNews = [
  {
    date: '30 Jul 2026',
    title: 'Amrita Vishwa Vidyapeetham Reveals How AI is Industrialising Online Scams After Interviews with Insiders and Trafficking Survivors',
    excerpt: 'Groundbreaking research from Amrita reveals the systematic use of AI in orchestrating large-scale online scams and exploitation networks, based on first-hand accounts from insiders and survivors.',
    tag: 'Research',
    icon: '🔬',
  },
  {
    date: '28 Jul 2026',
    title: "Amrita Vishwa Vidyapeetham Researchers Win Best Paper Award at ACL 2026 Workshop for Study on Generative AI's Moral Advice",
    excerpt: "Amrita researchers were recognized at the prestigious ACL 2026 Workshop for their innovative study examining how generative AI systems provide moral guidance and the ethical implications therein.",
    tag: 'Achievement',
    icon: '🏆',
  },
  {
    date: '20 May 2026',
    title: 'Campus to the United Nations: amFOSS Student Surendran Selected for UNECE Open Source Assignment',
    excerpt: 'In a remarkable achievement, Amrita student Surendran from the amFOSS community has been selected to contribute to a United Nations Economic Commission for Europe open-source initiative.',
    tag: 'Students',
    icon: '🌍',
  },
  {
    date: '14 Dec 2025',
    title: 'AI Safety Conclave at Amrita Releases White Paper on Ethical and Safe AI for the Global South',
    excerpt: 'The AI Safety Conclave held at Amrita produced a landmark white paper outlining frameworks for ethical and safe AI development tailored for India and the Global South.',
    tag: 'Events',
    icon: '📋',
  },
  {
    date: '09 Jul 2024',
    title: 'Announcement of Phase III of Student Induction Programme for B.Tech. Batch',
    excerpt: "The Center announces the commencement of Phase III of its comprehensive Student Induction Programme for the new B.Tech. batch, designed to acquaint students with the Center's research and culture.",
    tag: 'Academics',
    icon: '🎓',
  },
];

const initialProjects = [
  {
    title: 'TRACK-LLM: Transparency, Risk Assessment, Context & Knowledge for Large Language Models',
    description: 'Researching transparency frameworks, risk assessment methodologies, and contextual reliability in Large Language Models. This project aims to establish principled approaches to evaluating and improving LLM trustworthiness for cybersecurity applications.',
    tags: ['AI Safety', 'LLM', 'Transparency'],
    icon: '🤖',
  },
  {
    title: 'Artificial Intelligence and Online Exploitation: Investigating Romance Scams, Messaging Scams, and Recruitment Risks',
    description: 'Investigating how AI is utilized in online exploitation, syndicated romance scams, fraudulent messaging, and illicit recruitment pipelines. Research includes interviews with insiders and trafficking survivors to understand and combat AI-powered exploitation.',
    tags: ['AI Ethics', 'Online Safety', 'Cybercrime'],
    icon: '🛡️',
  },
  {
    title: 'Threat Modeling, Trust Modeling, and Development of Secure Platform in Cloud Environments',
    description: 'Developing formal trust models, hypervisor security layers (SEDO), and secure cloud platforms. The SEDO layer ensures that control over assets hosted on cloud infrastructure is returned to their rightful owners.',
    tags: ['Cloud Security', 'Trust Models', 'Hypervisor'],
    icon: '☁️',
  },
  {
    title: 'AIoTm – Secure, Scalable and Interoperable Platform for Internet of Things',
    description: 'Building a secure, scalable, and interoperable middleware and management platform for heterogeneous IoT deployments. Addresses unique device naming, secure registration, and concurrent event processing.',
    tags: ['IoT', 'Security', 'Middleware'],
    icon: '📡',
  },
  {
    title: 'Advanced Threat Collection Platforms',
    description: 'Designing threat intelligence and malware capture systems to monitor and analyze evolving cyber threats. Builds comprehensive threat databases for proactive defense and research.',
    tags: ['Threat Intelligence', 'Malware', 'Defense'],
    icon: '🔍',
  },
  {
    title: 'Amrita Big Data Framework',
    description: 'High-availability distributed parallel database and machine learning analytics engine for streaming IoT and security data. Includes auto-scalable architecture, predictive analytics, and customizable mining rule maps.',
    tags: ['Big Data', 'Analytics', 'IoT'],
    icon: '📊',
  },
  {
    title: 'Backdoor Analysis of Enterprise Applications',
    description: 'Automated vulnerability and backdoor detection across complex enterprise software stacks. Develops tools and methodologies to identify hidden backdoors and security vulnerabilities at scale.',
    tags: ['Vulnerability', 'Enterprise Security', 'Automation'],
    icon: '🔓',
  },
  {
    title: 'Healthcare Security',
    description: 'Securing connected medical devices, wearable sensors, implantable devices, and remote healthcare cloud architectures. Addresses patient safety risks from cybersecurity vulnerabilities in medical ecosystems.',
    tags: ['Healthcare', 'Medical Devices', 'Patient Safety'],
    icon: '🏥',
  },
];

const initialWhitePapers = [
  {
    title: 'Agentic AI Safety Framework for India and the Global South',
    description: 'A comprehensive policy blueprint addressing safety, ethics, and governance of Agentic AI systems — with particular focus on the unique needs and contexts of India and Global South nations. Released at the AI Safety Conclave, December 2025.',
    year: '2025',
    icon: '📋',
  },
  {
    title: 'AI Sovereignty Blueprint for India and the Global South',
    description: 'A strategic policy document outlining frameworks for AI sovereignty, data governance, indigenous AI infrastructure, and national digital self-reliance. Provides actionable recommendations for policymakers and institutions.',
    year: '2025',
    icon: '🗺️',
  },
];

async function main() {
  console.log('Seeding Amrita Cyber AI database...');

  // Seed News
  const existingNewsCount = await prisma.newsItem.count();
  if (existingNewsCount === 0) {
    for (const news of initialNews) {
      await prisma.newsItem.create({ data: news });
    }
    console.log(`Seeded ${initialNews.length} news items.`);
  }

  // Seed Projects
  const existingProjectsCount = await prisma.researchProject.count();
  if (existingProjectsCount === 0) {
    for (const project of initialProjects) {
      await prisma.researchProject.create({ data: project });
    }
    console.log(`Seeded ${initialProjects.length} research projects.`);
  }

  // Seed White Papers
  const existingWpCount = await prisma.whitePaper.count();
  if (existingWpCount === 0) {
    for (const wp of initialWhitePapers) {
      await prisma.whitePaper.create({ data: wp });
    }
    console.log(`Seeded ${initialWhitePapers.length} white papers.`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

