import {FormData, Blob} from "formdata-node";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";
import {FormDataEncoder} from "form-data-encoder";
import { Readable } from "stream";
const form = new FormData()

form.set("avatar", new Blob(fs.readFileSync(path.join(fileURLToPath(import.meta.url), "../sample.txt"))), "photos.txt")
const encoder = new FormDataEncoder(form);

const data = await fetch("http://localhost:3030/profile", {
    method: "POST",
    headers: encoder.headers,
    body: Readable.from(encoder.encode()),
    duplex: "half"
}).then(res => res.json())

console.log(data.form) // => Hello, World!