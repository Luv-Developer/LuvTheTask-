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
                });
            });
            
            // Add floating elements dynamically
            const floatingContainer = document.querySelector('.floating-elements');
            for (let i = 0; i < 8; i++) {
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
            
            // Add typing effect to welcome message
            const welcomeText = "Welcome, Alex!";
            const welcomeElement = document.querySelector('h1');
            let i = 0;
            
            function typeWriter() {
                if (i < welcomeText.length) {
                    welcomeElement.textContent = welcomeText.substring(0, i+1);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing effect after a short delay
            setTimeout(() => {
                welcomeElement.textContent = "";
                typeWriter();
            }, 1000);
        });