export interface DataRecord {
  title: string;
  division: string;
  project_owner: string;
  budget: number;
  status: string;
  created: string | null;
  modified: string | null;
  id: string;
  metadata: {
    jsCreatedDate: Date | null,
    jsModifiedDate: Date | null,
  }
}

export type DataRecords = DataRecord[];

export type RecordKeys = keyof DataRecords;

export interface IDataRecord extends Record<string, any> {};

export enum DataRecordKeysEnum {
  title = 'Title',
  project_owner = 'Project Owner',
  division = 'Division',
  budget = 'Budget',
  status = 'Status',
  created = 'Created',
  modified = 'Modified',
}
