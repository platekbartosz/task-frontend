import { useState, useEffect } from 'react';

const ShowPhotos = () => {

    const [photoList, setPhotoList] = useState([])
    const [displayedPhotos, setDisplayedPhotos] = useState([])
    const [count, setCount] = useState({
        left: 0,
        right: 3
    })

    const isPrevButtonVisible = count.left > 0
    const isNextButtonVisible = photoList ? count.right <= photoList.length - 1 : false


    useEffect(() => {
        fetch("https://picsum.photos/v2/list")
            .then((res) => res.json())
            .then((data) => setPhotoList(data));
    }, []);


    useEffect(() => {

        if(!photoList) return
        const photoListToDisplay = photoList.slice(count.left, count.right)

        setDisplayedPhotos(photoListToDisplay.map(item => {
            const link = item.url.split('/').reverse()
            return <img key={item.id} className='photo' src={`http://source.unsplash.com/${link[0]}`} alt="img" />
        }))

    }, [photoList, count])

    const changePhotos = (e) => {
        const { name } = e.target

        if (name === 'prev') setCount(prev => ({
            left: prev.left - 3,
            right: prev.right - 3
        }))

        if (name === 'next') setCount(prev => ({
            left: prev.left + 3,
            right: prev.right + 3
        }))
    }

    return (
        <>
            {photoList &&
                <>
                    <div className='nav-wrapper'>
                        {isPrevButtonVisible &&
                            <button className='btn' name='prev' onClick={changePhotos}>Prev</button>
                        }
                        {isNextButtonVisible &&
                            <button className='btn' name='next' onClick={changePhotos}>Next</button>
                        }
                    </div>

                    <div className='photos-wrapper'>
                        {displayedPhotos}
                    </div>
                </>
            }
        </>

    )
}

export default ShowPhotos