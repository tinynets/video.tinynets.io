import { useSelector } from 'react-redux'

const TrainingDataTable = () => {
    
    const trainingData = useSelector(state => state.trainingData);

    console.log(trainingData)

    return (
        <div>
            Data Table
                {trainingData.trainingData.map((data, index) => (
                    <table>
                        <tr key={index}>
                            <td>{data.clip_id}</td>
                            <td>{data.label}</td>
                            <td>{data.start_time}</td>
                        </tr>
                    </table>
                    
                ))}
                
        </div>

    )
}

export default TrainingDataTable