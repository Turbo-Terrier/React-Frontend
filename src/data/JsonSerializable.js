class JsonSerializable {
    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        return Object.assign(new this(), json);
    }

    static fromJsonArray(json) {
        return json.map((item) => {
            return this.fromJson(item);
        });
    }
}

export default JsonSerializable;