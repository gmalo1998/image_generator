import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Page/SidebarLayout.css";
import { SketchPicker } from "react-color";
import {
  Menu,
  X,
  Download,
  Type,
  Palette,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline,
  Plus,
} from "lucide-react";
import TemplatePage from "./TemplatePage";
import {
  addPage,
  setActivePage,
  updatePageContent,
  deletePage,
  setPageColor,
} from "../store/pagesSlice";
import pumkin from "../assets/pumkin.png";
import hugging from "../assets/hugging.png";

const fonts = [
  "JetBrains Mono, monospace",
  "Arial, sans-serif",
  "Verdana, Geneva, sans-serif",
  "Tahoma, Geneva, sans-serif",
  "Times New Roman, Times, serif",
  "Georgia, serif",
  "Courier New, monospace",
  "Roboto, sans-serif",
  "Open Sans, sans-serif",
  "Lato, sans-serif",
  "Montserrat, sans-serif",
  "Raleway, sans-serif",
  "Nunito, sans-serif",
  "Fira Code, monospace",
];

const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
];

export default function SidebarLayout({ previewRef, handleDownload }) {
  const dispatch = useDispatch();

  const [fontFamily, setFontFamily] = useState("JetBrains Mono, monospace");
  const [fontSize, setFontSize] = useState("16px");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [align, setAlign] = useState("left");
  const [isOpen, setIsOpen] = useState(false);
  const [fstyle, setFstyle] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [textcolor, setTextColor] = useState("#000000");
  const [openColourPicker, setOpenColourPicker] = useState(false);

  const { name: template, forebackground,pagecolor: templatePageColor } = useSelector(
    (state) => state.template
  );
  const { pages, activePage } = useSelector((state) => state.pages);

  // ✅ each page has its own background color
  const currentPageColor = pages[activePage]?.pagecolor || templatePageColor ;

  const editorRef = useRef();
  const savedSelection = useRef(null);

  const formatText = (command) => {
    editorRef.current.focus();
    document.execCommand(command, false, null);
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) savedSelection.current = sel.getRangeAt(0);
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (savedSelection.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelection.current);
    }
  };

  const applyTextColor = (newColor) => {
    restoreSelection();
    document.execCommand("foreColor", false, newColor.hex);
    setTextColor(newColor.hex);
  };

  const applyPageColor = (newColor) => {
    dispatch(setPageColor(newColor.hex));
  };

  useEffect(() => {
    if (!isOpen) {
      setFstyle(false);
      setOpenColourPicker(false);
      setShowPicker(false);
    }
  }, [isOpen]);

  const handleShow = () => {
    if (!isOpen) setIsOpen(true);
    setFstyle((prev) => !prev);
  };
  const handlePageColour = () => {
    if (!isOpen) setIsOpen(true);
    setOpenColourPicker((prev) => !prev);
  };

  const handleContentChange = (e) => {
    dispatch(
      updatePageContent({ index: activePage, content: e.target.innerHTML })
    );
  };

  const handleNewPage = () => {
     dispatch(addPage(templatePageColor)); // ✅ pass template color
    // dispatch(addPage());
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const handlePageClick = (idx) => {
    dispatch(setActivePage(idx));
    if (editorRef.current) editorRef.current.innerHTML = pages[idx].content;
  };

  const handleDeletePage = (idx) => {
    dispatch(deletePage(idx));
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          {isOpen ? (
            <button className="toggle-btn" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          ) : (
            <button className="toggle-btn" onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </button>
          )}
          {isOpen && <h2 className="logo">WordCanvas</h2>}
        </div>

        {isOpen && (
          <ul className="menu">
            <li className="menu-item" onClick={handleShow}>
              <Type size={22} /> Font Styles
            </li>
            {fstyle && (
              <li className="submenu">
                <div className="custom-select-wrapper">
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="custom-dropdown"
                  >
                    {fontSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="custom-select-wrapper">
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="custom-dropdown"
                  >
                    {fonts.map((font) => (
                      <option
                        key={font}
                        value={font}
                        style={{ fontFamily: font }}
                      >
                        {font.split(",")[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            )}
            <li className="menu-item" onClick={handlePageColour}>
              <Palette size={22} /> Change Background
            </li>
            {openColourPicker && (
              <div style={{ position: "absolute", zIndex: 1000 }}>
                <SketchPicker
                  color={currentPageColor}
                  onChange={applyPageColor}
                />
              </div>
            )}
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="dashboard-header">
          <h1 className="title">
            <img src={pumkin} alt="pumkin" />
            <p className="logo">WordCanvas</p>
          </h1>
          <p className="subtitle">
            Turn your words into stunning visual images with WordCanvas. Easily
            customize fonts, alignment, and backgrounds.
            <img
              src={hugging}
              alt=""
              style={{ height: "18px", width: "18px" }}
            />
          </p>
        </div>

        {/* Editor */}
        <div>
          <div className="editor-toolbar">
            <button onClick={() => formatText("bold")}>
              <Bold size={18} />
            </button>
            <button onClick={() => formatText("italic")}>
              <Italic size={18} />
            </button>
            <button onClick={() => formatText("justifyLeft")}>
              <AlignLeft size={18} />
            </button>
            <button onClick={() => formatText("justifyCenter")}>
              <AlignCenter size={18} />
            </button>
            <button onClick={() => formatText("justifyRight")}>
              <AlignRight size={18} />
            </button>
            <button onClick={() => formatText("underline")}>
              <Underline />
            </button>
            <button onClick={() => setShowPicker((prev) => !prev)}>
              <Palette size={18} />
            </button>
            {showPicker && (
              <div style={{ position: "absolute", zIndex: 1000 }}>
                <SketchPicker
                  color={textcolor}
                  onChange={applyTextColor}
                  onClick={saveSelection}
                />
              </div>
            )}
          </div>
          <div className="text-container">
            {template && (
              <TemplatePage
                editorRef={editorRef}
                saveSelection={saveSelection}
                fontFamily={fontFamily}
                fontSize={fontSize}
                bold={bold}
                italic={italic}
                underline={underline}
                align={align}
                textcolor={textcolor}
                pagecolor={currentPageColor} // ✅ pass active page color
                handleContentChange={handleContentChange}
                previewRef={previewRef}
              />
            )}
          </div>
        </div>

        {/* Mini Pages Preview + Add/Delete */}
        <div className="action-container">
          <div
            className="preview-container"
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            {pages.map((page, idx) => (
              <div
                key={page.id}
                className={`preview-page ${
                  activePage === idx ? "active" : ""
                }`}
                onClick={() => handlePageClick(idx)}
                style={{
                  width: "80px",
                  height: "100px",
                  border:
                    activePage === idx ? "2px solid #007bff" : "1px solid #ccc",
                  margin: "5px",
                  padding: "5px",
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "4px",
                  background: forebackground,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                <div className="preview-balls">
                  <div className="red"></div>
                  <div className="orange"></div>
                  <div className="green"></div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: page.content }}
                  style={{
                    background: page.pagecolor,// ✅ each page keeps its own bg
                    width: "85%",
                    height: "85px",
                    overflow: "hidden",
                    fontSize: "10px",
                    padding: "15px 5px 0 5px",
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePage(idx);
                  }}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    fontSize: "10px",
                    lineHeight: "16px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button className="add-button" onClick={handleNewPage}>
              <Plus style={{ height: "50px", width: "50px", color: "white" }} />
            </button>
          </div>

          <div className="download-section">
            <button className="download-btn" onClick={handleDownload}>
              <Download size={18} /> Download as Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
