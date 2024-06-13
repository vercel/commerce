export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type CustomerData = {
  data: {
    customer: {
      emailAddress: {
        emailAddress: string;
      };
      firstName: string;
      lastName: string;
      tags: any[];
    };
  };
};

export type GenericObject = { [key: string]: any };

export type CustomerDetailsData = {
  data: {
    customer: {
      emailAddress: {
        emailAddress: string;
      };
      // Using GenericObject to type 'orders' since the fields are not known in advance
      orders: Connection<GenericObject>;
    };
  };
};
