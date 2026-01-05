interface INews {
  _id?: string;
  title?: string;
  text?: string;
  image?: string | FileList;
  date?: string | Date;
}

export type { INews };
