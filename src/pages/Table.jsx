function Table({ cardInfo, company }) {

  let infoKeys = ['Certification Number', 'Brand', 'Player', 'Grade'];

  if (company === "CGC") {
    infoKeys = ['Cert #', 'Card Set', 'Card Name', 'Grade'];
  }

  if (company === "BGS") {
    infoKeys = ['Card Serial Number', 'Set Name', 'Player Name', 'Final Grade'];
  }

  const tableData = infoKeys.map((key, index) => {
    return (<td key={index}>{cardInfo[key]}</td>);
  });

  return (
    <div className="prevSearched">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Certification #</th>
            <th scope="col">Set Name</th>
            <th scope="col">Card Name</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {tableData}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;