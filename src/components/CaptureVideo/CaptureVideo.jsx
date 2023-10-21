import './CaptureVideo.css'
import { setupDB } from '../../../utils/db_ops'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTrainingData, stopRecording as recordToState, startRecording } from '../../trainingDataSlice';
import { v4 as uuidv4 } from 'uuid';


const CaptureVideo = () => {

    const videoRef = useRef(null)
    const [db, setDb] = useState(null)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [chunks, setChunks] = useState([])
    const [currentClipData, setCurrentClipData] = useState({})
    const [label, setLabel] = useState('')
    const [recorderState, setRecorderstate] = useState(null)
    const [recording, setRecording] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        const init = async () => {

            const database = await setupDB()
            setDb(database)



            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            const recorder = new MediaRecorder(stream)

            setMediaRecorder(recorder)
            setRecorderstate(recorder.state)

            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        }
        init()
    }, [])

    const startRecording = async () => {
        setCurrentClipData({
            "clip_id": uuidv4(),
            "label": label,
            "start_time": Date.now(),
        })
        if (mediaRecorder) {
            mediaRecorder.ondataavailable = e => setChunks(chunks => [...chunks, e.data])
            mediaRecorder.onerror = e => console.log(e)
            mediaRecorder.start()
            setRecorderstate(mediaRecorder.state)
        }
        setLabel('')
        dispatch(recordToState())
    }

    const stopRecording = async () => {
        if (mediaRecorder) {
            mediaRecorder.stop()

            const blob = new Blob(chunks, { type: 'video/mp4' })
            setChunks([])

            const videoStore = "videoStore"

            const transaction = db.transaction([videoStore], 'readwrite')

            const objectStore = transaction.objectStore(videoStore)
            const request = objectStore.add({ ...currentClipData, "video": blob }, currentClipData.clip_id)

            request.onsuccess = () => {
                dispatch(addTrainingData(currentClipData))
                dispatch(recordToState())
            };

            request.onerror = () => console.log("error in transaction")
            // transaction.oncomplete = () => console.log('transaction completed')    
        } else {
            console.log('mediaRecorder is not available')
        }
    }

    const toggleRecording = async () => {
        if (recording) {
            setRecording(false)
            stopRecording()
        } else {
            startRecording()
            setRecording(true)
        }
    }


    return (
        <div className="captureVideo">
            <p className="text-3xl"> Vid Capture</p>
            <video className="" ref={videoRef} id="video_element" height={640} width={480} autoPlay></video>
            <button id="start_recording" type="button" className="" onClick={toggleRecording}>
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <input type='text' placeholder='video label' onChange={e => setLabel(e.target.value)} />
        </div>
    )
}

export default CaptureVideo