import React from 'react';

const PdfViewer = () => {
  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden', margin: '0', backgroundColor: 'rgb(82, 86, 89)' }}>
      <embed
        name="pdfEmbed"
        style={{ position: 'absolute', left: '0', top: '0' }}
        width="100%"
        height="100%"
        src="about:blank"
        type="application/pdf"
      />
      <div id="volume-booster-visualizer">
        <div className="sound">
          <div className="sound-icon"></div>
          <div className="sound-wave sound-wave_one"></div>
          <div className="sound-wave sound-wave_two"></div>
          <div className="sound-wave sound-wave_three"></div>
        </div>
        <div className="segments-box">
          <div data-range="1-20" className="segment"><span></span></div>
          <div data-range="21-40" className="segment"><span></span></div>
          <div data-range="41-60" className="segment"><span></span></div>
          <div data-range="61-80" className="segment"><span></span></div>
          <div data-range="81-100" className="segment"><span></span></div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
