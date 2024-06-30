const { Schema, model } = require("mongoose");

const ImpuestoSchema = new Schema(
    {
        ingresoAnual: { type: Number, required: true },
        totalGastos: { type: Number, required: true },
        impuestoCalculado: { type: Number, required: true },
        fecha:{type:Date,require:true},
        usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model("Impuestos", ImpuestoSchema);
