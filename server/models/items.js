import keystone from "keystone";
import mongostatic from "mongoosastic";

const { Types } = keystone.Field;

const items = new keystone.List("Items");
items.add({
  itemName: {
    type: Types.Text,
    index: true,
    unique: true
  },
  itemDescription: {
    type: Types.Text,
    index: true
  },
  dateAdded: {
    type: Types.Datetime
  },
  dateModified: {
    type: Types.Datetime
  }
});

const { schema } = items;
schema.index(
  {
    itemName: "text",
    itemDescription: "text"
  },
  {
    weights: {
      itemName: 2,
      itemDescription: 1
    }
  }
);

schema.plugin(mongostatic);

items.register();
export default items;
