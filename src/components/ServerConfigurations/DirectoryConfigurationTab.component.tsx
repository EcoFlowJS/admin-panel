import { configOptions } from "@ecoflow/types";
import { FolderSelector, FormGroup } from "@ecoflow/components-lib";
import directoryFetcher from "../../service/common/directoryFetcher.service";

interface DirectoryConfigurationTabProps {
  defaultServerConfigs?: configOptions;
}

export default function DirectoryConfigurationTab({
  defaultServerConfigs,
}: DirectoryConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="userDir"
        fileType="Directory"
        label="Base directory :- "
        accepter={FolderSelector}
        autoComplete="off"
        width={350}
        showIndentLine
        placeholder={defaultServerConfigs?.userDir}
        fetchDirectory={(path?: string, type?: "Directory" | "File") =>
          directoryFetcher(path, type)
        }
      />
      <FormGroup
        name="moduleDir"
        fileType="Directory"
        label="Module directory :- "
        accepter={FolderSelector}
        autoComplete="off"
        width={350}
        showIndentLine
        placeholder={defaultServerConfigs?.moduleDir}
        fetchDirectory={(path?: string, type?: "Directory" | "File") =>
          directoryFetcher(path, type)
        }
      />
      <FormGroup
        name="flowDir"
        fileType="Directory"
        label="Flow directory :- "
        accepter={FolderSelector}
        autoComplete="off"
        width={350}
        showIndentLine
        placeholder={defaultServerConfigs?.flowDir}
        fetchDirectory={(path?: string, type?: "Directory" | "File") =>
          directoryFetcher(path, type)
        }
      />
      <FormGroup
        name="envDir"
        fileType="Directory"
        label="Environment directory :- "
        accepter={FolderSelector}
        autoComplete="off"
        width={350}
        showIndentLine
        placeholder={defaultServerConfigs?.envDir}
        fetchDirectory={(path?: string, type?: "Directory" | "File") =>
          directoryFetcher(path, type)
        }
      />
      <FormGroup
        fileType="Directory"
        name="DB_Directory"
        label="Database directory :- "
        accepter={FolderSelector}
        autoComplete="off"
        width={350}
        showIndentLine
        placeholder={defaultServerConfigs?.DB_Directory}
        fetchDirectory={(path?: string, type?: "Directory" | "File") =>
          directoryFetcher(path, type)
        }
      />
      <FormGroup
        fileType="Directory"
        name="httpStaticRoot"
        label="Static Serve Location :- "
        accepter={FolderSelector}
        autoComplete="off"
        width={350}
        showIndentLine
        placeholder={defaultServerConfigs?.httpStaticRoot}
        fetchDirectory={(path?: string, type?: "Directory" | "File") =>
          directoryFetcher(path, type)
        }
      />
    </>
  );
}
