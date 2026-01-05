interface ICertification {
  _id?: string;
  title?: string;
  description?: string;
  year?: string;
  status?: string;
  file?: string | FileList;
}

export type { ICertification };
