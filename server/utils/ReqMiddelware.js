function reqMiddleware(data, schema){
    const fields = Object.keys(schema);

    for (const key in data) {


        if (!fields.includes(key)) {
            return false;
        }


        if (typeof data[key] !== schema[key].type) {
            return false;
        }

        if (typeof data[key] === "string") {
            if (data[key].length < schema[key].minLength ||
                data[key].length > schema[key].maxLength) {
                return false;
            }
        }

        if (schema[key].regex) {
            if (!schema[key].regex.test(data[key])) {
                return false;
            }
        }
    }

    return true;
}export default reqMiddleware