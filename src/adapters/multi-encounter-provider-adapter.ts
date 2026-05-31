import { type OpenmrsResource } from '@openmrs/esm-framework';
import { type FormContextProps } from '../provider/form-provider';
import {
  type ValueAndDisplay,
  type FormField,
  type FormFieldValueAdapter,
  type FormProcessorContextProps,
} from '../types';
import { gracefullySetSubmission } from '../utils/common-utils';

export const MultiEncounterProviderAdapter: FormFieldValueAdapter = {
  transformFieldValue: function (field: FormField, value: any, context: FormContextProps) {
    gracefullySetSubmission(field, value, null);
  },

  getInitialValue: function (field: FormField, sourceObject: OpenmrsResource, context: FormProcessorContextProps) {
    const encounter = sourceObject ?? context.previousDomainObjectValue;
    if (encounter?.['encounterProviders']?.length) {
      return encounter['encounterProviders']
        .map((ep: OpenmrsResource) => ep?.['provider']?.uuid)
        .filter(Boolean) as string[];
    }
    return [];
  },

  getPreviousValue: function (
    field: FormField,
    sourceObject: OpenmrsResource,
    context: FormProcessorContextProps,
  ): ValueAndDisplay {
    const encounter = sourceObject ?? context.previousDomainObjectValue;
    const providers: OpenmrsResource[] =
      encounter?.['encounterProviders']?.map((ep: OpenmrsResource) => ep?.['provider']).filter(Boolean) ?? [];

    const display: string = providers.map((p) => String(p.display ?? '')).join(', ');
    const value: string = providers.map((p) => String(p.uuid ?? '')).join(',');
    return { value, display };
  },

  getDisplayValue: function (field: FormField, value: any) {
    if (Array.isArray(value)) {
      return value; // Array of display strings rendered by the component
    }
    return value;
  },

  tearDown: function (): void {
    return;
  },
};
