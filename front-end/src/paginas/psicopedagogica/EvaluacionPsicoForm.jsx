import React, { useState, useEffect } from "react";
import DatosBase from "./DatosBase";
import TablaSubsectores from "./TablaSubsectores";
import TablaEstrategias from "./TablaEstrategias";
import TablaApoyosAdicionales from "./TablaApoyosAdicionales";
import Subdimension1Comunicativas from "./Subdimension1Comunicativas";
import Subdimension2Social from "./Subdimension2Social";
import Subdimension3Motricidad from "./Subdimension3Motricidad";
import Subdimension4Aprendizaje from "./Subdimension4Aprendizaje";
import Subdimension6Sensoperceptivas from "./Subdimension6Sensoperceptivas";
import Subdimension7Lectoescritura from "./Subdimension7Lectoescritura";
import Subdimension8Matematicas from "./Subdimension8Matematicas";
import { crearEvaluacionPsico, actualizarEvaluacionPsico } from "../../servicios/evaluacionPsico";

function EvaluacionPsicoForm({ evaluacion, onSuccess }) {
  // Estados principales
  const [form, setForm] = useState({
    estudiante: "",
    evaluador: "",
    fecha: "",
    observaciones: "",
  });
  const [subsectores, setSubsectores] = useState([]);
  const [estrategias, setEstrategias] = useState([]);
  const [apoyos, setApoyos] = useState([]);
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [items4, setItems4] = useState([]);
  const [items6, setItems6] = useState([]);
  const [items7, setItems7] = useState([]);
  const [items8, setItems8] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (evaluacion) {
      setForm({
        estudiante: evaluacion.estudiante || "",
        evaluador: evaluacion.evaluador || "",
        fecha: evaluacion.fecha || "",
        observaciones: evaluacion.observaciones || "",
      });
      setSubsectores(evaluacion.subsectores || []);
      setEstrategias(evaluacion.estrategias_apoyo || []);
      setApoyos(evaluacion.apoyos_adicionales || []);
      setItems1((evaluacion.items || []).filter(i => i.area === "Comunicativas"));
      setItems2((evaluacion.items || []).filter(i => i.area === "Social"));
      setItems3((evaluacion.items || []).filter(i => i.area === "Motricidad"));
      setItems4((evaluacion.items || []).filter(i => i.area === "Aprendizaje"));
      setItems6((evaluacion.items || []).filter(i => i.area === "Sensoperceptivas"));
      setItems7((evaluacion.items || []).filter(i => i.area === "Lectoescritura"));
      setItems8((evaluacion.items || []).filter(i => i.area === "Matematicas"));
    } else {
      setForm({ estudiante: "", evaluador: "", fecha: "", observaciones: "" });
      setSubsectores([]);
      setEstrategias([]);
      setApoyos([]);
      setItems1([]);
      setItems2([]);
      setItems3([]);
      setItems4([]);
      setItems6([]);
      setItems7([]);
      setItems8([]);
    }
  }, [evaluacion]);

  // Handlers generales
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Subsectores
  const handleSubsectorChange = (idx, field, value) => {
    const updated = [...subsectores];
    updated[idx][field] = value;
    setSubsectores(updated);
  };
  const handleAddSubsector = () => setSubsectores([...subsectores, { subsector: "", tipo: "" }]);
  const handleRemoveSubsector = (idx) => setSubsectores(subsectores.filter((_, i) => i !== idx));

  // Estrategias
  const handleEstrategiaChange = (idx, field, value) => {
    const updated = [...estrategias];
    updated[idx][field] = value;
    setEstrategias(updated);
  };
  const handleAddEstrategia = () => setEstrategias([...estrategias, { descripcion: "", aplicada: false, exitosa: false, numero: 0 }]);
  const handleRemoveEstrategia = (idx) => setEstrategias(estrategias.filter((_, i) => i !== idx));

  // Apoyos
  const handleApoyoChange = (idx, field, value) => {
    const updated = [...apoyos];
    updated[idx][field] = value;
    setApoyos(updated);
  };
  const handleAddApoyo = () => setApoyos([...apoyos, { tipo: "", apoyo: "", recibido: false, descripcion_extra: "" }]);
  const handleRemoveApoyo = (idx) => setApoyos(apoyos.filter((_, i) => i !== idx));

  // Subdimensiones
  const handleItemsChange = (setter, items, idx, field, value) => {
    const updated = [...items];
    updated[idx][field] = value;
    setter(updated);
  };
  const handleAddItem = (setter, items, area) => setter([...items, { area, descripcion: "", valor: 0 }]);
  const handleRemoveItem = (setter, items, idx) => setter(items.filter((_, i) => i !== idx));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        subsectores,
        estrategias_apoyo: estrategias,
        apoyos_adicionales: apoyos,
        items: [
          ...items1,
          ...items2,
          ...items3,
          ...items4,
          ...items6,
          ...items7,
          ...items8,
        ],
      };
      if (evaluacion && evaluacion.id) {
        await actualizarEvaluacionPsico(evaluacion.id, payload);
      } else {
        await crearEvaluacionPsico(payload);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("❌ Error al guardar la evaluación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatosBase {...form} onChange={handleChange} />
      <TablaSubsectores
        subsectores={subsectores}
        onChange={handleSubsectorChange}
        onAdd={handleAddSubsector}
        onRemove={handleRemoveSubsector}
      />
      <TablaEstrategias
        estrategias={estrategias}
        onChange={handleEstrategiaChange}
        onAdd={handleAddEstrategia}
        onRemove={handleRemoveEstrategia}
      />
      <TablaApoyosAdicionales
        apoyos={apoyos}
        onChange={handleApoyoChange}
        onAdd={handleAddApoyo}
        onRemove={handleRemoveApoyo}
      />
      <Subdimension1Comunicativas
        items={items1}
        onChange={(idx, field, value) => handleItemsChange(setItems1, items1, idx, field, value)}
        onAdd={() => handleAddItem(setItems1, items1, "Comunicativas")}
        onRemove={(idx) => handleRemoveItem(setItems1, items1, idx)}
      />
      <Subdimension2Social
        items={items2}
        onChange={(idx, field, value) => handleItemsChange(setItems2, items2, idx, field, value)}
        onAdd={() => handleAddItem(setItems2, items2, "Social")}
        onRemove={(idx) => handleRemoveItem(setItems2, items2, idx)}
      />
      <Subdimension3Motricidad
        items={items3}
        onChange={(idx, field, value) => handleItemsChange(setItems3, items3, idx, field, value)}
        onAdd={() => handleAddItem(setItems3, items3, "Motricidad")}
        onRemove={(idx) => handleRemoveItem(setItems3, items3, idx)}
      />
      <Subdimension4Aprendizaje
        items={items4}
        onChange={(idx, field, value) => handleItemsChange(setItems4, items4, idx, field, value)}
        onAdd={() => handleAddItem(setItems4, items4, "Aprendizaje")}
        onRemove={(idx) => handleRemoveItem(setItems4, items4, idx)}
      />
      <Subdimension6Sensoperceptivas
        items={items6}
        onChange={(idx, field, value) => handleItemsChange(setItems6, items6, idx, field, value)}
        onAdd={() => handleAddItem(setItems6, items6, "Sensoperceptivas")}
        onRemove={(idx) => handleRemoveItem(setItems6, items6, idx)}
      />
      <Subdimension7Lectoescritura
        items={items7}
        onChange={(idx, field, value) => handleItemsChange(setItems7, items7, idx, field, value)}
        onAdd={() => handleAddItem(setItems7, items7, "Lectoescritura")}
        onRemove={(idx) => handleRemoveItem(setItems7, items7, idx)}
      />
      <Subdimension8Matematicas
        items={items8}
        onChange={(idx, field, value) => handleItemsChange(setItems8, items8, idx, field, value)}
        onAdd={() => handleAddItem(setItems8, items8, "Matematicas")}
        onRemove={(idx) => handleRemoveItem(setItems8, items8, idx)}
      />
      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Guardando..." : evaluacion ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}

export default EvaluacionPsicoForm;
