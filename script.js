// ================================
// LIVE DATE
// ================================

function updateLiveDate() {
    const dateElement = document.getElementById("liveDate");

    if (!dateElement) return;

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}


// ================================
// AI SUMMARY
// ================================

function generateAI() {

    const name = document.getElementById("name")?.value.trim() || "";
    const jobTitle = document.getElementById("jobTitle")?.value.trim() || "";
    const education = document.getElementById("education")?.value.trim() || "";
    const skills = document.getElementById("skills")?.value.trim() || "";
    const experience = document.getElementById("experience")?.value.trim() || "";

    const summary = document.getElementById("summary");

    if (!summary) return;

    if (
        experience.toLowerCase().includes("fresher") ||
        experience === ""
    ) {
        summary.value =
            `Motivated ${jobTitle || "professional"} and enthusiastic fresher with a background in ${education || "education"} and knowledge of ${skills || "modern technologies"}. Eager to learn, contribute and grow professionally.`;
    } else {
        summary.value =
            `Experienced ${jobTitle || "professional"} with practical experience and strong skills in ${skills || "relevant technologies"}. A dedicated and results-oriented professional focused on delivering quality work and continuous growth.`;
    }

    updateLivePreview();
}


// ================================
// GENERATE RESUME
// ================================

function generateResume() {

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const jobTitle = document.getElementById("jobTitle")?.value.trim();
    const education = document.getElementById("education")?.value.trim();
    const skills = document.getElementById("skills")?.value.trim();
    const experience = document.getElementById("experience")?.value.trim();
    const summary = document.getElementById("summary")?.value.trim();
    const projects = document.getElementById("projects")?.value.trim();
    const languages = document.getElementById("languages")?.value.trim();
    const github = document.getElementById("github")?.value.trim();
    const linkedin = document.getElementById("linkedin")?.value.trim();

    const resume = document.getElementById("resume");

    if (!resume) return;

    if (!name || !email || !phone) {

        alert("Please fill Name, Email and Phone Number.");

        return;
    }

    createResumePreview();
}


// ================================
// CREATE RESUME PREVIEW
// ================================

function createResumePreview() {

    const resume = document.getElementById("resume");

    if (!resume) return;

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const jobTitle = document.getElementById("jobTitle")?.value.trim() || "";
    const education = document.getElementById("education")?.value.trim() || "";
    const skills = document.getElementById("skills")?.value.trim() || "";
    const experience = document.getElementById("experience")?.value.trim() || "";
    const summary = document.getElementById("summary")?.value.trim() || "";
    const projects = document.getElementById("projects")?.value.trim() || "";
    const languages = document.getElementById("languages")?.value.trim() || "";
    const github = document.getElementById("github")?.value.trim() || "";
    const linkedin = document.getElementById("linkedin")?.value.trim() || "";
    const template = document.getElementById("template")?.value || "classic";

    let skillsHTML = "";

    if (skills) {

        skillsHTML = skills
            .split(",")
            .map(skill => `<li>${escapeHTML(skill.trim())}</li>`)
            .join("");

    }

    let projectsHTML = "";

    if (projects) {

        projectsHTML = projects
            .split(",")
            .map(project => `<li>${escapeHTML(project.trim())}</li>`)
            .join("");

    }

    let linksHTML = "";

    if (github) {

        linksHTML += `
            <p>
                <b>GitHub:</b>
                <a href="${escapeAttribute(github)}" target="_blank">
                    ${escapeHTML(github)}
                </a>
            </p>
        `;

    }

    if (linkedin) {

        linksHTML += `
            <p>
                <b>LinkedIn:</b>
                <a href="${escapeAttribute(linkedin)}" target="_blank">
                    ${escapeHTML(linkedin)}
                </a>
            </p>
        `;

    }

    resume.innerHTML = `

        <div class="resume-card ${template}-template">

            <div class="resume-header">

                <div class="resume-name">

                    <h1>${escapeHTML(name)}</h1>

                    <h3>${escapeHTML(jobTitle)}</h3>

                    <p>
                        ${escapeHTML(email)}
                        ${email && phone ? " | " : ""}
                        ${escapeHTML(phone)}
                    </p>

                </div>

            </div>


            ${
                summary
                ?
                `
                <section>

                    <h2>Professional Summary</h2>

                    <p>
                        ${escapeHTML(summary)}
                    </p>

                </section>
                `
                :
                ""
            }


            ${
                education
                ?
                `
                <section>

                    <h2>Education</h2>

                    <p>
                        ${escapeHTML(education)}
                    </p>

                </section>
                `
                :
                ""
            }


            ${
                skillsHTML
                ?
                `
                <section>

                    <h2>Skills</h2>

                    <ul>
                        ${skillsHTML}
                    </ul>

                </section>
                `
                :
                ""
            }


            ${
                experience
                ?
                `
                <section>

                    <h2>Experience</h2>

                    <p>
                        ${escapeHTML(experience)}
                    </p>

                </section>
                `
                :
                ""
            }


            ${
                projectsHTML
                ?
                `
                <section>

                    <h2>Projects</h2>

                    <ul>
                        ${projectsHTML}
                    </ul>

                </section>
                `
                :
                ""
            }


            ${
                languages
                ?
                `
                <section>

                    <h2>Languages</h2>

                    <p>
                        ${escapeHTML(languages)}
                    </p>

                </section>
                `
                :
                ""
            }


            ${
                linksHTML
                ?
                `
                <section>

                    <h2>Profiles</h2>

                    ${linksHTML}

                </section>
                `
                :
                ""
            }

        </div>
    `;

}


