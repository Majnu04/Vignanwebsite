import React from 'react';
import DisciplineCell from '../Cells/DisciplineCell';
import EDCell from '../Cells/EDCell';

const CellsPage: React.FC = () => {
  return (
    <div>
      {/* Each section is now wrapped in a div with a unique ID */}
      <div id="discipline-cell">
        <DisciplineCell />
      </div>
      
    </div>
  );
};

export default CellsPage;