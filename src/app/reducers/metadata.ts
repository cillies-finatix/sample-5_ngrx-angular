import { EntityMetadataMap } from "@ngrx/data";
import { Pizza } from "./pizza/reducer";


export function pizzaSorter(a: Pizza, b: Pizza): number {
    return a.name.localeCompare(b.name);
}

export function nameFilter(entities: { name: string }[], search: string) {
    return entities.filter(e => e.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
}

export const pluralNames = {
    Pizza: 'Pizzen'
  };

export const entityMetadata: EntityMetadataMap = {
    Pizza: {
        filterFn: nameFilter,
        sortComparer: pizzaSorter
    },
  };