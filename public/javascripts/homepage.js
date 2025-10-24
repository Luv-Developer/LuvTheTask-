        // Add interactive animations
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size/2;
                    const y = e.clientY - rect.top - size/2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                    
                    // Add button-specific actions
                    const buttonText = this.textContent.trim();
                    if (buttonText.includes('Login')) {
                    } else if (buttonText.includes('Register')) {
                    } else if (buttonText.includes('Profile')) {
                    } else if (buttonText.includes('Create Task')) {
                    }
                });
            });
            
            // Add floating elements dynamically
            const floatingContainer = document.querySelector('.floating-elements');
            for (let i = 0; i < 12; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element');
                const size = Math.random() * 60 + 20;
                element.style.width = size + 'px';
                element.style.height = size + 'px';
                element.style.top = Math.random() * 100 + '%';
                element.style.left = Math.random() * 100 + '%';
                element.style.animationDelay = (Math.random() * -20) + 's';
                element.style.animationDuration = (Math.random() * 10 + 15) + 's';
                element.style.background = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`;
                floatingContainer.appendChild(element);
            }
            
            // Add typing effect to hero text
            const heroText = "Organize Your Life, One Task at a Time";
            const heroElement = document.querySelector('.hero h1');
            let i = 0;
            
            function typeWriter() {
                if (i < heroText.length) {
                    heroElement.textContent = heroText.substring(0, i+1);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing effect after a short delay
            setTimeout(() => {
                heroElement.textContent = "";
                typeWriter();
            }, 500);
        });