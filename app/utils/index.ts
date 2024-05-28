import axios from 'axios';
import _ from 'lodash';
import * as XLSX from 'xlsx';
import {
  BaseParams,
  DataType,
  Item,
  LoadOptionsProps,
  PageEdge,
} from '../types';

export class AppUtilities {
  public static formatAmount(amount: number): string {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  public static cleanedParams<T>(queryParams: T) {
    const params: any = {};
    if (queryParams) {
      const keys = Object.keys(queryParams) as Array<keyof T>;
      keys.forEach((key) => {
        if (!(queryParams[key] === undefined || queryParams[key] === '')) {
          params[key] = queryParams[key];
        }
      });
    }
    return params;
  }

  public static reformData<T>(data: DataType<T>): T[] {
    return data?.pageEdges?.map((d: PageEdge<T>) => ({ ...d.node })) || [];
  }

  public static async loadOptions<Params extends BaseParams, T extends Item>({
    url,
    params,
    cursorBased,
    labelOrLabelPath,
    valueOrValuePath,
  }: LoadOptionsProps<Params, T>) {
    const res = await axios({
      url,
      params: this.cleanedParams(params),
    });

    let reformedOptions;
    let meta;
    const getLabelAndValue = (item: T) => ({
      label:
        typeof labelOrLabelPath === 'string'
          ? _.get(item, labelOrLabelPath)
          : labelOrLabelPath(item),
      value:
        typeof valueOrValuePath === 'string'
          ? _.get(item, valueOrValuePath)
          : valueOrValuePath(item),
    });
    if (cursorBased) {
      reformedOptions = this.reformData<T>(res.data.data).map((item) =>
        getLabelAndValue(item)
      );
    } else {
      meta = res?.data?.data?.pageMeta;
      reformedOptions = res?.data.data.pageItems.map((item: T) =>
        getLabelAndValue(item)
      );
    }

    if (cursorBased) {
      return {
        options: reformedOptions,
        hasMore: false,
      };
    }
    return {
      options: reformedOptions,
      hasMore: meta.currentPage < meta.totalPages,
      additional: {
        page: (params.page! + 1) as number,
      },
    };
  }

  public static convertToExcelFile(data: any[]) {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Data');
    return workbook;
  }
}
