// ==========================================
// ResumeAi - FINAL SCRIPT
// ==========================================


// ==========================================
// LIVE DATE
// ==========================================

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


// ==========================================
// GET FORM DATA
// ==========================================

function getResumeData() {

    return {

        name: document.getElementById("name")?.value.trim() || "",

        email: document.getElementById("email")?.value.trim() || "",

        phone: document.getElementById("phone")?.value.trim() || "",

        jobTitle: document.getElementById("jobTitle")?.value.trim() || "",

        education: document.getElementById("education")?.value.trim() || "",

        skills: document.getElementById("skills")?.value.trim() || "",

        experience: document.getElementById("experience")?.value.trim() || "",

        summary: document.getElementById("summary")?.value.trim() || "",

        projects: document.getElementById("projects")?.value.trim() || "",

        languages: document.getElementById("languages")?.value.trim() || "",

        github: document.getElementById("github")?.value.trim() || "",

        linkedin: document.getElementById("linkedin")?.value.trim() || "",

        template: document.getElementById("template")?.value || "classic"

    };

}


// ==========================================
// AI SUMMARY
// ==========================================

function generateAI() {

    const data = getResumeData();

    const summaryBox = document.getElementById("summary");

    if (!summaryBox) return;


    if (data.experience.toLowerCase().includes("fresher")) {

        summaryBox.value =
            `Motivated ${data.jobTitle || "professional"} and enthusiastic fresher with knowledge of ${data.skills || "modern technologies"}. Educational background in ${data.education || "relevant studies"}. Eager to learn, contribute and grow professionally.`;

    } else {

        summaryBox.value =
            `Experienced ${data.jobTitle || "professional"} with practical experience in ${data.skills || "relevant technologies"}. Dedicated to delivering quality results, solving problems and continuously improving professional skills.`;

    }


    createResumePreview();

}


// ==========================================
// GENERATE RESUME
// ==========================================

function generateResume() {

    const data = getResumeData();


    if (!data.name) {

        alert("Please enter your Full Name.");

        return;
    }


    if (!data.email) {

        alert("Please enter your Email.");

        return;
    }


    if (!data.phone) {

        alert("Please enter your Phone Number.");

        return;
    }


    createResumePreview();

}


// ==========================================
// CREATE RESUME PREVIEW
// ==========================================

function createResumePreview() {

    const resume = document.getElementById("resume");

    if (!resume) return;


    const data = getResumeData();


    // Skills

    let skillsHTML = "";

    if (data.skills) {

        skillsHTML = data.skills
            .split(",")
            .map(function(skill) {

                return `<li>${escapeHTML(skill.trim())}</li>`;

            })
            .join("");

    }


    // Projects

    let projectsHTML = "";

    if (data.projects) {

        projectsHTML = data.projects
            .split(",")
            .map(function(project) {

                return `<li>${escapeHTML(project.trim())}</li>`;

            })
            .join("");

    }


    // Profiles

    let profilesHTML = "";


    if (data.github) {

        profilesHTML += `
            <p>
                <strong>GitHub:</strong>
                <a href="${escapeAttribute(data.github)}"
                   target="_blank"
                   rel="noopener noreferrer">
                    ${escapeHTML(data.github)}
                </a>
            </p>
        `;

    }


    if (data.linkedin) {

        profilesHTML += `
            <p>
                <strong>LinkedIn:</strong>
                <a href="${escapeAttribute(data.linkedin)}"
                   target="_blank"
                   rel="noopener noreferrer">
                    ${escapeHTML(data.linkedin)}
                </a>
            </p>
        `;

    }


    // Photo

    let photoHTML = "";


    const photoInput =
        document.getElementById("photo");


    if (
        photoInput &&
        photoInput.files &&
        photoInput.files[0]
    ) {

        const photoURL =
            URL.createObjectURL(photoInput.files[0]);


        photoHTML = `
            <img
                class="resume-photo"
                src="${photoURL}"
                alt="Profile Photo">
        `;

    }


    // Sections

    const educationHTML =
        data.education
        ?
        `
            <section>
                <h2>Education</h2>
                <p>${escapeHTML(data.education)}</p>
            </section>
        `
        :
        "";


    const skillsSection =
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
        "";


    const experienceHTML =
        data.experience
        ?
        `
            <section>
                <h2>Experience</h2>
                <p>${escapeHTML(data.experience)}</p>
            </section>
        `
        :
        "";


    const summaryHTML =
        data.summary
        ?
        `
            <section>
                <h2>Professional Summary</h2>
                <p>${escapeHTML(data.summary)}</p>
            </section>
        `
        :
        "";


    const projectsSection =
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
        "";


    const languagesHTML =
        data.languages
        ?
        `
            <section>
                <h2>Languages</h2>
                <p>${escapeHTML(data.languages)}</p>
            </section>
        `
        :
        "";


    const profilesSection =
        profilesHTML
        ?
        `
            <section>
                <h2>Profiles</h2>
                ${profilesHTML}
            </section>
        `
        :
        "";


    // ==========================================
    // FINAL RESUME
    // ==========================================

    resume.innerHTML = `

        <div class="resume-card ${escapeAttribute(data.template)}-template">

            <div class="resume-header">

                ${photoHTML}

                <div class="resume-name">

                    <h1>
                        ${escapeHTML(data.name)}
                    </h1>

                    ${
                        data.jobTitle
                        ?
                        `<h3>${escapeHTML(data.jobTitle)}</h3>`
                        :
                        ""
                    }

                    <p>
                        ${escapeHTML(data.email)}

                        ${
                            data.email && data.phone
                            ?
                            " | "
                            :
                            ""
                        }

                        ${escapeHTML(data.phone)}
                    </p>

                </div>

            </div>


            ${summaryHTML}

            ${educationHTML}

            ${skillsSection}

            ${experienceHTML}

            ${projectsSection}

            ${languagesHTML}

            ${profilesSection}

        </div>

    `;

}


// ==========================================
// LIVE PREVIEW
// ==========================================

function updateLivePreview() {

    const data = getResumeData();

    const resume =
        document.getElementById("resume");

    if (!resume) return;


    if (!data.name) {

        resume.innerHTML = "";

        return;

    }


    createResumePreview();

}


// ==========================================
// DARK MODE
// ==========================================

function darkMode() {

    document.body.classList.toggle("dark-mode");


    const isDark =
        document.body.classList.contains("dark-mode");


    localStorage.setItem(
        "resumeAiDarkMode",
        isDark ? "true" : "false"
    );

}


// ==========================================
// CLEAR FORM
// ==========================================

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


// ==========================================
// DOWNLOAD PDF
// ==========================================

function downloadPDF() {

    const resume =
        document.getElementById("resume");


    if (
        !resume ||
        !resume.innerHTML.trim()
    ) {

        alert(
            "Please generate your resume first."
        );

        return;

    }


    window.print();

}


// ==========================================
// PREMIUM
// ==========================================

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


// ==========================================
// SECURITY
// ==========================================

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

        .replace(/&/g, "&amp;")

        .replace(/"/g, "&quot;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/'/g, "&#039;");

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function() {


        // Date

        updateLiveDate();


        // Dark mode

        if (

            localStorage.getItem(
                "resumeAiDarkMode"
            ) === "true"

        ) {

            document.body.classList.add(
                "dark-mode"
            );

        }


        // Premium plan

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


        // Live preview

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


        inputIds.forEach(function(id) {

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


// ==========================================
// UPDATE DATE EVERY MINUTE
// ==========================================

setInterval(

    updateLiveDate,

    60000

);
