async function populateTable(db) {
    // Clear the table first
    const tbody = document.querySelector('#videoTable tbody');
    tbody.innerHTML = '';
  
    const transaction = db.transaction(['videos'], 'readonly');
    const objectStore = transaction.objectStore('videos');
    const request = objectStore.openCursor();
  
    request.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        // Create new table row and cells
        const row = document.createElement('tr');
        const cellKey = document.createElement('td');
        const cellBlob = document.createElement('td');
  
        // Key
        cellKey.textContent = cursor.key;
  
        // Blob
        if (cursor.value instanceof Blob) {
          const objectURL = URL.createObjectURL(cursor.value);
          const videoElem = `<video controls src="${objectURL}"></video>`;
          cellBlob.innerHTML = videoElem;
        } else {
          cellBlob.innerHTML = 'Blob not found';
        }
  
        // Append cells to row
        row.appendChild(cellKey);
        row.appendChild(cellBlob);
  
        // Append row to table
        tbody.appendChild(row);
  
        // Continue to next cursor item
        cursor.continue();
      }
    };
  }

  export default populateTable
  