let currentMode = 'Off';

// Listen for messages from the game
window.addEventListener('message', function(event) {
    const data = event.data;
    
    if (data.type === 'show') {
        showMenu();
    } else if (data.type === 'hide') {
        hideMenu();
    } else if (data.type === 'updateMode') {
        updateCurrentMode(data.mode);
    }
});

// Listen for Escape key to close menu
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

function showMenu() {
    const menu = document.getElementById('fps-menu');
    if (menu) {
        menu.style.display = 'block';
    }
}

function hideMenu() {
    const menu = document.getElementById('fps-menu');
    if (menu) {
        menu.style.display = 'none';
    }
}

function closeMenu() {
    hideMenu();
    // Notify the game that we closed the menu
    fetch('https://um-fpsbooster/closeMenu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });
}

function setMode(mode) {
    // Send the mode to the game
    fetch('https://um-fpsbooster/setMode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: mode })
    });
    
    // Update the UI
    updateCurrentMode(mode);
    
    // Update active button state
    updateActiveButton(mode);
}

function updateCurrentMode(mode) {
    currentMode = mode;
    const modeDisplay = document.getElementById('current-mode');
    
    const modeNames = {
        'reset': 'Off',
        'ulow': 'Ultra Low',
        'low': 'Low',
        'medium': 'Medium'
    };
    
    if (modeDisplay) {
        modeDisplay.textContent = modeNames[mode] || mode;
    }
    updateActiveButton(mode);
}

function updateActiveButton(mode) {
    // Remove active class from all buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to the selected button
    const activeBtn = document.querySelector(`.mode-btn.${mode}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}
