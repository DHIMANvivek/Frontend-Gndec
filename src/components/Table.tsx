import { useState } from "react";
import { IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import Fuse from "fuse.js";
import { difference } from "lodash";

export const Table: React.FC<any> = ({ filters = "", children = () => { }, headings = [], data = [], searchKeys = [] }) => {
  const [search, setSearch] = useState('');
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.5,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: searchKeys
  };
  const mergeSerach = (data: any) => {
    const fuse = new Fuse(data, options);
    const searchedItems = fuse.search(search).map((node) => node.item);
    if (searchedItems.length) {
      const allOtherObjects = difference(data, searchedItems);
      return [...searchedItems, ...allOtherObjects]
    }
    return data;
  }
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol sizeXl="8" sizeLg="6">
            {filters}
          </IonCol>
          <IonCol sizeXl="4" sizeLg="6">
            <IonItem>
              {/* <IonLabel position="floating">Search</IonLabel> */}
              <IonInput onIonChange={(e: any) => setSearch(e.detail.value)} placeholder="Search" clearInput></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <table className="ionic-table">
          <thead>
            <tr>
              {headings.map((head: string) => <th key={head}>{head}</th>)}
            </tr>
          </thead>
          <tbody>
            {children(mergeSerach(data))}
          </tbody>
        </table>
      </IonGrid>
    </>
  );
};
