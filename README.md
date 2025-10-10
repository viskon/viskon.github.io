# Interactive CV of Vishal Kondabathini

Welcome to the repository for my personal interactive CV\! This project is a modern, dynamic take on the traditional resume, designed to provide a more engaging and comprehensive look into my professional journey. It's not just a document; it's a demonstration of my skills in action.

**✨ [View the Live CV Here\!](https://viskon.github.io/interactcv.html)**

-----

## 🎯 About The Project

In today's fast-paced digital world, a static PDF resume can only say so much. I wanted to create a living document that not only lists my experiences but also demonstrates my capabilities in digital solution development and user experience. This interactive CV was built to be:

  * **Engaging:** Using animations and interactive elements to create a memorable experience.
  * **Detailed:** Allowing visitors to explore the depth of my roles and projects without feeling overwhelmed.
  * **Demonstrative:** The CV itself is a portfolio piece, showcasing modern web development techniques.
  * **Easy to Update:** All content is managed within JavaScript objects, making updates quick and simple.

## 🚀 Built With

This project was built from the ground up using a clean and efficient tech stack, focusing on performance and maintainability without relying on heavy frameworks.

  * **HTML5:** For the semantic structure of the content.
  * **Tailwind CSS:** For a utility-first approach to styling that allows for rapid and responsive UI development.
  * **Vanilla JavaScript (ES6+):** For all interactivity, including the timeline, portfolio accordions, theme switcher, and mobile navigation.
  * **Font Awesome:** For clean and scalable icons.
  * **Google Fonts:** For the modern typography (Poppins and Inter).

## ✨ Key Features

  * **🎨 Dynamic Theme Switcher:** Users can choose from four distinct color palettes. This is powered by CSS variables, allowing for instant and seamless theme changes across the entire site.
  * **📱 Fully Responsive Design:** The layout is optimized for all screen sizes, featuring a custom-built animated mobile menu panel that provides a clean user experience on phones.
  * **📜 Interactive Timeline & Portfolio:** Career history and project details are neatly tucked into expandable accordion sections, keeping the UI clean and user-friendly.
  * **💡 Data-Driven Content:** All personal data (experience, skills, projects) is stored in JavaScript arrays and objects. The HTML is dynamically generated from this data, making content updates incredibly simple without touching the HTML structure.
  * **👁️ Scroll-Triggered Animations:** Subtle fade-in and slide-up animations are triggered as the user scrolls, making the experience more fluid and engaging.

## 🔧 How It Works: A Look Under the Hood

This project is open-source for knowledge-sharing. Here are some of the core concepts I used:

### 1\. Data-Driven Content Generation

Instead of hard-coding my experience into the HTML, I store it in a JavaScript array. A script then loops through this data to build the HTML, making it super easy to add, remove, or update roles.

```javascript
const experienceData = [
    {
        company: "Novo Nordisk A/S",
        duration: "2.9 Years",
        roles: [
            {
                title: "Digital Transformation Strategist...",
                points: [
                    "Strategized and guided...",
                    "Drove digitalization..."
                ]
            }
        ]
    },
    // ... more experience objects
];

// Loop through the data and generate HTML
experienceData.forEach((exp) => {
    const item = document.createElement('div');
    // ... logic to build the timeline item HTML from the 'exp' object
    timelineContainer.appendChild(item);
});
```

### 2\. Theming with CSS Variables

The theme switcher is a great example of the power of modern CSS. I define color variables for each theme. The JavaScript simply changes a `data-theme-active` attribute on the `<html>` tag, and the new set of variables is instantly applied.

**CSS:**

```css
/* Default Theme */
:root {
    --color-primary: #003E6B;
    --color-accent: #36A8A4;
}

/* Sunset Theme */
[data-theme-active="sunset"] {
    --color-primary: #6D28D9;
    --color-accent: #F97316;
}

/* Usage */
.color-primary {
    color: var(--color-primary);
}
```

**JavaScript:**

```javascript
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme-active', theme);
    localStorage.setItem('cv-theme', theme); // Save preference
}
```

## 🌐 Get in Touch

I'm always open to connecting with fellow professionals, discussing new ideas, or exploring opportunities. Feel free to reach out\!

  * **LinkedIn:** [linkedin.com/in/vishalkondabathini](https://www.google.com/search?q=https://linkedin.com/in/vishalkondabathini)
  * **Email:** [vishal@digitalcubes.org](mailto:vishal@digitalcubes.org)
  * **Book a Meeting:** [Schedule a call via my booking page](https://www.google.com/search?q=https://cal.com/YOUR_BOOKING_LINK)

Thank you for visiting\!