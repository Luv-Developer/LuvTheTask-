        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.btn');
            const editTaskForm = document.getElementById('editTaskForm');
            const previousTitle = document.getElementById('previousTitle');
            const newTitle = document.getElementById('newTitle');
            const currentTitleDisplay = document.getElementById('currentTitleDisplay');
            const newTitleDisplay = document.getElementById('newTitleDisplay');
            const backBtn = document.getElementById('backBtn');
            const cancelBtn = document.getElementById('cancelBtn');
            
            // Add ripple effect to all buttons
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    createRippleEffect(this, e);
                });
            });
            
            // Navigation buttons functionality
            backBtn.addEventListener('click', function(e) {
                // In a real app, this would navigate back
            });
            
            cancelBtn.addEventListener('click', function(e) {
                if (confirm('Are you sure you want to cancel? Any changes will be lost.')) {
                    // In a real app, this would navigate back
                }
            });
            
            // Update new title display in real-time
            newTitle.addEventListener('input', function() {
                const value = this.value.trim();
                if (value) {
                    newTitleDisplay.textContent = value;
                    newTitleDisplay.parentElement.style.animation = 'titleUpdate 0.5s ease';
                    setTimeout(() => {
                        newTitleDisplay.parentElement.style.animation = '';
                    }, 500);
                } else {
                    newTitleDisplay.textContent = 'Enter new title...';
                }
            });
            
            // Form submission
            editTaskForm.addEventListener('submit', function(e) {
                
                const newTitleValue = newTitle.value.trim();
                
                if (!newTitleValue) {
                    alert('Please enter a new title for your task.');
                    newTitle.focus();
                    return;
                }
                
                if (newTitleValue === previousTitle.value) {
                    alert('The new title is the same as the previous title. Please make a change to update the task.');
                    newTitle.focus();
                    return;
                }
                
                // In a real app, this would send data to a server
                // For demo purposes, we'll just show a success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Task Updated!';
                submitBtn.style.animation = 'success 0.5s ease';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.animation = '';
                    
                    // Show success message
                    alert(`Task title has been successfully updated from "${previousTitle.value}" to "${newTitleValue}"!`);
                    
                    // In a real app, this would navigate back or update the UI
                }, 1500);
            });
            
            // Add floating elements dynamically
            const floatingContainer = document.querySelector('.floating-elements');
            for (let i = 0; i < 10; i++) {
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
            
            // Helper function for ripple effect
            function createRippleEffect(element, event) {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size/2;
                const y = event.clientY - rect.top - size/2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
            
            // Initialize the new title display
            newTitleDisplay.textContent = 'Enter new title...';
        });