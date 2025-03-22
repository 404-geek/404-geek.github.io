document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        { name: "KYC System @ Natixis", link: "https://github.com/yourusername/kyc-system" },
        { name: "GSoC '24 Contribution", link: "https://github.com/yourusername/gsoc-project" },
        { name: "FinTech API Service", link: "https://github.com/yourusername/fintech-api" }
    ];

    const projectContainer = document.querySelector(".project-list");

    projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.innerHTML = `<h3>${project.name}</h3><a href="${project.link}" target="_blank">View on GitHub</a>`;
        projectContainer.appendChild(projectElement);
    });
});
