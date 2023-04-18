const portfolioItems = document.querySelectorAll(".portfolio-preview-item");

portfolioItems.forEach(function (portfolioItem) {
  portfolioItem.addEventListener("mouseover", function (e) {
    portfolioItem.id = "active";

    const paragraphElements = portfolioItem.querySelectorAll("p");
    const previewHeadingElement = portfolioItem.querySelector(".portfolio-preview-info");

    for(paragraphElement of paragraphElements){
        paragraphElement.style.display = 'none';
    }


    portfolioItem.style.height = "16rem";
    portfolioItem.style.width = "26.5rem";
    portfolioItem.style.padding = "0";

    previewHeadingElement.classList.add('mouse-over');
    previewHeadingElement.firstElementChild.firstElementChild.style.fontSize = '2rem';



    setTimeout(() => {
      portfolioItem.style.height = "15rem";
      portfolioItem.style.width = "25rem";

        previewHeadingElement.classList.remove('mouse-over');
        previewHeadingElement.firstElementChild.firstElementChild.style.fontSize = '';

        for(paragraphElement of paragraphElements){
            paragraphElement.style.display = "inline";
        }

        }, 1000);
  });
});
