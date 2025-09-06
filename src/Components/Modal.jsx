import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import '../Components/Modal.css'
import { getTemplateConfig, setTemplate } from '../store/templateSlice';
import { setDefaultPageColor } from '../store/pagesSlice';
import { useDispatch } from 'react-redux';


const Modal = ({setOpenPopup,openPopup}) => { 
const dispatch = useDispatch();
  
  

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

  // ✅ template selection handler
    const handleTemplate = (value) => {
      console.log("Selected Template:", value);
  
      // set template in Redux
      dispatch(setTemplate(value));
  
      // fetch config for selected template
      const config = getTemplateConfig(value);
      console.log("Template config:", config);
  
      // update default pagecolor in pagesSlice
      if (config?.pagecolor) {
        dispatch(setDefaultPageColor(config.pagecolor));
      }
    };
 
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
