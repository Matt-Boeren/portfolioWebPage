const container = document.getElementById("page");

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
fetch('files/projects.json')
  .then(response => response.json())
  .then(data => {
    const jsonData = data.projects;

    if (Array.isArray(jsonData)) {
      for (let i = 0; i < jsonData.length; i++) {
        const project = jsonData[i];
        const projectID = project.id;
        if (id === projectID) {
          const imageUrls = project.images || [];
          const title = project.title || 'No title provided';
          const page = project.page || ''; 
					const h1 = document.createElement("h1");

          h1.textContent = title;
					document.title = title;
					container.appendChild(h1);
          for (let j = 0; j < imageUrls.length; j++) {
						const img = document.createElement("img");
						img.src = imageUrls[j];
						img.alt = title + " " + j;
						container.appendChild(img);
          }
					let lastelement = null;
					for (let j = 0; j < page.length; j++) {
						const element = document.createElement(page[j].tag);
						element.textContent = page[j].content;

						if (Object.hasOwn(page[j], 'attributes')) {
							const attrKeys = Object.keys(page[j].attributes);
							for (let k = 0; k < attrKeys.length; k++) {
								const key = attrKeys[k];
								element.setAttribute(key, page[j].attributes[key]);
							}
						}
						if(Object.hasOwn(page[j], 'parent')){
							lastelement.appendChild(element);
						}
						else{
							container.appendChild(element);
							lastelement = element;
						}
					}
          break; 
        }
      }

    } else {
      console.error('Projects data is not an array:', jsonData);
    }
  })
  .catch(error => {
    console.error('Error fetching projects:', error);
  });
