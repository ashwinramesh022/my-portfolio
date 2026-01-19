/**
 * Chapters (Projects/Case Studies) data and utilities
 */

export interface Chapter {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  context: string;
  whatIBuilt: string;
  keyDecisions: string[];
  challenges: string[];
  outcomes: string[];
  techStack: string[];
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
}

// Chapter data stored directly in code for simplicity and type safety
// Can easily be migrated to MDX later if needed
export const chapters: Chapter[] = [
  {
    slug: "aws-ec2-graphql",
    title: "EC2 Network Interface Query System",
    subtitle: "AWS SDE Internship",
    description:
      "Designed and built a GraphQL-based proof of concept for querying EC2 network interface data, reducing payload size by 80% and achieving sub-second latency.",
    date: "2025-08",
    tags: ["backend", "graphql", "aws", "full-stack"],
    featured: true,
    context:
      "During my SDE internship at AWS on the EC2 ZIM Core Team in Arlington, VA, I worked on improving how teams query EC2 network interface data. The existing REST-based approach was inefficient, returning large payloads when clients often needed only a subset of fields.",
    whatIBuilt:
      "A GraphQL-based proof of concept that enables selective field retrieval for EC2 network interface data. The service includes a dynamic SQL query builder with optimized joins, caching strategies, and was containerized with Docker via RDE. Collaborated with the cZIM team for validation and integration.",
    keyDecisions: [
      "Chose GraphQL over REST for flexible, client-driven queries",
      "Built dynamic SQL query builder eliminating N+1 query issues",
      "Implemented caching strategies to improve database throughput by 25%",
      "Containerized the service with Docker via RDE for easy deployment",
      "Designed within AWS Coral framework for distributed microservice compatibility",
    ],
    challenges: [
      "Ensuring system reliability and maintainability at AWS scale",
      "Benchmarking resolver performance under high concurrency",
      "Integrating with existing AWS infrastructure and teams",
    ],
    outcomes: [
      "80% reduction in payload size for complex queries",
      "Sub-second latency achieved for production-scale queries",
      "Sustained 330+ requests/sec with zero data loss in benchmarks",
      "Design adopted for large-scale production integration",
    ],
    techStack: ["GraphQL", "Docker", "AWS Coral", "SQL", "Java"],
    links: {
      // AWS internal - no public links
    },
  },
  {
    slug: "nsf-vr-exponential-scaling",
    title: "VR Exponential Scaling Visualization",
    subtitle: "NSF-Funded Research Project",
    description:
      "Developing VR environments in Unity3D for a $1.4M NSF-funded project, visualizing exponential scaling concepts for Meta for Education.",
    date: "2025-06",
    tags: ["vr", "unity", "design", "research"],
    featured: true,
    context:
      "Working as a Student VR Developer at NC State University on an NSF-funded research project. The goal is to create immersive VR environments that help students understand complex mathematical concepts like exponential scaling through spatial visualization.",
    whatIBuilt:
      "VR environments in Unity3D featuring procedural generation and OpenXR framework integration. The project targets Meta Quest devices and is designed for educational deployment in partnership with Meta for Education.",
    keyDecisions: [
      "Integrated OpenXR frameworks for cross-platform VR compatibility",
      "Used procedural generation for dynamic, scalable environments",
      "Implemented performance optimizations using Unity Profiler",
      "Managed Git version control across three project branches",
    ],
    challenges: [
      "Visualizing abstract mathematical concepts in intuitive 3D space",
      "Optimizing for standalone Meta Quest performance",
      "Debugging across multiple development branches",
      "Coordinating with research team on educational requirements",
    ],
    outcomes: [
      "Contributing to $1.4M NSF-funded research project",
      "Targeting public release through Meta for Education",
      "Building foundation for educational VR experiences",
    ],
    techStack: ["Unity3D", "C#", "OpenXR", "Meta Quest SDK", "Git"],
    links: {
      // Research project - release pending
    },
  },
  {
    slug: "memory-driven-transformer",
    title: "Memory-Driven Transformer for Radiology",
    subtitle: "Medical Imaging Deep Learning",
    description:
      "Led development of a system to generate clinically consistent radiology reports using transformer architecture with relational memory and PubMed BERT integration.",
    date: "2025-04",
    tags: ["ai", "ml", "deep-learning", "python"],
    featured: true,
    context:
      "Medical imaging generates massive amounts of data that radiologists must interpret and document. This project aimed to automate the generation of clinically consistent radiology reports from medical images using state-of-the-art deep learning.",
    whatIBuilt:
      "A transformer-based system with a novel relational memory module that maintains context across image sequences. Integrated a pre-trained PubMed BERT model to identify abnormalities and generate medically accurate descriptions. Trained using AWS SageMaker's distributed capabilities.",
    keyDecisions: [
      "Introduced relational memory module for maintaining clinical context",
      "Integrated pre-trained PubMed BERT for domain-specific language understanding",
      "Leveraged AWS SageMaker for distributed training on large datasets",
      "Designed for processing larger datasets of images and reports",
    ],
    challenges: [
      "Ensuring clinical accuracy in generated reports",
      "Handling large-scale medical imaging datasets",
      "Balancing model complexity with inference speed",
    ],
    outcomes: [
      "Achieved superior performance compared to baseline models",
      "Successfully processed larger dataset of images and reports",
      "Demonstrated practical application of transformers in medical domain",
    ],
    techStack: ["Python", "PyTorch", "AWS SageMaker", "BERT", "Transformers"],
    links: {
      github: "https://github.com/ashwinramesh022/memory-transformer-radiology",
    },
  },
  {
    slug: "semiconductor-anomaly-detection",
    title: "Circuit Anomaly Detection System",
    subtitle: "Semiconductor Research Corporation",
    description:
      "Built outlier detection algorithms on 250+ datasets for analog and mixed-signal circuits, improving anomaly detection accuracy by 12%.",
    date: "2024-03",
    tags: ["ml", "python", "backend", "research"],
    featured: false,
    context:
      "Summer internship at Semiconductor Research Corporation in Chennai, funded by Texas Instruments. The project focused on improving quality assurance for analog and mixed-signal circuits through automated anomaly detection.",
    whatIBuilt:
      "Implemented multiple outlier detection algorithms including One-class SVM, K-means, and DBSCAN on 250+ datasets, each containing 100-200 features. Used clustering and predictive modeling techniques to assess performance for high-sensitivity circuits.",
    keyDecisions: [
      "Compared multiple algorithms (One-class SVM, K-means, DBSCAN) for best fit",
      "Designed feature engineering pipeline for high-dimensional circuit data",
      "Implemented clustering for pattern recognition in circuit behavior",
      "Built predictive models for performance assessment",
    ],
    challenges: [
      "Handling high-dimensional feature spaces (100-200 features per dataset)",
      "Processing 250+ diverse datasets with varying characteristics",
      "Balancing detection accuracy with false positive rates",
    ],
    outcomes: [
      "12% improvement in anomaly detection accuracy",
      "Accuracy score increased from 80% to 87%",
      "Results applied to Texas Instruments circuit quality assurance",
    ],
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    links: {
      // Internal research - no public links
    },
  },
  {
    slug: "eion-mobile-app",
    title: "Real-time Analytics Mobile App",
    subtitle: "EION Inc. Internship",
    description:
      "Developed a mobile application for Android using React and Node.js with real-time Firebase integration, improving app throughput by 12%.",
    date: "2023-09",
    tags: ["frontend", "react", "nodejs", "full-stack"],
    featured: false,
    context:
      "Software Developer Internship at EION Inc. in Chennai. The project involved building a mobile application to provide real-time analytics and data visualization for the company's platform.",
    whatIBuilt:
      "A mobile application for Android using React and Node.js, featuring real-time analytics dashboards and data synchronization. Integrated Google Firebase for real-time database management and accelerated data retrieval.",
    keyDecisions: [
      "Chose React Native for cross-platform development efficiency",
      "Implemented Firebase for real-time data synchronization",
      "Used Android Studio for platform-specific debugging",
      "Leveraged Git for streamlined version control",
    ],
    challenges: [
      "Ensuring smooth real-time data updates across devices",
      "Optimizing app performance for various Android versions",
      "Managing state consistency with real-time backend",
    ],
    outcomes: [
      "12% improvement in app throughput",
      "15% acceleration in data retrieval through Firebase integration",
      "50+ active users during beta release",
    ],
    techStack: ["React", "Node.js", "Firebase", "Android Studio", "Git"],
    links: {
      // Company internal - no public links
    },
  },
];

/**
 * Get all chapters, sorted by date (newest first)
 */
export function getAllChapters(): Chapter[] {
  return [...chapters].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get featured chapters
 */
export function getFeaturedChapters(): Chapter[] {
  return chapters
    .filter((c) => c.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a chapter by slug
 */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

/**
 * Get chapters by tag
 */
export function getChaptersByTag(tag: string): Chapter[] {
  return getAllChapters().filter((c) => c.tags.includes(tag));
}

/**
 * Get all unique tags from chapters
 */
export function getChapterTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();

  chapters.forEach((chapter) => {
    chapter.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all chapter slugs (for static generation)
 */
export function getAllChapterSlugs(): string[] {
  return chapters.map((c) => c.slug);
}

