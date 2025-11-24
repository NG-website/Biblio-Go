function reqMiddleware(data, schema) {
    console.log(data)
    const fields = Object.keys(schema);

    for (const key in data) {

       // console.log("Failing key:", key, "value:", data[key], "expected type:", schema[key].type)
        if (!fields.includes(key)) {
            return false;
        }
//  console.log(typeof data[key])
//             console.log(typeof schema[key].type)
//             console.log(typeof data[key] !== schema[key].type)
        if (typeof data[key] !== schema[key].type) {
           
            return false;
        }

        if (typeof data[key] === "string") {
            if (data[key].length <= schema[key].minLength ||
                data[key].length >= schema[key].maxLength) {
                return false;
            }
        }


        if (schema[key].regex) {
            if (!schema[key].regex.test(data[key].toString())) {
                return false;
            }
        }
    }

    return true;
} export default reqMiddleware