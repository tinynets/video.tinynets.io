import { useSelector } from 'react-redux'
import { VideoPlayer } from '../VideoPlayer/VideoPlayer'

const TrainingDataTable = () => {
    
    const trainingData = useSelector(state => state.trainingData);

    // console.log(trainingData)

    return (
        <div className='h-full flex-grow border-2w-1/5 p-2 m-4'>
            <table className="table-auto border-collapse border border-gray-800">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-gray-800 border">Clip ID</th>
                        <th className="px-4 py-2 text-gray-800 border">Label</th>
                        <th className="px-4 py-2 text-gray-800 border">Start Time</th>
                    </tr>
                </thead>
                <tbody>
                    {trainingData.trainingData.map((data, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{data.clip_id}</td>
                            <td className="border px-4 py-2">{data.label}</td>
                            <td className="border px-4 py-2">{data.start_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <VideoPlayer />
        </div>
    )
}

export default TrainingDataTable