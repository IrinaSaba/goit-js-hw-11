export default function renderCardAnimals(listOfAnimals) {
  const markup = listOfAnimals
    .map(animalCard => {
      // console.log(animalCard);
      return `<div class="photo-card">
                <img src="${animalCard.webformatURL}" alt="${animalCard.tags}" loading="lazy" width="350" height="200"/>
                  <div class="info">
                      <p class="info-item">
                        <b>Likes</b>
                        ${animalCard.likes}
                      </p>
                      <p class="info-item">
                        <b>Views</b>
                        ${animalCard.views}
                      </p>
                      <p class="info-item">
                        <b>Comments</b>
                        ${animalCard.comments}
                      </p>
                      <p class="info-item">
                        <b>Downloads</b>
                        ${animalCard.downloads}
                      </p>
                  </div>
              </div>`;
    })
    .join('');
  // console.log(markup);

  return markup;
}
