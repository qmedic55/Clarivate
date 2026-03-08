"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELD_OPTIONS = [
  { id: "any", label: "Any Field" },
  { id: "title", label: "Title" },
  { id: "author", label: "Author" },
  { id: "subject", label: "Subject" },
  { id: "isbn", label: "ISBN" },
];

const OPERATOR_OPTIONS = ["AND", "OR", "NOT"];

export default function AdvancedSearchPage() {
  const router = useRouter();
  const [fields, setFields] = useState([
    { field: "any", value: "", operator: "AND" },
    { field: "title", value: "", operator: "AND" },
  ]);

  function addField() {
    if (fields.length >= 5) return;
    setFields([...fields, { field: "any", value: "", operator: "AND" }]);
  }

  function removeField(index) {
    if (fields.length <= 1) return;
    setFields(fields.filter((_, i) => i !== index));
  }

  function updateField(index, key, value) {
    setFields(fields.map((f, i) => (i === index ? { ...f, [key]: value } : f)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fieldParams = fields
      .filter((f) => f.value.trim())
      .map((f) => `${f.operator}:${f.field}:${encodeURIComponent(f.value)}`)
      .join("|");

    if (!fieldParams) return;
    router.push(`/search?adv=${fieldParams}`);
  }

  return (
    <div className="advanced-search-page">
      <h1>Advanced Search</h1>
      <form className="advanced-search-form" onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="search-field-row">
            {index > 0 && (
              <select
                value={field.operator}
                onChange={(e) => updateField(index, "operator", e.target.value)}
              >
                {OPERATOR_OPTIONS.map((op) => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            )}
            {index === 0 && <div style={{ minWidth: 100 }} />}
            <select
              value={field.field}
              onChange={(e) => updateField(index, "field", e.target.value)}
            >
              {FIELD_OPTIONS.map((fo) => (
                <option key={fo.id} value={fo.id}>{fo.label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder={`Enter ${FIELD_OPTIONS.find((f) => f.id === field.field)?.label.toLowerCase() || "search term"}...`}
              value={field.value}
              onChange={(e) => updateField(index, "value", e.target.value)}
            />
            {fields.length > 1 && (
              <button
                type="button"
                className="remove-field-btn"
                onClick={() => removeField(index)}
                title="Remove field"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        <button type="button" className="add-field-btn" onClick={addField}>
          + Add another field
        </button>

        <div>
          <button type="submit" className="advanced-search-submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
