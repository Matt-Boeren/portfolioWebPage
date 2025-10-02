const container = document.getElementById("projects");

fetch('files/projects.json')
.then(response => response.json())
.then(data => {
    const jsonData = data.projects;

    if (Array.isArray(jsonData)) {
        for (let i = 0; i < jsonData.length; i++) {
            const project = jsonData[i];
            if(project.professional){
                const imageUrl = project.images[0]; 
                const altText = project.title || 'No title provided';
                const id = project.id;
                let link = '#';
                if(project.id !== undefined){
                    link = 'landingPage.html?id=' + id;
                }
                const atag = document.createElement('a');
                atag.href = link;
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = altText;

                atag.appendChild(img);

                const ptag = document.createElement('p');
                ptag.textContent = project.title;

                atag.appendChild(ptag);

                container.appendChild(atag);
            }
        }
    } else {
        console.error('Projects data is not an array:', jsonData);
    }
}).catch(error => {
    console.error('Error fetching projects:', error);
});
