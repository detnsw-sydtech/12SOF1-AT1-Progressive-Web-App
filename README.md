# 12SOF1-AT1-Progressive-Web-App
A template repository for the design and development of progressive web apps

# This package contains a production-ready, clean scaffolding workspace that you can directly as a template repository.

📂 Clean PWA Folder Structure Blueprint

Your file directory will look like this inside Visual Studio Code:
```text
📁 pwa_student_template/
│
├── 📁 css/
│   └── 📄 style.css        # Mobile-first CSS foundation using standard system variables
│
├── 📁 js/
│   └── 📄 main.js         # Entry script containing full automated Service Worker registration
│
├── 📁 icons/
│   └── 📄 readme_icons.txt # Placeholder (Students drop their 192px and 512px icon PNGs here)
│
├── 📄 index.html          # Core document shell linking the script, styles, and manifest
├── 📄 offline.html        # Custom structural standalone screen served automatically when disconnected
├── 📄 manifest.json       # Configured app installation criteria ready for custom names
└── 📄 sw.js               # Network-first lifecycle proxy manager with asset caching built-in
```

🚀 Step-by-Step Instructions to Deploy This on GitHub

To distribute this workspace seamlessly as a template to your Year 12 cohort, complete the following setup steps:
1. Extract and Open: Download and unpack the provided pwa_student_template.zip folder. Open it inside Visual Studio Code.
2. Push to GitHub: Initialize a new repository via the source control panel in VS Code and push it up to your teacher or school GitHub account.
3. Turn into a Template:
	• Navigate to your newly created repository page on the GitHub Web Interface.
	• Click on the Settings gear icon in the top tabs.
	• Check the box labeled "Template repository" (found right under the repository name field).
4. Student Onboarding: Instruct your students to visit your repository URL and click the green "Use this template" button. This creates a clean, independent copy of the folder layout inside their personal account without accidentally overwriting their classmates' files.

💡 Added Classroom Features Built into This Template

• Automated Offline Failover: The sw.js is fully programmed out of the box to serve the offline.html view if network calls fail. Students do not need to modify the service worker logic itself; they only need to focus on updating index.html and js/main.js.
• Live Connection Monitor: A tracking element <p id="network-status"> is included at the top of the interface. It utilizes standard DOM events to display 🟢 Online or 🔴 Offline Mode Active dynamically as students toggle their dev tools connection state, providing immediate feedback for their NESA testing documentation.
Now that the project code workspace template is established, would you like me to construct a matching NESA-aligned Student Requirements Document or a Project Test Case Table Template they can fill out during Week 5?

