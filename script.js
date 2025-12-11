/* --- script.js --- */

// 1. GLOBAL: Local Storage Streak Counter
document.addEventListener('DOMContentLoaded', () => {
    updateStreak();
    checkFirstTimeUser();
});

function updateStreak() {
    let lastVisit = localStorage.getItem('lastVisit');
    let streak = parseInt(localStorage.getItem('streakCount') || 0);
    const today = new Date().toDateString();

    if (lastVisit !== today) {
        streak++;
        localStorage.setItem('streakCount', streak);
        localStorage.setItem('lastVisit', today);
    }
    
    // Update footer text if it exists
    const streakDisplay = document.getElementById('streak-display');
    if (streakDisplay) {
        streakDisplay.innerText = `🔥 Survival Streak: ${streak} Days`;
    }
}

// 2. GLOBAL: How to Use Modal
function checkFirstTimeUser() {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    const modal = document.getElementById('guideModal');
    
    // If modal exists on this page
    if (modal) {
        if (!hasSeenGuide) {
            modal.style.display = "block";
        }
        
        // Close button logic
        document.querySelector('.close-modal').onclick = function() {
            modal.style.display = "none";
            localStorage.setItem('hasSeenGuide', 'true');
        }
        
        // Button to open manually
        document.getElementById('openGuideBtn').onclick = function() {
             modal.style.display = "block";
        }
    }
}

// 3. PAGE: SOUNDS (Audio Player)
function toggleSound(soundId, btn) {
    const audio = document.getElementById(soundId);
    if (audio.paused) {
        audio.play();
        btn.innerText = "⏸ Pause Vibe";
        btn.style.borderColor = "var(--hot-pink)";
    } else {
        audio.pause();
        btn.innerText = "▶ Play Vibe";
        btn.style.borderColor = "var(--accent-color)";
    }
}

// 4. PAGE: VOID (Burn Logic)
function burnText() {
    const textarea = document.getElementById('void-input');
    const burnBtn = document.getElementById('burn-btn');
    
    if (textarea.value.trim() === "") return;

    // Add CSS Animation Class
    textarea.classList.add('shake-burn');
    textarea.style.backgroundColor = "#500";
    textarea.style.color = "#000";
    
    burnBtn.innerText = "🔥 BURNING...";
    
    setTimeout(() => {
        textarea.style.opacity = "0";
        textarea.style.filter = "blur(10px)";
    }, 500);

    setTimeout(() => {
        textarea.value = "";
        textarea.classList.remove('shake-burn');
        textarea.style.opacity = "1";
        textarea.style.filter = "none";
        textarea.style.backgroundColor = "#000";
        textarea.style.color = "var(--hot-pink)";
        burnBtn.innerText = "Destroyed. Feel better?";
    }, 2000);
}

// 5. PAGE: SOS (Copy to Clipboard)
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied! Now go ghost everyone. 👻");
    });
}

// 6. PAGE: GROUNDING (Wizard Logic)
let currentStep = 1;
function nextStep(totalSteps) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    
    // Increment
    currentStep++;
    
    // Show next step or Finish
    if (currentStep <= totalSteps) {
        document.getElementById(`step-${currentStep}`).style.display = 'block';
        // Update Progress Bar
        const percent = ((currentStep - 1) / totalSteps) * 100;
        document.querySelector('.progress-bar').style.width = percent + '%';
    } else {
        document.getElementById('step-finish').style.display = 'block';
        document.querySelector('.progress-bar').style.width = '100%';
    }
}

// 7. EASTER EGG (Party Mode)
let logoClicks = 0;
function triggerEasterEgg() {
    logoClicks++;
    if (logoClicks === 5) {
        alert("🎉 KUROMI PARTY MODE ACTIVATED! 🎉");
        
        // 1. Set the image
        document.body.style.backgroundImage = "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1pN2I3MWFzam5ib3d2bXpmNnJpdXVkenFncHM2Zm9xYmp3YmM0YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eHdZZgmLheaqRT6kVX/giphy.gif')";
        
        // 2. Fix the layout (Stretch to fit, don't repeat)
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        
        // Reset clicks
        logoClicks = 0;
    }
}
