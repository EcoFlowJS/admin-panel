import { Divider, FlexboxGrid } from "rsuite";
import Backup from "./Backup/Backup.component";
import Restore from "./Restore/Restore.component";

export default function BackupRestoreContent() {
  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={22}>
          <Backup />
          <Divider />
          <Restore />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
