const deleteBtnElements = document.querySelectorAll('.portfolio-container button');

deleteBtnElements.forEach(function(deleteBtn){
    deleteBtn.addEventListener('click', async function(e){
        const portfolioId = e.target.dataset.id;
        const csrfToken = e.target.dataset.csrf;

        console.log(csrfToken);
        deleteBtn.parentElement.parentElement.remove();
        const response = await fetch(`/portfolio/${portfolioId}?_csrf=${csrfToken}`, {
            method: 'DELETE',
        });

    
        if(!response.ok){
            alert('Something Went Wrong!');
            return;
        }


    });
})