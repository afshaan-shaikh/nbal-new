import { AppContent } from './types';

export const defaultContent: AppContent = {
  hero: {
    headline: "Architecting Future-Ready Healthcare & Medical Facilities",
    subheadline: "NB Healthcare & Hospital Consultancy delivers expert hospital planning, design architectures, and biomedical engineering excellence. We craft turnkey, high-efficiency, and fully NABH-compliant clinical systems.",
    ctaText: "Embark on Consultation",
    bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920"
  },
  services: [
    {
      id: "srv_001",
      title: "New Hospital Planning & Design",
      description: "End-to-end NABH-compliant space layout, technical architectures, and high-efficiency medical planning.",
      longDescription: "From early-stage feasibility and land zoning to the detailed drafting of clinical spaces, our team guides healthcare founders on planning state-of-the-art hospitals. We ensure that our designs conform rigidly to NABH guidelines, optimizing every square meter to secure maximum medical efficiency and supreme patient care workflows.",
      icon: "Building2",
      specs: [
        "NABH & WHO Compliant Facility Layouts",
        "Clinical Zoning and Traffic Analysis",
        "Space & Volumetric Architectural Drafts",
        "Medical Gas and Civil MEP Engineering Coordination",
        "Aesthetic Interior Designs for Healing Spaces"
      ],
      image: "https://images.unsplash.com/photo-1586773860418-d3b3da9601ee?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "srv_002",
      title: "Equipment Selection & Procurement",
      description: "Providing impartial planning, negotiation, and integration of state-of-the-art clinical devices.",
      longDescription: "Utilizing zero bias in vendor selection, we partner with hospital boards to specify high-precision imaging, diagnostics, and life-support assets. We coordinate tech specs between builders and manufacturers directly, eliminating equipment configuration gaps.",
      icon: "Stethoscope",
      specs: [
        "Unbiased Equipment Auditing & Costings",
        "Detailed Utility Mapping (MEP Compatibility)",
        "Pre-Installation Checks & Room Design Coordination",
        "Vendor Matrix Evaluation & Contract Negotiations",
        "Phased Delivery Scheduling & Setup Supervision"
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "srv_003",
      title: "Facility Expansion & Upgrades",
      description: "Expanding operating theaters, intensive care units, and clinical bed counts seamlessly.",
      longDescription: "Modernizing legacy structures demands deep integration parameters. We audit existing workflows, construct rigorous renovation models, and expand specific divisions (e.g. cardiac setups, neonatal nodes) while safeguarding non-stop hospital operations.",
      icon: "GitMerge",
      specs: [
        "Structural & Workflow Optimization Audits",
        "Operational Policy Design",
        "Retrofitting Modular Operation Theaters",
        "Biomedical System Redesign & Recovers",
        "Streamlined Integration for Clinic Extensions"
      ],
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "srv_004",
      title: "Contract Biomedical Engineering",
      description: "Continuous uptime management, calibration verification, and preventive maintenance architectures.",
      longDescription: "We supply on-demand, specialized biomedical support networks. Our contract engineers verify device calibrations, coordinate with vendors, lower repair overheads, and optimize asset longevity across entire therapeutic platforms.",
      icon: "ShieldAlert",
      specs: [
        "Preventive Maintenance Configurations",
        "Device Calibration Verification & Quality Checks",
        "Compliance Reporting for Accreditation",
        "Medical Technology Auditing",
        "Contractual Biomedical Personnel Staffing"
      ],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
    }
  ],
  projects: [
    {
      id: "proj_001",
      name: "QHT (Dr. Ankur Singhal)",
      location: "Dehradun",
      beds: "OPD & OT Wing",
      description: "Complete space planning, custom technology allocation, and equipment layout designs for multiple high-tech units.",
      spaceOptimization: "Meticulous planning of 6 state-of-the-art Outpatient Departments (OPD) and 21 highly advanced modular operation theaters.",
      equipmentConfig: "Comprehensive specifications alignment for next-generation surgical lighting, laminar airflow, and pendant support networks.",
      category: "ot_icu",
      status: "Completed",
      beforeAfterImage: {
        before: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600",
        after: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
      }
    },
    {
      id: "proj_002",
      name: "SRK Lifecare Hospital",
      location: "Andheri, Mumbai",
      beds: 75,
      description: "Design and comprehensive technical development of a pristine brand-new Cardiac setup with high-dependency suites.",
      spaceOptimization: "Space routing for a full Intensive Coronary Care Unit (ICCU) and Modular OT complexes adhering perfectly to strict NABH guidelines.",
      equipmentConfig: "Cath Lab floor plan layout integrations, cardiac telemetries, and laminar surgical ventilation controls.",
      category: "cardiac",
      status: "Ongoing"
    },
    {
      id: "proj_003",
      name: "Shri Bhagwan Mahavir Hospital",
      location: "Sumerpur, Rajasthan",
      beds: 150,
      description: "Flagship healthcare expansion executing advanced multi-departmental architectures and complex pediatric facilities.",
      spaceOptimization: "Comprehensive design of new Cardiac wings, Pediatric Intensive Care Units, and Neonatal (NICU) OT complexes.",
      equipmentConfig: "Incubator networks, high-frequency infant ventilation architectures, and clinical utility integration.",
      category: "maternity",
      status: "Completed"
    },
    {
      id: "proj_004",
      name: "Bhartiya Arogya Nidhi",
      location: "Juhu, Mumbai",
      beds: 125,
      description: "Elite planning, design configuration, and mechanical commissioning of a modern, multi-tier Cardiac wing.",
      spaceOptimization: "Structural workspace mapping supporting clinical throughput with rapid transition corridors.",
      equipmentConfig: "Cardiac bypass lung-machine utility mapping, emergency defibrillation, and monitoring consoles.",
      category: "cardiac",
      status: "Completed"
    },
    {
      id: "proj_005",
      name: "Samal Care Hospital",
      location: "Angul, Odisha",
      beds: 100,
      description: "Expansive healthcare project featuring architectural planning, space redistribution, and equipment sourcing.",
      spaceOptimization: "Strategic clinical space allocation, department traffic mapping, and full NABH compliance models.",
      equipmentConfig: "Impartial tender validation, selection criteria of 3T MRI, CT imaging grids, and major therapy consoles.",
      category: "general",
      status: "Expansion"
    },
    {
      id: "proj_006",
      name: "Naval Hospital",
      location: "Jalgaon",
      beds: 50,
      description: "Bespoke operating theater modernization program encompassing space optimization and vendor contract advisory.",
      spaceOptimization: "Complete OT complex layouts, sterile zone corridors, and surgical logistics routing.",
      equipmentConfig: "Surgical console selection, anesthetic gas delivery, and ceiling utility module alignments.",
      category: "ot_icu",
      status: "Completed"
    },
    {
      id: "proj_007",
      name: "Meditech Hospital",
      location: "Mira Road, Mumbai",
      beds: 70,
      description: "Comprehensive patient navigation layout mapping and modular service configuration aligned with NABH.",
      spaceOptimization: "Strategic department placement, ergonomic nurse station routing, and outpatient-inpatient zone splits.",
      equipmentConfig: "Standardization of laboratory automation, medical diagnostic setups, and critical ICU ventilation units.",
      category: "general",
      status: "Completed"
    },
    {
      id: "proj_008",
      name: "Astha Hospital",
      location: "Kandivili, Mumbai",
      beds: 50,
      description: "Total engineering planning and operational commissioning of the critical care and outpatient divisions.",
      spaceOptimization: "Architectural layouts for diagnostic wings and fast-tracking emergency triage facilities.",
      equipmentConfig: "Financial viability assessment of imaging suites paired with precise pre-installation technical grids.",
      category: "general",
      status: "Completed"
    },
    {
      id: "proj_009",
      name: "Suchak Hospital",
      location: "Malad, Mumbai",
      beds: 50,
      description: "Planning, design, and full technological execution of a specialized multi-purpose operating theater complex.",
      spaceOptimization: "Surgical floor spacing, high-dependency post-surgery recovery ward architectural routing.",
      equipmentConfig: "Tender evaluation, technical verification, and pre-installation of surgical pendants.",
      category: "ot_icu",
      status: "Completed"
    },
    {
      id: "proj_010",
      name: "Dr Nanda Mother and Child Hospital",
      location: "Jalgaon",
      beds: 25,
      description: "Highly specialized planning and layout development for maternity nodes and neonatal therapy rooms.",
      spaceOptimization: "Maternity triage suites, safe infant crib spacing planning conforming rigidly to NABH standards.",
      equipmentConfig: "Labor room monitoring setups, phototherapy, and warmers utility integrations.",
      category: "maternity",
      status: "Completed"
    },
    {
      id: "proj_011",
      name: "Kamat Hospital for Women",
      location: "Dombivli, Thane",
      beds: 25,
      description: "Design, procurement support, and technical commissioning of emergency maternity operating theaters.",
      spaceOptimization: "Planning sterile corridor entries, modular walls, and airtight door mechanics.",
      equipmentConfig: "Surgical illumination arrays, maternal anesthesia grids, and neonatal resuscitation units.",
      category: "maternity",
      status: "Completed"
    },
    {
      id: "proj_012",
      name: "Benz Hospital",
      location: "Santacruz, Mumbai",
      beds: 35,
      description: "Root-and-branch hospital operational audit and technological optimization drive to enhance patient intake capacity.",
      spaceOptimization: "Workflow layout reorganization designed to slash bed-turnaround latencies, boosting throughput.",
      equipmentConfig: "Full assessment of active assets, calibration verification, and drafting of maintenance policies.",
      category: "general",
      status: "Ongoing"
    },
    {
      id: "proj_013",
      name: "Sakhalkar Maternity Hospital",
      location: "Andheri, Mumbai",
      beds: 25,
      description: "Turnkey planning, workflow design, and commissioning of a clean, dedicated maternity surgical environment.",
      spaceOptimization: "Floor allocations for private recovery suites, sterile storage nodes, and reception grids.",
      equipmentConfig: "Validation of oxygen supply lines, medical gas alarms, and surgical table mechanics.",
      category: "maternity",
      status: "Completed"
    },
    {
      id: "proj_014",
      name: "Paras Hospital",
      location: "Kandivali, Mumbai",
      beds: 20,
      description: "Operation theater room structural planning, epoxy flooring engineering, and clean-air validation.",
      spaceOptimization: "Surgical pathway planning, anti-static electrostatic flooring solutions layout.",
      equipmentConfig: "Sterilization autowash system layouts, gas piping, and critical backup power configurations.",
      category: "ot_icu",
      status: "Completed"
    },
    {
      id: "proj_015",
      name: "Dr Jayesh Dabalia Aditi Hospital",
      location: "Kandivali, Mumbai",
      beds: 25,
      description: "Specialized design and equipment renovation for clinical departments requiring modern machinery upgrades.",
      spaceOptimization: "Retrofitting modern spaces into existing buildings without altering support structures.",
      equipmentConfig: "Equipment utility mapping, and on-site integration of modern digital surgical suites.",
      category: "general",
      status: "Completed"
    },
    {
      id: "proj_016",
      name: "Marve Nursing Home",
      location: "Malad, Mumbai",
      beds: 15,
      description: "Targeted theater upgrade including modern gas supplies, dynamic ventilation, and clinical monitoring setups.",
      spaceOptimization: "Spatial optimization for micro-surgical environments with limited floor dimensions.",
      equipmentConfig: "Procurement mapping for high-illumination surgical lights and anesthetic ventilator units.",
      category: "general",
      status: "Completed"
    },
    {
      id: "proj_017",
      name: "Sujay Hospital",
      location: "Juhu, Mumbai",
      beds: 50,
      description: "Detailed layout creation, equipment matrix planning, and regulatory compliance commissioning of critical surgical wards.",
      spaceOptimization: "Pre-operation, operation, and recover rooms workflow flow routing.",
      equipmentConfig: "Detailed MEP mapping for multi-port overhead consoles and electro-surgical instruments.",
      category: "ot_icu",
      status: "Completed"
    },
    {
      id: "proj_018",
      name: "Kalpatru Hospital",
      location: "Kharghar, Navi Mumbai",
      beds: 15,
      description: "Compact high-efficiency clinical design, room planning, and regulatory licensing support.",
      spaceOptimization: "High density multi-bed wards layout optimized for maximal nurse control visibility.",
      equipmentConfig: "Defibrillator bundles, patient monitors, and suction apparatus sizing.",
      category: "general",
      status: "Completed"
    },
    {
      id: "proj_019",
      name: "Hopewell Hospital",
      location: "Dombivli, Thane",
      beds: 21,
      description: "Techno-operational diagnostic of active biomedical machinery, calibration validation, and service contracts setup.",
      spaceOptimization: "Audit of space utilization mapping across outpatient diagnostic departments.",
      equipmentConfig: "Preventative maintenance strategies, calibration matrices, and safety audit reporting.",
      category: "biomedical",
      status: "Completed"
    },
    {
      id: "proj_020",
      name: "Unique Hospital",
      location: "Andheri, Mumbai",
      beds: 15,
      description: "Precision spatial and technical drafting of custom operating theaters and intensive care units.",
      spaceOptimization: "ICU bed routing, isolated negative pressure zoning planning for contagious care.",
      equipmentConfig: "Central patient telemetry panels, oxygen layouts, and syringe pump integration.",
      category: "ot_icu",
      status: "Completed"
    }
  ],
  blogs: [
    {
      id: "blog_001",
      title: "Understanding NABH Guidelines for Modern Hospital Architectures",
      excerpt: "Designing a hospital demands absolute alignment with accreditation frameworks. We break down step-by-step space zoning rules.",
      content: "Acquiring a National Accreditation Board for Hospitals & Healthcare Providers (NABH) standard is a cornerstone of corporate trust. Hospital layout planning must prevent cross-contamination by creating separate sterile corridors, utility passages, and client paths. Clean-air management (Laminar Air Flow with HEPA filters) is vital, maintaining positive pressure in operating rooms. The spacing between critical care beds should not fall below 2.5 meters to avert airborne transmissions. When configuring a facility, these guidelines must be considered early to avoid expensive reconstruction costs. At NB Healthcare & Hospital Consultancy, we translate these rigid laws into elegant architectural blueprints.",
      date: "May 10, 2026",
      author: "N. B. Consultant Team",
      readTime: "7 min read",
      category: "Compliance & Design",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "blog_002",
      title: "The Ultimate Biomedical Equipment Sourcing Framework",
      excerpt: "Sourcing modern scanners and therapeutic machinery requires strict clinical utility checks and zero brand bias.",
      content: "When procurement teams purchase key equipment like MRI or Surgical Pendants, they often focus entirely on price. However, the physical environment must match. Standard MRI systems require heavy structural shielding, specialized MEP cooling buffers, and acoustic damping. Our framework insists on pre-procurement checklists: checking power supply load limits, mapping clean-air pathways, and verifying device calibration timelines beforehand. Aligning builders with direct manufacturer designs is critical to preventing delays.",
      date: "April 18, 2026",
      author: "Biomedical Specialist Team",
      readTime: "5 min read",
      category: "Biomedical Sourcing",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "blog_003",
      title: "Minimizing Operational Downtimes in Operational OT Renovation",
      excerpt: "Expanding clinical beds or remodeling modular operating rooms should never result in shutting down clinical services.",
      content: "Upgrading operational hospitals holds unique hurdles. Renovation crews must implement physical partitions to block dust or structural vibrations from reaching active patient wards. We leverage off-site prefabricated structures when renovating modular operating theaters, assembling main structures during low-traffic periods. This preserves facility revenue while improving surgical throughput.",
      date: "March 15, 2026",
      author: "Operations Advisory Unit",
      readTime: "8 min read",
      category: "Hospital Optimisation",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200"
    }
  ],
  faqs: [
    {
      id: "faq_001",
      question: "What is your typical process for planning a brand new hospital project?",
      answer: "We start by analyzing your clinical vision, capacity targets, and budget. Our team then designs comprehensive proposals mapping out architectural zones, MEP specifications, and equipment lists.",
      category: "Hospital Setup"
    },
    {
      id: "faq_002",
      question: "How do you ensure NABH compliance during hospital design?",
      answer: "We incorporate NABH dimensional norms, sterile/non-sterile zoning rules, and clean-air positive-pressure parameters directly into our early layout drawings.",
      category: "Accreditation"
    },
    {
      id: "faq_003",
      question: "Are your equipment procurement consultations biased toward specific vendors?",
      answer: "No. We maintain total independence from manufacturers. This objective approach guarantees you receive the ideal tech specs at the absolute best negotiated rate.",
      category: "Procurement"
    },
    {
      id: "faq_004",
      question: "Do you supply physical equipment on your own or do you only advise?",
      answer: "We serve as your technical single-point-of-contact advisor. We manage the specifications, check MEP compatibility, evaluate bids, and oversee on-site commissioning.",
      category: "Technical Advisory"
    },
    {
      id: "faq_005",
      question: "How do you manage clinical expansions inside active clinical spaces?",
      answer: "We schedule work in phases during low-traffic hours and deploy physical dust barriers to avoid disrupting active patient wards.",
      category: "Renovations"
    }
  ],
  testimonials: [
    {
      id: "test_001",
      clientName: "Dr. Ankur Singhal",
      hospital: "QHT Hospital, Dehradun",
      text: "NB Healthcare led the space routing and equipment configurations for our 21 modular operating theaters. Their NABH compliance and execution precision are unmatched.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "test_002",
      clientName: "Director of Facilities",
      hospital: "SRK Lifecare Hospital, Andheri",
      text: "Adding our cardiac wing was a massive engineering hurdle. NB Consultancy integrated our architects, suppliers, and builders perfectly under one single-point-of-contact.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "test_003",
      clientName: "Dr. Sakhalkar",
      hospital: "Sakhalkar Maternity Hospital, Mumbai",
      text: "They managed our clinic extension beautifully. From hospital utility checks to neonatal unit integration, they provided highly professional, responsive support.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150"
    }
  ],
  gallery: [
    {
      id: "gal_001",
      title: "State-of-the-Art Operating Room Setup",
      category: "Operation Theatre",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
      description: "A clean modular operating hall designed with positive laminar ventilation and ceiling power pendants for QHT."
    },
    {
      id: "gal_002",
      title: "Elite Hospital Lobby & Waiting Lounge",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
      description: "Sleek, comforting reception spacing planned to maximize visitor comfort and clinical workflow speeds."
    },
    {
      id: "gal_003",
      title: "Neonatal Intensive Care Infrastructure",
      category: "NICU Setup",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
      description: "Specialized pediatric zone layouts designed for Bhagwan Mahavir Hospital with integrated utility rows."
    },
    {
      id: "gal_004",
      title: "Next-Generation Digital Diagnostics Wing",
      category: "Diagnostic Care",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
      description: "Prisinte utility mappings for advanced medical imaging devices, protecting structures from radiation leaks."
    },
    {
      id: "gal_005",
      title: "Advanced 3T MRI Suite Layout",
      category: "Diagnostic Care",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1200",
      description: "Unbiased calibration and structural shielding configuration for next-generation magnetic resonance scanners."
    },
    {
      id: "gal_006",
      title: "NABH-Compliant Sterile Recovery Unit",
      category: "Ward Layout",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200",
      description: "Advanced post-surgical wards designed with antibacterial surface materials and dedicated nurse visibility hubs."
    },
    {
      id: "gal_007",
      title: "Modular CSSD Decontamination Lab",
      category: "Sterilization",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200",
      description: "Central Sterile Supply Department configuration utilizing clean zoning protocols to secure compliance values."
    },
    {
      id: "gal_008",
      title: "Premium Patient Ward Room Architecture",
      category: "Ward Layout",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200",
      description: "Ergonomic single-patient premium suites with medical gas rails and natural light optimization to boost healing."
    },
    {
      id: "gal_009",
      title: "High-End Pediatric Development Hub",
      category: "NICU Setup",
      image: "https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&q=80&w=1200",
      description: "Warm, sensory-calming pediatric wards with child-safe mechanical devices and integrated family lounges."
    },
    {
      id: "gal_010",
      title: "Modern Cath Lab Surgical Control Zone",
      category: "Diagnostic Care",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
      description: "Real-time telemetry and surgical control interfaces mapping for active cardiac care suites."
    }
  ],
  contactInfo: {
    address: "301, Padmalaya Tower, Opp. Holy Cross School, Rambaug Lane - 4, Kalyan (W) - 421 301, Maharashtra, India",
    phone: "+91 9920046121",
    email: "nbconsultancy1979@gmail.com",
    whatsapp: "+919920046121",
    googleMapsUrl: "https://www.google.com/maps/search/Padmalaya+Tower,+Holy+Cross+School,+Rambaug+lane+4,+Kalyan"
  },
  socialLinks: {
    linkedin: "https://linkedin.com/company/nb-healthcare-hospital-consultancy",
    facebook: "https://facebook.com/nbconsultancy1979",
    instagram: "https://instagram.com/nbconsultancy",
    youtube: "https://youtube.com/@nbconsultancy",
    email: "mailto:nbconsultancy1979@gmail.com"
  }
};
