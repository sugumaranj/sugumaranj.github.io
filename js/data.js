const siteConfig = {
    name: "Sugumaran J",
    tagline: "BCA Student | Cybersecurity | AI/ML | Data Analysis | Full-Stack Development",
    description: "Building practical systems across cybersecurity, AI, data analysis, and web development.",
    linkedin: "https://www.linkedin.com/in/sugumaranj",
    github: "https://github.com/sugumaranj",
    email: "", 
    siteUrl: "https://sugumaranj.github.io"
};

const profileData = {
    about: {
        intro: "I am a Bachelor of Computer Applications (BCA) student with a strong interest in Cybersecurity, Python, Data Analysis, and Artificial Intelligence. I enjoy building practical projects, exploring new technologies, and continuously improving my technical and problem-solving skills through hands-on learning.",
        journey: {
            start: "My journey began with a Diploma in Horticulture, where I gained practical experience in crop cultivation and agricultural management. This foundation instilled in me a deep appreciation for solving real-world problems.",
            current: "I am now pursuing a Bachelor of Computer Applications (BCA), merging my problem-solving mindset with technology.",
            focus: "I specialize in building practical systems across cybersecurity, AI/ML, data analysis, and web development, finding innovative ways to apply technology—such as developing agricultural AI tools."
        }
    },
    highlights: [
        { label: "Positions", value: "5" },
        { label: "Projects", value: "5" },
        { label: "Certifications", value: "31" }
    ],
    skills: [
        { category: "Programming", items: ["C", "C++", "Python", "Java", "PHP", "JavaScript"] },
        { category: "Web Development", items: ["HTML", "CSS", "ASP.NET", "WordPress", "Web Application Security"] },
        { category: "Data & AI", items: ["Pandas", "NumPy", "Matplotlib", "Data Analysis", "Deep Learning", "TensorFlow Lite", "Generative AI", "Streamlit"] },
        { category: "Cybersecurity", items: ["Ethical Hacking", "Penetration Testing", "Computer Forensics", "Linux", "Log Inspection", "Troubleshooting"] },
        { category: "Databases", items: ["MySQL", "DBMS", "Oracle Application Express"] },
        { category: "Computer Science", items: ["Data Structures and Algorithms", "Object-Oriented Programming (OOP)", "Operating Systems", "Software Project Management"] },
        { category: "Agriculture / Tech", items: ["Horticulture", "Agriculture", "Crop Production", "Crop Protection", "Crop Management", "Mushroom Production", "Agricultural Tech", "Animal Husbandry"] }
    ],
    projects: [
        {
            id: "cocoaguard-ai",
            title: "CocoaGuard AI",
            subtitle: "Enterprise Agricultural Diagnostics Dashboard",
            category: "AI / ML",
            date: "May 2026 – Jun 2026",
            description: "Bridged the gap between horticulture and computer science by building an enterprise-grade AI dashboard for niche crop farming. CocoaGuard shifts agricultural tech from reactive image scanning to proactive crop protection.",
            technologies: ["Python", "Streamlit", "Google Gemini API", "TensorFlow Lite", "OpenWeather API"],
            details: [
                "Dual-Engine Architecture: Designed a fault-tolerant backend that routes image diagnostics through Google Gemini API, with an automatic failover to a local TensorFlow Lite model.",
                "Custom ML Pipeline: Trained an EfficientNetV2-B0 neural network on an imbalanced dataset to classify 6 critical crop states (Anthracnose, CSSVD, Monilia, Phytophthora, Pod Borer, Healthy).",
                "Proactive Agronomy: Integrated the OpenWeatherMap API to analyze live environmental data and trigger preemptive alerts.",
                "Multilingual Accessibility: Deployed an integrated AI chatbot translating complex methods into local languages."
            ],
            architecture: [
                "Image Input",
                "Cloud AI Analysis (Gemini API)",
                "Fallback Model (TensorFlow Lite)",
                "Diagnosis + Weather Data",
                "Multilingual Alert / Guidance"
            ],
            githubUrl: "https://lnkd.in/ggQtAZ6a",
            demoUrl: "https://lnkd.in/gsty3bjP"
        },
        {
            id: "hr-attrition",
            title: "HR Employee Attrition Analysis",
            subtitle: "Data Analytics Project",
            category: "Data",
            date: "Jun 2026",
            description: "Analyzed the IBM HR Analytics dataset using Python, Pandas, and Matplotlib to identify factors affecting employee attrition.",
            technologies: ["Python", "Pandas", "Matplotlib"],
            details: [
                "Identified an overall attrition rate of 16.1%.",
                "Discovered that overtime employees showed higher attrition.",
                "Found that Sales Representatives had the highest attrition rate.",
                "Concluded that lower salary, experience, and tenure were associated with higher employee turnover."
            ],
            githubUrl: "",
            demoUrl: ""
        },
        {
            id: "ai-workshop",
            title: "AI & Python Implementations",
            subtitle: "Learning AI by Doing",
            category: "AI / ML",
            date: "Aug 2026",
            description: "Implemented various AI concepts directly after a workshop, translating theory into hands-on code.",
            technologies: ["Python", "YOLOv8", "Computer Vision", "NLP", "Pygame"],
            details: [
                "Text translation and Text-to-Speech in English and Tamil.",
                "Object and face detection using YOLO and YOLOv8 with bounding boxes and confidence scores.",
                "Sentiment analysis using Python.",
                "Audio playback and background music integration."
            ],
            architecture: [],
            githubUrl: "https://lnkd.in/gmwrDfWb",
            demoUrl: ""
        },
        {
            id: "webvault",
            title: "WebVault",
            subtitle: "Privacy-first Chrome Extension",
            category: "Web",
            date: "Sep 2026",
            description: "A 100% local, privacy-first Chrome Extension for visual bookmarking using a side panel.",
            technologies: ["JavaScript", "HTML", "CSS", "Chrome Extensions API", "Manifest V3"],
            details: [
                "Uses Chrome's native API to take instant screenshots of active tabs.",
                "Provides a nested sub-category system (e.g., DevOps > Deploy).",
                "Implemented a clean, visual grid UI with local state management."
            ],
            githubUrl: "",
            demoUrl: ""
        },
        {
            id: "freelance-workshop",
            title: "Technical Instructor",
            subtitle: "Freelance Workshop",
            category: "Other",
            date: "Sep 2026",
            description: "Delivered a 2-day hands-on technical workshop for 50 undergraduate students.",
            technologies: ["Linux", "Git", "GitHub"],
            details: [
                "Led practical lab sessions focused on Linux terminal commands and Git version control.",
                "Guided students through local-to-remote GitHub repository deployment.",
                "Conducted real-time debugging for student environments."
            ],
            githubUrl: "",
            demoUrl: ""
        },
        {
            id: "waf-xai",
            title: "WAF-XAI",
            subtitle: "Lightweight Web Application Firewall",
            category: "Cybersecurity",
            date: "May 2025 – Jul 2025",
            description: "A lightweight web application firewall for detecting SQL Injection and XSS using a hybrid approach combining regex rules and machine learning.",
            technologies: ["Python", "FastAPI", "Streamlit", "Machine Learning", "SHAP", "Regex"],
            details: [
                "Developed a hybrid detection engine using regex rules and machine learning for robust SQLi and XSS prevention.",
                "Implemented SHAP-based explainability to provide insights into detection decisions.",
                "Built a real-time Streamlit dashboard integrated as FastAPI middleware.",
                "Tested and evaluated in a DVWA environment."
            ],
            architecture: [
                "Incoming Web Request",
                "FastAPI Middleware",
                "Hybrid Detection (Regex + ML)",
                "SHAP Explanation",
                "Streamlit Dashboard"
            ],
            githubUrl: "",
            demoUrl: ""
        }
    ],
    experience: [
        {
            title: "Technical Instructor (Freelance Workshop)",
            company: "Self-Employed",
            date: "Sep 2026",
            description: "Delivered a 2-day technical workshop for 50 undergraduate students on Linux, Git, and GitHub deployment."
        },
        {
            title: "MKU-Internship on Python for Data Analytics",
            company: "AdroIT Technologies Innovative Solutions Pvt Ltd",
            date: "Jun 2026",
            description: "Learned about NumPy, Pandas, Matplotlib, Seaborn, and other tools and technologies for data analysis."
        },
        {
            title: "Artificial Intelligence Intern",
            company: "Edunet Foundation",
            date: "May 2026 – Jun 2026",
            description: "Engineered CocoaGuard AI, an enterprise-grade agricultural diagnostics dashboard. Built a fault-tolerant Dual-Engine architecture using Google Gemini 2.5 Flash API and TensorFlow Lite. Custom-trained an EfficientNetV2-B0 model."
        },
        {
            title: "Cyber Security Intern",
            company: "Indian Institute of Information Technology Kottayam",
            date: "May 2025 – Jul 2025",
            description: "Developed WAF-XAI, a lightweight web application firewall for detecting SQL Injection and XSS using a hybrid approach. Implemented SHAP-based explainability and a real-time Streamlit dashboard."
        },
        {
            title: "Cyber Crime Investigator",
            company: "CFSS Cyber & Forensics Security Solutions",
            date: "Jul 2024",
            description: "Cyber Crime Investigator role."
        },
        {
            title: "Cyber Security Intern",
            company: "ShadowFox",
            date: "Jun 2024",
            description: "Hands-on work in Nmap reconnaissance, web directory enumeration, Wireshark traffic analysis, VeraCrypt decryption, binary analysis with PE Explorer, and Metasploit payload creation."
        }
    ],
    education: [
        {
            degree: "Bachelor of Computer Applications",
            school: "Government Arts and Science College, Veerapandi, Theni",
            date: "Jul 2024 – Jul 2027",
            status: "Currently Pursuing"
        },
        {
            degree: "Diploma in Horticulture",
            school: "Centre Of Excellence For Vegetables, Reddiyarchatram, Dindigul",
            date: "Jul 2021 – Feb 2024",
            description: "Worked collaboratively on diverse agricultural activities including vermicompost production, crop cultivation, ornamental plant propagation, and oyster mushroom production."
        }
    ],
    certifications: [
        { title: "Agentblazer Champion 2026", issuer: "Salesforce", date: "Sep 2026", url: "https://www.salesforce.com/trailblazer/sugumaranj", category: "Development" },
        { title: "Mongo DB CRUD", issuer: "MongoDB", date: "Sep 2026", url: "https://www.credly.com/badges/7f870bcf-2b4c-4c8c-ac98-262184281b8f/public_url", category: "Development" },
        { title: "Welcome to ServiceNow", issuer: "ServiceNow", date: "Sep 2026", url: "", category: "Cloud" },
        { title: "Micro-Certification - Welcome to ServiceNow (Zurich)", issuer: "ServiceNow", date: "Sep 2026", url: "", category: "Cloud" },
        { title: "ServiceNow Administration Fundamentals LabX", issuer: "ServiceNow", date: "Sep 2026", url: "", category: "Cloud" },
        { title: "ServiceNow Administration Fundamentals", issuer: "ServiceNow", date: "Aug 2026", url: "", category: "Cloud" },
        { title: "Data Analytics and Visualization using Apex", issuer: "Naan Mudhalvan", date: "May 2026", url: "", category: "Data" },
        { title: "Artificial Intelligence Fundamentals", issuer: "IBM", date: "May 2026", url: "https://www.credly.com/badges/a7e01166-3d46-4367-bd2e-bb8253f5e787/public_url", category: "AI" },
        { title: "Data Science", issuer: "Pantech ProEd Pvt Ltd", date: "Feb 2026", url: "https://my-certificates.com/certificates/69a053d7651ebea4f86fc899", category: "Data" },
        { title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate", issuer: "Oracle", date: "Feb 2026", url: "", category: "Cloud" },
        { title: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Red Team Leaders", date: "Nov 2025", url: "https://courses.redteamleaders.com/exam-completion/4c9b08b2f7476e1c", category: "Cybersecurity" },
        { title: "PHP", issuer: "HCL GUVI", date: "Nov 2025", url: "https://www.guvi.in/verify-certificate.html?id=41S78716xe6D4wPNs9&course=php", category: "Development" },
        { title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle", date: "Aug 2025", url: "", category: "AI" },
        { title: "Oracle APEX Cloud Developer Certified Professional", issuer: "Oracle", date: "Aug 2025", url: "", category: "Cloud" },
        { title: "Deloitte Australia - Cyber Job Simulation", issuer: "Forage", date: "Jun 2025", url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_Tkijmihx8g2QP7Kpx_1750781096911_completion_certificate.pdf", category: "Cybersecurity" },
        { title: "Overview of English Language Communication", issuer: "Naan Mudhalvan", date: "Jun 2025", url: "", category: "Development" },
        { title: "Front End Development - HTML", issuer: "Great Learning", date: "Nov 2024", url: "https://www.mygreatlearning.com/certificate/LEIVULJU", category: "Development" },
        { title: "Mushroom Production and Marketing Aspects", issuer: "360 Research Foundation", date: "Aug 2024", url: "https://drive.google.com/file/d/1MEj7Tmwh7_19OR9FDPGDvqZfwnBPb91u/view?usp=drivesdk", category: "Agriculture" },
        { title: "Introduction to NLP and Generative AI", issuer: "Hajee Karutha Rowther Howdia College", date: "Aug 2024", url: "", category: "AI" },
        { title: "EF SET English Certificate 47/100 (B1 Intermediate)", issuer: "EF Standard English Test (EF SET)", date: "Mar 2024", url: "https://cert.efset.org/ymhfdP", category: "Development" },
        { title: "Oyster Mushroom Farming", issuer: "ffreedom app", date: "Jan 2024", url: "https://ffaapp.page.link/518JuWmwrjNFwRzt5", category: "Agriculture" },
        { title: "Hill Horticultural Crops Training Programme", issuer: "Tamil Nadu Agricultural University", date: "Jan 2024", url: "", category: "Agriculture" },
        { title: "5 Days Agri Entrepreneurship Training", issuer: "EDII PERIYAKULAM HORTI BUSINESS INCUBATION FORUM", date: "Dec 2024", url: "", category: "Agriculture" },
        { title: "Cyber Awareness", issuer: "Cyber Security India-CSI", date: "Mar 2023", url: "https://drive.google.com/file/d/1_NcV1dv38s_RxmkoTP-jEtT9kIyFZqv6/view?usp=drivesdk", category: "Cybersecurity" },
        { title: "Introduction to Darkweb, Anonymity and Crptocurrency", issuer: "EC-Council", date: "Feb 2023", url: "https://drive.google.com/file/d/1Nq0ilv07yaPYoA16jeV3J1xQVNRULE_w/view?usp=drivesdk", category: "Cybersecurity" },
        { title: "Digital Forensics Essentials (DFE)", issuer: "EC-Council", date: "Jan 2023", url: "https://codered.eccouncil.org/certificate/7dfcaecc-adfa-42a0-aad9-ea96331a7608", category: "Cybersecurity" },
        { title: "Microsoft Certified Security, Compliance, and Identity Fundamentals (SC-900)", issuer: "Microsoft", date: "Jun 2022", url: "https://www.credly.com/badges/82992fe0-4b49-412d-9ccb-a49c7e0007de/public_url", category: "Cybersecurity" },
        { title: "Cybersecurity Personal Branding", issuer: "Cyber Life", date: "Jun 2022", url: "https://drive.google.com/file/d/1BrZ75ZLTDQNUmI00gZmnx2tE10CcDWoa/view?usp=drivesdk", category: "Cybersecurity" },
        { title: "Online Python Inplant training", issuer: "A2Z NANOSOFT", date: "Dec 2021", url: "https://drive.google.com/file/d/1NSL-3t9dbrINJKh4EM3TD8jXs6VMHL9Y/view?usp=drivesdk", category: "Development" },
        { title: "Diploma in Computer Application (DCA)", issuer: "Computer Software College", date: "Jul 2019", url: "https://drive.google.com/file/d/15Zg72-JBH8SIWQv602BU1DXB9ZoI8D6K/view?usp=drivesdk", category: "Development" }
    ],
    awards: [
        { title: "1st Place – Webpage Design Competition", date: "Mar 2026", description: "Secured first place in an Intra-department competition for designing a webpage demonstrating web design and layout skills." },
        { title: "1st Place – Poster Design Competition", date: "Mar 2026", description: "Won first place in an intra-department poster design competition." },
        { title: "2nd Place – Debugging Competition", date: "Mar 2026", description: "Achieved second place in an intra-department debugging competition focused on identifying and correcting programming errors." },
        { title: "2nd Place – Coding Competition", date: "Mar 2026", description: "Secured second place in an intra-department coding competition demonstrating programming ability and problem-solving skills. Used : C++." },
        { title: "First place in Debugging Competition", date: "Feb 2025", description: "Intra-department debugging competition." },
        { title: "Got $50 Bounty for Reporting Several Vulnerabilities", date: "Jan 2023", description: "Vulnerability research and disclosure." },
        { title: "Hall Of Fame from CodeHS", date: "Nov 2022", description: "Reported a security vulnerability to CodeHS and received Hall of fame in their website." },
        { title: "Acknowledgement from BlackBerry", date: "Oct 2022", description: "Reported a Security vulnerability to BlackBerry and received acknowledgement." },
        { title: "Got Bounty 50 US for reporting vulnerability to CoderPad", date: "Oct 2022", description: "Security vulnerability report." },
        { title: "Acknowledgement from Inflectra", date: "Apr 2022", description: "Reported Security Vulnerability to Inflectra and received acknowledgement." },
        { title: "Responsible Vulnerability Disclosure – Government Websites", date: "Feb 2022", description: "Reported multiple security vulnerabilities affecting Indian government web assets through responsible disclosure. Acknowledged by NCIIPC." },
        { title: "Hall of Fame and Received 200 euro Bounty from telekom.sk", date: "Unknown", description: "Reported Security Vulnerability to telekom.sk and received 200 euro bounty and hall of fame." }
    ]
};
