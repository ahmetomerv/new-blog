// Email copying functionality
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('a[href="mailto:ahmetomerv@gmail.com"]');
    
    emailLinks.forEach(function(emailLink) {
        emailLink.href = '#';
        emailLink.id = 'emailLink';
        emailLink.title = 'Click to copy email';
        
        const contactIcons = emailLink.closest('.contact-icons');
        
        let tooltip = contactIcons.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Email copied to clipboard!';
            contactIcons.appendChild(tooltip);
        }
        
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = 'ahmetomerv@gmail.com';
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(function() {
                // Show tooltip
                tooltip.style.left = emailLink.offsetLeft + 'px';
                tooltip.style.top = (emailLink.offsetTop - 40) + 'px';
                tooltip.classList.add('show');
                
                // Hide tooltip after 2 seconds
                setTimeout(function() {
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy email: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show tooltip even for fallback
                tooltip.style.left = emailLink.offsetLeft + 'px';
                tooltip.style.top = (emailLink.offsetTop - 40) + 'px';
                tooltip.classList.add('show');
                
                setTimeout(function() {
                    tooltip.classList.remove('show');
                }, 2000);
            });
        });
    });
});
