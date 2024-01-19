export interface PaginatedResult<T> {
  rows: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
  order?: string;
  orderBy?: any;
  transformRows?: (rows: any[]) => any[];
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

const paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
  return async (model, args: any = { where: undefined, include: undefined }, options) => {
    const page = Number(options?.page || defaultOptions?.page) || 0;
    const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
    const order = options?.order || defaultOptions?.order || 'desc';
    const orderBy = options?.orderBy || defaultOptions?.orderBy || 'createdAt'
    const skip = perPage * page;

    const [total, rows] = await Promise.all([
      model.count({ where: args.where }),
      orderBy === 'school' ? model.findMany({ 
        ...args,
        orderBy: [{
          school: {
            name: order
          },
        }],
        take: perPage,
        skip,
      })
      :
      orderBy === 'contributedUser' ? model.findMany({ 
        ...args,
        orderBy: [{
          contributedUser: {
            name: order
          },
        }], 
        take: perPage,
        skip,
      }):model.findMany({ 
        ...args,
        orderBy: {
          [orderBy]: order,
        },
        take: perPage,
        skip,
      }) 
    ])
    const lastPage = Math.ceil(total / perPage);
    const meta = {
      total,
      lastPage,
      currentPage: page,
      perPage,
    };

    if (options?.transformRows) {
      return {
        rows: options.transformRows(rows),
        meta,
      };
    }

    return {
      rows,
      meta,
    };
  };
};

export const paginate: PaginateFunction = paginator({ perPage: 20 });
