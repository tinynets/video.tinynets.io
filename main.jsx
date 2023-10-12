import React from 'react'
import './style.css'
import App from './App'



ReactDOM.render(<App />, document.getElementById('root')


// import createOrUpgradeDB from './db_ops'
// import populateTable from './tbl_component'

// const db = await createOrUpgradeDB('videoDB', 'videos', 1)

// const video = document.getElementById('video')
// const chunks = []
// const stream = await navigator.mediaDevices.getUserMedia({video : true, audio : false})
// const mediaRecorder = new MediaRecorder(stream)

// const startRecording = async () => {
//   try {
//     video.srcObject = stream
//     mediaRecorder.ondataavailable = e => chunks.push(e.data)
//     mediaRecorder.onerror = e => console.log(e)
//     mediaRecorder.start()
//   } catch (error) {
//     console.log(error)
//   }
// }

// const stopRecording = async () => {
//   console.log('stop recording')
//   if (mediaRecorder) {
//     mediaRecorder.stop()
    
//     const blob = new Blob(chunks, {type : 'video/mp4'})
//     chunks.length = 0

//     // put the blob in IndexDB

//     const transaction = db.transaction(['videos'], 'readwrite')
//     const objectStore = transaction.objectStore('videos')
//     const request = objectStore.add(blob)

//     request.onsuccess = e => {
//       console.log('data added to training set');
//       populateTable(db);  // Refresh table after adding new blob
//     };
    
//     request.onerror = e => console.log("error in transaction", e)

//     transaction.oncomplete = e => console.log('transaction completed')  

//   } else {
//     console.log('mediaRecorder is not available')
//   }
// }




// document.querySelector('#btn_start_recording').addEventListener('click', startRecording)
// document.querySelector('#btn_stop_recording').addEventListener('click', stopRecording)