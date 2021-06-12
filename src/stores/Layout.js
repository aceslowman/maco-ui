import {
  types,
  getParent,
  getRoot
} from "mobx-state-tree";
import Panel from "./Panel";

const Layout = types
  .model("Layout", {
    id: types.identifier,
    title: "Layout",
    size: 0,
    panel: types.maybe(types.safeReference(Panel)),
    children: types.array(types.late(() => Layout)),
    panels: types.maybe(types.map(Panel)),
    direction: types.optional(
      types.enumeration(["VERTICAL", "HORIZONTAL"]),
      "HORIZONTAL"
    )
  })
  .views(self => ({
    get isEmpty() {
      let result =
        self.children.length &&
        self.children.filter(
          s => (!s.panel && !s.isEmpty) || (s.panel && !s.panel.floating)
        ).length === 0;
      return result;
    }
  }))
  .volatile(self => ({
    siblings: null,
    rootStore: null
  }))
  .actions(self => ({

    afterAttach: () => {
      self.siblings = getParent(self);
      self.rootStore = getRoot(self);
    },

    adjust: (size) => {
      let self_index = self.siblings.indexOf(self);

      let adjusted_size = size;

      let sum =
        self_index > 0 ?
        self.siblings
        .slice(0, self_index)
        .filter(s => !s.floating)
        .reduce((a, b) => a + b.size, 0) :
        0;

      adjusted_size = size - sum;

      if (adjusted_size > 100) adjusted_size = 100;
      if (adjusted_size < 0) adjusted_size = 0;

      self.setSize(adjusted_size);
    },

    distributeChildren: () => {
      self.children.forEach((e, i) => {
        console.log(i, (i + 1) / self.children.length);
        e.setSize(1 / self.children.length);
      });
    },

    setSize: (size) => {
      self.size = size;
    },

    addPanel: (panel) => {
      // if panel is a string, look it up from list of defaults
      if (typeof panel === "string" && self.rootStore.panelVariants[panel]) {
        panel = self.rootStore.panelVariants[panel];
      }

      let layout = Layout.create({
        id: panel.id,
        panel: panel.id,
        size: 1 / self.children.length
      });

      self.panels.put(panel);
      self.children.push(layout);

      //       console.log("self", self);

      //       self.distributeChildren();
    },

    removePanel: (panel) => {
      if (self.panels) self.panels.delete(panel);
      if (self.children) {
        self.children = self.children.filter(e => e.panel !== panel);

        self.children.forEach(e => {
          e.removePanel(panel);
        });

        // console.log("SELF", getSnapshot(self));

        // TODO: if all panels are gone, remove this layout
        // if(!self.children.length) {
        //     console.log(getParent(self,1))
        //     let parent = getParent(self, 1);
        //     parent.children.filter(e => e !== self)
        // }
      }
    },

    clear: () => {
      if (self.panels && self.children) {
        self.panels.clear();
        self.children = [];
      }
    },

    // removeLayout: (layout) => {
    //     if(self.children) self.children.filter(e => e !== layout);
    // }

  }))

export default Layout;
