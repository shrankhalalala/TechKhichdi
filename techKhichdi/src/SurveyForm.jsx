import React, { useState, useEffect } from "react";
import "./SurveyForm.css";


export default function SurveyForm() {
    useEffect(() => {
        document.title = "TechKhichdi | Survey";
      }, []);
      
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDescription: "",
    productType: "",
    budget: "",
    scalability: "",
    preferredTech: [],
    hostingPreference: [],
    speed: "",
    security: "",
    skillLevel: "",
    aiUsage: "",
    blogPreference: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const list = new Set(prev[name]);
        checked ? list.add(value) : list.delete(value);
        return { ...prev, [name]: Array.from(list) };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Submitted:", formData);
    alert("Thanks for submitting! We’ll recommend a tech stack soon.");
  };

  

  return (
    <div className="survey-container">
      <h2 className="survey-title">Specify them needs!</h2>
      <form onSubmit={handleSubmit} className="survey-form">
        {/* Name & Email */}
        {/*
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        */}

        {/* Project Description */}
        <div className="form-group">
          <label>Brief Project Description</label>
          <textarea
            name="projectDescription"
            rows="3"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Tell us about your product idea"
          />
        </div>

        {/* Product Type */}
        <div className="form-group">
          <label>Product Type</label>
          <select name="productType" value={formData.productType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="web">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="desktop">Desktop Software</option>
            <option value="saas">SaaS Product</option>
            <option value="ecommerce">E-commerce</option>
            <option value="game">Game Development</option>
            <option value="iot">IoT or Embedded</option>
            <option value="ml">Data/ML App</option>
            <option value="api">API / Microservices</option>
            <option value="blockchain">Blockchain App</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Budget */}
        <div className="form-group">
          <label>Budget</label>
          <select name="budget" value={formData.budget} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="All">No constraints</option>
          </select>
        </div>

        {/* Scalability */}
        <div className="form-group">
          <label>Scalability Needs</label>
          <select name="scalability" value={formData.scalability} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="small">Small-scale</option>
            <option value="medium">Medium-scale</option>
            <option value="large">Large-scale</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>

        {/* Preferred Tech */}
        <div className="form-group">
          <label>Preferred Technologies (select all that apply)</label>
          <div className="checkbox-group">
            {["JavaScript", "Python", "Java", "C#", "Go", "Rust", "PHP", "Dart", "Kotlin", "No Preference"].map((tech) => (
              <label key={tech}>
                <input
                  type="checkbox"
                  name="preferredTech"
                  value={tech}
                  onChange={handleChange}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        {/* Hosting Preference */}
        <div className="form-group">
          <label>Hosting / Infrastructure</label>
          <div className="checkbox-group">
            {["Cloud-first", "Serverless", "On-premise", "Hybrid", "Not sure"].map((opt) => (
              <label key={opt}>
                <input type="checkbox" name="hostingPreference" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Speed */}
        <div className="form-group">
          <label>Development Speed Priority</label>
          <select name="speed" value={formData.speed} onChange={handleChange}>
            <option value="">Select</option>
            <option value="fast">Rapid Prototyping</option>
            <option value="balanced">Balanced</option>
            <option value="stable">Long-term Stability</option>
          </select>
        </div>

        {/* Security */}
        <div className="form-group">
          <label>Security Requirements</label>
          <select name="security" value={formData.security} onChange={handleChange}>
            <option value="">Select</option>
            <option value="basic">Basic (Login, forms)</option>
            <option value="medium">Medium (Roles, Compliance)</option>
            <option value="high">High (Sensitive data, audits)</option>
          </select>
        </div>

        {/* Team Skill */}
        <div className="form-group">
          <label>Team Skill Level</label>
          <select name="skillLevel" value={formData.skillLevel} onChange={handleChange}>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="mixed">Mixed Team</option>
          </select>
        </div>

        {/* AI Usage */}
        <div className="form-group">
          <label>Will your product use AI/ML?</label>
          <select name="aiUsage" value={formData.aiUsage} onChange={handleChange}>
            <option value="">Select</option>
            <option value="yes">Yes, core feature</option>
            <option value="maybe">Maybe later</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Blog Preference */}
        <div className="form-group">
          <label>Include recommendations from tech blogs/forums?</label>
          <select name="blogPreference" value={formData.blogPreference} onChange={handleChange}>
            <option value="">Select</option>
            <option value="yes">Yes, trending tools</option>
            <option value="curated">Yes, but curated</option>
            <option value="no">No, fixed suggestions only</option>
          </select>
        </div>

        {/* Feedback */}
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="feedback"
            rows="3"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Any special requirements or goals?"
          />
        </div>

        <button type="submit" className="submit-button">
          Get Recommendations
        </button>
      </form>
    </div>
  );
}
