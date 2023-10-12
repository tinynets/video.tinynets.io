async function createOrUpgradeDB(dbName, storeName, version) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);
  
      request.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { autoIncrement: true });
        }
      };
  
      request.onsuccess = function(e) {
        resolve(e.target.result);
      };
  
      request.onerror = function(e) {
        reject(new Error("Error creating/upgrading database"));
      };
    });
  }
  
  

  export default createOrUpgradeDB