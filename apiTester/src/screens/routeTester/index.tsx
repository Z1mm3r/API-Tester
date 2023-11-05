import { useState, useCallback, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Card, TextField, Typography } from "@mui/material";

const RouteTester = () => {

    const [responseText, setResponseText] = useState("");
    const [text, setText] = useState("");
    const [pathText, setPathText] = useState("");
    const [methodText, setMethodText] = useState("");
    const [urlText, setURLText] = useState("http://127.0.0.1:3001");
    const url = "http://127.0.0.1:3001";

    //Testing
    useEffect(() => {
        fetch(`${urlText}/api/recipes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.text())
            .then((data) => {
                console.log(data)
                setResponseText(data)
            })
    }, [])

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

    useEffect(() => {
        console.log(text);
    }, [text])

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