import './CaptureVideo.css'
import createOrUpgradeDB from '../../../utils/db_ops'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTrainingData } from '../../trainingDataSlice';
import { v4 as uuidv4 } from 'uuid';


const CaptureVideo = () => {

    const videoRef = useRef(null)
    const [db, setDb] = useState(null)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [chunks, setChunks] = useState([])
    const [currentClipData, setCurrentClipData] = useState({})

    const trainingDispatch = useDispatch()

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
    setCurrentClipData({
        "clip_id" : uuidv4(),
        "label" : "test",
        "start_time" : Date.now(),
    })
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
          trainingDispatch(addTrainingData(currentClipData))
          
        };
        
        request.onerror = e => console.log("error in transaction", e)
        transaction.oncomplete = e => console.log('transaction completed')    
      } else {
        console.log('mediaRecorder is not available')
      }
    }

    return (
        <div className="h-full flex-grow w-4/5 border border-black border-solid lg:px-60">
            <p className="text-3xl"> Vid Capture</p>
            
            <video ref={videoRef} id="video_element" height={640} width={480} autoPlay></video>
            <button id="start_recording" type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={startRecording}>Start Recording</button>

            <button id="stop_recording" type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={stopRecording}>Stop Recording</button>

            <input type='text' placeholder='video label'/>

        </div>
    )
}

export default CaptureVideo