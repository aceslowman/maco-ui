import { types } from "mobx-state-tree";

import {
  UIStore as UI
} from 'maco-ui';

const RootStore = types
    .model("RootStore", {
        ui: UI,
        testFloat: 0
    })
    .views(self => ({
        
    }))
    .actions(self => ({
        incrementTest: () => {
          self.testFloat++;
        }
    }))

export default RootStore;