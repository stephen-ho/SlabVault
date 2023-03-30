function Table({ company, searched }) {

  const searchedData = searched.map((card, index) => {

    let infoKeys = ['Grading Company', 'Certification Number', 'Brand', 'Player', 'Grade'];

    if (card["Grading Company"] === "CGC") {
      infoKeys = ['Grading Company', 'Cert #', 'Card Set', 'Card Name', 'Grade'];
    } else if (card["Grading Company"] === "BGS") {
      infoKeys = ['Grading Company', 'Card Serial Number', 'Set Name', 'Player Name', 'Final Grade'];
    }

    const tableData = infoKeys.map((key, index) => {
      return (<td key={index}>{card[key]}</td>);
    });

    return (
      <tr key={index}>
        {tableData}
      </tr>
    );
  });

  return (
    <div className="prevSearched">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Company</th>
            <th scope="col">Certification #</th>
            <th scope="col">Set Name</th>
            <th scope="col">Card Name</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          {searchedData}
        </tbody>
      </table>
    </div>
  );
}

export default Table;