import React, { useState } from 'react';
import {Plus, X} from 'lucide-react';
import '../Components/NewPage.css'

const NewPage = ({forebackground,pagecolor,handleNewPage,pages,setActivePage,activePage,setPages}) => {

  const textColor = "black"; // define a color

 // Function to delete a preview page
  const previewDeletion = (idx) => {
    if (pages.length === 1) return; // prevent deleting the last page

    const updatedPages = pages.filter((_, i) => i !== idx);
    setPages(updatedPages);

    // Adjust activePage index if needed
    if (activePage >= updatedPages.length) {
      setActivePage(updatedPages.length - 1);
    } else if (activePage === idx) {
      setActivePage(0);
    }
  };

  return (
    <div style={{display:'flex',overflowX: "scroll",width:'70%',position:'relative'}}>
      {/* Page navigator (live mini previews) */}
      
      <div 
            className='small-preview-container'>
          
        {pages.map((page, idx) => (
          
          <div className='small-preview-page'
            key={page.id}
            onClick={() => setActivePage(idx)}
            style={{
              border: activePage === idx ? "2px solid blue" : "2px solid #ccc",
              backgroundColor:forebackground, // fixed color
              color: textColor,
            }}
            
          >
            <button onClick={(e) => {
                e.stopPropagation(); // prevent switching active page on delete
                previewDeletion(idx);
              }} style={{position:'absolute',top:'0px',right:'-2px' ,height:'20px',width:'20px',
            borderRadius:'50%',color:'red',border:'1px solid black',cursor:'pointer', display:'flex',alignItems:'center',justifyContent:'center'
          }}><X style={{height:'15px',width:'15px'}}/></button>
            
            {/* balls */}
      <div className="preview-balls">
        <div className="red"></div>
        <div className="orange"></div>
        <div className="green"></div>
      </div>
            <div className="innernewpage" style={{ background: pagecolor  }}>
  {page.content && (
    <span style={{paddingTop:'20px'}}>
      {page.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
    </span>
  )}
</div>
      
          </div>
        ))}
      </div>
      <div className='add-page' onClick={handleNewPage}><Plus style={{height:'50px',width:'50px'}}  /></div>
    </div>
  
  );
};

export default NewPage;
