        document.getElementById('loginForm').addEventListener('submit', function(e) {
            
            
            // Simple validation
            if(email && password) {

                
            } else {
                alert('Please fill in all fields');
            }
        });

        // Add focus effects to input fields
        const inputFields = document.querySelectorAll('.input-field');
        
        inputFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.querySelector('i').style.color = '#ff6b6b';
                this.parentElement.querySelector('i').style.transform = 'translateY(-50%) scale(1.2)';
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.querySelector('i').style.color = '#8a2be2';
                this.parentElement.querySelector('i').style.transform = 'translateY(-50%) scale(1)';
            });
        });
