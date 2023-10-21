


// async function createOrUpgradeDB(dbName, storeName, version) {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open(dbName, version);
  
//       request.onupgradeneeded = function(e) {
//         const db = e.target.result;
//         if (!db.objectStoreNames.contains(storeName)) {
//           db.createObjectStore(storeName, { autoIncrement: true });
//         }
//       };
  
//       request.onsuccess = function(e) {
//         resolve(e.target.result);
//       };
  
//       request.onerror = function(e) {
//         reject(new Error("Error creating/upgrading database"));
//       };
//     });
//   }

  const setupDB = async () => {
    const dbName = "videoDB"
    const storeName = "videoStore"
    const dbVersion = 1

    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(dbName, dbVersion);

      openRequest.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { autoIncrement: true });
        }
      }

      openRequest.onsuccess = function(e) {
        resolve(e.target.result);
      }

      openRequest.onerror = function(e) {
        reject(new Error("Error opening database"));
      }
    });
  }


const getVideoByClipID = async (clip_id)  => {
  console.log('getting video by clip')
  return new Promise(async (resolve, reject) => {
    const db = await setupDB()

    const transaction = db.transaction(["videoStore"], "readonly");
      const store = transaction.objectStore("videoStore");
      const request = store.get(clip_id);

      request.onsuccess = (e) => {
        console.log('got the clip')
        resolve(e.target.result);
      }
      
      request.onerror = (e) => {
        console.log(e)
        reject(new Error("Error getting video"));
      }


    // db.onsuccess = function(e) {
    //   const db = e.target.result;
    // }
    // db.onerror = function(e) {
    //   console.log(e)
    //   reject(new Error("Error opening database"));
    // }
  });
}



  export   { setupDB, getVideoByClipID }