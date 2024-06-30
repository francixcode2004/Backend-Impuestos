const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        nombres: { type: String, required: true },
        apellidos: { type: String, required: true },
        correo:{type: String,unique:true,required:true},
        telefono:{type: String, required:true},
        cedula: { type: String, required: true ,unique: true},
        password: { type: String, required: true },
        impuestos: [{ type: Schema.Types.ObjectId, ref: "Impuestos" }]
    },
    {
        timestamps: true
    }
);

module.exports = model("Usuarios", UserSchema);


