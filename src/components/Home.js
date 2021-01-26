/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import cyberpunkMain from '../assets/img/home/cyberpunkMain.jpg'
import reddeadMain from '../assets/img/home/reddeadMain.jpg'
import rustMain from '../assets/img/home/rustMain.jpg'
import seaofthievesMain from '../assets/img/home/seaofthievesMain.jpg'
import reddeadslideshow1 from '../assets/img/home/reddeadslideshow1.jpg'
import reddeadslideshow2 from '../assets/img/home/reddeadslideshow2.jpg'
import reddeadslideshow3 from '../assets/img/home/reddeadslideshow3.jpg'
import reddeadslideshow4 from '../assets/img/home/reddeadslideshow4.jpg'
import rustslideshow1 from '../assets/img/home/rustslideshow1.jpg'
import rustslideshow2 from '../assets/img/home/rustslideshow2.jpg'
import rustslideshow3 from '../assets/img/home/rustslideshow3.jpg'
import rustslideshow4 from '../assets/img/home/rustslideshow4.jpg'
import cyberpunkslideshow1 from '../assets/img/home/cyberpunkslideshow1.jpg'
import cyberpunkslideshow2 from '../assets/img/home/cyberpunkslideshow2.jpg'
import cyberpunkslideshow3 from '../assets/img/home/cyberpunkslideshow3.jpg'
import cyberpunkslideshow4 from '../assets/img/home/cyberpunkslideshow4.jpg'
import seaofthievesslideshow1 from '../assets/img/home/seaofthievesslideshow1.jpg'
import seaofthievesslideshow2 from '../assets/img/home/seaofthievesslideshow2.jpg'
import seaofthievesslideshow3 from '../assets/img/home/seaofthievesslideshow3.jpg'
import seaofthievesslideshow4 from '../assets/img/home/seaofthievesslideshow4.jpg'
import arrowright from '../assets/img/home/arrowright.png'
import arrowleft from '../assets/img/home/arrowleft.png'

function Home() {
    const [slidePreview, setSlidePreview] = useState({})
    const [index, setIndex] = useState(0)
    const [slider0, setSlider0] = useState('')
    const [slider1, setSlider1] = useState('')
    const [slider2, setSlider2] = useState('')
    const [slider3, setSlider3] = useState('')

    const slideshowContent = [
        {title: 'Cyberpunk 2077', mainImage: cyberpunkMain, price: '$59.99',
        previewImage1: cyberpunkslideshow1, 
        previewImage2: cyberpunkslideshow2, 
        previewImage3: cyberpunkslideshow3, 
        previewImage4: cyberpunkslideshow4},

        {title: 'Rust', mainImage: rustMain, price: '$39.99',
        previewImage1: rustslideshow1, 
        previewImage2: rustslideshow2, 
        previewImage3: rustslideshow3, 
        previewImage4: rustslideshow4},

        {title: 'Red Dead Redemption 2', mainImage: reddeadMain, price: '$40.19',
        previewImage1: reddeadslideshow1, 
        previewImage2: reddeadslideshow2, 
        previewImage3: reddeadslideshow3, 
        previewImage4: reddeadslideshow4},

        {title: 'Sea of Thieves', mainImage: seaofthievesMain, price: '$39.99', 
        previewImage1: seaofthievesslideshow1, 
        previewImage2: seaofthievesslideshow2, 
        previewImage3: seaofthievesslideshow3, 
        previewImage4: seaofthievesslideshow4},
    ]
    
    const arrowIndex = (val) => {
        if (val.target.className === 'previousImage') {
            if (index === 0) {
                setIndex(4);
            }
            else {
                setIndex((val) => val - 1);
            }
        }
        if (val.target.className === 'nextImage') {
            if (index >= slideshowContent.length) {
                setIndex(0);
            }
            else {
                setIndex((val) => val + 1);
            }
        }
        
    }

    const sliderIndex = (val) => {
            let num = val.target.className.slice(-1);
            setIndex(parseInt(num))
    }

    const changeIndex = () => {
        setIndex((val) => val + 1)
    }

    useEffect(() => {
        if (index >= slideshowContent.length) setIndex(0)
        else {
        setSlidePreview(slideshowContent[index])
        if (index === 0) {
            setSlider1(0) 
            setSlider2(0)
            setSlider3(0)
            setSlider0('slider0')
        }
        if (index === 1) {
            setSlider0(0) 
            setSlider2(0)
            setSlider3(0)
            setSlider1('slider1')
        }
        if (index === 2) {
            setSlider0(0) 
            setSlider1(0)
            setSlider3(0)
            setSlider2('slider2')
        }
        if (index === 3) {
            setSlider0(0) 
            setSlider1(0)
            setSlider2(0)
            setSlider3('slider3')
            }
        }
    }, [index])

    useEffect(() => {
        setInterval(() => {changeIndex()}, 8000);
    }, [])

    return(
        <div className="home">

            <div className="topbar">
                <ul className="topbarButtons">
                    <li className="yourStoreBtn"><a href="/">Your Store</a></li>
                    <li className="browseBtn"><a href="/">Browse</a></li>
                    <li className="pointsBtn"><a href="/">Points Shop</a></li>
                    <li className="newsBtn"><a href="/">News</a></li>
                    <li className="labsBtn"><a href="/">Steam Labs</a></li>
                </ul>
                <input className="topbarSearch" type="text" placeholder="search the store"></input>
            </div>

            <div className="featuredSlideshow">
            <p className="featuredTitle">FEATURED & RECOMMENDED</p>
                <div className="featuredImage">
                    <img src={slidePreview.mainImage} alt=""></img>
                </div>
                <div className="featuredInfo">
                    <p className="previewTitle">{slidePreview.title}</p>
                    <div className="slideshowImages">
                        <img src={slidePreview.previewImage1} alt=""></img>
                        <img src={slidePreview.previewImage2} alt=""></img>
                        <img src={slidePreview.previewImage3} alt=""></img>
                        <img src={slidePreview.previewImage4} alt=""></img>
                    </div>
                    <p className="previewNowAvailable">Now Available</p>
                    <p className="previewTopSeller">Top Seller</p>
                    <p className="previewPrice">{slidePreview.price}</p>
                </div>
                <div className="nextImage" onClick={arrowIndex}><img src={arrowright} alt=""></img></div>
                <div className="previousImage" onClick={arrowIndex}><img src={arrowleft} alt=""></img></div>
                <div className="featuredSlider">
                    <div className="featuredSlider0" datatype={slider0} onClick={e => sliderIndex(e)}></div>
                    <div className="featuredSlider1" datatype={slider1} onClick={e => sliderIndex(e)}></div>
                    <div className="featuredSlider2" datatype={slider2} onClick={e => sliderIndex(e)}></div>
                    <div className="featuredSlider3" datatype={slider3} onClick={e => sliderIndex(e)}></div>
                </div>
            </div>

        </div>
    )
}

export default Home