import React, { useState } from 'react';
import './stadium.css';

const Stadium = () => {
  const [selectedSector, setSelectedSector] = useState('');

  const handleSectorClick = (sector) => {
    setSelectedSector(sector);
  };
  return (
    
    <div className="wrapper">
    <div className='select-sectors'>
    <h1>Please Select the Sector !</h1>
    </div>
      <div className="stadium">
        <div className="field">
          <div className="center-wrapper"></div>
          <div className="goalkeeper">
            <div></div>
            <div></div>
          </div>
          <div className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <div className="corners">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="goal">
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="ball"></div>
       
        <div className="sectors">
        <div className="sector north" onClick={() => handleSectorClick('north')}>
              {selectedSector === 'north' && <div className="sector-label">North</div>}
            </div>
            <div className="sector west" onClick={() => handleSectorClick('west')}>
              {selectedSector === 'west' && <div className="sector-label">West</div>}
            </div>
            <div className="sector south" onClick={() => handleSectorClick('south')}>
              {selectedSector === 'south' && <div className="sector-label">South</div>}
            </div>
            <div className="sector east" onClick={() => handleSectorClick('east')}>
              {selectedSector === 'east' && <div className="sector-label">East</div>}
        </div>
       </div>
      </div>
   
    </div>
  );
};

export default Stadium;