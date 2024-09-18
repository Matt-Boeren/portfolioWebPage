const container = document.getElementById("projects");

fetch('files/projects.json')
  .then(response => response.json())
  .then(data => {
    const jsonData = data.projects;

    console.log('Projects Data:', jsonData);

    if (Array.isArray(jsonData)) {
      let htmlContent = '';
      for (let i = 0; i < jsonData.length; i++) {
        const project = jsonData[i];
        const imageUrl = project.images[0] || 'default-image.jpg'; 
				const altText = project.title || 'No title provided';
				const id = project.id;
				let link = '#';
				if(project.id !== undefined){
					link = 'landingPage.html?id=' + id;
				}

        htmlContent += `
					<a href="${link}">
            <img src="${imageUrl}" alt="${altText}">
						<p>${project.title}</p>
					</a>
        `;
      }
      container.innerHTML = htmlContent;
    } else {
      console.error('Projects data is not an array:', jsonData);
    }
  })
  .catch(error => {
    console.error('Error fetching projects:', error);
  });
