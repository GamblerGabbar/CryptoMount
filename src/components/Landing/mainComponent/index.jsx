import React from 'react';
import './style.css';
import Button from '../../common/Button';
import iphone from '../../../assets/phone.png';
import gradient from '../../../assets/gradient.png';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function MainComponent() {
  return (
    <div>
      <div className="flex-info">
        <div className="left-compo">
          <motion.h1 className="track"
          initial={{opacity: 0, scale: 0, x: 50}}
          animate={{opacity: 1, scale: 1, x: 0}}
          transition={{ duration: 1 }}
          >
            Mount Crypto</motion.h1>
          <motion.h1 className="realtime"
          initial={{opacity: 0, scale: 0, x: 50}}
          animate={{opacity: 1, scale: 1, x: 0}}
          transition={{ duration: 1, delay: 0.5}}
          >
            Real Time.</motion.h1>
          <motion.p className="info-t"
          initial={{opacity: 0, scale: 0, x: 50}}
          animate={{opacity: 1, scale: 1, x: 0}}
          transition={{ duration: 1, delay: 0.75}}
          >
            Mount Crypto with ease. Have a real-time price update
          </motion.p>
          <motion.div className="btn-flex"
          initial={{opacity: 0, scale: 0, z: 50}}
          animate={{opacity: 1, scale: 1, z: 0}}
          transition={{ duration: 1, delay: 1.5}}
          > <Link to='/dashboard'>
            <Button text="Dashboard" />
            </Link>
            <Button text="Share" outlined={true} />
          </motion.div>
        </div>
        <div className="Ph-container">
          <motion.img src={iphone} className="iPhone" 
          initial={{ y: -10}}
          animate={{ y:10 }}
          transition={{
            type:"smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
          />
          <img src={gradient} className="Gradient" />
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
