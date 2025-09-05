import { X } from 'lucide-react';
import React, { useEffect } from 'react'
import '../Components/AnimatedModal.css'
import upset from '../assets/upset.png';
const AnimatedModal = ({ modal,setModal }) => {
  useEffect(() => {
      if (modal) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.add('modal-open');
      }
  
      // Clean up on unmount
      return () => {
          document.body.classList.remove('modal-open');
      };
    }, [modal]);
   
      if (!modal) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-box colorful">
        <button className="modal-close" onClick={()=>setModal(false)}>
          <X size={22} />
        </button>
        <p className="modal-text">
          <p >
            <img src={upset} alt="" style={{height:'100px',width:'100px'}}/>
          </p>
          <p>Choose a template before download</p>
        </p>
      </div>
    </div>
  )
}

export default AnimatedModal
