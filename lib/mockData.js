// PNX-inspired catalog records for Ira's Library
// Each record mirrors the structure of a Primo Normalized XML record

const catalogRecords = [
  {
    id: "iras_lib_001",
    pnx: {
      display: {
        title: "Introduction to Algorithms",
        creator: ["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"],
        publisher: "MIT Press",
        date: "2022",
        edition: "4th edition",
        format: "Book",
        language: "English",
        description: "A comprehensive textbook covering a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study. The algorithms are described in English and in a pseudocode designed to be readable by anyone who has done a little programming.",
        subject: ["Algorithms", "Computer Science", "Data Structures", "Computational Complexity", "Programming"],
        identifier: { isbn: "978-0262046305", oclc: "1264706508" },
        pages: "1312 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2022",
        topic: ["Algorithms", "Computer Science", "Data Structures"],
        creator: ["Cormen, Thomas H.", "Leiserson, Charles E."],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 3rd Floor", callNumber: "QA76.6 .C662 2022", status: "Available", copies: 3, available: 2 },
          { library: "Science Library", location: "Reserve", callNumber: "QA76.6 .C662 2022", status: "Available", copies: 1, available: 1 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via ProQuest", coverage: "Full text" },
        ],
      },
      relations: {
        previousEdition: "Introduction to Algorithms, 3rd edition (2009)",
      },
    },
  },
  {
    id: "iras_lib_002",
    pnx: {
      display: {
        title: "The Gene: An Intimate History",
        creator: ["Siddhartha Mukherjee"],
        publisher: "Scribner",
        date: "2016",
        format: "Book",
        language: "English",
        description: "Mukherjee exposes the gene as the most powerful and dangerous idea in the history of science. He weaves science, social history, and personal narrative to tell the story of one of the most important conceptual breakthroughs of modern times.",
        subject: ["Genetics", "History of Science", "Molecular Biology", "Heredity", "DNA"],
        identifier: { isbn: "978-1476733524", oclc: "920462382" },
        pages: "608 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2016",
        topic: ["Genetics", "History of Science", "Molecular Biology"],
        creator: ["Mukherjee, Siddhartha"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 2nd Floor", callNumber: "QH430 .M85 2016", status: "Checked Out", copies: 2, available: 0, dueDate: "2026-03-25" },
        ],
        electronicLinks: [],
      },
    },
  },
  {
    id: "iras_lib_003",
    pnx: {
      display: {
        title: "Deep Learning for Natural Language Processing: A Comprehensive Survey",
        creator: ["Yoav Goldberg", "Graeme Hirst"],
        publisher: "Association for Computational Linguistics",
        date: "2023",
        format: "Journal Article",
        language: "English",
        description: "This survey covers the latest advances in deep learning methods applied to NLP tasks including text classification, sentiment analysis, machine translation, question answering, and text generation. Special focus is given to transformer architectures and large language models.",
        subject: ["Natural Language Processing", "Deep Learning", "Artificial Intelligence", "Machine Learning", "Transformers"],
        identifier: { doi: "10.1162/tacl_a_00623", issn: "2307-387X" },
        pages: "pp. 1-45",
        source: "Transactions of the Association for Computational Linguistics, Vol. 11",
      },
      facets: {
        resourceType: "Article",
        language: "English",
        creationDate: "2023",
        topic: ["Natural Language Processing", "Deep Learning", "Artificial Intelligence"],
        creator: ["Goldberg, Yoav"],
      },
      delivery: {
        holdings: [],
        electronicLinks: [
          { url: "#", label: "Full Text via TACL", coverage: "Full text" },
          { url: "#", label: "PDF via Institutional Access", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_004",
    pnx: {
      display: {
        title: "Sapiens: A Brief History of Humankind",
        creator: ["Yuval Noah Harari"],
        publisher: "Harper Perennial",
        date: "2015",
        format: "Book",
        language: "English",
        description: "100,000 years ago, at least six species of humans inhabited Earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance? Harari spans the whole of human history, from the very first humans to walk the earth to the radical breakthroughs of the Cognitive, Agricultural and Scientific Revolutions.",
        subject: ["World History", "Anthropology", "Human Evolution", "Civilization", "Culture"],
        identifier: { isbn: "978-0062316110", oclc: "890467882" },
        pages: "464 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2015",
        topic: ["World History", "Anthropology", "Human Evolution"],
        creator: ["Harari, Yuval Noah"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 1st Floor", callNumber: "CB113 .H37 2015", status: "Available", copies: 4, available: 3 },
          { library: "Branch Library - West", location: "General Collection", callNumber: "CB113 .H37 2015", status: "Available", copies: 1, available: 1 },
        ],
        electronicLinks: [
          { url: "#", label: "Audiobook via OverDrive", coverage: "Full audio" },
        ],
      },
    },
  },
  {
    id: "iras_lib_005",
    pnx: {
      display: {
        title: "CRISPR-Cas9 Gene Editing: Progress and Challenges",
        creator: ["Jennifer A. Doudna", "Samuel H. Sternberg"],
        publisher: "Nature Publishing Group",
        date: "2023",
        format: "Journal Article",
        language: "English",
        description: "Review article examining the current state of CRISPR-Cas9 gene editing technology, including recent clinical trials, delivery mechanisms, off-target effects, and ethical considerations for germline editing applications.",
        subject: ["CRISPR", "Gene Editing", "Molecular Biology", "Biotechnology", "Genetics"],
        identifier: { doi: "10.1038/s41586-023-05812-9", issn: "0028-0836" },
        pages: "pp. 234-248",
        source: "Nature, Vol. 614",
      },
      facets: {
        resourceType: "Article",
        language: "English",
        creationDate: "2023",
        topic: ["CRISPR", "Gene Editing", "Molecular Biology"],
        creator: ["Doudna, Jennifer A."],
      },
      delivery: {
        holdings: [],
        electronicLinks: [
          { url: "#", label: "Full Text via Nature", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_006",
    pnx: {
      display: {
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        creator: ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
        publisher: "Addison-Wesley Professional",
        date: "1994",
        edition: "1st edition",
        format: "Book",
        language: "English",
        description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. These 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs.",
        subject: ["Software Engineering", "Design Patterns", "Object-Oriented Programming", "Computer Science"],
        identifier: { isbn: "978-0201633610", oclc: "31171684" },
        pages: "416 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "1994",
        topic: ["Software Engineering", "Design Patterns", "Object-Oriented Programming"],
        creator: ["Gamma, Erich"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 3rd Floor", callNumber: "QA76.64 .D47 1994", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via Safari Online", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_007",
    pnx: {
      display: {
        title: "El laberinto de la soledad",
        creator: ["Octavio Paz"],
        publisher: "Fondo de Cultura Económica",
        date: "1950",
        format: "Book",
        language: "Spanish",
        description: "A collection of nine essays exploring Mexican identity, culture, and history. Paz examines the Mexican character through the lens of mythology, history, and psychoanalysis, creating a profound meditation on Mexican society and its relationship to modernity.",
        subject: ["Mexican Literature", "Cultural Studies", "Identity", "Latin American Studies", "Philosophy"],
        identifier: { isbn: "978-9681603113", oclc: "1175957" },
        pages: "352 pages",
      },
      facets: {
        resourceType: "Book",
        language: "Spanish",
        creationDate: "1950",
        topic: ["Mexican Literature", "Cultural Studies", "Latin American Studies"],
        creator: ["Paz, Octavio"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "World Languages Collection", callNumber: "F1210 .P39 1950", status: "Available", copies: 1, available: 1 },
        ],
        electronicLinks: [],
      },
    },
  },
  {
    id: "iras_lib_008",
    pnx: {
      display: {
        title: "Quantum Computing: An Applied Approach",
        creator: ["Jack D. Hidary"],
        publisher: "Springer",
        date: "2021",
        edition: "2nd edition",
        format: "Book",
        language: "English",
        description: "This book integrates the foundations of quantum computing with a hands-on coding approach. Starting with the basics of qubits, quantum gates, and quantum circuits, it progresses to advanced topics including quantum error correction, quantum machine learning, and quantum chemistry simulations.",
        subject: ["Quantum Computing", "Physics", "Computer Science", "Quantum Mechanics", "Quantum Algorithms"],
        identifier: { isbn: "978-3030832735", oclc: "1268407365" },
        pages: "582 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2021",
        topic: ["Quantum Computing", "Physics", "Computer Science"],
        creator: ["Hidary, Jack D."],
      },
      delivery: {
        holdings: [
          { library: "Science Library", location: "New Acquisitions", callNumber: "QA76.889 .H53 2021", status: "Available", copies: 2, available: 1 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via SpringerLink", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_009",
    pnx: {
      display: {
        title: "Climate Change 2023: Synthesis Report",
        creator: ["Intergovernmental Panel on Climate Change"],
        publisher: "IPCC",
        date: "2023",
        format: "Government Document",
        language: "English",
        description: "The Synthesis Report integrates the findings of the three Working Group contributions to the Sixth Assessment Report. It covers current understanding of climate change, its widespread impacts and risks, and climate change mitigation and adaptation strategies.",
        subject: ["Climate Change", "Environmental Science", "Global Warming", "Sustainability", "Policy"],
        identifier: { doi: "10.59327/IPCC/AR6-9789291691647" },
        pages: "184 pages",
      },
      facets: {
        resourceType: "Government Document",
        language: "English",
        creationDate: "2023",
        topic: ["Climate Change", "Environmental Science", "Sustainability"],
        creator: ["IPCC"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Reference", callNumber: "QC903 .I58 2023", status: "In Library Use Only", copies: 1, available: 1 },
        ],
        electronicLinks: [
          { url: "#", label: "Full Text (Open Access)", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_010",
    pnx: {
      display: {
        title: "Principles of Economics",
        creator: ["N. Gregory Mankiw"],
        publisher: "Cengage Learning",
        date: "2020",
        edition: "9th edition",
        format: "Book",
        language: "English",
        description: "The most popular introductory economics textbook, featuring a clear and accessible writing style. Covers both microeconomics and macroeconomics with real-world examples and case studies that bring economic principles to life.",
        subject: ["Economics", "Microeconomics", "Macroeconomics", "Business", "Social Sciences"],
        identifier: { isbn: "978-0357038314", oclc: "1099688238" },
        pages: "864 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2020",
        topic: ["Economics", "Microeconomics", "Macroeconomics"],
        creator: ["Mankiw, N. Gregory"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Course Reserves", callNumber: "HB171.5 .M36 2020", status: "Available", copies: 5, available: 2 },
          { library: "Branch Library - East", location: "Stacks", callNumber: "HB171.5 .M36 2020", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via Cengage Unlimited", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_011",
    pnx: {
      display: {
        title: "Die Verwandlung",
        creator: ["Franz Kafka"],
        publisher: "Kurt Wolff Verlag",
        date: "1915",
        format: "Book",
        language: "German",
        description: "Die Geschichte von Gregor Samsa, der eines Morgens als ungeheueres Ungeziefer erwacht. Kafkas Meisterwerk der Weltliteratur untersucht Themen wie Entfremdung, Schuld und die Absurdität des modernen Lebens.",
        subject: ["German Literature", "Fiction", "Modernism", "Existentialism", "World Literature"],
        identifier: { isbn: "978-3150099001", oclc: "2577680" },
        pages: "96 pages",
      },
      facets: {
        resourceType: "Book",
        language: "German",
        creationDate: "1915",
        topic: ["German Literature", "Fiction", "Modernism"],
        creator: ["Kafka, Franz"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "World Languages Collection", callNumber: "PT2621.A26 V4 1915", status: "Available", copies: 1, available: 1 },
          { library: "Main Library", location: "Rare Books", callNumber: "PT2621.A26 V4 1915 (rare)", status: "In Library Use Only", copies: 1, available: 1 },
        ],
        electronicLinks: [
          { url: "#", label: "Full Text (Project Gutenberg)", coverage: "Full text - Open Access" },
        ],
      },
    },
  },
  {
    id: "iras_lib_012",
    pnx: {
      display: {
        title: "Machine Learning: A Probabilistic Perspective",
        creator: ["Kevin P. Murphy"],
        publisher: "MIT Press",
        date: "2012",
        format: "Book",
        language: "English",
        description: "A comprehensive introduction to machine learning that uses probabilistic models and decision theory. Covers supervised and unsupervised learning, graphical models, kernel methods, deep learning, and reinforcement learning.",
        subject: ["Machine Learning", "Artificial Intelligence", "Statistics", "Computer Science", "Probability"],
        identifier: { isbn: "978-0262018029", oclc: "795857956" },
        pages: "1104 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2012",
        topic: ["Machine Learning", "Artificial Intelligence", "Statistics"],
        creator: ["Murphy, Kevin P."],
      },
      delivery: {
        holdings: [
          { library: "Science Library", location: "Stacks", callNumber: "Q325.5 .M87 2012", status: "Available", copies: 3, available: 1 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via MIT Press Direct", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_013",
    pnx: {
      display: {
        title: "The Structure of Scientific Revolutions",
        creator: ["Thomas S. Kuhn"],
        publisher: "University of Chicago Press",
        date: "1962",
        edition: "50th Anniversary Edition (2012)",
        format: "Book",
        language: "English",
        description: "Kuhn's groundbreaking work challenges the prevailing view of scientific progress as a steady accumulation of knowledge. He introduces the concept of 'paradigm shifts' and argues that science progresses through revolutionary changes in the dominant framework of assumptions.",
        subject: ["Philosophy of Science", "History of Science", "Scientific Methodology", "Paradigm Theory"],
        identifier: { isbn: "978-0226458120", oclc: "768164764" },
        pages: "264 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "1962",
        topic: ["Philosophy of Science", "History of Science", "Scientific Methodology"],
        creator: ["Kuhn, Thomas S."],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 2nd Floor", callNumber: "Q175 .K95 2012", status: "Available", copies: 3, available: 3 },
        ],
        electronicLinks: [],
      },
    },
  },
  {
    id: "iras_lib_014",
    pnx: {
      display: {
        title: "Attention Is All You Need",
        creator: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Łukasz Kaiser", "Illia Polosukhin"],
        publisher: "Neural Information Processing Systems Foundation",
        date: "2017",
        format: "Conference Paper",
        language: "English",
        description: "This seminal paper introduces the Transformer architecture, based entirely on attention mechanisms, dispensing with recurrence and convolutions entirely. The model achieves superior performance on machine translation tasks and has since become the foundation for virtually all modern large language models.",
        subject: ["Deep Learning", "Natural Language Processing", "Transformers", "Neural Networks", "Attention Mechanisms"],
        identifier: { arxiv: "1706.03762" },
        pages: "pp. 5998-6008",
        source: "Advances in Neural Information Processing Systems 30 (NeurIPS 2017)",
      },
      facets: {
        resourceType: "Conference Paper",
        language: "English",
        creationDate: "2017",
        topic: ["Deep Learning", "Natural Language Processing", "Neural Networks"],
        creator: ["Vaswani, Ashish"],
      },
      delivery: {
        holdings: [],
        electronicLinks: [
          { url: "#", label: "Full Text via NeurIPS Proceedings", coverage: "Full text" },
          { url: "#", label: "arXiv Preprint", coverage: "Full text - Open Access" },
        ],
      },
    },
  },
  {
    id: "iras_lib_015",
    pnx: {
      display: {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        creator: ["Robert C. Martin"],
        publisher: "Prentice Hall",
        date: "2008",
        format: "Book",
        language: "English",
        description: "A handbook of agile software craftsmanship presenting principles, patterns, and practices of writing clean code. Features case studies of increasing complexity, demonstrating how to transform messy code into clean, efficient, and maintainable solutions.",
        subject: ["Software Engineering", "Programming", "Agile Development", "Code Quality", "Computer Science"],
        identifier: { isbn: "978-0132350884", oclc: "212921508" },
        pages: "464 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2008",
        topic: ["Software Engineering", "Programming", "Agile Development"],
        creator: ["Martin, Robert C."],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 3rd Floor", callNumber: "QA76.76.D47 M37 2008", status: "Available", copies: 2, available: 1 },
          { library: "Science Library", location: "General Collection", callNumber: "QA76.76.D47 M37 2008", status: "Checked Out", copies: 1, available: 0, dueDate: "2026-04-01" },
        ],
        electronicLinks: [],
      },
    },
  },
  {
    id: "iras_lib_016",
    pnx: {
      display: {
        title: "Les Misérables",
        creator: ["Victor Hugo"],
        publisher: "A. Lacroix, Verboeckhoven & Cie",
        date: "1862",
        format: "Book",
        language: "French",
        description: "Le chef-d'œuvre de Victor Hugo suit le destin de Jean Valjean, ancien forçat, dans la France du XIXe siècle. Roman épique explorant la justice, la rédemption, la révolution et l'amour à travers les vies de personnages inoubliables.",
        subject: ["French Literature", "Fiction", "19th Century", "Social Justice", "World Literature"],
        identifier: { isbn: "978-2070409228", oclc: "41238361" },
        pages: "1900 pages",
      },
      facets: {
        resourceType: "Book",
        language: "French",
        creationDate: "1862",
        topic: ["French Literature", "Fiction", "Social Justice"],
        creator: ["Hugo, Victor"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "World Languages Collection", callNumber: "PQ2286 .A1 1862", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [
          { url: "#", label: "Full Text (Project Gutenberg)", coverage: "Full text - Open Access" },
        ],
      },
    },
  },
  {
    id: "iras_lib_017",
    pnx: {
      display: {
        title: "The Pragmatic Programmer: Your Journey to Mastery",
        creator: ["David Thomas", "Andrew Hunt"],
        publisher: "Addison-Wesley Professional",
        date: "2019",
        edition: "20th Anniversary Edition",
        format: "Book",
        language: "English",
        description: "The updated classic that examines the core process of software development — taking a requirement and producing working, maintainable code. Covers topics from personal responsibility and career development to architectural techniques for keeping code flexible and easy to adapt.",
        subject: ["Software Engineering", "Programming", "Professional Development", "Computer Science"],
        identifier: { isbn: "978-0135957059", oclc: "1119393438" },
        pages: "352 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2019",
        topic: ["Software Engineering", "Programming", "Professional Development"],
        creator: ["Thomas, David", "Hunt, Andrew"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 3rd Floor", callNumber: "QA76.6 .T465 2019", status: "Available", copies: 3, available: 3 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via O'Reilly", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_018",
    pnx: {
      display: {
        title: "A Brief History of Time",
        creator: ["Stephen Hawking"],
        publisher: "Bantam Books",
        date: "1988",
        format: "Book",
        language: "English",
        description: "Stephen Hawking's landmark work explores the nature of time, the Big Bang, black holes, and the search for a unified theory of physics. Written for non-specialist readers, the book has become one of the most popular science books ever published.",
        subject: ["Cosmology", "Physics", "Astrophysics", "Time", "Black Holes"],
        identifier: { isbn: "978-0553380163", oclc: "17638040" },
        pages: "256 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "1988",
        topic: ["Cosmology", "Physics", "Astrophysics"],
        creator: ["Hawking, Stephen"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 2nd Floor", callNumber: "QB981 .H377 1988", status: "Available", copies: 4, available: 4 },
          { library: "Branch Library - West", location: "General Collection", callNumber: "QB981 .H377 1988", status: "Available", copies: 1, available: 1 },
        ],
        electronicLinks: [],
      },
    },
  },
  {
    id: "iras_lib_019",
    pnx: {
      display: {
        title: "Artificial Intelligence in Healthcare: Anticipating Challenges to Ethics, Privacy, and Bias",
        creator: ["Adam Bohr", "Kaveh Memarzadeh"],
        publisher: "Elsevier Academic Press",
        date: "2020",
        format: "Book",
        language: "English",
        description: "An overview of the current state and future potential of AI in healthcare, covering diagnosis, treatment planning, drug discovery, and administrative applications. Addresses the critical ethical, privacy, and bias considerations that must be navigated.",
        subject: ["Artificial Intelligence", "Healthcare", "Medical Informatics", "Ethics", "Digital Health"],
        identifier: { isbn: "978-0128184387", oclc: "1153289605" },
        pages: "364 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2020",
        topic: ["Artificial Intelligence", "Healthcare", "Medical Informatics"],
        creator: ["Bohr, Adam"],
      },
      delivery: {
        holdings: [
          { library: "Health Sciences Library", location: "New Acquisitions", callNumber: "R859.7.A78 A78 2020", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via ScienceDirect", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_020",
    pnx: {
      display: {
        title: "The Art of War",
        creator: ["Sun Tzu"],
        publisher: "Various",
        date: "-500",
        format: "Book",
        language: "Chinese",
        description: "An ancient Chinese military treatise dating from the 5th century BC. Attributed to the ancient Chinese military strategist Sun Tzu, it has had a tremendous influence on military strategy, business tactics, legal strategy, and beyond. Considered one of the most important texts on strategy ever written.",
        subject: ["Military Strategy", "Chinese Philosophy", "Ancient History", "Leadership", "Strategy"],
        identifier: { isbn: "978-1590302255", oclc: "56832658" },
        pages: "273 pages",
      },
      facets: {
        resourceType: "Book",
        language: "Chinese",
        creationDate: "-500",
        topic: ["Military Strategy", "Chinese Philosophy", "Leadership"],
        creator: ["Sun Tzu"],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Special Collections", callNumber: "U101 .S95", status: "In Library Use Only", copies: 1, available: 1 },
          { library: "Main Library", location: "Stacks - 1st Floor", callNumber: "U101 .S95 2003", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [
          { url: "#", label: "Full Text (Project Gutenberg)", coverage: "Full text - Open Access" },
          { url: "#", label: "Audiobook via LibriVox", coverage: "Full audio - Open Access" },
        ],
      },
    },
  },
  {
    id: "iras_lib_021",
    pnx: {
      display: {
        title: "Database Systems: The Complete Book",
        creator: ["Hector Garcia-Molina", "Jeffrey D. Ullman", "Jennifer Widom"],
        publisher: "Pearson",
        date: "2008",
        edition: "2nd edition",
        format: "Book",
        language: "English",
        description: "A comprehensive and authoritative textbook covering all aspects of database systems including relational databases, SQL, query optimization, transaction management, distributed databases, and data warehousing.",
        subject: ["Database Systems", "Computer Science", "SQL", "Data Management", "Information Systems"],
        identifier: { isbn: "978-0131873254", oclc: "181360653" },
        pages: "1152 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2008",
        topic: ["Database Systems", "Computer Science", "Data Management"],
        creator: ["Garcia-Molina, Hector"],
      },
      delivery: {
        holdings: [
          { library: "Science Library", location: "Stacks", callNumber: "QA76.9.D3 G37 2008", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [],
      },
    },
  },
  {
    id: "iras_lib_022",
    pnx: {
      display: {
        title: "Impact of Social Media on Academic Performance: A Meta-Analysis",
        creator: ["Maria Santos", "David Chen", "Sarah Okonkwo"],
        publisher: "Elsevier",
        date: "2024",
        format: "Journal Article",
        language: "English",
        description: "A comprehensive meta-analysis of 147 studies examining the relationship between social media usage and academic performance among undergraduate students. Findings indicate complex, non-linear relationships moderated by usage type and discipline.",
        subject: ["Social Media", "Education", "Academic Performance", "Meta-Analysis", "Higher Education"],
        identifier: { doi: "10.1016/j.compedu.2024.104892", issn: "0360-1315" },
        pages: "pp. 1-22",
        source: "Computers & Education, Vol. 210",
      },
      facets: {
        resourceType: "Article",
        language: "English",
        creationDate: "2024",
        topic: ["Social Media", "Education", "Higher Education"],
        creator: ["Santos, Maria"],
      },
      delivery: {
        holdings: [],
        electronicLinks: [
          { url: "#", label: "Full Text via ScienceDirect", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_023",
    pnx: {
      display: {
        title: "Organic Chemistry",
        creator: ["Jonathan Clayden", "Nick Greeves", "Stuart Warren"],
        publisher: "Oxford University Press",
        date: "2012",
        edition: "2nd edition",
        format: "Book",
        language: "English",
        description: "A comprehensive textbook that provides a thorough treatment of organic chemistry with an emphasis on understanding reaction mechanisms. Features 3D visualizations, real-world applications, and connections to biochemistry and medicine.",
        subject: ["Organic Chemistry", "Chemistry", "Biochemistry", "Science"],
        identifier: { isbn: "978-0199270293", oclc: "773034285" },
        pages: "1264 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2012",
        topic: ["Organic Chemistry", "Chemistry", "Science"],
        creator: ["Clayden, Jonathan"],
      },
      delivery: {
        holdings: [
          { library: "Science Library", location: "Course Reserves", callNumber: "QD251.3 .C533 2012", status: "Available", copies: 6, available: 3 },
          { library: "Science Library", location: "Stacks", callNumber: "QD251.3 .C533 2012", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [],
      },
    },
  },
  {
    id: "iras_lib_024",
    pnx: {
      display: {
        title: "Digital Humanities: Knowledge and Critique in a Digital Age",
        creator: ["David M. Berry", "Anders Fagerjord"],
        publisher: "Polity Press",
        date: "2017",
        format: "Book",
        language: "English",
        description: "An accessible introduction to the digital humanities examining how computational approaches are transforming research in the humanities. Covers text analysis, data visualization, digital archives, and critical perspectives on technology in humanistic inquiry.",
        subject: ["Digital Humanities", "Humanities", "Technology", "Research Methods", "Cultural Studies"],
        identifier: { isbn: "978-0745697659", oclc: "972445780" },
        pages: "220 pages",
      },
      facets: {
        resourceType: "Book",
        language: "English",
        creationDate: "2017",
        topic: ["Digital Humanities", "Technology", "Research Methods"],
        creator: ["Berry, David M."],
      },
      delivery: {
        holdings: [
          { library: "Main Library", location: "Stacks - 2nd Floor", callNumber: "AZ105 .B47 2017", status: "Available", copies: 2, available: 2 },
        ],
        electronicLinks: [
          { url: "#", label: "eBook via EBSCO", coverage: "Full text" },
        ],
      },
    },
  },
  {
    id: "iras_lib_025",
    pnx: {
      display: {
        title: "Restructuring Academic Libraries: Organizational Development in the Age of AI",
        creator: ["Ira Kugelman"],
        publisher: "Association of Research Libraries",
        date: "2025",
        format: "Journal Article",
        language: "English",
        description: "This article examines the organizational restructuring challenges facing academic libraries as they integrate artificial intelligence tools into discovery services, reference, and collection development. Proposes a framework for managing change while preserving core library values.",
        subject: ["Library Science", "Academic Libraries", "Artificial Intelligence", "Organizational Development", "Information Science"],
        identifier: { doi: "10.14288/arl.2025.0042", issn: "1050-6098" },
        pages: "pp. 112-138",
        source: "Journal of Academic Librarianship, Vol. 51, No. 2",
      },
      facets: {
        resourceType: "Article",
        language: "English",
        creationDate: "2025",
        topic: ["Library Science", "Academic Libraries", "Artificial Intelligence"],
        creator: ["Kugelman, Ira"],
      },
      delivery: {
        holdings: [],
        electronicLinks: [
          { url: "#", label: "Full Text via EBSCO", coverage: "Full text" },
          { url: "#", label: "Author's preprint", coverage: "Full text - Open Access" },
        ],
      },
    },
  },
];

export default catalogRecords;
