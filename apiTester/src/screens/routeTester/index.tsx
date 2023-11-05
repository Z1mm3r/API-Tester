import { useState, useCallback, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Card, TextField, Typography } from "@mui/material";

const RouteTester = () => {

    const [responseText, setResponseText] = useState("");
    const [text, setText] = useState("");
    const [pathText, setPathText] = useState("");
    const [methodText, setMethodText] = useState("");
    const url = "http://127.0.0.1:3001";

    //Testing
    useEffect(() => {
        console.log("Pinging Users");
        console.log(url);
        fetch(`${url}/api/recipes`, {
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
        console.log("Sending message with: ", text);

        console.log(url);
        fetch(`${url}/${pathText}`, {
            method: methodText,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': text
            })

        })
            .then(res => res.text())
            .then((data) => {
                console.log(data)
                setResponseText(data)
            })
    }, [pathText, methodText, text])


    // const handlePromptSend = useCallback(() => {
    //     console.log("Sending message with: ", text);

    //     let url = getURL();
    //     console.log(url);
    //     fetch(`${url}/api/recipePrompt`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             'text': text
    //         })

    //     })
    //         .then(res => res.text())
    //         .then((data) => {
    //             console.log(data)
    //             setResponseText(data)
    //         })
    // }, [text])

    // const handleMockPrompt = useCallback(() => {
    //     console.log("Sending mock message with: ", text);
    //     mockRequest()
    //         .then(res => {
    //             console.log(res)
    //             setResponseText(res)
    //         });
    // }, [text])

    // const sendPromptCallback = useCallback(() => {
    //     if (process.env.NODE_ENV == 'development') {
    //         console.log("Mock response for dev")
    //         //TODO only when testing api 
    //         //handlePromptSend();
    //         //All other times
    //         handleMockPrompt();

    //     }

    //     else if (process.env.NODE_ENV == 'test') {
    //         console.log("Test mock here?")
    //     }

    //     else if (process.env.NODE_ENV == 'production') {
    //         console.log("DO real API code here")
    //         handlePromptSend();
    //     }

    //     else {
    //         console.log("node env not found")
    //     }


    // }, [text])

    // const handleTextUpdate = (textIn) => {
    //     setText(textIn);
    // }

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
                    setMethodText(e.target.value);
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