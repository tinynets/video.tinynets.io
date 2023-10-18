import { useState, useEffect, useRef } from 'react'

const VideoPlayer = () => {

    const db_name = "videoDB"

    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
     


        
        



    })

    const currentvideoID = 'blah'


    return (
        <div className='border p-5 m-4'>
            <h1>VideoPlayer</h1>
            <video  controls src={null} width={250}/>
        </div>
    )
}

export  { VideoPlayer}