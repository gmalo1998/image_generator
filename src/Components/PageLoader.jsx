import '../Components/PageLoader.css'
const PageLoader = () => {
  return (
    <div className="loader-wrapper">
      <div className="pulse-bars">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading your creative editor...</p>
    </div>
  );
};

export default PageLoader;
