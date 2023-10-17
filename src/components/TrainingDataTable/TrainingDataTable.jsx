import { useSelector } from 'react-redux'

const TrainingDataTable = () => {
    
    const trainingData = useSelector(state => state.trainingData);

    console.log(trainingData)

    return (
        <div className='h-full flex-grow border-2w-1/5'>
            Data Table
                {trainingData.trainingData.map((data, index) => (
                    <table key={index}>
                        <tbody>
                            <tr>
                                <td>{data.clip_id}</td>
                                <td>{data.label}</td>
                                <td>{data.start_time}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                ))}
                
        </div>

    )
}

export default TrainingDataTable