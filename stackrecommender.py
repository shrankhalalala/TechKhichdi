from collections import defaultdict

# Tech classification dictionary
tech_categories = {
    "React": "frontend",
    "Next.js": "frontend",
    "Astro": "frontend",
    "Tailwind CSS": "frontend",

    "Django": "backend",
    "Django REST": "backend",
    "Node.js": "backend",
    "Express.js": "backend",
    "GraphQL": "backend",
    "tRPC": "backend",
    "Scala": "backend",

    "MongoDB": "database",
    "PostgreSQL": "database",
    "MySQL Cluster": "database",
    "BigQuery": "database",
    "SQLite": "database",
    "Supabase": "database",
    "Firebase": "database",

    "Stripe": "infrastructure",
    "Docker": "infrastructure",
    "Kubernetes": "infrastructure",
    "AWS": "infrastructure",
    "GCP": "infrastructure",
    "Azure": "infrastructure",
    "Heroku": "infrastructure",
    "Render": "infrastructure",
    "Vercel": "infrastructure",
    "Cloudflare": "infrastructure",
    "Netlify": "infrastructure",

    "HuggingFace": "ai_tools",
    "TensorFlow": "ai_tools",
    "PyTorch": "ai_tools",
    "Streamlit": "ai_tools",
    "Scikit-learn": "ai_tools",

    "Vault": "security",
    "Snyk": "security",
    "Auth0": "security",
    "Firebase Auth": "security",
    "OAuth2": "security",
    "JWT": "security",

    "Flutter": "mobile",
    "Unity": "game",
    "C#": "game",
    "C++": "iot",
    "MQTT": "iot",
    "Raspberry Pi": "iot",
    "Web3.js": "blockchain",
    "Solidity": "blockchain",
    "Ethereum": "blockchain",

    "Bun": "others",
    "Terraform": "others"
}

product_types = {
    "saas": ["Django", "React", "PostgreSQL"],
    "ecommerce": ["Node.js", "MongoDB", "React", "Stripe"],
    "mobile": ["Flutter", "Firebase", "Django REST"],
    "web": ["React", "Express.js", "PostgreSQL"],
    "desktop": ["Electron", "SQLite"],
    "game": ["Unity", "C#"],
    "iot": ["C++", "Raspberry Pi", "MQTT"],
    "ml": ["Python", "TensorFlow", "Streamlit"],
    "api": ["Node.js", "GraphQL", "Docker"],
    "blockchain": ["Solidity", "Ethereum", "Web3.js"],
    "other": ["Next.js", "Firebase"]
}

budget_map = {
    "Low": ["Firebase", "Supabase", "Heroku"],
    "Medium": ["AWS Free Tier", "MongoDB Atlas"],
    "High": ["Kubernetes", "Cloudflare", "AWS full services"],
    "All": ["Vercel", "Render", "AWS"]
}

audience_map = {
    "small": ["SQLite", "Supabase"],
    "medium": ["PostgreSQL", "MongoDB"],
    "large": ["MySQL Cluster", "BigQuery", "Kafka"],
    "unsure": ["MongoDB", "Firebase"]
}

experience_map = {
    "beginner": ["Firebase", "Next.js", "Django"],
    "intermediate": ["Node.js", "React", "MongoDB"],
    "advanced": ["Kubernetes", "Terraform", "Scala"],
    "mixed": ["React", "Express.js", "PostgreSQL"]
}

timeline_map = {
    "fast": ["Firebase", "Supabase", "Next.js"],
    "balanced": ["Node.js", "React", "MongoDB"],
    "stable": ["Docker", "GraphQL", "PostgreSQL"]
}

security_map = {
    "basic": ["Auth0", "Firebase Auth"],
    "medium": ["JWT", "OAuth2"],
    "high": ["Vault", "Snyk", "Cloudflare"]
}

hosting_map = {
    "Cloud-first": ["AWS", "GCP", "Azure"],
    "Serverless": ["Vercel", "Firebase", "Netlify"],
    "On-premise": ["Docker", "Kubernetes"],
    "Hybrid": ["AWS", "Docker"],
    "Not sure": ["Firebase", "Render"]
}

ai_usage_map = {
    "yes": ["TensorFlow", "HuggingFace", "PyTorch"],
    "maybe": ["Streamlit", "Scikit-learn"],
    "no": []
}

blog_bonus = {
    "yes": ["Bun", "tRPC", "Astro"],
    "curated": ["Next.js", "Tailwind CSS"],
    "no": []
}


def recommend_stack(inputs):
    score = {}

    def score_items(items, weight):
        for tech in items:
            score[tech] = score.get(tech, 0) + weight

    # Score based on mappings
    score_items(product_types.get(inputs.get("product_type", "").lower(), []), 2)
    score_items(budget_map.get(inputs.get("budget"), []), 1)
    score_items(audience_map.get(inputs.get("scalability", "").lower(), []), 1)
    score_items(timeline_map.get(inputs.get("speed", ""), []), 1)
    score_items(experience_map.get(inputs.get("skill_level", "").lower(), []), 1)
    score_items(security_map.get(inputs.get("security", ""), []), 1)

    for hosting in inputs.get("hostingPreference", []) or ["Not sure"]:
        score_items(hosting_map.get(hosting, []), 1)

    score_items(ai_usage_map.get(inputs.get("aiUsage", ""), []), 1)
    score_items(blog_bonus.get(inputs.get("blogPreference", ""), []), 1)
    score_items(inputs.get("preferredTech", []), 3)

    # Organize by category
    categorized = defaultdict(list)
    for tech, value in sorted(score.items(), key=lambda x: x[1], reverse=True):
        category = tech_categories.get(tech, "others")
        categorized[category].append({"name": tech, "score": value})

    # Get the top pick from each category
    top_choices = {
        category: items[0]["name"]
        for category, items in categorized.items() if items
    }

    return dict(categorized), top_choices


# --- Test Example ---
if __name__ == "__main__":
    user_inputs = {
        "product_type": "SaaS",
        "budget": "Low",
        "scalability": "Medium",
        "speed": "fast",
        "skill_level": "beginner",
        "security": "basic",
        "hostingPreference": ["Cloud-first", "Serverless"],
        "aiUsage": "yes",
        "blogPreference": "yes",
        "preferredTech": ["React", "Node.js"]
    }

    full_stack, best_picks = recommend_stack(user_inputs)

    from pprint import pprint
    print("\n🧠 Full Stack Suggestions by Category:")
    pprint(full_stack)

    print("\n✅ Top Tech in Each Category:")
    pprint(best_picks)
