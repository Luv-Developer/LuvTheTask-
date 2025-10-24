        document.getElementById('resetForm').addEventListener('submit', function(e) {
            
            const email = document.getElementById('email').value;
            
            // Simple validation
            if(email) {
                // In a real application, you would send this data to a server
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                
                // Add animation to the success message
                successMessage.style.animation = 'pulse 0.5s ease-out';
                
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('Please enter your email address');
            }
        });

        // Add focus effects to input field
        const inputField = document.getElementById('email');
        
        inputField.addEventListener('focus', function() {
            this.parentElement.querySelector('i').style.color = '#ff6b6b';
            this.parentElement.querySelector('i').style.transform = 'translateY(-50%) scale(1.2)';
        });
        
        inputField.addEventListener('blur', function() {
            this.parentElement.querySelector('i').style.color = '#8a2be2';
            this.parentElement.querySelector('i').style.transform = 'translateY(-50%) scale(1)';
        });

        // Back to login functionality
        document.querySelector('.back-link a').addEventListener('click', function(e) {
            // In a real application, this would redirect to the login page
            alert('Redirecting to login page...');
        });