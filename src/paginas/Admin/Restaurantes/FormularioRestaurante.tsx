import { Button, TextField, Typography } from "@mui/material"
import http from "../../../http"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

export default function FormularioRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`/restaurantes/${params.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [params])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (params.id) {
            http.put(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => alert('Restaurante atualizado com sucesso!'))
                
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => alert('Restaurante adicionado com sucesso!'))
        }

    }
    return (

        <Box sx={{
            display: "flex", flexDirection: "column",
            alignItems: "center", flexGrow: "1"
        }}>

            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>

                <TextField
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    id="standard-basic" label="Nome do Restaurante" variant="standard"
                    fullWidth required>
                </TextField>
                <Button fullWidth type="submit" sx={{ marginTop: "0.5rem" }} variant="outlined">Confirmar</Button>
            </Box>

        </Box>)
}