import React, { useEffect, useState } from "react";
import "./portfolioCard.css";

const portfolioData = [
  {
    id: 1,
    name: "TuteDude",
    profileImage:
      "https://i.pinimg.com/736x/0a/d1/93/0ad19309a59be71b028548801ac38353.jpg",
    bio: "I design and build calm, focused product experiences for fast-moving teams. Currently exploring AI-assisted interfaces, design systems, and high-performance UI engineering.",
    skills: [
      "Design Systems",
      "React",
      "TypeScript",
      "Figma",
      "Prototyping",
      "Accessibility",
    ],
  },
  {
    id: 2,
    name: "LearnHub",
    profileImage:
      "https://i.pinimg.com/736x/b0/02/63/b002631f370a950642e7f28b6f2bd963.jpg",
    bio: "Frontend-focused developer building responsive and accessible web interfaces with modern JavaScript frameworks.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git"],
  },
  {
    id: 3,
    name: "GuideAI",
    profileImage:
      "https://i.pinimg.com/1200x/3a/5d/ee/3a5dee0b5a1226c9e7e5d60222ed9685.jpg",
    bio: "An AI-powered platform designed to guide users through career choices, skill roadmaps, and interview preparation.",
    skills: [
      "Next.js",
      "OpenAI API",
      "Node.js",
      "MongoDB",
      "Career Roadmaps",
      "System Design",
    ],
  },
  {
    id: 4,
    name: "DesignPro",
    profileImage:
      "https://i.pinimg.com/736x/43/71/0f/43710f32c6fc09258dc246870064ace3.jpg",
    bio: "A minimal product showcase highlighting modern UI, pricing layouts, and interactive components.",
    skills: [
      "React",
      "Component Design",
      "State Management",
      "Responsive UI",
      "UI Animation",
      "User Experience",
    ],
  },
];

function PortfolioCard({ name, profileImage, bio, skills }) {
  const [isDark, setIsDark] = useState(false);
  const [islikes, setIsLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProfile = portfolioData[currentIndex]

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioData.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + portfolioData.length) % portfolioData.length,
    );
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#292929" : "#d7d7d7";
    document.body.style.color = isDark ? "#000000" : "#121212";
  }, [isDark]);

  const IncrementLikes = () => {
    setIsLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div className="portfolio-card">
      <div className="profile-section">
        <div className="title">
          <img
            src={currentProfile.profileImage}
            alt="profile-image"
            className="profile-image"
          />
          <span className="name-section">
            <h2>{currentProfile.name}</h2>
            <p>Product Designer & Frontend Engineer</p>
          </span>
        </div>
        <p className="bio-section">{currentProfile.bio}</p>
        <div className="skills-section">
          <h4>Skills</h4>
          {currentProfile.skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
        <div className="footer-section">
          <button
            className="theme"
            onClick={() => {
              setIsDark(!isDark);
            }}
          >
            {isDark ? "☾ Dark" : "☀ Light"}
          </button>
          <div className="page-number">
            <button className="prev" onClick={prev}>
              &lt;
            </button>
            <button className="next" onClick={next}>
              &gt;
            </button>
            <span className="page-number">
              {currentIndex + 1} / {portfolioData.length}
            </span>
          </div>
          <button className="Likes-section" onClick={IncrementLikes}>
            {isLiked ? "♥" : "♡"} {islikes}
          </button>
          <button
            onClick={() => {
              window.open("mailto:ishitasharma2428@gmail.com", "_blank");
            }}
            className="contact-section"
          >
            ✉ Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;
