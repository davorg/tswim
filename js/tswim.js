document.addEventListener('DOMContentLoaded', function() {
 
  // Get references to key elements
  const colourSelect = document.getElementById('colour');
  const totalElement = document.getElementById('total');
  const poolLenElement = document.getElementById('pool_len');
  const poolLenDisplayElement = document.getElementById('pool_len_display');
  const poolLenEditIcon = document.getElementById('pool_len_edit_icon');
  const poolLenEditContainer = document.getElementById('pool_len_edit_container');
  const poolLenInput = document.getElementById('pool_len_input');
  const poolLenConfirm = document.getElementById('pool_len_confirm');
  const poolLenCancel = document.getElementById('pool_len_cancel');
  const lengthsElement = document.getElementById('lengths');
  
  // Load pool length from localStorage or use default
  function loadPoolLength() {
    const savedPoolLength = localStorage.getItem('poolLength');
    const poolLength = savedPoolLength ? parseInt(savedPoolLength, 10) : 16;
    poolLenElement.textContent = poolLength;
    poolLenDisplayElement.textContent = poolLength;
  }
  
  // Save pool length to localStorage
  function savePoolLength(value) {
    localStorage.setItem('poolLength', value);
  }
  
  // Function to show the edit interface
  function showPoolLengthEdit() {
    poolLenDisplayElement.style.display = 'none';
    poolLenEditIcon.style.display = 'none';
    poolLenEditContainer.style.display = 'inline-block';
    poolLenInput.value = poolLenElement.textContent;
    poolLenInput.focus();
    poolLenInput.select();
  }
  
  // Function to hide the edit interface
  function hidePoolLengthEdit() {
    poolLenDisplayElement.style.display = 'inline';
    poolLenEditIcon.style.display = 'inline';
    poolLenEditContainer.style.display = 'none';
  }
  
  // Function to save the edited value
  function savePoolLengthEdit() {
    const newValue = parseInt(poolLenInput.value, 10);
    if (isNaN(newValue) || newValue <= 0) {
      alert('Please enter a valid number greater than 0');
      return;
    }
    
    poolLenElement.textContent = newValue;
    poolLenDisplayElement.textContent = newValue;
    savePoolLength(newValue);
    hidePoolLengthEdit();
    calculateTotal();
  }
  
  // Function to calculate the total
  function calculateTotal() {
    // Get values and convert to numbers
    const poolLen = parseInt(poolLenElement.textContent, 10);
    const lengths = parseInt(lengthsElement.textContent, 10);
    const colour = colourSelect.value ? parseInt(colourSelect.value, 10) : 0;
    
    // Calculate and display total
    if (colour) {
      const total = poolLen * lengths * colour;
      totalElement.textContent = total + 'm';
    } else {
      totalElement.textContent = '';
    }
  }
  
  // Add event listeners
  colourSelect.addEventListener('change', calculateTotal);
  
  // Add event listeners for editable pool length
  poolLenDisplayElement.addEventListener('click', showPoolLengthEdit);
  poolLenEditIcon.addEventListener('click', showPoolLengthEdit);
  poolLenConfirm.addEventListener('click', savePoolLengthEdit);
  poolLenCancel.addEventListener('click', hidePoolLengthEdit);
  
  // Handle Enter key in input field
  poolLenInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      savePoolLengthEdit();
    } else if (e.key === 'Escape') {
      hidePoolLengthEdit();
    }
  });
  
  // Only allow numbers in the input
  poolLenInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  
  // Load saved pool length from localStorage
  loadPoolLength();
  
  // Initial calculation
  calculateTotal();
});
