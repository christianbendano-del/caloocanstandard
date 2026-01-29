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

        // Isara pag clinick sa labas
        document.addEventListener('click', function() {
            menu.classList.remove('is-open');
        });
    }
});

//product tab
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Alisin ang active class sa lahat
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        // Idagdag sa pinindot
        button.classList.add('active');
        
        // Dito mo pwedeng i-filter yung grid kung may ibang data ka na
        console.log("Switching to: " + button.innerText);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById('categoryToggle');
    const menu = document.getElementById('categoryMenu');
    const pageName = document.getElementById('current-category-name');

    // Hanapin kung aling link ang active at i-update ang text sa mobile box
    const activeLink = document.querySelector('.tab-btn.active');
    if (activeLink && pageName) {
        pageName.innerText = activeLink.innerText;
    }

    if (toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('show');
            
            // Rotate arrow icon
            const icon = this.querySelector('i');
            icon.style.transform = menu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        // Isara ang menu pag nag-click sa labas
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
        // Hahanapin ang name sa 'alt' attribute ng img sa loob ng card
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