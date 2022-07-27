import fs from "fs";

class JsonStorageRepository {
  constructor(filePath) {
    this.filePath = filePath;
  }

  get nextId() {
    return this.getAll().nextId;
  }

  writeId(id) {
    const file = this.getAll();
    file.nextId = id;
    fs.writeFileSync(this.filePath, JSON.stringify(file, null, 2));
  }

  incrementNextId() {
    const jsonAll = this.getAll();
    jsonAll.nextId = jsonAll.nextId + 1;
    this.writeId(jsonAll.nextId);

    return jsonAll.nextId;
  }

  getAll() {
    const jsonText = fs.readFileSync(this.filePath);
    const jsonAll = JSON.parse(jsonText);

    return jsonAll;
  }

  getItems() {
    const jsonText = fs.readFileSync(this.filePath);
    const jsonArray = JSON.parse(jsonText).items;

    return jsonArray;
  }

  writeItems(items) {
    const file = this.getAll();
    file.items = items;
    fs.writeFileSync(this.filePath, JSON.stringify(file, null, 2));
  }

  pushItem(item) {
    const file = this.getAll();
    const newItems = [...file.items, item];
    this.writeItems(newItems);
    this.incrementNextId();
  }
}

export { JsonStorageRepository };
