import React, { useEffect } from 'react'
import '../Page/TemplatePage.css'

const TemplatePage = ({
  editorRef,
  saveSelection,
  openColourPicker,
  fontFamily,
  fontSize,
  bold,
  italic,
  underline,
  align,
  forebackground,
  pagecolor,
  textcolor,
  handleContentChange,
  pages,
  activePage,
  previewRef
}) => {
  useEffect(() => {
      if (editorRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      editorRef.current.innerHTML = pages[activePage]?.content || "";
      
      // Move cursor to end
      editorRef.current.focus();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [activePage]);
  return (
   
    
    <div className="editor-card" style={{ background: forebackground }} ref={previewRef}>
      {/* balls */}
      <div className="balls">
        <div className="red"></div>
        <div className="orange"></div>
        <div className="green"></div>
      </div>
        {/* Editable Page */}
      <div
      className='page'
  ref={editorRef}
  contentEditable
  suppressContentEditableWarning={true}
  onInput={handleContentChange}
  onMouseUp={saveSelection}
  onKeyUp={saveSelection}
  style={{
    fontFamily,
    fontSize,
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    textAlign: align,
    background: pagecolor,
    color: textcolor,
    minHeight: '400px',
    padding: '40px 10px',
  
  }}
/>
    </div>

  )
}

export default TemplatePage
