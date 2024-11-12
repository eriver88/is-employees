export interface DtOptions {
  data: any,
  columns: DtColumns[],
  pagination: boolean
}

interface DtColumns {
  label: string,
  field: string,
  type: string | DtColumnTypeDetail,
  sorting: boolean,
  searching: boolean,
  ref?: any,
  sortNumber?: number
}

interface DtColumnTypeDetail {
  name: string,
  format: string | object
}
