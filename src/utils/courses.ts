export interface CourseData {
  id: string;
  title: string;
  desc: string;
  fullDesc: string;
  image: string | null;
  icon: string;
  age: string;
  duration: string;
  sessions: string;
  price: string;
  color: string;
  borderColor: string;
  tag: string;
  gradientBg: boolean;
  highlights: string[];
  curriculum: { day: string; title: string; topics: string[] }[];
  outcomes: string[];
  requirements: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getCourses(): CourseData[] {
  return JSON.parse(localStorage.getItem('clap_courses') || '[]');
}

export function saveCourses(courses: CourseData[]) {
  localStorage.setItem('clap_courses', JSON.stringify(courses));
}

export function addCourse(course: Omit<CourseData, 'id' | 'createdAt' | 'updatedAt'>): CourseData {
  const courses = getCourses();
  const now = new Date().toISOString();
  const newCourse: CourseData = {
    ...course,
    id: `CRS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    createdAt: now,
    updatedAt: now,
  };
  courses.push(newCourse);
  saveCourses(courses);
  return newCourse;
}

export function updateCourse(id: string, updates: Partial<CourseData>): CourseData | null {
  const courses = getCourses();
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return null;
  courses[index] = { ...courses[index], ...updates, updatedAt: new Date().toISOString() };
  saveCourses(courses);
  return courses[index];
}

export function deleteCourse(id: string): boolean {
  const courses = getCourses();
  const filtered = courses.filter(c => c.id !== id);
  if (filtered.length === courses.length) return false;
  saveCourses(filtered);
  return true;
}

export const COLOR_OPTIONS = [
  { value: 'from-violet-500 to-blue-500', label: 'Violet → Blue', border: 'border-violet-500/25', preview: 'bg-gradient-to-r from-violet-500 to-blue-500' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink → Rose', border: 'border-pink-500/25', preview: 'bg-gradient-to-r from-pink-500 to-rose-500' },
  { value: 'from-blue-500 to-indigo-500', label: 'Blue → Indigo', border: 'border-blue-500/25', preview: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
  { value: 'from-emerald-500 to-teal-500', label: 'Emerald → Teal', border: 'border-emerald-500/25', preview: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
  { value: 'from-amber-500 to-orange-500', label: 'Amber → Orange', border: 'border-amber-500/25', preview: 'bg-gradient-to-r from-amber-500 to-orange-500' },
  { value: 'from-green-500 to-emerald-500', label: 'Green → Emerald', border: 'border-green-500/25', preview: 'bg-gradient-to-r from-green-500 to-emerald-500' },
  { value: 'from-fuchsia-500 to-pink-500', label: 'Fuchsia → Pink', border: 'border-fuchsia-500/25', preview: 'bg-gradient-to-r from-fuchsia-500 to-pink-500' },
  { value: 'from-cyan-500 to-blue-500', label: 'Cyan → Blue', border: 'border-cyan-500/25', preview: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
  { value: 'from-red-500 to-rose-500', label: 'Red → Rose', border: 'border-red-500/25', preview: 'bg-gradient-to-r from-red-500 to-rose-500' },
  { value: 'from-yellow-500 to-amber-500', label: 'Yellow → Amber', border: 'border-yellow-500/25', preview: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
];

export const PRESET_IMAGES = [
  { value: '/images/course-webdev.png', label: 'Web Development' },
  { value: '/images/course-canva.png', label: 'Canva Design' },
  { value: '/images/course-french.png', label: 'French Language' },
  { value: '/images/course-ai.png', label: 'AI & Machine Learning' },
  { value: '/images/course-scratch.png', label: 'Scratch Coding' },
  { value: '/images/course-python.png', label: 'Python Programming' },
  { value: '', label: 'No image (use emoji)' },
];

export const EMOJI_OPTIONS = ['💻', '🎨', '🇫🇷', '🤖', '🎮', '🐍', '🖌️', '🧮', '📚', '🎵', '🌍', '🔬', '📐', '🎭', '🚀', '💡', '⭐', '🔤', '🏗️', '🧩'];

export function getEmptyCourse(): Omit<CourseData, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    title: '', desc: '', fullDesc: '', image: null, icon: '📚',
    age: '', duration: '', sessions: '', price: '',
    color: 'from-violet-500 to-blue-500', borderColor: 'border-violet-500/25',
    tag: '', gradientBg: false,
    highlights: ['', '', '', ''],
    curriculum: [
      { day: 'Day 1', title: '', topics: ['', '', '', ''] },
      { day: 'Day 2', title: '', topics: ['', '', '', ''] },
    ],
    outcomes: ['', '', '', ''],
    requirements: ['', '', ''],
    active: true,
  };
}

// ==================== SEED DEFAULT COURSES ====================
function createDefaultCourses(): CourseData[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'CRS-DEF-001', title: 'Web Development for Kids', desc: 'Children learn to build their own websites using HTML, CSS & JavaScript — real coding skills made fun and accessible.',
      fullDesc: 'This hands-on course teaches children how to build real websites from scratch. Using beginner-friendly tools, kids will learn HTML to structure pages, CSS to style them beautifully, and basic JavaScript to add interactivity. By the end of the course, every child will have a live website they built themselves — a portfolio piece they can proudly share with family and friends.',
      image: '/images/course-webdev.png', icon: '💻', age: 'Ages 7–16', duration: '3 Days', sessions: '6 sessions (2hrs each)', price: '£75',
      color: 'from-violet-500 to-blue-500', borderColor: 'border-violet-500/25', tag: '💻 Most Popular', gradientBg: false, active: true, createdAt: now, updatedAt: now,
      highlights: ['Build a real website', 'Learn HTML, CSS & JS basics', 'No experience needed', 'Take home a live site'],
      curriculum: [
        { day: 'Day 1', title: 'Getting Started with HTML', topics: ['What is a website?', 'Your first HTML page', 'Headings, paragraphs & images', 'Links and lists'] },
        { day: 'Day 2', title: 'Styling with CSS', topics: ['Adding colours and fonts', 'Backgrounds and borders', 'Layout basics with flexbox', 'Making it look amazing'] },
        { day: 'Day 3', title: 'Interactivity & Publishing', topics: ['Introduction to JavaScript', 'Adding buttons and alerts', 'Simple animations', 'Publishing your website live'] },
      ],
      outcomes: ['A published personal website', 'Understanding of web fundamentals', 'Confidence to continue coding', 'Certificate of completion'],
      requirements: ['A laptop or computer with internet', 'No prior coding experience needed', 'Curiosity and enthusiasm!'],
    },
    {
      id: 'CRS-DEF-002', title: 'Canva Design for Kids', desc: 'Kids explore graphic design by creating posters, cards, and social media graphics using Canva — unleashing their inner artist.',
      fullDesc: 'This creative course introduces children to the world of digital design using Canva — a fun, drag-and-drop design platform. Kids will learn about colours, typography, layout and composition while creating real projects like posters, greeting cards, presentation slides and social media graphics.',
      image: '/images/course-canva.png', icon: '🎨', age: 'Ages 6–14', duration: '2 Days', sessions: '4 sessions (2hrs each)', price: '£60',
      color: 'from-pink-500 to-rose-500', borderColor: 'border-pink-500/25', tag: '🎨 Creative', gradientBg: false, active: true, createdAt: now, updatedAt: now,
      highlights: ['Create real design projects', 'Learn design principles', 'Use Canva confidently', 'Build a creative portfolio'],
      curriculum: [
        { day: 'Day 1', title: 'Design Basics & Canva Fundamentals', topics: ['Introduction to Canva', 'Understanding colours and fonts', 'Working with shapes and images', 'Create your first poster'] },
        { day: 'Day 2', title: 'Creative Projects & Portfolio', topics: ['Designing greeting cards', 'Creating presentation slides', 'Social media graphics', 'Building your design portfolio'] },
      ],
      outcomes: ['A digital design portfolio', 'Understanding of design principles', 'Canva proficiency', 'Certificate of completion'],
      requirements: ['A laptop or tablet with internet', 'No design experience needed', 'A love for creativity!'],
    },
    {
      id: 'CRS-DEF-003', title: 'French Language for Kids', desc: 'A fun, interactive introduction to French — children learn greetings, colours, numbers and everyday phrases through games and songs.',
      fullDesc: 'Bonjour! This immersive French course makes language learning exciting for children. Through interactive games, songs, stories and role-play, kids will learn everyday French vocabulary and phrases. The course covers greetings, colours, numbers, animals, food, family members and basic conversation.',
      image: '/images/course-french.png', icon: '🇫🇷', age: 'Ages 5–12', duration: '4 Days', sessions: '8 sessions (1.5hrs each)', price: '£80',
      color: 'from-blue-500 to-indigo-500', borderColor: 'border-blue-500/25', tag: '🇫🇷 Language', gradientBg: false, active: true, createdAt: now, updatedAt: now,
      highlights: ['Learn French through play', 'Native speaker methods', 'Songs, games & stories', 'Everyday conversation skills'],
      curriculum: [
        { day: 'Day 1', title: 'Bonjour! Greetings & Introductions', topics: ['Saying hello and goodbye', 'My name is… How are you?', 'Numbers 1–20', 'French songs and rhymes'] },
        { day: 'Day 2', title: 'Colours, Animals & the World', topics: ['Colours in French', 'Animal names and sounds', 'Days of the week', 'Weather expressions'] },
        { day: 'Day 3', title: 'Food, Family & Daily Life', topics: ['French food vocabulary', 'Family members', 'Likes and dislikes', 'Simple sentences'] },
        { day: 'Day 4', title: 'Conversations & Celebration', topics: ['Ordering food in French', 'Asking and answering questions', 'Role-play activities', 'French culture & celebration'] },
      ],
      outcomes: ['200+ French vocabulary words', 'Basic conversation ability', 'Cultural awareness', 'Certificate of completion'],
      requirements: ['A laptop or computer with internet', 'No French experience needed', 'A willingness to have fun!'],
    },
    {
      id: 'CRS-DEF-004', title: 'AI & Machine Learning', desc: 'Kids discover how AI works through hands-on experiments — training models, creating AI art and understanding smart technology.',
      fullDesc: 'This fascinating course demystifies Artificial Intelligence for young minds. Children will learn how AI works through fun, hands-on experiments — training machine learning models, creating AI-generated art, understanding how voice assistants work, and exploring the ethics of AI.',
      image: '/images/course-ai.png', icon: '🤖', age: 'Ages 8–16', duration: '3 Days', sessions: '6 sessions (2hrs each)', price: '£75',
      color: 'from-emerald-500 to-teal-500', borderColor: 'border-emerald-500/25', tag: '🤖 STEM', gradientBg: false, active: true, createdAt: now, updatedAt: now,
      highlights: ['Train a real AI model', 'Create AI-generated art', 'Understand how AI thinks', 'Explore AI ethics & safety'],
      curriculum: [
        { day: 'Day 1', title: 'What is AI? How Machines Learn', topics: ['What is Artificial Intelligence?', 'How machines learn from data', 'Training vs inference', 'AI in everyday life'] },
        { day: 'Day 2', title: 'Hands-On AI Experiments', topics: ['Training an image classifier', 'Creating AI-generated art', 'Natural language processing', 'Building a simple chatbot'] },
        { day: 'Day 3', title: 'AI Safety & Future Skills', topics: ['Spotting AI mistakes', 'Deepfakes and misinformation', 'AI ethics for kids', 'Your future with AI'] },
      ],
      outcomes: ['Understanding of AI fundamentals', 'Hands-on ML experience', 'AI safety awareness', 'Certificate of completion'],
      requirements: ['A laptop or computer with internet', 'No AI experience needed', 'Curiosity about technology!'],
    },
    {
      id: 'CRS-DEF-005', title: 'Scratch Coding & Games', desc: 'Children build their own interactive games and animations using Scratch — a visual coding platform designed just for young learners.',
      fullDesc: 'Scratch is the world\'s most popular coding platform for kids, and this course teaches children how to use it to create their own games, animations and interactive stories. Using colourful drag-and-drop code blocks, kids learn programming concepts like loops, conditions, variables and events.',
      image: '/images/course-scratch.png', icon: '🎮', age: 'Ages 5–12', duration: '3 Days', sessions: '6 sessions (2hrs each)', price: '£60',
      color: 'from-amber-500 to-orange-500', borderColor: 'border-amber-500/25', tag: '🎮 Fun', gradientBg: false, active: true, createdAt: now, updatedAt: now,
      highlights: ['Build your own games', 'Visual drag-and-drop coding', 'No reading required', 'Share projects online'],
      curriculum: [
        { day: 'Day 1', title: 'Your First Scratch Project', topics: ['Introduction to Scratch', 'Sprites, backdrops and sounds', 'Moving and animating characters', 'Create a simple animation'] },
        { day: 'Day 2', title: 'Building Interactive Games', topics: ['Loops and conditions', 'Scoring and variables', 'Collision detection', 'Build a catching game'] },
        { day: 'Day 3', title: 'Advanced Projects & Sharing', topics: ['Creating a platformer game', 'Adding levels and power-ups', 'Sharing your project online', 'Game design showcase'] },
      ],
      outcomes: ['2-3 completed games', 'Understanding of coding logic', 'Problem-solving skills', 'Certificate of completion'],
      requirements: ['A laptop or computer with internet', 'No coding experience needed', 'Imagination and creativity!'],
    },
    {
      id: 'CRS-DEF-006', title: 'Python Programming', desc: 'A beginner-friendly introduction to Python — kids write real code, solve puzzles, and build mini projects while learning core logic.',
      fullDesc: 'Python is one of the world\'s most popular programming languages, and this course makes it accessible for young learners. Children will write real Python code from day one — solving puzzles, building calculators, creating text-based games and automating simple tasks.',
      image: '/images/course-python.png', icon: '🐍', age: 'Ages 9–16', duration: '4 Days', sessions: '8 sessions (2hrs each)', price: '£80',
      color: 'from-green-500 to-emerald-500', borderColor: 'border-green-500/25', tag: '🐍 Coding', gradientBg: false, active: true, createdAt: now, updatedAt: now,
      highlights: ['Write real Python code', 'Build mini projects', 'Learn programming logic', 'Industry-standard language'],
      curriculum: [
        { day: 'Day 1', title: 'Python Basics & First Programs', topics: ['What is Python?', 'Variables and data types', 'Print statements and input', 'Build a simple calculator'] },
        { day: 'Day 2', title: 'Logic & Decision Making', topics: ['If/else statements', 'Loops (for and while)', 'Building a number guessing game', 'Creating patterns with code'] },
        { day: 'Day 3', title: 'Functions & Data Structures', topics: ['Writing functions', 'Lists and dictionaries', 'Working with text', 'Build a quiz program'] },
        { day: 'Day 4', title: 'Final Project & Beyond', topics: ['Text-based adventure game', 'Turtle graphics art', 'Debugging techniques', 'Next steps in Python'] },
      ],
      outcomes: ['Multiple Python projects', 'Core programming concepts', 'Logical thinking skills', 'Certificate of completion'],
      requirements: ['A laptop or computer with internet', 'Basic keyboard skills', 'No Python experience needed'],
    },
    {
      id: 'CRS-DEF-007', title: 'Digital Art & Illustration', desc: 'Young artists learn digital drawing techniques, character design and illustration tools to bring their imagination to life on screen.',
      fullDesc: 'This creative course is perfect for children who love to draw and want to take their art digital. Using free, beginner-friendly tools, kids will learn digital drawing techniques, character design, colouring methods and how to create illustrations for stories and comics.',
      image: null, icon: '🎨', age: 'Ages 6–14', duration: '2 Days', sessions: '4 sessions (2hrs each)', price: '£60',
      color: 'from-fuchsia-500 to-pink-500', borderColor: 'border-fuchsia-500/25', tag: '🖌️ Artistic', gradientBg: true, active: true, createdAt: now, updatedAt: now,
      highlights: ['Learn digital drawing tools', 'Design your own characters', 'Create comic-style art', 'Build an art portfolio'],
      curriculum: [
        { day: 'Day 1', title: 'Digital Drawing Fundamentals', topics: ['Introduction to digital art tools', 'Brushes, layers and colours', 'Drawing basic shapes and forms', 'Your first digital illustration'] },
        { day: 'Day 2', title: 'Character Design & Portfolio', topics: ['Character design principles', 'Facial expressions & poses', 'Creating a short comic strip', 'Building your art portfolio'] },
      ],
      outcomes: ['A digital art portfolio', 'Character designs', 'Comic strip creation', 'Certificate of completion'],
      requirements: ['A laptop or tablet with internet', 'Optional: drawing tablet/stylus', 'A love for drawing!'],
    },
    {
      id: 'CRS-DEF-008', title: 'Maths & Problem Solving', desc: 'Interactive maths challenges and logic puzzles that make numbers exciting — building confidence and critical thinking skills.',
      fullDesc: 'This course transforms maths from a subject into an adventure! Through interactive puzzles, logic challenges, pattern recognition and real-world problem solving, children develop a love for numbers.',
      image: null, icon: '🧮', age: 'Ages 5–14', duration: '3 Days', sessions: '6 sessions (1.5hrs each)', price: '£60',
      color: 'from-cyan-500 to-blue-500', borderColor: 'border-cyan-500/25', tag: '🧠 Logic', gradientBg: true, active: true, createdAt: now, updatedAt: now,
      highlights: ['Make maths fun', 'Logic puzzles & challenges', 'Build number confidence', 'Critical thinking skills'],
      curriculum: [
        { day: 'Day 1', title: 'Numbers & Patterns Adventure', topics: ['Fun with numbers', 'Pattern recognition', 'Number puzzles and tricks', 'Mental maths strategies'] },
        { day: 'Day 2', title: 'Logic & Problem Solving', topics: ['Logic puzzles and riddles', 'Word problem strategies', 'Spatial reasoning challenges', 'Working backwards technique'] },
        { day: 'Day 3', title: 'Maths Games & Brain Teasers', topics: ['Maths-based board games', 'Strategy and probability', 'Real-world maths challenges', 'Maths competition style questions'] },
      ],
      outcomes: ['Improved number confidence', 'Problem-solving strategies', 'Logical thinking skills', 'Certificate of completion'],
      requirements: ['A laptop or computer with internet', 'No advanced maths needed', 'A curious mind!'],
    },
  ];
}

export function seedDefaultCourses(): CourseData[] {
  const existing = getCourses();
  if (existing.length === 0) {
    const defaults = createDefaultCourses();
    saveCourses(defaults);
    return defaults;
  }
  return existing;
}
