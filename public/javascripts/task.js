        // Add interactive animations
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.btn');
            const taskForm = document.getElementById('taskForm');
            const taskTitle = document.getElementById('taskTitle');
            const taskDescription = document.getElementById('taskDescription');
            const previewTaskBtn = document.getElementById('previewTaskBtn');
            const taskPreview = document.getElementById('taskPreview');
            const previewContent = document.getElementById('previewContent');
            const clearPreviewBtn = document.getElementById('clearPreviewBtn');
            const viewTasksBtn = document.getElementById('viewTasksBtn');
            
            // Add ripple effect to all buttons
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    createRippleEffect(this, e);
                });
            });
            
            // View Tasks button functionality
            viewTasksBtn.addEventListener('click', function() {
                alert('Redirecting to View Tasks page...');
                // In a real app, this would navigate to the tasks page
            });
            
            // Preview Task functionality
            previewTaskBtn.addEventListener('click', function() {
                const title = taskTitle.value.trim();
                const description = taskDescription.value.trim();
                
                if (!title || !description) {
                    return;
                }
                
                // Update preview content
                previewContent.innerHTML = `
                    <div class="preview-title">${title}</div>
                    <div class="preview-description">${description}</div>
                `;
                
                // Show clear preview button
                clearPreviewBtn.style.display = 'block';
                
                // Animate the preview section
                taskPreview.style.animation = 'none';
                setTimeout(() => {
                    taskPreview.style.animation = 'fadeInUp 0.5s ease-out forwards';
                }, 10);
            });
            
            // Clear Preview functionality
            clearPreviewBtn.addEventListener('click', function() {
                previewContent.innerHTML = `
                    <div class="empty-preview">
                        <i class="fas fa-info-circle"></i>
                        <p>Your task preview will appear here after you fill out the form and click "Preview Task".</p>
                    </div>
                `;
                this.style.display = 'none';
            });
            
            // Form submission
            taskForm.addEventListener('submit', function(e) {
                
                const title = taskTitle.value.trim();
                const description = taskDescription.value.trim();
                
                if (!title || !description) {
                    alert('Please fill in both title and description to add a task.');
                    return;
                }
                
                // In a real app, this would send data to a server
                // For demo purposes, we'll just show a success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Task Added!';
                submitBtn.style.animation = 'success 0.5s ease';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.animation = '';
                    
                    clearPreviewBtn.click();
                    
                    // Show success message
                    alert(`Task "${title}" has been successfully added!`);
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
            function createRippleEffect(button, event) {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size/2;
                const y = event.clientY - rect.top - size/2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });