import { useState, useCallback, useEffect, useMemo } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Card, TextField, Typography } from "@mui/material";

interface bodyFields {
    name: string;
    value: string;
}

const RouteTester = () => {

    const [responseText, setResponseText] = useState("");
    const [text, setText] = useState("");
    const [pathText, setPathText] = useState("");
    const [methodText, setMethodText] = useState("");
    const [urlText, setURLText] = useState("http://127.0.0.1:3001");
    const url = "http://127.0.0.1:3001";

    const [bodyFields, setBodyFields] = useState<bodyFields[]>([]);

    const initiateRequest = useCallback(() => {
        const options = {
            method: methodText,
            headers: {
                'Content-Type': 'application/json'
            },
            body: (methodText ? methodText == "HEAD" ? JSON.stringify({ 'text': text }) : null : null)
        }

        fetch(`${urlText}/${pathText}`, options)
            .then(res => res.text())
            .then((data) => {
                console.log(data)
                setResponseText(data)
            })
    }, [pathText, methodText, text])

    const updateBodyField = (index: number, name: string, value: string) => {
        setBodyFields(bodyFields.map((element, currentIndex) => {
            if (currentIndex == index) {
                return { name: name, value: value }
            }
            else {
                return element;
            }
        }))
    }

    const addBodyField = useCallback(() => {
        let newBodyField: bodyFields = { name: "", value: "" }
        setBodyFields([...bodyFields, newBodyField]);
    }, [bodyFields])

    useEffect(() => {
        console.log(text);
    }, [text])

    const renderBodyField = (bodyField: { name: string, value: string }, index: number) => {
        return (
            <Grid2 xs={12} key={`bodyField-${index}`} >
                <Grid2 container>
                    <Grid2 xs={6}>
                        <TextField value={bodyField.name} key={`bodyField-${index}-name`} label="Property Name"
                            onChange={(e) => {
                                updateBodyField(index, e.target.value, bodyFields[index].value);
                            }}
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <TextField value={bodyField.value} key={`bodyField-${index}-value `} label="Property Value"
                            onChange={(e) => {
                                updateBodyField(index, bodyFields[index].name, e.target.value);
                            }}
                        />
                    </Grid2>
                </Grid2>
            </Grid2>
        )
    }
    const renderBodyFields = useMemo(() => {

        return (
            <Grid2 container direction={"column"}>
                {bodyFields.map((bodyField, index) => renderBodyField(bodyField, index))}
            </Grid2>
        );
    }, [bodyFields.length])

    return (
        <Grid2 container alignItems="center" justifyContent="center" direction="column">
            <Grid2 xs={8} display="flex" alignItems="center" justifyContent="center">
                <TextField label="Path" value={pathText} onChange={(e) => {
                    setPathText(e.target.value);
                }} />
                <TextField label="Method" value={methodText} onChange={(e) => {
                    setMethodText(e.target.value.toUpperCase());
                }} />
                <TextField label="Base URL" value={urlText} onChange={(e) => {
                    setURLText(e.target.value);
                }} />

                <Grid2 xs={8} padding={2}></Grid2>

            </Grid2 >
            <Grid2 xs={12} display="flex" alignItems="center" justifyContent="center">
                <Grid2 container alignItems="center" justifyContent="center" direction="column">
                    <Grid2 xs={12} display="flex" alignItems="center" justifyContent="center">
                        {renderBodyFields}
                    </Grid2>
                    <Grid2>
                        <Button onClick={() => { addBodyField() }}>
                            Add additional body field
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2 xs={8} display="flex" alignItems="center" justifyContent="center">
                <Button variant="outlined" onClick={initiateRequest}>
                    Submit
                </Button>
            </Grid2>
            <Grid2 xs={12} alignItems={"center"} justifyContent={"center"} >
                <Card>
                    <Typography>
                        {responseText}
                    </Typography>
                </Card>
            </Grid2>
        </Grid2>
    )
}

export default RouteTester;