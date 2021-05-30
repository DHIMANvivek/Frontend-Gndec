export const Table: React.FC<any> = ({ children = () => { }, headings = [], data = [] }) => {
  return (
    <table className="ionic-table">
      <thead>
        <tr>
          {headings.map((head: string) => <th>{head}</th>)}
        </tr>
      </thead>
      <tbody>
        {children(data)}
      </tbody>
    </table>
  );
};
