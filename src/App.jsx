import React, { lazy, Suspense, useRef, useState,useEffect } from "react";
import domtoimage from 'dom-to-image-more';
import PageLoader from './Components/PageLoader.jsx'
import "./App.css";
import { getTemplateConfig, setTemplate, setTemplate as setTemplateAction } from "./store/templateSlice.js"; // Redux
import { useDispatch, useSelector } from "react-redux";
const Navbar = lazy(() => import("./Components/Navbar"));
const SidebarLayout = lazy(() => import("./Page/SidebarLayout"));
const Footer = lazy(() => import("./Components/Footer"));
const Modal = lazy(() => import("./Components/Modal"));
const AnimatedModal = lazy(() => import("./Components/AnimatedModal"));

function App() {
  const [format, setFormat] = useState("Select Format");
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const previewRef = useRef();
  const dispatch = useDispatch();

  // ✅ read template data directly from Redux
  const { name: template, forebackground, pagecolor } = useSelector(
    (state) => state.template
  );

  // ✅ export logic
  const handleDownload = async () => {
    if (!previewRef.current) {
      setModal(true);
      return;
    }
    let dataUrl;
    if (format === "toPNG") {
      dataUrl = await domtoimage.toPng(previewRef.current, { pixelRatio: 2 ,cacheBust: true,});
    } else if (format === "toJPEG") {
      dataUrl = await domtoimage.toJpeg(previewRef.current, { pixelRatio: 2,cacheBust: true, });
    } else if (format === "toSVG") {
      dataUrl = await domtoimage.toSvg(previewRef.current);
    }

    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `document.${format.replace("to", "").toLowerCase()}`;
      link.href = dataUrl;
      link.click();
    }
  };

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate initial load
    return () => clearTimeout(timer);
  }, []);

 if (loading) return <PageLoader />;
  return (
   <Suspense fallback={<PageLoader />}>
      {modal && <AnimatedModal setModal={setModal} modal={modal} />}
      {openPopup && (
        <Modal setOpenPopup={setOpenPopup} />
      )}

      <div className="Appcontainer">
        <Navbar
          setFormat={setFormat}
          setOpen={setOpen}
          open={open}
          format={format}
          handleDownload={handleDownload}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
        />

        <SidebarLayout
          previewRef={previewRef}
          handleDownload={handleDownload}

        />

        <Footer />
      </div>
     </Suspense>
  );
}

export default App;
