document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const resumeNav = document.querySelectorAll('.resume-nav li');
    const resumeContent = document.querySelectorAll('.resume-content');

    // Navigation handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.getAttribute('data-section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            navLinks.forEach(nav => nav.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Resume tab handling
    resumeNav.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-tab');
            resumeNav.forEach(nav => nav.classList.remove('active'));
            e.target.classList.add('active');
            resumeContent.forEach(content => {
                if (content.getAttribute('data-content') === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    const items = Array.from(track.children);

    let currentIndex = 0;

    // Ensure the track width is calculated dynamically
    const updateCarouselWidth = () => {
        const itemWidth = items[0].getBoundingClientRect().width;
        items.forEach((item, index) => {
            item.style.left = `${index * itemWidth}px`;
        });
        return itemWidth;
    };

    let itemWidth = updateCarouselWidth();

    // Recalculate item width on window resize
    window.addEventListener('resize', () => {
        itemWidth = updateCarouselWidth();
        moveToItem(currentIndex); // Ensure the carousel stays in the correct position
    });

    const moveToItem = (index) => {
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        currentIndex = index;

        // Disable buttons if at the start or end of the carousel
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === items.length - 1;
    };

    // Initialize button states
    moveToItem(currentIndex);

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToItem(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            moveToItem(currentIndex + 1);
        }
    });

    // Modal functionality
    const modal = document.getElementById('project-modal');
    const modalImagesContainer = modal.querySelector('.modal-images');
    const closeModal = modal.querySelector('.close-modal');
    const viewMoreButtons = document.querySelectorAll('.view-more');

    // Project images data
    const projectImages = {
        'frontend-project': [
            'Front end Project/No exit web.png',
            'Front end Project/PortFMe.png',
            'Front end Project/Screenshot (2).png'
        ],
        'graphic-design': [
            'Graphic design project/119939331_966942300439645_7813440932499370439_n.jpg',
            'Graphic design project/171419800_1103409623459578_4737308339487403555_n.jpg',
            'Graphic design project/Asset 1.png',
            'Graphic design project/Asset 2.png',
            'Graphic design project/Asset 3.png',
            'Graphic design project/Business Card 1.png',
            'Graphic design project/Byte Menders 1.png',
            'Graphic design project/Byte Menders 2 developed.png',
            'Graphic design project/C3 Envelope 4.png',
            'Graphic design project/Dimpho.png',
            'Graphic design project/First logo.png',
            'Graphic design project/Maeba.jpg',
            'Graphic design project/No Exit 2.jpg',
            'Graphic design project/No Exit Creative 2.jpg',
            'Graphic design project/No Exit Creative.jpg',
            'Graphic design project/No Exit Green 2.jpg',
            'Graphic design project/No Exit New.jpg',
            'Graphic design project/PC Repairs Poster.jpg',
            'Graphic design project/Pod 4 Final.jpg',
            'Graphic design project/PRJCT.jpg',
            'Graphic design project/Zero Verge Logo 3d.png'
        ]
    };

    // Open modal and display images
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectKey = e.target.getAttribute('data-project');
            const images = projectImages[projectKey];

            // Clear previous images
            modalImagesContainer.innerHTML = '';

            // Add images to modal
            images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Image for ${projectKey}`;
                modalImagesContainer.appendChild(img);
            });

            // Show modal
            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});