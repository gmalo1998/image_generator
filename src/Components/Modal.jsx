import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import '../Components/Modal.css'
import { useDispatch } from "react-redux";

const Modal = ({setOpenPopup,setTemplate,handleTemplate,openPopup}) => {
  

 const templates = [
    { id: "template1", className: "template1", pageClass: "template1-page" },
    { id: "template2", className: "template2", pageClass: "template2-page" },
    { id: "template3", className: "template3", pageClass: "template3-page" },
  ];
useEffect(() => {
    if (openPopup) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.add('modal-open');
    }

    // Clean up on unmount
    return () => {
        document.body.classList.remove('modal-open');
    };
  }, [openPopup]);
 
  return (
    <div className="overlay">
      <div className="modal-box1 colorful1">
        <button onClick={() => setOpenPopup(false)}><X/></button>
        <h1>Choose Your Templates</h1>
        <div className="template-container">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className={tpl.className}
              onClick={() => {
                handleTemplate(tpl.id);
                setOpenPopup(false);
              }}
            >
              <div className={tpl.pageClass}>
                <div className="ball">
                  <div className="red"></div>
                  <div className="orange"></div>
                  <div className="green"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal
