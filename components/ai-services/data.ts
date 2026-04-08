import {
  TrendingUp,
  Sparkles,
  Workflow,
  Eye,
  MessageSquare,
  Lightbulb,
  Factory,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Search,
  PenTool,
  Hammer,
  Rocket,
  RotateCcw,
  BrainCircuit,
  Clock,
  Shield,
  Globe,
  Blocks,
  Fingerprint,
} from "lucide-react";

/* ── Shared constants ── */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const ACCENT = "#c98545";
export const ACCENT_BORDER = "#d79a5d";

/* ── AI Service Offerings ── */
export const aiServices = [
  {
    id: "predictive-analytics",
    icon: TrendingUp,
    title: "Predictive Analytics",
    brief: "Turn historical data into forward-looking decisions.",
    description:
      "We build models that forecast demand, detect anomalies, and surface trends before they become obvious — giving your team a decision-making edge grounded in data, not guesswork.",
    capabilities: ["Demand Forecasting", "Anomaly Detection", "Risk Scoring"],
    colorFrom: "from-blue-500/10",
    colorTo: "to-indigo-500/10",
    glowColor: "bg-blue-500/[0.04]",
    accentText: "text-blue-500",
  },
  {
    id: "generative-ai",
    icon: Sparkles,
    title: "Generative AI",
    brief: "Create content, code, and designs at machine speed.",
    description:
      "From intelligent document generation to custom LLM integrations, we help you harness generative models that produce real business output — not just novelty demos.",
    capabilities: ["Custom LLM Pipelines", "Content Generation", "Code Assistants"],
    colorFrom: "from-violet-500/10",
    colorTo: "to-purple-500/10",
    glowColor: "bg-violet-500/[0.04]",
    accentText: "text-violet-500",
  },
  {
    id: "workflow-automation",
    icon: Workflow,
    title: "Workflow Automation",
    brief: "Eliminate manual bottlenecks across your operations.",
    description:
      "We design AI-powered workflows that handle document processing, approvals, routing, and data entry — freeing your team to focus on work that actually requires human judgment.",
    capabilities: ["Document Processing", "Intelligent Routing", "Process Orchestration"],
    colorFrom: "from-emerald-500/10",
    colorTo: "to-teal-500/10",
    glowColor: "bg-emerald-500/[0.04]",
    accentText: "text-emerald-500",
  },
  {
    id: "computer-vision",
    icon: Eye,
    title: "Computer Vision",
    brief: "Extract meaning from images, video, and spatial data.",
    description:
      "Our computer vision systems handle quality inspection, object detection, scene understanding, and visual search — deployed on-premise or at the edge where latency matters.",
    capabilities: ["Quality Inspection", "Object Detection", "Visual Search"],
    colorFrom: "from-amber-500/10",
    colorTo: "to-orange-500/10",
    glowColor: "bg-amber-500/[0.04]",
    accentText: "text-amber-500",
  },
  {
    id: "nlp",
    icon: MessageSquare,
    title: "NLP & Conversational AI",
    brief: "Understand, generate, and respond to human language.",
    description:
      "We build systems that parse intent, extract entities, classify sentiment, and power multi-turn conversations — integrated into your support, sales, and internal operations.",
    capabilities: ["Intent Recognition", "Sentiment Analysis", "Conversational Agents"],
    colorFrom: "from-rose-500/10",
    colorTo: "to-pink-500/10",
    glowColor: "bg-rose-500/[0.04]",
    accentText: "text-rose-500",
  },
  {
    id: "strategy",
    icon: Lightbulb,
    title: "AI Strategy & Consulting",
    brief: "Build a roadmap that turns AI ambition into outcomes.",
    description:
      "Not every problem needs a neural network. We assess your data maturity, identify high-impact opportunities, and design an AI roadmap that delivers measurable ROI — stage by stage.",
    capabilities: ["Data Readiness Assessment", "Opportunity Mapping", "ROI Modeling"],
    colorFrom: "from-sky-500/10",
    colorTo: "to-cyan-500/10",
    glowColor: "bg-sky-500/[0.04]",
    accentText: "text-sky-500",
  },
] as const;

