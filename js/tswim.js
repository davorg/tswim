// Simple clean version without debugging
document.addEventListener('DOMContentLoaded', function() {
  console.log('Swimming calculator loaded');
  
  // Get references to key elements
  const colourSelect = document.getElementById('colour');
  const totalElement = document.getElementById('total');
  const poolLenElement = document.getElementById('pool_len');
  const lengthsElement = document.getElementById('lengths');
  
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
      console.log('Distance calculated: ' + total + 'm');
    } else {
      totalElement.textContent = '';
    }
  }
  
  // Add event listener to the color dropdown
  colourSelect.addEventListener('change', calculateTotal);
  
  // Initial calculation (won't show anything until color is selected)
  calculateTotal();
});
