import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './PictureCard.scss';

const PictureCard = (props) => {
    const { name, images, href } = props;

    const clock = useRef();
    const clockTickDuration = 0.6;
    const [index, setIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const changeIndex = () => {
        setIndex(current => (current + 1) % images.length);
    }

    const handleHover = () => {
        setIsHovering(current => true);
    }

    const handleHoverEnd = () => {
        setIsHovering(current => false);
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
            whileHover={handleHover}
            onHoverEnd={handleHoverEnd}
            href={href}
        >
            <h3 className='picture-card-title'>{name}</h3>

            <div className="picture-card-slideshow">
                {images.map((src, i) => (
                    <div className="picture-card-slide"
                        key={i}
                        style={{ visibility: index === i ? 'visible' : 'hidden' }}
                    >
                        <img
                            src={src}
                            draggable='false'
                            loading='lazy'
                        />
                    </div>
                ))}
            </div>
        </motion.a>
    )
}

export default PictureCard
