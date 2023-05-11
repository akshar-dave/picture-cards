import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import './PictureCard.scss';

const PictureCard = (props) => {
    const { name, images, href } = props;

    const isMobile = useMediaQuery('(max-width: 1000px)');

    const clock = useRef();
    const clockTickDuration = 0.6;
    const [index, setIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const changeIndex = () => {
        setIndex(current => (current + 1) % images.length);
    }

    const startSlideshow = () => {
        setIsHovering(current => true);
    }

    const stopSlideshow = () => {
        setIsHovering(current => false);
    }

    const handleViewportEnter = () => {
        if (!isMobile) return;
        startSlideshow();
    }

    useEffect(() => {
        if (!isHovering) return;

        changeIndex();
        clock.current = setInterval(() => {
            changeIndex();
        }, clockTickDuration * 1000);

        return () => clearInterval(clock.current);
    }, [isHovering]);

    return (
        <motion.a
            className="picture-card"
            whileHover={startSlideshow}
            onHoverEnd={stopSlideshow}
            href={href}
        >
            <h3 className='picture-card-title'>{name}</h3>

            <div className="picture-card-slideshow">
                {images.map((src, i) => (
                    <motion.div className="picture-card-slide"
                        key={i}
                        style={{ visibility: index === i ? 'visible' : 'hidden' }}
                        onViewportEnter={handleViewportEnter}
                        onViewportLeave={stopSlideshow}
                    >
                        <img
                            src={src}
                            draggable='false'
                            loading='lazy'
                        />
                    </motion.div>
                ))}
            </div>
        </motion.a>
    )
}

export default PictureCard
