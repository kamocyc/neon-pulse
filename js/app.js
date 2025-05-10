// Main application file
document.addEventListener('DOMContentLoaded', () => {
    console.log('Chirper app initialized');

    // App state
    const appState = {
        tweets: [
            {
                id: 1,
                author: 'SynthWave_92',
                username: '@neural_architect',
                avatar: 'img/cyber-avatar.svg',
                content: 'Welcome to NEON_PULSE! 🌐 This grid runs on pure cyberpunk energy. Share your digital transmissions with the network. #NetRunner #CyberSpace #DigitalFrontier',
                timestamp: new Date(Date.now() - 7200000), // 2 hours ago
                likes: 24,
                retweets: 11,
                replies: 3,
                liked: false,
                retweeted: false
            }
        ],
        animationPlaying: false // Track if animations are currently playing
    };

    // DOM Elements - Tweets
    const tweetInput = document.getElementById('tweet-input');
    const tweetButton = document.getElementById('tweet-button');
    const tweetsList = document.getElementById('tweets-list');
    const composeAvatarImg = document.getElementById('compose-avatar-img');

    // DOM Elements - Animation overlays
    const glitchOverlay = document.getElementById('glitch-overlay');
    const dataStream = document.getElementById('data-stream');
    const cyberHack = document.getElementById('cyber-hack');
    const energyWave = document.getElementById('energy-wave');

    // Sound effect
    const transmissionSound = document.getElementById('transmission-sound');

    // DOM Elements - Auth
    const authSection = document.getElementById('auth-section');
    const userProfile = document.getElementById('user-profile');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const logoutLink = document.getElementById('logout-link');
    const currentUserAvatar = document.getElementById('current-user-avatar');

    // Modal elements
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    // Initialize app
    checkAuthState();
    renderTweets();
    setupEventListeners();

    // Functions

    // Animation Control Functions
    function activateGlitchOverlay(duration = 2000) {
        glitchOverlay.classList.add('active');
        return new Promise(resolve => {
            setTimeout(() => {
                glitchOverlay.classList.remove('active');
                resolve();
            }, duration);
        });
    }

    function activateDataStream(duration = 2500) {
        dataStream.classList.add('active');
        return new Promise(resolve => {
            setTimeout(() => {
                dataStream.classList.remove('active');
                resolve();
            }, duration);
        });
    }

    function activateEnergyWave(duration = 1200) {
        energyWave.classList.add('active');
        return new Promise(resolve => {
            setTimeout(() => {
                energyWave.classList.remove('active');
                resolve();
            }, duration);
        });
    }

    function activateCyberHack(duration = 3000) {
        // Clear any existing hack text
        cyberHack.innerHTML = '';

        // Generate random hack text elements
        const textCount = 15 + Math.floor(Math.random() * 15); // 15-30 elements
        for (let i = 0; i < textCount; i++) {
            const text = document.createElement('div');
            text.className = 'cyber-hack-text';
            text.style.top = `${Math.random() * 100}%`;
            text.style.left = `${Math.random() * 100}%`;
            text.textContent = getRandomHackText();
            cyberHack.appendChild(text);
        }

        cyberHack.classList.add('active');
        return new Promise(resolve => {
            setTimeout(() => {
                cyberHack.classList.remove('active');
                setTimeout(() => {
                    cyberHack.innerHTML = '';
                    resolve();
                }, 500);
            }, duration);
        });
    }

    function getRandomHackText() {
        const hackPhrases = [
            "TRANSMISSION_INIT",
            "ENCRYPTING_DATA",
            "NET_ACCESS_GRANTED",
            "NEURAL_LINK_ACTIVE",
            "SIGNAL_BOOST",
            "FIREWALL_BYPASS",
            "QUANTUM_ENCODE",
            "PACKET_INJECTION",
            "SYNC_COMPLETE",
            "DATA_STREAM_OPEN",
            "NETWORK_PULSE",
            "CRYPTO_SECURE",
            "MEMORY_BUFFER",
            "SYSTEM_OVERRIDE",
            "SIGNAL_AMPLIFIED"
        ];
        return hackPhrases[Math.floor(Math.random() * hackPhrases.length)];
    }

    function addPageWideAnimation() {
        document.body.classList.add('transmission-animation', 'power-surge', 'bg-pattern-animate');

        // Add digital distortion effect to tweet button
        tweetButton.classList.add('digital-distortion');

        return new Promise(resolve => {
            setTimeout(() => {
                document.body.classList.remove('transmission-animation', 'power-surge', 'bg-pattern-animate');
                document.body.classList.add('power-surge-reverse');
                tweetButton.classList.remove('digital-distortion');

                setTimeout(() => {
                    document.body.classList.remove('power-surge-reverse');
                    resolve();
                }, 1000);
            }, 1500);
        });
    }

    // Main animation sequence
    async function playTransmissionAnimations() {
        if (appState.animationPlaying) return; // Prevent multiple animations running

        appState.animationPlaying = true;

        try {
            // Play sound effect (if user has interacted with the page)
            if (transmissionSound) {
                transmissionSound.currentTime = 0;
                transmissionSound.play().catch(error => {
                    // Silently fail if autoplay is blocked - this is common in browsers
                    console.log('Sound playback was prevented. This is normal if user has not interacted with the page yet.');
                });
            }

            // Start with energy wave from the button
            await activateEnergyWave(1200);

            // Then activate multiple effects in parallel for maximum impact
            await Promise.all([
                activateGlitchOverlay(2000),
                activateDataStream(2500),
                addPageWideAnimation(),
                activateCyberHack(3000)
            ]);

        } finally {
            appState.animationPlaying = false;
        }
    }

    function setupEventListeners() {
        // Tweet button click
        tweetButton.addEventListener('click', handleTweetSubmit);

        // Auto-resize tweet input
        tweetInput.addEventListener('input', autoResizeTextarea);

        // Like, retweet actions delegation
        tweetsList.addEventListener('click', handleTweetActions);

        // Auth buttons
        loginButton.addEventListener('click', () => showModal(loginModal));
        signupButton.addEventListener('click', () => showModal(signupModal));

        // Close modals
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                loginModal.classList.add('hidden');
                signupModal.classList.add('hidden');
            });
        });

        // Close modals when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                loginModal.classList.add('hidden');
            }
            if (event.target === signupModal) {
                signupModal.classList.add('hidden');
            }
        });

        // User menu toggle
        userMenuButton.addEventListener('click', () => {
            userDropdown.classList.toggle('hidden');
        });

        // Close user dropdown when clicking elsewhere
        document.addEventListener('click', (event) => {
            if (!event.target.closest('#user-profile') && !userDropdown.classList.contains('hidden')) {
                userDropdown.classList.add('hidden');
            }
        });

        // Logout
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            handleLogout();
        });

        // Form submissions
        loginForm.addEventListener('submit', handleLogin);
        signupForm.addEventListener('submit', handleSignup);
    }

    function checkAuthState() {
        if (window.authManager.isLoggedIn()) {
            const user = window.authManager.getCurrentUser();
            updateUIForLoggedInUser(user);
        } else {
            updateUIForLoggedOutUser();
        }
    }

    function updateUIForLoggedInUser(user) {
        // Update UI elements
        authSection.classList.add('hidden');
        userProfile.classList.remove('hidden');

        // Set user info
        currentUserAvatar.src = user.avatar;
        composeAvatarImg.src = user.avatar;

        // Enable tweet functionality
        tweetInput.disabled = false;
        tweetInput.placeholder = "Broadcast to the network...";
        tweetButton.disabled = false;
    }

    function updateUIForLoggedOutUser() {
        // Update UI elements
        authSection.classList.remove('hidden');
        userProfile.classList.add('hidden');
        userDropdown.classList.add('hidden');

        // Disable tweet functionality - in a real app, you might redirect to login
        tweetInput.disabled = true;
        tweetInput.placeholder = "Access required for network transmission";
        tweetButton.disabled = true;
    }

    function handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const result = window.authManager.login(username, password);

        if (result.success) {
            // Update UI for logged in user
            updateUIForLoggedInUser(result.user);
            loginModal.classList.add('hidden');
            loginForm.reset();
            loginError.classList.add('hidden');
        } else {
            // Show error
            loginError.textContent = result.message;
            loginError.classList.remove('hidden');
        }
    }

    function handleSignup(event) {
        event.preventDefault();

        const name = document.getElementById('signup-name').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        const result = window.authManager.register(name, username, password);

        if (result.success) {
            // Update UI for logged in user
            updateUIForLoggedInUser(result.user);
            signupModal.classList.add('hidden');
            signupForm.reset();
            signupError.classList.add('hidden');
        } else {
            // Show error
            signupError.textContent = result.message;
            signupError.classList.remove('hidden');
        }
    }

    function handleLogout() {
        window.authManager.logout();
        updateUIForLoggedOutUser();
    }

    function showModal(modal) {
        modal.classList.remove('hidden');
        // Focus first input
        setTimeout(() => {
            modal.querySelector('input').focus();
        }, 100);
    }

    async function handleTweetSubmit() {
        // Check if user is logged in
        if (!window.authManager.isLoggedIn()) {
            showModal(loginModal);
            return;
        }

        const content = tweetInput.value.trim();

        if (content === '') return;

        // Disable the tweet button to prevent multiple submissions during animation
        tweetButton.disabled = true;

        // Add regular button ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('button-ripple');
        tweetButton.appendChild(ripple);

        // Add custom transmit ripple effect
        const rect = tweetButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const transmitRipple = document.createElement('div');
        transmitRipple.classList.add('transmit-ripple');
        transmitRipple.style.left = `${centerX}px`;
        transmitRipple.style.top = `${centerY}px`;
        document.body.appendChild(transmitRipple);

        // Remove transmit ripple after animation completes
        setTimeout(() => {
            if (document.body.contains(transmitRipple)) {
                document.body.removeChild(transmitRipple);
            }
        }, 1000);

        // Play the flashy animations sequence
        await playTransmissionAnimations();

        // Create and post the tweet after animations
        const currentUser = window.authManager.getCurrentUser();

        // Create new tweet object
        const newTweet = {
            id: Date.now(), // unique ID based on timestamp
            author: currentUser.name,
            username: '@' + currentUser.username,
            avatar: currentUser.avatar,
            content: content,
            timestamp: new Date(),
            likes: 0,
            retweets: 0,
            replies: 0,
            liked: false,
            retweeted: false
        };

        // Add to state
        appState.tweets.unshift(newTweet);

        // Clear existing content and re-render all tweets
        renderTweets();

        // Add pulse border effect to the newly added tweet
        const firstTweet = tweetsList.querySelector('.tweet');
        if (firstTweet) {
            setTimeout(() => {
                firstTweet.classList.add('new-tweet-animation', 'pulse-border');
            }, 10);
        }

        // Clean up the ripple effect
        setTimeout(() => {
            if (tweetButton.contains(ripple)) {
                tweetButton.removeChild(ripple);
            }
        }, 700);

        // Clear input
        tweetInput.value = '';
        tweetInput.style.height = 'auto';

        // Show notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Transmission complete!';
        document.body.appendChild(notification);

        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 1500);

        // Re-enable the tweet button after everything is done
        tweetButton.disabled = false;
    }

    function renderTweets() {
        // Clear current tweets
        tweetsList.innerHTML = '';

        // Create tweet elements
        appState.tweets.forEach(tweet => {
            const tweetElement = createTweetElement(tweet);
            tweetsList.appendChild(tweetElement);
        });
    }

    function createTweetElement(tweet) {
        const tweetDiv = document.createElement('div');
        tweetDiv.className = 'tweet';
        tweetDiv.dataset.tweetId = tweet.id;

        const timeAgo = getTimeAgo(tweet.timestamp);

        // Determine icon classes based on state
        const likeIconClass = tweet.liked ? 'fas fa-heart' : 'far fa-heart';
        const likeButtonClass = tweet.liked ? 'tweet-action like active' : 'tweet-action like';

        const retweetButtonClass = tweet.retweeted ? 'tweet-action retweet active' : 'tweet-action retweet';

        tweetDiv.innerHTML = `
            <div class="tweet-avatar">
                <img src="${tweet.avatar}" alt="User">
            </div>
            <div class="tweet-content">
                <div class="tweet-header">
                    <span class="tweet-author">${tweet.author}</span>
                    <span class="tweet-username">${tweet.username}</span>
                    <span class="tweet-time">${timeAgo}</span>
                </div>
                <div class="tweet-body">
                    ${formatTweetContent(tweet.content)}
                </div>
                <div class="tweet-actions">
                    <button class="tweet-action reply">
                        <i class="far fa-comment"></i> <span>${tweet.replies}</span>
                    </button>
                    <button class="${retweetButtonClass}">
                        <i class="fas fa-retweet"></i> <span>${tweet.retweets}</span>
                    </button>
                    <button class="${likeButtonClass}">
                        <i class="${likeIconClass}"></i> <span>${tweet.likes}</span>
                    </button>
                    <button class="tweet-action share">
                        <i class="far fa-share-square"></i>
                    </button>
                </div>
            </div>
        `;

        return tweetDiv;
    }

    function handleTweetActions(event) {
        // Check if user is logged in
        if (!window.authManager.isLoggedIn()) {
            showModal(loginModal);
            return;
        }

        const action = event.target.closest('.tweet-action');
        if (!action) return;

        const tweet = action.closest('.tweet');
        const tweetId = parseInt(tweet.dataset.tweetId);

        // Find the tweet in our state
        const tweetIndex = appState.tweets.findIndex(t => t.id === tweetId);
        if (tweetIndex === -1) return;

        if (action.classList.contains('like')) {
            // Toggle like state
            const tweetData = appState.tweets[tweetIndex];
            const wasLiked = tweetData.liked;

            if (!wasLiked) {
                // Like the tweet
                action.classList.add('active');
                action.classList.add('animate');

                // Change icon from regular to solid
                const icon = action.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');

                // Update counter and state
                tweetData.liked = true;
                tweetData.likes++;
                action.querySelector('span').textContent = tweetData.likes;

                // Remove animation class after animation completes
                setTimeout(() => {
                    action.classList.remove('animate');
                }, 1000);
            } else {
                // Unlike the tweet
                action.classList.remove('active');

                // Change icon from solid to regular
                const icon = action.querySelector('i');
                icon.classList.remove('fas');
                icon.classList.add('far');

                // Update counter and state
                tweetData.liked = false;
                tweetData.likes = Math.max(0, tweetData.likes - 1);
                action.querySelector('span').textContent = tweetData.likes;
            }

        } else if (action.classList.contains('retweet')) {
            // Toggle retweet state
            const tweetData = appState.tweets[tweetIndex];
            const wasRetweeted = tweetData.retweeted;

            if (!wasRetweeted) {
                // Retweet
                action.classList.add('active');
                action.classList.add('animate');

                // Update counter and state
                tweetData.retweeted = true;
                tweetData.retweets++;
                action.querySelector('span').textContent = tweetData.retweets;

                // Remove animation class after animation completes
                setTimeout(() => {
                    action.classList.remove('animate');
                }, 500);
            } else {
                // Undo retweet
                action.classList.remove('active');

                // Update counter and state
                tweetData.retweeted = false;
                tweetData.retweets = Math.max(0, tweetData.retweets - 1);
                action.querySelector('span').textContent = tweetData.retweets;
            }

        } else if (action.classList.contains('reply')) {
            // Animate reply button
            action.classList.add('active');

            // In a real app, this would open a reply modal
            console.log('Reply clicked for tweet', tweetId);

            // Show a small notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Neural link interface coming soon!';
            document.body.appendChild(notification);

            // Remove notification after 2 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(notification);
                    action.classList.remove('active');
                }, 500);
            }, 1500);
        } else if (action.classList.contains('share')) {
            // Share animation
            action.classList.add('active');

            // Show a small notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Cryptographic link copied to memory!';
            document.body.appendChild(notification);

            // Remove notification after 2 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(notification);
                    action.classList.remove('active');
                }, 500);
            }, 1500);
        }
    }

    function formatTweetContent(content) {
        // Add links to hashtags
        content = content.replace(/#(\w+)/g, '<a href="#">#$1</a>');

        // Add links to mentions
        content = content.replace(/@(\w+)/g, '<a href="#">@$1</a>');

        // Add links to URLs
        content = content.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );

        return content;
    }

    function getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;

        // Convert to seconds
        const seconds = Math.floor(diff / 1000);

        if (seconds < 60) {
            return `${seconds}s`;
        }

        // Convert to minutes
        const minutes = Math.floor(seconds / 60);

        if (minutes < 60) {
            return `${minutes}m`;
        }

        // Convert to hours
        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours}h`;
        }

        // Convert to days
        const days = Math.floor(hours / 24);

        if (days < 7) {
            return `${days}d`;
        }

        // Format date for older tweets
        const options = { month: 'short', day: 'numeric' };
        return timestamp.toLocaleDateString(undefined, options);
    }

    function autoResizeTextarea() {
        // Reset height temporarily to get the scroll height
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
});