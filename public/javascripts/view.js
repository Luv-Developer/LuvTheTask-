        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.btn');
            const actionLinks = document.querySelectorAll('.action-link');
            const addTaskBtn = document.getElementById('addTaskBtn');
            const viewProfileBtn = document.getElementById('viewProfileBtn');
            const totalTasksEl = document.getElementById('totalTasks');
            const completedTasksEl = document.getElementById('completedTasks');
            const pendingTasksEl = document.getElementById('pendingTasks');
            
            // Add ripple effect to all buttons
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    createRippleEffect(this, e);
                });
            });
            
            // Navigation buttons functionality
            addTaskBtn.addEventListener('click', function(e) {
            });
            
            viewProfileBtn.addEventListener('click', function(e) {
            });
            
            // Action links functionality
            actionLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const taskId = this.getAttribute('data-id');
                    const taskCard = document.querySelector(`.task-card[data-id="${taskId}"]`);
                    
                    if (this.classList.contains('edit-link')) {
                        // Edit functionality
                        const taskTitle = taskCard.querySelector('.task-title').textContent;
                    } 
                    else if (this.classList.contains('delete-link')) {
                        // Delete functionality with animation
                        taskCard.style.animation = 'deleteTask 0.5s ease forwards';
                        setTimeout(() => {
                            taskCard.remove();
                            updateStats();
                        }, 500);
                    } 
                    else if (this.classList.contains('done-link')) {
                        // Toggle completion
                        const icon = this.querySelector('i');
                        if (taskCard.classList.contains('completed')) {
                            // Mark as incomplete
                            taskCard.classList.remove('completed');
                            icon.className = 'fas fa-check';
                        } else {
                            // Mark as complete with animation
                            taskCard.classList.add('completed');
                            icon.className = 'fas fa-undo';
                            
                            // Add checkmark animation
                            const checkmark = document.createElement('div');
                            checkmark.innerHTML = '<i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success);"></i>';
                            checkmark.style.position = 'absolute';
                            checkmark.style.top = '50%';
                            checkmark.style.left = '50%';
                            checkmark.style.transform = 'translate(-50%, -50%)';
                            checkmark.style.zIndex = '10';
                            checkmark.style.animation = 'checkmark 0.5s ease';
                            taskCard.appendChild(checkmark);
                            
                            setTimeout(() => {
                                checkmark.remove();
                            }, 1000);
                        }
                        updateStats();
                    }
                    
                    createRippleEffect(this, e);
                });
            });
            
            // Update statistics
            function updateStats() {
                const taskCards = document.querySelectorAll('.task-card');
                const total = taskCards.length;
                const completed = document.querySelectorAll('.task-card.completed').length;
                const pending = total - completed;
                
                totalTasksEl.textContent = total;
                completedTasksEl.textContent = completed;
                pendingTasksEl.textContent = pending;
            }
            
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
            
            // Initial stats update
            updateStats();
        });