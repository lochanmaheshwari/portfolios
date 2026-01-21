// ============================================
// LANDING PAGE - WHO'S WATCHING
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const clickOverlay = document.getElementById('click-overlay'); // Unused now
    const introAnimation = document.getElementById('intro-animation');
    const landingScreen = document.getElementById('landing-screen');
    const mainSite = document.getElementById('main-site');
    const profileCards = document.querySelectorAll('.profile-card');
    const audio = document.getElementById('netflix-sound');
    const heroVideo = document.getElementById('hero-video');

    // 1. Manual Start Sequence (Logo + Play Button)
    const introBtn = document.getElementById('intro-play-btn');

    try {
        console.log("Ready for Intro...");

        // Show Intro (Static)
        if (introAnimation) {
            introAnimation.style.display = 'flex';
            introAnimation.style.opacity = '1';
            introAnimation.style.visibility = 'visible';
            introAnimation.classList.add('active');
            introAnimation.classList.add('active');
            // Static Name on Load
            introAnimation.classList.remove('play'); // Wait for Zoom Trigger
        }

        // Hide Landing Screen
        if (landingScreen) {
            landingScreen.classList.remove('active');
            landingScreen.style.display = 'none';
        }

        // Handle Play Click
        if (introBtn) {
            introBtn.addEventListener('click', () => {
                console.log("Starting Intro...");
                introBtn.style.display = 'none'; // Hide button
                introBtn.style.display = 'none'; // Hide button

                // Restart Animation
                introAnimation.classList.remove('appear');
                void introAnimation.offsetWidth; // Trigger reflow
                introAnimation.classList.add('appear');

                introAnimation.classList.add('play'); // Start Animation Zoom

                // Play Audio
                const tadum = new Audio('Netflix_New_Logo_Animation_2019_128k.mp3');
                tadum.volume = 1.0;
                tadum.play().catch(e => console.error("Audio failed:", e));

                // Transition to Who's Watching after 3.5s
                setTimeout(() => {
                    introAnimation.classList.remove('active');
                    setTimeout(() => {
                        introAnimation.style.display = 'none';
                        // Show Who's Watching
                        landingScreen.style.display = 'flex';
                        landingScreen.style.opacity = '0';
                        // Small delay for transition
                        setTimeout(() => {
                            landingScreen.classList.add('active');
                            landingScreen.style.opacity = '1';
                            landingScreen.style.visibility = 'visible';
                        }, 50);
                    }, 500);
                }, 3500);
            });
        }

    } catch (e) {
        console.error("Init logic error:", e);
    }

    // Loop Video between 8s and 18s
    if (heroVideo) {
        heroVideo.addEventListener('timeupdate', function () {
            if (this.currentTime >= 18) {
                this.currentTime = 8;
                this.play();
            }
        });
    }

    // 2. Handle profile card clicks -> Main Site (Intro already played)
    profileCards.forEach(card => {
        card.addEventListener('click', function () {
            // Hide "Who's Watching"
            landingScreen.classList.remove('active');
            setTimeout(() => landingScreen.style.display = 'none', 500);

            // Show Main Site Immediately
            mainSite.classList.add('active');

            // Trigger Hero Content Animation
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                setTimeout(() => heroContent.classList.add('active'), 100);
            }

            // Play Background Video
            if (heroVideo) {
                heroVideo.currentTime = 8;
                heroVideo.play().catch(console.error);
            }
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    });

    // ============================================
    // SMOOTH SCROLLING FOR NAVBAR LINKS
    // ============================================
    const navLinks = document.querySelectorAll('.nav-links a, .hero-cta');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // JOURNEY SECTION - YEAR CARDS
    // ============================================
    const journeyCards = document.querySelectorAll('.journey-card');
    const journeyModal = document.getElementById('journey-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    // Journey data with all content
    const journeyData = {
        'saasflash': {
            title: 'SaasFlash — Creative Director',
            subtitle: 'Leading Teams & Scaling Brands',
            description: `Commanding the creative vision for SaasFlash, I lead an elite squad of 8 writers and 20 editors to dominate the SaaS media landscape. My portfolio includes crafting high-stakes narratives for industry titans like <strong>Greg Isenberg</strong> and <strong>Perplexity</strong>, and decoding the future with <strong>Evolving AI</strong>, <strong>Kalshi</strong>, and <strong>RPN</strong>. From deep-tech breakdowns to viral storytelling, I engineer content that scales brands to <strong>Million+ followers</strong> and drives massive engaged communities.`,
            tweet: `<blockquote class="twitter-tweet" data-theme="dark"><a href="https://twitter.com/shiri_shh/status/2007137787359965423"></a></blockquote>`,
            videos: [
                'https://www.instagram.com/reel/DS5Aq6NDIIS/embed',
                'https://www.instagram.com/reel/DSuwrrKDLmw/embed',
                'https://www.instagram.com/reel/DPHjYATEp1t/embed',
                'https://www.instagram.com/reel/DN6FoIzD8ux/embed',
                'https://www.instagram.com/reel/DMQp_KYsVxH/embed',
                'https://www.instagram.com/reel/DLsgQ1rMALV/embed',
                'https://www.instagram.com/reel/DKAL5w3sD3k/embed'
            ],
            projects: [
                {
                    name: 'Perplexity',
                    description: 'AI search content',
                    videos: [
                        'https://www.instagram.com/p/DMGfUj6pesc/embed'
                    ]
                },
                {
                    name: 'Greg Isenberg',
                    description: 'Startup strategy',
                    videos: [
                        'https://www.instagram.com/p/DKx942YJCeN/embed',
                        'https://www.instagram.com/p/DNOMZ4pRntv/embed',
                        'https://www.instagram.com/p/DMXv8TgME7M/embed'
                    ]
                },
                {
                    name: 'Den Donovan',
                    description: 'Creator economy',
                    videos: [
                        'https://www.instagram.com/p/DOoFeiUkyzz/embed',
                        'https://www.instagram.com/p/DOJGupBkv79/embed',
                        'https://www.instagram.com/p/DMxYM4Vx76c/embed'
                    ]
                }
            ]
        },
        'juneandlochan': {
            title: 'June & Lochan',
            subtitle: 'Creator & Builder',
            description: `Building a cult community. Scaled from 0 to 50K followers in just 1 month.`,
            videos: [
                'https://www.instagram.com/reel/DTozi9KgVN7/embed',
                'https://www.instagram.com/reel/DSW4HSBAX7i/embed'
            ]
        },
        'survivingai': {
            title: 'Surviving AI',
            subtitle: 'AI Media',
            description: `Decoding the future of Artificial Intelligence for the masses. Making complex tech accessible.`,
            videos: [
                'https://www.instagram.com/reel/DSNVudxj3uF/embed',
                'https://www.instagram.com/p/DQ62JwGj6Gr/embed'
            ]
        },
        'beyonddegree': {
            title: 'Beyond Degree',
            subtitle: 'EdTech Media',
            description: `Redefining education narratives and exploring alternative learning paths.`,
            videos: [
                'https://www.instagram.com/reel/DMIQRbaMH9b/embed',
                'https://www.instagram.com/reel/DQotgn-gS63/embed'
            ]
        },
        '2024': {
            title: '2024 — Breaking into FinTech',
            subtitle: 'Yaas (Varun Mayya\'s Company) — Content Strategist',
            description: 'Turning complex finance into simple stories.',
            projects: [
                {
                    name: 'Markets by Zerodha',
                    growth: '30K → 100K subscribers',
                    strategy: 'Simplify trading for beginners',
                    videos: [
                        'https://www.youtube.com/embed/gLpyaHLuQVo',
                        'https://www.youtube.com/embed/Kf0SV7aZXfI'
                    ]
                },
                {
                    name: 'Binge Wealth',
                    growth: '20K → 150K followers',
                    strategy: 'Financial storytelling meets lifestyle',
                    videos: [
                        'https://www.instagram.com/p/DFIYngSzJhb/embed',
                        'https://www.instagram.com/p/DDZiMrJTW-J/embed'
                    ]
                }
            ]
        },
        '2023-24': {
            title: '2023-24 — Scaling EdTech Brands',
            subtitle: 'Brand Flow Media — Content Strategist',
            description: `Worked with India's biggest EdTech names: GeeksforGeeks, Sahil Gogna, Kodnest, Coding Ninjas, PhysicsWallah`,
            projects: [
                {
                    name: 'GeeksforGeeks',
                    problem: 'Weak hooks, no trends, no personality',
                    solution: 'Trend analysis, script hooks, storytelling',
                    videos: [
                        'https://www.youtube.com/embed/cC8MjoYGedk',
                        'https://www.youtube.com/embed/9yBY0BOZhUE',
                        'https://www.youtube.com/embed/jOMxKsUd6e0',
                        'https://www.youtube.com/embed/tiFIf_nUCZc',
                        'https://www.youtube.com/embed/wn0btNJ65ws'
                    ]
                },
                {
                    name: 'Sahil Gogna',
                    growth: '480 → 150K followers',
                    videos: [
                        'https://www.instagram.com/p/C4LNOdOOVg4/embed',
                        'https://www.youtube.com/embed/V1g3Ms4bRgc'
                    ]
                }
            ]
        },
        '2023': {
            title: '2023 — Fix Health',
            subtitle: 'Product Manager & Content Writer',
            description: `First exposure to conversion-focused content and community management.`,
            videos: [
                'https://www.youtube.com/embed/O_h6jEXRtUY'
            ]
        },
        '2021': {
            title: '2021 — The Beginning',
            subtitle: 'National Institute of Technology, Karnataka',
            description: `During the pandemic, college went online — I saw an opportunity to connect people. Created NIT Mechanics.`,
            videos: [
                'https://www.youtube.com/embed/8uRB1bVhKJQ'
            ]
        }
    };

    // Function to generate video HTML
    function generateVideoHTML(url) {
        return `<div class="video-item"><iframe src="${url}" allowfullscreen loading="lazy"></iframe></div>`;
    }

    // Function to generate journey modal content
    function generateJourneyContent(year) {
        const data = journeyData[year];
        if (!data) return '';

        let html = `
            <div class="modal-header">
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-subtitle">${data.subtitle}</p>
            </div>
        `;

        if (data.description) {
            html += `
                <div class="modal-section">
                    <h3>Overview</h3>
                    <p>${data.description}</p>
                </div>
            `;
        }

        // Media Gallery (Tweet + Videos)
        if (data.tweet || (data.videos && data.videos.length > 0)) {
            html += `<div class="modal-section">`;

            // Tweet
            if (data.tweet) {
                html += `
                    <div style="display: flex; justify-content: center; margin-bottom: 2rem; width: 100%;">
                        ${data.tweet}
                    </div>
                `;
            }

            // Videos
            if (data.videos && data.videos.length > 0) {
                html += `
                    <div class="video-grid">
                        ${data.videos.map(video => generateVideoHTML(video)).join('')}
                    </div>
                `;
            }

            html += `</div>`;
        }

        // Extra details (responsibilities, etc.) 
        // (Assuming existing structure is fine for now, user didn't request changes here)

        if (data.projects) {
            data.projects.forEach(project => {
                html += `<div class="modal-section">`;
                html += `<h3>${project.name}</h3>`;

                if (project.description) {
                    html += `<p>${project.description}</p>`;
                }
                if (project.growth) {
                    html += `<p style="color: #4ade80; font-weight: 600;">Growth: ${project.growth}</p>`;
                }
                if (project.strategy) {
                    html += `<p><strong>Strategy:</strong> ${project.strategy}</p>`;
                }
                if (project.problem) {
                    html += `<p><strong>Problems:</strong> ${project.problem}</p>`;
                }
                if (project.solution) {
                    html += `<p><strong>Solutions:</strong> ${project.solution}</p>`;
                }

                if (project.videos && project.videos.length > 0) {
                    html += `<div class="video-grid">`;
                    project.videos.forEach(video => {
                        html += generateVideoHTML(video);
                    });
                    html += `</div>`;
                }

                html += `</div>`;
            });
        }

        return html;
    }

    // Handle journey card clicks
    journeyCards.forEach(card => {
        card.addEventListener('click', function () {
            const year = this.getAttribute('data-year');
            const content = generateJourneyContent(year);

            modalBody.innerHTML = content;
            journeyModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll

            // Reload Twitter widgets if present
            if (window.twttr) {
                window.twttr.widgets.load();
            }
        });
    });

    // Close journey modal
    modalClose.addEventListener('click', function () {
        journeyModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    journeyModal.addEventListener('click', function (e) {
        if (e.target === journeyModal) {
            journeyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ============================================
    // PROJECT SECTION - PROJECT CARDS
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('project-modal');
    const projectModalBody = document.getElementById('project-modal-body');
    const projectModalClose = document.getElementById('project-modal-close');

    // Project data
    const projectData = {
        'saasflash': {
            name: 'SaasFlash',
            image: 'assets/saasflash1.png',
            growth: '30K → 115K',
            role: 'Creative Director',
            description: '10 Million+ Views from 12 Videos. Leading a team of 8 writers and 20 editors, scaling multiple creator-led SaaS brands.',
            metrics: [
                '10M+ Views from 12 Videos',
                'Managing team of 8 writers & 20 editors',
                'Scaled SaasFlash from 30K to 100K'
            ],
            videos: [
                'https://www.instagram.com/p/DPHjYATEp1t/embed',
                'https://www.instagram.com/p/DN6FoIzD8ux/embed',
                'https://www.instagram.com/p/DMQp_KYsVxH/embed',
                'https://www.instagram.com/p/DLsgQ1rMALV/embed',
                'https://www.instagram.com/p/DKAL5w3sD3k/embed'
            ]
        },
        'greg': {
            name: 'Greg Isenberg',
            image: 'assets/greg1.png',
            growth: '15K → 78K',
            role: 'Writer / Strategist',
            description: '10 Million+ Views from 12 Videos. Crafted startup strategy content that resonated with entrepreneurs and builders.',
            metrics: [
                '10M+ Views from 12 Videos',
                'Grew from 15K to 60K followers',
                'Viral Instagram reels'
            ],
            videos: [
                'https://www.instagram.com/p/DKx942YJCeN/embed',
                'https://www.instagram.com/p/DNOMZ4pRntv/embed',
                'https://www.instagram.com/p/DMXv8TgME7M/embed'
            ]
        },
        'den': {
            name: 'Den Donovan',
            image: 'assets/den.png',
            growth: '20 Million+ Views',
            role: 'Content Director',
            description: 'Creator economy content that educated and inspired fellow content creators.',
            metrics: [
                'Grew from 70K to 80K followers',
                'Creator economy focus',
                'Educational content'
            ],
            videos: [
                'https://www.instagram.com/p/DOoFeiUkyzz/embed',
                'https://www.instagram.com/p/DOJGupBkv79/embed',
                'https://www.instagram.com/p/DMxYM4Vx76c/embed'
            ]
        },
        'evolving': {
            name: 'Evolving AI',
            image: 'assets/evolving.png',
            growth: '10M+ Views',
            role: 'Content Lead',
            description: '10 Million+ Views from 12 Videos. Decoding the future of Artificial Intelligence for the masses.',
            metrics: [
                '10M+ Views from 12 Videos',
                'Making complex tech accessible',
                'Viral AI Narratives'
            ],
            videos: [
                'https://www.instagram.com/reel/DSNVudxj3uF/embed',
                'https://www.instagram.com/p/DQ62JwGj6Gr/embed'
            ]
        },
        'personal': {
            name: 'June & Lochan',
            image: 'assets/june.png',
            growth: '0 → 50K (1 month)',
            role: 'Creator',
            description: 'My personal brand showcasing authentic storytelling and creative content.<br><br><a href="https://www.instagram.com/juneandlochan/" target="_blank" style="color: #e50914; text-decoration: none; font-weight: bold;">View on Instagram &rarr;</a>',
            metrics: [
                'Grew from 0 to 50K in just 1 month',
                'Personal brand storytelling',
                'Authentic creative content'
            ],
            videos: [
                'https://www.instagram.com/reel/DTozi9KgVN7/embed',
                'https://www.instagram.com/reel/DTqDpAVgX3D/embed'
            ]
        },
        'beyond': {
            name: 'Beyond Degree',
            image: 'assets/beyond.png',
            growth: '0 → 30K Views',
            role: 'Founder',
            description: 'Redefining education narratives and building a new age media company for students.<br><br><a href="https://www.instagram.com/beyonddegree.ig/" target="_blank" style="color: #e50914; text-decoration: none; font-weight: bold;">View on Instagram &rarr;</a>',
            metrics: [
                'Building an EdTech media brand',
                'Focus on student narratives',
                'Innovative content formats'
            ],
            videos: [
                'https://www.instagram.com/reel/DMIQRbaMH9b/embed',
                'https://www.instagram.com/reel/DQotgn-gS63/embed',
                'https://www.instagram.com/reel/DSQVeHxk90s/embed'
            ]
        },
        'keshav': {
            name: 'Keshav Grower',
            image: 'assets/keshav.png',
            growth: '15K → 142K',
            role: 'Marketing Manager',
            description: 'Strategic content for MBA aspirants, blending humor with high-value educational insights.',
            metrics: [
                'Growing community of MBA aspirants',
                'Engaging educational content',
                'Brand building strategy'
            ],
            videos: [
                'https://www.instagram.com/keshavgrower/embed'
            ]
        },
        'gfg': {
            name: 'GeeksforGeeks',
            image: 'assets/geeks.png',
            growth: '400K → 1.1 Million',
            role: 'Content Strategist',
            description: 'Transformed GFG\'s content strategy with trend analysis, engaging hooks, and personality-driven storytelling.',
            metrics: [
                'Achieved 1.1M+ subscribers',
                'Implemented trend-based content strategy',
                'Created viral shorts and long-form content'
            ],
            videos: [
                'https://www.youtube.com/embed/cC8MjoYGedk',
                'https://www.youtube.com/embed/9yBY0BOZhUE',
                'https://www.youtube.com/embed/tiFIf_nUCZc',
                'https://www.youtube.com/embed/wn0btNJ65ws',
                'https://www.youtube.com/embed/EFNScX1e14o'
            ]
        },
        'sahil': {
            name: 'Sahil Gogna',
            image: 'assets/sahil.png',
            growth: '0 → 150K',
            role: 'Writer / Director',
            description: 'Built a Canadian data enthusiast community from scratch through strategic content and engaging storytelling.',
            metrics: [
                'Grew from 480 to 150K followers',
                'Created viral Instagram reels',
                'Produced educational YouTube content'
            ],
            videos: [
                'https://www.instagram.com/p/C4LNOdOOVg4/embed',
                'https://www.instagram.com/p/C3z_rz2rOLr/embed',
                'https://www.instagram.com/p/DCHKFHBxKXt/embed',
                'https://www.youtube.com/embed/V1g3Ms4bRgc'
            ]
        },
        'binge': {
            name: 'Binge Wealth',
            image: 'assets/binge.png',
            growth: '20K → 150K',
            role: 'Strategist',
            description: 'Combined financial storytelling with lifestyle content to create a unique brand voice.',
            metrics: [
                'Grew from 20K to 150K followers',
                'Financial storytelling meets lifestyle',
                'Created engaging Instagram content'
            ],
            videos: [
                'https://www.instagram.com/p/DFIYngSzJhb/embed',
                'https://www.instagram.com/p/DDZiMrJTW-J/embed'
            ]
        },
        'zerodha': {
            name: 'Markets by Zerodha',
            image: 'assets/zerodha.png',
            growth: '30K → 100K',
            role: 'Content Strategist',
            description: 'Simplified complex trading concepts for beginners, making finance accessible and engaging.',
            metrics: [
                'Grew from 30K to 100K subscribers',
                'Simplified trading for beginners',
                'Created engaging financial content'
            ],
            videos: [
                'https://www.youtube.com/embed/gLpyaHLuQVo',
                'https://www.youtube.com/embed/Kf0SV7aZXfI'
            ]
        }
    };

    // Function to generate project modal content
    function generateProjectContent(projectId) {
        const data = projectData[projectId];
        if (!data) return '';

        let html = `
            <div class="modal-header">
                ${data.image ? `<img src="${data.image}" alt="${data.name}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 1rem; object-fit: cover; border: 3px solid #e50914; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">` : ''}
                <h2 class="modal-title">${data.name}</h2>
                <p class="modal-subtitle">${data.role}</p>
                <p style="color: #4ade80; font-size: 1.5rem; font-weight: 600; margin-top: 0.5rem;">${data.growth}</p>
            </div>
            <div class="modal-section">
                <h3>Overview</h3>
                <p>${data.description}</p>
            </div>
            <div class="modal-section">
                <h3>Impact & Metrics</h3>
                <ul>
                    ${data.metrics.map(metric => `<li>${metric}</li>`).join('')}
                </ul>
            </div>
        `;

        if (data.videos && data.videos.length > 0) {
            html += `
                <div class="modal-section">
                    <h3>Work Samples</h3>
                    <div class="video-grid">
                        ${data.videos.map(video => generateVideoHTML(video)).join('')}
                    </div>
                </div>
            `;
        }

        return html;
    }

    // Handle project card clicks
    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const content = generateProjectContent(projectId);

            projectModalBody.innerHTML = content;
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close project modal
    projectModalClose.addEventListener('click', function () {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    projectModal.addEventListener('click', function (e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
});

// ============================================
// PROFILE SWITCHER LOGIC (Appended)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const currentProfileIcon = document.getElementById('current-profile-icon');
    const profileOptions = document.querySelectorAll('.profile-option');
    const profileCards = document.querySelectorAll('.profile-card');

    // 1. Handle Dropdown Selection
    profileOptions.forEach(option => {
        option.addEventListener('click', () => {
             const newIcon = option.querySelector('.mini-avatar').cloneNode(true);
             if(currentProfileIcon) {
                 currentProfileIcon.innerHTML = '';
                 currentProfileIcon.appendChild(newIcon);
             }
        });
    });

    // 2. Sync Initial Selection from Landing Page
    if(profileCards){
        profileCards.forEach(card => {
            card.addEventListener('click', function() {
                const profile = this.getAttribute('data-profile');
                const option = document.querySelector(`.profile-option[data-profile="${profile}"]`);
                if (option && currentProfileIcon) {
                     const newIcon = option.querySelector('.mini-avatar').cloneNode(true);
                     currentProfileIcon.innerHTML = '';
                     currentProfileIcon.appendChild(newIcon);
                }
            });
        });
    }
});
