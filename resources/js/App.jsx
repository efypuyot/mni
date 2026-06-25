import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function App() {
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const disabled = loading || !first.trim() || !last.trim()

    async function load() {
        try {
        let result = await fetch("/api/people")
        let data = await result.json()
        setData(data)
        } catch {
        toast.error("Failed to load entries")
        }
    }

    async function save() {    
        if (!first.trim() || !last.trim()) {
            toast.error("Please complete all required fields")
            return
        }

        setLoading(true)
        
        const savePromise = fetch("/api/people", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            first_name: first,
            last_name: last
            })
        }).then(async (res) => {
            if (!res.ok) throw new Error("Save failed")
    
            await load()
    
            const result = {name: `${first} ${last}`}
    
            setFirst("")
            setLast("")
    
            return result
        })
    
        await toast.promise(savePromise, {
            loading: "Saving your entry...",
            success: (data) => `Successfully saved ${data.name} ✨`,
            error: (err) => `Something happened: ${err.toString()}`
            },{
            success: {
                duration: 5000,
                icon: "💚"
            }}
        )
        setLoading(false)
    }

    useEffect(() => {load()}, [])

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: { borderRadius: "12px" }
                }}
            />
            <div style={styles.page}>
                <div style={styles.card}>
                    <h1 style={styles.title}> My name is...? </h1>
                    <div style={styles.form}>
                        <input
                            value={first}
                            placeholder="First Name"
                            style={styles.input}
                            onChange={(e) => setFirst(e.target.value)}
                        />

                        <input
                            value={last}
                            placeholder="Last Name"
                            style={styles.input}
                            onChange={(e) => setLast(e.target.value)}
                        />

                        <button
                            disabled={disabled}
                            onClick={save}
                            style={{
                                ...styles.button,
                                opacity: disabled ? 0.5 : 1,
                                cursor: disabled ? "not-allowed" : "pointer"
                            }}
                        >
                            {loading ? "Saving..." : "Submit"}
                        </button>
                    </div>
                    <div style={styles.listCard}>
                        <h3 style={styles.listTitle}> List of Names </h3>
                        {data.length === 0 ? (
                            <div style={styles.empty}> No entries yet </div>
                        ) : (
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((x) => (
                                        <tr key={x.id} style={styles.row}>
                                            <td>{x.first_name}</td>
                                            <td>{x.last_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            <footer style={styles.footer}>
                <p>
                    © 2026 <span style={styles[".footer .brand"]}>efypuyot</span>. All rights reserved.
                </p>
            </footer>
            </div>
        </>
    )
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#338017,#003f6a)",
        padding: 30,
        display: "flex",
        flexDirection: "column",
    },
    card: {
        width: 800,
        maxWidth: "100%",
        background: "white",
        borderRadius: 24,
        padding: 40,
        boxShadow: "0 25px 60px rgba(0,0,0,.08)"
    },
    title: {
        textAlign: "center",
        color: "#0f766e",
        marginBottom: 6
    },
    subtitle: {
        textAlign: "center",
        color: "#6b7280",
        marginBottom: 30
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginBottom: 16,
        marginTop: 16,
        justifySelf: "anchor-center",
        width: "60%",
    },
    input: {
        padding: 16,
        borderRadius: 14,
        border: "2px solid #dbeafe",
        fontSize: 16,
        outline: "none",
        transition: ".2s",
    },
    button: {
        background: "linear-gradient(90deg,#338017,#003f6a)",
        color: "white",
        border: "none",
        padding: 16,
        borderRadius: 14,
        fontWeight: 700,
        fontSize: 16,
        transition: ".25s",
    },
    listCard: {
        background: "linear-gradient(to bottom,#f8fffe,#eff8ff)",
        borderRadius: 18,
        padding: 24
    },
    listTitle: {
        color: "#0f766e",
        textAlign: "center",
        marginBottom: 16
    },
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 12px"
    },
    thead: {
        color: "#0f766e!important", 
    },
    row: {
        textAlign: "center",
    },
    empty: {
        textAlign: "center",
        padding: 30,
        color: "#64748b"
    },
    footer: {
        width: "fit-content",
        marginInline: "auto",
        backdropFilter: "blur(16px)",
        color: "#ffffff"
    },
    ".footer .brand": {
        fontWeight: 700,
        background: "linear-gradient(135deg, #338010,#ffffff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    }
}