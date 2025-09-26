function renderResume() {
    let name = $("#name").val() || "Your Name";
    let contact = $("#contact").val() || "your.email@example.com";
    let summary = $("#summary").val() || "Short professional summary goes here.";
    let skills = $("#skills").val();

    // Assemble education html
    let eduHtml = "";
    $("#education-section .edu-item").each(function(){
        let school = $(this).find(".edu-school").val() || "School / University";
        let degree = $(this).find(".edu-degree").val() || "Degree / Program";
        let years = $(this).find(".edu-years").val() || "Years";
        let desc = $(this).find(".edu-desc").val();
        eduHtml += `<div><div class="resume-subtitle">${school} – <span class="resume-dates">${years}</span></div><div>${degree}</div>`;
        if(desc) eduHtml += `<div class="resume-desc">${desc}</div>`;
        eduHtml += `</div><hr class="my-1">`;
    });

    // Assemble experience html
    let expHtml = "";
    $("#exp-section .exp-item").each(function(){
        let title = $(this).find(".exp-title").val() || "Role / Title";
        let company = $(this).find(".exp-company").val() || "Company";
        let years = $(this).find(".exp-years").val() || "Years";
        let desc = $(this).find(".exp-desc").val();
        expHtml += `<div>
            <div class="resume-subtitle">${title} at ${company} <span class="resume-dates">${years}</span></div>`;
        if(desc) expHtml += `<div class="resume-desc">${desc}</div>`;
        expHtml += `</div><hr class="my-1">`;
    });

    // Skills
    let skillsHtml = "";
    if(skills) {
        let arr = skills.split(",").map(s=>s.trim()).filter(Boolean);
        skillsHtml = arr.length ? "<div class='resume-skills'>" + arr.map(s=>`<span>${s}</span>`).join("") + "</div>" : "";
    }

    // Render the assembled resume
    $("#resume-preview").html(`
      <div class="resume-title">${name}</div>
      <div class="resume-contact">${contact}</div>
      <div class="resume-summary mb-3">${summary}</div>

      <div class="resume-section">
        <h5>Education</h5>
        ${eduHtml || "<span class='text-muted'>No education entries.</span>"}
      </div>

      <div class="resume-section">
        <h5>Experience</h5>
        ${expHtml || "<span class='text-muted'>No experience entries.</span>"}
      </div>

      <div class="resume-section">
        <h5>Skills</h5>
        ${skillsHtml || "<span class='text-muted'>No skills added.</span>"}
      </div>
    `);
}

function addEducation() {
    $("#education-section").append(`
      <div class="edu-item mb-2 pb-2 border-bottom">
        <input type="text" class="form-control edu-school mb-1" placeholder="School / University">
        <input type="text" class="form-control edu-degree mb-1" placeholder="Degree / Program">
        <input type="text" class="form-control edu-years mb-1" placeholder="Years (e.g., 2020-2024)">
        <textarea class="form-control edu-desc mb-1" placeholder="Details, achievements (optional)"></textarea>
        <button type="button" class="btn btn-sm btn-link text-danger remove-edu">Delete</button>
      </div>
    `);
    renderResume();
}

function addExperience() {
    $("#exp-section").append(`
      <div class="exp-item mb-2 pb-2 border-bottom">
        <input type="text" class="form-control exp-title mb-1" placeholder="Role / Title">
        <input type="text" class="form-control exp-company mb-1" placeholder="Company">
        <input type="text" class="form-control exp-years mb-1" placeholder="Years (e.g., 2022-2024)">
        <textarea class="form-control exp-desc mb-1" placeholder="Job details, impact (optional)"></textarea>
        <button type="button" class="btn btn-sm btn-link text-danger remove-exp">Delete</button>
      </div>
    `);
    renderResume();
}

// Sample/reference resume metrics for comparison
const sampleResume = {
    educationCount: 3,
    experienceCount: 4,
    skillCount: 7,
    skillsExamples: ["JavaScript", "Python", "Project Management", "Communication", "Teamwork", "SQL", "Leadership"]
};

// Function to compare user's resume with sample
function compareResume() {
    let eduCount = $("#education-section .edu-item").length;
    let expCount = $("#exp-section .exp-item").length;
    let skills = $("#skills").val() || "";
    let skillsArr = skills.split(",").map(s => s.trim()).filter(Boolean);
    let skillsCount = skillsArr.length;

    let feedback = "<h5>Comparison Feedback</h5><ul>";

    // Education comparison
    if (eduCount >= sampleResume.educationCount) {
        feedback += `<li>Good job! You have ${eduCount} education entries, which meets or exceeds the sample average (${sampleResume.educationCount}).</li>`;
    } else {
        feedback += `<li>You have ${eduCount} education entries. Consider adding more to reach the sample average of ${sampleResume.educationCount} entries.</li>`;
    }

    // Experience comparison
    if (expCount >= sampleResume.experienceCount) {
        feedback += `<li>Great! You have ${expCount} experience entries, which meets or exceeds the sample average (${sampleResume.experienceCount}).</li>`;
    } else {
        feedback += `<li>Your experience entries count is ${expCount}. Try adding more roles/projects to match the sample average of ${sampleResume.experienceCount}.</li>`;
    }

    // Skills comparison
    if (skillsCount >= sampleResume.skillCount) {
        feedback += `<li>Excellent! You listed ${skillsCount} skills, meeting or exceeding the recommended ${sampleResume.skillCount} skills.</li>`;
    } else {
        // Suggest skills from sample not listed by user
        let missingSkills = sampleResume.skillsExamples.filter(s => !skillsArr.includes(s));
        feedback += `<li>You listed only ${skillsCount} skills. Adding more skills like <strong>${missingSkills.join(", ")}</strong> can strengthen your resume.</li>`;
    }

    feedback += "</ul>";

    $("#comparison-feedback").html(feedback);
}

$(function(){
    // Add one initial entry each on page load if none exist
    if($("#education-section .edu-item").length === 0) addEducation();
    if($("#exp-section .exp-item").length === 0) addExperience();

    // Button events
    $("#add-education").click(addEducation);
    $("#add-exp").click(addExperience);

    // Delegate deletion handlers
    $(document).on("click", ".remove-edu", function(){
        $(this).closest(".edu-item").remove();
        renderResume();
    });
    $(document).on("click", ".remove-exp", function(){
        $(this).closest(".exp-item").remove();
        renderResume();
    });

    // Update resume live on input change
    $("#resume-form").on("input", "input, textarea", renderResume);

    // Compare button click handler
    $("#compare-button").click(compareResume);

    // Initial render
    renderResume();
});
