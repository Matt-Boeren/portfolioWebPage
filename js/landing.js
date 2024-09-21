const container = document.getElementById("page");

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
console.log(id);
fetch('files/projects.json')
  .then(response => response.json())
  .then(data => {
    const jsonData = data.projects;

    if (Array.isArray(jsonData)) {
      let htmlContent = ''; // Declare htmlContent once
      for (let i = 0; i < jsonData.length; i++) {
				console.log(i);
        const project = jsonData[i];
        const projectID = project.id;
				console.log(id);
				console.log(projectID); 
        if (id === projectID) {
          const imageUrls = project.images || []; // Ensure imageUrls is defined
          const title = project.title || 'No title provided';
          const page = project.page || ''; // Ensure page is defined

          htmlContent += `<h1>${title}</h1>`;
					document.title = title;
          for (let j = 0; j < imageUrls.length; j++) {
            htmlContent += `<img src="${imageUrls[j]}" alt="${title} ${j}">`;
          }
          htmlContent += page;
          break; // Exit loop once the matching project is found
        }
      }

      container.innerHTML = htmlContent;
      console.log(htmlContent);
    } else {
      console.error('Projects data is not an array:', jsonData);
    }
  })
  .catch(error => {
    console.error('Error fetching projects:', error);
  });
