import React, { lazy, Suspense, useRef, useState,useEffect } from "react";
import * as htmlToImage from "html-to-image";
import PageLoader from './Components/PageLoader.jsx'
import "./App.css";
import { setTemplate as setTemplateAction } from "./store/templateSlice.js"; // Redux
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
      dataUrl = await htmlToImage.toPng(previewRef.current, { pixelRatio: 2 });
    } else if (format === "toJPEG") {
      dataUrl = await htmlToImage.toJpeg(previewRef.current, { pixelRatio: 2 });
    } else if (format === "toSVG") {
      dataUrl = await htmlToImage.toSvg(previewRef.current);
    }

    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `document.${format.replace("to", "").toLowerCase()}`;
      link.href = dataUrl;
      link.click();
    }
  };

  // ✅ template selection (only Redux, no local state duplication)
  const handleTemplate = (value) => {
    console.log("Selected Template:", value);
    dispatch(setTemplateAction(value));
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
        <Modal setOpenPopup={setOpenPopup} handleTemplate={handleTemplate} />
      )}

      <div className="Appcontainer">
        <Navbar
          setFormat={setFormat}
          setOpen={setOpen}
          open={open}
          format={format}
          handleDownload={handleDownload}
          setTemplate={handleTemplate} // ✅ Pass handler, not state setter
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
        />

        <SidebarLayout
          previewRef={previewRef}
          handleDownload={handleDownload}
          template={template}
          forebackground={forebackground}
          pagecolor={pagecolor}
        />

        <Footer />
      </div>
     </Suspense>
  );
}

export default App;
