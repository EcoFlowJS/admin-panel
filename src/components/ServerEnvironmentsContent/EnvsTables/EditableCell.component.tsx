import { Table } from "rsuite";

export default function EditableCell({
  rowData,
  dataKey,
  onChange,
  isSystemEnvs,
  placeholder,
  ...props
}: any) {
  const editing = rowData.status === "EDIT";
  return (
    <Table.Cell {...props} style={editing ? { padding: 6 } : {}}>
      {editing ? (
        <input
          disabled={isSystemEnvs}
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
          placeholder={placeholder}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Table.Cell>
  );
}
