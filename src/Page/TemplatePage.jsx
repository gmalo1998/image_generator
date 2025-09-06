import React, { useEffect } from "react";
import "../Page/TemplatePage.css";
import { useSelector } from "react-redux";

const TemplatePage = ({
  editorRef,
  saveSelection,
  fontFamily,
  fontSize,
  bold,
  italic,
  underline,
  align,
  textcolor,
  handleContentChange,
  previewRef,
}) => {
  // ✅ read template data directly from Redux
  const { forebackground } = useSelector((state) => state.template);

  // ✅ get active page + its pagecolor
  const { activePage, pages } = useSelector((state) => state.pages);
  const currentPageColor = pages[activePage]?.pagecolor || "#ffffff";

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
  }, [activePage, pages]);

  return (
    <div
      className="editor-card"
      style={{ background: forebackground }}
      ref={previewRef}
    >
      {/* balls */}
      <div className="balls">
        <div className="red"></div>
        <div className="orange"></div>
        <div className="green"></div>
      </div>

      {/* Editable Page */}
      <div
        className="page"
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
          background: currentPageColor, // ✅ from active page, not template slice
          color: textcolor,
          minHeight: "400px",
          padding: "40px 10px",
        }}
      />
    </div>
  );
};

export default TemplatePage;
