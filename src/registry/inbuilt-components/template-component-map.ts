import UiSelectExtended from '../../components/inputs/ui-select-extended/ui-select-extended.component';
import MultiProviderSelect from '../../components/inputs/multi-select/multi-provider-select.component';

export const templateToComponentMap = [
  {
    name: 'drug',
    baseControlComponent: UiSelectExtended,
  },
  {
    name: 'bed-select',
    baseControlComponent: UiSelectExtended,
  },
  {
    name: 'problem',
    baseControlComponent: UiSelectExtended,
  },
  {
    name: 'encounter-provider',
    baseControlComponent: UiSelectExtended,
  },
  {
    name: 'multi-provider-select',
    baseControlComponent: MultiProviderSelect,
  },
  {
    name: 'encounter-location',
    baseControlComponent: UiSelectExtended,
  },
  {
    name: 'select-concept-answers',
    baseControlComponent: UiSelectExtended,
  },
  {
    name: 'encounter-role',
    baseControlComponent: UiSelectExtended,
  },
];
