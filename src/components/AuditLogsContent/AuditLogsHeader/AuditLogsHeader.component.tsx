import { useEffect, useState } from "react";
import { FlexboxGrid, Pagination } from "rsuite";

interface AuditLogsHeaderProps {
  total?: number;
  onChange?: (page: number) => void;
}

export default function AuditLogsHeader({
  total = 0,
  onChange = () => {},
}: AuditLogsHeaderProps) {
  const [activePage, setActivePage] = useState(1);

  useEffect(() => onChange(activePage), [activePage]);

  return (
    <FlexboxGrid justify="end">
      <FlexboxGrid.Item>
        <Pagination
          prev
          last
          next
          first
          ellipsis
          layout={["pager", "skip", "total"]}
          size="sm"
          total={total}
          maxButtons={7}
          limit={100}
          activePage={activePage}
          onChangePage={setActivePage}
        />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
