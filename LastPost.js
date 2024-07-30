// Function to calculate the difference between two dates
function timeDifference(date) {
  const now = new Date();
  const difference = now - date;

  // Debugging: Log the time difference in milliseconds
  console.log('Difference in milliseconds:', difference);

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(difference / 3600000);
  const days = Math.floor(difference / 86400000);
  const weeks = Math.floor(difference / 604800000);
  const months = Math.floor(difference / 2592000000); // approx month in milliseconds
  const years = Math.floor(difference / 31536000000); // approx year in milliseconds

  // Debugging: Log the calculated time units
  console.log('Calculated time units:', { years, months, weeks, days, hours, minutes });

  // Return the time difference as a string
  if (years > 0) {
    return years + ' year' + (years > 1 ? 's' : '') + ' ago';
  } else if (months > 0) {
    return months + ' month' + (months > 1 ? 's' : '') + ' ago';
  } else if (weeks > 0) {
    return weeks + ' week' + (weeks > 1 ? 's' : '') + ' ago';
  } else if (days > 0) {
    return days + ' day' + (days > 1 ? 's' : '') + ' ago';
  } else if (hours > 0) {
    return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
  } else {
    return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
  }
}

// Function to update all <p class="lastUpdate"> elements with the time difference
function updateLastUpdates() {
  // Get all elements with the class "lastUpdate"
  const lastUpdateElements = document.querySelectorAll('.lastUpdate');

  lastUpdateElements.forEach(element => {
    const lastUpdateText = element.textContent.trim();

    if (!lastUpdateText) {
      console.error('Last update text is missing or empty.');
      return;
    }
    
    // Parse the date and time from the text content
    const [time, date] = lastUpdateText.split(' ');
    if (!time || !date) {
      console.error('Failed to parse time or date from text:', lastUpdateText);
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const [day, month, year] = date.split('/').map(Number);

    // Debugging: Log parsed components
    console.log('Parsed components:', { hours, minutes, day, month, year });

    if (isNaN(hours) || isNaN(minutes) || isNaN(day) || isNaN(month) || isNaN(year)) {
      console.error('Parsed date components are invalid:', { hours, minutes, day, month, year });
      return;
    }

    // Create a Date object for the parsed date
    const lastUpdateDate = new Date(year, month - 1, day, hours, minutes);

    // Debugging: Log the created Date object
    console.log('Created Date object:', lastUpdateDate);

    if (isNaN(lastUpdateDate.getTime())) {
      console.error('Failed to create a valid Date object:', lastUpdateDate);
      return;
    }

    // Calculate the time difference and update the <p> element
    const timeDiff = timeDifference(lastUpdateDate);
    element.textContent = 'Updated ' + timeDiff;
  });
}

// Update the time difference every minute
setInterval(updateLastUpdates, 60000);

// Initial call to update the time difference immediately
updateLastUpdates();
