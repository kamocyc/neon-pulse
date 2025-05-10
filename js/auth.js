// Simple authentication system

class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('chirper_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('chirper_current_user')) || null;

        // Initialize with a default user if no users exist
        if (this.users.length === 0) {
            this.users.push({
                id: 1,
                name: 'CyberPulse',
                username: 'demo',
                password: 'password', // In a real app, this would be hashed
                avatar: 'img/cyber-avatar.svg',
                bio: 'Network admin with level 5 clearance. Digital frontier explorer.'
            });
            this.saveUsers();
        }

        // Make sure all user avatars are correctly set to local SVG
        this.users.forEach(user => {
            if (user.avatar.includes('placeholder.com')) {
                user.avatar = 'img/avatar.svg';
            }
        });
        this.saveUsers();

        // Also ensure current user if exists has correct avatar
        if (this.currentUser && this.currentUser.avatar.includes('placeholder.com')) {
            this.currentUser.avatar = 'img/avatar.svg';
            this.saveCurrentUser();
        }
    }

    saveUsers() {
        localStorage.setItem('chirper_users', JSON.stringify(this.users));
    }

    saveCurrentUser() {
        localStorage.setItem('chirper_current_user', JSON.stringify(this.currentUser));
    }

    register(name, username, password) {
        // Check if username is taken
        if (this.users.some(user => user.username === username)) {
            return { success: false, message: 'Username already taken' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            username,
            password, // In a real app, this would be hashed
            avatar: 'img/avatar.svg',
            bio: ''
        };

        this.users.push(newUser);
        this.saveUsers();

        // Auto login
        this.currentUser = { ...newUser };
        delete this.currentUser.password; // Don't store password in current user
        this.saveCurrentUser();

        return { success: true, user: this.currentUser };
    }

    login(username, password) {
        const user = this.users.find(user =>
            user.username === username && user.password === password
        );

        if (!user) {
            return { success: false, message: 'Invalid username or password' };
        }

        // Set current user without password
        this.currentUser = { ...user };
        delete this.currentUser.password;
        this.saveCurrentUser();

        return { success: true, user: this.currentUser };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('chirper_current_user');
        return { success: true };
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateProfile(updates) {
        if (!this.currentUser) {
            return { success: false, message: 'Not logged in' };
        }

        // Find user in users array
        const userIndex = this.users.findIndex(user => user.id === this.currentUser.id);

        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        // Update user data
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...updates
        };

        // Update current user
        this.currentUser = {
            ...this.currentUser,
            ...updates
        };

        this.saveUsers();
        this.saveCurrentUser();

        return { success: true, user: this.currentUser };
    }
}

// Export for use in other files
window.authManager = new AuthManager();