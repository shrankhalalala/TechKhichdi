import React, { useState, useEffect } from "react";
import "./SurveyForm.css";
import { FaPencilAlt } from "react-icons/fa";

export default function SurveyForm() {
	useEffect(() => {
		document.title = "TechKhichdi | Survey";
	}, []);

	const [formData, setFormData] = useState({
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

	const [submitted, setSubmitted] = useState(false);
	const [showForm, setShowForm] = useState(true);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox") {
			setFormData((prev) => {
				const updatedArray = checked
					? [...prev[name], value]
					: prev[name].filter((item) => item !== value);
				return { ...prev, [name]: updatedArray };
			});
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		setShowForm(false);
		console.log("Submitted data:", formData);
		try {
			const response = await fetch("http://127.0.0.1:5000/api/recommend", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (result.success) {
				console.log("Top Picks:", result.topPicks);
				console.log("Categorized:", result.categorized);
				alert("Recommendations ready! Check console for now.");
			} else {
				alert("Something went wrong: " + result.error);
			}
		} catch (error) {
			alert("Failed to fetch recommendations.");
			console.error("Error:", error);
		}
	};

	const formatKey = (str) => {
		return str
			.replace(/([A-Z])/g, " $1") // Add space before capital letters
			.replace(/^./, (s) => s.toUpperCase()); // Capitalize first letter
	};


	const toggleForm = () => {
		setShowForm((prev) => !prev);
	};

	return (
		<div className={`survey-wrapper ${submitted ? "submitted" : ""}`}>
			{!showForm && submitted && (
				<button className="edit-icon-button top-right" onClick={toggleForm}>
					<FaPencilAlt />
				</button>
			)}
			{submitted && !showForm && (
				<div className="results-container">
					<h2 className="results-title">Your Submission Summary</h2>
					<ul className="results-list">
						{Object.entries(formData).map(([key, value]) => (
							<li key={key}>
								<strong>{formatKey(key)}:</strong>{" "}
								{Array.isArray(value) ? value.join(", ") : value || "N/A"}
							</li>
						))}
					</ul>
				</div>
			)}

			{showForm && (
				<div className="survey-container">
					<h2 className="survey-title">Specify them needs!</h2>
					<form onSubmit={handleSubmit} className="survey-form">
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
							<select
								name="productType"
								value={formData.productType}
								onChange={handleChange}
								required
							>
								<option value="">Select</option>
								{[
									"web",
									"mobile",
									"desktop",
									"saas",
									"ecommerce",
									"game",
									"iot",
									"ml",
									"api",
									"blockchain",
									"other",
								].map((type) => (
									<option key={type} value={type}>
										{type[0].toUpperCase() +
											type.slice(1).replace(/([A-Z])/g, " $1")}
									</option>
								))}
							</select>
						</div>

						{/* Budget */}
						<div className="form-group">
							<label>Budget</label>
							<select
								name="budget"
								value={formData.budget}
								onChange={handleChange}
								required
							>
								<option value="">Select</option>
								{["Low", "Medium", "High", "All"].map((opt) => (
									<option key={opt} value={opt}>
										{opt}
									</option>
								))}
							</select>
						</div>

						{/* Scalability */}
						<div className="form-group">
							<label>Scalability Needs</label>
							<select
								name="scalability"
								value={formData.scalability}
								onChange={handleChange}
								required
							>
								<option value="">Select</option>
								{["small", "medium", "large", "unsure"].map((scale) => (
									<option key={scale} value={scale}>
										{scale[0].toUpperCase() + scale.slice(1)}-scale
									</option>
								))}
							</select>
						</div>

						{/* Preferred Technologies */}
						<div className="form-group">
							<label>Preferred Technologies (select all that apply)</label>
							<div className="checkbox-group">
								{[
									"JavaScript",
									"Python",
									"Java",
									"C#",
									"Go",
									"Rust",
									"PHP",
									"Dart",
									"Kotlin",
									"No Preference",
								].map((tech) => (
									<label key={tech}>
										<input
											type="checkbox"
											name="preferredTech"
											value={tech}
											checked={formData.preferredTech.includes(tech)}
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
								{[
									"Cloud-first",
									"Serverless",
									"On-premise",
									"Hybrid",
									"Not sure",
								].map((option) => (
									<label key={option}>
										<input
											type="checkbox"
											name="hostingPreference"
											value={option}
											checked={formData.hostingPreference.includes(option)}
											onChange={handleChange}
										/>
										{option}
									</label>
								))}
							</div>
						</div>

						{/* Speed */}
						<div className="form-group">
							<label>Development Speed Priority</label>
							<select
								name="speed"
								value={formData.speed}
								onChange={handleChange}
							>
								<option value="">Select</option>
								<option value="fast">Rapid Prototyping</option>
								<option value="balanced">Balanced</option>
								<option value="stable">Long-term Stability</option>
							</select>
						</div>

						{/* Security */}
						<div className="form-group">
							<label>Security Requirements</label>
							<select
								name="security"
								value={formData.security}
								onChange={handleChange}
							>
								<option value="">Select</option>
								<option value="basic">Basic (Login, forms)</option>
								<option value="medium">Medium (Roles, Compliance)</option>
								<option value="high">High (Sensitive data, audits)</option>
							</select>
						</div>

						{/* Skill Level */}
						<div className="form-group">
							<label>Team Skill Level</label>
							<select
								name="skillLevel"
								value={formData.skillLevel}
								onChange={handleChange}
							>
								<option value="">Select</option>
								{["beginner", "intermediate", "advanced", "mixed"].map(
									(level) => (
										<option key={level} value={level}>
											{level[0].toUpperCase() + level.slice(1)}
										</option>
									)
								)}
							</select>
						</div>

						{/* AI Usage */}
						<div className="form-group">
							<label>Will your product use AI/ML?</label>
							<select
								name="aiUsage"
								value={formData.aiUsage}
								onChange={handleChange}
							>
								<option value="">Select</option>
								<option value="yes">Yes, core feature</option>
								<option value="maybe">Maybe later</option>
								<option value="no">No</option>
							</select>
						</div>

						{/* Blog Preference */}
						<div className="form-group">
							<label>Include recommendations from tech blogs/forums?</label>
							<select
								name="blogPreference"
								value={formData.blogPreference}
								onChange={handleChange}
							>
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
			)}
		</div>
	);
}