/* ── Use Cases ── */
export const useCases = [
  {
    id: "manufacturing",
    icon: Factory,
    industry: "Manufacturing",
    title: "Automated Defect Detection",
    problem:
      "Manual quality inspection was catching only 82% of surface defects, leading to costly recalls and customer complaints.",
    solution:
      "Deployed a computer vision pipeline that inspects every unit in real time, flagging defects with sub-millimeter accuracy.",
    metric: "37%",
    metricLabel: "reduction in defect rate",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    industry: "Healthcare",
    title: "Diagnostic Acceleration",
    problem:
      "Radiologists were overwhelmed with imaging volume, creating dangerous delays in time-sensitive diagnoses.",
    solution:
      "Built an AI triage system that pre-screens and prioritizes imaging studies, surfacing critical findings within minutes.",
    metric: "2.4x",
    metricLabel: "faster diagnostic turnaround",
  },
  {
    id: "financial",
    icon: Landmark,
    industry: "Financial Services",
    title: "Real-Time Fraud Detection",
    problem:
      "Legacy rule-based systems were generating excessive false positives while missing sophisticated fraud patterns.",
    solution:
      "Implemented an adaptive ML model that learns from transaction patterns, reducing false positives and catching new fraud vectors.",
    metric: "91%",
    metricLabel: "fraud detection accuracy",
  },
  {
    id: "retail",
    icon: ShoppingCart,
    industry: "Retail & E-Commerce",
    title: "Demand Forecasting",
    problem:
      "Inventory misalignment was driving both stockouts and overstock, eroding margins across seasonal categories.",
    solution:
      "Deployed a multi-variable forecasting model that accounts for seasonality, promotions, and external signals to optimize stock levels.",
    metric: "28%",
    metricLabel: "reduction in inventory waste",
  },
] as const;

/* ── Process Steps ── */
export const processSteps = [
  {
    number: 1,
    title: "Discovery",
    description:
      "We map your data landscape, business objectives, and technical constraints to identify where AI creates the most value.",
    icon: Search,
  },
  {
    number: 2,
    title: "Design",
    description:
      "We architect the solution — selecting models, defining data pipelines, and designing interfaces that fit your workflows.",
    icon: PenTool,
  },
  {
    number: 3,
    title: "Build",
    description:
      "Our engineers develop, train, and validate models with rigorous testing at every stage — no black boxes.",
    icon: Hammer,
  },
  {
    number: 4,
    title: "Deploy",
    description:
      "We ship to production with monitoring, rollback plans, and integration testing to ensure zero-disruption launches.",
    icon: Rocket,
  },
  {
    number: 5,
    title: "Optimize",
    description:
      "Post-launch, we continuously monitor performance, retrain models, and refine outputs based on real-world feedback.",
    icon: RotateCcw,
  },
] as const;

/* ── Differentiators ── */
export const differentiators = [
  {
    stat: "50+",
    label: "AI Models Deployed",
    description:
      "Production-grade models running across industries — not proofs of concept sitting in notebooks.",
    icon: BrainCircuit,
    span: 2,
  },
  {
    stat: "99.9%",
    label: "System Uptime",
    description:
      "Enterprise reliability backed by redundant infrastructure and real-time monitoring.",
    icon: Clock,
    span: 1,
  },
  {
    stat: "3x",
    label: "Faster Deployment",
    description:
      "Our modular architecture and pre-built pipelines cut time-to-production dramatically.",
    icon: Rocket,
    span: 1,
  },
  {
    stat: "24/7",
    label: "Active Monitoring",
    description:
      "Continuous performance tracking with automated alerts and drift detection.",
    icon: Shield,
    span: 1,
  },
  {
    stat: "12",
    label: "Industries Served",
    description:
      "Cross-sector experience means we understand the nuances of your domain.",
    icon: Globe,
    span: 1,
  },
  {
    stat: "100%",
    label: "Custom Solutions",
    description:
      "Every system is built for your specific data, workflows, and business logic — no off-the-shelf shortcuts.",
    icon: Blocks,
    span: 2,
  },
] as const;
