import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import { BaseOpenMRSDataSource } from './data-source';

export class BedDataSource extends BaseOpenMRSDataSource {
  constructor() {
    super(`${restBaseUrl}/bed?v=custom:(uuid,bedNumber,status,bedType:(uuid,name))`);
  }

  async fetchData(searchTerm: string, config?: Record<string, any>): Promise<any[]> {
    let apiUrl = this.url;
    const urlParts = apiUrl.split('?');

    // Build URL query parameters
    const params = new URLSearchParams(urlParts[1]);

    const locationUuid = config?.referencedValue || config?.location;
    if (locationUuid) {
      params.append('locationUuid', locationUuid);
    }
    if (config?.status) {
      params.append('status', config.status);
    }
    if (searchTerm) {
      params.append('q', searchTerm);
    }

    apiUrl = `${urlParts[0]}?${params.toString()}`;

    return openmrsFetch(apiUrl).then(({ data }) => {
      if (data?.results) {
        return data.results;
      }
      return data || [];
    });
  }

  toUuidAndDisplay(item: any): any {
    if (!item) return item;
    const typeLabel = item.bedType?.name ? ` - (${item.bedType.name})` : '';
    return {
      ...item,
      uuid: item.uuid,
      display: item.bedNumber ? `${item.bedNumber}${typeLabel}` : (item.display || ''),
    };
  }

  async fetchSingleItem(uuid: string): Promise<any | null> {
    const urlParts = this.url.split('?');
    const apiUrl = `${urlParts[0]}/${uuid}?${urlParts[1]}`;
    return openmrsFetch(apiUrl).then(({ data }) => {
      return data ? this.toUuidAndDisplay(data) : null;
    });
  }
}