// ================================
// LIVE PREVIEW
// ================================

function updateLivePreview() {

    const resume = document.getElementById("resume");

    if (!resume) return;

    const name = document.getElementById("name")?.value.trim() || "";

    if (!name) {

        resume.innerHTML = "";

        return;
    }

    createResumePreview();
}


// ================================
// DARK MODE
// ================================

function darkMode() {

    document.body.classList.toggle("dark-mode");

    const enabled =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "resumeAiDarkMode",
        enabled ? "true" : "false"
    );

}


// ================================
// CLEAR FORM
// ================================

function clearForm() {

    const fields = [

        "name",
        "email",
        "phone",
        "jobTitle",
        "education",
        "skills",
        "experience",
        "summary",
        "projects",
        "languages",
        "github",
        "linkedin"

    ];

    fields.forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.value = "";

        }

    });

    const photo =
        document.getElementById("photo");

    if (photo) {

        photo.value = "";

    }

    const resume =
        document.getElementById("resume");

    if (resume) {

        resume.innerHTML = "";

    }

}


// ================================
// DOWNLOAD PDF
// ================================

function downloadPDF() {

    const resume =
        document.getElementById("resume");

    if (!resume || !resume.innerHTML.trim()) {

        alert("Resume preview is empty!");

        return;

    }

    window.print();

}


// ================================
// PREMIUM
// ================================

let selectedPremiumPlan = null;

function selectPlan(plan, price) {

    selectedPremiumPlan = {

        plan: plan,
        price: price

    };

    localStorage.setItem(
        "resumeAiPremium",
        JSON.stringify(selectedPremiumPlan)
    );

    alert(
        "💎 ResumeAi Premium\n\n" +
        "Plan: " +
        plan +
        "\nPrice: ₹" +
        price +
        "\n\nPremium plan selected successfully!"
    );

}


// ================================
// SECURITY HELPERS
// ================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return String(value)
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


// ================================
// PAGE LOAD
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateLiveDate();

        // Restore dark mode

        if (
            localStorage.getItem("resumeAiDarkMode")
            === "true"
        ) {

            document.body.classList.add(
                "dark-mode"
            );

        }


        // Restore premium plan

        const savedPlan =
            localStorage.getItem(
                "resumeAiPremium"
            );

        if (savedPlan) {

            try {

                selectedPremiumPlan =
                    JSON.parse(savedPlan);

            } catch (error) {

                selectedPremiumPlan = null;

            }

        }


        // Live preview inputs

        const inputIds = [

            "name",
            "email",
            "phone",
            "jobTitle",
            "education",
            "skills",
            "experience",
            "summary",
            "projects",
            "languages",
            "github",
            "linkedin",
            "template"

        ];


        inputIds.forEach(function (id) {

            const element =
                document.getElementById(id);

            if (!element) return;


            element.addEventListener(
                "input",
                updateLivePreview
            );


            element.addEventListener(
                "change",
                updateLivePreview
            );

        });


        // Photo

        const photo =
            document.getElementById("photo");

        if (photo) {

            photo.addEventListener(
                "change",
                updateLivePreview
            );

        }


        updateLivePreview();

    }
);


// Update date every minute

setInterval(
    updateLiveDate,
    60000
);
