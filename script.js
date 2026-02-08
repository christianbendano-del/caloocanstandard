document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. MOBILE MENU & SUB-MENU LOGIC
    // ==========================================
    const menuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('main-nav');
    const overlay = document.getElementById('menu-overlay');

    if (menuBtn && navMenu && overlay) {
        // Main Hamburger Toggle
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Isara ang menu kapag clinick ang overlay
        overlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
            closeAllSubMenus();
        });
    }

    // Toggle Sub-menu on Click (Mobile Only)
    // Hahanapin nito ang mga <a> tag na nasa loob ng .has-dropdown
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Pigilan ang paglipat ng page
                e.stopPropagation(); // Pigilan ang pag-close ng main menu
                
                const parentLi = this.parentElement;
                const subMenu = this.nextElementSibling; // Ang <ul> sa ilalim ng <a>

                if (subMenu && subMenu.classList.contains('sub-menu')) {
                    // Accordion Effect: Isara ang ibang sub-menu na bukas
                    document.querySelectorAll('.sub-menu.open').forEach(openSub => {
                        if (openSub !== subMenu) {
                            openSub.classList.remove('open');
                            openSub.parentElement.classList.remove('active-drop');
                        }
                    });

                    // I-toggle ang kasalukuyang sub-menu
                    subMenu.classList.toggle('open');
                    parentLi.classList.toggle('active-drop');
                }
            }
        });
    });

    function closeAllSubMenus() {
        document.querySelectorAll('.sub-menu').forEach(sub => sub.classList.remove('open'));
        document.querySelectorAll('.has-dropdown').forEach(li => li.classList.remove('active-drop'));
    }

   const slides = document.querySelectorAll('.bg-slide');
let currentIdx = 0;

function changeBackground() {
    slides[currentIdx].classList.remove('active');
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add('active');
}

// Magpapalit ang picture every 3 seconds
setInterval(changeBackground, 3000);

    // ==========================================
    // 3. ABOUT US TIMELINE (Scroll Observer)
    // ==========================================
    const timelineItems = document.querySelectorAll(".timeline-item");
    
    if (timelineItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-48% 0px -48% 0px", 
            threshold: 0
        };

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById('subToggle');
    const menu = document.getElementById('subMenuList');

    if (btn && menu) {
        btn.onclick = function(e) {
            e.stopPropagation();
            menu.classList.toggle('is-open');
            console.log("Sub-menu is now: " + (menu.classList.contains('is-open') ? "OPEN" : "CLOSED"));
        };

        
        document.addEventListener('click', function() {
            menu.classList.remove('is-open');
        });
    }
});


document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
    
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
   
        button.classList.add('active');
        
        
        console.log("Switching to: " + button.innerText);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById('categoryToggle');
    const menu = document.getElementById('categoryMenu');
    const pageName = document.getElementById('current-category-name');

    
    const activeLink = document.querySelector('.tab-btn.active');
    if (activeLink && pageName) {
        pageName.innerText = activeLink.innerText;
    }

    if (toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('show');
           
            const icon = this.querySelector('i');
            icon.style.transform = menu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        document.addEventListener('click', () => {
            menu.classList.remove('show');
            if(toggle.querySelector('i')) toggle.querySelector('i').style.transform = 'rotate(0deg)';
        });
    }
});
//search bar
function filterBrands() {
    let input = document.getElementById('brandSearch').value.toLowerCase();
    let cards = document.querySelectorAll('.brand-card');

    cards.forEach(card => {
       
        let img = card.querySelector('img');
        if (img) {
            let brandName = img.alt.toLowerCase();
            if (brandName.includes(input)) {
                card.style.display = ""; // Ipakita
            } else {
                card.style.display = "none"; // Itago
            }
        }
    });
}
function toggleModernContact() {
    const stack = document.getElementById('contactStack');
    stack.classList.toggle('active');
}
const form = document.getElementById("my-form"); // Siguraduhing ang <form id="my-form">
const modal = document.getElementById("thankYouModal");
const btn = document.getElementById("submit-button");

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    // Loading State
    btn.disabled = true;
    btn.innerHTML = "Sending...";

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            // Ipakita ang Pop-up
            modal.style.display = "flex";
            form.reset();
        } else {
            alert("Oops! May problema sa pag-submit. Pakisubukang muli.");
        }
    }).catch(error => {
        alert("Oops! May error sa koneksyon.");
    }).finally(() => {
        btn.disabled = false;
        btn.innerHTML = "<span>Submit Application</span> <i class='fas fa-paper-plane'></i>";
    });
}

function closeModal() {
    modal.style.display = "none";
}

form.addEventListener("submit", handleSubmit);
async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    btn.disabled = true;
    btn.innerHTML = "Sending...";

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            // 1. Ipakita ang Pop-up
            modal.style.display = "flex";
            
            // 2. FIRE THE CONFETTI!
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#a00', '#1a1a40', '#ffffff'] // Maroon, Dark Blue, and White
            });

            form.reset();
        } else {
            alert("Oops! May problema sa pag-submit.");
        }
    }).catch(error => {
        alert("Oops! May error sa koneksyon.");
    }).finally(() => {
        btn.disabled = false;
        btn.innerHTML = "<span>Submit Application</span> <i class='fas fa-paper-plane'></i>";
    });
}

// news section pitstop
function scrollNews(amount) {
    const wrapper = document.getElementById('newsWrapper');
    wrapper.scrollBy({
        left: amount,
        behavior: 'smooth'
    });
}