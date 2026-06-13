export function initEasterEggs() {
    console.log(
        "%c🧊 Hmmmph so you managed to get here i see...",
        "color: #1e3a8a; font-size: 16px; font-weight: bold; font-family: monospace; background: #dbeafe; padding: 8px; border-radius: 4px;"
    );
    console.log("Check out my source code on GitHub: github.com/Sankarshan-T/porfolio");


    window.addEventListener('contextmenu', (e) => {
        //if (e.target.closest('a') || e.target.closest('button')) return;

        e.preventDefault();

        const banner = document.createElement('div');
        banner.className = "fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white font-mono text-xs px-4 py-2 rounded-xl shadow-lg z-[9999] border border-blue-600 animate-bounce";
        banner.innerText = "Access denied. Nice try, hacker! 😆";
        document.body.appendChild(banner);

        setTimeout(() => banner.remove(), 3000);
    });


    window.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;

        const particle = document.createElement('div');
        particle.innerText = '🧊';
        particle.className = "fixed pointer-events-none text-xl z-[9999] transition-all duration-1000 ease-out select-none";

        particle.style.left = `${e.clientX - 10}px`;
        particle.style.top = `${e.clientY - 10}px`;
        document.body.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transform = 'translateY(-60px) scale(1.4)';
            particle.style.opacity = '0';
        });

        setTimeout(() => particle.remove(), 1000);
    });


    const originalTitle = document.title || "coolcream";
    window.addEventListener('blur', () => {
        document.title = "come back here 😡";
    });
    window.addEventListener('focus', () => {
        document.title = originalTitle;
    });
}