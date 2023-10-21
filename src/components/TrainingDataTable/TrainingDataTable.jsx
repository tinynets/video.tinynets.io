import { useState } from 'react'
import { useSelector } from 'react-redux'
import { VideoPlayer } from '../VideoPlayer/VideoPlayer'

const TrainingDataTable = () => {
    
    const trainingData = useSelector(state => state.trainingData);

    const [videoUrl, setVideoUrl] = useState(null)


    const changeSelections = (clip_id) => {
        setVideoUrl(clip_id)
        console.log(clip_id)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Clip ID</th>
                        <th>Label</th>
                        <th>Start Time</th>
                        <th>select</th>
                    </tr>
                </thead>
                <tbody>
                    {trainingData.trainingData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.clip_id}</td>
                            <td>{data.label}</td>
                            <td>{data.start_time}</td>
                            <td><input type="checkbox" onChange={() => changeSelections(data.clip_id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <VideoPlayer clip_id={videoUrl} />
        </div>
    )
}

export default TrainingDataTable