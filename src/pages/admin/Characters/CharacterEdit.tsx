/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageUpload from "../../../components/admin/ImageUpload";
import StatsEditor from "../../../components/admin/StatsEditor";

export default function CharacterEdit() {
    const { slug } = useParams();
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!slug) return;
        fetch(`${import.meta.env.VITE_API_URL}/admin/characters/${slug}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
            .then(res => res.json())
            .then(data => {
                setForm({
                    name: data.name || "",
                    slug: data.slug || "",
                    element: data.element || "",
                    weapon: data.weapon || "",
                    rarity: data.rarity || 5,
                    region: data.region || "",
                    description: data.description || "",
                    icon: data.icon || "",
                    image: data.image || "",
                    stats: data.stats || [],
                    talents: data.talents?.length
                        ? data.talents
                        : Array.from({ length: 5 }, () => ({ name: "", description: "" })),
                    constellations: data.constellations?.length
                        ? data.constellations
                        : Array.from({ length: 6 }, () => ({ name: "", description: "" })),
                    ascensionMaterials: data.materials?.ascension?.map((m: any) => ({
                        item: m.item, quantity: String(m.quantity)
                    })) || [{ item: "", quantity: "" }],
                    talentMaterials: data.materials?.talent?.map((m: any) => ({
                        item: m.item, quantity: String(m.quantity)
                    })) || [{ item: "", quantity: "" }],
                });
            })
            .catch(() => setMessage("❌ Impossible de charger le personnage"));
    }, [slug]);

    const handleChange = (e: any) => {
        if (!form) return;
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: name === "rarity" ? Number(value) : value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!form) return;
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/characters/${slug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    ...form,
                    ascensionMaterials: form.ascensionMaterials
                        .filter((m: any) => m.item && m.quantity)
                        .map((m: any) => ({ ...m, quantity: Number(m.quantity) })),
                    talentMaterials: form.talentMaterials
                        .filter((m: any) => m.item && m.quantity)
                        .map((m: any) => ({ ...m, quantity: Number(m.quantity) })),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erreur lors de la mise à jour");
            setMessage("✅ Personnage mis à jour avec succès");
        } catch (err: any) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: "100%", padding: "12px", borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.1)", background: "#0f172a",
        color: "white", fontSize: "14px", outline: "none",
    };
    const sectionTitle = {
        fontFamily: "Cinzel, serif", color: "#d4af37", marginBottom: "14px", fontSize: "22px",
    };
    const cardStyle = {
        background: "#1f2937", padding: "15px", borderRadius: "12px",
        border: "1px solid rgba(212,175,55,0.3)", marginTop: "12px",
    };

    if (!form) return <p style={{ color: "white" }}>Chargement...</p>;

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ fontFamily: "Cinzel, serif", marginBottom: "25px" }}>
                Modifier : {form.name}
            </h1>

            <form onSubmit={handleSubmit} style={{
                maxWidth: "850px", display: "flex", flexDirection: "column", gap: "30px",
                background: "#111827", padding: "25px", borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
            }}>
                {/* INFOS */}
                <section>
                    <h2 style={sectionTitle}>Informations générales</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        <input type="text" name="name" placeholder="Nom" value={form.name} onChange={handleChange} style={inputStyle} />
                        <input type="text" name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} style={inputStyle} />
                        <select name="element" value={form.element} onChange={handleChange} style={inputStyle}>
                            <option value="">Choisir un élément</option>
                            <option value="pyro">Pyro</option>
                            <option value="hydro">Hydro</option>
                            <option value="anemo">Anémo</option>
                            <option value="electro">Électro</option>
                            <option value="cryo">Cryo</option>
                            <option value="geo">Géo</option>
                            <option value="dendro">Dendro</option>
                        </select>
                        <select name="weapon" value={form.weapon} onChange={handleChange} style={inputStyle}>
                            <option value="">Choisir un type d'arme</option>
                            <option value="Épée à une main">Épée à une main</option>
                            <option value="Épée à deux mains">Épée à deux mains</option>
                            <option value="Arme d'hast">Arme d'hast</option>
                            <option value="Catalyseur">Catalyseur</option>
                            <option value="Arc">Arc</option>
                        </select>
                        <select name="rarity" value={form.rarity} onChange={handleChange} style={inputStyle}>
                            <option value={4}>4★</option>
                            <option value={5}>5★</option>
                        </select>
                        <select name="region" value={form.region} onChange={handleChange} style={inputStyle}>
                            <option value="">Choisir une région</option>
                            <option value="Mondstadt">Mondstadt</option>
                            <option value="Liyue">Liyue</option>
                            <option value="Inazuma">Inazuma</option>
                            <option value="Sumeru">Sumeru</option>
                            <option value="Fontaine">Fontaine</option>
                            <option value="Natlan">Natlan</option>
                            <option value="Nod-Krai">Nod-Krai</option>
                        </select>
                        <textarea name="description" placeholder="Description" value={form.description}
                                  onChange={handleChange} rows={5} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                </section>

                {/* IMAGES */}
                <section>
                    <h2 style={sectionTitle}>Images</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <p>Icône</p>
                            <ImageUpload label="Upload icône" onUpload={(url: string) => setForm((prev: any) => ({ ...prev, icon: url }))} />
                            {form.icon && <img src={form.icon.startsWith("http") ? form.icon : `${import.meta.env.VITE_API_URL}${form.icon}`}
                                               alt="icon" style={{ width: "100px", borderRadius: "10px", marginTop: "10px" }} />}
                        </div>
                        <div>
                            <p>Image</p>
                            <ImageUpload label="Upload image" onUpload={(url: string) => setForm((prev: any) => ({ ...prev, image: url }))} />
                            {form.image && <img src={form.image.startsWith("http") ? form.image : `${import.meta.env.VITE_API_URL}${form.image}`}
                                                alt="preview" style={{ width: "220px", borderRadius: "10px", marginTop: "10px" }} />}
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section>
                    <h2 style={sectionTitle}>Statistiques</h2>
                    <StatsEditor value={form.stats} onChange={(stats: any) => setForm((prev: any) => ({ ...prev, stats }))} />
                </section>

                {/* TALENTS */}
                <section>
                    <h2 style={sectionTitle}>Compétences</h2>
                    {form.talents.map((talent: any, index: number) => (
                        <div key={index} style={cardStyle}>
                            <input type="text" placeholder={`Nom compétence ${index + 1}`} value={talent.name}
                                   onChange={e => {
                                       const updated = [...form.talents];
                                       updated[index] = { ...updated[index], name: e.target.value };
                                       setForm((prev: any) => ({ ...prev, talents: updated }));
                                   }}
                                   style={{ ...inputStyle, marginBottom: "12px" }} />
                            <textarea placeholder="Description" value={talent.description} rows={4}
                                      onChange={e => {
                                          const updated = [...form.talents];
                                          updated[index] = { ...updated[index], description: e.target.value };
                                          setForm((prev: any) => ({ ...prev, talents: updated }));
                                      }}
                                      style={{ ...inputStyle, resize: "vertical" }} />
                        </div>
                    ))}
                </section>

                {/* CONSTELLATIONS */}
                <section>
                    <h2 style={sectionTitle}>Constellations</h2>
                    {form.constellations.map((c: any, index: number) => (
                        <div key={index} style={cardStyle}>
                            <h3 style={{ color: "#d4af37", marginBottom: "10px" }}>C{index + 1}</h3>
                            <input type="text" placeholder="Nom" value={c.name}
                                   onChange={e => {
                                       const updated = [...form.constellations];
                                       updated[index] = { ...updated[index], name: e.target.value };
                                       setForm((prev: any) => ({ ...prev, constellations: updated }));
                                   }}
                                   style={{ ...inputStyle, marginBottom: "12px" }} />
                            <textarea placeholder="Description" value={c.description} rows={4}
                                      onChange={e => {
                                          const updated = [...form.constellations];
                                          updated[index] = { ...updated[index], description: e.target.value };
                                          setForm((prev: any) => ({ ...prev, constellations: updated }));
                                      }}
                                      style={{ ...inputStyle, resize: "vertical" }} />
                        </div>
                    ))}
                </section>

                {/* MATÉRIAUX ASCENSION */}
                <section>
                    <h2 style={sectionTitle}>Matériaux d'ascension</h2>
                    {form.ascensionMaterials.map((mat: any, index: number) => (
                        <div key={index} style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <input type="text" placeholder="Item" value={mat.item}
                                   onChange={e => {
                                       const updated = [...form.ascensionMaterials];
                                       updated[index] = { ...updated[index], item: e.target.value };
                                       setForm((prev: any) => ({ ...prev, ascensionMaterials: updated }));
                                   }} style={inputStyle} />
                            <input type="number" placeholder="Quantité" value={mat.quantity}
                                   onChange={e => {
                                       const updated = [...form.ascensionMaterials];
                                       updated[index] = { ...updated[index], quantity: e.target.value };
                                       setForm((prev: any) => ({ ...prev, ascensionMaterials: updated }));
                                   }} style={inputStyle} />
                            <button type="button"
                                    onClick={() => setForm((prev: any) => ({ ...prev, ascensionMaterials: prev.ascensionMaterials.filter((_: any, i: number) => i !== index) }))}
                                    style={{ background: "transparent", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>✕</button>
                        </div>
                    ))}
                    <button type="button"
                            onClick={() => setForm((prev: any) => ({ ...prev, ascensionMaterials: [...prev.ascensionMaterials, { item: "", quantity: "" }] }))}
                            style={{ marginTop: "14px", background: "transparent", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "10px", padding: "10px 14px", cursor: "pointer", fontWeight: 700 }}>
                        + Ajouter un matériau
                    </button>
                </section>

                {/* MATÉRIAUX TALENTS */}
                <section>
                    <h2 style={sectionTitle}>Matériaux de talents</h2>
                    {form.talentMaterials.map((mat: any, index: number) => (
                        <div key={index} style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <input type="text" placeholder="Item" value={mat.item}
                                   onChange={e => {
                                       const updated = [...form.talentMaterials];
                                       updated[index] = { ...updated[index], item: e.target.value };
                                       setForm((prev: any) => ({ ...prev, talentMaterials: updated }));
                                   }} style={inputStyle} />
                            <input type="number" placeholder="Quantité" value={mat.quantity}
                                   onChange={e => {
                                       const updated = [...form.talentMaterials];
                                       updated[index] = { ...updated[index], quantity: e.target.value };
                                       setForm((prev: any) => ({ ...prev, talentMaterials: updated }));
                                   }} style={inputStyle} />
                            <button type="button"
                                    onClick={() => setForm((prev: any) => ({ ...prev, talentMaterials: prev.talentMaterials.filter((_: any, i: number) => i !== index) }))}
                                    style={{ background: "transparent", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}>✕</button>
                        </div>
                    ))}
                    <button type="button"
                            onClick={() => setForm((prev: any) => ({ ...prev, talentMaterials: [...prev.talentMaterials, { item: "", quantity: "" }] }))}
                            style={{ marginTop: "14px", background: "transparent", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "10px", padding: "10px 14px", cursor: "pointer", fontWeight: 700 }}>
                        + Ajouter un matériau
                    </button>
                </section>

                <button type="submit" disabled={loading} style={{
                    padding: "14px", borderRadius: "12px", border: "none",
                    background: "#d4af37", color: "#111827", fontWeight: 700, fontSize: "16px", cursor: "pointer",
                }}>
                    {loading ? "Mise à jour..." : "Mettre à jour le personnage"}
                </button>

                {message && <p style={{ fontWeight: 600 }}>{message}</p>}
            </form>
        </div>
    );
}