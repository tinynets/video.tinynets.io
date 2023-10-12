import './CaptureVideo.css'
import createOrUpgradeDB from '../../utils/db_ops'
import { useEffect, useRef, useState } from 'react'
import populateTable from '../../tbl_component'


const CaptureVideo = () => {

    const videoRef = useRef(null)
    const [db, setDb] = useState(null)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [chunks, setChunks] = useState([])

    useEffect(() => {
        const init = async () => {
            const database = await createOrUpgradeDB('videoDB', 'videos', 1)
            setDb(database)

            const stream = await navigator.mediaDevices.getUserMedia({video : true, audio : false})
            const recorder = new MediaRecorder(stream)
            setMediaRecorder(recorder)

            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        }
        init()

    }, [])

const startRecording = async () => {
    if (mediaRecorder) {
        mediaRecorder.ondataavailable = e => setChunks(chunks => [...chunks, e.data])
        mediaRecorder.onerror = e => console.log(e)
        mediaRecorder.start()
      }
}

const stopRecording = async () => {
      if (mediaRecorder) {
        mediaRecorder.stop()
        
        const blob = new Blob(chunks, {type : 'video/mp4'})
        setChunks([])
    
        // put the blob in IndexDB
    
        const transaction = db.transaction(['videos'], 'readwrite')
        const objectStore = transaction.objectStore('videos')
        const request = objectStore.add(blob)
    
        request.onsuccess = e => {
          console.log('data added to training set');
          populateTable(db);  // Refresh table after adding new blob
        };
        
        request.onerror = e => console.log("error in transaction", e)
        transaction.oncomplete = e => console.log('transaction completed')    
      } else {
        console.log('mediaRecorder is not available')
      }
    }

    return (
        <div>
            <center><h1>tinynets.io</h1></center>
            <video ref={videoRef} id="video_element" height={640} width={480} autoPlay></video>
            <button id="start_recording" onClick={startRecording}>Start Recording</button>
            <button id="stop_recording" onClick={stopRecording}>Stop Recording</button>
        </div>
    )
}

export default CaptureVideo