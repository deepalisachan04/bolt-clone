const LOOKUP = {
  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',

  SIGNIN_HEADING: 'Continue With Bolt.New 2.0',
  SIGNIN_SUBHEADING: 'To use Bolt you must log into an existing account.',
  SIGNIN_AGREEMENT_TEXT: 'By using Bolt, you agree to the collection of data.',

  // 💡 Added this new field just for your flirty coding heart
  SUGGESTIONS: [
    "Create a to-do app with react",
    "Create a budget tract app",
    "Create a gym management portal dashboard",
    "Create VITE app",
    "Create login signup screen"
  ],

  DEMO: {
    projectTitle: "React ToDo App",
    description: "A basic ToDo App in React with Tailwind CSS",
    generatedFiles: [
      "/src/App.js",
      "/src/components/TodoList.js",
      "/src/components/TodoForm.js",
      "/src/components/TodoItem.js",
      "/src/index.css"
    ],
    files: {
      "/src/App.js": `...`, // existing code
      "/src/components/TodoList.js": `...`,
      "/src/components/TodoForm.js": `...`,
      "/src/components/TodoItem.js": `...`,
      "/src/index.css": `...`
    }
  }
};

export default LOOKUP;
