export const skillsData = [
  // Technology
  { 
    name: "react", 
    category: "Technology", 
    aliases: ["reactjs", "react.js"], 
    suggestion: "Add React experience if you have built component-based user interfaces.", 
    importanceWeight: "high", 
    learningResources: [{ title: "React Official Docs", url: "https://react.dev" }] 
  },
  { 
    name: "next.js", 
    category: "Technology", 
    aliases: ["nextjs"], 
    suggestion: "Add Next.js experience if you have worked with Server-Side Rendering (SSR) or the App Router.", 
    importanceWeight: "high", 
    learningResources: [{ title: "Next.js Learn", url: "https://nextjs.org/learn" }] 
  },
  { 
    name: "node.js", 
    category: "Technology", 
    aliases: ["nodejs", "node"], 
    suggestion: "Add Node.js experience if you have developed scalable backend services or APIs.", 
    importanceWeight: "high", 
    learningResources: [{ title: "Node.js Documentation", url: "https://nodejs.org/docs" }] 
  },
  { 
    name: "typescript", 
    category: "Technology", 
    aliases: ["ts"], 
    suggestion: "Add TypeScript experience if you have implemented type-safe code in your projects.", 
    importanceWeight: "high", 
    learningResources: [{ title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/" }] 
  },
  { 
    name: "javascript", 
    category: "Technology", 
    aliases: ["js", "es6"], 
    suggestion: "Add JavaScript experience if you have developed interactive web functionality.", 
    importanceWeight: "high", 
    learningResources: [{ title: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }] 
  },
  { 
    name: "python", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add Python experience if you have worked on data scripts, automation, or web backends.", 
    importanceWeight: "high", 
    learningResources: [{ title: "Python.org Tutorial", url: "https://docs.python.org/3/tutorial/" }] 
  },
  { 
    name: "django", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add Django experience if you have built secure, rapid-development web applications.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "Django Project", url: "https://docs.djangoproject.com/" }] 
  },
  { 
    name: "fastapi", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add FastAPI experience if you have built high-performance APIs with Python type hints.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "FastAPI Docs", url: "https://fastapi.tiangolo.com/" }] 
  },
  { 
    name: "express", 
    category: "Technology", 
    aliases: ["expressjs"], 
    suggestion: "Add Express experience if you have managed routing and middleware in Node.js apps.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "Express Guide", url: "https://expressjs.com/" }] 
  },
  { 
    name: "mongodb", 
    category: "Technology", 
    aliases: ["mongo"], 
    suggestion: "Add MongoDB experience if you have managed NoSQL databases or document-oriented data.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "MongoDB University", url: "https://university.mongodb.com/" }] 
  },
  { 
    name: "postgresql", 
    category: "Technology", 
    aliases: ["postgres"], 
    suggestion: "Add PostgreSQL experience if you have worked with relational databases and complex SQL queries.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "Postgres Tutorial", url: "https://www.postgresqltutorial.com/" }] 
  },
  { 
    name: "mysql", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add MySQL experience if you have managed structured data and relational schemas.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "MySQL Docs", url: "https://dev.mysql.com/doc/" }] 
  },
  { 
    name: "docker", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add Docker experience if you have worked with containerization and microservices.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "Docker Docs", url: "https://docs.docker.com/" }] 
  },
  { 
    name: "aws", 
    category: "Technology", 
    aliases: ["amazon web services"], 
    suggestion: "Add AWS experience if you have deployed applications using cloud infrastructure services.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "AWS Skill Builder", url: "https://explore.skillbuilder.aws/" }] 
  },
  { 
    name: "azure", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add Azure experience if you have managed cloud-based services within the Microsoft ecosystem.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/" }] 
  },
  { 
    name: "git", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add Git experience if you have used version control to manage code changes and collaboration.", 
    importanceWeight: "high", 
    learningResources: [{ title: "Pro Git Book", url: "https://git-scm.com/book/en/v2" }] 
  },
  { 
    name: "github", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add GitHub experience if you have managed repositories, Pull Requests, or CI/CD workflows.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "GitHub Skills", url: "https://skills.github.com/" }] 
  },
  { 
    name: "rest api", 
    category: "Technology", 
    aliases: ["restful api"], 
    suggestion: "Add REST API experience if you have designed or consumed web services using HTTP methods.", 
    importanceWeight: "high", 
    learningResources: [{ title: "RestfulApi.net", url: "https://restfulapi.net/" }] 
  },
  { 
    name: "graphql", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add GraphQL experience if you have used query languages to optimize data fetching in APIs.", 
    importanceWeight: "medium", 
    learningResources: [{ title: "Intro to GraphQL", url: "https://graphql.org/learn/" }] 
  },
  { 
    name: "redis", 
    category: "Technology", 
    aliases: [], 
    suggestion: "Add Redis experience if you have implemented caching or real-time data stores.", 
    importanceWeight: "low", 
    learningResources: [{ title: "Redis University", url: "https://university.redis.com/" }] 
  },

  // Finance
  { 
    name: "financial analysis", 
    category: "Finance", 
    aliases: ["budgeting", "forecasting"], 
    suggestion: "Add Financial Analysis experience if you have evaluated business performance, managed budgets, or performed trend forecasting.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "CFI - Introduction to Financial Analysis", url: "https://corporatefinanceinstitute.com/resources/knowledge/finance/financial-analysis-best-practices/" }
    ] 
  },
  { 
    name: "accounting", 
    category: "Finance", 
    aliases: [], 
    suggestion: "Add Accounting experience if you have managed general ledgers, reconciled accounts, or maintained financial records.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "AccountingCoach Free Courses", url: "https://www.accountingcoach.com/" }
    ] 
  },
  { 
    name: "bookkeeping", 
    category: "Finance", 
    aliases: [], 
    suggestion: "Add Bookkeeping experience if you have recorded daily financial transactions and maintained accurate business ledgers.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Intuit Bookkeeping Principles", url: "https://www.coursera.org/learn/intuit-bookkeeping-basics" }
    ] 
  },
  { 
    name: "quickbooks", 
    category: "Finance", 
    aliases: [], 
    suggestion: "Add QuickBooks experience if you have used the software to manage payroll, invoicing, and business accounts.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "QuickBooks Online Tutorials", url: "https://quickbooks.intuit.com/learn-support/en-us/tutorials" }
    ] 
  },
  { 
    name: "excel", 
    category: "Finance", 
    aliases: ["microsoft excel"], 
    suggestion: "Add Excel experience if you have used advanced formulas, VLOOKUPs, or Pivot Tables to organize and analyze data.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Microsoft Excel Video Training", url: "https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb" }
    ] 
  },
  { 
    name: "financial reporting", 
    category: "Finance", 
    aliases: [], 
    suggestion: "Add Financial Reporting experience if you have prepared balance sheets, P&L statements, or cash flow reports for stakeholders.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "IFRS Financial Reporting Standards", url: "https://www.ifrs.org/issued-standards/" }
    ] 
  },
  { 
    name: "auditing", 
    category: "Finance", 
    aliases: [], 
    suggestion: "Add Auditing experience if you have conducted internal or external reviews to ensure financial accuracy and compliance.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Internal Audit Standards", url: "https://www.theiia.org/en/standards/" }
    ] 
  },
  { 
    name: "tax preparation", 
    category: "Finance", 
    aliases: [], 
    suggestion: "Add Tax Preparation experience if you have calculated tax liabilities and prepared filings for individuals or corporations.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "IRS Tax Professional Resources", url: "https://www.irs.gov/tax-professionals" }
    ] 
  },

  // Marketing
  { 
    name: "seo", 
    category: "Marketing", 
    aliases: ["search engine optimization"], 
    suggestion: "Add SEO experience if you have optimized website content, managed backlinks, or improved organic search rankings.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Google SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }
    ] 
  },
  { 
    name: "content marketing", 
    category: "Marketing", 
    aliases: [], 
    suggestion: "Add Content Marketing experience if you have created and distributed valuable content to attract and engage a target audience.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "HubSpot Content Marketing Course", url: "https://academy.hubspot.com/courses/content-marketing" }
    ] 
  },
  { 
    name: "social media marketing", 
    category: "Marketing", 
    aliases: [], 
    suggestion: "Add Social Media Marketing experience if you have managed brand profiles, run ad campaigns, or engaged with communities on social platforms.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Hootsuite Social Media Training", url: "https://education.hootsuite.com/courses/social-marketing-education" }
    ] 
  },
  { 
    name: "google analytics", 
    category: "Marketing", 
    aliases: [], 
    suggestion: "Add Google Analytics experience if you have tracked website traffic, monitored user behavior, or analyzed campaign conversion rates.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/" }
    ] 
  },
  { 
    name: "email marketing", 
    category: "Marketing", 
    aliases: [], 
    suggestion: "Add Email Marketing experience if you have designed newsletters, managed subscriber lists, or automated email drip campaigns.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Mailchimp Marketing Library", url: "https://mailchimp.com/resources/" }
    ] 
  },
  { 
    name: "copywriting", 
    category: "Marketing", 
    aliases: [], 
    suggestion: "Add Copywriting experience if you have written persuasive text for advertisements, websites, or promotional materials to drive action.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Copyblogger Free Training", url: "https://copyblogger.com/blog/" }
    ] 
  },

  // Design
  { 
    name: "photoshop", 
    category: "Design", 
    aliases: ["adobe photoshop", "ps"], 
    suggestion: "Add Photoshop experience if you have performed image editing, photo manipulation, or created raster-based digital graphics.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Adobe Photoshop Tutorials", url: "https://helpx.adobe.com/photoshop/tutorials.html" }
    ] 
  },
  { 
    name: "figma", 
    category: "Design", 
    aliases: [], 
    suggestion: "Add Figma experience if you have designed collaborative UI layouts, built design systems, or created interactive prototypes.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Figma Learn - Design Essentials", url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-Design" }
    ] 
  },
  { 
    name: "illustrator", 
    category: "Design", 
    aliases: ["adobe illustrator"], 
    suggestion: "Add Illustrator experience if you have created vector graphics, logos, icons, or scalable illustrations for print and web.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Adobe Illustrator Tutorials", url: "https://helpx.adobe.com/illustrator/tutorials.html" }
    ] 
  },
  { 
    name: "ui design", 
    category: "Design", 
    aliases: ["user interface design"], 
    suggestion: "Add UI Design experience if you have designed visual elements of digital products, focusing on layout, typography, and color theory.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Google UX Design Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design" }
    ] 
  },
  { 
    name: "ux design", 
    category: "Design", 
    aliases: ["user-experience design"], 
    suggestion: "Add UX Design experience if you have conducted user research, created wireframes, or optimized user journeys and usability.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Interaction Design Foundation - UX Courses", url: "https://www.interaction-design.org/courses" }
    ] 
  },

  // Project Management
  { 
    name: "agile", 
    category: "Project Management", 
    aliases: ["kanban", "iterative development"], 
    suggestion: "Add Agile experience if you have worked in flexible, iterative cycles to deliver project milestones and adapt to changing requirements.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Agile Alliance: Agile 101", url: "https://www.agilealliance.org/agile101/" }
    ] 
  },
  { 
    name: "scrum", 
    category: "Project Management", 
    aliases: ["sprints", "daily standups"], 
    suggestion: "Add Scrum experience if you have participated in sprints, daily standups, or played the role of a Scrum Master or Product Owner.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Scrum.org: What is Scrum?", url: "https://www.scrum.org/resources/what-is-scrum" }
    ] 
  },
  { 
    name: "jira", 
    category: "Project Management", 
    aliases: ["atlassian", "confluence"], 
    suggestion: "Add Jira experience if you have used project tracking tools to manage backlogs, track issues, or monitor team velocity.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Atlassian: Jira Guide for Beginners", url: "https://www.atlassian.com/software/jira/guides/use-cases/project-management" }
    ] 
  },
  { 
    name: "leadership", 
    category: "Project Management", 
    aliases: ["team management", "mentoring"], 
    suggestion: "Add Leadership experience if you have managed teams, mentored colleagues, or taken ownership of high-level project goals.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "MindTools: Leadership Skills", url: "https://www.mindtools.com/pages/article/newLDR_41.htm" }
    ] 
  },
  { 
    name: "stakeholder management", 
    category: "Project Management", 
    aliases: ["client relations", "stakeholder engagement"], 
    suggestion: "Add Stakeholder Management experience if you have balanced the expectations of clients, executives, or other parties involved in a project.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "PMI: Stakeholder Management Guide", url: "https://www.pmi.org/learning/library/stakeholder-management-task-project-success-2568" }
    ] 
  },

  // Sales
  { 
    name: "salesforce", 
    category: "Sales", 
    aliases: ["sfdc"], 
    suggestion: "Add Salesforce experience if you have managed leads, tracked opportunities, or used the platform to generate sales reports.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Salesforce Trailhead", url: "https://trailhead.salesforce.com/" }
    ] 
  },
  { 
    name: "crm", 
    category: "Sales", 
    aliases: ["customer relationship management", "hubspot", "pipedrive"], 
    suggestion: "Add CRM experience if you have used software systems to manage customer interactions and streamline the sales pipeline.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "HubSpot Academy: CRM Setup", url: "https://academy.hubspot.com/courses/hubspot-crm-for-admins" }
    ] 
  },
  { 
    name: "negotiation", 
    category: "Sales", 
    aliases: ["contract negotiation", "deal closing"], 
    suggestion: "Add Negotiation experience if you have worked to reach mutually beneficial agreements with clients or vendors.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Harvard Program on Negotiation", url: "https://www.pon.harvard.edu/category/daily/negotiation-skills-daily/" }
    ] 
  },
  { 
    name: "lead generation", 
    category: "Sales", 
    aliases: ["prospecting", "cold outreach"], 
    suggestion: "Add Lead Generation experience if you have identified and qualified potential customers to build a sales pipeline.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Salesforce: Guide to Lead Gen", url: "https://www.salesforce.com/learning-centre/sales/lead-generation/" }
    ] 
  },

  // Customer Service
  { 
    name: "customer support", 
    category: "Customer Service", 
    aliases: ["customer success", "client support", "help desk"], 
    suggestion: "Add Customer Support experience if you have resolved user inquiries, managed support tickets, or ensured client satisfaction through direct interaction.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Zendesk Customer Service Guide", url: "https://www.zendesk.com/service/resource-center/" }
    ] 
  },
  { 
    name: "problem solving", 
    category: "Customer Service", 
    aliases: ["troubleshooting", "conflict resolution"], 
    suggestion: "Add Problem Solving experience if you have identified complex issues, developed effective solutions, and implemented improvements to prevent recurring hurdles.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "MindTools: Problem Solving Techniques", url: "https://www.mindtools.com/pages/article/newTMC_00.htm" }
    ] 
  },
  { 
    name: "communication", 
    category: "Customer Service", 
    aliases: ["verbal communication", "written communication", "active listening"], 
    suggestion: "Add Communication experience if you have clearly conveyed information to diverse audiences, practiced active listening, or managed professional correspondence.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Coursera: Improving Communication Skills", url: "https://www.coursera.org/learn/wharton-communication-skills" }
    ] 
  },

  // Data Analysis
  { 
    name: "power bi", 
    category: "Data Analysis", 
    aliases: ["microsoft power bi", "dax"], 
    suggestion: "Add Power BI experience if you have built interactive dashboards, connected to diverse data sources, or used DAX for complex data modeling.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Microsoft Power BI Guided Learning", url: "https://learn.microsoft.com/en-us/power-bi/learning-catalog/" }
    ] 
  },
  { 
    name: "tableau", 
    category: "Data Analysis", 
    aliases: ["tableau desktop", "tableau public"], 
    suggestion: "Add Tableau experience if you have created advanced visualizations, managed worksheets, or designed executive-level data stories.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Tableau Free Training Videos", url: "https://www.tableau.com/learn/training/20214" }
    ] 
  },
  { 
    name: "data visualization", 
    category: "Data Analysis", 
    aliases: ["data storytelling", "charting", "infographics"], 
    suggestion: "Add Data Visualization experience if you have translated complex datasets into clear charts, graphs, or maps to communicate insights effectively.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "Storytelling with Data Blog", url: "https://www.storytellingwithdata.com/blog" }
    ] 
  },
  { 
    name: "sql", 
    category: "Data Analysis", 
    aliases: ["structured query language", "mysql", "postgresql", "t-sql"], 
    suggestion: "Add SQL experience if you have performed data extraction, joined complex tables, or manipulated databases to retrieve specific information.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "SQLBolt Interactive Lessons", url: "https://sqlbolt.com/" }
    ] 
  },

  // Human Resources
  { 
    name: "recruitment", 
    category: "Human Resources", 
    aliases: ["hiring", "sourcing", "headhunting"], 
    suggestion: "Add Recruitment experience if you have managed job postings, screened candidates, or coordinated interview processes to fill open roles.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "LinkedIn Learning: Recruiting Foundations", url: "https://www.linkedin.com/learning/recruiting-foundations-4" }
    ] 
  },
  { 
    name: "talent acquisition", 
    category: "Human Resources", 
    aliases: ["strategic sourcing", "employer branding"], 
    suggestion: "Add Talent Acquisition experience if you have developed long-term strategies to attract, select, and onboard top-tier professionals for organizational growth.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "SHRM: Talent Acquisition Resources", url: "https://www.shrm.org/resourcesandtools/tools-and-samples/toolkits/pages/attainingtalent.aspx" }
    ] 
  },
  { 
    name: "employee relations", 
    category: "Human Resources", 
    aliases: ["conflict management", "hr compliance", "workplace culture"], 
    suggestion: "Add Employee Relations experience if you have managed workplace disputes, handled performance reviews, or worked to maintain a positive and compliant office environment.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "HR University: Employee Relations Guide", url: "https://hruniversity.org/blog/employee-relations/" }
    ] 
  },

  // Operations
  { 
    name: "inventory management", 
    category: "Operations", 
    aliases: ["stock control", "warehousing", "demand planning"], 
    suggestion: "Add Inventory Management experience if you have tracked stock levels, managed supplier orders, or optimized warehouse storage and auditing processes.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "CIPS: Inventory Management Overview", url: "https://www.cips.org/knowledge/procurement-topics-and-skills/operations-management/inventory-management/" }
    ] 
  },
  { 
    name: "supply chain", 
    category: "Operations", 
    aliases: ["procurement", "supply chain management", "scm"], 
    suggestion: "Add Supply Chain experience if you have managed the flow of goods and services, from raw materials to final product delivery to the customer.", 
    importanceWeight: "high", 
    learningResources: [
      { title: "MIT OpenCourseWare: Supply Chain Fundamentals", url: "https://ocw.mit.edu/courses/ctl-sc0x-supply-chain-analytics-autumn-2017/" }
    ] 
  },
  { 
    name: "logistics", 
    category: "Operations", 
    aliases: ["distribution", "transportation management", "fleet management"], 
    suggestion: "Add Logistics experience if you have coordinated the transportation, shipping, and delivery of resources or products to ensure timely arrival.", 
    importanceWeight: "medium", 
    learningResources: [
      { title: "Logistics Bureau: Beginner's Guide", url: "https://www.logisticsbureau.com/logistics-management/" }
    ] 
  }
];