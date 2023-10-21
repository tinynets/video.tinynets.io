import { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getVideoByClipID } from '../../../utils/db_ops'

// get the video by clip ud from, based on whatever user selects in the front end, by selecting on
// the table
// the selected row is to be highlighted so we can know which one should be playing.


const VideoPlayer = ({clip_id}) => {

        const [videoURL, setVideoURL] = useState(null)



        useEffect(() => {
            const init = async () => {
                // console.log('HERE')
                const video = await getVideoByClipID(clip_id)
                // const url = URL.createObjectURL(video.video, {type: 'video/mp4'})
                console.log(video.video, typeof video.video);

                const url = URL.createObjectURL(new Blob([video.video], {type: 'video/mp4'}));

                console.log(url)
                setVideoURL(url)
            }
            init()
        }, [clip_id])




    return (
        <div className='border p-5 m-4'>
            <h1>Preview</h1>
            <video  controls src={videoURL} width={250} autoPlay/>
        </div>
    )
}

export  { VideoPlayer }