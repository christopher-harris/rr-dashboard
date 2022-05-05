import * as uuid from 'uuid';

export class ProjectManager {
  name: string;
  id: string;
  division: string;
  metadata: any;

  constructor(metadata: any, name?: string) {
    this.id = uuid.v4() || '';
    this.name = name || '';
    this.metadata = metadata;
  }

  // getManagerDivision() {
  //   const managersProjects = this.records.filter((record) => record.project_owner === this.options.name);
  //   console.log(managersProjects);
  //   return '';
  // }
}
